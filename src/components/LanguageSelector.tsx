import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, SupportedLanguage } from '../context/LanguageContext';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface LanguageSelectorProps {
  variant?: 'header-pill' | 'compact' | 'drawer' | 'admin';
  className?: string;
}

export const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  variant = 'header-pill',
  className = ''
}) => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const languages: { code: SupportedLanguage; label: string; native: string; flag: string }[] = [
    { code: 'EN', label: 'English', native: 'English', flag: '🇬🇧' },
    { code: 'UR', label: 'Urdu', native: 'اردو', flag: '🇵🇰' },
    { code: 'AR', label: 'Arabic', native: 'العربية', flag: '🇦🇪' }
  ];

  const currentLang = languages.find(l => l.code === language) || languages[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (variant === 'drawer') {
    return (
      <div className={`p-3 bg-slate-100 rounded-2xl space-y-2 ${className}`}>
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 px-1">
          <span className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#0288D1]" />
            <span>Select Language / زبان / اللغة</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono">{language}</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => setLanguage(l.code)}
              className={`py-2 px-2 rounded-xl text-xs font-bold flex flex-col items-center gap-1 transition-all ${
                language === l.code
                  ? 'bg-[#0B1B3B] text-white shadow-sm ring-2 ring-[#4FC3F7]'
                  : 'bg-white text-slate-700 hover:bg-slate-200/80 border border-slate-200'
              }`}
            >
              <span className="text-base">{l.flag}</span>
              <span className="leading-none text-[11px]">{l.native}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
          variant === 'admin'
            ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
            : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/15'
        }`}
        aria-label="Language selector"
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="tracking-wide">{currentLang.native}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-36 rounded-2xl bg-white shadow-xl border border-slate-100 py-1.5 z-50 text-slate-800 animate-in fade-in slide-in-from-top-1 duration-150">
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-wider text-slate-400 border-b border-slate-100 mb-1">
            Language
          </div>
          {languages.map(l => (
            <button
              key={l.code}
              onClick={() => {
                setLanguage(l.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-sky-50 transition-colors ${
                language === l.code ? 'font-black text-[#0B1B3B] bg-sky-50/60' : 'text-slate-600'
              }`}
            >
              <span className="flex items-center gap-2">
                <span>{l.flag}</span>
                <span>{l.native}</span>
              </span>
              {language === l.code && <Check className="w-3.5 h-3.5 text-[#0288D1]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
