import React from 'react';
import { Clock, MapPin, Check, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { TravelPackage } from '../types';
import { getWhatsAppLink } from '../data/companyInfo';

interface PackageCardProps {
  pkg: TravelPackage;
  onBookNow: (pkg: TravelPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({ pkg, onBookNow }) => {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image Banner */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-100">
        <img
          src={pkg.image}
          alt={pkg.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3B]/85 via-[#0B1B3B]/20 to-transparent"></div>

        {/* Category & Duration Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#0B1B3B]/80 backdrop-blur-md text-[#4FC3F7] border border-[#4FC3F7]/30">
            {pkg.category}
          </span>
          {pkg.isFeatured && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FFB300] text-[#0B1B3B] shadow-sm">
              <Sparkles className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 text-white">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#4FC3F7] mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{pkg.duration}</span>
            <span>•</span>
            <MapPin className="w-3.5 h-3.5 text-[#FFB300]" />
            <span className="text-slate-200">{pkg.destination}</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight text-white leading-snug">
            {pkg.title}
          </h3>
        </div>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-2">
            Package Highlights
          </span>
          <ul className="space-y-2">
            {(pkg.highlights || []).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                <span className="w-4 h-4 rounded-full bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span className="leading-tight">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Action Section */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
          <div>
            <span className="block text-[10px] uppercase tracking-wider font-semibold text-slate-400">
              Pricing Tier
            </span>
            <span className="text-sm font-extrabold text-[#0B1B3B]">
              Request Quote
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onBookNow(pkg)}
              className="px-4 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={getWhatsAppLink(`Hello SkyBridge, I would like to request a quote and details for the package: ${pkg.title} (${pkg.destination}).`)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
              aria-label={`WhatsApp about ${pkg.title}`}
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
