import { ServiceItem } from '../types';

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'flight-booking',
    title: 'Flight Booking Assistance',
    category: 'Travel & Transport',
    icon: 'Plane',
    shortDescription: 'Competitive routing, seat selection, and reservation tickets for domestic and international itineraries.',
    fullDescription: 'Our flight booking team coordinates with major international carriers to locate optimal flight routes, baggage allowances, and convenient transit times. We assist with individual, family, group, and corporate business schedules as well as verified flight reservations required for visa application files.',
    features: [
      'International & domestic schedule planning',
      'Visa reservation assistance with verifiable PNR',
      'Flexible date change and baggage guidance',
      'Group & family seating coordination'
    ],
    active: true
  },
  {
    id: 'hotel-booking',
    title: 'Hotel Booking Assistance',
    category: 'Accommodation',
    icon: 'Building2',
    shortDescription: 'Verified hotel reservations, boutique stays, family suites, and embassy-compliant accommodation vouchers.',
    fullDescription: 'Whether traveling for leisure, business, or family holidays, we secure well-located hotel accommodations suited to your travel budget. We provide verified hotel reservation vouchers tailored specifically for visa application files and documentation checklists.',
    features: [
      'Worldwide hotel selections from luxury to boutique',
      'Hotel vouchers for visa submission files',
      'Free cancellation & refundable option guidance',
      'Proximity to city centers, business hubs & holy sites'
    ],
    active: true
  },
  {
    id: 'visa-services',
    title: 'Visa Services & Guidance',
    category: 'Visa Consultancy',
    icon: 'Stamp',
    shortDescription: 'Comprehensive visa consultation, application guidance, and checklist management for global destinations.',
    fullDescription: 'Navigating international visa requirements demands strict attention to embassy regulations. Our experienced team provides end-to-end guidance for Schengen, UK, USA, Canada, Australia, GCC, and e-Visa destinations, ensuring your application file is thorough, compliant, and well-organized.',
    features: [
      'Detailed country-specific document checklists',
      'Application form drafting & error verification',
      'Embassy appointment booking coordination',
      'Continuous status tracking & interview briefing'
    ],
    active: true
  },
  {
    id: 'tour-packages',
    title: 'Tour & Holiday Packages',
    category: 'Holiday Packages',
    icon: 'Globe2',
    shortDescription: 'Carefully curated international holiday packages across Europe, Middle East, and Asia.',
    fullDescription: 'Experience iconic global destinations with customized holiday packages. From guided European excursions to tropical beach getaways and Middle Eastern city adventures, our packages include coordinated hotels, transfers, sightseeing, and documentation assistance.',
    features: [
      'Customized day-by-day sightseeing itineraries',
      'Family-friendly and group tour options',
      'Airport meet-and-greet with private transfers',
      'Transparent quotes without hidden charges'
    ],
    active: true
  },
  {
    id: 'honeymoon-packages',
    title: 'Honeymoon Packages',
    category: 'Holiday Packages',
    icon: 'HeartHandshake',
    shortDescription: 'Romantic journeys, luxury private pool villas, scenic alpine retreats, and serene coastal getaways.',
    fullDescription: 'Celebrate your marriage with thoughtfully crafted honeymoon itineraries. We arrange romantic stays in destinations such as the Maldives, Bali, Switzerland, Turkey, and Dubai, incorporating private excursions, candlelight dining, and hassle-free travel arrangements.',
    features: [
      'Luxury private villa & 5-star resort options',
      'Special honeymoon amenities & romantic excursions',
      'Dedicated travel coordinator support',
      'Discreet and stress-free itinerary management'
    ],
    active: true
  },
  {
    id: 'umrah-packages',
    title: 'Umrah Travel Packages',
    category: 'Spiritual Journeys',
    icon: 'Moon',
    shortDescription: 'Dignified, spiritual Umrah travel assistance with premium accommodation near the Holy Harams.',
    fullDescription: 'SkyBridge Travel & Tourism offers respectful, well-organized Umrah travel services. We coordinate Umrah visas, reliable flight schedules, hotels within walking distance of Masjid al-Haram in Makkah and Al-Masjid an-Nabawi in Madinah, and comfortable intercity private transportation.',
    features: [
      'Umrah visa processing assistance',
      'Hotels in close walking distance to the Harams',
      'Private Haramain train & ground transport coordination',
      'Guidance for first-time pilgrims and families'
    ],
    active: true
  },
  {
    id: 'documentation-clearance',
    title: 'Documentation Clearance',
    category: 'Documentation',
    icon: 'FileCheck2',
    shortDescription: 'Professional audit of financial records, sponsorship affidavits, and supporting embassy paperwork.',
    fullDescription: 'Incomplete or improperly structured documentation is the leading cause of visa delays. Our documentation specialists review every page of your financial records, employment proofs, tax declarations, and sponsorship papers to verify consistency and compliance with embassy mandates.',
    features: [
      'Bank statement presentation checks',
      'Tax document & employment letter formatting',
      'Relationship & sponsorship proof verification',
      'Document translation and notarization guidance'
    ],
    active: true
  },
  {
    id: 'cover-letter-preparation',
    title: 'Cover Letter Preparation',
    category: 'Documentation',
    icon: 'FileText',
    shortDescription: 'Custom-drafted, professional cover letters clearly explaining travel purpose, ties, and funding.',
    fullDescription: 'A persuasive, professionally articulated cover letter is essential for visa officers to understand your genuine travel purpose, financial stability, and strong economic and social ties to your home country. We craft tailored letters aligned specifically with your profile.',
    features: [
      'Clear articulation of genuine travel purpose',
      'Detailed breakdown of funding & itinerary',
      'Strong presentation of socio-economic ties',
      'Aligned with individual embassy expectations'
    ],
    active: true
  },
  {
    id: 'visa-file-preparation',
    title: 'Visa File Preparation',
    category: 'Documentation',
    icon: 'FolderLock',
    shortDescription: 'Organized file structuring, index tabs, and chronological dossier presentation for embassy submission.',
    fullDescription: 'We structure your entire visa submission dossier following the exact sequence preferred by consular officers. A clean, properly indexed file ensures that visa officers can locate each required supporting record swiftly without confusion.',
    features: [
      'Systematic categorization of primary & supporting docs',
      'Document indexing and table of contents',
      'Elimination of redundant or conflicting papers',
      'Physical and digital submission-ready files'
    ],
    active: true
  },
  {
    id: 'student-visa-assistance',
    title: 'Student Visa Assistance',
    category: 'Visa Consultancy',
    icon: 'GraduationCap',
    shortDescription: 'Guidance on university admission documentation, student visa applications, and financial evidence.',
    fullDescription: 'Studying abroad requires precise visa documentation, including CAS or I-20 proof, sponsor declarations, scholarship verification, and living cost calculations. We guide students applying for the UK, USA, Canada, Australia, and European institutions.',
    features: [
      'Verification of university offer and acceptance proofs',
      'Student financial evidence structuring',
      'Statement of Purpose (SOP) review assistance',
      'Pre-departure checklists and travel coordination'
    ],
    active: true
  },
  {
    id: 'family-visa-assistance',
    title: 'Family Visa Assistance',
    category: 'Visa Consultancy',
    icon: 'Users2',
    shortDescription: 'Consolidated family visa application dossiers, relationship proofs, and group travel coordination.',
    fullDescription: 'Applying as a family requires synchronized applications where financial sponsorship, relationship certificates (FRC/NADRA), and travel dates align seamlessly across all family members. We ensure the entire family file is prepared cohesively.',
    features: [
      'Coordinated filing for spouses and dependent children',
      'Family Registration Certificate (FRC) presentation',
      'Primary sponsor affidavit structuring',
      'Synchronized appointment booking assistance'
    ],
    active: true
  },
  {
    id: 'airport-transportation',
    title: 'Airport Transportation',
    category: 'Travel & Transport',
    icon: 'CarTaxiFront',
    shortDescription: 'Reliable airport pickups, chauffeur-driven private cars, and intercity transfers worldwide.',
    fullDescription: 'Arrive at your international destination with total peace of mind. We arrange meet-and-greet airport transportation, private chauffeurs, and comfortable family vans in destinations including Dubai, Istanbul, London, Paris, and Saudi Arabia.',
    features: [
      'Flight-tracked airport pickups with zero waiting anxiety',
      'Executive sedans, SUVs, and luxury passenger vans',
      'Fixed transparent rates with professional drivers',
      'Seamless hotel-to-airport transfers'
    ],
    active: true
  }
];

export const DOCUMENTATION_PROCESS = [
  {
    step: '01',
    title: 'Consultation',
    description: 'We evaluate your travel profile, destination criteria, and specific documentation requirements in an initial structured session.'
  },
  {
    step: '02',
    title: 'Document Preparation',
    description: 'We compile, structure, and organize your supporting documents and financial dossier sheets.'
  },
  {
    step: '03',
    title: 'File Review',
    description: 'Our senior consultants conduct a thorough compliance audit of every document to ensure strict adherence to embassy guidelines.'
  },
  {
    step: '04',
    title: 'Appointment Support',
    description: 'We coordinate appointment scheduling at official visa application centers with complete interview briefings.'
  },
  {
    step: '05',
    title: 'Travel Preparation',
    description: 'Upon visa decision, we assist with finalized flight ticketing, accommodation reconfirmation, travel insurance, and foreign currency guidance.'
  }
];
