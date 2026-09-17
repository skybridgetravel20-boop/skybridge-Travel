import React from 'react';
import { useOutletContext, Link } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';
import { SKYBRIDGE_OFFICIAL_LOGO } from '../assets/logo';
import { ServiceType } from '../types';
import {
  ShieldCheck,
  Compass,
  Globe2,
  Users2,
  MapPin,
  Phone,
  Mail,
  Award,
  ArrowRight,
  MessageCircle,
  FileCheck2
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { openInquiryModal } = useOutletContext<{
    openInquiryModal: (config?: {
      defaultService?: ServiceType;
      defaultDestination?: string;
      defaultTitle?: string;
      isBookingRequest?: boolean;
    }) => void;
  }>();

  return (
    <div>
      <PageHero
        title="About SkyBridge Travel & Tourism"
        subtitle="A premier international travel company and visa consultancy dedicated to personalized journeys, verified bookings, and meticulous documentation clearance."
        badge="Corporate Profile"
        breadcrumbs={[{ label: 'About Us' }]}
        bgImage="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Company Story & Mission */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block">
                Who We Are
              </span>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
                Crafting Reliable Global Travel Experiences
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                SkyBridge Travel & Tourism is a premier travel consultancy offering worldwide visa assistance, holiday packages, flights, hotel reservations, and Umrah travel services. Founded with a vision to eliminate travel complexity, we bridge the gap between discerning travelers and global destinations.
              </p>
              <p className="text-slate-600 text-sm leading-relaxed">
                Whether organizing executive corporate travel, romantic honeymoon holidays, sacred family Umrah pilgrimages, or preparing intricate embassy visa dossiers, our experienced travel consultants provide personalized guidance, structured files, and responsive on-ground coordination.
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => openInquiryModal({ defaultTitle: 'Consultation Inquiry via About Page' })}
                  className="px-6 py-3 rounded-2xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <span>Speak With a Specialist</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>WhatsApp Advisory</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              {/* Official Brand Logo Card */}
              <div className="space-y-4">
                <div className="p-4 rounded-3xl bg-white border border-slate-200/90 shadow-md flex flex-col items-center justify-center text-center">
                  <div className="w-full aspect-square bg-white rounded-2xl overflow-hidden flex items-center justify-center p-2 border border-slate-100">
                    <img
                      src={SKYBRIDGE_OFFICIAL_LOGO}
                      alt="SkyBridge Travel & Tourism Official Logo"
                      className="w-full h-full object-contain aspect-square"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="mt-2 text-xs font-bold text-[#0B1B3B]">
                    Official Brand Identity
                  </div>
                  <p className="text-[10px] text-slate-500 font-medium">SkyBridge Travel & Tourism</p>
                </div>
                <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/80">
                  <div className="text-2xl font-extrabold text-[#0B1B3B] mb-1">Global</div>
                  <p className="text-xs text-slate-500">Connecting travelers to Europe, the Middle East, Asia & the Americas.</p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-6 rounded-3xl bg-[#0B1B3B] text-white">
                  <div className="text-2xl font-extrabold text-[#4FC3F7] mb-1">100%</div>
                  <p className="text-xs text-slate-300">Dedicated to transparent, honest advisory without false guarantees.</p>
                </div>
                <div className="rounded-3xl overflow-hidden shadow-md h-56">
                  <img
                    src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80"
                    alt="Dubai modern skyline"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Brand Values */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
              Our Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
              The Core Values Guiding Every Trip
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-base font-bold text-[#0B1B3B]">Trustworthy</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We believe in full transparency. We never provide misleading guarantees and always present clear consulate requirements.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <Award className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-base font-bold text-[#0B1B3B]">Professional Excellence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From drafting customized cover letters to structuring multi-sector flight bookings, we maintain the highest industry standards.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <Globe2 className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-base font-bold text-[#0B1B3B]">International Reach</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                With regional operational presence across Pakistan and the UAE, our network spans trusted suppliers, airlines, and local operators.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-2xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <Users2 className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-base font-bold text-[#0B1B3B]">Client-Centric Care</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Each traveler is supported by a dedicated consultant who stays in active contact before, during, and after travel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Offices & Representation */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block">
              Official Presence
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
              Registered Office & Contact Network
            </h2>
            <p className="text-slate-600 text-sm">
              Headquartered in Lahore, Pakistan with active coordination across the United Arab Emirates.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pakistan Registered Office */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B1B3B] text-white flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#4FC3F7]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1B3B]">Registered Pakistan Office</h3>
                  <p className="text-xs text-slate-500">Lahore, Punjab, Pakistan</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span>{COMPANY_INFO.addressLahore}</span>
                    <a
                      href={COMPANY_INFO.officialGoogleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#0288D1] hover:underline block mt-1 font-semibold"
                    >
                      View on Google Maps &rarr;
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0B1B3B] block">Direct Pakistan Lines:</span>
                    <div className="space-y-0.5 mt-0.5">
                      <a href={`tel:${COMPANY_INFO.phonePakistan1.replace(/\s+/g, '')}`} className="hover:text-[#0288D1] block">
                        {COMPANY_INFO.phonePakistan1}
                      </a>
                      <a href={`tel:${COMPANY_INFO.phonePakistan2.replace(/\s+/g, '')}`} className="hover:text-[#0288D1] block">
                        {COMPANY_INFO.phonePakistan2}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-[#0288D1]">
                    {COMPANY_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            {/* UAE & Regional Coordination */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#0B1B3B] text-white flex items-center justify-center">
                  <Globe2 className="w-5 h-5 text-[#4FC3F7]" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0B1B3B]">UAE & Global Coordination</h3>
                  <p className="text-xs text-slate-500">Dubai & Regional Travel Partners</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  <span>International hotel consolidators and licensed ground handling partners in UAE, Saudi Arabia, and Europe.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>{COMPANY_INFO.email}</span>
                </div>
                <div className="pt-1">
                  <a
                    href={getWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1B3B] hover:text-[#4FC3F7]"
                  >
                    <span>Connect with Dubai Support</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mandatory Legal Disclaimer Banner */}
      <section className="py-12 bg-slate-100 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-700">
            <ShieldCheck className="w-4 h-4" />
            Consular Authority Statement
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            {COMPANY_INFO.visaDisclaimer}
          </p>
        </div>
      </section>
    </div>
  );
};
