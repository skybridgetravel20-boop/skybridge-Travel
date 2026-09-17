import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  Database,
  Download,
  FileSpreadsheet,
  FileCode,
  Trash2,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  HardDrive,
  ShieldCheck,
  Clock,
  Lock,
  KeyRound,
  Server,
  Globe,
  ExternalLink
} from 'lucide-react';

export const AdminSettingsBackupPage: React.FC = () => {
  const {
    leads,
    customers,
    cases,
    bookings,
    payments,
    auditLogs,
    exportData,
    createBackup,
    clearDemoData,
    restoreDemoData
  } = useCrm();

  const [backupSuccess, setBackupSuccess] = useState<string | null>(null);
  const [lastBackupTime, setLastBackupTime] = useState<string | null>(null);
  const [newMasterPassword, setNewMasterPassword] = useState('');
  const [passwordSavedMessage, setPasswordSavedMessage] = useState<string | null>(null);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMasterPassword.trim()) return;
    localStorage.setItem('skybridge_master_pwd', newMasterPassword.trim());
    setPasswordSavedMessage('Master Admin Password updated successfully. New password will be required on next login.');
    setNewMasterPassword('');
    setTimeout(() => setPasswordSavedMessage(null), 5000);
  };

  const handleCreateBackup = () => {
    const backupJson = createBackup();
    const now = new Date().toLocaleString();
    setLastBackupTime(now);
    setBackupSuccess(`Snapshot created successfully (${backupJson.length} bytes, ${leads.length} leads, ${customers.length} customers).`);
    setTimeout(() => setBackupSuccess(null), 5000);
  };

  const handleDownloadBackupFile = () => {
    const backupJson = createBackup();
    const blob = new Blob([backupJson], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `skybridge-crm-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const hasDemo = leads.some(l => l.isDemo);

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">
          System Backups, Exports & Storage Recovery
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Safeguard customer travel records, generate verified CSV/JSON exports, and manage demo datasets.
        </p>
      </div>

      {backupSuccess && (
        <div className="p-4 bg-emerald-50 text-emerald-800 rounded-2xl border border-emerald-200 text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>{backupSuccess}</span>
        </div>
      )}

      {/* Database Snapshot Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
              <Database className="w-5 h-5 text-[#4FC3F7]" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#0B1B3B]">
                Database Backup & Snapshot Engine
              </h2>
              <p className="text-xs text-slate-500">
                Encapsulates all leads, customer profiles, cases, bookings, and audit records into an encrypted JSON payload.
              </p>
            </div>
          </div>

          {lastBackupTime && (
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-slate-400 font-bold uppercase">Last Created</span>
              <div className="text-xs font-mono text-slate-700">{lastBackupTime}</div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-400 font-bold block">Leads</span>
            <span className="text-xl font-black text-[#0B1B3B] font-mono">{leads.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-400 font-bold block">Customers</span>
            <span className="text-xl font-black text-[#0B1B3B] font-mono">{customers.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-400 font-bold block">Cases</span>
            <span className="text-xl font-black text-[#0B1B3B] font-mono">{cases.length}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
            <span className="text-[11px] text-slate-400 font-bold block">Bookings</span>
            <span className="text-xl font-black text-[#0B1B3B] font-mono">{bookings.length}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleCreateBackup}
            className="px-5 py-2.5 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors flex items-center gap-2"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Create Immediate Snapshot</span>
          </button>

          <button
            onClick={handleDownloadBackupFile}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Download Backup (.json)</span>
          </button>
        </div>
      </div>

      {/* Structured Exports by Collection */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5 text-[#4FC3F7]" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0B1B3B]">
              Tabular Data Exports (CSV & JSON)
            </h2>
            <p className="text-xs text-slate-500">
              Download clean spreadsheet-compatible files for accounting, immigration audits, or external backups.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Leads Export */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="font-bold text-xs text-[#0B1B3B]">Leads & Inquiries ({leads.length})</div>
            <div className="flex gap-2">
              <button
                onClick={() => exportData('leads', 'csv')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-[11px] font-bold"
              >
                CSV Export
              </button>
              <button
                onClick={() => exportData('leads', 'json')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-[11px] font-bold"
              >
                JSON Export
              </button>
            </div>
          </div>

          {/* Customers Export */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="font-bold text-xs text-[#0B1B3B]">Customer Directory ({customers.length})</div>
            <div className="flex gap-2">
              <button
                onClick={() => exportData('customers', 'csv')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-[11px] font-bold"
              >
                CSV Export
              </button>
              <button
                onClick={() => exportData('customers', 'json')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-[11px] font-bold"
              >
                JSON Export
              </button>
            </div>
          </div>

          {/* Cases Export */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="font-bold text-xs text-[#0B1B3B]">Travel & Visa Cases ({cases.length})</div>
            <div className="flex gap-2">
              <button
                onClick={() => exportData('cases', 'csv')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-[11px] font-bold"
              >
                CSV Export
              </button>
              <button
                onClick={() => exportData('cases', 'json')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-[11px] font-bold"
              >
                JSON Export
              </button>
            </div>
          </div>

          {/* Bookings Export */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="font-bold text-xs text-[#0B1B3B]">Flight & Hotel Bookings ({bookings.length})</div>
            <div className="flex gap-2">
              <button
                onClick={() => exportData('bookings', 'csv')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-[11px] font-bold"
              >
                CSV Export
              </button>
              <button
                onClick={() => exportData('bookings', 'json')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-[11px] font-bold"
              >
                JSON Export
              </button>
            </div>
          </div>

          {/* Payments Export */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
            <div className="font-bold text-xs text-[#0B1B3B]">Commercial Payments ({payments.length})</div>
            <div className="flex gap-2">
              <button
                onClick={() => exportData('payments', 'csv')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-[11px] font-bold"
              >
                CSV Export
              </button>
              <button
                onClick={() => exportData('payments', 'json')}
                className="flex-1 py-1.5 px-3 rounded-lg bg-white border border-slate-200 text-slate-800 hover:bg-slate-100 text-[11px] font-bold"
              >
                JSON Export
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Data Management Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0B1B3B]">
              Testing Environment: Demo Data Controls
            </h2>
            <p className="text-xs text-slate-500">
              Clear all seeded sample records to test with clean zero-state tables, or restore them anytime.
            </p>
          </div>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-bold text-slate-800">
              {hasDemo ? 'Demo Seed Records are Currently Loaded' : 'Clean State (No Demo Records Active)'}
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Production data will always be kept separate. Clearing demo records sets all sample metrics back to 0.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hasDemo ? (
              <button
                onClick={() => {
                  if (confirm('Purge all demo records now? This will reset demo metrics to 0.')) {
                    clearDemoData();
                  }
                }}
                className="px-4 py-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear Demo Records</span>
              </button>
            ) : (
              <button
                onClick={() => restoreDemoData()}
                className="px-4 py-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold transition-colors flex items-center gap-1.5"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Restore Demo Records</span>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Google Sheets Synchronization & Cloud Exports */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileSpreadsheet className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0B1B3B]">
              Google Sheets Synchronization & Pipeline Feeds
            </h2>
            <p className="text-xs text-slate-500">
              Export live CRM records pre-formatted for direct Google Sheets or Excel workbook integration.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#0B1B3B] block">Leads Master Sheet</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Full sales pipeline, contact details, assigned agents, and inquiry stages.
              </p>
            </div>
            <button
              onClick={() => exportData('leads', 'csv')}
              className="mt-4 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV for Google Sheets</span>
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#0B1B3B] block">Customers & Travel History</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Verified client registry, passports, total spend, and contact records.
              </p>
            </div>
            <button
              onClick={() => exportData('customers', 'csv')}
              className="mt-4 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV for Google Sheets</span>
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold text-[#0B1B3B] block">Invoices & Financial Ledger</span>
              <p className="text-[11px] text-slate-500 mt-1">
                Issued bills, tax breakdowns, client balances, and payment statuses.
              </p>
            </div>
            <button
              onClick={() => exportData('payments', 'csv')}
              className="mt-4 w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CSV for Google Sheets</span>
            </button>
          </div>
        </div>

        <div className="p-3.5 bg-blue-50/70 border border-blue-200/60 rounded-2xl text-[11px] text-blue-900 flex items-start gap-2.5">
          <Globe className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <strong>Google Sheets Integration Instructions:</strong> Open your Google Sheet, click <em>File &rarr; Import &rarr; Upload</em> and select the downloaded CSV. The columns will map automatically to customer names, phone numbers, passport details, and financials.
          </div>
        </div>
      </div>

      {/* Security, Master Key & Authentication Setup */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#0B1B3B]">
              Authentication & Master Password Security
            </h2>
            <p className="text-xs text-slate-500">
              Configure executive access credentials, master security passcodes, and backend identity providers.
            </p>
          </div>
        </div>

        {passwordSavedMessage && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{passwordSavedMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Master Password Change */}
          <form onSubmit={handleUpdatePassword} className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <KeyRound className="w-4 h-4 text-[#0B1B3B]" />
              <span>Update Master Security Password</span>
            </div>
            <p className="text-[11px] text-slate-500">
              Change the administrative master password used to authenticate executive and staff portal sessions (Default: <code>admin123</code>).
            </p>
            <div className="flex gap-2">
              <input
                type="password"
                required
                value={newMasterPassword}
                onChange={e => setNewMasterPassword(e.target.value)}
                placeholder="Enter new master password"
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors"
              >
                Save
              </button>
            </div>
          </form>

          {/* Backend & Cloud Database Architecture */}
          <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-200/80 text-[11px] text-slate-600">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
              <Server className="w-4 h-4 text-indigo-600" />
              <span>Backend & Database Infrastructure</span>
            </div>
            <div className="space-y-1.5 pt-1">
              <div className="flex justify-between">
                <span className="text-slate-500">Current Auth Provider:</span>
                <span className="font-semibold text-slate-800">SkyBridge IAM (Active)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Storage Layer:</span>
                <span className="font-semibold text-slate-800">Local Container Sandbox + Auto-Snapshot</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Cloud SQL / Firebase:</span>
                <span className="text-slate-600 font-mono">Configurable via .env.example</span>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 pt-1.5 border-t border-slate-200">
              To connect external cloud services (e.g. Firebase Firestore or PostgreSQL database), provide connection keys in your environment variables.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
