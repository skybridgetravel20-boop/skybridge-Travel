import React, { useState, useEffect } from 'react';
import {
  Moon,
  Sparkles,
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Plane,
  Building2,
  Calendar,
  FileText,
  User,
  Phone,
  MessageCircle,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Download,
  RefreshCw,
  ExternalLink,
  Edit2,
  Trash2,
  X,
  Save,
  Train,
  Check,
  Share2,
  Send
} from 'lucide-react';
import { UmrahPilgrimRecord, UmrahPilgrimStatus, UmrahVisaStage, RawdahPermitStatus } from '../../types';
import { INITIAL_UMRAH_PILGRIMS } from '../../data/umrahPilgrimsData';
import { COMPANY_INFO, getWhatsAppLink } from '../../data/companyInfo';
import { useCrm } from '../../context/CrmContext';
import {
  saveUmrahPilgrimToFirebase,
  deleteUmrahPilgrimFromFirebase,
  getUmrahPilgrimsFromFirebase
} from '../../services/firebaseCrmService';

const STORAGE_KEY = 'skybridge_umrah_pilgrims_v1';

export const UmrahStatusTracker: React.FC = () => {
  const { auth, customers } = useCrm();

  // Load from localStorage or fallback to initial data
  const [pilgrims, setPilgrims] = useState<UmrahPilgrimRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading umrah pilgrims from localStorage', e);
    }
    return INITIAL_UMRAH_PILGRIMS;
  });

  // Background fetch from Firebase on mount
  useEffect(() => {
    let isMounted = true;
    getUmrahPilgrimsFromFirebase()
      .then(fbPilgrims => {
        if (isMounted && fbPilgrims && fbPilgrims.length > 0) {
          setPilgrims(fbPilgrims);
        }
      })
      .catch(() => {
        // Fallback to local storage silently
      });
    return () => {
      isMounted = false;
    };
  }, []);

  // Save to localStorage and Firebase on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pilgrims));
    } catch (e) {
      console.error('Error persisting umrah pilgrims', e);
    }
  }, [pilgrims]);

  // Filter & Search states
  const [statusFilter, setStatusFilter] = useState<'All' | UmrahPilgrimStatus>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'cards' | 'roster'>('cards');
  const [expandedPilgrimId, setExpandedPilgrimId] = useState<string | null>(pilgrims[0]?.id || null);

  // Modal State for New / Edit Pilgrim
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPilgrim, setEditingPilgrim] = useState<UmrahPilgrimRecord | null>(null);

  // Form State
  const [formData, setFormData] = useState<Partial<UmrahPilgrimRecord>>({
    pilgrimName: '',
    gender: 'Male',
    age: 45,
    passportNumber: '',
    passportExpiry: '',
    phone: '',
    whatsApp: '',
    city: 'Lahore',
    packageType: '4-Star Executive',
    groupLeaderName: '',
    mehramName: '',
    relationWithMehram: '',
    departureDate: '',
    returnDate: '',
    flightAirline: 'Saudia Airlines (SV-737 / SV-734)',
    flightPnr: '',
    makkahHotel: 'Swissôtel Makkah (Clock Tower)',
    makkahNights: 7,
    madinahHotel: 'Dar Al Taqwa Madinah (Courtyard)',
    madinahNights: 5,
    haramainTrainIncluded: true,
    ziyaratIncluded: true,
    passportSubmitted: true,
    photoSubmitted: false,
    polioVaccineCard: false,
    biometricEnrolled: false,
    visaStage: 'Documents Pending',
    eVisaNumber: '',
    rawdahPermitStatus: 'Not Booked',
    rawdahSlotTime: '',
    hotelVoucherIssued: false,
    ticketIssued: false,
    idCardIssued: false,
    status: 'Document Collection',
    agentNotes: '',
    assignedAgent: auth.user?.name || 'Urwa Ali (Director)'
  });

  // KPI Metrics Calculation
  const totalPilgrims = pilgrims.length;
  const readyForDepartureCount = pilgrims.filter(p => p.status === 'Ready for Departure').length;
  const visaProcessingCount = pilgrims.filter(p => p.status === 'Visa Processing' || p.status === 'Document Collection').length;
  const inKingdomCount = pilgrims.filter(p => p.status === 'In Kingdom').length;
  const rawdahConfirmedCount = pilgrims.filter(p => p.rawdahPermitStatus === 'Confirmed & QR Ready' || p.rawdahPermitStatus === 'Visited').length;

  // Filtered list
  const filteredPilgrims = pilgrims.filter(p => {
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery =
      !q ||
      p.pilgrimName.toLowerCase().includes(q) ||
      p.passportNumber.toLowerCase().includes(q) ||
      (p.eVisaNumber && p.eVisaNumber.toLowerCase().includes(q)) ||
      (p.flightPnr && p.flightPnr.toLowerCase().includes(q)) ||
      p.city.toLowerCase().includes(q) ||
      (p.groupLeaderName && p.groupLeaderName.toLowerCase().includes(q));
    return matchesStatus && matchesQuery;
  });

  // Calculate day countdown or status message
  const getTravelDayStatus = (departureDate: string, returnDate: string, status: UmrahPilgrimStatus) => {
    if (status === 'Completed') return { text: 'Pilgrimage Completed', color: 'text-slate-500 bg-slate-100' };
    if (!departureDate) return { text: 'Dates Pending', color: 'text-slate-400 bg-slate-50' };

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const dep = new Date(departureDate);
    dep.setHours(0, 0, 0, 0);
    const ret = returnDate ? new Date(returnDate) : null;
    if (ret) ret.setHours(0, 0, 0, 0);

    const diffTime = dep.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      if (diffDays <= 7) {
        return { text: `Departs in ${diffDays} day${diffDays > 1 ? 's' : ''}`, color: 'text-amber-800 bg-amber-100 font-bold' };
      }
      return { text: `Departs in ${diffDays} days`, color: 'text-sky-800 bg-sky-100' };
    } else if (diffDays === 0) {
      return { text: 'Departing Today! ✈️', color: 'text-emerald-800 bg-emerald-100 font-black' };
    } else {
      if (ret && today.getTime() <= ret.getTime()) {
        const inTripDays = Math.abs(diffDays) + 1;
        return { text: `Day ${inTripDays} in Kingdom 🕋`, color: 'text-emerald-900 bg-emerald-200 font-bold' };
      }
      return { text: 'Returned from Saudi', color: 'text-slate-600 bg-slate-100' };
    }
  };

  // Open Modal for Create
  const handleOpenCreateModal = () => {
    setEditingPilgrim(null);
    setFormData({
      pilgrimName: '',
      gender: 'Male',
      age: 45,
      passportNumber: '',
      passportExpiry: '',
      phone: '',
      whatsApp: '',
      city: 'Lahore',
      packageType: '4-Star Executive',
      groupLeaderName: '',
      mehramName: '',
      relationWithMehram: '',
      departureDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      returnDate: new Date(Date.now() + 29 * 86400000).toISOString().split('T')[0],
      flightAirline: 'Saudia Airlines (SV-737 / SV-734)',
      flightPnr: '',
      makkahHotel: 'Swissôtel Makkah (Clock Tower)',
      makkahNights: 7,
      madinahHotel: 'Dar Al Taqwa Madinah (Courtyard)',
      madinahNights: 7,
      haramainTrainIncluded: true,
      ziyaratIncluded: true,
      passportSubmitted: true,
      photoSubmitted: false,
      polioVaccineCard: false,
      biometricEnrolled: false,
      visaStage: 'Documents Pending',
      eVisaNumber: '',
      rawdahPermitStatus: 'Not Booked',
      rawdahSlotTime: '',
      hotelVoucherIssued: false,
      ticketIssued: false,
      idCardIssued: false,
      status: 'Document Collection',
      agentNotes: '',
      assignedAgent: auth.user?.name || 'Urwa Ali (Director)'
    });
    setIsModalOpen(true);
  };

  // Open Modal for Edit
  const handleOpenEditModal = (pilgrim: UmrahPilgrimRecord) => {
    setEditingPilgrim(pilgrim);
    setFormData({ ...pilgrim });
    setIsModalOpen(true);
  };

  // Save Modal Form
  const handleSavePilgrim = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.pilgrimName || !formData.passportNumber) {
      alert('Please provide at least Pilgrim Name and Passport Number.');
      return;
    }

    if (editingPilgrim) {
      // Update
      const updated: UmrahPilgrimRecord = {
        ...(editingPilgrim as UmrahPilgrimRecord),
        ...formData,
        updatedAt: new Date().toISOString()
      } as UmrahPilgrimRecord;

      setPilgrims(prev => prev.map(p => (p.id === editingPilgrim.id ? updated : p)));
    } else {
      // Create new
      const nextNum = pilgrims.length + 1;
      const newId = `UMR-2026-${String(nextNum).padStart(3, '0')}`;
      const newPilgrim: UmrahPilgrimRecord = {
        id: newId,
        pilgrimName: formData.pilgrimName || '',
        gender: formData.gender || 'Male',
        age: formData.age || 40,
        passportNumber: (formData.passportNumber || '').toUpperCase(),
        passportExpiry: formData.passportExpiry || '',
        phone: formData.phone || '',
        whatsApp: formData.whatsApp || formData.phone || '',
        city: formData.city || 'Lahore',
        packageType: formData.packageType || '4-Star Executive',
        groupLeaderName: formData.groupLeaderName || formData.pilgrimName,
        mehramName: formData.mehramName,
        relationWithMehram: formData.relationWithMehram,
        departureDate: formData.departureDate || '',
        returnDate: formData.returnDate || '',
        flightAirline: formData.flightAirline || 'Saudia Airlines',
        flightPnr: (formData.flightPnr || '').toUpperCase(),
        makkahHotel: formData.makkahHotel || 'Swissôtel Makkah',
        makkahNights: formData.makkahNights || 7,
        madinahHotel: formData.madinahHotel || 'Dar Al Taqwa Madinah',
        madinahNights: formData.madinahNights || 7,
        haramainTrainIncluded: formData.haramainTrainIncluded ?? true,
        ziyaratIncluded: formData.ziyaratIncluded ?? true,
        passportSubmitted: formData.passportSubmitted ?? true,
        photoSubmitted: formData.photoSubmitted ?? false,
        polioVaccineCard: formData.polioVaccineCard ?? false,
        biometricEnrolled: formData.biometricEnrolled ?? false,
        visaStage: formData.visaStage || 'Documents Pending',
        eVisaNumber: formData.eVisaNumber,
        visaIssueDate: formData.visaIssueDate,
        rawdahPermitStatus: formData.rawdahPermitStatus || 'Not Booked',
        rawdahSlotTime: formData.rawdahSlotTime,
        hotelVoucherIssued: formData.hotelVoucherIssued ?? false,
        ticketIssued: formData.ticketIssued ?? false,
        idCardIssued: formData.idCardIssued ?? false,
        status: formData.status || 'Document Collection',
        agentNotes: formData.agentNotes || 'Registered in SkyBridge Umrah desk.',
        assignedAgent: formData.assignedAgent || auth.user?.name || 'Urwa Ali',
        updatedAt: new Date().toISOString()
      };

      setPilgrims(prev => [newPilgrim, ...prev]);
      setExpandedPilgrimId(newPilgrim.id);
    }

    setIsModalOpen(false);
  };

  // Toggle single document boolean quick actions
  const handleToggleDoc = (pilgrimId: string, field: keyof UmrahPilgrimRecord) => {
    setPilgrims(prev =>
      prev.map(p => {
        if (p.id === pilgrimId) {
          const newVal = !p[field];
          return {
            ...p,
            [field]: newVal,
            updatedAt: new Date().toISOString()
          };
        }
        return p;
      })
    );
  };

  // Quick update visa stage
  const handleUpdateVisaStage = (pilgrimId: string, newStage: UmrahVisaStage) => {
    let visaNum = prompt('Enter Saudi E-Visa Number (Leave blank to keep existing):');
    setPilgrims(prev =>
      prev.map(p => {
        if (p.id === pilgrimId) {
          return {
            ...p,
            visaStage: newStage,
            eVisaNumber: visaNum ? visaNum.trim() : p.eVisaNumber,
            visaIssueDate: newStage === 'E-Visa Issued' && !p.visaIssueDate ? new Date().toISOString().split('T')[0] : p.visaIssueDate,
            status: newStage === 'E-Visa Issued' ? 'Ready for Departure' : p.status,
            updatedAt: new Date().toISOString()
          };
        }
        return p;
      })
    );
  };

  // Quick update rawdah permit status
  const handleUpdateRawdahStatus = (pilgrimId: string, newStatus: RawdahPermitStatus) => {
    let slotDetails = prompt('Enter Rawdah Slot Time & Gate (e.g. "2026-11-14 20:30 Men Gate 37"):');
    setPilgrims(prev =>
      prev.map(p => {
        if (p.id === pilgrimId) {
          return {
            ...p,
            rawdahPermitStatus: newStatus,
            rawdahSlotTime: slotDetails ? slotDetails.trim() : p.rawdahSlotTime,
            updatedAt: new Date().toISOString()
          };
        }
        return p;
      })
    );
  };

  // Quick update overall status
  const handleUpdateOverallStatus = (pilgrimId: string, newStatus: UmrahPilgrimStatus) => {
    setPilgrims(prev =>
      prev.map(p => {
        if (p.id === pilgrimId) {
          return {
            ...p,
            status: newStatus,
            updatedAt: new Date().toISOString()
          };
        }
        return p;
      })
    );
  };

  // Delete pilgrim
  const handleDeletePilgrim = (pilgrimId: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove pilgrim record for "${name}" (${pilgrimId})?`)) {
      setPilgrims(prev => prev.filter(p => p.id !== pilgrimId));
    }
  };

  // WhatsApp Notification Message Generator
  const generateWhatsAppMessage = (p: UmrahPilgrimRecord, type: 'visa' | 'rawdah' | 'itinerary') => {
    const phone = p.whatsApp.replace(/[^0-9]/g, '');
    let text = '';

    if (type === 'visa') {
      text = `*Assalam-o-Alaikum ${p.pilgrimName} Sahab,*%0A%0AAlhamdulillah! Your official *Saudi Umrah E-Visa* has been approved and issued by the Ministry of Foreign Affairs (MOFA).%0A%0A*Pilgrim Details:*%0A- Name: ${p.pilgrimName}%0A- Passport: ${p.passportNumber}%0A- E-Visa No: *${p.eVisaNumber || 'Issued'}*%0A- Travel Dates: ${p.departureDate} to ${p.returnDate}%0A- Flight PNR: ${p.flightPnr || 'Confirmed'}%0A- Makkah Hotel: ${p.makkahHotel}%0A- Madinah Hotel: ${p.madinahHotel}%0A%0AOur executive team at SkyBridge Travel & Tourism is completing your baggage tags and hotel vouchers. We wish you a peaceful and accepted pilgrimage!%0A%0A_SkyBridge Travel & Tourism | Lahore Desk_`;
    } else if (type === 'rawdah') {
      text = `*Assalam-o-Alaikum ${p.pilgrimName} Sahab,*%0A%0AYour *Nusuk App Rawdah Riaz-ul-Jannah Prayer Permit* slot has been confirmed.%0A%0A- Slot Details: *${p.rawdahSlotTime || 'Confirmed on Nusuk'}*%0A- Status: Official QR Ready%0A%0APlease make sure to arrive at the designated courtyard gate 15 minutes before your scheduled slot time with your passport copy.%0A%0A_SkyBridge Travel & Tourism_`;
    } else {
      text = `*Assalam-o-Alaikum ${p.pilgrimName} Sahab,*%0A%0AHere is the current status update for your upcoming Umrah journey with SkyBridge Travel & Tourism:%0A%0A- Status: *${p.status}*%0A- Departure Date: ${p.departureDate}%0A- Flight: ${p.flightAirline} (PNR: ${p.flightPnr})%0A- Visa Stage: ${p.visaStage}%0A- Rawdah Slot: ${p.rawdahPermitStatus}%0A%0APlease contact your assigned officer (${p.assignedAgent}) for any questions.%0A%0A_SkyBridge Travel & Tourism | Lahore_`;
    }

    return `https://wa.me/${phone}?text=${text}`;
  };

  // Export CSV Roster
  const handleExportCsv = () => {
    const headers = [
      'Record ID',
      'Pilgrim Name',
      'Gender',
      'Age',
      'Passport Number',
      'Passport Expiry',
      'Contact Phone',
      'City',
      'Package Type',
      'Departure Date',
      'Return Date',
      'Flight Airline',
      'Flight PNR',
      'Makkah Hotel',
      'Madinah Hotel',
      'Visa Stage',
      'E-Visa Number',
      'Rawdah Permit',
      'Rawdah Slot',
      'Overall Status',
      'Assigned Agent'
    ];

    const rows = pilgrims.map(p => [
      p.id,
      `"${p.pilgrimName}"`,
      p.gender,
      p.age,
      p.passportNumber,
      p.passportExpiry,
      `"${p.phone}"`,
      `"${p.city}"`,
      `"${p.packageType}"`,
      p.departureDate,
      p.returnDate,
      `"${p.flightAirline}"`,
      p.flightPnr,
      `"${p.makkahHotel}"`,
      `"${p.madinahHotel}"`,
      p.visaStage,
      p.eVisaNumber || 'N/A',
      p.rawdahPermitStatus,
      `"${p.rawdahSlotTime || 'N/A'}"`,
      p.status,
      `"${p.assignedAgent}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SkyBridge_Umrah_Pilgrims_Roster_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm space-y-6">
      {/* 1. Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-600 via-teal-700 to-[#0B1B3B] text-white flex items-center justify-center shadow-md">
            <Moon className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-[#0B1B3B] tracking-tight">
                Umrah Pilgrim Status & Processing Tracker
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                Live Operations
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Monitor individual pilgrim document clearance, Nusuk e-visas, Rawdah prayer slots, and travel dates.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Toggle View Mode */}
          <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200 text-xs font-bold text-slate-600">
            <button
              onClick={() => setViewMode('cards')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'cards' ? 'bg-white text-[#0B1B3B] shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Stage Cards
            </button>
            <button
              onClick={() => setViewMode('roster')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === 'roster' ? 'bg-white text-[#0B1B3B] shadow-xs' : 'hover:text-slate-900'
              }`}
            >
              Roster Table
            </button>
          </div>

          <button
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
            title="Download CSV for Airport Departure Desk"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span className="hidden sm:inline">Export Roster</span>
          </button>

          <button
            onClick={handleOpenCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#0288D1] text-white text-xs font-bold transition-all shadow-sm"
          >
            <Plus className="w-4 h-4 text-amber-400" />
            <span>+ Register Pilgrim</span>
          </button>
        </div>
      </div>

      {/* 2. Key KPI Metric Strips */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div
          onClick={() => setStatusFilter('All')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'All' ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-slate-50 border-slate-200/80 hover:border-slate-300'
          }`}
        >
          <span className={`text-[10px] font-bold uppercase tracking-wider block ${statusFilter === 'All' ? 'text-slate-400' : 'text-slate-500'}`}>
            Total Pilgrims
          </span>
          <div className="text-xl font-black font-mono mt-1">{totalPilgrims}</div>
          <span className="text-[10px] text-sky-400 block mt-0.5">Active files in system</span>
        </div>

        <div
          onClick={() => setStatusFilter('Ready for Departure')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'Ready for Departure'
              ? 'bg-emerald-800 text-white border-emerald-900 shadow-sm'
              : 'bg-emerald-50/60 border-emerald-200/80 hover:bg-emerald-50'
          }`}
        >
          <span className={`text-[10px] font-bold uppercase tracking-wider block ${statusFilter === 'Ready for Departure' ? 'text-emerald-200' : 'text-emerald-800'}`}>
            Ready to Fly
          </span>
          <div className={`text-xl font-black font-mono mt-1 ${statusFilter === 'Ready for Departure' ? 'text-white' : 'text-emerald-900'}`}>
            {readyForDepartureCount}
          </div>
          <span className={`text-[10px] block mt-0.5 ${statusFilter === 'Ready for Departure' ? 'text-emerald-200' : 'text-emerald-700 font-semibold'}`}>
            Visas & Vouchers Issued
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('Visa Processing')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'Visa Processing'
              ? 'bg-amber-800 text-white border-amber-900 shadow-sm'
              : 'bg-amber-50/60 border-amber-200/80 hover:bg-amber-50'
          }`}
        >
          <span className={`text-[10px] font-bold uppercase tracking-wider block ${statusFilter === 'Visa Processing' ? 'text-amber-200' : 'text-amber-800'}`}>
            Processing MOFA
          </span>
          <div className={`text-xl font-black font-mono mt-1 ${statusFilter === 'Visa Processing' ? 'text-white' : 'text-amber-900'}`}>
            {visaProcessingCount}
          </div>
          <span className={`text-[10px] block mt-0.5 ${statusFilter === 'Visa Processing' ? 'text-amber-200' : 'text-amber-700 font-semibold'}`}>
            Nusuk / Biometrics queue
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('In Kingdom')}
          className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
            statusFilter === 'In Kingdom'
              ? 'bg-sky-800 text-white border-sky-900 shadow-sm'
              : 'bg-sky-50/60 border-sky-200/80 hover:bg-sky-50'
          }`}
        >
          <span className={`text-[10px] font-bold uppercase tracking-wider block ${statusFilter === 'In Kingdom' ? 'text-sky-200' : 'text-sky-800'}`}>
            In Kingdom 🕋
          </span>
          <div className={`text-xl font-black font-mono mt-1 ${statusFilter === 'In Kingdom' ? 'text-white' : 'text-sky-900'}`}>
            {inKingdomCount}
          </div>
          <span className={`text-[10px] block mt-0.5 ${statusFilter === 'In Kingdom' ? 'text-sky-200' : 'text-sky-700 font-semibold'}`}>
            Makkah / Madinah Stays
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-purple-50/60 border border-purple-200/80">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-800 block">
            Rawdah QR Permits
          </span>
          <div className="text-xl font-black text-purple-950 font-mono mt-1">
            {rawdahConfirmedCount} / {totalPilgrims}
          </div>
          <span className="text-[10px] text-purple-700 font-semibold block mt-0.5">
            Confirmed Slots on Nusuk
          </span>
        </div>
      </div>

      {/* 3. Search Bar & Status Filter Pills */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Pills */}
        <div className="flex flex-wrap items-center gap-1.5">
          {(['All', 'Document Collection', 'Visa Processing', 'Ready for Departure', 'In Kingdom', 'Completed'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                statusFilter === tab
                  ? 'bg-[#0B1B3B] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              {tab === 'All' ? 'All Stages' : tab}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search pilgrim, passport, PNR..."
            className="w-full pl-9 pr-3.5 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0288D1] transition-colors"
          />
        </div>
      </div>

      {/* 4. CONTENT VIEW: Detailed Stage Cards vs Compact Roster */}
      {filteredPilgrims.length === 0 ? (
        <div className="p-10 text-center bg-slate-50 rounded-2xl border border-slate-200">
          <Moon className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-700">No Umrah pilgrim records found</h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search query or stage filters, or register a new pilgrim.
          </p>
          <button
            onClick={handleOpenCreateModal}
            className="mt-4 px-4 py-2 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold inline-flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register First Pilgrim</span>
          </button>
        </div>
      ) : viewMode === 'cards' ? (
        /* STAGE CARDS VIEW */
        <div className="space-y-4">
          {filteredPilgrims.map(pilgrim => {
            const isExpanded = expandedPilgrimId === pilgrim.id;
            const travelStatus = getTravelDayStatus(pilgrim.departureDate, pilgrim.returnDate, pilgrim.status);

            return (
              <div
                key={pilgrim.id}
                className={`rounded-2xl border transition-all ${
                  isExpanded ? 'border-sky-300 bg-white shadow-md' : 'border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300'
                }`}
              >
                {/* Header Summary Row */}
                <div
                  onClick={() => setExpandedPilgrimId(isExpanded ? null : pilgrim.id)}
                  className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1B3B] text-amber-300 font-mono text-xs font-black flex items-center justify-center shrink-0 shadow-xs">
                      {pilgrim.gender === 'Female' ? '🧕' : '🧔'}
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-black text-[#0B1B3B]">
                          {pilgrim.pilgrimName}
                        </h3>
                        <span className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {pilgrim.passportNumber}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                          {pilgrim.packageType}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full ${travelStatus.color}`}>
                          {travelStatus.text}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-500 mt-1">
                        <span>City: <strong>{pilgrim.city}</strong></span>
                        <span>•</span>
                        <span>Flight: <strong>{pilgrim.flightAirline}</strong> ({pilgrim.flightPnr})</span>
                        <span>•</span>
                        <span>Departure: <strong>{pilgrim.departureDate}</strong></span>
                        <span>•</span>
                        <span>Return: <strong>{pilgrim.returnDate}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between md:justify-end gap-3 pt-2 md:pt-0 border-t md:border-t-0 border-slate-100">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                        Saudi E-Visa
                      </span>
                      <span className={`inline-flex items-center gap-1 text-xs font-black ${
                        pilgrim.visaStage === 'E-Visa Issued' ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {pilgrim.visaStage === 'E-Visa Issued' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5 text-amber-500" />}
                        <span>{pilgrim.visaStage}</span>
                      </span>
                    </div>

                    <div className="p-1.5 rounded-lg bg-slate-100 text-slate-500">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Expanded Details & Stage Tracking Controls */}
                {isExpanded && (
                  <div className="px-5 pb-5 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in duration-150">
                    {/* Visual 8-Stage Progress Tracker */}
                    <div className="bg-slate-50/80 rounded-2xl p-4 border border-slate-200/70">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0288D1]" />
                          <span>Document Processing & Clearance Checklist</span>
                        </span>
                        <span className="text-[11px] text-slate-400">
                          Click any checkbox to update stage
                        </span>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 text-xs">
                        {/* 1. Passport */}
                        <div
                          onClick={() => handleToggleDoc(pilgrim.id, 'passportSubmitted')}
                          className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex flex-col justify-between ${
                            pilgrim.passportSubmitted ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-slate-200 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">Step 1</span>
                            {pilgrim.passportSubmitted ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                          </div>
                          <span className="font-bold text-[11px] mt-1.5 leading-tight">Passport Scan</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">{pilgrim.passportSubmitted ? 'Verified' : 'Pending'}</span>
                        </div>

                        {/* 2. Photo */}
                        <div
                          onClick={() => handleToggleDoc(pilgrim.id, 'photoSubmitted')}
                          className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex flex-col justify-between ${
                            pilgrim.photoSubmitted ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-slate-200 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">Step 2</span>
                            {pilgrim.photoSubmitted ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                          </div>
                          <span className="font-bold text-[11px] mt-1.5 leading-tight">White BG Photo</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">{pilgrim.photoSubmitted ? 'Approved' : 'Pending'}</span>
                        </div>

                        {/* 3. Polio Card */}
                        <div
                          onClick={() => handleToggleDoc(pilgrim.id, 'polioVaccineCard')}
                          className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex flex-col justify-between ${
                            pilgrim.polioVaccineCard ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-slate-200 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">Step 3</span>
                            {pilgrim.polioVaccineCard ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                          </div>
                          <span className="font-bold text-[11px] mt-1.5 leading-tight">Polio / Vaccine</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">{pilgrim.polioVaccineCard ? 'Uploaded' : 'Pending'}</span>
                        </div>

                        {/* 4. Biometrics */}
                        <div
                          onClick={() => handleToggleDoc(pilgrim.id, 'biometricEnrolled')}
                          className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex flex-col justify-between ${
                            pilgrim.biometricEnrolled ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-slate-200 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">Step 4</span>
                            {pilgrim.biometricEnrolled ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                          </div>
                          <span className="font-bold text-[11px] mt-1.5 leading-tight">Biometrics</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">{pilgrim.biometricEnrolled ? 'Enrolled' : 'Pending'}</span>
                        </div>

                        {/* 5. E-Visa */}
                        <div
                          onClick={() => handleUpdateVisaStage(pilgrim.id, pilgrim.visaStage === 'E-Visa Issued' ? 'In Review' : 'E-Visa Issued')}
                          className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex flex-col justify-between ${
                            pilgrim.visaStage === 'E-Visa Issued' ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-2xs' : 'bg-amber-50 border-amber-300 text-amber-900'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-500">Step 5</span>
                            {pilgrim.visaStage === 'E-Visa Issued' ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> : <Clock className="w-3.5 h-3.5 text-amber-600" />}
                          </div>
                          <span className="font-bold text-[11px] mt-1.5 leading-tight">Nusuk E-Visa</span>
                          <span className="text-[10px] text-emerald-800 font-mono font-bold truncate mt-0.5">
                            {pilgrim.eVisaNumber || 'Click to Issue'}
                          </span>
                        </div>

                        {/* 6. Rawdah Slot */}
                        <div
                          onClick={() => handleUpdateRawdahStatus(pilgrim.id, pilgrim.rawdahPermitStatus === 'Confirmed & QR Ready' ? 'Not Booked' : 'Confirmed & QR Ready')}
                          className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex flex-col justify-between ${
                            pilgrim.rawdahPermitStatus === 'Confirmed & QR Ready' || pilgrim.rawdahPermitStatus === 'Visited'
                              ? 'bg-purple-50 border-purple-300 text-purple-950'
                              : 'bg-white border-slate-200 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">Step 6</span>
                            {pilgrim.rawdahPermitStatus === 'Confirmed & QR Ready' || pilgrim.rawdahPermitStatus === 'Visited' ? (
                              <Check className="w-3.5 h-3.5 text-purple-700" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-slate-300" />
                            )}
                          </div>
                          <span className="font-bold text-[11px] mt-1.5 leading-tight">Rawdah Permit</span>
                          <span className="text-[10px] text-purple-800 font-semibold mt-0.5 truncate">
                            {pilgrim.rawdahPermitStatus}
                          </span>
                        </div>

                        {/* 7. Hotel & Ticket Vouchers */}
                        <div
                          onClick={() => {
                            handleToggleDoc(pilgrim.id, 'hotelVoucherIssued');
                            handleToggleDoc(pilgrim.id, 'ticketIssued');
                          }}
                          className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex flex-col justify-between ${
                            pilgrim.hotelVoucherIssued && pilgrim.ticketIssued
                              ? 'bg-emerald-50 border-emerald-300 text-emerald-950'
                              : 'bg-white border-slate-200 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">Step 7</span>
                            {pilgrim.hotelVoucherIssued && pilgrim.ticketIssued ? (
                              <Check className="w-3.5 h-3.5 text-emerald-600" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-slate-300" />
                            )}
                          </div>
                          <span className="font-bold text-[11px] mt-1.5 leading-tight">Hotel & Tickets</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">
                            {pilgrim.hotelVoucherIssued && pilgrim.ticketIssued ? 'Confirmed' : 'Pending'}
                          </span>
                        </div>

                        {/* 8. Handover Kit */}
                        <div
                          onClick={() => handleToggleDoc(pilgrim.id, 'idCardIssued')}
                          className={`p-2.5 rounded-xl border cursor-pointer select-none transition-all flex flex-col justify-between ${
                            pilgrim.idCardIssued ? 'bg-emerald-50 border-emerald-300 text-emerald-950' : 'bg-white border-slate-200 text-slate-500'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400">Step 8</span>
                            {pilgrim.idCardIssued ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <div className="w-3 h-3 rounded-full border border-slate-300" />}
                          </div>
                          <span className="font-bold text-[11px] mt-1.5 leading-tight">Departure Kit</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">{pilgrim.idCardIssued ? 'Handed Over' : 'In Office'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Detailed Logistics & Accommodations Info */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      {/* Accommodations */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>Courtyard Accommodations</span>
                        </span>
                        <div>
                          <div className="font-bold text-[#0B1B3B]">{pilgrim.makkahHotel}</div>
                          <div className="text-slate-500 text-[11px]">
                            Makkah: <strong>{pilgrim.makkahNights} Nights</strong> (Courtyard Walk)
                          </div>
                        </div>
                        <div className="pt-1 border-t border-slate-100">
                          <div className="font-bold text-[#0B1B3B]">{pilgrim.madinahHotel}</div>
                          <div className="text-slate-500 text-[11px]">
                            Madinah: <strong>{pilgrim.madinahNights} Nights</strong> (Front Row)
                          </div>
                        </div>
                      </div>

                      {/* Travel & Ground Logistics */}
                      <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                          <Train className="w-3.5 h-3.5 text-sky-600" />
                          <span>Transit & Transfers</span>
                        </span>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Haramain Bullet Train:</span>
                            <span className={`font-bold ${pilgrim.haramainTrainIncluded ? 'text-emerald-700' : 'text-slate-400'}`}>
                              {pilgrim.haramainTrainIncluded ? 'Included (Makkah-Madinah)' : 'By Bus'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Historical Ziyarat:</span>
                            <span className={`font-bold ${pilgrim.ziyaratIncluded ? 'text-emerald-700' : 'text-slate-400'}`}>
                              {pilgrim.ziyaratIncluded ? 'Private AC Vehicle' : 'Optional'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-slate-600">Rawdah Slot Time:</span>
                            <span className="font-bold text-purple-900 truncate max-w-[160px]">
                              {pilgrim.rawdahSlotTime || 'Slot Pending'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Agent Communication & WhatsApp Triggers */}
                      <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 shadow-2xs space-y-2.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
                          <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Direct Pilgrim WhatsApp Updates</span>
                        </span>

                        <div className="grid grid-cols-1 gap-1.5">
                          <a
                            href={generateWhatsAppMessage(pilgrim, 'visa')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1.5 px-3 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-[11px] font-bold hover:bg-emerald-100 flex items-center justify-between transition-colors shadow-2xs"
                          >
                            <span>Send E-Visa Issued Notice</span>
                            <Send className="w-3 h-3 text-emerald-600" />
                          </a>

                          <a
                            href={generateWhatsAppMessage(pilgrim, 'rawdah')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1.5 px-3 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-[11px] font-bold hover:bg-emerald-100 flex items-center justify-between transition-colors shadow-2xs"
                          >
                            <span>Send Rawdah Permit Confirmation</span>
                            <Send className="w-3 h-3 text-emerald-600" />
                          </a>

                          <a
                            href={generateWhatsAppMessage(pilgrim, 'itinerary')}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full py-1.5 px-3 rounded-xl bg-white border border-emerald-300 text-emerald-800 text-[11px] font-bold hover:bg-emerald-100 flex items-center justify-between transition-colors shadow-2xs"
                          >
                            <span>Send Departure Briefing</span>
                            <Send className="w-3 h-3 text-emerald-600" />
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Agent Notes & Master State Bar */}
                    <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs border-t border-slate-100">
                      <div className="flex-1">
                        <span className="text-[11px] text-slate-500">
                          <strong>Agent Notes:</strong> {pilgrim.agentNotes || 'No notes added yet.'}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-0.5">
                          Assigned to: <strong>{pilgrim.assignedAgent}</strong> • Last Updated: {new Date(pilgrim.updatedAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Overall Status Dropdown */}
                        <select
                          value={pilgrim.status}
                          onChange={e => handleUpdateOverallStatus(pilgrim.id, e.target.value as UmrahPilgrimStatus)}
                          className="px-2.5 py-1.5 text-xs font-bold rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-none focus:border-[#0288D1]"
                        >
                          <option value="Document Collection">Stage: Document Collection</option>
                          <option value="Visa Processing">Stage: Visa Processing</option>
                          <option value="Ready for Departure">Stage: Ready for Departure</option>
                          <option value="In Kingdom">Stage: In Kingdom</option>
                          <option value="Completed">Stage: Completed</option>
                          <option value="Cancelled">Stage: Cancelled</option>
                        </select>

                        <button
                          onClick={() => handleOpenEditModal(pilgrim)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 text-slate-600"
                          title="Edit Pilgrim Details"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>

                        <button
                          onClick={() => handleDeletePilgrim(pilgrim.id, pilgrim.pilgrimName)}
                          className="p-1.5 rounded-lg border border-rose-200 hover:bg-rose-50 text-rose-600"
                          title="Delete Pilgrim Record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        /* ROSTER TABLE VIEW */
        <div className="overflow-x-auto rounded-2xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-black uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Pilgrim Name</th>
                <th className="py-3 px-4">Passport</th>
                <th className="py-3 px-4">Travel Dates</th>
                <th className="py-3 px-4">Flight / PNR</th>
                <th className="py-3 px-4">Saudi E-Visa</th>
                <th className="py-3 px-4">Rawdah Slot</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPilgrims.map(p => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-[#0B1B3B]">{p.pilgrimName}</div>
                    <div className="text-[10px] text-slate-400">{p.city} • {p.packageType}</div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold">{p.passportNumber}</td>
                  <td className="py-3 px-4">
                    <div>{p.departureDate}</div>
                    <div className="text-[10px] text-slate-400">Return: {p.returnDate}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-mono font-bold text-slate-800">{p.flightPnr}</span>
                    <div className="text-[10px] text-slate-400 truncate max-w-[120px]">{p.flightAirline}</div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 font-bold ${
                      p.visaStage === 'E-Visa Issued' ? 'text-emerald-700' : 'text-amber-700'
                    }`}>
                      {p.visaStage === 'E-Visa Issued' ? <Check className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-500" />}
                      <span>{p.eVisaNumber || p.visaStage}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[11px] font-semibold text-purple-900">{p.rawdahPermitStatus}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => {
                          setExpandedPilgrimId(p.id);
                          setViewMode('cards');
                        }}
                        className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-bold"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleOpenEditModal(p)}
                        className="p-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-600"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 5. ADD / EDIT PILGRIM MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-emerald-600" />
                <h3 className="text-base font-black text-[#0B1B3B]">
                  {editingPilgrim ? `Edit Pilgrim: ${editingPilgrim.pilgrimName}` : 'Register New Umrah Pilgrim'}
                </h3>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSavePilgrim} className="space-y-4 text-xs">
              {/* Personal Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Pilgrim Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.pilgrimName || ''}
                    onChange={e => setFormData({ ...formData, pilgrimName: e.target.value })}
                    placeholder="e.g. Haji Muhammad Rizwan"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0288D1]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Passport Number *</label>
                  <input
                    type="text"
                    required
                    value={formData.passportNumber || ''}
                    onChange={e => setFormData({ ...formData, passportNumber: e.target.value.toUpperCase() })}
                    placeholder="e.g. AP8819201"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase focus:outline-none focus:border-[#0288D1]"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Gender & Age</label>
                  <div className="flex gap-2">
                    <select
                      value={formData.gender || 'Male'}
                      onChange={e => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-1/2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                    <input
                      type="number"
                      value={formData.age || 40}
                      onChange={e => setFormData({ ...formData, age: Number(e.target.value) })}
                      placeholder="Age"
                      className="w-1/2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Passport Expiry Date</label>
                  <input
                    type="date"
                    value={formData.passportExpiry || ''}
                    onChange={e => setFormData({ ...formData, passportExpiry: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Contact Phone / WhatsApp</label>
                  <input
                    type="text"
                    value={formData.phone || ''}
                    onChange={e => setFormData({ ...formData, phone: e.target.value, whatsApp: e.target.value })}
                    placeholder="+92 300 1234567"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">City / Region</label>
                  <input
                    type="text"
                    value={formData.city || ''}
                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                    placeholder="Lahore / Multan / Faisalabad"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Package & Logistics */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Package Tier</label>
                  <select
                    value={formData.packageType || '4-Star Executive'}
                    onChange={e => setFormData({ ...formData, packageType: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="Economy">Economy (Shuttle)</option>
                    <option value="4-Star Executive">4-Star Executive</option>
                    <option value="5-Star VIP">5-Star VIP (Courtyard/Clock Tower)</option>
                    <option value="Ramadan Special">Ramadan Special</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Flight Airline & PNR</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.flightAirline || ''}
                      onChange={e => setFormData({ ...formData, flightAirline: e.target.value })}
                      placeholder="Airline"
                      className="w-2/3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                    />
                    <input
                      type="text"
                      value={formData.flightPnr || ''}
                      onChange={e => setFormData({ ...formData, flightPnr: e.target.value.toUpperCase() })}
                      placeholder="PNR"
                      className="w-1/3 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Departure Date</label>
                  <input
                    type="date"
                    value={formData.departureDate || ''}
                    onChange={e => setFormData({ ...formData, departureDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Return Date</label>
                  <input
                    type="date"
                    value={formData.returnDate || ''}
                    onChange={e => setFormData({ ...formData, returnDate: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Makkah Hotel</label>
                  <input
                    type="text"
                    value={formData.makkahHotel || ''}
                    onChange={e => setFormData({ ...formData, makkahHotel: e.target.value })}
                    placeholder="e.g. Swissôtel Makkah"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Madinah Hotel</label>
                  <input
                    type="text"
                    value={formData.madinahHotel || ''}
                    onChange={e => setFormData({ ...formData, madinahHotel: e.target.value })}
                    placeholder="e.g. Dar Al Taqwa Madinah"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Visa & Status */}
              <div className="pt-2 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-700 font-bold mb-1">Saudi E-Visa Stage</label>
                  <select
                    value={formData.visaStage || 'Documents Pending'}
                    onChange={e => setFormData({ ...formData, visaStage: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="Documents Pending">Documents Pending</option>
                    <option value="In Review">In Review</option>
                    <option value="Biometrics Enrolled">Biometrics Enrolled</option>
                    <option value="Submitted to Nusuk/MOFA">Submitted to Nusuk/MOFA</option>
                    <option value="E-Visa Issued">E-Visa Issued</option>
                    <option value="Action Required">Action Required</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">E-Visa Number (if issued)</label>
                  <input
                    type="text"
                    value={formData.eVisaNumber || ''}
                    onChange={e => setFormData({ ...formData, eVisaNumber: e.target.value })}
                    placeholder="e.g. 2409819204"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-700 font-bold mb-1">Overall Case Stage</label>
                  <select
                    value={formData.status || 'Document Collection'}
                    onChange={e => setFormData({ ...formData, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    <option value="Document Collection">Document Collection</option>
                    <option value="Visa Processing">Visa Processing</option>
                    <option value="Ready for Departure">Ready for Departure</option>
                    <option value="In Kingdom">In Kingdom</option>
                    <option value="Completed">Completed</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">Agent Notes</label>
                <textarea
                  rows={2}
                  value={formData.agentNotes || ''}
                  onChange={e => setFormData({ ...formData, agentNotes: e.target.value })}
                  placeholder="Special requests, wheelchair, interconnecting room notes..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl resize-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0B1B3B] hover:bg-[#0288D1] text-white font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                >
                  <Save className="w-4 h-4 text-amber-300" />
                  <span>{editingPilgrim ? 'Save Changes' : 'Register Pilgrim'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
