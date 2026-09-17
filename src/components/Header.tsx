import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Mail,
  ChevronDown,
  Globe,
  Menu,
  X,
  MessageCircle,
  Plane,
  Compass,
  Building2,
  Calendar
} from 'lucide-react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { SkyBridgeLogo } from './SkyBridgeLogo';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const location = useLocation();
  const { t, language } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setPackagesOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const isDarkHeroPage = location.pathname === '/' || location.pathname === '/about';

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Utility Bar */}
      <div className="bg-[#0B1B3B] text-slate-300 text-xs border-b border-white/10 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-[#4FC3F7] font-semibold">🇵🇰 Pakistan Office:</span>
              <a
                href={`tel:${COMPANY_INFO.phonePakistan1.replace(/\s+/g, '')}`}
                className="hover:text-white transition-colors"
              >
                {COMPANY_INFO.phonePakistan1}
              </a>
              <span className="text-white/40">•</span>
              <a
                href={`tel:${COMPANY_INFO.phonePakistan2.replace(/\s+/g, '')}`}
                className="hover:text-white transition-colors"
              >
                {COMPANY_INFO.phonePakistan2}
              </a>
            </div>
            <div className="flex items-center space-x-2">
              <Mail className="w-3.5 h-3.5 text-[#4FC3F7]" />
              <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white transition-colors">
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {/* Language Switcher */}
            <LanguageSelector variant="header-pill" />
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-md text-[#0B1B3B]'
            : isDarkHeroPage
            ? 'bg-[#0B1B3B]/90 backdrop-blur-sm text-white'
            : 'bg-white shadow-sm text-[#0B1B3B]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Official Logo Asset */}
            <Link to="/" className="flex items-center gap-3 group">
              <SkyBridgeLogo
                size="md"
                showText={true}
                isDarkBackground={!isScrolled && isDarkHeroPage}
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              <Link
                to="/"
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive('/')
                    ? 'text-[#4FC3F7] bg-[#4FC3F7]/10'
                    : isScrolled || !isDarkHeroPage
                    ? 'text-slate-700 hover:text-[#0B1B3B] hover:bg-slate-100'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {t('home')}
              </Link>
              <Link
                to="/about"
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive('/about')
                    ? 'text-[#4FC3F7] bg-[#4FC3F7]/10'
                    : isScrolled || !isDarkHeroPage
                    ? 'text-slate-700 hover:text-[#0B1B3B] hover:bg-slate-100'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {t('aboutUs')}
              </Link>
              <Link
                to="/visa-services"
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive('/visa-services')
                    ? 'text-[#4FC3F7] bg-[#4FC3F7]/10'
                    : isScrolled || !isDarkHeroPage
                    ? 'text-slate-700 hover:text-[#0B1B3B] hover:bg-slate-100'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {t('visaServices')}
              </Link>
              <Link
                to="/flights"
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive('/flights')
                    ? 'text-[#4FC3F7] bg-[#4FC3F7]/10'
                    : isScrolled || !isDarkHeroPage
                    ? 'text-slate-700 hover:text-[#0B1B3B] hover:bg-slate-100'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {t('flights')}
              </Link>
              <Link
                to="/hotels"
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive('/hotels')
                    ? 'text-[#4FC3F7] bg-[#4FC3F7]/10'
                    : isScrolled || !isDarkHeroPage
                    ? 'text-slate-700 hover:text-[#0B1B3B] hover:bg-slate-100'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {t('hotels')}
              </Link>

              {/* Packages Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setPackagesOpen(true)}
                onMouseLeave={() => setPackagesOpen(false)}
              >
                <button
                  className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    location.pathname.includes('-packages')
                      ? 'text-[#4FC3F7] bg-[#4FC3F7]/10'
                      : isScrolled || !isDarkHeroPage
                      ? 'text-slate-700 hover:text-[#0B1B3B] hover:bg-slate-100'
                      : 'text-slate-200 hover:text-white hover:bg-white/10'
                  }`}
                  aria-expanded={packagesOpen}
                >
                  <span>Packages</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${packagesOpen ? 'rotate-180' : ''}`} />
                </button>

                {packagesOpen && (
                  <div className="absolute top-full left-0 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 p-2 z-50 text-[#0B1B3B] animate-in fade-in slide-in-from-top-1 duration-150">
                    <Link
                      to="/tour-packages"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                        <Compass className="w-4 h-4 text-[#4FC3F7]" />
                      </div>
                      <div>
                        <div className="font-bold">{t('tourPackages')}</div>
                        <div className="text-[11px] text-slate-500 font-normal">Europe, Middle East & Asia</div>
                      </div>
                    </Link>
                    <Link
                      to="/honeymoon-packages"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold"
                    >
                      <div className="w-8 h-8 rounded-lg bg-pink-50 text-pink-600 flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold">{t('honeymoonPackages')}</div>
                        <div className="text-[11px] text-slate-500 font-normal">Romantic private getaways</div>
                      </div>
                    </Link>
                    <Link
                      to="/umrah-packages"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-50 transition-colors text-xs font-semibold"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-[#FFB300]" />
                      </div>
                      <div>
                        <div className="font-bold">{t('umrahPackages')}</div>
                        <div className="text-[11px] text-slate-500 font-normal">Spiritual sacred journeys</div>
                      </div>
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/destinations"
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive('/destinations')
                    ? 'text-[#4FC3F7] bg-[#4FC3F7]/10'
                    : isScrolled || !isDarkHeroPage
                    ? 'text-slate-700 hover:text-[#0B1B3B] hover:bg-slate-100'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {t('destinations')}
              </Link>
              <Link
                to="/contact"
                className={`px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                  isActive('/contact')
                    ? 'text-[#4FC3F7] bg-[#4FC3F7]/10'
                    : isScrolled || !isDarkHeroPage
                    ? 'text-slate-700 hover:text-[#0B1B3B] hover:bg-slate-100'
                    : 'text-slate-200 hover:text-white hover:bg-white/10'
                }`}
              >
                {t('contactUs')}
              </Link>
            </div>

            {/* Right Action: Header CTA: WhatsApp Us */}
            <div className="hidden lg:flex items-center space-x-2">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4FC3F7] hover:bg-[#38b7ee] text-[#0B1B3B] font-bold text-xs shadow-sm hover:shadow-md transition-all transform active:scale-95"
              >
                <MessageCircle className="w-4 h-4 fill-[#0B1B3B] stroke-none" />
                <span>{t('whatsAppUs')}</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex items-center space-x-2 lg:hidden">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-[#4FC3F7] text-[#0B1B3B]"
                aria-label="WhatsApp Us"
              >
                <MessageCircle className="w-4 h-4 fill-[#0B1B3B] stroke-none" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`p-2.5 rounded-xl ${
                  isScrolled || !isDarkHeroPage
                    ? 'text-[#0B1B3B] hover:bg-slate-100'
                    : 'text-white hover:bg-white/10'
                }`}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-slate-100 text-[#0B1B3B] px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200 space-y-3">
            {/* Mobile Language Selector */}
            <LanguageSelector variant="drawer" />

            <div className="space-y-1 pt-1">
              <Link
                to="/"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/') ? 'bg-[#E3F2FD] text-[#0B1B3B]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t('home')}
              </Link>
              <Link
                to="/about"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/about') ? 'bg-[#E3F2FD] text-[#0B1B3B]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t('aboutUs')}
              </Link>
              <Link
                to="/visa-services"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/visa-services') ? 'bg-[#E3F2FD] text-[#0B1B3B]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t('visaServices')}
              </Link>
              <Link
                to="/flights"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/flights') ? 'bg-[#E3F2FD] text-[#0B1B3B]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t('flights')}
              </Link>
              <Link
                to="/hotels"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/hotels') ? 'bg-[#E3F2FD] text-[#0B1B3B]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t('hotels')}
              </Link>

              {/* Mobile Packages Sub-links */}
              <div className="pt-2 pb-1 border-y border-slate-100 my-1">
                <span className="block px-4 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t('packages')}
                </span>
                <Link
                  to="/tour-packages"
                  className="block px-4 py-2 text-sm text-slate-700 hover:text-[#4FC3F7]"
                >
                  • {t('tourPackages')}
                </Link>
                <Link
                  to="/honeymoon-packages"
                  className="block px-4 py-2 text-sm text-slate-700 hover:text-[#4FC3F7]"
                >
                  • {t('honeymoonPackages')}
                </Link>
                <Link
                  to="/umrah-packages"
                  className="block px-4 py-2 text-sm text-slate-700 hover:text-[#4FC3F7]"
                >
                  • {t('umrahPackages')}
                </Link>
              </div>

              <Link
                to="/destinations"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/destinations') ? 'bg-[#E3F2FD] text-[#0B1B3B]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t('destinations')}
              </Link>
              <Link
                to="/contact"
                className={`block px-4 py-2.5 rounded-xl text-sm font-semibold ${
                  isActive('/contact') ? 'bg-[#E3F2FD] text-[#0B1B3B]' : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {t('contactUs')}
              </Link>

              <div className="pt-4 space-y-2.5">
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs space-y-1.5 text-slate-700">
                  <div className="font-bold text-[#0B1B3B] flex items-center justify-between">
                    <span>🇵🇰 Pakistan Office Phone:</span>
                    <span className="text-[10px] text-slate-400 font-normal">Direct Line</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 font-semibold text-[#0288D1]">
                    <a href={`tel:${COMPANY_INFO.phonePakistan1.replace(/\s+/g, '')}`} className="hover:underline">
                      {COMPANY_INFO.phonePakistan1}
                    </a>
                    <span className="text-slate-300">•</span>
                    <a href={`tel:${COMPANY_INFO.phonePakistan2.replace(/\s+/g, '')}`} className="hover:underline">
                      {COMPANY_INFO.phonePakistan2}
                    </a>
                  </div>
                </div>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#4FC3F7] text-[#0B1B3B] font-bold text-sm shadow-sm"
                >
                  <MessageCircle className="w-4 h-4 fill-[#0B1B3B] stroke-none" />
                  <span>{t('whatsAppUs')} (Official Chat)</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
