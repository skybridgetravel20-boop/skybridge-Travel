import React from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  FileSpreadsheet,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  DollarSign,
  BarChart3
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
  Cell,
  Legend
} from 'recharts';

export const AdminReportsPage: React.FC = () => {
  const { leads, cases, bookings, payments } = useCrm();

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

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">
          Reports & Commercial Intelligence
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Real mathematical calculations derived strictly from current active database records.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Inquiries Logged</span>
          <div className="text-3xl font-black text-[#0B1B3B]">{totalLeads}</div>
          <div className="text-xs text-slate-500">{inProgress} active in pipeline</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Conversion Win Rate</span>
          <div className="text-3xl font-black text-emerald-600">{conversionRate}%</div>
          <div className="text-xs text-slate-500">{wonCount} closed successfully</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Active Pipeline Volume</span>
          <div className="text-3xl font-black text-[#0B1B3B] font-mono">
            {Number(totalEstimatedValue || 0) > 0 ? `$${Number(totalEstimatedValue).toLocaleString()}` : '$0'}
          </div>
          <div className="text-xs text-slate-500">Unweighted estimated totals</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cleared Revenue (Paid)</span>
          <div className="text-3xl font-black text-emerald-700 font-mono">
            {Number(totalCollectedRevenue || 0) > 0 ? `$${Number(totalCollectedRevenue).toLocaleString()}` : '$0'}
          </div>
          <div className="text-xs text-slate-500">Confirmed transaction payments</div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Service Distribution Chart */}
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

        {/* Acquisition Source Pie */}
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
  );
};
