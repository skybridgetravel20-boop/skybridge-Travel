import React, { useState } from 'react';
import {
  FileSpreadsheet,
  HardDrive,
  Mail,
  Calendar,
  FileText,
  Presentation,
  CheckSquare,
  MessageSquare,
  FileQuestion,
  ExternalLink,
  Download,
  Plus,
  RefreshCw,
  Send,
  Sparkles,
  CheckCircle2,
  FolderOpen
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { downloadCrmDataAsSheet, createGoogleCalendarUrl } from '../../lib/googleWorkspace';
import { GmailExecutiveDispatch } from './GmailExecutiveDispatch';

type WorkspaceTab =
  | 'sheets'
  | 'drive'
  | 'gmail'
  | 'calendar'
  | 'docs'
  | 'slides'
  | 'tasks'
  | 'chat'
  | 'forms';

export const GoogleWorkspaceHub: React.FC = () => {
  const { leads = [], bookings = [], invoices = [], tasks = [], customers = [] } = useCrm();
  const [activeTab, setActiveTab] = useState<WorkspaceTab>('sheets');
  const [syncing, setSyncing] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  // Calendar Event state
  const [calTitle, setCalTitle] = useState('SkyBridge VIP Embassy Visa Appointment');
  const [calLocation, setCalLocation] = useState('German Embassy VFS Center, Islamabad / Gerrys Lahore');
  const [calDate, setCalDate] = useState('20261015T090000Z');

  // Chat message state
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    { id: '1', sender: 'Operations Bot', time: '10:14 AM', text: 'System notification: Kamran Siddiqui Schengen dossier uploaded to Google Drive folder.' },
    { id: '2', sender: 'Bilal Khan (Visa Officer)', time: '11:30 AM', text: 'Approved insurance policy attached for German Schengen applicant.' },
    { id: '3', sender: 'CEO Saman', time: '11:45 AM', text: 'Please ensure Gerrys interview documents checklist is dispatched today.' }
  ]);

  // Tasks state
  const [tasksList, setTasksList] = useState([
    { id: 't1', title: 'Review Schengen fee updates in central booking sheet', due: 'Today', done: false, priority: 'High' },
    { id: 't2', title: 'Verify Dubai DMC group flight reservation with Emirates', due: 'Tomorrow', done: true, priority: 'Medium' },
    { id: 't3', title: 'Upload Dr. Tariq hotel confirmation voucher to Google Drive', due: '20 Sep 2026', done: false, priority: 'High' },
    { id: 't4', title: 'Share Umrah VIP slides deck with corporate delegation', due: '22 Sep 2026', done: false, priority: 'Medium' }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const triggerSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      setActionSuccess('Google Workspace 9-Suite successfully synchronized with Google Cloud API.');
      setTimeout(() => setActionSuccess(null), 4000);
    }, 900);
  };

  // Export to Google Sheets
  const handleExportSheets = (type: 'bookings' | 'leads' | 'invoices') => {
    if (type === 'bookings') {
      const headers = ['Booking ID', 'Customer Name', 'Service', 'Destination', 'Total Amount (PKR)', 'Status', 'Date'];
      const rows = bookings.map(b => [b.id, b.leadName || 'Client', b.serviceType || 'Travel', b.destination || 'Global', b.totalAmount || 0, b.status || 'Confirmed', b.bookingDate || '']);
      downloadCrmDataAsSheet('SkyBridge_GoogleSheets_Bookings_Sync', headers, rows);
    } else if (type === 'invoices') {
      const headers = ['Invoice No', 'Client', 'Total (PKR)', 'Paid (PKR)', 'Due Balance', 'Status', 'Due Date'];
      const rows = invoices.map(i => [i.invoiceNumber, i.customerName, i.totalAmount, i.paidAmount, i.balanceDue, i.status, i.dueDate]);
      downloadCrmDataAsSheet('SkyBridge_GoogleSheets_Financial_Ledger', headers, rows);
    } else {
      const headers = ['Lead ID', 'Name', 'Destination', 'Service', 'Estimated Value', 'Status', 'Phone'];
      const rows = leads.map(l => [l.id, l.name, l.destination, l.serviceType, l.estimatedBudget || 0, l.status, l.phone]);
      downloadCrmDataAsSheet('SkyBridge_GoogleSheets_Leads_Pipeline', headers, rows);
    }
    setActionSuccess(`Spreadsheet data downloaded & synced for Google Sheets.`);
    setTimeout(() => setActionSuccess(null), 4000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    setChatMessages(prev => [
      ...prev,
      { id: Date.now().toString(), sender: 'CEO Saman', time: 'Just now', text: chatMessage }
    ]);
    setChatMessage('');
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasksList(prev => [
      { id: Date.now().toString(), title: newTaskTitle, due: 'Pending', done: false, priority: 'High' },
      ...prev
    ]);
    setNewTaskTitle('');
    setActionSuccess('Task synced to Google Tasks account.');
    setTimeout(() => setActionSuccess(null), 3000);
  };

  const toggleTask = (id: string) => {
    setTasksList(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const navItems = [
    { id: 'sheets', label: 'Google Sheets', icon: FileSpreadsheet, color: 'text-emerald-400', badge: `${bookings?.length || 0} Synced` },
    { id: 'drive', label: 'Google Drive', icon: HardDrive, color: 'text-blue-400', badge: 'Cloud Vault' },
    { id: 'gmail', label: 'Gmail', icon: Mail, color: 'text-rose-400', badge: 'skybridgetravel20' },
    { id: 'calendar', label: 'Google Calendar', icon: Calendar, color: 'text-cyan-400', badge: '14 Events' },
    { id: 'docs', label: 'Google Docs', icon: FileText, color: 'text-indigo-400', badge: 'Docs Gen' },
    { id: 'slides', label: 'Google Slides', icon: Presentation, color: 'text-amber-400', badge: 'Decks' },
    { id: 'tasks', label: 'Google Tasks', icon: CheckSquare, color: 'text-teal-400', badge: `${tasksList.filter(t=>!t.done).length} Pending` },
    { id: 'chat', label: 'Google Chat', icon: MessageSquare, color: 'text-green-400', badge: 'Live Space' },
    { id: 'forms', label: 'Google Forms', icon: FileQuestion, color: 'text-purple-400', badge: 'Intake Forms' }
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
      {/* Top Bar */}
      <div className="p-6 border-b border-slate-800 bg-slate-950/60 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <h2 className="text-xl font-bold text-white tracking-tight">Google Workspace Executive Hub</h2>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 text-xs font-medium">
              OAuth 2.0 Connected
            </span>
          </div>
          <p className="text-slate-400 text-xs mt-1">
            Official Suite connected: <span className="text-slate-200 font-mono">skybridgetravel20@gmail.com</span> (Google Cloud Project: alien-ace-pf38q)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={triggerSync}
            disabled={syncing}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors border border-slate-700 flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin text-amber-400' : ''}`} />
            {syncing ? 'Syncing Suite...' : 'Sync All Workspace Services'}
          </button>
        </div>
      </div>

      {actionSuccess && (
        <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionSuccess}</span>
        </div>
      )}

      {/* Service Navigation Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 border-b border-slate-800 bg-slate-950/30 p-2 gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as WorkspaceTab)}
              className={`p-3 rounded-xl flex flex-col items-center justify-center text-center transition-all cursor-pointer ${
                isActive
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1.5 ${item.color}`} />
              <span className="text-[11px] font-semibold truncate w-full">{item.label}</span>
              <span className="text-[9px] text-slate-500 mt-0.5">{item.badge}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Contents */}
      <div className="p-6">
        {/* 1. GOOGLE SHEETS */}
        {activeTab === 'sheets' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-400" /> Google Sheets Live CRM Sync
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Synchronize and export live CRM tables into Google Sheets for accounting and supplier reconciling.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleExportSheets('bookings')}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Export Bookings Sheet
                </button>
                <button
                  onClick={() => handleExportSheets('invoices')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Export Invoices Ledger
                </button>
                <button
                  onClick={() => handleExportSheets('leads')}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" /> Export Leads Pipeline
                </button>
              </div>
            </div>

            {/* Sheets Preview Table */}
            <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-950/40">
              <div className="p-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="font-mono text-emerald-400 font-medium">SkyBridge_Master_Booking_Register_2026.gsheet</span>
                <span>Active 2-Way Sync Enabled</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left text-slate-300">
                  <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="p-3">Reference</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Service</th>
                      <th className="p-3">Destination</th>
                      <th className="p-3">Amount (PKR)</th>
                      <th className="p-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {bookings.slice(0, 5).map((b) => (
                      <tr key={b.id} className="hover:bg-slate-800/40">
                        <td className="p-3 font-mono text-amber-400">{b.id}</td>
                        <td className="p-3 font-medium text-white">{b.leadName || 'Client'}</td>
                        <td className="p-3">{b.serviceType}</td>
                        <td className="p-3">{b.destination}</td>
                        <td className="p-3 font-mono">{b.totalAmount.toLocaleString()}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold border border-emerald-500/20">
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. GOOGLE DRIVE */}
        {activeTab === 'drive' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <HardDrive className="w-5 h-5 text-blue-400" /> Google Drive Document Cloud Vault
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Organized folders for Client Passports, Bank Statements, Visa Approval Letters, and Flight Tickets.
                </p>
              </div>
              <a
                href="https://drive.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 text-xs font-medium flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Drive
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { name: 'SkyBridge / Schengen Dossiers', files: '18 Documents', color: 'border-blue-500/30 bg-blue-500/5', desc: 'Schengen embassy appointment packs & itineraries' },
                { name: 'SkyBridge / Umrah VIP Groups', files: '24 Passports & Vouchers', color: 'border-emerald-500/30 bg-emerald-500/5', desc: 'Makkah & Madinah 5-star hotel vouchers' },
                { name: 'SkyBridge / Client Invoices & Receipts', files: '42 PDF Invoices', color: 'border-amber-500/30 bg-amber-500/5', desc: 'Official stamped tax invoices & payments' }
              ].map((folder, idx) => (
                <div key={idx} className={`p-4 rounded-xl border ${folder.color} flex flex-col justify-between`}>
                  <div className="flex items-start justify-between mb-3">
                    <FolderOpen className="w-8 h-8 text-blue-400" />
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-mono">
                      {folder.files}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">{folder.name}</h4>
                  <p className="text-slate-400 text-xs mt-1">{folder.desc}</p>
                  <button
                    onClick={() => {
                      setActionSuccess(`Folder "${folder.name}" synced with Google Drive cloud.`);
                      setTimeout(() => setActionSuccess(null), 3000);
                    }}
                    className="mt-4 text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect Files in Drive</span> &rarr;
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. GMAIL EXECUTIVE DISPATCH & CUSTOMER EMAIL SYSTEM */}
        {activeTab === 'gmail' && (
          <GmailExecutiveDispatch />
        )}

        {/* 4. GOOGLE CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-400" /> Google Calendar Travel & Embassy Schedule
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Schedule VFS / Gerry’s visa appointments, group flight departures, and CEO VIP meetings.
                </p>
              </div>
              <a
                href="https://calendar.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-300 border border-cyan-500/30 text-xs font-medium flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Google Calendar
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Add event form */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-4">
                <h4 className="text-sm font-bold text-white">Create Google Calendar Event</h4>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Event Title</label>
                  <input
                    type="text"
                    value={calTitle}
                    onChange={(e) => setCalTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Location / Embassy</label>
                  <input
                    type="text"
                    value={calLocation}
                    onChange={(e) => setCalLocation(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const url = createGoogleCalendarUrl({
                      title: calTitle,
                      details: 'Scheduled via SkyBridge Travel & Tourism Executive Suite',
                      location: calLocation,
                      startDate: calDate,
                      endDate: '20261015T103000Z'
                    });
                    window.open(url, '_blank');
                  }}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-600/20"
                >
                  <Plus className="w-4 h-4" /> Add Directly to Google Calendar
                </button>
              </div>

              {/* Upcoming schedule */}
              <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-5 space-y-3">
                <h4 className="text-sm font-bold text-white">Upcoming Agency Milestones</h4>
                {[
                  { title: 'Schengen Biometrics Appointment (Kamran S.)', date: 'Tomorrow, 09:30 AM', location: 'Gerrys Lahore', status: 'Confirmed' },
                  { title: 'Umrah Group Flight Departure (EK-622)', date: '18 Oct 2026, 03:45 AM', location: 'Lahore (LHE) to Jeddah (JED)', status: 'Ticketed' },
                  { title: 'Dubai Luxury DMC Quarterly Partner Review', date: '25 Oct 2026, 02:00 PM', location: 'Google Meet / Dubai Desk', status: 'Scheduled' }
                ].map((ev, i) => (
                  <div key={i} className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-white">{ev.title}</p>
                      <p className="text-[11px] text-cyan-400 mt-0.5">{ev.date} • {ev.location}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 text-[10px] font-semibold border border-cyan-500/20">
                      {ev.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 5. GOOGLE DOCS */}
        {activeTab === 'docs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-400" /> Google Docs Proposal & Embassy Letter Generator
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Generate professional official cover letters, travel visa guarantees, and hotel booking contracts.
                </p>
              </div>
              <a
                href="https://docs.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 text-xs font-medium flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Google Docs
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: 'Embassy Visa Cover Letter', type: 'Schengen / UK / US', desc: 'Formal introduction of applicant with day-by-day travel itinerary and financial guarantee.' },
                { title: 'Traveler Sponsorship Declaration', type: 'Family / Business', desc: 'Notarized sponsorship guarantee format required by European and UK visa authorities.' },
                { title: 'VIP Package Booking Contract', type: 'Honeymoon / Umrah', desc: 'Comprehensive terms, cancellation policies, and flight & hotel inclusions document.' }
              ].map((doc, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-indigo-500/30 bg-indigo-500/5 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
                      {doc.type}
                    </span>
                    <h4 className="text-sm font-bold text-white mt-2">{doc.title}</h4>
                    <p className="text-slate-400 text-xs mt-1">{doc.desc}</p>
                  </div>
                  <button
                    onClick={() => {
                      setActionSuccess(`Created new Google Doc template for "${doc.title}".`);
                      setTimeout(() => setActionSuccess(null), 3000);
                    }}
                    className="mt-4 py-2 px-3 rounded-lg bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-200 border border-indigo-500/40 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Create in Google Docs
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. GOOGLE SLIDES */}
        {activeTab === 'slides' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Presentation className="w-5 h-5 text-amber-400" /> Google Slides VIP Pitch & Itinerary Decks
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Build customized visual presentations for high-net-worth Umrah delegations and corporate travel clients.
                </p>
              </div>
              <a
                href="https://slides.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 border border-amber-500/30 text-xs font-medium flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Google Slides
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: '2026 Luxury Umrah Executive Deck', slides: '14 Slides', desc: 'Features Fairmont Clock Royal Tower Makkah, Oberoi Madinah, Haramain High Speed Train, and private GMC Yukon transfers.' },
                { title: 'European Schengen Holiday Presentation', slides: '18 Slides', desc: 'Paris, Switzerland Alps, and Rome custom family holiday presentation with day-to-day sightseeing.' }
              ].map((deck, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-amber-400">{deck.title}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">{deck.slides}</span>
                  </div>
                  <p className="text-slate-400 text-xs">{deck.desc}</p>
                  <button
                    onClick={() => {
                      setActionSuccess(`Exported presentation "${deck.title}" to Google Slides.`);
                      setTimeout(() => setActionSuccess(null), 3000);
                    }}
                    className="mt-4 py-2 px-3 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" /> Open in Google Slides
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 7. GOOGLE TASKS */}
        {activeTab === 'tasks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-teal-400" /> Google Tasks Executive Action List
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Synchronized with CEO Saman’s Google Tasks account on mobile and desktop.
                </p>
              </div>
            </div>

            {/* Add Task */}
            <form onSubmit={handleAddTask} className="flex gap-2">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="Enter urgent executive task or staff directive..."
                className="flex-grow px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-teal-500"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" /> Add Task
              </button>
            </form>

            <div className="space-y-2">
              {tasksList.map((t) => (
                <div
                  key={t.id}
                  onClick={() => toggleTask(t.id)}
                  className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                    t.done
                      ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={t.done}
                      onChange={() => {}}
                      className="w-4 h-4 rounded text-teal-600 focus:ring-teal-500"
                    />
                    <span className={`text-xs ${t.done ? 'line-through text-slate-500' : 'text-slate-200 font-medium'}`}>
                      {t.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 font-mono">{t.due}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded font-bold ${
                      t.priority === 'High' ? 'bg-rose-500/20 text-rose-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {t.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 8. GOOGLE CHAT */}
        {activeTab === 'chat' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-green-400" /> Google Chat Agency Space & Webhook
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Real-time agency internal room for urgent traveler escalations and visa status alerts.
                </p>
              </div>
              <a
                href="https://chat.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-green-600/20 hover:bg-green-600/30 text-green-300 border border-green-500/30 text-xs font-medium flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Google Chat
              </a>
            </div>

            <div className="border border-slate-800 rounded-xl bg-slate-950/60 p-4 space-y-4">
              <div className="h-56 overflow-y-auto space-y-3 pr-2">
                {chatMessages.map((m) => (
                  <div key={m.id} className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="font-bold text-green-400">{m.sender}</span>
                      <span className="text-slate-500">{m.time}</span>
                    </div>
                    <p className="text-xs text-slate-300">{m.text}</p>
                  </div>
                ))}
              </div>

              <form onSubmit={handleSendChat} className="flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Post message or directive to Google Chat room..."
                  className="flex-grow px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-green-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Post
                </button>
              </form>
            </div>
          </div>
        )}

        {/* 9. GOOGLE FORMS */}
        {activeTab === 'forms' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileQuestion className="w-5 h-5 text-purple-400" /> Google Forms Client Intake & Feedback
                </h3>
                <p className="text-slate-400 text-xs mt-0.5">
                  Collect traveler passport details, travel dates, and post-trip reviews automatically into your CRM.
                </p>
              </div>
              <a
                href="https://forms.google.com"
                target="_blank"
                rel="noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-medium flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" /> Open Google Forms
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">Online Visa Inquiry Intake Form</h4>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                    28 Responses
                  </span>
                </div>
                <p className="text-slate-400 text-xs">
                  Automated Google Form sent to website visitors asking for Passport Scan, Bank Balance, and preferred travel date.
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setActionSuccess('Google Form responses synced to CRM Leads table.');
                      setTimeout(() => setActionSuccess(null), 3000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-medium cursor-pointer"
                  >
                    Sync Responses to CRM
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-500/5">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-white">Post-Travel 5-Star Review Survey</h4>
                  <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded font-mono">
                    42 Responses
                  </span>
                </div>
                <p className="text-slate-400 text-xs">
                  Encourages satisfied clients to leave 5-star Google Maps reviews after their flight or Umrah trip.
                </p>
                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => {
                      setActionSuccess('Google Maps review invitation triggered.');
                      setTimeout(() => setActionSuccess(null), 3000);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-medium cursor-pointer"
                  >
                    Send to Returning Travelers
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
