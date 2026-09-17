import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { GoogleSheetConnection } from '../../types';
import {
  FileSpreadsheet,
  RefreshCw,
  Plus,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Settings,
  Trash2,
  Play,
  ShieldCheck,
  X,
  Database,
  ArrowRight,
  HelpCircle,
  Key,
  Layers,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AdminGoogleSheetsPage: React.FC = () => {
  const {
    googleSheetConnections,
    addGoogleSheetConnection,
    updateGoogleSheetConnection,
    deleteGoogleSheetConnection,
    syncGoogleSheet,
    suppliers
  } = useCrm();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);
  const [syncSuccessMessage, setSyncSuccessMessage] = useState<string | null>(null);

  // New Connection Form
  const [formData, setFormData] = useState<Partial<GoogleSheetConnection>>({
    name: 'Airline Wholesale Feed (Live)',
    sheetTitle: 'SkyBridge Rates 2026',
    sheetUrl: 'https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit',
    spreadsheetId: '1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms',
    supplierId: suppliers[0]?.id || 'SUP-2026-00001',
    supplierName: suppliers[0]?.companyName || suppliers[0]?.name || 'Amadeus Global GDS',
    worksheet: 'Sheet1',
    syncDirection: 'Import to SkyBridge',
    schedule: 'Daily',
    frequency: 'Daily',
    autoUpdateRules: 'Flag as Price Alert for CEO Review',
    status: 'Connected'
  });

  const handleSyncNow = async (id: string) => {
    setSyncingId(id);
    const res = await syncGoogleSheet(id);
    setSyncingId(null);
    if (res.success) {
      setSyncSuccessMessage(res.message);
      setTimeout(() => setSyncSuccessMessage(null), 4000);
    }
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sheetUrl) return;

    const supObj = suppliers.find(s => s.id === formData.supplierId);
    addGoogleSheetConnection({
      ...formData,
      supplierName: supObj?.companyName || supObj?.name || formData.supplierName
    });

    setIsAddModalOpen(false);
    setFormData({
      name: '',
      sheetTitle: '',
      sheetUrl: '',
      spreadsheetId: '',
      supplierId: suppliers[0]?.id || '',
      supplierName: '',
      worksheet: 'Sheet1',
      syncDirection: 'Import to SkyBridge',
      schedule: 'Daily',
      frequency: 'Daily',
      autoUpdateRules: 'Flag as Price Alert for CEO Review',
      status: 'Connected'
    });
  };

  return (
    <div className="space-y-6">
      {/* Toast Notice */}
      {syncSuccessMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1B3B] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-emerald-400">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{syncSuccessMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">Google Sheets Live Sync Integration</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
              Live Feeds Active
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Connect shared partner Google Sheets to automatically synchronize wholesale hotel inventories, airline rates, and group blocks.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Connect New Google Sheet</span>
        </button>
      </div>

      {/* Connection Info Notice */}
      <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 flex items-start gap-3">
        <div className="p-2 rounded-xl bg-emerald-100 text-emerald-800 shrink-0">
          <FileSpreadsheet className="w-5 h-5" />
        </div>
        <div className="text-xs text-emerald-950 space-y-1">
          <span className="font-bold block">Automated Sync Rule Engine:</span>
          <p className="text-emerald-800">
            SkyBridge uses conflict detection before writing rates to live customer quotes. Any rate fluctuation exceeding 3% automatically triggers an AI Price Alert for CEO review.
          </p>
        </div>
      </div>

      {/* Google Sheet Feeds List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {googleSheetConnections.map(conn => {
          const isBusy = syncingId === conn.id;

          return (
            <div
              key={conn.id}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center border border-emerald-100">
                      <FileSpreadsheet className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#0B1B3B]">{conn.name || conn.sheetTitle}</h3>
                      <p className="text-[11px] font-semibold text-[#0288D1]">{conn.supplierName}</p>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      conn.status === 'Connected'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}
                  >
                    {conn.status || 'Connected'}
                  </span>
                </div>

                <div className="space-y-2 bg-slate-50 p-3.5 rounded-xl text-xs text-slate-600 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Sync Schedule:</span>
                    <span className="font-semibold text-slate-800">{conn.frequency || conn.schedule || 'Daily'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Direction:</span>
                    <span className="font-semibold text-slate-800">{conn.syncDirection || 'Import to SkyBridge'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Records Synced:</span>
                    <span className="font-mono font-bold text-slate-800">{conn.recordsSynced || 18}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Last Synced:</span>
                    <span className="font-mono text-[11px] text-slate-600">
                      {conn.lastSyncTime ? new Date(conn.lastSyncTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Recently'}
                    </span>
                  </div>
                  <div className="pt-1.5 border-t border-slate-200 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">Conflict Policy:</span>
                    <span className="font-semibold text-amber-700">{conn.autoUpdateRules || 'Flag for CEO Review'}</span>
                  </div>
                </div>

                {conn.sheetUrl && (
                  <a
                    href={conn.sheetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#0288D1] hover:underline font-semibold mb-4"
                  >
                    <span>Open Sheet in Google Drive</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => {
                    if (window.confirm(`Disconnect Google Sheet "${conn.name}"?`)) {
                      deleteGoogleSheetConnection(conn.id);
                    }
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Disconnect Sheet"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleSyncNow(conn.id)}
                  disabled={isBusy}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors disabled:opacity-50 shadow-sm"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isBusy ? 'animate-spin' : ''}`} />
                  <span>{isBusy ? 'Syncing...' : 'Sync Now'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Sheet Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-[#0B1B3B]">Connect Google Sheet Feed</h2>
                <p className="text-xs text-slate-500">Provide the Google Sheet share link and sync frequency.</p>
              </div>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Feed / Sheet Label *</label>
                <input
                  type="text"
                  required
                  value={formData.name || ''}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dubai Hotel B2B Rates Sheet"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Linked Supplier *</label>
                <select
                  value={formData.supplierId}
                  onChange={e => {
                    const sup = suppliers.find(s => s.id === e.target.value);
                    setFormData({
                      ...formData,
                      supplierId: e.target.value,
                      supplierName: sup?.companyName || sup?.name || ''
                    });
                  }}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.companyName || s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Google Sheet URL *</label>
                <input
                  type="url"
                  required
                  value={formData.sheetUrl || ''}
                  onChange={e => setFormData({ ...formData, sheetUrl: e.target.value })}
                  placeholder="https://docs.google.com/spreadsheets/d/..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Tab / Sheet Name</label>
                  <input
                    type="text"
                    value={formData.worksheet || 'Sheet1'}
                    onChange={e => setFormData({ ...formData, worksheet: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Sync Schedule</label>
                  <select
                    value={formData.frequency}
                    onChange={e => setFormData({ ...formData, frequency: e.target.value, schedule: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value="Manual only">Manual Only</option>
                    <option value="Every hour">Hourly</option>
                    <option value="Every 6 hours">Every 6 Hours</option>
                    <option value="Daily">Daily Sync</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Price Conflict Resolution</label>
                <select
                  value={formData.autoUpdateRules}
                  onChange={e => setFormData({ ...formData, autoUpdateRules: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="Flag as Price Alert for CEO Review">Flag for CEO Review (Safe Mode)</option>
                  <option value="Auto-update SkyBridge Rate Sheet">Auto-update SkyBridge Rate Sheet</option>
                  <option value="Preserve SkyBridge Price">Preserve Existing SkyBridge Price</option>
                </select>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
                >
                  Save Connection
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
