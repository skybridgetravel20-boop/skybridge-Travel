import { IntegrationStatusItem } from '../types';

export const INITIAL_INTEGRATION_STATUS: IntegrationStatusItem[] = [
  // Google Workspace
  {
    id: 'INT-001',
    name: 'Google Sheets Live Database & Mirror',
    category: 'Google Workspace',
    purpose: 'Bi-directional operational sync for VISA_DATA, MANPOWER_DATA, SCHOLARSHIPS, SUPPLIERS, CUSTOMERS, and LEADS.',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Authorized',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T10:00:00Z',
    requiredNextAction: 'Operational. Continuous sync enabled with auto-caching and cell value sanitization.',
    documentationUrl: 'https://developers.google.com/sheets/api',
    responsibleAdministrator: 'Director Urwa Ali'
  },
  {
    id: 'INT-002',
    name: 'Google Drive Document Register & Secure Vault',
    category: 'Google Workspace',
    purpose: 'Organization of company licenses, B2B supplier agreements, consular decrees, and restricted customer documentation.',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Authorized',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T09:30:00Z',
    requiredNextAction: 'Ensure customer passport scans remain within restricted subfolders with role-based access.',
    documentationUrl: 'https://developers.google.com/drive/api',
    responsibleAdministrator: 'Director Urwa Ali'
  },
  {
    id: 'INT-003',
    name: 'Gmail Executive Dispatch & Customer Notifications',
    category: 'Google Workspace',
    purpose: 'Dispatch CEO intelligence summaries, customer booking confirmations, and inquiries to info@skybridgetravelandtourism.com.',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Authorized',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T09:15:00Z',
    requiredNextAction: 'Operational. Customer inquiry notification service active with one-click compose fallback.',
    documentationUrl: 'https://developers.google.com/gmail/api',
    responsibleAdministrator: 'Director Urwa Ali'
  },
  {
    id: 'INT-004',
    name: 'Google Calendar Task & Deadline Reminders',
    category: 'Google Workspace',
    purpose: 'Follow-up scheduling with customer leads, supplier contract reviews, and scholarship application deadlines.',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Authorized',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T08:45:00Z',
    requiredNextAction: 'Operational via Google Calendar template URL generator and Google Workspace hub.',
    documentationUrl: 'https://developers.google.com/calendar/api',
    responsibleAdministrator: 'Director Urwa Ali'
  },
  {
    id: 'INT-005',
    name: 'Google Docs Executive Drafts & Dossier Generator',
    category: 'Google Workspace',
    purpose: 'Drafting cover letters, visa submission checklists, B2B manpower supply pitches, and CEO operations reports.',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Authorized',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T08:30:00Z',
    requiredNextAction: 'Operational for AI agent draft generation and document register exports.',
    documentationUrl: 'https://developers.google.com/docs/api',
    responsibleAdministrator: 'Director Urwa Ali'
  },

  // Suppliers & Portals
  {
    id: 'INT-006',
    name: 'FlyNow B2B Travel & Ticketing Portal',
    category: 'Suppliers & Portals',
    purpose: 'B2B airline ticketing, domestic/international airfare discounts, Umrah packages, and manual quotation entry.',
    connectionStatus: 'Connected but Not Tested',
    authStatus: 'Manual Portal Credential',
    permissionStatus: 'Read Only',
    apiStatus: 'No Public API',
    lastSuccessfulTest: '2026-10-08T14:00:00Z',
    requiredNextAction: 'Portal credentials active in encrypted Vault. Commercial terms operated manually by ticketing staff.',
    documentationUrl: 'https://b2b.flynow.pk/login',
    responsibleAdministrator: 'Ticketing Operations Desk'
  },
  {
    id: 'INT-007',
    name: 'Amadeus B2B Global GDS Ticketing Terminal',
    category: 'Suppliers & Portals',
    purpose: 'GDS direct airline ticketing with 3.5% wholesale commission margin on international carriers.',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Manual Portal Credential',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T08:00:00Z',
    requiredNextAction: 'Primary ticketing engine. Automated PNR queue sync and agent console operational.',
    documentationUrl: 'https://b2b.amadeus-portal.com',
    responsibleAdministrator: 'Ticketing Operations Desk'
  },
  {
    id: 'INT-008',
    name: 'WebBeds Global Wholesale Bedbank API',
    category: 'Suppliers & Portals',
    purpose: 'Worldwide wholesale hotel inventory across Dubai, Turkey, Europe, and Asia with instant confirmation.',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Manual Portal Credential',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T07:30:00Z',
    requiredNextAction: 'Wholesale net rates connected. Markups managed dynamically in Package Builder calculator.',
    documentationUrl: 'https://www.webbeds.com',
    responsibleAdministrator: 'Hotel Procurement Manager'
  },
  {
    id: 'INT-009',
    name: 'Tasheer / Nusuk Saudi Umrah Portal',
    category: 'Suppliers & Portals',
    purpose: 'Saudi Ministry of Foreign Affairs electronic Umrah visa filing and authorized hotel allotment vouchers.',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Manual Portal Credential',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T09:00:00Z',
    requiredNextAction: 'Official biometric appointment guidelines and visa filing checklists updated for 2026 season.',
    documentationUrl: 'https://vc.tasheer.com',
    responsibleAdministrator: 'Umrah Operations Lead'
  },

  // Affiliate Networks
  {
    id: 'INT-010',
    name: 'Travelpayouts Affiliate Network (Booking.com, Trip.com, Viator, etc.)',
    category: 'Affiliate Networks',
    purpose: 'Affiliate link generation, cookie attribution, and transparent commission tracking for verified recommendations.',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Authorized',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T08:00:00Z',
    requiredNextAction: '10 active partner programs approved. Level 1 manual links and deep links active across customer pages.',
    documentationUrl: 'https://www.travelpayouts.com',
    responsibleAdministrator: 'Affiliate Growth Lead'
  },

  // Communication & CRM
  {
    id: 'INT-011',
    name: 'Official Business WhatsApp (+92 345 4444167)',
    category: 'Communication & CRM',
    purpose: 'Direct customer inquiry routing, instant quotation cards, and worldwide consular case support.',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Authorized',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T10:30:00Z',
    requiredNextAction: 'Direct wa.me links operational across all packages, flight forms, and emergency case support.',
    responsibleAdministrator: 'Director Urwa Ali'
  },

  // Cloud & AI Infrastructure
  {
    id: 'INT-012',
    name: 'Google Gemini 3.8 Flash AI Intelligence Engine',
    category: 'Cloud & AI Infrastructure',
    purpose: 'Consular visa rules search grounding, ATS CV optimization, speech voice translation, and executive reporting.',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Authorized',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T10:45:00Z',
    requiredNextAction: 'Active on server-side with gemini-3.8-flash and offline linguistic fallback engine.',
    documentationUrl: 'https://ai.google.dev',
    responsibleAdministrator: 'Senior Software Architect'
  },
  {
    id: 'INT-013',
    name: 'Firebase Firestore Persistent Cloud Database',
    category: 'Cloud & AI Infrastructure',
    purpose: 'Persistent multi-role CRM data storage (leads, customers, cases, bookings, invoices, audit logs).',
    connectionStatus: 'Connected and Tested',
    authStatus: 'Authorized',
    permissionStatus: 'Full Operational',
    apiStatus: 'Operational',
    lastSuccessfulTest: '2026-10-09T10:50:00Z',
    requiredNextAction: 'Active with database ID: ai-studio-skybridgetravelt-a0dcbcb6-575a-49dc-9b72-4c66cc6c6888.',
    documentationUrl: 'https://firebase.google.com/docs/firestore',
    responsibleAdministrator: 'Senior Software Architect'
  }
];
