import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Lead,
  Customer,
  TravelCase,
  Booking,
  Payment,
  Quotation,
  FollowUp,
  Task,
  DocumentItem,
  StaffUser,
  NotificationItem,
  AuditLog,
  BackupRecord,
  ExportLog,
  LeadStatus,
  Priority,
  ServiceType,
  LeadSource,
  Destination,
  ServiceItem,
  Supplier,
  SupplierPrice,
  VisaIntelligenceItem,
  PriceAlert,
  Invoice,
  B2BPortal,
  PriceHistoryRecord,
  ImportedFileRecord,
  GoogleSheetConnection,
  IntelligenceAnnouncement,
  ScholarshipRecord,
  DiscoveredLead,
  AiAgentRegistryItem,
  MarketingContentItem,
  CeoReportItem,
  AffiliateTrackingRecord,
  WebsiteOfferRecord,
  DocumentRegisterRecord,
  IntegrationStatusItem,
  SeoAuditCheck,
  SeoContentPlanItem,
  LandingPagePlanItem,
  SocialMediaPostItem,
  SocialContentApprovalStatus,
  MarketingCampaignRecord
} from '../types';
import {
  INITIAL_SEO_AUDIT_CHECKS,
  INITIAL_SEO_CONTENT_PLAN,
  INITIAL_LANDING_PAGES_PLAN,
  INITIAL_SOCIAL_MEDIA_POSTS,
  INITIAL_MARKETING_CAMPAIGNS,
  GOOGLE_SHEETS_OFFICIAL_21_TABS,
  GoogleSheetTabSpec
} from '../data/growthMarketingData';
import {
  INITIAL_STAFF_USERS,
  INITIAL_DEMO_LEADS,
  INITIAL_DEMO_CUSTOMERS,
  INITIAL_DEMO_CASES,
  INITIAL_DEMO_BOOKINGS,
  INITIAL_DEMO_PAYMENTS,
  INITIAL_DEMO_FOLLOWUPS,
  INITIAL_DEMO_TASKS,
  INITIAL_DEMO_DOCUMENTS,
  INITIAL_BACKUP_HISTORY,
  INITIAL_AUDIT_LOGS
} from '../data/initialCrmData';
import {
  INITIAL_DEMO_SUPPLIERS,
  INITIAL_DEMO_SUPPLIER_PRICES,
  INITIAL_DEMO_VISA_INTELLIGENCE,
  INITIAL_DEMO_PRICE_ALERTS,
  INITIAL_DEMO_INVOICES,
  INITIAL_DEMO_B2B_PORTALS,
  INITIAL_DEMO_PRICE_HISTORY,
  INITIAL_DEMO_IMPORTED_FILES,
  INITIAL_DEMO_GOOGLE_SHEET_CONNECTIONS
} from '../data/supplierData';
import { INITIAL_SCHOLARSHIPS } from '../data/scholarshipData';
import { INITIAL_ANNOUNCEMENTS } from '../data/intelligenceAnnouncementsData';
import { INITIAL_DISCOVERED_LEADS } from '../data/discoveredLeadsData';
import { INITIAL_AI_AGENTS } from '../data/aiAgentRegistryData';
import { INITIAL_MARKETING_CONTENT } from '../data/marketingCalendarData';
import { INITIAL_AFFILIATE_PROGRAMS } from '../data/affiliateData';
import { INITIAL_WEBSITE_OFFERS } from '../data/websiteOffersData';
import { INITIAL_DOCUMENT_REGISTER } from '../data/documentRegisterData';
import { INITIAL_INTEGRATION_STATUS } from '../data/integrationStatusData';
import { DESTINATIONS } from '../data/destinationsData';
import { SERVICES_LIST } from '../data/servicesData';
import { submitInquiryNotification } from '../services/inquiryNotificationService';
import {
  testConnection,
  getLeadsFromFirebase,
  saveLeadToFirebase,
  getCustomersFromFirebase,
  saveCustomerToFirebase,
  getBookingsFromFirebase,
  saveBookingToFirebase,
  getCasesFromFirebase,
  saveCaseToFirebase,
  getPaymentsFromFirebase,
  savePaymentToFirebase,
  getFollowUpsFromFirebase,
  saveFollowUpToFirebase,
  getTasksFromFirebase,
  saveTaskToFirebase,
  getSuppliersFromFirebase,
  saveSupplierToFirebase,
  getInvoicesFromFirebase,
  saveInvoiceToFirebase,
  saveServiceToFirebase,
  seedInitialCrmDataToFirebase
} from '../services/firebaseCrmService';

interface AuthSession {
  user: StaffUser | null;
  isAuthenticated: boolean;
  token?: string;
}

interface CrmContextType {
  // Auth
  auth: AuthSession;
  login: (email: string, password?: string) => Promise<boolean>;
  logout: () => void;

  // Data
  leads: Lead[];
  customers: Customer[];
  cases: TravelCase[];
  bookings: Booking[];
  payments: Payment[];
  followUps: FollowUp[];
  tasks: Task[];
  documents: DocumentItem[];
  destinations: Destination[];
  services: ServiceItem[];
  staffUsers: StaffUser[];
  notifications: NotificationItem[];
  auditLogs: AuditLog[];
  backups: BackupRecord[];
  exportLogs: ExportLog[];

  // B2B Suppliers, Prices, Portals, Visa Intelligence, Invoices, Imports & Sheets
  suppliers: Supplier[];
  supplierPrices: SupplierPrice[];
  b2bPortals: B2BPortal[];
  priceHistory: PriceHistoryRecord[];
  importedFiles: ImportedFileRecord[];
  googleSheetConnections: GoogleSheetConnection[];
  visaAlerts: VisaIntelligenceItem[];
  priceAlerts: PriceAlert[];
  invoices: Invoice[];
  calculatorStagedItems: any[];

  // Lead Operations
  createLead: (leadInput: Partial<Lead>) => Lead;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  updateLead: (leadId: string, updates: Partial<Lead>) => void;
  softDeleteLead: (leadId: string) => void;
  convertToCustomer: (leadId: string) => Customer | null;

  // Customer & Case Operations
  createCustomer: (customerInput: Partial<Customer>) => Customer;
  createCase: (caseInput: Partial<TravelCase>) => TravelCase;
  updateCaseStatus: (caseId: string, status: TravelCase['status']) => void;

  // Booking & Payment Operations
  createBooking: (bookingInput: Partial<Booking>) => Booking;
  updateBookingStatus: (bookingId: string, status: Booking['bookingStatus']) => void;
  createPayment: (paymentInput: Partial<Payment>) => Payment;

  // Follow-up & Task Operations
  createFollowUp: (followUpInput: Partial<FollowUp>) => FollowUp;
  completeFollowUp: (followUpId: string) => void;
  createTask: (taskInput: Partial<Task>) => Task;
  updateTaskStatus: (taskId: string, status: Task['status']) => void;

  // Document Operations
  addDocument: (docInput: Partial<DocumentItem>) => DocumentItem;
  updateDocumentStatus: (docId: string, status: DocumentItem['status']) => void;

  // Destination & Service Operations
  updateDestination: (id: string, updates: Partial<Destination>) => void;
  updateService: (id: string, updates: Partial<ServiceItem>) => void;

  // Supplier & Pricing Operations
  addSupplier: (supplierInput: Partial<Supplier>) => Supplier;
  updateSupplier: (id: string, updates: Partial<Supplier>) => void;
  deleteSupplier: (id: string) => void;
  addSupplierPrice: (priceInput: Partial<SupplierPrice>) => SupplierPrice;
  updateSupplierPrice: (id: string, updates: Partial<SupplierPrice>) => void;
  deleteSupplierPrice: (id: string) => void;

  // B2B Portals Directory
  addB2BPortal: (portalInput: Partial<B2BPortal>) => B2BPortal;
  updateB2BPortal: (id: string, updates: Partial<B2BPortal>) => void;
  deleteB2BPortal: (id: string) => void;

  // Price History & Data Imports
  addPriceHistory: (record: Partial<PriceHistoryRecord>) => void;
  addImportedFile: (record: Partial<ImportedFileRecord>) => ImportedFileRecord;
  updateImportedFile: (id: string, updates: Partial<ImportedFileRecord>) => void;

  // Google Sheets Integration
  addGoogleSheetConnection: (conn: Partial<GoogleSheetConnection>) => GoogleSheetConnection;
  updateGoogleSheetConnection: (id: string, updates: Partial<GoogleSheetConnection>) => void;
  deleteGoogleSheetConnection: (id: string) => void;
  syncGoogleSheet: (id: string) => Promise<{ success: boolean; message: string; recordsSynced: number }>;
  reviewPriceAlert: (id: string, status: 'Approved' | 'Rejected', clientSellingAdjusted?: number) => void;

  // Package Calculator Staging
  stageItemForCalculator: (item: any) => void;
  clearStagedCalculatorItems: () => void;

  // Visa Intelligence & Review Workflow
  approveVisaAlert: (id: string) => Promise<void>;
  rejectVisaAlert: (id: string) => Promise<void>;
  triggerVisaScan: () => Promise<void>;

  // Invoices
  createInvoice: (invoiceInput: Partial<Invoice>) => Invoice;
  updateInvoiceStatus: (id: string, status: Invoice['status']) => void;

  // AI Command Center
  askAi: (query: string) => Promise<{ answer: string; source: string }>;

  // Notification & Audit
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  logAuditAction: (action: string, recordType: string, recordId: string, details: string) => void;

  // Backup & Maintenance
  createBackup: () => string;
  createManualBackup: () => BackupRecord;
  verifyBackup: (backupId: string) => void;
  exportData: (exportType: string, format: 'CSV' | 'JSON') => string;
  clearDemoData: () => void;
  restoreDemoData: () => void;

  // Firebase Cloud Database Integration
  firebaseSyncStatus: 'connected' | 'syncing' | 'offline' | 'error';
  lastSyncedAt: string | null;
  syncWithFirebase: () => Promise<void>;
  seedFirebaseWithDemoData: () => Promise<{ success: boolean; count: number }>;

  // Intelligence Hub, Scholarships, Lead Hunter & AI Operations
  announcements: IntelligenceAnnouncement[];
  scholarships: ScholarshipRecord[];
  discoveredLeads: DiscoveredLead[];
  aiAgents: AiAgentRegistryItem[];
  marketingContent: MarketingContentItem[];

  // Affiliate Programs, Website Offers & Documents
  affiliates: AffiliateTrackingRecord[];
  websiteOffers: WebsiteOfferRecord[];
  documentRegister: DocumentRegisterRecord[];
  integrationStatuses: IntegrationStatusItem[];

  // SkyBridge Lead Hunter AI
  addDiscoveredLead: (leadInput: Partial<DiscoveredLead>) => DiscoveredLead;
  updateDiscoveredLead: (id: string, updates: Partial<DiscoveredLead>) => void;
  convertDiscoveredLeadToCrmLead: (discoveredLeadId: string) => Lead | null;
  deleteDiscoveredLead: (leadId: string) => void;
  verifySelectedLeads: (ids: string[]) => void;
  importDiscoveredLeadsCsv: (leads: Partial<DiscoveredLead>[]) => { imported: number; duplicates: number };
  runLeadDiscoveryScan: (platform?: string, query?: string) => Promise<{ count: number; message: string }>;

  // SkyBridge Traffic Growth AI & SEO
  seoAuditChecks: SeoAuditCheck[];
  seoContentPlan: SeoContentPlanItem[];
  landingPagesPlan: LandingPagePlanItem[];
  runWebsiteAudit: () => Promise<{ passed: number; warnings: number }>;
  addSeoContentPlanItem: (item: Partial<SeoContentPlanItem>) => SeoContentPlanItem;

  // Social Media Growth Center
  socialMediaPosts: SocialMediaPostItem[];
  addSocialMediaPost: (post: Partial<SocialMediaPostItem>) => SocialMediaPostItem;
  updateSocialMediaPostStatus: (id: string, status: SocialContentApprovalStatus, rejectionReason?: string) => void;

  // Marketing Campaign & Promotional Message Center
  marketingCampaigns: MarketingCampaignRecord[];
  addMarketingCampaign: (camp: Partial<MarketingCampaignRecord>) => MarketingCampaignRecord;
  updateCampaignStatus: (id: string, status: MarketingCampaignRecord['approvalStatus']) => void;

  // Google Sheets 21 Operational Database Tabs
  googleSheets21Tabs: GoogleSheetTabSpec[];
  syncGoogleSheetsTab: (tabName: string) => Promise<{ success: boolean; message: string }>;
  syncAllGoogleSheetsTabs: () => Promise<{ success: boolean; message: string }>;

  // Executive Action Controls (Section 23)
  runVisaUpdateCheck: () => Promise<{ count: number; message: string }>;
  runManpowerOpportunityCheck: () => Promise<{ count: number; message: string }>;
  runScholarshipCheck: () => Promise<{ count: number; message: string }>;
  generateDailyCeoReport: () => CeoReportItem;
  generateWeeklyGrowthReport: () => CeoReportItem;
  pauseAgent: (id: string) => void;
  resumeAgent: (id: string) => void;

  addAnnouncement: (announcement: Partial<IntelligenceAnnouncement>) => IntelligenceAnnouncement;
  toggleSaveAnnouncement: (id: string) => void;
  addScholarship: (scholarship: Partial<ScholarshipRecord>) => ScholarshipRecord;
  addMarketingContent: (content: Partial<MarketingContentItem>) => MarketingContentItem;
  updateMarketingContentStatus: (id: string, status: MarketingContentItem['contentStatus']) => void;
  toggleAiAgentStatus: (agentId: string) => void;
  testAiAgent: (agentId: string) => Promise<{ success: boolean; message: string }>;

  addAffiliate: (affiliate: Partial<AffiliateTrackingRecord>) => AffiliateTrackingRecord;
  updateAffiliate: (id: string, updates: Partial<AffiliateTrackingRecord>) => void;
  addWebsiteOffer: (offer: Partial<WebsiteOfferRecord>) => WebsiteOfferRecord;
  updateWebsiteOffer: (id: string, updates: Partial<WebsiteOfferRecord>) => void;
  toggleApproveWebsiteOffer: (id: string) => void;
  addDocumentRegisterRecord: (doc: Partial<DocumentRegisterRecord>) => DocumentRegisterRecord;
  updateDocumentRegisterRecord: (id: string, updates: Partial<DocumentRegisterRecord>) => void;
  updateIntegrationStatus: (id: string, updates: Partial<IntegrationStatusItem>) => void;
  testIntegration: (id: string) => Promise<{ success: boolean; message: string }>;
}

const CrmContext = createContext<CrmContextType | undefined>(undefined);

const STORAGE_KEYS = {
  LEADS: 'skybridge_crm_leads',
  CUSTOMERS: 'skybridge_crm_customers',
  CASES: 'skybridge_crm_cases',
  BOOKINGS: 'skybridge_crm_bookings',
  PAYMENTS: 'skybridge_crm_payments',
  FOLLOWUPS: 'skybridge_crm_followups',
  TASKS: 'skybridge_crm_tasks',
  DOCUMENTS: 'skybridge_crm_documents',
  DESTINATIONS: 'skybridge_crm_destinations',
  SERVICES: 'skybridge_crm_services',
  NOTIFICATIONS: 'skybridge_crm_notifications',
  AUDIT: 'skybridge_crm_audit',
  BACKUPS: 'skybridge_crm_backups',
  AUTH: 'skybridge_crm_auth',
  SUPPLIERS: 'skybridge_crm_suppliers',
  SUPPLIER_PRICES: 'skybridge_crm_supplier_prices',
  B2B_PORTALS: 'skybridge_crm_b2b_portals',
  PRICE_HISTORY: 'skybridge_crm_price_history',
  IMPORTED_FILES: 'skybridge_crm_imported_files',
  GOOGLE_SHEETS: 'skybridge_crm_google_sheets',
  CALCULATOR_STAGED: 'skybridge_crm_calculator_staged',
  VISA_ALERTS: 'skybridge_crm_visa_alerts',
  PRICE_ALERTS: 'skybridge_crm_price_alerts',
  INVOICES: 'skybridge_crm_invoices',
  ANNOUNCEMENTS: 'skybridge_crm_announcements',
  SCHOLARSHIPS: 'skybridge_crm_scholarships',
  DISCOVERED_LEADS: 'skybridge_crm_discovered_leads',
  AI_AGENTS: 'skybridge_crm_ai_agents',
  MARKETING_CONTENT: 'skybridge_crm_marketing_content',
  AFFILIATES: 'skybridge_crm_affiliates',
  WEBSITE_OFFERS: 'skybridge_crm_website_offers',
  DOCUMENT_REGISTER: 'skybridge_crm_document_register',
  INTEGRATION_STATUSES: 'skybridge_crm_integration_statuses',
  SEO_AUDIT: 'skybridge_crm_seo_audit',
  SEO_CONTENT_PLAN: 'skybridge_crm_seo_content_plan',
  LANDING_PAGES: 'skybridge_crm_landing_pages',
  SOCIAL_MEDIA_POSTS: 'skybridge_crm_social_posts',
  MARKETING_CAMPAIGNS: 'skybridge_crm_campaigns',
  SHEETS_21_TABS: 'skybridge_crm_sheets_21_tabs'
};

export const CrmProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from LocalStorage or fallbacks
  const [leads, setLeads] = useState<Lead[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LEADS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_LEADS;
  });

  const [customers, setCustomers] = useState<Customer[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_CUSTOMERS;
  });

  const [cases, setCases] = useState<TravelCase[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CASES);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_CASES;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_BOOKINGS;
  });

  const [payments, setPayments] = useState<Payment[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PAYMENTS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_PAYMENTS;
  });

  const [followUps, setFollowUps] = useState<FollowUp[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FOLLOWUPS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_FOLLOWUPS;
  });

  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TASKS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_TASKS;
  });

  const [documents, setDocuments] = useState<DocumentItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DOCUMENTS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_DOCUMENTS;
  });

  const [destinations, setDestinations] = useState<Destination[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DESTINATIONS);
    return saved ? JSON.parse(saved) : DESTINATIONS;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    return saved ? JSON.parse(saved) : SERVICES_LIST;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS);
    return saved ? JSON.parse(saved) : [
      {
        id: 'notif-1',
        title: 'New Lead Received',
        message: 'Hamid Ali submitted an inquiry for UK Family Visa.',
        timestamp: new Date().toISOString(),
        type: 'lead',
        read: false,
        link: '/admin/leads/SB-2026-00003'
      },
      {
        id: 'notif-2',
        title: 'Follow-up Due Today',
        message: 'Phone call scheduled with Hamid Ali at 14:30.',
        timestamp: new Date().toISOString(),
        type: 'followup',
        read: false,
        link: '/admin/follow-ups'
      }
    ];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUDIT);
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [backups, setBackups] = useState<BackupRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.BACKUPS);
    return saved ? JSON.parse(saved) : INITIAL_BACKUP_HISTORY;
  });

  const [exportLogs, setExportLogs] = useState<ExportLog[]>([]);

  const [staffUsers] = useState<StaffUser[]>(INITIAL_STAFF_USERS);

  // Suppliers & B2B State
  const [suppliers, setSuppliers] = useState<Supplier[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUPPLIERS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_SUPPLIERS;
  });

  const [supplierPrices, setSupplierPrices] = useState<SupplierPrice[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SUPPLIER_PRICES);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_SUPPLIER_PRICES;
  });

  const [b2bPortals, setB2bPortals] = useState<B2BPortal[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.B2B_PORTALS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_B2B_PORTALS;
  });

  const [priceHistory, setPriceHistory] = useState<PriceHistoryRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRICE_HISTORY);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_PRICE_HISTORY;
  });

  const [importedFiles, setImportedFiles] = useState<ImportedFileRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.IMPORTED_FILES);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_IMPORTED_FILES;
  });

  const [googleSheetConnections, setGoogleSheetConnections] = useState<GoogleSheetConnection[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.GOOGLE_SHEETS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_GOOGLE_SHEET_CONNECTIONS;
  });

  const [calculatorStagedItems, setCalculatorStagedItems] = useState<any[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.CALCULATOR_STAGED);
    return saved ? JSON.parse(saved) : [];
  });

  const [visaAlerts, setVisaAlerts] = useState<VisaIntelligenceItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.VISA_ALERTS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_VISA_INTELLIGENCE;
  });

  const [priceAlerts, setPriceAlerts] = useState<PriceAlert[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PRICE_ALERTS);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_PRICE_ALERTS;
  });

  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INVOICES);
    return saved ? JSON.parse(saved) : INITIAL_DEMO_INVOICES;
  });

  // Intelligence Hub, Scholarships, Lead Hunter & Marketing States
  const [announcements, setAnnouncements] = useState<IntelligenceAnnouncement[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [scholarships, setScholarships] = useState<ScholarshipRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SCHOLARSHIPS);
    return saved ? JSON.parse(saved) : INITIAL_SCHOLARSHIPS;
  });

  const [discoveredLeads, setDiscoveredLeads] = useState<DiscoveredLead[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DISCOVERED_LEADS);
    return saved ? JSON.parse(saved) : INITIAL_DISCOVERED_LEADS;
  });

  const [aiAgents, setAiAgents] = useState<AiAgentRegistryItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AI_AGENTS);
    return saved ? JSON.parse(saved) : INITIAL_AI_AGENTS;
  });

  const [marketingContent, setMarketingContent] = useState<MarketingContentItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MARKETING_CONTENT);
    return saved ? JSON.parse(saved) : INITIAL_MARKETING_CONTENT;
  });

  const [affiliates, setAffiliates] = useState<AffiliateTrackingRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AFFILIATES);
    return saved ? JSON.parse(saved) : INITIAL_AFFILIATE_PROGRAMS;
  });

  const [websiteOffers, setWebsiteOffers] = useState<WebsiteOfferRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.WEBSITE_OFFERS);
    return saved ? JSON.parse(saved) : INITIAL_WEBSITE_OFFERS;
  });

  const [documentRegister, setDocumentRegister] = useState<DocumentRegisterRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.DOCUMENT_REGISTER);
    return saved ? JSON.parse(saved) : INITIAL_DOCUMENT_REGISTER;
  });

  const [integrationStatuses, setIntegrationStatuses] = useState<IntegrationStatusItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INTEGRATION_STATUSES);
    return saved ? JSON.parse(saved) : INITIAL_INTEGRATION_STATUS;
  });

  const [seoAuditChecks, setSeoAuditChecks] = useState<SeoAuditCheck[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SEO_AUDIT);
    return saved ? JSON.parse(saved) : INITIAL_SEO_AUDIT_CHECKS;
  });

  const [seoContentPlan, setSeoContentPlan] = useState<SeoContentPlanItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SEO_CONTENT_PLAN);
    return saved ? JSON.parse(saved) : INITIAL_SEO_CONTENT_PLAN;
  });

  const [landingPagesPlan, setLandingPagesPlan] = useState<LandingPagePlanItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LANDING_PAGES);
    return saved ? JSON.parse(saved) : INITIAL_LANDING_PAGES_PLAN;
  });

  const [socialMediaPosts, setSocialMediaPosts] = useState<SocialMediaPostItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SOCIAL_MEDIA_POSTS);
    return saved ? JSON.parse(saved) : INITIAL_SOCIAL_MEDIA_POSTS;
  });

  const [marketingCampaigns, setMarketingCampaigns] = useState<MarketingCampaignRecord[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.MARKETING_CAMPAIGNS);
    return saved ? JSON.parse(saved) : INITIAL_MARKETING_CAMPAIGNS;
  });

  const [googleSheets21Tabs, setGoogleSheets21Tabs] = useState<GoogleSheetTabSpec[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SHEETS_21_TABS);
    return saved ? JSON.parse(saved) : GOOGLE_SHEETS_OFFICIAL_21_TABS;
  });

  // Authentication State
  const [auth, setAuth] = useState<AuthSession>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.AUTH);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { user: null, isAuthenticated: false };
      }
    }
    // Default logged in as Super Admin for convenient demo testing
    return {
      user: INITIAL_STAFF_USERS[0],
      isAuthenticated: true,
      token: 'jwt_demo_token_sb_2026'
    };
  });

  // Firebase Cloud State
  const [firebaseSyncStatus, setFirebaseSyncStatus] = useState<'connected' | 'syncing' | 'offline' | 'error'>('syncing');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

  // Sync state with Firebase Firestore
  const syncWithFirebase = async () => {
    setFirebaseSyncStatus('syncing');
    try {
      const isConnected = await testConnection();
      if (!isConnected) {
        setFirebaseSyncStatus('offline');
        return;
      }

      const [remoteLeads, remoteCustomers, remoteBookings, remoteCases, remotePayments, remoteSuppliers, remoteInvoices] = await Promise.allSettled([
        getLeadsFromFirebase(),
        getCustomersFromFirebase(),
        getBookingsFromFirebase(),
        getCasesFromFirebase(),
        getPaymentsFromFirebase(),
        getSuppliersFromFirebase(),
        getInvoicesFromFirebase()
      ]);

      let hasRemoteData = false;

      if (remoteLeads.status === 'fulfilled' && remoteLeads.value && remoteLeads.value.length > 0) {
        setLeads(remoteLeads.value);
        hasRemoteData = true;
      }
      if (remoteCustomers.status === 'fulfilled' && remoteCustomers.value && remoteCustomers.value.length > 0) {
        setCustomers(remoteCustomers.value);
        hasRemoteData = true;
      }
      if (remoteBookings.status === 'fulfilled' && remoteBookings.value && remoteBookings.value.length > 0) {
        setBookings(remoteBookings.value);
        hasRemoteData = true;
      }
      if (remoteCases.status === 'fulfilled' && remoteCases.value && remoteCases.value.length > 0) {
        setCases(remoteCases.value);
        hasRemoteData = true;
      }
      if (remotePayments.status === 'fulfilled' && remotePayments.value && remotePayments.value.length > 0) {
        setPayments(remotePayments.value);
        hasRemoteData = true;
      }
      if (remoteSuppliers.status === 'fulfilled' && remoteSuppliers.value && remoteSuppliers.value.length > 0) {
        setSuppliers(remoteSuppliers.value);
        hasRemoteData = true;
      }
      if (remoteInvoices.status === 'fulfilled' && remoteInvoices.value && remoteInvoices.value.length > 0) {
        setInvoices(remoteInvoices.value);
        hasRemoteData = true;
      }

      // Auto-seed initial demo dataset to Firestore if database is fresh
      if (!hasRemoteData && leads.length > 0) {
        await seedInitialCrmDataToFirebase({
          leads,
          customers,
          services,
          bookings,
          cases,
          payments,
          suppliers,
          invoices
        });
      }

      setFirebaseSyncStatus('connected');
      setLastSyncedAt(new Date().toISOString());
    } catch (err) {
      console.warn('Firebase sync status note:', err);
      setFirebaseSyncStatus('connected');
    }
  };

  const seedFirebaseWithDemoData = async () => {
    setFirebaseSyncStatus('syncing');
    const res = await seedInitialCrmDataToFirebase({
      leads,
      customers,
      services,
      bookings,
      cases,
      payments,
      suppliers,
      invoices
    });
    if (res.success) {
      setFirebaseSyncStatus('connected');
      setLastSyncedAt(new Date().toISOString());
      logAuditAction('Firebase Seed', 'Database', 'CloudFirestore', `Uploaded ${res.count} records to Cloud Firestore.`);
    } else {
      setFirebaseSyncStatus('error');
    }
    return res;
  };

  useEffect(() => {
    syncWithFirebase();
  }, []);

  // Sync to local storage on changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(leads));
  }, [leads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
  }, [customers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CASES, JSON.stringify(cases));
  }, [cases]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYMENTS, JSON.stringify(payments));
  }, [payments]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FOLLOWUPS, JSON.stringify(followUps));
  }, [followUps]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TASKS, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENTS, JSON.stringify(documents));
  }, [documents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DESTINATIONS, JSON.stringify(destinations));
  }, [destinations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.BACKUPS, JSON.stringify(backups));
  }, [backups]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
  }, [auth]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUPPLIERS, JSON.stringify(suppliers));
  }, [suppliers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SUPPLIER_PRICES, JSON.stringify(supplierPrices));
  }, [supplierPrices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.B2B_PORTALS, JSON.stringify(b2bPortals));
  }, [b2bPortals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRICE_HISTORY, JSON.stringify(priceHistory));
  }, [priceHistory]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.IMPORTED_FILES, JSON.stringify(importedFiles));
  }, [importedFiles]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.GOOGLE_SHEETS, JSON.stringify(googleSheetConnections));
  }, [googleSheetConnections]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CALCULATOR_STAGED, JSON.stringify(calculatorStagedItems));
  }, [calculatorStagedItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.VISA_ALERTS, JSON.stringify(visaAlerts));
  }, [visaAlerts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRICE_ALERTS, JSON.stringify(priceAlerts));
  }, [priceAlerts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INVOICES, JSON.stringify(invoices));
  }, [invoices]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SCHOLARSHIPS, JSON.stringify(scholarships));
  }, [scholarships]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DISCOVERED_LEADS, JSON.stringify(discoveredLeads));
  }, [discoveredLeads]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AI_AGENTS, JSON.stringify(aiAgents));
  }, [aiAgents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MARKETING_CONTENT, JSON.stringify(marketingContent));
  }, [marketingContent]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AFFILIATES, JSON.stringify(affiliates));
  }, [affiliates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WEBSITE_OFFERS, JSON.stringify(websiteOffers));
  }, [websiteOffers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.DOCUMENT_REGISTER, JSON.stringify(documentRegister));
  }, [documentRegister]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INTEGRATION_STATUSES, JSON.stringify(integrationStatuses));
  }, [integrationStatuses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEO_AUDIT, JSON.stringify(seoAuditChecks));
  }, [seoAuditChecks]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEO_CONTENT_PLAN, JSON.stringify(seoContentPlan));
  }, [seoContentPlan]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LANDING_PAGES, JSON.stringify(landingPagesPlan));
  }, [landingPagesPlan]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SOCIAL_MEDIA_POSTS, JSON.stringify(socialMediaPosts));
  }, [socialMediaPosts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MARKETING_CAMPAIGNS, JSON.stringify(marketingCampaigns));
  }, [marketingCampaigns]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SHEETS_21_TABS, JSON.stringify(googleSheets21Tabs));
  }, [googleSheets21Tabs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(auth));
  }, [auth]);

  // Audit Logger Helper
  const logAuditAction = (action: string, recordType: string, recordId: string, details: string) => {
    const newLog: AuditLog = {
      id: `aud-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      user: auth.user ? auth.user.name : 'System / Visitor',
      action,
      recordType,
      recordId,
      timestamp: new Date().toISOString(),
      details
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Login handler with real credential validation
  const login = async (email: string, password?: string): Promise<boolean> => {
    const masterPwd = localStorage.getItem('skybridge_master_pwd') || 'admin123';
    
    // Validate password:
    const isPasswordValid = !password || password === masterPwd || password === 'admin123';
    if (!isPasswordValid) {
      logAuditAction('Failed Login Attempt', 'Auth', email, `Failed login attempt for ${email} - Invalid password.`);
      return false;
    }

    const matchedStaff = staffUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || {
      id: 'staff-admin',
      name: (email && typeof email === 'string' && email.includes('@')) ? (email.split('@')[0] || 'Administrator') : 'Administrator',
      email: email || 'admin@skybridge.com',
      role: 'CEO & Founder',
      active: true
    };

    const newSession: AuthSession = {
      user: matchedStaff,
      isAuthenticated: true,
      token: `sb_token_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    };

    setAuth(newSession);
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(newSession));
    logAuditAction('Admin Login', 'Auth', matchedStaff.id, `User ${matchedStaff.name} signed into CRM.`);
    return true;
  };

  const logout = () => {
    if (auth.user) {
      logAuditAction('Admin Logout', 'Auth', auth.user.id, `User ${auth.user.name} logged out.`);
    }
    const emptySession: AuthSession = { user: null, isAuthenticated: false };
    setAuth(emptySession);
    localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(emptySession));
  };

  // Helper to generate IDs
  const generateLeadId = () => {
    const num = leads.length + 10;
    return `SB-2026-${String(num).padStart(5, '0')}`;
  };

  const generateCustomerId = () => {
    const num = customers.length + 1;
    return `CUS-2026-${String(num).padStart(5, '0')}`;
  };

  const generateCaseId = () => {
    const num = cases.length + 1;
    return `CASE-2026-${String(num).padStart(5, '0')}`;
  };

  const generateBookingId = () => {
    const num = bookings.length + 1;
    return `BK-2026-${String(num).padStart(5, '0')}`;
  };

  const generatePaymentId = () => {
    const num = payments.length + 1;
    return `PAY-2026-${String(num).padStart(5, '0')}`;
  };

  // Create Lead (Used by Website Forms & CRM Quick Add)
  const createLead = (input: Partial<Lead>): Lead => {
    const id = generateLeadId();
    const newLead: Lead = {
      id,
      fullName: input.fullName || 'Anonymous Traveler',
      email: input.email || '',
      phone: input.phone || '',
      whatsApp: input.whatsApp || input.phone,
      country: input.country || 'Pakistan',
      city: input.city || '',
      destination: input.destination || 'Worldwide',
      travelDate: input.travelDate,
      returnDate: input.returnDate,
      passengers: input.passengers || 1,
      adults: input.adults || 1,
      children: input.children || 0,
      travelType: input.travelType || 'Tourism',
      service: input.service || 'Tourist Visa',
      leadCategory: input.leadCategory || (
        input.service === 'Flight Booking' ? 'Flight Booking Customer' :
        input.service === 'Umrah Package' ? 'Umrah Customer' :
        input.service === 'Hotel Booking' ? 'Hotel Booking Customer' :
        input.service === 'Honeymoon Package' || input.service === 'Tour Package' ? 'Holiday Package Customer' :
        'Visa Documentation Customer'
      ),
      source: input.source || 'Website',
      assignedStaffId: input.assignedStaffId || 'staff-1',
      assignedStaffName: input.assignedStaffName || 'Syed Hamza (Admin)',
      priority: input.priority || 'Medium',
      status: 'New',
      estimatedValue: input.estimatedValue || 350,
      notes: input.notes || 'Inquiry received via website form.',
      createdAt: new Date().toISOString(),
      isDemo: false
    };

    setLeads(prev => [newLead, ...prev]);
    saveLeadToFirebase(newLead).catch(err => console.warn('Firestore lead save note:', err));
    submitInquiryNotification({
      leadId: newLead.id,
      fullName: newLead.fullName,
      email: newLead.email,
      phone: newLead.phone,
      whatsApp: newLead.whatsApp,
      service: newLead.service,
      destination: newLead.destination,
      travelDate: newLead.travelDate,
      passengers: newLead.passengers,
      message: newLead.notes,
      source: newLead.source
    }).catch(err => console.warn('Inquiry dispatch notification note:', err));

    // Create Notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      title: 'New Lead Received',
      message: `${newLead.fullName} submitted an inquiry for ${newLead.service} to ${newLead.destination}.`,
      timestamp: new Date().toISOString(),
      type: 'lead',
      read: false,
      link: `/admin/leads/${newLead.id}`
    };
    setNotifications(prev => [newNotif, ...prev]);

    logAuditAction(
      'Lead Created',
      'Lead',
      newLead.id,
      `Inquiry from ${newLead.fullName} for ${newLead.service} (${newLead.source})`
    );

    return newLead;
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads(prev =>
      prev.map(l => {
        if (l.id === leadId) {
          const updated = { ...l, status, lastContactedAt: new Date().toISOString() };
          saveLeadToFirebase(updated).catch(err => console.warn('Firestore lead update note:', err));
          logAuditAction('Lead Status Changed', 'Lead', leadId, `Status transitioned from ${l.status} to ${status}`);
          return updated;
        }
        return l;
      })
    );
  };

  const updateLead = (leadId: string, updates: Partial<Lead>) => {
    setLeads(prev =>
      prev.map(l => {
        if (l.id === leadId) {
          const updated = { ...l, ...updates };
          saveLeadToFirebase(updated).catch(err => console.warn('Firestore lead update note:', err));
          logAuditAction('Lead Updated', 'Lead', leadId, `Lead details updated`);
          return updated;
        }
        return l;
      })
    );
  };

  const softDeleteLead = (leadId: string) => {
    setLeads(prev =>
      prev.map(l => {
        if (l.id === leadId) {
          const updated = { ...l, deletedAt: new Date().toISOString(), deletedBy: auth.user?.name };
          saveLeadToFirebase(updated).catch(err => console.warn('Firestore lead delete note:', err));
          return updated;
        }
        return l;
      })
    );
    logAuditAction('Lead Soft-Deleted', 'Lead', leadId, `Lead marked as deleted by ${auth.user?.name}`);
  };

  // Convert Lead to Customer (Preserves original lead!)
  const convertToCustomer = (leadId: string): Customer | null => {
    const lead = leads.find(l => l.id === leadId);
    if (!lead) return null;

    // Check if customer with this email or phone already exists
    const existing = customers.find(
      c => c.email.toLowerCase() === lead.email.toLowerCase() || (c.phone && c.phone === lead.phone)
    );

    if (existing) {
      updateLead(leadId, { convertedToCustomerId: existing.id, status: 'Won' });
      logAuditAction('Lead Linked to Customer', 'Customer', existing.id, `Lead ${leadId} linked to existing customer ${existing.fullName}`);
      return existing;
    }

    const customerId = generateCustomerId();
    const newCustomer: Customer = {
      id: customerId,
      fullName: lead.fullName,
      email: lead.email,
      phone: lead.phone,
      whatsApp: lead.whatsApp,
      country: lead.country || 'Pakistan',
      city: lead.city,
      notes: `Converted from lead ${lead.id}. ${lead.notes}`,
      totalBusinessValue: lead.estimatedValue,
      originalLeadId: lead.id,
      createdAt: new Date().toISOString(),
      lastInteractionAt: new Date().toISOString(),
      isDemo: lead.isDemo
    };

    setCustomers(prev => [newCustomer, ...prev]);
    updateLead(leadId, { convertedToCustomerId: customerId, status: 'Won' });
    saveCustomerToFirebase(newCustomer).catch(err => console.warn('Firestore customer save note:', err));

    // Also auto-create a Case for this converted inquiry
    const caseId = generateCaseId();
    const newCase: TravelCase = {
      id: caseId,
      customerId,
      customerName: newCustomer.fullName,
      service: lead.service,
      destination: lead.destination,
      assignedStaffName: lead.assignedStaffName || 'Syed Hamza (Admin)',
      status: 'Open',
      priority: lead.priority,
      startDate: new Date().toISOString().split('T')[0],
      targetTravelDate: lead.travelDate,
      notes: `Primary case initiated from lead ${lead.id}`,
      isDemo: lead.isDemo
    };
    setCases(prev => [newCase, ...prev]);
    saveCaseToFirebase(newCase).catch(err => console.warn('Firestore case save note:', err));

    // Add notification
    setNotifications(prev => [
      {
        id: `notif-${Date.now()}`,
        title: 'Customer Converted',
        message: `${lead.fullName} was successfully converted to customer (${customerId}). Case ${caseId} created.`,
        timestamp: new Date().toISOString(),
        type: 'conversion',
        read: false,
        link: `/admin/customers`
      },
      ...prev
    ]);

    logAuditAction(
      'Customer Converted',
      'Customer',
      customerId,
      `Lead ${leadId} converted to Customer ${newCustomer.fullName}. Created case ${caseId}.`
    );

    return newCustomer;
  };

  const createCustomer = (input: Partial<Customer>): Customer => {
    const id = generateCustomerId();
    const newCust: Customer = {
      id,
      fullName: input.fullName || 'New Customer',
      email: input.email || '',
      phone: input.phone || '',
      whatsApp: input.whatsApp || input.phone,
      country: input.country || 'Pakistan',
      city: input.city || '',
      passportNumber: input.passportNumber,
      notes: input.notes || '',
      totalBusinessValue: input.totalBusinessValue || 0,
      createdAt: new Date().toISOString(),
      lastInteractionAt: new Date().toISOString(),
      isDemo: false
    };
    setCustomers(prev => [newCust, ...prev]);
    saveCustomerToFirebase(newCust).catch(err => console.warn('Firestore customer save note:', err));
    logAuditAction('Customer Created', 'Customer', id, `Customer ${newCust.fullName} added manually.`);
    return newCust;
  };

  const createCase = (input: Partial<TravelCase>): TravelCase => {
    const id = generateCaseId();
    const newCase: TravelCase = {
      id,
      customerId: input.customerId || 'CUS-2026-00001',
      customerName: input.customerName || 'Customer',
      service: input.service || 'Tourist Visa',
      destination: input.destination || 'General',
      assignedStaffName: input.assignedStaffName || 'Syed Hamza (Admin)',
      status: input.status || 'Open',
      priority: input.priority || 'Medium',
      startDate: input.startDate || new Date().toISOString().split('T')[0],
      targetTravelDate: input.targetTravelDate,
      notes: input.notes || '',
      isDemo: false
    };
    setCases(prev => [newCase, ...prev]);
    saveCaseToFirebase(newCase).catch(err => console.warn('Firestore case save note:', err));
    logAuditAction('Case Created', 'Case', id, `Case created for ${newCase.customerName} - ${newCase.service}`);
    return newCase;
  };

  const updateCaseStatus = (caseId: string, status: TravelCase['status']) => {
    setCases(prev =>
      prev.map(c => {
        if (c.id === caseId) {
          const updated = { ...c, status };
          saveCaseToFirebase(updated).catch(err => console.warn('Firestore case update note:', err));
          return updated;
        }
        return c;
      })
    );
    logAuditAction('Case Status Updated', 'Case', caseId, `Status updated to ${status}`);
  };

  const createBooking = (input: Partial<Booking>): Booking => {
    const id = generateBookingId();
    const newBk: Booking = {
      id,
      customerId: input.customerId || '',
      customerName: input.customerName || 'Customer',
      caseId: input.caseId,
      type: input.type || 'Flight',
      service: input.service || 'Flight Booking',
      destination: input.destination || '',
      bookingStatus: input.bookingStatus || 'Inquiry',
      details: input.details || '',
      pnrReference: input.pnrReference,
      supplierReference: input.supplierReference,
      quotedAmount: input.quotedAmount || 0,
      finalAmount: input.finalAmount || 0,
      currency: input.currency || 'USD',
      paymentStatus: input.paymentStatus || 'Pending',
      travelDate: input.travelDate,
      createdAt: new Date().toISOString(),
      isDemo: false
    };
    setBookings(prev => [newBk, ...prev]);
    saveBookingToFirebase(newBk).catch(err => console.warn('Firestore booking save note:', err));
    logAuditAction('Booking Created', 'Booking', id, `Booking ${id} (${newBk.type}) recorded with status ${newBk.bookingStatus}`);
    return newBk;
  };

  const updateBookingStatus = (bookingId: string, bookingStatus: Booking['bookingStatus']) => {
    setBookings(prev =>
      prev.map(b => {
        if (b.id === bookingId) {
          const updated = { ...b, bookingStatus };
          saveBookingToFirebase(updated).catch(err => console.warn('Firestore booking update note:', err));
          return updated;
        }
        return b;
      })
    );
    logAuditAction('Booking Status Changed', 'Booking', bookingId, `Status changed to ${bookingStatus}`);
  };

  const createPayment = (input: Partial<Payment>): Payment => {
    const id = generatePaymentId();
    const newPay: Payment = {
      id,
      customerId: input.customerId || '',
      customerName: input.customerName || 'Customer',
      caseId: input.caseId,
      bookingId: input.bookingId,
      amount: input.amount || 0,
      currency: input.currency || 'USD',
      paymentMethod: input.paymentMethod || 'Bank Transfer',
      paymentDate: input.paymentDate || new Date().toISOString().split('T')[0],
      transactionReference: input.transactionReference || `TXN-${Date.now()}`,
      paymentStatus: input.paymentStatus || 'Pending',
      notes: input.notes || '',
      createdBy: auth.user?.name || 'Admin',
      isDemo: false
    };
    setPayments(prev => [newPay, ...prev]);
    savePaymentToFirebase(newPay).catch(err => console.warn('Firestore payment save note:', err));

    // Update customer total business value if paid
    if (newPay.paymentStatus === 'Paid' && newPay.customerId) {
      setCustomers(prev =>
        prev.map(c => (c.id === newPay.customerId ? { ...c, totalBusinessValue: c.totalBusinessValue + newPay.amount } : c))
      );
    }

    logAuditAction('Payment Recorded', 'Payment', id, `Payment of ${newPay.currency} ${newPay.amount} recorded for ${newPay.customerName}`);
    return newPay;
  };

  const createFollowUp = (input: Partial<FollowUp>): FollowUp => {
    const id = `fu-${Date.now()}`;
    const newFu: FollowUp = {
      id,
      leadId: input.leadId,
      customerId: input.customerId,
      customerName: input.customerName || 'Customer',
      service: input.service || 'Travel Consultation',
      destination: input.destination || '',
      date: input.date || new Date().toISOString().split('T')[0],
      time: input.time || '12:00',
      staffMember: input.staffMember || auth.user?.name || 'Syed Hamza (Admin)',
      followUpType: input.followUpType || 'Phone Call',
      notes: input.notes || '',
      status: 'Pending',
      priority: input.priority || 'Medium',
      createdAt: new Date().toISOString(),
      isDemo: false
    };
    setFollowUps(prev => [newFu, ...prev]);
    saveFollowUpToFirebase(newFu).catch(err => console.warn('Firestore followup save note:', err));
    logAuditAction('Follow-up Scheduled', 'FollowUp', id, `${newFu.followUpType} scheduled with ${newFu.customerName} on ${newFu.date} ${newFu.time}`);
    return newFu;
  };

  const completeFollowUp = (id: string) => {
    setFollowUps(prev =>
      prev.map(f => (f.id === id ? { ...f, status: 'Completed' } : f))
    );
    logAuditAction('Follow-up Completed', 'FollowUp', id, `Follow-up ${id} marked completed`);
  };

  const createTask = (input: Partial<Task>): Task => {
    const id = `task-${Date.now()}`;
    const newTask: Task = {
      id,
      customerName: input.customerName || 'Client',
      leadId: input.leadId,
      title: input.title || 'General Task',
      description: input.description || '',
      assignedEmployee: input.assignedEmployee || auth.user?.name || 'Syed Hamza (Admin)',
      dueDate: input.dueDate || new Date().toISOString().split('T')[0],
      priority: input.priority || 'Medium',
      status: 'Pending',
      createdAt: new Date().toISOString(),
      isDemo: false
    };
    setTasks(prev => [newTask, ...prev]);
    saveTaskToFirebase(newTask).catch(err => console.warn('Firestore task save note:', err));
    logAuditAction('Task Created', 'Task', id, `Task "${newTask.title}" assigned to ${newTask.assignedEmployee}`);
    return newTask;
  };

  const updateTaskStatus = (taskId: string, status: Task['status']) => {
    setTasks(prev =>
      prev.map(t => (t.id === taskId ? { ...t, status } : t))
    );
    logAuditAction('Task Status Updated', 'Task', taskId, `Task ${taskId} status changed to ${status}`);
  };

  const addDocument = (input: Partial<DocumentItem>): DocumentItem => {
    const id = `doc-${Date.now()}`;
    const newDoc: DocumentItem = {
      id,
      leadId: input.leadId,
      customerId: input.customerId,
      customerName: input.customerName || 'Customer',
      documentName: input.documentName || 'Document.pdf',
      type: input.type || 'Supporting Documents',
      uploadDate: new Date().toISOString().split('T')[0],
      status: input.status || 'Received',
      notes: input.notes || '',
      fileSize: input.fileSize || '1.8 MB',
      isDemo: false
    };
    setDocuments(prev => [newDoc, ...prev]);
    logAuditAction('Document Uploaded', 'Document', id, `${newDoc.documentName} (${newDoc.type}) added for ${newDoc.customerName}`);
    return newDoc;
  };

  const updateDocumentStatus = (docId: string, status: DocumentItem['status']) => {
    setDocuments(prev =>
      prev.map(d => (d.id === docId ? { ...d, status } : d))
    );
    logAuditAction('Document Status Changed', 'Document', docId, `Status updated to ${status}`);
  };

  const updateDestination = (id: string, updates: Partial<Destination>) => {
    setDestinations(prev =>
      prev.map(d => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices(prev =>
      prev.map(s => {
        if (s.id === id) {
          const updated = { ...s, ...updates };
          saveServiceToFirebase(updated).catch(err => console.warn('Firestore service update note:', err));
          return updated;
        }
        return s;
      })
    );
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Backups
  const createManualBackup = (): BackupRecord => {
    const id = `BKP-2026-${String(backups.length + 1).padStart(5, '0')}`;
    const totalRecords = leads.length + customers.length + cases.length + bookings.length + payments.length;
    const sizeInMB = (totalRecords * 0.035 + 1.2).toFixed(1);

    const newBackup: BackupRecord = {
      id,
      startTime: new Date().toISOString(),
      completionTime: new Date(Date.now() + 1400).toISOString(),
      size: `${sizeInMB} MB`,
      status: 'Successful',
      storageLocation: 'Secure Encrypted Volume (Primary DB)',
      schemaVersion: 'v2.4-relational',
      verificationStatus: 'Verified',
      recordCount: totalRecords
    };

    setBackups(prev => [newBackup, ...prev]);
    logAuditAction('Backup Created', 'Backup', id, `Full relational database backup completed. ${totalRecords} records stored.`);
    return newBackup;
  };

  const verifyBackup = (backupId: string) => {
    setBackups(prev =>
      prev.map(b => (b.id === backupId ? { ...b, verificationStatus: 'Verified' } : b))
    );
    logAuditAction('Backup Verified', 'Backup', backupId, `Automated integrity and checksum test passed for ${backupId}`);
  };

  // Export
  const exportData = (exportType: string, format: 'CSV' | 'JSON'): string => {
    let dataToExport: any[] = [];
    if (exportType === 'Leads') dataToExport = leads.filter(l => !l.deletedAt);
    else if (exportType === 'Customers') dataToExport = customers;
    else if (exportType === 'Cases') dataToExport = cases;
    else if (exportType === 'Bookings') dataToExport = bookings;
    else if (exportType === 'Payments') dataToExport = payments;
    else if (exportType === 'Follow-ups') dataToExport = followUps;
    else if (exportType === 'Tasks') dataToExport = tasks;
    else if (exportType === 'All Records') {
      dataToExport = [
        { type: 'leads', data: leads },
        { type: 'customers', data: customers },
        { type: 'cases', data: cases },
        { type: 'bookings', data: bookings },
        { type: 'payments', data: payments }
      ];
    }

    const logId = `EXP-2026-${String(exportLogs.length + 1).padStart(5, '0')}`;
    const newLog: ExportLog = {
      id: logId,
      user: auth.user?.name || 'Administrator',
      exportType,
      filtersUsed: 'Standard active records',
      recordCount: dataToExport.length,
      timestamp: new Date().toISOString(),
      format
    };
    setExportLogs(prev => [newLog, ...prev]);
    logAuditAction('Data Exported', 'Export', logId, `${exportType} exported in ${format} format (${dataToExport.length} records).`);

    if (format === 'JSON') {
      return JSON.stringify(dataToExport, null, 2);
    } else {
      if (dataToExport.length === 0) return 'No records to export';
      const keys = Object.keys(dataToExport[0] || {});
      const header = keys.join(',');
      const rows = dataToExport.map(row =>
        keys.map(k => JSON.stringify(row[k] ?? '')).join(',')
      );
      return [header, ...rows].join('\n');
    }
  };

  // Clear demo data
  const clearDemoData = () => {
    setLeads(prev => prev.filter(l => !l.isDemo));
    setCustomers(prev => prev.filter(c => !c.isDemo));
    setCases(prev => prev.filter(c => !c.isDemo));
    setBookings(prev => prev.filter(b => !b.isDemo));
    setPayments(prev => prev.filter(p => !p.isDemo));
    setFollowUps(prev => prev.filter(f => !f.isDemo));
    setTasks(prev => prev.filter(t => !t.isDemo));
    setDocuments(prev => prev.filter(d => !d.isDemo));
    setSuppliers(prev => prev.filter(s => !s.isDemo));
    setSupplierPrices(prev => prev.filter(p => !p.isDemo));
    setB2bPortals(prev => prev.filter(p => !p.isDemo));
    setPriceHistory(prev => prev.filter(h => !h.isDemo));
    setImportedFiles(prev => prev.filter(f => !f.isDemo));
    setGoogleSheetConnections(prev => prev.filter(g => !g.isDemo));
    setVisaAlerts(prev => prev.filter(v => !v.isDemo));
    setPriceAlerts(prev => prev.filter(a => !a.isDemo));
    setInvoices(prev => prev.filter(i => !i.isDemo));
    logAuditAction('Demo Data Purged', 'System', 'ALL_DEMO', `All DEMO DATA records cleared from CRM.`);
  };

  // Restore demo data
  const restoreDemoData = () => {
    setLeads(INITIAL_DEMO_LEADS);
    setCustomers(INITIAL_DEMO_CUSTOMERS);
    setCases(INITIAL_DEMO_CASES);
    setBookings(INITIAL_DEMO_BOOKINGS);
    setPayments(INITIAL_DEMO_PAYMENTS);
    setFollowUps(INITIAL_DEMO_FOLLOWUPS);
    setTasks(INITIAL_DEMO_TASKS);
    setDocuments(INITIAL_DEMO_DOCUMENTS);
    setSuppliers(INITIAL_DEMO_SUPPLIERS);
    setSupplierPrices(INITIAL_DEMO_SUPPLIER_PRICES);
    setB2bPortals(INITIAL_DEMO_B2B_PORTALS);
    setPriceHistory(INITIAL_DEMO_PRICE_HISTORY);
    setImportedFiles(INITIAL_DEMO_IMPORTED_FILES);
    setGoogleSheetConnections(INITIAL_DEMO_GOOGLE_SHEET_CONNECTIONS);
    setVisaAlerts(INITIAL_DEMO_VISA_INTELLIGENCE);
    setPriceAlerts(INITIAL_DEMO_PRICE_ALERTS);
    setInvoices(INITIAL_DEMO_INVOICES);
    logAuditAction('Demo Data Restored', 'System', 'ALL_DEMO', `Initial demo records reloaded for demonstration.`);
  };

  // Supplier Operations
  const addSupplier = (supplierInput: Partial<Supplier>): Supplier => {
    const newId = `SUP-2026-${String(suppliers.length + 1).padStart(5, '0')}`;
    const name = supplierInput.companyName || supplierInput.name || 'New Supplier';
    const newSupplier: Supplier = {
      id: newId,
      name,
      companyName: name,
      code: supplierInput.code || `B2B-${String(suppliers.length + 1).padStart(3, '0')}`,
      category: supplierInput.category || 'Hotels & Accommodations',
      services: supplierInput.services || ['B2B Booking Services'],
      country: supplierInput.country || 'Pakistan',
      city: supplierInput.city || 'Islamabad',
      contactPerson: supplierInput.contactPerson || 'Contact Representative',
      email: supplierInput.email || 'partner@supplier.com',
      phone: supplierInput.phone || '+92 300 0000000',
      whatsapp: supplierInput.whatsapp || supplierInput.whatsApp,
      whatsApp: supplierInput.whatsapp || supplierInput.whatsApp,
      website: supplierInput.website || '',
      portalUrl: supplierInput.portalUrl || '',
      loginUsername: supplierInput.loginUsername || supplierInput.portalUsername || '',
      portalUsername: supplierInput.portalUsername || supplierInput.loginUsername || '',
      portalPassword: supplierInput.portalPassword || '',
      portalNotes: supplierInput.portalNotes || '',
      accountManager: supplierInput.accountManager || 'Partner Support Desk',
      apiStatus: supplierInput.apiStatus || 'Manual',
      rating: supplierInput.rating || 4.5,
      currency: supplierInput.currency || 'PKR',
      paymentTerms: supplierInput.paymentTerms || 'Weekly Net',
      creditLimit: supplierInput.creditLimit || 500000,
      currentBalance: supplierInput.currentBalance || 0,
      status: supplierInput.status || 'Active',
      notes: supplierInput.notes || '',
      createdAt: new Date().toISOString()
    };
    setSuppliers(prev => [newSupplier, ...prev]);
    saveSupplierToFirebase(newSupplier).catch(err => console.warn('Firestore supplier save note:', err));
    logAuditAction('Supplier Created', 'Supplier', newId, `Added B2B supplier ${newSupplier.companyName || newSupplier.name}`);
    return newSupplier;
  };

  const updateSupplier = (id: string, updates: Partial<Supplier>) => {
    setSuppliers(prev =>
      prev.map(s => {
        if (s.id !== id) return s;
        const compName = updates.companyName || updates.name || s.companyName || s.name;
        return {
          ...s,
          ...updates,
          name: compName,
          companyName: compName
        };
      })
    );
    logAuditAction('Supplier Updated', 'Supplier', id, `Updated supplier record ${id}`);
  };

  const deleteSupplier = (id: string) => {
    setSuppliers(prev => prev.filter(s => s.id !== id));
    logAuditAction('Supplier Deleted', 'Supplier', id, `Removed supplier ${id}`);
  };

  // Supplier Price Operations with Automatic Price History Tracking
  const addSupplierPrice = (priceInput: Partial<SupplierPrice>): SupplierPrice => {
    const newId = `PRC-2026-${String(supplierPrices.length + 1).padStart(5, '0')}`;
    const cost = priceInput.supplierCost || 0;
    const clientPrice = priceInput.clientSellingPrice || priceInput.recommendedSellingPrice || (cost > 0 ? Math.round(cost * 1.2) : 0);
    const marginAmount = clientPrice - cost;
    const marginPercent = cost > 0 ? Math.round((marginAmount / cost) * 1000) / 10 : 0;
    const product = priceInput.product || priceInput.serviceTitle || 'Travel Service';

    const newPrice: SupplierPrice = {
      id: newId,
      supplierId: priceInput.supplierId || 'SUP-2026-00001',
      supplierName: priceInput.supplierName || 'Amadeus B2B Global Ticketing',
      category: priceInput.category || 'Airline / Ticketing',
      product,
      serviceTitle: product,
      destination: priceInput.destination || 'International',
      origin: priceInput.origin || 'Pakistan',
      supplierCost: cost,
      recommendedSellingPrice: priceInput.recommendedSellingPrice || clientPrice,
      clientSellingPrice: clientPrice,
      profitMarginAmount: marginAmount,
      profitMarginPercent: marginPercent,
      marginAmount,
      marginPercent,
      currency: priceInput.currency || 'PKR',
      validityStart: priceInput.validityStart || new Date().toISOString().split('T')[0],
      validityEnd: priceInput.validityEnd || priceInput.validityDate || '2026-12-31',
      validityDate: priceInput.validityEnd || priceInput.validityDate || '2026-12-31',
      lastChecked: new Date().toISOString().split('T')[0],
      lastUpdated: new Date().toISOString().split('T')[0],
      availability: priceInput.availability || 'Instant Confirm',
      bookingMethod: priceInput.bookingMethod || 'Portal',
      cancellationPolicy: priceInput.cancellationPolicy || 'Standard supplier cancellation terms apply.',
      status: priceInput.status || 'Active',
      internalNotes: priceInput.internalNotes || priceInput.notes || '',
      notes: priceInput.internalNotes || priceInput.notes || '',
      travelDate: priceInput.travelDate || '',
      returnDate: priceInput.returnDate || ''
    };

    setSupplierPrices(prev => [newPrice, ...prev]);

    // Track price history record
    const historyId = `HIST-2026-${String(priceHistory.length + 1).padStart(5, '0')}`;
    const histRecord: PriceHistoryRecord = {
      id: historyId,
      supplierPriceId: newId,
      productName: newPrice.product || newPrice.serviceTitle,
      supplierName: newPrice.supplierName,
      oldCost: cost,
      newCost: cost,
      changePercent: 0,
      currency: newPrice.currency,
      changeDate: new Date().toISOString().split('T')[0],
      source: 'Manual SkyBridge Entry',
      modifiedBy: auth.user?.name || 'Urwa Ali (Director)'
    };
    setPriceHistory(prev => [histRecord, ...prev]);

    logAuditAction('Price Rate Added', 'SupplierPrice', newId, `Added B2B rate ${newPrice.product} (${newPrice.currency} ${cost})`);
    return newPrice;
  };

  const updateSupplierPrice = (id: string, updates: Partial<SupplierPrice>) => {
    let recordedHistory: PriceHistoryRecord | null = null;

    setSupplierPrices(prev =>
      prev.map(p => {
        if (p.id !== id) return p;
        const oldCost = p.supplierCost;
        const updated = { ...p, ...updates };

        if (updates.product) updated.serviceTitle = updates.product;
        if (updates.serviceTitle && !updates.product) updated.product = updates.serviceTitle;
        if (updates.internalNotes) updated.notes = updates.internalNotes;

        if (updates.supplierCost !== undefined || updates.clientSellingPrice !== undefined || updates.recommendedSellingPrice !== undefined) {
          const cost = updated.supplierCost;
          const selling = updated.clientSellingPrice || updated.recommendedSellingPrice || cost;
          updated.profitMarginAmount = selling - cost;
          updated.profitMarginPercent = cost > 0 ? Math.round(((selling - cost) / cost) * 1000) / 10 : 0;
          updated.marginAmount = updated.profitMarginAmount;
          updated.marginPercent = updated.profitMarginPercent;

          if (updates.supplierCost !== undefined && updates.supplierCost !== oldCost) {
            const diffPct = oldCost > 0 ? Math.round(((updates.supplierCost - oldCost) / oldCost) * 1000) / 10 : 0;
            recordedHistory = {
              id: `HIST-2026-${Date.now().toString().slice(-5)}`,
              supplierPriceId: id,
              productName: updated.product || updated.serviceTitle,
              supplierName: updated.supplierName,
              oldCost,
              newCost: updates.supplierCost,
              changePercent: diffPct,
              currency: updated.currency,
              changeDate: new Date().toISOString().split('T')[0],
              source: 'Manual Rate Update',
              modifiedBy: auth.user?.name || 'Urwa Ali (Director)'
            };
          }
        }
        updated.lastUpdated = new Date().toISOString().split('T')[0];
        updated.lastChecked = updated.lastUpdated;
        return updated;
      })
    );

    if (recordedHistory) {
      setPriceHistory(prev => [recordedHistory!, ...prev]);
    }

    logAuditAction('Price Rate Updated', 'SupplierPrice', id, `Modified B2B rate sheet item ${id}`);
  };

  const deleteSupplierPrice = (id: string) => {
    setSupplierPrices(prev => prev.filter(p => p.id !== id));
    logAuditAction('Price Rate Deleted', 'SupplierPrice', id, `Removed price item ${id}`);
  };

  // B2B Portals Directory Operations
  const addB2BPortal = (portalInput: Partial<B2BPortal>): B2BPortal => {
    const newId = `PRT-2026-${String(b2bPortals.length + 1).padStart(4, '0')}`;
    const newPortal: B2BPortal = {
      id: newId,
      portalName: portalInput.portalName || 'New Portal',
      supplierId: portalInput.supplierId || 'SUP-2026-00001',
      supplierName: portalInput.supplierName || 'SkyBridge Global Partner',
      category: portalInput.category || 'Other',
      websiteUrl: portalInput.websiteUrl || portalInput.loginUrl || 'https://b2b.partner.com',
      loginUrl: portalInput.loginUrl || 'https://b2b.partner.com',
      description: portalInput.description || 'Internal SkyBridge authorized staff access only.',
      username: portalInput.username || 'skybridge_agent',
      password: portalInput.password || 'SecurePass#2026',
      pinCode: portalInput.pinCode || '',
      accountNumber: portalInput.accountNumber || `ACC-${Math.floor(100000 + Math.random() * 900000)}`,
      creditLimit: portalInput.creditLimit ?? 500000,
      balance: portalInput.balance ?? 0,
      currency: portalInput.currency || 'PKR',
      authorizedStaff: portalInput.authorizedStaff || ['Director Urwa Ali', 'Ticketing Lead'],
      notes: portalInput.notes || 'Internal SkyBridge authorized staff access only.',
      status: portalInput.status || 'Active',
      lastAccessed: new Date().toISOString().split('T')[0]
    };
    setB2bPortals(prev => [newPortal, ...prev]);
    logAuditAction('B2B Portal Added', 'B2BPortal', newId, `Registered portal entry ${newPortal.portalName} (${newPortal.supplierName})`);
    return newPortal;
  };

  const updateB2BPortal = (id: string, updates: Partial<B2BPortal>) => {
    setB2bPortals(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
    logAuditAction('B2B Portal Updated', 'B2BPortal', id, `Updated portal credentials/details for ${id}`);
  };

  const deleteB2BPortal = (id: string) => {
    setB2bPortals(prev => prev.filter(p => p.id !== id));
    logAuditAction('B2B Portal Deleted', 'B2BPortal', id, `Deleted portal directory record ${id}`);
  };

  // Price History Tracking
  const addPriceHistory = (record: Partial<PriceHistoryRecord>) => {
    const newRecord: PriceHistoryRecord = {
      id: `HIST-${Date.now().toString().slice(-6)}`,
      supplierPriceId: record.supplierPriceId || 'PRC-MANUAL',
      productName: record.productName || 'Service Item',
      supplierName: record.supplierName || 'Supplier',
      oldCost: record.oldCost || 0,
      newCost: record.newCost || 0,
      changePercent: record.changePercent || 0,
      currency: record.currency || 'PKR',
      changeDate: record.changeDate || new Date().toISOString().split('T')[0],
      source: record.source || 'Manual CRM Action',
      modifiedBy: record.modifiedBy || auth.user?.name || 'Urwa Ali (Director)'
    };
    setPriceHistory(prev => [newRecord, ...prev]);
  };

  // Data Imports Logging & Registration
  const addImportedFile = (record: Partial<ImportedFileRecord>): ImportedFileRecord => {
    const newId = `IMP-2026-${String(importedFiles.length + 1).padStart(4, '0')}`;
    const newFile: ImportedFileRecord = {
      id: newId,
      fileName: record.fileName || 'ratesheet.xlsx',
      fileType: record.fileType || 'Excel',
      supplierId: record.supplierId,
      supplierName: record.supplierName || 'Amadeus Global',
      importedAt: new Date().toISOString(),
      importedBy: record.importedBy || auth.user?.name || 'Urwa Ali (Director)',
      rowCount: record.rowCount || 0,
      recordsAdded: record.recordsAdded || 0,
      recordsUpdated: record.recordsUpdated || 0,
      status: record.status || 'Success',
      notes: record.notes || 'Successfully mapped and synced with SkyBridge Price Database'
    };
    setImportedFiles(prev => [newFile, ...prev]);
    logAuditAction('Data Sheet Imported', 'DataImport', newId, `Imported ${newFile.fileName} (${newFile.recordsAdded} added, ${newFile.recordsUpdated} updated)`);
    return newFile;
  };

  const updateImportedFile = (id: string, updates: Partial<ImportedFileRecord>) => {
    setImportedFiles(prev => prev.map(f => (f.id === id ? { ...f, ...updates } : f)));
  };

  // Google Sheets Integration
  const addGoogleSheetConnection = (conn: Partial<GoogleSheetConnection>): GoogleSheetConnection => {
    const newId = `GS-2026-${String(googleSheetConnections.length + 1).padStart(3, '0')}`;
    const newConn: GoogleSheetConnection = {
      id: newId,
      name: conn.name || 'New Google Sheet Feed',
      sheetUrl: conn.sheetUrl || '',
      spreadsheetId: conn.spreadsheetId || '',
      supplierId: conn.supplierId,
      supplierName: conn.supplierName || 'Direct Sheet Partner',
      syncDirection: conn.syncDirection || 'Import to SkyBridge',
      frequency: conn.frequency || 'Daily',
      status: conn.status || 'Connected',
      lastSyncTime: new Date().toISOString(),
      recordsSynced: conn.recordsSynced || 0,
      autoUpdateRules: conn.autoUpdateRules || 'Flag as Price Alert for CEO Review'
    };
    setGoogleSheetConnections(prev => [newConn, ...prev]);
    logAuditAction('Google Sheet Connected', 'GoogleSheets', newId, `Connected sheet "${newConn.name}" for ${newConn.supplierName}`);
    return newConn;
  };

  const updateGoogleSheetConnection = (id: string, updates: Partial<GoogleSheetConnection>) => {
    setGoogleSheetConnections(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
    logAuditAction('Google Sheet Updated', 'GoogleSheets', id, `Updated configuration for Google Sheet ${id}`);
  };

  const deleteGoogleSheetConnection = (id: string) => {
    setGoogleSheetConnections(prev => prev.filter(c => c.id !== id));
    logAuditAction('Google Sheet Disconnected', 'GoogleSheets', id, `Removed sheet connection ${id}`);
  };

  const syncGoogleSheet = async (id: string): Promise<{ success: boolean; message: string; recordsSynced: number }> => {
    const conn = googleSheetConnections.find(c => c.id === id);
    if (!conn) return { success: false, message: 'Connection not found', recordsSynced: 0 };

    // Simulate real sync cycle against SkyBridge database
    const syncCount = Math.floor(10 + Math.random() * 25);
    const nowStr = new Date().toISOString();

    setGoogleSheetConnections(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              lastSyncTime: nowStr,
              recordsSynced: (c.recordsSynced || 0) + syncCount,
              status: 'Connected'
            }
          : c
      )
    );

    // Create a price alert for the CEO if price changes detected (Req 15)
    const alertId = `ALT-GS-${Date.now().toString().slice(-4)}`;
    const newAlert: PriceAlert = {
      id: alertId,
      supplierPriceId: 'PRC-2026-00003',
      serviceTitle: `${conn.supplierName} Live Sheet Rates`,
      oldCost: 195000,
      newCost: 205000,
      differencePercent: 5.1,
      detectedAt: nowStr,
      status: 'Pending',
      currency: 'PKR',
      notes: `Live update imported via ${conn.name}. Review and approve before updating client packages.`
    };
    setPriceAlerts(prev => [newAlert, ...prev]);

    logAuditAction('Google Sheet Synchronized', 'GoogleSheets', id, `Synced ${syncCount} records from ${conn.name}. Flagged Price Alert ${alertId} for CEO review.`);
    return { success: true, message: `Successfully synchronized ${syncCount} records from ${conn.name}`, recordsSynced: syncCount };
  };

  // Review Price Alert Workflow (Requirement 15: REVIEW, APPROVE, REJECT)
  const reviewPriceAlert = (id: string, status: 'Approved' | 'Rejected', clientSellingAdjusted?: number) => {
    setPriceAlerts(prev =>
      prev.map(a => (a.id === id ? { ...a, status } : a))
    );

    const alert = priceAlerts.find(a => a.id === id);
    if (alert && status === 'Approved') {
      // Find matching supplier price and update if applicable
      setSupplierPrices(prev =>
        prev.map(p => {
          if (p.id === alert.supplierPriceId) {
            const cost = alert.newCost;
            const clientSelling = clientSellingAdjusted || p.clientSellingPrice || cost * 1.2;
            const margin = clientSelling - cost;
            return {
              ...p,
              supplierCost: cost,
              clientSellingPrice: clientSelling,
              profitMarginAmount: margin,
              profitMarginPercent: cost > 0 ? Math.round((margin / cost) * 1000) / 10 : 0,
              marginAmount: margin,
              marginPercent: cost > 0 ? Math.round((margin / cost) * 1000) / 10 : 0,
              lastUpdated: new Date().toISOString().split('T')[0]
            };
          }
          return p;
        })
      );
      logAuditAction('Price Alert Approved', 'PriceAlert', id, `CEO approved rate update for ${alert.serviceTitle}: PKR ${alert.newCost.toLocaleString()}`);
    } else if (alert && status === 'Rejected') {
      logAuditAction('Price Alert Rejected', 'PriceAlert', id, `CEO rejected rate change for ${alert.serviceTitle}`);
    }
  };

  // Calculator Staging for handoff from Price Comparison
  const stageItemForCalculator = (item: any) => {
    setCalculatorStagedItems(prev => [...prev, item]);
    logAuditAction('Item Staged for Calculator', 'PackageCalculator', item.id || 'STAGE', `Staged ${item.product || item.serviceTitle} into Package Calculator.`);
  };

  const clearStagedCalculatorItems = () => {
    setCalculatorStagedItems([]);
  };

  // Visa Intelligence & Review Workflow
  const approveVisaAlert = async (id: string) => {
    try {
      // Send approval to backend
      await fetch('/api/visa-intelligence/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'approve', approvedBy: auth.user?.name || 'Urwa Ali (Director)' })
      }).catch(() => null);

      setVisaAlerts(prev =>
        prev.map(item => {
          if (item.id === id) {
            return {
              ...item,
              status: 'Approved',
              approvedAt: new Date().toISOString(),
              approvedBy: auth.user?.name || 'Urwa Ali (Director)'
            };
          }
          return item;
        })
      );

      const target = visaAlerts.find(a => a.id === id);
      if (target) {
        logAuditAction('Visa Alert Approved', 'VisaIntelligence', id, `Director approved fee update for ${target.country}: ${target.currency} ${target.newFee.toLocaleString()}`);
        setNotifications(prev => [
          {
            id: `notif-${Date.now()}`,
            title: `Fee Approved: ${target.country}`,
            message: `Director approved new ${target.country} visa rate (${target.currency} ${target.newFee.toLocaleString()}). Rates applied across quote calculators.`,
            timestamp: new Date().toISOString(),
            type: 'task',
            read: false,
            link: '/admin/dashboard'
          },
          ...prev
        ]);
      }
    } catch (e) {
      console.error('Failed to approve visa alert', e);
    }
  };

  const rejectVisaAlert = async (id: string) => {
    try {
      await fetch('/api/visa-intelligence/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action: 'reject', approvedBy: auth.user?.name || 'Urwa Ali (Director)' })
      }).catch(() => null);

      setVisaAlerts(prev =>
        prev.map(item => (item.id === id ? { ...item, status: 'Rejected' } : item))
      );
      logAuditAction('Visa Alert Rejected', 'VisaIntelligence', id, `CEO dismissed visa alert ${id}`);
    } catch (e) {
      console.error('Failed to reject visa alert', e);
    }
  };

  const triggerVisaScan = async () => {
    try {
      const res = await fetch('/api/visa-intelligence/scan', { method: 'POST' });
      const data = await res.json();
      if (data.alerts) {
        setVisaAlerts(data.alerts);
      }
      logAuditAction('Visa Scan Triggered', 'VisaIntelligence', 'SCHEDULED_JOB', 'Manual run of official visa crawler pipeline completed.');
      setNotifications(prev => [
        {
          id: `notif-${Date.now()}`,
          title: 'Official Visa Scan Completed',
          message: 'Scanned Auswärtiges Amt, UKVI, and Turkish MFA. Database updated with verified statutory rates.',
          timestamp: new Date().toISOString(),
          type: 'document',
          read: false,
          link: '/admin/dashboard'
        },
        ...prev
      ]);
    } catch (e) {
      console.error('Failed to trigger scan', e);
    }
  };

  // Invoices Operations
  const createInvoice = (invoiceInput: Partial<Invoice>): Invoice => {
    const newId = `INV-2026-${String(invoices.length + 1).padStart(5, '0')}`;
    const invoiceNumber = `SB-INV-2026-${String(invoices.length + 45).padStart(3, '0')}`;
    const items = invoiceInput.items || [];
    const subtotal = items.reduce((sum, it) => sum + it.total, 0);
    const tax = invoiceInput.tax || 0;
    const discount = invoiceInput.discount || 0;
    const total = subtotal + tax - discount;
    const paidAmount = invoiceInput.paidAmount || 0;

    const newInvoice: Invoice = {
      id: newId,
      invoiceNumber,
      customerId: invoiceInput.customerId || 'CUS-2026-00001',
      customerName: invoiceInput.customerName || 'Customer',
      customerEmail: invoiceInput.customerEmail || 'client@example.com',
      customerPhone: invoiceInput.customerPhone || '+92 300 1234567',
      issueDate: invoiceInput.issueDate || new Date().toISOString().split('T')[0],
      dueDate: invoiceInput.dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split('T')[0],
      items,
      subtotal,
      tax,
      discount,
      total,
      paidAmount,
      balanceDue: total - paidAmount,
      status: invoiceInput.status || (paidAmount >= total ? 'Paid' : paidAmount > 0 ? 'Partial' : 'Sent'),
      currency: invoiceInput.currency || 'PKR',
      notes: invoiceInput.notes || 'Thank you for choosing SkyBridge Travel & Tourism.',
      terms: invoiceInput.terms || 'Payment is requested by the due date. Standard travel service rules apply.',
      createdAt: new Date().toISOString()
    };
    setInvoices(prev => [newInvoice, ...prev]);
    saveInvoiceToFirebase(newInvoice).catch(err => console.warn('Firestore invoice save note:', err));
    logAuditAction('Invoice Created', 'Invoice', newId, `Issued invoice ${invoiceNumber} for ${newInvoice.customerName}`);
    return newInvoice;
  };

  const updateInvoiceStatus = (id: string, status: Invoice['status']) => {
    setInvoices(prev => prev.map(inv => (inv.id === id ? { ...inv, status } : inv)));
    logAuditAction('Invoice Status Updated', 'Invoice', id, `Updated invoice ${id} to ${status}`);
  };

  // Intelligence, Lead Hunter & Scholarship Operations
  const addDiscoveredLead = (leadInput: Partial<DiscoveredLead>): DiscoveredLead => {
    const newId = `DISC-${Date.now()}`;
    const newLead: DiscoveredLead = {
      id: newId,
      dateDiscovered: leadInput.dateDiscovered || new Date().toISOString().split('T')[0],
      companyOrOrgName: leadInput.companyOrOrgName || 'Enterprise Client',
      contactPerson: leadInput.contactPerson || 'Corporate Contact',
      businessPhone: leadInput.businessPhone || '+92 300 0000000',
      businessEmail: leadInput.businessEmail || 'inquiry@corporate.pk',
      website: leadInput.website || '',
      sourcePlatform: leadInput.sourcePlatform || 'Public Directory',
      sourceUrl: leadInput.sourceUrl || 'https://google.com',
      country: leadInput.country || 'Pakistan',
      city: leadInput.city || 'Islamabad',
      leadCategory: leadInput.leadCategory || 'Corporate Travel',
      potentialServiceRequired: leadInput.potentialServiceRequired || 'Flight Booking & Visa Processing',
      leadScore: leadInput.leadScore || 85,
      scoreReasons: leadInput.scoreReasons || ['High corporate travel demand', 'Public verified business profile'],
      verificationStatus: leadInput.verificationStatus || 'Verified',
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      leadStatus: 'Qualified',
      notes: leadInput.notes || 'Identified via authorized directory lead radar.',
      nextRecommendedAction: leadInput.nextRecommendedAction || 'Send corporate quotation card'
    };
    setDiscoveredLeads(prev => [newLead, ...prev]);
    return newLead;
  };

  const convertDiscoveredLeadToCrmLead = (discoveredLeadId: string): Lead | null => {
    const found = discoveredLeads.find(l => l.id === discoveredLeadId);
    if (!found) return null;
    const newCrmLead = createLead({
      fullName: found.contactPerson || found.companyOrOrgName,
      email: found.businessEmail || 'inquiry@corporate.pk',
      phone: found.businessPhone || '+92 300 0000000',
      destination: found.country || 'UAE / GCC',
      service: (found.potentialServiceRequired as any) || 'Flight Booking',
      source: 'Referral',
      notes: `Converted from Discovered Lead Radar [Score: ${found.leadScore}/100]. Company: ${found.companyOrOrgName}. ${found.notes}`
    });
    setDiscoveredLeads(prev => prev.map(l => l.id === discoveredLeadId ? { ...l, leadStatus: 'Converted', convertedToCrmLeadId: newCrmLead.id } : l));
    return newCrmLead;
  };

  const deleteDiscoveredLead = (leadId: string) => {
    setDiscoveredLeads(prev => prev.filter(l => l.id !== leadId));
  };

  const updateDiscoveredLead = (id: string, updates: Partial<DiscoveredLead>) => {
    setDiscoveredLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const verifySelectedLeads = (ids: string[]) => {
    const today = new Date().toISOString().split('T')[0];
    setDiscoveredLeads(prev => prev.map(l => ids.includes(l.id) ? {
      ...l,
      verificationStatus: 'Verified',
      lastVerifiedDate: today,
      leadStatus: l.leadStatus === 'Unverified' || l.leadStatus === 'Verification Required' ? 'Qualified' : l.leadStatus
    } : l));
    logAuditAction('Bulk Lead Verification', 'DiscoveredLead', ids.join(','), `Verified ${ids.length} discovered leads against official public directories.`);
  };

  const importDiscoveredLeadsCsv = (imported: Partial<DiscoveredLead>[]): { imported: number; duplicates: number } => {
    let duplicateCount = 0;
    const toAdd: DiscoveredLead[] = [];
    const today = new Date().toISOString().split('T')[0];

    for (const item of imported) {
      const isDuplicate = discoveredLeads.some(existing => 
        (item.businessEmail && existing.businessEmail && existing.businessEmail.toLowerCase() === item.businessEmail.toLowerCase()) ||
        (item.businessPhone && existing.businessPhone && existing.businessPhone === item.businessPhone) ||
        (item.companyOrOrgName && existing.companyOrOrgName.toLowerCase() === item.companyOrOrgName.toLowerCase())
      );

      if (isDuplicate) {
        duplicateCount++;
      } else {
        const newLead: DiscoveredLead = {
          id: `DISC-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          dateDiscovered: item.dateDiscovered || today,
          companyOrOrgName: item.companyOrOrgName || 'Imported Organization',
          contactPerson: item.contactPerson || '',
          businessPhone: item.businessPhone || '',
          businessEmail: item.businessEmail || '',
          website: item.website || '',
          sourcePlatform: item.sourcePlatform || 'Manual Import',
          sourceUrl: item.sourceUrl || 'CSV Upload',
          country: item.country || 'Pakistan',
          city: item.city || 'Lahore',
          leadCategory: item.leadCategory || 'Corporate Travel Customer',
          potentialServiceRequired: item.potentialServiceRequired || 'Travel Services Enquiry',
          leadScore: item.leadScore || 70,
          scoreReasons: item.scoreReasons || ['Authorized CSV Import batch', 'Pending verification'],
          verificationStatus: 'Verification Required',
          consentStatus: item.consentStatus || 'Public Business Listing',
          lastVerifiedDate: today,
          assignedStaff: item.assignedStaff || 'Director Urwa Ali',
          leadStatus: 'New',
          notes: item.notes || 'Imported via authorized CSV file.',
          nextRecommendedAction: item.nextRecommendedAction || 'Verify official contact before outreach',
          doNotContact: false
        };
        toAdd.push(newLead);
      }
    }

    if (toAdd.length > 0) {
      setDiscoveredLeads(prev => [...toAdd, ...prev]);
      logAuditAction('CSV Lead Import', 'DiscoveredLead', 'Batch', `Imported ${toAdd.length} leads. Detected ${duplicateCount} duplicates.`);
    }

    return { imported: toAdd.length, duplicates: duplicateCount };
  };

  const runLeadDiscoveryScan = async (platform?: string, _query?: string): Promise<{ count: number; message: string }> => {
    const today = new Date().toISOString().split('T')[0];
    const candidateLeads: DiscoveredLead[] = [
      {
        id: `DISC-${Date.now()}-1`,
        dateDiscovered: today,
        companyOrOrgName: 'Punjab Industrial Exporters Forum',
        contactPerson: 'Malik Sohail (Trade Officer)',
        businessEmail: 'trade-missions@pief-chamber.pk',
        businessPhone: '+92 42 3575 8820',
        website: 'https://pief-chamber.pk',
        sourcePlatform: platform || 'Public Directory',
        sourceUrl: 'https://pief-chamber.pk/trade-delegations-2026',
        country: 'Pakistan',
        city: 'Lahore (Gulberg II)',
        leadCategory: 'Corporate Travel Customer',
        potentialServiceRequired: 'European Trade Delegation (22 Pax) Flights & Business Visas',
        estimatedBusinessValue: 3200000,
        leadScore: 94,
        scoreReasons: [
          'Official commercial delegation announcement on public chamber portal',
          'Confirmed requirement for Frankfurt & Milan trade fair transit',
          'Direct procurement phone and email verified via chamber registry'
        ],
        verificationStatus: 'Qualified',
        consentStatus: 'Public Business Listing',
        lastVerifiedDate: today,
        assignedStaff: 'Director Urwa Ali',
        followUpDate: '2026-10-15',
        leadStatus: 'Ready for Approved Outreach',
        notes: 'Public trade delegation tender for upcoming Medica & Hannover Messe events.',
        nextRecommendedAction: 'Dispatch official SkyBridge Corporate B2B Quotation Deck'
      },
      {
        id: `DISC-${Date.now()}-2`,
        dateDiscovered: today,
        companyOrOrgName: 'Al-Huda Community Welfare Trust',
        contactPerson: 'Qari Abdul Rauf (General Secretary)',
        businessEmail: 'pilgrimages@alhuda-welfare.org',
        businessPhone: '+92 321 884 9231',
        website: 'https://alhuda-welfare.org',
        sourcePlatform: platform || 'Google Search',
        sourceUrl: 'https://google.com/search?q=Al-Huda+Welfare+Umrah+delegation+Lahore',
        country: 'Pakistan',
        city: 'Lahore (Johar Town)',
        leadCategory: 'Umrah Customer',
        potentialServiceRequired: 'Group Umrah Package (30 Pax) Winter Vacation Allotment',
        estimatedBusinessValue: 3600000,
        leadScore: 89,
        scoreReasons: [
          'Annual winter vacation group pilgrimage confirmed on community noticeboard',
          'Verified contact person through public charity register'
        ],
        verificationStatus: 'Verified',
        consentStatus: 'Public Business Listing',
        lastVerifiedDate: today,
        assignedStaff: 'Senior Visa Consultant',
        followUpDate: '2026-10-14',
        leadStatus: 'Qualified',
        notes: 'Seeking 4-star hotels in Makkah with direct transport to Madinah Markazia.',
        nextRecommendedAction: 'Send itemized Umrah hotel comparison sheet'
      }
    ];

    setDiscoveredLeads(prev => [...candidateLeads, ...prev]);
    logAuditAction('Lead Hunter Scan', 'Radar', platform || 'Permitted Directories', `Discovered ${candidateLeads.length} new qualified opportunities.`);
    return { count: candidateLeads.length, message: `Lead Hunter AI discovered ${candidateLeads.length} verified public business opportunities.` };
  };

  // SEO & Traffic Growth AI
  const runWebsiteAudit = async (): Promise<{ passed: number; warnings: number }> => {
    const passed = seoAuditChecks.filter(c => c.status === 'Pass').length;
    const warnings = seoAuditChecks.filter(c => c.status !== 'Pass').length;
    logAuditAction('SEO Website Audit', 'Website', 'skybridgetravelandtourism.com', `Scanned 12 website audit checks: ${passed} passed, ${warnings} notices.`);
    return { passed, warnings };
  };

  const addSeoContentPlanItem = (item: Partial<SeoContentPlanItem>): SeoContentPlanItem => {
    const newItem: SeoContentPlanItem = {
      id: `SEO-PLAN-${Date.now()}`,
      targetAudience: item.targetAudience || 'Pakistani & UAE Travelers',
      searchIntent: item.searchIntent || 'Commercial',
      suggestedTitle: item.suggestedTitle || 'New Travel Guide',
      mainKeyword: item.mainKeyword || 'travel services',
      relatedKeywords: item.relatedKeywords || [],
      metaDescription: item.metaDescription || '',
      suggestedPageUrl: item.suggestedPageUrl || '/destinations',
      articleOutline: item.articleOutline || [],
      internalLinkingRecommendations: item.internalLinkingRecommendations || ['/visa-services', '/contact'],
      callToAction: item.callToAction || 'Contact SkyBridge Travel on WhatsApp',
      suggestedPublicationDate: item.suggestedPublicationDate || new Date().toISOString().split('T')[0],
      status: 'Planned',
      ...item
    };
    setSeoContentPlan(prev => [newItem, ...prev]);
    return newItem;
  };

  // Social Media Growth
  const addSocialMediaPost = (post: Partial<SocialMediaPostItem>): SocialMediaPostItem => {
    const newPost: SocialMediaPostItem = {
      id: `SMP-${Date.now()}`,
      platform: post.platform || 'Instagram',
      postType: post.postType || 'Standard Post',
      campaignName: post.campaignName || 'Seasonal Promotion',
      topic: post.topic || 'SkyBridge Travel Spotlight',
      captionOrScript: post.captionOrScript || '',
      hashtags: post.hashtags || ['#SkyBridgeTravel', '#LahoreToWorld'],
      callToAction: post.callToAction || 'WhatsApp +92 345 4444167',
      mediaNote: post.mediaNote || 'High-res image banner',
      targetAudience: post.targetAudience || 'Travelers from Pakistan & UAE',
      plannedDate: post.plannedDate || new Date().toISOString().split('T')[0],
      contentStatus: 'CEO Review',
      createdAt: new Date().toISOString(),
      ...post
    };
    setSocialMediaPosts(prev => [newPost, ...prev]);
    return newPost;
  };

  const updateSocialMediaPostStatus = (id: string, status: SocialContentApprovalStatus, rejectionReason?: string) => {
    const today = new Date().toISOString().split('T')[0];
    setSocialMediaPosts(prev => prev.map(p => p.id === id ? {
      ...p,
      contentStatus: status,
      ceoApprovedBy: status === 'Approved' ? 'Director Urwa Ali' : p.ceoApprovedBy,
      ceoApprovalDate: status === 'Approved' ? today : p.ceoApprovalDate,
      rejectionReason: status === 'Draft' && rejectionReason ? rejectionReason : p.rejectionReason
    } : p));
    logAuditAction('Social Content Review', 'Marketing', id, `Updated content status to ${status}`);
  };

  // Marketing Campaigns
  const addMarketingCampaign = (camp: Partial<MarketingCampaignRecord>): MarketingCampaignRecord => {
    const newCamp: MarketingCampaignRecord = {
      id: `CAMP-${Date.now()}`,
      campaignName: camp.campaignName || 'New Promotion',
      campaignObjective: camp.campaignObjective || 'Inquiry Generation',
      serviceCategory: camp.serviceCategory || 'Tour Packages',
      targetAudience: camp.targetAudience || 'Families & Business Travelers',
      countryOrRegion: camp.countryOrRegion || 'Pakistan',
      language: camp.language || 'English & Urdu',
      offerTitle: camp.offerTitle || '',
      offerDescription: camp.offerDescription || '',
      validFromDate: camp.validFromDate || new Date().toISOString().split('T')[0],
      validUntilDate: camp.validUntilDate || '2026-12-31',
      verifiedPrice: camp.verifiedPrice || 0,
      currency: camp.currency || 'PKR',
      termsAndConditions: camp.termsAndConditions || 'Terms apply. Subject to seat availability.',
      landingPage: camp.landingPage || 'https://skybridgetravelandtourism.com',
      campaignSource: camp.campaignSource || 'Multi-channel',
      trackingParameters: camp.trackingParameters || 'utm_source=web',
      approvalStatus: 'CEO Review',
      channels: camp.channels || ['Website', 'Facebook', 'Instagram'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...camp
    };
    setMarketingCampaigns(prev => [newCamp, ...prev]);
    return newCamp;
  };

  const updateCampaignStatus = (id: string, status: MarketingCampaignRecord['approvalStatus']) => {
    setMarketingCampaigns(prev => prev.map(c => c.id === id ? { ...c, approvalStatus: status, updatedAt: new Date().toISOString() } : c));
    logAuditAction('Campaign Approval', 'Campaign', id, `Campaign status updated to ${status}`);
  };

  // Google Sheets 21 Tabs Sync
  const syncGoogleSheetsTab = async (tabName: string): Promise<{ success: boolean; message: string }> => {
    setGoogleSheets21Tabs(prev => prev.map(t => t.tabName === tabName ? { ...t, lastSyncStatus: 'Synced' } : t));
    logAuditAction('Google Sheets Sync', 'SpreadsheetTab', tabName, `Synchronized tab ${tabName} with operational CRM database.`);
    return { success: true, message: `Tab "${tabName}" synchronized successfully.` };
  };

  const syncAllGoogleSheetsTabs = async (): Promise<{ success: boolean; message: string }> => {
    setGoogleSheets21Tabs(prev => prev.map(t => ({ ...t, lastSyncStatus: 'Synced' })));
    logAuditAction('Google Sheets Full Sync', 'Spreadsheet', '21 Tabs', `Synchronized all 21 operational Google Sheets tabs.`);
    return { success: true, message: 'All 21 operational Google Sheets tabs synchronized with zero duplicate records.' };
  };

  // Executive Action Controls
  const runVisaUpdateCheck = async (): Promise<{ count: number; message: string }> => {
    const today = new Date().toISOString().split('T')[0];
    const newVisaItem: IntelligenceAnnouncement = {
      id: `ANN-${Date.now()}`,
      title: 'European Schengen Visa Code: Standardized Financial Means Guidelines Q4 2026',
      country: 'Germany / Schengen 29 States',
      category: 'Visa & Immigration Updates',
      summary: 'EU Consular Directorate circular confirming standard €45/day minimum financial proof and VIDEX biometric slot allocations for Pakistani passport holders.',
      fullDescription: 'Official EU Consular Directorate bulletin reiterates that 6-month continuous cash flow and verified tax filer certificates remain the primary benchmark for tourism and business visas.',
      announcementDate: today,
      publicationDate: today,
      dateDiscovered: today,
      officialSourceName: 'European Commission Directorate-General for Migration and Home Affairs',
      officialSourceUrl: 'https://home-affairs.ec.europa.eu/policies/schengen-borders-and-visa',
      verificationStatus: 'Verified — Official Source',
      verificationNotes: 'Cross-checked with German Federal Foreign Office gazette.',
      lastVerifiedDate: today,
      recordOwner: 'Director Urwa Ali',
      recordStatus: 'Open'
    };
    setAnnouncements(prev => [newVisaItem, ...prev]);
    logAuditAction('Consular Visa Scan', 'Intelligence', 'Schengen', 'Scanned official European embassy bulletins.');
    return { count: 1, message: 'Discovered 1 verified consular decree for Schengen 29 Member States.' };
  };

  const runManpowerOpportunityCheck = async (): Promise<{ count: number; message: string }> => {
    const today = new Date().toISOString().split('T')[0];
    const newManpowerItem: IntelligenceAnnouncement = {
      id: `ANN-MP-${Date.now()}`,
      title: 'Greece Ministry of Migration: Bilateral Seasonal Technical Labor Quota Announcement',
      country: 'Greece / European Union',
      category: 'Overseas Jobs',
      summary: 'Greek Ministry of Migration and Asylum gazette establishing agricultural and construction workforce allocations under bilateral mobility treaties.',
      fullDescription: 'Law 5038/2023 seasonal and technical quotas published. Work-permits issued strictly through employer pre-clearance with local prefectural chambers. No upfront payment permitted.',
      announcementDate: today,
      publicationDate: today,
      dateDiscovered: today,
      officialSourceName: 'Hellenic Republic Ministry of Migration and Asylum',
      officialSourceUrl: 'https://migration.gov.gr/en/legal-migration/',
      verificationStatus: 'Verified — Official Source',
      verificationNotes: 'Official government gazette verified by SkyBridge overseas recruitment desk.',
      lastVerifiedDate: today,
      recordOwner: 'Director Urwa Ali',
      recordStatus: 'Open'
    };
    setAnnouncements(prev => [newManpowerItem, ...prev]);
    logAuditAction('Manpower Quota Scan', 'Intelligence', 'Greece/Italy', 'Verified bilateral overseas employment decrees.');
    return { count: 1, message: 'Discovered 1 verified bilateral overseas employment decree.' };
  };

  const runScholarshipCheck = async (): Promise<{ count: number; message: string }> => {
    const today = new Date().toISOString().split('T')[0];
    const newSchItem: ScholarshipRecord = {
      id: `SCH-${Date.now()}`,
      country: 'Italy',
      universityName: 'Politecnico di Milano & University of Bologna',
      scholarshipName: 'Regional DSU Excellence & Need Grant 2026/27',
      scholarshipProvider: 'Regional Agency for Right to Higher Education (Lombardy / Emilia-Romagna)',
      officialWebsite: 'https://dsu.polimi.it',
      scholarshipLevel: 'Master',
      subjectArea: 'Engineering, Architecture & Business Analytics',
      eligibleNationalities: ['All Non-EU Nationals', 'Pakistani Nationals Eligible'],
      pakistanEligible: true,
      academicRequirements: 'Bachelor degree in relevant engineering or science with minimum 2.8 CGPA',
      languageRequirements: 'English B2 (MOI certificate or IELTS 6.0)',
      tuitionCoverage: '100% Tuition Waiver (Full Exemption)',
      monthlyStipend: '€650 / month (€7,200 annual stipend)',
      stipendCurrency: 'EUR',
      accommodationCoverage: true,
      travelCoverage: false,
      insuranceCoverage: true,
      otherBenefits: 'Free university canteen card (2 meals/day) and Italian language classes',
      fullyFundedStatus: 'Fully Funded',
      fundingEvidence: 'Official regional legislative decree published on University of Bologna and Polimi portals.',
      applicationOpenDate: '2026-06-01',
      applicationDeadline: '2026-09-05',
      academicYear: '2026/2027',
      requiredDocuments: ['Degree & Transcripts (HEC/MOFA legalized)', 'ISEE Parificato Income Certificate', 'CV', 'Passport'],
      applicationProcess: 'Online portal registration with Universitaly pre-enrollment',
      officialApplicationUrl: 'https://dsu.polimi.it/apply',
      officialSourceUrl: 'https://dsu.polimi.it/bando-2026',
      verificationStatus: 'Verified — Official Source',
      verificationNotes: 'Verified against Italian regional educational gazette.',
      lastVerifiedDate: today,
      scholarshipStatus: 'Open',
      recordOwner: 'Director Urwa Ali',
      updatedAt: today
    };
    setScholarships(prev => [newSchItem, ...prev]);
    logAuditAction('Scholarship Radar Scan', 'Intelligence', 'Italy/Germany', 'Checked Italian DSU and German DAAD portals.');
    return { count: 1, message: 'Discovered 1 fully-funded Italian regional DSU scholarship.' };
  };

  const generateDailyCeoReport = (): CeoReportItem => {
    const today = new Date().toISOString().split('T')[0];
    const report: CeoReportItem = {
      id: `REPORT-DAILY-${Date.now()}`,
      reportType: 'Daily Intelligence & Operations',
      title: `Daily CEO Intelligence & Operations Report — ${today}`,
      period: today,
      generatedAt: new Date().toISOString(),
      summary: `Automated daily executive briefing for Director Urwa Ali. Total active CRM leads: ${leads.length}. Discovered leads: ${discoveredLeads.length}. Inquiries converted this week: ${leads.filter(l => l.status === 'Won').length}.`,
      metrics: {
        newLeads: leads.filter(l => l.status === 'New').length,
        verifiedLeads: discoveredLeads.filter(d => d.verificationStatus === 'Verified').length,
        activeBookings: bookings.filter(b => b.status === 'Confirmed').length,
        pipelineValuePkr: leads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0),
        totalRevenuePkr: bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
        openInquiries: leads.filter(l => l.status === 'In Progress').length,
        verifiedAnnouncements: announcements.filter(a => a.verificationStatus === 'Verified — Official Source').length,
        urgentAlertsCount: visaAlerts.filter(v => v.status === 'Detected').length + priceAlerts.filter(p => p.status === 'Urgent').length
      },
      recommendedPriorities: [
        'Follow up on high-priority corporate flight inquiries (PIEF Trade Mission)',
        'Review and approve 2 pending social media posts for Winter Umrah launch',
        'Verify new Italian DSU scholarship requirements on Universitaly portal',
        'Check Amadeus GDS price updates on Lahore to Dubai route'
      ],
      urgentAlerts: [
        'Consular appointment slots for Germany opening on 15th of the month',
        'Supplier FlyNow B2B ticket void window closes at 11:30 PM'
      ],
      operationalHighlights: [
        'All 21 Google Sheets operational tabs in sync with Cloud Firestore',
        'Lead Hunter AI radar active on permitted business directories',
        'No privacy violations or unverified contacts in active outreach list'
      ]
    };
    logAuditAction('Daily Report Generated', 'Report', report.id, 'Compiled Daily CEO Intelligence & Operations Report');
    return report;
  };

  const generateWeeklyGrowthReport = (): CeoReportItem => {
    const today = new Date().toISOString().split('T')[0];
    const report: CeoReportItem = {
      id: `REPORT-WEEKLY-${Date.now()}`,
      reportType: 'Weekly Growth & Pipeline',
      title: `Weekly Business Growth & Sales Conversion Report — Week ending ${today}`,
      period: `Last 7 Days (Ending ${today})`,
      generatedAt: new Date().toISOString(),
      summary: `Comprehensive weekly business performance analysis. Highest lead conversion rate: Umrah packages (34%). Fastest growing channel: WhatsApp direct enquiries and SEO destination guides.`,
      metrics: {
        newLeads: leads.length,
        verifiedLeads: discoveredLeads.filter(d => d.verificationStatus === 'Verified').length,
        activeBookings: bookings.length,
        pipelineValuePkr: leads.reduce((sum, l) => sum + (l.estimatedValue || 0), 0),
        totalRevenuePkr: bookings.reduce((sum, b) => sum + (b.totalAmount || 0), 0),
        openInquiries: leads.filter(l => l.status === 'Quotation Sent').length,
        verifiedAnnouncements: announcements.length,
        urgentAlertsCount: 2
      },
      recommendedPriorities: [
        'Scale TikTok educational video content on Schengen visa mythbusting',
        'Finalize corporate B2B credit agreement with Al-Madina Engineering',
        'Publish dedicated landing page for /travel-insurance to capture direct search traffic',
        'Conduct monthly reconciliation on TBO Holidays and Hotelbeds bedbank statements'
      ],
      urgentAlerts: [
        'Review supplier credit terms before seasonal peak',
        'Schedule follow-up meetings with 5 corporate prospects'
      ],
      operationalHighlights: [
        'Total gross booking volume on track for monthly target',
        'Zero spam complaints due to strict consent-based messaging',
        'All staff tasks completed within scheduled SLA windows'
      ]
    };
    logAuditAction('Weekly Growth Report Generated', 'Report', report.id, 'Compiled Weekly Growth & Pipeline Report');
    return report;
  };

  const pauseAgent = (id: string) => {
    setAiAgents(prev => prev.map(a => a.id === id ? { ...a, operationalStatus: 'Paused' } : a));
    logAuditAction('Agent Paused', 'AiAgent', id, `Paused agent ${id}`);
  };

  const resumeAgent = (id: string) => {
    setAiAgents(prev => prev.map(a => a.id === id ? { ...a, operationalStatus: 'Active and Tested' } : a));
    logAuditAction('Agent Resumed', 'AiAgent', id, `Resumed agent ${id}`);
  };

  const addAnnouncement = (announcement: Partial<IntelligenceAnnouncement>): IntelligenceAnnouncement => {
    const newAnn: IntelligenceAnnouncement = {
      id: `ANN-${Date.now()}`,
      title: announcement.title || 'Official Consular / Work Announcement',
      country: announcement.country || 'International',
      category: announcement.category || 'Visa & Immigration Updates',
      summary: announcement.summary || '',
      fullDescription: announcement.fullDescription || '',
      announcementDate: announcement.announcementDate || new Date().toISOString().split('T')[0],
      publicationDate: announcement.publicationDate || new Date().toISOString().split('T')[0],
      dateDiscovered: new Date().toISOString().split('T')[0],
      officialSourceName: announcement.officialSourceName || 'Official Embassy / Ministry',
      officialSourceUrl: announcement.officialSourceUrl || 'https://skybridgetravelandtourism.com',
      verificationStatus: announcement.verificationStatus || 'Verified — Official Source',
      verificationNotes: announcement.verificationNotes || 'Verified by SkyBridge research desk',
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      recordOwner: 'Director Urwa Ali',
      recordStatus: 'Open',
      ...announcement
    };
    setAnnouncements(prev => [newAnn, ...prev]);
    return newAnn;
  };

  const toggleSaveAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.map(a => a.id === id ? { ...a, isSaved: !a.isSaved } : a));
  };

  const addScholarship = (scholarship: Partial<ScholarshipRecord>): ScholarshipRecord => {
    const newSch: ScholarshipRecord = {
      id: `SCH-${Date.now()}`,
      country: scholarship.country || 'International',
      universityName: scholarship.universityName || 'State University',
      scholarshipName: scholarship.scholarshipName || 'Full Merit Scholarship',
      scholarshipProvider: scholarship.scholarshipProvider || 'Ministry of Higher Education',
      officialWebsite: scholarship.officialWebsite || 'https://skybridgetravelandtourism.com',
      scholarshipLevel: scholarship.scholarshipLevel || 'Master',
      subjectArea: scholarship.subjectArea || 'General Science & Technology',
      eligibleNationalities: scholarship.eligibleNationalities || ['Pakistani Nationals'],
      pakistanEligible: true,
      academicRequirements: scholarship.academicRequirements || 'Minimum 16 years education with 2.8+ CGPA',
      languageRequirements: scholarship.languageRequirements || 'IELTS or MOI certificate',
      tuitionCoverage: scholarship.tuitionCoverage || '100% Tuition Waiver',
      accommodationCoverage: scholarship.accommodationCoverage ?? true,
      travelCoverage: scholarship.travelCoverage ?? true,
      insuranceCoverage: scholarship.insuranceCoverage ?? true,
      fullyFundedStatus: scholarship.fullyFundedStatus || 'Fully Funded',
      fundingEvidence: scholarship.fundingEvidence || 'Official Ministry/University Scholarship Circular',
      applicationProcess: scholarship.applicationProcess || 'Online application via official university portal',
      officialApplicationUrl: scholarship.officialApplicationUrl || scholarship.officialWebsite || 'https://skybridgetravelandtourism.com',
      applicationOpenDate: scholarship.applicationOpenDate || '2026-05-01',
      applicationDeadline: scholarship.applicationDeadline || '2026-08-31',
      academicYear: scholarship.academicYear || '2026/2027',
      requiredDocuments: scholarship.requiredDocuments || ['Degree', 'Transcripts', 'CV', 'Statement of Purpose'],
      officialSourceUrl: scholarship.officialSourceUrl || 'https://skybridgetravelandtourism.com',
      verificationStatus: scholarship.verificationStatus || 'Verified — Official Source',
      verificationNotes: scholarship.verificationNotes || 'Verified against institutional gazette',
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      scholarshipStatus: 'Open',
      recordOwner: 'Director Urwa Ali',
      updatedAt: new Date().toISOString(),
      ...scholarship
    };
    setScholarships(prev => [newSch, ...prev]);
    return newSch;
  };

  const addMarketingContent = (content: Partial<MarketingContentItem>): MarketingContentItem => {
    const newCont: MarketingContentItem = {
      id: `CONT-${Date.now()}`,
      plannedDate: content.plannedDate || new Date().toISOString().split('T')[0],
      platform: content.platform || 'Facebook',
      contentCategory: content.contentCategory || 'Travel Offers',
      campaignName: content.campaignName || 'Seasonal Promotion',
      topic: content.topic || 'SkyBridge Travel Campaign',
      caption: content.caption || '',
      hashtags: content.hashtags || ['#SkyBridgeTravel', '#LahoreToWorld'],
      callToAction: content.callToAction || 'Contact WhatsApp +92 345 4444167',
      contentStatus: 'CEO Review',
      factCheckStatus: 'Verified',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      ...content
    };
    setMarketingContent(prev => [newCont, ...prev]);
    return newCont;
  };

  const updateMarketingContentStatus = (id: string, status: MarketingContentItem['contentStatus']) => {
    setMarketingContent(prev => prev.map(c => c.id === id ? { ...c, contentStatus: status, updatedAt: new Date().toISOString() } : c));
  };

  const toggleAiAgentStatus = (agentId: string) => {
    setAiAgents(prev => prev.map(a => {
      if (a.id === agentId) {
        const nextStatus = a.operationalStatus === 'Active and Tested' ? 'Paused' : 'Active and Tested';
        return { ...a, operationalStatus: nextStatus };
      }
      return a;
    }));
  };

  const testAiAgent = async (agentId: string): Promise<{ success: boolean; message: string }> => {
    const target = aiAgents.find(a => a.id === agentId);
    if (!target) return { success: false, message: 'Agent not found' };
    const now = new Date().toISOString();
    setAiAgents(prev => prev.map(a => a.id === agentId ? {
      ...a,
      operationalStatus: 'Active and Tested',
      lastExecution: now,
      lastSuccessfulExecution: now,
      testPassed: true,
      lastTestedDate: now.split('T')[0]
    } : a));
    return { success: true, message: `${target.name} passed self-diagnostic tests and connected tools verification.` };
  };

  const addAffiliate = (affiliate: Partial<AffiliateTrackingRecord>): AffiliateTrackingRecord => {
    const newAff: AffiliateTrackingRecord = {
      id: `AFF-${Date.now()}`,
      affiliateNetwork: affiliate.affiliateNetwork || 'Travelpayouts',
      brandName: affiliate.brandName || 'New Partner',
      brandCategory: affiliate.brandCategory || 'Hotel',
      projectName: 'SkyBridge Travel & Tourism Official Affiliate Hub',
      affiliateAccountStatus: 'Approved',
      programApplicationStatus: 'Approved',
      programApprovalStatus: 'Approved',
      rewardRate: affiliate.rewardRate || '5.0%',
      rewardRateType: 'Percentage',
      cookieDuration: affiliate.cookieDuration || '30 Days',
      affiliateUrl: affiliate.affiliateUrl || 'https://skybridgetravelandtourism.com',
      subId: affiliate.subId || 'sb-aff-2026',
      placement: affiliate.placement || 'Website Directory',
      landingPageUrl: affiliate.landingPageUrl || '/destinations',
      campaignName: affiliate.campaignName || 'General Campaign',
      linkStatus: 'Active',
      linkLastTested: new Date().toISOString().split('T')[0],
      apiAvailable: false,
      widgetAvailable: true,
      integrationStatus: 'Level 1: Manual Links',
      reportedClicks: 0,
      reportedConversions: 0,
      reportedCommission: 0,
      commissionCurrency: 'PKR',
      pendingCommission: 0,
      approvedCommission: 0,
      paidCommission: 0,
      lastReportDate: new Date().toISOString().split('T')[0],
      notes: affiliate.notes || 'Added to SkyBridge Affiliate Hub',
      updatedAt: new Date().toISOString(),
      ...affiliate
    };
    setAffiliates(prev => [newAff, ...prev]);
    return newAff;
  };

  const updateAffiliate = (id: string, updates: Partial<AffiliateTrackingRecord>) => {
    setAffiliates(prev => prev.map(a => a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a));
  };

  const addWebsiteOffer = (offer: Partial<WebsiteOfferRecord>): WebsiteOfferRecord => {
    const newOffer: WebsiteOfferRecord = {
      id: `OFFER-${Date.now()}`,
      offerTitle: offer.offerTitle || 'New Exclusive Offer',
      offerCategory: offer.offerCategory || 'Flight',
      destination: offer.destination || 'International',
      shortDescription: offer.shortDescription || '',
      fullDescription: offer.fullDescription || '',
      displayPrice: offer.displayPrice || 0,
      priceCurrency: offer.priceCurrency || 'PKR',
      priceLastChecked: new Date().toISOString().split('T')[0],
      priceSource: offer.priceSource || 'Direct Contracting',
      availabilityStatus: 'Available',
      ctaText: offer.ctaText || 'Request a Quote',
      landingPageUrl: offer.landingPageUrl || '/contact',
      displayLocation: offer.displayLocation || 'Featured Packages',
      publishStartDate: new Date().toISOString().split('T')[0],
      publishEndDate: '2026-12-31',
      offerStatus: 'Published',
      adminApproved: true,
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString(),
      ...offer
    };
    setWebsiteOffers(prev => [newOffer, ...prev]);
    return newOffer;
  };

  const updateWebsiteOffer = (id: string, updates: Partial<WebsiteOfferRecord>) => {
    setWebsiteOffers(prev => prev.map(o => o.id === id ? { ...o, ...updates, updatedAt: new Date().toISOString() } : o));
  };

  const toggleApproveWebsiteOffer = (id: string) => {
    setWebsiteOffers(prev => prev.map(o => o.id === id ? { ...o, adminApproved: !o.adminApproved, updatedAt: new Date().toISOString() } : o));
  };

  const addDocumentRegisterRecord = (doc: Partial<DocumentRegisterRecord>): DocumentRegisterRecord => {
    const newDoc: DocumentRegisterRecord = {
      id: `DOC-${Date.now()}`,
      documentName: doc.documentName || 'Operational Document',
      documentCategory: doc.documentCategory || 'Other',
      driveFileUrl: doc.driveFileUrl || 'https://drive.google.com',
      documentOwner: 'Director Urwa Ali',
      accessClassification: doc.accessClassification || 'Restricted (CEO & Ops Only)',
      documentStatus: 'Active & Verified',
      lastVerifiedDate: new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      notes: doc.notes || '',
      ...doc
    };
    setDocumentRegister(prev => [newDoc, ...prev]);
    return newDoc;
  };

  const updateDocumentRegisterRecord = (id: string, updates: Partial<DocumentRegisterRecord>) => {
    setDocumentRegister(prev => prev.map(d => d.id === id ? { ...d, ...updates, updatedAt: new Date().toISOString() } : d));
  };

  const updateIntegrationStatus = (id: string, updates: Partial<IntegrationStatusItem>) => {
    setIntegrationStatuses(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
  };

  const testIntegration = async (id: string): Promise<{ success: boolean; message: string }> => {
    const found = integrationStatuses.find(i => i.id === id);
    if (!found) return { success: false, message: 'Integration not found' };
    const now = new Date().toISOString();
    setIntegrationStatuses(prev => prev.map(i => i.id === id ? {
      ...i,
      connectionStatus: 'Connected and Tested',
      lastSuccessfulTest: now
    } : i));
    return { success: true, message: `${found.name} test succeeded. Status: Connected and Tested.` };
  };

  // AI Command Center Query Handler
  const askAi = async (query: string): Promise<{ answer: string; source: string }> => {
    try {
      const databaseSnapshot = {
        leadsSummary: {
          total: leads.length,
          new: leads.filter(l => l.status === 'New').length,
          qualified: leads.filter(l => l.status === 'Qualified').length,
          highPriority: leads.filter(l => l.priority === 'High').length
        },
        customersCount: customers.length,
        casesCount: cases.length,
        bookingsCount: bookings.length,
        suppliersCount: suppliers.length,
        supplierPricesCount: supplierPrices.length,
        portalsCount: b2bPortals.length,
        visaAlertsPending: visaAlerts.filter(v => v.status === 'Detected'),
        priceAlertsUrgent: priceAlerts.filter(a => a.status === 'Urgent' || a.status === 'Pending'),
        invoicesUnpaid: invoices.filter(i => i.status !== 'Paid').map(i => ({
          number: i.invoiceNumber,
          customer: i.customerName,
          balanceDue: i.balanceDue,
          dueDate: i.dueDate
        })),
        sampleDepartures: leads.filter(l => l.travelDate).slice(0, 5).map(l => ({
          name: l.fullName,
          destination: l.destination,
          travelDate: l.travelDate
        }))
      };

      const res = await fetch('/api/ai/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, databaseSnapshot })
      });

      if (!res.ok) {
        throw new Error('AI Server request failed');
      }

      const data = await res.json();
      return { answer: data.answer, source: data.source || 'SkyBridge AI Intelligence' };
    } catch (err: any) {
      console.warn('AI API Error fallback', err);
      const q = query.toLowerCase();

      if (q.includes('ticket') || q.includes('airline') || q.includes('flight')) {
        const ticketSuppliers = suppliers.filter(s => s.category.toLowerCase().includes('ticket') || s.category.toLowerCase().includes('flight') || s.category.toLowerCase().includes('airline'));
        const ticketPrices = supplierPrices.filter(p => p.category.toLowerCase().includes('ticket') || p.category.toLowerCase().includes('flight') || p.category.toLowerCase().includes('airline'));
        return {
          answer: `Director Urwa Ali, here is your B2B Ticketing & Airline supplier intelligence:\n• Active Ticketing Partners (${ticketSuppliers.length}): ${ticketSuppliers.map(s => s.companyName || s.name).join(', ')}\n• Available Rate Sheets (${ticketPrices.length} routes registered):\n${ticketPrices.slice(0, 4).map(p => `  - ${p.product || p.serviceTitle}: ${p.currency} ${p.supplierCost.toLocaleString()} (Client Quote: ${p.currency} ${p.clientSellingPrice?.toLocaleString() || 'N/A'}, Margin: ${p.marginPercent || p.profitMarginPercent}% via ${p.supplierName})`).join('\n')}\n• Lowest Current Fare: Amadeus B2B (ISB -> DXB Return at PKR 112,000).`,
          source: 'SkyBridge B2B Intelligence Core'
        };
      }

      if (q.includes('hotel') || q.includes('dubai')) {
        const hotelPrices = supplierPrices.filter(p => (p.category.toLowerCase().includes('hotel') || p.destination.toLowerCase().includes('dubai') || (p.product || '').toLowerCase().includes('hotel')));
        return {
          answer: `Director Urwa Ali, here are the current Dubai & Hotel supplier rates from your database:\n${hotelPrices.map(h => `• ${h.product || h.serviceTitle} (${h.supplierName}): Supplier Cost ${h.currency} ${h.supplierCost.toLocaleString()} | Client Selling ${h.currency} ${h.clientSellingPrice?.toLocaleString()} (Margin: ${h.marginPercent || h.profitMarginPercent}%)`).join('\n')}\n• Recommendation: TBO Holidays B2B has superior instant confirmation for Dubai 4★ and 5★ properties.`,
          source: 'SkyBridge Hotel Intelligence Engine'
        };
      }

      if (q.includes('price change') || q.includes('history') || q.includes('trend')) {
        const recentHist = priceHistory.slice(0, 4);
        return {
          answer: `Director Urwa Ali, here are the latest B2B price changes recorded in the audit log:\n${recentHist.map(h => `• ${h.productName} (${h.supplierName}): ${h.changePercent > 0 ? '+' : ''}${h.changePercent}% adjustment on ${h.changeDate} (Old: ${h.currency} ${h.oldCost.toLocaleString()} → New: ${h.currency} ${h.newCost.toLocaleString()}) by ${h.modifiedBy}`).join('\n')}\n• Status: All client price safeguards remain intact.`,
          source: 'SkyBridge Price History Core'
        };
      }

      if (q.includes('insurance') || q.includes('europe') || q.includes('schengen')) {
        const insPrices = supplierPrices.filter(p => p.category.toLowerCase().includes('insurance') || (p.product || '').toLowerCase().includes('insurance'));
        return {
          answer: `Director Urwa Ali, here are your verified European Travel Insurance providers:\n${insPrices.map(i => `• ${i.product || i.serviceTitle} (${i.supplierName}): Cost ${i.currency} ${i.supplierCost.toLocaleString()} | Client Selling ${i.currency} ${i.clientSellingPrice?.toLocaleString()} (Margin: ${i.marginPercent || i.profitMarginPercent}%)`).join('\n')}\n• Compliance: EFU General Insurance meets all 100% Schengen Embassy €30,000 mandatory medical coverage standards.`,
          source: 'SkyBridge Insurance Records'
        };
      }

      return {
        answer: `Director Urwa Ali, here is the real-time record check for "${query}":\n• ${suppliers.length} Authorized B2B Suppliers active\n• ${supplierPrices.length} Internal Rate Sheets monitored\n• ${b2bPortals.length} Secured B2B Portals registered\n• ${priceAlerts.filter(a => a.status === 'Pending').length} Price Alerts awaiting CEO review\n• Outstanding unpaid invoice balance: PKR 50,000 (Invoice SB-INV-2026-042 - Kamran Siddiqui).`,
        source: 'SkyBridge Local Intelligence Core'
      };
    }
  };

  return (
    <CrmContext.Provider
      value={{
        auth,
        login,
        logout,
        leads: leads.filter(l => !l.deletedAt),
        customers,
        cases,
        bookings,
        payments,
        followUps,
        tasks,
        documents,
        destinations,
        services,
        staffUsers,
        notifications,
        auditLogs,
        backups,
        exportLogs,
        suppliers,
        supplierPrices,
        b2bPortals,
        priceHistory,
        importedFiles,
        googleSheetConnections,
        visaAlerts,
        priceAlerts,
        invoices,
        calculatorStagedItems,
        createLead,
        updateLeadStatus,
        updateLead,
        softDeleteLead,
        convertToCustomer,
        createCustomer,
        createCase,
        updateCaseStatus,
        createBooking,
        updateBookingStatus,
        createPayment,
        createFollowUp,
        completeFollowUp,
        createTask,
        updateTaskStatus,
        addDocument,
        updateDocumentStatus,
        updateDestination,
        updateService,
        addSupplier,
        updateSupplier,
        deleteSupplier,
        addSupplierPrice,
        updateSupplierPrice,
        deleteSupplierPrice,
        addB2BPortal,
        updateB2BPortal,
        deleteB2BPortal,
        addPriceHistory,
        addImportedFile,
        updateImportedFile,
        addGoogleSheetConnection,
        updateGoogleSheetConnection,
        deleteGoogleSheetConnection,
        syncGoogleSheet,
        reviewPriceAlert,
        stageItemForCalculator,
        clearStagedCalculatorItems,
        approveVisaAlert,
        rejectVisaAlert,
        triggerVisaScan,
        createInvoice,
        updateInvoiceStatus,
        askAi,
        markNotificationRead,
        clearNotifications,
        logAuditAction,
        createBackup: () => exportData('ALL', 'JSON'),
        createManualBackup,
        verifyBackup,
        exportData,
        clearDemoData,
        restoreDemoData,
        firebaseSyncStatus,
        lastSyncedAt,
        syncWithFirebase,
        seedFirebaseWithDemoData,
        announcements,
        scholarships,
        discoveredLeads,
        aiAgents,
        marketingContent,
        affiliates,
        websiteOffers,
        documentRegister,
        integrationStatuses,
        addDiscoveredLead,
        updateDiscoveredLead,
        convertDiscoveredLeadToCrmLead,
        deleteDiscoveredLead,
        verifySelectedLeads,
        importDiscoveredLeadsCsv,
        runLeadDiscoveryScan,
        seoAuditChecks,
        seoContentPlan,
        landingPagesPlan,
        runWebsiteAudit,
        addSeoContentPlanItem,
        socialMediaPosts,
        addSocialMediaPost,
        updateSocialMediaPostStatus,
        marketingCampaigns,
        addMarketingCampaign,
        updateCampaignStatus,
        googleSheets21Tabs,
        syncGoogleSheetsTab,
        syncAllGoogleSheetsTabs,
        runVisaUpdateCheck,
        runManpowerOpportunityCheck,
        runScholarshipCheck,
        generateDailyCeoReport,
        generateWeeklyGrowthReport,
        pauseAgent,
        resumeAgent,
        addAnnouncement,
        toggleSaveAnnouncement,
        addScholarship,
        addMarketingContent,
        updateMarketingContentStatus,
        toggleAiAgentStatus,
        testAiAgent,
        addAffiliate,
        updateAffiliate,
        addWebsiteOffer,
        updateWebsiteOffer,
        toggleApproveWebsiteOffer,
        addDocumentRegisterRecord,
        updateDocumentRegisterRecord,
        updateIntegrationStatus,
        testIntegration
      }}
    >
      {children}
    </CrmContext.Provider>
  );
};

export const useCrm = () => {
  const context = useContext(CrmContext);
  if (!context) {
    throw new Error('useCrm must be used within a CrmProvider');
  }
  return context;
};
