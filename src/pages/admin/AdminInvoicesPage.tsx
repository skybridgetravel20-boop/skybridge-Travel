import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { Invoice } from '../../types';
import { SkyBridgeLogo } from '../../components/SkyBridgeLogo';
import {
  FileText,
  Plus,
  Search,
  Printer,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  X,
  CreditCard,
  Building
} from 'lucide-react';

export const AdminInvoicesPage: React.FC = () => {
  const { invoices, createInvoice, updateInvoiceStatus } = useCrm();
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Invoice Form
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [serviceDescription, setServiceDescription] = useState('Tourist Visa Dossier & Hotel Vouchers');
  const [totalAmount, setTotalAmount] = useState<number>(120000);
  const [paidAmount, setPaidAmount] = useState<number>(0);
  const [currency, setCurrency] = useState('PKR');

  const filteredInvoices = invoices.filter(inv => {
    const matchesStatus = filterStatus === 'All' || inv.status === filterStatus;
    const matchesSearch =
      inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inv.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const totalBilled = invoices.reduce((sum, i) => sum + i.total, 0);
  const totalReceived = invoices.reduce((sum, i) => sum + i.paidAmount, 0);
  const totalOutstanding = invoices.reduce((sum, i) => sum + i.balanceDue, 0);

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) return;
    createInvoice({
      customerName,
      customerEmail,
      customerPhone,
      currency,
      items: [
        {
          description: serviceDescription,
          category: 'Package',
          quantity: 1,
          unitPrice: totalAmount,
          total: totalAmount
        }
      ],
      total: totalAmount,
      paidAmount,
      status: paidAmount >= totalAmount ? 'Paid' : paidAmount > 0 ? 'Partial' : 'Sent'
    });
    setIsAddModalOpen(false);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
  };

  const handlePrintModal = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">Invoices & Billing</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E3F2FD] text-[#0288D1]">
              {invoices.length} Invoices
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Customer quota, payment receipts, outstanding balances, and official branded invoices.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors shadow-sm self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Invoice</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-slate-400 uppercase block mb-1">
            Total Billed
          </span>
          <div className="text-xl font-black text-[#0B1B3B] font-mono">
            PKR {totalBilled.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 block">All issued client statements</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-emerald-600 uppercase block mb-1">
            Total Collected
          </span>
          <div className="text-xl font-black text-emerald-700 font-mono">
            PKR {totalReceived.toLocaleString()}
          </div>
          <span className="text-[10px] text-emerald-600 mt-1 block">Verified received funds</span>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
          <span className="text-[11px] font-bold text-rose-600 uppercase block mb-1">
            Outstanding Due
          </span>
          <div className="text-xl font-black text-rose-700 font-mono">
            PKR {totalOutstanding.toLocaleString()}
          </div>
          <span className="text-[10px] text-rose-600 mt-1 block">Receivable customer quota</span>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
          {['All', 'Paid', 'Partial', 'Sent', 'Overdue'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-colors ${
                filterStatus === status
                  ? 'bg-[#0B1B3B] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search invoice number, client..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Invoice #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Issue Date</th>
                <th className="py-3 px-4">Due Date</th>
                <th className="py-3 px-4 text-right">Total Amount</th>
                <th className="py-3 px-4 text-right">Paid</th>
                <th className="py-3 px-4 text-right">Balance Due</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map(inv => (
                <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-[#0B1B3B]">
                    {inv.invoiceNumber}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{inv.customerName}</div>
                    <div className="text-[11px] text-slate-400">{inv.customerPhone}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-600">{inv.issueDate}</td>
                  <td className="py-3 px-4 text-slate-600">{inv.dueDate}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-slate-900">
                    {inv.currency} {inv.total.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-medium text-emerald-600">
                    {inv.currency} {inv.paidAmount.toLocaleString()}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-rose-600">
                    {inv.currency} {inv.balanceDue.toLocaleString()}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        inv.status === 'Paid'
                          ? 'bg-emerald-100 text-emerald-800'
                          : inv.status === 'Partial'
                          ? 'bg-amber-100 text-amber-800'
                          : inv.status === 'Overdue'
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-sky-100 text-sky-800'
                      }`}
                    >
                      {inv.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0B1B3B] hover:text-white text-slate-600 transition-colors"
                      title="View & Print Official Invoice"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Invoice View Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto print:border-none print:shadow-none print:max-w-none">
            {/* Modal Controls */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4 print:hidden">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrintModal}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold hover:bg-slate-50"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                {selectedInvoice.status !== 'Paid' && (
                  <button
                    onClick={() => {
                      updateInvoiceStatus(selectedInvoice.id, 'Paid');
                      setSelectedInvoice({ ...selectedInvoice, status: 'Paid', balanceDue: 0, paidAmount: selectedInvoice.total });
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Mark as Fully Paid</span>
                  </button>
                )}
              </div>
              <button onClick={() => setSelectedInvoice(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Printable Invoice Document */}
            <div className="p-4 space-y-5">
              {/* Brand Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <SkyBridgeLogo size="md" />
                <div className="text-right text-xs">
                  <div className="font-mono font-black text-base text-[#0B1B3B]">
                    {selectedInvoice.invoiceNumber}
                  </div>
                  <div className="text-slate-400">Date: {selectedInvoice.issueDate}</div>
                  <div className="text-slate-400">Due: {selectedInvoice.dueDate}</div>
                </div>
              </div>

              {/* Bill To */}
              <div className="bg-slate-50 rounded-2xl p-4 text-xs">
                <div className="text-[10px] font-bold text-slate-400 uppercase mb-1">Billed To:</div>
                <div className="text-sm font-bold text-[#0B1B3B]">{selectedInvoice.customerName}</div>
                <div className="text-slate-600">{selectedInvoice.customerEmail}</div>
                <div className="text-slate-600">{selectedInvoice.customerPhone}</div>
              </div>

              {/* Items List */}
              <div className="space-y-2 text-xs">
                <div className="grid grid-cols-12 font-bold text-slate-400 uppercase text-[10px] pb-1 border-b border-slate-200">
                  <div className="col-span-8">Description</div>
                  <div className="col-span-4 text-right">Amount</div>
                </div>
                {selectedInvoice.items.map((it, idx) => (
                  <div key={idx} className="grid grid-cols-12 py-1.5 border-b border-slate-100">
                    <div className="col-span-8 text-slate-800 font-medium">{it.description}</div>
                    <div className="col-span-4 text-right font-mono font-bold text-slate-900">
                      {selectedInvoice.currency} {it.total.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="bg-[#0B1B3B] text-white rounded-2xl p-4 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal:</span>
                  <span className="font-mono">{selectedInvoice.currency} {selectedInvoice.subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Paid to date:</span>
                  <span className="font-mono text-emerald-400">
                    -{selectedInvoice.currency} {selectedInvoice.paidAmount.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-[#4FC3F7] pt-2 border-t border-white/10">
                  <span>Balance Due:</span>
                  <span className="font-mono">
                    {selectedInvoice.currency} {selectedInvoice.balanceDue.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Official Footer */}
              <div className="text-center text-[11px] text-slate-400 pt-2">
                <p>SkyBridge Travel & Tourism (Pvt) Ltd. • Faisal Town, Lahore, Pakistan</p>
                <p>WhatsApp: +92 300 0000000 • Web: skybridgetravel.pk</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Invoice Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
              <h2 className="text-lg font-black text-[#0B1B3B]">Create New Invoice</h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq Mehmood"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Email</label>
                  <input
                    type="email"
                    placeholder="client@mail.com"
                    value={customerEmail}
                    onChange={e => setCustomerEmail(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone</label>
                  <input
                    type="text"
                    placeholder="+92 300 1234567"
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Service Description *</label>
                <input
                  type="text"
                  required
                  value={serviceDescription}
                  onChange={e => setServiceDescription(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Total Bill *</label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={totalAmount}
                    onChange={e => setTotalAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Initial Paid Amount</label>
                  <input
                    type="number"
                    min="0"
                    value={paidAmount}
                    onChange={e => setPaidAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
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
                  Generate Invoice
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
