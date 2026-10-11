/**
 * SkyBridge Voice & Speech Recognition Intelligence Service
 * 
 * Provides:
 * 1. Robust microphone permission discovery & native prompt triggering via getUserMedia
 * 2. Fresh SpeechRecognition lifecycle management (prevents the ended-instance lock bug)
 * 3. MediaRecorder audio capture fallback for browsers without Web Speech API or network limits
 * 4. Real-time translation to English via Gemini 3.8 Flash (/api/voice/transcribe-and-translate)
 * 5. Text-To-Speech (TTS) natural voice output with markdown stripping
 */

export interface MicPermissionResult {
  granted: boolean;
  code?: 'granted' | 'denied' | 'not-found' | 'unsupported' | 'error';
  message: string;
}

export interface SpeechSessionCallbacks {
  onStart?: () => void;
  onInterimResult?: (transcript: string) => void;
  onFinalResult?: (transcript: string) => void;
  onError?: (errorMessage: string, isPermissionError: boolean) => void;
  onEnd?: () => void;
}

/**
 * Checks and explicitly requests user microphone permissions using getUserMedia.
 * This reliably activates the browser's "Allow microphone" pop-up in Chrome, Edge, Safari, Firefox.
 */
export async function requestMicrophoneAccess(): Promise<MicPermissionResult> {
  if (typeof window === 'undefined') {
    return { granted: false, code: 'unsupported', message: 'Window is not defined' };
  }

  // Check if mediaDevices exists
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    // If running in insecure context or very old browser
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
      return {
        granted: false,
        code: 'unsupported',
        message: 'Microphone access requires a secure HTTPS connection or localhost.'
      };
    }
    return {
      granted: false,
      code: 'unsupported',
      message: 'Your browser environment does not support mediaDevices audio capture.'
    };
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    // Stop tracks immediately so mic is freed for Web Speech or MediaRecorder
    stream.getTracks().forEach(track => track.stop());
    return {
      granted: true,
      code: 'granted',
      message: 'Microphone permission granted.'
    };
  } catch (err: any) {
    console.warn('[MIC PERMISSION] Access request error:', err);
    if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
      return {
        granted: false,
        code: 'denied',
        message: 'Microphone access was denied. Please click the Lock 🔒 or Settings icon in your browser URL bar and set Microphone to "Allow".'
      };
    }
    if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
      return {
        granted: false,
        code: 'not-found',
        message: 'No microphone was detected on this device. Please plug in a microphone or headset.'
      };
    }
    if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
      return {
        granted: false,
        code: 'error',
        message: 'Microphone is already in use by another application. Please close other recording apps.'
      };
    }
    return {
      granted: false,
      code: 'error',
      message: err.message || 'Unable to access microphone.'
    };
  }
}

/**
 * Checks if browser has built-in Web Speech API
 */
export function isWebSpeechSupported(): boolean {
  if (typeof window === 'undefined') return false;
  return Boolean((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
}

/**
 * Creates and starts a FRESH SpeechRecognition session.
 * Recreating the instance on each invocation is required by Web Speech API
 * because once stopped or ended, instances cannot be re-invoked with .start().
 */
export function startLiveSpeechRecognition(
  language: 'en' | 'ur' = 'en',
  callbacks: SpeechSessionCallbacks
): { stop: () => void; abort: () => void } {
  const SpeechRecognition =
    (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  if (!SpeechRecognition) {
    callbacks.onError?.(
      'Web Speech API is not natively supported in this browser. Media recorder fallback will be used.',
      false
    );
    return { stop: () => {}, abort: () => {} };
  }

  let recognition: any;
  try {
    recognition = new SpeechRecognition();
  } catch (e: any) {
    callbacks.onError?.('Failed to instantiate SpeechRecognition: ' + e.message, false);
    return { stop: () => {}, abort: () => {} };
  }

  recognition.continuous = false;
  recognition.interimResults = true;
  recognition.lang = language === 'ur' ? 'ur-PK' : 'en-US';

  recognition.onstart = () => {
    callbacks.onStart?.();
  };

  recognition.onresult = (event: any) => {
    let interim = '';
    let final = '';

    for (let i = event.resultIndex; i < event.results.length; ++i) {
      const transcriptPiece = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        final += transcriptPiece;
      } else {
        interim += transcriptPiece;
      }
    }

    if (final) {
      callbacks.onFinalResult?.(final);
    } else if (interim) {
      callbacks.onInterimResult?.(interim);
    }
  };

  recognition.onerror = (event: any) => {
    console.warn('[SPEECH RECOGNITION] Error event:', event.error);
    const isPermission = event.error === 'not-allowed' || event.error === 'service-not-allowed';
    let humanMsg = `Voice recognition notice (${event.error}).`;

    if (event.error === 'not-allowed') {
      humanMsg = 'Microphone access is blocked in browser settings. Please allow mic permission.';
    } else if (event.error === 'no-speech') {
      humanMsg = 'No speech was detected. Please click the mic and speak clearly.';
    } else if (event.error === 'network') {
      humanMsg = 'Speech network service had a momentary pause. Try again or type manually.';
    }

    callbacks.onError?.(humanMsg, isPermission);
  };

  recognition.onend = () => {
    callbacks.onEnd?.();
  };

  try {
    recognition.start();
  } catch (err: any) {
    console.warn('[SPEECH RECOGNITION] Start failed:', err);
    callbacks.onError?.(err.message || 'Could not start voice recognition', false);
    callbacks.onEnd?.();
  }

  return {
    stop: () => {
      try {
        recognition.stop();
      } catch {}
    },
    abort: () => {
      try {
        recognition.abort();
      } catch {}
    }
  };
}

/**
 * Real Audio Recording Fallback using MediaRecorder.
 * Captures user speech directly from microphone hardware, creates an audio blob,
 * and calls /api/voice/transcribe-and-translate for 100% accurate transcription and translation.
 */
export class AudioVoiceRecorder {
  private mediaStream: MediaStream | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  public isRecording = false;

  async start(): Promise<boolean> {
    try {
      this.audioChunks = [];
      this.mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      const mimeTypes = ['audio/webm', 'audio/webm;codecs=opus', 'audio/mp4', 'audio/ogg;codecs=opus'];
      let selectedMime = '';
      for (const mime of mimeTypes) {
        if (MediaRecorder.isTypeSupported(mime)) {
          selectedMime = mime;
          break;
        }
      }

      this.mediaRecorder = selectedMime
        ? new MediaRecorder(this.mediaStream, { mimeType: selectedMime })
        : new MediaRecorder(this.mediaStream);

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(250); // collect slice every 250ms
      this.isRecording = true;
      return true;
    } catch (err) {
      console.error('[AUDIO RECORDER] Start failed:', err);
      this.stop();
      return false;
    }
  }

  stop(): Promise<{ audioBlob: Blob; audioBase64: string } | null> {
    return new Promise((resolve) => {
      if (!this.mediaRecorder || this.mediaRecorder.state === 'inactive') {
        this.cleanup();
        resolve(null);
        return;
      }

      this.mediaRecorder.onstop = async () => {
        const mimeType = this.mediaRecorder?.mimeType || 'audio/webm';
        const blob = new Blob(this.audioChunks, { type: mimeType });
        this.cleanup();

        try {
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onloadend = () => {
            const base64Data = (reader.result as string).split(',')[1] || '';
            resolve({ audioBlob: blob, audioBase64: base64Data });
          };
          reader.onerror = () => resolve(null);
        } catch {
          resolve(null);
        }
      };

      try {
        this.mediaRecorder.stop();
      } catch {
        this.cleanup();
        resolve(null);
      }
    });
  }

  private cleanup() {
    this.isRecording = false;
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }
    this.mediaRecorder = null;
    this.audioChunks = [];
  }
}

/**
 * Send audio or text to backend for transcription and translation into English
 */
export async function transcribeAndTranslateVoice(params: {
  audioBase64?: string;
  mimeType?: string;
  text?: string;
  targetLanguage?: 'en' | 'ur';
}): Promise<{ text: string; englishTranslation: string; detectedLanguage: string }> {
  try {
    const res = await fetch('/api/voice/transcribe-and-translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });

    if (!res.ok) {
      throw new Error(`Server returned ${res.status}`);
    }

    const data = await res.json();
    return {
      text: data.text || params.text || '',
      englishTranslation: data.englishTranslation || data.text || params.text || '',
      detectedLanguage: data.detectedLanguage || 'English'
    };
  } catch (err: any) {
    console.warn('[TRANSCRIBE/TRANSLATE] Call failed:', err);
    return {
      text: params.text || '',
      englishTranslation: params.text || '',
      detectedLanguage: 'Unknown'
    };
  }
}

/**
 * Translate arbitrary text to English (or Urdu)
 */
export async function translateText(
  text: string,
  targetLanguage: 'en' | 'ur' = 'en'
): Promise<string> {
  if (!text || !text.trim()) return '';

  try {
    const res = await fetch('/api/voice/translate-text', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, targetLanguage })
    });

    if (!res.ok) return text;

    const data = await res.json();
    return data.translatedText || text;
  } catch (err) {
    console.warn('[TRANSLATE TEXT] Failed:', err);
    return text;
  }
}

/**
 * Text-to-speech speaker
 */
export function speakText(text: string, lang = 'en-US'): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

  try {
    window.speechSynthesis.cancel();
    const clean = text
      .replace(/[#*`_~]/g, '')
      .replace(/\[.*?\]\(.*?\)/g, '')
      .slice(0, 350);

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.lang = lang;
    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.warn('[TTS] Synthesis error:', err);
  }
}

export function stopSpeaking(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}
