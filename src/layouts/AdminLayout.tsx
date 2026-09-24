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
  Mail
} from 'lucide-react';

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
      title: 'EXECUTIVE',
      items: [
        { label: 'CEO Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
      ]
    },
    {
      title: 'LEADS & PIPELINE',
      items: [
        { label: 'Leads Pipeline', path: '/admin/leads', icon: <Users className="w-4 h-4" /> },
        { label: 'Customers', path: '/admin/customers', icon: <Briefcase className="w-4 h-4" /> },
        { label: 'Cases & Documents', path: '/admin/cases', icon: <Stamp className="w-4 h-4" /> },
      ]
    },
    {
      title: 'B2B & SUPPLIERS',
      items: [
        { label: 'B2B Suppliers', path: '/admin/suppliers', icon: <Building2 className="w-4 h-4" /> },
        { label: 'Portals & Vault', path: '/admin/supplier-portals', icon: <Key className="w-4 h-4" /> },
        { label: 'Supplier Rate Sheets', path: '/admin/price-check', icon: <DollarSign className="w-4 h-4" /> },
        { label: 'Price Comparison', path: '/admin/price-comparison', icon: <TrendingUp className="w-4 h-4" /> },
        { label: 'Excel / CSV Import', path: '/admin/data-import', icon: <UploadCloud className="w-4 h-4" /> },
        { label: 'Google Sheets Sync', path: '/admin/integrations/google-sheets', icon: <FileSpreadsheet className="w-4 h-4" /> },
      ]
    },
    {
      title: 'PACKAGING & BILLING',
      items: [
        { label: 'Package Builder & Quotes', path: '/admin/calculator', icon: <Calculator className="w-4 h-4" /> },
        { label: 'Invoices & Billing', path: '/admin/invoices', icon: <FileText className="w-4 h-4" /> },
        { label: 'Bookings & Payments', path: '/admin/bookings', icon: <CreditCard className="w-4 h-4" /> },
      ]
    },
    {
      title: 'OPERATIONS & COMPLIANCE',
      items: [
        { label: 'Daily Operations & Follow-ups', path: '/admin/follow-ups', icon: <Calendar className="w-4 h-4" /> },
        { label: 'Tasks & Workflow', path: '/admin/tasks', icon: <CheckSquare className="w-4 h-4" /> },
        { label: 'Visa Intelligence & Alerts', path: '/admin/visa-intelligence', icon: <ShieldAlert className="w-4 h-4" /> },
      ]
    },
    {
      title: 'CEO EXCLUSIVE (RESTRICTED)',
      items: [
        { label: 'Gmail Executive Dispatch', path: '/admin/gmail-dispatch', icon: <Mail className="w-4 h-4 text-rose-400" /> },
        { label: 'Direct WhatsApp & Worldwide Support', path: '/admin/case-support', icon: <Lock className="w-4 h-4 text-amber-400" /> },
      ]
    },
    {
      title: 'ANALYTICS & SETTINGS',
      items: [
        { label: 'Reports & Analytics', path: '/admin/reports', icon: <FileSpreadsheet className="w-4 h-4" /> },
        { label: 'Google Sheets, Backups & Settings', path: '/admin/settings/backup', icon: <Database className="w-4 h-4" /> },
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
    </div>
  );
};
