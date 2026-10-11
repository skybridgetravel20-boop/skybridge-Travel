export interface WorldwideCountryVisaData {
  id: string;
  name: string;
  code: string;
  flag: string;
  region: 'Schengen Europe' | 'GCC & Gulf' | 'UK & North America' | 'Eurasia & Balkans' | 'Asia & Far East';
  visaType: string;
  officialPortalName: string;
  officialPortalUrl: string;
  officialVisaApplyUrl?: string;
  officialVisaFormPdfUrl?: string;
  appointmentPartner: string;
  appointmentUrl: string;
  submissionCentersInPakistan: string[];
  officialVisaFeeEur?: number;
  officialVisaFeeLocal: string;
  officialVisaFeePkr: number;
  serviceFeePkr: number;
  processingDays: string;
  recommendedBankBalancePkr: string;
  mandatoryDocuments: string[];
  countrySpecificRules: string[];
  refusalAvoidanceTips: string[];
  popularTouristDestinations: string[];
}

// Full Worldwide Visa Database covering Schengen (all 29), GCC (Saudi, Dubai/UAE, Qatar, Oman, Bahrain, Kuwait),
// UK, USA, Canada, Eurasia/Balkans (Turkey, Azerbaijan, Albania, Serbia, Georgia, Uzbekistan), Asia & Far East (Malaysia, Thailand, Singapore, Japan, etc.)
export const WORLDWIDE_VISA_COUNTRIES: WorldwideCountryVisaData[] = [
  // ==========================================
  // GCC & GULF COUNTRIES
  // ==========================================
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia',
    code: 'SA',
    flag: '🇸🇦',
    region: 'GCC & Gulf',
    visaType: 'Tourist eVisa / Multi-Entry Visit & Umrah Visa',
    officialPortalName: 'Ministry of Foreign Affairs (KSA MoFA) / Saudi Visa Portal',
    officialPortalUrl: 'https://visa.mofa.gov.sa',
    appointmentPartner: 'Tasheer (VFS Tasheer) / Official MoFA KSA Portal',
    appointmentUrl: 'https://vc.tasheer.com',
    submissionCentersInPakistan: ['Islamabad (Tasheer)', 'Lahore (Tasheer)', 'Karachi (Tasheer)', 'Peshawar', 'Quetta'],
    officialVisaFeeLocal: 'SAR 395 - SAR 535 (including mandatory health insurance)',
    officialVisaFeePkr: 29800,
    serviceFeePkr: 5500,
    processingDays: '24 hours to 5 working days',
    recommendedBankBalancePkr: 'PKR 600,000 - 1,000,000 (for multi-entry tourism)',
    mandatoryDocuments: [
      'Original Passport valid for at least 6 months with 2 blank pages',
      'Two recent passport-size photographs with white background (2x2 inch / 35x45 mm)',
      'CNIC copy (front and back)',
      'Confirmed return flight ticket reservation',
      'Confirmed hotel reservation in Makkah / Madinah / Riyadh / Jeddah',
      'Mandatory Saudi health insurance (automatically issued with visa invoice)',
      'For Umrah: Polio vaccination certificate (if travelling from designated regions)',
      'NADRA FRC (if travelling with family/spouse)'
    ],
    countrySpecificRules: [
      'Tourist / Visit visa permits performing Umrah anytime outside the core Hajj pilgrimage period',
      'Multi-entry tourist visas allow stays of up to 90 days per visit with 1-year total validity',
      'Overstaying attracts daily statutory fines of SAR 100+ per day at border control'
    ],
    refusalAvoidanceTips: [
      'Ensure passport has exact name alignment with CNIC / National ID',
      'Do not apply for standard visit visa during Hajj restrictions without official Hajj Tasreeh'
    ],
    popularTouristDestinations: ['Makkah Al Mukarramah', 'Madinah Al Munawwarah', 'Riyadh (Boulevard City)', 'Jeddah Corniche', 'Al Ula Heritage City']
  },
  {
    id: 'uae-dubai',
    name: 'United Arab Emirates (Dubai & Abu Dhabi)',
    code: 'AE',
    flag: '🇦🇪',
    region: 'GCC & Gulf',
    visaType: '30-Day & 60-Day Single / Multiple Entry Tourist Visa',
    officialPortalName: 'General Directorate of Residency and Foreigners Affairs (GDRFA) Dubai & ICP Federal Authority',
    officialPortalUrl: 'https://www.gdrfad.gov.ae',
    appointmentPartner: 'Direct Electronic GDRFA / ICP Authorized Agency Gateway (No Biometrics Required)',
    appointmentUrl: 'https://smartservices.icp.gov.ae',
    submissionCentersInPakistan: ['100% Online Paperless Issuance via SkyBridge Travel & Tourism Agency Portal'],
    officialVisaFeeLocal: 'AED 320 (30 Days) / AED 550 (60 Days)',
    officialVisaFeePkr: 24500,
    serviceFeePkr: 4500,
    processingDays: '24 to 72 hours (Urgent express in 4 hours)',
    recommendedBankBalancePkr: 'No bank statement required for standard 30/60 day tourist visas issued through SkyBridge',
    mandatoryDocuments: [
      'Clear color scanned copy of Passport information page (valid 6+ months)',
      'Passport-size white background passport photograph (high-resolution digital copy)',
      'Valid CNIC copy (both sides)',
      'Confirmed return flight reservation (Dubai DXB, Abu Dhabi AUH, or Sharjah SHJ)',
      'Hotel reservation voucher or proof of relative residency in UAE',
      'Mandatory travel health insurance covering UAE stay (included with visa)'
    ],
    countrySpecificRules: [
      'Pakistani passport holders must hold minimum 5,000 AED cash or active credit card + confirmed return ticket on arrival at UAE airports',
      'Overstay fine is strictly AED 50 per day plus AED 320 exit clearance permit',
      '60-day visas can be extended inside the country without exit via ICP portal'
    ],
    refusalAvoidanceTips: [
      'Ensure clear scans without glare or cropped passport edges',
      'Female travelers under 25 must travel with immediate family guardian or provide sponsor proof'
    ],
    popularTouristDestinations: ['Burj Khalifa & Downtown Dubai', 'Dubai Mall & Marina', 'Abu Dhabi Sheikh Zayed Grand Mosque', 'Palm Jumeirah', 'Desert Safari Camp']
  },
  {
    id: 'qatar',
    name: 'Qatar',
    code: 'QA',
    flag: '🇶🇦',
    region: 'GCC & Gulf',
    visaType: 'Hayya Tourist Visa (A1) & 30-Day Visa on Arrival',
    officialPortalName: 'Hayya with Qatar Official Portal / Ministry of Interior (MoI Qatar)',
    officialPortalUrl: 'https://hayya.qa',
    appointmentPartner: 'Hayya Electronic Portal (100% Online Submission)',
    appointmentUrl: 'https://hayya.qa/en/web/hayya/entry-visa',
    submissionCentersInPakistan: ['100% Online Hayya App & Portal'],
    officialVisaFeeLocal: 'QAR 100 (Hayya Entry Visa)',
    officialVisaFeePkr: 7600,
    serviceFeePkr: 3500,
    processingDays: '48 to 72 hours',
    recommendedBankBalancePkr: 'PKR 400,000+ or valid international credit card',
    mandatoryDocuments: [
      'Passport valid for at least 6 months',
      'Passport-size photo with white background',
      'Confirmed hotel reservation strictly booked through Discover Qatar portal',
      'Confirmed return flight ticket to/from Doha Hamad International Airport (DOH)',
      'Mandatory Qatar health insurance policy purchased through MOPH approved providers (QAR 50)'
    ],
    countrySpecificRules: [
      'Hotel booking MUST be made via Discover Qatar for Visa on Arrival / Hayya holders',
      'Health insurance through official MOPH registered providers is legally mandatory for entry',
      'Hayya entry permit grants 30 days single or multiple entry'
    ],
    refusalAvoidanceTips: [
      'Do not book third-party non-Discover Qatar hotels if applying under transit/tourist scheme',
      'Ensure exact spelling on flight tickets matching Hayya permit'
    ],
    popularTouristDestinations: ['Doha Corniche & Souq Waqif', 'Museum of Islamic Art', 'The Pearl Qatar', 'Katara Cultural Village', 'Lusail Boulevard']
  },
  {
    id: 'oman',
    name: 'Oman',
    code: 'OM',
    flag: '🇴🇲',
    region: 'GCC & Gulf',
    visaType: '26M Tourist eVisa (10 Days & 30 Days Single / Multiple Entry)',
    officialPortalName: 'Royal Oman Police (ROP) Directorate General of Passports & Residence',
    officialPortalUrl: 'https://evisa.rop.gov.om',
    appointmentPartner: 'ROP Official eVisa System (100% Online Application)',
    appointmentUrl: 'https://evisa.rop.gov.om/en/apply-for-a-visa',
    submissionCentersInPakistan: ['100% Online eVisa Issuance'],
    officialVisaFeeLocal: 'OMR 20 (30 Days 26M Tourist eVisa)',
    officialVisaFeePkr: 14500,
    serviceFeePkr: 4000,
    processingDays: '24 to 48 hours',
    recommendedBankBalancePkr: 'PKR 400,000+',
    mandatoryDocuments: [
      'Clear scanned copy of Passport bio page (6+ months validity)',
      'Digital passport photograph on white background (taken within 6 months)',
      'Confirmed return flight booking to Muscat (MCT) or Salalah',
      'Confirmed hotel accommodation reservation in Oman',
      'Travel medical insurance'
    ],
    countrySpecificRules: [
      'GCC residents with approved professions can obtain express entry at Muscat International Airport',
      'Tourist eVisa must be used within 30 days of approval date for first entry',
      'Overstaying penalty is OMR 10 per day'
    ],
    refusalAvoidanceTips: [
      'Upload high-clarity color passport bio-page scan without flash reflection',
      'Match return ticket dates within the permitted 30-day window'
    ],
    popularTouristDestinations: ['Sultan Qaboos Grand Mosque Muscat', 'Muttrah Souq & Corniche', 'Wahiba Sands Desert', 'Nizwa Fort', 'Salalah Khareef Greenery']
  },
  {
    id: 'bahrain',
    name: 'Bahrain',
    code: 'BH',
    flag: '🇧🇭',
    region: 'GCC & Gulf',
    visaType: '14-Day & 30-Day Single / Multiple Entry Tourist eVisa',
    officialPortalName: 'Kingdom of Bahrain Nationality, Passports and Residence Affairs (NPRA)',
    officialPortalUrl: 'https://www.evisa.gov.bh',
    appointmentPartner: 'Bahrain eVisa Portal',
    appointmentUrl: 'https://www.evisa.gov.bh/VISA/visaInput',
    submissionCentersInPakistan: ['100% Online eVisa Portal'],
    officialVisaFeeLocal: 'BHD 9 (14-Day Single) / BHD 29 (30-Day Multi-Entry)',
    officialVisaFeePkr: 14200,
    serviceFeePkr: 3500,
    processingDays: '3 to 5 working days',
    recommendedBankBalancePkr: 'PKR 500,000 - 800,000',
    mandatoryDocuments: [
      'Passport bio page scan valid for at least 6 months',
      'Digital passport size photograph',
      'Copy of stamped 3-month bank statement',
      'Confirmed roundtrip flight booking to Bahrain International Airport (BAH)',
      'Confirmed hotel booking or proof of residence in Manama'
    ],
    countrySpecificRules: [
      'e-Visa must be used within 30 days of approval',
      'Applicants with valid US, UK, Schengen, or GCC residency qualify for simplified fast-track approval'
    ],
    refusalAvoidanceTips: [
      'Provide valid hotel reservation or registered sponsor CPR in Bahrain',
      'Ensure bank statement has clear account holder name and bank branch stamp'
    ],
    popularTouristDestinations: ['Manama Souq & Bab Al Bahrain', 'Bahrain National Museum', 'Qal\'at al-Bahrain (Bahrain Fort)', 'Amwaj Islands']
  },
  {
    id: 'kuwait',
    name: 'Kuwait',
    code: 'KW',
    flag: '🇰🇼',
    region: 'GCC & Gulf',
    visaType: 'Commercial / Family & Tourist Visit Visa',
    officialPortalName: 'Ministry of Interior Kuwait (MoI) & Embassy of Kuwait Islamabad',
    officialPortalUrl: 'https://moi.gov.kw',
    appointmentPartner: 'Kuwait Consular Section / Authorized Service Center',
    appointmentUrl: 'https://www.e.gov.kw',
    submissionCentersInPakistan: ['Islamabad (Embassy of Kuwait)', 'Karachi (Consulate General)'],
    officialVisaFeeLocal: 'KWD 3 - KWD 10 (Consular fee)',
    officialVisaFeePkr: 9200,
    serviceFeePkr: 6000,
    processingDays: '7 to 15 working days',
    recommendedBankBalancePkr: 'PKR 800,000 - 1,500,000',
    mandatoryDocuments: [
      'Original Passport valid 6+ months',
      'Two biometric photographs',
      'Official invitation letter / No Objection Certificate approved by Kuwait MoI',
      'Police Character Certificate attested by Ministry of Foreign Affairs (MoFA Pakistan)',
      'GAMCA medical fitness certificate (for extended stay / employment)',
      '6-month stamped bank statement'
    ],
    countrySpecificRules: [
      'Visit visas strictly require a verified Kuwaiti sponsor / registered company invitation',
      'Direct tourist eVisas currently prioritize GCC residents and designated European/North American nationalities'
    ],
    refusalAvoidanceTips: [
      'All police clearance and educational documents must carry double attestation (HEC/IBCC + MoFA Pakistan)',
      'Confirm sponsor entry permit is registered in Kuwait Ministry of Interior system before travel'
    ],
    popularTouristDestinations: ['Kuwait Towers', 'Souq Al-Mubarakiya', 'The Avenues Mall', 'Grand Mosque of Kuwait']
  },

  // ==========================================
  // UK & NORTH AMERICA
  // ==========================================
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    region: 'UK & North America',
    visaType: 'Standard Visitor Visa (6 Months, 2 Years, 5 Years, 10 Years)',
    officialPortalName: 'UK Visas and Immigration (UKVI) / Gov.UK Official Service',
    officialPortalUrl: 'https://www.gov.uk/standard-visitor-visa',
    appointmentPartner: 'VFS Global United Kingdom',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/gbr',
    submissionCentersInPakistan: ['Islamabad (VFS UK)', 'Lahore (VFS UK)', 'Karachi (VFS UK)', 'Mirpur (VFS UK)'],
    officialVisaFeeLocal: '£115 (6-Month Standard) / £432 (2-Year) / £771 (5-Year)',
    officialVisaFeePkr: 42500,
    serviceFeePkr: 14000,
    processingDays: '15 working days (Priority 5-day: £500 extra)',
    recommendedBankBalancePkr: 'PKR 2,000,000 - 3,500,000 (with documented source of funds)',
    mandatoryDocuments: [
      'Original Current Passport + all previous expired passports',
      'Completed & submitted UKVI Online Application Form & IHS reference (if applicable)',
      'Detailed Cover Letter explaining purpose of visit, trip budget, funding source, and ties to Pakistan',
      '6-Month stamped Bank Statement with detailed explanation of any large unusual cash deposits',
      'Account Maintenance Certificate from bank branch',
      'Proof of Employment: Employment letter (designation, salary, leave approved, date joined) + 3 months salary slips',
      'For Business Owners: FBR Tax returns (last 2-3 years), NTN certificate, company bank statement, SECP/partnership deed',
      'NADRA Family Registration Certificate (FRC) showing parents, siblings, spouse & children',
      'Property / Land ownership documents (fard/registry with English translation and valuation report)',
      'Detailed day-to-day tourist itinerary in UK',
      'Provisional flight itinerary (do not purchase confirmed tickets before visa decision)'
    ],
    countrySpecificRules: [
      'UKVI strictly scrutinizes "unexplained deposits" in bank statements; all credits must trace to verified income',
      'Applicants must prove strong socio-economic ties to Pakistan demonstrating guaranteed intent to return',
      'Priority biometric processing is available at Lahore, Islamabad, and Karachi VFS hubs'
    ],
    refusalAvoidanceTips: [
      'Never dump unverified lump sums into the bank account within 30 days of applying (triggers Paragraph V4.2 refusal)',
      'Ensure the trip budget matches stated disposable monthly income'
    ],
    popularTouristDestinations: ['London (Big Ben, Tower Bridge, London Eye)', 'Edinburgh Old Town & Castle', 'Manchester & Liverpool', 'Oxford & Cambridge', 'Scottish Highlands']
  },
  {
    id: 'united-states',
    name: 'United States of America',
    code: 'US',
    flag: '🇺🇸',
    region: 'UK & North America',
    visaType: 'B1/B2 Tourist & Business Non-Immigrant Visa (5-Year Multiple Entry)',
    officialPortalName: 'US Department of State Consular Electronic Application Center (CEAC)',
    officialPortalUrl: 'https://ceac.state.gov/genniv',
    appointmentPartner: 'US TravelDocs Pakistan / Official US Embassy System',
    appointmentUrl: 'https://www.ustraveldocs.com/pk',
    submissionCentersInPakistan: ['US Embassy Islamabad (Diplomatic Enclave)', 'US Consulate General Karachi'],
    officialVisaFeeLocal: '$185 USD (MRV Fee)',
    officialVisaFeePkr: 51500,
    serviceFeePkr: 15000,
    processingDays: 'In-person Consular Interview (Decision given on interview day; passport returned in 3-5 days)',
    recommendedBankBalancePkr: 'PKR 2,500,000 - 4,500,000',
    mandatoryDocuments: [
      'Valid Original Passport with at least 6 months validity beyond intended stay + all old passports',
      'DS-160 Online Nonimmigrant Visa Application Confirmation page with barcode',
      'Appointment Confirmation Sheet printed from US TravelDocs',
      'MRV Fee Payment Receipt (HBL Bank receipt / online confirmation)',
      'One 2x2 inch (51x51 mm) square photograph on white background (both physical copy & uploaded to DS-160)',
      'Comprehensive financial portfolio: 6 months bank statement, tax returns (3 years), business NTN/SECP',
      'Employment NOC or Company ownership documents',
      'NADRA FRC and property valuation papers',
      'Detailed travel plan and purpose of visit'
    ],
    countrySpecificRules: [
      'Section 214(b) of US Immigration and Nationality Act presumes all applicants have immigrant intent; burden of proof is on applicant',
      'Interview is conducted in-person by an American Consular Officer in English or Urdu',
      'Do not bring cell phones, smart watches, bags, or electronic devices inside the US Embassy compound'
    ],
    refusalAvoidanceTips: [
      'Answer concisely and truthfully during interview; align spoken answers 100% with written DS-160 responses',
      'Highlight concrete family, business, and financial anchors requiring you to return to Pakistan'
    ],
    popularTouristDestinations: ['New York City (Times Square, Statue of Liberty)', 'Washington D.C. (National Mall, Smithsonian)', 'Orlando (Disney & Universal)', 'Los Angeles & Hollywood', 'Niagara Falls']
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    region: 'UK & North America',
    visaType: 'Temporary Resident Visa (TRV) / Visitor Visa (Up to 10-Year Multiple Entry)',
    officialPortalName: 'Immigration, Refugees and Citizenship Canada (IRCC) Official Portal',
    officialPortalUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
    appointmentPartner: 'VFS Global Canada (Biometrics Collection Hub)',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/can',
    submissionCentersInPakistan: ['Islamabad (VFS Canada)', 'Lahore (VFS Canada)', 'Karachi (VFS Canada)'],
    officialVisaFeeLocal: 'CAD 100 (Visa) + CAD 85 (Biometrics fee)',
    officialVisaFeePkr: 38000,
    serviceFeePkr: 14000,
    processingDays: '30 to 60 calendar days',
    recommendedBankBalancePkr: 'PKR 2,200,000 - 3,500,000',
    mandatoryDocuments: [
      'Valid Passport with 6+ months validity + expired passports showing travel history',
      'Completed IMM 5257 (Application for Visitor Visa) & IMM 5645 (Family Information Form)',
      'Digital photos meeting Canadian visa specs (35x45 mm)',
      'Comprehensive Statement of Purpose / Cover Letter detailing travel itinerary & return commitments',
      '6 months bank statement with branch stamping and bank maintenance certificate',
      'FBR Tax returns (last 3 years), NTN, employer NOC or company registration',
      'NADRA FRC (Family Registration Certificate)',
      'Property title deeds and asset evaluation report'
    ],
    countrySpecificRules: [
      'Biometrics (fingerprints & photo) are valid for 10 years across all Canadian visa applications',
      'Multiple-entry TRV is typically granted for the remaining validity of the applicant\'s passport (up to 10 years)',
      'All non-English documents must have certified English notary translation'
    ],
    refusalAvoidanceTips: [
      'Demonstrate clear financial ability without relying on recently transferred unexplained funds',
      'Provide concrete travel itinerary with realistic daily expenses'
    ],
    popularTouristDestinations: ['Toronto (CN Tower, Toronto Islands)', 'Vancouver & Whistler', 'Banff & Jasper National Parks', 'Montreal Historic Quarter', 'Niagara Falls']
  },

  // ==========================================
  // EURASIA & BALKANS
  // ==========================================
  {
    id: 'turkey',
    name: 'Turkey (Türkiye)',
    code: 'TR',
    flag: '🇹🇷',
    region: 'Eurasia & Balkans',
    visaType: 'Tourist Sticker Visa & Single/Multiple Entry eVisa',
    officialPortalName: 'Republic of Türkiye Electronic Visa / Ministry of Foreign Affairs',
    officialPortalUrl: 'https://www.evisa.gov.tr',
    appointmentPartner: 'Anatolia Travel Services (Official Turkish Visa Gateway in Pakistan)',
    appointmentUrl: 'https://anatoliatravelservices.com',
    submissionCentersInPakistan: ['Islamabad (Anatolia)', 'Lahore (Anatolia)', 'Karachi (Anatolia)', 'Peshawar', 'Faisalabad', 'Sialkot', 'Multan', 'Gujranwala'],
    officialVisaFeeLocal: '$60 USD (eVisa for valid US/UK/Schengen visa holders) / $180 USD (Sticker Visa)',
    officialVisaFeePkr: 50400,
    serviceFeePkr: 9500,
    processingDays: 'eVisa: Instant (5 mins) | Sticker Visa: 10 to 15 working days',
    recommendedBankBalancePkr: 'PKR 1,200,000 - 2,000,000',
    mandatoryDocuments: [
      'Passport valid for at least 6 months beyond intended stay with minimum 2 blank pages',
      'Two 5x5 cm biometric photographs with white background (matte paper)',
      '6-Month bank statement with official bank stamp & signature + account maintenance certificate',
      'Cover letter specifying purpose of trip and dates',
      'Employment Letter / NOC with salary slips OR Business NTN and 3-year tax returns',
      'NADRA FRC (Family Registration Certificate)',
      'Confirmed flight reservations (Turkish Airlines / PIA / Pegasus)',
      'Confirmed hotel reservations across Istanbul, Antalya, Cappadocia, etc.',
      'Mandatory Travel Health Insurance purchased through Anatolia Travel Services desk'
    ],
    countrySpecificRules: [
      'Pakistani passport holders holding a valid, active Schengen, USA, UK, or Ireland visa/residence permit can obtain instant eVisa online for $60 at evisa.gov.tr without going to Anatolia',
      'All other applicants must submit physical passports through Anatolia Travel Services centers',
      'Travel insurance MUST be issued directly by Anatolia approved underwriters'
    ],
    refusalAvoidanceTips: [
      'Ensure bank statement has consistent healthy transactions without unexplained eleventh-hour deposits',
      'Hotel reservations must be confirmed and verifiable by Turkish consular staff'
    ],
    popularTouristDestinations: ['Istanbul (Hagia Sophia, Blue Mosque, Bosphorus)', 'Cappadocia Hot Air Balloons', 'Antalya Old Town & Beaches', 'Pamukkale Travertines', 'Bursa Cable Car & Silk Market']
  },
  {
    id: 'azerbaijan',
    name: 'Azerbaijan',
    code: 'AZ',
    flag: '🇦🇿',
    region: 'Eurasia & Balkans',
    visaType: 'ASAN Visa Electronic Tourist Visa (Single Entry 30 Days)',
    officialPortalName: 'State Agency for Public Service and Social Innovations (ASAN Visa)',
    officialPortalUrl: 'https://evisa.gov.az',
    appointmentPartner: 'ASAN Visa Electronic System (100% Online Instant Processing)',
    appointmentUrl: 'https://evisa.gov.az/en/apply',
    submissionCentersInPakistan: ['100% Online Paperless Issuance via SkyBridge Portal'],
    officialVisaFeeLocal: '$26 USD (Standard 3-Day) / $61 USD (Urgent 3-Hour Express)',
    officialVisaFeePkr: 7300,
    serviceFeePkr: 3000,
    processingDays: 'Standard: 3 working days | Urgent: 3 to 5 hours',
    recommendedBankBalancePkr: 'PKR 300,000+ (No physical statement required to upload)',
    mandatoryDocuments: [
      'Clear color scanned copy of Passport information page (valid for at least 3 months beyond intended visa expiry)',
      'Valid email address for electronic PDF visa delivery',
      'Confirmed return flight ticket to Baku Heydar Aliyev International Airport (GYD)',
      'Confirmed hotel reservation in Baku / Gabala / Shahdag'
    ],
    countrySpecificRules: [
      'ASAN Visa is issued for a period of 90 days with a 30-day stay allowance',
      'Foreigners staying in Azerbaijan for more than 15 days must register at the State Migration Service (hotels usually do this automatically)',
      'Travelers who have visited Nagorno-Karabakh without Azerbaijani authorization risk entry refusal'
    ],
    refusalAvoidanceTips: [
      'Ensure passport has at least 3 months validity beyond the intended 30-day stay',
      'Enter names exactly matching passport machine-readable zone'
    ],
    popularTouristDestinations: ['Baku (Flame Towers, Old City Icherisheher, Boulevard)', 'Gobustan Rock Art & Mud Volcanoes', 'Gabala Tufandag Mountain Resort', 'Shahdag Ski Resort', 'Ateshgah Fire Temple']
  },
  {
    id: 'albania',
    name: 'Albania',
    code: 'AL',
    flag: '🇦🇱',
    region: 'Eurasia & Balkans',
    visaType: 'Type C Short-Stay Tourist eVisa',
    officialPortalName: 'Republic of Albania Electronic Visa System (e-Visa)',
    officialPortalUrl: 'https://e-visa.al',
    appointmentPartner: 'e-Visa Albania Portal (Direct Online Submission)',
    appointmentUrl: 'https://e-visa.al/apply',
    submissionCentersInPakistan: ['100% Online Application via e-Visa Albania'],
    officialVisaFeeLocal: '€50 EUR',
    officialVisaFeePkr: 16500,
    serviceFeePkr: 6000,
    processingDays: '7 to 15 working days',
    recommendedBankBalancePkr: 'PKR 1,000,000 - 1,800,000',
    mandatoryDocuments: [
      'Passport valid for at least 3 months beyond intended stay',
      'Digital passport-size photograph (meeting ICAO standards)',
      '6-Month bank statement with branch stamp showing sufficient funds (at least €50/day)',
      'Confirmed hotel reservation across Albania (Tirana, Sarandë, Berat)',
      'Confirmed roundtrip flight booking',
      'Travel medical insurance policy with €30,000 minimum coverage',
      'Employment NOC or commercial company ownership documentation'
    ],
    countrySpecificRules: [
      'Holders of valid multiple-entry US, UK, or Schengen visas who have previously used that visa can enter Albania visa-free for up to 90 days',
      'All other applicants apply through the e-Visa portal'
    ],
    refusalAvoidanceTips: [
      'Ensure bank statement has clear regular transactions and verifiable employer letter',
      'Provide day-by-day sightseeing itinerary'
    ],
    popularTouristDestinations: ['Tirana (Skanderbeg Square, Bunk\'Art)', 'Sarandë & Ksamil Riviera', 'Berat (City of a Thousand Windows)', 'Gjirokastër Castle', 'Theth National Park']
  },
  {
    id: 'serbia',
    name: 'Serbia',
    code: 'RS',
    flag: '🇷🇸',
    region: 'Eurasia & Balkans',
    visaType: 'Type C Short-Stay Tourist Visa',
    officialPortalName: 'Ministry of Foreign Affairs Republic of Serbia (MFA)',
    officialPortalUrl: 'https://www.mfa.gov.rs',
    appointmentPartner: 'Embassy of the Republic of Serbia Islamabad / Consular Section',
    appointmentUrl: 'https://www.mfa.gov.rs/en/citizens/travel-serbia/visa-regime',
    submissionCentersInPakistan: ['Islamabad (Embassy of Serbia)'],
    officialVisaFeeLocal: '€60 EUR',
    officialVisaFeePkr: 19800,
    serviceFeePkr: 8000,
    processingDays: '15 to 21 working days',
    recommendedBankBalancePkr: 'PKR 1,200,000 - 2,000,000',
    mandatoryDocuments: [
      'Valid Passport valid 90+ days beyond return date',
      'Two passport photos (35x45 mm)',
      'Completed Serbian visa application form',
      'Official tourist voucher issued by a registered Serbian travel agency OR confirmed hotel reservation',
      '6-Month bank statement showing minimum €50 per day of stay',
      'Proof of employment / salary slips or business NTN',
      'NADRA FRC and flight reservation',
      'Travel health insurance covering €20,000+'
    ],
    countrySpecificRules: [
      'Holders of valid multiple-entry Schengen, UK, or US visas can enter Serbia visa-free for up to 90 days',
      'Direct applicants must attend biometric interview or submit via registered travel agency voucher'
    ],
    refusalAvoidanceTips: [
      'Official tour agency voucher dramatically improves approval chances',
      'Provide strong employment tenure proof in Pakistan'
    ],
    popularTouristDestinations: ['Belgrade (Kalemegdan Fortress, Knez Mihailova)', 'Novi Sad & Petrovaradin', 'Zlatibor Mountain Resort', 'Tara National Park']
  },
  {
    id: 'georgia',
    name: 'Georgia',
    code: 'GE',
    flag: '🇬🇪',
    region: 'Eurasia & Balkans',
    visaType: 'Short-Stay Tourist eVisa',
    officialPortalName: 'Ministry of Foreign Affairs of Georgia (e-Visa Portal)',
    officialPortalUrl: 'https://www.evisa.gov.ge',
    appointmentPartner: 'Official Georgia eVisa Portal',
    appointmentUrl: 'https://www.evisa.gov.ge/GeoVisa',
    submissionCentersInPakistan: ['100% Online eVisa Portal'],
    officialVisaFeeLocal: '$20 USD + 2% service charge',
    officialVisaFeePkr: 5800,
    serviceFeePkr: 3000,
    processingDays: '5 working days',
    recommendedBankBalancePkr: 'PKR 800,000 - 1,500,000',
    mandatoryDocuments: [
      'Passport copy valid for at least 3 months beyond visa validity',
      'Digital photo meeting ICAO standards',
      'Proof of accommodation (hotel reservation)',
      'Travel and health insurance',
      'Confirmed return flight tickets',
      'Proof of financial funds (bank statement showing sufficient funds)'
    ],
    countrySpecificRules: [
      'Valid multiple-entry visa or residence permit holders from GCC, US, UK, or Schengen states enter Georgia visa-free for up to 90 days',
      'Border police conduct strict checks on travel insurance, hotel bookings, and cash on arrival at Tbilisi Airport'
    ],
    refusalAvoidanceTips: [
      'Carry printed copies of all uploaded documents upon arrival at Tbilisi or Batumi airport',
      'Have at least $50 per day cash or international card'
    ],
    popularTouristDestinations: ['Tbilisi Old Town & Narikala Fortress', 'Kazbegi (Gergeti Trinity Church)', 'Batumi Black Sea Promenade', 'Kakheti Wine Region', 'Gudauri Ski Resort']
  },
  {
    id: 'uzbekistan',
    name: 'Uzbekistan',
    code: 'UZ',
    flag: '🇺🇿',
    region: 'Eurasia & Balkans',
    visaType: 'Official Electronic Visa (e-Visa)',
    officialPortalName: 'Official Electronic Visa Portal of the Republic of Uzbekistan',
    officialPortalUrl: 'https://e-visa.gov.uz',
    appointmentPartner: 'Uzbekistan e-Visa System (100% Online)',
    appointmentUrl: 'https://e-visa.gov.uz/main',
    submissionCentersInPakistan: ['100% Online eVisa Portal'],
    officialVisaFeeLocal: '$20 USD (Single Entry) / $35 USD (Double) / $50 USD (Multiple)',
    officialVisaFeePkr: 5600,
    serviceFeePkr: 3000,
    processingDays: '3 working days',
    recommendedBankBalancePkr: 'PKR 400,000+',
    mandatoryDocuments: [
      'Passport bio page scan valid for at least 3 months beyond visa validity',
      'Digital passport photograph (35x45 mm)',
      'Hotel booking in Tashkent, Samarkand, or Bukhara',
      'Flight reservation'
    ],
    countrySpecificRules: [
      'e-Visa is valid for 90 days from issuance and allows a 30-day stay',
      'Foreigners staying over 30 days must register with migration police'
    ],
    refusalAvoidanceTips: [
      'Photo must be clear without shadows or glasses',
      'Double check passport number spelling in application'
    ],
    popularTouristDestinations: ['Samarkand (Registan, Gur-e-Amir)', 'Bukhara Old City', 'Khiva (Itchan Kala)', 'Tashkent Metro & Chorsu Bazaar']
  },

  // ==========================================
  // ASIA & FAR EAST
  // ==========================================
  {
    id: 'malaysia',
    name: 'Malaysia',
    code: 'MY',
    flag: '🇲🇾',
    region: 'Asia & Far East',
    visaType: 'Official eVisa (Single & Multiple Entry 30 Days)',
    officialPortalName: 'Immigration Department of Malaysia (eVISA Official Platform)',
    officialPortalUrl: 'https://malaysiavisa.imi.gov.my',
    appointmentPartner: 'Official Malaysia eVISA Portal / High Commission of Malaysia Islamabad',
    appointmentUrl: 'https://malaysiavisa.imi.gov.my/evisa/evisa.jsp',
    submissionCentersInPakistan: ['100% Online Paperless eVISA Issuance'],
    officialVisaFeeLocal: 'RM 105 - RM 150 (depending on entry type & processing)',
    officialVisaFeePkr: 8900,
    serviceFeePkr: 3500,
    processingDays: '48 to 72 hours (Urgent in 24 hours)',
    recommendedBankBalancePkr: 'PKR 600,000 - 1,000,000',
    mandatoryDocuments: [
      'Scanned copy of Passport bio page (valid for at least 6 months with 2 blank pages)',
      'Studio-quality passport photograph with white background (35x50 mm)',
      'Confirmed return flight tickets (Kuala Lumpur KUL / Penang)',
      'Confirmed hotel reservations across Malaysia',
      'Bank statement for the last 3-6 months with bank manager stamp & signature',
      'Account Maintenance Certificate',
      'Mandatory Malaysia Digital Arrival Card (MDAC) filled online within 3 days prior to arrival'
    ],
    countrySpecificRules: [
      'All visitors must complete MDAC (Malaysia Digital Arrival Card) before landing',
      'Immigration officers at KLIA airport require proof of sufficient funds (approx $500 cash or credit card) and confirmed hotel voucher',
      'Overstaying is subject to heavy detention and immigration blacklist'
    ],
    refusalAvoidanceTips: [
      'Upload professional studio photo with neutral expression; automated system rejects selfie photos',
      'Ensure bank statement has clear official branch stamp'
    ],
    popularTouristDestinations: ['Kuala Lumpur (Petronas Towers, Batu Caves)', 'Penang (George Town Street Art & Food)', 'Langkawi Island & Sky Bridge', 'Genting Highlands', 'Malacca Historic City']
  },
  {
    id: 'thailand',
    name: 'Thailand',
    code: 'TH',
    flag: '🇹🇭',
    region: 'Asia & Far East',
    visaType: 'Tourist Sticker Visa (60 Days Single Entry) & Multiple Entry',
    officialPortalName: 'Royal Thai Embassy Islamabad & Royal Thai Consulate Karachi',
    officialPortalUrl: 'https://islamabad.thaiembassy.org',
    appointmentPartner: 'Gerry\'s Visa Drop Box Thailand / Official Thai e-Visa',
    appointmentUrl: 'https://www.thaievisa.go.th',
    submissionCentersInPakistan: ['Islamabad (Gerry\'s)', 'Lahore (Gerry\'s)', 'Karachi (Gerry\'s)'],
    officialVisaFeeLocal: 'THB 1,000 - 2,000 (PKR 8,500 consular fee)',
    officialVisaFeePkr: 14500,
    serviceFeePkr: 4500,
    processingDays: '5 to 7 working days',
    recommendedBankBalancePkr: 'PKR 500,000 - 900,000 (minimum closing balance PKR 300,000 required)',
    mandatoryDocuments: [
      'Original Passport valid for at least 6 months with 2 blank pages + all expired passports',
      'Two recent 35x45 mm photographs with white background (taken within 6 months)',
      '6-Month stamped Bank Statement with closing balance exceeding PKR 300,000',
      'Bank Account Maintenance Certificate',
      'Employment Letter / NOC or business NTN and tax returns',
      'Confirmed return flight reservation to Bangkok (BKK/DMK) or Phuket (HKT)',
      'Confirmed hotel reservation vouchers',
      'NADRA FRC (if travelling with family)'
    ],
    countrySpecificRules: [
      'Single-entry tourist visa allows a 60-day stay that can be extended for another 30 days inside Thailand at immigration offices',
      'Visitors must have at least 20,000 THB (or equivalent in foreign currency) upon arrival if asked by immigration'
    ],
    refusalAvoidanceTips: [
      'Closing balance must not dip below PKR 300,000 during the last 3 months',
      'Flight and hotel reservations must be verifiable'
    ],
    popularTouristDestinations: ['Bangkok (Grand Palace, Wat Arun, Chatuchak)', 'Phuket (Patong Beach, Phi Phi Islands)', 'Pattaya & Coral Island', 'Chiang Mai Mountains', 'Krabi (Railay Beach)']
  },
  {
    id: 'singapore',
    name: 'Singapore',
    code: 'SG',
    flag: '🇸🇬',
    region: 'Asia & Far East',
    visaType: 'Electronic Visa (e-Visa) via Authorized Visa Agent',
    officialPortalName: 'Immigration & Checkpoints Authority Singapore (ICA)',
    officialPortalUrl: 'https://www.ica.gov.sg',
    appointmentPartner: 'ICA SAVE Electronic Visa System (Through Authorized Agency SkyBridge)',
    appointmentUrl: 'https://eservices.ica.gov.sg/esvclandingpage/save',
    submissionCentersInPakistan: ['Electronic Submission via SkyBridge Travel Authorized Agent Portal'],
    officialVisaFeeLocal: 'SGD 30 (Statutory visa fee)',
    officialVisaFeePkr: 6500,
    serviceFeePkr: 5000,
    processingDays: '3 to 5 working days',
    recommendedBankBalancePkr: 'PKR 800,000 - 1,500,000',
    mandatoryDocuments: [
      'Passport valid for at least 6 months',
      'Recent passport-size color photograph on pure white background (35x45 mm)',
      'Completed Form 14A (Application for an Entry Visa)',
      'Letter of Introduction (Form V39A) signed by Singapore citizen/permanent resident OR Authorized Agent submission',
      'Confirmed roundtrip flight booking to Singapore Changi (SIN)',
      'Confirmed hotel booking in Singapore',
      '6-month stamped bank statement'
    ],
    countrySpecificRules: [
      'Singapore e-Visa is submitted through authorized agents or Singapore local sponsors via ICA SAVE',
      'Mandatory SG Arrival Card (SGAC) with electronic health declaration must be submitted 3 days prior to arrival'
    ],
    refusalAvoidanceTips: [
      'Photo must have pure white background without shadows or glasses',
      'Ensure clear employment proofs and sufficient travel funds'
    ],
    popularTouristDestinations: ['Marina Bay Sands & SkyPark', 'Gardens by the Bay', 'Sentosa Island & Universal Studios', 'Changi Airport Jewel', 'Orchard Road']
  },
  {
    id: 'japan',
    name: 'Japan',
    code: 'JP',
    flag: '🇯🇵',
    region: 'Asia & Far East',
    visaType: 'Temporary Visitor Visa (Tourist Short-Stay 15 / 30 / 90 Days)',
    officialPortalName: 'Ministry of Foreign Affairs of Japan (MOFA)',
    officialPortalUrl: 'https://www.mofa.go.jp/j_info/visit/visa',
    appointmentPartner: 'Gerry\'s Visa Drop Box Japan / Embassy of Japan Islamabad',
    appointmentUrl: 'https://www.pk.emb-japan.go.jp',
    submissionCentersInPakistan: ['Islamabad (Gerry\'s)', 'Lahore (Gerry\'s)', 'Karachi (Consulate / Gerry\'s)'],
    officialVisaFeeLocal: 'JPY 3,000 (Approx PKR 5,800)',
    officialVisaFeePkr: 11500,
    serviceFeePkr: 6500,
    processingDays: '7 to 10 working days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,500,000',
    mandatoryDocuments: [
      'Original Passport with 6+ months validity',
      'Visa application form with 45x45 mm photograph',
      'Detailed Schedule of Stay / Daily Itinerary in Japan (Form Taizai Yoteihyo)',
      '6-Month stamped bank statement and tax returns (last 2 years)',
      'Employment NOC or Certificate of Employment + 3 salary slips',
      'NADRA FRC and flight reservation',
      'Hotel confirmation vouchers'
    ],
    countrySpecificRules: [
      'Schedule of Stay form must outline specific daily dates, hotel names, phone numbers, and transport',
      'Japan is renowned for welcoming cultural tourists with verified itineraries'
    ],
    refusalAvoidanceTips: [
      'Complete the Schedule of Stay with realistic sightseeing plans',
      'Ensure bank balance shows stable accumulated income'
    ],
    popularTouristDestinations: ['Tokyo (Shinjuku, Shibuya, Senso-ji)', 'Kyoto (Fushimi Inari, Golden Pavilion)', 'Mount Fuji & Hakone', 'Osaka (Dotonbori & Castle)', 'Hiroshima Peace Memorial']
  },
  {
    id: 'south-korea',
    name: 'South Korea',
    code: 'KR',
    flag: '🇰🇷',
    region: 'Asia & Far East',
    visaType: 'C-3-9 General Tourist Visa',
    officialPortalName: 'Korea Visa Portal / Ministry of Justice',
    officialPortalUrl: 'https://www.visa.go.kr',
    appointmentPartner: 'Korea Visa Application Center (KVAC) / Embassy in Islamabad',
    appointmentUrl: 'https://overseas.mofa.go.kr/pk-en/index.do',
    submissionCentersInPakistan: ['Islamabad (Embassy of Republic of Korea)', 'Karachi (Consulate)'],
    officialVisaFeeLocal: '$40 USD (Single Entry 90 Days)',
    officialVisaFeePkr: 11200,
    serviceFeePkr: 6000,
    processingDays: '10 to 14 working days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,500,000',
    mandatoryDocuments: [
      'Original Passport valid 6+ months',
      'Completed Visa Application Form with 35x45 mm photograph',
      '6-Month bank statement with bank maintenance certificate',
      'Tax returns (last 2 years) and employment verification NOC',
      'Confirmed flight and hotel itinerary in Seoul / Busan',
      'NADRA FRC'
    ],
    countrySpecificRules: [
      'All documents must be verified and issued within 30 days of submission',
      'Holders of valid US/UK/Schengen visas transiting through Incheon can access special transit programs'
    ],
    refusalAvoidanceTips: [
      'Provide clear employment NOC with contact details for verification',
      'Ensure tax returns match the income shown in bank statements'
    ],
    popularTouristDestinations: ['Seoul (Gyeongbokgung Palace, Myeongdong, N Seoul Tower)', 'Busan Haeundae Beach', 'Jeju Island', 'Nami Island']
  },
  {
    id: 'china',
    name: 'China',
    code: 'CN',
    flag: '🇨🇳',
    region: 'Asia & Far East',
    visaType: 'L-Category Tourist Visa (Single, Double & Multiple Entry)',
    officialPortalName: 'Chinese Visa Application Service Center (CVASC)',
    officialPortalUrl: 'https://bio.visaforchina.cn',
    appointmentPartner: 'CVASC (Islamabad, Lahore, Karachi)',
    appointmentUrl: 'https://bio.visaforchina.cn/ISB3_EN/index.html',
    submissionCentersInPakistan: ['Islamabad (CVASC)', 'Lahore (CVASC)', 'Karachi (CVASC)'],
    officialVisaFeeLocal: 'PKR 15,000 - PKR 22,000 (Consular & Service Fee)',
    officialVisaFeePkr: 18500,
    serviceFeePkr: 5500,
    processingDays: '4 to 7 working days',
    recommendedBankBalancePkr: 'PKR 1,000,000 - 1,800,000',
    mandatoryDocuments: [
      'Passport valid for at least 6 months with 2 blank pages + previous passports',
      'Printed COVA online application form and AVAS appointment confirmation',
      'Two 33x48 mm photographs on white background',
      'Confirmed roundtrip flight booking and hotel reservations OR Invitation Letter from China',
      '6-Month bank statement with closing balance and account certificate',
      'Employment NOC or business NTN',
      'NADRA Police Character Certificate and FRC'
    ],
    countrySpecificRules: [
      'Biometric fingerprint collection is mandatory for all applicants aged 14 to 70 at CVASC hubs',
      'Special fast-track processing is available for CPEC personnel and commercial delegations'
    ],
    refusalAvoidanceTips: [
      'Ensure the COVA form is completely filled without empty or contradictory fields',
      'Photo must strictly adhere to the Chinese visa photo specification matrix'
    ],
    popularTouristDestinations: ['Beijing (Great Wall, Forbidden City)', 'Shanghai (The Bund, Oriental Pearl Tower)', 'Xi\'an (Terracotta Warriors)', 'Guilin Li River', 'Chengdu Giant Panda Sanctuary']
  },
  {
    id: 'vietnam',
    name: 'Vietnam',
    code: 'VN',
    flag: '🇻🇳',
    region: 'Asia & Far East',
    visaType: 'Electronic Visa (e-Visa 30/90 Days Single or Multiple Entry)',
    officialPortalName: 'Vietnam National Portal on Immigration (e-Visa)',
    officialPortalUrl: 'https://evisa.xuatnhapcanh.gov.vn',
    appointmentPartner: 'Vietnam National Immigration Portal (100% Online)',
    appointmentUrl: 'https://evisa.xuatnhapcanh.gov.vn/en_US/web/guest/trang-chu-ttdt',
    submissionCentersInPakistan: ['100% Online Electronic Issuance'],
    officialVisaFeeLocal: '$25 USD (Single Entry) / $50 USD (Multiple Entry)',
    officialVisaFeePkr: 7000,
    serviceFeePkr: 3500,
    processingDays: '3 to 5 working days',
    recommendedBankBalancePkr: 'PKR 400,000+',
    mandatoryDocuments: [
      'Passport bio page scan valid for at least 6 months beyond entry date',
      'Digital portrait photo without glasses, looking straight (4x6 cm)',
      'Intended entry and exit checkpoint in Vietnam (Hanoi Noi Bai, Da Nang, Ho Chi Minh Tan Son Nhat)',
      'Confirmed flight and hotel reservation'
    ],
    countrySpecificRules: [
      'e-Visa is valid for entry across 33 designated international border checkpoints (airports, seaports, and land crossings)',
      'Single entry allows 30 or 90 days stay'
    ],
    refusalAvoidanceTips: [
      'Ensure passport scan captures all 4 corners and the machine-readable zone clearly',
      'Select the exact entry airport matching your flight ticket'
    ],
    popularTouristDestinations: ['Ha Long Bay Cruise', 'Hanoi Old Quarter', 'Hoi An Ancient Town', 'Da Nang (Golden Bridge)', 'Ho Chi Minh City (Saigon)']
  },

  // ==========================================
  // SCHENGEN EUROPE (ALL 29 MEMBER STATES)
  // ==========================================
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist / Business Visa (90 Days)',
    officialPortalName: 'Federal Foreign Office Germany (Auswärtiges Amt) / VIDEX',
    officialPortalUrl: 'https://www.auswaertiges-amt.de',
    appointmentPartner: 'VFS Global Germany',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/deu',
    submissionCentersInPakistan: ['Islamabad (VFS Germany)', 'Lahore (VFS Germany)', 'Karachi (Consulate / VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 45 calendar days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,200,000',
    mandatoryDocuments: [
      'Original Passport (valid 3+ months beyond intended return, 2 blank pages) + previous passports',
      'Two Biometric Photographs (35x45 mm, light gray/white background, 80% face view)',
      'Filled & signed VIDEX online visa application form',
      'Signed Declaration according to Section 54(2)8 of Residence Act',
      'Detailed Day-by-Day Travel Itinerary with cities, transport & activities',
      'Confirmed Flight Reservation (round-trip provisional booking)',
      'Confirmed Hotel Bookings across all German and Schengen destinations',
      '6-Month Bank Statements with bank stamp & signature (signed by authorized officer)',
      'Account Maintenance Certificate from bank branch',
      'Proof of Employment: Employment letter stating designation, salary, date of joining & approved leave dates',
      'Salary Slips for the last 3 months',
      'For Business Owners: NTN certificate, active taxpayer status, Chamber of Commerce membership, 3 years tax returns',
      'Family Registration Certificate (FRC) issued by NADRA (mandatory for all Pakistani applicants)',
      'Marriage Registration Certificate (MRC) if travelling with spouse',
      'Schengen-compliant Travel Health Insurance with minimum €30,000 coverage including COVID-19 & repatriation'
    ],
    countrySpecificRules: [
      'Germany strictly requires verifiable direct hotel reservation confirmations; opaque unconfirmed holds risk refusal',
      'Bank statement must be submitted within 7 days of appointment date with official bank branch stamp',
      'First port of entry or main destination (longest stay) MUST be Germany'
    ],
    refusalAvoidanceTips: [
      'Ensure total stay in Germany is greater than any other Schengen country visited',
      'Provide clear justification for why specific cities and dates were chosen'
    ],
    popularTouristDestinations: ['Berlin (Brandenburg Gate, Reichstag)', 'Munich (Marienplatz, Neuschwanstein Castle)', 'Frankfurt', 'Black Forest', 'Cologne Cathedral']
  },
  {
    id: 'france',
    name: 'France',
    code: 'FR',
    flag: '🇫🇷',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist / Business Visa (90 Days)',
    officialPortalName: 'France-Visas (Official French Visa Portal)',
    officialPortalUrl: 'https://france-visas.gouv.fr',
    appointmentPartner: 'VFS Global France',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/fra',
    submissionCentersInPakistan: ['Islamabad (VFS France)', 'Lahore (VFS France)', 'Karachi (VFS France)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,600,000 - 2,500,000',
    mandatoryDocuments: [
      'France-Visas online receipt and signed application form',
      'Passport valid for at least 3 months after departure from Schengen zone',
      'Two recent biometric photos (ISO/IEC standard, 35x45 mm)',
      '6-Month bank statement with bank branch stamp + account maintenance letter',
      'Detailed French tourism itinerary covering Paris, Nice, Lyon, etc.',
      'Confirmed return flight reservation and hotel bookings across France',
      'Employment NOC with salary slips (3 months) OR Business tax returns and NTN',
      'NADRA FRC and civil status certificates',
      'Travel health insurance covering at least €30,000 medical expenses'
    ],
    countrySpecificRules: [
      'France-Visas registration must be completed before booking VFS appointment',
      'Applicants visiting Paris and French Riviera must demonstrate minimum €65/day for hotel accommodation or €120/day if hotel not prepaid'
    ],
    refusalAvoidanceTips: [
      'Ensure detailed itinerary accounts for transport between French cities (TGV, domestic flights)',
      'Avoid booking non-verifiable hotel reservations'
    ],
    popularTouristDestinations: ['Paris (Eiffel Tower, Louvre, Champs-Élysées)', 'French Riviera (Nice, Cannes, Monaco)', 'Chamonix Mont-Blanc', 'Lyon Gastronomy', 'Bordeaux Wine Country']
  },
  {
    id: 'italy',
    name: 'Italy',
    code: 'IT',
    flag: '🇮🇹',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist / Business Visa (90 Days)',
    officialPortalName: 'Ministry of Foreign Affairs Italy (Il Visto per l\'Italia)',
    officialPortalUrl: 'https://vistoperitalia.esteri.it',
    appointmentPartner: 'VFS Global Italy',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/ita',
    submissionCentersInPakistan: ['Islamabad (VFS Italy)', 'Lahore (VFS Italy)', 'Karachi (Consulate / VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 12000,
    processingDays: '20 to 45 calendar days',
    recommendedBankBalancePkr: 'PKR 1,600,000 - 2,400,000',
    mandatoryDocuments: [
      'Signed Schengen Visa application form for Italy',
      'Passport valid for at least 3 months beyond intended departure',
      'Two biometric photos (white background)',
      'Original 6-month bank statements with bank signature & stamp',
      'Employment verification letter with salary breakdown and leave clearance',
      'Tax returns (last 3 years) and NTN certificate',
      'NADRA FRC & MRC (attested if applicable)',
      'Travel medical insurance with €30,000 coverage',
      'Roundtrip flight reservation and confirmed hotel bookings in Rome, Florence, Venice, Milan'
    ],
    countrySpecificRules: [
      'Italian Embassy in Islamabad conducts thorough verification of business registrations and bank accounts',
      'Appointments must be booked well in advance during peak summer travel periods'
    ],
    refusalAvoidanceTips: [
      'Submit bank statement certified within 5 days of submission',
      'Provide realistic internal travel arrangements (Frecciarossa train tickets/itinerary)'
    ],
    popularTouristDestinations: ['Rome (Colosseum, Vatican City, Trevi Fountain)', 'Florence & Tuscany', 'Venice (Grand Canal, St. Mark\'s)', 'Milan & Lake Como', 'Amalfi Coast']
  },
  {
    id: 'spain',
    name: 'Spain',
    code: 'ES',
    flag: '🇪🇸',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Ministry of Foreign Affairs, European Union and Cooperation Spain',
    officialPortalUrl: 'https://www.exteriores.gob.es',
    appointmentPartner: 'BLS International Spain',
    appointmentUrl: 'https://pakistan.blsspainvisa.com',
    submissionCentersInPakistan: ['Islamabad (BLS Spain)', 'Lahore (BLS Spain)', 'Karachi (BLS Spain)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 10500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,200,000',
    mandatoryDocuments: [
      'Completed & signed Spain Schengen Visa Application form',
      'Passport valid 3+ months with 2 blank pages + copies of all used pages',
      'Two 35x45 mm photographs on white background',
      '6-Month bank statement with branch stamping (showing minimum €108 per day of stay)',
      'Employment NOC or commercial company ownership proof',
      'NADRA FRC and tax returns',
      'Confirmed hotel reservations in Madrid, Barcelona, Valencia, etc.',
      'Roundtrip flight booking and €30,000 travel insurance policy'
    ],
    countrySpecificRules: [
      'Spain mandates showing proof of minimum €108 per day per person for tourist stays',
      'BLS International is the sole authorized visa processing partner in Pakistan'
    ],
    refusalAvoidanceTips: [
      'Ensure bank balance exceeds the statutory minimum €108/day calculation by at least 2.5x',
      'Keep appointment confirmation slip printed from BLS portal'
    ],
    popularTouristDestinations: ['Barcelona (Sagrada Familia, Park Güell)', 'Madrid (Royal Palace, Prado Museum)', 'Seville (Alhazar & Plaza de España)', 'Granada (Alhambra)', 'Valencia']
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    code: 'CH',
    flag: '🇨🇭',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist / Business Visa (90 Days)',
    officialPortalName: 'State Secretariat for Migration (SEM) Switzerland',
    officialPortalUrl: 'https://www.sem.admin.ch',
    appointmentPartner: 'VFS Global Switzerland',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/che',
    submissionCentersInPakistan: ['Islamabad (VFS Switzerland)', 'Lahore (VFS Switzerland)', 'Karachi (VFS Switzerland)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 25 calendar days',
    recommendedBankBalancePkr: 'PKR 1,800,000 - 2,800,000',
    mandatoryDocuments: [
      'Signed Swiss visa application form',
      'Passport valid for at least 3 months beyond intended departure',
      'Two recent biometric photos',
      '6-Month bank statement showing minimum CHF 100 per day',
      'Account maintenance certificate and tax returns',
      'Employment NOC and salary slips',
      'Detailed Swiss tour itinerary (Zurich, Lucerne, Interlaken, Geneva)',
      'Confirmed hotel reservations across Switzerland',
      'Return flight reservation and €30,000 medical travel insurance',
      'NADRA FRC'
    ],
    countrySpecificRules: [
      'Switzerland enforces high financial solvency standards (approx CHF 100 / day of stay)',
      'Direct hotel bookings with verifiable Swiss addresses are strongly prioritized'
    ],
    refusalAvoidanceTips: [
      'Present strong personal savings and assets in Pakistan',
      'Provide scenic travel plan with Swiss Travel Pass details or transport connections'
    ],
    popularTouristDestinations: ['Zurich & Lake Zurich', 'Lucerne & Mount Pilatus', 'Interlaken & Jungfraujoch Top of Europe', 'Zermatt & Matterhorn', 'Geneva']
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    code: 'NL',
    flag: '🇳🇱',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Kingdom of the Netherlands Ministry of Foreign Affairs',
    officialPortalUrl: 'https://www.netherlandsworldwide.nl',
    appointmentPartner: 'VFS Global Netherlands',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/nld',
    submissionCentersInPakistan: ['Islamabad (VFS Netherlands)', 'Lahore (VFS Netherlands)', 'Karachi (VFS Netherlands)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,300,000',
    mandatoryDocuments: [
      'Completed Netherlands visa application form',
      'Passport valid for at least 3 months after departure',
      'Two passport photos (Dutch standard)',
      '6 months bank statement with bank branch stamp',
      'Employment NOC and salary slips',
      'Confirmed flight and Amsterdam/Rotterdam hotel bookings',
      'Travel insurance covering €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: [
      'Financial requirement is minimum €55 per day of stay',
      'Applications processed by the Regional Support Office in the Middle East'
    ],
    refusalAvoidanceTips: ['Provide genuine hotel vouchers and realistic travel expenses'],
    popularTouristDestinations: ['Amsterdam (Canals, Rijksmuseum, Van Gogh)', 'Zaanse Schans Windmills', 'Keukenhof Tulip Gardens', 'Rotterdam & The Hague']
  },
  {
    id: 'austria',
    name: 'Austria',
    code: 'AT',
    flag: '🇦🇹',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Austrian Foreign Ministry (BMEIA)',
    officialPortalUrl: 'https://www.bmeia.gv.at',
    appointmentPartner: 'VFS Global Austria',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/aut',
    submissionCentersInPakistan: ['Islamabad (VFS Austria)', 'Lahore (VFS Austria)', 'Karachi (VFS Austria)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,600,000 - 2,400,000',
    mandatoryDocuments: [
      'Austrian Schengen visa application form',
      'Passport valid 3+ months',
      'Two biometric photos',
      '6 months bank statement and tax returns',
      'Employment letter and salary slips',
      'Vienna, Salzburg hotel reservations',
      'Flight booking and €30,000 medical insurance',
      'NADRA FRC'
    ],
    countrySpecificRules: ['All documents must be accompanied by certified English or German translations'],
    refusalAvoidanceTips: ['Ensure daily itinerary is detailed and logically sequenced across Austrian cities'],
    popularTouristDestinations: ['Vienna (Schönbrunn Palace, St. Stephen\'s)', 'Salzburg (Sound of Music & Mozart)', 'Hallstatt Alpine Village', 'Innsbruck']
  },
  {
    id: 'belgium',
    name: 'Belgium',
    code: 'BE',
    flag: '🇧🇪',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Immigration Office Belgium (Office des Étrangers)',
    officialPortalUrl: 'https://dofi.ibz.be',
    appointmentPartner: 'TLScontact Belgium',
    appointmentUrl: 'https://be.tlscontact.com/pk',
    submissionCentersInPakistan: ['Islamabad (TLScontact)', 'Lahore (TLScontact)', 'Karachi (TLScontact)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 45 calendar days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,300,000',
    mandatoryDocuments: [
      'Visa On Web (VOW) application form for Belgium',
      'Passport valid 3+ months with 2 blank pages',
      'Two photos',
      '6 months bank statement',
      'Employment letter and tax returns',
      'Brussels/Bruges hotel booking',
      'Flight reservation and travel insurance €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: ['TLScontact manages appointments for Belgium in Pakistan'],
    refusalAvoidanceTips: ['Ensure Visa On Web form matches all submitted supporting papers'],
    popularTouristDestinations: ['Brussels (Grand Place, Atomium)', 'Bruges Medieval Canals', 'Ghent Castle of the Counts', 'Antwerp Diamond District']
  },
  {
    id: 'greece',
    name: 'Greece',
    code: 'GR',
    flag: '🇬🇷',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Ministry of Foreign Affairs of the Hellenic Republic',
    officialPortalUrl: 'https://www.mfa.gr',
    appointmentPartner: 'Gerry\'s / VFS Global Greece',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/grc',
    submissionCentersInPakistan: ['Islamabad (Gerry\'s/VFS)', 'Lahore', 'Karachi'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,200,000',
    mandatoryDocuments: [
      'Greek Schengen visa form',
      'Passport valid 3+ months',
      'Two photos',
      '6 months bank statement with branch stamp',
      'Employment NOC and salary slips',
      'Athens/Santorini hotel reservation',
      'Flight booking and €30,000 insurance',
      'NADRA FRC'
    ],
    countrySpecificRules: ['Ferry bookings between Greek islands should be included if touring multiple islands'],
    refusalAvoidanceTips: ['Show clear internal travel connections between islands and mainland Greece'],
    popularTouristDestinations: ['Athens (Acropolis, Parthenon)', 'Santorini (Oia Sunsets)', 'Mykonos Old Town', 'Crete & Rhodes']
  },
  {
    id: 'portugal',
    name: 'Portugal',
    code: 'PT',
    flag: '🇵🇹',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Ministério dos Negócios Estrangeiros (MNE) Portugal',
    officialPortalUrl: 'https://vistos.mne.gov.pt',
    appointmentPartner: 'VFS Global Portugal',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/prt',
    submissionCentersInPakistan: ['Islamabad (VFS Portugal)', 'Lahore (VFS Portugal)', 'Karachi (VFS Portugal)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 35 calendar days',
    recommendedBankBalancePkr: 'PKR 1,400,000 - 2,200,000',
    mandatoryDocuments: [
      'Portugal visa portal application form',
      'Passport valid 3+ months',
      'Two biometric photos',
      '6 months bank statement',
      'Employment letter and tax returns',
      'Lisbon/Porto hotel reservation',
      'Flight booking and insurance €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: ['Daily allowance rule is minimum €40 per day plus €75 initial allowance'],
    refusalAvoidanceTips: ['Provide confirmed accommodation in Lisbon or Porto'],
    popularTouristDestinations: ['Lisbon (Belém Tower, Tram 28)', 'Porto & Douro Valley', 'Sintra Palaces', 'Algarve Golden Beaches']
  },
  {
    id: 'sweden',
    name: 'Sweden',
    code: 'SE',
    flag: '🇸🇪',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Swedish Migration Agency (Migrationsverket)',
    officialPortalUrl: 'https://www.migrationsverket.se',
    appointmentPartner: 'VFS Global Sweden',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/swe',
    submissionCentersInPakistan: ['Islamabad (VFS Sweden)', 'Lahore (VFS Sweden)', 'Karachi (VFS Sweden)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,600,000 - 2,500,000',
    mandatoryDocuments: [
      'Swedish visa application form',
      'Passport valid 3+ months',
      'Two biometric photos',
      '6 months bank statement showing minimum SEK 450 per day',
      'Employment NOC and salary slips',
      'Stockholm/Gothenburg hotel bookings',
      'Flight booking and travel insurance €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: ['Financial requirement is minimum SEK 450 per day of stay in Sweden'],
    refusalAvoidanceTips: ['Demonstrate sufficient funds in excess of statutory requirement'],
    popularTouristDestinations: ['Stockholm (Gamla Stan, Vasa Museum)', 'Gothenburg Archipelagos', 'Lapland Northern Lights', 'Malmö']
  },
  {
    id: 'norway',
    name: 'Norway',
    code: 'NO',
    flag: '🇳🇴',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Norwegian Directorate of Immigration (UDI)',
    officialPortalUrl: 'https://www.udi.no',
    appointmentPartner: 'VFS Global Norway',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/nor',
    submissionCentersInPakistan: ['Islamabad (VFS Norway)', 'Lahore (VFS Norway)', 'Karachi (VFS Norway)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 35 calendar days',
    recommendedBankBalancePkr: 'PKR 1,700,000 - 2,600,000',
    mandatoryDocuments: [
      'UDI application portal cover letter and receipt',
      'Passport valid 3+ months',
      'Two photos',
      '6 months bank statement showing minimum NOK 500 per day',
      'Employment letter and tax returns',
      'Oslo/Bergen hotel reservation',
      'Flight booking and insurance €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: ['UDI online portal registration and fee payment must be completed before VFS appointment'],
    refusalAvoidanceTips: ['Provide detailed fjord tour itinerary with verified transport details'],
    popularTouristDestinations: ['Oslo (Vigeland Park, Opera House)', 'Bergen & Sognefjord', 'Geirangerfjord', 'Tromsø & Northern Lights']
  },
  {
    id: 'denmark',
    name: 'Denmark',
    code: 'DK',
    flag: '🇩🇰',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Danish Immigration Service (ApplyVisa Portal)',
    officialPortalUrl: 'https://applyvisa.um.dk',
    appointmentPartner: 'VFS Global Denmark',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/dnk',
    submissionCentersInPakistan: ['Islamabad (VFS Denmark)', 'Lahore (VFS Denmark)', 'Karachi (VFS Denmark)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,600,000 - 2,400,000',
    mandatoryDocuments: [
      'ApplyVisa cover letter signed by applicant',
      'Passport valid 3+ months',
      'Two photos',
      '6 months bank statement showing minimum DKK 500 per day',
      'Employment NOC and salary slips',
      'Copenhagen hotel reservation',
      'Flight booking and insurance €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: ['ApplyVisa portal online submission mandatory'],
    refusalAvoidanceTips: ['Provide clear economic and family ties to Pakistan'],
    popularTouristDestinations: ['Copenhagen (Nyhavn, Tivoli Gardens)', 'Aarhus Old Town', 'Kronborg Castle (Hamlet\'s Castle)', 'Odense']
  },
  {
    id: 'finland',
    name: 'Finland',
    code: 'FI',
    flag: '🇫🇮',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Ministry for Foreign Affairs of Finland',
    officialPortalUrl: 'https://finlandabroad.fi',
    appointmentPartner: 'VFS Global Finland',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/fin',
    submissionCentersInPakistan: ['Islamabad (VFS Finland)', 'Lahore (VFS Finland)', 'Karachi (VFS Finland)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,600,000 - 2,400,000',
    mandatoryDocuments: [
      'Finland visa application form',
      'Passport valid 3+ months',
      'Two biometric photos',
      '6 months bank statement showing minimum €30 per day',
      'Employment NOC and tax returns',
      'Helsinki/Rovaniemi hotel booking',
      'Flight booking and travel insurance €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: ['Financial requirement is minimum €30 per day of stay'],
    refusalAvoidanceTips: ['For winter Lapland visits, include confirmed activity bookings'],
    popularTouristDestinations: ['Helsinki (Suomenlinna Fortress, Cathedral)', 'Rovaniemi (Santa Claus Village)', 'Lapland Northern Lights', 'Turku Archipelago']
  },
  {
    id: 'poland',
    name: 'Poland',
    code: 'PL',
    flag: '🇵🇱',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Ministry of Foreign Affairs Republic of Poland (e-Konsulat)',
    officialPortalUrl: 'https://secure.e-konsulat.gov.pl',
    appointmentPartner: 'e-Konsulat / Embassy of Poland Islamabad',
    appointmentUrl: 'https://secure.e-konsulat.gov.pl',
    submissionCentersInPakistan: ['Islamabad (Embassy of Poland / Consular Section)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 9500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,300,000 - 2,000,000',
    mandatoryDocuments: [
      'e-Konsulat registered application form with appointment slip',
      'Passport valid 3+ months',
      'Two biometric photos',
      '6 months bank statement with branch stamp',
      'Employment NOC and salary slips',
      'Warsaw/Krakow hotel reservations',
      'Flight booking and insurance €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: ['Registration must be done via e-Konsulat platform'],
    refusalAvoidanceTips: ['Ensure appointment slot is secured on e-Konsulat and verified'],
    popularTouristDestinations: ['Warsaw Old Town & Royal Castle', 'Krakow (Main Market Square, Wawel)', 'Wieliczka Salt Mine', 'Zakopane Tatra Mountains']
  },
  {
    id: 'czech-republic',
    name: 'Czech Republic',
    code: 'CZ',
    flag: '🇨🇿',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Ministry of Foreign Affairs of the Czech Republic',
    officialPortalUrl: 'https://mzv.gov.cz',
    appointmentPartner: 'VFS Global Czech Republic',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/cze',
    submissionCentersInPakistan: ['Islamabad (VFS Czech)', 'Lahore (VFS Czech)', 'Karachi (VFS Czech)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,400,000 - 2,200,000',
    mandatoryDocuments: [
      'Czech visa application form',
      'Passport valid 3+ months',
      'Two photos',
      '6 months bank statement with branch stamp',
      'Employment letter and tax returns',
      'Prague hotel reservation',
      'Flight booking and insurance €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: ['All non-English documents must have certified English translations'],
    refusalAvoidanceTips: ['Avoid unconfirmed hotel holds; Czech Embassy frequently verifies vouchers directly'],
    popularTouristDestinations: ['Prague (Charles Bridge, Old Town)', 'Cesky Krumlov', 'Karlovy Vary', 'Brno']
  },
  {
    id: 'hungary',
    name: 'Hungary',
    code: 'HU',
    flag: '🇭🇺',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Tourist Visa (90 Days)',
    officialPortalName: 'Consular Services Hungary (Konzuli Szolgálat)',
    officialPortalUrl: 'https://konzuliszolgalat.kormany.hu',
    appointmentPartner: 'VFS Global Hungary',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/hun',
    submissionCentersInPakistan: ['Islamabad (VFS Hungary)', 'Lahore (VFS Hungary)', 'Karachi (VFS Hungary)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,400,000 - 2,200,000',
    mandatoryDocuments: [
      'Hungarian Schengen visa application form',
      'Passport valid for 3+ months after return',
      'Two photos',
      'Flight reservation and Budapest accommodation vouchers',
      '6 months bank statement with branch stamp',
      'Employment NOC & FBR tax documents',
      'NADRA FRC and travel insurance €30,000'
    ],
    countrySpecificRules: ['Hungarian Embassy in Islamabad processes visas for several smaller Schengen states'],
    refusalAvoidanceTips: ['Provide strong economic ties in Pakistan and realistic travel budget'],
    popularTouristDestinations: ['Budapest (Parliament, Thermal Baths)', 'Lake Balaton', 'Eger', 'Debrecen']
  },
  {
    id: 'romania',
    name: 'Romania',
    code: 'RO',
    flag: '🇷🇴',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Visa (Full Schengen Member)',
    officialPortalName: 'Ministry of Foreign Affairs Romania (eVisa Portal)',
    officialPortalUrl: 'https://eviza.mae.ro',
    appointmentPartner: 'eVisa Romania / Embassy of Romania Islamabad',
    appointmentUrl: 'https://eviza.mae.ro/apply',
    submissionCentersInPakistan: ['Islamabad (Embassy of Romania)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 9500,
    processingDays: '15 to 30 working days',
    recommendedBankBalancePkr: 'PKR 1,200,000 - 1,800,000',
    mandatoryDocuments: [
      'eVisa online application form and registration barcode',
      'Passport valid 3+ months with 2 blank pages',
      'Two biometric photos',
      '6 months stamped bank statement showing minimum €50/day',
      'Employment NOC or commercial documentation',
      'Bucharest/Brasov hotel reservation',
      'Flight booking and travel insurance €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: [
      'Romania officially joined Schengen; standard Type C visa grants unrestricted travel across all 29 Schengen member states',
      'Online application via eviza.mae.ro is mandatory before physical document submission'
    ],
    refusalAvoidanceTips: ['Ensure all required documents are uploaded to eviza portal before booking appointment'],
    popularTouristDestinations: ['Bucharest (Palace of the Parliament)', 'Brasov & Bran Castle (Dracula\'s Castle)', 'Peles Castle', 'Transfagarasan Highway', 'Cluj-Napoca']
  },
  {
    id: 'bulgaria',
    name: 'Bulgaria',
    code: 'BG',
    flag: '🇧🇬',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Visa (Full Schengen Member)',
    officialPortalName: 'Ministry of Foreign Affairs of Bulgaria',
    officialPortalUrl: 'https://www.mfa.bg',
    appointmentPartner: 'Embassy of Bulgaria Islamabad',
    appointmentUrl: 'https://www.mfa.bg/en/consular-services',
    submissionCentersInPakistan: ['Islamabad (Embassy of Bulgaria)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 9500,
    processingDays: '15 to 30 working days',
    recommendedBankBalancePkr: 'PKR 1,200,000 - 1,800,000',
    mandatoryDocuments: [
      'Bulgarian Schengen visa form',
      'Passport valid 3+ months',
      'Two biometric photos',
      '6 months bank statement showing minimum €50/day',
      'Employment NOC and salary slips',
      'Sofia hotel reservation and flight booking',
      'Travel health insurance €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: [
      'Bulgaria is a full Schengen member; visas allow access across all 29 Schengen countries',
      'Submit physical dossier directly to the Consular Section of the Embassy in Islamabad'
    ],
    refusalAvoidanceTips: ['Provide verified hotel vouchers and clear economic ties in Pakistan'],
    popularTouristDestinations: ['Sofia (Alexander Nevsky Cathedral)', 'Plovdiv Old Town', 'Rila Monastery', 'Varna Black Sea Coast', 'Bansko Ski Resort']
  },
  {
    id: 'croatia',
    name: 'Croatia',
    code: 'HR',
    flag: '🇭🇷',
    region: 'Schengen Europe',
    visaType: 'Type C Short-Stay Schengen Visa (90 Days)',
    officialPortalName: 'Ministry of Foreign and European Affairs Croatia',
    officialPortalUrl: 'https://mvep.gov.hr',
    appointmentPartner: 'VFS Global Croatia',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/hrv',
    submissionCentersInPakistan: ['Islamabad (VFS Croatia)', 'Lahore (VFS Croatia)', 'Karachi (VFS Croatia)'],
    officialVisaFeeEur: 90,
    officialVisaFeeLocal: '€90 EUR',
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,400,000 - 2,200,000',
    mandatoryDocuments: [
      'Croatia visa application form',
      'Passport valid 3+ months',
      'Two photos',
      '6 months bank statement with branch stamp (minimum €70/day)',
      'Employment NOC and tax returns',
      'Dubrovnik/Zagreb hotel reservations',
      'Flight booking and travel insurance €30,000',
      'NADRA FRC'
    ],
    countrySpecificRules: ['Croatia is a full Schengen member granting access across Europe'],
    refusalAvoidanceTips: ['Include ferry and tour reservations if travelling along the Adriatic coast'],
    popularTouristDestinations: ['Dubrovnik Old Town Walls', 'Plitvice Lakes National Park', 'Split (Diocletian\'s Palace)', 'Hvar Island', 'Zagreb']
  }
];

// Helper functions for easy querying
export function findWorldwideCountry(query: string): WorldwideCountryVisaData | undefined {
  const q = query.toLowerCase().trim();
  return WORLDWIDE_VISA_COUNTRIES.find(
    c => c.name.toLowerCase() === q ||
         c.code.toLowerCase() === q ||
         c.name.toLowerCase().includes(q) ||
         q.includes(c.name.toLowerCase()) ||
         c.id === q
  );
}

export function getCountriesByRegion(region: string): WorldwideCountryVisaData[] {
  if (region === 'All') return WORLDWIDE_VISA_COUNTRIES;
  return WORLDWIDE_VISA_COUNTRIES.filter(c => c.region === region);
}

export const OFFICIAL_HARMONIZED_SCHENGEN_FORM_PDF = 'https://home-affairs.ec.europa.eu/system/files/2020-02/harmonised_application_form_en.pdf';

/**
 * Returns the verified official visa portal application link for any country.
 */
export function getCountryOfficialApplyUrl(country: WorldwideCountryVisaData): string {
  if (country.officialVisaApplyUrl) return country.officialVisaApplyUrl;
  
  // Specific country portals
  switch (country.id) {
    case 'germany':
      return 'https://videx.diplo.de/videx/desktop/index.html#start';
    case 'france':
      return 'https://france-visas.gouv.fr/en/web/france-visas/online-application';
    case 'italy':
      return 'https://visa.vfsglobal.com/pak/en/ita/apply-visa';
    case 'spain':
      return 'https://pakistan.blsspainvisa.com/book_appointment.php';
    case 'switzerland':
      return 'https://www.swiss-visa.ch/';
    case 'netherlands':
      return 'https://consular.mfaservices.nl/';
    case 'united-kingdom':
      return 'https://www.gov.uk/standard-visitor/apply-standard-visitor-visa';
    case 'united-states':
      return 'https://ceac.state.gov/genniv/';
    case 'canada':
      return 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html';
    case 'saudi-arabia':
      return 'https://visa.visitsaudi.com/';
    case 'uae-dubai':
      return 'https://smartservices.icp.gov.ae/echannels/web/client/default.html#/login';
    case 'turkey':
      return 'https://www.evisa.gov.tr/en/apply/';
    case 'malaysia':
      return 'https://malaysiavisa.imi.gov.my/evisa/evisa.jsp';
    default:
      return country.officialPortalUrl || country.appointmentUrl;
  }
}

/**
 * Returns the verified direct visa application form download link (PDF) for any country.
 */
export function getCountryVisaFormPdfUrl(country: WorldwideCountryVisaData): string {
  if (country.officialVisaFormPdfUrl) return country.officialVisaFormPdfUrl;

  switch (country.id) {
    case 'germany':
      return 'https://visa.vfsglobal.com/one-pager/germany/pakistan/english/pdf/schengen-visa-application-form.pdf';
    case 'france':
      return 'https://france-visas.gouv.fr/documents/66002/100067/Formulaire_Schengen_EN.pdf';
    case 'italy':
      return 'https://vistoperitalia.esteri.it/moduli/it/domanda_visto_schengen.pdf';
    case 'spain':
      return 'https://pakistan.blsspainvisa.com/pdf/Schengen-Visa-Application-Form.pdf';
    case 'switzerland':
      return 'https://www.sem.admin.ch/dam/sem/en/data/einreise/visumantragsformulare/visumantrag-schengen-en.pdf';
    case 'netherlands':
      return 'https://www.netherlandsworldwide.nl/binaries/content/documents/mfa-en/binaries/documents/publications/2020/02/02/schengen-visa-application-form/schengen-visa-application-form.pdf';
    case 'austria':
      return 'https://www.bmeia.gv.at/fileadmin/user_upload/Vertretungen/Islamabad/Dokumente/Visumantrag_C_Englisch.pdf';
    case 'belgium':
      return 'https://dofi.ibz.be/sites/default/files/2021-01/Formulaire_visa_C_EN.pdf';
    case 'united-kingdom':
      return 'https://assets.publishing.service.gov.uk/media/5a7f66e6e5274a2e87db4fa9/vaf1a.pdf';
    case 'united-states':
      return 'https://ceac.state.gov/genniv/';
    case 'canada':
      return 'https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/kits/forms/imm5257e.pdf';
    case 'saudi-arabia':
      return 'https://ksavisa.sa/';
    case 'uae-dubai':
      return 'https://www.gdrfad.gov.ae/en/services';
    case 'turkey':
      return 'https://www.konsolosluk.gov.tr/Visa';
    case 'malaysia':
      return 'https://www.imi.gov.my/wp-content/uploads/2022/02/Borang-Permohonan-Visa-IM.47.pdf';
    default:
      if (country.region === 'Schengen Europe') {
        return OFFICIAL_HARMONIZED_SCHENGEN_FORM_PDF;
      }
      return country.officialPortalUrl;
  }
}
