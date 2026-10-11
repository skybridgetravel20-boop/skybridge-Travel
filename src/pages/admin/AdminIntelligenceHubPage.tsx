import React, { useState } from 'react';
import {
  ShieldAlert,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Bookmark,
  Calendar,
  Building2,
  GraduationCap,
  Briefcase,
  Globe,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  FileCheck,
  PlusCircle,
  FileText,
  XCircle,
  BadgeAlert
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { IntelligenceAnnouncement, AnnouncementCategory, VerificationStatus } from '../../types';

export const AdminIntelligenceHubPage: React.FC = () => {
  const { announcements, addAnnouncement, toggleSaveAnnouncement } = useCrm();

  const [activeTab, setActiveTab] = useState<
    | 'All Announcements'
    | 'Work Permits'
    | 'Overseas Jobs'
    | 'Recruitment Agencies'
    | 'Fully Funded Scholarships'
    | 'Student Admissions'
    | 'Visa and Immigration Updates'
    | 'Travel Industry News'
    | 'Saved Opportunities'
    | 'Expiring Deadlines'
    | 'Rejected or Suspicious Claims'
  >('All Announcements');

  const [search, setSearch] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<IntelligenceAnnouncement | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // Form State for new announcement
  const [newTitle, setNewTitle] = useState('');
  const [newCountry, setNewCountry] = useState('');
  const [newCategory, setNewCategory] = useState<AnnouncementCategory>('Work Permits');
  const [newSummary, setNewSummary] = useState('');
  const [newOfficialSource, setNewOfficialSource] = useState('');
  const [newOfficialUrl, setNewOfficialUrl] = useState('');
  const [newDeadline, setNewDeadline] = useState('');
  const [newVerificationStatus, setNewVerificationStatus] = useState<VerificationStatus>('Verified — Official Source');
  const [newVerificationNotes, setNewVerificationNotes] = useState('');
  const [newSalary, setNewSalary] = useState('');
  const [newSponsorship, setNewSponsorship] = useState<'Confirmed by Official Source' | 'Confirmed by Employer' | 'Reported but Not Independently Verified' | 'Not Confirmed'>('Confirmed by Official Source');

  // Filter Logic
  const filteredAnnouncements = announcements.filter(item => {
    // Tab filter
    if (activeTab === 'Work Permits' && item.category !== 'Work Permits') return false;
    if (activeTab === 'Overseas Jobs' && item.category !== 'Overseas Jobs') return false;
    if (activeTab === 'Recruitment Agencies' && item.category !== 'Recruitment Agencies') return false;
    if (activeTab === 'Fully Funded Scholarships' && item.category !== 'Fully Funded Scholarships') return false;
    if (activeTab === 'Student Admissions' && item.category !== 'Student Admissions') return false;
    if (activeTab === 'Visa and Immigration Updates' && item.category !== 'Visa and Immigration Updates') return false;
    if (activeTab === 'Travel Industry News' && item.category !== 'Travel Industry News') return false;
    if (activeTab === 'Saved Opportunities' && !item.isSaved) return false;
    if (activeTab === 'Expiring Deadlines') {
      if (!item.applicationDeadline) return false;
      const days = Math.ceil((new Date(item.applicationDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      if (days < 0 || days > 45) return false;
    }
    if (activeTab === 'Rejected or Suspicious Claims') {
      if (item.verificationStatus !== 'Suspicious' && item.verificationStatus !== 'Rejected') return false;
    }

    // Country filter
    if (selectedCountry !== 'All' && item.country !== selectedCountry) return false;

    // Status filter
    if (selectedStatus !== 'All' && item.verificationStatus !== selectedStatus) return false;

    // Search filter
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        item.title.toLowerCase().includes(q) ||
        item.country.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        (item.officialSourceName && item.officialSourceName.toLowerCase().includes(q)) ||
        (item.employerOrInstitution && item.employerOrInstitution.toLowerCase().includes(q));
      if (!match) return false;
    }

    return true;
  });

  const allCountries = Array.from(new Set(announcements.map(a => a.country))).filter(Boolean);

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'Verified — Official Source':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified — Official Source
          </span>
        );
      case 'Verified — Multiple Reliable Sources':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" /> Multiple Sources Verified
          </span>
        );
      case 'Partially Verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" /> Partially Verified
          </span>
        );
      case 'Suspicious':
      case 'Rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" /> {status}
          </span>
        );
      case 'Expired':
      case 'Closed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600 border border-slate-200">
            <Clock className="w-3.5 h-3.5 text-slate-400" /> {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-50 text-slate-600 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCountry.trim()) return;

    addAnnouncement({
      title: newTitle.trim(),
      country: newCountry.trim(),
      category: newCategory,
      summary: newSummary.trim(),
      fullDescription: newSummary.trim(),
      officialSourceName: newOfficialSource.trim() || 'Official Gazette / Embassy',
      officialSourceUrl: newOfficialUrl.trim() || 'https://skybridgetravelandtourism.com',
      applicationDeadline: newDeadline || undefined,
      verificationStatus: newVerificationStatus,
      verificationNotes: newVerificationNotes.trim() || 'Recorded under SkyBridge verification protocol',
      salary: newSalary.trim() || undefined,
      visaSponsorshipStatus: newSponsorship,
      recordOwner: 'Director Urwa Ali'
    });

    setShowAddModal(false);
    setNewTitle('');
    setNewCountry('');
    setNewSummary('');
    setNewOfficialSource('');
    setNewOfficialUrl('');
    setNewDeadline('');
    setNewSalary('');
    setNewVerificationNotes('');
  };

  const tabs = [
    { label: 'All Announcements', count: announcements.length },
    { label: 'Work Permits', count: announcements.filter(a => a.category === 'Work Permits').length },
    { label: 'Overseas Jobs', count: announcements.filter(a => a.category === 'Overseas Jobs').length },
    { label: 'Recruitment Agencies', count: announcements.filter(a => a.category === 'Recruitment Agencies').length },
    { label: 'Fully Funded Scholarships', count: announcements.filter(a => a.category === 'Fully Funded Scholarships').length },
    { label: 'Student Admissions', count: announcements.filter(a => a.category === 'Student Admissions').length },
    { label: 'Visa and Immigration Updates', count: announcements.filter(a => a.category === 'Visa and Immigration Updates').length },
    { label: 'Travel Industry News', count: announcements.filter(a => a.category === 'Travel Industry News').length },
    { label: 'Saved Opportunities', count: announcements.filter(a => a.isSaved).length },
    {
      label: 'Expiring Deadlines',
      count: announcements.filter(a => {
        if (!a.applicationDeadline) return false;
        const days = Math.ceil((new Date(a.applicationDeadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
        return days >= 0 && days <= 45;
      }).length
    },
    { label: 'Rejected or Suspicious Claims', count: announcements.filter(a => a.verificationStatus === 'Suspicious' || a.verificationStatus === 'Rejected').length }
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-sky-50 text-sky-700 border border-sky-200">
              SECTION 6 • INTELLIGENCE HUB
            </span>
            <span className="text-xs text-slate-500 font-medium">Authoritative Consular & Overseas Decrees</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <ShieldAlert className="w-7 h-7 text-sky-600" />
            Verified Announcements & Opportunities
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Real-time verified international work permits, bilateral hiring quotas, fully funded scholarships, and consular changes backed by official statutory sources.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-sm shadow-sm shadow-sky-600/20 transition-all self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          Add Verified Announcement
        </button>
      </div>

      {/* 11 Tabs Scrollable Navigation */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {tabs.map(tab => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label as any)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeTab === tab.label
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                  activeTab === tab.label
                    ? 'bg-slate-800 text-slate-200'
                    : 'bg-slate-100 text-slate-500'
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by country, title, official source, or employer..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="All">All Countries</option>
            {allCountries.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500"
          >
            <option value="All">All Verification Statuses</option>
            <option value="Verified — Official Source">Verified — Official Source</option>
            <option value="Verified — Multiple Reliable Sources">Multiple Reliable Sources</option>
            <option value="Partially Verified">Partially Verified</option>
            <option value="Suspicious">Suspicious</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
            <ShieldAlert className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="font-bold text-slate-800 text-lg">No Announcements Matching Criteria</h3>
            <p className="text-sm text-slate-500 max-w-md mx-auto">
              There are currently no records in this view. Try adjusting your filters or search terms.
            </p>
          </div>
        ) : (
          filteredAnnouncements.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 transition-all p-5 shadow-sm space-y-4"
            >
              {/* Header row */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-100">
                      {item.id}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                      {item.country}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{item.category}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">Verified: {item.lastVerifiedDate}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 leading-snug">{item.title}</h3>
                </div>

                <div className="flex items-center gap-2 self-start">
                  {getStatusBadge(item.verificationStatus)}
                  <button
                    onClick={() => toggleSaveAnnouncement(item.id)}
                    className={`p-1.5 rounded-lg border transition-colors ${
                      item.isSaved
                        ? 'bg-amber-50 text-amber-600 border-amber-200'
                        : 'text-slate-400 hover:text-slate-600 border-slate-200 hover:bg-slate-50'
                    }`}
                    title={item.isSaved ? 'Saved in Executive Watchlist' : 'Bookmark in Executive Watchlist'}
                  >
                    <Bookmark className="w-4 h-4 fill-current" />
                  </button>
                </div>
              </div>

              {/* Summary */}
              <p className="text-sm text-slate-600 leading-relaxed">{item.summary}</p>

              {/* Data Grid Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs bg-slate-50/80 p-3.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Official Source</span>
                  <span className="text-slate-800 font-semibold truncate block mt-0.5">{item.officialSourceName}</span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Application Deadline</span>
                  <span className="text-slate-800 font-semibold block mt-0.5">
                    {item.applicationDeadline || 'Continuous / Quota Based'}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Remuneration / Stipend</span>
                  <span className="text-slate-800 font-semibold block mt-0.5">
                    {item.salary || (item.tuitionCoverage ? '100% Tuition Covered' : 'Per Statutory Decree')}
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 font-medium block text-[10px] uppercase">Visa / Work Permit</span>
                  <span className="text-emerald-700 font-semibold block mt-0.5">
                    {item.visaSponsorshipStatus || 'Statutory Path'}
                  </span>
                </div>
              </div>

              {/* Verification Evidence Footnote */}
              {item.verificationNotes && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Evidence & Source Basis:
                  </div>
                  <div className="text-slate-600">{item.verificationNotes}</div>
                </div>
              )}

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
                <div className="text-xs text-slate-500">
                  Record Owner: <strong className="text-slate-700">{item.recordOwner || 'Director Urwa Ali'}</strong>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedAnnouncement(item)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors flex items-center gap-1"
                  >
                    <FileText className="w-3.5 h-3.5 text-slate-500" /> Full Dossier
                  </button>

                  <a
                    href={item.officialSourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-sky-600 hover:bg-sky-700 text-white transition-colors flex items-center gap-1 shadow-sm shadow-sky-600/20"
                  >
                    <span>Official Decree Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Full Dossier Modal */}
      {selectedAnnouncement && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-5">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-sky-600 uppercase">
                  {selectedAnnouncement.id} • {selectedAnnouncement.country}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-0.5">{selectedAnnouncement.title}</h2>
              </div>
              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div>
                <strong className="text-slate-700 block text-xs uppercase mb-1">Full Statutory Description</strong>
                <p className="text-slate-600 bg-slate-50 p-3.5 rounded-xl border border-slate-200/70 whitespace-pre-line leading-relaxed">
                  {selectedAnnouncement.fullDescription || selectedAnnouncement.summary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Eligibility & Requirements</span>
                  <p className="text-xs text-slate-700 mt-1">
                    {selectedAnnouncement.eligibilityRequirements || 'Standard bilateral eligibility.'}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-[10px] font-bold uppercase text-slate-400 block">Benefits & Living Support</span>
                  <p className="text-xs text-slate-700 mt-1">
                    {selectedAnnouncement.benefits || selectedAnnouncement.accommodationInfo || 'As detailed in official gazette.'}
                  </p>
                </div>
              </div>

              {selectedAnnouncement.confidenceExplanation && (
                <div>
                  <strong className="text-slate-700 block text-xs uppercase mb-1">Evidence & Verification Methodology</strong>
                  <div className="text-xs text-slate-600 bg-emerald-50/70 p-3 rounded-xl border border-emerald-200/60">
                    {selectedAnnouncement.confidenceExplanation}
                  </div>
                </div>
              )}

              {selectedAnnouncement.recommendedAction && (
                <div>
                  <strong className="text-slate-700 block text-xs uppercase mb-1">Recommended SkyBridge Action</strong>
                  <div className="text-xs text-slate-700 bg-sky-50/70 p-3 rounded-xl border border-sky-200/60 font-medium">
                    {selectedAnnouncement.recommendedAction}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <a
                href={selectedAnnouncement.officialSourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
              >
                <span>Visit Source URL ({selectedAnnouncement.officialSourceName})</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedAnnouncement(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800"
              >
                Close Dossier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Announcement Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Add Verified Announcement</h2>
                <p className="text-xs text-slate-500">Record a new verified statutory immigration, job, or scholarship update.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-3.5 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Announcement Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Greece Bilateral Seasonal Work Quotas 2026"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Country *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Greece / Italy / Germany"
                    value={newCountry}
                    onChange={e => setNewCountry(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  >
                    <option value="Work Permits">Work Permits</option>
                    <option value="Overseas Jobs">Overseas Jobs</option>
                    <option value="Recruitment Agencies">Recruitment Agencies</option>
                    <option value="Fully Funded Scholarships">Fully Funded Scholarships</option>
                    <option value="Student Admissions">Student Admissions</option>
                    <option value="Visa and Immigration Updates">Visa and Immigration Updates</option>
                    <option value="Travel Industry News">Travel Industry News</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Executive Summary *</label>
                <textarea
                  required
                  rows={2}
                  placeholder="Concise overview of the decree, sectors, quotas, and worker entitlements..."
                  value={newSummary}
                  onChange={e => setNewSummary(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Official Source Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Hellenic Ministry of Migration"
                    value={newOfficialSource}
                    onChange={e => setNewOfficialSource(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Official Decree URL</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={newOfficialUrl}
                    onChange={e => setNewOfficialUrl(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Salary / Stipend</label>
                  <input
                    type="text"
                    placeholder="e.g. €850 - €1,150/month"
                    value={newSalary}
                    onChange={e => setNewSalary(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Application Deadline</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={e => setNewDeadline(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Verification Status *</label>
                <select
                  value={newVerificationStatus}
                  onChange={e => setNewVerificationStatus(e.target.value as any)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
                >
                  <option value="Verified — Official Source">Verified — Official Source</option>
                  <option value="Verified — Multiple Reliable Sources">Multiple Reliable Sources</option>
                  <option value="Partially Verified">Partially Verified</option>
                  <option value="Suspicious">Suspicious</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Verification Notes & Evidence</label>
                <input
                  type="text"
                  placeholder="e.g. Verified against official government gazette issue number..."
                  value={newVerificationNotes}
                  onChange={e => setNewVerificationNotes(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none"
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
                  className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-sm"
                >
                  Save Announcement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
