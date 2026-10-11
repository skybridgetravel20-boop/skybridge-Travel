import React, { useState } from 'react';
import {
  Share2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plus,
  Copy,
  Check,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  Calendar,
  X,
  Filter,
  Eye,
  Send,
  Video,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Info
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import {
  SocialMediaPostItem,
  SocialPlatform,
  SocialContentApprovalStatus
} from '../../types';

export const AdminSocialMediaGrowthPage: React.FC = () => {
  const {
    socialMediaPosts,
    addSocialMediaPost,
    updateSocialMediaPostStatus
  } = useCrm();

  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Post Form
  const [newPostForm, setNewPostForm] = useState<Partial<SocialMediaPostItem>>({
    platform: 'Instagram',
    postType: 'Standard Post',
    campaignName: 'Winter 2026 Promotion',
    topic: 'Luxury 5-Star Umrah Package Allotments',
    captionOrScript: 'Experience spiritual tranquility with SkyBridge Travel & Tourism. Direct flights from Lahore, 5-star Clock Tower hotels in Makkah, and private GMC transport.\n\nCall/WhatsApp: +92 345 4444167',
    hashtags: ['#Umrah2026', '#SkyBridgeTravel', '#LahoreToMakkah', '#LuxuryUmrah'],
    callToAction: 'Send a direct message or WhatsApp for complete day-by-day hotel itinerary.',
    mediaNote: 'Carousel with Makkah Haram high-res photo & room amenities.',
    targetAudience: 'Families, married couples, and community pilgrims',
    plannedDate: new Date().toISOString().split('T')[0],
    contentStatus: 'CEO Review'
  });

  const platforms: SocialPlatform[] = [
    'Facebook',
    'Instagram',
    'TikTok',
    'YouTube',
    'LinkedIn',
    'Pinterest'
  ];

  const workflowStages: SocialContentApprovalStatus[] = [
    'Draft',
    'CEO Review',
    'Approved',
    'Ready to Publish',
    'Published',
    'Performance Review'
  ];

  // Filtering
  const filteredPosts = socialMediaPosts.filter(post => {
    const matchesSearch =
      post.topic.toLowerCase().includes(search.toLowerCase()) ||
      post.campaignName.toLowerCase().includes(search.toLowerCase()) ||
      post.captionOrScript.toLowerCase().includes(search.toLowerCase()) ||
      post.hashtags.some(h => h.toLowerCase().includes(search.toLowerCase()));

    const matchesPlatform = platformFilter === 'all' || post.platform === platformFilter;
    const matchesStatus = statusFilter === 'all' || post.contentStatus === statusFilter;

    return matchesSearch && matchesPlatform && matchesStatus;
  });

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostForm.topic || !newPostForm.captionOrScript) return;
    addSocialMediaPost(newPostForm);
    setIsAddModalOpen(false);
  };

  // KPIs
  const ceoReviewCount = socialMediaPosts.filter(p => p.contentStatus === 'CEO Review').length;
  const approvedCount = socialMediaPosts.filter(p => p.contentStatus === 'Approved').length;
  const readyPublishCount = socialMediaPosts.filter(p => p.contentStatus === 'Ready to Publish').length;
  const publishedCount = socialMediaPosts.filter(p => p.contentStatus === 'Published').length;

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B1B3B] via-[#0E2656] to-[#0B1B3B] text-white border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-purple-400/20 text-purple-300 font-mono text-[11px] font-bold tracking-wider uppercase border border-purple-400/30">
                Marketing Module E
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold flex items-center gap-1 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                6 Platforms Supported
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              SOCIAL MEDIA GROWTH CENTER
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Multi-platform travel marketing workspace for TikTok video scripts, Instagram Reel captions, LinkedIn B2B articles, YouTube outlines, Facebook posts, and Pinterest boards with mandatory CEO approval gates.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2.5 rounded-xl bg-[#4FC3F7] hover:bg-[#38b6f1] text-[#0B1B3B] font-bold text-xs flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/20 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Create Social Post</span>
            </button>
          </div>
        </div>

        {/* Workflow Pipeline Display */}
        <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-2 text-xs overflow-x-auto pb-1">
          <span className="text-slate-400 uppercase text-[10px] font-bold shrink-0">Approval Pipeline:</span>
          {workflowStages.map((stage, idx) => (
            <React.Fragment key={stage}>
              <span className={`px-2.5 py-1 rounded-lg text-[11px] font-bold shrink-0 ${
                stage === 'Approved' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' :
                stage === 'CEO Review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                'bg-white/5 text-slate-300 border border-white/10'
              }`}>
                {idx + 1}. {stage}
              </span>
              {idx < workflowStages.length - 1 && <span className="text-slate-500">→</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Live KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">Awaiting CEO Review</div>
          <div className="text-2xl font-black text-amber-600">{ceoReviewCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Pending Director approval</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">Approved by CEO</div>
          <div className="text-2xl font-black text-emerald-600">{approvedCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Authorized for scheduling</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-cyan-700 uppercase tracking-wider mb-1">Ready to Publish</div>
          <div className="text-2xl font-black text-cyan-600">{readyPublishCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Copy-ready format</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-600 uppercase tracking-wider mb-1">Published Live</div>
          <div className="text-2xl font-black text-[#0B1B3B]">{publishedCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Across 6 social channels</div>
        </div>
      </div>

      {/* Compliance / Manual Publishing Notice */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed flex items-start gap-2.5">
        <Info className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <strong>Manual Publishing Guidance:</strong> Until Meta Business, TikTok for Business, and LinkedIn Marketing developer apps receive verified OAuth tokens, direct automatic API publishing is disabled. Use the <strong>"Copy Script & Hashtags"</strong> button to publish copy-ready text directly onto official SkyBridge channels.
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between text-xs">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search campaigns, scripts, topics, hashtags..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-3 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={platformFilter}
            onChange={e => setPlatformFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-semibold focus:outline-none"
          >
            <option value="all">All 6 Platforms</option>
            {platforms.map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-semibold focus:outline-none"
          >
            <option value="all">All Approval States</option>
            {workflowStages.map(st => (
              <option key={st} value={st}>{st}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Posts Cards Grid */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-2">
            <Share2 className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No social content found</h3>
            <p className="text-xs text-slate-500">Try adjusting your filters or click "Create Social Post" to draft a new script.</p>
          </div>
        ) : (
          filteredPosts.map(post => {
            const isApproved = post.contentStatus === 'Approved';
            const isCeoReview = post.contentStatus === 'CEO Review';

            return (
              <div
                key={post.id}
                className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3 hover:border-slate-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-400 font-bold">{post.id}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        post.platform === 'TikTok' ? 'bg-black text-white' :
                        post.platform === 'Instagram' ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' :
                        post.platform === 'LinkedIn' ? 'bg-blue-600 text-white' :
                        post.platform === 'YouTube' ? 'bg-red-600 text-white' :
                        post.platform === 'Facebook' ? 'bg-blue-700 text-white' :
                        'bg-rose-600 text-white'
                      }`}>
                        {post.platform}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {post.postType}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        Date: {post.plannedDate}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        isApproved ? 'bg-emerald-100 text-emerald-800' :
                        isCeoReview ? 'bg-amber-100 text-amber-800' :
                        post.contentStatus === 'Published' ? 'bg-blue-100 text-blue-800' :
                        'bg-slate-100 text-slate-700'
                      }`}>
                        Status: {post.contentStatus}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0B1B3B]">{post.topic}</h3>
                    <div className="text-xs text-slate-500 font-medium">Campaign: {post.campaignName}</div>
                  </div>

                  {/* Copy Button */}
                  <button
                    onClick={() => handleCopy(post.id, `${post.captionOrScript}\n\nCall to Action: ${post.callToAction}\n\n${post.hashtags.join(' ')}`)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer self-start sm:self-auto"
                  >
                    {copiedId === post.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === post.id ? 'Copied to Clipboard' : 'Copy Script & Hashtags'}</span>
                  </button>
                </div>

                {/* Script / Caption Box */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-800 whitespace-pre-line font-sans leading-relaxed">
                  {post.captionOrScript}
                </div>

                {/* Hashtags & CTA */}
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {post.hashtags.map((tag, idx) => (
                      <span key={idx} className="text-cyan-700 font-semibold bg-cyan-50 px-2 py-0.5 rounded text-[11px]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="text-slate-600 font-medium text-[11px]">
                    <strong>CTA:</strong> {post.callToAction}
                  </div>
                </div>

                {/* Media Notes & CEO Approval Action Bar */}
                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="text-slate-500 text-[11px]">
                    <strong>Production Note:</strong> {post.mediaNote} • Target: {post.targetAudience}
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {post.contentStatus !== 'Approved' && (
                      <button
                        onClick={() => updateSocialMediaPostStatus(post.id, 'Approved')}
                        className="px-3 py-1 rounded-md bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span>Approve Post</span>
                      </button>
                    )}

                    {post.contentStatus === 'Approved' && (
                      <button
                        onClick={() => updateSocialMediaPostStatus(post.id, 'Published')}
                        className="px-3 py-1 rounded-md bg-[#0B1B3B] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5 text-[#4FC3F7]" />
                        <span>Mark Published</span>
                      </button>
                    )}

                    {post.contentStatus !== 'Draft' && (
                      <button
                        onClick={() => updateSocialMediaPostStatus(post.id, 'Draft', 'Revision requested')}
                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-semibold cursor-pointer"
                      >
                        Request Revision
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL: ADD NEW SOCIAL POST */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#0B1B3B]">Draft New Social Media Content</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Platform *</label>
                  <select
                    value={newPostForm.platform || 'Instagram'}
                    onChange={e => setNewPostForm(prev => ({ ...prev, platform: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  >
                    {platforms.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Post Type</label>
                  <input
                    type="text"
                    value={newPostForm.postType || 'Standard Post'}
                    onChange={e => setNewPostForm(prev => ({ ...prev, postType: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Topic / Core Angle *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 5 Schengen Visa Bank Statement Myths Debunked"
                  value={newPostForm.topic || ''}
                  onChange={e => setNewPostForm(prev => ({ ...prev, topic: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Script / Caption Text *</label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write post caption or video script..."
                  value={newPostForm.captionOrScript || ''}
                  onChange={e => setNewPostForm(prev => ({ ...prev, captionOrScript: e.target.value }))}
                  className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Call to Action (CTA)</label>
                <input
                  type="text"
                  placeholder="e.g. Comment VISA or tap link in bio"
                  value={newPostForm.callToAction || ''}
                  onChange={e => setNewPostForm(prev => ({ ...prev, callToAction: e.target.value }))}
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
                  Submit for CEO Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
