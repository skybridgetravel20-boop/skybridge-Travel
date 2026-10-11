import React, { useState } from 'react';
import {
  FolderOpen,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  ShieldAlert,
  FileText,
  Lock,
  PlusCircle,
  Eye,
  Calendar,
  Layers,
  FileCheck,
  Building,
  Key
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { DocumentRegisterRecord } from '../../types';

export const AdminDocumentRegisterPage: React.FC = () => {
  const { documentRegister, addDocumentRegisterRecord } = useCrm();

  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [classificationFilter, setClassificationFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state
  const [docName, setDocName] = useState('');
  const [docCategory, setDocCategory] = useState<DocumentRegisterRecord['documentCategory']>('Supplier Agreement');
  const [docUrl, setDocUrl] = useState('');
  const [docOwner, setDocOwner] = useState('Director Urwa Ali');
  const [docClassification, setDocClassification] = useState<DocumentRegisterRecord['accessClassification']>('Confidential');
  const [docExpiry, setDocExpiry] = useState('');
  const [docNotes, setDocNotes] = useState('');

  const filteredDocs = documentRegister.filter(item => {
    if (categoryFilter !== 'All' && item.documentCategory !== categoryFilter) return false;
    if (classificationFilter !== 'All' && item.accessClassification !== classificationFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        item.documentName.toLowerCase().includes(q) ||
        item.documentCategory.toLowerCase().includes(q) ||
        item.notes.toLowerCase().includes(q);
      if (!match) return false;
    }
    return true;
  });

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim() || !docUrl.trim()) return;

    addDocumentRegisterRecord({
      documentName: docName.trim(),
      documentCategory: docCategory,
      driveFileUrl: docUrl.trim(),
      documentOwner: docOwner.trim(),
      accessClassification: docClassification,
      expiryDate: docExpiry || undefined,
      notes: docNotes.trim()
    });

    setShowAddModal(false);
    setDocName('');
    setDocUrl('');
    setDocExpiry('');
    setDocNotes('');
  };

  const categories = Array.from(new Set(documentRegister.map(d => d.documentCategory))).filter(Boolean);

  const getClassificationBadge = (cls: DocumentRegisterRecord['accessClassification']) => {
    switch (cls) {
      case 'Restricted (CEO & Ops Only)':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <Lock className="w-3 h-3 text-rose-600" /> Restricted (CEO / Ops)
          </span>
        );
      case 'Confidential':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Key className="w-3 h-3 text-amber-600" /> Confidential
          </span>
        );
      case 'Internal Team':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-200">
            Internal Staff
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Public Documentation
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-50 text-indigo-700 border border-indigo-200">
              SECTION 23 • GOOGLE DRIVE REGISTER
            </span>
            <span className="text-xs text-slate-500 font-medium">14 Operational Folders</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <FolderOpen className="w-7 h-7 text-indigo-600" />
            Google Drive Document Register
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Central registry of company registration licenses, DTS operating permits, B2B supplier agreements, consular gazettes, and customer files.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-sm shadow-indigo-600/20 transition-all self-start sm:self-center"
        >
          <PlusCircle className="w-4 h-4" />
          Register New Document
        </button>
      </div>

      {/* Suggested Drive Folder Structure Box */}
      <div className="bg-slate-900 text-slate-100 p-5 rounded-2xl border border-slate-800 space-y-3">
        <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400">
          <span>Drive Folder Hierarchy Architecture</span>
          <span className="text-indigo-400">Least-Privilege Encryption</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 text-[11px] font-mono">
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">01 COMPANY DOCS</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">02 SUPPLIERS</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">03 FLIGHTS</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">04 UMRAH</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">05 VISA OPS</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">06 MANPOWER</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">07 SCHOLARSHIPS</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">08 CUSTOMERS</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">09 BOOKINGS</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">10 INVOICES</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">11 MARKETING</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">12 REPORTS</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">13 AI DRAFTS</div>
          <div className="p-2 rounded bg-slate-800/80 border border-slate-700 truncate">14 ARCHIVE</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search document name, category, or notes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Categories</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={classificationFilter}
            onChange={e => setClassificationFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="All">All Classifications</option>
            <option value="Restricted (CEO & Ops Only)">Restricted (CEO & Ops Only)</option>
            <option value="Confidential">Confidential</option>
            <option value="Internal Team">Internal Team</option>
            <option value="Public Documentation">Public Documentation</option>
          </select>
        </div>
      </div>

      {/* Document Grid / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-600 uppercase font-bold text-[10px] tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">Document Details</th>
                <th className="p-4">Category</th>
                <th className="p-4">Classification</th>
                <th className="p-4">Owner & Expiry</th>
                <th className="p-4">Status & Verified</th>
                <th className="p-4 text-right">Drive Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredDocs.map(item => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900 text-sm">{item.documentName}</div>
                    <div className="text-[11px] text-slate-500 mt-1 max-w-md line-clamp-1">{item.notes}</div>
                    <span className="font-mono text-[10px] text-slate-400 mt-0.5 block">{item.id}</span>
                  </td>

                  <td className="p-4">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700">
                      {item.documentCategory}
                    </span>
                  </td>

                  <td className="p-4">{getClassificationBadge(item.accessClassification)}</td>

                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{item.documentOwner}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Expiry: {item.expiryDate || 'Indefinite / Permanent'}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> {item.documentStatus}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5">Checked: {item.lastVerifiedDate}</div>
                  </td>

                  <td className="p-4 text-right">
                    <a
                      href={item.driveFileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200 transition-colors"
                    >
                      <span>Open Drive File</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Document Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto space-y-4 text-xs">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Register Google Drive Document</h2>
                <p className="text-slate-500">Record a company license, supplier contract, or consular gazette.</p>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddDocument} className="space-y-3">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Document Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SECP Company Registration Certificate 2026"
                  value={docName}
                  onChange={e => setDocName(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Category *</label>
                  <select
                    value={docCategory}
                    onChange={e => setDocCategory(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  >
                    <option value="Company Registration">Company Registration</option>
                    <option value="Travel Agency Licence">Travel Agency Licence</option>
                    <option value="NTN">NTN</option>
                    <option value="NOC">NOC</option>
                    <option value="Supplier Agreement">Supplier Agreement</option>
                    <option value="Supplier Rate Sheet">Supplier Rate Sheet</option>
                    <option value="Visa Documents">Visa Documents</option>
                    <option value="Job Documents">Job Documents</option>
                    <option value="Scholarship Documents">Scholarship Documents</option>
                    <option value="Invoice">Invoice</option>
                    <option value="Receipt">Receipt</option>
                    <option value="Marketing Creative">Marketing Creative</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Access Classification *</label>
                  <select
                    value={docClassification}
                    onChange={e => setDocClassification(e.target.value as any)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  >
                    <option value="Restricted (CEO & Ops Only)">Restricted (CEO & Ops Only)</option>
                    <option value="Confidential">Confidential</option>
                    <option value="Internal Team">Internal Team</option>
                    <option value="Public Documentation">Public Documentation</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Google Drive File URL *</label>
                <input
                  type="url"
                  required
                  placeholder="https://drive.google.com/file/d/..."
                  value={docUrl}
                  onChange={e => setDocUrl(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Document Owner</label>
                  <input
                    type="text"
                    value={docOwner}
                    onChange={e => setDocOwner(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Expiry Date (if applicable)</label>
                  <input
                    type="date"
                    value={docExpiry}
                    onChange={e => setDocExpiry(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Internal Notes & Description</label>
                <textarea
                  rows={2}
                  placeholder="File purpose, statutory registration number, or verification details..."
                  value={docNotes}
                  onChange={e => setDocNotes(e.target.value)}
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
                  className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold"
                >
                  Save Document Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
