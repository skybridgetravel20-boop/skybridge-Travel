import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';
import { ServiceType } from '../types';
import {
  Building2,
  MapPin,
  Calendar,
  Users,
  CheckCircle2,
  FileCheck2,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  MessageCircle,
  Clock
} from 'lucide-react';

export const HotelsPage: React.FC = () => {
  const { openInquiryModal } = useOutletContext<{
    openInquiryModal: (config?: {
      defaultService?: ServiceType;
      defaultDestination?: string;
      defaultTitle?: string;
      isBookingRequest?: boolean;
    }) => void;
  }>();

  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [guests, setGuests] = useState(2);
  const [hotelStandard, setHotelStandard] = useState('4-Star Superior');

  const handleHotelSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openInquiryModal({
      defaultService: 'Hotel Booking',
      defaultDestination: destination || 'Worldwide Hotel',
      defaultTitle: `Hotel Booking Request: ${destination || 'Destination'} (${hotelStandard}, ${rooms} Room(s), ${guests} Guest(s))`,
      isBookingRequest: true
    });
  };

  const hotelCategories = [
    {
      title: 'Visa File Accommodation Vouchers',
      desc: 'Embassies require authentic accommodation vouchers matching your exact flight itinerary dates. We issue confirmed hotel reservation proofs compliant with Schengen, UK, and worldwide visa files.',
      icon: <FileCheck2 className="w-6 h-6 text-[#4FC3F7]" />
    },
    {
      title: 'City Center & Boutique Stays',
      desc: 'Located within comfortable walking distance of public transit, iconic monuments, and business financial districts across Paris, London, Rome, Istanbul, and Dubai.',
      icon: <Building2 className="w-6 h-6 text-[#4FC3F7]" />
    },
    {
      title: 'Holy Haram Courtyard Proximity',
      desc: 'Umrah hotel accommodations in Makkah and Madinah with direct courtyard access, ideal for elderly travelers and families seeking easy access to prayer.',
      icon: <Sparkles className="w-6 h-6 text-[#FFB300]" />
    }
  ];

  return (
    <div>
      <PageHero
        title="Hotel Booking Assistance"
        subtitle="Verified hotel reservations, boutique city stays, family suites, and embassy-compliant accommodation vouchers worldwide."
        badge="Hospitality Services"
        breadcrumbs={[{ label: 'Hotels' }]}
        bgImage="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Hotel Search Widget */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <h3 className="text-base font-bold text-[#0B1B3B] flex items-center gap-2">
                <Building2 className="w-5 h-5 text-[#4FC3F7]" />
                Request Hotel Booking & Voucher Assistance
              </h3>
              <span className="text-xs text-slate-500 hidden sm:inline-block">
                Tailored for leisure, business & visa documentation files
              </span>
            </div>

            <form onSubmit={handleHotelSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
              {/* Destination */}
              <div className="lg:col-span-4">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Destination / City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    placeholder="e.g. Paris, Dubai, Makkah, Istanbul"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
              </div>

              {/* Check-in */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Check-in Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="date"
                    required
                    value={checkIn}
                    onChange={e => setCheckIn(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
              </div>

              {/* Check-out */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Check-out Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="date"
                    required
                    value={checkOut}
                    onChange={e => setCheckOut(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Standard
                </label>
                <select
                  value={hotelStandard}
                  onChange={e => setHotelStandard(e.target.value)}
                  className="w-full px-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                >
                  <option value="5-Star Luxury">5-Star Luxury</option>
                  <option value="4-Star Superior">4-Star Superior</option>
                  <option value="3-Star Boutique">3-Star Boutique</option>
                  <option value="Embassy-Compliant Visa Voucher">Visa Voucher Only</option>
                </select>
              </div>

              {/* Submit */}
              <div className="lg:col-span-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Request Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-200/70 flex items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span>Rooms: <strong>{rooms}</strong></span>
                <span>Guests: <strong>{guests}</strong></span>
              </div>
              <div className="text-[11px] text-slate-400">
                Quotes include all local taxes and embassy-compliant booking references.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hotelCategories.map((cat, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                  {cat.icon}
                </div>
                <h3 className="text-lg font-bold text-[#0B1B3B]">{cat.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
