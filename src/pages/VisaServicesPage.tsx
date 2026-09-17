import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { PageHero } from '../components/PageHero';
import { DOCUMENTATION_PROCESS } from '../data/servicesData';
import { COMPANY_INFO, getWhatsAppLink } from '../data/companyInfo';
import { ServiceType } from '../types';
import {
  Stamp,
  FileCheck2,
  FileText,
  ShieldAlert,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  FolderLock,
  GraduationCap,
  Users2,
  Briefcase,
  Globe2,
  Clock,
  Sparkles
} from 'lucide-react';

export const VisaServicesPage: React.FC = () => {
  const { openInquiryModal } = useOutletContext<{
    openInquiryModal: (config?: {
      defaultService?: ServiceType;
      defaultDestination?: string;
      defaultTitle?: string;
      isBookingRequest?: boolean;
    }) => void;
  }>();

  const [activeTab, setActiveTab] = useState<'schengen' | 'uk' | 'usa' | 'canada' | 'australia' | 'gcc' | 'evisa'>('schengen');

  const visaCategories = [
    {
      id: 'schengen',
      name: 'Schengen Europe',
      badge: '29 European Countries',
      description: 'Single and multiple-entry tourist, business, and family visit visas for France, Germany, Italy, Spain, Switzerland, and the entire Schengen area.',
      requirements: [
        'Valid passport with minimum 6 months validity & 2 blank pages',
        'Official 6-month bank statement stamped by branch manager',
        'Account Maintenance Certificate from bank',
        'Employment letter / salary slips / Business registration & NTN',
        'Day-by-day travel itinerary with verifiable flight and hotel vouchers',
        'Schengen-compliant travel medical insurance (€30,000 minimum coverage)'
      ],
      processing: '15 to 45 calendar days depending on consulate workload',
      dest: 'France & Schengen Area'
    },
    {
      id: 'uk',
      name: 'United Kingdom',
      badge: 'Standard Visitor Visa',
      description: 'Visitor visas for tourism, visiting family or friends, business meetings, and short-term study across England, Scotland, Wales, and Northern Ireland.',
      requirements: [
        'Current passport & previous travel history passports',
        'Detailed personal financial evidence and proof of monthly income',
        'Employment contract, recent pay slips, and approved leave letter',
        'If sponsored: UK sponsor invitation letter, passport copy & tenancy agreement',
        'Comprehensive cover letter presenting genuine intention to visit and depart'
      ],
      processing: 'Approx. 3 to 7 weeks from biometrics appointment',
      dest: 'United Kingdom'
    },
    {
      id: 'usa',
      name: 'United States',
      badge: 'B1 / B2 Visitor Visa',
      description: 'Non-immigrant visitor visa for business (B1), tourism, medical treatment, or pleasure (B2).',
      requirements: [
        'DS-160 online non-immigrant visa application confirmation',
        'Valid passport and 2x2 inch embassy specification photographs',
        'MRV visa fee receipt & scheduled consular interview appointment confirmation',
        'Strong proof of economic, employment, familial, and social ties to home country',
        'Detailed travel itinerary and financial sponsorship affidavits'
      ],
      processing: 'Interview slot wait times vary by consulate; decision given at interview',
      dest: 'United States'
    },
    {
      id: 'canada',
      name: 'Canada',
      badge: 'Temporary Resident Visa (TRV)',
      description: 'Visitor visas, family super visas, and conference travel permits to Canada.',
      requirements: [
        'Valid passport and completed IMM application forms',
        'Comprehensive proof of financial support (bank statements, investments, property)',
        'Detailed travel purpose letter & travel schedule',
        'Family Information Form (IMM 5645) & NADRA Family Registration Certificate',
        'Biometrics enrollment at official Visa Application Centre (VAC)'
      ],
      processing: 'Approx. 4 to 8 weeks following biometric submission',
      dest: 'Canada'
    },
    {
      id: 'australia',
      name: 'Australia',
      badge: 'Subclass 600 Visitor',
      description: 'Online visitor visa allowing leisure, holiday, family visits, or short-term business visitor activities in Australia.',
      requirements: [
        'High-resolution passport bio-data page scan',
        'Genuine Temporary Entrant (GTE) statement of purpose letter',
        '6-month personal bank statements with documented salary credits',
        'Evidence of employment, tax returns, and property assets in home country',
        'Health examination and biometric collection at Australian Biometric Collection Centre'
      ],
      processing: 'Approx. 20 to 35 business days',
      dest: 'Australia'
    },
    {
      id: 'gcc',
      name: 'GCC Countries',
      badge: 'UAE, Saudi Arabia, Qatar, Oman',
      description: 'Tourist and visit e-visas for the United Arab Emirates (Dubai / Abu Dhabi), Saudi tourist e-visas, and GCC entry permits.',
      requirements: [
        'Clear passport scan valid for minimum 6 months',
        'Passport-sized photograph with white background',
        'Confirmed roundtrip flight booking',
        'Hotel booking confirmation or resident host invitation'
      ],
      processing: 'Fast turnaround: 24 to 72 hours',
      dest: 'United Arab Emirates & GCC'
    },
    {
      id: 'evisa',
      name: 'Global e-Visas',
      badge: 'Turkey, Malaysia, Thailand, Egypt',
      description: 'Streamlined online electronic visas and sticker visa guidance for popular Asian and Middle Eastern holiday destinations.',
      requirements: [
        'Valid passport scan',
        'Valid supporting visa (e.g. Schengen/US/UK for Turkey e-Visa eligibility) or sticker file',
        'Confirmed return flight itinerary',
        'Hotel voucher'
      ],
      processing: '1 to 5 business days',
      dest: 'Turkey / Asia'
    }
  ];

  const currentCategory = visaCategories.find(c => c.id === activeTab) || visaCategories[0];

  return (
    <div>
      <PageHero
        title="Visa Services & Documentation Clearance"
        subtitle="Embassy-tuned file structuring, customized cover letters, and comprehensive checklist reviews for global tourist, family, and student visas."
        badge="Visa Consultancy"
        breadcrumbs={[{ label: 'Visa Services' }]}
        bgImage="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Main Visa Navigation by Region */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
              Global Consular Pathways
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
              Select Your Destination Country
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Explore key document criteria, standard requirements, and turnaround expectations.
            </p>
          </div>

          {/* Region Tabs */}
          <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
            {visaCategories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id as any)}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  activeTab === cat.id
                    ? 'bg-[#0B1B3B] text-white shadow-md'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Selected Region Detailed Card */}
          <div className="bg-slate-50 rounded-3xl p-8 lg:p-10 border border-slate-200/80 shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#E3F2FD] text-[#0B1B3B] mb-2">
                    {currentCategory.badge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0B1B3B]">
                    {currentCategory.name} Visa Consultation
                  </h3>
                  <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                    {currentCategory.description}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-[#4FC3F7]" />
                    Key Checklist Requirements
                  </h4>
                  <ul className="space-y-2.5">
                    {(currentCategory?.requirements || []).map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#4FC3F7] shrink-0 mt-0.5" />
                        <span className="leading-normal">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200/80 flex items-center gap-3 text-xs text-slate-600">
                  <Clock className="w-4 h-4 text-[#FFB300] shrink-0" />
                  <div>
                    <strong className="text-[#0B1B3B]">Standard Turnaround: </strong>
                    <span>{currentCategory.processing}</span>
                  </div>
                </div>

                <div className="pt-2 flex flex-wrap gap-4">
                  <button
                    onClick={() =>
                      openInquiryModal({
                        defaultService: 'Tourist Visa',
                        defaultDestination: currentCategory.dest,
                        defaultTitle: `${currentCategory.name} Visa File Assistance`
                      })
                    }
                    className="px-6 py-3 rounded-2xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white text-xs font-bold transition-colors flex items-center gap-2"
                  >
                    <span>Inquire for {currentCategory.name} Visa File</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <a
                    href={getWhatsAppLink(`Hello SkyBridge, I need assistance with my ${currentCategory.name} visa application.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-colors"
                  >
                    WhatsApp Checklist Query
                  </a>
                </div>
              </div>

              {/* What SkyBridge Provides */}
              <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-slate-200/80 space-y-4 shadow-2xs">
                <h4 className="text-sm font-bold text-[#0B1B3B] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFB300]" />
                  What Our Service Includes
                </h4>
                <div className="space-y-3 text-xs text-slate-600">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <strong className="block font-bold text-[#0B1B3B]">1. Custom Cover Letter:</strong>
                    Personalized justification of your itinerary, socio-economic ties, and funding.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <strong className="block font-bold text-[#0B1B3B]">2. Financial Audit:</strong>
                    Review of bank balances, source of income, salary slips, and tax filings.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <strong className="block font-bold text-[#0B1B3B]">3. Verified Reservation Proofs:</strong>
                    Verifiable flight itinerary and embassy-compliant hotel reservation vouchers.
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <strong className="block font-bold text-[#0B1B3B]">4. Appointment & Biometrics Briefing:</strong>
                    Scheduling at official VAC centers with interview etiquette coaching.
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/70 text-[11px] text-amber-900 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{COMPANY_INFO.visaDisclaimer}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Visa Categories: Student & Family */}
      <section className="py-20 bg-slate-50 border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Student Visas */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1B3B]">
                Student Visa Assistance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Applying to study in the UK, USA, Canada, Australia, or Europe requires synchronized CAS/I-20 alignment, living expense calculations, sponsor affidavits, and Statement of Purpose (SOP) review.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                  <span>Tuition & living expense bank statement presentation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                  <span>Sponsor relationship & affidavit formatting</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                  <span>Pre-departure travel & accommodation booking</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() =>
                    openInquiryModal({
                      defaultService: 'Student Visa',
                      defaultTitle: 'Student Visa File Guidance'
                    })
                  }
                  className="px-5 py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
                >
                  Inquire for Student Visa
                </button>
              </div>
            </div>

            {/* Family Visas */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E3F2FD] text-[#0B1B3B] flex items-center justify-center">
                <Users2 className="w-6 h-6 text-[#4FC3F7]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0B1B3B]">
                Family Visa Assistance
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Traveling as a family requires synchronized applications where sponsorship documents, NADRA Family Registration Certificates (FRC), and itineraries align across all adults and minors.
              </p>
              <ul className="space-y-2 text-xs text-slate-700 pt-2">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                  <span>NADRA FRC and birth certificate structuring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                  <span>Sponsor financial guarantees & parental consents</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#4FC3F7]" />
                  <span>Group appointment coordination at visa centers</span>
                </li>
              </ul>
              <div className="pt-2">
                <button
                  onClick={() =>
                    openInquiryModal({
                      defaultService: 'Family Visa',
                      defaultTitle: 'Family Visa Application Assistance'
                    })
                  }
                  className="px-5 py-2.5 rounded-xl bg-[#0B1B3B] text-white text-xs font-bold hover:bg-[#4FC3F7] hover:text-[#0B1B3B] transition-colors"
                >
                  Inquire for Family Visa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5-Step Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-[#4FC3F7] block mb-2">
              Our Methodology
            </span>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-[#0B1B3B]">
              The 5-Step Documentation Clearance Process
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {DOCUMENTATION_PROCESS.map(p => (
              <div key={p.step} className="p-6 bg-slate-50 rounded-3xl border border-slate-200/80">
                <div className="text-2xl font-black text-[#4FC3F7] font-mono mb-2">{p.step}</div>
                <h4 className="text-sm font-bold text-[#0B1B3B] mb-2">{p.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{p.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mandatory Consular Statement */}
      <section className="py-12 bg-amber-50 border-t border-amber-200/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-800">
            <ShieldAlert className="w-4 h-4 text-amber-700" />
            Consular Policy Transparency
          </div>
          <p className="text-xs text-amber-950 leading-relaxed font-medium">
            {COMPANY_INFO.visaDisclaimer}
          </p>
        </div>
      </section>
    </div>
  );
};
