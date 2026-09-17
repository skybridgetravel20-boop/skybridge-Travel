import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { DestinationCard } from '../components/DestinationCard';
import { DESTINATIONS } from '../data/destinationsData';
import { ServiceType, Destination } from '../types';

export const DestinationsPage: React.FC = () => {
  const { openInquiryModal } = useOutletContext<{
    openInquiryModal: (config?: {
      defaultService?: ServiceType;
      defaultDestination?: string;
      defaultTitle?: string;
      isBookingRequest?: boolean;
    }) => void;
  }>();

  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = [
    'All',
    'Schengen / Europe',
    'UK / USA / Canada / Australia',
    'GCC & Middle East',
    'Asia / e-Visa'
  ];

  const filteredDestinations = activeCategory === 'All'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.category === activeCategory);

  return (
    <div>
      <PageHero
        title="Worldwide Travel Destinations"
        subtitle="Explore international destinations, entry visa requirements, processing turnaround timelines, and tailored holiday packages."
        badge="Global Portfolio"
        breadcrumbs={[{ label: 'Destinations' }]}
        bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category Filter Pills */}
          <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0B1B3B] text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat === 'All' ? 'All Global Destinations' : cat}
              </button>
            ))}
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDestinations.map(dest => (
              <DestinationCard
                key={dest.id}
                destination={dest}
                onInquire={d =>
                  openInquiryModal({
                    defaultService: 'Tourist Visa',
                    defaultDestination: d.name,
                    defaultTitle: `Inquiry for ${d.name}`
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
