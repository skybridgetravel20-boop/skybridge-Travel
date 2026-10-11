import React, { useState, useEffect, useRef } from 'react';
import {
  Compass,
  Sparkles,
  Search,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Copy,
  Check,
  Globe2,
  ShieldCheck,
  Clock,
  ArrowRight,
  Send,
  Building2,
  Calendar,
  Lock,
  MessageSquare,
  HelpCircle,
  Download,
  Mic,
  MicOff,
  Volume2,
  Globe,
  Languages,
  DollarSign,
  MapPin,
  RefreshCw
} from 'lucide-react';
import {
  WORLDWIDE_VISA_COUNTRIES,
  WorldwideCountryVisaData,
  findWorldwideCountry,
  getCountriesByRegion,
  getCountryOfficialApplyUrl,
  getCountryVisaFormPdfUrl
} from '../../data/worldwideVisaData';
import { COMPANY_INFO, OFFICIAL_DIRECTOR_SIGNATURE_TEXT } from '../../data/companyInfo';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';
import {
  requestMicrophoneAccess,
  startLiveSpeechRecognition,
  isWebSpeechSupported,
  AudioVoiceRecorder,
  transcribeAndTranslateVoice,
  translateText,
  speakText,
  stopSpeaking
} from '../../utils/speechVoiceService';

export const AdminSchengenAgentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agent' | 'directory' | 'dossier'>('agent');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<WorldwideCountryVisaData>(
    WORLDWIDE_VISA_COUNTRIES.find(c => c.id === 'uae-dubai') || WORLDWIDE_VISA_COUNTRIES[0]
  );

  // Language state: English by default as strictly requested!
  const [agentLanguage, setAgentLanguage] = useState<'en' | 'ur'>('en');

  // AI Agent Conversation State
  const [promptInput, setPromptInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  // Speech Recognition & Microphone Voice State
  const [isListening, setIsListening] = useState(false);
  const [isRecordingAudio, setIsRecordingAudio] = useState(false);
  const [speechStatus, setSpeechStatus] = useState<string | null>(null);
  const [speechError, setSpeechError] = useState<string | null>(null);
  const [micPermissionGranted, setMicPermissionGranted] = useState<boolean | null>(null);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [spokenLanguage, setSpokenLanguage] = useState<'en' | 'ur'>('en');
  const [autoTranslateToEnglish, setAutoTranslateToEnglish] = useState(true);
  const [isTranslating, setIsTranslating] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);

  const speechControllerRef = useRef<{ stop: () => void; abort: () => void } | null>(null);
  const audioRecorderRef = useRef<AudioVoiceRecorder>(new AudioVoiceRecorder());
  const timerRef = useRef<any>(null);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      speechControllerRef.current?.abort();
      audioRecorderRef.current.stop();
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Timer for audio recording
  useEffect(() => {
    if (isListening || isRecordingAudio) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds(s => s + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      setRecordingSeconds(0);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isListening, isRecordingAudio]);

  // Request & check microphone access explicitly
  const handleCheckMicPermission = async () => {
    setSpeechError(null);
    setSpeechStatus('Testing microphone hardware access...');
    const result = await requestMicrophoneAccess();
    if (result.granted) {
      setMicPermissionGranted(true);
      setShowPermissionModal(false);
      setSpeechStatus('✅ Microphone access verified and ready! Click the Mic button to speak.');
      setTimeout(() => setSpeechStatus(null), 3500);
      return true;
    } else {
      setMicPermissionGranted(false);
      setShowPermissionModal(true);
      setSpeechError(result.message);
      setSpeechStatus(null);
      return false;
    }
  };

  // Toggle Microphone Listening / Recording
  const toggleListening = async () => {
    // If active, stop listening
    if (isListening || isRecordingAudio) {
      if (isListening) {
        speechControllerRef.current?.stop();
        setIsListening(false);
      }
      if (isRecordingAudio) {
        setIsRecordingAudio(false);
        setSpeechStatus('🔄 Processing voice audio & translating to English via Gemini...');
        const audioResult = await audioRecorderRef.current.stop();
        if (audioResult) {
          const transResult = await transcribeAndTranslateVoice({
            audioBase64: audioResult.audioBase64,
            mimeType: audioResult.audioBlob.type || 'audio/webm',
            targetLanguage: 'en'
          });
          const textToInsert = autoTranslateToEnglish ? transResult.englishTranslation : transResult.text;
          if (textToInsert) {
            setPromptInput(textToInsert);
            setSpeechStatus(`✅ Speech captured & translated to English (${transResult.detectedLanguage})`);
          } else {
            setSpeechStatus('Could not transcribe audio. You can type your question.');
          }
        }
      }
      return;
    }

    // Starting new session: Verify microphone permission first
    setSpeechError(null);
    setSpeechStatus('Connecting to microphone...');

    const permResult = await requestMicrophoneAccess();
    if (!permResult.granted) {
      setMicPermissionGranted(false);
      setShowPermissionModal(true);
      setSpeechError(permResult.message);
      setSpeechStatus(null);
      return;
    }

    setMicPermissionGranted(true);

    // If browser supports Web Speech API, use live streaming speech recognition
    if (isWebSpeechSupported()) {
      setIsListening(true);
      setSpeechStatus(`🎤 Listening now in ${spokenLanguage === 'ur' ? 'Urdu (اردو)' : 'English'}... Speak clearly!`);

      const controller = startLiveSpeechRecognition(spokenLanguage, {
        onStart: () => {
          setIsListening(true);
          setSpeechError(null);
        },
        onInterimResult: (interim) => {
          setPromptInput(interim);
        },
        onFinalResult: async (finalText) => {
          if (!finalText.trim()) return;

          // If autoTranslateToEnglish is active AND (spoken language was Urdu OR text contains Urdu characters)
          const hasUrduChars = /[\u0600-\u06FF]/.test(finalText);
          if (autoTranslateToEnglish && (spokenLanguage === 'ur' || hasUrduChars)) {
            setPromptInput(finalText);
            setSpeechStatus('🔄 Translating spoken words to professional English...');
            setIsTranslating(true);
            try {
              const translated = await translateText(finalText, 'en');
              setPromptInput(translated);
              setSpeechStatus('✅ Spoken words translated to English! Ready to ask agent.');
            } catch {
              setSpeechStatus('✅ Speech captured.');
            } finally {
              setIsTranslating(false);
            }
          } else {
            setPromptInput(finalText);
            setSpeechStatus('✅ Voice captured! Click "Ask Agent" or press Enter.');
          }
          setTimeout(() => setSpeechStatus(null), 4000);
        },
        onError: (errMsg, isPermErr) => {
          console.warn('[VOICE AGENT] Speech recognition error:', errMsg);
          setIsListening(false);
          setSpeechStatus(null);
          if (isPermErr) {
            setMicPermissionGranted(false);
            setShowPermissionModal(true);
            setSpeechError(errMsg);
          } else {
            // Offer instant audio recording fallback
            setSpeechError(errMsg + ' Switching to audio recording fallback.');
            startAudioRecorderFallback();
          }
        },
        onEnd: () => {
          setIsListening(false);
        }
      });

      speechControllerRef.current = controller;
    } else {
      // Browser does not support Web Speech API: use Audio Recorder fallback
      startAudioRecorderFallback();
    }
  };

  // Fallback Audio Recording via MediaRecorder + Gemini
  const startAudioRecorderFallback = async () => {
    setIsListening(false);
    setIsRecordingAudio(true);
    setSpeechStatus('🔴 Recording voice audio directly... Speak now and click Stop when done.');
    const started = await audioRecorderRef.current.start();
    if (!started) {
      setIsRecordingAudio(false);
      setSpeechError('Could not start audio recorder. Please verify microphone settings.');
      setSpeechStatus(null);
    }
  };

  // Manual one-click translation of input to English
  const handleTranslateInputToEnglish = async () => {
    if (!promptInput.trim() || isTranslating) return;
    setIsTranslating(true);
    setSpeechStatus('🔄 Translating your message to professional English...');
    try {
      const translated = await translateText(promptInput, 'en');
      setPromptInput(translated);
      setSpeechStatus('✅ Translated to English successfully!');
      setTimeout(() => setSpeechStatus(null), 3000);
    } catch (err: any) {
      setSpeechError('Translation notice: ' + (err.message || 'Error'));
    } finally {
      setIsTranslating(false);
    }
  };

  // Initial greeting in strict professional ENGLISH
  const [chatHistory, setChatHistory] = useState<Array<{
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
    country?: string;
    officialApplyUrl?: string;
    officialFormDownloadUrl?: string;
    officialPortalUrl?: string;
    appointmentUrl?: string;
  }>>([
    {
      sender: 'agent',
      text: `Good day, Director Urwa Ali! I am your Worldwide Visa Intelligence AI Specialist Agent.

I provide verified consular intelligence and application procedures across all destinations:
1. 🇦🇪 🇸🇦 🇶🇦 🇴🇲 **GCC & Gulf States**: Dubai / UAE, Saudi Arabia (Umrah/Tourist), Qatar (Hayya), Oman, Bahrain, Kuwait.
2. 🇪🇺 **Schengen European Zone**: All 29 Member States (Germany, France, Italy, Spain, Switzerland, Netherlands, Poland, etc.).
3. 🇬🇧 🇺🇸 🇨🇦 **Anglo & North America**: United Kingdom (Standard Visitor), USA (B1/B2 DS-160), Canada (TRV).
4. 🇹🇷 🇦🇿 🇦🇱 🇷🇸 **Eurasia & Balkans**: Turkey (Sticker & eVisa), Azerbaijan (ASAN eVisa), Albania, Serbia, Georgia, Uzbekistan.
5. 🇲🇾 🇹🇭 🇸🇬 🇯🇵 **Asia & Far East**: Malaysia, Thailand, Singapore, Japan, South Korea, China, Vietnam.

You can ask me any question or click any country below. You can also click "Get Official Form & Apply Link" to get the exact online portal and downloadable PDF visa application form for any country.`,
      timestamp: 'Active Session',
      officialApplyUrl: 'https://smartservices.icp.gov.ae',
      officialFormDownloadUrl: 'https://www.gdrfad.gov.ae/en/services'
    }
  ]);

  // English Quick Prompts tailored to all major destinations
  const quickPrompts = [
    {
      label: 'Dubai / UAE 30 & 60 Days Tourist Visa Process',
      query: 'What are the official GDRFA fees, processing time, and document requirements for Dubai UAE 30-day and 60-day tourist visas from Pakistan?',
      country: 'United Arab Emirates (Dubai & Abu Dhabi)'
    },
    {
      label: 'Saudi Arabia Multi-Entry Tourist & Umrah via Tasheer',
      query: 'How to apply for Saudi Arabia multi-entry tourist and Umrah visa through Tasheer center in Lahore, what are the MoFA fees and medical insurance rules?',
      country: 'Saudi Arabia'
    },
    {
      label: 'UK Standard Visitor 6-Month Visa Checklist & VFS',
      query: 'What is the complete document checklist, recommended bank balance, and VFS biometric booking procedure for UK Standard Visitor 6-Month visa from Pakistan?',
      country: 'United Kingdom'
    },
    {
      label: 'US B1/B2 Tourist Visa DS-160 & Interview Guidelines',
      query: 'What is the step-by-step DS-160 filling process, MRV fee payment in Pakistan, and consular interview preparation guidelines for US B1/B2 tourist visa?',
      country: 'United States of America'
    },
    {
      label: 'Germany Schengen Short-Stay Visa VIDEX & VFS Rules',
      query: 'What are the German Embassy Islamabad / VFS Lahore requirements for Schengen Type C tourist visa, official €90 fee, and mandatory VIDEX form?',
      country: 'Germany'
    },
    {
      label: 'Turkey Sticker & eVisa Requirements via Anatolia',
      query: 'What is the Turkish tourist visa application procedure through Anatolia Travel Services Pakistan, and who qualifies for the instant $60 eVisa?',
      country: 'Turkey (Türkiye)'
    },
    {
      label: 'Azerbaijan ASAN eVisa 3-Hour Urgent vs 3-Day Process',
      query: 'How to apply for Azerbaijan ASAN electronic visa online, fee breakdown for standard 3-day vs urgent 3-hour express, and entry requirements for Baku?',
      country: 'Azerbaijan'
    },
    {
      label: 'Malaysia 30-Day eVISA & MDAC Arrival Card',
      query: 'What are the photo specifications, bank balance requirements, and MDAC arrival card rules for Malaysia 30-day single/multiple entry eVISA?',
      country: 'Malaysia'
    },
    {
      label: 'Qatar Hayya Entry Visa & Discover Qatar Hotel Rule',
      query: 'What are the Hayya with Qatar visa requirements, mandatory Discover Qatar hotel booking rule, and MOPH health insurance for Pakistani travelers?',
      country: 'Qatar'
    },
    {
      label: 'Spain Tourist Visa BLS Checklist & Funds (€108/Day)',
      query: 'Explain the Spain Schengen visa submission process via BLS International Pakistan, document checklist, and the statutory €108/day financial requirement.',
      country: 'Spain'
    },
    {
      label: 'Schengen Statutory Fee 2026 (€90) & €30,000 Insurance Rule',
      query: 'What is the updated 2026 official statutory fee for Schengen short-stay visas, conversion rate in PKR, and mandatory requirements for €30,000 medical travel insurance?',
      country: 'Schengen Area'
    },
    {
      label: 'Canada TRV Visitor Visa IRCC Portal & Biometrics',
      query: 'What are the requirements for Canadian Temporary Resident Visa (TRV) application on IRCC portal, VFS biometrics appointment, and funds justification?',
      country: 'Canada'
    }
  ];

  const handleSendQuery = async (customText?: string, targetCountryOverride?: string) => {
    const textToSend = customText || promptInput;
    if (!textToSend.trim() || isLoading) return;

    const countryName = targetCountryOverride || selectedCountry?.name || 'Worldwide';

    const userMsg = {
      sender: 'user' as const,
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    setPromptInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/schengen-agent/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          country: countryName,
          language: agentLanguage
        })
      });

      if (response.ok) {
        const data = await response.json();
        const matched = WORLDWIDE_VISA_COUNTRIES.find(c => c.name.toLowerCase().includes(countryName.toLowerCase()));
        setChatHistory(prev => [
          ...prev,
          {
            sender: 'agent',
            text: data.response || 'Information received.',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            country: data.country || countryName,
            officialApplyUrl: data.officialApplyUrl || (matched ? getCountryOfficialApplyUrl(matched) : undefined),
            officialFormDownloadUrl: data.officialFormDownloadUrl || (matched ? getCountryVisaFormPdfUrl(matched) : undefined),
            officialPortalUrl: data.officialPortalUrl || matched?.officialPortalUrl,
            appointmentUrl: data.appointmentUrl || matched?.appointmentUrl
          }
        ]);
      } else {
        throw new Error('Failed response from agent');
      }
    } catch {
      // Local fallback in structured English
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'agent',
          text: `### 🌐 SkyBridge Consular Intelligence: ${selectedCountry.name} (${selectedCountry.flag})
- **Visa Category**: ${selectedCountry.visaType}
- **Official Statutory Fee**: ${selectedCountry.officialVisaFeeLocal} (≈ PKR ${selectedCountry.officialVisaFeePkr.toLocaleString()})
- **Biometric / Submission Partner**: ${selectedCountry.appointmentPartner} (${selectedCountry.submissionCentersInPakistan.join(', ')})
- **Estimated Processing Duration**: ${selectedCountry.processingDays}
- **Recommended Bank Balance**: ${selectedCountry.recommendedBankBalancePkr}
- **Official Government Portal**: ${selectedCountry.officialPortalUrl}
- **Appointment Booking Portal**: ${selectedCountry.appointmentUrl}

**Key Mandatory Documents**:
${selectedCountry.mandatoryDocuments.slice(0, 7).map((d, i) => `${i + 1}. ${d}`).join('\n')}`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          country: selectedCountry.name,
          officialApplyUrl: getCountryOfficialApplyUrl(selectedCountry),
          officialFormDownloadUrl: getCountryVisaFormPdfUrl(selectedCountry),
          officialPortalUrl: selectedCountry.officialPortalUrl,
          appointmentUrl: selectedCountry.appointmentUrl
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCountries = WORLDWIDE_VISA_COUNTRIES.filter(c => {
    const matchesRegion = selectedRegion === 'All' || c.region === selectedRegion;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.officialPortalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.appointmentPartner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.visaType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  const copyClientDossier = () => {
    const text = `SkyBridge Travel & Tourism — Official Visa Intelligence Dossier & Quotation
Destination: ${selectedCountry.name} (${selectedCountry.flag}) — ${selectedCountry.region}
Visa Category: ${selectedCountry.visaType}
Official Consular Statutory Fee: ${selectedCountry.officialVisaFeeLocal} (Approx PKR ${selectedCountry.officialVisaFeePkr.toLocaleString()})
Submission / Appointment Center: ${selectedCountry.appointmentPartner}
Submission Hubs in Pakistan: ${selectedCountry.submissionCentersInPakistan.join(', ')}
Estimated Processing Duration: ${selectedCountry.processingDays}
Recommended Bank Balance: ${selectedCountry.recommendedBankBalancePkr}

MANDATORY DOCUMENTS CHECKLIST:
${selectedCountry.mandatoryDocuments.map((d, i) => `${i + 1}. ${d}`).join('\n')}

GOLDEN RULES & ADVISORY:
${selectedCountry.countrySpecificRules.map((r, i) => `• ${r}`).join('\n')}

VERIFIED OFFICIAL EMBASSY & BOOKING PORTALS:
• Official Government Portal: ${selectedCountry.officialPortalUrl}
• Biometric Booking Link: ${selectedCountry.appointmentUrl}

${OFFICIAL_DIRECTOR_SIGNATURE_TEXT}`;

    navigator.clipboard.writeText(text);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2500);
  };

  const regionsList = [
    { id: 'All', label: 'All Worldwide', count: WORLDWIDE_VISA_COUNTRIES.length },
    { id: 'GCC & Gulf', label: 'GCC & Gulf (Dubai, KSA, Qatar, Oman)', count: 6 },
    { id: 'Schengen Europe', label: 'Schengen Europe (29 States)', count: 20 },
    { id: 'UK & North America', label: 'UK, USA & Canada', count: 3 },
    { id: 'Eurasia & Balkans', label: 'Eurasia & Balkans (Turkey, Azerbaijan)', count: 6 },
    { id: 'Asia & Far East', label: 'Asia & Far East (Malaysia, etc.)', count: 7 }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0B1B3B] via-[#0d234d] to-[#0B1B3B] text-white p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-72 h-72 rounded-full bg-[#4FC3F7]/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              <Compass className="w-3.5 h-3.5 animate-spin" />
              <span>DIRECTOR EXCLUSIVE • WORLDWIDE VISA INTELLIGENCE SUITE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Global & Worldwide Visa Intelligence AI Agent
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Consular intelligence engine covering GCC Gulf (Saudi Arabia, Dubai, Qatar, Oman), all 29 Schengen states, UK, USA, Canada, Turkey, Azerbaijan, Albania, Serbia, and Malaysia. Real-time official fees, portals, checklists, and voice-assisted intelligence.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/15 backdrop-blur-md">
            <div className="w-11 h-11 rounded-xl bg-[#4FC3F7] text-[#0B1B3B] flex items-center justify-center font-black text-lg">
              {WORLDWIDE_VISA_COUNTRIES.length}+
            </div>
            <div className="text-left text-xs">
              <span className="font-bold text-white block">Destinations Loaded</span>
              <span className="text-cyan-300 text-[11px]">Gulf • Europe • UK • USA • Asia</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-8 flex gap-2 border-b border-white/15 pb-0 overflow-x-auto">
          <button
            onClick={() => setActiveTab('agent')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'agent'
                ? 'bg-white text-[#0B1B3B] shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Interactive AI Consultant (Voice & Chat)</span>
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'directory'
                ? 'bg-white text-[#0B1B3B] shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-cyan-500" />
            <span>Worldwide Countries Directory ({filteredCountries.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'dossier'
                ? 'bg-white text-[#0B1B3B] shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-500" />
            <span>Client Checklist & Quotation Generator</span>
          </button>
        </div>
      </div>

      {/* Destination Quick Selector Strip (Click to Ask About Any Destination) */}
      <div className="bg-white rounded-2xl p-3 border border-slate-200 shadow-xs flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2 shrink-0 text-xs font-bold text-slate-700 pl-1">
          <MapPin className="w-3.5 h-3.5 text-[#0B1B3B]" />
          <span>Active Target:</span>
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {[
            'uae-dubai',
            'saudi-arabia',
            'qatar',
            'oman',
            'united-kingdom',
            'united-states',
            'germany',
            'france',
            'italy',
            'spain',
            'turkey',
            'azerbaijan',
            'malaysia'
          ].map(cId => {
            const country = WORLDWIDE_VISA_COUNTRIES.find(x => x.id === cId);
            if (!country) return null;
            const isSelected = selectedCountry.id === country.id;
            return (
              <button
                key={country.id}
                onClick={() => {
                  setSelectedCountry(country);
                  if (activeTab !== 'agent') setActiveTab('agent');
                }}
                className={`px-2.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? 'bg-[#0B1B3B] text-white shadow-xs ring-2 ring-[#4FC3F7]/50'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <span>{country.flag}</span>
                <span>{country.name.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
        <button
          onClick={() => setActiveTab('directory')}
          className="text-xs font-bold text-[#4FC3F7] bg-[#0B1B3B] px-3 py-1.5 rounded-xl hover:bg-slate-800 shrink-0 transition-colors"
        >
          View All {WORLDWIDE_VISA_COUNTRIES.length} Countries
        </button>
      </div>

      {/* TAB 1: INTERACTIVE AI AGENT */}
      {activeTab === 'agent' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Stream */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-[640px]">
              {/* Agent Header with Country & Language Controls */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#0B1B3B] text-[#4FC3F7] flex items-center justify-center text-xl shadow-xs">
                    {selectedCountry.flag}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-sm font-bold text-slate-900">
                        {selectedCountry.name} Visa Consultant
                      </h2>
                      <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-bold">
                        {selectedCountry.region}
                      </span>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>Verified Consular Intelligence Engine</span>
                    </span>
                  </div>
                </div>

                {/* Language Switcher: English Default / Urdu Optional */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                    <button
                      onClick={() => setAgentLanguage('en')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        agentLanguage === 'en'
                          ? 'bg-[#0B1B3B] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      English
                    </button>
                    <button
                      onClick={() => setAgentLanguage('ur')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        agentLanguage === 'ur'
                          ? 'bg-[#0B1B3B] text-white shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      اردو
                    </button>
                  </div>
                </div>
              </div>

              {/* Message scroll area */}
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.sender === 'user'
                          ? 'bg-[#0B1B3B] text-white shadow-md'
                          : 'bg-slate-50 text-slate-800 border border-slate-200 shadow-xs'
                      }`}
                    >
                      {msg.text}

                      {/* Official Action Buttons */}
                      {msg.sender === 'agent' && (msg.officialApplyUrl || msg.officialFormDownloadUrl || msg.appointmentUrl) && (
                        <div className="mt-3 pt-3 border-t border-slate-200 flex flex-wrap items-center gap-2">
                          {msg.officialApplyUrl && (
                            <a
                              href={msg.officialApplyUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1B3B] text-white hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-[11px] font-bold transition-all shadow-xs"
                            >
                              <ExternalLink className="w-3 h-3" />
                              <span>Official Online Visa Portal</span>
                            </a>
                          )}
                          {msg.officialFormDownloadUrl && (
                            <a
                              href={msg.officialFormDownloadUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-700 text-white hover:bg-emerald-600 text-[11px] font-bold transition-all shadow-xs"
                            >
                              <Download className="w-3 h-3" />
                              <span>Download Official Visa Form (PDF)</span>
                            </a>
                          )}
                          {msg.appointmentUrl && (
                            <a
                              href={msg.appointmentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-100 text-sky-900 hover:bg-sky-200 text-[11px] font-bold transition-all border border-sky-200"
                            >
                              <Building2 className="w-3 h-3" />
                              <span>Biometrics / Appointment Portal</span>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 p-3.5 bg-slate-50 rounded-2xl text-xs text-slate-600 w-fit border border-slate-200">
                    <Sparkles className="w-4 h-4 text-cyan-500 animate-spin" />
                    <span>Analyzing official {selectedCountry.name} consular rules & portals...</span>
                  </div>
                )}
              </div>

              {/* Voice Listening & Status Banner */}
              {speechStatus && (
                <div className="p-3 rounded-2xl bg-gradient-to-r from-sky-50 to-indigo-50 border border-sky-200 text-sky-900 text-xs flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2.5">
                    {(isListening || isRecordingAudio) ? (
                      <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-600"></span>
                      </span>
                    ) : (
                      <Sparkles className="w-4 h-4 text-sky-600 shrink-0" />
                    )}
                    <span className="font-semibold">{speechStatus}</span>
                    {(isListening || isRecordingAudio) && (
                      <span className="px-2 py-0.5 rounded-md bg-rose-100 text-rose-700 font-mono text-[10px] font-bold">
                        {recordingSeconds}s
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {(isListening || isRecordingAudio) && (
                      <button
                        onClick={toggleListening}
                        className="px-2 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold transition-all"
                      >
                        Done / Stop
                      </button>
                    )}
                    <button
                      onClick={() => {
                        speechControllerRef.current?.abort();
                        audioRecorderRef.current.stop();
                        setIsListening(false);
                        setIsRecordingAudio(false);
                        setSpeechStatus(null);
                      }}
                      className="text-xs text-slate-400 hover:text-slate-700 font-bold px-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Voice Error & Troubleshooting Banner */}
              {speechError && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
                    <span>{speechError}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => setShowPermissionModal(true)}
                      className="px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-bold"
                    >
                      Fix Mic Access
                    </button>
                    <button
                      onClick={() => setSpeechError(null)}
                      className="text-rose-400 hover:text-rose-600 font-bold px-1"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Voice Toolbar: Spoken Language + Auto-Translate Control */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
                <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
                  <span className="text-slate-500 font-semibold px-1.5 flex items-center gap-1">
                    <Mic className="w-3 h-3 text-cyan-600" />
                    Speak in:
                  </span>
                  <button
                    onClick={() => setSpokenLanguage('en')}
                    className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                      spokenLanguage === 'en'
                        ? 'bg-[#0B1B3B] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🇺🇸 English
                  </button>
                  <button
                    onClick={() => setSpokenLanguage('ur')}
                    className={`px-2 py-0.5 rounded-lg font-bold transition-all ${
                      spokenLanguage === 'ur'
                        ? 'bg-[#0B1B3B] text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    🇵🇰 Urdu (اردو)
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {/* Auto-Translate toggle */}
                  <label className="flex items-center gap-1.5 cursor-pointer text-slate-700 bg-sky-50 px-2 py-1 rounded-xl border border-sky-100">
                    <input
                      type="checkbox"
                      checked={autoTranslateToEnglish}
                      onChange={e => setAutoTranslateToEnglish(e.target.checked)}
                      className="rounded text-sky-600 focus:ring-sky-500 w-3.5 h-3.5"
                    />
                    <span className="font-semibold text-sky-900">Auto-translate speech to English</span>
                  </label>

                  {/* Manual Translate to English Button (Active when user has typed/spoken anything) */}
                  {promptInput.trim().length > 0 && (
                    <button
                      type="button"
                      disabled={isTranslating}
                      onClick={handleTranslateInputToEnglish}
                      title="Translate current message to clean, professional English"
                      className="px-2.5 py-1 rounded-xl bg-cyan-600 hover:bg-cyan-700 text-white font-bold flex items-center gap-1 transition-all disabled:opacity-50 shadow-xs"
                    >
                      <Globe className={`w-3 h-3 ${isTranslating ? 'animate-spin' : ''}`} />
                      <span>{isTranslating ? 'Translating...' : 'Translate to English'}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Prompt Input with Microphone Button */}
              <div className="space-y-2">
                <div className="flex gap-2 items-center">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={promptInput}
                      onChange={e => setPromptInput(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleSendQuery()}
                      placeholder={`Ask anything about ${selectedCountry.name} visas (speak via mic or type)...`}
                      className="w-full px-4 py-3 pr-10 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4FC3F7]"
                    />
                    {isTranslating && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] text-cyan-600 font-bold bg-white px-2 py-0.5 rounded-md">
                        <RefreshCw className="w-3 h-3 animate-spin" />
                        Translating...
                      </div>
                    )}
                  </div>

                  {/* Microphone Button */}
                  <button
                    type="button"
                    onClick={toggleListening}
                    title={
                      isListening || isRecordingAudio
                        ? "Click to Stop Listening"
                        : "Click to Speak into Microphone"
                    }
                    className={`p-3 rounded-2xl font-bold transition-all flex items-center justify-center shrink-0 ${
                      (isListening || isRecordingAudio)
                        ? 'bg-rose-500 text-white animate-pulse shadow-lg shadow-rose-500/40 ring-4 ring-rose-200'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {(isListening || isRecordingAudio) ? (
                      <MicOff className="w-5 h-5 animate-bounce" />
                    ) : (
                      <Mic className="w-5 h-5 text-slate-700" />
                    )}
                  </button>

                  {/* Ask Agent Button */}
                  <button
                    disabled={isLoading || !promptInput.trim()}
                    onClick={() => handleSendQuery()}
                    className="px-5 py-3 rounded-2xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white font-bold text-xs sm:text-sm transition-all disabled:opacity-50 flex items-center gap-2 shrink-0 shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>Ask Agent</span>
                  </button>
                </div>

                {/* Instant Official Link Retrieval Bar */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      const q = `Please provide the official visa application portal link and direct downloadable visa application form PDF for ${selectedCountry.name}.`;
                      handleSendQuery(q, selectedCountry.name);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 text-cyan-900 text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-cyan-600" />
                    <span>📥 Get Official {selectedCountry.name} Visa Form & Apply Link</span>
                  </button>
                  <button
                    type="button"
                    disabled={isLoading}
                    onClick={() => {
                      const q = `What is the step-by-step document checklist and official bank statement requirement for ${selectedCountry.name} visa?`;
                      handleSendQuery(q, selectedCountry.name);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" />
                    <span>Checklist & Bank Balance</span>
                  </button>
                </div>
              </div>

              {/* Microphone Permission Diagnostic & Troubleshooting Modal */}
              {showPermissionModal && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center shrink-0">
                          <Mic className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-[#0B1B3B]">
                            Microphone Access Required
                          </h3>
                          <p className="text-xs text-slate-500">
                            Enable microphone to speak instructions to the AI Agent
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setShowPermissionModal(false)}
                        className="text-slate-400 hover:text-slate-600 font-bold p-1"
                      >
                        ✕
                      </button>
                    </div>

                    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 space-y-2">
                      <div className="font-bold flex items-center gap-1.5 text-amber-950">
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                        How to Allow Microphone in your browser:
                      </div>
                      <ol className="list-decimal pl-5 space-y-1 text-slate-700">
                        <li>Look at the top URL address bar of your browser.</li>
                        <li>Click the <strong>Lock (🔒)</strong> or <strong>Site Settings</strong> icon next to the address.</li>
                        <li>Find <strong>Microphone</strong> in permissions and select <strong>"Allow"</strong>.</li>
                        <li>Click the button below to test and connect.</li>
                      </ol>
                    </div>

                    <div className="space-y-2 pt-2">
                      <button
                        onClick={handleCheckMicPermission}
                        className="w-full py-3 rounded-2xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white font-bold text-xs transition-all flex items-center justify-center gap-2 shadow-md"
                      >
                        <Mic className="w-4 h-4" />
                        <span>Test & Allow Microphone Access Now</span>
                      </button>

                      <button
                        onClick={() => {
                          setShowPermissionModal(false);
                          startAudioRecorderFallback();
                        }}
                        className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-all flex items-center justify-center gap-2"
                      >
                        <span>Try Direct Audio Recording Fallback</span>
                      </button>

                      <button
                        onClick={() => setShowPermissionModal(false)}
                        className="w-full py-2 text-center text-xs text-slate-500 hover:text-slate-800 font-medium"
                      >
                        Continue Typing Manually
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Quick Destination Intelligence & Prompts */}
          <div className="space-y-4">
            {/* Selected Country Snapshot Card */}
            <div className="bg-[#0B1B3B] text-white rounded-3xl p-5 border border-white/10 space-y-3.5 shadow-md">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedCountry.flag}</span>
                  <div>
                    <h3 className="font-bold text-white text-sm">{selectedCountry.name}</h3>
                    <span className="text-[10px] text-cyan-300 font-mono">{selectedCountry.visaType}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                  {selectedCountry.region}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Official Fee</span>
                  <span className="font-black text-amber-400">{selectedCountry.officialVisaFeeLocal}</span>
                  <span className="text-[10px] text-slate-300 block">≈ PKR {selectedCountry.officialVisaFeePkr.toLocaleString()}</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <span className="text-[10px] text-slate-400 block font-bold uppercase">Bank Balance</span>
                  <span className="font-bold text-emerald-400">{selectedCountry.recommendedBankBalancePkr}</span>
                </div>
              </div>

              <div className="text-xs space-y-1.5 text-slate-300">
                <div className="flex items-start gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Submission:</strong> {selectedCountry.appointmentPartner}</span>
                </div>
                <div className="flex items-start gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                  <span><strong>Processing:</strong> {selectedCountry.processingDays}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <a
                  href={selectedCountry.officialPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2 px-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors"
                >
                  <span>Official Portal</span>
                  <ExternalLink className="w-3 h-3 text-cyan-300" />
                </a>
                <button
                  onClick={() => setActiveTab('dossier')}
                  className="flex-1 py-2 px-2.5 rounded-xl bg-[#4FC3F7] text-[#0B1B3B] hover:bg-white text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>View Dossier</span>
                </button>
              </div>
            </div>

            {/* Quick Inquiry Chips in English */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Instant Inquiry Chips</span>
              </h3>
              <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      const matched = WORLDWIDE_VISA_COUNTRIES.find(c => c.name.includes(p.country));
                      if (matched) setSelectedCountry(matched);
                      handleSendQuery(p.query, p.country);
                    }}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 text-xs text-slate-700 hover:text-cyan-900 transition-all font-medium flex items-center justify-between group"
                  >
                    <span className="truncate pr-2 font-semibold">{p.label}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIRECTORY OF ALL WORLDWIDE COUNTRIES */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Region Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {regionsList.map(r => (
              <button
                key={r.id}
                onClick={() => setSelectedRegion(r.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold transition-all shrink-0 ${
                  selectedRegion === r.id
                    ? 'bg-[#0B1B3B] text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{r.label}</span>
              </button>
            ))}
          </div>

          {/* Search bar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search worldwide countries (e.g. Dubai, Saudi Arabia, UK, USA, Turkey, Germany, France, Malaysia)..."
              className="flex-1 text-xs sm:text-sm focus:outline-hidden"
            />
            <span className="text-xs text-slate-400 font-semibold px-2">
              Showing {filteredCountries.length} of {WORLDWIDE_VISA_COUNTRIES.length}
            </span>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCountries.map(country => (
              <div
                key={country.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl">{country.flag}</span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{country.name}</h3>
                        <span className="text-[10px] text-slate-500 font-mono block">
                          {country.region} • {country.code}
                        </span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-bold border border-cyan-100">
                      {country.appointmentPartner.split('/')[0].slice(0, 16)}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-[10px] text-slate-400 block font-bold uppercase">Visa Type</span>
                    <span className="font-bold text-slate-800 text-xs">{country.visaType}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-1">
                    <div className="p-2.5 rounded-xl bg-slate-50">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Official Fee</span>
                      <span className="font-bold text-slate-900">{country.officialVisaFeeLocal}</span>
                      <span className="text-[10px] text-slate-500 block">≈ PKR {country.officialVisaFeePkr.toLocaleString()}</span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-slate-50">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Processing Time</span>
                      <span className="font-bold text-slate-900">{country.processingDays}</span>
                    </div>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600">
                    <div className="flex items-start gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span><strong>Submission:</strong> {country.submissionCentersInPakistan.slice(0, 2).join(', ')}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Bank Balance:</strong> {country.recommendedBankBalancePkr}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 mt-4 flex items-center gap-2">
                  <a
                    href={country.officialPortalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                  <button
                    onClick={() => {
                      setSelectedCountry(country);
                      setActiveTab('agent');
                    }}
                    className="flex-1 py-2 px-3 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Ask AI</span>
                    <Sparkles className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCountry(country);
                      setActiveTab('dossier');
                    }}
                    title="Generate Client Dossier"
                    className="p-2 rounded-xl bg-cyan-50 hover:bg-cyan-100 text-cyan-800 text-xs font-bold transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CLIENT CHECKLIST & QUOTATION GENERATOR */}
      {activeTab === 'dossier' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-4xl">{selectedCountry.flag}</span>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedCountry.name} Official Visa Client Dossier & Quotation
                </h2>
                <span className="text-xs text-slate-500">
                  {selectedCountry.region} • Formatted with Director Urwa Ali verification & signature.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={selectedCountry.id}
                onChange={e => {
                  const c = WORLDWIDE_VISA_COUNTRIES.find(x => x.id === e.target.value);
                  if (c) setSelectedCountry(c);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden"
              >
                {WORLDWIDE_VISA_COUNTRIES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.name} ({c.region})
                  </option>
                ))}
              </select>

              <button
                onClick={copyClientDossier}
                className="px-4 py-2 rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm shrink-0"
              >
                {copiedResponse ? <Check className="w-4 h-4" /> : <WhatsAppIcon className="w-4 h-4 fill-white" />}
                <span>{copiedResponse ? 'Copied to Clipboard!' : 'Copy for WhatsApp / Client'}</span>
              </button>
            </div>
          </div>

          {/* Dossier Preview Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-4 whitespace-pre-wrap leading-relaxed">
            <div className="font-bold text-[#0B1B3B] text-base font-sans pb-2 border-b border-slate-200 flex items-center justify-between">
              <span>SkyBridge Travel & Tourism — Official Visa Dossier: {selectedCountry.name} {selectedCountry.flag}</span>
              <span className="text-xs text-slate-500 font-normal">{selectedCountry.visaType}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 font-sans">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[11px] text-slate-500 block uppercase font-bold">Official Statutory Visa Fee</span>
                <span className="text-base font-black text-slate-900">{selectedCountry.officialVisaFeeLocal} (≈ PKR {selectedCountry.officialVisaFeePkr.toLocaleString()})</span>
                <span className="text-[11px] text-slate-500 block mt-1">+ {selectedCountry.appointmentPartner} service charge</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white border border-slate-200">
                <span className="text-[11px] text-slate-500 block uppercase font-bold">Recommended Bank Balance</span>
                <span className="text-base font-black text-emerald-700">{selectedCountry.recommendedBankBalancePkr}</span>
                <span className="text-[11px] text-slate-500 block mt-1">With 6-month continuous transaction flow</span>
              </div>
            </div>

            <div className="font-sans font-bold text-slate-900 pt-2">
              MANDATORY EMBASSY DOCUMENTS CHECKLIST:
            </div>
            <ul className="list-disc pl-5 space-y-1.5 font-sans text-xs">
              {selectedCountry.mandatoryDocuments.map((doc, idx) => (
                <li key={idx} className="text-slate-700">
                  {doc}
                </li>
              ))}
            </ul>

            <div className="font-sans font-bold text-slate-900 pt-2">
              COUNTRY-SPECIFIC RULES & GOLDEN ADVISORY:
            </div>
            <ul className="list-disc pl-5 space-y-1 font-sans text-xs">
              {selectedCountry.countrySpecificRules.map((rule, idx) => (
                <li key={idx} className="text-slate-700">
                  {rule}
                </li>
              ))}
            </ul>

            <div className="font-sans font-bold text-slate-900 pt-2">
              VERIFIED OFFICIAL PORTALS:
            </div>
            <div className="font-sans text-xs space-y-1">
              <div>• Official Government Portal: <a href={selectedCountry.officialPortalUrl} target="_blank" rel="noreferrer" className="text-cyan-700 underline">{selectedCountry.officialPortalUrl}</a></div>
              <div>• Biometric Appointment Center: <a href={selectedCountry.appointmentUrl} target="_blank" rel="noreferrer" className="text-cyan-700 underline">{selectedCountry.appointmentUrl}</a></div>
            </div>

            <div className="pt-4 border-t border-slate-200 font-sans text-xs text-slate-700">
              {OFFICIAL_DIRECTOR_SIGNATURE_TEXT}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
