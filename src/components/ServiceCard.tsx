import React from 'react';
import {
  Plane,
  Building2,
  Stamp,
  Globe2,
  HeartHandshake,
  Moon,
  FileCheck2,
  FileText,
  FolderLock,
  GraduationCap,
  Users2,
  CarTaxiFront,
  ArrowRight,
  Check
} from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onSelect: (service: ServiceItem) => void;
}

const iconMap: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Stamp: <Stamp className="w-6 h-6" />,
  Globe2: <Globe2 className="w-6 h-6" />,
  HeartHandshake: <HeartHandshake className="w-6 h-6" />,
  Moon: <Moon className="w-6 h-6" />,
  FileCheck2: <FileCheck2 className="w-6 h-6" />,
  FileText: <FileText className="w-6 h-6" />,
  FolderLock: <FolderLock className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  Users2: <Users2 className="w-6 h-6" />,
  CarTaxiFront: <CarTaxiFront className="w-6 h-6" />
};

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, onSelect }) => {
  return (
    <div className="group bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Icon & Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-13 h-13 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] group-hover:bg-[#4FC3F7] group-hover:text-[#0B1B3B] p-3 transition-colors flex items-center justify-center">
            {iconMap[service.icon] || <Globe2 className="w-6 h-6" />}
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            {service.category}
          </span>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg font-bold text-[#0B1B3B] tracking-tight group-hover:text-[#0B1B3B] mb-2">
          {service.title}
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed mb-4">
          {service.shortDescription}
        </p>

        {/* Features Preview */}
        {service.features && (
          <ul className="space-y-1.5 mb-5">
            {service.features.slice(0, 3).map((feat, i) => (
              <li key={i} className="flex items-center gap-2 text-[11px] text-slate-500">
                <Check className="w-3.5 h-3.5 text-[#4FC3F7] shrink-0" />
                <span className="truncate">{feat}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Button */}
      <button
        onClick={() => onSelect(service)}
        className="w-full py-2.5 px-4 rounded-xl bg-slate-50 group-hover:bg-[#0B1B3B] group-hover:text-white text-[#0B1B3B] text-xs font-bold transition-colors flex items-center justify-center gap-2"
      >
        <span>Inquire for Assistance</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
      </button>
    </div>
  );
};
