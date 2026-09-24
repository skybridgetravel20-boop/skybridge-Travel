import React from 'react';
import { MapPin, ArrowRight, MessageCircle, CheckCircle2 } from 'lucide-react';
import { Destination } from '../types';
import { getWhatsAppLink } from '../data/companyInfo';

interface DestinationCardProps {
  destination: Destination;
  onInquire: (dest: Destination) => void;
  onViewDetails?: (dest: Destination) => void;
}

export const DestinationCard: React.FC<DestinationCardProps> = ({
  destination,
  onInquire,
  onViewDetails
}) => {
  const destName = destination.name || destination.country || 'Destination';
  const visaTags = destination.perfectFor || destination.suitableFor || [];

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
      {/* Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-slate-100">
        <img
          src={destination.image}
          alt={destName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1B3B]/80 via-transparent to-transparent"></div>

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-[#0B1B3B]/80 backdrop-blur-md text-[#4FC3F7] border border-[#4FC3F7]/30 shadow-sm">
            {destination.category}
          </span>
        </div>

        {/* Processing Time Badge or Visa Type */}
        {(destination.visaProcessingTime || destination.visaType) && (
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/90 backdrop-blur-md text-slate-800 shadow-sm">
              ⏱ {destination.visaProcessingTime || destination.visaType}
            </span>
          </div>
        )}

        {/* Title over gradient */}
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-black text-white tracking-tight flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-[#4FC3F7]" />
            {destName}
          </h3>
          <p className="text-xs text-slate-200 line-clamp-1 mt-0.5">
            {destination.description}
          </p>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Perfect For / Suitable For */}
          {visaTags.length > 0 && (
            <div className="mb-3">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1.5">
                Available Visa Pathways
              </span>
              <div className="flex flex-wrap gap-1.5">
                {visaTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#E3F2FD] text-[#0B1B3B] text-[11px] font-semibold"
                  >
                    <CheckCircle2 className="w-3 h-3 text-[#4FC3F7]" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Highlights */}
          {destination.highlights && destination.highlights.length > 0 && (
            <div>
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 block mb-1">
                Highlights
              </span>
              <p className="text-xs text-slate-600 line-clamp-2">
                {destination.highlights.join(' • ')}
              </p>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-2 border-t border-slate-100 flex items-center gap-2">
          <button
            onClick={() => onInquire(destination)}
            className="flex-1 py-2.5 px-3 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Visa Inquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={getWhatsAppLink(`Hello SkyBridge Travel & Tourism, I am inquiring about visa requirements and packages for ${destName}.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition-colors"
            aria-label={`Message SkyBridge Travel & Tourism on WhatsApp for ${destName}`}
            title="Message SkyBridge Travel & Tourism on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
