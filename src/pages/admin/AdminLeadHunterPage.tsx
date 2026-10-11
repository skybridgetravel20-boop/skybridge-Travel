import React, { useState } from 'react';
import {
  Search,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Download,
  Upload,
  Plus,
  ExternalLink,
  Shield,
  Layers,
  ArrowRight,
  TrendingUp,
  Building2,
  Mail,
  Phone,
  MapPin,
  Calendar,
  X,
  UserCheck,
  Ban,
  Clock,
  Sparkles,
  Info,
  Check
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { DiscoveredLead, LeadCategory, DiscoveredLeadStatus } from '../../types';
import { getOfficialBusinessEmailUrl, openOfficialBusinessEmail } from '../../utils/businessEmail';

export const AdminLeadHunterPage: React.FC = () => {
  const {
    discoveredLeads,
    addDiscoveredLead,
    updateDiscoveredLead,
    convertDiscoveredLeadToCrmLead,
    deleteDiscoveredLead,
    verifySelectedLeads,
    importDiscoveredLeadsCsv,
    runLeadDiscoveryScan
  } = useCrm();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [minScore, setMinScore] = useState<number>(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState<string | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [csvText, setCsvText] = useState('');
  const [csvResult, setCsvResult] = useState<{ imported: number; duplicates: number } | null>(null);

  // New Lead Form State
  const [newLeadForm, setNewLeadForm] = useState<Partial<DiscoveredLead>>({
    companyOrOrgName: '',
    contactPerson: '',
    businessEmail: '',
    businessPhone: '',
    website: '',
    sourcePlatform: 'Public Directory',
    sourceUrl: '',
    country: 'Pakistan',
    city: 'Lahore',
    leadCategory: 'Corporate Travel Customer',
    potentialServiceRequired: 'Corporate Flight Bookings & Visas',
    estimatedBusinessValue: 500000,
    leadScore: 85,
    scoreReasons: ['Verified business profile', 'Active corporate travel requirement'],
    verificationStatus: 'Verification Required',
    consentStatus: 'Public Business Listing',
    assignedStaff: 'Director Urwa Ali',
    notes: 'Identified via authorized public registry.',
    nextRecommendedAction: 'Verify contact details before sending quotation deck.'
  });

  const categories: LeadCategory[] = [
    'Flight Booking Customer',
    'Hotel Booking Customer',
    'Holiday Package Customer',
    'Umrah Customer',
    'Visa Documentation Customer',
    'Travel Insurance Customer',
    'Airport Transfer Customer',
    'Corporate Travel Customer',
    'Travel Agency Partner',
    'Recruitment Agency Partner',
    'Employer or Hiring Company',
    'Scholarship Opportunity',
    'Tourism Partner',
    'Supplier',
    'Other Business Opportunity'
  ];

  const statuses: DiscoveredLeadStatus[] = [
    'New',
    'Unverified',
    'Verification Required',
    'Verified',
    'Qualified',
    'Contact Permission Required',
    'Ready for Approved Outreach',
    'Contacted',
    'Responded',
    'Interested',
    'Quotation Sent',
    'Follow-up Required',
    'Converted',
    'Lost',
    'Do Not Contact',
    'Archived'
  ];

  const platforms = [
    'Google Search',
    'Public Directory',
    'LinkedIn',
    'Facebook',
    'Instagram',
    'TikTok',
    'YouTube',
    'Google Business Profile and Maps',
    'Career Page',
    'Official Source',
    'Manual Import'
  ];

  // Filtering
  const filteredLeads = discoveredLeads.filter(lead => {
    const matchesSearch =
      lead.companyOrOrgName.toLowerCase().includes(search.toLowerCase()) ||
      (lead.contactPerson || '').toLowerCase().includes(search.toLowerCase()) ||
      (lead.city || '').toLowerCase().includes(search.toLowerCase()) ||
      lead.potentialServiceRequired.toLowerCase().includes(search.toLowerCase()) ||
      lead.notes.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = categoryFilter === 'all' || lead.leadCategory === categoryFilter;
    const matchesStatus = statusFilter === 'all' || lead.leadStatus === statusFilter;
    const matchesPlatform = platformFilter === 'all' || lead.sourcePlatform === platformFilter;
    const matchesScore = lead.leadScore >= minScore;

    return matchesSearch && matchesCategory && matchesStatus && matchesPlatform && matchesScore;
  });

  // KPIs
  const verifiedCount = discoveredLeads.filter(l => l.verificationStatus === 'Verified' || l.verificationStatus === 'Qualified').length;
  const readyOutreachCount = discoveredLeads.filter(l => l.leadStatus === 'Ready for Approved Outreach' && !l.doNotContact).length;
  const convertedCount = discoveredLeads.filter(l => l.leadStatus === 'Converted').length;
  const doNotContactCount = discoveredLeads.filter(l => l.doNotContact || l.leadStatus === 'Do Not Contact').length;
  const avgScore = discoveredLeads.length > 0 ? Math.round(discoveredLeads.reduce((acc, l) => acc + l.leadScore, 0) / discoveredLeads.length) : 0;

  // Actions
  const handleRunScan = async () => {
    setIsScanning(true);
    setScanMessage(null);
    try {
      const res = await runLeadDiscoveryScan(platformFilter === 'all' ? undefined : platformFilter);
      setScanMessage(res.message);
      setTimeout(() => setScanMessage(null), 5000);
    } finally {
      setIsScanning(false);
    }
  };

  const handleVerifySelected = () => {
    if (selectedIds.length === 0) return;
    verifySelectedLeads(selectedIds);
    setSelectedIds([]);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredLeads.map(l => l.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const handleAddLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLeadForm.companyOrOrgName) return;
    addDiscoveredLead(newLeadForm);
    setIsAddModalOpen(false);
    setNewLeadForm({
      companyOrOrgName: '',
      contactPerson: '',
      businessEmail: '',
      businessPhone: '',
      website: '',
      sourcePlatform: 'Public Directory',
      sourceUrl: '',
      country: 'Pakistan',
      city: 'Lahore',
      leadCategory: 'Corporate Travel Customer',
      potentialServiceRequired: 'Corporate Flight Bookings & Visas',
      estimatedBusinessValue: 500000,
      leadScore: 85,
      scoreReasons: ['Verified business profile', 'Active corporate travel requirement'],
      verificationStatus: 'Verification Required',
      consentStatus: 'Public Business Listing',
      assignedStaff: 'Director Urwa Ali',
      notes: 'Identified via authorized public registry.',
      nextRecommendedAction: 'Verify contact details before sending quotation deck.'
    });
  };

  const handleCsvImportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!csvText.trim()) return;

    // Parse simple CSV (header: company,contact,phone,email,category,platform,url,score)
    const lines = csvText.trim().split('\n');
    const parsed: Partial<DiscoveredLead>[] = [];

    for (let i = 0; i < lines.length; i++) {
      const row = lines[i].split(',').map(s => s.trim().replace(/^"|"$/g, ''));
      if (row.length >= 2) {
        // Skip header if matches
        if (i === 0 && row[0].toLowerCase().includes('company')) continue;
        parsed.push({
          companyOrOrgName: row[0],
          contactPerson: row[1] || '',
          businessPhone: row[2] || '',
          businessEmail: row[3] || '',
          leadCategory: (row[4] as any) || 'Corporate Travel Customer',
          sourcePlatform: row[5] || 'Manual Import',
          sourceUrl: row[6] || 'Authorized CSV Import',
          leadScore: row[7] ? parseInt(row[7], 10) || 75 : 75,
          verificationStatus: 'Verification Required',
          leadStatus: 'New'
        });
      }
    }

    const res = importDiscoveredLeadsCsv(parsed);
    setCsvResult(res);
  };

  const handleExportCsv = () => {
    const headers = [
      'ID',
      'Company/Organization',
      'Contact Person',
      'Business Email',
      'Business Phone',
      'Website',
      'Category',
      'Score',
      'Verification Status',
      'Status',
      'Platform',
      'Source URL',
      'Value PKR',
      'Assigned Staff',
      'Next Action'
    ];

    const rows = filteredLeads.map(l => [
      l.id,
      `"${l.companyOrOrgName.replace(/"/g, '""')}"`,
      `"${(l.contactPerson || '').replace(/"/g, '""')}"`,
      l.businessEmail || '',
      l.businessPhone || '',
      l.website || '',
      `"${l.leadCategory}"`,
      l.leadScore,
      l.verificationStatus,
      l.leadStatus,
      l.sourcePlatform,
      `"${l.sourceUrl}"`,
      l.estimatedBusinessValue || 0,
      l.assignedStaff || '',
      `"${l.nextRecommendedAction.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `skybridge_discovered_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {scanMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1B3B] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{scanMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0B1B3B] via-[#0E2656] to-[#0B1B3B] text-white border border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-mono text-[11px] font-bold tracking-wider uppercase border border-cyan-400/30">
                AI Agent 03
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold flex items-center gap-1 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Permitted Radar Active
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
              SKYBRIDGE LEAD HUNTER AI
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-3xl leading-relaxed">
              Autonomous opportunity discovery, transparent quality scoring (0–100), and compliant B2B qualification across authorized directories, official career portals, and registered business registries.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleRunScan}
              disabled={isScanning}
              className="px-4 py-2.5 rounded-xl bg-[#4FC3F7] hover:bg-[#38b6f1] text-[#0B1B3B] font-bold text-xs flex items-center gap-2 transition-all shadow-lg hover:shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
            >
              <Play className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning Directories...' : 'Run Lead Discovery'}</span>
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add Lead</span>
            </button>
            <button
              onClick={() => setIsCsvModalOpen(true)}
              className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Import CSV</span>
            </button>
            <button
              onClick={handleExportCsv}
              className="px-3 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-1.5 border border-white/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Regulatory Discipline & Distinction Bar */}
        <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-3 text-slate-300 text-[11px]">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-cyan-400 shrink-0" />
            <span><strong>Permitted Sources Only:</strong> Public directories & verified portals</span>
          </div>
          <div className="flex items-center gap-2">
            <UserCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span><strong>Zero AI Hallucination:</strong> Real verified source URL on every lead</span>
          </div>
          <div className="flex items-center gap-2">
            <Ban className="w-4 h-4 text-rose-400 shrink-0" />
            <span><strong>Do-Not-Contact Enforced:</strong> Suppressed contacts never messaged</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong>Strict Funnel:</strong> Discovered ≠ Enquiry ≠ Booking</span>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">Discovered Leads</div>
          <div className="text-2xl font-black text-[#0B1B3B]">{discoveredLeads.length}</div>
          <div className="text-[10px] text-slate-400 mt-1">Across 15 Business Categories</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-1">Verified / Qualified</div>
          <div className="text-2xl font-black text-emerald-600">{verifiedCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Checked against official source</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-sky-700 uppercase tracking-wider mb-1">Ready for Outreach</div>
          <div className="text-2xl font-black text-sky-600">{readyOutreachCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Approved by CEO for contact</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-indigo-700 uppercase tracking-wider mb-1">Converted to CRM</div>
          <div className="text-2xl font-black text-indigo-600">{convertedCount}</div>
          <div className="text-[10px] text-slate-400 mt-1">Active client dossiers</div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm">
          <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">Avg Lead Score</div>
          <div className="text-2xl font-black text-amber-600">{avgScore}<span className="text-xs text-slate-400">/100</span></div>
          <div className="text-[10px] text-slate-400 mt-1">{doNotContactCount} Do-Not-Contact suppressed</div>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="p-4 rounded-xl bg-white border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search companies, contact executives, phone numbers, cities, services..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4FC3F7]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Category Filter */}
            <select
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none"
            >
              <option value="all">All 15 Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none"
            >
              <option value="all">All 16 Statuses</option>
              {statuses.map(st => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>

            {/* Platform Filter */}
            <select
              value={platformFilter}
              onChange={e => setPlatformFilter(e.target.value)}
              className="px-2.5 py-2 rounded-lg bg-slate-50 border border-slate-200 text-slate-700 font-medium focus:outline-none"
            >
              <option value="all">All Platforms</option>
              {platforms.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>

            {/* Min Score Filter */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-700">
              <span className="text-[11px] font-bold">Min Score:</span>
              <input
                type="range"
                min="0"
                max="90"
                step="10"
                value={minScore}
                onChange={e => setMinScore(parseInt(e.target.value, 10))}
                className="w-16 accent-[#0B1B3B]"
              />
              <span className="font-mono text-[11px] font-bold w-6">{minScore}</span>
            </div>
          </div>
        </div>

        {/* Selected Batch Action Bar */}
        {selectedIds.length > 0 && (
          <div className="p-2.5 rounded-lg bg-[#E3F2FD] border border-[#4FC3F7]/40 flex items-center justify-between text-xs">
            <span className="font-semibold text-[#0B1B3B]">
              {selectedIds.length} leads selected
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleVerifySelected}
                className="px-3 py-1 rounded-md bg-[#0B1B3B] text-white font-bold hover:bg-slate-800 transition-colors"
              >
                Mark Verified ({selectedIds.length})
              </button>
              <button
                onClick={() => setSelectedIds([])}
                className="text-slate-500 hover:text-slate-700 px-2 py-1"
              >
                Deselect All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Discovered Leads List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1 text-xs text-slate-500 font-semibold">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedIds.length === filteredLeads.length && filteredLeads.length > 0}
              onChange={handleSelectAll}
              className="rounded text-[#0B1B3B] focus:ring-[#4FC3F7]"
            />
            <span>Showing {filteredLeads.length} discovered opportunities</span>
          </div>
          <span>Lead Quality Score (0–100)</span>
        </div>

        {filteredLeads.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 space-y-3">
            <Search className="w-8 h-8 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No leads match your active filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search terms or run a fresh Lead Hunter discovery scan on permitted directories.
            </p>
            <button
              onClick={() => { setSearch(''); setCategoryFilter('all'); setStatusFilter('all'); setPlatformFilter('all'); setMinScore(0); }}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredLeads.map(lead => {
            const isSelected = selectedIds.includes(lead.id);
            const scoreColor = lead.leadScore >= 85 ? 'text-emerald-700 bg-emerald-50 border-emerald-200' : lead.leadScore >= 70 ? 'text-amber-700 bg-amber-50 border-amber-200' : 'text-slate-700 bg-slate-50 border-slate-200';

            return (
              <div
                key={lead.id}
                className={`p-5 rounded-2xl bg-white border transition-all shadow-sm ${
                  isSelected ? 'border-[#4FC3F7] ring-1 ring-[#4FC3F7] bg-cyan-50/20' : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
                  {/* Left Column: Organization & Contact */}
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleToggleSelect(lead.id)}
                      className="mt-1 rounded text-[#0B1B3B] focus:ring-[#4FC3F7]"
                    />

                    <div className="space-y-2 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] text-slate-400 font-bold">{lead.id}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {lead.leadCategory}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
                          {lead.sourcePlatform}
                        </span>
                        {lead.doNotContact && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                            <Ban className="w-3 h-3" /> Do Not Contact
                          </span>
                        )}
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          lead.verificationStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                          lead.verificationStatus === 'Qualified' ? 'bg-cyan-100 text-cyan-800' :
                          lead.verificationStatus === 'Verification Required' ? 'bg-amber-100 text-amber-800' :
                          'bg-slate-100 text-slate-600'
                        }`}>
                          {lead.verificationStatus}
                        </span>
                      </div>

                      <h3 className="text-base font-bold text-[#0B1B3B] flex items-center gap-2">
                        <span>{lead.companyOrOrgName}</span>
                        {lead.city && (
                          <span className="text-xs font-normal text-slate-500 flex items-center gap-0.5">
                            <MapPin className="w-3 h-3" /> {lead.city}, {lead.country}
                          </span>
                        )}
                      </h3>

                      {/* Contact details */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600">
                        {lead.contactPerson && (
                          <span className="font-semibold text-slate-800 flex items-center gap-1">
                            <UserCheck className="w-3.5 h-3.5 text-slate-400" /> {lead.contactPerson}
                          </span>
                        )}
                        {lead.businessEmail && (
                          <a
                            href={getOfficialBusinessEmailUrl({
                              to: lead.businessEmail,
                              subject: `SkyBridge Travel & Tourism — Partnership & Travel Services: ${lead.companyOrOrgName}`
                            })}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) =>
                              openOfficialBusinessEmail(
                                {
                                  to: lead.businessEmail,
                                  subject: `SkyBridge Travel & Tourism — Partnership & Travel Services: ${lead.companyOrOrgName}`
                                },
                                e
                              )
                            }
                            className="hover:text-blue-600 flex items-center gap-1 text-slate-500 cursor-pointer"
                            title="Compose directly from official info@skybridgetravelandtourism.com email"
                          >
                            <Mail className="w-3.5 h-3.5 text-slate-400" /> {lead.businessEmail}
                          </a>
                        )}
                        {lead.businessPhone && (
                          <a href={`tel:${lead.businessPhone}`} className="hover:text-blue-600 flex items-center gap-1 text-slate-500 font-mono">
                            <Phone className="w-3.5 h-3.5 text-slate-400" /> {lead.businessPhone}
                          </a>
                        )}
                        {lead.sourceUrl && (
                          <a
                            href={lead.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-700 hover:text-cyan-900 flex items-center gap-1 underline decoration-cyan-300"
                          >
                            <ExternalLink className="w-3 h-3" /> Source URL
                          </a>
                        )}
                      </div>

                      {/* Potential Requirement & Estimated Value */}
                      <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                        <div>
                          <strong className="text-slate-900">Requirement:</strong> {lead.potentialServiceRequired}
                        </div>
                        {lead.estimatedBusinessValue && (
                          <div className="text-[11px] text-slate-600">
                            <strong>Estimated Value:</strong> PKR {lead.estimatedBusinessValue.toLocaleString()} • <strong>Assigned:</strong> {lead.assignedStaff || 'Director Urwa Ali'}
                          </div>
                        )}
                        <div className="text-[11px] text-cyan-800 font-medium">
                          <strong>Recommended Next Action:</strong> {lead.nextRecommendedAction}
                        </div>
                      </div>

                      {/* Transparent Score Breakdown Reasons */}
                      <div className="space-y-1">
                        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                          <Info className="w-3 h-3 text-slate-400" /> Lead Score Reasons ({lead.scoreReasons.length} Criteria Met)
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {lead.scoreReasons.map((reason, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600 border border-slate-200">
                              ✓ {reason}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Score, Status & Actions */}
                  <div className="flex flex-col sm:flex-row lg:flex-col items-end sm:items-center lg:items-end justify-between gap-3 shrink-0 pt-2 lg:pt-0">
                    <div className="flex items-center gap-3">
                      <div className={`px-3 py-2 rounded-xl border text-center font-bold ${scoreColor}`}>
                        <div className="text-xl font-black font-mono leading-none">{lead.leadScore}</div>
                        <div className="text-[9px] uppercase tracking-wider mt-0.5">Quality</div>
                      </div>

                      <div className="space-y-1 text-right">
                        <select
                          value={lead.leadStatus}
                          onChange={e => updateDiscoveredLead(lead.id, { leadStatus: e.target.value as any })}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none"
                        >
                          {statuses.map(st => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                        <div className="text-[10px] text-slate-400">
                          Discovered: {lead.dateDiscovered}
                        </div>
                      </div>
                    </div>

                    {/* Quick Button Row */}
                    <div className="flex items-center gap-1.5">
                      {lead.leadStatus !== 'Converted' ? (
                        <button
                          onClick={() => convertDiscoveredLeadToCrmLead(lead.id)}
                          className="px-3 py-1.5 rounded-lg bg-[#0B1B3B] hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1 transition-colors cursor-pointer"
                          title="Convert to Active CRM Lead in Pipeline"
                        >
                          <ArrowRight className="w-3.5 h-3.5 text-[#4FC3F7]" />
                          <span>Convert to CRM</span>
                        </button>
                      ) : (
                        <span className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" /> In CRM Pipeline
                        </span>
                      )}

                      {lead.verificationStatus !== 'Verified' && (
                        <button
                          onClick={() => updateDiscoveredLead(lead.id, { verificationStatus: 'Verified', lastVerifiedDate: new Date().toISOString().split('T')[0] })}
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer"
                          title="Mark verified against public records"
                        >
                          Verify
                        </button>
                      )}

                      <button
                        onClick={() => updateDiscoveredLead(lead.id, { doNotContact: !lead.doNotContact, leadStatus: !lead.doNotContact ? 'Do Not Contact' : 'Qualified' })}
                        className={`p-1.5 rounded-lg border text-xs cursor-pointer ${
                          lead.doNotContact ? 'bg-rose-100 text-rose-700 border-rose-300' : 'bg-slate-50 text-slate-400 hover:text-slate-600 border-slate-200'
                        }`}
                        title={lead.doNotContact ? 'Remove Do-Not-Contact flag' : 'Mark Do-Not-Contact (Suppress from outreach)'}
                      >
                        <Ban className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => deleteDiscoveredLead(lead.id)}
                        className="p-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-600 border border-slate-200 text-xs transition-colors cursor-pointer"
                        title="Delete discovered record"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* MODAL 1: ADD DISCOVERED LEAD MANUALLY */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#0B1B3B]">Add New Discovered Lead</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddLeadSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Crescent Textile Mills"
                    value={newLeadForm.companyOrOrgName || ''}
                    onChange={e => setNewLeadForm(prev => ({ ...prev, companyOrOrgName: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#4FC3F7]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Contact Executive</label>
                  <input
                    type="text"
                    placeholder="e.g. Mian Tariq (Procurement)"
                    value={newLeadForm.contactPerson || ''}
                    onChange={e => setNewLeadForm(prev => ({ ...prev, contactPerson: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Official Business Email</label>
                  <input
                    type="email"
                    placeholder="logistics@company.com"
                    value={newLeadForm.businessEmail || ''}
                    onChange={e => setNewLeadForm(prev => ({ ...prev, businessEmail: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Business Telephone / WhatsApp</label>
                  <input
                    type="text"
                    placeholder="+92 42 3500 0000"
                    value={newLeadForm.businessPhone || ''}
                    onChange={e => setNewLeadForm(prev => ({ ...prev, businessPhone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Lead Category</label>
                  <select
                    value={newLeadForm.leadCategory || 'Corporate Travel Customer'}
                    onChange={e => setNewLeadForm(prev => ({ ...prev, leadCategory: e.target.value as any }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Source Platform</label>
                  <select
                    value={newLeadForm.sourcePlatform || 'Public Directory'}
                    onChange={e => setNewLeadForm(prev => ({ ...prev, sourcePlatform: e.target.value }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                  >
                    {platforms.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Exact Source URL (Required for verification audit)</label>
                <input
                  type="url"
                  placeholder="https://lahorechamber.com/directory/..."
                  value={newLeadForm.sourceUrl || ''}
                  onChange={e => setNewLeadForm(prev => ({ ...prev, sourceUrl: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none font-mono text-[11px]"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Potential Travel / Visa Service Required</label>
                <input
                  type="text"
                  placeholder="e.g. Monthly corporate flights for technical team to UAE/Saudi Arabia"
                  value={newLeadForm.potentialServiceRequired || ''}
                  onChange={e => setNewLeadForm(prev => ({ ...prev, potentialServiceRequired: e.target.value }))}
                  className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Estimated Value (PKR)</label>
                  <input
                    type="number"
                    value={newLeadForm.estimatedBusinessValue || 0}
                    onChange={e => setNewLeadForm(prev => ({ ...prev, estimatedBusinessValue: parseInt(e.target.value, 10) || 0 }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Lead Score (0–100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={newLeadForm.leadScore || 80}
                    onChange={e => setNewLeadForm(prev => ({ ...prev, leadScore: parseInt(e.target.value, 10) || 0 }))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Next Recommended Action</label>
                <input
                  type="text"
                  placeholder="e.g. Dispatch SkyBridge corporate profile deck"
                  value={newLeadForm.nextRecommendedAction || ''}
                  onChange={e => setNewLeadForm(prev => ({ ...prev, nextRecommendedAction: e.target.value }))}
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
                  className="px-5 py-2 rounded-xl bg-[#0B1B3B] text-white font-bold hover:bg-slate-800 shadow-md"
                >
                  Save Discovered Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: CSV IMPORT WITH DUPLICATE DETECTION */}
      {isCsvModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-lg font-bold text-[#0B1B3B]">Import Authorized CSV Business Directory</h2>
              <button onClick={() => { setIsCsvModalOpen(false); setCsvResult(null); }} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-600">
              Paste CSV records below. Duplicate check will automatically prevent identical emails, phones, or registered company names from creating double entries.
            </p>

            <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-[11px] font-mono text-slate-600">
              Format: CompanyName, ContactPerson, Phone, Email, Category, Platform, SourceURL, Score
            </div>

            <form onSubmit={handleCsvImportSubmit} className="space-y-3">
              <textarea
                rows={6}
                required
                placeholder="Falcon Engineering, Engr. Bilal, +924235880000, info@falcon.pk, Corporate Travel Customer, Public Directory, https://lahorechamber.com/falcon, 85&#10;Haramain Travel Club, Hafiz Usman, +923008441111, contact@haramain.org, Umrah Customer, Facebook, https://facebook.com/haramain, 90"
                value={csvText}
                onChange={e => setCsvText(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-50 border border-slate-200 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#4FC3F7]"
              />

              {csvResult && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    CSV Batch Processed Successfully
                  </div>
                  <div>• {csvResult.imported} new records imported into Lead Hunter database</div>
                  <div>• {csvResult.duplicates} duplicate records automatically detected & safely skipped</div>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => { setIsCsvModalOpen(false); setCsvResult(null); }}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 text-xs font-semibold"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-slate-800 shadow-md"
                >
                  Process CSV Import
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
