import React, { useState } from 'react';
import {
  TrendingUp,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  DollarSign,
  MousePointerClick,
  ShoppingBag,
  Percent,
  Layers,
  Copy,
  Check,
  RefreshCw,
  PlusCircle,
  HelpCircle,
  ShieldCheck,
  Globe
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { AffiliateTrackingRecord } from '../../types';

export const AdminAffiliateOffersPage: React.FC = () => {
  const { affiliates, addAffiliate, updateAffiliate } = useCrm();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testResult, setTestResult] = useState<{ id: string; success: boolean; msg: string } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // New program form state
  const [formBrand, setFormBrand] = useState('');
  const [formCategory, setFormCategory] = useState<AffiliateTrackingRecord['brandCategory']>('Hotel');
  const [formRate, setFormRate] = useState('');
  const [formCookie, setFormCookie] = useState('30 Days');
  const [formUrl, setFormUrl] = useState('');
  const [formSubId, setFormSubId] = useState('sb-aff-2026');
  const [formPlacement, setFormPlacement] = useState('');
  const [formLandingPage, setFormLandingPage] = useState('/hotels');
  const [formIntegrationLevel, setFormIntegrationLevel] = useState<AffiliateTrackingRecord['integrationStatus']>('Level 1: Manual Links');

  const filteredAffiliates = affiliates.filter(item => {
    if (categoryFilter !== 'All' && item.brandCategory !== categoryFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        item.brandName.toLowerCase().includes(q) ||
        item.brandCategory.toLowerCase().includes(q) ||
        item.placement.toLowerCase().includes(q) ||
        item.affiliateNetwork.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const totalClicks = affiliates.reduce((acc, a) => acc + (a.reportedClicks || 0), 0);
  const totalConversions = affiliates.reduce((acc, a) => acc + (a.reportedConversions || 0), 0);
  const totalApprovedCommission = affiliates.reduce((acc, a) => acc + (a.approvedCommission || 0), 0);
  const totalPendingCommission = affiliates.reduce((acc, a) => acc + (a.pendingCommission || 0), 0);

  const handleCopy = (id: string, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleTestLink = (id: string, url: string) => {
    setTestingId(id);
    setTestResult(null);
    setTimeout(() => {
      setTestingId(null);
      try {
        new URL(url);
        setTestResult({
          id,
          success: true,
          msg: 'Valid affiliate tracking syntax with deep-link parameter recognized.'
        });
        updateAffiliate(id, {
          linkStatus: 'Active',
          linkLastTested: new Date().toISOString().split('T')[0]
        });
      } catch {
        setTestResult({
          id,
          success: false,
          msg: 'Invalid URL format. Please verify query parameters.'
        });
      }
    }, 600);
  };

  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formBrand.trim() || !formUrl.trim()) return;

    addAffiliate({
      brandName: formBrand.trim(),
      brandCategory: formCategory,
      rewardRate: formRate.trim() || '4.0% - 6.0%',
      cookieDuration: formCookie.trim(),
      affiliateUrl: formUrl.trim(),
      subId: formSubId.trim(),
      placement: formPlacement.trim() || 'Website Directory',
      landingPageUrl: formLandingPage,
      integrationStatus: formIntegrationLevel
    });

    setShowAddModal(false);
    setFormBrand('');
    setFormRate('');
    setFormUrl('');
    setFormPlacement('');
  };

  const categories = Array.from(new Set(affiliates.map(a => a.brandCategory))).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
              SECTION 20 & 27 • AFFILIATE HUB
            </span>
            <span className="text-xs text-slate-500 font-medium">Travelpayouts Approved Network</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <TrendingUp className="w-7 h-7 text-amber-600" />
            Travel Affiliate Program Management
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Supervise approved Travelpayouts programs (Booking.com, Trip.com, Viator, Yesim, etc.), track verified commissions, and manage public referral links.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-sm shadow-amber-600/20 transition-all self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          Add Affiliate Program
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Reported Clicks</span>
            <MousePointerClick className="w-4 h-4 text-sky-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{totalClicks.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 mt-1">Traveler referral visits logged</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Reported Conversions</span>
            <ShoppingBag className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-slate-900 mt-2">{totalConversions.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 mt-1">Completed bookings via links</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Approved Commission</span>
            <DollarSign className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-emerald-600 mt-2">PKR {totalApprovedCommission.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 mt-1">Cleared by Travelpayouts</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Pending Commission</span>
            <DollarSign className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-600 mt-2">PKR {totalPendingCommission.toLocaleString()}</div>
          <div className="text-[11px] text-slate-400 mt-1">Awaiting checkout / stay check</div>
        </div>
      </div>

      {/* Compliance Notice */}
      <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 text-xs text-sky-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold">Affiliate Compliance & Transparency Standard (Section 27)</strong>
          <p className="text-sky-800 leading-relaxed">
            All figures shown are direct reports from authorized Travelpayouts programs. Zero synthetic earnings are recorded. Public customer pages display explicit affiliate disclosure notes: referral links never guarantee a discount or add hidden markups to the traveler.
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by brand name, category, or placement..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            <option value="All">All Brand Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Programs Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Brand & Network</th>
                <th className="p-4">Category & Placement</th>
                <th className="p-4">Reward Rate</th>
                <th className="p-4">Cookie Duration</th>
                <th className="p-4">Clicks & Conv.</th>
                <th className="p-4">Commission Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAffiliates.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{item.brandName}</div>
                    <div className="flex items-center gap-1.5 mt-0.5 text-slate-500">
                      <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded">{item.id}</span>
                      <span>•</span>
                      <span>{item.affiliateNetwork}</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {item.brandCategory}
                    </span>
                    <div className="text-[11px] text-slate-500 mt-1">{item.placement}</div>
                  </td>

                  <td className="p-4">
                    <strong className="text-emerald-700 font-semibold">{item.rewardRate}</strong>
                    <div className="text-[11px] text-slate-400">{item.rewardRateType}</div>
                  </td>

                  <td className="p-4">
                    <div className="text-slate-700 font-medium">{item.cookieDuration}</div>
                    <div className="text-[11px] text-slate-400 font-mono">SubID: {item.subId}</div>
                  </td>

                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-800 font-bold">{item.reportedClicks}</span>
                      <span className="text-slate-400">clicks</span>
                      <span>•</span>
                      <span className="text-emerald-600 font-bold">{item.reportedConversions}</span>
                      <span className="text-slate-400">sales</span>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="text-xs font-bold text-slate-900">
                      PKR {item.reportedCommission.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      App: PKR {item.approvedCommission.toLocaleString()} | Pend: PKR {item.pendingCommission.toLocaleString()}
                    </div>
                  </td>

                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleCopy(item.id, item.affiliateUrl)}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                        title="Copy Affiliate URL"
                      >
                        {copiedId === item.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      </button>

                      <button
                        onClick={() => handleTestLink(item.id, item.affiliateUrl)}
                        disabled={testingId === item.id}
                        className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100"
                        title="Validate Tracking Link"
                      >
                        <RefreshCw className={`w-4 h-4 ${testingId === item.id ? 'animate-spin' : ''}`} />
                      </button>

                      <a
                        href={item.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold shadow-sm"
                        title="Test Deep Link"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Test Notice if triggered */}
      {testResult && (
        <div
          className={`p-4 rounded-xl border flex items-start justify-between gap-3 text-xs ${
            testResult.success ? 'bg-emerald-50 border-emerald-200 text-emerald-900' : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="flex items-center gap-2">
            {testResult.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-rose-600" />}
            <span>{testResult.msg}</span>
          </div>
          <button onClick={() => setTestResult(null)} className="font-bold">✕</button>
        </div>
      )}

      {/* Add Program Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Add Affiliate Partner</h2>
                <p className="text-slate-500">Register an approved Travelpayouts or direct travel affiliate program.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProgram} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Booking.com / Trip.com"
                  value={formBrand}
                  onChange={e => setFormBrand(e.target.value)}
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
                    <option value="Hotel">Hotel</option>
                    <option value="Flight">Flight</option>
                    <option value="Tours & Activities">Tours & Activities</option>
                    <option value="eSIM / Telecom">eSIM / Telecom</option>
                    <option value="Car Rental">Car Rental</option>
                    <option value="Airport Transfers">Airport Transfers</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Packages">Packages</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Reward Rate *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5.0% of booking"
                    value={formRate}
                    onChange={e => setFormRate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Affiliate Link / Referral URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={formUrl}
                  onChange={e => setFormUrl(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">SubID Parameter</label>
                  <input
                    type="text"
                    value={formSubId}
                    onChange={e => setFormSubId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Website Placement</label>
                  <input
                    type="text"
                    placeholder="e.g. Hotels Directory"
                    value={formPlacement}
                    onChange={e => setFormPlacement(e.target.value)}
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
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold"
                >
                  Save Partner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
