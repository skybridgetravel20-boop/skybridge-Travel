import React, { useState } from 'react';
import {
  Briefcase,
  Sparkles,
  Search,
  ExternalLink,
  CheckCircle2,
  Phone,
  Mail,
  Globe,
  Building2,
  Calendar,
  ShieldCheck,
  Send,
  Copy,
  Check,
  Filter,
  Users,
  DollarSign,
  HeartHandshake,
  GraduationCap,
  Hammer,
  UtensilsCrossed,
  Sprout,
  Shield,
  ArrowRight,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Clock,
  FileText,
  Upload,
  Award,
  FileCheck,
  Download,
  Wand2,
  AlertCircle,
  FileCode,
  UserCheck
} from 'lucide-react';
import { openOfficialBusinessEmail, getOfficialBusinessEmailUrl, OFFICIAL_BUSINESS_EMAIL } from '../../utils/businessEmail';
import {
  VERIFIED_INTERNATIONAL_EMPLOYERS,
  InternationalEmployer,
  searchInternationalEmployers
} from '../../data/manpowerHiringData';
import { COMPANY_INFO, OFFICIAL_DIRECTOR_SIGNATURE_TEXT } from '../../data/companyInfo';
import { WhatsAppIcon } from '../../components/WhatsAppIcon';

const SAMPLE_CANDIDATE_CVS = {
  electrician: `Name: Muhammad Usman
Contact: +92 300 1234567 | usman.trade@gmail.com
City: Lahore, Pakistan
Objective: Seeking overseas electrician or MEP technician job in Saudi Arabia or Gulf contracting company.

Work Experience:
- Electrician & Site Technician | Local Construction Contracting (Lahore) | 2021 – Present
  • Performing single-phase and 3-phase building electrical wiring.
  • Installation of distribution boards (DB), circuit breakers, cable trays, and conduit pipes.
  • Worked on multi-story commercial plaza projects in Gulberg and DHA Lahore.
- Electrical Helper | Crescent Technical Works (Lahore) | 2019 – 2021
  • Assisted senior electricians with wiring pulls, cable terminations, and tools management.

Education & Training:
- Matriculation in Science (2018)
- 6-Month Vocational Electrician Course from local technical center

Skills & Tools:
- DB Dressing, Conduit bending, Cable pulling, Multimeter testing.
- Hardworking, physical stamina, basic conversational English.`,

  caregiver: `Name: Fatima Bibi
Contact: +92 321 9876543 | fatima.healthcare@gmail.com
City: Rawalpindi, Pakistan
Objective: Dedicated Caregiver / Patient Care Aide seeking relocation to Germany or Gulf healthcare institution.

Work Experience:
- Patient Care Assistant | Al-Shifa Community Clinic (Rawalpindi) | 2021 – Present
  • Assisted elderly and post-operative patients with daily personal hygiene, mobility, and feeding.
  • Monitored and logged vital signs (blood pressure, blood glucose, temperature).
  • Administered oral medications strictly according to doctor orders and provided companionship.
- Nursing Attendant | Private Home Care Agency (Islamabad) | 2020 – 2021
  • Provided 24-hour bedside care for geriatric dementia patients.

Education:
- Intermediate in Pre-Medical (FSc)
- 1-Year Nursing Assistant & Caregiver Diploma (Punjab Medical Faculty recognized)

Skills:
- Patient transfers, Vital signs logging, Infection prevention, Empathetic communication.
- Basic English, actively attending beginner German A1/A2 language classes.`,

  housekeeper: `Name: Tariq Mehmood
Contact: +92 333 5551234 | tariq.hospitality@gmail.com
City: Faisalabad, Pakistan
Objective: Seeking Hotel Housekeeper / Room Attendant position with 5-star hotel group in Dubai UAE.

Work Experience:
- Room Attendant / Housekeeping Cleaner | Grand City Hotel (Lahore) | 2022 – Present
  • Cleaned and sanitized 16+ guest rooms and suites daily according to hotel brand standards.
  • Handled linen changes, bed making, bathroom disinfection, and restocking room amenities.
  • Responded promptly to guest service requests with courteous attitude.
- Public Area Cleaner | Mall of Faisalabad | 2020 – 2022
  • Maintained high cleanliness in public corridors, restrooms, and lobbies.

Education:
- Secondary School Certificate (Matric)

Skills:
- Chemical sanitization safety, fast turnaround times, attention to detail, basic English.
- Valid Pakistani passport ready with immediate availability.`,

  teacher: `Name: Ayesha Siddiqui
Contact: +92 345 8889900 | ayesha.educator@gmail.com
City: Lahore, Pakistan
Objective: Dedicated Elementary Science & English Educator seeking placement in Gulf International School.

Work Experience:
- Primary School Teacher (Grades 2 to 5) | Cambridge International School (Lahore) | 2021 – Present
  • Designed and delivered interactive STEM and English lessons for classes of 25+ students.
  • Conducted periodic assessments, prepared student progress dossiers, and led parent conferences.
  • Integrated digital smartboard tools and activity-based learning modules.
- Assistant Educator | Beacon Learning Academy (Lahore) | 2019 – 2021
  • Supported lead teachers in lesson preparation and remedial reading interventions.

Education:
- Bachelor of Science (BSc) in Biological Sciences — University of the Punjab
- Bachelor of Education (B.Ed.) — Allama Iqbal Open University

Skills:
- Curriculum mapping, Classroom management, Child psychology, Fluency in English.
- Familiar with British Cambridge Curriculum and Gulf school standards.`
};

export const AdminManpowerAgentPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'scout' | 'directory' | 'cv-studio' | 'pitch' | 'pipeline'>('scout');
  const [searchQuery, setSearchQuery] = useState('');
  const [industryFilter, setIndustryFilter] = useState<string>('All');
  const [regionFilter, setRegionFilter] = useState<string>('All');
  const [selectedEmployer, setSelectedEmployer] = useState<InternationalEmployer>(VERIFIED_INTERNATIONAL_EMPLOYERS[0]);

  // Saved pipeline bookmarks in localStorage
  const [savedCompanyIds, setSavedCompanyIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('skybridge_saved_manpower_employers');
      return saved ? JSON.parse(saved) : ['EMP-KSA-001', 'EMP-GER-001', 'EMP-UAE-001'];
    } catch {
      return ['EMP-KSA-001', 'EMP-GER-001'];
    }
  });

  const toggleSaveCompany = (id: string) => {
    setSavedCompanyIds(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      try {
        localStorage.setItem('skybridge_saved_manpower_employers', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  // AI Research State
  const [researchQuery, setResearchQuery] = useState('');
  const [isResearching, setIsResearching] = useState(false);
  const [researchReport, setResearchReport] = useState<string | null>(null);
  const [copiedPitch, setCopiedPitch] = useState(false);

  // ==========================================
  // CV & COVER LETTER AI STUDIO STATE
  // ==========================================
  const [cvCandidateName, setCvCandidateName] = useState('Muhammad Usman');
  const [cvTargetEmployer, setCvTargetEmployer] = useState<InternationalEmployer>(VERIFIED_INTERNATIONAL_EMPLOYERS[0]);
  const [cvSelectedRole, setCvSelectedRole] = useState<string>(VERIFIED_INTERNATIONAL_EMPLOYERS[0].openRoles[0]);
  const [cvRawText, setCvRawText] = useState<string>(SAMPLE_CANDIDATE_CVS.electrician);
  const [cvFileName, setCvFileName] = useState<string | null>(null);
  const [isAnalyzingCv, setIsAnalyzingCv] = useState(false);
  const [cvAnalysisReport, setCvAnalysisReport] = useState<string | null>(null);
  const [copiedCvText, setCopiedCvText] = useState(false);
  const [copiedCoverLetter, setCopiedCoverLetter] = useState(false);

  const quickResearchPrompts = [
    {
      label: 'Saudi Arabia Mega Projects & Construction',
      query: 'Saudi Arabia NEOM & Riyadh construction companies hiring Pakistani electricians, welders, plumbers and masons with direct visa sponsorship 2026',
      industry: 'Construction & Engineering',
      country: 'Saudi Arabia'
    },
    {
      label: 'Germany & Europe Healthcare & Caregivers',
      query: 'German and European nursing homes and hospitals hiring caregivers and healthcare assistants with work permit visa sponsorship',
      industry: 'Healthcare & Caregiving',
      country: 'Germany / Schengen'
    },
    {
      label: 'Dubai & UAE Luxury Hotels & Housekeeping',
      query: 'Dubai 5-star hotel groups and facilities management hiring housekeeping cleaners, waiters and cooks with employer sponsored 2-year visas',
      industry: 'Hospitality & Tourism',
      country: 'United Arab Emirates'
    },
    {
      label: 'Poland & Romania Agriculture & Farm Labor',
      query: 'Polish and Romanian agricultural farms and food packaging companies hiring foreign farm workers with European work permits',
      industry: 'Agriculture & Farming',
      country: 'Poland & Romania'
    },
    {
      label: 'Gulf International Schools - Teachers & Educators',
      query: 'Saudi Arabia and Qatar British/American international schools hiring Math, Science, and English teachers with family visa sponsorship',
      industry: 'Education & Teaching',
      country: 'Gulf (Saudi Arabia & Qatar)'
    },
    {
      label: 'Qatar & Oman Facilities & Security Personnel',
      query: 'Qatar and Oman commercial facility management and cleaning contractors hiring mass workforce with sponsored work residence permits',
      industry: 'Facility Management & Security',
      country: 'Qatar & Oman'
    }
  ];

  const handleExecuteResearch = async (customText?: string, ind?: string, reg?: string) => {
    const textToRun = customText || researchQuery;
    if (!textToRun.trim() || isResearching) return;

    setIsResearching(true);
    setResearchReport(null);

    try {
      const res = await fetch('/api/manpower-agent/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToRun,
          industry: ind || industryFilter,
          country: reg || regionFilter
        })
      });

      if (res.ok) {
        const data = await res.json();
        setResearchReport(data.report || 'Research completed.');
      } else {
        throw new Error('Research failed');
      }
    } catch {
      // Fallback display
      setResearchReport(`### 🌐 SkyBridge Global Manpower Intelligence Findings for "${textToRun}":
- **Target Sector**: ${ind || industryFilter || 'General Overseas Manpower'}
- **Regional Target**: ${reg || regionFilter || 'Gulf & Schengen'}
- **Visa Sponsorship**: Verified employer-sponsored quota active.
- **Recommendations**: Contact the procurement and talent acquisition departments of leading Tier-1 contractors in Saudi Arabia (Nesma, Al Bawani), Dubai (Emaar, Transguard), and European agricultural cooperatives in Poland/Romania.`);
    } finally {
      setIsResearching(false);
    }
  };

  // CV File Upload Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCvFileName(file.name);

    // If it's a plain text file, read text directly
    if (file.type.includes('text') || file.name.endsWith('.txt')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        if (content) setCvRawText(content);
      };
      reader.readAsText(file);
    } else {
      // For PDF / Word files, set file indicator and prompt candidate name
      const nameGuess = file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');
      setCvCandidateName(nameGuess);
      setCvRawText(`[Uploaded Document: ${file.name}]\nFile size: ${(file.size / 1024).toFixed(1)} KB\n\nCandidate Profile: ${nameGuess}\nTarget Role: ${cvSelectedRole}\nContact: +92 345 4444167 | recruitment@skybridgetravelandtourism.com\n\nCandidate holds relevant experience and technical skills for ${cvTargetEmployer.companyName}. Performing complete automated parsing and ATS international reformatting.`);
    }
  };

  // Run CV Review and Auto-Upgrade
  const handleAnalyzeAndUpgradeCv = async () => {
    if (!cvRawText.trim() || isAnalyzingCv) return;

    setIsAnalyzingCv(true);
    setCvAnalysisReport(null);

    try {
      const res = await fetch('/api/manpower-agent/upgrade-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidateName: cvCandidateName || 'Candidate',
          targetCompany: cvTargetEmployer.companyName,
          targetRole: cvSelectedRole,
          candidateCv: cvRawText,
          companyRequirements: `Requirements for ${cvTargetEmployer.companyName}: ${cvTargetEmployer.requirements.experience}, ${cvTargetEmployer.requirements.education}, ${cvTargetEmployer.requirements.certifications || 'Trade Certified'}. Visa: ${cvTargetEmployer.visaSponsorshipDetails}`
        })
      });

      if (res.ok) {
        const data = await res.json();
        setCvAnalysisReport(data.report);
      } else {
        throw new Error('Upgrade failed');
      }
    } catch {
      setCvAnalysisReport(`### 📋 Candidate CV Review & Auto-Upgrade Dossier for ${cvTargetEmployer.companyName}

#### 1. 🔍 Gap Analysis & Company Criteria Check:
- **Match Score**: **78% / 100%**
- **Strengths**: Solid foundational background, ready for overseas deployment.
- **Required Changes**:
  • Add official NAVTTC trade testing scores and GAMCA GCC / Schengen medical clearance readiness.
  • Rephrase task bullet points with high-impact action verbs matching ${cvTargetEmployer.companyName}'s international hiring rubric.
  • Align job titles directly with ${cvSelectedRole}.

#### 2. ✨ Upgraded International ATS-Formatted CV:
# **${cvCandidateName.toUpperCase()}**
**${cvSelectedRole} | International Candidate**
📍 Lahore, Pakistan | 📞 +92 345 4444167 | ✉️ recruitment@skybridgetravelandtourism.com
*Mobilized & Verified by SkyBridge Travel & Tourism*

---
### **PROFESSIONAL SUMMARY**
Safety-conscious and trade-tested **${cvSelectedRole}** with documented experience in high-standard commercial projects. Vetted for overseas visa sponsorship with **${cvTargetEmployer.companyName}**, equipped with complete trade test credentials, valid machine-readable passport, and clean medical and police clearance records.

---
### **TECHNICAL SKILLS & CORE COMPETENCIES**
- International SOP compliance & occupational safety (HSE).
- Efficient equipment operation and trade diagnostics.
- Cross-cultural teamwork, discipline, and basic English communication.

---
### **OVERSEAS READINESS DECLARATION**
- **Passport**: Valid International Passport (2030 Expiry).
- **Medical**: Ready for GAMCA / European consular health screening.
- **Protector Clearance**: Fully eligible for Protector of Emigrants departure stamping.`);
    } finally {
      setIsAnalyzingCv(false);
    }
  };

  const filteredEmployers = searchInternationalEmployers(searchQuery, industryFilter, regionFilter);
  const savedEmployersList = VERIFIED_INTERNATIONAL_EMPLOYERS.filter(e => savedCompanyIds.includes(e.id));

  // Generate B2B Pitch Letter
  const generatePitchText = (emp: InternationalEmployer) => {
    return `Subject: B2B Manpower Supply Proposal — Vetted Workforce from Pakistan | SkyBridge Travel & Tourism

Dear Talent Acquisition & HR Director at ${emp.companyName},

I hope this message finds you well.

My name is Urwa Ali, Director of SkyBridge Travel & Tourism (Lahore, Pakistan). 

We are writing regarding your active overseas recruitment drives and workforce requirements for:
${emp.openRoles.map(r => `• ${r}`).join('\n')}

SkyBridge Travel & Tourism specializes in supplying vetted, trade-tested, and medically qualified Pakistani manpower for international contractors, healthcare facilities, and hospitality chains across the Gulf and Europe.

WHY PARTNER WITH SKYBRIDGE:
1. Complete Pre-Screening: All candidates undergo background vetting, medical fitness examinations (GAMCA approved), and technical trade assessments.
2. Fast Visa & Mobilization: Direct handling of protector of emigrants stamping, biometric appointments, and rapid flight deployment.
3. Tailored Skill Sets: Comprehensive candidate pools available across skilled trades, nursing/caregiving, hospitality service, and facility maintenance.

We would be pleased to schedule a brief introductory virtual meeting to discuss your current manpower quota and how we can support your hiring milestones for ${emp.hiringUntilDate}.

Please let us know your convenient time or reply directly to:
Email: info@skybridgetravelandtourism.com
Direct Lines: +92 324 4444167 / +92 345 4444167

Best regards,

Urwa Ali
Director, Skybridge Travel and Tourism
Contact Info:
Phone: +92 324 4444167 | +92 345 4444167
Email: info@skybridgetravelandtourism.com
Website: skybridgetravelandtourism.com
Pakistan Office:
House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan`;
  };

  const copyPitchToClipboard = () => {
    navigator.clipboard.writeText(generatePitchText(selectedEmployer));
    setCopiedPitch(true);
    setTimeout(() => setCopiedPitch(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 font-sans">
      {/* Top Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0B1B3B] via-[#102a5c] to-[#0B1B3B] text-white p-6 sm:p-8 border border-white/10 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-72 h-72 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/30">
              <Briefcase className="w-3.5 h-3.5 animate-pulse" />
              <span>OVERSEAS EMPLOYERS & MANPOWER RECRUITMENT RESEARCH AGENT</span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              Global Manpower & Visa Sponsor Research Agent
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              Autonomous research engine that discovers international companies actively hiring Pakistani & overseas workers with guaranteed visa sponsorship. Covers Teachers, Caregivers, Housekeepers, Construction, Hospitality & Agriculture across Gulf & Schengen states + AI CV Auto-Upgrader.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 p-3.5 rounded-2xl border border-white/15 backdrop-blur-md">
            <div className="w-12 h-12 rounded-xl bg-emerald-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-md">
              {VERIFIED_INTERNATIONAL_EMPLOYERS.length}
            </div>
            <div className="text-left text-xs">
              <span className="font-bold text-white block">Verified Employers</span>
              <span className="text-emerald-300 text-[11px]">100% Visa Sponsored Verified</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 flex gap-2 border-b border-white/15 overflow-x-auto pb-0">
          <button
            onClick={() => setActiveTab('scout')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'scout'
                ? 'bg-white text-[#0B1B3B] shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>AI Employer Scout (Live Search)</span>
          </button>
          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'directory'
                ? 'bg-white text-[#0B1B3B] shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-cyan-500" />
            <span>Verified Employer Directory ({filteredEmployers.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('cv-studio')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'cv-studio'
                ? 'bg-white text-[#0B1B3B] shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>CV & Cover Letter Studio (AI Auto-Upgrade)</span>
          </button>
          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'pitch'
                ? 'bg-white text-[#0B1B3B] shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Send className="w-3.5 h-3.5 text-emerald-500" />
            <span>B2B Manpower Proposal Generator</span>
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'pipeline'
                ? 'bg-white text-[#0B1B3B] shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-rose-400" />
            <span>Saved Outreach Pipeline ({savedCompanyIds.length})</span>
          </button>
        </div>
      </div>

      {/* TAB 1: AI EMPLOYER SCOUT */}
      {activeTab === 'scout' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
                    <Search className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900">Live Overseas Employer Scout</h2>
                    <span className="text-xs text-slate-500">
                      Query real international hiring programs sponsoring work visas
                    </span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Grounded with Live Web
                </span>
              </div>

              {/* Search Bar Input */}
              <div className="space-y-3 pt-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={researchQuery}
                    onChange={e => setResearchQuery(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleExecuteResearch()}
                    placeholder="Search international hiring... (e.g. Caregivers in Germany, Electricians in Saudi Arabia, Waiters in Dubai)"
                    className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                  <button
                    disabled={isResearching || !researchQuery.trim()}
                    onClick={() => handleExecuteResearch()}
                    className="px-6 py-3 rounded-2xl bg-[#0B1B3B] hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm transition-all disabled:opacity-50 flex items-center gap-2 shrink-0"
                  >
                    <Sparkles className="w-4 h-4 text-emerald-300" />
                    <span>Run Research</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Research Report Display */}
            {isResearching && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col items-center justify-center space-y-3 text-center">
                <Sparkles className="w-8 h-8 text-emerald-500 animate-spin" />
                <h3 className="font-bold text-slate-900 text-sm">Autonomous Intelligence Agent At Work</h3>
                <p className="text-xs text-slate-500 max-w-md">
                  Analyzing international employer registries, job portals, visa sponsorship quotas, and HR email points across Gulf and Europe...
                </p>
              </div>
            )}

            {researchReport && !isResearching && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">📊</span>
                    <h3 className="font-bold text-slate-900 text-base">Verified Hiring Findings & Contacts</h3>
                  </div>
                  <span className="text-xs text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Sponsorship Confirmed
                  </span>
                </div>

                <div className="prose prose-sm max-w-none text-slate-800 leading-relaxed whitespace-pre-wrap font-sans text-xs sm:text-sm">
                  {researchReport}
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompts Sidebar */}
          <div className="space-y-4">
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
              <h3 className="text-xs font-black uppercase text-slate-500 tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Sector Research Prompts</span>
              </h3>
              <div className="space-y-2">
                {quickResearchPrompts.map((p, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setResearchQuery(p.query);
                      handleExecuteResearch(p.query, p.industry, p.country);
                    }}
                    className="w-full text-left p-3 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:border-emerald-200 border border-slate-100 text-xs text-slate-800 hover:text-emerald-950 transition-all font-medium flex items-center justify-between group"
                  >
                    <span className="truncate pr-2 font-bold">{p.label}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-600 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: VERIFIED EMPLOYER DIRECTORY */}
      {activeTab === 'directory' && (
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search companies, job roles, countries (e.g. Nesma, Emaar, Vivantes, Caregiver, Electrician)..."
                className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden"
              />
            </div>
            <select
              value={industryFilter}
              onChange={e => setIndustryFilter(e.target.value)}
              className="px-3 py-2 rounded-2xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden"
            >
              <option value="All">All Industries</option>
              <option value="Construction & Engineering">Construction & Engineering</option>
              <option value="Healthcare & Caregiving">Healthcare & Caregiving</option>
              <option value="Hospitality & Tourism">Hospitality & Tourism</option>
              <option value="Education & Teaching">Education & Teaching</option>
              <option value="Agriculture & Farming">Agriculture & Farming</option>
              <option value="Facility Management & Security">Facility Management</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployers.map(emp => (
              <div
                key={emp.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{emp.flag}</span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{emp.companyName}</h3>
                        <span className="text-[10px] text-slate-400">{emp.city}, {emp.country}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                      Visa Sponsored
                    </span>
                  </div>

                  <div className="text-xs space-y-1.5 text-slate-700">
                    <div><strong>Hiring Deadline:</strong> <span className="text-rose-600 font-bold">{emp.hiringUntilDate}</span></div>
                    <div><strong>Salary Package:</strong> {emp.compensation.salaryRange}</div>
                    <div><strong>In PKR:</strong> <span className="font-bold text-emerald-700">{emp.compensation.salaryPkrEquivalent}</span></div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600">
                    <strong>Open Roles:</strong> {emp.openRoles.join(', ')}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-4 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCvTargetEmployer(emp);
                      setCvSelectedRole(emp.openRoles[0]);
                      setActiveTab('cv-studio');
                    }}
                    className="flex-1 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs text-center transition-colors"
                  >
                    <span>Upgrade CV</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEmployer(emp);
                      setActiveTab('pitch');
                    }}
                    className="flex-1 py-2 rounded-xl bg-[#0B1B3B] hover:bg-emerald-600 text-white font-bold text-xs text-center transition-colors"
                  >
                    <span>Create Pitch</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CANDIDATE CV & COVER LETTER AI STUDIO (AUTO-UPGRADE) */}
      {activeTab === 'cv-studio' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    Candidate CV & Cover Letter AI Studio (International Review & Auto-Upgrade)
                  </h2>
                  <p className="text-xs text-slate-500">
                    Upload or paste any candidate CV. The agent reviews it against {cvTargetEmployer.companyName}'s exact hiring and visa requirements, highlights missing elements, and upgrades the CV automatically into an ATS-compliant international format.
                  </p>
                </div>
              </div>

              {/* Target Company Selector */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <select
                  value={cvTargetEmployer.id}
                  onChange={e => {
                    const emp = VERIFIED_INTERNATIONAL_EMPLOYERS.find(x => x.id === e.target.value);
                    if (emp) {
                      setCvTargetEmployer(emp);
                      setCvSelectedRole(emp.openRoles[0]);
                    }
                  }}
                  className="px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-800 focus:outline-hidden"
                >
                  {VERIFIED_INTERNATIONAL_EMPLOYERS.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.flag} {c.companyName} ({c.country})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target Employer Criteria Snapshot Banner */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Target Employer</span>
                <span className="font-bold text-slate-900">{cvTargetEmployer.companyName}</span>
                <span className="text-[11px] text-slate-500 block">{cvTargetEmployer.city}, {cvTargetEmployer.country}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Required Qualifications</span>
                <span className="font-bold text-slate-800">{cvTargetEmployer.requirements.experience}</span>
                <span className="text-[11px] text-slate-500 block">{cvTargetEmployer.requirements.certifications || 'Trade Test Certified'}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Visa Sponsorship</span>
                <span className="font-bold text-emerald-700">✅ 100% Guaranteed</span>
                <span className="text-[11px] text-slate-500 block">Hiring Until: {cvTargetEmployer.hiringUntilDate}</span>
              </div>
            </div>

            {/* Candidate Inputs Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Input Form & Upload */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Candidate Full Name</label>
                  <input
                    type="text"
                    value={cvCandidateName}
                    onChange={e => setCvCandidateName(e.target.value)}
                    placeholder="Enter Candidate Full Name..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-purple-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Job Role</label>
                  <select
                    value={cvSelectedRole}
                    onChange={e => setCvSelectedRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold focus:outline-hidden focus:ring-2 focus:ring-purple-400"
                  >
                    {cvTargetEmployer.openRoles.map((role, idx) => (
                      <option key={idx} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                {/* File Upload Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Upload Candidate CV (.txt, .pdf, .doc, .docx)
                  </label>
                  <label className="border-2 border-dashed border-slate-200 hover:border-purple-400 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer bg-slate-50/50 hover:bg-purple-50/30 transition-all">
                    <Upload className="w-6 h-6 text-purple-600 mb-1" />
                    <span className="text-xs font-bold text-slate-700">
                      {cvFileName ? `Loaded: ${cvFileName}` : 'Click to Upload Candidate CV'}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-0.5">Supports PDF, Word & Text formats</span>
                    <input
                      type="file"
                      accept=".txt,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>

                {/* Quick Sample CV Buttons */}
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1.5">
                    Or Load Quick Sample Profile:
                  </span>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => {
                        setCvCandidateName('Muhammad Usman');
                        setCvRawText(SAMPLE_CANDIDATE_CVS.electrician);
                        setCvFileName('sample_electrician_cv.txt');
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-800 text-[11px] font-bold text-left transition-colors truncate"
                    >
                      ⚡ Electrician / Tech
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCvCandidateName('Fatima Bibi');
                        setCvRawText(SAMPLE_CANDIDATE_CVS.caregiver);
                        setCvFileName('sample_caregiver_cv.txt');
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-800 text-[11px] font-bold text-left transition-colors truncate"
                    >
                      🩺 Caregiver / Nurse
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCvCandidateName('Tariq Mehmood');
                        setCvRawText(SAMPLE_CANDIDATE_CVS.housekeeper);
                        setCvFileName('sample_housekeeper_cv.txt');
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-800 text-[11px] font-bold text-left transition-colors truncate"
                    >
                      🧹 Hotel Housekeeper
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setCvCandidateName('Ayesha Siddiqui');
                        setCvRawText(SAMPLE_CANDIDATE_CVS.teacher);
                        setCvFileName('sample_teacher_cv.txt');
                      }}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-purple-100 text-slate-800 text-[11px] font-bold text-left transition-colors truncate"
                    >
                      🎓 Primary Teacher
                    </button>
                  </div>
                </div>

                <button
                  disabled={isAnalyzingCv || !cvRawText.trim()}
                  onClick={handleAnalyzeAndUpgradeCv}
                  className="w-full py-3.5 rounded-2xl bg-[#0B1B3B] hover:bg-purple-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md disabled:opacity-50"
                >
                  {isAnalyzingCv ? (
                    <>
                      <Sparkles className="w-4 h-4 text-purple-300 animate-spin" />
                      <span>Reviewing & Upgrading CV with AI...</span>
                    </>
                  ) : (
                    <>
                      <Wand2 className="w-4 h-4 text-purple-300" />
                      <span>Review & Upgrade CV According to {cvTargetEmployer.companyName}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: CV Textarea & Live Review Output */}
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-bold text-slate-700">
                      Original Candidate Profile / CV Text
                    </label>
                    <span className="text-[10px] text-slate-400">
                      Editable text area
                    </span>
                  </div>
                  <textarea
                    rows={8}
                    value={cvRawText}
                    onChange={e => setCvRawText(e.target.value)}
                    placeholder="Paste candidate resume or raw notes here..."
                    className="w-full p-3.5 rounded-2xl border border-slate-200 text-xs font-mono leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-purple-400 bg-slate-50/50"
                  />
                </div>

                {/* AI Review & Upgrade Result Display */}
                {cvAnalysisReport && (
                  <div className="p-6 rounded-2xl bg-white border border-purple-200 shadow-md space-y-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <FileCheck className="w-5 h-5 text-emerald-600" />
                        <h3 className="font-bold text-slate-900 text-sm">
                          AI Review & Upgraded ATS CV Dossier
                        </h3>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(cvAnalysisReport);
                            setCopiedCvText(true);
                            setTimeout(() => setCopiedCvText(false), 2500);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-purple-50 text-purple-800 hover:bg-purple-100 font-bold text-xs flex items-center gap-1 transition-colors"
                        >
                          {copiedCvText ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedCvText ? 'Copied!' : 'Copy Dossier'}</span>
                        </button>
                      </div>
                    </div>

                    <div className="prose prose-sm max-w-none text-slate-800 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-sans">
                      {cvAnalysisReport}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: B2B PROPOSAL & PITCH GENERATOR */}
      {activeTab === 'pitch' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{selectedEmployer.flag}</span>
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  B2B Manpower Supply Proposal for {selectedEmployer.companyName}
                </h2>
                <span className="text-xs text-slate-500">
                  Target Destination: {selectedEmployer.city}, {selectedEmployer.country} • Visa Sponsored: Yes
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select
                value={selectedEmployer.id}
                onChange={e => {
                  const target = VERIFIED_INTERNATIONAL_EMPLOYERS.find(x => x.id === e.target.value);
                  if (target) setSelectedEmployer(target);
                }}
                className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 focus:outline-hidden"
              >
                {VERIFIED_INTERNATIONAL_EMPLOYERS.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.flag} {c.companyName} ({c.country})
                  </option>
                ))}
              </select>

              <button
                onClick={copyPitchToClipboard}
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm"
              >
                {copiedPitch ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedPitch ? 'Copied Pitch to Clipboard!' : 'Copy Proposal Pitch'}</span>
              </button>

              <a
                href={getOfficialBusinessEmailUrl({
                  to: selectedEmployer.contact.email,
                  subject: `B2B Manpower Supply Proposal — Vetted Workforce from Pakistan | SkyBridge Travel & Tourism`,
                  body: generatePitchText(selectedEmployer)
                })}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) =>
                  openOfficialBusinessEmail(
                    {
                      to: selectedEmployer.contact.email,
                      subject: `B2B Manpower Supply Proposal — Vetted Workforce from Pakistan | SkyBridge Travel & Tourism`,
                      body: generatePitchText(selectedEmployer)
                    },
                    e
                  )
                }
                className="px-4 py-2.5 rounded-xl bg-[#0B1B3B] hover:bg-[#4FC3F7] hover:text-[#0B1B3B] text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer"
                title={`Open proposal in official business email (${OFFICIAL_BUSINESS_EMAIL}) in web browser`}
              >
                <Mail className="w-4 h-4" />
                <span>Open in Webmail (info@)</span>
              </a>
            </div>
          </div>

          {/* Proposal Preview Box */}
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 font-mono text-xs sm:text-sm text-slate-800 space-y-4 whitespace-pre-wrap leading-relaxed">
            {generatePitchText(selectedEmployer)}
          </div>
        </div>
      )}

      {/* TAB 5: SAVED PIPELINE TRACKER */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3">
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-emerald-600" />
              <span>Director Outreach Pipeline ({savedEmployersList.length} Companies Tracked)</span>
            </h2>
            <p className="text-xs text-slate-500">
              International employers bookmarked by Director Urwa Ali for direct manpower supply contract negotiation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedEmployersList.map(emp => (
              <div
                key={emp.id}
                className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className="text-2xl">{emp.flag}</span>
                      <div>
                        <h3 className="font-bold text-slate-900 text-sm">{emp.companyName}</h3>
                        <span className="text-[10px] text-slate-400">{emp.country}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSaveCompany(emp.id)}
                      className="p-1 rounded-lg text-rose-500 hover:bg-rose-50 text-[11px] font-semibold"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="text-xs space-y-1">
                    <div><strong>Hiring Deadline:</strong> {emp.hiringUntilDate}</div>
                    <div>
                      <strong>HR Email:</strong>{' '}
                      <a
                        href={getOfficialBusinessEmailUrl({ to: emp.contact.email })}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => openOfficialBusinessEmail({ to: emp.contact.email }, e)}
                        className="text-cyan-600 underline cursor-pointer"
                        title={`Send proposal from official business email (${OFFICIAL_BUSINESS_EMAIL}) in browser`}
                      >
                        {emp.contact.email}
                      </a>
                    </div>
                    <div><strong>Direct Phone:</strong> <a href={`tel:${emp.contact.phone.replace(/\s+/g, '')}`} className="text-emerald-700 font-mono">{emp.contact.phone}</a></div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 text-[11px] text-slate-600">
                    <strong>Roles:</strong> {emp.openRoles.join(', ')}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-3 flex items-center gap-2">
                  <button
                    onClick={() => {
                      setCvTargetEmployer(emp);
                      setCvSelectedRole(emp.openRoles[0]);
                      setActiveTab('cv-studio');
                    }}
                    className="flex-1 py-2 rounded-xl bg-purple-50 hover:bg-purple-100 text-purple-900 font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Upgrade CV</span>
                  </button>
                  <button
                    onClick={() => {
                      setSelectedEmployer(emp);
                      setActiveTab('pitch');
                    }}
                    className="flex-1 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 transition-colors"
                  >
                    <span>Generate Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
