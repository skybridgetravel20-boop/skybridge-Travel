import React, { useState } from 'react';
import {
  ShieldCheck,
  Search,
  Filter,
  Clock,
  User,
  Database,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';

export const AdminAuditLogsPage: React.FC = () => {
  const { auditLogs } = useCrm();
  const [search, setSearch] = useState('');
  const [recordFilter, setRecordFilter] = useState('All');

  const filteredLogs = auditLogs.filter(log => {
    if (recordFilter !== 'All' && log.recordType !== recordFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        log.action.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q) ||
        log.user.toLowerCase().includes(q) ||
        log.recordId.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const recordTypes = Array.from(new Set(auditLogs.map(l => l.recordType))).filter(Boolean);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
              SECTION 26 • AUDIT TRAIL
            </span>
            <span className="text-xs text-slate-500 font-medium">Immutable Accountability Log</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <ShieldCheck className="w-7 h-7 text-slate-700" />
            Executive Operational Audit Logs
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Complete compliance record of user actions, lead status updates, invoice generation, supplier edits, and export requests.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search audit actions by keyword, user, record ID, or details..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={recordFilter}
            onChange={e => setRecordFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="All">All Record Types</option>
            {recordTypes.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Timestamp & ID</th>
                <th className="p-4">Staff User</th>
                <th className="p-4">Action</th>
                <th className="p-4">Record Type & ID</th>
                <th className="p-4">Audit Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 whitespace-nowrap">
                    <div className="font-mono text-slate-700 font-semibold">
                      {new Date(log.timestamp).toLocaleString()}
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">{log.id}</span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-slate-400" /> {log.user}
                    </div>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
                      {log.action}
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <div className="font-semibold text-slate-700">{log.recordType}</div>
                    <span className="font-mono text-[10px] text-slate-500">{log.recordId}</span>
                  </td>

                  <td className="p-4 text-slate-600 max-w-md">
                    {log.details}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
