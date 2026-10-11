export interface SchengenCountryData {
  id: string;
  name: string;
  code: string;
  flag: string;
  officialPortalName: string;
  officialPortalUrl: string;
  officialVisaApplyUrl: string;
  officialVisaFormPdfUrl: string;
  visaType?: string;
  officialVisaFeeLocal?: string;
  appointmentPartner: 'VFS Global' | 'TLScontact' | 'BLS International' | 'Embassy Direct' | 'Gerrys / VFS';
  appointmentUrl: string;
  submissionCentersInPakistan: string[];
  officialVisaFeeEur: number;
  officialVisaFeePkr: number;
  serviceFeePkr: number;
  processingDays: string;
  recommendedBankBalancePkr: string;
  mandatoryDocuments: string[];
  countrySpecificRules: string[];
  refusalAvoidanceTips: string[];
  popularTouristDestinations: string[];
}

export const OFFICIAL_HARMONIZED_SCHENGEN_FORM_PDF = 'https://home-affairs.ec.europa.eu/system/files/2020-02/harmonised_application_form_en.pdf';

export const SCHENGEN_COUNTRIES: SchengenCountryData[] = [
  {
    id: 'germany',
    name: 'Germany',
    code: 'DE',
    flag: '🇩🇪',
    officialPortalName: 'Federal Foreign Office Germany (Auswärtiges Amt)',
    officialPortalUrl: 'https://www.auswaertiges-amt.de',
    officialVisaApplyUrl: 'https://videx.diplo.de/videx/desktop/index.html#start',
    officialVisaFormPdfUrl: 'https://visa.vfsglobal.com/one-pager/germany/pakistan/english/pdf/schengen-visa-application-form.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/deu',
    submissionCentersInPakistan: ['Islamabad (VFS)', 'Lahore (VFS)', 'Karachi (Consulate / VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 45 calendar days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,200,000',
    mandatoryDocuments: [
      'Original Passport (valid 3+ months beyond intended return, 2 blank pages)',
      'All previous original passports & copies of all previous visas',
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
      'Never deposit large unexplained lump sums into the bank right before applying',
      'Tie cover letter directly to strong economic and family ties in Pakistan (e.g. property, job, family)',
      'Ensure travel dates exactly match insurance validity, hotel reservations, and leave certificate'
    ],
    popularTouristDestinations: ['Berlin', 'Munich', 'Frankfurt', 'Black Forest', 'Cologne', 'Neuschwanstein Castle']
  },
  {
    id: 'france',
    name: 'France',
    code: 'FR',
    flag: '🇫🇷',
    officialPortalName: 'France-Visas (Official French Government Visa Portal)',
    officialPortalUrl: 'https://france-visas.gouv.fr',
    officialVisaApplyUrl: 'https://france-visas.gouv.fr/en/web/france-visas/online-application',
    officialVisaFormPdfUrl: 'https://france-visas.gouv.fr/documents/66002/100067/Formulaire_Schengen_EN.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/fra',
    submissionCentersInPakistan: ['Islamabad (VFS)', 'Lahore (VFS)', 'Karachi (VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 12500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,600,000 - 2,500,000',
    mandatoryDocuments: [
      'France-Visas official application registration receipt and summary sheet',
      'Original Passport valid for at least 3 months after departure from Schengen',
      'Previous expired passports (proof of previous travel)',
      'Two recent biometric photos (ISO/IEC standard)',
      'Round-trip flight booking reservation',
      'Confirmed accommodation vouchers (hotel reservations in Paris, Nice, etc.) or "Attestation d’accueil" if visiting family',
      'Last 6 months personal bank statement with official verification',
      'Bank Account Maintenance Certificate',
      'Employment Letter / NOC on company letterhead with employer contact',
      'Last 3 months salary slips',
      'Businessmen: NTN, Tax returns for last 2 years, SECP / partnership deed',
      'NADRA FRC certificate (Family Registration Certificate)',
      'Travel Medical Insurance covering €30,000 across all Schengen countries',
      'Detailed cover letter explaining trip purpose, itinerary, and financial responsibility'
    ],
    countrySpecificRules: [
      'Must create account on France-Visas portal first, complete application, print barcode receipt, then book VFS appointment',
      'If staying with a private host in France, official "Attestation d\'accueil" from French Town Hall (Mairie) is mandatory'
    ],
    refusalAvoidanceTips: [
      'Ensure the itinerary is logical (e.g. 4 days Paris, 3 days Nice), not overambitious',
      'Demonstrate stable regular monthly income flowing through the submitted bank account'
    ],
    popularTouristDestinations: ['Paris', 'Eiffel Tower & Louvre', 'Nice & French Riviera', 'Lyon', 'Marseille', 'Chamonix / Alps']
  },
  {
    id: 'italy',
    name: 'Italy',
    code: 'IT',
    flag: '🇮🇹',
    officialPortalName: 'Ministry of Foreign Affairs and International Cooperation Italy (Farnesina)',
    officialPortalUrl: 'https://vistoperitalia.esteri.it',
    officialVisaApplyUrl: 'https://visa.vfsglobal.com/pak/en/ita/apply-visa',
    officialVisaFormPdfUrl: 'https://vistoperitalia.esteri.it/moduli/it/domanda_visto_schengen.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/ita',
    submissionCentersInPakistan: ['Islamabad (VFS)', 'Lahore (VFS)', 'Karachi (Consulate / VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 12000,
    processingDays: '20 to 45 calendar days',
    recommendedBankBalancePkr: 'PKR 1,800,000 - 2,600,000',
    mandatoryDocuments: [
      'Signed Schengen Visa Application form',
      'Valid Original Passport with at least two blank pages',
      'Copies of all used pages of current and past passports',
      'Two passport photos matching Italian consular guidelines',
      'Flight booking round-trip itinerary',
      'Confirmed hotel bookings with Italian address and contact telephone',
      'Bank statement for previous 6 months showing continuous balance',
      'Bank letter certifying active account status and signing authority',
      'Employment NOC or commercial registration (Chamber of Commerce certificate)',
      'FBR Tax returns (Active Taxpayer Proof)',
      'NADRA Family Registration Certificate (FRC)',
      'Comprehensive travel insurance policy valid for the whole Schengen area (€30,000 medical coverage)',
      'Cover letter signed by applicant'
    ],
    countrySpecificRules: [
      'Italian consulates in Pakistan strictly check financial sufficiency per day of stay table',
      'Appointments must be booked well in advance due to high seasonal demand'
    ],
    refusalAvoidanceTips: [
      'Avoid booking unverified dummy hotel stays; Italian consular officers frequently verify directly with properties',
      'Clear documentation of leave from employer matching flight ticket return date'
    ],
    popularTouristDestinations: ['Rome', 'Venice', 'Milan', 'Florence', 'Amalfi Coast', 'Lake Como']
  },
  {
    id: 'spain',
    name: 'Spain',
    code: 'ES',
    flag: '🇪🇸',
    officialPortalName: 'Ministry of Foreign Affairs Spain (Exteriores)',
    officialPortalUrl: 'https://www.exteriores.gob.es',
    officialVisaApplyUrl: 'https://pakistan.blsspainvisa.com/book_appointment.php',
    officialVisaFormPdfUrl: 'https://pakistan.blsspainvisa.com/pdf/Schengen-Visa-Application-Form.pdf',
    appointmentPartner: 'BLS International',
    appointmentUrl: 'https://pakistan.blsspainvisa.com',
    submissionCentersInPakistan: ['Islamabad (BLS)', 'Lahore (BLS)', 'Karachi (BLS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 9800,
    processingDays: '15 to 35 calendar days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,300,000',
    mandatoryDocuments: [
      'Spain Schengen Application form duly filled and signed',
      'Original Passport with minimum 6 months validity recommended',
      'Previous passports if any',
      'Two recent passport-size photos against a white background',
      'Confirmed round-trip flight reservations',
      'Hotel reservations in Spain for full duration of stay',
      'Personal 6-month bank statement with bank branch manager signature & stamp',
      'Bank Maintenance Letter',
      'Job Letter / Leave Letter mentioning salary and designation',
      'Last 3 months salary slips',
      'Business documents (NTN, Tax Returns, SECP, Chamber ID) if self-employed',
      'NADRA FRC certificate',
      '€30,000 Schengen Travel Medical Insurance covering hospitalization and emergency return',
      'Applicant Statement of Purpose / Cover Letter'
    ],
    countrySpecificRules: [
      'Submission in Pakistan is handled exclusively through BLS International Spain Visa Application Centers',
      'BLS biometric appointment confirmation slip must be presented at the gate'
    ],
    refusalAvoidanceTips: [
      'Spain requires minimum daily financial threshold (~€113 per person per day of stay)',
      'Ensure flight reservation matches entry into Spanish territory first or majority duration'
    ],
    popularTouristDestinations: ['Barcelona', 'Madrid', 'Seville', 'Granada (Alhambra)', 'Valencia', 'Mallorca']
  },
  {
    id: 'switzerland',
    name: 'Switzerland',
    code: 'CH',
    flag: '🇨🇭',
    officialPortalName: 'State Secretariat for Migration (SEM Switzerland)',
    officialPortalUrl: 'https://www.sem.admin.ch',
    officialVisaApplyUrl: 'https://www.swiss-visa.ch/',
    officialVisaFormPdfUrl: 'https://www.sem.admin.ch/dam/sem/en/data/einreise/visumantragsformulare/visumantrag-schengen-en.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/che',
    submissionCentersInPakistan: ['Islamabad (VFS)', 'Lahore (VFS)', 'Karachi (VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11000,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 2,000,000 - 3,000,000',
    mandatoryDocuments: [
      'Swiss Schengen Visa Application form completed online & signed',
      'Current Passport & previous passports',
      'Two passport photos (35x45mm) meeting ICAO standards',
      'Round-trip flight booking voucher',
      'Hotel reservation vouchers in Switzerland (Zurich, Geneva, Interlaken, etc.)',
      'Proof of sufficient financial means: Bank statement 6 months with official stamp',
      'Bank Account Maintenance Certificate',
      'Employment certificate / No Objection Certificate (NOC)',
      'Salary slips (3 months)',
      'Company registration & tax returns if business owner',
      'Family Registration Certificate (FRC) from NADRA',
      'Travel Health Insurance with minimum €30,000 coverage valid across all Schengen states',
      'Comprehensive Travel Itinerary with planned trains/excursions'
    ],
    countrySpecificRules: [
      'Switzerland has one of the highest daily subsistence thresholds in Europe (minimum CHF 100 per day)',
      'Swiss authorities strictly inspect ties to home country to prevent overstaying'
    ],
    refusalAvoidanceTips: [
      'Provide strong proof of assets (land, property, vehicle registration) in Pakistan',
      'Demonstrate healthy monthly cash flow matching the high Swiss travel budget'
    ],
    popularTouristDestinations: ['Zurich', 'Interlaken & Jungfraujoch', 'Geneva', 'Lucerne', 'Zermatt (Matterhorn)', 'Bern']
  },
  {
    id: 'netherlands',
    name: 'Netherlands',
    code: 'NL',
    flag: '🇳🇱',
    officialPortalName: 'Government of the Netherlands (NetherlandsWorldwide)',
    officialPortalUrl: 'https://www.netherlandsandyou.nl',
    officialVisaApplyUrl: 'https://consular.mfaservices.nl/',
    officialVisaFormPdfUrl: 'https://www.netherlandsworldwide.nl/binaries/content/documents/mfa-en/binaries/documents/publications/2020/02/02/schengen-visa-application-form/schengen-visa-application-form.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/nld',
    submissionCentersInPakistan: ['Islamabad (VFS)', 'Lahore (VFS)', 'Karachi (VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 45 calendar days',
    recommendedBankBalancePkr: 'PKR 1,600,000 - 2,400,000',
    mandatoryDocuments: [
      'Completed online Netherlands Schengen visa application form',
      'Original passport with validity of at least 3 months after departure from Schengen',
      'Copies of all previous visas and entry/exit stamps',
      'Two recent passport photos',
      'Round-trip flight reservation',
      'Confirmed hotel reservations throughout the Netherlands and Schengen zone',
      'Original 6-month bank statement stamped & signed by bank authority',
      'Account maintenance certificate',
      'Letter from employer stating position, salary, leave approval, and guaranteed return',
      'Last 3 months payslips',
      'Business registration and NTN tax certificate (if self-employed)',
      'NADRA FRC certificate',
      'Travel insurance policy covering €30,000 emergency medical and hospital expenses'
    ],
    countrySpecificRules: [
      'Application is submitted via VFS Global and processed by the Ministry of Foreign Affairs in The Hague (Consular Service Organization - CSO)'
    ],
    refusalAvoidanceTips: [
      'Submit complete tax returns and proven business activity if applying as a self-employed business owner',
      'Clearly explain purpose of visit in Amsterdam, Rotterdam or other Dutch cities'
    ],
    popularTouristDestinations: ['Amsterdam (Canals & Museums)', 'Keukenhof Gardens', 'Rotterdam', 'The Hague', 'Giethoorn', 'Utrecht']
  },
  {
    id: 'austria',
    name: 'Austria',
    code: 'AT',
    flag: '🇦🇹',
    officialPortalName: 'Austrian Ministry of Foreign Affairs (BMEIA)',
    officialPortalUrl: 'https://www.bmeia.gv.at',
    officialVisaApplyUrl: 'https://visa.vfsglobal.com/pak/en/aut',
    officialVisaFormPdfUrl: 'https://www.bmeia.gv.at/fileadmin/user_upload/Vertretungen/Islamabad/Dokumente/Visumantrag_C_Englisch.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/aut',
    submissionCentersInPakistan: ['Islamabad (VFS)', 'Lahore (VFS)', 'Karachi (VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,700,000 - 2,500,000',
    mandatoryDocuments: [
      'Austrian Schengen visa application form completed in German or English',
      'Passport valid for at least 3 months past intended stay',
      'Previous passport copies',
      'Two biometric photographs',
      'Flight itinerary reservation',
      'Confirmed hotel reservations in Vienna, Salzburg, Innsbruck, etc.',
      '6-Month bank statements with branch authentication',
      'Bank maintenance certificate',
      'Employer NOC / salary slips or Business NTN & tax returns',
      'NADRA FRC certificate',
      '€30,000 travel medical insurance policy',
      'Detailed cover letter'
    ],
    countrySpecificRules: [
      'Documents must be in English or German; Urdu documents must include certified translation'
    ],
    refusalAvoidanceTips: [
      'Provide verifiable hotel bookings; Austrian Embassy verifies reservations with Austrian hotels directly'
    ],
    popularTouristDestinations: ['Vienna (Schönbrunn Palace)', 'Salzburg', 'Innsbruck', 'Hallstatt', 'Tyrol Alps']
  },
  {
    id: 'belgium',
    name: 'Belgium',
    code: 'BE',
    flag: '🇧🇪',
    officialPortalName: 'Immigration Office Belgium (FPS Interior)',
    officialPortalUrl: 'https://dofi.ibz.be',
    officialVisaApplyUrl: 'https://visaonweb.diplomatie.be/',
    officialVisaFormPdfUrl: 'https://dofi.ibz.be/sites/default/files/2021-01/Formulaire_visa_C_EN.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/bel',
    submissionCentersInPakistan: ['Islamabad (VFS)', 'Lahore (VFS)', 'Karachi (VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 12000,
    processingDays: '15 to 45 calendar days',
    recommendedBankBalancePkr: 'PKR 1,600,000 - 2,400,000',
    mandatoryDocuments: [
      'Visa On Web (VOW) application form completed online & printed',
      'Passport valid for at least 3 months beyond departure',
      'Biometric photos (2)',
      'Round-trip flight booking',
      'Hotel reservations in Brussels, Bruges, Ghent, Antwerp',
      '6 months bank statement with bank verification',
      'Bank maintenance certificate',
      'Employment NOC or commercial documents',
      'FBR Tax returns and NADRA FRC',
      'Travel health insurance €30,000'
    ],
    countrySpecificRules: [
      'Must fill application on the official Belgian Visa On Web (VOW) portal before appointment'
    ],
    refusalAvoidanceTips: [
      'Ensure sufficient daily budget (€95/day in hotel, €45/day if staying with host)'
    ],
    popularTouristDestinations: ['Brussels', 'Bruges', 'Ghent', 'Antwerp', 'Ardennes']
  },
  {
    id: 'greece',
    name: 'Greece',
    code: 'GR',
    flag: '🇬🇷',
    officialPortalName: 'Hellenic Republic Ministry of Foreign Affairs',
    officialPortalUrl: 'https://www.mfa.gr',
    officialVisaApplyUrl: 'https://visa.vfsglobal.com/pak/en/grc',
    officialVisaFormPdfUrl: 'https://www.mfa.gr/images/docs/visas/schengen_visa_application_en.pdf',
    appointmentPartner: 'Gerrys / VFS',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/grc',
    submissionCentersInPakistan: ['Islamabad (Gerrys/VFS)', 'Lahore (Gerrys/VFS)', 'Karachi (Gerrys/VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11000,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,200,000',
    mandatoryDocuments: [
      'Greek Schengen visa application form',
      'Passport valid 3+ months with 2 blank pages',
      'Two recent photos',
      'Flight tickets reservation (provisional)',
      'Accommodation voucher for Athens, Santorini, Mykonos, etc.',
      '6-Month bank statement with official stamp',
      'Employment verification letter & 3 months pay slips',
      'Tax certificates and NADRA FRC',
      'Travel medical insurance €30,000'
    ],
    countrySpecificRules: [
      'Greek Embassy may request personal interview in Islamabad for first-time applicants'
    ],
    refusalAvoidanceTips: [
      'Book island ferry tickets or regional flights if itinerary covers multiple islands'
    ],
    popularTouristDestinations: ['Athens (Acropolis)', 'Santorini', 'Mykonos', 'Crete', 'Rhodes']
  },
  {
    id: 'portugal',
    name: 'Portugal',
    code: 'PT',
    flag: '🇵🇹',
    officialPortalName: 'Ministry of Foreign Affairs Portugal (Vistos)',
    officialPortalUrl: 'https://vistos.mne.gov.pt',
    officialVisaApplyUrl: 'https://pedidodevistos.mne.gov.pt/VistosOnline/',
    officialVisaFormPdfUrl: 'https://vistos.mne.gov.pt/images/schengen_form_en.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/prt',
    submissionCentersInPakistan: ['Islamabad (VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 45 calendar days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,300,000',
    mandatoryDocuments: [
      'Completed E-Visa Portugal application form',
      'Passport valid for at least 3 months after departure',
      'Two photographs',
      'Round-trip flight booking',
      'Hotel reservations in Lisbon, Porto, Algarve',
      '6-Month bank statements with bank stamp',
      'Job NOC / Business registration documents',
      'NADRA FRC and FBR tax returns',
      '€30,000 Schengen insurance'
    ],
    countrySpecificRules: [
      'Appointments in Pakistan are centralized at the Embassy of Portugal / VFS in Islamabad'
    ],
    refusalAvoidanceTips: [
      'Demonstrate genuine tourist intention rather than immigration intent'
    ],
    popularTouristDestinations: ['Lisbon', 'Porto', 'Sintra', 'Algarve beaches', 'Madeira']
  },
  {
    id: 'sweden',
    name: 'Sweden',
    code: 'SE',
    flag: '🇸🇪',
    officialPortalName: 'Swedish Migration Agency (Migrationsverket)',
    officialPortalUrl: 'https://www.migrationsverket.se',
    officialVisaApplyUrl: 'https://www.migrationsverket.se/English/Private-individuals/Visiting-Sweden.html',
    officialVisaFormPdfUrl: 'https://www.migrationsverket.se/download/18.5e83388f141c12901a52b86/1687422363532/119031_Schengen_en.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/swe',
    submissionCentersInPakistan: ['Islamabad (VFS)', 'Lahore (VFS)', 'Karachi (VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 12000,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,800,000 - 2,600,000',
    mandatoryDocuments: [
      'Swedish Schengen visa application form',
      'Passport with 3 months validity after return',
      'Two passport photos',
      'Flight reservation and hotel bookings in Stockholm, Gothenburg',
      '6-Month personal bank statement with bank sign/stamp',
      'Bank maintenance certificate',
      'Employer NOC / salary slips',
      'NADRA FRC and tax returns',
      'Travel medical insurance €30,000'
    ],
    countrySpecificRules: [
      'Requires minimum SEK 450 per day for maintenance in Sweden'
    ],
    refusalAvoidanceTips: [
      'Ensure leave approval clearly specifies dates of absence and return date'
    ],
    popularTouristDestinations: ['Stockholm (Old Town)', 'Gothenburg', 'Kiruna (Northern Lights)', 'Malmö']
  },
  {
    id: 'norway',
    name: 'Norway',
    code: 'NO',
    flag: '🇳🇴',
    officialPortalName: 'Norwegian Directorate of Immigration (UDI)',
    officialPortalUrl: 'https://www.udi.no',
    officialVisaApplyUrl: 'https://selfservice.udi.no/',
    officialVisaFormPdfUrl: 'https://www.udi.no/globalassets/global/skjemaer-engelsk/application-schengen-visa.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/nor',
    submissionCentersInPakistan: ['Islamabad (VFS)', 'Lahore (VFS)', 'Karachi (VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 12500,
    processingDays: '15 to 45 calendar days',
    recommendedBankBalancePkr: 'PKR 2,000,000 - 3,000,000',
    mandatoryDocuments: [
      'Online UDI Portal Application receipt & cover letter',
      'Original Passport with minimum 3 months validity',
      'Two biometric photos',
      'Flight booking and hotel confirmations in Oslo, Bergen, Tromsø',
      '6-Month bank statement (officially stamped)',
      'Account maintenance certificate',
      'Employment verification NOC / Tax returns',
      'NADRA FRC certificate',
      'Travel insurance policy €30,000'
    ],
    countrySpecificRules: [
      'Must complete application and pay consular fee online via the official UDI portal prior to booking VFS appointment'
    ],
    refusalAvoidanceTips: [
      'Norway has strict immigration scrutiny for Pakistani passports; strong domestic ties in Pakistan are essential'
    ],
    popularTouristDestinations: ['Oslo', 'Bergen & Fjords', 'Tromsø (Aurora Borealis)', 'Lofoten Islands']
  },
  {
    id: 'denmark',
    name: 'Denmark',
    code: 'DK',
    flag: '🇩🇰',
    officialPortalName: 'Ministry of Foreign Affairs of Denmark (ApplyVisa)',
    officialPortalUrl: 'https://applyvisa.um.dk',
    officialVisaApplyUrl: 'https://applyvisa.um.dk/',
    officialVisaFormPdfUrl: 'https://applyvisa.um.dk/',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/dnk',
    submissionCentersInPakistan: ['Islamabad (VFS)', 'Lahore (VFS)', 'Karachi (VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 12000,
    processingDays: '15 to 45 calendar days',
    recommendedBankBalancePkr: 'PKR 1,800,000 - 2,800,000',
    mandatoryDocuments: [
      'ApplyVisa cover letter and payment receipt printed from official portal',
      'Passport valid 3+ months',
      'Two recent photos',
      'Flight reservations and hotel vouchers in Copenhagen',
      '6-Month bank statements with branch authentication',
      'Employment NOC / Company registration and tax documents',
      'NADRA FRC and Travel insurance €30,000'
    ],
    countrySpecificRules: [
      'Mandatory registration and payment through ApplyVisa portal before VFS biometrics'
    ],
    refusalAvoidanceTips: [
      'Danish authorities classify destination countries by risk categories; ensure detailed itinerary is backed by reservations'
    ],
    popularTouristDestinations: ['Copenhagen (Nyhavn, Tivoli)', 'Aarhus', 'Odense', 'Legoland Billund']
  },
  {
    id: 'finland',
    name: 'Finland',
    code: 'FI',
    flag: '🇫🇮',
    officialPortalName: 'Ministry for Foreign Affairs of Finland (FinlandVisa)',
    officialPortalUrl: 'https://finlandvisa.fi',
    officialVisaApplyUrl: 'https://finlandvisa.fi/',
    officialVisaFormPdfUrl: 'https://finlandvisa.fi/',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/fin',
    submissionCentersInPakistan: ['Islamabad (VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11500,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,700,000 - 2,600,000',
    mandatoryDocuments: [
      'Online FinlandVisa application form',
      'Passport and previous passports',
      'Photos (2)',
      'Flight booking & hotel vouchers in Helsinki, Rovaniemi (Lapland)',
      '6-Month bank statement (stamped)',
      'NOC from employer or business registration',
      'NADRA FRC and travel insurance €30,000'
    ],
    countrySpecificRules: ['Minimum EUR 50 per day required for subsistence'],
    refusalAvoidanceTips: ['Provide clear evidence of genuine tourism (e.g. Lapland winter tour or summer Helsinki visits)'],
    popularTouristDestinations: ['Helsinki', 'Rovaniemi (Santa Claus Village)', 'Lapland', 'Tampere']
  },
  {
    id: 'poland',
    name: 'Poland',
    code: 'PL',
    flag: '🇵🇱',
    officialPortalName: 'Ministry of Foreign Affairs Republic of Poland (e-Konsulat)',
    officialPortalUrl: 'https://secure.e-konsulat.gov.pl',
    officialVisaApplyUrl: 'https://secure.e-konsulat.gov.pl/',
    officialVisaFormPdfUrl: 'https://secure.e-konsulat.gov.pl/',
    appointmentPartner: 'Embassy Direct',
    appointmentUrl: 'https://secure.e-konsulat.gov.pl',
    submissionCentersInPakistan: ['Islamabad (Embassy of Poland)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 0,
    processingDays: '15 to 30 calendar days',
    recommendedBankBalancePkr: 'PKR 1,400,000 - 2,100,000',
    mandatoryDocuments: [
      'e-Konsulat official printed and signed form',
      'Passport with minimum 3 months validity',
      'Photographs (2)',
      'Flight reservation and hotel reservations in Warsaw, Krakow',
      '6 months bank statement with branch stamp',
      'Employment NOC & FBR tax documents',
      'NADRA FRC and travel insurance €30,000'
    ],
    countrySpecificRules: [
      'Appointment must be registered and confirmed through official e-Konsulat portal'
    ],
    refusalAvoidanceTips: ['Polish Embassy conducts direct consular vetting; ensure all documents are authentic and verifiable'],
    popularTouristDestinations: ['Warsaw', 'Krakow (Wawel Castle)', 'Wieliczka Salt Mine', 'Gdansk']
  },
  {
    id: 'czech-republic',
    name: 'Czech Republic',
    code: 'CZ',
    flag: '🇨🇿',
    officialPortalName: 'Ministry of Foreign Affairs of the Czech Republic',
    officialPortalUrl: 'https://www.mzv.cz',
    officialVisaApplyUrl: 'https://visa.vfsglobal.com/pak/en/cze',
    officialVisaFormPdfUrl: 'https://mzv.gov.cz/file/206967/Application_for_Schengen_Visa_EN.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/cze',
    submissionCentersInPakistan: ['Islamabad (VFS)'],
    officialVisaFeeEur: 90,
    officialVisaFeePkr: 29500,
    serviceFeePkr: 11000,
    processingDays: '15 to 35 calendar days',
    recommendedBankBalancePkr: 'PKR 1,500,000 - 2,200,000',
    mandatoryDocuments: [
      'Czech Schengen visa form',
      'Passport and previous passports',
      'Photographs (2)',
      'Flight reservation and confirmed Prague hotel bookings',
      '6 months bank statement (stamped)',
      'Employment NOC and salary slips',
      'NADRA FRC and travel insurance €30,000'
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
    officialPortalName: 'Consular Services Hungary (Konzuli Szolgálat)',
    officialPortalUrl: 'https://konzuliszolgalat.kormany.hu',
    officialVisaApplyUrl: 'https://visa.vfsglobal.com/pak/en/hun',
    officialVisaFormPdfUrl: 'https://konzuliszolgalat.kormany.hu/download/9/84/12000/schengen_visa_application_form_en.pdf',
    appointmentPartner: 'VFS Global',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/hun',
    submissionCentersInPakistan: ['Islamabad (VFS)', 'Lahore (VFS)', 'Karachi (VFS)'],
    officialVisaFeeEur: 90,
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
  }
];

// Helper to find country by name or code
export function findSchengenCountry(query: string): SchengenCountryData | undefined {
  const q = query.toLowerCase().trim();
  return SCHENGEN_COUNTRIES.find(
    c => c.name.toLowerCase() === q ||
         c.code.toLowerCase() === q ||
         c.name.toLowerCase().includes(q) ||
         q.includes(c.name.toLowerCase())
  );
}

export interface WorldwideVisaCountry {
  id: string;
  name: string;
  code: string;
  flag: string;
  visaType: string;
  officialPortalName: string;
  officialPortalUrl: string;
  officialVisaApplyUrl: string;
  officialVisaFormPdfUrl: string;
  appointmentPartner: string;
  appointmentUrl: string;
  officialFee: string;
  processingDays: string;
  description: string;
}

export const WORLDWIDE_POPULAR_VISA_COUNTRIES: WorldwideVisaCountry[] = [
  {
    id: 'united-kingdom',
    name: 'United Kingdom',
    code: 'GB',
    flag: '🇬🇧',
    visaType: 'Standard Visitor Visa (6 Months)',
    officialPortalName: 'UK Visas and Immigration (GOV.UK)',
    officialPortalUrl: 'https://www.gov.uk/standard-visitor',
    officialVisaApplyUrl: 'https://www.gov.uk/standard-visitor/apply-standard-visitor-visa',
    officialVisaFormPdfUrl: 'https://assets.publishing.service.gov.uk/media/5a7f66e6e5274a2e87db4fa9/vaf1a.pdf',
    appointmentPartner: 'VFS Global (Gerrys)',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/gbr',
    officialFee: '£115 (approx. PKR 42,000)',
    processingDays: '3 to 6 weeks',
    description: 'UK Standard Visitor Visa for tourism, business meetings, and family visits.'
  },
  {
    id: 'united-states',
    name: 'United States',
    code: 'US',
    flag: '🇺🇸',
    visaType: 'B1/B2 Tourist & Business Visa',
    officialPortalName: 'U.S. Department of State (Travel.State.Gov)',
    officialPortalUrl: 'https://travel.state.gov/content/travel/en/us-visas/tourism-visit/visitor.html',
    officialVisaApplyUrl: 'https://ceac.state.gov/genniv/',
    officialVisaFormPdfUrl: 'https://ceac.state.gov/genniv/',
    appointmentPartner: 'U.S. Embassy Islamabad / Consulate Karachi',
    appointmentUrl: 'https://www.ustraveldocs.com/pk/en/',
    officialFee: '$185 (approx. PKR 51,500)',
    processingDays: 'Interview wait time variable',
    description: 'U.S. Nonimmigrant DS-160 online application and consular appointment scheduling.'
  },
  {
    id: 'canada',
    name: 'Canada',
    code: 'CA',
    flag: '🇨🇦',
    visaType: 'Temporary Resident Visa (Visitor Visa)',
    officialPortalName: 'Immigration, Refugees and Citizenship Canada (IRCC)',
    officialPortalUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada.html',
    officialVisaApplyUrl: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/visit-canada/apply-visitor-visa.html',
    officialVisaFormPdfUrl: 'https://www.canada.ca/content/dam/ircc/migration/ircc/english/pdf/kits/forms/imm5257e.pdf',
    appointmentPartner: 'VFS Global (Biometrics)',
    appointmentUrl: 'https://visa.vfsglobal.com/pak/en/can',
    officialFee: 'CAD $100 + $85 biometrics',
    processingDays: '4 to 8 weeks',
    description: 'Canadian Temporary Resident Visa IMM 5257 application and biometrics.'
  },
  {
    id: 'saudi-arabia',
    name: 'Saudi Arabia (Umrah & Tourist)',
    code: 'SA',
    flag: '🇸🇦',
    visaType: 'Umrah Visa / Tourist E-Visa',
    officialPortalName: 'Ministry of Hajj and Umrah / Visit Saudi (Nusuk)',
    officialPortalUrl: 'https://www.visitsaudi.com/',
    officialVisaApplyUrl: 'https://visa.visitsaudi.com/',
    officialVisaFormPdfUrl: 'https://ksavisa.sa/',
    appointmentPartner: 'Tasheer (VFS Tasheer)',
    appointmentUrl: 'https://vc.tasheer.com/',
    officialFee: 'SAR 300 - 450 + insurance',
    processingDays: '24 hours (E-visa) / 3-5 days',
    description: 'Official Saudi Umrah platform, Tasheer biometric scheduling, and multi-entry tourist visas.'
  },
  {
    id: 'united-arab-emirates',
    name: 'United Arab Emirates',
    code: 'AE',
    flag: '🇦🇪',
    visaType: '30/60 Days Tourist & Entry Permit',
    officialPortalName: 'Federal Authority for Identity & Citizenship (ICP / GDRFA)',
    officialPortalUrl: 'https://smartservices.icp.gov.ae/',
    officialVisaApplyUrl: 'https://smartservices.icp.gov.ae/echannels/web/client/default.html#/login',
    officialVisaFormPdfUrl: 'https://www.gdrfad.gov.ae/en/services',
    appointmentPartner: 'Direct Immigration Portal',
    appointmentUrl: 'https://smartservices.icp.gov.ae/',
    officialFee: 'AED 350 - 550',
    processingDays: '24 to 72 hours',
    description: 'Official Dubai GDRFA & Abu Dhabi ICP electronic entry permits.'
  },
  {
    id: 'turkey',
    name: 'Turkey',
    code: 'TR',
    flag: '🇹🇷',
    visaType: 'Tourist Sticker Visa / E-Visa',
    officialPortalName: 'Republic of Türkiye Electronic Visa Portal',
    officialPortalUrl: 'https://www.evisa.gov.tr/en/',
    officialVisaApplyUrl: 'https://www.evisa.gov.tr/en/apply/',
    officialVisaFormPdfUrl: 'https://www.konsolosluk.gov.tr/Visa',
    appointmentPartner: 'Anatolia Travel Services (Gerrys)',
    appointmentUrl: 'https://www.anatoliatravelservices.com/',
    officialFee: '$60 (E-visa) / PKR 26,000 (Sticker)',
    processingDays: 'Instant (E-visa) / 10-15 days',
    description: 'Turkish e-Visa for Schengen/UK/US visa holders, or sticker visa via Anatolia.'
  }
];
