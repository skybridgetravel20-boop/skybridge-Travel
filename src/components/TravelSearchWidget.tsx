import React, { useState } from 'react';
import { Plane, Building2, Stamp, Compass, Search, Calendar, Users, MapPin, Sparkles } from 'lucide-react';
import { ServiceType } from '../types';

interface TravelSearchWidgetProps {
  onSearch: (criteria: {
    tab: 'flights' | 'hotels' | 'packages' | 'visa';
    destination: string;
    travelDate: string;
    visaType: string;
    passengers: number;
    service: ServiceType;
  }) => void;
}

export const TravelSearchWidget: React.FC<TravelSearchWidgetProps> = ({ onSearch }) => {
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'packages' | 'visa'>('visa');
  const [destination, setDestination] = useState('');
  const [travelDate, setTravelDate] = useState('');
  const [visaType, setVisaType] = useState('Tourist Visa');
  const [passengers, setPassengers] = useState(1);

  const getServiceType = (): ServiceType => {
    switch (activeTab) {
      case 'flights':
        return 'Flight Booking';
      case 'hotels':
        return 'Hotel Booking';
      case 'packages':
        return 'Tour Package';
      case 'visa':
      default:
        return 'Tourist Visa';
    }
  };

  const handleSearchClick = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      tab: activeTab,
      destination: destination || (activeTab === 'visa' ? 'Schengen / Europe' : 'Dubai / International'),
      travelDate,
      visaType,
      passengers,
      service: getServiceType()
    });
  };

  return (
    <div className="relative z-20 -mt-14 max-w-5xl mx-auto px-4 sm:px-6">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-3 sm:p-5 backdrop-blur-md">
        {/* Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 pb-4 border-b border-slate-100 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('visa')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'visa'
                ? 'bg-[#0B1B3B] text-white shadow-md'
                : 'text-slate-600 hover:text-[#0B1B3B] hover:bg-slate-50'
            }`}
          >
            <Stamp className="w-4 h-4 text-[#4FC3F7]" />
            <span>Visa Assistance</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('flights')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'flights'
                ? 'bg-[#0B1B3B] text-white shadow-md'
                : 'text-slate-600 hover:text-[#0B1B3B] hover:bg-slate-50'
            }`}
          >
            <Plane className="w-4 h-4 text-[#4FC3F7]" />
            <span>Flights</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('hotels')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'hotels'
                ? 'bg-[#0B1B3B] text-white shadow-md'
                : 'text-slate-600 hover:text-[#0B1B3B] hover:bg-slate-50'
            }`}
          >
            <Building2 className="w-4 h-4 text-[#4FC3F7]" />
            <span>Hotels</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('packages')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              activeTab === 'packages'
                ? 'bg-[#0B1B3B] text-white shadow-md'
                : 'text-slate-600 hover:text-[#0B1B3B] hover:bg-slate-50'
            }`}
          >
            <Compass className="w-4 h-4 text-[#4FC3F7]" />
            <span>Holiday Packages</span>
          </button>
        </div>

        {/* Form Fields */}
        <form onSubmit={handleSearchClick} className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-end">
          {/* Destination */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Destination
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                placeholder={
                  activeTab === 'visa'
                    ? 'e.g. France / UK / USA'
                    : activeTab === 'packages'
                    ? 'e.g. Switzerland / Bali'
                    : 'City or Country'
                }
                value={destination}
                onChange={e => setDestination(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Travel Date */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Target Travel Date
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="date"
                value={travelDate}
                onChange={e => setTravelDate(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Visa Type or Package Category */}
          <div className="lg:col-span-3">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              {activeTab === 'visa' ? 'Visa Category' : 'Trip Type'}
            </label>
            <select
              value={visaType}
              onChange={e => setVisaType(e.target.value)}
              className="w-full px-3 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white transition-colors"
            >
              {activeTab === 'visa' ? (
                <>
                  <option value="Tourist Visa">Tourist / Visitor Visa</option>
                  <option value="Family Visa">Family Visit Visa</option>
                  <option value="Student Visa">Student Visa File</option>
                  <option value="Business Visa">Business Delegation Visa</option>
                  <option value="e-Visa">Electronic e-Visa</option>
                </>
              ) : activeTab === 'packages' ? (
                <>
                  <option value="Tour Package">Group / Leisure Tour</option>
                  <option value="Honeymoon Package">Romantic Honeymoon</option>
                  <option value="Umrah Package">Umrah Sacred Pilgrimage</option>
                </>
              ) : (
                <>
                  <option value="Standard Itinerary">Standard Economy</option>
                  <option value="Premium Corporate">Premium / Corporate</option>
                  <option value="Family Booking">Family Group</option>
                </>
              )}
            </select>
          </div>

          {/* Passengers */}
          <div className="lg:col-span-1">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Pax
            </label>
            <div className="relative">
              <Users className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-3.5" />
              <input
                type="number"
                min={1}
                max={50}
                value={passengers}
                onChange={e => setPassengers(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full pl-7 pr-2 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] focus:bg-white transition-colors"
              />
            </div>
          </div>

          {/* Submit Search Button */}
          <div className="lg:col-span-2">
            <button
              type="submit"
              className="w-full py-2.5 px-4 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group"
            >
              <Search className="w-4 h-4 text-[#4FC3F7] group-hover:text-[#0B1B3B] transition-colors" />
              <span>Search & Inquire</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
