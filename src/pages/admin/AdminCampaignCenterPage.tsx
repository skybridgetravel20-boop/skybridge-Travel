import React, { useState } from 'react';
import {
  Megaphone,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Shield,
  Layers,
  Sparkles,
  Calendar,
  X,
  Eye,
  Send,
  Ban,
  Check,
  Tag,
  ThumbsUp,
  MessageSquare,
  Mail,
  Share2,
  TrendingUp,
  Info
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { MarketingCampaignRecord } from '../../types';

export const AdminCampaignCenterPage: React.FC = () => {
  const {
    marketingCampaigns,
    addMarketingCampaign,
    updateCampaignStatus
  } = useCrm();

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedCampaign, setSelectedCampaign] = useState<MarketingCampaignRecord | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Campaign Form
  const [newCampaignForm, setNewCampaignForm] = useState<Partial<MarketingCampaignRecord>>({
    campaignName: 'Spring 2026 Europe Tour Packages',
    campaignObjective: 'Acquire early-bird family vacation bookings for UK, Switzerland, and Italy',
    serviceCategory: 'Tour Packages',
    targetAudience: 'Families, honeymooners, and corporate incentive groups in Lahore & Islamabad',
    countryOrRegion: 'Pakistan (Lahore, Islamabad)',
    language: 'English & Urdu',
    offerTitle: 'Early-Bird Switzerland & Italy 10-Day Grand Alps Tour',
    offerDescription: 'All-inclusive European holiday with 4-star boutique hotels, Schengen visa dossier support, Swiss Travel Rail Pass, and direct flights.',
    validFromDate: new Date().toISOString().split('T')[0],
    validUntilDate: '2026-12-31',
    verifiedPrice: 495000,
    currency: 'PKR',
    termsAndConditions: 'Price per person on twin-sharing. Includes verified hotel vouchers and embassy visa document checklist. Non-refundable airline seat deposit applies.',
    landingPage: 'https://skybridgetravelandtourism.com/tour-packages',
    campaignSource: 'Verified Multi-Channel Promotion',
    trackingParameters: 'utm_source=spring_europe&utm_medium=verified_campaign&utm_campaign=skybridge_2026',
    approvalStatus: 'CEO Review',
    channels: ['Website', 'Facebook', 'Instagram', 'WhatsApp Business'],
    notes: 'Consent verification strictly enforced. No unsolicited messaging.'
  });

  const channelsList: MarketingCampaignRecord['channels'][number][] = [
    'Website',
    'Email',
    'WhatsApp Business',
    'Facebook',
    'Instagram',
    'TikTok',
    'YouTube',
    'LinkedIn',
    'Pinterest'
  ];

  const filteredCampaigns = marketingCampaigns.filter(c => {
    return statusFilter === 'all' || c.approvalStatus === statusFilter;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaignForm.campaignName || !newCampaignForm.offerTitle) return;
    addMarketingCampaign(newCampaignForm);
    setIsAddModalOpen(false);
  };

  const handleToggleChannel = (channel: MarketingCampaignRecord['channels'][number]) => {
    setNewCampaignForm(prev => {
      const cur = prev.channels || [];
      return {
        ...prev,
        channels: cur.includes(channel) ? cur.filter(c => c !== channel) : [...cur, channel]
      };
    });
  };

  // KPIs
  const activeCount = marketingCampaigns.filter(c => c.approvalStatus === 'Active' || c.approvalStatus === 'Approved').length;
  const pendingReviewCount = marketingCampaigns.filter(c => c.approvalStatus === 'CEO Review').length;
  const totalEnquiries = marketingCampaigns.reduce((acc, c) => acc + (c.results?.enquiries || 0), 0);
  const totalConversions = marketingCampaigns.reduce((acc, c) => acc + (c.results?.conversions || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B1B3B] via-[#0E2656] to-[#0B1B3B] text-white border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono text-[11px] font-bold tracking-wider uppercase border border-amber-400/30">
                Marketing Module J
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold flex items-center gap-1 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Compliance Protected
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              CAMPAIGN & PROMOTIONAL MESSAGE CENTER
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Organizes authorized promotional campaigns, multi-channel messaging parameters, and transparent pricing. Strict regulatory protections prevent spam, unsolicited bulk WhatsApp broadcasts, and unauthorized outreach.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#4FC3F7] hover:bg-[#38b6f1] text-[#0B1B3B] font-bold text-xs flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Campaign</span>
            </button>
          </div>
        </div>

        {/* Strict Compliance Standards */}
        <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300 text-[11px]">
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-400 shrink-0" />
            <span><strong>No Unsolicited Bulk Messages:</strong> WhatsApp messaging strictly opt-in</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong>Do-Not-Contact Enforced:</strong> Suppressed contacts excluded automatically</span>
          </div>
          <div className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong>CEO Approval Mandatory:</strong> No campaign dispatches without Director signature</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">Approved & Active</div>
          <div className="text-2xl font-black text-emerald-600">{activeCount} Campaigns</div>
          <div className="text-[10px] text-slate-400 mt-1">Multi-channel promotion live</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">CEO Review Queue</div>
          <div className="text-2xl font-black text-amber-600">{pendingReviewCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Awaiting executive sign-off</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-1">Enquiries Generated</div>
          <div className="text-2xl font-black text-indigo-600">{totalEnquiries}</div>
          <div className="text-[10px] text-slate-400 mt-1">Incoming qualified requests</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-cyan-700 uppercase tracking-wider mb-1">Confirmed Conversions</div>
          <div className="text-2xl font-black text-cyan-600">{totalConversions}</div>
          <div className="text-[10px] text-slate-400 mt-1">Completed bookings issued</div>
        </div>
      </div>

      {/* Campaign List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-1">
          <span>Active & Scheduled Promotional Campaigns ({filteredCampaigns.length})</span>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700"
          >
            <option value="all">All Approval States</option>
            <option value="Approved">Approved</option>
            <option value="CEO Review">CEO Review</option>
            <option value="Draft">Draft</option>
            <option value="Paused">Paused</option>
          </select>
        </div>

        {filteredCampaigns.map(camp => {
          const isApproved = camp.approvalStatus === 'Approved' || camp.approvalStatus === 'Active';
          return (
            <div
              key={camp.id}
              className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-slate-400 font-bold">{camp.id}</span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {camp.serviceCategory}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {camp.countryOrRegion} • {camp.language}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {camp.approvalStatus}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0B1B3B]">{camp.campaignName}</h3>
                  <div className="text-xs text-slate-600 font-medium">
                    <strong>Objective:</strong> {camp.campaignObjective}
                  </div>
                </div>

                {/* Price Badge */}
                <div className="text-right sm:text-right shrink-0">
                  <div className="text-lg font-black font-mono text-[#0B1B3B]">
                    {camp.verifiedPrice > 0 ? `${camp.currency} ${camp.verifiedPrice.toLocaleString()}` : 'Custom Corporate Quote'}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Valid: {camp.validFromDate} to {camp.validUntilDate}
                  </div>
                </div>
              </div>

              {/* Offer Details Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                <div>
                  <strong className="text-slate-900">{camp.offerTitle}</strong>
                </div>
                <p className="text-slate-700 leading-relaxed">
                  {camp.offerDescription}
                </p>
                <div className="text-[11px] text-slate-500">
                  <strong>Terms & Conditions:</strong> {camp.termsAndConditions}
                </div>
              </div>

              {/* Channels & Tracking */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-slate-500 font-semibold text-[11px]">Authorized Channels:</span>
                  {camp.channels.map((ch, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-700 border border-slate-200">
                      {ch}
                    </span>
                  ))}
                </div>

                {camp.results && (
                  <div className="flex items-center gap-3 font-mono text-[11px] text-slate-600">
                    <span>Clicks: <strong>{camp.results.clicks || 0}</strong></span>
                    <span>Enquiries: <strong className="text-indigo-600">{camp.results.enquiries || 0}</strong></span>
                    <span>Bookings: <strong className="text-emerald-600">{camp.results.conversions || 0}</strong></span>
                  </div>
                )}
              </div>

              {/* Bottom Actions */}
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="text-[11px] text-slate-400 font-mono">
                  Landing: {camp.landingPage}
                </div>

                <div className="flex items-center gap-2">
                  {camp.approvalStatus !== 'Approved' && (
                    <button
                      onClick={() => updateCampaignStatus(camp.id, 'Approved')}
                      className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
                    >
                      CEO Approve
                    </button>
                  )}
                  {camp.approvalStatus === 'Approved' && (
                    <button
                      onClick={() => updateCampaignStatus(camp.id, 'Paused')}
                      className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                    >
                      Pause
                    </button>
                  )}
                  {camp.approvalStatus === 'Paused' && (
                    <button
                      onClick={() => updateCampaignStatus(camp.id, 'Approved')}
                      className="px-2.5 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-semibold cursor-pointer"
                    >
                      Resume
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* MODAL: CREATE CAMPAIGN */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#0B1B3B]">Create Promotional Campaign</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Campaign Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter 2026 Umrah High Season"
                  value={newCampaignForm.campaignName || ''}
                  onChange={e => setNewCampaignForm(prev => ({ ...prev, campaignName: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Service Category</label>
                  <input
                    type="text"
                    value={newCampaignForm.serviceCategory || ''}
                    onChange={e => setNewCampaignForm(prev => ({ ...prev, serviceCategory: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Target Region</label>
                  <input
                    type="text"
                    value={newCampaignForm.countryOrRegion || ''}
                    onChange={e => setNewCampaignForm(prev => ({ ...prev, countryOrRegion: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Offer Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5-Star Clock Tower Makkah Family Package"
                  value={newCampaignForm.offerTitle || ''}
                  onChange={e => setNewCampaignForm(prev => ({ ...prev, offerTitle: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Offer Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Detailed description of package inclusions, flights, and accommodations..."
                  value={newCampaignForm.offerDescription || ''}
                  onChange={e => setNewCampaignForm(prev => ({ ...prev, offerDescription: e.target.value }))}
                  className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Verified Price (PKR)</label>
                  <input
                    type="number"
                    value={newCampaignForm.verifiedPrice || 0}
                    onChange={e => setNewCampaignForm(prev => ({ ...prev, verifiedPrice: parseInt(e.target.value, 10) || 0 }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Landing Page URL</label>
                  <input
                    type="text"
                    value={newCampaignForm.landingPage || ''}
                    onChange={e => setNewCampaignForm(prev => ({ ...prev, landingPage: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Channels checkboxes */}
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-700">Target Channels</label>
                <div className="grid grid-cols-3 gap-2">
                  {channelsList.map(ch => {
                    const isChecked = (newCampaignForm.channels || []).includes(ch);
                    return (
                      <label key={ch} className="flex items-center gap-1.5 p-2 rounded-lg bg-slate-50 border border-slate-200 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handleToggleChannel(ch)}
                          className="rounded text-[#0B1B3B]"
                        />
                        <span className="text-[11px] text-slate-700">{ch}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Terms & Conditions</label>
                <input
                  type="text"
                  value={newCampaignForm.termsAndConditions || ''}
                  onChange={e => setNewCampaignForm(prev => ({ ...prev, termsAndConditions: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1B3B] text-white font-bold hover:bg-slate-800"
                >
                  Submit Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
