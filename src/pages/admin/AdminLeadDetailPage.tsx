import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCrm } from '../../context/CrmContext';
import { LeadPriority, LeadStatus, ServiceType } from '../../types';
import { getWhatsAppLink } from '../../data/companyInfo';
import {
  ArrowLeft,
  Phone,
  MessageCircle,
  Mail,
  UserCheck,
  Calendar,
  FileText,
  FileCheck2,
  Clock,
  ShieldCheck,
  Plus,
  CheckCircle2,
  Trash2,
  AlertCircle,
  ExternalLink,
  DollarSign
} from 'lucide-react';

export const AdminLeadDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    leads,
    documents,
    updateLeadStatus,
    updateLead,
    convertToCustomer,
    createFollowUp,
    addDocument,
    auditLogs,
    auth
  } = useCrm();

  const lead = leads.find(l => l.id === id);

  const [noteContent, setNoteContent] = useState('');
  const [docName, setDocName] = useState('');
  const [docType, setDocType] = useState('Passport Scan');

  // Follow-up state
  const [followUpDate, setFollowUpDate] = useState(new Date().toISOString().split('T')[0]);
  const [followUpType, setFollowUpType] = useState<'Call' | 'WhatsApp' | 'Email' | 'Meeting'>('WhatsApp');
  const [followUpNotes, setFollowUpNotes] = useState('');
  const [followUpSuccess, setFollowUpSuccess] = useState(false);

  if (!lead) {
    return (
      <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
        <AlertCircle className="w-12 h-12 text-rose-500 mx-auto mb-3" />
        <h2 className="text-xl font-bold text-[#0B1B3B]">Lead Inquire Not Found</h2>
        <p className="text-xs text-slate-500 mt-1 mb-6">
          The requested record ({id}) may have been deleted or does not exist.
        </p>
        <Link
          to="/admin/leads"
          className="px-5 py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold"
        >
          Back to Leads Pipeline
        </Link>
      </div>
    );
  }

  const leadDocuments = (documents || []).filter(d => d.leadId === lead.id);

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteContent.trim()) {
      const author = auth.user?.name || 'Staff';
      const timestamp = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const newEntry = `[${timestamp} - ${author}]: ${noteContent.trim()}`;
      const updatedNotes = lead.notes ? `${lead.notes}\n\n${newEntry}` : newEntry;
      updateLead(lead.id, { notes: updatedNotes });
      setNoteContent('');
    }
  };

  const handleAddDocument = (e: React.FormEvent) => {
    e.preventDefault();
    if (docName.trim()) {
      addDocument({
        leadId: lead.id,
        customerName: lead.fullName,
        documentName: docName.trim(),
        type: docType,
        status: 'Received'
      });
      setDocName('');
    }
  };

  const handleScheduleFollowUp = (e: React.FormEvent) => {
    e.preventDefault();
    createFollowUp({
      leadId: lead.id,
      customerName: lead.fullName,
      service: lead.service,
      destination: lead.destination,
      date: followUpDate,
      followUpType: followUpType === 'Call' ? 'Phone Call' : followUpType,
      notes: followUpNotes
    });
    setFollowUpSuccess(true);
    setFollowUpNotes('');
    setTimeout(() => setFollowUpSuccess(false), 3000);
  };

  const handleConvert = () => {
    if (confirm(`Convert lead ${lead.fullName} (${lead.id}) into an official Customer record? This will generate a unique Customer ID (CUS-2026-XXXXX) and initialize a linked travel/visa case.`)) {
      const customer = convertToCustomer(lead.id);
      if (customer) {
        alert(`Successfully converted! Customer ID: ${customer.id}.`);
        navigate('/admin/customers');
      }
    }
  };

  // Lead audit logs
  const leadAudit = (auditLogs || []).filter(log => log.recordId === lead.id);

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/leads"
            className="p-2 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-[#0B1B3B] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold text-[#4FC3F7]">{lead.id}</span>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                lead.priority === 'High' ? 'bg-rose-100 text-rose-700' :
                lead.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                'bg-emerald-100 text-emerald-800'
              }`}>
                {lead.priority} Priority
              </span>
              {lead.isDemo && (
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-mono font-bold">
                  DEMO RECORD
                </span>
              )}
            </div>
            <h1 className="text-2xl font-black text-[#0B1B3B] mt-0.5">{lead.fullName}</h1>
          </div>
        </div>

        {/* Action Buttons: Status Changer & Convert Button */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={lead.status}
            onChange={e => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
            className="px-3 py-2 text-xs font-bold bg-white border border-slate-300 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
          >
            <option value="New">Status: New</option>
            <option value="Contacted">Status: Contacted</option>
            <option value="Qualified">Status: Qualified</option>
            <option value="Documents Requested">Status: Docs Requested</option>
            <option value="Documents Received">Status: Docs Received</option>
            <option value="Quotation Sent">Status: Quotation Sent</option>
            <option value="Follow-up">Status: Follow-up</option>
            <option value="Processing">Status: Processing</option>
            <option value="Won">Status: Won</option>
            <option value="Lost">Status: Lost</option>
          </select>

          <button
            onClick={handleConvert}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors shadow-sm flex items-center gap-1.5"
          >
            <UserCheck className="w-4 h-4" />
            <span>Convert to Customer</span>
          </button>
        </div>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Client Details, Quick Touchpoints, Documents */}
        <div className="lg:col-span-7 space-y-6">
          {/* Client Details Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#0B1B3B] border-b border-slate-100 pb-3">
              Travel Inquiry Specifications
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Service Requested</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{lead.service}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Destination</span>
                <span className="font-bold text-slate-900 mt-0.5 block">{lead.destination || 'Not Specified'}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Estimated Pipeline Value</span>
                <span className="font-bold font-mono text-emerald-700 mt-0.5 block">
                  {Number(lead.estimatedValue || 0) > 0 ? `$${Number(lead.estimatedValue).toLocaleString()}` : '$0'}
                </span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Inquiry Date</span>
                <span className="font-semibold text-slate-700 mt-0.5 block">{lead.createdAt}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Acquisition Channel</span>
                <span className="font-semibold text-slate-700 mt-0.5 block">{lead.source}</span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 block uppercase font-bold">Assigned Specialist</span>
                <span className="font-semibold text-[#0B1B3B] mt-0.5 block">{lead.assignedStaffName || lead.assignedStaff || 'Unassigned'}</span>
              </div>
            </div>

            {/* Direct Communication Buttons */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
              <a
                href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-[#4FC3F7]" />
                <span>Call ({lead.phone})</span>
              </a>

              <a
                href={getWhatsAppLink(`Hello ${lead.fullName}, this is SkyBridge Travel & Tourism following up on your travel inquiry ${lead.id} for ${lead.service}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span>Send WhatsApp</span>
              </a>

              {lead.email && (
                <a
                  href={`mailto:${lead.email}?subject=SkyBridge Travel Inquiry: ${lead.id}`}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-500" />
                  <span>Email</span>
                </a>
              )}
            </div>
          </div>

          {/* Document Management Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-[#0B1B3B] flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-[#4FC3F7]" />
                Document Checklist & Verification
              </h3>
              <span className="text-xs text-slate-400">
                {leadDocuments.length} item(s) logged
              </span>
            </div>

            {/* List Documents */}
            <div className="space-y-2">
              {leadDocuments.length === 0 ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No documents have been requested or attached to this file yet.
                </div>
              ) : (
                leadDocuments.map(doc => (
                  <div key={doc.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-[#0B1B3B]">{doc.documentName}</div>
                      <div className="text-[10px] text-slate-500">Type: {doc.type} • Added {doc.uploadDate}</div>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      doc.status === 'Verified' ? 'bg-emerald-100 text-emerald-800' :
                      doc.status === 'Received' ? 'bg-sky-100 text-sky-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Add Document Input */}
            <form onSubmit={handleAddDocument} className="pt-2 flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                required
                placeholder="e.g. 6-Month Bank Statement"
                value={docName}
                onChange={e => setDocName(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
              />
              <select
                value={docType}
                onChange={e => setDocType(e.target.value)}
                className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
              >
                <option value="Passport Scan">Passport Scan</option>
                <option value="Bank Statement">Bank Statement</option>
                <option value="Employment Letter">Employment Letter</option>
                <option value="FRC / Family Certificate">FRC Certificate</option>
                <option value="Other Document">Other Document</option>
              </select>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors shrink-0"
              >
                Add Document
              </button>
            </form>
          </div>

          {/* Internal Notes & Case Log */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#0B1B3B] border-b border-slate-100 pb-3">
              Staff Case Notes & Communications
            </h3>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {!lead.notes ? (
                <div className="py-6 text-center text-xs text-slate-400">
                  No internal notes recorded yet.
                </div>
              ) : (
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs whitespace-pre-wrap leading-relaxed text-slate-700 font-sans">
                  {lead.notes}
                </div>
              )}
            </div>

            <form onSubmit={handleAddNote} className="pt-2 space-y-2">
              <textarea
                rows={2}
                placeholder="Log client call notes, embassy feedback, or price quotes..."
                value={noteContent}
                onChange={e => setNoteContent(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] resize-none"
              ></textarea>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
              >
                Append Note
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Schedule Follow-up & Audit Trail */}
        <div className="lg:col-span-5 space-y-6">
          {/* Schedule Follow-up Widget */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#0B1B3B] flex items-center gap-2 border-b border-slate-100 pb-3">
              <Calendar className="w-4 h-4 text-[#FFB300]" />
              Schedule Follow-up Reminder
            </h3>

            {followUpSuccess && (
              <div className="p-3 bg-emerald-50 text-emerald-700 text-xs rounded-xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Follow-up scheduled successfully.</span>
              </div>
            )}

            <form onSubmit={handleScheduleFollowUp} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={followUpDate}
                    onChange={e => setFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 mb-1">Method</label>
                  <select
                    value={followUpType}
                    onChange={e => setFollowUpType(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Call">Phone Call</option>
                    <option value="Email">Email</option>
                    <option value="Meeting">Meeting</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 mb-1">Reminder Objective</label>
                <input
                  type="text"
                  placeholder="e.g. Check if sponsor letter received"
                  value={followUpNotes}
                  onChange={e => setFollowUpNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors"
              >
                Schedule Follow-up
              </button>
            </form>
          </div>

          {/* Audit History & Activity Log */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-[#0B1B3B] flex items-center gap-2 border-b border-slate-100 pb-3">
              <Clock className="w-4 h-4 text-slate-400" />
              File Audit History & Activity
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1 text-xs">
              {leadAudit.length === 0 ? (
                <div className="text-slate-400 py-4 text-center">No audit activity logged.</div>
              ) : (
                leadAudit.map(log => (
                  <div key={log.id} className="relative pl-5 pb-3 border-l-2 border-slate-200 last:border-none">
                    <div className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-[#4FC3F7]"></div>
                    <div className="font-bold text-[#0B1B3B]">{log.action}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">{log.details}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {log.performedBy} • {log.timestamp}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
