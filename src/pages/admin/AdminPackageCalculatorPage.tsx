import React, { useState } from 'react';
import { useCrm } from '../../context/CrmContext';
import { SkyBridgeLogo } from '../../components/SkyBridgeLogo';
import {
  Calculator,
  Plane,
  Building,
  Stamp,
  Shield,
  Car,
  Users,
  DollarSign,
  Printer,
  Copy,
  CheckCircle2,
  FileText,
  Sparkles,
  RefreshCw
} from 'lucide-react';

export const AdminPackageCalculatorPage: React.FC = () => {
  const { customers, leads, createInvoice } = useCrm();

  // Selected Lead or Customer
  const [targetType, setTargetType] = useState<'Lead' | 'Customer' | 'Custom'>('Lead');
  const [clientName, setClientName] = useState('Kamran Siddiqui');
  const [clientEmail, setClientEmail] = useState('kamran.siddiqui@example.com');
  const [clientPhone, setClientPhone] = useState('+92 300 1234567');
  const [destination, setDestination] = useState('Paris, France & Swiss Alps');
  const [travelDates, setTravelDates] = useState('15 Oct 2026 - 28 Oct 2026 (13 Nights)');
  const [paxCount, setPaxCount] = useState<number>(2);

  // Line item building blocks (Wholesale cost + Client Selling)
  const [flightCost, setFlightCost] = useState<number>(265000);
  const [flightSelling, setFlightSelling] = useState<number>(295000);

  const [hotelCostPerNight, setHotelCostPerNight] = useState<number>(38000);
  const [hotelSellingPerNight, setHotelSellingPerNight] = useState<number>(48000);
  const [hotelNights, setHotelNights] = useState<number>(10);

  const [visaFeeCost, setVisaFeeCost] = useState<number>(29500);
  const [visaFeeSelling, setVisaFeeSelling] = useState<number>(55000);

  const [insuranceCost, setInsuranceCost] = useState<number>(7500);
  const [insuranceSelling, setInsuranceSelling] = useState<number>(12000);

  const [transferToursCost, setTransferToursCost] = useState<number>(45000);
  const [transferToursSelling, setTransferToursSelling] = useState<number>(65000);

  const [consultingServiceFee, setConsultingServiceFee] = useState<number>(25000);

  const [currency, setCurrency] = useState('PKR');
  const [invoiceCreatedSuccess, setInvoiceCreatedSuccess] = useState(false);

  // Mathematical Calculations
  const totalFlightsCost = flightCost * paxCount;
  const totalFlightsSelling = flightSelling * paxCount;

  const totalHotelCost = hotelCostPerNight * hotelNights;
  const totalHotelSelling = hotelSellingPerNight * hotelNights;

  const totalVisaCost = visaFeeCost * paxCount;
  const totalVisaSelling = visaFeeSelling * paxCount;

  const totalInsuranceCost = insuranceCost * paxCount;
  const totalInsuranceSelling = insuranceSelling * paxCount;

  const totalTransferCost = transferToursCost;
  const totalTransferSelling = transferToursSelling;

  const totalWholesaleCost =
    totalFlightsCost + totalHotelCost + totalVisaCost + totalInsuranceCost + totalTransferCost;

  const totalClientSelling =
    totalFlightsSelling +
    totalHotelSelling +
    totalVisaSelling +
    totalInsuranceSelling +
    totalTransferSelling +
    consultingServiceFee;

  const totalGrossProfit = totalClientSelling - totalWholesaleCost;
  const profitMarginPercent =
    totalWholesaleCost > 0 ? Math.round((totalGrossProfit / totalWholesaleCost) * 1000) / 10 : 0;
  const pricePerPerson = paxCount > 0 ? Math.round(totalClientSelling / paxCount) : 0;

  const handleCreateInvoice = () => {
    createInvoice({
      customerName: clientName,
      customerEmail: clientEmail,
      customerPhone: clientPhone,
      currency,
      items: [
        {
          description: `International Flights (${destination}) - ${paxCount} Pax`,
          category: 'Flight',
          quantity: paxCount,
          unitPrice: flightSelling,
          total: totalFlightsSelling
        },
        {
          description: `Luxury Hotel Accommodations (${hotelNights} Nights)`,
          category: 'Hotel',
          quantity: hotelNights,
          unitPrice: hotelSellingPerNight,
          total: totalHotelSelling
        },
        {
          description: `Official Visa Application Vetting & Dossier (${paxCount} Pax)`,
          category: 'Visa',
          quantity: paxCount,
          unitPrice: visaFeeSelling,
          total: totalVisaSelling
        },
        {
          description: `Schengen / International Travel Medical Insurance (${paxCount} Pax)`,
          category: 'Insurance',
          quantity: paxCount,
          unitPrice: insuranceSelling,
          total: totalInsuranceSelling
        },
        {
          description: 'Airport Transfers & Private Destination Sightseeing',
          category: 'Transfers',
          quantity: 1,
          unitPrice: totalTransferSelling,
          total: totalTransferSelling
        },
        {
          description: 'VIP Travel Concierge & File Management Service Fee',
          category: 'Consulting',
          quantity: 1,
          unitPrice: consultingServiceFee,
          total: consultingServiceFee
        }
      ],
      total: totalClientSelling,
      paidAmount: 0,
      notes: `Custom Package for ${clientName} to ${destination}. Valid for 7 days from quote creation.`
    });
    setInvoiceCreatedSuccess(true);
    setTimeout(() => setInvoiceCreatedSuccess(false), 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">
              Internal Package & Fee Calculator
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E3F2FD] text-[#0288D1]">
              Live Profit Margin Engine
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Build custom quotations with exact supplier wholesale breakdown, agency markups, and customer quota calculations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4" />
            <span>Print / PDF Quote</span>
          </button>
          <button
            onClick={handleCreateInvoice}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Generate Official Invoice</span>
          </button>
        </div>
      </div>

      {invoiceCreatedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span>
            Official invoice successfully generated and added to Billing & Invoices directory!
          </span>
        </div>
      )}

      {/* Main Grid: Inputs on Left, Real-Time Executive Quote on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Calculator Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Passenger & Client Details Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#0B1B3B] uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-[#0288D1]" />
              <span>1. Client & Travel Specifications</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Customer / Lead Name</label>
                <input
                  type="text"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Destination</label>
                <input
                  type="text"
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Number of Passengers</label>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={paxCount}
                  onChange={e => setPaxCount(Math.max(1, Number(e.target.value)))}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Travel Duration / Dates</label>
                <input
                  type="text"
                  value={travelDates}
                  onChange={e => setTravelDates(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">Billing Currency</label>
                <select
                  value={currency}
                  onChange={e => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                >
                  <option value="PKR">PKR - Pakistani Rupee</option>
                  <option value="AED">AED - Emirati Dirham</option>
                  <option value="SAR">SAR - Saudi Riyal</option>
                  <option value="USD">USD - US Dollar</option>
                </select>
              </div>
            </div>
          </div>

          {/* Service Breakdown Module */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <h2 className="text-sm font-bold text-[#0B1B3B] uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#0288D1]" />
              <span>2. Wholesale Cost & Selling Price Matrix</span>
            </h2>

            {/* Flight Item */}
            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B1B3B] flex items-center gap-1.5">
                  <Plane className="w-3.5 h-3.5 text-sky-600" />
                  <span>Flights (Per Passenger)</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-600">
                  Margin: +{currency} {((flightSelling - flightCost) * paxCount).toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Supplier Cost / Pax</span>
                  <input
                    type="number"
                    value={flightCost}
                    onChange={e => setFlightCost(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Client Selling / Pax</span>
                  <input
                    type="number"
                    value={flightSelling}
                    onChange={e => setFlightSelling(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono font-bold text-[#0B1B3B]"
                  />
                </div>
              </div>
            </div>

            {/* Hotel Item */}
            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B1B3B] flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Hotel Accommodations</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-600">
                  Margin: +{currency} {((hotelSellingPerNight - hotelCostPerNight) * hotelNights).toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Cost / Night</span>
                  <input
                    type="number"
                    value={hotelCostPerNight}
                    onChange={e => setHotelCostPerNight(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Selling / Night</span>
                  <input
                    type="number"
                    value={hotelSellingPerNight}
                    onChange={e => setHotelSellingPerNight(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono font-bold text-[#0B1B3B]"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Nights Count</span>
                  <input
                    type="number"
                    value={hotelNights}
                    onChange={e => setHotelNights(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                  />
                </div>
              </div>
            </div>

            {/* Visa Processing */}
            <div className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#0B1B3B] flex items-center gap-1.5">
                  <Stamp className="w-3.5 h-3.5 text-amber-600" />
                  <span>Visa Fees & Processing (Per Pax)</span>
                </span>
                <span className="text-[11px] font-semibold text-emerald-600">
                  Margin: +{currency} {((visaFeeSelling - visaFeeCost) * paxCount).toLocaleString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Embassy / Official Cost</span>
                  <input
                    type="number"
                    value={visaFeeCost}
                    onChange={e => setVisaFeeCost(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-0.5">Client Package Charge</span>
                  <input
                    type="number"
                    value={visaFeeSelling}
                    onChange={e => setVisaFeeSelling(Number(e.target.value))}
                    className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg font-mono font-bold text-[#0B1B3B]"
                  />
                </div>
              </div>
            </div>

            {/* Insurance & Transfers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1.5">
                <span className="text-xs font-bold text-[#0B1B3B] flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Insurance / Pax</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={insuranceCost}
                    onChange={e => setInsuranceCost(Number(e.target.value))}
                    placeholder="Cost"
                    className="w-full px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                  />
                  <input
                    type="number"
                    value={insuranceSelling}
                    onChange={e => setInsuranceSelling(Number(e.target.value))}
                    placeholder="Sell"
                    className="w-full px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>

              <div className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 space-y-1.5">
                <span className="text-xs font-bold text-[#0B1B3B] flex items-center gap-1">
                  <Car className="w-3.5 h-3.5 text-purple-600" />
                  <span>Transfers & Tours</span>
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="number"
                    value={transferToursCost}
                    onChange={e => setTransferToursCost(Number(e.target.value))}
                    placeholder="Cost"
                    className="w-full px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg font-mono"
                  />
                  <input
                    type="number"
                    value={transferToursSelling}
                    onChange={e => setTransferToursSelling(Number(e.target.value))}
                    placeholder="Sell"
                    className="w-full px-2 py-1 text-xs bg-white border border-slate-200 rounded-lg font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Service & Consulting Fee */}
            <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/50 flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-amber-900">
                  SkyBridge Concierge & Consultancy Fee
                </div>
                <div className="text-[11px] text-amber-700">
                  Dedicated dossier preparation, 24/7 helpline & itinerary curation
                </div>
              </div>
              <div className="w-36">
                <input
                  type="number"
                  value={consultingServiceFee}
                  onChange={e => setConsultingServiceFee(Number(e.target.value))}
                  className="w-full px-3 py-1.5 text-xs bg-white border border-amber-300 rounded-lg font-mono font-bold text-amber-900 text-right"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Executive Quote Document Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md relative overflow-hidden print:border-none print:shadow-none">
            {/* Ambient Watermark */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#4FC3F7]/5 rounded-bl-full pointer-events-none"></div>

            {/* Official Logo & Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <SkyBridgeLogo size="md" />
              <div className="text-right">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                  Official Quotation
                </span>
                <span className="text-xs font-bold text-[#0B1B3B]">
                  REF: SB-QT-{Date.now().toString().slice(-6)}
                </span>
              </div>
            </div>

            {/* Recipient Overview */}
            <div className="bg-slate-50 rounded-2xl p-4 mb-5 text-xs space-y-1">
              <div className="text-[11px] font-bold text-slate-400 uppercase">Prepared For:</div>
              <div className="text-sm font-bold text-[#0B1B3B]">{clientName}</div>
              <div className="text-slate-600 font-medium">{destination}</div>
              <div className="text-slate-500 text-[11px]">{travelDates}</div>
              <div className="text-[#0288D1] font-semibold text-[11px]">
                {paxCount} {paxCount > 1 ? 'Passengers' : 'Passenger'}
              </div>
            </div>

            {/* Package Quotation Table */}
            <div className="space-y-2.5 text-xs mb-6">
              <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>International Flights ({paxCount}x)</span>
                <span className="font-mono font-semibold">
                  {currency} {totalFlightsSelling.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>Hotel Accommodations ({hotelNights} Nights)</span>
                <span className="font-mono font-semibold">
                  {currency} {totalHotelSelling.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>Visa Dossier & Fee ({paxCount}x)</span>
                <span className="font-mono font-semibold">
                  {currency} {totalVisaSelling.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>Travel Medical Insurance ({paxCount}x)</span>
                <span className="font-mono font-semibold">
                  {currency} {totalInsuranceSelling.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>Transfers & Guided Tours</span>
                <span className="font-mono font-semibold">
                  {currency} {totalTransferSelling.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-600 py-1 border-b border-slate-100">
                <span>Consultancy & Concierge Services</span>
                <span className="font-mono font-semibold">
                  {currency} {consultingServiceFee.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Total Quotation Amount */}
            <div className="bg-[#0B1B3B] text-white rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between text-xs text-slate-300 mb-1">
                <span>Total Package Price</span>
                <span>{paxCount} Pax</span>
              </div>
              <div className="text-2xl font-black tracking-tight text-[#4FC3F7]">
                {currency} {totalClientSelling.toLocaleString()}
              </div>
              <div className="text-[11px] text-slate-400 mt-1">
                Approx. {currency} {pricePerPerson.toLocaleString()} per passenger
              </div>
            </div>

            {/* Private Agency Margin Breakdown (Hidden in Customer Printout) */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-xs space-y-1.5 print:hidden">
              <div className="flex items-center justify-between">
                <span className="text-emerald-900 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>CEO Private Margin Check:</span>
                </span>
                <span className="font-mono font-bold text-emerald-800">
                  +{currency} {totalGrossProfit.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-emerald-700">
                <span>Wholesale Supplier Cost:</span>
                <span className="font-mono">{currency} {totalWholesaleCost.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-emerald-700">
                <span>Net Margin Percentage:</span>
                <span className="font-bold">{profitMarginPercent}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
