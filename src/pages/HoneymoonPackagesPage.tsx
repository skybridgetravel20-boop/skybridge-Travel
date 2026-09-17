import React from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { PackageCard } from '../components/PackageCard';
import { PACKAGES_DATA } from '../data/packagesData';
import { ServiceType } from '../types';
import { HeartHandshake, Sparkles, CheckCircle2, MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '../data/companyInfo';

export const HoneymoonPackagesPage: React.FC = () => {
  const { openInquiryModal } = useOutletContext<{
    openInquiryModal: (config?: {
      defaultService?: ServiceType;
      defaultDestination?: string;
      defaultTitle?: string;
      isBookingRequest?: boolean;
    }) => void;
  }>();

  const honeymoonPackages = PACKAGES_DATA.filter(
    p => p.category === 'Honeymoon' || p.id === 'switzerland-experience' || p.id === 'dubai-holiday'
  );

  return (
    <div>
      <PageHero
        title="Luxury Honeymoon Packages"
        subtitle="Unforgettable romantic celebrations, private pool villas, candlelit beach dinners, and serene alpine getaways designed exclusively for newlywed couples."
        badge="Romantic Escapes"
        breadcrumbs={[{ label: 'Packages', link: '/tour-packages' }, { label: 'Honeymoon Packages' }]}
        bgImage="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Intro strip */}
      <section className="py-12 bg-white border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
              <span className="font-bold text-sm text-[#0B1B3B] block mb-1">Private Pool Villas & Suites</span>
              <p className="text-xs text-slate-600">Handpicked luxury resorts offering total intimacy and breathtaking views.</p>
            </div>
            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
              <span className="font-bold text-sm text-[#0B1B3B] block mb-1">Romantic Inclusions</span>
              <p className="text-xs text-slate-600">Candlelight dining, couple spa treatments, floral decorations & celebratory cakes.</p>
            </div>
            <div className="p-4 rounded-2xl bg-pink-50/60 border border-pink-100">
              <span className="font-bold text-sm text-[#0B1B3B] block mb-1">Discreet Concierge Service</span>
              <p className="text-xs text-slate-600">Dedicated coordinator managing private transfers and excursion timings smoothly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Package Listings */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-black text-[#0B1B3B]">
              Handcrafted Honeymoon Itineraries
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every honeymoon package can be customized with specific hotel upgrades, romantic dinners, and private excursions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {honeymoonPackages.map(pkg => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onBookNow={p =>
                  openInquiryModal({
                    defaultService: 'Honeymoon Package',
                    defaultDestination: p.destination,
                    defaultTitle: `Honeymoon Inquiry: ${p.title}`,
                    isBookingRequest: true
                  })
                }
              />
            ))}
          </div>

          <div className="mt-16 p-8 rounded-3xl bg-white border border-slate-200/80 max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-bold text-[#0B1B3B]">Have a Custom Honeymoon Dream Destination in Mind?</h3>
            <p className="text-xs sm:text-sm text-slate-600">
              From the Greek islands of Santorini to Seychelles or the snowy peaks of New Zealand, our consultants design custom honeymoon dossiers according to your exact preferences.
            </p>
            <div className="pt-2 flex justify-center gap-4">
              <button
                onClick={() =>
                  openInquiryModal({
                    defaultService: 'Honeymoon Package',
                    defaultTitle: 'Custom Honeymoon Itinerary Request'
                  })
                }
                className="px-6 py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
              >
                Request Custom Itinerary
              </button>
              <a
                href={getWhatsAppLink('Hello SkyBridge, I would like to design a custom honeymoon trip.')}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-bold hover:bg-emerald-100 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
