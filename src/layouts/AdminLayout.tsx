import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useCrm } from '../context/CrmContext';
import { useLanguage } from '../context/LanguageContext';
import { SkyBridgeLogo } from '../components/SkyBridgeLogo';
import { LanguageSelector } from '../components/LanguageSelector';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Calendar,
  CheckSquare,
  FileSpreadsheet,
  Settings,
  Database,
  Shield,
  Search,
  Bell,
  LogOut,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Lock,
  Menu,
  X,
  CreditCard,
  MapPin,
  Stamp,
  Trash2,
  RefreshCw,
  Building2,
  DollarSign,
  Calculator,
  ShieldAlert,
  FileText,
  Layers,
  FileCheck,
  FolderOpen,
  Key,
  UploadCloud,
  TrendingUp,
  Mail,
  Compass,
  Cpu,
  GraduationCap,
  Plane,
  Hotel,
  Tag,
  Activity,
  Globe,
  Share2,
  Megaphone,
  Moon,
  ShieldCheck as ShieldCheckIcon
} from 'lucide-react';
import { BackendLiveCopilot } from '../components/admin/BackendLiveCopilot';
import { openOfficialBusinessEmail, OFFICIAL_BUSINESS_EMAIL } from '../utils/businessEmail';

export const AdminLayout: React.FC = () => {
  const { auth, logout, notifications, markNotificationRead, clearNotifications, clearDemoData, restoreDemoData, leads } = useCrm();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Protected Route: If not authenticated, redirect immediately to login
  if (!auth.isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const hasDemoData = leads.some(l => l.isDemo);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/admin/leads?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const navGroups = [
    {
      title: '1. EXECUTIVE COMMAND',
      items: [
        { label: 'CEO Executive Suite', path: '/ceo', icon: <ShieldCheckIcon className="w-4 h-4 text-amber-400" /> },
        { label: 'CEO Overview', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4 text-amber-500" /> },
        { label: 'AI Agent Control Centre', path: '/admin/ai-agents', icon: <Cpu className="w-4 h-4 text-indigo-500" /> },
        { label: 'Intelligence Hub (Decrees)', path: '/admin/intelligence-hub', icon: <ShieldAlert className="w-4 h-4 text-sky-500" /> },
        { label: 'Reports & Commercial Intelligence', path: '/admin/reports', icon: <FileSpreadsheet className="w-4 h-4 text-blue-500" /> },
        { label: 'Notifications & Alerts', path: '/admin/notifications', icon: <Bell className="w-4 h-4 text-amber-500" /> },
      ]
    },
    {
      title: '2. INTELLIGENCE & RESEARCH',
      items: [
        { label: 'Visa Intelligence AI Agent', path: '/admin/schengen-agent', icon: <Compass className="w-4 h-4 text-cyan-500" /> },
        { label: 'Manpower & Recruitment Agent', path: '/admin/manpower-agent', icon: <Briefcase className="w-4 h-4 text-emerald-500" /> },
        { label: 'Scholarship Intelligence', path: '/admin/scholarships', icon: <GraduationCap className="w-4 h-4 text-teal-500" /> },
        { label: 'Consular Tariff Updates', path: '/admin/visa-intelligence', icon: <Shield className="w-4 h-4 text-blue-500" /> },
      ]
    },
    {
      title: '3. SUPPLIERS & WHOLESALE',
      items: [
        { label: 'Supplier Master Directory', path: '/admin/suppliers', icon: <Building2 className="w-4 h-4 text-blue-600" /> },
        { label: 'Flight Suppliers & FlyNow', path: '/admin/flight-suppliers', icon: <Plane className="w-4 h-4 text-sky-600" /> },
        { label: 'Umrah Suppliers & DMC', path: '/admin/umrah-suppliers', icon: <Compass className="w-4 h-4 text-amber-600" /> },
        { label: 'Hotel Suppliers & Bedbanks', path: '/admin/hotel-suppliers', icon: <Hotel className="w-4 h-4 text-purple-600" /> },
        { label: 'Insurance Suppliers', path: '/admin/insurance-suppliers', icon: <Shield className="w-4 h-4 text-emerald-600" /> },
        { label: 'Other Travel Suppliers', path: '/admin/other-suppliers', icon: <Layers className="w-4 h-4 text-slate-600" /> },
        { label: 'Portals Vault & Passwords', path: '/admin/supplier-portals', icon: <Key className="w-4 h-4 text-amber-600" /> },
        { label: 'Supplier Rate Sheets', path: '/admin/price-check', icon: <DollarSign className="w-4 h-4 text-emerald-600" /> },
        { label: 'Price & Margin Comparison', path: '/admin/price-comparison', icon: <TrendingUp className="w-4 h-4 text-indigo-600" /> },
      ]
    },
    {
      title: '4. CRM, LEADS & BILLING',
      items: [
        { label: 'Customers Database', path: '/admin/customers', icon: <Briefcase className="w-4 h-4 text-indigo-600" /> },
        { label: 'Leads & CRM Pipeline', path: '/admin/leads', icon: <Users className="w-4 h-4 text-blue-600" /> },
        { label: 'Quotations & Calculator', path: '/admin/calculator', icon: <Calculator className="w-4 h-4 text-emerald-600" /> },
        { label: 'Bookings Management', path: '/admin/bookings', icon: <CreditCard className="w-4 h-4 text-indigo-600" /> },
        { label: 'Payments & Reconciliation', path: '/admin/invoices', icon: <FileText className="w-4 h-4 text-amber-600" /> },
        { label: 'Daily Operations & Follow-ups', path: '/admin/follow-ups', icon: <Calendar className="w-4 h-4 text-slate-600" /> },
        { label: 'Tasks & Workflow', path: '/admin/tasks', icon: <CheckSquare className="w-4 h-4 text-slate-600" /> },
        { label: 'Umrah Pilgrim Tracker', path: '/admin/dashboard#umrah-status-tracker', icon: <Moon className="w-4 h-4 text-emerald-500" /> },
      ]
    },
    {
      title: '5. GROWTH, SEO & SOCIAL MARKETING',
      items: [
        { label: 'SkyBridge Lead Hunter AI', path: '/admin/lead-hunter', icon: <Search className="w-4 h-4 text-blue-500" /> },
        { label: 'Traffic Growth AI & SEO Audit', path: '/admin/traffic-growth', icon: <Globe className="w-4 h-4 text-emerald-500" /> },
        { label: 'Social Media Growth Center', path: '/admin/social-media', icon: <Share2 className="w-4 h-4 text-purple-500" /> },
        { label: 'Marketing Campaign Center', path: '/admin/campaigns', icon: <Megaphone className="w-4 h-4 text-amber-500" /> },
        { label: 'Approved Website Offers', path: '/admin/website-offers', icon: <Tag className="w-4 h-4 text-rose-500" /> },
        { label: 'Content Calendar & Social', path: '/admin/content-calendar', icon: <Calendar className="w-4 h-4 text-indigo-500" /> },
      ]
    },
    {
      title: '6. GOOGLE WORKSPACE & INTEGRATIONS',
      items: [
        { label: 'Google Sheets 21-Tab Sync', path: '/admin/integrations/google-sheets', icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> },
        { label: 'Google Drive Document Register', path: '/admin/document-register', icon: <FolderOpen className="w-4 h-4 text-indigo-600" /> },
        { label: 'Integration Status Centre', path: '/admin/integration-status', icon: <Activity className="w-4 h-4 text-teal-600" /> },
        { label: 'Operational Audit Logs', path: '/admin/audit-logs', icon: <ShieldCheckIcon className="w-4 h-4 text-slate-700" /> },
        { label: 'Settings, Backup & Data', path: '/admin/settings/backup', icon: <Database className="w-4 h-4 text-slate-600" /> },
        { label: 'Case Support & Worldwide Desk', path: '/admin/case-support', icon: <Lock className="w-4 h-4 text-amber-600" /> },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Demo Data Banner if active */}
      {hasDemoData && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-semibold flex items-center justify-between shadow-sm z-50">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-amber-950 text-white font-mono text-[10px] uppercase font-bold">
              DEMO DATA
            </span>
            <span>Initial sample records are loaded for testing. Real production records will never be mixed with demo data.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => clearDemoData()}
              className="px-2.5 py-1 rounded bg-amber-900 text-white text-[11px] font-bold hover:bg-black transition-colors flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear Demo Records (Reset to 0)</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Desktop */}
        <aside className="w-64 bg-[#0B1B3B] text-slate-300 flex-col justify-between hidden md:flex shrink-0 border-r border-white/10">
          <div>
            {/* Brand Logo */}
            <div className="p-5 border-b border-white/10">
              <Link to="/admin/dashboard" className="flex items-center gap-2.5">
                <SkyBridgeLogo size="sm" />
                <div>
                  <span className="block text-sm font-black text-white tracking-tight leading-none">
                    SKY<span className="text-[#4FC3F7]">BRIDGE</span>
                  </span>
                  <span className="block text-[8px] uppercase tracking-wider text-slate-400 font-bold mt-1">
                    DIGITAL OPERATING SYSTEM
                  </span>
                </div>
              </Link>
            </div>

            {/* Navigation links grouped */}
            <nav className="p-3.5 space-y-4 flex-1 overflow-y-auto max-h-[calc(100vh-180px)]">
              {navGroups.map(group => (
                <div key={group.title} className="space-y-1">
                  <div className="px-3 text-[10px] font-black uppercase tracking-wider text-[#4FC3F7]/70 mb-1">
                    {group.title}
                  </div>
                  <div className="space-y-0.5">
                    {group.items.map(item => {
                      const isActive = location.pathname === item.path || (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));
                      return (
                        <Link
                          key={item.path}
                          to={item.path}
                          className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                            isActive
                              ? 'bg-[#4FC3F7] text-[#0B1B3B] shadow-xs'
                              : 'text-slate-300 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {item.icon}
                          <span className="truncate">{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>

          {/* User profile & external link */}
          <div className="p-4 border-t border-white/10 space-y-3 shrink-0">
            <Link
              to="/"
              target="_blank"
              className="flex items-center justify-between px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 transition-colors"
            >
              <span className="flex items-center gap-2">
                <ExternalLink className="w-3.5 h-3.5 text-[#4FC3F7]" />
                <span>Open Public Website</span>
              </span>
              <ChevronRight className="w-3 h-3 text-slate-500" />
            </Link>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <img
                  src={auth.user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt="Staff"
                  className="w-8 h-8 rounded-full object-cover border border-white/20 shrink-0"
                />
                <div className="overflow-hidden">
                  <div className="text-xs font-bold text-white truncate">{auth.user?.name}</div>
                  <div className="text-[10px] text-[#4FC3F7] truncate">{auth.user?.role}</div>
                </div>
              </div>
              <button
                onClick={logout}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                title="Sign Out"
                aria-label="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </aside>

        {/* Mobile Sidebar Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex md:hidden">
            <div className="fixed inset-0 bg-black/50" onClick={() => setSidebarOpen(false)}></div>
            <aside className="relative w-64 bg-[#0B1B3B] text-slate-300 flex flex-col justify-between p-4 z-10">
              <div className="flex-1 overflow-y-auto">
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <SkyBridgeLogo size="sm" />
                    <span className="text-xs font-black text-white">SKYBRIDGE OS</span>
                  </div>
                  <button onClick={() => setSidebarOpen(false)} className="text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <nav className="space-y-4">
                  {navGroups.map(group => (
                    <div key={group.title} className="space-y-1">
                      <div className="px-2 text-[9px] font-black uppercase tracking-wider text-[#4FC3F7]/70">
                        {group.title}
                      </div>
                      <div className="space-y-0.5">
                        {group.items.map(item => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setSidebarOpen(false)}
                            className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold hover:bg-white/10"
                          >
                            {item.icon}
                            <span>{item.label}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  onClick={() => { logout(); setSidebarOpen(false); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/10 text-xs font-bold text-white"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </aside>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          {/* Top Admin Navigation Header */}
          <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3 flex items-center justify-between shadow-2xs">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden p-2 rounded-lg bg-slate-100 text-slate-700"
                aria-label="Open sidebar"
              >
                <Menu className="w-5 h-5" />
              </button>

              {/* Global Search Bar */}
              <form onSubmit={handleSearchSubmit} className="relative w-48 sm:w-80">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search leads, clients, ID (SB-2026-X)..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-100 border border-transparent rounded-xl focus:bg-white focus:border-[#4FC3F7] focus:outline-none transition-all"
                />
              </form>
            </div>

            <div className="flex items-center gap-3">
              {/* Notifications dropdown */}
              <div className="relative">
                <button
                  onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                  className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[9px] font-bold flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {notifDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 p-3 z-50 animate-in fade-in">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
                      <h4 className="text-xs font-bold text-[#0B1B3B]">CRM Alerts & Notifications</h4>
                      <button
                        onClick={clearNotifications}
                        className="text-[10px] text-slate-400 hover:text-slate-600"
                      >
                        Clear all
                      </button>
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400 py-3 text-center">No active notifications</p>
                      ) : (
                        notifications.map(n => (
                          <div
                            key={n.id}
                            onClick={() => {
                              markNotificationRead(n.id);
                              if (n.link) {
                                navigate(n.link);
                                setNotifDropdownOpen(false);
                              }
                            }}
                            className={`p-2.5 rounded-xl text-xs cursor-pointer transition-colors ${
                              n.read ? 'bg-slate-50 text-slate-600' : 'bg-[#E3F2FD] text-[#0B1B3B] font-semibold'
                            }`}
                          >
                            <div className="font-bold">{n.title}</div>
                            <div className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{n.message}</div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Official Business Email Launcher (info@skybridgetravelandtourism.com) */}
              <button
                onClick={(e) => openOfficialBusinessEmail({}, e)}
                title={`Open Official Business Email (${OFFICIAL_BUSINESS_EMAIL}) in browser (Never Outlook)`}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 text-xs font-semibold transition-colors border border-sky-200 shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-sky-600" />
                <span className="font-mono text-[11px]">info@</span>
              </button>

              {/* Language Selector in Admin Header */}
              <div className="hidden sm:block">
                <LanguageSelector variant="compact" />
              </div>

              {/* Quick Website Switcher */}
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                <span>View Website</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </header>

          {/* Admin Page Content */}
          <main className="p-4 sm:p-6 lg:p-8 flex-1">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Persistent Live AI Copilot (Gemini Assistant for Director Urwa Ali) */}
      <BackendLiveCopilot />
    </div>
  );
};
