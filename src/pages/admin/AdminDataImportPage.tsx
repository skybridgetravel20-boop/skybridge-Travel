import React, { useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { useCrm } from '../../context/CrmContext';
import { SupplierPrice, SupplierCategory } from '../../types';
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertTriangle,
  Download,
  ArrowRight,
  Database,
  RefreshCw,
  Clock,
  Layers,
  HelpCircle,
  X,
  FileCheck,
  Building2,
  Trash2,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface RawRow {
  [key: string]: any;
}

interface ColumnMapping {
  supplierName: string;
  product: string;
  category: string;
  destination: string;
  supplierCost: string;
  currency: string;
  clientSellingPrice: string;
  validityEnd: string;
  inclusions: string;
  notes: string;
}

export const AdminDataImportPage: React.FC = () => {
  const { suppliers, supplierPrices, addSupplierPrice, updateSupplierPrice, importedFiles, addImportedFile, auth } = useCrm();

  // File Upload State
  const [file, setFile] = useState<File | null>(null);
  const [rawHeaders, setRawHeaders] = useState<string[]>([]);
  const [rawData, setRawData] = useState<RawRow[]>([]);
  const [isParsing, setIsParsing] = useState(false);
  const [parsingError, setParsingError] = useState<string | null>(null);

  // Mapping State
  const [mapping, setMapping] = useState<ColumnMapping>({
    supplierName: '',
    product: '',
    category: '',
    destination: '',
    supplierCost: '',
    currency: '',
    clientSellingPrice: '',
    validityEnd: '',
    inclusions: '',
    notes: ''
  });

  // Import Options
  const [duplicateAction, setDuplicateAction] = useState<'update' | 'skip' | 'add_new'>('update');
  const [selectedDefaultSupplier, setSelectedDefaultSupplier] = useState<string>(suppliers[0]?.id || '');
  const [defaultCurrency, setDefaultCurrency] = useState<string>('PKR');

  // Step Tracker: 1 = Upload, 2 = Map & Preview, 3 = Completed
  const [importStep, setImportStep] = useState<1 | 2 | 3>(1);
  const [importResult, setImportResult] = useState<{ added: number; updated: number; skipped: number } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-detect columns based on common naming patterns
  const autoMapColumns = (headers: string[]) => {
    const newMapping: ColumnMapping = {
      supplierName: '',
      product: '',
      category: '',
      destination: '',
      supplierCost: '',
      currency: '',
      clientSellingPrice: '',
      validityEnd: '',
      inclusions: '',
      notes: ''
    };

    headers.forEach(h => {
      const lower = h.toLowerCase().trim();
      if (lower.includes('supplier') || lower.includes('vendor') || lower.includes('company')) {
        newMapping.supplierName = h;
      } else if (lower.includes('product') || lower.includes('service') || lower.includes('hotel') || lower.includes('flight') || lower.includes('title') || lower.includes('item')) {
        newMapping.product = h;
      } else if (lower.includes('category') || lower.includes('type')) {
        newMapping.category = h;
      } else if (lower.includes('dest') || lower.includes('city') || lower.includes('route') || lower.includes('country')) {
        newMapping.destination = h;
      } else if (lower.includes('cost') || lower.includes('net') || lower.includes('rate') || lower.includes('wholesale')) {
        newMapping.supplierCost = h;
      } else if (lower.includes('curr') || lower.includes('moneda')) {
        newMapping.currency = h;
      } else if (lower.includes('sell') || lower.includes('client') || lower.includes('retail') || lower.includes('price')) {
        newMapping.clientSellingPrice = h;
      } else if (lower.includes('valid') || lower.includes('expiry') || lower.includes('end') || lower.includes('date')) {
        newMapping.validityEnd = h;
      } else if (lower.includes('inc') || lower.includes('feature')) {
        newMapping.inclusions = h;
      } else if (lower.includes('note') || lower.includes('desc') || lower.includes('remark')) {
        newMapping.notes = h;
      }
    });

    setMapping(newMapping);
  };

  // Process selected file
  const handleFile = async (uploadedFile: File) => {
    setParsingError(null);
    setIsParsing(true);
    setFile(uploadedFile);

    try {
      const buffer = await uploadedFile.arrayBuffer();
      const workbook = XLSX.read(buffer, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];

      const json = XLSX.utils.sheet_to_json<RawRow>(sheet, { defval: '' });

      if (json.length === 0) {
        setParsingError('The uploaded file contains no data rows.');
        setIsParsing(false);
        return;
      }

      const headers = Object.keys(json[0]);
      setRawHeaders(headers);
      setRawData(json);
      autoMapColumns(headers);
      setImportStep(2);
    } catch (err: any) {
      setParsingError(err.message || 'Failed to read spreadsheet file. Ensure it is a valid .xlsx, .xls, or .csv.');
    } finally {
      setIsParsing(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  // Execute Import
  const handleExecuteImport = () => {
    if (!mapping.product && !mapping.supplierCost) {
      alert('Please select at least Product / Service and Supplier Cost columns.');
      return;
    }

    let addedCount = 0;
    let updatedCount = 0;
    let skippedCount = 0;

    const defaultSupObj = suppliers.find(s => s.id === selectedDefaultSupplier);
    const fallbackSupplierName = defaultSupObj?.companyName || defaultSupObj?.name || 'Amadeus Global GDS';

    rawData.forEach(row => {
      const productName = mapping.product ? String(row[mapping.product] || '').trim() : 'Unnamed B2B Service';
      if (!productName) {
        skippedCount++;
        return;
      }

      const supplierName = mapping.supplierName ? String(row[mapping.supplierName] || '').trim() : fallbackSupplierName;
      const rawCost = mapping.supplierCost ? Number(String(row[mapping.supplierCost]).replace(/[^0-9.]/g, '')) : 0;
      const rawSelling = mapping.clientSellingPrice ? Number(String(row[mapping.clientSellingPrice]).replace(/[^0-9.]/g, '')) : 0;
      const currency = mapping.currency && row[mapping.currency] ? String(row[mapping.currency]).trim().toUpperCase() : defaultCurrency;
      const category = (mapping.category && row[mapping.category] ? String(row[mapping.category]).trim() : 'Airline / Ticketing') as SupplierCategory;
      const destination = mapping.destination ? String(row[mapping.destination] || 'General') : 'General';
      const validityEnd = mapping.validityEnd ? String(row[mapping.validityEnd] || '') : new Date(Date.now() + 30 * 86400000).toISOString().split('T')[0];
      const inclusions = mapping.inclusions ? String(row[mapping.inclusions] || '') : 'B2B Wholesale Inclusions';
      const notes = mapping.notes ? String(row[mapping.notes] || '') : 'Imported via Excel Sheet';

      const sellingPrice = rawSelling > 0 ? rawSelling : Math.round(rawCost * 1.15); // 15% default markup if omitted
      const margin = sellingPrice - rawCost;
      const marginPct = rawCost > 0 ? Math.round((margin / rawCost) * 1000) / 10 : 15;

      // Duplicate Check: supplier + product match
      const existing = supplierPrices.find(
        p =>
          p.supplierName.toLowerCase() === supplierName.toLowerCase() &&
          (p.product || p.serviceTitle).toLowerCase() === productName.toLowerCase()
      );

      if (existing) {
        if (duplicateAction === 'skip') {
          skippedCount++;
        } else if (duplicateAction === 'update') {
          updateSupplierPrice(existing.id, {
            supplierCost: rawCost,
            clientSellingPrice: sellingPrice,
            recommendedSellingPrice: sellingPrice,
            profitMarginAmount: margin,
            profitMarginPercent: marginPct,
            currency,
            destination,
            validityEnd,
            inclusions,
            notes,
            lastUpdated: new Date().toISOString().split('T')[0],
            source: 'Excel Import'
          });
          updatedCount++;
        } else {
          // add_new
          addSupplierPrice({
            supplierName,
            product: productName,
            serviceTitle: productName,
            category,
            destination,
            supplierCost: rawCost,
            clientSellingPrice: sellingPrice,
            recommendedSellingPrice: sellingPrice,
            profitMarginAmount: margin,
            profitMarginPercent: marginPct,
            currency,
            validityEnd,
            inclusions,
            notes,
            source: 'Excel Import'
          });
          addedCount++;
        }
      } else {
        addSupplierPrice({
          supplierName,
          product: productName,
          serviceTitle: productName,
          category,
          destination,
          supplierCost: rawCost,
          clientSellingPrice: sellingPrice,
          recommendedSellingPrice: sellingPrice,
          profitMarginAmount: margin,
          profitMarginPercent: marginPct,
          currency,
          validityEnd,
          inclusions,
          notes,
          source: 'Excel Import'
        });
        addedCount++;
      }
    });

    // Register into imported file logs
    addImportedFile({
      fileName: file?.name || 'supplier_rates.xlsx',
      fileType: 'Excel',
      supplierName: fallbackSupplierName,
      rowCount: rawData.length,
      recordsAdded: addedCount,
      recordsUpdated: updatedCount,
      importedBy: auth.user?.name || 'Saman (CEO)',
      status: 'Completed',
      notes: `Imported with duplicate policy: ${duplicateAction}. ${addedCount} created, ${updatedCount} refreshed, ${skippedCount} skipped.`
    });

    setImportResult({ added: addedCount, updated: updatedCount, skipped: skippedCount });
    setImportStep(3);
  };

  // Download Sample Template
  const handleDownloadSampleTemplate = () => {
    const sampleRows = [
      {
        'Supplier Name': 'Amadeus Global GDS',
        'Product or Service': 'Islamabad to Dubai Return (Airblue)',
        'Category': 'Airline / Ticketing',
        'Destination': 'Dubai (DXB)',
        'Supplier Cost': 72000,
        'Currency': 'PKR',
        'Selling Price': 83000,
        'Validity Date': '2026-10-31',
        'Inclusions': '20kg check-in, 7kg hand carry, taxes included',
        'Internal Notes': 'Direct B2B net consolidated fare'
      },
      {
        'Supplier Name': 'WebBeds Wholesale',
        'Product or Service': 'Atlantis The Palm - Ocean King Room',
        'Category': 'Hotel B2B',
        'Destination': 'Dubai, UAE',
        'Supplier Cost': 145000,
        'Currency': 'PKR',
        'Selling Price': 168000,
        'Validity Date': '2026-11-15',
        'Inclusions': 'Breakfast buffet included, Aquaventure waterpark pass',
        'Internal Notes': 'Instant confirmation portal'
      },
      {
        'Supplier Name': 'SouthTravels Dubai Desk',
        'Product or Service': 'Dubai 30-Days Tourist Visa with Insurance',
        'Category': 'Visa Supplier',
        'Destination': 'United Arab Emirates',
        'Supplier Cost': 26500,
        'Currency': 'PKR',
        'Selling Price': 32000,
        'Validity Date': '2026-12-31',
        'Inclusions': 'Official GDRFA e-visa + COVID/Health Insurance',
        'Internal Notes': '12-24 hours fast-track issuance'
      }
    ];

    const worksheet = XLSX.utils.json_to_sheet(sampleRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'SkyBridge Rate Template');
    XLSX.writeFile(workbook, 'SkyBridge_B2B_Rate_Sheet_Template.xlsx');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-[#0B1B3B] tracking-tight">Excel & CSV Rate Sheet Importer</h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E3F2FD] text-[#0288D1]">
              XLSX / CSV Ready
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Bulk upload supplier price sheets, map column headers to the SkyBridge database, and update rates in seconds.
          </p>
        </div>

        <button
          onClick={handleDownloadSampleTemplate}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-colors shadow-sm self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-[#0288D1]" />
          <span>Download Sample Template</span>
        </button>
      </div>

      {/* Step Indicator */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              importStep >= 1 ? 'bg-[#0B1B3B] text-white' : 'bg-slate-100 text-slate-400'
            }`}
          >
            1
          </div>
          <span className={`text-xs font-bold ${importStep >= 1 ? 'text-[#0B1B3B]' : 'text-slate-400'}`}>
            Upload Spreadsheet
          </span>
        </div>

        <div className="h-0.5 flex-1 mx-4 bg-slate-200"></div>

        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              importStep >= 2 ? 'bg-[#0B1B3B] text-white' : 'bg-slate-100 text-slate-400'
            }`}
          >
            2
          </div>
          <span className={`text-xs font-bold ${importStep >= 2 ? 'text-[#0B1B3B]' : 'text-slate-400'}`}>
            Map Columns & Preview
          </span>
        </div>

        <div className="h-0.5 flex-1 mx-4 bg-slate-200"></div>

        <div className="flex items-center gap-3">
          <div
            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
              importStep === 3 ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-400'
            }`}
          >
            3
          </div>
          <span className={`text-xs font-bold ${importStep === 3 ? 'text-emerald-700' : 'text-slate-400'}`}>
            Synced with Database
          </span>
        </div>
      </div>

      {/* STEP 1: Upload Box */}
      {importStep === 1 && (
        <div className="space-y-4">
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-sky-300 hover:border-[#0288D1] bg-sky-50/40 hover:bg-sky-50/80 rounded-3xl p-12 text-center cursor-pointer transition-all flex flex-col items-center justify-center"
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])}
              accept=".xlsx,.xls,.csv"
              className="hidden"
            />
            <div className="w-16 h-16 rounded-2xl bg-white shadow-md border border-sky-100 flex items-center justify-center text-[#0288D1] mb-4">
              <Upload className="w-8 h-8" />
            </div>
            <h3 className="text-base font-bold text-[#0B1B3B]">
              Drop your supplier price file here, or <span className="text-[#0288D1] underline">browse files</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Supports Excel (.xlsx, .xls) and Comma-Separated Values (.csv) up to 25MB
            </p>
          </div>

          {isParsing && (
            <div className="bg-sky-50 p-4 rounded-2xl flex items-center gap-3 text-xs text-[#0288D1] font-bold">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Analyzing spreadsheet headers and rows...</span>
            </div>
          )}

          {parsingError && (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl flex items-center gap-3 text-xs text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{parsingError}</span>
            </div>
          )}
        </div>
      )}

      {/* STEP 2: Map & Preview */}
      {importStep === 2 && (
        <div className="space-y-6">
          {/* File summary banner */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
              <div>
                <h3 className="text-xs font-bold text-[#0B1B3B]">{file?.name}</h3>
                <p className="text-[11px] text-slate-500">
                  {rawData.length} rows found • {rawHeaders.length} columns detected
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setFile(null);
                setRawData([]);
                setRawHeaders([]);
                setImportStep(1);
              }}
              className="text-xs font-bold text-rose-600 hover:underline flex items-center gap-1"
            >
              <X className="w-3.5 h-3.5" />
              <span>Choose different file</span>
            </button>
          </div>

          {/* Column Mapping Grid */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-[#0B1B3B]">Map Excel Columns to SkyBridge Database</h3>
                <p className="text-xs text-slate-500">
                  Verify or match each SkyBridge pricing field with the corresponding column in your spreadsheet.
                </p>
              </div>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">
                Auto-Detection Applied
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Product / Service Name <span className="text-rose-600">*</span>
                </label>
                <select
                  value={mapping.product}
                  onChange={e => setMapping({ ...mapping, product: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                >
                  <option value="">-- Select Column --</option>
                  {rawHeaders.map(h => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Supplier Net Cost <span className="text-rose-600">*</span>
                </label>
                <select
                  value={mapping.supplierCost}
                  onChange={e => setMapping({ ...mapping, supplierCost: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#4FC3F7]"
                >
                  <option value="">-- Select Column --</option>
                  {rawHeaders.map(h => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Supplier Name</label>
                <select
                  value={mapping.supplierName}
                  onChange={e => setMapping({ ...mapping, supplierName: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="">-- Use Default Supplier Below --</option>
                  {rawHeaders.map(h => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Client Selling Price</label>
                <select
                  value={mapping.clientSellingPrice}
                  onChange={e => setMapping({ ...mapping, clientSellingPrice: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="">-- Auto-calculate (+15%) --</option>
                  {rawHeaders.map(h => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Currency</label>
                <select
                  value={mapping.currency}
                  onChange={e => setMapping({ ...mapping, currency: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="">-- Use Default ({defaultCurrency}) --</option>
                  {rawHeaders.map(h => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                <select
                  value={mapping.category}
                  onChange={e => setMapping({ ...mapping, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="">-- Default (Airline / Ticketing) --</option>
                  {rawHeaders.map(h => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Destination / Route</label>
                <select
                  value={mapping.destination}
                  onChange={e => setMapping({ ...mapping, destination: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="">-- None / General --</option>
                  {rawHeaders.map(h => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Validity / End Date</label>
                <select
                  value={mapping.validityEnd}
                  onChange={e => setMapping({ ...mapping, validityEnd: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="">-- None (30 Days Default) --</option>
                  {rawHeaders.map(h => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Inclusions / Features</label>
                <select
                  value={mapping.inclusions}
                  onChange={e => setMapping({ ...mapping, inclusions: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="">-- None --</option>
                  {rawHeaders.map(h => (
                    <option key={h} value={h}>
                      {h}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Import Settings & Duplicate Rules */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold uppercase text-slate-600 tracking-wider">
              Import Configuration & Duplicate Detection
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Default Supplier</label>
                <select
                  value={selectedDefaultSupplier}
                  onChange={e => setSelectedDefaultSupplier(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none"
                >
                  {suppliers.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.companyName || s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Default Currency</label>
                <select
                  value={defaultCurrency}
                  onChange={e => setDefaultCurrency(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="PKR">PKR (Pakistani Rupee)</option>
                  <option value="USD">USD (US Dollar)</option>
                  <option value="AED">AED (UAE Dirham)</option>
                  <option value="EUR">EUR (Euro)</option>
                  <option value="GBP">GBP (British Pound)</option>
                  <option value="SAR">SAR (Saudi Riyal)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Duplicate Action</label>
                <select
                  value={duplicateAction}
                  onChange={e => setDuplicateAction(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none"
                >
                  <option value="update">Update existing rate in SkyBridge</option>
                  <option value="skip">Skip duplicates (keep current)</option>
                  <option value="add_new">Always insert as new rate item</option>
                </select>
              </div>
            </div>
          </div>

          {/* First 5 Preview Rows */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden space-y-2 p-4">
            <h4 className="text-xs font-bold text-[#0B1B3B]">
              Preview Data Sample (First 5 of {rawData.length} rows)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-600 border-b border-slate-200">
                  <tr>
                    <th className="py-2.5 px-3">Product / Service</th>
                    <th className="py-2.5 px-3">Cost</th>
                    <th className="py-2.5 px-3">Supplier</th>
                    <th className="py-2.5 px-3">Destination</th>
                    <th className="py-2.5 px-3">Selling Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rawData.slice(0, 5).map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="py-2 px-3 font-semibold text-slate-800">
                        {mapping.product ? String(row[mapping.product] || '') : 'N/A'}
                      </td>
                      <td className="py-2 px-3 font-mono font-bold text-slate-900">
                        {mapping.supplierCost ? String(row[mapping.supplierCost] || '') : 'N/A'}
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        {mapping.supplierName ? String(row[mapping.supplierName] || '') : 'Default Supplier'}
                      </td>
                      <td className="py-2 px-3 text-slate-600">
                        {mapping.destination ? String(row[mapping.destination] || '') : 'General'}
                      </td>
                      <td className="py-2 px-3 font-mono text-emerald-600 font-bold">
                        {mapping.clientSellingPrice ? String(row[mapping.clientSellingPrice] || '') : 'Auto +15%'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Execution Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => setImportStep(1)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
            >
              Back to Upload
            </button>

            <button
              onClick={handleExecuteImport}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors shadow-md"
            >
              <span>Ingest & Sync {rawData.length} Records</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Completed */}
      {importStep === 3 && importResult && (
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm text-center max-w-lg mx-auto space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
            <Check className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-black text-[#0B1B3B]">Data Ingestion Completed</h2>
          <p className="text-xs text-slate-500">
            The supplier rate sheet has been validated, mapped, and updated in the SkyBridge Price Database.
          </p>

          <div className="grid grid-cols-3 gap-2 bg-slate-50 p-4 rounded-2xl text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Added</span>
              <span className="text-lg font-black text-emerald-600 font-mono">+{importResult.added}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Updated</span>
              <span className="text-lg font-black text-sky-600 font-mono">{importResult.updated}</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold">Skipped</span>
              <span className="text-lg font-black text-slate-400 font-mono">{importResult.skipped}</span>
            </div>
          </div>

          <div className="pt-3 flex justify-center gap-3">
            <button
              onClick={() => {
                setFile(null);
                setRawData([]);
                setRawHeaders([]);
                setImportStep(1);
              }}
              className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
            >
              Upload Another Sheet
            </button>
            <Link
              to="/admin/price-check"
              className="px-5 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors"
            >
              View Updated Rates
            </Link>
          </div>
        </div>
      )}

      {/* Historical Imports Audit Trail */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-slate-100">
          <h3 className="text-sm font-bold text-[#0B1B3B] flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-400" />
            <span>Import History & File Audit Log</span>
          </h3>
          <span className="text-xs text-slate-400 font-semibold">{importedFiles.length} file operations</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-[10px] uppercase font-bold text-slate-500">
              <tr>
                <th className="py-2 px-3">File Name</th>
                <th className="py-2 px-3">Supplier</th>
                <th className="py-2 px-3">Rows</th>
                <th className="py-2 px-3">Added / Updated</th>
                <th className="py-2 px-3">Imported By</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {importedFiles.map(log => (
                <tr key={log.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-slate-800 flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                    <span>{log.fileName}</span>
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{log.supplierName || 'Amadeus Global'}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">{log.rowCount || log.recordsTotal || 0}</td>
                  <td className="py-2.5 px-3 font-mono text-emerald-700">
                    +{log.recordsAdded || log.recordsImported || 0} / {log.recordsUpdated || 0}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{log.importedBy || log.uploadedBy || 'Admin'}</td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {log.status || log.importStatus || 'Completed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
