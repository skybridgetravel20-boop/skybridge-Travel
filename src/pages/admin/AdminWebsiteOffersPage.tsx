import React, { useState } from 'react';
import {
  Tag,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  PlusCircle,
  Eye,
  EyeOff,
  DollarSign,
  Calendar,
  Layers,
  MapPin,
  Check,
  Edit,
  ShieldCheck
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { WebsiteOfferRecord } from '../../types';

export const AdminWebsiteOffersPage: React.FC = () => {
  const { websiteOffers, addWebsiteOffer, updateWebsiteOffer, toggleApproveWebsiteOffer } = useCrm();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New offer form
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<WebsiteOfferRecord['offerCategory']>('Umrah');
  const [formDestination, setFormDestination] = useState('');
  const [formShort, setFormShort] = useState('');
  const [formFull, setFormFull] = useState('');
  const [formPrice, setFormPrice] = useState<number>(245000);
  const [formPriceSource, setFormPriceSource] = useState('Direct DMC Contract');
  const [formCta, setFormCta] = useState('Book Package');
  const [formLandingPage, setFormLandingPage] = useState('/umrah-packages');
  const [formLocation, setFormLocation] = useState<WebsiteOfferRecord['displayLocation']>('Featured Packages');

  const filteredOffers = websiteOffers.filter(item => {
    if (categoryFilter !== 'All' && item.offerCategory !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        item.offerTitle.toLowerCase().includes(q) ||
        item.destination.toLowerCase().includes(q) ||
        item.shortDescription.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleCreateOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formDestination.trim()) return;

    addWebsiteOffer({
      offerTitle: formTitle.trim(),
      offerCategory: formCategory,
      destination: formDestination.trim(),
      shortDescription: formShort.trim(),
      fullDescription: formFull.trim() || formShort.trim(),
      displayPrice: formPrice,
      priceCurrency: 'PKR',
      priceSource: formPriceSource.trim(),
      ctaText: formCta.trim(),
      landingPageUrl: formLandingPage,
      displayLocation: formLocation,
      adminApproved: true,
      offerStatus: 'Published'
    });

    setShowAddModal(false);
    setFormTitle('');
    setFormDestination('');
    setFormShort('');
    setFormFull('');
  };

  const categories = Array.from(new Set(websiteOffers.map(o => o.offerCategory))).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200">
              SECTION 21 & 28 • WEBSITE OFFERS
            </span>
            <span className="text-xs text-slate-500 font-medium">Customer-Facing Approved Deals</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <Tag className="w-7 h-7 text-rose-600" />
            Website Offers & Packages Control
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Authorize travel deals, Umrah packages, flight specials, and visa assistance packages published on the public SkyBridge website.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-sm shadow-rose-600/20 transition-all self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          Create Website Offer
        </button>
      </div>

      {/* Compliance Rule Note */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs text-emerald-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold">Public Boundary Enforced (Section 28)</strong>
          <p className="text-emerald-800 leading-relaxed">
            Only offers with <strong>Admin Approved</strong> toggled ON will appear on the customer-facing website. Internal net rates, supplier credentials, and private commercial margins are never displayed to visitors.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search offers by title, destination, or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="All">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredOffers.map(offer => (
          <div
            key={offer.id}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-rose-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between p-5 space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-xs font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">
                  {offer.id}
                </span>

                <button
                  onClick={() => toggleApproveWebsiteOffer(offer.id)}
                  className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                    offer.adminApproved
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}
                  title="Toggle Public Website Visibility"
                >
                  {offer.adminApproved ? (
                    <>
                      <Eye className="w-3.5 h-3.5 text-emerald-600" /> Publicly Active
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-3.5 h-3.5 text-slate-400" /> Hidden / Draft
                    </>
                  )}
                </button>
              </div>

              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-700">
                  {offer.offerCategory}
                </span>
                <h3 className="font-bold text-slate-900 text-base mt-1 leading-snug">{offer.offerTitle}</h3>
                <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-400" /> {offer.destination}
                </div>
              </div>

              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{offer.shortDescription}</p>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Display Selling Price:</span>
                  <strong className="text-emerald-700 text-sm">
                    {offer.priceCurrency} {offer.displayPrice.toLocaleString()}
                  </strong>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Source: {offer.priceSource}</span>
                  <span>Location: {offer.displayLocation}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <span className="text-[11px] text-slate-400">
                Verified: {offer.lastVerifiedDate}
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={offer.landingPageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 flex items-center gap-1"
                >
                  <span>Preview Page</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Offer Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Create Website Offer</h2>
                <p className="text-slate-500">Configure public customer travel offer with transparent pricing.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateOffer} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Offer Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5-Star Winter Umrah Luxury Special"
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  >
                    <option value="Umrah">Umrah</option>
                    <option value="Flight">Flight</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Holiday Package">Holiday Package</option>
                    <option value="Visa Assistance">Visa Assistance</option>
                    <option value="Overseas Opportunity">Overseas Opportunity</option>
                    <option value="Scholarship">Scholarship</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Destination *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Makkah & Madinah"
                    value={formDestination}
                    onChange={e => setFormDestination(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Display Selling Price (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={e => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  />
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Price Source Reference</label>
                  <input
                    type="text"
                    value={formPriceSource}
                    onChange={e => setFormPriceSource(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Short Customer Description</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Key highlights, hotel walking distance, inclusions..."
                  value={formShort}
                  onChange={e => setFormShort(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Display Location</label>
                  <select
                    value={formLocation}
                    onChange={e => setFormLocation(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  >
                    <option value="Featured Packages">Featured Packages</option>
                    <option value="Homepage Hero">Homepage Hero</option>
                    <option value="Deals Banner">Deals Banner</option>
                    <option value="Visa Portal">Visa Portal</option>
                    <option value="Umrah Desk">Umrah Desk</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Landing Page URL</label>
                  <input
                    type="text"
                    value={formLandingPage}
                    onChange={e => setFormLandingPage(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  />
                </div>
              </div>

              <div className="pt-3 border-t flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold"
                >
                  Publish Website Offer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
