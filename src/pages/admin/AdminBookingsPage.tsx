import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import {
  CreditCard,
  Plane,
  Building2,
  Compass,
  Moon,
  Search,
  CheckCircle2,
  Clock,
  Plus,
  DollarSign
} from 'lucide-react';

export const AdminBookingsPage: React.FC = () => {
  const { bookings, payments, updateBookingStatus, updatePaymentStatus } = useCrm();
  const [activeTab, setActiveTab] = useState<'bookings' | 'payments'>('bookings');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBookings = bookings.filter(b => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const ref = b.pnrReference || b.supplierReference || b.bookingRef || '';
    return (
      (b.id && b.id.toLowerCase().includes(q)) ||
      (b.customerName && b.customerName.toLowerCase().includes(q)) ||
      ref.toLowerCase().includes(q) ||
      (b.service && b.service.toLowerCase().includes(q))
    );
  });

  const filteredPayments = payments.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const ref = p.transactionReference || p.transactionRef || '';
    const method = p.paymentMethod || p.method || '';
    return (
      (p.id && p.id.toLowerCase().includes(q)) ||
      (p.customerName && p.customerName.toLowerCase().includes(q)) ||
      ref.toLowerCase().includes(q) ||
      method.toLowerCase().includes(q)
    );
  });

  const totalBookingsValue = bookings.reduce((sum, b) => sum + (b.finalAmount ?? b.quotedAmount ?? b.totalAmount ?? 0), 0);
  const totalPaid = payments.filter(p => (p.paymentStatus === 'Paid' || p.status === 'Paid')).reduce((sum, p) => sum + (p.amount ?? 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">
            Bookings & Commercial Accounts
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Confirmed airline PNRs, hotel reservation vouchers, tour dossiers, and billing transactions.
          </p>
        </div>

        {/* Tab switch */}
        <div className="bg-slate-200/80 p-1 rounded-xl flex items-center gap-1 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'bookings'
                ? 'bg-white text-[#0B1B3B] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Confirmed Bookings ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'payments'
                ? 'bg-white text-[#0B1B3B] shadow-2xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Payment Invoices ({payments.length})
          </button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Booked Volume</span>
          <div className="text-2xl font-black text-[#0B1B3B] mt-1 font-mono">
            {Number(totalBookingsValue || 0) > 0 ? `$${Number(totalBookingsValue).toLocaleString()}` : '$0'}
          </div>
          <div className="text-[10px] text-slate-500">Gross reservation values</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Received Payments</span>
          <div className="text-2xl font-black text-emerald-600 mt-1 font-mono">
            {Number(totalPaid || 0) > 0 ? `$${Number(totalPaid).toLocaleString()}` : '$0'}
          </div>
          <div className="text-[10px] text-slate-500">Cleared through bank or card</div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active PNR Files</span>
          <div className="text-2xl font-black text-[#4FC3F7] mt-1 font-mono">
            {bookings.filter(b => b.bookingStatus === 'Confirmed' || b.status === 'Confirmed').length}
          </div>
          <div className="text-[10px] text-slate-500">Confirmed travel itineraries</div>
        </div>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder={activeTab === 'bookings' ? 'Search by PNR, booking ID, client...' : 'Search transaction ref, invoice...'}
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:outline-none focus:border-[#4FC3F7]"
          />
        </div>
      </div>

      {/* BOOKINGS TABLE */}
      {activeTab === 'bookings' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Booking ID</th>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Service Category</th>
                  <th className="py-3 px-4">Supplier Reference / PNR</th>
                  <th className="py-3 px-4">Travel Dates</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredBookings.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No bookings match your search query.
                    </td>
                  </tr>
                ) : (
                  filteredBookings.map(b => (
                    <tr key={b.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0B1B3B]">{b.id}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{b.customerName}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-semibold">{b.service}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded bg-slate-100 font-mono font-bold text-slate-800">
                          {b.pnrReference || b.supplierReference || b.bookingRef || 'Pending PNR'}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                        {b.travelDate || b.travelDates || 'TBD'}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        ${Number(b.finalAmount ?? b.quotedAmount ?? b.totalAmount ?? 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={b.bookingStatus || b.status || 'Quote Sent'}
                          onChange={e => updateBookingStatus(b.id, e.target.value as any)}
                          className="px-2 py-1 text-[11px] font-bold rounded-lg border focus:outline-none bg-slate-50"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Pending">Pending</option>
                          <option value="Cancelled">Cancelled</option>
                          <option value="Quote Sent">Quote Sent</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PAYMENTS TABLE */}
      {activeTab === 'payments' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="py-3 px-4">Payment ID</th>
                  <th className="py-3 px-4">Customer Name</th>
                  <th className="py-3 px-4">Payment Method</th>
                  <th className="py-3 px-4">Bank / Transaction Ref</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-400">
                      No payment invoices match your search query.
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0B1B3B]">{p.id}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-900">{p.customerName}</td>
                      <td className="py-3.5 px-4 font-medium text-slate-700">
                        {p.paymentMethod || p.method || 'Standard'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-600">
                        {p.transactionReference || p.transactionRef || 'N/A'}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                        {p.paymentDate || p.date || 'Recent'}
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-emerald-700">
                        ${Number(p.amount ?? 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <select
                          value={p.paymentStatus || p.status || 'Paid'}
                          onChange={e => updatePaymentStatus(p.id, e.target.value as any)}
                          className={`px-2 py-1 text-[11px] font-bold rounded-lg border focus:outline-none ${
                            (p.paymentStatus === 'Paid' || p.status === 'Paid') ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                            (p.paymentStatus === 'Pending' || p.status === 'Pending') ? 'bg-amber-50 text-amber-800 border-amber-300' :
                            'bg-rose-50 text-rose-800 border-rose-300'
                          }`}
                        >
                          <option value="Paid">Paid</option>
                          <option value="Pending">Pending</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
