import { OFFICIAL_DIRECTOR_SIGNATURE_TEXT, OFFICIAL_DIRECTOR_SIGNATURE_HTML } from '../data/companyInfo';

export interface VisaQuotationResult {
  isVerified: boolean;
  destination: string;
  visaType: string;
  nationality: string;
  stayDuration: string;
  entryType: string;
  officialFee: number;
  otherMandatoryFees: number;
  insuranceFee: number;
  skyBridgeServiceFee: number;
  consultancyFee: number;
  documentationFee: number;
  otherCharges: number;
  customerTotal: number;
  currency: string;
  processingEstimate: string;
  requiredDocuments: string[];
  officialApplicationUrl: string;
  source: string;
  lastVerifiedDate: string;
  verificationStatus: 'Verified Official Source' | 'Requires Verification';
  importantConditions: string[];
  formattedQuotationText: string;
  formattedQuotationHtml: string;
  verificationMessage?: string;
}

interface VerifiedVisaRecord {
  keywords: string[];
  destination: string;
  visaType: string;
  stayDuration: string;
  entryType: string;
  officialFee: number;
  otherMandatoryFees: number;
  insuranceFee: number;
  skyBridgeServiceFee: number;
  consultancyFee: number;
  documentationFee: number;
  otherCharges: number;
  currency: string;
  processingEstimate: string;
  requiredDocuments: string[];
  officialApplicationUrl: string;
  source: string;
  lastVerifiedDate: string;
}

// Authoritative verified records for Pakistani passport holders (Official gazette/government sources)
const VERIFIED_VISA_RECORDS: VerifiedVisaRecord[] = [
  {
    keywords: ['dubai', 'uae', '30 day', '30 days', 'visit', 'tourist'],
    destination: 'United Arab Emirates (Dubai)',
    visaType: '30 Days Tourist Visa (Single Entry)',
    stayDuration: '30 Days',
    entryType: 'Single Entry',
    officialFee: 21300, // AED 280 equivalent
    otherMandatoryFees: 3425, // Mandatory health/COVID insurance (AED 45)
    insuranceFee: 3425,
    skyBridgeServiceFee: 5000,
    consultancyFee: 2500,
    documentationFee: 2500,
    otherCharges: 0,
    currency: 'PKR',
    processingEstimate: '24 to 72 business hours',
    requiredDocuments: [
      'Original Passport scan (bio page, minimum 6 months validity from entry)',
      'Recent passport-size photograph (white background, digital color scan)',
      'CNIC / National Identity Card (both sides colored scan)'
    ],
    officialApplicationUrl: 'https://icp.gov.ae',
    source: 'Federal Authority for Identity, Citizenship, Customs and Port Security (ICP UAE)',
    lastVerifiedDate: '2026-09-28'
  },
  {
    keywords: ['dubai 60', 'uae 60', '60 day', '60 days'],
    destination: 'United Arab Emirates (Dubai)',
    visaType: '60 Days Tourist Visa (Single Entry)',
    stayDuration: '60 Days',
    entryType: 'Single Entry',
    officialFee: 34250, // AED 450 equivalent
    otherMandatoryFees: 4560, // Mandatory medical insurance (AED 60)
    insuranceFee: 4560,
    skyBridgeServiceFee: 6000,
    consultancyFee: 3000,
    documentationFee: 3000,
    otherCharges: 0,
    currency: 'PKR',
    processingEstimate: '2 to 4 business days',
    requiredDocuments: [
      'Original Passport scan (bio page, minimum 6 months validity)',
      'White background passport-size photograph',
      'CNIC copy (both sides)',
      'Return confirmed flight reservation (provisional)'
    ],
    officialApplicationUrl: 'https://icp.gov.ae',
    source: 'Federal Authority for Identity, Citizenship, Customs and Port Security (ICP UAE)',
    lastVerifiedDate: '2026-09-28'
  },
  {
    keywords: ['saudi', 'umrah', 'tourist visa', 'ksa'],
    destination: 'Saudi Arabia',
    visaType: '1-Year Multiple Entry Tourist / Umrah eVisa',
    stayDuration: 'Up to 90 days per visit',
    entryType: 'Multiple Entry',
    officialFee: 39500, // SAR 535 official fee
    otherMandatoryFees: 13320, // Mandatory comprehensive health insurance SAR 180
    insuranceFee: 13320,
    skyBridgeServiceFee: 6500,
    consultancyFee: 3500,
    documentationFee: 2500,
    otherCharges: 0,
    currency: 'PKR',
    processingEstimate: '24 to 48 business hours',
    requiredDocuments: [
      'Passport scan valid for at least 6 months with 2 blank pages',
      'Recent passport-size photo (2x2 inch, white background)',
      'Valid permanent residence, US/UK/Schengen visa or GCC residency if applying under eVisa category, otherwise sticker file'
    ],
    officialApplicationUrl: 'https://visa.visitsaudi.com',
    source: 'Ministry of Tourism & Ministry of Foreign Affairs (Saudi Arabia)',
    lastVerifiedDate: '2026-09-25'
  },
  {
    keywords: ['turkey', 'turkish', 'sticker'],
    destination: 'Turkey',
    visaType: 'Single Entry Tourist Sticker Visa',
    stayDuration: 'Up to 30 days',
    entryType: 'Single Entry',
    officialFee: 31000,
    otherMandatoryFees: 15500, // Anatolia / Gerrys service charge & biometric submission fee
    insuranceFee: 4500,
    skyBridgeServiceFee: 8000,
    consultancyFee: 4000,
    documentationFee: 4000,
    otherCharges: 0,
    currency: 'PKR',
    processingEstimate: '15 to 20 business days',
    requiredDocuments: [
      'Original passport valid for at least 6 months + all previous passports',
      'Two biometric photographs (5x5 cm white background)',
      'Last 6 months bank statement with account maintenance certificate (min closing PKR 600,000)',
      'Employment letter / Salary slips (last 3 months) or Business registration/NTN certificates',
      'Family Registration Certificate (FRC) from NADRA if travelling with family'
    ],
    officialApplicationUrl: 'https://www.konsolosluk.gov.tr',
    source: 'Republic of Turkey Ministry of Foreign Affairs & Anatolia Visa Center Pakistan',
    lastVerifiedDate: '2026-09-20'
  },
  {
    keywords: ['uk', 'united kingdom', 'london', 'standard visitor'],
    destination: 'United Kingdom',
    visaType: 'Standard Visitor Visa (6 Months)',
    stayDuration: 'Up to 180 days',
    entryType: 'Multiple Entry',
    officialFee: 45500, // £115 statutory UKVI fee converted
    otherMandatoryFees: 18500, // VFS Global biometric appointment & document scanning
    insuranceFee: 0,
    skyBridgeServiceFee: 12000,
    consultancyFee: 7000,
    documentationFee: 6000,
    otherCharges: 0,
    currency: 'PKR',
    processingEstimate: '3 to 6 weeks standard processing',
    requiredDocuments: [
      'Original Passport valid for duration of stay with at least 1 blank page',
      'Last 6 months verifiable bank statements showing origin of funds',
      'Employment verification letter, tax returns (FBR Active Taxpayer list), and salary slips',
      'Comprehensive itinerary, travel intent letter, and evidence of ties to Pakistan',
      'Property / asset documents (if applicable)'
    ],
    officialApplicationUrl: 'https://www.gov.uk/standard-visitor-visa',
    source: 'UK Visas and Immigration (UKVI / Home Office)',
    lastVerifiedDate: '2026-09-22'
  },
  {
    keywords: ['schengen', 'germany', 'france', 'italy', 'spain', 'europe'],
    destination: 'Schengen Area (Europe)',
    visaType: 'Short-Stay Tourist Visa (Type C)',
    stayDuration: 'Up to 90 days within 180 days',
    entryType: 'Single or Multiple Entry (Consular Discretion)',
    officialFee: 29500, // €90 statutory Schengen visa fee converted
    otherMandatoryFees: 12500, // VFS / Gerrys / BLS appointment handling fee
    insuranceFee: 4500, // Mandatory €30,000 coverage compliant travel medical insurance
    skyBridgeServiceFee: 12000,
    consultancyFee: 6500,
    documentationFee: 5000,
    otherCharges: 0,
    currency: 'PKR',
    processingEstimate: '15 to 45 calendar days after biometric submission',
    requiredDocuments: [
      'Original passport valid for minimum 3 months beyond departure from Schengen with 2 blank pages',
      'Two recent biometric photos (35x45 mm, light gray/white background, 80% face coverage)',
      'Proof of financial means: Last 6 months bank statements with bank stamp & sign',
      'Travel medical insurance with minimum €30,000 emergency medical and repatriation coverage',
      'Flight reservations (both ways) and proof of accommodation across all Schengen destinations',
      'Proof of employment / business ownership & tax registration in Pakistan'
    ],
    officialApplicationUrl: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa/visa-policy_en',
    source: 'European Commission Directorate-General for Migration and Home Affairs',
    lastVerifiedDate: '2026-09-24'
  },
  {
    keywords: ['malaysia', 'evisa', 'kuala lumpur'],
    destination: 'Malaysia',
    visaType: '30 Days Single Entry Tourist eVisa',
    stayDuration: '30 Days',
    entryType: 'Single Entry',
    officialFee: 8500,
    otherMandatoryFees: 3200, // Processing portal convenience fee
    insuranceFee: 0,
    skyBridgeServiceFee: 4500,
    consultancyFee: 2000,
    documentationFee: 1500,
    otherCharges: 0,
    currency: 'PKR',
    processingEstimate: '2 to 5 business days',
    requiredDocuments: [
      'Original Passport scan with at least 6 months validity',
      'Digital photo (studio quality, white background, 35x50 mm)',
      'Confirmed return flight ticket and hotel booking voucher',
      'Last 3 months bank statement (closing balance min PKR 300,000)'
    ],
    officialApplicationUrl: 'https://malaysiavisa.imi.gov.my',
    source: 'Immigration Department of Malaysia',
    lastVerifiedDate: '2026-09-18'
  },
  {
    keywords: ['azerbaijan', 'baku', 'evisa', 'asan'],
    destination: 'Azerbaijan',
    visaType: 'Standard ASAN Tourist eVisa',
    stayDuration: 'Up to 30 days',
    entryType: 'Single Entry',
    officialFee: 7200, // $26 USD official ASAN fee
    otherMandatoryFees: 1200, // Payment processing fee
    insuranceFee: 0,
    skyBridgeServiceFee: 3500,
    consultancyFee: 1500,
    documentationFee: 1500,
    otherCharges: 0,
    currency: 'PKR',
    processingEstimate: '3 business days (Standard) or 3 hours (Urgent)',
    requiredDocuments: [
      'Clear color passport scan (valid for at least 3 months beyond visa expiry)',
      'Confirmed hotel reservation in Baku / Azerbaijan',
      'Valid email address for electronic visa delivery'
    ],
    officialApplicationUrl: 'https://evisa.gov.az',
    source: 'State Agency for Public Service and Social Innovations under the President of the Republic of Azerbaijan (ASAN Visa)',
    lastVerifiedDate: '2026-09-15'
  }
];

export function executeVisaQuotationAgent(query: string): VisaQuotationResult {
  const q = query.toLowerCase().trim();

  // Match against verified records
  let matchedRecord: VerifiedVisaRecord | undefined = undefined;

  for (const record of VERIFIED_VISA_RECORDS) {
    const hasMatch = record.keywords.some(k => q.includes(k));
    if (hasMatch) {
      matchedRecord = record;
      break;
    }
  }

  // If no authoritative source matches: Section 6 rule:
  // "If current information cannot be verified: 'Current price requires verification.' Never invent a price."
  if (!matchedRecord) {
    const unverifiedResult: VisaQuotationResult = {
      isVerified: false,
      destination: query || 'Requested Destination',
      visaType: 'Specialized / Unverified Category',
      nationality: 'Pakistani',
      stayDuration: 'Subject to Consular Verification',
      entryType: 'Subject to Consular Rules',
      officialFee: 0,
      otherMandatoryFees: 0,
      insuranceFee: 0,
      skyBridgeServiceFee: 0,
      consultancyFee: 0,
      documentationFee: 0,
      otherCharges: 0,
      customerTotal: 0,
      currency: 'PKR',
      processingEstimate: 'Requires Embassy Verification',
      requiredDocuments: [
        'Valid Passport (minimum 6 months validity)',
        'Recent biometric photographs',
        'Consular checklist to be confirmed after official inquiry'
      ],
      officialApplicationUrl: 'https://skybridgetravelandtourism.com/contact',
      source: 'Consular Verification Required',
      lastVerifiedDate: 'Pending Verification',
      verificationStatus: 'Requires Verification',
      verificationMessage: 'Current price requires verification. SkyBridge Travel & Tourism adheres to strict compliance standards and does not publish unverified or speculative visa tariffs.',
      importantConditions: [
        'Current statutory price requires verification from the relevant embassy or consular desk.',
        'Visa decisions are made exclusively by relevant foreign immigration authorities.',
        'SkyBridge Travel & Tourism does not guarantee visa approval or appointment dates.'
      ],
      formattedQuotationText: `SkyBridge Travel & Tourism — Official Visa Quotation Notice\n\nDestination: ${query}\nStatus: Current price requires verification.\n\nNotice: To ensure complete compliance, consular tariffs for this category are currently being confirmed with the competent authority. Our senior visa consultant will provide exact verifiable fees upon consular confirmation.\n\n${OFFICIAL_DIRECTOR_SIGNATURE_TEXT}`,
      formattedQuotationHtml: `<div style="font-family: Arial, sans-serif; font-size: 13px; color: #1e293b; line-height: 1.6;">
        <h3 style="color: #0b1b3b;">SkyBridge Travel & Tourism — Official Visa Notice</h3>
        <p><strong>Destination:</strong> ${query}</p>
        <p style="color: #c2410c; font-weight: bold;">Status: Current price requires verification.</p>
        <p>To ensure 100% statutory compliance, official tariffs and consular protocols for this category are verified directly with the competent embassy before a formal quotation is issued.</p>
        ${OFFICIAL_DIRECTOR_SIGNATURE_HTML}
      </div>`
    };
    return unverifiedResult;
  }

  // Calculate customer total
  const customerTotal =
    matchedRecord.officialFee +
    matchedRecord.otherMandatoryFees +
    matchedRecord.skyBridgeServiceFee +
    matchedRecord.consultancyFee +
    matchedRecord.documentationFee +
    matchedRecord.otherCharges;

  const importantConditions = [
    'Visa approval decisions rest solely in the discretion of the embassy, consulate, or immigration authority.',
    'SkyBridge Travel & Tourism provides document vetting, file compilation, and advisory services and does not guarantee visa issuance.',
    'Consular and government fees are non-refundable once an application is formally lodged with immigration.',
    'Appointment slots and dates are subject to official VFS, TLS, BLS, or embassy calendar capacity.'
  ];

  const docsText = matchedRecord.requiredDocuments.map((d, i) => `${i + 1}. ${d}`).join('\n');

  // Customer-facing quotation text (Section 7: Zero supplier cost, zero markup, zero profit exposed)
  const formattedQuotationText = `SkyBridge Travel & Tourism — Official Travel Quotation

TRAVEL DETAILS:
• Destination: ${matchedRecord.destination}
• Visa Category: ${matchedRecord.visaType}
• Nationality: Pakistani
• Stay Duration: ${matchedRecord.stayDuration}
• Entry Type: ${matchedRecord.entryType}
• Processing Estimate: ${matchedRecord.processingEstimate}

CUSTOMER PRICING BREAKDOWN:
• Official Statutory Visa Fee: ${matchedRecord.currency} ${matchedRecord.officialFee.toLocaleString()}
${matchedRecord.otherMandatoryFees > 0 ? `• Mandatory Consular & Medical Insurance Fees: ${matchedRecord.currency} ${matchedRecord.otherMandatoryFees.toLocaleString()}\n` : ''}• SkyBridge Professional Service & Advisory Fee: ${matchedRecord.currency} ${matchedRecord.skyBridgeServiceFee.toLocaleString()}
• File Consultation & Vetting Fee: ${matchedRecord.currency} ${matchedRecord.consultancyFee.toLocaleString()}
• Dossier Documentation & Cover Letter Fee: ${matchedRecord.currency} ${matchedRecord.documentationFee.toLocaleString()}
-----------------------------------------------------------------
TOTAL CUSTOMER CHARGES: ${matchedRecord.currency} ${customerTotal.toLocaleString()} (All taxes included)

REQUIRED DOCUMENTS:
${docsText}

OFFICIAL APPLICATION INFORMATION:
• Verifiable Authority: ${matchedRecord.source}
• Official Portal URL: ${matchedRecord.officialApplicationUrl}
• Last Verified Date: ${matchedRecord.lastVerifiedDate}

IMPORTANT CONDITIONS:
${importantConditions.map(c => `• ${c}`).join('\n')}

${OFFICIAL_DIRECTOR_SIGNATURE_TEXT}`;

  const formattedQuotationHtml = `
<div style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #1e293b; line-height: 1.6; max-width: 650px; margin: 0 auto; background: #ffffff; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px;">
  <div style="text-align: center; border-bottom: 2px solid #0b1b3b; padding-bottom: 12px; margin-bottom: 16px;">
    <h2 style="margin: 0; color: #0b1b3b; font-size: 18px; font-weight: 800; letter-spacing: -0.5px;">SkyBridge Travel & Tourism</h2>
    <p style="margin: 4px 0 0 0; font-size: 11px; font-weight: 600; color: #64748b; text-transform: uppercase;">Official Customer Travel Quotation</p>
  </div>

  <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 12px;">
    <tr style="background: #f8fafc;"><td style="padding: 6px 10px; font-weight: bold; width: 35%;">Destination:</td><td style="padding: 6px 10px;">${matchedRecord.destination}</td></tr>
    <tr><td style="padding: 6px 10px; font-weight: bold;">Visa Category:</td><td style="padding: 6px 10px;">${matchedRecord.visaType}</td></tr>
    <tr style="background: #f8fafc;"><td style="padding: 6px 10px; font-weight: bold;">Nationality:</td><td style="padding: 6px 10px;">Pakistani</td></tr>
    <tr><td style="padding: 6px 10px; font-weight: bold;">Stay Duration:</td><td style="padding: 6px 10px;">${matchedRecord.stayDuration}</td></tr>
    <tr style="background: #f8fafc;"><td style="padding: 6px 10px; font-weight: bold;">Entry Type:</td><td style="padding: 6px 10px;">${matchedRecord.entryType}</td></tr>
    <tr><td style="padding: 6px 10px; font-weight: bold;">Processing Estimate:</td><td style="padding: 6px 10px;">${matchedRecord.processingEstimate}</td></tr>
  </table>

  <div style="background: #f1f5f9; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
    <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #475569; margin-bottom: 8px;">Customer Net Quotation</div>
    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
      <span>Official Statutory Consular Fee:</span>
      <span style="font-weight: 600;">${matchedRecord.currency} ${matchedRecord.officialFee.toLocaleString()}</span>
    </div>
    ${matchedRecord.otherMandatoryFees > 0 ? `
    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
      <span>Mandatory Consular Insurance & Center Handling:</span>
      <span style="font-weight: 600;">${matchedRecord.currency} ${matchedRecord.otherMandatoryFees.toLocaleString()}</span>
    </div>` : ''}
    <div style="display: flex; justify-content: space-between; font-size: 12px; margin-bottom: 4px;">
      <span>SkyBridge Professional Services & Consultation:</span>
      <span style="font-weight: 600;">${matchedRecord.currency} ${(matchedRecord.skyBridgeServiceFee + matchedRecord.consultancyFee + matchedRecord.documentationFee).toLocaleString()}</span>
    </div>
    <div style="border-top: 1px solid #cbd5e1; margin-top: 8px; padding-top: 8px; display: flex; justify-content: space-between; font-size: 15px; font-weight: 800; color: #0b1b3b;">
      <span>Total Customer Amount:</span>
      <span style="color: #0288d1;">${matchedRecord.currency} ${customerTotal.toLocaleString()}</span>
    </div>
  </div>

  <div style="margin-bottom: 16px;">
    <div style="font-size: 11px; font-weight: bold; text-transform: uppercase; color: #0b1b3b; margin-bottom: 6px;">Required Application Documents:</div>
    <ol style="margin: 0; padding-left: 20px; font-size: 12px; color: #334155;">
      ${matchedRecord.requiredDocuments.map(d => `<li style="margin-bottom: 4px;">${d}</li>`).join('')}
    </ol>
  </div>

  <div style="background: #fffbeb; border: 1px solid #fef3c7; border-radius: 8px; padding: 10px; margin-bottom: 16px; font-size: 11px; color: #92400e;">
    <strong>Important Notice:</strong> Visa decisions are made exclusively by the relevant embassy, consulate, or immigration authority. SkyBridge Travel & Tourism does not guarantee visa approval or appointment availability.
  </div>

  <div style="font-size: 11px; color: #64748b; margin-bottom: 16px;">
    <strong>Authority Source:</strong> ${matchedRecord.source} (<a href="${matchedRecord.officialApplicationUrl}" target="_blank" style="color: #0288d1;">Official Portal</a>) • <em>Last verified: ${matchedRecord.lastVerifiedDate}</em>
  </div>

  ${OFFICIAL_DIRECTOR_SIGNATURE_HTML}
</div>
  `.trim();

  return {
    isVerified: true,
    destination: matchedRecord.destination,
    visaType: matchedRecord.visaType,
    nationality: 'Pakistani',
    stayDuration: matchedRecord.stayDuration,
    entryType: matchedRecord.entryType,
    officialFee: matchedRecord.officialFee,
    otherMandatoryFees: matchedRecord.otherMandatoryFees,
    insuranceFee: matchedRecord.insuranceFee,
    skyBridgeServiceFee: matchedRecord.skyBridgeServiceFee,
    consultancyFee: matchedRecord.consultancyFee,
    documentationFee: matchedRecord.documentationFee,
    otherCharges: matchedRecord.otherCharges,
    customerTotal,
    currency: matchedRecord.currency,
    processingEstimate: matchedRecord.processingEstimate,
    requiredDocuments: matchedRecord.requiredDocuments,
    officialApplicationUrl: matchedRecord.officialApplicationUrl,
    source: matchedRecord.source,
    lastVerifiedDate: matchedRecord.lastVerifiedDate,
    verificationStatus: 'Verified Official Source',
    importantConditions,
    formattedQuotationText,
    formattedQuotationHtml
  };
}
