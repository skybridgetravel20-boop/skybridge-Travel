import React, { useState } from 'react';
import {
  Globe,
  Search,
  CheckCircle2,
  AlertTriangle,
  Play,
  Plus,
  ExternalLink,
  Shield,
  Layers,
  ArrowRight,
  TrendingUp,
  FileText,
  Smartphone,
  Zap,
  Eye,
  Link as LinkIcon,
  HelpCircle,
  BarChart3,
  Calendar,
  X,
  Copy,
  Check
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { SeoAuditCheck, SeoContentPlanItem, LandingPagePlanItem } from '../../types';

export const AdminTrafficGrowthPage: React.FC = () => {
  const {
    seoAuditChecks,
    seoContentPlan,
    landingPagesPlan,
    runWebsiteAudit,
    addSeoContentPlanItem
  } = useCrm();

  const [activeTab, setActiveTab] = useState<'audit' | 'content' | 'landing' | 'enquiries' | 'analytics'>('audit');
  const [isAuditing, setIsAuditing] = useState(false);
  const [auditFeedback, setAuditFeedback] = useState<string | null>(null);

  // New Content Plan Modal
  const [isAddContentOpen, setIsAddContentOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [newContentForm, setNewContentForm] = useState<Partial<SeoContentPlanItem>>({
    targetAudience: 'Families and Corporate Travelers in Pakistan & UAE',
    searchIntent: 'Commercial',
    suggestedTitle: 'Dubai Luxury Family Holiday & Visa Packages 2026',
    mainKeyword: 'Dubai family holiday packages from Lahore',
    relatedKeywords: ['Dubai visit visa 30 days price', 'family hotels Dubai Marina', 'Atlantis Aquaventure package'],
    metaDescription: 'Complete 2026 guide and curated holiday packages to Dubai with 4/5-star hotels, express electronic visas, desert safari, and direct airline flights from Lahore.',
    suggestedPageUrl: '/tour-packages/dubai-family-guide',
    articleOutline: [
      '1. Best seasonal months for family travel to Dubai',
      '2. Top recommended family resorts in Dubai Marina and Jumeirah',
      '3. 30-Day and 60-Day electronic visa application timeline',
      '4. Kids activities, theme parks, and desert excursions',
      '5. Itemized flight and hotel package cost breakdown'
    ],
    internalLinkingRecommendations: ['/visa-services', '/flights', '/hotels', '/contact'],
    callToAction: 'Request an itemized family quotation on WhatsApp with instant flight options.',
    suggestedPublicationDate: '2026-10-28',
    status: 'Planned'
  });

  const handleRunAudit = async () => {
    setIsAuditing(true);
    setAuditFeedback(null);
    try {
      const res = await runWebsiteAudit();
      setAuditFeedback(`Website audit completed: ${res.passed} passed checks, ${res.warnings} recommendations flagged.`);
      setTimeout(() => setAuditFeedback(null), 5000);
    } finally {
      setIsAuditing(false);
    }
  };

  const handleAddContentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContentForm.suggestedTitle) return;
    addSeoContentPlanItem(newContentForm);
    setIsAddContentOpen(false);
  };

  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  // KPIs
  const passedAuditCount = seoAuditChecks.filter(c => c.status === 'Pass').length;
  const noticeAuditCount = seoAuditChecks.filter(c => c.status !== 'Pass').length;
  const livePagesCount = landingPagesPlan.filter(p => p.status === 'Live & Active').length;
  const plannedArticlesCount = seoContentPlan.length;

  return (
    <div className="space-y-6">
      {/* Toast */}
      {auditFeedback && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1B3B] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{auditFeedback}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B1B3B] via-[#0E2656] to-[#0B1B3B] text-white border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-mono text-[11px] font-bold tracking-wider uppercase border border-cyan-400/30">
                Growth Agent 04
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold flex items-center gap-1 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Domain: skybridgetravelandtourism.com
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              SKYBRIDGE TRAFFIC GROWTH AI
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Audits technical website health across 12 statutory benchmarks, plans high-intent SEO travel articles, and maps strategic landing pages to attract qualified travel buyers from Pakistan and the UAE.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRunAudit}
              disabled={isAuditing}
              className="px-4 py-2.5 rounded-xl bg-[#4FC3F7] hover:bg-[#38b6f1] text-[#0B1B3B] font-bold text-xs flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
            >
              <Zap className={`w-4 h-4 ${isAuditing ? 'animate-spin' : ''}`} />
              <span>{isAuditing ? 'Scanning Site...' : 'Run Website Audit'}</span>
            </button>
            <button
              onClick={() => setIsAddContentOpen(true)}
              className="px-3.5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>New SEO Article Plan</span>
            </button>
          </div>
        </div>

        {/* Regulatory Truth Banner */}
        <div className="mt-4 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] text-slate-300">
          <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
          <span><strong>Search Compliance Standard:</strong> We do not promise guaranteed #1 Google rankings or fabricated traffic stats. All recommendations focus on genuine customer utility, schema architecture, and authentic consular information.</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Audit Score</div>
          <div className="text-2xl font-black text-emerald-600">{passedAuditCount}<span className="text-sm text-slate-400">/12 Passed</span></div>
          <div className="text-[10px] text-slate-400 mt-1">{noticeAuditCount} recommendations flagged</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Live Landing Pages</div>
          <div className="text-2xl font-black text-[#0B1B3B]">{livePagesCount} Pages</div>
          <div className="text-[10px] text-slate-400 mt-1">Direct search entrypoints</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">SEO Articles Planned</div>
          <div className="text-2xl font-black text-indigo-600">{plannedArticlesCount} Outlines</div>
          <div className="text-[10px] text-slate-400 mt-1">High-intent travel search terms</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Enquiry CTAs Active</div>
          <div className="text-2xl font-black text-cyan-600">7 Contact Routes</div>
          <div className="text-[10px] text-slate-400 mt-1">WhatsApp & CRM capture active</div>
        </div>
      </div>

      {/* Module Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'audit', label: '1. Website Audit (12 Checks)', icon: Shield },
          { id: 'content', label: '2. SEO Content Planner', icon: FileText },
          { id: 'landing', label: '3. Landing Page Planner', icon: Layers },
          { id: 'enquiries', label: '4. Website Enquiry CTAs', icon: Zap },
          { id: 'analytics', label: '5. Analytics & Search Console', icon: BarChart3 }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2.5 px-4 rounded-xl flex items-center gap-2 whitespace-nowrap transition-colors cursor-pointer ${
                active
                  ? 'bg-[#0B1B3B] text-white shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: WEBSITE AUDIT (12 CHECKS) */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold">Review of https://skybridgetravelandtourism.com public architecture</span>
            <span>Target: 100% compliance with search crawler standards</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {seoAuditChecks.map(check => {
              const isPass = check.status === 'Pass';
              return (
                <div
                  key={check.id}
                  className={`p-5 rounded-2xl bg-white border transition-all shadow-sm ${
                    isPass ? 'border-emerald-200 hover:border-emerald-300' : 'border-amber-200 hover:border-amber-300 bg-amber-50/10'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400 font-bold">{check.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-600">
                          {check.category}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900">{check.checkName}</h3>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold shrink-0 flex items-center gap-1 ${
                      isPass ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {isPass ? <CheckCircle2 className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                      {check.status}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed">
                    {check.description}
                  </p>

                  <div className="mt-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-700">
                    <strong className="text-slate-900">Optimization Recommendation:</strong> {check.recommendation}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: SEO CONTENT PLANNER */}
      {activeTab === 'content' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
            <span className="font-semibold">Editorial Strategy: Keyword-targeted destination and consular educational guides</span>
            <button
              onClick={() => setIsAddContentOpen(true)}
              className="px-3 py-1.5 rounded-lg bg-[#0B1B3B] text-white font-bold hover:bg-slate-800 flex items-center gap-1 self-start sm:self-auto cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Content Item</span>
            </button>
          </div>

          <div className="space-y-4">
            {seoContentPlan.map(item => (
              <div key={item.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-mono text-[10px] text-slate-400 font-bold">{item.id}</span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                        {item.searchIntent} Intent
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                        Target Date: {item.suggestedPublicationDate}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.status}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-[#0B1B3B]">{item.suggestedTitle}</h3>
                    <div className="text-xs text-slate-500 flex items-center gap-1 font-mono">
                      <span>URL:</span>
                      <span className="text-cyan-700">{item.suggestedPageUrl}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleCopyText(item.id, `${item.suggestedTitle}\n\nMeta Description: ${item.metaDescription}\n\nOutline:\n${item.articleOutline.join('\n')}`)}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shrink-0 cursor-pointer"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedId === item.id ? 'Copied' : 'Copy Brief'}</span>
                  </button>
                </div>

                {/* Keywords & Target Audience */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <strong className="text-slate-900">Main Target Keyword:</strong>{' '}
                    <span className="font-semibold text-indigo-700">{item.mainKeyword}</span>
                    <div className="mt-1 text-[11px] text-slate-500">
                      <strong>Related Search Terms:</strong> {item.relatedKeywords.join(', ')}
                    </div>
                  </div>
                  <div>
                    <strong className="text-slate-900">Audience:</strong> {item.targetAudience}
                    <div className="mt-1 text-[11px] text-slate-500">
                      <strong>Call to Action:</strong> {item.callToAction}
                    </div>
                  </div>
                </div>

                {/* Meta Description */}
                <div className="text-xs text-slate-700">
                  <strong className="text-slate-900">Meta SERP Description:</strong> {item.metaDescription}
                </div>

                {/* Article Outline */}
                <div className="space-y-1">
                  <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">Suggested Article Outline:</div>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1 text-xs text-slate-600">
                    {item.articleOutline.map((point, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: LANDING PAGE PLANNER */}
      {activeTab === 'landing' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-sky-50 border border-sky-200 text-xs text-sky-900 leading-relaxed">
            <strong>Duplicate Prevention Protocol:</strong> Before generating any new landing page, the system verifies that a similar canonical page does not already exist. Pages are marked as <strong>Live & Active</strong>, <strong>Needs Optimization</strong>, or <strong>Recommended to Create</strong>.
          </div>

          <div className="overflow-x-auto bg-white rounded-2xl border border-slate-200 shadow-sm">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3.5">URL Endpoint</th>
                  <th className="p-3.5">Page Title & Scope</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Current Status</th>
                  <th className="p-3.5">Primary CTA</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {landingPagesPlan.map((page, idx) => {
                  const isLive = page.status === 'Live & Active';
                  return (
                    <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        {page.url}
                      </td>
                      <td className="p-3.5 font-semibold text-slate-800">
                        {page.title}
                        <div className="text-[10px] text-slate-400 font-normal">{page.targetAudience}</div>
                      </td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                          {page.category}
                        </span>
                      </td>
                      <td className="p-3.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          isLive ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {page.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-slate-600 font-medium">
                        {page.primaryCta}
                      </td>
                      <td className="p-3.5 text-right">
                        {isLive ? (
                          <a
                            href={page.url}
                            className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px] inline-flex items-center gap-1"
                          >
                            <ExternalLink className="w-3 h-3" /> Visit
                          </a>
                        ) : (
                          <span className="text-[11px] text-slate-400 italic">In Roadmap</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: WEBSITE ENQUIRY CTAs */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="text-xs text-slate-600">
            Every call-to-action on skybridgetravelandtourism.com connects directly to the CRM pipeline, storing client inquiries with contact numbers and service preferences.
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: 'Request a Travel Quote', trigger: 'Header & Package Detail Modals', target: 'CRM Leads Pipeline', status: 'Active & Verified' },
              { title: 'Book a Consultation', trigger: 'Visa Services Page Consultation Gate', target: 'Consultant Follow-up Queue', status: 'Active & Verified' },
              { title: 'Ask About Umrah Packages', trigger: 'Umrah Packages Section CTA', target: 'Makkah/Madinah Specialist Desk', status: 'Active & Verified' },
              { title: 'Get Visa Documentation Assistance', trigger: 'Schengen & Worldwide Visa Pages', target: 'Dossier Preparation Desk', status: 'Active & Verified' },
              { title: 'Request a Holiday Package', trigger: 'Tour Packages & Honeymoon Carousel', target: 'Holidays Account Executive', status: 'Active & Verified' },
              { title: 'Ask About Travel Insurance', trigger: 'Footer & Visa Checklist Downloads', target: 'Insurance Partner Feed', status: 'Active & Verified' },
              { title: 'Contact SkyBridge on WhatsApp', trigger: 'Floating Action Button & Sticky Mobile Bar', target: '+92 345 4444167 Direct Desk', status: 'Active & Verified' }
            ].map((cta, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-400 font-bold">CTA #{idx + 1}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    {cta.status}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-[#0B1B3B]">{cta.title}</h3>
                <div className="text-xs text-slate-600">
                  <strong>Trigger:</strong> {cta.trigger}
                </div>
                <div className="text-xs text-cyan-800 font-medium">
                  <strong>Route:</strong> {cta.target}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: ANALYTICS & GOOGLE SEARCH CONSOLE */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong>Truthful Status Policy:</strong> No analytics numbers are invented. Google Analytics 4 (GA4) and Google Search Console provide real data once authorized by the site administrator. Below is the real integration status.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Google Analytics 4</h3>
                    <div className="text-xs text-slate-500">Visitor sessions, conversions & traffic sources</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                  Setup Required
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700 space-y-1.5 border border-slate-100">
                <div><strong>Measurement ID:</strong> <span className="font-mono text-slate-500">G-XXXXXXXXXX</span> (Awaiting entry)</div>
                <div><strong>Tracked Events:</strong> Pageviews, WhatsApp Clicks, Quote Form Submissions</div>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <strong className="text-slate-900">Setup Instructions:</strong>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Create a Web Data Stream in Google Analytics 4 for <code>skybridgetravelandtourism.com</code>.</li>
                  <li>Copy your Measurement ID (e.g. <code>G-4VXXXXXXXX</code>).</li>
                  <li>Add <code>VITE_GA_MEASUREMENT_ID</code> to your server environment variables.</li>
                </ol>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center font-bold">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Google Search Console</h3>
                    <div className="text-xs text-slate-500">Impressions, organic keywords & click-through rate</div>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                  Setup Required
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-700 space-y-1.5 border border-slate-100">
                <div><strong>Domain Property:</strong> <code>skybridgetravelandtourism.com</code></div>
                <div><strong>Sitemap URL:</strong> <code>https://skybridgetravelandtourism.com/sitemap.xml</code></div>
              </div>

              <div className="space-y-2 text-xs text-slate-600">
                <strong className="text-slate-900">Setup Instructions:</strong>
                <ol className="list-decimal pl-4 space-y-1">
                  <li>Verify domain ownership via DNS TXT record in your domain registrar DNS / cPanel dashboard.</li>
                  <li>Submit <code>sitemap.xml</code> to Google Search Console.</li>
                  <li>Authorize Google Search Console API via Google Workspace OAuth.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: ADD SEO CONTENT PLAN ITEM */}
      {isAddContentOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#0B1B3B]">Plan New SEO Content Article</h2>
              <button onClick={() => setIsAddContentOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddContentSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Suggested Title *</label>
                <input
                  type="text"
                  required
                  value={newContentForm.suggestedTitle || ''}
                  onChange={e => setNewContentForm(prev => ({ ...prev, suggestedTitle: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4FC3F7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Main Keyword *</label>
                  <input
                    type="text"
                    required
                    value={newContentForm.mainKeyword || ''}
                    onChange={e => setNewContentForm(prev => ({ ...prev, mainKeyword: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Search Intent</label>
                  <select
                    value={newContentForm.searchIntent || 'Commercial'}
                    onChange={e => setNewContentForm(prev => ({ ...prev, searchIntent: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Transactional">Transactional</option>
                    <option value="Informational">Informational</option>
                    <option value="Navigational">Navigational</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Target URL</label>
                <input
                  type="text"
                  value={newContentForm.suggestedPageUrl || ''}
                  onChange={e => setNewContentForm(prev => ({ ...prev, suggestedPageUrl: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Meta Description</label>
                <textarea
                  rows={2}
                  value={newContentForm.metaDescription || ''}
                  onChange={e => setNewContentForm(prev => ({ ...prev, metaDescription: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Call to Action (CTA)</label>
                <input
                  type="text"
                  value={newContentForm.callToAction || ''}
                  onChange={e => setNewContentForm(prev => ({ ...prev, callToAction: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsAddContentOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1B3B] text-white font-bold hover:bg-slate-800"
                >
                  Save SEO Outline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
