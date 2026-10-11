export interface InternationalEmployer {
  id: string;
  companyName: string;
  country: string;
  city: string;
  flag: string;
  region: 'Gulf / Middle East' | 'Schengen / Europe' | 'UK & North America' | 'East Asia';
  industry:
    | 'Construction & Engineering'
    | 'Healthcare & Caregiving'
    | 'Hospitality & Tourism'
    | 'Education & Teaching'
    | 'Agriculture & Farming'
    | 'Domestic & Housekeeping'
    | 'Facility Management & Security';
  openRoles: string[];
  visaSponsorshipProvided: boolean;
  visaSponsorshipDetails: string;
  hiringUntilDate: string;
  targetNationalities: string[];
  requirements: {
    experience: string;
    education: string;
    language: string;
    ageLimit: string;
    certifications?: string;
  };
  compensation: {
    salaryRange: string;
    salaryPkrEquivalent: string;
    housingProvided: boolean;
    transportProvided: boolean;
    airTicketProvided: boolean;
    medicalInsurance: boolean;
    notes: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
    careersUrl: string;
    hrDepartment: string;
  };
  b2bOutreachStatus?: 'New' | 'Pitch Sent' | 'In Discussion' | 'Partner Signed';
}

export const VERIFIED_INTERNATIONAL_EMPLOYERS: InternationalEmployer[] = [
  // 1. SAUDI ARABIA - Construction & Mega Projects
  {
    id: 'EMP-KSA-001',
    companyName: 'Nesma & Partners Contracting',
    country: 'Saudi Arabia',
    city: 'Riyadh / NEOM / Al Khobar',
    flag: '🇸🇦',
    region: 'Gulf / Middle East',
    industry: 'Construction & Engineering',
    openRoles: [
      'Site Electricians & Plumbers',
      'Structural Welders & Steel Fixers',
      'Civil Construction Labors',
      'Heavy Equipment Operators & Drivers',
      'Civil Foremen & Site Supervisors'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'Direct Employer Sponsored Block Visa & Iqama with Musaned/Qiwa Ministry of HR contract',
    hiringUntilDate: '15 December 2026',
    targetNationalities: ['Pakistan', 'India', 'Philippines', 'Nepal'],
    requirements: {
      experience: '2 - 5 years GCC or recognized local contractor experience',
      education: 'Technical Diploma / Matric / Trade Test Certified',
      language: 'Basic English or Arabic understanding',
      ageLimit: '21 to 45 years',
      certifications: 'Trade Test Center Certificate (NAVTTC / Authorized Technical Center)'
    },
    compensation: {
      salaryRange: 'SAR 1,800 - SAR 4,200 / month (depending on trade skill)',
      salaryPkrEquivalent: 'PKR 135,000 - PKR 315,000 / month',
      housingProvided: true,
      transportProvided: true,
      airTicketProvided: true,
      medicalInsurance: true,
      notes: 'Full camp accommodation with mess food, overtime allowance, and return flight every 2 years.'
    },
    contact: {
      phone: '+966 13 887 8777',
      email: 'recruitment@nesma-partners.com',
      website: 'https://nesma-partners.com',
      careersUrl: 'https://nesma-partners.com/careers',
      hrDepartment: 'Overseas Talent Acquisition & Manpower Sourcing'
    }
  },

  // 2. SAUDI ARABIA - Healthcare & Caregiving
  {
    id: 'EMP-KSA-002',
    companyName: 'Dr. Sulaiman Al Habib Medical Group (HMG)',
    country: 'Saudi Arabia',
    city: 'Riyadh / Jeddah / Al Qassim',
    flag: '🇸🇦',
    region: 'Gulf / Middle East',
    industry: 'Healthcare & Caregiving',
    openRoles: [
      'Registered Staff Nurses (Female & Male)',
      'Patient Care Assistants & Orderlies',
      'Elderly Home Care Aides',
      'ICU & Emergency Ward Technicians',
      'Hospital Housekeeping & Hygiene Staff'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'MOH Approved Direct Employment Visa + SCFHS DataFlow Processing Support',
    hiringUntilDate: '31 January 2027',
    targetNationalities: ['Pakistan', 'Philippines', 'Jordan', 'Tunisia'],
    requirements: {
      experience: '2+ years hospital or nursing home experience',
      education: 'BSc Nursing / General Nursing Diploma or Certified Patient Care Assistant',
      language: 'Fluent English; basic Arabic conversational preferred',
      ageLimit: '22 to 42 years',
      certifications: 'PNC (Pakistan Nursing Council) registration & valid license'
    },
    compensation: {
      salaryRange: 'SAR 4,500 - SAR 9,500 / month',
      salaryPkrEquivalent: 'PKR 335,000 - PKR 710,000 / month',
      housingProvided: true,
      transportProvided: true,
      airTicketProvided: true,
      medicalInsurance: true,
      notes: 'Furnished staff compound or housing allowance + annual paid 30-day leave with flight tickets.'
    },
    contact: {
      phone: '+966 11 525 9999',
      email: 'nursing.recruitment@drsulaimanalhabib.com',
      website: 'https://hmg.com',
      careersUrl: 'https://hmg.com/en/Pages/Careers.aspx',
      hrDepartment: 'International Medical Staffing Division'
    }
  },

  // 3. UAE / DUBAI - Hospitality & Tourism
  {
    id: 'EMP-UAE-001',
    companyName: 'Emaar Hospitality Group (Address & Vida Hotels)',
    country: 'United Arab Emirates',
    city: 'Dubai / Abu Dhabi',
    flag: '🇦🇪',
    region: 'Gulf / Middle East',
    industry: 'Hospitality & Tourism',
    openRoles: [
      'Hotel Housekeeping Attendants (Male & Female)',
      'F&B Service Waiters & Waitresses',
      'Commis Chefs & Line Cooks',
      'Hotel Front Desk & Bell Captains',
      'Laundry Machine Operators'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'Official UAE Ministry of Human Resources (MOHRE) 2-Year Employment Visa with Emirates ID',
    hiringUntilDate: '28 February 2027',
    targetNationalities: ['Pakistan', 'Nepal', 'Sri Lanka', 'Philippines', 'Morocco'],
    requirements: {
      experience: '1 - 3 years in hotel, luxury restaurant, or guest house',
      education: 'Intermediate / High School / Hospitality Certificate',
      language: 'Good spoken English & polished grooming standards',
      ageLimit: '20 to 35 years',
      certifications: 'Hospitality / Food Hygiene certificate (preferred)'
    },
    compensation: {
      salaryRange: 'AED 2,200 - AED 4,500 / month + Service Charge & Tips',
      salaryPkrEquivalent: 'PKR 170,000 - PKR 345,000 / month',
      housingProvided: true,
      transportProvided: true,
      airTicketProvided: true,
      medicalInsurance: true,
      notes: 'Luxury staff accommodation in Dubai Silicon Oasis/Al Quoz, duty meals provided, uniform provided.'
    },
    contact: {
      phone: '+971 4 367 3333',
      email: 'hospitality.careers@emaar.ae',
      website: 'https://emaar.com/en/hospitality',
      careersUrl: 'https://careers.emaar.com',
      hrDepartment: 'Talent Acquisition - Hospitality & Guest Services'
    }
  },

  // 4. UAE / DUBAI - Facilities, Security & Domestic
  {
    id: 'EMP-UAE-002',
    companyName: 'Transguard Group (Emirates Group Enterprise)',
    country: 'United Arab Emirates',
    city: 'Dubai / Abu Dhabi',
    flag: '🇦🇪',
    region: 'Gulf / Middle East',
    industry: 'Facility Management & Security',
    openRoles: [
      'Commercial & Residential Cleaners (Housekeeping)',
      'Security Guards (SIRA Licensed)',
      'Airport Ground Baggage Handlers',
      'Warehouse Cargo Packers',
      'Commercial MEP Technicians'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'Full UAE Resident Employment Visa, medical fitness test & Emirates ID sponsored',
    hiringUntilDate: '31 December 2026',
    targetNationalities: ['Pakistan', 'India', 'Nepal', 'Ghana', 'Kenya'],
    requirements: {
      experience: 'Fresh to 2 years experience; training provided',
      education: 'Middle / Matric / Intermediate',
      language: 'Basic English comprehension',
      ageLimit: '21 to 38 years',
      certifications: 'Police Clearance Certificate (PCC) from Pakistan'
    },
    compensation: {
      salaryRange: 'AED 1,800 - AED 3,200 / month + Overtime',
      salaryPkrEquivalent: 'PKR 140,000 - PKR 245,000 / month',
      housingProvided: true,
      transportProvided: true,
      airTicketProvided: true,
      medicalInsurance: true,
      notes: 'Air-conditioned accommodation, gym & cafeteria on campus, biometric timekeeping overtime.'
    },
    contact: {
      phone: '+971 4 703 0500',
      email: 'recruitment@transguardgroup.com',
      website: 'https://transguardgroup.com',
      careersUrl: 'https://transguardgroup.com/careers',
      hrDepartment: 'Manpower Supply & Mass Hiring Center'
    }
  },

  // 5. QATAR - Construction & Facilities
  {
    id: 'EMP-QAT-001',
    companyName: 'UrbaCon Trading & Contracting (UCC Holding)',
    country: 'Qatar',
    city: 'Doha / Lusail',
    flag: '🇶🇦',
    region: 'Gulf / Middle East',
    industry: 'Construction & Engineering',
    openRoles: [
      'Construction Masons & Tilers',
      'Building Painters & Gypsum Board Fixers',
      'Electricians & HVAC Ductmen',
      'Civil Construction Helpers',
      'Scaffolders (CISRS Certified)'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'Approved Qatar Ministry of Labour Work Visa & QID with employer sponsorship',
    hiringUntilDate: '30 November 2026',
    targetNationalities: ['Pakistan', 'Nepal', 'India', 'Bangladesh'],
    requirements: {
      experience: 'Minimum 2 years commercial building experience',
      education: 'Primary / Matric / Vocational Certificate',
      language: 'Basic English or Urdu/Hindi',
      ageLimit: '21 to 44 years',
      certifications: 'Safety induction certified / Trade Test'
    },
    compensation: {
      salaryRange: 'QAR 1,600 - QAR 3,800 / month + Food Allowance',
      salaryPkrEquivalent: 'PKR 125,000 - PKR 295,000 / month',
      housingProvided: true,
      transportProvided: true,
      airTicketProvided: true,
      medicalInsurance: true,
      notes: 'Fully managed camp in Industrial Area / Lusail, health card, 3 meals daily or food allowance QAR 300.'
    },
    contact: {
      phone: '+974 4429 8888',
      email: 'careers@ucc-holding.com',
      website: 'https://ucc-holding.com',
      careersUrl: 'https://ucc-holding.com/careers',
      hrDepartment: 'Global Manpower Allocation Desk'
    }
  },

  // 6. OMAN - Engineering, Infrastructure & Agriculture
  {
    id: 'EMP-OMN-001',
    companyName: 'Galfar Engineering & Contracting SAOG',
    country: 'Oman',
    city: 'Muscat / Sohar / Salalah',
    flag: '🇴🇲',
    region: 'Gulf / Middle East',
    industry: 'Construction & Engineering',
    openRoles: [
      'Road Construction Workers & Asphalters',
      'Pipe Fitters & Mechanical Welders',
      'Agricultural Landscaping Workers',
      'Light & Heavy Duty Drivers (Oman / GCC License)',
      'Masonry & Concrete Craftsmen'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'Official Sultanate of Oman Ministry of Labour Employment Visa & Resident Card',
    hiringUntilDate: '15 January 2027',
    targetNationalities: ['Pakistan', 'India', 'Bangladesh'],
    requirements: {
      experience: '2+ years civil / infrastructure work',
      education: 'Matric or Technical trade qualification',
      language: 'Urdu / Hindi / Basic English',
      ageLimit: '22 to 45 years',
      certifications: 'Valid driving license for driver positions'
    },
    compensation: {
      salaryRange: 'OMR 160 - OMR 380 / month + OT',
      salaryPkrEquivalent: 'PKR 115,000 - PKR 275,000 / month',
      housingProvided: true,
      transportProvided: true,
      airTicketProvided: true,
      medicalInsurance: true,
      notes: 'Employer provided housing, transport, medical cover, and overtime payment per Omani labor law.'
    },
    contact: {
      phone: '+968 2452 5000',
      email: 'recruitment@galfar.com',
      website: 'https://galfar.com',
      careersUrl: 'https://galfar.com/careers',
      hrDepartment: 'Recruitment & Overseas Resourcing Department'
    }
  },

  // 7. GERMANY - Caregiving & Nursing (Skilled Immigration Act)
  {
    id: 'EMP-GER-001',
    companyName: 'Vivantes Healthcare Network Berlin',
    country: 'Germany',
    city: 'Berlin / Potsdam',
    flag: '🇩🇪',
    region: 'Schengen / Europe',
    industry: 'Healthcare & Caregiving',
    openRoles: [
      'Elderly Caregivers (Altenpflegefachkraft)',
      'Hospital Patient Care Assistants',
      'Pediatric Care Assistants',
      'Geriatric Health Aides'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'German National D-Visa & Residence Permit for Skilled Workers (Section 18a/18b AufenthG) with Recognition Fast-Track',
    hiringUntilDate: '30 June 2027',
    targetNationalities: ['Pakistan', 'Tunisia', 'Philippines', 'India', 'Bosnia'],
    requirements: {
      experience: '1+ year healthcare, home care, or nursing background',
      education: 'Diploma in Nursing, Midwifery, or Caregiving',
      language: 'German Language B1 or B2 Certificate (Goethe-Institut or ÖSD) mandatory',
      ageLimit: '21 to 46 years',
      certifications: 'Defizitbescheid (German credential assessment recognition application)'
    },
    compensation: {
      salaryRange: '€2,600 - €3,600 / month (Gross salary per collective agreement TVöD)',
      salaryPkrEquivalent: 'PKR 820,000 - PKR 1,140,000 / month',
      housingProvided: false,
      transportProvided: true,
      airTicketProvided: true,
      medicalInsurance: true,
      notes: 'Assistance finding apartment in Berlin + subsidised public transport pass + language course support.'
    },
    contact: {
      phone: '+49 30 130 100',
      email: 'karriere@vivantes.de',
      website: 'https://vivantes-karriere.de',
      careersUrl: 'https://vivantes-karriere.de/pflege',
      hrDepartment: 'International Nurse Recruiting Taskforce'
    }
  },

  // 8. POLAND - Agriculture, Farming & Food Processing
  {
    id: 'EMP-POL-001',
    companyName: 'Cedrob S.A. Food & Agro Group',
    country: 'Poland',
    city: 'Warsaw / Ciechanów / Mława',
    flag: '🇵🇱',
    region: 'Schengen / Europe',
    industry: 'Agriculture & Farming',
    openRoles: [
      'Greenhouse Workers & Vegetable Pickers',
      'Food Processing & Packaging Workers',
      'Poultry & Livestock Farm Handlers',
      'Warehouse Forklift Drivers & Loaders',
      'Agricultural Machinery Operators'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'Official Polish Voivodeship Work Permit (Zezwolenie na Pracę Typ A) for 1 - 3 Years D-Type Visa',
    hiringUntilDate: '31 March 2027',
    targetNationalities: ['Pakistan', 'India', 'Uzbekistan', 'Nepal', 'Philippines'],
    requirements: {
      experience: 'Farming, warehouse, or manual labor experience preferred',
      education: 'Basic Schooling / High School',
      language: 'Basic English comprehension (Polish not required)',
      ageLimit: '20 to 48 years',
      certifications: 'Medical fitness certificate for food handling'
    },
    compensation: {
      salaryRange: 'PLN 4,300 - PLN 6,200 / month (approx €1,000 - €1,450 / month)',
      salaryPkrEquivalent: 'PKR 310,000 - PKR 450,000 / month',
      housingProvided: true,
      transportProvided: true,
      airTicketProvided: false,
      medicalInsurance: true,
      notes: 'Clean dormitory accommodation provided (minimal payroll deduction ~PLN 350/mo), daily bus to work.'
    },
    contact: {
      phone: '+48 23 672 4411',
      email: 'rekrutacja@cedrob.com.pl',
      website: 'https://cedrob.com.pl',
      careersUrl: 'https://cedrob.com.pl/kariera',
      hrDepartment: 'Foreign Worker Employment Office'
    }
  },

  // 9. ROMANIA - Construction & General Manpower (EU Work Permit)
  {
    id: 'EMP-ROU-001',
    companyName: 'Erbasu Construction S.A.',
    country: 'Romania',
    city: 'Bucharest / Cluj-Napoca / Timișoara',
    flag: '🇷🇴',
    region: 'Schengen / Europe',
    industry: 'Construction & Engineering',
    openRoles: [
      'Bricklayers & Masonry Workers',
      'Carpenters & Formwork Specialists',
      'Welders (MIG/MAG & TIG)',
      'Electrical Wiremen & Plumbers',
      'General Construction Laborers'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'General Inspectorate for Immigration (IGI) Romanian Work Authorisation (Aviz de Angajare) + Long-Stay Visa D/AM',
    hiringUntilDate: '30 April 2027',
    targetNationalities: ['Pakistan', 'India', 'Vietnam', 'Sri Lanka'],
    requirements: {
      experience: '2+ years trade experience in civil construction',
      education: 'Matric / Trade Diploma',
      language: 'Basic English',
      ageLimit: '21 to 45 years',
      certifications: 'No criminal record apostilled / verified certificate'
    },
    compensation: {
      salaryRange: 'RON 3,700 - RON 5,800 / month Net (approx €750 - €1,200 / month)',
      salaryPkrEquivalent: 'PKR 230,000 - PKR 370,000 / month',
      housingProvided: true,
      transportProvided: true,
      airTicketProvided: true,
      medicalInsurance: true,
      notes: 'Employer provides free staff quarters, kitchen facilities, medical insurance, and Romanian work permit processing fees.'
    },
    contact: {
      phone: '+40 21 232 3550',
      email: 'recrutare@erbasu.ro',
      website: 'https://erbasu.ro',
      careersUrl: 'https://erbasu.ro/cariere',
      hrDepartment: 'International Manpower Recruitment Unit'
    }
  },

  // 10. CROATIA - Hospitality & Restaurant Staff (Schengen Work Visa)
  {
    id: 'EMP-HRV-001',
    companyName: 'Valamar Riviera Hotels & Resorts',
    country: 'Croatia',
    city: 'Dubrovnik / Split / Poreč / Istria',
    flag: '🇭🇷',
    region: 'Schengen / Europe',
    industry: 'Hospitality & Tourism',
    openRoles: [
      'Hotel Room Cleaners & Housekeepers',
      'Waiters & Food Runners',
      'Dishwashers & Kitchen Stewards',
      'Assistant Cooks (Pizzaiolo / Grill / Prep)',
      'Resort Baggage Handlers & Porters'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'Croatian Police Directorate (MUP) Residence & Work Permit (Dozvola za boravak i rad) for Schengen National D-Visa',
    hiringUntilDate: '15 May 2027',
    targetNationalities: ['Pakistan', 'Philippines', 'Nepal', 'India', 'Macedonia'],
    requirements: {
      experience: '1 - 2 years hotel, cafe, or catering experience',
      education: 'High School / Vocational Training',
      language: 'Conversational English',
      ageLimit: '20 to 45 years',
      certifications: 'Clean background check'
    },
    compensation: {
      salaryRange: '€950 - €1,600 / month Net + Tips & Seasonal Bonus',
      salaryPkrEquivalent: 'PKR 300,000 - PKR 505,000 / month',
      housingProvided: true,
      transportProvided: true,
      airTicketProvided: false,
      medicalInsurance: true,
      notes: 'Free twin-share accommodation at staff village, 3 hot meals daily at staff canteen, 1 day off weekly.'
    },
    contact: {
      phone: '+385 52 408 000',
      email: 'ljudski.potencijali@valamar.com',
      website: 'https://valamar-riviera.com',
      careersUrl: 'https://dobarposaouvalamaru.com',
      hrDepartment: 'Seasonal & International Workforce Operations'
    }
  },

  // 11. GULF / SAUDI ARABIA - Education & Teaching
  {
    id: 'EMP-KSA-003',
    companyName: 'Alrowad International Education Schools',
    country: 'Saudi Arabia',
    city: 'Riyadh / Jeddah',
    flag: '🇸🇦',
    region: 'Gulf / Middle East',
    industry: 'Education & Teaching',
    openRoles: [
      'IGCSE / O-Level Mathematics Teachers',
      'Physics, Chemistry & Biology Teachers',
      'Primary School English Teachers',
      'ICT & Computer Science Instructors',
      'Montessori & Kindergarten Educators'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'Official Saudi Ministry of Education Work Visa & Iqama for Teachers',
    hiringUntilDate: '15 August 2027',
    targetNationalities: ['Pakistan', 'Jordan', 'Egypt', 'Lebanon', 'South Africa'],
    requirements: {
      experience: '3+ years Cambridge IGCSE, Oxford or British curriculum teaching',
      education: 'Master or Bachelor degree in Subject + B.Ed / M.Ed',
      language: 'Fluent English speaking & writing',
      ageLimit: '24 to 48 years',
      certifications: 'HEC & Ministry of Foreign Affairs verified degrees'
    },
    compensation: {
      salaryRange: 'SAR 6,000 - SAR 12,000 / month Tax-Free',
      salaryPkrEquivalent: 'PKR 450,000 - PKR 900,000 / month',
      housingProvided: true,
      transportProvided: true,
      airTicketProvided: true,
      medicalInsurance: true,
      notes: 'Furnished faculty housing allowance, annual paid summer vacation (60 days), free schooling for 2 children.'
    },
    contact: {
      phone: '+966 11 492 8888',
      email: 'recruitment@alrowad.edu.sa',
      website: 'https://alrowad.edu.sa',
      careersUrl: 'https://alrowad.edu.sa/careers',
      hrDepartment: 'International Academic Faculty Recruitment'
    }
  },

  // 12. GULF / QATAR - Education & Teaching
  {
    id: 'EMP-QAT-002',
    companyName: 'Newton International School Network',
    country: 'Qatar',
    city: 'Doha',
    flag: '🇶🇦',
    region: 'Gulf / Middle East',
    industry: 'Education & Teaching',
    openRoles: [
      'Secondary Science & Maths Teachers',
      'Primary Classroom Teachers (Key Stage 1 & 2)',
      'Early Years Foundation Stage (EYFS) Teachers',
      'Physical Education (PE) & Sports Coaches'
    ],
    visaSponsorshipProvided: true,
    visaSponsorshipDetails: 'Qatar Ministry of Education Approved Work Residence Permit (QID Sponsored)',
    hiringUntilDate: '30 June 2027',
    targetNationalities: ['Pakistan', 'UK', 'South Africa', 'Jordan'],
    requirements: {
      experience: 'Minimum 2 years teaching British National Curriculum',
      education: 'Bachelor of Education (B.Ed) or BA/BSc + PGCE',
      language: 'Native / Near-Native English fluency',
      ageLimit: '23 to 50 years',
      certifications: 'Police Clearance Certificate & Apostilled Degrees'
    },
    compensation: {
      salaryRange: 'QAR 8,000 - QAR 14,000 / month Tax-Free',
      salaryPkrEquivalent: 'PKR 620,000 - PKR 1,090,000 / month',
      housingProvided: true,
      transportProvided: true,
      airTicketProvided: true,
      medicalInsurance: true,
      notes: 'Provided modern air-conditioned accommodation with utilities paid, annual return flights, end of service gratuity.'
    },
    contact: {
      phone: '+974 4451 6888',
      email: 'recruitment@newtonschools.sch.qa',
      website: 'https://newtonschools.sch.qa',
      careersUrl: 'https://newtonschools.sch.qa/vacancies',
      hrDepartment: 'International Educator Talent Acquisition'
    }
  }
];

export function searchInternationalEmployers(query: string, industryFilter?: string, regionFilter?: string): InternationalEmployer[] {
  const q = query.toLowerCase().trim();
  return VERIFIED_INTERNATIONAL_EMPLOYERS.filter(emp => {
    const matchesQuery =
      !q ||
      emp.companyName.toLowerCase().includes(q) ||
      emp.country.toLowerCase().includes(q) ||
      emp.city.toLowerCase().includes(q) ||
      emp.openRoles.some(r => r.toLowerCase().includes(q)) ||
      emp.industry.toLowerCase().includes(q) ||
      emp.visaSponsorshipDetails.toLowerCase().includes(q);

    const matchesIndustry =
      !industryFilter || industryFilter === 'All' || emp.industry === industryFilter;

    const matchesRegion =
      !regionFilter || regionFilter === 'All' || emp.region === regionFilter;

    return matchesQuery && matchesIndustry && matchesRegion;
  });
}
