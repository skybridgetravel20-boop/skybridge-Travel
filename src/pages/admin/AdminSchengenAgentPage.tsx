import React, { useState } from 'react';
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
  Download
} from 'lucide-react';
import { SCHENGEN_COUNTRIES, SchengenCountryData } from '../../data/schengenCountriesData';
import { COMPANY_INFO, OFFICIAL_DIRECTOR_SIGNATURE_TEXT } from '../../data/companyInfo';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';

export const AdminSchengenAgentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'agent' | 'directory' | 'dossier'>('agent');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<SchengenCountryData>(SCHENGEN_COUNTRIES[0]);

  // AI Agent Conversation State
  const [promptInput, setPromptInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedResponse, setCopiedResponse] = useState(false);

  const [chatHistory, setChatHistory] = useState<Array<{
    sender: 'user' | 'agent';
    text: string;
    timestamp: string;
    country?: string;
  }>>([
    {
      sender: 'agent',
      text: `السلام علیکم ڈائریکٹر عروہ علی! میں اسکائی برج کا **شینگن ویزا انٹیلی جنس اے آئی ایجنٹ** ہوں۔

میں تمام 29 شینگن ممالک (جرمنی، فرانس، اٹلی، اسپین، سوئٹزرلینڈ وغیرہ) کے لیے:
1. **آفیشل طریقہ کار اور اپائنٹمنٹ پروسیس** (VFS / BLS / TLS)
2. **سرکاری ویزا فیسیں** (€90 قانونی فیس / پاکستانی روپوں میں)
3. **لازمی دستاویزات اور بینک بیلنس ریکوائرمنٹس**
4. **آفیشل سرکاری ویب سائٹس اور ڈائریکٹ پورٹل لنکس**

فراہم کرنے کے لیے لائیو تیار ہوں۔ آپ اردو یا انگلش میں کوئی بھی سوال پوچھ سکتی ہیں۔`,
      timestamp: 'Today'
    }
  ]);

  // Preset quick prompt chips
  const quickPrompts = [
    { label: 'جرمنی کا طریقہ کار اور VFS اپائنٹمنٹ', query: 'جرمنی کے ٹورسٹ ویزا کا مکمل پروسیجر، VFS اپائنٹمنٹ اور ضروری دستاویزات کیا ہیں؟', country: 'Germany' },
    { label: 'فرانس ویزا کے لیے بینک بیلنس اور پیپرز', query: 'فرانس کے ویزا کے لیے بینک اسٹیٹمنٹ کتنا ہونا چاہیے اور کون سے ڈاکومنٹس چاہیے؟', country: 'France' },
    { label: 'Spain BLS Checklist & Fees', query: 'Spain tourist visa application procedure from Pakistan, BLS appointment fee and document checklist.', country: 'Spain' },
    { label: 'Italy VFS Appointment Guide', query: 'Italy Schengen visit visa process from Lahore VFS and official consular fee breakdown.', country: 'Italy' },
    { label: 'تمام شینگن ممالک کی سرکاری فیس 2026', query: 'تمام شینگن ممالک کی 2026 میں سرکاری ویزا فیس کتنی ہے اور پاکستانی روپوں میں کیا ریٹ ہے؟', country: 'Schengen Area' },
    { label: 'شینگن انشورنس کے اصول (€30,000)', query: 'شینگن ویزا کے لیے ٹریول میڈیکل انشورنس کے کیا قوانین ہیں اور کتنی کوریج لازمی ہے؟', country: 'Schengen Area' }
  ];

  const handleSendQuery = async (customText?: string) => {
    const textToSend = customText || promptInput;
    if (!textToSend.trim() || isLoading) return;

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
          country: selectedCountry?.name
        })
      });

      if (response.ok) {
        const data = await response.json();
        setChatHistory(prev => [
          ...prev,
          {
            sender: 'agent',
            text: data.response || 'معلومات موصول ہو گئیں۔',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            country: data.country
          }
        ]);
      } else {
        throw new Error('Failed response from agent');
      }
    } catch {
      // Local fallback
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'agent',
          text: `شینگن ویزا معلومات برائے **${selectedCountry.name}**:
- **آفیشل ویزا فیس**: €90 (تقریباً PKR 29,500)
- **بایومیٹرک پروسیسنگ**: ${selectedCountry.appointmentPartner} (${selectedCountry.submissionCentersInPakistan.join(', ')})
- **پروسیسنگ دورانیہ**: ${selectedCountry.processingDays}
- **تجویز کردہ بینک بیلنس**: ${selectedCountry.recommendedBankBalancePkr}
- **سرکاری پورٹل**: ${selectedCountry.officialPortalUrl}
- **اپائنٹمنٹ لنک**: ${selectedCountry.appointmentUrl}

لازمی ڈاکومنٹس:
1. اصل پاسپورٹ (کم از کم 3 ماہ زائد المعیاد)
2. دو عدد سفید پس منظر تصاویر
3. 6 ماہ کی تصدیق شدہ بینک اسٹیٹمنٹ + اکاؤنٹ مینٹیننس سرٹیفکیٹ
4. ملازمت کا این او سی یا بزنس ٹیکس ریٹرنز
5. نادرا ایف آر سی (FRC)
6. شینگن میڈیکل انشورنس (€30,000)
7. کنفرم فلائٹ اور ہوٹل ریزرویشنز`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          country: selectedCountry.name
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCountries = SCHENGEN_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.officialPortalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.appointmentPartner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const copyClientDossier = () => {
    const text = `SkyBridge Travel & Tourism — Schengen Visa Dossier
Destination: ${selectedCountry.name} (${selectedCountry.flag})
Official Consular Fee: €${selectedCountry.officialVisaFeeEur} (Approx PKR ${selectedCountry.officialVisaFeePkr.toLocaleString()})
Appointment Center: ${selectedCountry.appointmentPartner}
Submission Hubs: ${selectedCountry.submissionCentersInPakistan.join(', ')}
Processing Estimate: ${selectedCountry.processingDays}
Recommended Bank Balance: ${selectedCountry.recommendedBankBalancePkr}

MANDATORY DOCUMENTS CHECKLIST:
${selectedCountry.mandatoryDocuments.map((d, i) => `${i + 1}. ${d}`).join('\n')}

OFFICIAL VERIFIED PORTALS:
• Embassy / Ministry: ${selectedCountry.officialPortalUrl}
• Biometric Appointment: ${selectedCountry.appointmentUrl}

${OFFICIAL_DIRECTOR_SIGNATURE_TEXT}`;

    navigator.clipboard.writeText(text);
    setCopiedResponse(true);
    setTimeout(() => setCopiedResponse(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0B1B3B] via-[#0d234d] to-[#0B1B3B] text-white p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-72 h-72 rounded-full bg-[#4FC3F7]/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold border border-cyan-500/30">
              <Compass className="w-3.5 h-3.5 animate-spin" />
              <span>DIRECTOR EXCLUSIVE • SCHENGEN INTELLIGENCE SUITE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Schengen Visa Intelligence AI Agent
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Authoritative consular database & interactive AI agent for all 29 Schengen states. Live official visa fees, VFS/BLS/TLS procedures, strict document checklists, and verifiable embassy portals.
            </p>
          </div>

          <div className="flex items-center gap-3 bg-white/10 p-3 rounded-2xl border border-white/15 backdrop-blur-md">
            <div className="w-10 h-10 rounded-xl bg-[#4FC3F7] text-[#0B1B3B] flex items-center justify-center font-black">
              29
            </div>
            <div className="text-left text-xs">
              <span className="font-bold text-white block">Schengen Countries</span>
              <span className="text-cyan-300 text-[11px]">Official €90 Statutory Fee</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="mt-8 flex gap-2 border-b border-white/15 pb-0">
          <button
            onClick={() => setActiveTab('agent')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
              activeTab === 'agent'
                ? 'bg-white text-[#0B1B3B] shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Interactive AI Consultant</span>
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
              activeTab === 'directory'
                ? 'bg-white text-[#0B1B3B] shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5 text-cyan-500" />
            <span>All 29 Countries Directory</span>
          </button>
          <button
            onClick={() => setActiveTab('dossier')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 ${
              activeTab === 'dossier'
                ? 'bg-white text-[#0B1B3B] shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-emerald-500" />
            <span>Client Checklist & Quote Generator</span>
          </button>
        </div>
      </div>

      {/* TAB 1: INTERACTIVE AI AGENT */}
      {activeTab === 'agent' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Chat Stream */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-[600px]">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#0B1B3B] text-[#4FC3F7] flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-900">Schengen AI Agent Session</h2>
                    <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Live Grounded with Google & Consular Gazettes
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-semibold">
                  Director: <strong className="text-slate-800">Urwa Ali</strong>
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
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 px-1">{msg.timestamp}</span>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-center gap-2 p-3 bg-slate-50 rounded-2xl text-xs text-slate-500 w-fit">
                    <Sparkles className="w-4 h-4 text-cyan-500 animate-spin" />
                    <span>Analyzing official Schengen rules & embassy portals...</span>
                  </div>
                )}
              </div>

              {/* Prompt input */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promptInput}
                    onChange={e => setPromptInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSendQuery()}
                    placeholder="Ask anything about Schengen visas in Urdu or English..."
                    className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#4FC3F7]"
                  />
                  <button
                    disabled={isLoading || !promptInput.trim()}
                    onClick={() => handleSendQuery()}
                    className="px-5 py-3 rounded-2xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white font-bold text-xs sm:text-sm transition-all disabled:opacity-50 flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Ask Agent</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Preset Prompts & Quick Intelligence */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Quick Inquiry Chips (فوری سوالات)</span>
              </h3>
              <div className="space-y-2">
                {quickPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendQuery(p.query)}
                    className="w-full text-left p-2.5 rounded-xl bg-slate-50 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-100 text-xs text-slate-700 hover:text-cyan-900 transition-all font-medium flex items-center justify-between group"
                  >
                    <span className="truncate pr-2">{p.label}</span>
                    <ArrowRight className="w-3 h-3 text-slate-400 group-hover:text-cyan-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>

            {/* Statutory Key Rules Box */}
            <div className="bg-[#0B1B3B] text-white rounded-3xl p-5 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-cyan-300 font-bold text-xs uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4" />
                <span>Schengen Golden Rules</span>
              </div>
              <ul className="text-xs space-y-2 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Statutory Fee:</strong> €90 adult (≈ PKR 29,500), €45 minors (6-12), €0 under 6.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Main Destination Rule:</strong> Must apply to the country of longest stay, or first port of entry if stays are equal.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Insurance:</strong> Minimum €30,000 emergency medical and repatriation coverage is mandatory across all 29 states.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold">•</span>
                  <span><strong>Timeline:</strong> Submit 15 days to 6 months prior to departure.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DIRECTORY OF ALL 29 SCHENGEN COUNTRIES */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          {/* Search bar */}
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-3">
            <Search className="w-5 h-5 text-slate-400 ml-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search Schengen countries (e.g. Germany, France, Italy, Spain, Switzerland, VFS, BLS)..."
              className="flex-1 text-xs sm:text-sm focus:outline-hidden"
            />
            <span className="text-xs text-slate-400 font-semibold px-2">
              Showing {filteredCountries.length} of {SCHENGEN_COUNTRIES.length}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCountries.map(country => (
              <div
                key={country.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{country.flag}</span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-base">{country.name}</h3>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">{country.code}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-cyan-50 text-cyan-700 text-[11px] font-bold border border-cyan-100">
                      {country.appointmentPartner}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs py-1">
                    <div className="p-2.5 rounded-xl bg-slate-50">
                      <span className="text-[10px] text-slate-400 block font-bold uppercase">Official Fee</span>
                      <span className="font-bold text-slate-900">€{country.officialVisaFeeEur}</span>
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
                      <span><strong>Submission Hubs:</strong> {country.submissionCentersInPakistan.join(', ')}</span>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                      <span><strong>Recommended Balance:</strong> {country.recommendedBankBalancePkr}</span>
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
                    <span>Official Portal</span>
                    <ExternalLink className="w-3 h-3 text-slate-500" />
                  </a>
                  <a
                    href={country.appointmentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2 px-3 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-[11px] font-bold text-center flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Book Slot</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
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
              <span className="text-3xl">{selectedCountry.flag}</span>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {selectedCountry.name} Schengen Client Dossier & Quotation
                </h2>
                <span className="text-xs text-slate-500">
                  Official checklist formatted with Director Urwa Ali verification & signature.
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={selectedCountry.id}
                onChange={e => {
                  const c = SCHENGEN_COUNTRIES.find(x => x.id === e.target.value);
                  if (c) setSelectedCountry(c);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden"
              >
                {SCHENGEN_COUNTRIES.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>

              <button
                onClick={copyClientDossier}
                className="px-4 py-2 rounded-xl bg-[#25D366] text-white hover:bg-[#1EBE5D] font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {copiedResponse ? <Check className="w-4 h-4" /> : <WhatsAppIcon className="w-4 h-4 fill-white" />}
                <span>{copiedResponse ? 'Copied to Clipboard!' : 'Copy for WhatsApp / Client'}</span>
              </button>
            </div>
          </div>

          {/* Dossier Preview Card */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-4 whitespace-pre-wrap leading-relaxed">
            <div className="font-bold text-[#0B1B3B] text-base font-sans pb-2 border-b border-slate-200">
              SkyBridge Travel & Tourism — Official Schengen Visa Dossier: {selectedCountry.name} {selectedCountry.flag}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2 font-sans">
              <div className="p-3 rounded-xl bg-white border border-slate-200">
                <span className="text-[11px] text-slate-500 block uppercase font-bold">Official Statutory Visa Fee</span>
                <span className="text-base font-black text-slate-900">€{selectedCountry.officialVisaFeeEur} (≈ PKR {selectedCountry.officialVisaFeePkr.toLocaleString()})</span>
                <span className="text-[11px] text-slate-500 block mt-1">+ {selectedCountry.appointmentPartner} service charge</span>
              </div>
              <div className="p-3 rounded-xl bg-white border border-slate-200">
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
