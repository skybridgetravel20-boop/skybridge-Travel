import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { useCrm } from '../context/CrmContext';
import { useLanguage } from '../context/LanguageContext';
import {
  Crown,
  Globe,
  ArrowRight,
  Shield,
  Sparkles,
  ChevronUp,
  ChevronDown,
  Lock,
  Layers
} from 'lucide-react';

export const FloatingSystemSwitcher: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { auth, login } = useCrm();
  const { language, setLanguage, t } = useLanguage();
  const [collapsed, setCollapsed] = useState(false);

  const isAdmin = location.pathname.startsWith('/admin');

  // Completely hide the floating switcher on the public website and login page.
  // Public visitors will NEVER see any floating button or CEO dashboard controls.
  if (!isAdmin || location.pathname === '/admin/login' || !auth.isAuthenticated) {
    return null;
  }

  const handleOpenCeoDashboard = async () => {
    if (!auth.isAuthenticated) {
      await login('skybridgetravel20@gmail.com', 'admin123');
    }
    navigate('/admin/dashboard');
  };

  const handleOpenPublicWebsite = () => {
    navigate('/');
  };

  return (
    <aside
      aria-label="Portal switcher and language controls"
      className="fixed bottom-5 left-5 z-50 flex flex-col items-start gap-2 select-none"
    >
      <div className="bg-[#0B1B3B]/95 text-white backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 p-2.5 flex items-center gap-2.5 text-xs transition-all duration-300 hover:shadow-cyan-500/10">
        {/* Toggle Collapse */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 transition-colors"
          title={collapsed ? "Expand Mode Switcher" : "Minimize Switcher"}
        >
          {collapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {/* Current Active Mode Indicator */}
        <div className="flex items-center gap-2 pr-2 border-r border-white/15">
          <div className={`w-2.5 h-2.5 rounded-full ${isAdmin ? 'bg-amber-400 animate-pulse' : 'bg-[#4FC3F7]'}`}></div>
          <span className="font-extrabold text-[11px] tracking-tight">
            {isAdmin ? 'CEO DASHBOARD' : 'PUBLIC WEBSITE'}
          </span>
        </div>

        {!collapsed && (
          <>
            {/* Primary One-Click Mode Switcher Button */}
            {isAdmin ? (
              <button
                onClick={handleOpenPublicWebsite}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs transition-all transform active:scale-95"
              >
                <Globe className="w-3.5 h-3.5 text-[#4FC3F7]" />
                <span>Open Public Website</span>
              </button>
            ) : (
              <button
                onClick={handleOpenCeoDashboard}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md transition-all transform active:scale-95"
              >
                <Crown className="w-3.5 h-3.5 fill-slate-950 text-slate-950" />
                <span>Open CEO Dashboard</span>
                <span className="text-[9px] bg-slate-950/20 px-1.5 py-0.5 rounded-md font-mono">
                  1-Click
                </span>
              </button>
            )}

            {/* Quick Language Toggle Bar */}
            <div className="flex items-center gap-1 pl-2 border-l border-white/15">
              {(['EN', 'UR', 'AR'] as const).map(lang => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`px-2 py-1 rounded-lg text-[11px] font-black transition-all ${
                    language === lang
                      ? 'bg-[#4FC3F7] text-[#0B1B3B] shadow-xs'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lang === 'EN' ? 'EN' : lang === 'UR' ? 'اردو' : 'عربي'}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
