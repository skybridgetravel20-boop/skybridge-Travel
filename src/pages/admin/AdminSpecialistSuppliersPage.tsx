import React, { useState } from 'react';
import {
  Building2,
  Plane,
  Hotel,
  Shield,
  Compass,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  DollarSign,
  Key,
  Layers,
  Phone,
  Mail,
  PlusCircle,
  FileText,
  Lock,
  Bookmark
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { Supplier } from '../../types';

interface SpecialistProps {
  initialCategory?: 'Airline / Ticketing' | 'Umrah' | 'Hotel / Bedbank' | 'Insurance' | 'All';
  title?: string;
}

export const AdminSpecialistSuppliersPage: React.FC<SpecialistProps> = ({
  initialCategory = 'All',
  title = 'Specialist Travel Suppliers Matrix'
}) => {
  const { suppliers, supplierPrices, b2bPortals } = useCrm();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const filteredSuppliers = suppliers.filter(item => {
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Airline / Ticketing' && !item.category.includes('Airline') && !item.category.includes('Ticketing')) return false;
      if (selectedCategory === 'Umrah' && !item.category.includes('Umrah')) return false;
      if (selectedCategory === 'Hotel / Bedbank' && !item.category.includes('Hotel') && !item.category.includes('Bedbank')) return false;
      if (selectedCategory === 'Insurance' && !item.category.includes('Insurance')) return false;
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      const match =
        item.name.toLowerCase().includes(q) ||
        (item.companyName && item.companyName.toLowerCase().includes(q)) ||
        item.country.toLowerCase().includes(q) ||
        item.code.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              SECTIONS 8–15 • SUPPLIER MASTER
            </span>
            <span className="text-xs text-slate-500 font-medium">Wholesale Inventory & B2B Portals</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mt-1 flex items-center gap-2.5">
            <Building2 className="w-7 h-7 text-blue-600" />
            {title}
          </h1>
          <p className="text-slate-600 text-sm mt-1">
            Dedicated commercial directories for Flight GDS aggregators, FlyNow B2B, Umrah DMC operators, WebBeds hotel inventory, and Schengen travel insurance.
          </p>
        </div>
      </div>

      {/* FlyNow B2B Highlight Box */}
      <div className="bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-950 text-white p-5 rounded-2xl border border-blue-800/50 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-amber-400 text-slate-950">
              FEATURED PARTNER
            </span>
            <h3 className="font-bold text-base text-white">FlyNow B2B Travel Services (SUP-2026-00003)</h3>
          </div>
          <p className="text-xs text-blue-200/80 max-w-2xl leading-relaxed">
            Registered authorized agency login: <strong>SKYBRIDGE_TRAVEL_LHE</strong>. Advertised services include B2B domestic/international ticketing, Umrah packages, and visa processing support. Managed via secure authorized agent portal for manual quotation comparisons.
          </p>
        </div>

        <a
          href="https://b2b.flynow.pk/login"
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2 bg-blue-500 hover:bg-blue-400 text-slate-950 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
        >
          <span>Open Portal Login</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Category Pills Switcher */}
      <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto scrollbar-none">
        <div className="flex items-center gap-1.5 min-w-max">
          {[
            { label: 'All', icon: <Layers className="w-3.5 h-3.5" /> },
            { label: 'Airline / Ticketing', icon: <Plane className="w-3.5 h-3.5" /> },
            { label: 'Umrah', icon: <Compass className="w-3.5 h-3.5" /> },
            { label: 'Hotel / Bedbank', icon: <Hotel className="w-3.5 h-3.5" /> },
            { label: 'Insurance', icon: <Shield className="w-3.5 h-3.5" /> }
          ].map(tab => (
            <button
              key={tab.label}
              onClick={() => setSelectedCategory(tab.label)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                selectedCategory === tab.label
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search suppliers by name, company, code, or country..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Suppliers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredSuppliers.map(sup => (
          <div
            key={sup.id}
            className="bg-white rounded-2xl border border-slate-200/90 hover:border-blue-300 transition-all shadow-sm hover:shadow-md flex flex-col justify-between p-5 space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                      {sup.code || sup.id}
                    </span>
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-slate-100 text-slate-700">
                      {sup.country}
                    </span>
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mt-1 leading-snug">{sup.name}</h3>
                  <div className="text-xs text-slate-500 font-medium">{sup.companyName}</div>
                </div>

                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {sup.status}
                </span>
              </div>

              {/* Commercials Box */}
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Commercial Category:</span>
                  <strong className="text-slate-800">{sup.category}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Payment Terms:</span>
                  <strong className="text-slate-800">{sup.paymentTerms}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Credit Limit:</span>
                  <strong className="text-slate-800">{sup.currency} {sup.creditLimit?.toLocaleString()}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Current Balance:</span>
                  <strong className="text-emerald-700">{sup.currency} {sup.currentBalance?.toLocaleString()}</strong>
                </div>
              </div>

              {/* Services offered */}
              <div className="flex flex-wrap gap-1.5 text-[11px]">
                {sup.services?.map((svc, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium border">
                    {svc}
                  </span>
                ))}
              </div>

              {/* Portal Notes */}
              {sup.portalNotes && (
                <p className="text-xs text-slate-600 line-clamp-2 italic bg-slate-50/50 p-2 rounded-lg border border-slate-100">
                  "{sup.portalNotes}"
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{sup.phone || sup.whatsApp}</span>
              </div>

              <div className="flex items-center gap-2">
                {sup.portalUrl && (
                  <a
                    href={sup.portalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors flex items-center gap-1"
                  >
                    <span>Agent Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
