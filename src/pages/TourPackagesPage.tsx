import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { PackageCard } from '../components/PackageCard';
import { PACKAGES_DATA } from '../data/packagesData';
import { ServiceType, TravelPackage } from '../types';
import { Compass, Sparkles } from 'lucide-react';

export const TourPackagesPage: React.FC = () => {
  const { openInquiryModal } = useOutletContext<{
    openInquiryModal: (config?: {
      defaultService?: ServiceType;
      defaultDestination?: string;
      defaultTitle?: string;
      isBookingRequest?: boolean;
    }) => void;
  }>();

  const [activeFilter, setActiveFilter] = useState<'All' | 'Europe' | 'Middle East' | 'Asia'>('All');

  const tourPackages = PACKAGES_DATA.filter(p => p.category !== 'Umrah' && p.category !== 'Honeymoon');

  const filteredPackages = activeFilter === 'All'
    ? tourPackages
    : tourPackages.filter(p => p.category === activeFilter);

  return (
    <div>
      <PageHero
        title="International Tour & Holiday Packages"
        subtitle="Carefully curated holiday itineraries combining flights, 4 and 5-star hotel accommodations, private transfers, and embassy visa file support."
        badge="Holiday Packages"
        breadcrumbs={[{ label: 'Tour Packages' }]}
        bgImage="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filters */}
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {['All', 'Europe', 'Middle East', 'Asia'].map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat as any)}
                className={`px-5 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  activeFilter === cat
                    ? 'bg-[#0B1B3B] text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat === 'All' ? 'All Holiday Packages' : cat}
              </button>
            ))}
          </div>

          {/* Package Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPackages.map(pkg => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onBookNow={p =>
                  openInquiryModal({
                    defaultService: 'Tour Package',
                    defaultDestination: p.destination,
                    defaultTitle: p.title,
                    isBookingRequest: true
                  })
                }
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
