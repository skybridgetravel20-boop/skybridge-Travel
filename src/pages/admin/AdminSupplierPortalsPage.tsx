import React, { useState, useMemo } from 'react';
import { useCrm } from '../../context/CrmContext';
import { B2BPortal, SupplierCategory } from '../../types';
import {
  Key,
  Lock,
  ExternalLink,
  Plus,
  Search,
  Copy,
  Eye,
  EyeOff,
  CheckCircle2,
  Trash2,
  Edit2,
  X,
  Building2,
  ShieldCheck,
  Globe,
  AlertTriangle,
  CreditCard,
  UserCheck
} from 'lucide-react';
import { Link } from 'react-router-dom';

const ALL_CATEGORIES: SupplierCategory[] = [
  'Airline / Ticketing',
  'Flight Consolidator',
  'Hotel B2B',
  'Visa Supplier',
  'Insurance Provider',
  'Tour Operator',
  'Honeymoon Supplier',
  'Umrah Supplier',
  'Airport Transfer',
  'Transportation',
  'Documentation Service',
  'Local Partner',
  'Other'
];

export const AdminSupplierPortalsPage: React.FC = () => {
  const { b2bPortals, suppliers, addB2BPortal, updateB2BPortal, deleteB2BPortal } = useCrm();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPortal, setEditingPortal] = useState<B2BPortal | null>(null);

  // Form State
  const initialFormState: Partial<B2BPortal> = {
    portalName: '',
    supplierId: suppliers[0]?.id || 'SUP-2026-00001',
    supplierName: suppliers[0]?.companyName || suppliers[0]?.name || 'Amadeus Global GDS',
    category: 'Airline / Ticketing',
    websiteUrl: 'https://b2b.partner.com/login',
    loginUrl: 'https://b2b.partner.com/login',
    portalUrl: 'https://b2b.partner.com/login',
    username: 'skybridge_agent',
    password: 'SecurePass#2026',
    accountNumber: 'ACC-891024',
    creditLimit: 1000000,
    balance: 0,
    currency: 'PKR',
    authorizedStaff: ['CEO Saman', 'Ticketing Lead'],
    status: 'Active',
    notes: 'Authorized SkyBridge staff access only. Two-factor authenticated.'
  };

  const [formData, setFormData] = useState<Partial<B2BPortal>>(initialFormState);

  const togglePassword = (id: string) => {
    setShowPasswordMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedNotification(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  // Filter Portals
  const filteredPortals = useMemo(() => {
    return b2bPortals.filter(p => {
      const nameMatch = (p.portalName || p.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      const supMatch = (p.supplierName || '').toLowerCase().includes(searchQuery.toLowerCase());
      const userMatch = (p.username || '').toLowerCase().includes(searchQuery.toLowerCase());
      const accMatch = (p.accountNumber || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = !searchQuery || nameMatch || supMatch || userMatch || accMatch;

      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || p.status === selectedStatus;

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [b2bPortals, searchQuery, selectedCategory, selectedStatus]);

  // Form Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.portalName) return;

    const supObj = suppliers.find(s => s.id === formData.supplierId);
    const payload: Partial<B2BPortal> = {
      ...formData,
      portalName: formData.portalName,
      supplierName: supObj?.companyName || supObj?.name || formData.supplierName || 'SkyBridge Partner',
      loginUrl: formData.loginUrl || formData.websiteUrl,
      portalUrl: formData.loginUrl || formData.websiteUrl
    };

    if (editingPortal) {
      updateB2BPortal(editingPortal.id, payload);
      setEditingPortal(null);
    } else {
      addB2BPortal(payload);
      setIsAddModalOpen(false);
    }
    setFormData(initialFormState);
  };

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1B3B] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-sky-400">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{copiedNotification}</span>
        </div>
      )}

      {/* Internal Security Notice */}
      <div className="bg-slate-900 border-l-4 border-amber-500 rounded-2xl p-4 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                SKYBRIDGE INTERNAL ONLY
              </span>
              <h2 className="text-sm font-bold text-white">Supplier Portal Directory & Vault</h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Private vault of all wholesale supplier portals, agent codes, and encrypted credentials. Strictly staff-only.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/suppliers"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
          >
            <Building2 className="w-3.5 h-3.5 text-sky-400" />
            <span>Supplier Center</span>
          </Link>
          <Link
            to="/admin/price-check"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
          >
            <span>Rate Sheets</span>
          </Link>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">B2B Supplier Portals Directory</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E3F2FD] text-[#0288D1]">
              {b2bPortals.length} Portals Connected
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            One-click access to airline GDS consoles, hotel wholesalers (WebBeds, TBO, Hotelbeds), and visa desks.
          </p>
        </div>

        <button
          onClick={() => {
            setFormData(initialFormState);
            setIsAddModalOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Supplier Portal</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search portals by name, supplier, username, or agent account number..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Categories</option>
            {ALL_CATEGORIES.map(c => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={e => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Maintenance">Maintenance</option>
            <option value="Disabled">Disabled</option>
          </select>
        </div>
      </div>

      {/* Portals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPortals.length === 0 ? (
          <div className="col-span-full bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
            <Key className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-xs">No supplier portals match your criteria.</p>
          </div>
        ) : (
          filteredPortals.map(portal => {
            const isVisible = showPasswordMap[portal.id] || false;
            const targetUrl = portal.loginUrl || portal.portalUrl || portal.websiteUrl || 'https://google.com';

            return (
              <div
                key={portal.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold text-slate-700">
                      {portal.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                        portal.status === 'Active'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : portal.status === 'Maintenance'
                          ? 'bg-amber-50 text-amber-700 border border-amber-200'
                          : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {portal.status || 'Active'}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#0B1B3B] line-clamp-1">
                    {portal.portalName || portal.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#0288D1] mb-3">
                    {portal.supplierName} • {portal.category || 'General'}
                  </p>

                  {/* Credential Vault Box */}
                  <div className="bg-amber-50/50 border border-amber-200/60 rounded-xl p-3 space-y-2 mb-3 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-semibold text-amber-900">Username:</span>
                      <div className="flex items-center gap-1">
                        <code className="font-mono text-[11px] font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-amber-200">
                          {portal.username || 'agent_skybridge'}
                        </code>
                        <button
                          onClick={() => handleCopy(portal.username || '', 'Username')}
                          className="text-slate-400 hover:text-slate-700 p-1"
                          title="Copy Username"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1 border-t border-amber-200/40">
                      <span className="text-[11px] font-semibold text-amber-900">Password:</span>
                      <div className="flex items-center gap-1">
                        <code className="font-mono text-[11px] font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-amber-200">
                          {isVisible ? portal.password || 'SecurePass#2026' : '••••••••••••'}
                        </code>
                        <button
                          onClick={() => togglePassword(portal.id)}
                          className="text-slate-400 hover:text-slate-700 p-1"
                          title={isVisible ? 'Hide Password' : 'Show Password'}
                        >
                          {isVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                        </button>
                        <button
                          onClick={() => handleCopy(portal.password || '', 'Password')}
                          className="text-slate-400 hover:text-slate-700 p-1"
                          title="Copy Password"
                        >
                          <Copy className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {portal.accountNumber && (
                      <div className="flex items-center justify-between pt-1 border-t border-amber-200/40 text-[11px]">
                        <span className="text-slate-500 font-medium">Agent / Account ID:</span>
                        <code className="font-mono font-bold text-slate-700">{portal.accountNumber}</code>
                      </div>
                    )}
                  </div>

                  {/* Notes & Staff info */}
                  {portal.notes && (
                    <p className="text-[11px] text-slate-500 line-clamp-2 italic mb-3">
                      {portal.notes}
                    </p>
                  )}
                </div>

                {/* Card Actions */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        setEditingPortal(portal);
                        setFormData(portal);
                      }}
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                      title="Edit Portal"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete portal entry "${portal.portalName}"?`)) {
                          deleteB2BPortal(portal.id);
                        }
                      }}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                      title="Delete Portal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <a
                    href={targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors shadow-sm"
                  >
                    <span>Open Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Add / Edit Portal Modal */}
      {(isAddModalOpen || editingPortal) && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-[#0B1B3B]">
                  {editingPortal ? 'Edit Supplier Portal' : 'Add B2B Supplier Portal'}
                </h2>
                <p className="text-xs text-slate-500">Save staff login credentials, URL, and agent codes.</p>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingPortal(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Portal Name *</label>
                <input
                  type="text"
                  required
                  value={formData.portalName || ''}
                  onChange={e => setFormData({ ...formData, portalName: e.target.value })}
                  placeholder="e.g. WebBeds Wholesale Partner Console"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Linked Supplier *</label>
                  <select
                    value={formData.supplierId}
                    onChange={e => {
                      const s = suppliers.find(sup => sup.id === e.target.value);
                      setFormData({
                        ...formData,
                        supplierId: e.target.value,
                        supplierName: s?.companyName || s?.name || ''
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    {ALL_CATEGORIES.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Portal Login URL *</label>
                <input
                  type="url"
                  required
                  value={formData.loginUrl || formData.websiteUrl || ''}
                  onChange={e => setFormData({ ...formData, loginUrl: e.target.value, websiteUrl: e.target.value })}
                  placeholder="https://agent.webbeds.com/login"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Agent Username *</label>
                  <input
                    type="text"
                    required
                    value={formData.username || ''}
                    onChange={e => setFormData({ ...formData, username: e.target.value })}
                    placeholder="skybridge_b2b"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Staff Password *</label>
                  <input
                    type="text"
                    required
                    value={formData.password || ''}
                    onChange={e => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Encrypted password"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Account Number / Agent ID</label>
                  <input
                    type="text"
                    value={formData.accountNumber || ''}
                    onChange={e => setFormData({ ...formData, accountNumber: e.target.value })}
                    placeholder="ACC-91204"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Portal Status</label>
                  <select
                    value={formData.status}
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Internal Instructions & Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes || ''}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="2FA required with phone +92..., booking cutoff time is 6PM PKT..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingPortal(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
                >
                  {editingPortal ? 'Save Portal Changes' : 'Register Portal'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
