import React, { useState } from 'react';
import {
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Share2,
  PlusCircle,
  ThumbsUp,
  FileText,
  ShieldCheck,
  Send,
  Video,
  Instagram,
  Facebook,
  Linkedin,
  MessageCircle,
  Twitter,
  Globe,
  Youtube
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { MarketingContentItem } from '../../types';

export const AdminContentCalendarPage: React.FC = () => {
  const { marketingContent, addMarketingContent, updateMarketingContentStatus, announcements } = useCrm();

  const [search, setSearch] = useState('');
  const [platformFilter, setPlatformFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<MarketingContentItem | null>(null);

  // New post state
  const [formDate, setFormDate] = useState(new Date().toISOString().split('T')[0]);
  const [formPlatform, setFormPlatform] = useState<MarketingContentItem['platform']>('Instagram');
  const [formCategory, setFormCategory] = useState('Visa Information');
  const [formCampaign, setFormCampaign] = useState('');
  const [formTopic, setFormTopic] = useState('');
  const [formCaption, setFormCaption] = useState('');
  const [formHashtags, setFormHashtags] = useState('#SkyBridgeTravel #LahoreTravel');
  const [formCta, setFormCta] = useState('Contact WhatsApp +92 345 4444167');
  const [formSource, setFormSource] = useState('');

  const filteredContent = marketingContent.filter(item => {
    if (platformFilter !== 'All' && item.platform !== platformFilter) return false;
    if (statusFilter !== 'All' && item.contentStatus !== statusFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        item.topic.toLowerCase().includes(q) ||
        item.campaignName.toLowerCase().includes(q) ||
        item.caption.toLowerCase().includes(q) ||
        item.contentCategory.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const getPlatformIcon = (platform: MarketingContentItem['platform']) => {
    switch (platform) {
      case 'Instagram':
        return <Instagram className="w-4 h-4 text-pink-600" />;
      case 'Facebook':
        return <Facebook className="w-4 h-4 text-blue-600" />;
      case 'TikTok':
        return <Video className="w-4 h-4 text-slate-900" />;
      case 'LinkedIn':
        return <Linkedin className="w-4 h-4 text-sky-700" />;
      case 'WhatsApp':
        return <MessageCircle className="w-4 h-4 text-emerald-600" />;
      case 'YouTube':
        return <Youtube className="w-4 h-4 text-rose-600" />;
      case 'X':
        return <Twitter className="w-4 h-4 text-slate-800" />;
      default:
        return <Globe className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getStatusBadge = (status: MarketingContentItem['contentStatus']) => {
    switch (status) {
      case 'Approved':
      case 'Published':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {status}
          </span>
        );
      case 'CEO Review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> CEO Review Required
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTopic.trim() || !formCaption.trim()) return;

    addMarketingContent({
      plannedDate: formDate,
      platform: formPlatform,
      contentCategory: formCategory,
      campaignName: formCampaign.trim() || 'General Promotion',
      topic: formTopic.trim(),
      caption: formCaption.trim(),
      hashtags: formHashtags.split(' ').filter(Boolean),
      callToAction: formCta.trim(),
      sourceReference: formSource.trim() || 'SkyBridge verified travel desk',
      contentStatus: 'CEO Review',
      factCheckStatus: 'Verified'
    });

    setShowAddModal(false);
    setFormCampaign('');
    setFormTopic('');
    setFormCaption('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-50 text-purple-700 border border-purple-200">
              SECTION 22 & 30 • MARKETING STUDIO
            </span>
            <span className="text-xs text-slate-500 font-medium">Multi-Channel Compliance Studio</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <Calendar className="w-7 h-7 text-purple-600" />
            Marketing & Content Calendar
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Plan, fact-check, and authorize social media releases across Instagram, TikTok, LinkedIn, Facebook, and WhatsApp with mandatory CEO review.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm shadow-sm shadow-purple-600/20 transition-all self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          Schedule New Post
        </button>
      </div>

      {/* Compliance Standard Banner */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-xs text-amber-900 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-bold">Strict Anti-Misinformation & CEO Approval Gate (Section 30)</strong>
          <p className="text-amber-800 leading-relaxed">
            Content based on immigration decrees, work permits, or scholarships must reference an authentic verified source. Never convert unverified claims into public advertisements. Automatic publishing to social media is prohibited; every item requires explicit CEO authorization.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search campaigns by topic, platform, or hashtags..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={platformFilter}
            onChange={e => setPlatformFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Channels</option>
            <option value="Instagram">Instagram</option>
            <option value="TikTok">TikTok</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Facebook">Facebook</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="YouTube">YouTube</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="All">All Statuses</option>
            <option value="Approved">Approved</option>
            <option value="CEO Review">CEO Review</option>
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>
      </div>

      {/* Grid of Planned Posts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredContent.map(post => (
          <div
            key={post.id}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-purple-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between p-5 space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-xl bg-slate-100 border border-slate-200">
                    {getPlatformIcon(post.platform)}
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-sm block">{post.platform}</span>
                    <span className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                      <Calendar className="w-3 h-3 text-slate-400" /> {post.plannedDate}
                    </span>
                  </div>
                </div>

                <div>{getStatusBadge(post.contentStatus)}</div>
              </div>

              <div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-purple-50 text-purple-700 border border-purple-100">
                  {post.contentCategory}
                </span>
                <h3 className="font-bold text-slate-900 text-sm mt-1 leading-snug">{post.topic}</h3>
                <div className="text-xs text-slate-400 mt-0.5">{post.campaignName}</div>
              </div>

              {/* Caption preview */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 line-clamp-4 leading-relaxed whitespace-pre-line font-sans">
                {post.caption}
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-1 text-[11px] text-purple-600 font-mono">
                {post.hashtags.map((h, i) => (
                  <span key={i}>{h}</span>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedPost(post)}
                className="text-xs font-semibold text-slate-700 hover:text-purple-700 px-2 py-1 rounded hover:bg-slate-100"
              >
                Inspect Copy
              </button>

              <div className="flex items-center gap-1.5">
                {post.contentStatus === 'CEO Review' ? (
                  <button
                    onClick={() => updateMarketingContentStatus(post.id, 'Approved')}
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center gap-1 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>
                ) : (
                  <button
                    onClick={() => updateMarketingContentStatus(post.id, 'CEO Review')}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 text-slate-600 hover:bg-slate-100"
                  >
                    Set Review
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post Detail Drawer / Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                {getPlatformIcon(selectedPost.platform)}
                <div>
                  <h2 className="text-base font-bold text-slate-900">{selectedPost.topic}</h2>
                  <div className="text-slate-500 text-[11px]">{selectedPost.campaignName} • Planned: {selectedPost.plannedDate}</div>
                </div>
              </div>
              <button
                onClick={() => setSelectedPost(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <strong className="text-slate-700 block uppercase text-[10px] mb-1">Full Copy & Caption</strong>
                <div className="p-3.5 rounded-xl bg-slate-50 border text-slate-800 whitespace-pre-line leading-relaxed text-sm">
                  {selectedPost.caption}
                </div>
              </div>

              <div>
                <strong className="text-slate-700 block uppercase text-[10px] mb-1">Call to Action (CTA)</strong>
                <div className="p-2 rounded-lg bg-purple-50 text-purple-900 border border-purple-200 font-semibold">
                  {selectedPost.callToAction}
                </div>
              </div>

              <div>
                <strong className="text-slate-700 block uppercase text-[10px] mb-1">Source Reference Basis</strong>
                <div className="p-2 rounded-lg bg-slate-50 text-slate-600 border">
                  {selectedPost.sourceReference || 'Verified consular filing rules'}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t flex items-center justify-between">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedPost.caption);
                  alert('Post caption copied to clipboard!');
                }}
                className="px-3 py-1.5 rounded-lg border font-semibold text-slate-700 hover:bg-slate-50"
              >
                Copy Caption
              </button>

              <div className="flex items-center gap-2">
                {selectedPost.contentStatus === 'CEO Review' && (
                  <button
                    onClick={() => {
                      updateMarketingContentStatus(selectedPost.id, 'Approved');
                      setSelectedPost(null);
                    }}
                    className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                  >
                    Approve for Scheduling
                  </button>
                )}
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-white font-semibold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Post Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Schedule Marketing Campaign</h2>
                <p className="text-slate-500">Draft compliant post for CEO review.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Release Date *</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={e => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Platform *</label>
                  <select
                    value={formPlatform}
                    onChange={e => setFormPlatform(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  >
                    <option value="Instagram">Instagram</option>
                    <option value="TikTok">TikTok</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Facebook">Facebook</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="YouTube">YouTube</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Campaign Topic *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Winter Umrah 2026 VIP Booking Announcement"
                  value={formTopic}
                  onChange={e => setFormTopic(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Caption / Script *</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Draft caption with authentic facts and official office contact..."
                  value={formCaption}
                  onChange={e => setFormCaption(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Hashtags</label>
                <input
                  type="text"
                  value={formHashtags}
                  onChange={e => setFormHashtags(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none font-mono"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Verification Source Reference</label>
                <input
                  type="text"
                  placeholder="e.g. Official Saudi Ministry of Hajj Nusuk allotments"
                  value={formSource}
                  onChange={e => setFormSource(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                />
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
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold"
                >
                  Submit for Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
