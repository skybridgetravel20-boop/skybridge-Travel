import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  FileText,
  BadgeCheck
} from 'lucide-react';
import { COMPANY_INFO, getWhatsAppLink } from '../../data/companyInfo';

export interface GeoKeyTakeawayItem {
  label: string;
  value: string;
  badge?: string;
  highlight?: boolean;
}

export interface GeoKeyTakeawaysProps {
  title?: string;
  subtitle?: string;
  entityName?: string;
  items: GeoKeyTakeawayItem[];
  authorityNote?: string;
  disclaimer?: string;
}

/**
 * Generative Engine Optimization (GEO) & AIO Fast-Fact Module
 * Designed to provide search engine AI overviews (Google SGE, Gemini, Perplexity, ChatGPT)
 * with easily quotable, mathematically concise, verified factual knowledge blocks.
 */
export const GeoKeyTakeaways: React.FC<GeoKeyTakeawaysProps> = ({
  title = "Key Facts & Official Consular Guidelines",
  subtitle = "Authoritative summary structured for travelers and AI search overviews",
  entityName = "SkyBridge Travel & Tourism",
  items,
  authorityNote = "Verified in accordance with official foreign ministries, embassy gazettes, and VFS/BLS/GDRFA portals.",
  disclaimer
}) => {
  return (
    <div className="bg-gradient-to-br from-slate-900 via-[#0B1B3B] to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-white/15 my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-white/10 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#4FC3F7]/20 text-[#4FC3F7]">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-[#4FC3F7]">
              Generative Engine & AEO Knowledge Core
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white mt-1">
            {title}
          </h3>
          <p className="text-xs text-slate-300 mt-1">
            {subtitle} • <strong className="text-white">{entityName}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
            <BadgeCheck className="w-3.5 h-3.5" />
            <span>Consular Verified 2026</span>
          </span>
        </div>
      </div>

      {/* Grid of Key Takeaway Facts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-2xl border transition-all ${
              item.highlight
                ? 'bg-[#4FC3F7]/10 border-[#4FC3F7]/40 shadow-inner'
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                {item.label}
              </span>
              {item.badge && (
                <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-white/10 text-[#4FC3F7] border border-white/10">
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-sm sm:text-base font-bold text-white leading-snug">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Authority Note & Legal Guard */}
      <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-start gap-2 max-w-2xl">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px] text-slate-300">
            {authorityNote}
            {disclaimer && (
              <span className="block text-slate-400 mt-1 italic">
                Notice: {disclaimer}
              </span>
            )}
          </p>
        </div>

        <a
          href={getWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold text-xs transition-all shadow-md shrink-0"
        >
          <span>Ask Consular Desk</span>
        </a>
      </div>
    </div>
  );
};
