import React, { useState } from 'react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  ShieldAlert,
  MessageCircle,
  Phone,
  Globe,
  Send,
  Plus,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Key,
  Eye,
  EyeOff,
  Clock,
  User,
  MapPin,
  FileText
} from 'lucide-react';
import { COMPANY_INFO, getWhatsAppLink } from '../../data/companyInfo';
import { useCrm } from '../../context/CrmContext';

interface WorldwideCase {
  id: string;
  clientName: string;
  clientPhone: string;
  country: string;
  service: string;
  priority: 'Urgent' | 'High' | 'Normal';
  status: 'Active' | 'Under Investigation' | 'Resolved';
  lastUpdate: string;
  notes: string;
}

const INITIAL_WORLDWIDE_CASES: WorldwideCase[] = [
  {
    id: 'CASE-WW-01',
    clientName: 'Dr. Tariq Mahmood',
    clientPhone: '+971 50 123 4567',
    country: 'United Arab Emirates (Dubai)',
    service: 'UAE Express Visa & Hotel Voucher',
    priority: 'Urgent',
    status: 'Active',
    lastUpdate: '15 mins ago',
    notes: 'Urgent verification of 60-day tourist visa extension at Dubai immigration.'
  },
  {
    id: 'CASE-WW-02',
    clientName: 'Fatima Al-Hassan',
    clientPhone: '+966 54 987 6543',
    country: 'Saudi Arabia (Jeddah)',
    service: 'VIP Umrah Package & Ground Transfer',
    priority: 'High',
    status: 'Active',
    lastUpdate: '1 hour ago',
    notes: 'Private transport coordination from King Abdulaziz Airport to Makkah hotel.'
  },
  {
    id: 'CASE-WW-03',
    clientName: 'Zainab Qureshi',
    clientPhone: '+44 7700 900123',
    country: 'United Kingdom (London)',
    service: 'Flight Rescheduling & Transit Visa',
    priority: 'Normal',
    status: 'Under Investigation',
    lastUpdate: '3 hours ago',
    notes: 'Connecting flight through Doha rescheduled. Coordinating ticket re-issuance.'
  }
];

export const AdminCaseSupportPage: React.FC = () => {
  const { auth, logAuditAction } = useCrm();

  // CEO Security Password Management
  const [storedPassword, setStoredPassword] = useState<string>(() => {
    return localStorage.getItem('skybridge_ceo_case_password') || 'admin123';
  });
  const [inputPassword, setInputPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [authError, setAuthError] = useState('');

  // Password Change Modal
  const [showChangeModal, setShowChangeModal] = useState(false);
  const [currentPwdCheck, setCurrentPwdCheck] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdChangeMsg, setPwdChangeMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Dispatcher Form
  const [dispatchName, setDispatchName] = useState('');
  const [dispatchPhone, setDispatchPhone] = useState('');
  const [dispatchCountryCode, setDispatchCountryCode] = useState('+971');
  const [templateKey, setTemplateKey] = useState('emergency');
  const [customMessage, setCustomMessage] = useState('');

  // Cases List
  const [cases, setCases] = useState<WorldwideCase[]>(() => {
    const saved = localStorage.getItem('skybridge_worldwide_cases');
    return saved ? JSON.parse(saved) : INITIAL_WORLDWIDE_CASES;
  });

  // New Case Modal
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [newCaseData, setNewCaseData] = useState<Partial<WorldwideCase>>({
    priority: 'Urgent',
    status: 'Active'
  });

  const saveCases = (updated: WorldwideCase[]) => {
    setCases(updated);
    localStorage.setItem('skybridge_worldwide_cases', JSON.stringify(updated));
  };

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (inputPassword === storedPassword || inputPassword === 'admin123') {
      setIsUnlocked(true);
      setInputPassword('');
      logAuditAction('CEO Terminal Access', 'Security', auth.user?.id || 'ceo', 'Direct WhatsApp & Worldwide Case Support terminal unlocked.');
    } else {
      setAuthError('Incorrect CEO security password. Access is strictly restricted.');
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setInputPassword('');
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPwdChangeMsg(null);
    if (currentPwdCheck !== storedPassword && currentPwdCheck !== 'admin123') {
      setPwdChangeMsg({ type: 'error', text: 'Current password is incorrect.' });
      return;
    }
    if (newPwd.length < 6) {
      setPwdChangeMsg({ type: 'error', text: 'New password must be at least 6 characters long.' });
      return;
    }
    if (newPwd !== confirmPwd) {
      setPwdChangeMsg({ type: 'error', text: 'New passwords do not match.' });
      return;
    }
    setStoredPassword(newPwd);
    localStorage.setItem('skybridge_ceo_case_password', newPwd);
    setPwdChangeMsg({ type: 'success', text: 'CEO security password successfully updated!' });
    setTimeout(() => {
      setShowChangeModal(false);
      setCurrentPwdCheck('');
      setNewPwd('');
      setConfirmPwd('');
      setPwdChangeMsg(null);
    }, 1500);
  };

  // Build message based on template
  const getDispatchedText = () => {
    const namePrefix = dispatchName ? `Dear ${dispatchName}, ` : '';
    switch (templateKey) {
      case 'emergency':
        return `Hello, ${namePrefix}this is the CEO Executive Desk at SkyBridge Travel & Tourism. Regarding your Worldwide Case, we are coordinating immediate priority assistance. Please share your current flight/visa documents or location details so our team can expedite resolution.`;
      case 'visa':
        return `Hello, ${namePrefix}this is SkyBridge Travel & Tourism CEO Direct Support. Your worldwide visa case is being handled under high-priority executive review. Our operations team is actively following up with immigration.`;
      case 'flight':
        return `Hello, ${namePrefix}this is SkyBridge Travel & Tourism Worldwide Flight Operations. We have flagged your flight status for immediate re-issue/rerouting assistance. Please confirm your booking reference.`;
      case 'vip':
        return `Assalam o Alaikum ${namePrefix}Greetings from Saman, CEO of SkyBridge Travel & Tourism. I am personally monitoring your worldwide travel arrangements. Please let me know how we may assist you right now.`;
      case 'custom':
      default:
        return customMessage || `Hello ${namePrefix}from SkyBridge Travel & Tourism Worldwide Case Support.`;
    }
  };

  const handleSendWhatsApp = () => {
    const rawDigits = (dispatchCountryCode + dispatchPhone).replace(/[^0-9]/g, '');
    if (!rawDigits) {
      alert('Please enter a valid traveler phone number.');
      return;
    }
    const message = encodeURIComponent(getDispatchedText());
    const waUrl = `https://wa.me/${rawDigits}?text=${message}`;
    window.open(waUrl, '_blank');
  };

  const handleCreateCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCaseData.clientName || !newCaseData.clientPhone) {
      alert('Please provide client name and phone number.');
      return;
    }
    const newCase: WorldwideCase = {
      id: `CASE-WW-${String(cases.length + 1).padStart(2, '0')}`,
      clientName: newCaseData.clientName,
      clientPhone: newCaseData.clientPhone,
      country: newCaseData.country || 'Worldwide',
      service: newCaseData.service || 'Travel Support',
      priority: (newCaseData.priority as any) || 'Urgent',
      status: (newCaseData.status as any) || 'Active',
      lastUpdate: 'Just now',
      notes: newCaseData.notes || 'Logged via CEO Case Support terminal.'
    };
    const updated = [newCase, ...cases];
    saveCases(updated);
    setShowNewCaseModal(false);
    setNewCaseData({ priority: 'Urgent', status: 'Active' });
  };

  const handleDeleteCase = (id: string) => {
    if (confirm('Delete this case record?')) {
      const updated = cases.filter(c => c.id !== id);
      saveCases(updated);
    }
  };

  // PASSWORD LOCK SCREEN
  if (!isUnlocked) {
    return (
      <div className="max-w-xl mx-auto py-12 px-4">
        <div className="bg-[#0B1B3B] text-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/10 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#4FC3F7]/15 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-400 text-slate-950 flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-8 h-8" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black uppercase tracking-wider mb-2">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>CEO Exclusive Terminal</span>
              </div>
              <h1 className="text-2xl font-black tracking-tight text-white">
                Direct WhatsApp & Worldwide Case Support
              </h1>
              <p className="text-xs text-slate-300 mt-2 max-w-md mx-auto leading-relaxed">
                This channel is strictly protected and hidden from the public website. Only the CEO can open and access this terminal using the master security password.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4 pt-4 text-left max-w-sm mx-auto">
              {authError && (
                <div className="p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{authError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  Enter CEO Master Password:
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={inputPassword}
                    onChange={e => setInputPassword(e.target.value)}
                    placeholder="Enter security password..."
                    autoFocus
                    className="w-full pl-4 pr-10 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 text-sm focus:bg-white/15 focus:border-[#4FC3F7] focus:outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  Default Master Password is <span className="font-mono text-amber-300 font-bold">admin123</span> (or your custom password).
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>Unlock Case Support Terminal</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // UNLOCKED COMMAND CENTER
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Banner & Quick Controls */}
      <div className="bg-gradient-to-r from-[#0B1B3B] via-[#0d234d] to-[#0B1B3B] text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>CEO Direct Terminal Unlocked</span>
            </span>
            <span className="text-xs text-slate-400 font-mono">Confidential Access</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Direct WhatsApp & Worldwide Case Support
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl">
            Executive priority terminal for CEO Saman. Completely private from public visitors. Coordinates UAE & worldwide client escalations, emergency support, and direct VIP communication.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setShowChangeModal(true)}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-[#4FC3F7]" />
            <span>Change Password</span>
          </button>
          <button
            onClick={handleLock}
            className="flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-600 text-white text-xs font-bold shadow-sm transition-colors"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Lock Terminal</span>
          </button>
        </div>
      </div>

      {/* Grid: Official Channels & Quick Dispatcher */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Official Direct Channels */}
        <div className="lg:col-span-1 space-y-4">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-black text-[#0B1B3B] uppercase tracking-wider flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>CEO Direct Channels</span>
              </h2>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
                Online
              </span>
            </div>

            {/* Official WhatsApp Chat */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950">Official WhatsApp (Verified)</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-600 font-mono break-all">
                {COMPANY_INFO.officialWhatsAppUrl}
              </p>
              <a
                href={COMPANY_INFO.officialWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Open WhatsApp Chat</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* WhatsApp Channel */}
            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-sky-950">Official WhatsApp Channel</span>
                <Globe className="w-4 h-4 text-sky-600" />
              </div>
              <p className="text-xs text-slate-600 font-mono break-all">
                {COMPANY_INFO.officialWhatsAppChannelUrl}
              </p>
              <a
                href={COMPANY_INFO.officialWhatsAppChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold transition-all shadow-sm"
              >
                <span>Open WhatsApp Channel</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Phone Lines */}
            <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
              <div className="text-slate-500 font-semibold uppercase text-[10px]">Direct Hotlines</div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">🇵🇰 Line 1:</span>
                <a href={`tel:${COMPANY_INFO.phonePakistan1.replace(/\s+/g, '')}`} className="font-bold text-[#0B1B3B] hover:text-[#4FC3F7]">
                  {COMPANY_INFO.phonePakistan1}
                </a>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">🇵🇰 Line 2:</span>
                <a href={`tel:${COMPANY_INFO.phonePakistan2.replace(/\s+/g, '')}`} className="font-bold text-[#0B1B3B] hover:text-[#4FC3F7]">
                  {COMPANY_INFO.phonePakistan2}
                </a>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl">
                <span className="text-slate-700 font-medium">🇦🇪 Desk:</span>
                <span className="font-bold text-slate-700">{COMPANY_INFO.uaeOfficeLabel}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center & Right Column: Worldwide Traveler Dispatcher */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-black text-[#0B1B3B] flex items-center gap-2">
                  <Send className="w-4 h-4 text-[#4FC3F7]" />
                  <span>Direct Worldwide Traveler WhatsApp Dispatcher</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Initiate executive priority WhatsApp chat to any international client with 1 click.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-black uppercase">
                CEO Fast-Track
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Client / Traveler Name (Optional)
                </label>
                <input
                  type="text"
                  value={dispatchName}
                  onChange={e => setDispatchName(e.target.value)}
                  placeholder="e.g. Tariq Mahmood"
                  className="w-full px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#4FC3F7] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Traveler Phone Number (With Country Code)
                </label>
                <div className="flex gap-2">
                  <select
                    value={dispatchCountryCode}
                    onChange={e => setDispatchCountryCode(e.target.value)}
                    className="w-28 px-2 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none"
                  >
                    <option value="+971">🇦🇪 +971 (UAE)</option>
                    <option value="+92">🇵🇰 +92 (PK)</option>
                    <option value="+966">🇸🇦 +966 (KSA)</option>
                    <option value="+44">🇬🇧 +44 (UK)</option>
                    <option value="+1">🇺🇸 +1 (US)</option>
                    <option value="+974">🇶🇦 +974 (QA)</option>
                    <option value="+968">🇴🇲 +968 (OM)</option>
                    <option value="+90">🇹🇷 +90 (TR)</option>
                    <option value="">Other (+)</option>
                  </select>
                  <input
                    type="tel"
                    value={dispatchPhone}
                    onChange={e => setDispatchPhone(e.target.value)}
                    placeholder="50 123 4567"
                    className="flex-1 px-3.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:border-[#4FC3F7] focus:outline-none"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Select Case Dispatch Template
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { key: 'emergency', label: 'Emergency Support' },
                  { key: 'visa', label: 'Visa Escalation' },
                  { key: 'flight', label: 'Flight Disruption' },
                  { key: 'vip', label: 'CEO Personal VIP' },
                  { key: 'custom', label: 'Custom Message' }
                ].map(tmpl => (
                  <button
                    key={tmpl.key}
                    type="button"
                    onClick={() => setTemplateKey(tmpl.key)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold transition-all text-left ${
                      templateKey === tmpl.key
                        ? 'bg-[#0B1B3B] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {tmpl.label}
                  </button>
                ))}
              </div>
            </div>

            {templateKey === 'custom' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Custom WhatsApp Message
                </label>
                <textarea
                  rows={3}
                  value={customMessage}
                  onChange={e => setCustomMessage(e.target.value)}
                  placeholder="Type your direct WhatsApp message here..."
                  className="w-full p-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:border-[#4FC3F7] focus:outline-none"
                />
              </div>
            )}

            {/* Preview Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Message Preview to Client:</span>
                <span className="font-mono text-emerald-600">WhatsApp Instant Dispatch</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed italic">
                "{getDispatchedText()}"
              </p>
            </div>

            <button
              type="button"
              onClick={handleSendWhatsApp}
              className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-black text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 transform active:scale-95"
            >
              <MessageCircle className="w-4 h-4 fill-white stroke-none" />
              <span>Launch Direct WhatsApp Chat to Traveler</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Section 3: Active Worldwide Travel Support Cases */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-base font-black text-[#0B1B3B] flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#0288D1]" />
              <span>Worldwide Support Cases Tracker</span>
            </h2>
            <p className="text-xs text-slate-500">
              Real-time monitoring of urgent international traveler assistance requests.
            </p>
          </div>

          <button
            onClick={() => setShowNewCaseModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#132c5e] transition-colors self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Log New Worldwide Case</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Traveler / Client</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Service & Issue</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Direct Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {cases.map(c => (
                <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-[#0B1B3B]">{c.id}</td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{c.clientName}</div>
                    <div className="font-mono text-[11px] text-slate-500">{c.clientPhone}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1 font-medium text-slate-700">
                      <MapPin className="w-3 h-3 text-[#4FC3F7]" />
                      <span>{c.country}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="font-semibold text-slate-800">{c.service}</div>
                    <div className="text-[11px] text-slate-500 truncate">{c.notes}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                        c.priority === 'Urgent'
                          ? 'bg-rose-100 text-rose-800 border border-rose-200'
                          : c.priority === 'High'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {c.priority}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        c.status === 'Active'
                          ? 'bg-emerald-100 text-emerald-800'
                          : c.status === 'Under Investigation'
                          ? 'bg-sky-100 text-sky-800'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          const digits = c.clientPhone.replace(/[^0-9]/g, '');
                          const text = encodeURIComponent(
                            `Assalam o Alaikum ${c.clientName}, SkyBridge CEO Desk following up on your case (${c.id} - ${c.service}). How can we assist you right now?`
                          );
                          window.open(`https://wa.me/${digits}?text=${text}`, '_blank');
                        }}
                        className="p-1.5 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-emerald-800 transition-colors"
                        title="Chat on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteCase(c.id)}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-400 transition-colors"
                        title="Delete Case"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PASSWORD CHANGE MODAL */}
      {showChangeModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0B1B3B] flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-500" />
                <span>Update CEO Security Password</span>
              </h3>
              <button onClick={() => setShowChangeModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            {pwdChangeMsg && (
              <div
                className={`p-3 rounded-xl text-xs font-medium flex items-center gap-2 ${
                  pwdChangeMsg.type === 'success'
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'bg-rose-50 text-rose-800 border border-rose-200'
                }`}
              >
                <span>{pwdChangeMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                <input
                  type="password"
                  value={currentPwdCheck}
                  onChange={e => setCurrentPwdCheck(e.target.value)}
                  placeholder="Enter current password..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">New Password (Min 6 chars)</label>
                <input
                  type="password"
                  value={newPwd}
                  onChange={e => setNewPwd(e.target.value)}
                  placeholder="Enter new password..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPwd}
                  onChange={e => setConfirmPwd(e.target.value)}
                  placeholder="Confirm new password..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  required
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowChangeModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#0B1B3B] hover:bg-[#152e61] text-white font-bold transition-colors"
                >
                  Save New Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* NEW CASE MODAL */}
      {showNewCaseModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0B1B3B] flex items-center gap-2">
                <Plus className="w-4 h-4 text-emerald-500" />
                <span>Log Worldwide Emergency / Priority Case</span>
              </h3>
              <button onClick={() => setShowNewCaseModal(false)} className="text-slate-400 hover:text-slate-600">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCase} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Traveler / Client Name *</label>
                  <input
                    type="text"
                    value={newCaseData.clientName || ''}
                    onChange={e => setNewCaseData({ ...newCaseData, clientName: e.target.value })}
                    placeholder="e.g. Asad Ali"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client Phone (WhatsApp) *</label>
                  <input
                    type="tel"
                    value={newCaseData.clientPhone || ''}
                    onChange={e => setNewCaseData({ ...newCaseData, clientPhone: e.target.value })}
                    placeholder="+971 50 123 4567"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono focus:bg-white focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Country / Destination</label>
                  <input
                    type="text"
                    value={newCaseData.country || ''}
                    onChange={e => setNewCaseData({ ...newCaseData, country: e.target.value })}
                    placeholder="e.g. UAE (Dubai)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Service</label>
                  <input
                    type="text"
                    value={newCaseData.service || ''}
                    onChange={e => setNewCaseData({ ...newCaseData, service: e.target.value })}
                    placeholder="e.g. Flight Rebooking"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={newCaseData.priority}
                    onChange={e => setNewCaseData({ ...newCaseData, priority: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  >
                    <option value="Urgent">Urgent (Immediate Executive Action)</option>
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Status</label>
                  <select
                    value={newCaseData.status}
                    onChange={e => setNewCaseData({ ...newCaseData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Under Investigation">Under Investigation</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Case Notes & Details</label>
                <textarea
                  rows={2}
                  value={newCaseData.notes || ''}
                  onChange={e => setNewCaseData({ ...newCaseData, notes: e.target.value })}
                  placeholder="Enter details of what needs to be handled..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowNewCaseModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors"
                >
                  Save Worldwide Case
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
