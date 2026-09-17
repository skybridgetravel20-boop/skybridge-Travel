import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';
import { ServiceType } from '../types';
import {
  Moon,
  Building2,
  Train,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  MessageCircle,
  HelpCircle
} from 'lucide-react';

export const UmrahPackagesPage: React.FC = () => {
  const { openInquiryModal } = useOutletContext<{
    openInquiryModal: (config?: {
      defaultService?: ServiceType;
      defaultDestination?: string;
      defaultTitle?: string;
      isBookingRequest?: boolean;
    }) => void;
  }>();

  const umrahInclusions = [
    {
      title: 'Saudi Umrah Electronic Visa',
      desc: 'Complete e-visa submission, document verification, and guidance with the official Nusuk portal for Rawdah prayer appointment booking.'
    },
    {
      title: 'Courtyard Walking Distance Hotels',
      desc: 'Carefully vetted 4 and 5-star hotels in Makkah (Clock Tower / Jabal Omar) and Madinah (Northern Courtyard) minimizing walking distance for elders and children.'
    },
    {
      title: 'Haramain High-Speed Train Coordination',
      desc: 'Seamless intercity travel between Makkah and Madinah in less than 2 hours in air-conditioned comfort, avoiding arduous road journeys.'
    },
    {
      title: 'Guided Historical Ziyarat',
      desc: 'Private air-conditioned visits to sacred historical landmarks including Cave Hira (Jabal al-Nour), Jabal Thawr, Mina, Arafat, Masjid Quba, and Mount Uhud.'
    }
  ];

  return (
    <div>
      <PageHero
        title="Spiritual & Dignified Umrah Travel Services"
        subtitle="Experience your sacred journey with peace of mind. Premium courtyard-proximate hotels, electronic Umrah visa processing, and dedicated ground coordination."
        badge="Spiritual Journeys"
        breadcrumbs={[{ label: 'Packages', link: '/tour-packages' }, { label: 'Umrah Packages' }]}
        bgImage="https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Overview & Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#FFB300] block">
                Sacred Hospitality
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
                Focus on Worship. We Handle Every Detail.
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Performing Umrah is a deeply personal and spiritual journey. At SkyBridge Travel & Tourism, we ensure your trip is organized with dignity, punctuality, and unwavering care.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                We eliminate logistical friction by coordinating verified hotel rooms with easy courtyard access, private airport transfers, high-speed train tickets between Makkah and Madinah, and comprehensive visa paperwork.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() =>
                    openInquiryModal({
                      defaultService: 'Umrah Package',
                      defaultDestination: 'Saudi Arabia (Makkah & Madinah)',
                      defaultTitle: 'Umrah Travel Package Quotation',
                      isBookingRequest: true
                    })
                  }
                  className="px-6 py-3 rounded-2xl bg-[#0B1B3B] hover:bg-[#FFB300] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <span>Request Umrah Quotation</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={getWhatsAppLink('Hello SkyBridge, I would like information regarding Umrah packages and hotel options near the Harams.')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Umrah Desk</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {umrahInclusions.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-2xs space-y-2">
                    <h3 className="text-sm font-bold text-[#0B1B3B] flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#FFB300] shrink-0" />
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl font-black text-[#0B1B3B]">
              Customizable Umrah Itinerary Tiers
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              All packages are quoted transparently based on hotel preference, group size, and travel duration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Tier 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Comfort Tier
                </span>
                <h3 className="text-xl font-bold text-[#0B1B3B]">Classic 10-Day Umrah</h3>
                <div className="text-xs text-slate-500">5 Nights Makkah + 4 Nights Madinah</div>
                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                    <span>3 to 4-Star hotels with frequent shuttle or short walk</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                    <span>Saudi electronic Umrah visa processing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                    <span>Private airport meet & greet</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() =>
                    openInquiryModal({
                      defaultService: 'Umrah Package',
                      defaultTitle: 'Classic 10-Day Umrah Inquiry',
                      isBookingRequest: true
                    })
                  }
                  className="w-full py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
                >
                  Request Quote
                </button>
              </div>
            </div>

            {/* Tier 2 (Featured) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-[#FFB300] shadow-xl flex flex-col justify-between space-y-6 relative">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#FFB300] text-[#0B1B3B] px-4 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider">
                Most Requested
              </div>

              <div className="space-y-4 pt-1">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B1B3B]">
                  Courtyard Premium
                </span>
                <h3 className="text-xl font-bold text-[#0B1B3B]">5-Star Clock Tower & Haram View</h3>
                <div className="text-xs text-slate-500">Direct Haram Access (Makkah & Madinah)</div>
                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB300]" />
                    <span>Clock Tower Makkah + Northern Courtyard Madinah</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB300]" />
                    <span>High-Speed Haramain Train tickets (Business/Economy)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB300]" />
                    <span>Private VIP airport transfers (GMC / Luxury Sedan)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FFB300]" />
                    <span>Comprehensive guided historical Ziyarat</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() =>
                    openInquiryModal({
                      defaultService: 'Umrah Package',
                      defaultTitle: '5-Star Clock Tower Umrah Package',
                      isBookingRequest: true
                    })
                  }
                  className="w-full py-2.5 rounded-xl bg-[#FFB300] text-[#0B1B3B] text-xs font-bold hover:bg-[#e09d00] transition-colors"
                >
                  Request Quote
                </button>
              </div>
            </div>

            {/* Tier 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Custom Itinerary
                </span>
                <h3 className="text-xl font-bold text-[#0B1B3B]">Extended Family / Ramadan</h3>
                <div className="text-xs text-slate-500">14 to 21 Days Flexible Plan</div>
                <ul className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                    <span>Interconnecting rooms & multi-bed family suites</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                    <span>Wheelchair & senior citizen ground assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                    <span>Specialized Ramadan schedules & Suhoor arrangements</span>
                  </li>
                </ul>
              </div>

              <div>
                <button
                  onClick={() =>
                    openInquiryModal({
                      defaultService: 'Umrah Package',
                      defaultTitle: 'Extended Family / Ramadan Umrah',
                      isBookingRequest: true
                    })
                  }
                  className="w-full py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
                >
                  Request Custom Quote
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
