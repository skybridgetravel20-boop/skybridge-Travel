import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCrm } from '../context/CrmContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Crown,
  Globe,
  X,
  Languages,
  ChevronRight,
  ShieldCheck,
  Lock,
  LayoutDashboard,
  LogOut,
  Sparkles,
  Key
} from 'lucide-react';

export const FloatingSystemSwitcher: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, login, logout } = useCrm();
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const isAdmin = location.pathname.startsWith('/admin') || location.pathname.startsWith('/ceo');

  // Confidential security constraint: ONLY show floating switcher when inside the authenticated admin/ceo portals, NEVER on the public customer-facing website!
  if (!isAdmin || location.pathname === '/admin/login' || !auth.isAuthenticated) {
    return null;
  }

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleOpenCeoDashboard = async () => {
    if (!auth.isAuthenticated) {
      await login('skybridgetravel20@gmail.com', 'admin123');
    }
    navigate('/admin/dashboard');
    setIsOpen(false);
  };

  const handleOpenPublicWebsite = () => {
    navigate('/');
    setIsOpen(false);
  };

  const handleOpenLoginPage = () => {
    navigate('/admin/login');
    setIsOpen(false);
  };

  const handleOpenCeoSuite = () => {
    navigate('/ceo');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className="fixed bottom-5 left-5 z-50 select-none font-sans"
      aria-label="System Mode Switcher"
    >
      {/* Popover Card (appears when the small floating badge is clicked) */}
      {isOpen && (
        <div className="mb-3 w-72 bg-[#0B1B3B]/98 text-white backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 p-4 transition-all duration-200 animate-in fade-in slide-in-from-bottom-2">
          <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-amber-300 block">
                  SkyBridge Portal Switcher
                </span>
                <span className="text-[10px] text-slate-300">
                  {auth.isAuthenticated ? `Logged in: ${auth.user?.name || 'Director'}` : 'Public / Guest Mode'}
                </span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Close switcher"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2">
            {/* 1. Go to Admin Dashboard */}
            <button
              onClick={handleOpenCeoDashboard}
              className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-md transition-all active:scale-95"
            >
              <div className="flex items-center gap-2.5">
                <Crown className="w-4 h-4 text-slate-950" />
                <div className="text-left">
                  <span className="block font-black">Open Admin Dashboard</span>
                  <span className="block text-[10px] text-amber-950 font-normal">
                    {auth.isAuthenticated ? 'Direct access' : '1-Click Director Access'}
                  </span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-950" />
            </button>

            {/* 2. Switch to Public Website if currently in Admin */}
            {isAdmin && (
              <button
                onClick={handleOpenPublicWebsite}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-[#4FC3F7]" />
                  <span>View Public Website</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}

            {/* 3. Open CEO Executive Suite */}
            <button
              onClick={handleOpenCeoSuite}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>CEO Executive Suite</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {/* 4. Login / Logout */}
            {auth.isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 font-semibold text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <LogOut className="w-4 h-4 text-rose-400" />
                  <span>Log Out of Dashboard</span>
                </div>
              </button>
            ) : (
              <button
                onClick={handleOpenLoginPage}
                className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-semibold text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <Key className="w-4 h-4 text-amber-400" />
                  <span>Staff / Agent Login Page</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            )}

            {/* Quick Language Toggle Bar */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-[10px] text-slate-300 mb-1.5 flex items-center gap-1">
                <Languages className="w-3 h-3 text-[#4FC3F7]" />
                <span>Language / زبان</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                {(['EN', 'UR', 'AR'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`py-1 rounded-lg text-[11px] font-bold transition-all text-center ${
                      language === lang
                        ? 'bg-[#4FC3F7] text-[#0B1B3B] shadow-xs'
                        : 'text-slate-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {lang === 'EN' ? 'EN' : lang === 'UR' ? 'اردو' : 'عربي'}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Button / Pill */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0B1B3B]/95 hover:bg-[#0B1B3B] text-white shadow-2xl border border-white/20 hover:border-amber-400/80 backdrop-blur-md hover:scale-105 active:scale-95 transition-all group focus:outline-none focus:ring-2 focus:ring-[#4FC3F7]/50"
        title="Open Dashboard / Switch Modes"
        aria-label="System Mode Switcher"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400"></span>
        </span>
        <Crown className="w-4 h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
        <span className="text-xs font-bold text-slate-100 pr-1">
          {auth.isAuthenticated ? 'Dashboard' : 'Portal'}
        </span>
      </button>
    </div>
  );
};
