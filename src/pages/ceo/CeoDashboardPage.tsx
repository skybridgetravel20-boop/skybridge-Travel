import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  Globe,
  Mail,
  Search,
  Share2,
  Megaphone,
  GraduationCap,
  Building2,
  FileSpreadsheet,
  Activity,
  CheckSquare,
  FileText,
  Plane,
  Shield,
  ArrowRight
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { CeoLoginGate } from '../../components/ceo/CeoLoginGate';
import { BackendLiveCopilot } from '../../components/admin/BackendLiveCopilot';
import { openOfficialBusinessEmail, OFFICIAL_BUSINESS_EMAIL } from '../../utils/businessEmail';
import { GoogleWorkspaceHub } from '../../components/ceo/GoogleWorkspaceHub';
import { AiSeoAgentView } from '../../components/ceo/AiSeoAgentView';
import { CloudSqlFirebaseStatus } from '../../components/ceo/CloudSqlFirebaseStatus';

export const CeoDashboardPage: React.FC = () => {
  const {
    leads = [],
    discoveredLeads = [],
    bookings = [],
    invoices = [],
    customers = [],
    cases = [],
    staffUsers = [],
    suppliers = [],
    scholarships = [],
    announcements = [],
    marketingCampaigns = [],
    socialMediaPosts = [],
    seoAuditChecks = [],
    seoContentPlan = [],
    tasks = [],
    followUps = [],
    visaAlerts = [],
    priceAlerts = [],
    integrationStatuses = [],
    googleSheets21Tabs = []
  } = useCrm();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('skybridge_ceo_authenticated') === 'true';
  });

  const [activeTab, setActiveTab] = useState<'overview' | 'modules' | 'workspace' | 'seo' | 'cloud' | 'domain'>('overview');
  const [currency, setCurrency] = useState<'PKR' | 'AED' | 'USD'>('PKR');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Lock out handler
  const handleLock = () => {
    sessionStorage.removeItem('skybridge_ceo_authenticated');
    setIsAuthenticated(false);
  };

  // Change password
  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError('');
    if (newPassword.trim().length < 4) {
      setPasswordError('Password must be at least 4 characters.');
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

  const [moduleFilter, setModuleFilter] = useState<'All' | 'AI & Growth' | 'Intelligence' | 'Operations' | 'Integrations'>('All');

  // Master 14 CEO Modules (A through N)
  const masterModules = [
    {
      code: 'A',
      title: 'CEO Business Overview',
      subtitle: 'Executive KPIs & Financial Funnel',
      category: 'Operations',
      desc: 'High-level executive metrics, revenue tracking, margin analysis, and conversion funnel across UAE & Pakistan desks.',
      path: '/admin/dashboard',
      icon: TrendingUp,
      badge: `${formatAmount(totalRevenuePKR)} Vol`,
      status: 'Live & Active',
      statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    },
    {
      code: 'B',
      title: 'AI Lead Generation Agent',
      subtitle: 'SkyBridge Lead Hunter AI',
      category: 'AI & Growth',
      desc: 'Autonomous discovery of travel buyers, corporate accounts, agencies, and international recruitment partners from permitted sources.',
      path: '/admin/lead-hunter',
      icon: Search,
      badge: `${discoveredLeads.length} Discovered Leads`,
      status: 'AI Hunter Active',
      statusColor: 'text-[#4FC3F7] border-[#4FC3F7]/30 bg-[#4FC3F7]/10'
    },
    {
      code: 'C',
      title: 'Sales & Customer CRM',
      subtitle: 'Leads, Customers, Quotations & Bookings',
      category: 'Operations',
      desc: 'Full sales lifecycle from enquiry to quotation, booking deposit, visa docket, and final reconciliation.',
      path: '/admin/leads',
      icon: Users,
      badge: `${leads.length} Active Leads • ${customers.length} Clients`,
      status: 'Pipeline Online',
      statusColor: 'text-blue-400 border-blue-500/30 bg-blue-500/10'
    },
    {
      code: 'D',
      title: 'Website Traffic & SEO Intelligence',
      subtitle: 'SkyBridge Traffic Growth AI',
      category: 'AI & Growth',
      desc: 'Automated 12-check site audit, search demand analysis, SEO content briefs, and landing page planner.',
      path: '/admin/traffic-growth',
      icon: Globe,
      badge: `${seoAuditChecks.length} Audit Checks • ${seoContentPlan.length} Content Briefs`,
      status: '92% SEO Health',
      statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    },
    {
      code: 'E',
      title: 'Social Media Growth Center',
      subtitle: '6-Platform Content Engine',
      category: 'AI & Growth',
      desc: 'Multi-platform social content generation across FB, IG, TikTok, YouTube, LinkedIn, and Pinterest with 6-stage CEO approval.',
      path: '/admin/social-media',
      icon: Share2,
      badge: `${socialMediaPosts.length} Posts & Scripts`,
      status: '6 Platforms Linked',
      statusColor: 'text-purple-400 border-purple-500/30 bg-purple-500/10'
    },
    {
      code: 'F',
      title: 'Visa & Immigration Intelligence',
      subtitle: 'Schengen & Global Visa Agent',
      category: 'Intelligence',
      desc: 'Official consular fee schedules, embassy appointment links, document requirements across 29 Schengen states.',
      path: '/admin/schengen-agent',
      icon: Sparkles,
      badge: `29 Schengen States • ${visaAlerts.length} Alerts`,
      status: 'Consular Live',
      statusColor: 'text-cyan-400 border-cyan-500/30 bg-cyan-500/10'
    },
    {
      code: 'G',
      title: 'Manpower & Recruitment Intelligence',
      subtitle: 'Overseas Recruitment Agent',
      category: 'Intelligence',
      desc: 'International employer career tracking, work-permit quotas, verified sponsors, and recruiter B2B opportunities.',
      path: '/admin/manpower-agent',
      icon: Briefcase,
      badge: '6 Global Hiring Tracks',
      status: 'Direct Employer Feed',
      statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    },
    {
      code: 'H',
      title: 'Scholarship Intelligence',
      subtitle: 'Verified Global Higher-Ed Grants',
      category: 'Intelligence',
      desc: 'Verified global university scholarships, government-funded programs, eligibility rules, and deadline tracking.',
      path: '/admin/scholarships',
      icon: GraduationCap,
      badge: `${scholarships.length} Verified Programs`,
      status: 'Fully & Partially Funded',
      statusColor: 'text-teal-400 border-teal-500/30 bg-teal-500/10'
    },
    {
      code: 'I',
      title: 'Supplier & Business Partner Directory',
      subtitle: 'Airlines, Bedbanks, Umrah DMCs & Portals',
      category: 'Operations',
      desc: 'Airlines, FlyNow B2B, Bedbanks, Umrah DMCs, travel insurers, and specialist partner directories with credentials vault.',
      path: '/admin/suppliers',
      icon: Building2,
      badge: `${suppliers.length} Master Suppliers`,
      status: 'B2B Wholesale Vault',
      statusColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
    },
    {
      code: 'J',
      title: 'Campaign & Promotional Message Center',
      subtitle: 'CEO-Approved Broadcast Marketing',
      category: 'AI & Growth',
      desc: 'Controlled marketing broadcast campaigns with mandatory CEO approval, opt-out management, and strict spam protection.',
      path: '/admin/campaigns',
      icon: Megaphone,
      badge: `${marketingCampaigns.length} Campaigns Active`,
      status: 'CEO Approvals Enforced',
      statusColor: 'text-rose-400 border-rose-500/30 bg-rose-500/10'
    },
    {
      code: 'K',
      title: 'Google Workspace Data Center',
      subtitle: '21-Tab Sync & Document Register',
      category: 'Integrations',
      desc: 'Bidirectional synchronization with 21 official Google Sheets tabs and Google Drive document registration vault.',
      path: '/admin/integrations/google-sheets',
      icon: FileSpreadsheet,
      badge: `${googleSheets21Tabs.length || 21} Tabs Synchronized`,
      status: 'Google Sheets Connected',
      statusColor: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    },
    {
      code: 'L',
      title: 'Integration & Connection Status',
      subtitle: 'Platform Health & Connectors',
      category: 'Integrations',
      desc: 'Real-time health monitor and official setup guides for Meta, TikTok, LinkedIn, YouTube, Google APIs, and Cloud SQL.',
      path: '/admin/integration-status',
      icon: Activity,
      badge: `${integrationStatuses.length || 7} Connectors Monitored`,
      status: 'Health Matrix Online',
      statusColor: 'text-sky-400 border-sky-500/30 bg-sky-500/10'
    },
    {
      code: 'M',
      title: 'Tasks, Alerts & Approvals',
      subtitle: 'Operational Bottleneck Zeroing',
      category: 'Operations',
      desc: 'Centralized operational inbox for consular fee changes, supplier rate alerts, customer follow-ups, and pending approvals.',
      path: '/admin/tasks',
      icon: CheckSquare,
      badge: `${tasks.length + followUps.length} Pending Actions`,
      status: 'Zero Bottleneck Protocol',
      statusColor: 'text-amber-400 border-amber-500/30 bg-amber-500/10'
    },
    {
      code: 'N',
      title: 'Reports & Analytics',
      subtitle: 'Daily & Weekly Executive P&L',
      category: 'Operations',
      desc: 'Daily operations log, weekly performance briefing, monthly P&L reconciliation, and business intelligence export.',
      path: '/admin/reports',
      icon: FileText,
      badge: 'Daily & Weekly Briefs',
      status: 'Automated P&L',
      statusColor: 'text-indigo-400 border-indigo-500/30 bg-indigo-500/10'
    }
  ];

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
                  Urwa Ali (Director)
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

            {/* Official Webmail Launcher */}
            <button
              onClick={(e) => openOfficialBusinessEmail({}, e)}
              className="px-3 py-1.5 rounded-lg bg-sky-900/60 hover:bg-sky-800 text-sky-200 border border-sky-500/40 text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-sm"
              title={`Open Official Email (${OFFICIAL_BUSINESS_EMAIL}) in web browser (Never Outlook)`}
            >
              <Mail className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden md:inline font-mono text-[11px]">info@</span>
              <span className="md:hidden">Email</span>
            </button>

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
        {/* Director Executive Jump Bar - 4 AI Engines */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
          <Link
            to="/admin/lead-hunter"
            className="flex items-center gap-3 p-3 rounded-xl bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 text-blue-300 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 flex items-center justify-center text-[#4FC3F7] font-bold group-hover:scale-110 transition-transform">
              <Search className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>SkyBridge Lead Hunter AI</span>
                <span className="text-[9px] bg-[#4FC3F7]/20 text-[#4FC3F7] px-1.5 py-0.5 rounded font-mono font-bold">New</span>
              </div>
              <p className="text-[11px] text-blue-300/80 truncate">{discoveredLeads.length} leads discovered & verified</p>
            </div>
            <ExternalLink className="w-4 h-4 text-[#4FC3F7] shrink-0 opacity-70 group-hover:opacity-100" />
          </Link>

          <Link
            to="/admin/traffic-growth"
            className="flex items-center gap-3 p-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold group-hover:scale-110 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Traffic Growth AI & SEO</span>
                <span className="text-[9px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-mono font-bold">Audit</span>
              </div>
              <p className="text-[11px] text-emerald-300/80 truncate">12-point audit & search planner</p>
            </div>
            <ExternalLink className="w-4 h-4 text-emerald-400 shrink-0 opacity-70 group-hover:opacity-100" />
          </Link>

          <Link
            to="/admin/schengen-agent"
            className="flex items-center gap-3 p-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-cyan-500/20 flex items-center justify-center text-cyan-400 font-bold group-hover:scale-110 transition-transform">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Visa Intelligence AI</span>
                <span className="text-[9px] bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-mono font-bold">29 States</span>
              </div>
              <p className="text-[11px] text-cyan-300/80 truncate">Official fees, portals & dossiers</p>
            </div>
            <ExternalLink className="w-4 h-4 text-cyan-400 shrink-0 opacity-70 group-hover:opacity-100" />
          </Link>

          <Link
            to="/admin/manpower-agent"
            className="flex items-center gap-3 p-3 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 transition-all group"
          >
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-400 font-bold group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Manpower & Recruitment</span>
                <span className="text-[9px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">Global</span>
              </div>
              <p className="text-[11px] text-amber-300/80 truncate">International hiring & sponsors</p>
            </div>
            <ExternalLink className="w-4 h-4 text-amber-400 shrink-0 opacity-70 group-hover:opacity-100" />
          </Link>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b border-slate-800 gap-2">
          {[
            { id: 'overview', label: 'CRM Executive Overview', icon: TrendingUp },
            { id: 'modules', label: '14 Master CEO Modules (A-N)', icon: Layers, badge: 'Full System' },
            { id: 'workspace', label: 'Google Workspace 9-Suite', icon: FileSpreadsheet, badge: 'OAuth 2.0' },
            { id: 'seo', label: 'Astra: AI SEO & Google Maps Agent', icon: Sparkles, badge: 'Grounded' },
            { id: 'cloud', label: 'Cloud SQL (asia-southeast1) & Firebase', icon: Database, badge: 'Online' }
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

            {/* 14 MASTER CEO BUSINESS & AI MODULES (A - N) SUMMARY */}
            <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4FC3F7] animate-pulse"></span>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Layers className="w-5 h-5 text-[#4FC3F7]" />
                      Executive Command: 14 Master Business & AI Modules (A - N)
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    Centralized management of autonomous growth agents, intelligence portals, wholesale suppliers, and CRM operations.
                  </p>
                </div>
                <button
                  onClick={() => setActiveTab('modules')}
                  className="px-3.5 py-2 rounded-xl bg-[#4FC3F7]/10 hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 text-[#4FC3F7] text-xs font-bold transition-all flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <span>Explore All 14 Modules</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Grid of the 14 modules */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {masterModules.map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <Link
                      key={mod.code}
                      to={mod.path}
                      className="group p-4 rounded-xl bg-slate-950/70 hover:bg-slate-950 border border-slate-800/90 hover:border-[#4FC3F7]/50 transition-all flex flex-col justify-between space-y-3"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg bg-slate-800 border border-slate-700 text-[#4FC3F7] text-xs font-black flex items-center justify-center font-mono">
                              {mod.code}
                            </span>
                            <span className="text-xs font-bold text-white group-hover:text-[#4FC3F7] transition-colors line-clamp-1">
                              {mod.title}
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${mod.statusColor}`}>
                            {mod.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                          {mod.desc}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500 font-mono text-[10px] uppercase font-bold tracking-wider">
                          {mod.subtitle || mod.category}
                        </span>
                        <span className="text-[#4FC3F7] font-semibold flex items-center gap-1 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                          Launch <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB: 14 MASTER CEO MODULES DEEP DIVE */}
        {activeTab === 'modules' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0B1B3B]/60 to-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded bg-[#4FC3F7]/10 border border-[#4FC3F7]/30 text-[#4FC3F7] text-[10px] font-mono font-bold uppercase">
                    Architecture Specification: Modules A - N
                  </span>
                  <span className="text-xs text-slate-400">• SkyBridge Digital OS</span>
                </div>
                <h2 className="text-xl font-black text-white tracking-tight">
                  14 Master CEO Business & AI Growth Modules
                </h2>
                <p className="text-xs text-slate-400 mt-1 max-w-2xl">
                  Unified command center integrating Lead Hunter AI, SEO & Traffic Growth AI, Schengen & Global Visa Intelligence, Manpower & Overseas Recruitment, 21-Tab Google Sheets Data Center, and Wholesale Travel Suppliers.
                </p>
              </div>

              {/* Filter Pills */}
              <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 self-start md:self-auto">
                {(['All', 'AI & Growth', 'Intelligence', 'Operations', 'Integrations'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setModuleFilter(cat)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      moduleFilter === cat
                        ? 'bg-[#4FC3F7] text-slate-950 shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {masterModules
                .filter((m) => moduleFilter === 'All' || m.category === moduleFilter)
                .map((mod) => {
                  const Icon = mod.icon;
                  return (
                    <div
                      key={mod.code}
                      className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-[#4FC3F7]/40 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-[#4FC3F7] group-hover:scale-105 transition-transform">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="px-1.5 py-0.5 rounded bg-slate-800 text-[#4FC3F7] font-mono text-[11px] font-black">
                                  MODULE {mod.code}
                                </span>
                                <span className="text-[10px] text-slate-400 uppercase font-semibold">
                                  {mod.category}
                                </span>
                              </div>
                              <h3 className="text-sm font-bold text-white group-hover:text-[#4FC3F7] transition-colors mt-0.5">
                                {mod.title}
                              </h3>
                            </div>
                          </div>
                        </div>

                        <div className="text-[11px] font-mono text-amber-400/90 font-semibold">
                          {mod.subtitle}
                        </div>

                        <p className="text-xs text-slate-400 leading-relaxed">
                          {mod.desc}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 space-y-3">
                        <div className="flex items-center justify-between text-xs">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${mod.statusColor}`}>
                            {mod.status}
                          </span>
                          <span className="text-slate-300 font-mono text-xs font-semibold">
                            {mod.badge}
                          </span>
                        </div>

                        <Link
                          to={mod.path}
                          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-[#4FC3F7] text-slate-200 hover:text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
                        >
                          <span>Launch Module Workspace</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TAB 2: GOOGLE WORKSPACE 9-SUITE */}
        {activeTab === 'workspace' && <GoogleWorkspaceHub />}

        {/* TAB 3: ASTRA AI SEO & GOOGLE MAPS SPECIALIST AGENT */}
        {activeTab === 'seo' && <AiSeoAgentView />}

        {/* TAB 4: CLOUD SQL & FIREBASE INFRASTRUCTURE */}
        {activeTab === 'cloud' && <CloudSqlFirebaseStatus />}
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

            {passwordError && (
              <p className="text-xs text-rose-400 bg-rose-500/10 p-2 rounded border border-rose-500/20">
                {passwordError}
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

      {/* Live Gemini Executive Copilot for Director Urwa Ali */}
      <BackendLiveCopilot />
    </div>
  );
};
