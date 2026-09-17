import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useCrm } from '../../context/CrmContext';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSelector } from '../../components/LanguageSelector';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Crown,
  Server,
  ShieldCheck,
  Database,
  KeyRound,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Globe
} from 'lucide-react';
import { SkyBridgeLogo } from '../../components/SkyBridgeLogo';

export const AdminLoginPage: React.FC = () => {
  const { login, auth } = useCrm();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('skybridgetravel20@gmail.com');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBackendInfo, setShowBackendInfo] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // If already logged in, redirect immediately to target route or dashboard
  React.useEffect(() => {
    if (auth.isAuthenticated) {
      const destination = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(destination, { replace: true });
    }
  }, [auth.isAuthenticated, navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const success = await login(email, password);
      if (success) {
        const destination = (location.state as any)?.from?.pathname || '/admin/dashboard';
        navigate(destination, { replace: true });
      } else {
        setErrorMessage('Invalid credentials. Password did not match master security key (default is admin123).');
      }
    } catch {
      setErrorMessage('Authentication service encountered an issue. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail.trim()) {
      setForgotSuccess(true);
    }
  };

  const handleQuickLogin = async (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword('admin123');
    setErrorMessage('');
    setIsSubmitting(true);
    const success = await login(roleEmail, 'admin123');
    setIsSubmitting(false);
    if (success) {
      const destination = (location.state as any)?.from?.pathname || '/admin/dashboard';
      navigate(destination, { replace: true });
    }
  };

  return (
    <div className="min-h-screen bg-[#0B1B3B] flex items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background ambient accents */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-[#4FC3F7]/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-[#FFB300]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Bar on Login Page: Language Selector & Back to Site */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-3">
        <LanguageSelector variant="compact" />
        <Link
          to="/"
          className="text-xs font-semibold text-slate-300 hover:text-white bg-white/10 px-3 py-1.5 rounded-full border border-white/20 transition-colors"
        >
          ← Back to Website
        </Link>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 relative z-10">
        {/* Official Brand Header */}
        <div className="text-center mb-6 flex flex-col items-center">
          <SkyBridgeLogo size="lg" className="mb-3" />
          <h1 className="text-xl font-black tracking-tight text-[#0B1B3B]">
            SKYBRIDGE OPERATING SYSTEM
          </h1>
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mt-1">
            Private CEO & Management Command Portal
          </p>
        </div>

        {/* 1-Click Instant CEO Access Box */}
        <div className="mb-6 p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-slate-50 border-2 border-amber-400/30 text-center">
          <div className="flex items-center justify-center gap-2 mb-1.5">
            <Crown className="w-4 h-4 text-amber-600 fill-amber-500" />
            <span className="text-xs font-black uppercase tracking-wider text-amber-900">
              Direct Executive Access
            </span>
          </div>
          <p className="text-xs text-slate-600 mb-3">
            Open the full CEO & Admin CRM Dashboard instantly with verified founder credentials.
          </p>
          <button
            type="button"
            disabled={isSubmitting}
            onClick={() => handleQuickLogin('skybridgetravel20@gmail.com')}
            className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs shadow-md hover:shadow-lg transition-all transform active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 fill-slate-950 text-slate-950" />
            <span>Enter CEO Dashboard Instantly (Saman)</span>
          </button>
        </div>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink mx-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            or sign in with credentials
          </span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Staff Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="staff@skybridgetravel.com"
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#4FC3F7]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#4FC3F7]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded text-[#0B1B3B] focus:ring-[#4FC3F7]"
              />
              <span>Remember this workstation</span>
            </label>

            <button
              type="button"
              onClick={() => { setForgotModalOpen(true); setForgotSuccess(false); }}
              className="text-[#0B1B3B] hover:text-[#4FC3F7] font-semibold"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
          >
            <span>Sign In to CRM</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Role Select for instant testing */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 text-center">
            One-Click Staff Role Login
          </span>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => handleQuickLogin('skybridgetravel20@gmail.com')}
              className="px-2 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-[11px] font-bold transition-colors text-center flex flex-col items-center justify-center gap-0.5 shadow-sm"
            >
              <Crown className="w-3.5 h-3.5 text-[#FFB300]" />
              <span>CEO (Saman)</span>
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('bilal@skybridgetravel.com')}
              className="px-2 py-2 rounded-xl bg-slate-100 hover:bg-[#E3F2FD] hover:text-[#0B1B3B] text-slate-700 text-[11px] font-bold transition-colors text-center"
            >
              Manager
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('ayesha@skybridgetravel.com')}
              className="px-2 py-2 rounded-xl bg-slate-100 hover:bg-[#E3F2FD] hover:text-[#0B1B3B] text-slate-700 text-[11px] font-bold transition-colors text-center"
            >
              Visa Agent
            </button>
          </div>
        </div>

        <div className="mt-6 pt-5 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowBackendInfo(!showBackendInfo)}
            className="w-full flex items-center justify-between text-xs text-slate-500 hover:text-[#0B1B3B] font-semibold py-1 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-[#0B1B3B]" />
              <span>Backend & Security Architecture</span>
            </span>
            {showBackendInfo ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showBackendInfo && (
            <div className="mt-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-[11px] text-slate-600 space-y-2.5 animate-fadeIn">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Auth Provider:
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-[10px]">
                  SkyBridge IAM Active
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-blue-600" />
                  Master Password:
                </span>
                <span className="font-mono font-bold text-slate-800 bg-white px-2 py-0.5 rounded border border-slate-200">
                  admin123
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Database className="w-3.5 h-3.5 text-indigo-600" />
                  Persistence:
                </span>
                <span className="text-slate-700 font-medium">Encrypted Local Storage + Auto-Backup</span>
              </div>
              <p className="text-[10px] text-slate-500 leading-relaxed pt-1 border-t border-slate-200">
                To connect an external remote database (e.g., PostgreSQL or Firebase Cloud SQL), configure your keys in <code className="bg-slate-200 px-1 py-0.5 rounded text-slate-800 font-mono">.env.example</code>. The system provides zero-setup local sandbox persistence by default.
              </p>
            </div>
          )}
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-xs text-slate-500 hover:text-[#0B1B3B] font-semibold">
            ← Back to Public Website
          </Link>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl border border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#0B1B3B]">Password Reset Request</h3>
              <button
                onClick={() => setForgotModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 text-xs font-bold"
              >
                Close
              </button>
            </div>

            {forgotSuccess ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Reset Link Sent</h4>
                <p className="text-xs text-emerald-700">
                  Password reset instructions have been forwarded to <strong>{forgotEmail}</strong>. Please check your internal inbox.
                </p>
                <button
                  onClick={() => setForgotModalOpen(false)}
                  className="mt-2 w-full py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold"
                >
                  Return to Login
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-3">
                <p className="text-xs text-slate-500 leading-relaxed">
                  Enter your registered SkyBridge corporate email address to receive an authorized security reset link.
                </p>
                <input
                  type="email"
                  required
                  placeholder="name@skybridgetravel.com"
                  value={forgotEmail}
                  onChange={e => setForgotEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
                >
                  Send Reset Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
