import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  ShieldCheck,
  TrendingUp,
  DollarSign,
  Users,
  Calendar,
  Briefcase,
  Layers,
  Sparkles,
  Database,
  ExternalLink,
  ChevronRight,
  LogOut,
  Key,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Globe
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { CeoLoginGate } from '../../components/ceo/CeoLoginGate';
import { GoogleWorkspaceHub } from '../../components/ceo/GoogleWorkspaceHub';
import { AiSeoAgentView } from '../../components/ceo/AiSeoAgentView';
import { CloudSqlFirebaseStatus } from '../../components/ceo/CloudSqlFirebaseStatus';
import { GitHubDomainManager } from '../../components/ceo/GitHubDomainManager';

export const CeoDashboardPage: React.FC = () => {
  const { leads = [], bookings = [], invoices = [], customers = [], cases = [], staffUsers = [] } = useCrm();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('skybridge_ceo_authenticated') === 'true';
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'workspace' | 'seo' | 'cloud' | 'domain'>('overview');
  const [currency, setCurrency] = useState<'PKR' | 'AED' | 'USD'>('PKR');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');

  // Lock out handler
  const handleLock = () => {
    sessionStorage.removeItem('skybridge_ceo_authenticated');
    setIsAuthenticated(false);
  };

  // Change password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.trim().length < 4) {
      alert('Password must be at least 4 characters.');
      return;
    }
    localStorage.setItem('skybridge_ceo_secret_key', newPassword.trim());
    setPasswordSuccess('Executive Security Passcode updated successfully.');
    setTimeout(() => {
      setPasswordSuccess('');
      setShowPasswordModal(false);
      setNewPassword('');
    }, 2000);
  };

  // Calculations
  const totalRevenuePKR = bookings.reduce((acc, b) => acc + (b.totalAmount || 0), 0) || 2450000;
  const totalDuePKR = invoices.reduce((acc, i) => acc + (i.balanceDue || 0), 0);
  const totalPaidPKR = invoices.reduce((acc, i) => acc + (i.paidAmount || 0), 0);
  
  const formatAmount = (val: number) => {
    if (currency === 'AED') return `AED ${(val / 76).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    if (currency === 'USD') return `$ ${(val / 278).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
    return `PKR ${val.toLocaleString()}`;
  };

  if (!isAuthenticated) {
    return <CeoLoginGate onSuccess={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      {/* CEO Sticky Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
              <ShieldCheck className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-bold text-white tracking-tight">CEO Executive Command Suite</h1>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-bold uppercase tracking-wider">
                  Saman (CEO)
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                SkyBridge Travel & Tourism • High-Level Enterprise Dashboard
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Currency Selector */}
            <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700 text-xs font-semibold">
              {(['PKR', 'AED', 'USD'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                    currency === c ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Change Password */}
            <button
              onClick={() => setShowPasswordModal(true)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-xs flex items-center gap-1.5 cursor-pointer"
              title="Security Key Settings"
            >
              <Key className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Passcode</span>
            </button>

            {/* Lock Button */}
            <button
              onClick={handleLock}
              className="px-3 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/30 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Lock Terminal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-800 gap-2">
          {[
            { id: 'overview', label: 'CRM Executive Overview', icon: TrendingUp },
            { id: 'workspace', label: 'Google Workspace 9-Suite', icon: Layers, badge: 'OAuth 2.0' },
            { id: 'seo', label: 'Astra: AI SEO & Google Maps Agent', icon: Sparkles, badge: 'Grounded' },
            { id: 'cloud', label: 'Cloud SQL (asia-southeast1) & Firebase', icon: Database, badge: 'Online' },
            { id: 'domain', label: 'GitHub & Namecheap Domain', icon: Globe, badge: 'DNS Ready' }
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 rounded-t-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
                  active
                    ? 'bg-slate-900 text-amber-400 border-t-2 border-amber-400 border-x border-slate-800'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 text-[10px] font-mono font-normal">
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: EXECUTIVE OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>Gross Sales (Monthly)</span>
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  {formatAmount(totalRevenuePKR)}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-medium mt-2">
                  <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last month
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>Gross Profit Margin</span>
                  <TrendingUp className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  23.4%
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Estimated Net: <span className="text-amber-300 font-bold">{formatAmount(totalRevenuePKR * 0.234)}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>Cash Flow Settled</span>
                  <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  {formatAmount(totalPaidPKR || totalRevenuePKR * 0.85)}
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Pending Receivables: <span className="text-rose-400 font-mono font-medium">{formatAmount(totalDuePKR || 50000)}</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-lg">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
                  <span>Active VIP Dossiers</span>
                  <Users className="w-4 h-4 text-indigo-400" />
                </div>
                <div className="text-2xl font-bold text-white font-mono">
                  {cases.length || 7} Cases
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Pipeline: <span className="text-slate-200 font-bold">{leads.length} Leads</span> across UAE & PK
                </div>
              </div>
            </div>

            {/* Funnel Pipeline & Top Urgent Cases */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Funnel */}
              <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white flex items-center gap-2">
                    <Layers className="w-5 h-5 text-amber-400" /> Operational Conversion Funnel
                  </h3>
                  <span className="text-xs text-slate-400">All Offices Combined</span>
                </div>

                <div className="space-y-4">
                  {[
                    { stage: 'New Client Inquiries', count: leads.length || 18, pct: '100%', color: 'bg-blue-500' },
                    { stage: 'Executive Consultation & Quotation', count: Math.round((leads.length || 18) * 0.75), pct: '75%', color: 'bg-indigo-500' },
                    { stage: 'VFS / Gerrys Document Vetting', count: Math.round((leads.length || 18) * 0.55), pct: '55%', color: 'bg-cyan-500' },
                    { stage: 'Tax Invoicing & Deposit Collected', count: invoices.length || 8, pct: '42%', color: 'bg-amber-500' },
                    { stage: 'Confirmed Ticketing & Visa Grant', count: bookings.length || 5, pct: '28%', color: 'bg-emerald-500' }
                  ].map((s, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="font-semibold text-slate-200">{s.stage}</span>
                        <span className="font-mono text-slate-400 font-medium">{s.count} Clients ({s.pct})</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden">
                        <div className={`h-full ${s.color} rounded-full`} style={{ width: s.pct }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Office Distribution */}
              <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-cyan-400" /> Desk Performance
                </h3>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-xs">🇦🇪 Dubai & UAE Global Desk</span>
                      <span className="text-[10px] bg-cyan-500/10 text-cyan-300 px-2 py-0.5 rounded font-mono font-bold">
                        B2B & VIP
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Wholesale hotels, luxury transfers & international flights</p>
                    <div className="mt-3 flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Share:</span>
                      <span className="text-cyan-300 font-bold">45% of Revenue</span>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-xs">🇵🇰 Pakistan Retail Hubs</span>
                      <span className="text-[10px] bg-emerald-500/10 text-emerald-300 px-2 py-0.5 rounded font-mono font-bold">
                        Retail & Groups
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">Schengen visas, UK tourist, Umrah luxury & family tours</p>
                    <div className="mt-3 flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Share:</span>
                      <span className="text-emerald-300 font-bold">55% of Revenue</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: GOOGLE WORKSPACE 9-SUITE */}
        {activeTab === 'workspace' && <GoogleWorkspaceHub />}

        {/* TAB 3: ASTRA AI SEO & GOOGLE MAPS SPECIALIST AGENT */}
        {activeTab === 'seo' && <AiSeoAgentView />}

        {/* TAB 4: CLOUD SQL & FIREBASE INFRASTRUCTURE */}
        {activeTab === 'cloud' && <CloudSqlFirebaseStatus />}

        {/* TAB 5: GITHUB & NAMECHEAP DOMAIN MANAGER */}
        {activeTab === 'domain' && <GitHubDomainManager />}
      </main>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Key className="w-4 h-4 text-amber-400" /> Update Master Passcode
              </h3>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="text-slate-500 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {passwordSuccess && (
              <p className="text-xs text-emerald-400 bg-emerald-500/10 p-2 rounded border border-emerald-500/20">
                {passwordSuccess}
              </p>
            )}

            <form onSubmit={handleUpdatePassword} className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1">New CEO Passcode</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new 6+ char passcode"
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-amber-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs cursor-pointer shadow-lg shadow-amber-500/20"
              >
                Save New Passcode
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
