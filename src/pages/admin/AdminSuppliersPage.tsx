import React, { useState, useMemo } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Supplier, SupplierCategory } from '../../types';
import {
  Building2,
  ExternalLink,
  Plus,
  Search,
  Star,
  ShieldCheck,
  Globe,
  Phone,
  Mail,
  Key,
  CreditCard,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  Filter,
  Download,
  Trash2,
  Edit2,
  MessageSquare,
  DollarSign,
  Layers,
  FileSpreadsheet,
  AlertTriangle,
  Lock,
  ChevronRight,
  TrendingUp,
  Briefcase
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

const CONNECTION_TYPES = [
  'Direct Portal',
  'GDS API',
  'Email/WhatsApp',
  'Google Sheet Sync'
];

const PAYMENT_TERMS_OPTIONS = [
  '100% Advance Deposit',
  '7 Days Credit (Net 7)',
  '15 Days Credit (Net 15)',
  '30 Days Monthly Settlement',
  'Weekly Reconciled Billing',
  'Instant Credit Line / Revolving'
];

const CURRENCIES = ['PKR', 'USD', 'AED', 'EUR', 'GBP', 'SAR'];

export const AdminSuppliersPage: React.FC = () => {
  const { suppliers, addSupplier, updateSupplier, deleteSupplier, supplierPrices } = useCrm();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('table');

  // Modals & Drawers
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [viewingSupplier, setViewingSupplier] = useState<Supplier | null>(null);
  const [showPasswordMap, setShowPasswordMap] = useState<Record<string, boolean>>({});

  // Form State
  const initialFormState: Partial<Supplier> = {
    name: '',
    companyName: '',
    code: '',
    category: 'Hotel B2B',
    country: 'Pakistan',
    city: 'Islamabad',
    contactPerson: '',
    email: '',
    phone: '',
    whatsApp: '',
    website: '',
    portalUrl: '',
    loginUsername: '',
    portalPassword: '',
    portalNotes: '',
    accountManager: '',
    services: 'Hotel Rooms, Transfers',
    connectionType: 'Direct Portal',
    apiStatus: 'Connected',
    rating: 5,
    currency: 'PKR',
    paymentTerms: 'Weekly Reconciled Billing',
    cancellationTerms: 'Free cancellation up to 48 hours prior to check-in',
    creditLimit: 1000000,
    currentBalance: 0,
    status: 'Active',
    notes: 'Internal SkyBridge authorized supplier.'
  };

  const [formData, setFormData] = useState<Partial<Supplier>>(initialFormState);

  // Toggle password visibility for specific supplier ID or modal
  const togglePasswordVisibility = (id: string) => {
    setShowPasswordMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Filtered Suppliers
  const filteredSuppliers = useMemo(() => {
    return suppliers.filter(s => {
      const nameMatch = (s.companyName || s.name || '').toLowerCase().includes(searchQuery.toLowerCase());
      const codeMatch = (s.code || '').toLowerCase().includes(searchQuery.toLowerCase());
      const contactMatch = (s.contactPerson || '').toLowerCase().includes(searchQuery.toLowerCase());
      const cityMatch = (s.city || '').toLowerCase().includes(searchQuery.toLowerCase());
      const countryMatch = (s.country || '').toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSearch = !searchQuery || nameMatch || codeMatch || contactMatch || cityMatch || countryMatch;

      const matchesCat = selectedCategory === 'All' || s.category === selectedCategory;
      const matchesStatus = selectedStatus === 'All' || s.status === selectedStatus;
      const matchesCurr = selectedCurrency === 'All' || s.currency === selectedCurrency;

      return matchesSearch && matchesCat && matchesStatus && matchesCurr;
    });
  }, [suppliers, searchQuery, selectedCategory, selectedStatus, selectedCurrency]);

  // Handle Create / Edit Submission
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name && !formData.companyName) return;

    const payload: Partial<Supplier> = {
      ...formData,
      name: formData.companyName || formData.name || 'New Supplier',
      companyName: formData.companyName || formData.name
    };

    if (editingSupplier) {
      updateSupplier(editingSupplier.id, payload);
      setEditingSupplier(null);
    } else {
      addSupplier(payload);
      setIsAddModalOpen(false);
    }
    setFormData(initialFormState);
  };

  const handleOpenEdit = (sup: Supplier) => {
    setEditingSupplier(sup);
    setFormData({
      ...sup,
      companyName: sup.companyName || sup.name
    });
  };

  const handleDelete = (sup: Supplier) => {
    if (window.confirm(`Are you sure you want to remove supplier "${sup.companyName || sup.name}"? This action will be logged in the audit trail.`)) {
      deleteSupplier(sup.id);
      if (viewingSupplier?.id === sup.id) {
        setViewingSupplier(null);
      }
    }
  };

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['ID,Company Name,Category,Country,City,Contact Person,Email,Phone,WhatsApp,Portal URL,Payment Terms,Credit Limit,Current Balance,Currency,Status'];
    const rows = filteredSuppliers.map(s => [
      `"${s.id}"`,
      `"${(s.companyName || s.name).replace(/"/g, '""')}"`,
      `"${s.category}"`,
      `"${s.country || ''}"`,
      `"${s.city || ''}"`,
      `"${s.contactPerson || ''}"`,
      `"${s.email || ''}"`,
      `"${s.phone || ''}"`,
      `"${s.whatsApp || s.phone || ''}"`,
      `"${s.portalUrl || ''}"`,
      `"${s.paymentTerms || ''}"`,
      `"${s.creditLimit || 0}"`,
      `"${s.currentBalance || 0}"`,
      `"${s.currency || 'PKR'}"`,
      `"${s.status || 'Active'}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `skybridge_b2b_suppliers_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Stats
  const activeCount = suppliers.filter(s => s.status === 'Active').length;
  const totalCreditLimitPKR = suppliers
    .filter(s => s.currency === 'PKR')
    .reduce((acc, s) => acc + (s.creditLimit || 0), 0);
  const totalBalancePKR = suppliers
    .filter(s => s.currency === 'PKR')
    .reduce((acc, s) => acc + (s.currentBalance || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Banner / Privacy Guard Notice */}
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
              <h2 className="text-sm font-bold text-white">B2B Supplier Directory & Credential Vault</h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Wholesale partners, net rates, and portal credentials. Strictly confidential — never visible to clients or public visitors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/supplier-portals"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
          >
            <Key className="w-3.5 h-3.5 text-sky-400" />
            <span>Portals Vault</span>
          </Link>
          <Link
            to="/admin/price-check"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            <span>Rate Sheets</span>
          </Link>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Total Suppliers</span>
            <Building2 className="w-4 h-4 text-[#0288D1]" />
          </div>
          <div className="text-2xl font-black text-[#0B1B3B]">{suppliers.length}</div>
          <div className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>{activeCount} Active & Contracted</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Rate Sheets Monitored</span>
            <DollarSign className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-black text-[#0B1B3B]">{supplierPrices.length}</div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            Live internal wholesale pricing
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>PKR Credit Facility</span>
            <CreditCard className="w-4 h-4 text-purple-500" />
          </div>
          <div className="text-2xl font-black text-[#0B1B3B]">
            PKR {(totalCreditLimitPKR / 1000000).toFixed(1)}M
          </div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            Combined revolving partner credit
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-1">
            <span>Outstanding Balance</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-black text-rose-600">
            PKR {(totalBalancePKR / 1000).toFixed(0)}k
          </div>
          <div className="text-[11px] text-slate-500 font-semibold mt-1">
            Unbilled credit lines in use
          </div>
        </div>
      </div>

      {/* Action Header & Search */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-xl font-black text-[#0B1B3B] flex items-center gap-2">
            <span>B2B Supplier Center</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-100 text-[#0288D1] font-bold">
              {filteredSuppliers.length} shown
            </span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Store and manage all wholesale consolidators, airline desks, hotel portals, and visa partners.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'table' ? 'bg-white text-[#0B1B3B] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Table View
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                viewMode === 'cards' ? 'bg-white text-[#0B1B3B] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cards View
            </button>
          </div>

          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
            title="Export filtered suppliers to CSV"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => {
              setFormData(initialFormState);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Supplier</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by company name, supplier code, contact person, city, or country..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active Only</option>
              <option value="Under Review">Under Review</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={selectedCurrency}
              onChange={e => setSelectedCurrency(e.target.value)}
              className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none"
            >
              <option value="All">All Currencies</option>
              {CURRENCIES.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 border-t border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase mr-1">Category:</span>
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
              selectedCategory === 'All'
                ? 'bg-[#0B1B3B] text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            All ({suppliers.length})
          </button>
          {ALL_CATEGORIES.map(cat => {
            const count = suppliers.filter(s => s.category === cat).length;
            if (count === 0 && selectedCategory !== cat) return null;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0B1B3B] text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat} {count > 0 ? `(${count})` : ''}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content: Table or Cards View */}
      {viewMode === 'table' ? (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="py-3 px-4">Supplier & Code</th>
                  <th className="py-3 px-3">Category</th>
                  <th className="py-3 px-3">Location</th>
                  <th className="py-3 px-3">Primary Contact</th>
                  <th className="py-3 px-3">Portal Credentials (Internal)</th>
                  <th className="py-3 px-3">Terms & Credit</th>
                  <th className="py-3 px-3 text-center">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredSuppliers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-12 text-center text-slate-400">
                      <Building2 className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="font-semibold">No suppliers found matching your filters.</p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('All');
                          setSelectedStatus('All');
                          setSelectedCurrency('All');
                        }}
                        className="text-[#0288D1] font-bold text-xs mt-2 underline"
                      >
                        Reset All Filters
                      </button>
                    </td>
                  </tr>
                ) : (
                  filteredSuppliers.map(sup => {
                    const hasPassword = Boolean(sup.portalPassword);
                    const isPassVisible = showPasswordMap[sup.id] || false;
                    const ratesCount = supplierPrices.filter(p => p.supplierId === sup.id || p.supplierName === (sup.companyName || sup.name)).length;

                    return (
                      <tr key={sup.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-start gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-sky-50 text-[#0288D1] flex items-center justify-center font-bold text-xs border border-sky-100 shrink-0">
                              {(sup.companyName || sup.name).substring(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <button
                                onClick={() => setViewingSupplier(sup)}
                                className="font-bold text-[#0B1B3B] hover:text-[#0288D1] text-left line-clamp-1 text-xs transition-colors"
                              >
                                {sup.companyName || sup.name}
                              </button>
                              <div className="flex items-center gap-1.5 mt-0.5">
                                <span className="font-mono text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                  {sup.code}
                                </span>
                                {sup.rating && (
                                  <span className="flex items-center gap-0.5 text-[10px] font-bold text-amber-500">
                                    <Star className="w-3 h-3 fill-amber-400" />
                                    {sup.rating}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-semibold bg-sky-50 text-[#0288D1] border border-sky-100">
                            {sup.category}
                          </span>
                          {sup.connectionType && (
                            <div className="text-[10px] text-slate-400 mt-0.5 font-medium">
                              {sup.connectionType}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-800">{sup.city || 'National'}</div>
                          <div className="text-[10px] text-slate-400">{sup.country || 'Pakistan'}</div>
                        </td>

                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-800">{sup.contactPerson || 'Desk Lead'}</div>
                          <div className="flex items-center gap-2 mt-1">
                            {sup.phone && (
                              <a
                                href={`https://wa.me/${(sup.whatsApp || sup.phone).replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-600 hover:text-emerald-700 p-1 rounded bg-emerald-50 hover:bg-emerald-100 transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageSquare className="w-3 h-3" />
                              </a>
                            )}
                            {sup.email && (
                              <a
                                href={`mailto:${sup.email}`}
                                className="text-sky-600 hover:text-sky-700 p-1 rounded bg-sky-50 hover:bg-sky-100 transition-colors"
                                title={sup.email}
                              >
                                <Mail className="w-3 h-3" />
                              </a>
                            )}
                            {sup.phone && (
                              <a
                                href={`tel:${sup.phone}`}
                                className="text-slate-600 hover:text-slate-800 p-1 rounded bg-slate-100 hover:bg-slate-200 transition-colors"
                                title={sup.phone}
                              >
                                <Phone className="w-3 h-3" />
                              </a>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-3">
                          {sup.portalUrl ? (
                            <div className="space-y-1">
                              <div className="flex items-center gap-1">
                                <Key className="w-3 h-3 text-[#0288D1]" />
                                <span className="font-mono text-[10px] bg-slate-100 px-1 rounded text-slate-700 font-bold">
                                  {sup.portalUsername || sup.loginUsername || 'agent_b2b'}
                                </span>
                              </div>
                              {hasPassword ? (
                                <div className="flex items-center gap-1.5">
                                  <span className="font-mono text-[10px] bg-amber-50 px-1 py-0.5 rounded text-amber-900 border border-amber-200">
                                    {isPassVisible ? sup.portalPassword : '••••••••••••'}
                                  </span>
                                  <button
                                    onClick={() => togglePasswordVisibility(sup.id)}
                                    className="text-slate-400 hover:text-slate-600"
                                    title={isPassVisible ? 'Hide Password' : 'Show Password (Staff Only)'}
                                  >
                                    {isPassVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                                  </button>
                                </div>
                              ) : (
                                <span className="text-[10px] text-slate-400 italic">No password stored</span>
                              )}
                              <div>
                                <a
                                  href={sup.portalUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-[10px] font-bold text-[#0288D1] hover:underline"
                                >
                                  <span>Open Portal</span>
                                  <ExternalLink className="w-2.5 h-2.5" />
                                </a>
                              </div>
                            </div>
                          ) : (
                            <span className="text-[11px] text-slate-400">Offline / Direct Call</span>
                          )}
                        </td>

                        <td className="py-3 px-3">
                          <div className="text-[11px] font-semibold text-slate-800">{sup.paymentTerms}</div>
                          <div className="text-[10px] text-slate-500 mt-0.5">
                            Credit: <span className="font-mono font-bold text-slate-700">{sup.currency} {(sup.creditLimit || 0).toLocaleString()}</span>
                          </div>
                          {(sup.currentBalance || 0) > 0 && (
                            <div className="text-[10px] text-rose-600 font-bold mt-0.5">
                              Due: {sup.currency} {(sup.currentBalance || 0).toLocaleString()}
                            </div>
                          )}
                        </td>

                        <td className="py-3 px-3 text-center">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              sup.status === 'Active'
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : sup.status === 'Under Review'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {sup.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link
                              to={`/admin/price-check?supplier=${encodeURIComponent(sup.companyName || sup.name)}`}
                              className="px-2 py-1 rounded-lg bg-sky-50 text-[#0288D1] hover:bg-sky-100 text-[10px] font-bold transition-colors"
                              title="View and manage live rates for this supplier"
                            >
                              Rates ({ratesCount})
                            </Link>

                            <button
                              onClick={() => handleOpenEdit(sup)}
                              className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B1B3B] hover:bg-slate-100 transition-colors"
                              title="Edit Supplier Details"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => handleDelete(sup)}
                              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Delete Supplier"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Cards View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredSuppliers.map(sup => {
            const hasPassword = Boolean(sup.portalPassword);
            const isPassVisible = showPasswordMap[sup.id] || false;
            const ratesCount = supplierPrices.filter(p => p.supplierId === sup.id || p.supplierName === (sup.companyName || sup.name)).length;

            return (
              <div
                key={sup.id}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-mono font-bold">
                        {sup.code}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                          sup.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700'
                            : sup.status === 'Under Review'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {sup.status}
                      </span>
                    </div>

                    {sup.rating && (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        {sup.rating}
                      </span>
                    )}
                  </div>

                  <h3 className="text-base font-bold text-[#0B1B3B] line-clamp-1">{sup.companyName || sup.name}</h3>
                  <div className="text-xs font-semibold text-[#0288D1] mb-2">{sup.category}</div>

                  <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl mb-3">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Location:</span>
                      <span className="font-semibold text-slate-800">{sup.city || 'National'}, {sup.country || 'Pakistan'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Contact Person:</span>
                      <span className="font-semibold text-slate-800">{sup.contactPerson || 'Direct Rep'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Terms:</span>
                      <span className="font-semibold text-slate-800">{sup.paymentTerms}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Credit Limit:</span>
                      <span className="font-semibold font-mono text-slate-800">
                        {sup.currency} {(sup.creditLimit || 0).toLocaleString()}
                      </span>
                    </div>
                    {(sup.currentBalance || 0) > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Current Balance:</span>
                        <span className="font-bold font-mono text-rose-600">
                          {sup.currency} {(sup.currentBalance || 0).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {sup.portalUrl && (
                    <div className="p-2.5 rounded-xl border border-sky-100 bg-sky-50/50 mb-3 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 text-[11px] font-semibold">B2B Username:</span>
                        <code className="font-mono text-[11px] font-bold text-slate-800 bg-white px-1.5 py-0.5 rounded border border-sky-200">
                          {sup.portalUsername || sup.loginUsername || 'N/A'}
                        </code>
                      </div>
                      {hasPassword && (
                        <div className="flex items-center justify-between pt-1 border-t border-sky-100">
                          <span className="text-slate-500 text-[11px] font-semibold">Staff Password:</span>
                          <div className="flex items-center gap-1.5">
                            <code className="font-mono text-[11px] bg-white px-1.5 py-0.5 rounded border border-amber-200 text-amber-900">
                              {isPassVisible ? sup.portalPassword : '••••••••••••'}
                            </code>
                            <button
                              onClick={() => togglePasswordVisibility(sup.id)}
                              className="text-slate-400 hover:text-slate-600"
                              title="Toggle visibility"
                            >
                              {isPassVisible ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5">
                    {sup.phone && (
                      <a
                        href={`https://wa.me/${(sup.whatsApp || sup.phone).replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-600 transition-colors"
                        title="WhatsApp"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {sup.email && (
                      <a
                        href={`mailto:${sup.email}`}
                        className="p-1.5 rounded-lg bg-sky-50 hover:bg-sky-100 text-[#0288D1] transition-colors"
                        title="Email"
                      >
                        <Mail className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <Link
                      to={`/admin/price-check?supplier=${encodeURIComponent(sup.companyName || sup.name)}`}
                      className="px-2 py-1 rounded-lg bg-slate-100 text-slate-700 hover:bg-slate-200 text-[10px] font-bold transition-colors"
                    >
                      Rates ({ratesCount})
                    </Link>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleOpenEdit(sup)}
                      className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {sup.portalUrl ? (
                      <a
                        href={sup.portalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-[11px] font-bold transition-colors"
                      >
                        <span>Portal</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <button
                        onClick={() => setViewingSupplier(sup)}
                        className="px-2.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[11px] font-bold text-slate-700"
                      >
                        Details
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Drawer / Modal */}
      {viewingSupplier && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <span className="px-2 py-0.5 rounded bg-slate-100 font-mono text-[10px] font-bold text-slate-600">
                  {viewingSupplier.code}
                </span>
                <h2 className="text-lg font-black text-[#0B1B3B] mt-1">{viewingSupplier.companyName || viewingSupplier.name}</h2>
                <p className="text-xs font-semibold text-[#0288D1]">{viewingSupplier.category}</p>
              </div>
              <button
                onClick={() => setViewingSupplier(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-2xl">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Location</span>
                <span className="font-semibold text-slate-800">{viewingSupplier.city || 'N/A'}, {viewingSupplier.country || 'Pakistan'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Contact Person</span>
                <span className="font-semibold text-slate-800">{viewingSupplier.contactPerson || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Email</span>
                <span className="font-semibold text-slate-800">{viewingSupplier.email || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Phone / WhatsApp</span>
                <span className="font-semibold text-slate-800">{viewingSupplier.phone || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Account Manager</span>
                <span className="font-semibold text-slate-800">{viewingSupplier.accountManager || 'None designated'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Connection Type</span>
                <span className="font-semibold text-slate-800">{viewingSupplier.connectionType || 'Direct Portal'}</span>
              </div>
            </div>

            {/* Financial Terms */}
            <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs">
              <h3 className="font-bold text-[#0B1B3B] text-xs flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-purple-600" />
                <span>Financial Credit & Commercial Terms</span>
              </h3>
              <div className="grid grid-cols-3 gap-2 pt-1">
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Payment Terms</span>
                  <span className="font-semibold text-slate-800">{viewingSupplier.paymentTerms}</span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Credit Limit</span>
                  <span className="font-mono font-bold text-slate-800">
                    {viewingSupplier.currency} {(viewingSupplier.creditLimit || 0).toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Balance Owed</span>
                  <span className="font-mono font-bold text-rose-600">
                    {viewingSupplier.currency} {(viewingSupplier.currentBalance || 0).toLocaleString()}
                  </span>
                </div>
              </div>
              {viewingSupplier.cancellationTerms && (
                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[10px] text-slate-400 uppercase block font-bold">Cancellation Policy</span>
                  <p className="text-slate-600 italic mt-0.5">{viewingSupplier.cancellationTerms}</p>
                </div>
              )}
            </div>

            {/* Portal Credentials */}
            {viewingSupplier.portalUrl && (
              <div className="bg-amber-50/70 border border-amber-200 p-4 rounded-2xl text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Staff Portal Access Credentials</span>
                  </div>
                  <span className="text-[10px] bg-amber-200 text-amber-900 font-bold px-2 py-0.5 rounded">
                    INTERNAL ONLY
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                  <div>
                    <span className="text-[10px] text-amber-700 block font-sans font-bold">Username:</span>
                    <span className="bg-white px-2 py-1 rounded border border-amber-200 block text-slate-800">
                      {viewingSupplier.portalUsername || viewingSupplier.loginUsername || 'N/A'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-700 block font-sans font-bold">Password:</span>
                    <span className="bg-white px-2 py-1 rounded border border-amber-200 flex items-center justify-between text-slate-800">
                      <span>{showPasswordMap[viewingSupplier.id] ? viewingSupplier.portalPassword || 'N/A' : '••••••••••••'}</span>
                      <button
                        type="button"
                        onClick={() => togglePasswordVisibility(viewingSupplier.id)}
                        className="text-amber-700 hover:text-amber-900"
                      >
                        {showPasswordMap[viewingSupplier.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                      </button>
                    </span>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <a
                    href={viewingSupplier.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-[#0288D1] text-white text-xs font-bold transition-colors"
                  >
                    <span>Launch Supplier Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Notes */}
            {viewingSupplier.notes && (
              <div className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl">
                <span className="font-bold text-slate-700 block mb-0.5">Internal Operational Notes:</span>
                <p>{viewingSupplier.notes}</p>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  const s = viewingSupplier;
                  setViewingSupplier(null);
                  handleOpenEdit(s);
                }}
                className="flex items-center gap-1 text-xs font-bold text-[#0288D1] hover:underline"
              >
                <Edit2 className="w-3.5 h-3.5" />
                <span>Edit Full Profile</span>
              </button>

              <button
                onClick={() => setViewingSupplier(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors"
              >
                Close Drawer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Supplier Modal */}
      {(isAddModalOpen || editingSupplier) && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-[#0B1B3B]">
                  {editingSupplier ? 'Edit B2B Supplier Profile' : 'Add New B2B Supplier'}
                </h2>
                <p className="text-xs text-slate-500">
                  Fill in company details, financial terms, and secure staff portal credentials.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingSupplier(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              {/* Basic Details */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Company Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Company / Supplier Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.companyName || formData.name || ''}
                      onChange={e => setFormData({ ...formData, companyName: e.target.value, name: e.target.value })}
                      placeholder="e.g. TBO Holidays B2B Global"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Supplier Code *</label>
                    <input
                      type="text"
                      required
                      value={formData.code || ''}
                      onChange={e => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      placeholder="e.g. TBO-B2B"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                    <select
                      value={formData.category}
                      onChange={e => setFormData({ ...formData, category: e.target.value as SupplierCategory })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                    >
                      {ALL_CATEGORIES.map(c => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={formData.country || ''}
                      onChange={e => setFormData({ ...formData, country: e.target.value })}
                      placeholder="e.g. UAE, Pakistan, UK"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">City / Base</label>
                    <input
                      type="text"
                      value={formData.city || ''}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Dubai, Islamabad"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Reps */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Contact & Rep Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Key Contact Person</label>
                    <input
                      type="text"
                      value={formData.contactPerson || ''}
                      onChange={e => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="Account Manager Name"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Official Email</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="b2b@supplier.com"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                    <input
                      type="text"
                      value={formData.phone || ''}
                      onChange={e => setFormData({ ...formData, phone: e.target.value, whatsApp: e.target.value })}
                      placeholder="+92 300 1234567"
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                </div>
              </div>

              {/* Portal Credentials (Secured) */}
              <div className="space-y-3 pt-2 border-t border-slate-100 bg-amber-50/40 p-3 rounded-2xl border border-amber-200/50">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase text-amber-900 tracking-wider flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Staff Portal Logins & Credentials</span>
                  </h3>
                  <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                    Staff Eyes Only
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="md:col-span-3">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Portal Login URL</label>
                    <input
                      type="url"
                      value={formData.portalUrl || ''}
                      onChange={e => setFormData({ ...formData, portalUrl: e.target.value })}
                      placeholder="https://agent.supplier.com/login"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Agent / Login Username</label>
                    <input
                      type="text"
                      value={formData.portalUsername || formData.loginUsername || ''}
                      onChange={e => setFormData({ ...formData, portalUsername: e.target.value, loginUsername: e.target.value })}
                      placeholder="SKYBRIDGE_B2B"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Internal Password</label>
                    <input
                      type="text"
                      value={formData.portalPassword || ''}
                      onChange={e => setFormData({ ...formData, portalPassword: e.target.value })}
                      placeholder="Direct Pass / Key"
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono focus:outline-none focus:border-[#4FC3F7]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Connection Type</label>
                    <select
                      value={formData.connectionType}
                      onChange={e => setFormData({ ...formData, connectionType: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none"
                    >
                      {CONNECTION_TYPES.map(t => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Financial Terms & Limits */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Payment & Credit Terms</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1">Payment Settlement Terms</label>
                    <select
                      value={formData.paymentTerms}
                      onChange={e => setFormData({ ...formData, paymentTerms: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                    >
                      {PAYMENT_TERMS_OPTIONS.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Base Currency</label>
                    <select
                      value={formData.currency}
                      onChange={e => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    >
                      {CURRENCIES.map(c => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Credit Limit</label>
                    <input
                      type="number"
                      value={formData.creditLimit || 0}
                      onChange={e => setFormData({ ...formData, creditLimit: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Current Balance Due</label>
                    <input
                      type="number"
                      value={formData.currentBalance || 0}
                      onChange={e => setFormData({ ...formData, currentBalance: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Partner Rating (1-5)</label>
                    <input
                      type="number"
                      min={1}
                      max={5}
                      step={0.1}
                      value={formData.rating || 5}
                      onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Status</label>
                    <select
                      value={formData.status}
                      onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                    >
                      <option value="Active">Active</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Internal Notes & Booking Guidance</label>
                <textarea
                  rows={2}
                  value={formData.notes || ''}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Special instructions for staff, cancellation cut-off times, discount promo codes..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingSupplier(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
                >
                  {editingSupplier ? 'Save Supplier Changes' : 'Register New Supplier'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
