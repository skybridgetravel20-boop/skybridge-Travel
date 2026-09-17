import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useCrm } from '../../context/CrmContext';
import { SupplierPrice, SupplierCategory } from '../../types';
import {
  DollarSign,
  Search,
  Plus,
  TrendingUp,
  Plane,
  Building,
  Shield,
  Stamp,
  Package,
  Calendar,
  CheckCircle2,
  AlertCircle,
  X,
  Edit2,
  Trash2,
  Copy,
  Download,
  Filter,
  Lock,
  ArrowRight,
  ExternalLink,
  Layers,
  Sparkles,
  Calculator,
  RefreshCw,
  Clock,
  Building2,
  Share2
} from 'lucide-react';

const CATEGORIES: { label: string; value: SupplierCategory | 'All'; icon: React.ReactNode }[] = [
  { label: 'All Services', value: 'All', icon: <DollarSign className="w-4 h-4" /> },
  { label: 'Airline / Ticketing', value: 'Airline / Ticketing', icon: <Plane className="w-4 h-4" /> },
  { label: 'Hotel B2B', value: 'Hotel B2B', icon: <Building className="w-4 h-4" /> },
  { label: 'Visa Supplier', value: 'Visa Supplier', icon: <Stamp className="w-4 h-4" /> },
  { label: 'Insurance Provider', value: 'Insurance Provider', icon: <Shield className="w-4 h-4" /> },
  { label: 'Tour Operator', value: 'Tour Operator', icon: <Package className="w-4 h-4" /> },
  { label: 'Umrah Supplier', value: 'Umrah Supplier', icon: <Building2 className="w-4 h-4" /> },
  { label: 'Airport Transfer', value: 'Airport Transfer', icon: <Plane className="w-4 h-4" /> }
];

const CURRENCY_RATES_PKR: Record<string, number> = {
  PKR: 1,
  USD: 279.5,
  AED: 76.1,
  EUR: 304.2,
  GBP: 356.8,
  SAR: 74.5
};

export const AdminPriceCheckPage: React.FC = () => {
  const { supplierPrices, suppliers, addSupplierPrice, updateSupplierPrice, deleteSupplierPrice, auth } = useCrm();
  const location = useLocation();
  const navigate = useNavigate();

  // URL query param filter
  const queryParams = new URLSearchParams(location.search);
  const supplierFilterQuery = queryParams.get('supplier') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSupplier, setSelectedSupplier] = useState<string>(supplierFilterQuery || 'All');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingPrice, setEditingPrice] = useState<SupplierPrice | null>(null);

  // Form State
  const initialFormState: Partial<SupplierPrice> = {
    supplierId: suppliers[0]?.id || 'SUP-2026-00001',
    supplierName: suppliers[0]?.companyName || suppliers[0]?.name || 'Amadeus Global GDS',
    category: 'Airline / Ticketing',
    product: '',
    serviceTitle: '',
    destination: 'Dubai (DXB)',
    supplierCost: 75000,
    clientSellingPrice: 85000,
    recommendedSellingPrice: 85000,
    currency: 'PKR',
    exchangeRate: 1,
    pkrCost: 75000,
    profitMarginAmount: 10000,
    profitMarginPercent: 13.3,
    inclusions: 'Taxes included, 20kg check-in baggage, meal',
    exclusions: 'Seat selection, lounge access',
    bookingDeadline: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    cancellationPolicy: 'Refundable with PKR 10,000 airline fee',
    validityEnd: new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0],
    availability: 'Instant Confirm',
    source: 'Direct Portal',
    notes: 'Official wholesale rate for SkyBridge reservation desk.'
  };

  const [formData, setFormData] = useState<Partial<SupplierPrice>>(initialFormState);

  // Update supplier if URL changes
  useEffect(() => {
    if (supplierFilterQuery) {
      setSelectedSupplier(supplierFilterQuery);
    }
  }, [supplierFilterQuery]);

  // Recalculate margins and converted PKR cost
  const handlePriceChange = (field: 'supplierCost' | 'clientSellingPrice' | 'currency' | 'exchangeRate', value: any) => {
    setFormData(prev => {
      const next = { ...prev, [field]: value };
      const cost = field === 'supplierCost' ? Number(value) : (next.supplierCost || 0);
      const curr = field === 'currency' ? String(value) : (next.currency || 'PKR');
      const rate = field === 'exchangeRate' ? Number(value) : (CURRENCY_RATES_PKR[curr] || 1);

      const pkrCost = curr === 'PKR' ? cost : Math.round(cost * rate);
      const selling = field === 'clientSellingPrice' ? Number(value) : (next.clientSellingPrice || cost);

      const marginAmt = selling - cost;
      const marginPct = cost > 0 ? Math.round(((selling - cost) / cost) * 1000) / 10 : 0;

      return {
        ...next,
        exchangeRate: rate,
        pkrCost,
        profitMarginAmount: marginAmt,
        profitMarginPercent: marginPct,
        recommendedSellingPrice: selling
      };
    });
  };

  // Filtered List
  const filteredPrices = useMemo(() => {
    return supplierPrices.filter(p => {
      const itemTitle = (p.product || p.serviceTitle || '').toLowerCase();
      const dest = (p.destination || '').toLowerCase();
      const sName = (p.supplierName || '').toLowerCase();
      const q = searchQuery.toLowerCase();

      const matchesSearch = !searchQuery || itemTitle.includes(q) || dest.includes(q) || sName.includes(q);
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
      const matchesSupplier =
        selectedSupplier === 'All' ||
        p.supplierName.toLowerCase() === selectedSupplier.toLowerCase() ||
        p.supplierId === selectedSupplier;
      const matchesSource = selectedSource === 'All' || p.source === selectedSource;

      return matchesSearch && matchesCat && matchesSupplier && matchesSource;
    });
  }, [supplierPrices, searchQuery, selectedCategory, selectedSupplier, selectedSource]);

  // Handle Submit (Create or Update)
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const title = formData.product || formData.serviceTitle;
    if (!title) return;

    const supplierObj = suppliers.find(s => s.id === formData.supplierId || s.companyName === formData.supplierName || s.name === formData.supplierName);
    const payload: Partial<SupplierPrice> = {
      ...formData,
      product: title,
      serviceTitle: title,
      supplierName: supplierObj?.companyName || supplierObj?.name || formData.supplierName || 'SkyBridge Partner',
      supplierId: supplierObj?.id || formData.supplierId
    };

    if (editingPrice) {
      updateSupplierPrice(editingPrice.id, payload);
      setEditingPrice(null);
    } else {
      addSupplierPrice(payload);
      setIsAddModalOpen(false);
    }
    setFormData(initialFormState);
  };

  // Duplicate Price
  const handleDuplicate = (p: SupplierPrice) => {
    const duplicated: Partial<SupplierPrice> = {
      ...p,
      product: `${p.product || p.serviceTitle} (Copy)`,
      serviceTitle: `${p.product || p.serviceTitle} (Copy)`,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
    addSupplierPrice(duplicated);
  };

  // Copy to Quote / Package Builder
  const handleCopyToQuote = (p: SupplierPrice) => {
    const summary = `SkyBridge B2B Quote Item:
Service: ${p.product || p.serviceTitle}
Supplier: ${p.supplierName} (${p.category})
Cost: ${p.currency} ${(p.supplierCost || 0).toLocaleString()}
Client Selling Price: ${p.currency} ${(p.clientSellingPrice || p.recommendedSellingPrice || 0).toLocaleString()}
Destination: ${p.destination}
Inclusions: ${p.inclusions || 'Standard'}
Cancellation: ${p.cancellationPolicy || 'Standard policy'}`;

    navigator.clipboard.writeText(summary);
    setCopiedNotification(`Copied "${p.product || p.serviceTitle}" quote to clipboard & staged for Package Builder!`);
    setTimeout(() => setCopiedNotification(null), 4000);
  };

  // Export to CSV
  const handleExportCsv = () => {
    const headers = [
      'Price ID,Supplier,Product / Service,Category,Destination,Cost,Selling Price,Margin PKR,Margin %,Currency,Availability,Source,Last Updated'
    ];
    const rows = filteredPrices.map(p => [
      `"${p.id}"`,
      `"${p.supplierName.replace(/"/g, '""')}"`,
      `"${(p.product || p.serviceTitle).replace(/"/g, '""')}"`,
      `"${p.category}"`,
      `"${p.destination}"`,
      `"${p.supplierCost}"`,
      `"${p.clientSellingPrice || p.recommendedSellingPrice || p.supplierCost}"`,
      `"${p.profitMarginAmount || 0}"`,
      `"${p.profitMarginPercent || 0}%"`,
      `"${p.currency}"`,
      `"${p.availability || 'Instant Confirm'}"`,
      `"${p.source || 'Direct Portal'}"`,
      `"${p.lastUpdated || p.dateChecked || ''}"`
    ].join(','));

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `skybridge_b2b_prices_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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

      {/* Internal Security Guard */}
      <div className="bg-slate-900 border-l-4 border-emerald-500 rounded-2xl p-4 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Lock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                PRIVATE PRICING ENGINE
              </span>
              <h2 className="text-sm font-bold text-white">Confidential B2B Wholesale Rate Sheets</h2>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Wholesale supplier costs and agency profit margins are strictly confidential and never displayed on client quotes.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            to="/admin/price-comparison"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
          >
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            <span>Price Comparison</span>
          </Link>
          <Link
            to="/admin/calculator"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5 text-sky-400" />
            <span>Package Calculator</span>
          </Link>
        </div>
      </div>

      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">Supplier Prices & Rate Sheets</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
              {supplierPrices.length} Active Records
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Real-time wholesale flight inventory, B2B hotel rooms, visa tariffs, and tour operator costs with profit margins.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleExportCsv}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Rates CSV</span>
          </button>

          <button
            onClick={() => {
              setFormData(initialFormState);
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Rate Sheet Item</span>
          </button>
        </div>
      </div>

      {/* Active Supplier Filter Badge */}
      {selectedSupplier !== 'All' && (
        <div className="bg-sky-50 border border-sky-200 px-3.5 py-2 rounded-xl flex items-center justify-between text-xs text-[#0288D1]">
          <span className="font-semibold">
            Filtered by Supplier: <strong className="text-[#0B1B3B]">{selectedSupplier}</strong>
          </span>
          <button
            onClick={() => {
              setSelectedSupplier('All');
              navigate('/admin/price-check');
            }}
            className="font-bold underline hover:text-[#0B1B3B]"
          >
            Clear Supplier Filter
          </button>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex flex-wrap gap-1.5">
        {CATEGORIES.map(cat => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat.value
                ? 'bg-[#0B1B3B] text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Search & Secondary Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search flights, hotels, visa processing, destinations, or suppliers..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <select
            value={selectedSupplier}
            onChange={e => setSelectedSupplier(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Suppliers</option>
            {suppliers.map(s => (
              <option key={s.id} value={s.companyName || s.name}>
                {s.companyName || s.name}
              </option>
            ))}
          </select>

          <select
            value={selectedSource}
            onChange={e => setSelectedSource(e.target.value)}
            className="px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-semibold text-slate-700 focus:outline-none"
          >
            <option value="All">All Rate Sources</option>
            <option value="Direct Portal">Direct Portal</option>
            <option value="Excel Import">Excel Import</option>
            <option value="Google Sheet Sync">Google Sheet Sync</option>
            <option value="WhatsApp Quote">WhatsApp Quote</option>
          </select>
        </div>
      </div>

      {/* Main Prices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3.5 px-4">Service & Route</th>
                <th className="py-3.5 px-3">Supplier & Source</th>
                <th className="py-3.5 px-3">Supplier Cost (Net)</th>
                <th className="py-3.5 px-3">Selling Price (Quote)</th>
                <th className="py-3.5 px-3">Profit Margin</th>
                <th className="py-3.5 px-3">Validity / Cut-Off</th>
                <th className="py-3.5 px-3 text-center">Availability</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPrices.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <DollarSign className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                    <p className="font-semibold">No price records found for this query.</p>
                  </td>
                </tr>
              ) : (
                filteredPrices.map(p => {
                  const title = p.product || p.serviceTitle;
                  const cost = p.supplierCost || 0;
                  const selling = p.clientSellingPrice || p.recommendedSellingPrice || cost;
                  const marginAmt = p.profitMarginAmount !== undefined ? p.profitMarginAmount : selling - cost;
                  const marginPct = p.profitMarginPercent !== undefined ? p.profitMarginPercent : (cost > 0 ? Math.round(((selling - cost) / cost) * 100) : 0);

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-4 max-w-xs">
                        <div className="font-bold text-[#0B1B3B] line-clamp-1">{title}</div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                          <span className="font-semibold text-[#0288D1]">{p.destination}</span>
                          <span>•</span>
                          <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded font-mono text-slate-600">
                            {p.id}
                          </span>
                        </div>
                        {p.inclusions && (
                          <div className="text-[10px] text-slate-400 truncate mt-0.5">
                            Inc: {p.inclusions}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-bold text-slate-800">{p.supplierName}</div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-sky-50 text-[#0288D1] font-semibold">
                            {p.category}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {p.source || 'Direct'}
                          </span>
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-slate-900">
                          {p.currency} {cost.toLocaleString()}
                        </div>
                        {p.currency !== 'PKR' && p.pkrCost && (
                          <div className="text-[10px] text-slate-400 font-mono">
                            ≈ PKR {p.pkrCost.toLocaleString()}
                          </div>
                        )}
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-mono font-black text-[#0B1B3B]">
                          {p.currency} {selling.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-emerald-600 font-semibold">
                          Client Rate
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="font-mono font-bold text-emerald-600">
                          +{p.currency} {marginAmt.toLocaleString()}
                        </div>
                        <div className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded inline-block mt-0.5">
                          {marginPct}% markup
                        </div>
                      </td>

                      <td className="py-3 px-3">
                        <div className="text-[11px] font-semibold text-slate-700">
                          {p.validityEnd || p.bookingDeadline || p.validityDate || 'Open Season'}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {p.cancellationPolicy ? (
                            <span className="truncate max-w-[130px] inline-block">{p.cancellationPolicy}</span>
                          ) : (
                            'Non-refundable'
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-3 text-center">
                        <span
                          className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            p.availability === 'Instant Confirm'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : p.availability === 'On Request'
                              ? 'bg-amber-50 text-amber-700 border border-amber-200'
                              : 'bg-rose-50 text-rose-700 border border-rose-200'
                          }`}
                        >
                          {p.availability || 'Instant'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => handleCopyToQuote(p)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#0288D1] hover:bg-sky-50 transition-colors"
                            title="Copy to Quote / Package Builder"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              setEditingPrice(p);
                              setFormData(p);
                            }}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-[#0B1B3B] hover:bg-slate-100 transition-colors"
                            title="Edit Rate Sheet Item"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => handleDuplicate(p)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
                            title="Duplicate Rate"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete rate card "${p.product || p.serviceTitle}"?`)) {
                                deleteSupplierPrice(p.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                            title="Delete Rate"
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

      {/* Add / Edit Rate Modal */}
      {(isAddModalOpen || editingPrice) && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-100 max-h-[92vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-black text-[#0B1B3B]">
                  {editingPrice ? 'Edit B2B Rate Sheet Item' : 'Add New Supplier Price Rate'}
                </h2>
                <p className="text-xs text-slate-500">
                  Configure wholesale cost, profit margin, currency conversion, and booking deadlines.
                </p>
              </div>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingPrice(null);
                }}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Supplier *</label>
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
                        {s.companyName || s.name} ({s.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    {CATEGORIES.filter(c => c.value !== 'All').map(c => (
                      <option key={c.value} value={c.value}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Product / Service Title *</label>
                <input
                  type="text"
                  required
                  value={formData.product || formData.serviceTitle || ''}
                  onChange={e => setFormData({ ...formData, product: e.target.value, serviceTitle: e.target.value })}
                  placeholder="e.g. Dubai 5-Star Hotel - Atlantis The Palm - Deluxe King Room"
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination / Route</label>
                  <input
                    type="text"
                    value={formData.destination || ''}
                    onChange={e => setFormData({ ...formData, destination: e.target.value })}
                    placeholder="e.g. Dubai, UAE or ISB -> DXB"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Price Source</label>
                  <select
                    value={formData.source}
                    onChange={e => setFormData({ ...formData, source: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value="Direct Portal">Direct Portal</option>
                    <option value="Excel Import">Excel Import</option>
                    <option value="Google Sheet Sync">Google Sheet Sync</option>
                    <option value="WhatsApp Quote">WhatsApp Quote</option>
                  </select>
                </div>
              </div>

              {/* Pricing Math Box */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                    Wholesale Cost & Markup Calculations
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">Auto-calculated</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Currency</label>
                    <select
                      value={formData.currency}
                      onChange={e => handlePriceChange('currency', e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none"
                    >
                      {Object.keys(CURRENCY_RATES_PKR).map(c => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Supplier Net Cost *</label>
                    <input
                      type="number"
                      required
                      value={formData.supplierCost || 0}
                      onChange={e => handlePriceChange('supplierCost', e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Client Selling Price *</label>
                    <input
                      type="number"
                      required
                      value={formData.clientSellingPrice || formData.recommendedSellingPrice || 0}
                      onChange={e => handlePriceChange('clientSellingPrice', e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl font-mono focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Markup (PKR / %)</label>
                    <div className="px-3 py-2 text-xs bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl font-mono font-bold">
                      +{formData.profitMarginAmount?.toLocaleString()} ({formData.profitMarginPercent}%)
                    </div>
                  </div>
                </div>

                {formData.currency !== 'PKR' && (
                  <div className="text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200">
                    <span>
                      Estimated PKR Cost: <strong>PKR {formData.pkrCost?.toLocaleString()}</strong>
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Rate: 1 {formData.currency} = {formData.exchangeRate} PKR
                    </span>
                  </div>
                )}
              </div>

              {/* Inclusions & Policies */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Inclusions</label>
                  <input
                    type="text"
                    value={formData.inclusions || ''}
                    onChange={e => setFormData({ ...formData, inclusions: e.target.value })}
                    placeholder="e.g. Daily buffet breakfast, airport pickup, taxes"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Cancellation Policy</label>
                  <input
                    type="text"
                    value={formData.cancellationPolicy || ''}
                    onChange={e => setFormData({ ...formData, cancellationPolicy: e.target.value })}
                    placeholder="e.g. Free cancellation up to 48 hours prior"
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Validity / End Date</label>
                  <input
                    type="date"
                    value={formData.validityEnd || ''}
                    onChange={e => setFormData({ ...formData, validityEnd: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Availability Status</label>
                  <select
                    value={formData.availability}
                    onChange={e => setFormData({ ...formData, availability: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                  >
                    <option value="Instant Confirm">Instant Confirm</option>
                    <option value="On Request">On Request</option>
                    <option value="Sold Out">Sold Out</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Internal Notes</label>
                <textarea
                  rows={2}
                  value={formData.notes || ''}
                  onChange={e => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Private notes for staff, promo codes, direct desk contacts..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingPrice(null);
                  }}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
                >
                  {editingPrice ? 'Save Rate Changes' : 'Add to Rate Database'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
