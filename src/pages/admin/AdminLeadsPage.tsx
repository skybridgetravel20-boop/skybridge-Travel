import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCrm } from '../../context/CrmContext';
import { LeadPriority, LeadStatus, ServiceType, Lead } from '../../types';
import { getWhatsAppLink } from '../../data/companyInfo';
import {
  Users,
  Search,
  Filter,
  Plus,
  LayoutGrid,
  List,
  Phone,
  MessageCircle,
  Mail,
  ChevronRight,
  Trash2,
  CheckCircle2,
  Calendar,
  Sparkles
} from 'lucide-react';

export const AdminLeadsPage: React.FC = () => {
  const { leads, deleteLead, updateLeadStatus, createLead } = useCrm();
  const [searchParams, setSearchParams] = useSearchParams();

  const [viewMode, setViewMode] = useState<'table' | 'kanban'>('table');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [priorityFilter, setPriorityFilter] = useState<string>('All');
  const [serviceFilter, setServiceFilter] = useState<string>('All');

  // Quick Add Modal
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: 'Tourist Visa' as ServiceType,
    destination: '',
    priority: 'Medium' as LeadPriority,
    notes: '',
    estimatedValue: 0
  });

  useEffect(() => {
    const urlQuery = searchParams.get('search');
    if (urlQuery !== null) {
      setSearchQuery(urlQuery);
    }
  }, [searchParams]);

  // Filtered Leads
  const filteredLeads = leads.filter(lead => {
    // Search query matching Name, Phone, Email, Destination, ID, Service
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matches =
        lead.id.toLowerCase().includes(q) ||
        lead.fullName.toLowerCase().includes(q) ||
        lead.phone.toLowerCase().includes(q) ||
        (lead.email && lead.email.toLowerCase().includes(q)) ||
        (lead.destination && lead.destination.toLowerCase().includes(q)) ||
        lead.service.toLowerCase().includes(q) ||
        lead.assignedStaff.toLowerCase().includes(q);
      if (!matches) return false;
    }

    if (statusFilter !== 'All' && lead.status !== statusFilter) return false;
    if (priorityFilter !== 'All' && lead.priority !== priorityFilter) return false;
    if (serviceFilter !== 'All' && lead.service !== serviceFilter) return false;

    return true;
  });

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createLead({
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      service: formData.service,
      destination: formData.destination || 'International Travel',
      priority: formData.priority,
      source: 'Direct Contact',
      notes: formData.notes,
      estimatedValue: Number(formData.estimatedValue) || 0
    });
    setAddModalOpen(false);
    setFormData({
      fullName: '',
      phone: '',
      email: '',
      service: 'Tourist Visa',
      destination: '',
      priority: 'Medium',
      notes: '',
      estimatedValue: 0
    });
  };

  const kanbanColumns: LeadStatus[] = [
    'New',
    'Contacted',
    'Qualified',
    'Documents Requested',
    'Quotation Sent',
    'Processing',
    'Won',
    'Lost'
  ];

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">
            Leads & Inquiries Pipeline
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage inquiries, assign consular specialists, and track client documents.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle View Mode */}
          <div className="bg-slate-200/80 p-1 rounded-xl flex items-center gap-1">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                viewMode === 'table' ? 'bg-white text-[#0B1B3B] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                viewMode === 'kanban' ? 'bg-white text-[#0B1B3B] shadow-2xs' : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Kanban Board View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Board</span>
            </button>
          </div>

          <button
            onClick={() => setAddModalOpen(true)}
            className="px-4 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Lead</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search leads, phone, destination..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#4FC3F7]"
            />
          </div>

          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
          >
            <option value="All">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Documents Requested">Documents Requested</option>
            <option value="Documents Received">Documents Received</option>
            <option value="Quotation Sent">Quotation Sent</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Processing">Processing</option>
            <option value="Won">Won</option>
            <option value="Lost">Lost</option>
          </select>

          {/* Priority filter */}
          <select
            value={priorityFilter}
            onChange={e => setPriorityFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
          >
            <option value="All">All Priorities</option>
            <option value="High">High Priority</option>
            <option value="Medium">Medium Priority</option>
            <option value="Low">Low Priority</option>
          </select>

          {/* Service filter */}
          <select
            value={serviceFilter}
            onChange={e => setServiceFilter(e.target.value)}
            className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
          >
            <option value="All">All Services</option>
            <option value="Tourist Visa">Tourist Visa</option>
            <option value="Family Visa">Family Visa</option>
            <option value="Student Visa">Student Visa</option>
            <option value="Flight Booking">Flight Booking</option>
            <option value="Hotel Booking">Hotel Booking</option>
            <option value="Tour Package">Tour Package</option>
            <option value="Honeymoon Package">Honeymoon Package</option>
            <option value="Umrah Package">Umrah Package</option>
          </select>
        </div>

        <div className="text-xs font-bold text-slate-500">
          Showing <span className="text-[#0B1B3B] font-mono">{filteredLeads.length}</span> Inquiries
        </div>
      </div>

      {/* TABLE VIEW */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Lead ID</th>
                  <th className="py-3 px-4">Client Name</th>
                  <th className="py-3 px-4">Phone / WhatsApp</th>
                  <th className="py-3 px-4">Service & Destination</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Assigned To</th>
                  <th className="py-3 px-4">Est. Value</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-slate-400">
                      No leads match the specified criteria.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#0B1B3B]">
                        <Link to={`/admin/leads/${lead.id}`} className="hover:text-[#4FC3F7] hover:underline">
                          {lead.id}
                        </Link>
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {lead.fullName}
                        {lead.isDemo && (
                          <span className="ml-1.5 px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[9px] font-mono font-bold">
                            DEMO
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-1.5">
                          <span>{lead.phone}</span>
                          <a
                            href={getWhatsAppLink(`Hello ${lead.fullName}, regarding your travel inquiry ${lead.id}...`)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 hover:text-emerald-700"
                            title="Chat on WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-slate-900">{lead.service}</div>
                        <div className="text-[11px] text-slate-500">{lead.destination || 'Global'}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-md font-bold text-[10px] ${
                          lead.priority === 'High' ? 'bg-rose-100 text-rose-700' :
                          lead.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {lead.priority}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <select
                          value={lead.status}
                          onChange={e => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                          className="px-2 py-1 text-[11px] font-semibold bg-slate-100 border border-slate-200 rounded-lg focus:outline-none"
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Documents Requested">Docs Requested</option>
                          <option value="Documents Received">Docs Received</option>
                          <option value="Quotation Sent">Quotation Sent</option>
                          <option value="Follow-up">Follow-up</option>
                          <option value="Processing">Processing</option>
                          <option value="Won">Won</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{lead.assignedStaffName || lead.assignedStaff || 'Unassigned'}</td>
                      <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                        {Number(lead.estimatedValue || 0) > 0 ? `$${Number(lead.estimatedValue).toLocaleString()}` : '$0'}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/admin/leads/${lead.id}`}
                            className="px-2.5 py-1 rounded bg-[#0B1B3B] text-white hover:bg-[#4FC3F7] hover:text-[#0B1B3B] font-bold text-[11px] transition-colors"
                          >
                            Details
                          </Link>
                          <button
                            onClick={() => {
                              if (confirm(`Delete inquiry ${lead.id}?`)) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* KANBAN BOARD VIEW */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 overflow-x-auto pb-4">
          {kanbanColumns.map(status => {
            const columnLeads = filteredLeads.filter(l => l.status === status);
            return (
              <div key={status} className="bg-slate-100/90 rounded-2xl p-3 border border-slate-200/80 min-w-[240px] sm:min-w-[200px] flex flex-col max-h-[75vh]">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <span className="text-xs font-bold text-[#0B1B3B] truncate">{status}</span>
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-[#0B1B3B] text-[10px] font-bold flex items-center justify-center font-mono">
                    {columnLeads.length}
                  </span>
                </div>

                <div className="space-y-2.5 overflow-y-auto flex-1 pr-1">
                  {columnLeads.map(lead => (
                    <div key={lead.id} className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs space-y-2 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] font-bold text-[#4FC3F7]">{lead.id}</span>
                        <span className={`px-1.5 py-0.2 rounded font-bold text-[9px] ${
                          lead.priority === 'High' ? 'bg-rose-100 text-rose-700' :
                          lead.priority === 'Medium' ? 'bg-amber-100 text-amber-800' :
                          'bg-emerald-100 text-emerald-800'
                        }`}>
                          {lead.priority}
                        </span>
                      </div>

                      <div className="font-bold text-slate-900 truncate">{lead.fullName}</div>
                      <div className="text-[11px] text-slate-500 truncate">{lead.service}</div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-mono text-[11px] font-semibold text-slate-700">
                          {lead.estimatedValue ? `$${lead.estimatedValue}` : '$0'}
                        </span>
                        <Link
                          to={`/admin/leads/${lead.id}`}
                          className="text-[11px] font-bold text-[#0B1B3B] hover:text-[#4FC3F7] flex items-center gap-0.5"
                        >
                          <span>Open</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Lead Modal */}
      {addModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0B1B3B]">Create Direct Travel Lead</h3>
              <button onClick={() => setAddModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                Cancel
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tariq Mehmood"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+92 300 1234567"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="client@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Type</label>
                  <select
                    value={formData.service}
                    onChange={e => setFormData({ ...formData, service: e.target.value as ServiceType })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  >
                    <option value="Tourist Visa">Tourist Visa Assistance</option>
                    <option value="Family Visa">Family Visa Application</option>
                    <option value="Student Visa">Student Visa File</option>
                    <option value="Flight Booking">Flight Booking</option>
                    <option value="Hotel Booking">Hotel Booking</option>
                    <option value="Tour Package">Tour Package</option>
                    <option value="Honeymoon Package">Honeymoon Package</option>
                    <option value="Umrah Package">Umrah Package</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination</label>
                  <input
                    type="text"
                    placeholder="e.g. France, UK, Saudi Arabia"
                    value={formData.destination}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={e => setFormData({ ...formData, priority: e.target.value as LeadPriority })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  >
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Value ($)</label>
                <input
                  type="number"
                  placeholder="e.g. 1500"
                  value={formData.estimatedValue || ''}
                  onChange={e => setFormData({ ...formData, estimatedValue: Number(e.target.value) })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Specific Requirements</label>
                <textarea
                  rows={3}
                  placeholder="Applicant travel history, family members, target travel dates..."
                  value={formData.notes}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors"
              >
                Save Lead to Pipeline
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
