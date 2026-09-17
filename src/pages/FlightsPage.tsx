import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';
import { ServiceType } from '../types';
import {
  Plane,
  Clock,
  Luggage,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  Users,
  ArrowRight,
  MessageCircle,
  FileCheck2,
  Sparkles
} from 'lucide-react';

export const FlightsPage: React.FC = () => {
  const { openInquiryModal } = useOutletContext<{
    openInquiryModal: (config?: {
      defaultService?: ServiceType;
      defaultDestination?: string;
      defaultTitle?: string;
      isBookingRequest?: boolean;
    }) => void;
  }>();

  const [fromCity, setFromCity] = useState('Lahore (LHE)');
  const [toCity, setToCity] = useState('');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [cabinClass, setCabinClass] = useState('Economy');
  const [tripType, setTripType] = useState<'roundtrip' | 'oneway' | 'multicity'>('roundtrip');
  const [passengers, setPassengers] = useState(1);

  const handleFlightSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openInquiryModal({
      defaultService: 'Flight Booking',
      defaultDestination: toCity || 'International Destination',
      defaultTitle: `Flight Booking Request: ${fromCity} to ${toCity || 'Destination'} (${cabinClass}, ${tripType})`,
      isBookingRequest: true
    });
  };

  const airlinePartners = [
    'Emirates',
    'Qatar Airways',
    'Turkish Airlines',
    'Saudia',
    'Etihad Airways',
    'Flydubai',
    'PIA (Pakistan International Airlines)',
    'British Airways',
    'Gulf Air',
    'Air Arabia'
  ];

  return (
    <div>
      <PageHero
        title="Flight Booking Assistance"
        subtitle="Worldwide scheduled carrier reservations, embassy-compliant visa reservation tickets, flexible date queries, and group flight management."
        badge="Aviation Services"
        breadcrumbs={[{ label: 'Flights' }]}
        bgImage="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Flight Search & Booking Request Engine */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setTripType('roundtrip')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    tripType === 'roundtrip'
                      ? 'bg-[#0B1B3B] text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Round Trip
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('oneway')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    tripType === 'oneway'
                      ? 'bg-[#0B1B3B] text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  One Way
                </button>
                <button
                  type="button"
                  onClick={() => setTripType('multicity')}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                    tripType === 'multicity'
                      ? 'bg-[#0B1B3B] text-white'
                      : 'bg-white text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Multi-City
                </button>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <Sparkles className="w-3.5 h-3.5 text-[#FFB300]" />
                <span>Verified PNR reservation assistance available</span>
              </div>
            </div>

            <form onSubmit={handleFlightSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-end">
              {/* Departure City */}
              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  From (Departure)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={fromCity}
                    onChange={e => setFromCity(e.target.value)}
                    placeholder="City or Airport (e.g. Lahore)"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
              </div>

              {/* Arrival City */}
              <div className="lg:col-span-3">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  To (Destination)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="text"
                    required
                    value={toCity}
                    onChange={e => setToCity(e.target.value)}
                    placeholder="e.g. London / Paris / Jeddah"
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
              </div>

              {/* Departure Date */}
              <div className="lg:col-span-2">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Departure Date
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                  <input
                    type="date"
                    required
                    value={departDate}
                    onChange={e => setDepartDate(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
              </div>

              {/* Return Date */}
              {tripType === 'roundtrip' && (
                <div className="lg:col-span-2">
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Return Date
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
                    <input
                      type="date"
                      value={returnDate}
                      onChange={e => setReturnDate(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                </div>
              )}

              {/* Cabin & Passengers */}
              <div className={tripType === 'roundtrip' ? 'lg:col-span-2' : 'lg:col-span-4'}>
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs sm:text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Plane className="w-4 h-4 text-[#4FC3F7] group-hover:text-[#0B1B3B]" />
                  <span>Request Flight Quote</span>
                </button>
              </div>
            </form>

            <div className="mt-4 pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-between text-xs text-slate-500">
              <div className="flex items-center gap-4">
                <span>Class: <strong>{cabinClass}</strong></span>
                <span>Travelers: <strong>{passengers}</strong></span>
              </div>
              <div className="text-[11px] text-slate-400">
                Quotes are calculated based on live availability and confirmed seat inventory.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flight Assistance Pillars */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
              Our Aviation Services
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
              Why Coordinate Flights With SkyBridge
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <FileCheck2 className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1B3B]">
                Visa Flight Reservation Tickets
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Embassies require verified return or onward flight itinerary proofs for visa applications. We generate legitimate, verifiable reservation files (with active PNR) strictly adhering to consular guidelines.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <Luggage className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1B3B]">
                Baggage & Transit Guidance
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Avoid surprise baggage fees and tight connection anxieties. We evaluate transit visa requirements for connection airports and ensure your itinerary allows comfortable transfer times.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <Users className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-lg font-bold text-[#0B1B3B]">
                Group & Corporate Coordination
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Traveling as an extended family, wedding delegation, or corporate team? We coordinate synchronized group seating, flexible name changes, and centralized billing statements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Airlines Banner */}
      <section className="py-14 bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-6">
            Leading Global Airlines We Partner & Issue With
          </span>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            {airlinePartners.map((airline, idx) => (
              <span
                key={idx}
                className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-semibold text-slate-700"
              >
                {airline}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
