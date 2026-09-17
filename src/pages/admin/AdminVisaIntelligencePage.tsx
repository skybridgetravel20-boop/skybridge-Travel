import React, { useState, useEffect } from 'react';
import { useCrm } from '../../context/CrmContext';
import { VisaIntelligenceItem } from '../../types';
import {
  ShieldAlert,
  CheckCircle2,
  XCircle,
  RefreshCw,
  ExternalLink,
  Search,
  Globe,
  Clock,
  ArrowUpRight,
  TrendingUp,
  AlertTriangle,
  FileCheck,
  Building
} from 'lucide-react';

export const AdminVisaIntelligencePage: React.FC = () => {
  const { visaAlerts, approveVisaAlert, rejectVisaAlert, triggerVisaScan, auth } = useCrm();
  const [filterStatus, setFilterStatus] = useState<'All' | 'Detected' | 'Approved' | 'Rejected'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [crawlerStatus, setCrawlerStatus] = useState<any>(null);

  // Fetch backend crawler health
  useEffect(() => {
    fetch('/api/visa-intelligence/status')
      .then(r => r.json())
      .then(d => setCrawlerStatus(d))
      .catch(() => null);
  }, []);

  const handleManualScan = async () => {
    setIsScanning(true);
    await triggerVisaScan();
    setTimeout(() => {
      setIsScanning(false);
    }, 1200);
  };

  const filteredAlerts = visaAlerts.filter(item => {
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const matchesSearch =
      item.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.visaType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sourceAuthority.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = visaAlerts.filter(a => a.status === 'Detected').length;
  const approvedCount = visaAlerts.filter(a => a.status === 'Approved').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">
              Official Visa Intelligence & Review Center
            </h1>
            {pendingCount > 0 && (
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-100 text-rose-800 animate-pulse">
                {pendingCount} Awaiting CEO Approval
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Autonomous daily crawler scanning official government gazettes, foreign ministries, and embassies with Human-in-the-Loop review.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleManualScan}
            disabled={isScanning}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors shadow-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
            <span>{isScanning ? 'Crawling Official Portals...' : 'Trigger Official Scan Now'}</span>
          </button>
        </div>
      </div>

      {/* Backend Crawler Status Banner */}
      <div className="bg-[#0B1B3B] text-white rounded-3xl p-5 shadow-sm border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400">
                Scheduled Crawler Pipeline Active
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Targeting: Federal Foreign Office (Germany), UK Visas & Immigration (UKVI), MFA Turkey, VFS Global.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-slate-300 self-stretch md:self-auto justify-between md:justify-end border-t md:border-t-0 border-white/10 pt-3 md:pt-0">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Schedule</span>
            <span className="font-bold text-white">Daily 04:00 AM UTC</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Human In Loop</span>
            <span className="font-bold text-[#4FC3F7]">Saman (CEO) Required</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Last Executed</span>
            <span className="font-mono text-slate-200">
              {crawlerStatus?.lastRun ? (typeof crawlerStatus.lastRun === 'string' && crawlerStatus.lastRun.includes('T') ? crawlerStatus.lastRun.split('T')[0] : crawlerStatus.lastRun) : 'Today, 04:00 AM'}
            </span>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {(['All', 'Detected', 'Approved', 'Rejected'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setFilterStatus(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterStatus === tab
                  ? 'bg-[#0B1B3B] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab === 'Detected' ? `Pending Review (${pendingCount})` : tab}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search countries, authorities..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
          />
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
            <h3 className="text-base font-bold text-[#0B1B3B]">All Visa Updates Reviewed</h3>
            <p className="text-xs text-slate-500 mt-1">
              No pending intelligence items matching your filter criteria.
            </p>
          </div>
        ) : (
          filteredAlerts.map(item => (
            <div
              key={item.id}
              className={`bg-white rounded-2xl p-5 border transition-all shadow-sm ${
                item.status === 'Detected'
                  ? 'border-rose-300 bg-rose-50/10'
                  : item.status === 'Approved'
                  ? 'border-emerald-200 bg-emerald-50/5'
                  : 'border-slate-200 opacity-60'
              }`}
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Information Block */}
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#0B1B3B] text-white">
                      {item.country}
                    </span>
                    <span className="text-xs font-bold text-[#0288D1]">{item.visaType}</span>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                      <Building className="w-3 h-3 text-slate-400" />
                      {item.sourceAuthority}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.urgency === 'High'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {item.urgency} Urgency
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        item.status === 'Detected'
                          ? 'bg-amber-100 text-amber-800 animate-pulse'
                          : item.status === 'Approved'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0B1B3B]">{item.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.summary}</p>

                  {/* Pricing Comparison Box */}
                  <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
                    <div className="bg-slate-100 px-3 py-1.5 rounded-xl">
                      <span className="text-slate-400 text-[10px] block">Previous Fee</span>
                      <span className="font-mono font-bold text-slate-700">
                        {item.currency} {item.previousFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-slate-400 font-bold">➔</div>
                    <div className="bg-rose-50 border border-rose-200 px-3 py-1.5 rounded-xl">
                      <span className="text-rose-600 text-[10px] font-bold block">New Statutory Fee</span>
                      <span className="font-mono font-bold text-rose-800">
                        {item.currency} {item.newFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-sky-50 border border-sky-100 px-3 py-1.5 rounded-xl">
                      <span className="text-[#0288D1] text-[10px] font-semibold block">Effective Date</span>
                      <span className="font-medium text-slate-800">{item.effectiveDate}</span>
                    </div>
                    {item.sourceUrl && (
                      <a
                        href={item.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-[11px] text-[#0288D1] hover:underline font-semibold"
                      >
                        <span>View Official Publication</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Human-in-the-Loop Decision Buttons */}
                <div className="flex items-center gap-2 shrink-0 self-end lg:self-center pt-2 lg:pt-0">
                  {item.status === 'Detected' ? (
                    <>
                      <button
                        onClick={() => rejectVisaAlert(item.id)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-100 transition-colors"
                      >
                        <XCircle className="w-4 h-4 text-slate-400" />
                        <span>Dismiss</span>
                      </button>
                      <button
                        onClick={() => approveVisaAlert(item.id)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Review & Approve Rate</span>
                      </button>
                    </>
                  ) : item.status === 'Approved' ? (
                    <div className="text-right text-xs">
                      <div className="flex items-center gap-1 text-emerald-700 font-bold">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Approved by {item.approvedBy || 'Saman (CEO)'}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        Active in customer quotations
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-slate-400 font-semibold italic">
                      Rejected by Management
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
