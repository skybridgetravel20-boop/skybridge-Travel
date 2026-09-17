import React, { useState } from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { SKYBRIDGE_OFFICIAL_LOGO } from '../assets/logo';
import {
  Plane,
  ShieldCheck,
  FileCheck2,
  Users2,
  Clock,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MessageCircle,
  HelpCircle,
  Building2,
  HeartHandshake,
  Compass,
  FileText,
  BadgeCheck,
  Headphones,
  Check
} from 'lucide-react';
import { TravelSearchWidget } from '../components/TravelSearchWidget';
import { ServiceCard } from '../components/ServiceCard';
import { DestinationCard } from '../components/DestinationCard';
import { PackageCard } from '../components/PackageCard';
import { SERVICES_LIST, DOCUMENTATION_PROCESS } from '../data/servicesData';
import { DESTINATIONS } from '../data/destinationsData';
import { PACKAGES_DATA } from '../data/packagesData';
import { FAQ_ITEMS } from '../data/faqData';
import { TESTIMONIALS_DATA } from '../data/testimonialsData';
import { TRAVEL_TIPS_DATA } from '../data/travelTipsData';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';
import { ServiceType, Destination, TravelPackage, ServiceItem } from '../types';
import { useLanguage } from '../context/LanguageContext';

export const HomePage: React.FC = () => {
  const { t, language } = useLanguage();
  const { openInquiryModal } = useOutletContext<{
    openInquiryModal: (config?: {
      defaultService?: ServiceType;
      defaultDestination?: string;
      defaultTitle?: string;
      isBookingRequest?: boolean;
    }) => void;
  }>();

  // FAQ Accordion State
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');

  // Filtered lists for Home
  const featuredDestinations = DESTINATIONS.slice(0, 6);
  const holidayPackages = PACKAGES_DATA.filter(p => p.category === 'Europe' || p.category === 'Middle East').slice(0, 3);
  const honeymoonPackages = PACKAGES_DATA.filter(p => p.category === 'Honeymoon').slice(0, 2);
  const umrahPackage = PACKAGES_DATA.find(p => p.category === 'Umrah');

  const handleSearchTrigger = (criteria: {
    tab: string;
    destination: string;
    travelDate: string;
    visaType: string;
    passengers: number;
    service: ServiceType;
  }) => {
    openInquiryModal({
      defaultService: criteria.service,
      defaultDestination: criteria.destination,
      defaultTitle: `Inquiry: ${criteria.service} for ${criteria.destination}`,
      isBookingRequest: criteria.tab === 'flights' || criteria.tab === 'hotels'
    });
  };

  return (
    <div className="overflow-hidden">
      {/* 6. HERO SECTION */}
      <section className="relative bg-[#0B1B3B] text-white pt-24 pb-32 lg:pt-32 lg:pb-40 overflow-hidden">
        {/* Background Image with Cinematic Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=2000&q=85"
            alt="International flight across sky"
            className="w-full h-full object-cover opacity-25 scale-105 animate-in fade-in duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1B3B]/90 via-[#0B1B3B]/80 to-[#0B1B3B]"></div>
          {/* Subtle brand glow */}
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#4FC3F7]/10 rounded-full blur-3xl pointer-events-none"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column: Hero Text & CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#4FC3F7] text-xs font-bold tracking-wider uppercase shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB300]" />
                <span>{t('heroBadge')}</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                {t('heroTitle1')} <span className="text-[#4FC3F7]">{t('heroTitle2')}</span> {t('heroTitle3')}
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
                {t('heroSubtitle')}
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={() =>
                    openInquiryModal({
                      defaultService: 'Tourist Visa',
                      defaultTitle: 'Consultation & Travel Inquiry'
                    })
                  }
                  className="px-7 py-3.5 rounded-2xl bg-[#4FC3F7] hover:bg-[#38b7ee] text-[#0B1B3B] font-extrabold text-sm shadow-lg hover:shadow-cyan-500/20 transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>{t('heroCtaConsult')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-7 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{t('heroCtaWhatsApp')}</span>
                </a>
              </div>

              {/* Micro Highlights */}
              <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4FC3F7]" />
                  <span>{t('heroHighlight1')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4FC3F7]" />
                  <span>{t('heroHighlight2')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4FC3F7]" />
                  <span>{t('heroHighlight3')}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Official SkyBridge Brand Asset Showcase */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="bg-white/95 backdrop-blur-md p-6 sm:p-7 rounded-3xl border border-white/30 shadow-2xl max-w-sm w-full text-center">
                {/* Exact Uploaded Logo Image */}
                <div className="w-full aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center p-3 border border-slate-100 shadow-xs">
                  <img
                    src={SKYBRIDGE_OFFICIAL_LOGO}
                    alt="Official SkyBridge Travel & Tourism Logo"
                    className="w-full h-full object-contain aspect-square"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-sky-50 text-[#0288D1] text-[10px] font-black uppercase tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>Official Brand Identity</span>
                  </div>
                  <div className="text-sm font-black text-[#0B1B3B]">
                    SkyBridge Travel & Tourism
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium">
                    Registered Travel & Tourism Agency
                  </p>
                  <div className="pt-2 flex items-center justify-center gap-2 text-[10px] font-bold text-slate-600 bg-slate-50 py-1.5 px-2.5 rounded-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    <span>Lahore, Pakistan • Global UAE Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. SEARCH WIDGET (OVERLAPPING HERO) */}
      <TravelSearchWidget onSearch={handleSearchTrigger} />

      {/* 8. TRUST STRIP / FAST FACTS */}
      <section className="py-14 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0">
                <Plane className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <div>
                <div className="text-xl font-black text-[#0B1B3B]">Global</div>
                <div className="text-xs text-slate-600 font-medium">Destinations Covered</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0">
                <FileCheck2 className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <div>
                <div className="text-xl font-black text-[#0B1B3B]">Structured</div>
                <div className="text-xs text-slate-600 font-medium">Dossier Preparation</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <div>
                <div className="text-xl font-black text-[#0B1B3B]">Compliant</div>
                <div className="text-xs text-slate-600 font-medium">Embassy Alignment</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0">
                <Users2 className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <div>
                <div className="text-xl font-black text-[#0B1B3B]">Dedicated</div>
                <div className="text-xs text-slate-600 font-medium">Client Advisory</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FEATURED SERVICES GRID */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
                What We Offer
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
                Comprehensive Travel & Visa Solutions
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                From embassy-compliant visa file preparation to flight routing, premium hotel bookings, and spiritual Umrah packages.
              </p>
            </div>
            <Link
              to="/visa-services"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#0B1B3B] hover:text-[#4FC3F7] transition-colors"
            >
              <span>Explore All 12 Services</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_LIST.slice(0, 6).map(service => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={s =>
                  openInquiryModal({
                    defaultService: s.title.includes('Visa') ? 'Tourist Visa' : 'Flight Booking',
                    defaultTitle: s.title
                  })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* 10. POPULAR DESTINATIONS */}
      <section className="py-20 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
                Curated Itineraries
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
                Popular Worldwide Destinations
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Explore visa requirements, processing times, and curated packages across Europe, GCC, Asia, and North America.
              </p>
            </div>
            <Link
              to="/destinations"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#0B1B3B] hover:text-[#4FC3F7] transition-colors"
            >
              <span>View All Destinations</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredDestinations.map(dest => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onInquire={d =>
                  openInquiryModal({
                    defaultService: 'Tourist Visa',
                    defaultDestination: d.name,
                    defaultTitle: `Visa Inquiry: ${d.name}`
                  })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* 11. FEATURED TOUR PACKAGES */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
                Tailored Holiday Escapes
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
                Featured Holiday Packages
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Experience iconic global cities with structured itineraries, boutique hotels, transfers, and documentation support.
              </p>
            </div>
            <Link
              to="/tour-packages"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#0B1B3B] hover:text-[#4FC3F7] transition-colors"
            >
              <span>View All Tour Packages</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {holidayPackages.map(pkg => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onBookNow={p =>
                  openInquiryModal({
                    defaultService: 'Tour Package',
                    defaultDestination: p.destination,
                    defaultTitle: p.title,
                    isBookingRequest: true
                  })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* 12. HONEYMOON SPECIALS */}
      <section className="py-20 bg-white border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-pink-600 block mb-2">
                <HeartHandshake className="w-3.5 h-3.5" />
                Romantic Escapes
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
                Luxury Honeymoon Packages
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Celebrate your marriage in private pool villas, turquoise waters, and breathtaking alpine retreats.
              </p>
            </div>
            <Link
              to="/honeymoon-packages"
              className="mt-4 md:mt-0 inline-flex items-center gap-2 text-xs font-bold text-[#0B1B3B] hover:text-[#4FC3F7] transition-colors"
            >
              <span>Explore Honeymoon Itineraries</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {honeymoonPackages.map(pkg => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onBookNow={p =>
                  openInquiryModal({
                    defaultService: 'Honeymoon Package',
                    defaultDestination: p.destination,
                    defaultTitle: p.title,
                    isBookingRequest: true
                  })
                }
              />
            ))}
          </div>
        </div>
      </section>

      {/* 13. UMRAH TRAVEL SECTION */}
      {umrahPackage && (
        <section className="py-20 bg-[#0B1B3B] text-white relative overflow-hidden">
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden lg:block">
            <img
              src="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1200&q=80"
              alt="Makkah Holy Haram"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="max-w-2xl space-y-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#FFB300]/20 text-[#FFB300] border border-[#FFB300]/30">
                Spiritual Sacred Journeys
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
                Dignified & Respectful <span className="text-[#4FC3F7]">Umrah Packages</span>
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Experience peace of mind during your sacred pilgrimage. We provide dedicated Saudi Umrah visa assistance, prime hotels in close walking distance to the Holy Harams in Makkah and Madinah, high-speed Haramain train ticketing, and comfortable private transfers.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-white text-sm mb-1">Walking Distance to Harams</div>
                  <p className="text-xs text-slate-400">Carefully vetted hotels with easy courtyard access for senior family members.</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="font-bold text-white text-sm mb-1">Electronic Visa & Ground Support</div>
                  <p className="text-xs text-slate-400">Complete e-visa guidance, Nusuk slot advice, and private meet-and-greet.</p>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  to="/umrah-packages"
                  className="px-6 py-3 rounded-2xl bg-[#FFB300] hover:bg-[#e09d00] text-[#0B1B3B] font-extrabold text-xs sm:text-sm shadow-md transition-colors"
                >
                  View Umrah Details
                </Link>
                <button
                  onClick={() =>
                    openInquiryModal({
                      defaultService: 'Umrah Package',
                      defaultDestination: 'Saudi Arabia (Makkah & Madinah)',
                      defaultTitle: 'Umrah Package Inquiry',
                      isBookingRequest: true
                    })
                  }
                  className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-sm border border-white/20 transition-colors"
                >
                  Request Umrah Quotation
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 14. VISA SERVICES & DOCUMENTATION CLEARANCE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block">
                Professional Dossier Structuring
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
                Visa Services & Documentation Clearance
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                A well-structured visa dossier speaks clearly to consular officers. Our documentation specialists review every page of your financial records, sponsor declarations, employment verifications, and travel itineraries to eliminate discrepancies before appointment submission.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#0B1B3B] block">Bespoke Cover Letters:</strong>
                    <span className="text-xs text-slate-500">Explaining travel purpose, funding stability, and socio-economic domestic ties.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#0B1B3B] block">Bank Statement & Tax Audits:</strong>
                    <span className="text-xs text-slate-500">Checking balance maintenance, income declarations, and source of funds clarity.</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3 h-3 stroke-[3]" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#0B1B3B] block">Compliant Reservation Proofs:</strong>
                    <span className="text-xs text-slate-500">Matching flight reservations, hotel vouchers, and mandatory insurance policies.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/visa-services"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors"
                >
                  <span>Learn About Visa Preparation</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-6 bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-[#0B1B3B] flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#4FC3F7]" />
                Standard Visa File Checklist Components
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200/70 shadow-2xs">
                  <div className="font-bold text-[#0B1B3B] mb-1">1. Primary Travel Dossier</div>
                  <p className="text-slate-500">Valid passport (min 6 months), photos according to embassy specs, signed application forms.</p>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200/70 shadow-2xs">
                  <div className="font-bold text-[#0B1B3B] mb-1">2. Financial Verification</div>
                  <p className="text-slate-500">6-month bank statement with branch seal, account maintenance certificate, NTN/tax returns.</p>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200/70 shadow-2xs">
                  <div className="font-bold text-[#0B1B3B] mb-1">3. Employment & Business</div>
                  <p className="text-slate-500">Employment letter, salary slips, leave approval, or company registration & chamber certs.</p>
                </div>
                <div className="p-3.5 bg-white rounded-2xl border border-slate-200/70 shadow-2xs">
                  <div className="font-bold text-[#0B1B3B] mb-1">4. Itinerary & Ties</div>
                  <p className="text-slate-500">Confirmed flight schedule, hotel vouchers, cover letter, and family registration certs.</p>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200/80 text-[11px] text-amber-900 leading-relaxed">
                <strong className="block font-bold mb-0.5">Embassy Authority Notice:</strong>
                {COMPANY_INFO.visaDisclaimer}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 15. HOW IT WORKS / DOCUMENTATION PROCESS */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
              Step-by-Step Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
              Our Professional 5-Step Process
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Structured from first consultation through document audit, appointment scheduling, and final travel preparation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {DOCUMENTATION_PROCESS.map((proc, index) => (
              <div
                key={proc.step}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm relative flex flex-col justify-between"
              >
                <div>
                  <div className="text-2xl font-black text-[#4FC3F7] font-mono mb-3">
                    {proc.step}
                  </div>
                  <h3 className="text-base font-bold text-[#0B1B3B] mb-2">
                    {proc.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {proc.description}
                  </p>
                </div>

                {index < 4 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 16. WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
              The SkyBridge Difference
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
              Why Discerning Travelers Choose Us
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Committed to clarity, rigorous document compliance, and responsive travel coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/70 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-base font-bold text-[#0B1B3B]">Embassy-Tuned Accuracy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Up-to-date knowledge of evolving consular mandates for Schengen, UK, US, and Asian travel rules.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/70 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <BadgeCheck className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-base font-bold text-[#0B1B3B]">Transparent Advisory</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No false promises or fabricated claims. We communicate genuine requirements and file strengths honestly.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/70 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <FileText className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-base font-bold text-[#0B1B3B]">Custom Dossier Writing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Personalized cover letters and structured day-by-day itineraries drafted specifically for each client.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/70 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <Headphones className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-base font-bold text-[#0B1B3B]">Dedicated Consultant</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct phone and WhatsApp access with experienced case advisors from initial consultation to return.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 17. CLIENT TESTIMONIALS */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
              Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
              Client Reviews & Experiences
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Read real client feedback on our visa guidance, flight booking, and holiday coordination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS_DATA.map(test => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1 mb-3 text-[#FFB300]">
                    {[...Array(Math.max(0, Math.min(5, Math.floor(test.rating || 5))))].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic mb-4">
                    "{test.review}"
                  </p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <h4 className="text-xs font-bold text-[#0B1B3B]">{test.clientName}</h4>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {test.service} • {test.destination}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 18. TRAVEL TIPS & INSIGHTS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
                Travel Knowledge
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
                Travel Tips & Editorial Insights
              </h2>
              <p className="mt-2 text-sm text-slate-600 max-w-xl">
                Expert guidance on visa preparation, document filing, medical insurance requirements, and flight connections.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TRAVEL_TIPS_DATA.slice(0, 3).map(tip => (
              <div
                key={tip.id}
                className="bg-slate-50 rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm flex flex-col justify-between group hover:shadow-md transition-shadow"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={tip.image}
                    alt={tip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#4FC3F7] bg-[#0B1B3B] px-2.5 py-0.5 rounded-full">
                      {tip.category}
                    </span>
                    <h3 className="text-base font-bold text-[#0B1B3B] mt-2.5 mb-1.5 leading-snug">
                      {tip.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {tip.summary}
                    </p>
                  </div>
                  <div className="pt-2 text-[11px] font-semibold text-slate-400">
                    {tip.readTime}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 19. QUICK CONSULTATION / LEAD CAPTURE BANNER */}
      <section className="py-16 bg-gradient-to-r from-[#0B1B3B] to-[#122852] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-2xl space-y-2 text-center lg:text-left">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7]">
                Ready to Plan Your Next Journey?
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                Book a Structured Travel Consultation Today
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Speak directly with our team in Lahore or connect online for verified flights, accommodations, and documentation clearance.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
              <button
                onClick={() =>
                  openInquiryModal({
                    defaultService: 'Tourist Visa',
                    defaultTitle: 'Direct Consultation Request'
                  })
                }
                className="px-6 py-3 rounded-2xl bg-[#4FC3F7] hover:bg-[#38b7ee] text-[#0B1B3B] text-xs sm:text-sm font-extrabold shadow-md transition-colors"
              >
                Inquire for Travel Consultation
              </button>
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs sm:text-sm font-bold shadow-md transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp: +92 324 4444167</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 20. FAQ SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
              Common Questions
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
              Frequently Asked Questions
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Clear answers regarding our travel services, visa file preparation, and communication channels.
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_ITEMS.map(faq => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-sm text-[#0B1B3B] hover:text-[#4FC3F7] transition-colors"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#4FC3F7] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200/80 text-center space-y-3">
            <h3 className="text-base font-bold text-[#0B1B3B]">Still have questions regarding your destination?</h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              Our travel specialists are available on WhatsApp and at our Lahore office to assist with personalized inquiries.
            </p>
            <div className="pt-1">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors"
              >
                <span>Ask via WhatsApp</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
