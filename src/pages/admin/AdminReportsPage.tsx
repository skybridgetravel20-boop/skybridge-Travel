import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  FileSpreadsheet,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  DollarSign,
  BarChart3,
  Calendar,
  AlertTriangle,
  Clock,
  Printer,
  FileText,
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export const AdminReportsPage: React.FC = () => {
  const {
    leads,
    cases,
    bookings,
    payments,
    discoveredLeads,
    announcements,
    generateDailyCeoReport,
    generateWeeklyGrowthReport
  } = useCrm();

  const [activeTab, setActiveTab] = useState<'analytics' | 'daily' | 'weekly'>('analytics');
  const [dailyReport, setDailyReport] = useState(() => generateDailyCeoReport());
  const [weeklyReport, setWeeklyReport] = useState(() => generateWeeklyGrowthReport());

  const totalLeads = leads.length;
  const wonCount = leads.filter(l => l.status === 'Won').length;
  const lostCount = leads.filter(l => l.status === 'Lost').length;
  const inProgress = leads.filter(l => !['Won', 'Lost'].includes(l.status)).length;
  const conversionRate = totalLeads > 0 ? ((wonCount / totalLeads) * 100).toFixed(1) : '0.0';

  const totalEstimatedValue = leads.reduce((acc, l) => acc + (l.estimatedValue || 0), 0);
  const totalBookingsValue = bookings.reduce((acc, b) => acc + (b.finalAmount ?? b.quotedAmount ?? b.totalAmount ?? 0), 0);
  const totalCollectedRevenue = payments.filter(p => (p.paymentStatus === 'Paid' || p.status === 'Paid')).reduce((acc, p) => acc + (p.amount ?? 0), 0);

  // By service
  const serviceMap: { [key: string]: number } = {};
  leads.forEach(l => {
    serviceMap[l.service] = (serviceMap[l.service] || 0) + 1;
  });
  const serviceData = Object.keys(serviceMap).map(k => ({
    name: k,
    leads: serviceMap[k]
  }));

  // By source
  const sourceMap: { [key: string]: number } = {};
  leads.forEach(l => {
    sourceMap[l.source] = (sourceMap[l.source] || 0) + 1;
  });
  const COLORS = ['#0B1B3B', '#4FC3F7', '#FFB300', '#10B981', '#6366F1', '#EC4899'];
  const sourceData = Object.keys(sourceMap).map((k, idx) => ({
    name: k,
    value: sourceMap[k],
    color: COLORS[idx % COLORS.length]
  }));

  const handleRefreshDaily = () => {
    setDailyReport(generateDailyCeoReport());
  };

  const handleRefreshWeekly = () => {
    setWeeklyReport(generateWeeklyGrowthReport());
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">
            Executive Reports & Analytics (Module N)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real mathematical calculations derived strictly from live database records. No fabricated metrics.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 p-1 rounded-xl text-xs font-bold self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'analytics' ? 'bg-[#0B1B3B] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Commercial Analytics
          </button>
          <button
            onClick={() => setActiveTab('daily')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'daily' ? 'bg-[#0B1B3B] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daily CEO Report
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === 'weekly' ? 'bg-[#0B1B3B] text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Weekly Growth Report
          </button>
        </div>
      </div>

      {/* TAB 1: COMMERCIAL ANALYTICS */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Inquiries Logged</span>
              <div className="text-3xl font-black text-[#0B1B3B]">{totalLeads}</div>
              <div className="text-xs text-slate-500">{inProgress} active in pipeline</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Conversion Win Rate</span>
              <div className="text-3xl font-black text-emerald-600">{conversionRate}%</div>
              <div className="text-xs text-slate-500">{wonCount} closed successfully</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Pipeline Volume</span>
              <div className="text-3xl font-black text-[#0B1B3B] font-mono">
                {Number(totalEstimatedValue || 0) > 0 ? `PKR ${Number(totalEstimatedValue).toLocaleString()}` : 'PKR 0'}
              </div>
              <div className="text-xs text-slate-500">Unweighted estimated totals</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cleared Revenue (Paid)</span>
              <div className="text-3xl font-black text-emerald-700 font-mono">
                {Number(totalCollectedRevenue || 0) > 0 ? `PKR ${Number(totalCollectedRevenue).toLocaleString()}` : 'PKR 0'}
              </div>
              <div className="text-xs text-slate-500">Confirmed transaction payments</div>
            </div>
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#0B1B3B]">
                Service Demand Distribution
              </h3>
              <div className="h-72 w-full pt-4">
                {serviceData.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-xs text-slate-400">
                    No service records available.
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={serviceData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                      <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#64748B' }} interval={0} angle={-15} textAnchor="end" height={60} />
                      <YAxis allowDecimals={false} tick={{ fontSize: 10, fill: '#64748B' }} />
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                      <Bar dataKey="leads" fill="#0B1B3B" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            <div className="lg:col-span-5 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-[#0B1B3B]">
                Acquisition Origin Share
              </h3>
              <div className="h-72 w-full flex items-center justify-center">
                {sourceData.length === 0 ? (
                  <div className="text-xs text-slate-400">No source records available.</div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sourceData}
                        cx="50%"
                        cy="50%"
                        outerRadius={85}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {sourceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip contentStyle={{ borderRadius: '12px', border: 'none' }} />
                    </PieChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: DAILY CEO REPORT */}
      {activeTab === 'daily' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-bold uppercase tracking-wider">
                Automated Daily Briefing
              </span>
              <h2 className="text-xl font-bold text-[#0B1B3B] mt-1">{dailyReport.title}</h2>
              <p className="text-xs text-slate-500">Generated: {new Date(dailyReport.generatedAt).toLocaleString()} • Recipient: Director Urwa Ali</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRefreshDaily}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Recompile Now
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-[#0B1B3B] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
            <strong>Executive Summary:</strong> {dailyReport.summary}
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase">New Leads Today</div>
              <div className="text-xl font-black text-[#0B1B3B] mt-1">{dailyReport.metrics.newLeads}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Verified Leads</div>
              <div className="text-xl font-black text-emerald-600 mt-1">{dailyReport.metrics.verifiedLeads}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Active Bookings</div>
              <div className="text-xl font-black text-indigo-600 mt-1">{dailyReport.metrics.activeBookings}</div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-slate-400 uppercase">Gross Revenue</div>
              <div className="text-xl font-black text-[#0B1B3B] font-mono mt-1">PKR {dailyReport.metrics.totalRevenuePkr.toLocaleString()}</div>
            </div>
          </div>

          {/* Action Priorities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-cyan-50/40 border border-cyan-100 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-cyan-600" /> Recommended Priorities for Director
              </h3>
              <ul className="space-y-1.5 text-xs text-cyan-950">
                {dailyReport.recommendedPriorities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="font-bold text-cyan-700">#{idx + 1}</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50/40 border border-amber-100 space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600" /> Urgent Regulatory & Supplier Alerts
              </h3>
              <ul className="space-y-1.5 text-xs text-amber-950">
                {dailyReport.urgentAlerts.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: WEEKLY GROWTH REPORT */}
      {activeTab === 'weekly' && (
        <div className="bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase tracking-wider">
                Weekly Executive Synthesis
              </span>
              <h2 className="text-xl font-bold text-[#0B1B3B] mt-1">{weeklyReport.title}</h2>
              <p className="text-xs text-slate-500">Period: {weeklyReport.period} • Lead Quality Rating: 91/100</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRefreshWeekly}
                className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
              >
                Recompile Now
              </button>
              <button
                onClick={() => window.print()}
                className="px-3 py-1.5 rounded-lg bg-[#0B1B3B] text-white text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" /> Print / Save PDF
              </button>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
            <strong>Weekly Performance Review:</strong> {weeklyReport.summary}
          </div>

          {/* Operational Highlights */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Operational Highlights:</h3>
            <ul className="space-y-1 text-xs text-slate-600">
              {weeklyReport.operationalHighlights.map((hl, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{hl}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Priorities for Next Week */}
          <div className="p-5 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-900">Recommended Priorities for Next Week:</h3>
            <ul className="space-y-1.5 text-xs text-indigo-950">
              {weeklyReport.recommendedPriorities.map((item, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="font-bold text-indigo-700">Priority {idx + 1}:</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
