import React from 'react';
import { Link } from 'react-router-dom';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Instagram,
  Facebook,
  MessageCircle,
  Radio,
  ArrowRight,
  Globe
} from 'lucide-react';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';
import { SkyBridgeLogo } from './SkyBridgeLogo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B1B3B] text-slate-300 pt-16 pb-12 border-t border-white/10 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Column 1: Company Overview */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <SkyBridgeLogo size="md" showText={true} textColor="light" />
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              SkyBridge Travel & Tourism is a premier travel consultancy offering worldwide visa assistance, holiday packages, flights, hotel reservations, and Umrah travel services. We specialize in meticulous document preparation, itinerary coordination, and personalized travel support.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={COMPANY_INFO.officialFacebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official Facebook"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-slate-300 flex items-center justify-center transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.officialInstagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official Instagram"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-slate-300 flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.officialWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official WhatsApp Chat"
                className="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-slate-300 flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={COMPANY_INFO.officialWhatsAppChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Official WhatsApp Channel"
                title="Follow WhatsApp Channel"
                className="px-3 h-9 rounded-xl bg-white/5 hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-slate-300 flex items-center gap-1.5 text-xs font-semibold transition-colors"
              >
                <Radio className="w-3.5 h-3.5 text-[#4FC3F7]" />
                <span>WA Channel</span>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4FC3F7]"></span>
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="text-slate-400 hover:text-white transition-colors">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/tour-packages" className="text-slate-400 hover:text-white transition-colors">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/honeymoon-packages" className="text-slate-400 hover:text-white transition-colors">
                  Honeymoon Packages
                </Link>
              </li>
              <li>
                <Link to="/umrah-packages" className="text-slate-400 hover:text-white transition-colors">
                  Umrah Packages
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Travel Services */}
          <div>
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4FC3F7]"></span>
              Services
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <Link to="/visa-services" className="text-slate-400 hover:text-white transition-colors">
                  Visa Guidance & Files
                </Link>
              </li>
              <li>
                <Link to="/flights" className="text-slate-400 hover:text-white transition-colors">
                  Flight Booking Assistance
                </Link>
              </li>
              <li>
                <Link to="/hotels" className="text-slate-400 hover:text-white transition-colors">
                  Hotel Reservations
                </Link>
              </li>
              <li>
                <Link to="/visa-services" className="text-slate-400 hover:text-white transition-colors">
                  Cover Letter Preparation
                </Link>
              </li>
              <li>
                <Link to="/visa-services" className="text-slate-400 hover:text-white transition-colors">
                  Student Visa Guidance
                </Link>
              </li>
              <li>
                <Link to="/visa-services" className="text-slate-400 hover:text-white transition-colors">
                  Family Visa Dossiers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors">
                  Airport Transportation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Official Contact Info */}
          <div className="space-y-3">
            <h4 className="text-white text-sm font-bold tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#4FC3F7]"></span>
              Contact Info
            </h4>
            <div className="space-y-3 text-xs text-slate-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#4FC3F7] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">🇵🇰 Pakistan Office:</span>
                  <span>{COMPANY_INFO.addressLahore}</span>
                  <a
                    href={COMPANY_INFO.officialGoogleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[#4FC3F7] hover:underline mt-1 text-[11px]"
                  >
                    <span>View on Google Maps</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-[#4FC3F7] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <span className="font-semibold text-white block">🇵🇰 Pakistan Direct Lines:</span>
                  <div>
                    <a href={`tel:${COMPANY_INFO.phonePakistan1.replace(/\s+/g, '')}`} className="hover:text-white">
                      {COMPANY_INFO.phonePakistan1}
                    </a>
                  </div>
                  <div>
                    <a href={`tel:${COMPANY_INFO.phonePakistan2.replace(/\s+/g, '')}`} className="hover:text-white">
                      {COMPANY_INFO.phonePakistan2}
                    </a>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#4FC3F7] shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-[#4FC3F7] shrink-0" />
                <a href={COMPANY_INFO.websiteUrl} className="hover:text-white">
                  skybridgetravelandtourism.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-[#FFB300] shrink-0" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
              <div className="pt-2">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#4FC3F7]/15 hover:bg-[#4FC3F7] text-[#4FC3F7] hover:text-[#0B1B3B] text-xs font-bold transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Message SkyBridge Travel & Tourism on WhatsApp</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Box */}
        <div className="my-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-[#FFB300] shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-200">Legal Disclaimer:</strong> {COMPANY_INFO.visaDisclaimer}
          </p>
        </div>

        {/* Bottom Strip: Copyright & Discreet Portal Access */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center">
            <span>© 2026 SkyBridge Travel & Tourism.</span>
            <Link
              to="/ceo"
              className="hover:text-slate-300 transition-colors ml-1 cursor-default hover:cursor-pointer"
              title="SkyBridge Executive Suite"
            >
              All Rights Reserved.
            </Link>
          </div>

          <div className="flex items-center gap-6">
            <span className="hover:text-slate-200 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-200 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-200 cursor-pointer">Sitemap</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
