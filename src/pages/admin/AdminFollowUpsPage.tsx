import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCrm } from '../../context/CrmContext';
import { getWhatsAppLink } from '../../data/companyInfo';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Phone,
  MessageCircle,
  Mail,
  Plus,
  ArrowRight,
  Filter
} from 'lucide-react';

export const AdminFollowUpsPage: React.FC = () => {
  const { followUps, leads, completeFollowUp, scheduleFollowUp } = useCrm();
  const [filterMode, setFilterMode] = useState<'today' | 'pending' | 'completed' | 'all'>('today');
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);

  const [selectedLeadId, setSelectedLeadId] = useState(leads[0]?.id || '');
  const [followUpDate, setFollowUpDate] = useState(new Date().toISOString().split('T')[0]);
  const [followUpType, setFollowUpType] = useState<'Call' | 'WhatsApp' | 'Email' | 'Meeting'>('WhatsApp');
  const [followUpNotes, setFollowUpNotes] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredFollowUps = followUps.filter(f => {
    if (filterMode === 'today') {
      return f.date === todayStr && f.status === 'Scheduled';
    }
    if (filterMode === 'pending') {
      return f.status === 'Scheduled';
    }
    if (filterMode === 'completed') {
      return f.status === 'Completed';
    }
    return true;
  });

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLeadId) {
      scheduleFollowUp(selectedLeadId, followUpDate, followUpType, followUpNotes);
      setScheduleModalOpen(false);
      setFollowUpNotes('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">
            Client Follow-ups & Reminders
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Never lose a lead. Maintain consistent touchpoints with embassy applicants and holiday planners.
          </p>
        </div>

        <button
          onClick={() => setScheduleModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Follow-up</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-2xs flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setFilterMode('today')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterMode === 'today'
              ? 'bg-[#0B1B3B] text-white shadow-2xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          Today's Follow-ups ({followUps.filter(f => f.date === todayStr && f.status === 'Scheduled').length})
        </button>
        <button
          onClick={() => setFilterMode('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterMode === 'pending'
              ? 'bg-[#0B1B3B] text-white shadow-2xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          All Scheduled ({followUps.filter(f => f.status === 'Scheduled').length})
        </button>
        <button
          onClick={() => setFilterMode('completed')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterMode === 'completed'
              ? 'bg-[#0B1B3B] text-white shadow-2xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          Completed ({followUps.filter(f => f.status === 'Completed').length})
        </button>
        <button
          onClick={() => setFilterMode('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            filterMode === 'all'
              ? 'bg-[#0B1B3B] text-white shadow-2xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
          }`}
        >
          All Records ({followUps.length})
        </button>
      </div>

      {/* Follow-ups List */}
      <div className="space-y-3">
        {filteredFollowUps.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-3xl border border-slate-200">
            <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto mb-2" />
            <h3 className="text-sm font-bold text-[#0B1B3B]">No Follow-ups in this View</h3>
            <p className="text-xs text-slate-400 mt-1">All scheduled client calls and messages have been addressed.</p>
          </div>
        ) : (
          filteredFollowUps.map(item => {
            const lead = leads.find(l => l.id === item.leadId);
            return (
              <div
                key={item.id}
                className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  item.status === 'Completed'
                    ? 'bg-slate-50/70 border-slate-200/70 opacity-75'
                    : item.date === todayStr
                    ? 'bg-amber-50/50 border-amber-200'
                    : 'bg-white border-slate-200 shadow-2xs'
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#0B1B3B]">{item.leadName}</span>
                    <span className="font-mono text-[10px] text-slate-400">({item.leadId})</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.type === 'WhatsApp' ? 'bg-emerald-100 text-emerald-800' :
                      item.type === 'Call' ? 'bg-sky-100 text-sky-800' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {item.type}
                    </span>
                    {item.date === todayStr && item.status === 'Scheduled' && (
                      <span className="px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold text-[10px]">
                        DUE TODAY
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 font-medium">
                    {item.notes || 'Routine touchpoint and file status update.'}
                  </p>

                  <div className="text-[11px] text-slate-400 flex items-center gap-3 pt-1">
                    <span>Scheduled for: <strong className="text-slate-700 font-mono">{item.date}</strong></span>
                    <span>•</span>
                    <span>Assigned to: <strong className="text-slate-700">{item.assignedStaff}</strong></span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {lead && (
                    <>
                      <a
                        href={getWhatsAppLink(`Hello ${item.leadName}, this is SkyBridge Travel & Tourism following up on your travel file ${item.leadId}...`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold transition-colors"
                        title="Open WhatsApp Chat"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                      <a
                        href={`tel:${lead.phone.replace(/\s+/g, '')}`}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
                        title="Direct Call"
                      >
                        <Phone className="w-4 h-4 text-[#4FC3F7]" />
                      </a>
                    </>
                  )}

                  {item.status === 'Scheduled' ? (
                    <button
                      onClick={() => completeFollowUp(item.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Mark Complete</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>Done</span>
                    </span>
                  )}

                  <Link
                    to={`/admin/leads/${item.leadId}`}
                    className="p-2 rounded-xl bg-slate-100 hover:bg-[#0B1B3B] hover:text-white text-slate-700 transition-colors"
                    title="View Full Lead Dossier"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Schedule Modal */}
      {scheduleModalOpen && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <h3 className="text-base font-bold text-[#0B1B3B]">Schedule Client Follow-up</h3>
              <button onClick={() => setScheduleModalOpen(false)} className="text-slate-400 hover:text-slate-600 text-xs font-bold">
                Cancel
              </button>
            </div>

            <form onSubmit={handleScheduleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Select Lead *</label>
                <select
                  value={selectedLeadId}
                  onChange={e => setSelectedLeadId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                >
                  {leads.map(l => (
                    <option key={l.id} value={l.id}>
                      {l.id} - {l.fullName} ({l.service})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={followUpDate}
                    onChange={e => setFollowUpDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Channel</label>
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
                <label className="block text-xs font-bold text-slate-700 mb-1">Notes / Agenda</label>
                <textarea
                  rows={2}
                  placeholder="Check if client has received the invitation letter..."
                  value={followUpNotes}
                  onChange={e => setFollowUpNotes(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
              >
                Confirm Follow-up
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
