import {
  SeoAuditCheck,
  SeoContentPlanItem,
  LandingPagePlanItem,
  SocialMediaPostItem,
  MarketingCampaignRecord
} from '../types';

// ============================================================================
// 1. 12 WEBSITE AUDIT CHECKS (Section 8A)
// ============================================================================
export const INITIAL_SEO_AUDIT_CHECKS: SeoAuditCheck[] = [
  {
    id: 'AUDIT-001',
    checkName: 'Broken Links & Dead Redirections',
    category: 'Technical',
    status: 'Pass',
    description: 'Scanned 42 internal hyperlinks across navigation, footer, and package cards. All routes resolve with 200 HTTP status.',
    recommendation: 'Maintain continuous periodic check on external consular portal links as embassy URLs occasionally update.'
  },
  {
    id: 'AUDIT-002',
    checkName: 'Page Titles & Brand Hierarchy',
    category: 'Content',
    status: 'Pass',
    description: 'Dynamic titles implemented across all main pages with brand name "SkyBridge Travel & Tourism" and primary keywords.',
    recommendation: 'Ensure secondary landing pages keep primary location focus (Lahore, Pakistan, UAE).'
  },
  {
    id: 'AUDIT-003',
    checkName: 'Meta Descriptions & SERP Snippets',
    category: 'Content',
    status: 'Pass',
    description: 'All public pages include curated 150-160 character meta descriptions highlighting official contact numbers and travel services.',
    recommendation: 'Test seasonal click-through variations for Winter Umrah and Summer European holiday seasons.'
  },
  {
    id: 'AUDIT-004',
    checkName: 'Image Alt Text & Accessibility',
    category: 'Technical',
    status: 'Notice',
    description: 'Destination photos and airline logos have alt tags. Some dynamic user gallery photos have generic descriptions.',
    recommendation: 'Enforce descriptive keyword-rich alt text on newly uploaded tour package imagery (e.g. "Makkah Haram view from Clock Tower hotel").'
  },
  {
    id: 'AUDIT-005',
    checkName: 'Page Load Speed & Assets Optimization',
    category: 'Technical',
    status: 'Pass',
    description: 'Vite modern ESM bundle with Tailwind CSS and lazy-loaded admin routes loads under 1.2s on standard broadband.',
    recommendation: 'Use WebP format for high-resolution destination banners to preserve mobile performance.'
  },
  {
    id: 'AUDIT-006',
    checkName: 'Mobile Usability & Responsive Viewport',
    category: 'Technical',
    status: 'Pass',
    description: 'Touch-friendly tap targets, sticky contact action bar, and responsive typography verified across mobile viewports.',
    recommendation: 'Ensure package filter sliders on mobile remain accessible with one-hand navigation.'
  },
  {
    id: 'AUDIT-007',
    checkName: 'Calls to Action (CTAs)',
    category: 'Conversion',
    status: 'Pass',
    description: 'High-visibility CTAs present: "Request a Travel Quote", "Book a Consultation", "Ask on WhatsApp" on every service view.',
    recommendation: 'Add micro-CTA for instant consular checklist download to increase email capture.'
  },
  {
    id: 'AUDIT-008',
    checkName: 'Contact Details & Physical Address Verification',
    category: 'Compliance',
    status: 'Pass',
    description: 'Physical office address (Gulshan Street, Nadeem Town, Multan Road, Lahore), landline, and mobile numbers displayed prominently.',
    recommendation: 'Keep opening hours updated on public holidays.'
  },
  {
    id: 'AUDIT-009',
    checkName: 'Enquiry Forms & Instant CRM Capture',
    category: 'Conversion',
    status: 'Pass',
    description: 'Interactive contact modal and service inquiry forms instantly save incoming leads into the local CRM and Firebase sync pipeline.',
    recommendation: 'Monitor form completion rates to ensure required fields do not create friction.'
  },
  {
    id: 'AUDIT-010',
    checkName: 'Service Landing Pages Completeness',
    category: 'Content',
    status: 'Notice',
    description: 'Core landing pages (/flights, /hotels, /tour-packages, /umrah-packages, /visa-services) are live. Additional sub-pages recommended.',
    recommendation: 'Deploy dedicated sub-pages for /travel-insurance, /airport-transfers, and /honeymoon-packages for targeted search volume.'
  },
  {
    id: 'AUDIT-011',
    checkName: 'Internal Linking Architecture',
    category: 'Content',
    status: 'Pass',
    description: 'Logical contextual links connect destination packages with visa documentation guidelines and flight search tools.',
    recommendation: 'Add "Related Visas" cards at the bottom of popular European holiday package pages.'
  },
  {
    id: 'AUDIT-012',
    checkName: 'Privacy Policy & Required Regulatory Disclosures',
    category: 'Compliance',
    status: 'Pass',
    description: 'Clear statement that SkyBridge Travel & Tourism is an authorized travel consultancy, does not guarantee visa approvals, and protects client privacy.',
    recommendation: 'Review terms annually against updated consumer protection laws and travel regulations.'
  }
];

// ============================================================================
// 2. SEO CONTENT PLANNER (Section 8B)
// ============================================================================
export const INITIAL_SEO_CONTENT_PLAN: SeoContentPlanItem[] = [
  {
    id: 'SEO-PLAN-001',
    targetAudience: 'Pakistani & UAE business travelers and expatriates visiting Europe',
    searchIntent: 'Commercial',
    suggestedTitle: 'Complete Schengen Visa Requirements from Pakistan (2026 Updated Guide)',
    mainKeyword: 'Schengen visa requirements from Pakistan',
    relatedKeywords: ['German visa appointment Lahore', 'Schengen bank statement requirements', 'VFS Global appointment booking', 'travel insurance Schengen approved'],
    metaDescription: 'Step-by-step 2026 guide on official Schengen visa documents, bank statement guidelines, appointment slots, and travel insurance approved by EU embassies.',
    suggestedPageUrl: '/visa-services/schengen-guide',
    articleOutline: [
      '1. Overview of the 29 Schengen member states',
      '2. Determining primary destination embassy',
      '3. 6-Month bank statement criteria and income tax returns (NTN)',
      '4. Accommodation proof & flight reservation requirements',
      '5. Schengen-compliant EUR 30,000 health insurance',
      '6. How SkyBridge consultants assist with dossier preparation'
    ],
    internalLinkingRecommendations: ['/visa-services', '/travel-insurance', '/contact'],
    callToAction: 'Book a professional document review consultation with our senior visa consultant.',
    suggestedPublicationDate: '2026-10-15',
    status: 'Under Review'
  },
  {
    id: 'SEO-PLAN-002',
    targetAudience: 'Families and senior pilgrims planning winter and Ramadan pilgrimage',
    searchIntent: 'Transactional',
    suggestedTitle: 'Winter & Ramadan Umrah Packages from Lahore 2026 — 5-Star & Economy Guides',
    mainKeyword: 'Umrah packages from Lahore 2026',
    relatedKeywords: ['Makkah hotel clock tower package', 'Madinah central markazia hotel', 'Nusuk visa fees Pakistan', 'family Umrah package price'],
    metaDescription: 'Discover luxury and executive Umrah packages from Lahore. 5-star Haram facing rooms, direct airline tickets, Tasheer visa processing, and private GMC transport.',
    suggestedPageUrl: '/umrah-packages/winter-guide',
    articleOutline: [
      '1. Why winter is the best season for Umrah pilgrimage',
      '2. Distance comparison of Makkah & Madinah hotels from Haram courtyards',
      '3. Breakdown of all-inclusive package vs customized booking',
      '4. Electronic Tasheer visa rules & biometric procedures',
      '5. Ziyarat guide for Makkah and Madinah historical sites'
    ],
    internalLinkingRecommendations: ['/umrah-packages', '/flights', '/contact'],
    callToAction: 'Request an itemized family quotation on WhatsApp with instant hotel options.',
    suggestedPublicationDate: '2026-10-18',
    status: 'In Writing'
  },
  {
    id: 'SEO-PLAN-003',
    targetAudience: 'Students seeking fully-funded European master and bachelor degrees',
    searchIntent: 'Informational',
    suggestedTitle: 'Top Fully Funded Scholarships in Italy & Germany for Pakistani Students (2026/27)',
    mainKeyword: 'Fully funded scholarships in Italy for Pakistani students',
    relatedKeywords: ['DSU regional scholarship Italy', 'DAAD scholarship Germany', 'scholarship without IELTS Europe', 'Italian student visa checklist'],
    metaDescription: 'Comprehensive guide to government regional scholarships (DSU, EDISU, LazioDisco) and DAAD grants with 100% tuition waiver, living stipends, and visa guidelines.',
    suggestedPageUrl: '/scholarship-updates/italy-germany',
    articleOutline: [
      '1. Introduction to regional Italian DSU grants & DAAD Germany',
      '2. Eligibility criteria: ISEE Parificato economic documentation',
      '3. University pre-enrollment via Universitaly portal',
      '4. Legalization and Apostille of Pakistani academic degrees (HEC/MOFA)',
      '5. Italian study visa appointment booking timeline in Islamabad & Karachi'
    ],
    internalLinkingRecommendations: ['/scholarships', '/visa-services', '/contact'],
    callToAction: 'Speak to our academic documentation specialist for degree attestation and dossier guidance.',
    suggestedPublicationDate: '2026-10-22',
    status: 'Planned'
  },
  {
    id: 'SEO-PLAN-004',
    targetAudience: 'Corporate HR managers, manufacturing executives, and logistics teams',
    searchIntent: 'Commercial',
    suggestedTitle: 'Corporate Travel Management for Pakistani Companies — Airfares & Hotel Portals',
    mainKeyword: 'Corporate travel agency Lahore',
    relatedKeywords: ['B2B corporate flight booking', 'business travel management Pakistan', 'corporate hotel credit line', 'Schengen business visa assistance'],
    metaDescription: 'Streamline your enterprise travel with SkyBridge corporate desk. Dedicated account manager, 24/7 flight rescheduling, centralized monthly billing, and net GDS rates.',
    suggestedPageUrl: '/corporate-travel',
    articleOutline: [
      '1. The hidden costs of unmanaged corporate travel',
      '2. Benefits of centralized GDS airline ticketing with flexible change terms',
      '3. VIP invitation letter processing and consular fast-track booking',
      '4. Transparent accounting with monthly GST/sales tax invoices',
      '5. How to open a corporate business account with SkyBridge'
    ],
    internalLinkingRecommendations: ['/flights', '/hotels', '/contact'],
    callToAction: 'Download our Corporate Client Deck or request Director Urwa Ali for an introductory meeting.',
    suggestedPublicationDate: '2026-10-25',
    status: 'Planned'
  }
];

// ============================================================================
// 3. LANDING PAGE PLANNER (Section 8C)
// ============================================================================
export const INITIAL_LANDING_PAGES_PLAN: LandingPagePlanItem[] = [
  {
    url: '/flights',
    title: 'Domestic & International Flight Reservations',
    category: 'Air Ticketing',
    status: 'Live & Active',
    primaryCta: 'Search & Request Flight Quotation',
    targetAudience: 'Leisure, family, and corporate air travelers from Pakistan & UAE'
  },
  {
    url: '/hotels',
    title: 'Luxury & Budget Worldwide Hotel Bookings',
    category: 'Accommodations',
    status: 'Live & Active',
    primaryCta: 'Explore Verified Hotel Rates',
    targetAudience: 'Travelers seeking verified hotels in Dubai, Turkey, Europe, and Asia'
  },
  {
    url: '/umrah-packages',
    title: 'VIP & Executive Umrah Pilgrimage Packages',
    category: 'Religious Tourism',
    status: 'Live & Active',
    primaryCta: 'View Umrah Package Itineraries',
    targetAudience: 'Individuals, couples, and community pilgrimage groups'
  },
  {
    url: '/visa-services',
    title: 'Worldwide Tourist & Visit Visa Consultancy',
    category: 'Consular Services',
    status: 'Live & Active',
    primaryCta: 'Check Visa Requirements by Country',
    targetAudience: 'Applicants seeking error-free visa dossiers for UK, USA, Schengen, Canada'
  },
  {
    url: '/travel-insurance',
    title: 'Schengen & Worldwide Approved Travel Health Insurance',
    category: 'Travel Protection',
    status: 'Recommended to Create',
    primaryCta: 'Get Instant Travel Insurance Quote',
    targetAudience: 'Visa applicants requiring embassy-compliant EUR 30,000 / $50,000 policies'
  },
  {
    url: '/tour-packages',
    title: 'Curated International Holiday Packages & Excursions',
    category: 'Holidays',
    status: 'Live & Active',
    primaryCta: 'Explore Holiday Destinations',
    targetAudience: 'Vacation travelers, honeymooners, and family holiday groups'
  },
  {
    url: '/airport-transfers',
    title: 'VIP Chauffeur & Private Airport Transfers Worldwide',
    category: 'Ground Transportation',
    status: 'Recommended to Create',
    primaryCta: 'Book Airport Transfer',
    targetAudience: 'Travelers arriving in Jeddah, Madinah, Dubai, Istanbul, and European capitals'
  },
  {
    url: '/honeymoon-packages',
    title: 'Romantic Honeymoon Escapes & Private Villas',
    category: 'Couples Travel',
    status: 'Live & Active',
    primaryCta: 'Request Custom Honeymoon Itinerary',
    targetAudience: 'Newlywed couples seeking luxury Maldives, Bali, Switzerland, and Turkey trips'
  },
  {
    url: '/scholarship-updates',
    title: 'Verified International Scholarship Radar for Pakistani Students',
    category: 'Education Intelligence',
    status: 'Recommended to Create',
    primaryCta: 'Search Verified Scholarships',
    targetAudience: 'Aspiring university students seeking funded studies in Europe & Asia'
  },
  {
    url: '/work-permit-updates',
    title: 'Official Bilateral Overseas Recruitment & Work Permit Updates',
    category: 'Manpower Intelligence',
    status: 'Recommended to Create',
    primaryCta: 'View Official Labor Decrees',
    targetAudience: 'Technical workers, engineers, and overseas employment agencies'
  },
  {
    url: '/contact',
    title: 'Contact SkyBridge Travel & Tourism — Lahore Office',
    category: 'Company Contact',
    status: 'Live & Active',
    primaryCta: 'Send Message / Open WhatsApp',
    targetAudience: 'Clients seeking in-person office visits or instant phone consultation'
  }
];

// ============================================================================
// 4. SOCIAL MEDIA GROWTH CENTER (Section 9)
// ============================================================================
export const INITIAL_SOCIAL_MEDIA_POSTS: SocialMediaPostItem[] = [
  {
    id: 'SMP-2026-001',
    platform: 'TikTok',
    postType: 'Reel / Short Script',
    campaignName: 'Consular Fact-Check Series #1',
    topic: '3 Biggest Mistakes Pakistani Travelers Make on Schengen Visa Applications',
    captionOrScript: `[Hook - 0-3 sec]:
"Stop making these 3 mistakes that get your Schengen visa rejected in 2026!"

[Point 1 - 3-15 sec]:
"Mistake #1: Depositing sudden huge cash into your bank account 1 week before applying. Embassies check continuous 6-month source of funds, not sudden unexplained deposits."

[Point 2 - 15-30 sec]:
"Mistake #2: Submitting fake or unpaid hotel reservations from sketchy websites. Consular officers verify PNR codes directly with hotels."

[Point 3 - 30-45 sec]:
"Mistake #3: Picking the wrong embassy just because you heard appointments are faster there. You MUST apply to the country where you spend the most nights!"

[CTA - 45-60 sec]:
"Need an accurate, certified document check before your embassy appointment? Tap the WhatsApp button in our bio to consult Director Urwa Ali's team at SkyBridge Travel Lahore!"`,
    hashtags: ['#SchengenVisa', '#TravelTipsLahore', '#SkyBridgeTravel', '#GermanVisaPakistan', '#VisaConsultant'],
    callToAction: 'Tap link in bio to book 1-on-1 dossier review',
    mediaNote: 'Record in clean office environment with document checklist graphic overlay',
    targetAudience: 'Young professionals, business executives, and family travelers in Pakistan',
    plannedDate: '2026-10-12',
    contentStatus: 'Approved',
    ceoApprovedBy: 'Director Urwa Ali',
    ceoApprovalDate: '2026-10-09',
    createdAt: '2026-10-08T10:00:00Z'
  },
  {
    id: 'SMP-2026-002',
    platform: 'Instagram',
    postType: 'Standard Post',
    campaignName: 'Winter Umrah 2026 Spotlight',
    topic: 'Front Courtyard Haram Luxury Umrah — 15 Days Complete Itinerary',
    captionOrScript: `Your spiritual journey deserves total peace of mind. 🕋✨

SkyBridge Travel & Tourism presents our Winter 2026 VIP Umrah Package from Lahore:
✈️ Direct Flights (PIA / Saudia / Airblue)
🏨 5-Star Makkah Clock Tower Hotel (Just steps from courtyard)
🏨 5-Star Central Markazia Madinah Hotel
🚐 Private Air-Conditioned GMC Family Transfers
📑 Complete Electronic Tasheer Visa & Insurance Included

📍 Visit our Lahore Office: Gulshan Street, Nadeem Town, Multan Road, Lahore
📞 Call/WhatsApp: +92 345 4444167 / +92 324 4444167`,
    hashtags: ['#Umrah2026', '#SkyBridgeUmrah', '#MakkahClockTower', '#LahorePilgrims', '#LuxuryUmrahPackage'],
    callToAction: 'Send a Direct Message or message us on WhatsApp for pricing and available flight dates',
    mediaNote: 'Carousel: Slide 1 Makkah Haram high-res photo, Slide 2 Deluxe room view, Slide 3 Itinerary table',
    targetAudience: 'Families, married couples, and community pilgrims seeking reliable high-grade service',
    plannedDate: '2026-10-14',
    contentStatus: 'Approved',
    ceoApprovedBy: 'Director Urwa Ali',
    ceoApprovalDate: '2026-10-09',
    createdAt: '2026-10-08T11:00:00Z'
  },
  {
    id: 'SMP-2026-003',
    platform: 'LinkedIn',
    postType: 'B2B Article',
    campaignName: 'Corporate Mobility & Overseas Workforce',
    topic: 'Navigating Bilateral Labor Treaties: Greece Law 5038/2023 & Italian Decreto Flussi',
    captionOrScript: `As international migration law shifts towards formal bilateral state-to-state frameworks, enterprise employers in Southern Europe and the Gulf are re-evaluating recruitment channels.

The recent implementation of bilateral mobility agreements offers legitimate pathways for skilled technicians, agricultural specialists, and construction professionals from Pakistan. However, procedural rigor is paramount:
1. Candidate credentials must align strictly with NAVTTC and technical board attestations.
2. Employer quotas must be validated through official prefectural ministries (Prefettura / Ministry of Migration).
3. Consular legalization requires impeccable apostille and background clearance.

At SkyBridge Travel & Tourism, our corporate intelligence desk assists contracting firms and workforce agencies with seamless consular logistics and authorized travel facilitation.

We invite procurement and HR directors to connect directly for institutional collaboration.`,
    hashtags: ['#B2BTravel', '#CorporateMobility', '#OverseasManpower', '#GlobalWorkforce', '#SkyBridgeExecutive'],
    callToAction: 'Inquire via official email: info@skybridgetravelandtourism.com',
    mediaNote: 'Professional editorial graphic featuring bilateral flags and European Union legislative seal',
    targetAudience: 'HR directors, overseas placement promoters, civil contractors, and corporate executives',
    plannedDate: '2026-10-16',
    contentStatus: 'CEO Review',
    createdAt: '2026-10-08T14:00:00Z'
  },
  {
    id: 'SMP-2026-004',
    platform: 'YouTube',
    postType: 'Video Script',
    campaignName: 'Scholarship Intelligence Educational Series',
    topic: 'How to Study in Italy Completely Free — Step-by-Step DSU Scholarship Guide',
    captionOrScript: `[Video Title]: Study in Italy for Free 2026/27 | DSU Regional Scholarship, Universitaly Portal & Visa Guide

[Outline]:
- Introduction (0:00 - 1:30): What is the DSU scholarship and why does it offer €7,000+ living stipend and 100% free tuition?
- Phase 1 (1:30 - 4:15): Finding English-taught programs on Universitaly portal without application fee.
- Phase 2 (4:15 - 7:30): Required family income documents for ISEE Parificato (FBR tax certificate, property registry).
- Phase 3 (7:30 - 10:45): Embassy visa appointment scheduling via Gerry's/VFS in Islamabad and Karachi.
- Phase 4 (10:45 - 12:30): SkyBridge academic desk support and degree attestation workflow.
- Outro & Free Checklist (12:30 - 13:30).`,
    hashtags: ['#StudyInItaly', '#DSUScholarship', '#ScholarshipsPakistan', '#StudyAbroad2026', '#SkyBridgeScholarships'],
    callToAction: 'Download the free Italian student visa checklist from the link in description',
    mediaNote: 'Full 16:9 4K video recorded with screen demonstrations of official university portals',
    targetAudience: 'Undergraduate and postgraduate students in Pakistan seeking funded higher education abroad',
    plannedDate: '2026-10-20',
    contentStatus: 'Draft',
    createdAt: '2026-10-09T09:00:00Z'
  },
  {
    id: 'SMP-2026-005',
    platform: 'Facebook',
    postType: 'Standard Post',
    campaignName: 'Azerbaijan & Turkey Autumn Gateway',
    topic: 'Baku & Istanbul 7-Day Visa & Holiday Packages',
    captionOrScript: `Autumn is the most magical time to visit Baku and Istanbul! 🍂🏰

Experience the historic streets of Sultanahmet, the futuristic architecture of Baku Boulevard, and rich culinary tours with all-inclusive SkyBridge vacation packages:
✅ ASAN Electronic Visa for Azerbaijan processed in 3 hours
✅ Direct Lahore-Baku & Lahore-Istanbul flights
✅ 4-Star boutique central hotels with daily buffet breakfast
✅ Guided city tours with English/Urdu speaking guides

Special corporate and couple rates available for October & November departures!

📍 SkyBridge Travel & Tourism, Lahore
📱 WhatsApp: +92 345 4444167`,
    hashtags: ['#BakuTour', '#IstanbulPackage', '#HolidayPackagesLahore', '#SkyBridgeHolidays', '#AzerbaijanVisa'],
    callToAction: 'Message us on Facebook or WhatsApp for the day-to-day PDF itinerary',
    mediaNote: 'Collage graphic featuring Flame Towers Baku and Blue Mosque Istanbul',
    targetAudience: 'Couples, young professionals, and family vacationers planning autumn breaks',
    plannedDate: '2026-10-13',
    contentStatus: 'Approved',
    ceoApprovedBy: 'Director Urwa Ali',
    ceoApprovalDate: '2026-10-09',
    createdAt: '2026-10-08T15:30:00Z'
  },
  {
    id: 'SMP-2026-006',
    platform: 'Pinterest',
    postType: 'Pin / Board',
    campaignName: 'Luxury Travel Inspiration Boards',
    topic: 'Top 10 Honeymoon Destinations for Couples from Pakistan (No Visa Hassle)',
    captionOrScript: `Planning your dream honeymoon? Explore our curated visual guide featuring overwater bungalows in Maldives, private infinity pool villas in Bali, romantic hot air balloons in Cappadocia, and scenic mountain chalets in Baku.

Full packing guides, halal dining tips, and itemized travel packages curated by SkyBridge Travel & Tourism.`,
    hashtags: ['#HoneymoonInspiration', '#MaldivesVillas', '#LuxuryTravel', '#TravelPakistan', '#SkyBridgeDestinations'],
    callToAction: 'Save this pin and click through to read our complete honeymoon packages guide',
    mediaNote: 'Vertical 2:3 high-aesthetic photo pin with elegant minimalist typography',
    targetAudience: 'Engaged couples and luxury vacationers looking for visual destination moodboards',
    plannedDate: '2026-10-17',
    contentStatus: 'Ready to Publish',
    createdAt: '2026-10-09T11:00:00Z'
  }
];

// ============================================================================
// 5. MARKETING CAMPAIGNS (Section 10)
// ============================================================================
export const INITIAL_MARKETING_CAMPAIGNS: MarketingCampaignRecord[] = [
  {
    id: 'CAMP-2026-001',
    campaignName: 'Winter 2026 Umrah High Season',
    campaignObjective: 'Generate qualified family and group Umrah package enquiries for Rabi-ul-Awwal & December departures',
    serviceCategory: 'Umrah Packages',
    targetAudience: 'Families, senior community members, and group organizers in Lahore and Punjab region',
    countryOrRegion: 'Pakistan (Lahore, Gujranwala, Faisalabad, Sialkot)',
    language: 'Urdu & English',
    offerTitle: '5-Star Clock Tower Makkah & Central Madinah 15-Day Luxury Family Umrah',
    offerDescription: 'All-inclusive package featuring direct flights, luxury 5-star hotel allotments steps from Haram courtyards, Tasheer e-visa, and private GMC transport.',
    validFromDate: '2026-10-01',
    validUntilDate: '2026-12-31',
    verifiedPrice: 285000,
    currency: 'PKR',
    termsAndConditions: 'Price per person on quad-sharing basis. Valid for confirmed bookings made 15 days prior to travel date. Subject to airline seat inventory.',
    landingPage: 'https://skybridgetravelandtourism.com/umrah-packages',
    campaignSource: 'Multi-Channel Verified Outreach',
    trackingParameters: 'utm_source=social&utm_medium=verified_post&utm_campaign=winter_umrah_2026',
    approvalStatus: 'Approved',
    channels: ['Website', 'Facebook', 'Instagram', 'WhatsApp Business'],
    results: {
      impressions: 48500,
      clicks: 1420,
      enquiries: 68,
      conversions: 14
    },
    notes: 'Approved by CEO. Strict compliance: WhatsApp outreach conducted strictly to consenting clients and voluntary inquiries. No bulk unsolicited broadcast.',
    createdAt: '2026-10-01T08:00:00Z',
    updatedAt: '2026-10-09T09:00:00Z'
  },
  {
    id: 'CAMP-2026-002',
    campaignName: 'Corporate Travel Management Launch 2026',
    campaignObjective: 'Acquire 10 corporate accounts from engineering, manufacturing, and IT exporters in Lahore Chamber of Commerce network',
    serviceCategory: 'Corporate Travel & B2B Ticketing',
    targetAudience: 'Managing Directors, Procurement Heads, and HR Directors of active export enterprises',
    countryOrRegion: 'Pakistan & UAE',
    language: 'English',
    offerTitle: 'Dedicated B2B Corporate Desk with Net Wholesaler Fares & 30-Day Invoicing Facility',
    offerDescription: 'Direct access to GDS net inventory, 24/7 emergency ticket re-issuance, dedicated senior travel account manager, and streamlined GST compliant reporting.',
    validFromDate: '2026-10-05',
    validUntilDate: '2026-11-30',
    verifiedPrice: 0,
    currency: 'PKR',
    termsAndConditions: 'Account opening subject to formal company verification and corporate credit agreement signed by Director Urwa Ali.',
    landingPage: 'https://skybridgetravelandtourism.com/corporate-travel',
    campaignSource: 'LinkedIn & Direct Corporate Presentation',
    trackingParameters: 'utm_source=linkedin&utm_medium=b2b_executive&utm_campaign=corporate_travel_2026',
    approvalStatus: 'Approved',
    channels: ['LinkedIn', 'Email', 'Website'],
    results: {
      impressions: 12400,
      clicks: 380,
      enquiries: 19,
      conversions: 5
    },
    notes: 'Direct B2B outreach strictly using lawful public corporate directories and verified chamber records. Signed corporate engagement cards provided.',
    createdAt: '2026-10-05T10:00:00Z',
    updatedAt: '2026-10-09T10:30:00Z'
  },
  {
    id: 'CAMP-2026-003',
    campaignName: 'Schengen 2026 Error-Free Application Support',
    campaignObjective: 'Attract high-intent visit visa applicants for UK, Schengen (Germany, Italy, France, Spain), and USA tourism',
    serviceCategory: 'Visa Documentation',
    targetAudience: 'Executives, business owners, and holidaymakers applying for European visas',
    countryOrRegion: 'Pakistan',
    language: 'Urdu & English',
    offerTitle: 'Professional Schengen Dossier Compilation & Official Appointment Fast-Tracking Guidance',
    offerDescription: 'Comprehensive consular dossier preparation: certified bank statement review, chamber recommendation letters, day-by-day travel plans, and embassy-approved insurance.',
    validFromDate: '2026-10-08',
    validUntilDate: '2026-12-15',
    verifiedPrice: 25000,
    currency: 'PKR',
    termsAndConditions: 'SkyBridge provides document preparation and advisory services only. Consular approval is at the sole statutory discretion of the embassy.',
    landingPage: 'https://skybridgetravelandtourism.com/visa-services',
    campaignSource: 'Educational Video Marketing & SEO',
    trackingParameters: 'utm_source=tiktok_insta&utm_medium=video_content&utm_campaign=schengen_docs_2026',
    approvalStatus: 'Approved',
    channels: ['Website', 'TikTok', 'Instagram', 'YouTube', 'Facebook'],
    results: {
      impressions: 62000,
      clicks: 2150,
      enquiries: 94,
      conversions: 28
    },
    notes: 'High compliance standards: Never promises guaranteed visa approval. All copy explicitly states that visa issuance is exclusively an embassy decision.',
    createdAt: '2026-10-08T09:00:00Z',
    updatedAt: '2026-10-09T11:00:00Z'
  }
];

// ============================================================================
// 6. 21 GOOGLE SHEETS OPERATIONAL TABS (Section 16)
// ============================================================================
export interface GoogleSheetTabSpec {
  tabName: string;
  description: string;
  recordCount: number;
  lastSyncStatus: 'Synced' | 'Pending Sync' | 'Ready for Export';
  requiredColumns: string[];
}

export const GOOGLE_SHEETS_OFFICIAL_21_TABS: GoogleSheetTabSpec[] = [
  {
    tabName: '1. VISA_DATA',
    description: 'Worldwide embassy visa regulations, consular fees, required documents, and processing times',
    recordCount: 29,
    lastSyncStatus: 'Synced',
    requiredColumns: ['ID', 'Country', 'Category', 'VisaFeePkr', 'ProcessingTime', 'OfficialPortal', 'LastVerifiedDate', 'Status']
  },
  {
    tabName: '2. MANPOWER_DATA',
    description: 'Bilateral overseas employment decrees, official labor quotas, verified employers, and work-permit schemes',
    recordCount: 18,
    lastSyncStatus: 'Synced',
    requiredColumns: ['ID', 'Country', 'Employer', 'Sector', 'Vacancies', 'SalaryRange', 'SponsorshipStatus', 'OfficialSourceUrl', 'Status']
  },
  {
    tabName: '3. SCHOLARSHIP_DATA',
    description: 'Government and university fully-funded scholarship opportunities verified for Pakistani students',
    recordCount: 22,
    lastSyncStatus: 'Synced',
    requiredColumns: ['ID', 'ScholarshipName', 'Country', 'University', 'Level', 'FundingCoverage', 'MonthlyStipend', 'Deadline', 'OfficialUrl', 'Status']
  },
  {
    tabName: '4. SUPPLIERS',
    description: 'Master B2B wholesale suppliers, contact directors, margin percentages, and commercial contracts',
    recordCount: 16,
    lastSyncStatus: 'Synced',
    requiredColumns: ['SupplierID', 'CompanyName', 'Category', 'Country', 'ContactPerson', 'OfficialEmail', 'CommissionMargin', 'PaymentTerms', 'Status']
  },
  {
    tabName: '5. FLIGHT_SUPPLIERS',
    description: 'GDS systems (Amadeus, Sabre, FlyNow, Travelport) and airline wholesale aggregators',
    recordCount: 8,
    lastSyncStatus: 'Synced',
    requiredColumns: ['SupplierID', 'SystemName', 'AirlinesCovered', 'APIStatus', 'TicketVoidWindow', 'CreditLimit', 'SupportHotline', 'Status']
  },
  {
    tabName: '6. UMRAH_SUPPLIERS',
    description: 'Saudi ground handling DMCs, Tasheer authorized visa partners, and Makkah/Madinah hotel allotments',
    recordCount: 6,
    lastSyncStatus: 'Synced',
    requiredColumns: ['SupplierID', 'DMCName', 'NusukLicense', 'MakkahAllotmentHotels', 'MadinahAllotmentHotels', 'TransportFleet', 'Status']
  },
  {
    tabName: '7. HOTEL_SUPPLIERS',
    description: 'Global hotel bedbanks (Hotelbeds, WebBeds, TBO Holidays, Agoda B2B) net rates',
    recordCount: 7,
    lastSyncStatus: 'Synced',
    requiredColumns: ['SupplierID', 'BedbankName', 'InventoryCount', 'Currency', 'CancellationTerms', 'PortalUrl', 'Status']
  },
  {
    tabName: '8. INSURANCE',
    description: 'Schengen & international travel insurance providers, embassy policy tables, and claim desks',
    recordCount: 4,
    lastSyncStatus: 'Synced',
    requiredColumns: ['SupplierID', 'InsuranceCompany', 'MaxCoverage', 'CovidCoverage', 'SchengenApproved', 'DailyRatePkr', 'Status']
  },
  {
    tabName: '9. CUSTOMERS',
    description: 'Comprehensive traveler customer master database with communication preferences and history',
    recordCount: 142,
    lastSyncStatus: 'Synced',
    requiredColumns: ['CustomerID', 'FullName', 'PhoneWhatsApp', 'Email', 'ResidenceCity', 'ServiceHistory', 'ConsentStatus', 'AssignedStaff', 'Status']
  },
  {
    tabName: '10. LEADS',
    description: 'Incoming customer enquiries from website, phone, and authorized marketing campaigns',
    recordCount: 38,
    lastSyncStatus: 'Synced',
    requiredColumns: ['LeadID', 'FullName', 'Phone', 'Email', 'ServiceRequested', 'Destination', 'EstimatedValue', 'SourceCampaign', 'LeadStatus']
  },
  {
    tabName: '11. SALES_OPPORTUNITIES',
    description: 'Qualified high-intent sales opportunities moving towards quotation and booking issuance',
    recordCount: 24,
    lastSyncStatus: 'Synced',
    requiredColumns: ['OpportunityID', 'CustomerName', 'Service', 'EstimatedRevenuePkr', 'ProbabilityPct', 'ExpectedCloseDate', 'AssignedStaff', 'Stage']
  },
  {
    tabName: '12. BOOKINGS',
    description: 'Confirmed airfare tickets, hotel vouchers, and Umrah bookings with supplier PNR records',
    recordCount: 65,
    lastSyncStatus: 'Synced',
    requiredColumns: ['BookingID', 'ClientName', 'PNRReference', 'Supplier', 'TravelDates', 'GrossAmountPkr', 'SupplierCostPkr', 'NetProfitPkr', 'BookingStatus']
  },
  {
    tabName: '13. PAYMENTS',
    description: 'Financial ledger, client receipts, supplier disbursements, and bank reconciliation',
    recordCount: 52,
    lastSyncStatus: 'Synced',
    requiredColumns: ['InvoiceID', 'CustomerName', 'TotalPkr', 'PaidAmountPkr', 'BalanceDuePkr', 'PaymentMethod', 'PaymentStatus', 'TransactionDate']
  },
  {
    tabName: '14. CAMPAIGN_TRACKING',
    description: 'Multi-channel promotional campaigns, tracking URLs, lead capture volume, and marketing ROI',
    recordCount: 9,
    lastSyncStatus: 'Synced',
    requiredColumns: ['CampaignID', 'Name', 'Objective', 'Channel', 'StartDate', 'EndDate', 'SpendPkr', 'LeadsGenerated', 'Conversions', 'Status']
  },
  {
    tabName: '15. WEBSITE_OFFERS',
    description: 'Curated and CEO-approved public offers displayed on skybridgetravelandtourism.com homepage and deals section',
    recordCount: 8,
    lastSyncStatus: 'Synced',
    requiredColumns: ['OfferID', 'Title', 'Destination', 'Duration', 'PricePkr', 'DiscountNote', 'ValidTill', 'ApprovedBy', 'Status']
  },
  {
    tabName: '16. SOCIAL_MEDIA_CALENDAR',
    description: 'Multi-platform social content scheduler, reels/TikTok scripts, and CEO approval log',
    recordCount: 18,
    lastSyncStatus: 'Synced',
    requiredColumns: ['ContentID', 'Platform', 'PlannedDate', 'Topic', 'ScriptCaption', 'Hashtags', 'CallToAction', 'ApprovalStatus', 'PublishedDate']
  },
  {
    tabName: '17. WEBSITE_CONTENT',
    description: 'SEO destination guides, article outlines, meta keywords, and publication schedule',
    recordCount: 14,
    lastSyncStatus: 'Synced',
    requiredColumns: ['ArticleID', 'Title', 'TargetUrl', 'MainKeyword', 'SearchIntent', 'TargetAudience', 'WordCount', 'Author', 'PublicationStatus']
  },
  {
    tabName: '18. BUSINESS_PARTNERS',
    description: 'Verified B2B travel agency partners, corporate accounts, chamber members, and overseas recruitment promoters',
    recordCount: 26,
    lastSyncStatus: 'Synced',
    requiredColumns: ['PartnerID', 'OrganizationName', 'Type', 'Country', 'ContactExecutive', 'OfficialEmail', 'Phone', 'PartnershipAgreement', 'Status']
  },
  {
    tabName: '19. INTEGRATION_STATUS',
    description: 'Live connection health monitor for Google Workspace, Firebase Cloud SQL, Meta, TikTok, and GDS APIs',
    recordCount: 12,
    lastSyncStatus: 'Synced',
    requiredColumns: ['IntegrationID', 'ServiceName', 'Category', 'ConnectionStatus', 'AuthType', 'LastSyncTimestamp', 'LastSyncError', 'RequiredAction']
  },
  {
    tabName: '20. ALERTS_AND_TASKS',
    description: 'Critical operations tasks, visa rule alerts, embassy appointments due, and follow-ups requiring CEO action',
    recordCount: 15,
    lastSyncStatus: 'Synced',
    requiredColumns: ['TaskID', 'Title', 'Priority', 'AssignedTo', 'DueDate', 'RelatedRecordID', 'ApprovalStatus', 'CompletionStatus']
  },
  {
    tabName: '21. AUDIT_LOG',
    description: 'Cryptographic immutable activity log tracking administrative access, lead status changes, and data syncs',
    recordCount: 84,
    lastSyncStatus: 'Synced',
    requiredColumns: ['LogID', 'Timestamp', 'User', 'Action', 'TargetEntity', 'TargetID', 'Details', 'IpSecurityContext']
  }
];
