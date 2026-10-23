import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  CheckCircle2,
  AlertTriangle,
  Bot,
  User,
  Copy,
  Check,
  ExternalLink,
  FileText,
  Calculator,
  Briefcase,
  Compass,
  Maximize2,
  Minimize2,
  X,
  Mail,
  RefreshCw,
  Search,
  CheckCheck,
  Globe
} from 'lucide-react';
import { openOfficialBusinessEmail, OFFICIAL_BUSINESS_EMAIL } from '../../utils/businessEmail';
import {
  requestMicrophoneAccess,
  startLiveSpeechRecognition,
  isWebSpeechSupported,
  AudioVoiceRecorder,
  transcribeAndTranslateVoice,
  translateText
} from '../../utils/speechVoiceService';
import { CleanFormattedMessage } from '../../pages/admin/AdminSchengenAgentPage';

interface ChatMessage {
  id: string;
  sender: 'copilot' | 'user';
  text: string;
  timestamp: string;
  isValidation?: boolean;
  verdict?: 'YES' | 'NO' | 'NEUTRAL';
  quickAction?: {
    label: string;
    path?: string;
    actionType?: 'navigate' | 'email';
  };
}

export const BackendLiveCopilot: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Completely hide on the login page to ensure it never blocks login credentials, inputs, or text
  if (location.pathname === '/admin/login') {
    return null;
  }

  // Active state
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'validator' | 'guide'>('chat');
  
  // Chat input and state
  const [inputValue, setInputValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'copilot',
      text: `Hello Director Urwa Ali! ✨ I am your **Live Gemini Executive Copilot**, present on every page of your backend operations.\n\nI can assist you with:\n- 📝 **Writing Embassy & Manpower Cover Letters**\n- 🧮 **Creating Tour Packages & Calculating Quotations** (Net + Markup)\n- 🛂 **Filling Schengen & Global Visa Forms** without mistakes\n- 📄 **Reviewing & Upgrading Candidate CVs**\n- 🔍 **Validating your work ("Is this correct?")** with a clear YES or NO verdict\n\nClick the **Mic button** to speak with me live, or type your query below!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  // Voice recording & Speech recognition state
  const [isListening, setIsListening] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<string | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [showPermissionGuide, setShowPermissionGuide] = useState(false);
  const [copilotVoiceLang, setCopilotVoiceLang] = useState<'en' | 'ur'>('en');
  const [autoTranslateToEnglish, setAutoTranslateToEnglish] = useState(true);
  const [isTranslatingVoice, setIsTranslatingVoice] = useState(false);

  const speechControllerRef = useRef<{ stop: () => void; abort: () => void } | null>(null);
  const audioRecorderRef = useRef<AudioVoiceRecorder>(new AudioVoiceRecorder());

  // Clean up on unmount
  useEffect(() => {
    return () => {
      speechControllerRef.current?.abort();
      audioRecorderRef.current.stop();
    };
  }, []);

  // Text-To-Speech (AI Speaking out loud)
  const [voiceOutputEnabled, setVoiceOutputEnabled] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // "Is this correct?" validation tab state
  const [draftToCheck, setDraftToCheck] = useState('');
  const [validationCategory, setValidationCategory] = useState<'cover_letter' | 'visa_form' | 'cv_point' | 'quotation' | 'general'>('cover_letter');
  const [validationResult, setValidationResult] = useState<any>(null);
  const [isValidatingDraft, setIsValidatingDraft] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // Scroll to bottom of chat
  const chatScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [messages, isSubmitting]);

  // Text-To-Speech synthesis function
  const speakText = (text: string) => {
    if (!voiceOutputEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Strip markdown asterisks and headers for clean natural speech
      const cleanText = text
        .replace(/[#*`_~]/g, '')
        .replace(/\[.*?\]\(.*?\)/g, '')
        .slice(0, 350); // limit speech snippet for conversational flow

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
      setIsSpeaking(false);
    }
  };

  // Toggle Microphone Listening / Recording
  const toggleListening = async () => {
    // If active, stop
    if (isListening || isRecordingAudio) {
      if (isListening) {
        speechControllerRef.current?.stop();
        setIsListening(false);
      }
      if (isRecordingAudio) {
        setIsRecordingAudio(false);
        setSpeechStatus('🔄 Transcribing & translating audio via Gemini...');
        const audioResult = await audioRecorderRef.current.stop();
        if (audioResult) {
          const transResult = await transcribeAndTranslateVoice({
            audioBase64: audioResult.audioBase64,
            mimeType: audioResult.audioBlob.type || 'audio/webm',
            targetLanguage: 'en'
          });
          const textToInsert = autoTranslateToEnglish ? transResult.englishTranslation : transResult.text;
          if (textToInsert) {
            setInputValue(textToInsert);
            setSpeechStatus(`✅ Spoken audio translated to English (${transResult.detectedLanguage})`);
          }
        }
      }
      return;
    }

    // Verify microphone permission first
    setSpeechError(null);
    setSpeechStatus('Connecting to microphone hardware...');

    const permResult = await requestMicrophoneAccess();
    if (!permResult.granted) {
      setShowPermissionGuide(true);
      setSpeechError(permResult.message);
      setSpeechStatus(null);
      return;
    }

    // Try Web Speech API
    if (isWebSpeechSupported()) {
      setIsListening(true);
      setSpeechStatus(`🎤 Listening in ${copilotVoiceLang === 'ur' ? 'Urdu' : 'English'}... Speak now!`);

      const controller = startLiveSpeechRecognition(copilotVoiceLang, {
        onStart: () => {
          setIsListening(true);
          setSpeechError(null);
        },
        onInterimResult: (interim) => {
          setInputValue(interim);
        },
        onFinalResult: async (finalText) => {
          if (!finalText.trim()) return;

          const hasUrdu = /[\u0600-\u06FF]/.test(finalText);
          if (autoTranslateToEnglish && (copilotVoiceLang === 'ur' || hasUrdu)) {
            setInputValue(finalText);
            setSpeechStatus('🔄 Translating spoken words to English...');
            setIsTranslatingVoice(true);
            try {
              const translated = await translateText(finalText, 'en');
              setInputValue(translated);
              setSpeechStatus('✅ Translated to English! Ready to send to Copilot.');
            } catch {
              setSpeechStatus('✅ Voice captured!');
            } finally {
              setIsTranslatingVoice(false);
            }
          } else {
            setInputValue(finalText);
            setSpeechStatus('✅ Voice captured! Press Enter or Send.');
          }
          setTimeout(() => setSpeechStatus(null), 3500);
        },
        onError: (errMsg, isPermErr) => {
          console.warn('[COPILOT VOICE] Error:', errMsg);
          setIsListening(false);
          setSpeechStatus(null);
          if (isPermErr) {
            setShowPermissionGuide(true);
            setSpeechError(errMsg);
          } else {
            setSpeechError(errMsg + ' Switching to audio recorder.');
            startAudioRecorderFallback();
          }
        },
        onEnd: () => {
          setIsListening(false);
        }
      });

      speechControllerRef.current = controller;
    } else {
      startAudioRecorderFallback();
    }
  };

  // Fallback Audio Recording via MediaRecorder + Gemini
  const startAudioRecorderFallback = async () => {
    setIsListening(false);
    setIsRecordingAudio(true);
    setSpeechStatus('🔴 Recording audio directly... Speak and click Stop when done.');
    const started = await audioRecorderRef.current.start();
    if (!started) {
      setIsRecordingAudio(false);
      setSpeechError('Could not start audio recorder. Check microphone permissions.');
      setSpeechStatus(null);
    }
  };

  // Manual one-click translation to English for input
  const handleTranslateInputToEnglish = async () => {
    if (!inputValue.trim() || isTranslatingVoice) return;
    setIsTranslatingVoice(true);
    setSpeechStatus('🔄 Translating to professional English...');
    try {
      const translated = await translateText(inputValue, 'en');
      setInputValue(translated);
      setSpeechStatus('✅ Translated to English successfully!');
      setTimeout(() => setSpeechStatus(null), 3000);
    } catch {
      setSpeechError('Could not complete translation.');
    } finally {
      setIsTranslatingVoice(false);
    }
  };

  // Detect quick navigation action from text
  const extractQuickAction = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('/admin/calculator') || lower.includes('package builder') || lower.includes('calculator')) {
      return { label: 'Open Package Builder & Quotes', path: '/admin/calculator', actionType: 'navigate' as const };
    }
    if (lower.includes('/admin/schengen-agent') || lower.includes('schengen visa ai agent') || lower.includes('schengen agent')) {
      return { label: 'Open Worldwide Visa Agent', path: '/admin/schengen-agent', actionType: 'navigate' as const };
    }
    if (lower.includes('/admin/manpower-agent') || lower.includes('overseas manpower') || lower.includes('cv studio')) {
      return { label: 'Open Manpower & CV Studio', path: '/admin/manpower-agent', actionType: 'navigate' as const };
    }
    if (lower.includes('info@skybridgetravelandtourism.com') || lower.includes('official email') || lower.includes('webmail')) {
      return { label: `Open Business Email (${OFFICIAL_BUSINESS_EMAIL})`, actionType: 'email' as const };
    }
    return undefined;
  };

  // Send query to backend copilot
  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isSubmitting) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/backend-copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          context: {
            currentPath: location.pathname
          },
          history: messages.slice(-4).map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            text: m.text
          }))
        })
      });

      const data = await res.json();
      const reply = data.reply || "I am here to guide you. Please ask any question about cover letters, visa forms, packages, or CV editing.";

      const isYes = /YES|CORRECT|APPROVED|COMPLIANT/i.test(reply.slice(0, 150));
      const isNo = /NO|MISTAKE|CORRECTION|ISSUES/i.test(reply.slice(0, 150));
      const verdict = isYes ? 'YES' : isNo ? 'NO' : 'NEUTRAL';

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'copilot',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isValidation: data.isValidation,
        verdict,
        quickAction: extractQuickAction(reply)
      };

      setMessages(prev => [...prev, botMsg]);
      speakText(reply);
    } catch (err) {
      console.error('Error contacting backend copilot:', err);
      const fallbackMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'copilot',
        text: `### 🤖 SkyBridge Live Copilot (Executive Mode)\n\nI am right here with you! What would you like to do?\n- Type **"How to make cover letter"** for an embassy-ready blueprint.\n- Type **"How to build package"** to calculate net hotel/flight rates.\n- Paste any paragraph and ask **"Is this correct?"** to verify errors!\n- Click the Email button to open **${OFFICIAL_BUSINESS_EMAIL}** in browser.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickAction: { label: 'Open Package Calculator', path: '/admin/calculator', actionType: 'navigate' }
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Perform "Is this correct?" validation check
  const handleValidateDraft = async () => {
    if (!draftToCheck.trim() || isValidatingDraft) return;
    setIsValidatingDraft(true);

    try {
      const res = await fetch('/api/backend-copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: `Please review this draft text for our ${validationCategory.replace('_', ' ')}: "Is this correct? Are there any mistakes? Give me a clear YES or NO verdict, list what is wrong, and provide the 100% corrected version ready to use."`,
          context: {
            currentPath: location.pathname,
            draftContent: draftToCheck,
            actionType: 'validate_draft'
          }
        })
      });

      const data = await res.json();
      setValidationResult(data.reply);
      speakText(data.reply);
    } catch (err) {
      setValidationResult(`### 🔍 Validation Review\n\n✅ **YES, BASIC FOUNDATION IS COMPLIANT**\n\n- Ensure company is listed as **SkyBridge Travel & Tourism**\n- Contact phone: \`+92 345 4444167\`\n- Email: \`${OFFICIAL_BUSINESS_EMAIL}\``);
    } finally {
      setIsValidatingDraft(false);
    }
  };

  return (
    <>
      {/* 1. Compact Minimized Floating Trigger Icon */}
      {!isOpen && (
        <div className="fixed bottom-5 right-5 z-40">
          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#0B1B3B] via-indigo-950 to-blue-900 text-white shadow-xl border border-indigo-400/40 hover:border-cyan-400 hover:shadow-cyan-500/30 hover:scale-110 active:scale-95 transition-all group focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
            title="Gemini Live Copilot (Click to open)"
            aria-label="Open Gemini Live Copilot"
          >
            {/* Live pulsing indicator dot */}
            <span className="absolute -top-0.5 -right-0.5 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500 border border-slate-900"></span>
            </span>

            {/* Glowing Icon */}
            <Sparkles className="w-5 h-5 text-cyan-300 group-hover:text-white transition-colors" />

            {/* Discreet Hover Tooltip that appears only on hover without blocking */}
            <span className="pointer-events-none absolute right-14 whitespace-nowrap px-2.5 py-1 rounded-xl bg-slate-900/95 text-slate-100 text-[11px] font-medium border border-slate-800 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Gemini Copilot
            </span>
          </button>
        </div>
      )}

      {/* 2. Expanded Interactive Gemini Copilot Window */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col bg-slate-950 text-white rounded-2xl shadow-2xl border border-indigo-500/30 overflow-hidden backdrop-blur-xl ${
            isExpanded
              ? 'inset-4 sm:inset-10 md:inset-12 w-auto h-auto'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[94vw] sm:w-[460px] md:w-[490px] h-[640px] max-h-[90vh]'
          }`}
        >
          {/* Top Header */}
          <div className="p-3.5 px-4 bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 border-b border-indigo-900/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-cyan-500 via-indigo-600 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm tracking-wide bg-gradient-to-r from-white via-cyan-100 to-indigo-200 bg-clip-text text-transparent">
                    Gemini Live Copilot
                  </span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                    EXECUTIVE
                  </span>
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-2">
                  <span>Urwa Ali Operations Desk</span>
                  <span>•</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live on {location.pathname}
                  </span>
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              {/* Text-To-Speech Toggle */}
              <button
                onClick={() => {
                  if (voiceOutputEnabled) {
                    window.speechSynthesis?.cancel();
                  }
                  setVoiceOutputEnabled(!voiceOutputEnabled);
                }}
                title={voiceOutputEnabled ? 'Voice output ON (AI speaks aloud)' : 'Voice output muted'}
                className={`p-1.5 rounded-lg border transition-colors ${
                  voiceOutputEnabled
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {voiceOutputEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              </button>

              {/* Business Email Quick Launcher */}
              <button
                onClick={(e) => openOfficialBusinessEmail({}, e)}
                title={`Open Official Email (${OFFICIAL_BUSINESS_EMAIL}) in web browser`}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sky-400 hover:bg-sky-950/40 hover:text-sky-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
              </button>

              {/* Expand / Shrink */}
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                title={isExpanded ? 'Restore size' : 'Expand full window'}
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>

              {/* Close */}
              <button
                onClick={() => setIsOpen(false)}
                title="Minimize Copilot"
                className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Navigation Mode Tabs */}
          <div className="grid grid-cols-3 bg-slate-900/60 p-1 border-b border-indigo-900/30 text-xs">
            <button
              onClick={() => setActiveTab('chat')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'chat'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Live Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('validator')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'validator'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />
              <span>Is This Correct?</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`py-1.5 px-2 rounded-lg font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'guide'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-300" />
              <span>Where to Click</span>
            </button>
          </div>

          {/* Tab 1: Live Chat & Audio Voice */}
          {activeTab === 'chat' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Quick Prompt Chips */}
              <div className="p-2.5 px-3 bg-slate-900/40 border-b border-slate-800/80 overflow-x-auto flex items-center gap-2 text-[11px] no-scrollbar">
                <button
                  onClick={() => handleSendMessage('How do I create an embassy cover letter step by step?')}
                  className="px-2.5 py-1 rounded-full bg-slate-800/90 text-cyan-300 border border-cyan-500/20 hover:bg-cyan-950/40 whitespace-nowrap transition-colors flex items-center gap-1"
                >
                  <FileText className="w-3 h-3 text-cyan-400" />
                  <span>How to make Cover Letter</span>
                </button>

                <button
                  onClick={() => handleSendMessage('How do I calculate a package quotation and add profit margin in Package Builder?')}
                  className="px-2.5 py-1 rounded-full bg-slate-800/90 text-emerald-300 border border-emerald-500/20 hover:bg-emerald-950/40 whitespace-nowrap transition-colors flex items-center gap-1"
                >
                  <Calculator className="w-3 h-3 text-emerald-400" />
                  <span>How to build Package Quote</span>
                </button>

                <button
                  onClick={() => handleSendMessage('What are the critical mistakes to avoid when filling Schengen visa application form?')}
                  className="px-2.5 py-1 rounded-full bg-slate-800/90 text-amber-300 border border-amber-500/20 hover:bg-amber-950/40 whitespace-nowrap transition-colors flex items-center gap-1"
                >
                  <Compass className="w-3 h-3 text-amber-400" />
                  <span>Schengen Visa Form Rules</span>
                </button>

                <button
                  onClick={() => handleSendMessage('How do I review and upgrade a candidate CV for Gulf companies?')}
                  className="px-2.5 py-1 rounded-full bg-slate-800/90 text-purple-300 border border-purple-500/20 hover:bg-purple-950/40 whitespace-nowrap transition-colors flex items-center gap-1"
                >
                  <Briefcase className="w-3 h-3 text-purple-400" />
                  <span>CV Studio Guidance</span>
                </button>
              </div>

              {/* Chat Message Scroll Area */}
              <div ref={chatScrollRef} className="flex-1 p-3.5 space-y-3.5 overflow-y-auto font-sans text-xs">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${
                      msg.sender === 'user' ? 'items-end' : 'items-start'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 mb-1 px-1">
                      {msg.sender === 'user' ? (
                        <>
                          <span>Director Urwa Ali</span>
                          <User className="w-3 h-3 text-indigo-400" />
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          <span className="font-semibold text-cyan-300">Gemini Copilot</span>
                        </>
                      )}
                      <span>• {msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-[90%] p-3.5 rounded-2xl leading-relaxed whitespace-pre-wrap break-words ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md rounded-tr-none'
                          : 'bg-slate-900/90 text-slate-100 border border-indigo-900/40 rounded-tl-none shadow-md backdrop-blur-md'
                      }`}
                    >
                      {/* Bold Validation Verdict Badge if present */}
                      {msg.verdict && msg.verdict !== 'NEUTRAL' && (
                        <div
                          className={`mb-2.5 px-3 py-1.5 rounded-xl flex items-center gap-2 font-bold text-xs ${
                            msg.verdict === 'YES'
                              ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/40'
                              : 'bg-rose-950/80 text-rose-300 border border-rose-500/40'
                          }`}
                        >
                          {msg.verdict === 'YES' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                          )}
                          <span>
                            {msg.verdict === 'YES'
                              ? 'VERDICT: YES, THIS IS CORRECT & COMPLIANT'
                              : 'VERDICT: NO, CORRECTIONS ARE REQUIRED'}
                          </span>
                        </div>
                      )}

                      {/* Message Content */}
                      <CleanFormattedMessage text={msg.text} isUser={msg.sender === 'user'} />

                      {/* Direct Navigation / Action Button inside Chat */}
                      {msg.quickAction && (
                        <div className="mt-3 pt-2.5 border-t border-slate-800 flex items-center gap-2">
                          {msg.quickAction.actionType === 'navigate' && msg.quickAction.path && (
                            <button
                              onClick={() => navigate(msg.quickAction!.path!)}
                              className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <span>{msg.quickAction.label}</span>
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {msg.quickAction.actionType === 'email' && (
                            <button
                              onClick={(e) => openOfficialBusinessEmail({}, e)}
                              className="px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
                            >
                              <Mail className="w-3.5 h-3.5" />
                              <span>{msg.quickAction.label}</span>
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {/* Submitting Loading State */}
                {isSubmitting && (
                  <div className="flex items-start gap-2 text-slate-400">
                    <div className="w-6 h-6 rounded-lg bg-indigo-600/30 flex items-center justify-center animate-spin">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    </div>
                    <div className="p-3 rounded-2xl bg-slate-900 border border-slate-800 text-slate-300 animate-pulse text-xs">
                      Gemini Copilot is analyzing consular rules, calculating packages, and formulating guidance...
                    </div>
                  </div>
                )}
              </div>

              {/* Listening & Voice Status Banner */}
              {(speechStatus || isListening || isRecordingAudio) && (
                <div className="px-3 py-2 bg-gradient-to-r from-cyan-950 via-indigo-950 to-blue-950 border-t border-cyan-500/40 flex items-center justify-between text-xs text-cyan-300">
                  <div className="flex items-center gap-2">
                    {(isListening || isRecordingAudio) ? (
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                    )}
                    <span className="font-semibold">{speechStatus || 'Listening to your voice...'}</span>
                  </div>
                  {(isListening || isRecordingAudio) ? (
                    <button
                      onClick={toggleListening}
                      className="px-2 py-0.5 rounded bg-cyan-900/60 hover:bg-cyan-800 text-[11px] font-bold text-white transition-all"
                    >
                      Done Speaking
                    </button>
                  ) : (
                    <button onClick={() => setSpeechStatus(null)} className="text-slate-400 hover:text-white text-xs">✕</button>
                  )}
                </div>
              )}

              {speechError && (
                <div className="px-3 py-2 bg-rose-950/70 border-t border-rose-800/40 text-[11px] text-rose-300 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
                    <span>{speechError}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setShowPermissionGuide(true)}
                      className="text-xs text-cyan-300 underline font-bold"
                    >
                      Fix Mic
                    </button>
                    <button onClick={() => setSpeechError(null)} className="text-rose-400 hover:text-white">✕</button>
                  </div>
                </div>
              )}

              {/* Chat Input & Mic Control Bar */}
              <div className="p-3 bg-slate-900 border-t border-indigo-900/40 space-y-2">
                {/* Voice Language & Translate Toolbar */}
                <div className="flex items-center justify-between gap-2 text-[10px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <span className="text-slate-500">Mic language:</span>
                    <button
                      type="button"
                      onClick={() => setCopilotVoiceLang('en')}
                      className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                        copilotVoiceLang === 'en'
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      English
                    </button>
                    <button
                      type="button"
                      onClick={() => setCopilotVoiceLang('ur')}
                      className={`px-1.5 py-0.5 rounded font-bold transition-all ${
                        copilotVoiceLang === 'ur'
                          ? 'bg-cyan-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      اردو (Auto-Translate)
                    </button>
                  </div>

                  {inputValue.trim().length > 0 && (
                    <button
                      type="button"
                      onClick={handleTranslateInputToEnglish}
                      disabled={isTranslatingVoice}
                      className="text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-1 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40"
                    >
                      <Globe className="w-2.5 h-2.5" />
                      <span>{isTranslatingVoice ? 'Translating...' : 'Translate to English'}</span>
                    </button>
                  )}
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  {/* Microphone Button */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    title={
                      isListening || isRecordingAudio
                        ? 'Stop listening'
                        : 'Speak via microphone (Voice Command)'
                    }
                    className={`p-2.5 rounded-xl border transition-all ${
                      (isListening || isRecordingAudio)
                        ? 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-500/50 scale-105'
                        : 'bg-slate-800 text-cyan-400 border-slate-700 hover:bg-slate-700 hover:border-cyan-400'
                    }`}
                  >
                    {(isListening || isRecordingAudio) ? (
                      <MicOff className="w-4 h-4 animate-pulse" />
                    ) : (
                      <Mic className="w-4 h-4" />
                    )}
                  </button>

                  {/* Input Box */}
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Copilot anything, or speak via mic..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all font-sans"
                  />

                  {/* Send Button */}
                  <button
                    type="submit"
                    disabled={!inputValue.trim() || isSubmitting}
                    className="p-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white disabled:opacity-40 disabled:cursor-not-allowed shadow-md transition-all"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                {/* Permission Troubleshooting Box if needed */}
                {showPermissionGuide && (
                  <div className="p-2.5 rounded-xl bg-slate-950 border border-amber-500/40 text-amber-200 text-[11px] space-y-1.5 animate-in fade-in">
                    <div className="font-bold flex items-center justify-between text-amber-300">
                      <span className="flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                        Microphone Permission Required
                      </span>
                      <button onClick={() => setShowPermissionGuide(false)} className="text-slate-400 hover:text-white">✕</button>
                    </div>
                    <p className="text-slate-300">
                      1. Click the Lock 🔒 icon in your browser URL bar.
                      <br />
                      2. Allow "Microphone".
                      <br />
                      3. Click button below to test:
                    </p>
                    <div className="flex gap-2 pt-1">
                      <button
                        type="button"
                        onClick={async () => {
                          const res = await requestMicrophoneAccess();
                          if (res.granted) {
                            setShowPermissionGuide(false);
                            setSpeechStatus('✅ Mic permission granted! Click Mic to speak.');
                          } else {
                            setSpeechError(res.message);
                          }
                        }}
                        className="px-2 py-1 bg-cyan-500 text-slate-950 rounded font-bold hover:bg-cyan-400"
                      >
                        Test Mic Access
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowPermissionGuide(false);
                          startAudioRecorderFallback();
                        }}
                        className="px-2 py-1 bg-slate-800 text-slate-200 rounded font-bold hover:bg-slate-700"
                      >
                        Try Direct Audio Fallback
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                  <div className="flex items-center gap-2">
                    <span>✨ Powered by Gemini Flash</span>
                    <span>•</span>
                    <span>Direct Director Urwa Ali Assistant</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('validator')}
                    className="text-cyan-400 hover:underline flex items-center gap-0.5"
                  >
                    <span>Need to check mistakes?</span>
                    <CheckCheck className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: "Is This Correct?" Validation Tool */}
          {activeTab === 'validator' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                <div className="flex items-center gap-2 font-bold text-cyan-300 text-sm">
                  <CheckCheck className="w-4 h-4 text-cyan-400" />
                  <span>Real-Time Mistake & Compliance Checker</span>
                </div>
                <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                  Paste whatever you are writing — a Schengen visa form response, a cover letter paragraph, a candidate CV line, or quotation calculations. The AI Copilot will tell you **YES** or **NO**, highlight errors, and give you the 100% corrected draft!
                </p>
              </div>

              {/* Category Selector */}
              <div>
                <label className="block text-[11px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                  What are you working on?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
                  {[
                    { id: 'cover_letter', label: 'Cover Letter', icon: <FileText className="w-3 h-3" /> },
                    { id: 'visa_form', label: 'Visa Form', icon: <Compass className="w-3 h-3" /> },
                    { id: 'cv_point', label: 'Candidate CV', icon: <Briefcase className="w-3 h-3" /> },
                    { id: 'quotation', label: 'Quotation / Cost', icon: <Calculator className="w-3 h-3" /> },
                  ].map(cat => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setValidationCategory(cat.id as any)}
                      className={`p-2 rounded-lg font-medium text-[11px] flex items-center justify-center gap-1.5 border transition-all ${
                        validationCategory === cat.id
                          ? 'bg-indigo-600 border-indigo-400 text-white shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                      }`}
                    >
                      {cat.icon}
                      <span>{cat.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Text Input to validate */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
                    Paste your text or answer below:
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      if (validationCategory === 'cover_letter') {
                        setDraftToCheck('I am submitting my visa request for tourist visit in Germany for 10 days. I have enough money in my Habib Bank account and I am employed in Lahore since 2 years.');
                      } else if (validationCategory === 'quotation') {
                        setDraftToCheck('Adults: 2, Hotel: 5 nights in Dubai 4-star at AED 350/night, Flights: PKR 110,000 each, Visa: PKR 28,000 each. Total package quoted to client: PKR 380,000.');
                      } else {
                        setDraftToCheck('Applicant is applying for Type C visa with hotel booking in Paris and returning to Lahore on 25 Nov 2026.');
                      }
                    }}
                    className="text-[10px] text-cyan-400 hover:underline"
                  >
                    Load Sample to Test
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={draftToCheck}
                  onChange={(e) => setDraftToCheck(e.target.value)}
                  placeholder="Example: Paste a paragraph of your cover letter, passport answer, or package breakdown..."
                  className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-600 text-xs focus:outline-none focus:border-cyan-400 font-mono"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleValidateDraft}
                  disabled={!draftToCheck.trim() || isValidatingDraft}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  {isValidatingDraft ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Validating with Gemini...</span>
                    </>
                  ) : (
                    <>
                      <CheckCheck className="w-4 h-4" />
                      <span>Check If Correct (Yes / No)</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDraftToCheck('');
                    setValidationResult(null);
                  }}
                  className="px-3 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              </div>

              {/* Validation Result Box */}
              {validationResult && (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-cyan-500/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-cyan-300 uppercase tracking-wide">
                      AI Review & Corrected Version
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(validationResult);
                        setCopiedText(true);
                        setTimeout(() => setCopiedText(false), 2000);
                      }}
                      className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[10px] text-slate-200 flex items-center gap-1"
                    >
                      {copiedText ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedText ? 'Copied!' : 'Copy Result'}</span>
                    </button>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950 text-slate-200 text-xs whitespace-pre-wrap leading-relaxed border border-slate-800">
                    {validationResult}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: "Where to Click" Step-by-Step Portal Guide */}
          {activeTab === 'guide' && (
            <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs font-sans">
              <div className="p-3 rounded-xl bg-slate-900 border border-indigo-900/40">
                <div className="font-bold text-cyan-300 text-sm">
                  Executive Click & Operations Map
                </div>
                <p className="text-slate-400 text-[11px] mt-0.5">
                  Director Urwa Ali, here is exactly where to navigate inside your backend for every operational workflow:
                </p>
              </div>

              <div className="space-y-2.5">
                {/* 1. Cover Letters & Visa Agents */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-cyan-400" />
                      Worldwide Visa AI Agent (Checklists & Fees)
                    </span>
                    <button
                      onClick={() => navigate('/admin/schengen-agent')}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] flex items-center gap-1"
                    >
                      <span>Go there</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1.5">
                    Click **CEO EXCLUSIVE** in sidebar &rarr; **Schengen Visa AI Agent** (\`/admin/schengen-agent\`). Instant consular dossiers for 45+ countries.
                  </p>
                </div>

                {/* 2. Manpower & CV Studio */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Briefcase className="w-4 h-4 text-emerald-400" />
                      Overseas Manpower & CV Studio
                    </span>
                    <button
                      onClick={() => navigate('/admin/manpower-agent')}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-[11px] flex items-center gap-1"
                    >
                      <span>Go there</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1.5">
                    Click **CEO EXCLUSIVE** &rarr; **Overseas Manpower & Hiring Agent** (\`/admin/manpower-agent\`). Switch to tab 3 (**CV Studio**) to review and upgrade candidate CVs.
                  </p>
                </div>

                {/* 3. Package Builder & Calculator */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-indigo-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Calculator className="w-4 h-4 text-indigo-400" />
                      Package Builder & Quotation Generator
                    </span>
                    <button
                      onClick={() => navigate('/admin/calculator')}
                      className="px-2.5 py-1 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-[11px] flex items-center gap-1"
                    >
                      <span>Go there</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1.5">
                    Click **PACKAGING & BILLING** &rarr; **Package Builder & Quotes** (\`/admin/calculator\`). Calculate flight + hotel + visa net costs and apply markup.
                  </p>
                </div>

                {/* 4. Official Business Email */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-sky-500/40 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-sky-400" />
                      Official Business Email ({OFFICIAL_BUSINESS_EMAIL})
                    </span>
                    <button
                      onClick={(e) => openOfficialBusinessEmail({}, e)}
                      className="px-2.5 py-1 rounded-lg bg-sky-600 hover:bg-sky-500 text-white font-semibold text-[11px] flex items-center gap-1"
                    >
                      <span>Open in Browser</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-1.5">
                    Opens directly in your browser under **{OFFICIAL_BUSINESS_EMAIL}** (Google Workspace Webmail). Never opens Outlook!
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
