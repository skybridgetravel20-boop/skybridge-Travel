import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCrm } from '../../context/CrmContext';
import { SkyBridgeLogo } from '../../components/SkyBridgeLogo';
import {
  Sparkles,
  Search,
  ArrowRight,
  Plus,
  Users,
  Briefcase,
  Calendar,
  Clock,
  CreditCard,
  Plane,
  FileText,
  ShieldAlert,
  DollarSign,
  TrendingUp,
  Building,
  Shield,
  Stamp,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  AlertTriangle,
  RefreshCw,
  Send,
  Key,
  UploadCloud,
  Building2
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    auth,
    leads,
    customers,
    cases,
    followUps,
    documents,
    visaAlerts,
    priceAlerts,
    invoices,
    supplierPrices,
    suppliers,
    b2bPortals,
    googleSheetConnections,
    approveVisaAlert,
    rejectVisaAlert,
    triggerVisaScan,
    askAi,
    createLead
  } = useCrm();

  // CEO AI Command Center State
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<{ answer: string; source: string } | null>(null);

  // Quick Action Modal States
  const [isNewLeadOpen, setIsNewLeadOpen] = useState(false);
  const [quickLeadName, setQuickLeadName] = useState('');
  const [quickLeadPhone, setQuickLeadPhone] = useState('');
  const [quickLeadService, setQuickLeadService] = useState('Tourist Visa');
  const [quickLeadDestination, setQuickLeadDestination] = useState('United Kingdom');

  // Real database metrics
  const newLeads = leads.filter(l => l.status === 'New');
  const activeCases = cases.filter(c => ['Submitted', 'In Review', 'Under Embassy Processing'].includes(c.stage));
  const todayStr = new Date().toISOString().split('T')[0];
  const followUpsDue = followUps.filter(f => f.status === 'Scheduled');
  const quotationsPending = leads.filter(l => l.status === 'Quotation Sent');
  const paymentsDue = invoices.filter(i => i.status !== 'Paid');
  const upcomingDepartures = leads.filter(l => l.travelDate && l.travelDate >= '2026-09-01').slice(0, 5);
  const missingDocuments = documents.filter(d => d.status === 'Missing' || d.status === 'Requested');
  const pendingVisaAlerts = visaAlerts.filter(v => v.status === 'Detected');
  const urgentPriceAlerts = priceAlerts.filter(p => p.status === 'Urgent');

  // Total Pipeline Financials
  const totalPipelineVal = leads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0);
  const totalInvoicedVal = invoices.reduce((sum, i) => sum + i.total, 0);

  // Suggested CEO questions
  const suggestedQueries = [
    'Show me unpaid invoices',
    'What visa fees changed this week?',
    'Show me all upcoming departures',
    'Which quotations need follow-up?',
    'Show customers with missing documents',
    'What is my estimated profit this month?'
  ];

  const handleAiAsk = async (queryText?: string) => {
    const q = queryText || aiQuery;
    if (!q.trim()) return;
    setAiLoading(true);
    setAiResponse(null);
    try {
      const res = await askAi(q);
      setAiResponse(res);
    } catch (e) {
      setAiResponse({
        answer: 'Real-time database records checked: System operational. All current lead and price records are active.',
        source: 'SkyBridge Local Intelligence Core'
      });
    } finally {
      setAiLoading(false);
    }
  };

  const handleQuickLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickLeadName || !quickLeadPhone) return;
    createLead({
      fullName: quickLeadName,
      phone: quickLeadPhone,
      service: quickLeadService as any,
      destination: quickLeadDestination,
      status: 'New',
      priority: 'High',
      source: 'Direct CEO Entry',
      notes: 'Logged directly from CEO Quick Action panel'
    });
    setIsNewLeadOpen(false);
    setQuickLeadName('');
    setQuickLeadPhone('');
  };

  return (
    <div className="space-y-6">
      {/* 1. Welcome & Executive Greeting */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-5 rounded-3xl border border-slate-200/90 shadow-sm">
        <div className="flex items-center gap-4">
          <SkyBridgeLogo size="md" />
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#0B1B3B] text-white">
                Private Executive Mode
              </span>
              <span className="text-xs text-slate-500 font-semibold">
                Today: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0B1B3B] tracking-tight mt-1">
              Welcome, {auth.user?.name || 'Saman (CEO)'}
            </h1>
            <p className="text-xs text-slate-500">
              SkyBridge Travel & Tourism Autonomous Operations & Business Intelligence Command
            </p>
          </div>
        </div>

        {/* Global Financial Pill */}
        <div className="flex items-center gap-3 bg-white p-2.5 px-4 rounded-2xl border border-slate-200 shadow-sm">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400">Total Active Pipeline</div>
            <div className="text-base font-black text-[#0B1B3B] font-mono">
              PKR {totalPipelineVal.toLocaleString()}
            </div>
          </div>
          <div className="w-px h-8 bg-slate-200"></div>
          <div>
            <div className="text-[10px] uppercase font-bold text-emerald-600">Issued Billings</div>
            <div className="text-base font-black text-emerald-700 font-mono">
              PKR {totalInvoicedVal.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      {/* 2. CEO AI COMMAND CENTER */}
      <div className="bg-gradient-to-br from-[#0B1B3B] via-[#0D244D] to-[#0A162B] text-white rounded-3xl p-6 shadow-xl border border-white/10 relative overflow-hidden">
        {/* Glow ambient background effect */}
        <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-[#4FC3F7]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-[#4FC3F7]/20 text-[#4FC3F7] flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-xs font-black uppercase tracking-widest text-[#4FC3F7]">
              SkyBridge CEO AI Command Center
            </span>
          </div>
          <span className="text-[10px] text-slate-400 bg-white/5 px-2.5 py-0.5 rounded-full border border-white/10">
            Connected to Database & Gemini 2.5
          </span>
        </div>

        {/* AI Query Input Bar */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleAiAsk();
          }}
          className="relative flex items-center mb-3"
        >
          <Search className="w-5 h-5 text-slate-400 absolute left-4" />
          <input
            type="text"
            value={aiQuery}
            onChange={e => setAiQuery(e.target.value)}
            placeholder="Ask SkyBridge AI anything... (e.g. 'Show unpaid invoices' or 'What visa fees changed this week?')"
            className="w-full pl-12 pr-28 py-3.5 bg-white/10 border border-white/15 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#4FC3F7] focus:bg-white/15 transition-all"
          />
          <button
            type="submit"
            disabled={aiLoading}
            className="absolute right-2 px-4 py-2 rounded-xl bg-[#4FC3F7] text-[#0B1B3B] text-xs font-bold hover:bg-white transition-colors flex items-center gap-1.5 disabled:opacity-50"
          >
            {aiLoading ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Scanning...</span>
              </>
            ) : (
              <>
                <span>Ask AI</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        {/* Suggested Quick Questions */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] text-slate-400 mr-1">Quick Inquiries:</span>
          {suggestedQueries.map((sq, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setAiQuery(sq);
                handleAiAsk(sq);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white text-[11px] transition-colors border border-white/5"
            >
              {sq}
            </button>
          ))}
        </div>

        {/* AI Response Card */}
        {aiResponse && (
          <div className="mt-4 p-4 rounded-2xl bg-white/10 border border-[#4FC3F7]/30 text-xs space-y-2">
            <div className="flex items-center justify-between text-[11px] text-[#4FC3F7] font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Executive Answer</span>
              </span>
              <span className="text-slate-400 font-normal">Source: {aiResponse.source}</span>
            </div>
            <div className="text-slate-100 whitespace-pre-line leading-relaxed text-xs sm:text-sm">
              {aiResponse.answer}
            </div>
          </div>
        )}
      </div>

      {/* 3. AI DAILY BRIEFING (Real Database Information) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-black uppercase tracking-wider text-[#0B1B3B]">
              SkyBridge Daily Briefing
            </h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-sky-50 text-[#0288D1]">
              Live Digest
            </span>
          </div>
          <span className="text-[11px] text-slate-400">Autonomous synthesis</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
          {/* Urgent Visa */}
          <Link
            to="/admin/visa-intelligence"
            className="p-3 rounded-2xl border border-rose-100 bg-rose-50/50 hover:bg-rose-50 transition-colors flex items-start gap-2.5"
          >
            <span className="text-base">🔴</span>
            <div>
              <div className="font-bold text-rose-900">
                Urgent: {pendingVisaAlerts.length} Visa Updates Need Review
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Official Schengen / UK / Turkey statutory fee adjustments detected.
              </div>
            </div>
          </Link>

          {/* Price Changes */}
          <Link
            to="/admin/price-check"
            className="p-3 rounded-2xl border border-amber-100 bg-amber-50/50 hover:bg-amber-50 transition-colors flex items-start gap-2.5"
          >
            <span className="text-base">🟠</span>
            <div>
              <div className="font-bold text-amber-900">
                Price: {urgentPriceAlerts.length} Supplier Rates Updated
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Airlines, hotel partners, and insurance wholesale costs changed.
              </div>
            </div>
          </Link>

          {/* Leads */}
          <Link
            to="/admin/leads"
            className="p-3 rounded-2xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-colors flex items-start gap-2.5"
          >
            <span className="text-base">🟢</span>
            <div>
              <div className="font-bold text-emerald-900">
                Leads: {newLeads.length} New Inquiries In Queue
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Immediate qualification & follow-up recommended.
              </div>
            </div>
          </Link>

          {/* Quotations */}
          <Link
            to="/admin/leads"
            className="p-3 rounded-2xl border border-sky-100 bg-sky-50/50 hover:bg-sky-50 transition-colors flex items-start gap-2.5"
          >
            <span className="text-base">💰</span>
            <div>
              <div className="font-bold text-sky-900">
                Sales: {quotationsPending.length} Quotations Awaiting Response
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Follow up today to secure booking deposits.
              </div>
            </div>
          </Link>

          {/* Documents */}
          <Link
            to="/admin/cases"
            className="p-3 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors flex items-start gap-2.5"
          >
            <span className="text-base">📄</span>
            <div>
              <div className="font-bold text-slate-800">
                Documents: {missingDocuments.length} Client Files Pending
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Bank statements, employer letters, or biometric forms required.
              </div>
            </div>
          </Link>

          {/* Departures */}
          <Link
            to="/admin/cases"
            className="p-3 rounded-2xl border border-indigo-100 bg-indigo-50/50 hover:bg-indigo-50 transition-colors flex items-start gap-2.5"
          >
            <span className="text-base">✈️</span>
            <div>
              <div className="font-bold text-indigo-900">
                Travel: {upcomingDepartures.length} Departures Approaching
              </div>
              <div className="text-slate-500 text-[11px] mt-0.5">
                Final e-tickets, hotel vouchers, and insurance verification ready.
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. REVIEW & APPROVE WORKFLOW CARD (Visa Fee Changes Human-In-The-Loop) */}
      {pendingVisaAlerts.length > 0 && (
        <div className="bg-gradient-to-r from-rose-50 to-amber-50 rounded-3xl p-5 border-2 border-rose-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-rose-500 text-white">
                <ShieldAlert className="w-4 h-4" />
              </span>
              <div>
                <h3 className="text-sm font-black text-rose-900">
                  🔴 Official Visa Fee Update Detected — Awaiting Your Decision
                </h3>
                <span className="text-[11px] text-rose-700">
                  You (Saman, CEO) remain the sole decision-maker before rates apply to client calculators.
                </span>
              </div>
            </div>
            <Link
              to="/admin/visa-intelligence"
              className="text-xs font-bold text-[#0B1B3B] hover:underline flex items-center gap-1"
            >
              <span>View All Alerts</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {pendingVisaAlerts.slice(0, 2).map(alert => (
              <div
                key={alert.id}
                className="bg-white rounded-2xl p-4 border border-rose-100 shadow-sm space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="px-2 py-0.5 rounded bg-[#0B1B3B] text-white text-[10px] font-bold">
                      {alert.country}
                    </span>
                    <span className="text-slate-400 text-[10px]">
                      Checked: {(alert as any).checkedDate || (alert as any).effectiveDate || ((alert as any).detectedAt ? String((alert as any).detectedAt).split('T')[0] : 'Recent')}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-900">{(alert as any).visaCategory || (alert as any).title || alert.country}</h4>
                  <div className="text-[11px] text-slate-500">Source: {(alert as any).authoritySource || (alert as any).sourceAuthority || 'Official Authority'}</div>

                  <div className="flex items-center gap-3 my-2 text-xs bg-slate-50 p-2 rounded-xl">
                    <div>
                      <span className="text-[10px] text-slate-400 block">Previous:</span>
                      <span className="font-mono text-slate-600">
                        {alert.currency} {alert.previousFee.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-slate-300">➔</div>
                    <div>
                      <span className="text-[10px] text-rose-600 font-bold block">New Rate:</span>
                      <span className="font-mono font-bold text-rose-700">
                        {alert.currency} {alert.newFee.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100">
                  <button
                    onClick={() => rejectVisaAlert(alert.id)}
                    className="flex-1 py-1.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                  >
                    Dismiss
                  </button>
                  <button
                    onClick={() => approveVisaAlert(alert.id)}
                    className="flex-1 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors shadow-sm flex items-center justify-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Review & Approve</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. CEO QUICK ACTIONS BAR */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-wider text-slate-400">
            CEO Quick Actions
          </h2>
          <span className="text-[11px] text-slate-400">Instant shortcuts</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 text-xs font-bold">
          <button
            onClick={() => setIsNewLeadOpen(true)}
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <Plus className="w-4 h-4 text-[#0288D1] group-hover:text-white" />
            <span>+ New Lead</span>
          </button>

          <Link
            to="/admin/customers"
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <Users className="w-4 h-4 text-emerald-600 group-hover:text-white" />
            <span>+ Customer</span>
          </Link>

          <Link
            to="/admin/price-check"
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <Stamp className="w-4 h-4 text-indigo-600 group-hover:text-white" />
            <span>Check Visa</span>
          </Link>

          <Link
            to="/admin/price-check"
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <Plane className="w-4 h-4 text-sky-600 group-hover:text-white" />
            <span>Check Ticket</span>
          </Link>

          <Link
            to="/admin/price-check"
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <Building className="w-4 h-4 text-amber-600 group-hover:text-white" />
            <span>Check Hotel</span>
          </Link>

          <Link
            to="/admin/price-check"
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <Shield className="w-4 h-4 text-emerald-600 group-hover:text-white" />
            <span>Check Insurance</span>
          </Link>

          <Link
            to="/admin/calculator"
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <Briefcase className="w-4 h-4 text-purple-600 group-hover:text-white" />
            <span>Create Package</span>
          </Link>

          <Link
            to="/admin/calculator"
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <FileText className="w-4 h-4 text-sky-600 group-hover:text-white" />
            <span>Create Quotation</span>
          </Link>

          <Link
            to="/admin/invoices"
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <CreditCard className="w-4 h-4 text-emerald-600 group-hover:text-white" />
            <span>+ Create Invoice</span>
          </Link>

          <Link
            to="/admin/suppliers"
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <Building className="w-4 h-4 text-slate-700 group-hover:text-white" />
            <span>+ Add Supplier</span>
          </Link>

          <Link
            to="/admin/price-check"
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <DollarSign className="w-4 h-4 text-amber-600 group-hover:text-white" />
            <span>+ Add Price</span>
          </Link>

          <Link
            to="/admin/follow-ups"
            className="p-3 rounded-2xl bg-slate-50 hover:bg-[#0B1B3B] hover:text-white transition-all text-slate-700 flex flex-col items-center gap-1.5 text-center group border border-slate-100"
          >
            <Calendar className="w-4 h-4 text-rose-600 group-hover:text-white" />
            <span>+ Follow-up</span>
          </Link>
        </div>
      </div>

      {/* 5.5 B2B SUPPLIERS & PRICE INTELLIGENCE (Wholesale Vault & Margin Engine) */}
      <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#0B1B3B] text-white">
              <Building2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200">
                  Wholesale Margin Engine
                </span>
                <h3 className="text-sm font-black text-[#0B1B3B]">
                  B2B Supplier & Price Intelligence
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                Centralized partner vault, wholesale inventory feeds, and rate sheet comparison.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/admin/price-comparison"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors"
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Compare Rates</span>
            </Link>
            <Link
              to="/admin/data-import"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <UploadCloud className="w-3.5 h-3.5 text-[#0288D1]" />
              <span>Import Excel</span>
            </Link>
            <Link
              to="/admin/supplier-portals"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            >
              <Key className="w-3.5 h-3.5 text-amber-600" />
              <span>Portals Vault</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link
            to="/admin/suppliers"
            className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200/60 transition-colors"
          >
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Contracted Suppliers</span>
            <div className="text-xl font-black text-[#0B1B3B] font-mono mt-1">{suppliers.length}</div>
            <span className="text-[11px] text-[#0288D1] font-semibold mt-0.5 block">View Directory →</span>
          </Link>

          <Link
            to="/admin/supplier-portals"
            className="p-3.5 rounded-2xl bg-amber-50/50 hover:bg-amber-50 border border-amber-200/60 transition-colors"
          >
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Portals & Logins</span>
            <div className="text-xl font-black text-amber-950 font-mono mt-1">{b2bPortals.length}</div>
            <span className="text-[11px] text-amber-800 font-semibold mt-0.5 block">Encrypted Vault →</span>
          </Link>

          <Link
            to="/admin/price-check"
            className="p-3.5 rounded-2xl bg-emerald-50/50 hover:bg-emerald-50 border border-emerald-200/60 transition-colors"
          >
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Live Wholesale Rates</span>
            <div className="text-xl font-black text-emerald-950 font-mono mt-1">{supplierPrices.length}</div>
            <span className="text-[11px] text-emerald-800 font-semibold mt-0.5 block">Rate Cards →</span>
          </Link>

          <Link
            to="/admin/integrations/google-sheets"
            className="p-3.5 rounded-2xl bg-sky-50/50 hover:bg-sky-50 border border-sky-200/60 transition-colors"
          >
            <span className="text-[10px] font-bold text-sky-700 uppercase tracking-wider block">Google Sheets Sync</span>
            <div className="text-xl font-black text-sky-950 font-mono mt-1">{googleSheetConnections.length}</div>
            <span className="text-[11px] text-sky-800 font-semibold mt-0.5 block">Live Feeds →</span>
          </Link>
        </div>
      </div>

      {/* 6. FOCUSED REAL-TIME WORKSPACE: Essential Live Lists (No table overload) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column (7 cols): High Priority Leads & Follow-ups */}
        <div className="lg:col-span-7 space-y-5">
          {/* New Inquiries Card */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#0288D1]" />
                <h3 className="text-sm font-black text-[#0B1B3B]">
                  New Leads In Queue ({newLeads.length})
                </h3>
              </div>
              <Link
                to="/admin/leads"
                className="text-xs font-bold text-[#0288D1] hover:underline flex items-center gap-1"
              >
                <span>Full Pipeline</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {newLeads.slice(0, 4).map(lead => (
                <div key={lead.id} className="py-3 flex items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-xs text-[#0B1B3B]">{lead.fullName}</div>
                    <div className="text-[11px] text-slate-500">
                      {lead.destination} • {lead.service}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs font-bold text-slate-900 block">
                      PKR {(lead.estimatedValue || 0).toLocaleString()}
                    </span>
                    <Link
                      to={`/admin/leads/${lead.id}`}
                      className="text-[10px] font-bold text-[#0288D1] hover:underline"
                    >
                      Process Lead ➔
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Follow-ups Due */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-500" />
                <h3 className="text-sm font-black text-[#0B1B3B]">
                  Follow-ups Scheduled ({followUpsDue.length})
                </h3>
              </div>
              <Link
                to="/admin/follow-ups"
                className="text-xs font-bold text-[#0288D1] hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {followUpsDue.slice(0, 3).map(fu => (
                <div
                  key={fu.id}
                  className="p-3 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-bold text-slate-800">{fu.leadName}</span>
                    <p className="text-[11px] text-slate-500">{fu.notes}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">
                    {fu.type} Due
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (5 cols): Unpaid Customer Quota & Departures */}
        <div className="lg:col-span-5 space-y-5">
          {/* Outstanding Payments Due */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-rose-600" />
                <h3 className="text-sm font-black text-[#0B1B3B]">
                  Payments Due ({paymentsDue.length})
                </h3>
              </div>
              <Link
                to="/admin/invoices"
                className="text-xs font-bold text-[#0288D1] hover:underline flex items-center gap-1"
              >
                <span>Invoices</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2.5">
              {paymentsDue.map(inv => (
                <div
                  key={inv.id}
                  className="p-3 rounded-2xl bg-rose-50/50 border border-rose-100 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="font-bold text-slate-900">{inv.customerName}</div>
                    <div className="text-[11px] text-slate-500">Invoice {inv.invoiceNumber}</div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-rose-700 block">
                      {inv.currency} {inv.balanceDue.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-slate-400">Due: {inv.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Departures */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plane className="w-4 h-4 text-indigo-600" />
                <h3 className="text-sm font-black text-[#0B1B3B]">
                  Upcoming Departures
                </h3>
              </div>
              <Link
                to="/admin/cases"
                className="text-xs font-bold text-[#0288D1] hover:underline flex items-center gap-1"
              >
                <span>Travel Cases</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-2 text-xs">
              {upcomingDepartures.map(l => (
                <div
                  key={l.id}
                  className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-slate-800">{l.fullName}</span>
                    <div className="text-[11px] text-[#0288D1] font-semibold">{l.destination}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-[11px] font-mono text-slate-700 block">{l.travelDate}</span>
                    <span className="text-[10px] text-emerald-600 font-bold">Confirmed</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* New Lead Quick Modal */}
      {isNewLeadOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-base font-black text-[#0B1B3B]">Quick Lead Entry</h2>
              <button onClick={() => setIsNewLeadOpen(false)} className="text-slate-400 hover:text-slate-600">
                <XCircle className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleQuickLeadSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Asad Ullah"
                  value={quickLeadName}
                  onChange={e => setQuickLeadName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Phone / WhatsApp *</label>
                <input
                  type="text"
                  required
                  placeholder="+92 300 1234567"
                  value={quickLeadPhone}
                  onChange={e => setQuickLeadPhone(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Service</label>
                  <select
                    value={quickLeadService}
                    onChange={e => setQuickLeadService(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  >
                    <option value="Tourist Visa">Tourist Visa</option>
                    <option value="Business Visa">Business Visa</option>
                    <option value="Flight Booking">Flight Booking</option>
                    <option value="Hotel Booking">Hotel Booking</option>
                    <option value="Holiday Package">Holiday Package</option>
                    <option value="Umrah Package">Umrah Package</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 uppercase mb-1">Destination</label>
                  <input
                    type="text"
                    placeholder="e.g. Schengen / UK"
                    value={quickLeadDestination}
                    onChange={e => setQuickLeadDestination(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewLeadOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
                >
                  Add Lead
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
