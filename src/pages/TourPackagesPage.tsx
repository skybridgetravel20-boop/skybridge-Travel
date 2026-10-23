import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { PackageCard } from '../components/PackageCard';
import { PACKAGES_DATA } from '../data/packagesData';
import { ServiceType, TravelPackage } from '../types';
import { SeoMeta } from '../components/seo/SeoMeta';
import { GeoKeyTakeaways } from '../components/seo/GeoKeyTakeaways';
import { AeoFaqSection } from '../components/seo/AeoFaqSection';
import { SxoTrustBadges } from '../components/seo/SxoTrustBadges';
import { FAQ_ITEMS } from '../data/faqData';
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

  const tourGeoTakeaways = [
    {
      label: "Featured Itineraries",
      value: "Switzerland, France, Italy, Turkey, UAE, Malaysia",
      badge: "Curated Tours",
      highlight: true
    },
    {
      label: "Package Inclusions",
      value: "Flights, 4/5-Star Hotels, Daily Breakfast & Private Transfers",
      badge: "All-in-One"
    },
    {
      label: "Visa Support Included",
      value: "Embassy Appointment, Cover Letter & Document Vouchers",
      badge: "Full File Prep"
    },
    {
      label: "Customizable Plans",
      value: "Tailored to Family, Couple or Corporate Group Sizes",
      badge: "Flexible"
    },
    {
      label: "Price Transparency",
      value: "Clear Net + Service Quotation Structure",
      badge: "No Hidden Costs",
      highlight: true
    },
    {
      label: "Direct Booking Desk",
      value: "+92 324 4444167 | +92 345 4444167",
      badge: "Lahore Multan Rd"
    }
  ];

  const tourFaqs = FAQ_ITEMS.filter(
    f => f.category === 'Packages' || f.id === 'faq-1' || f.id === 'faq-7' || f.id === 'faq-10'
  );

  return (
    <div>
      <SeoMeta
        title="International Tour & Holiday Packages Lahore | Europe, Turkey, Dubai"
        description="Explore holiday packages from Lahore. Curated Europe tours, Turkey cultural trips, Dubai getaways, and Malaysia holidays with flights, hotels, and visa support."
        canonicalPath="/tour-packages"
        keywords="Tour packages Lahore, Europe tour package Pakistan, Turkey holiday package, Dubai holiday deals Lahore, Malaysia tour operator, SkyBridge holiday packages"
        schema={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "International Holiday & Tour Packages",
          "serviceType": "Tour Operator",
          "provider": {
            "@type": "TravelAgency",
            "name": "SkyBridge Travel & Tourism",
            "url": "https://skybridgetravelandtourism.com",
            "telephone": ["+923244444167", "+923454444167"]
          }
        }}
      />

      <PageHero
        title="International Tour & Holiday Packages"
        subtitle="Carefully curated holiday itineraries combining flights, 4 and 5-star hotel accommodations, private transfers, and embassy visa file support."
        badge="Holiday Packages"
        breadcrumbs={[{ label: 'Tour Packages' }]}
        bgImage="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1920&q=80"
      />

      {/* GEO Key Takeaways Knowledge Block */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-10 mb-8">
        <GeoKeyTakeaways
          title="International Holiday Packages Intel 2026"
          subtitle="Curated vacation logistics, visa compliance, and luxury inclusions"
          items={tourGeoTakeaways}
          authorityNote="All tour packages feature confirmed reservations and certified local ground transportation partners."
        />
      </div>

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

      {/* SXO Trust Signals */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SxoTrustBadges />
      </div>

      {/* AEO Direct Answer Q&A Knowledge Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AeoFaqSection
          title="International Holiday Tours & Itineraries FAQ"
          subtitle="Answers to common queries regarding package customization, visa file handling, hotel standards, and group discounts"
          faqs={tourFaqs}
          defaultOpenId="faq-7"
        />
      </div>
    </div>
  );
};
