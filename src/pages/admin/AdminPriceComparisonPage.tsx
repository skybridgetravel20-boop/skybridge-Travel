import React, { useState, useMemo } from 'react';
import { useCrm } from '../../context/CrmContext';
import { SupplierPrice, SupplierCategory } from '../../types';
import {
  TrendingUp,
  Search,
  DollarSign,
  Star,
  CheckCircle2,
  Award,
  Sparkles,
  ArrowRight,
  Calculator,
  Copy,
  Layers,
  Plane,
  Building,
  Stamp,
  Shield,
  Package,
  Building2,
  ExternalLink,
  ChevronRight,
  TrendingDown
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const POPULAR_SEARCHES = [
  'Dubai',
  'ISB to DXB',
  'Istanbul',
  'Tourist Visa',
  'Umrah',
  'Atlantis',
  'Baku'
];

const CURRENCY_RATES: Record<string, number> = {
  PKR: 1,
  USD: 279.5,
  AED: 76.1,
  EUR: 304.2,
  GBP: 356.8,
  SAR: 74.5
};

export const AdminPriceComparisonPage: React.FC = () => {
  const { supplierPrices, suppliers } = useCrm();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('Dubai');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedNotification, setCopiedNotification] = useState<string | null>(null);

  // Normalize cost in PKR
  const getCostInPKR = (p: SupplierPrice) => {
    const cost = p.supplierCost || 0;
    const rate = CURRENCY_RATES[p.currency] || 1;
    return Math.round(cost * rate);
  };

  const getSellingInPKR = (p: SupplierPrice) => {
    const selling = p.clientSellingPrice || p.recommendedSellingPrice || p.supplierCost || 0;
    const rate = CURRENCY_RATES[p.currency] || 1;
    return Math.round(selling * rate);
  };

  // Filter prices matching search query
  const matchingPrices = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();

    return supplierPrices.filter(p => {
      const title = (p.product || p.serviceTitle || '').toLowerCase();
      const dest = (p.destination || '').toLowerCase();
      const sName = (p.supplierName || '').toLowerCase();
      const cat = (p.category || '').toLowerCase();

      const matchesQ = title.includes(q) || dest.includes(q) || sName.includes(q) || cat.includes(q);
      const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;

      return matchesQ && matchesCat;
    });
  }, [supplierPrices, searchQuery, selectedCategory]);

  // Sort by lowest cost in PKR
  const sortedPrices = useMemo(() => {
    return [...matchingPrices].sort((a, b) => getCostInPKR(a) - getCostInPKR(b));
  }, [matchingPrices]);

  const lowestCost = sortedPrices.length > 0 ? getCostInPKR(sortedPrices[0]) : 0;
  const highestCost = sortedPrices.length > 0 ? getCostInPKR(sortedPrices[sortedPrices.length - 1]) : 0;
  const maxSavings = highestCost > lowestCost ? highestCost - lowestCost : 0;

  // Copy Comparison Summary
  const handleCopyComparison = () => {
    if (sortedPrices.length === 0) return;

    let text = `SkyBridge B2B Price Intelligence Summary for: "${searchQuery}"\n`;
    text += `Total Suppliers Compared: ${sortedPrices.length}\n`;
    text += `Best Wholesale Price: PKR ${lowestCost.toLocaleString()} (via ${sortedPrices[0].supplierName})\n\n`;

    sortedPrices.forEach((p, idx) => {
      const costPKR = getCostInPKR(p);
      const sellPKR = getSellingInPKR(p);
      const margin = sellPKR - costPKR;
      text += `${idx + 1}. ${p.supplierName} - ${p.product || p.serviceTitle}\n`;
      text += `   Wholesale Cost: ${p.currency} ${p.supplierCost.toLocaleString()} (PKR ${costPKR.toLocaleString()})\n`;
      text += `   Quote Selling: PKR ${sellPKR.toLocaleString()} | Margin: +PKR ${margin.toLocaleString()}\n`;
      text += `   Availability: ${p.availability || 'Instant'}\n\n`;
    });

    navigator.clipboard.writeText(text);
    setCopiedNotification('Comparison summary copied to clipboard!');
    setTimeout(() => setCopiedNotification(null), 3000);
  };

  // Select for package builder
  const handleSelectForPackage = (p: SupplierPrice) => {
    navigate(`/admin/calculator?service=${encodeURIComponent(p.product || p.serviceTitle)}&cost=${p.supplierCost}&supplier=${encodeURIComponent(p.supplierName)}`);
  };

  return (
    <div className="space-y-6">
      {/* Toast */}
      {copiedNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0B1B3B] text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-sky-400">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-semibold">{copiedNotification}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">Supplier Price Comparison Engine</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E8F5E9] text-[#2E7D32]">
              Wholesale Margin Optimization
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Compare wholesale rates across all contracted suppliers, identify the lowest net cost, and maximize agency markup.
          </p>
        </div>

        {sortedPrices.length > 0 && (
          <button
            onClick={handleCopyComparison}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto"
          >
            <Copy className="w-4 h-4 text-[#0288D1]" />
            <span>Copy Comparison Summary</span>
          </button>
        )}
      </div>

      {/* Search & Keyword Pills */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="relative">
          <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Enter route or product (e.g. 'Dubai', 'ISB to DXB', 'Istanbul 4-Star', 'Umrah', 'Visa')..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7] font-semibold text-slate-900"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase">Quick Searches:</span>
          {POPULAR_SEARCHES.map(tag => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors ${
                searchQuery.toLowerCase() === tag.toLowerCase()
                  ? 'bg-[#0B1B3B] text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Intelligence Metric Strip */}
      {sortedPrices.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl text-emerald-950">
            <div className="flex items-center justify-between text-xs font-bold text-emerald-800 mb-1">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Lowest Net Rate</span>
              </span>
              <span className="font-mono">{sortedPrices[0].currency} {sortedPrices[0].supplierCost.toLocaleString()}</span>
            </div>
            <div className="text-xl font-black text-emerald-900 font-mono">
              PKR {lowestCost.toLocaleString()}
            </div>
            <p className="text-[11px] text-emerald-700 font-semibold mt-1">
              Offered by <strong>{sortedPrices[0].supplierName}</strong>
            </p>
          </div>

          <div className="bg-sky-50 border border-sky-200 p-4 rounded-2xl text-sky-950">
            <div className="flex items-center justify-between text-xs font-bold text-[#0288D1] mb-1">
              <span>Potential Margin Spread</span>
              <TrendingUp className="w-4 h-4 text-[#0288D1]" />
            </div>
            <div className="text-xl font-black text-[#0B1B3B] font-mono">
              PKR {maxSavings.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-600 font-semibold mt-1">
              Cost difference between highest & lowest supplier
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl text-slate-900">
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-1">
              <span>Suppliers Competing</span>
              <Building2 className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl font-black text-[#0B1B3B]">
              {sortedPrices.length} Options
            </div>
            <p className="text-[11px] text-slate-500 font-semibold mt-1">
              Across contracted B2B partners
            </p>
          </div>
        </div>
      )}

      {/* Comparison Grid */}
      <div className="space-y-4">
        {sortedPrices.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400">
            <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-xs">No supplier prices found for "{searchQuery}".</p>
            <p className="text-[11px] text-slate-400 mt-1">Try another keyword or add a new rate sheet item.</p>
          </div>
        ) : (
          sortedPrices.map((p, idx) => {
            const isLowest = idx === 0;
            const costPKR = getCostInPKR(p);
            const sellPKR = getSellingInPKR(p);
            const marginPKR = sellPKR - costPKR;
            const marginPct = costPKR > 0 ? Math.round((marginPKR / costPKR) * 1000) / 10 : 0;
            const differenceFromLowest = costPKR - lowestCost;

            return (
              <div
                key={p.id}
                className={`bg-white rounded-2xl p-5 border transition-all shadow-sm ${
                  isLowest
                    ? 'border-emerald-400 ring-2 ring-emerald-400/20 shadow-md'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  {/* Left Column: Title & Supplier */}
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      {isLowest && (
                        <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
                          <Award className="w-3 h-3 text-emerald-600" />
                          <span>LOWEST COST SUPPLIER</span>
                        </span>
                      )}
                      <span className="px-2 py-0.5 rounded bg-sky-50 text-[#0288D1] font-bold text-[10px]">
                        {p.category}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {p.id}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#0B1B3B]">
                      {p.product || p.serviceTitle}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-600">
                      <span className="font-semibold text-slate-800">
                        Supplier: <strong className="text-[#0B1B3B]">{p.supplierName}</strong>
                      </span>
                      <span>•</span>
                      <span>Destination: <strong>{p.destination}</strong></span>
                      <span>•</span>
                      <span>Source: {p.source || 'Direct Portal'}</span>
                    </div>

                    {p.inclusions && (
                      <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-xl mt-1">
                        <strong className="text-slate-700">Inclusions:</strong> {p.inclusions}
                      </p>
                    )}
                  </div>

                  {/* Middle Column: Pricing Comparison */}
                  <div className="flex flex-wrap items-center gap-4 lg:gap-8 bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Wholesale Cost</span>
                      <div className="font-mono font-black text-slate-900 text-sm">
                        {p.currency} {p.supplierCost.toLocaleString()}
                      </div>
                      {p.currency !== 'PKR' && (
                        <div className="text-[11px] font-mono font-bold text-[#0288D1]">
                          ≈ PKR {costPKR.toLocaleString()}
                        </div>
                      )}
                      {differenceFromLowest > 0 && (
                        <div className="text-[10px] text-rose-500 font-bold mt-0.5">
                          +PKR {differenceFromLowest.toLocaleString()} vs lowest
                        </div>
                      )}
                    </div>

                    <div className="border-l border-slate-200 pl-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Quote Selling</span>
                      <div className="font-mono font-black text-[#0B1B3B] text-sm">
                        PKR {sellPKR.toLocaleString()}
                      </div>
                      <div className="text-[10px] text-emerald-600 font-semibold">
                        Recommended retail
                      </div>
                    </div>

                    <div className="border-l border-slate-200 pl-4">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Agency Profit</span>
                      <div className="font-mono font-bold text-emerald-600 text-sm">
                        +PKR {marginPKR.toLocaleString()}
                      </div>
                      <div className="text-[10px] font-bold text-emerald-700 bg-emerald-100/60 px-1.5 py-0.5 rounded inline-block">
                        {marginPct}% markup
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Actions */}
                  <div className="flex items-center gap-2 lg:flex-col shrink-0 justify-end">
                    <button
                      onClick={() => handleSelectForPackage(p)}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors shadow-sm"
                    >
                      <Calculator className="w-3.5 h-3.5" />
                      <span>Select for Quote</span>
                    </button>

                    <Link
                      to={`/admin/suppliers?search=${encodeURIComponent(p.supplierName)}`}
                      className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold text-center"
                    >
                      Supplier Profile
                    </Link>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
