import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { CaseStatus } from '../../types';
import {
  Stamp,
  Search,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCheck2,
  Calendar,
  User,
  MapPin,
  ChevronRight
} from 'lucide-react';

export const AdminCasesPage: React.FC = () => {
  const { cases, updateCaseStatus } = useCrm();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');

  const filteredCases = cases.filter(c => {
    if (statusFilter !== 'All' && c.status !== statusFilter) return false;
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.id.toLowerCase().includes(q) ||
      c.customerName.toLowerCase().includes(q) ||
      c.title.toLowerCase().includes(q) ||
      (c.destination && c.destination.toLowerCase().includes(q)) ||
      c.assignedStaff.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">
            Active Travel & Visa Cases
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Track official consular submissions, embassy interview appointments, and clearance milestones.
          </p>
        </div>

        <div className="text-xs font-bold text-slate-500">
          Total Active Cases: <span className="text-[#0B1B3B] font-mono">{cases.length}</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search case ID, client name, destination..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#4FC3F7]"
            />
          </div>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
          >
            <option value="All">All Case Statuses</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Embassy Submitted">Embassy Submitted</option>
            <option value="Approved">Approved</option>
            <option value="Completed">Completed</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Client Name</th>
                <th className="py-3 px-4">Service & Objective</th>
                <th className="py-3 px-4">Destination</th>
                <th className="py-3 px-4">Assigned Specialist</th>
                <th className="py-3 px-4">Submission Date</th>
                <th className="py-3 px-4">Case Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredCases.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    No travel or visa cases currently found.
                  </td>
                </tr>
              ) : (
                filteredCases.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#0B1B3B]">
                      {c.id}
                    </td>
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      {c.customerName}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-900">{c.title}</div>
                      <div className="text-[11px] text-slate-500">{c.service}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-slate-800 font-medium">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.destination || 'Global'}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">
                      {c.assignedStaff}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                      {c.submissionDate || 'Pending Submission'}
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={c.status}
                        onChange={e => updateCaseStatus(c.id, e.target.value as CaseStatus)}
                        className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border focus:outline-none ${
                          c.status === 'Approved' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                          c.status === 'Embassy Submitted' ? 'bg-sky-50 text-sky-800 border-sky-300' :
                          c.status === 'Completed' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                          c.status === 'In Progress' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                          'bg-slate-100 text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Embassy Submitted">Embassy Submitted</option>
                        <option value="Approved">Approved</option>
                        <option value="Completed">Completed</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
