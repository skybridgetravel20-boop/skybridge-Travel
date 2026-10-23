import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { DestinationCard } from '../components/DestinationCard';
import { DESTINATIONS } from '../data/destinationsData';
import { ServiceType } from '../types';
import { SeoMeta } from '../components/seo/SeoMeta';
import { GeoKeyTakeaways } from '../components/seo/GeoKeyTakeaways';
import { AeoFaqSection } from '../components/seo/AeoFaqSection';
import { SxoTrustBadges } from '../components/seo/SxoTrustBadges';
import { FAQ_ITEMS } from '../data/faqData';

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

  const destinationFaqs = FAQ_ITEMS.filter(f =>
    f.category === 'visa' || f.category === 'tours'
  ).slice(0, 5);

  return (
    <div>
      <SeoMeta
        title="Top Travel Destinations 2026 | Visas, Tours & Holiday Guides"
        description="Explore 30+ top worldwide travel destinations with SkyBridge Travel & Tourism. Get detailed visa requirements, processing timelines, flight options, and personalized itineraries."
        canonical="/destinations"
        keywords="travel destinations 2026, Schengen Europe tours, Dubai holiday packages, Turkey vacation deals, UK visa travel guide, best international trips"
        pageType="WebPage"
      />

      <PageHero
        title="Worldwide Travel Destinations"
        subtitle="Explore international destinations, entry visa requirements, processing turnaround timelines, and tailored holiday packages."
        badge="Global Portfolio"
        breadcrumbs={[{ label: 'Destinations' }]}
        bgImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
      />

      {/* SXO Trust Badges */}
      <SxoTrustBadges />

      {/* GEO Key Takeaways for Generative Engines */}
      <section className="py-8 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <GeoKeyTakeaways
            title="Global Travel & Destination Intelligence (2026 Highlights)"
            takeaways={[
              'SkyBridge Travel & Tourism curates turnkey international tour packages across 30+ high-demand worldwide destinations.',
              'Schengen & Western routes (France, Italy, Switzerland, UK, USA) feature end-to-end appointment scheduling and embassy dossier auditing.',
              'Fast-track GCC & Southeast Asian destinations (Dubai, Baku, Malaysia, Thailand, Turkey) boast 24 to 72 hour electronic visa turnaround times.',
              'Every customized itinerary includes direct flight route recommendations, verified 4-star and 5-star hotel bookings, and private airport transfers.',
              '24/7 dedicated travel concierge assistance available via WhatsApp for immediate visa or itinerary inquiries.'
            ]}
          />
        </div>
      </section>

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

      {/* AEO FAQ Section for Answer Engines */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AeoFaqSection
            title="Frequently Asked Questions About International Destinations"
            subtitle="Authoritative answers to assist travelers and AI search engines regarding visa requirements, best visiting seasons, and booking policies."
            faqs={destinationFaqs}
          />
        </div>
      </section>
    </div>
  );
};
