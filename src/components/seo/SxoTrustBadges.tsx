import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  FileCheck2,
  Headphones,
  Award
} from 'lucide-react';
import { COMPANY_INFO } from '../../data/companyInfo';

export const SxoTrustBadges: React.FC = () => {
  const trustSignals = [
    {
      icon: <Building2 className="w-5 h-5 text-cyan-600" />,
      title: "Physical Registered Office",
      desc: "Multan Road, Nadeem Town, Lahore with in-person case consultation."
    },
    {
      icon: <FileCheck2 className="w-5 h-5 text-emerald-600" />,
      title: "100% Checklist Compliance",
      desc: "Pre-submission audit of bank proofs, NOC, FRC & hotel reservations."
    },
    {
      icon: <Clock className="w-5 h-5 text-indigo-600" />,
      title: "Fast Response Time",
      desc: "Direct support via WhatsApp & phone within 15 minutes during operating hours."
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />,
      title: "Transparent Pricing",
      desc: "Clear distinction between official government statutory fees and service charges."
    }
  ];

  return (
    <section className="my-12 py-8 px-6 sm:px-8 bg-slate-50 border border-slate-200/80 rounded-3xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-cyan-700 bg-cyan-100/60 px-2.5 py-1 rounded-md">
            SXO • Search Experience & Trust Architecture
          </span>
          <h3 className="text-lg sm:text-xl font-black text-[#0B1B3B] mt-1.5">
            Why Discerning Travelers Choose SkyBridge Travel & Tourism
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-slate-600 bg-white px-3.5 py-1.5 rounded-xl border border-slate-200 shadow-2xs self-start md:self-auto">
          <Award className="w-4 h-4 text-amber-500" />
          <span>Director Urwa Ali Executive Leadership</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {trustSignals.map((signal, idx) => (
          <div key={idx} className="p-4 bg-white rounded-2xl border border-slate-200/70 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center mb-3 border border-slate-100">
              {signal.icon}
            </div>
            <h4 className="text-xs sm:text-sm font-bold text-[#0B1B3B] mb-1">
              {signal.title}
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600 leading-relaxed">
              {signal.desc}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-slate-200/60 text-[11px] text-slate-500 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <p>
          <strong>Official Consular Disclaimer:</strong> {COMPANY_INFO.visaDisclaimer}
        </p>
        <span className="shrink-0 font-medium text-slate-600">
          Working Hours: {COMPANY_INFO.workingHours}
        </span>
      </div>
    </section>
  );
};
