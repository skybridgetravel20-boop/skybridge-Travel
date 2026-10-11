// SkyBridge Travel & Tourism - Data Models & Types

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Documents Requested'
  | 'Documents Received'
  | 'Quotation Sent'
  | 'Proposal / Quotation Sent'
  | 'In Negotiation'
  | 'Won / Booking Confirmed'
  | 'Follow-up'
  | 'Follow-Up Scheduled'
  | 'Processing'
  | 'On Hold'
  | 'Won'
  | 'Lost'
  | 'Archived';

export type Priority = 'High' | 'Medium' | 'Low';
export type LeadPriority = Priority;

export type LeadSource =
  | 'Website'
  | 'WhatsApp'
  | 'Phone'
  | 'Facebook'
  | 'Instagram'
  | 'TikTok'
  | 'Referral'
  | 'Walk-in'
  | 'Other';

export type ServiceType =
  | 'Flight Booking'
  | 'Hotel Booking'
  | 'Tourist Visa'
  | 'Family Visa'
  | 'Student Visa'
  | 'Business Visa'
  | 'Honeymoon Package'
  | 'Umrah Package'
  | 'Tour Package'
  | 'Airport Transportation'
  | 'Documentation Assistance'
  | 'Other';

export type DestinationCategory =
  | 'Schengen'
  | 'UK / USA / Canada / Australia'
  | 'GCC'
  | 'E-Visa';

export type UserRole =
  | 'Super Admin'
  | 'Manager'
  | 'Agent'
  | 'CEO & Founder'
  | 'Director'
  | 'Director, Skybridge Travel and Tourism'
  | 'Operations Manager'
  | 'Senior Visa Consultant';

export interface StaffUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  avatar?: string;
  active: boolean;
}

export interface Lead {
  id: string; // SB-2026-00001
  fullName: string;
  email: string;
  phone: string;
  leadCategory?: LeadCategory | string;
  companyName?: string;
  leadScore?: number;
  verificationStatus?: string;
  whatsApp?: string;
  country?: string;
  city?: string;
  destination: string;
  travelDate?: string;
  returnDate?: string;
  passengers?: number;
  adults?: number;
  children?: number;
  travelType?: string;
  service: ServiceType;
  source: LeadSource;
  assignedStaffId?: string;
  assignedStaffName?: string;
  assignedStaff?: string; // alias for assignedStaffName
  priority: Priority;
  status: LeadStatus;
  estimatedValue: number;
  notes: string;
  createdAt: string;
  lastContactedAt?: string;
  nextFollowUpDate?: string;
  convertedToCustomerId?: string;
  isDemo?: boolean;
  deletedAt?: string;
  deletedBy?: string;
}

export interface Customer {
  id: string; // CUS-2026-00001
  fullName: string;
  email: string;
  phone: string;
  whatsApp?: string;
  country: string;
  nationality?: string; // alias
  city?: string;
  passportNumber?: string; // masked in lists
  notes: string;
  totalBusinessValue: number;
  totalSpent?: number; // alias
  originalLeadId?: string;
  createdAt: string;
  lastInteractionAt: string;
  isDemo?: boolean;
  deletedAt?: string;
}

export type CaseStatus = 'Open' | 'In Progress' | 'Awaiting Documents' | 'Submitted' | 'Approved' | 'Closed';

export interface TravelCase {
  id: string; // CASE-2026-00001
  customerId: string;
  customerName: string;
  service: ServiceType;
  destination: string;
  assignedStaffName: string;
  status: CaseStatus;
  priority: Priority;
  startDate: string;
  targetTravelDate?: string;
  notes: string;
  isDemo?: boolean;
}

export type BookingType =
  | 'Flight'
  | 'Hotel'
  | 'Tour Package'
  | 'Honeymoon Package'
  | 'Umrah Package'
  | 'Airport Transportation'
  | 'Other Travel Service';

export type BookingStatus =
  | 'Inquiry'
  | 'Quote Requested'
  | 'Quote Sent'
  | 'Pending Confirmation'
  | 'Confirmed'
  | 'Cancelled'
  | 'Completed'
  | 'Refunded';

export interface Booking {
  id: string; // BK-2026-00001
  customerId: string;
  customerName: string;
  caseId?: string;
  type: BookingType;
  service: ServiceType;
  destination: string;
  bookingStatus: BookingStatus;
  status?: string; // alias
  details: string; // Airline/Hotel/Package details
  pnrReference?: string;
  supplierReference?: string; // Supplier Confirmation Reference
  bookingRef?: string; // alias
  quotedAmount: number;
  finalAmount: number;
  totalAmount?: number; // alias
  currency: string;
  paymentStatus: 'Pending' | 'Partial' | 'Paid' | 'Refunded';
  travelDate?: string;
  travelDates?: string; // alias
  createdAt: string;
  isDemo?: boolean;
}

export type PaymentStatus = 'Pending' | 'Partial' | 'Paid' | 'Refunded' | 'Failed' | 'Cancelled';

export interface Payment {
  id: string; // PAY-2026-00001
  customerId: string;
  customerName: string;
  caseId?: string;
  bookingId?: string;
  amount: number;
  currency: string;
  paymentMethod: 'Bank Transfer' | 'Credit Card' | 'Cash' | 'Cheque' | 'Online Gateway';
  method?: string; // alias
  paymentDate: string;
  date?: string; // alias
  transactionReference: string;
  transactionRef?: string; // alias
  paymentStatus: PaymentStatus;
  status?: string; // alias
  notes: string;
  createdBy: string;
  isDemo?: boolean;
}

export interface Quotation {
  id: string; // QT-2026-00001
  customerId: string;
  customerName: string;
  caseId?: string;
  services: string[];
  total: number;
  currency: string;
  validUntil: string;
  status: 'Draft' | 'Sent' | 'Viewed' | 'Accepted' | 'Rejected' | 'Expired';
  notes: string;
  createdAt: string;
}

export type FollowUpType =
  | 'Phone Call'
  | 'WhatsApp'
  | 'Email'
  | 'Meeting'
  | 'Document Reminder'
  | 'Payment Reminder'
  | 'Visa Update'
  | 'Booking Update';

export type FollowUpStatus = 'Pending' | 'Completed' | 'Cancelled';

export interface FollowUp {
  id: string;
  leadId?: string;
  customerId?: string;
  customerName: string;
  service: string;
  destination: string;
  date: string;
  time: string;
  staffMember: string;
  followUpType: FollowUpType;
  notes: string;
  status: FollowUpStatus;
  priority: Priority;
  createdAt: string;
  isDemo?: boolean;
}

export interface Task {
  id: string;
  customerName: string;
  leadId?: string;
  title: string;
  description: string;
  assignedEmployee: string;
  dueDate: string;
  priority: Priority;
  status: 'Pending' | 'In Progress' | 'Completed';
  createdAt: string;
  isDemo?: boolean;
}

export type DocumentType =
  | 'Passport'
  | 'Photograph'
  | 'Bank Statement'
  | 'Employment Letter'
  | 'Cover Letter'
  | 'Travel Itinerary'
  | 'Hotel Reservation'
  | 'Flight Reservation'
  | 'Insurance'
  | 'Supporting Documents'
  | 'Other';

export type DocumentStatus = 'Requested' | 'Received' | 'Under Review' | 'Approved' | 'Missing';

export interface DocumentItem {
  id: string;
  leadId?: string;
  customerId?: string;
  customerName: string;
  documentName: string;
  type: DocumentType;
  uploadDate: string;
  status: DocumentStatus;
  notes: string;
  fileSize?: string;
  isDemo?: boolean;
}

export interface ActivityLog {
  id: string;
  leadId?: string;
  customerId?: string;
  user: string;
  action: string;
  details?: string;
  timestamp: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'lead' | 'followup' | 'document' | 'task' | 'conversion' | 'backup';
  read: boolean;
  link?: string;
}

export interface Destination {
  id: string;
  country: string;
  name?: string;
  region: string;
  category: DestinationCategory;
  description: string;
  image: string;
  visaType: string;
  active: boolean;
  popular?: boolean;
  streamlined?: boolean;
  suitableFor?: string[];
  perfectFor?: string[];
  highlights?: string[];
  visaProcessingTime?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  shortDescription: string;
  fullDescription: string;
  features: string[];
  active: boolean;
}

export interface TravelPackage {
  id: string;
  title: string;
  destination: string;
  category: 'Europe' | 'Middle East' | 'Asia' | 'Family Holidays' | 'Luxury Travel' | 'Group Travel' | 'Honeymoon' | 'Umrah';
  duration: string;
  image: string;
  highlights: string[];
  inclusions: string[];
  exclusions: string[];
  isFeatured?: boolean;
}

export interface Testimonial {
  id: string;
  clientName: string;
  service: string;
  destination: string;
  rating: number;
  review: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface TravelTip {
  id: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  summary: string;
  content: string;
}

export interface BackupRecord {
  id: string; // BKP-2026-00001
  startTime: string;
  completionTime: string;
  size: string;
  status: 'Successful' | 'Running' | 'Failed' | 'Verification Failed';
  storageLocation: string;
  schemaVersion: string;
  verificationStatus: 'Verified' | 'Pending' | 'Failed';
  recordCount: number;
}

export interface AuditLog {
  id: string;
  user: string;
  action: string;
  recordType: string;
  recordId: string;
  timestamp: string;
  details: string;
}

export interface ExportLog {
  id: string; // EXP-2026-00001
  user: string;
  exportType: string;
  filtersUsed: string;
  recordCount: number;
  timestamp: string;
  format: 'CSV' | 'JSON' | 'XLSX';
}

// B2B Supplier Management & Portal Directory
export type SupplierCategory =
  | 'Airline / Ticketing'
  | 'Flight Consolidator'
  | 'Hotel B2B'
  | 'Visa Supplier'
  | 'Insurance Provider'
  | 'Tour Operator'
  | 'Honeymoon Supplier'
  | 'Umrah Supplier'
  | 'Airport Transfer'
  | 'Transportation'
  | 'Documentation Service'
  | 'Local Partner'
  | 'Other'
  // Backwards compatibility aliases
  | 'Airlines / Ticketing'
  | 'Hotels & Accommodations'
  | 'Visa Processing'
  | 'Travel Insurance'
  | 'Ground Transportation'
  | 'Holiday Packages & DMCs';

export interface Supplier {
  id: string; // SUP-2026-00001
  name: string; // Company Name
  companyName?: string;
  code: string;
  category: SupplierCategory;
  country?: string;
  city?: string;
  contactPerson: string;
  email: string;
  phone: string;
  whatsApp?: string;
  whatsapp?: string;
  website?: string;
  portalUrl?: string;
  portalLoginUrl?: string;
  loginUsername?: string;
  portalUsername?: string;
  portalPassword?: string;
  portalNotes?: string;
  accountManager?: string;
  services?: string[] | string;
  apiStatus: 'Connected' | 'Manual' | 'Offline';
  connectionType?: 'Direct Portal' | 'GDS API' | 'Email/WhatsApp' | 'Google Sheet Sync';
  rating: number;
  currency: string;
  paymentTerms: string;
  cancellationTerms?: string;
  creditLimit?: number;
  currentBalance?: number;
  status: 'Active' | 'Under Review' | 'Inactive';
  notes: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt?: string;
  isDemo?: boolean;
}

export interface B2BPortal {
  id: string; // POR-2026-00001
  portalName: string;
  name?: string;
  supplierId: string;
  supplierName: string;
  category?: SupplierCategory;
  websiteUrl?: string;
  loginUrl?: string;
  portalUrl?: string;
  description?: string;
  usernameField?: string;
  username?: string;
  password?: string;
  pinCode?: string;
  accountNumber?: string;
  creditLimit?: number;
  balance?: number;
  currency?: string;
  authorizedStaff?: string | string[];
  hasSecureCredentialReference?: boolean;
  active?: boolean;
  status?: 'Active' | 'Maintenance' | 'Disabled';
  lastChecked?: string;
  lastAccessed?: string;
  notes: string;
  apiStatus?: 'Manual' | 'Connected' | 'Offline';
}

// Private Supplier Price Management & Rate Sheets
export interface SupplierPrice {
  id: string; // PRC-2026-00001
  supplierId: string;
  supplierName: string;
  category: SupplierCategory;
  serviceTitle: string; // Product / Service Name
  product?: string;
  destination: string;
  origin?: string;
  travelDate?: string;
  returnDate?: string;
  adults?: number;
  children?: number;
  infants?: number;
  rooms?: number;
  nights?: number;
  airline?: string;
  flightNumber?: string;
  hotel?: string;
  roomType?: string;
  mealPlan?: string;
  visaType?: string;
  insuranceType?: string;
  supplierCost: number;
  recommendedSellingPrice?: number;
  clientSellingPrice: number;
  sellingPrice?: number;
  profitMarginAmount?: number;
  marginAmount?: number;
  profitMarginPercent?: number;
  marginPercent?: number;
  currency: string;
  taxes?: number;
  additionalFees?: number;
  bookingMethod?: string;
  cancellationPolicy?: string;
  inclusions?: string;
  exclusions?: string;
  exchangeRate?: number;
  pkrCost?: number;
  bookingDeadline?: string;
  validityDate?: string; // Price Valid Until
  validityStart?: string;
  validityEnd?: string;
  supplierReference?: string;
  lastChecked?: string;
  dateChecked?: string;
  checkedBy?: string;
  availability?: 'Instant Confirm' | 'On Request' | 'Limited' | 'Sold Out';
  status?: 'Active' | 'Price Changed' | 'Expired';
  notes: string;
  internalNotes?: string;
  isManualPrice?: boolean; // Displays "MANUAL PRICE" badge
  source?: 'Manual B2B Portal' | 'Excel Import' | 'Google Sheets' | 'GDS Direct' | 'Direct Portal' | 'WhatsApp Quote' | string;
  lastUpdated?: string;
  isDemo?: boolean;
}

// Price History Tracking
export interface PriceHistoryRecord {
  id: string;
  priceId?: string;
  supplierPriceId?: string;
  product?: string;
  productName?: string;
  supplierName: string;
  destination?: string;
  cost?: number;
  oldCost?: number;
  newCost?: number;
  changePercent?: number;
  currency: string;
  date?: string;
  changeDate?: string;
  source: string;
  modifiedBy?: string;
  changeNote?: string;
  reason?: string;
}

// Imported File Library Record
export interface ImportedFileRecord {
  id: string;
  fileName: string;
  fileType: 'xlsx' | 'xls' | 'csv' | 'Excel';
  supplierId?: string;
  supplierName?: string;
  uploadDate?: string;
  uploadedBy?: string;
  importedAt?: string;
  importedBy?: string;
  recordsImported?: number;
  recordsAdded?: number;
  recordsUpdated?: number;
  recordsTotal?: number;
  rowCount?: number;
  targetEntity?: string;
  source?: string;
  importStatus?: 'Completed' | 'Errors' | 'Archived';
  status?: 'Completed' | 'Errors' | 'Processing' | 'Archived' | 'Success';
  lastProcessed?: string;
  errorCount?: number;
  duplicateCount?: number;
  notes?: string;
}

// Google Sheets Sync Configuration
export interface GoogleSheetConnection {
  id: string;
  name?: string;
  sheetTitle?: string;
  spreadsheetUrl?: string;
  sheetUrl?: string;
  spreadsheetId?: string;
  supplierId?: string;
  supplierName?: string;
  worksheet?: string;
  targetEntity?: string;
  columnMapping?: Record<string, string>;
  syncDirection?: 'Import Only' | 'Two-Way Sync' | 'Import to SkyBridge';
  schedule?: 'Manual only' | 'Every 15 minutes' | 'Every hour' | 'Every 6 hours' | 'Daily';
  frequency?: string;
  lastSync?: string;
  lastSyncTime?: string;
  nextScheduledSync?: string;
  syncStatus?: 'Connected' | 'Syncing' | 'Requires API Key' | 'Error' | 'Idle';
  status?: 'Connected' | 'Syncing' | 'Requires API Key' | 'Error' | 'Idle' | 'Active' | 'Paused';
  autoUpdateRules?: string;
  syncErrors?: string[];
  recordsSynced?: number;
  apiKeyConfigured?: boolean;
}

// Official Visa Intelligence & Fee Update Detection
export interface VisaIntelligenceItem {
  id: string; // VINT-2026-00001
  country: string;
  visaCategory: string;
  previousFee: number;
  newFee: number;
  currency: string;
  effectiveDate: string;
  authoritySource: string;
  officialUrl?: string;
  checkedDate: string;
  status: 'Detected' | 'Approved' | 'Rejected';
  approvedAt?: string;
  approvedBy?: string;
  urgency: 'Critical' | 'Moderate' | 'Notice';
  notes: string;
  requirementChanges?: string[];
  isDemo?: boolean;
}

// AI Price Alerts & Volatility Tracking
export interface PriceAlert {
  id: string; // ALT-2026-00001
  itemTitle?: string;
  serviceTitle?: string;
  category?: SupplierCategory;
  supplierName?: string;
  supplierPriceId?: string;
  destination?: string;
  previousPrice?: number;
  oldCost?: number;
  newPrice?: number;
  newCost?: number;
  currency: string;
  changeType?: 'Increase' | 'Decrease';
  changePercent?: number;
  differencePercent?: number;
  detectedAt: string;
  status: 'Urgent' | 'Under Review' | 'Acknowledged' | 'Pending' | 'Approved' | 'Rejected';
  notes: string;
  isDemo?: boolean;
}

// Invoices & Billing
export interface InvoiceLineItem {
  description: string;
  category: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface Invoice {
  id: string; // INV-2026-00001
  invoiceNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  issueDate: string;
  dueDate: string;
  items: InvoiceLineItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  paidAmount: number;
  balanceDue: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Partial' | 'Overdue';
  currency: string;
  notes: string;
  terms: string;
  createdAt: string;
  isDemo?: boolean;
}

// --------------------------------------------------------------------------
// Intelligence Hub & Verified Announcements
// --------------------------------------------------------------------------
export type AnnouncementCategory =
  | 'Work Permits'
  | 'Overseas Jobs'
  | 'Recruitment Agencies'
  | 'Fully Funded Scholarships'
  | 'Student Admissions'
  | 'Visa & Immigration Updates'
  | 'Travel Industry News';

export type VerificationStatus =
  | 'Verified — Official Source'
  | 'Verified — Multiple Reliable Sources'
  | 'Partially Verified'
  | 'Unverified'
  | 'Suspicious'
  | 'Expired'
  | 'Closed'
  | 'Rejected';

export interface IntelligenceAnnouncement {
  id: string; // ANN-2026-00001
  title: string;
  country: string;
  category: AnnouncementCategory;
  summary: string;
  fullDescription: string;
  announcementDate: string;
  publicationDate: string;
  dateDiscovered: string;
  applicationOpenDate?: string;
  applicationDeadline?: string;
  officialSourceName: string;
  officialSourceUrl: string;
  corroboratingSources?: string[];
  employerOrInstitution?: string;
  recruitmentAgency?: string;
  opportunityType?: string;
  eligibleNationalities?: string[];
  eligibilityRequirements?: string;
  requiredQualifications?: string;
  requiredExperience?: string;
  salary?: string;
  salaryCurrency?: string;
  salaryPeriod?: string;
  benefits?: string;
  accommodationInfo?: string;
  workPermitInfo?: string;
  visaSponsorshipStatus?: 'Confirmed by Official Source' | 'Confirmed by Employer' | 'Reported but Not Independently Verified' | 'Not Confirmed' | 'Not Applicable' | 'Unknown';
  scholarshipAmount?: string;
  tuitionCoverage?: string;
  livingAllowance?: string;
  applicationFee?: string;
  applicationUrl?: string;
  contactInfo?: string;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
  lastVerifiedDate: string;
  nextVerificationDate?: string;
  confidenceExplanation?: string;
  internalNotes?: string;
  recommendedAction?: string;
  recordOwner?: string;
  recordStatus?: 'Open' | 'Closing Soon' | 'Closed' | 'Suspended' | 'Verification Required' | 'Rejected';
  isSaved?: boolean;
}

// --------------------------------------------------------------------------
// Scholarship Intelligence Database
// --------------------------------------------------------------------------
export interface ScholarshipRecord {
  id: string; // SCH-2026-00001
  country: string;
  universityName: string;
  scholarshipName: string;
  scholarshipProvider: string;
  officialWebsite: string;
  scholarshipLevel: 'Bachelor' | 'Master' | 'PhD' | 'Postdoc' | 'Vocational';
  subjectArea: string;
  eligibleNationalities: string[];
  pakistanEligible: boolean;
  academicRequirements: string;
  languageRequirements: string;
  tuitionCoverage: string;
  monthlyStipend?: string;
  stipendCurrency?: string;
  accommodationCoverage: boolean;
  travelCoverage: boolean;
  insuranceCoverage: boolean;
  otherBenefits?: string;
  fullyFundedStatus: 'Fully Funded' | 'Partially Funded' | 'Tuition Waiver Only' | 'Funding Not Confirmed';
  fundingEvidence: string;
  applicationOpenDate?: string;
  applicationDeadline: string;
  academicYear: string;
  requiredDocuments: string[];
  applicationProcess: string;
  officialApplicationUrl: string;
  officialSourceUrl: string;
  verificationStatus: VerificationStatus;
  verificationNotes?: string;
  lastVerifiedDate: string;
  nextReviewDate?: string;
  scholarshipStatus: 'Open' | 'Closing Soon' | 'Closed' | 'Upcoming';
  internalNotes?: string;
  recordOwner?: string;
  updatedAt: string;
}

// --------------------------------------------------------------------------
// SkyBridge Lead Hunter AI (Discovered Leads)
// --------------------------------------------------------------------------
export type LeadCategory =
  | 'Flight Booking Customer'
  | 'Hotel Booking Customer'
  | 'Holiday Package Customer'
  | 'Umrah Customer'
  | 'Visa Documentation Customer'
  | 'Travel Insurance Customer'
  | 'Airport Transfer Customer'
  | 'Corporate Travel Customer'
  | 'Travel Agency Partner'
  | 'Recruitment Agency Partner'
  | 'Employer or Hiring Company'
  | 'Scholarship Opportunity'
  | 'Tourism Partner'
  | 'Supplier'
  | 'Other Business Opportunity';

export type DiscoveredLeadStatus =
  | 'New'
  | 'Unverified'
  | 'Verification Required'
  | 'Verified'
  | 'Qualified'
  | 'Contact Permission Required'
  | 'Ready for Approved Outreach'
  | 'Contacted'
  | 'Responded'
  | 'Interested'
  | 'Quotation Sent'
  | 'Follow-up Required'
  | 'Converted'
  | 'Lost'
  | 'Do Not Contact'
  | 'Archived';

export type SourcePlatform =
  | 'Google Search'
  | 'Facebook'
  | 'Instagram'
  | 'TikTok'
  | 'YouTube'
  | 'LinkedIn'
  | 'Pinterest'
  | 'Google Business Profile and Maps'
  | 'Public Directory'
  | 'Career Page'
  | 'Official Source'
  | 'Manual Import';

export interface DiscoveredLead {
  id: string; // LEAD-HUNT-00001
  dateDiscovered: string;
  companyOrOrgName: string;
  contactPerson?: string;
  businessEmail?: string;
  businessPhone?: string;
  website?: string;
  sourcePlatform: SourcePlatform | string;
  sourceUrl: string;
  country: string;
  city?: string;
  leadCategory: LeadCategory | string;
  potentialServiceRequired: string;
  estimatedBusinessValue?: number;
  leadScore: number; // 0 - 100
  scoreReasons: string[];
  verificationStatus: 'Verified' | 'Qualified' | 'Verification Required' | 'Unverified' | 'Do Not Contact';
  consentStatus?: 'Consent Verified' | 'Public Business Listing' | 'Contact Permission Required';
  lastVerifiedDate: string;
  assignedStaff?: string;
  followUpDate?: string;
  leadStatus: DiscoveredLeadStatus;
  notes: string;
  nextRecommendedAction: string;
  convertedToCrmLeadId?: string;
  doNotContact?: boolean;
}

// --------------------------------------------------------------------------
// SkyBridge Traffic Growth AI & SEO Types
// --------------------------------------------------------------------------
export interface SeoAuditCheck {
  id: string;
  checkName: string;
  category: 'Technical' | 'Content' | 'Conversion' | 'Compliance';
  status: 'Pass' | 'Notice' | 'Warning' | 'Action Required';
  description: string;
  recommendation: string;
  targetUrl?: string;
}

export interface SeoContentPlanItem {
  id: string;
  targetAudience: string;
  searchIntent: 'Informational' | 'Commercial' | 'Transactional' | 'Navigational';
  suggestedTitle: string;
  mainKeyword: string;
  relatedKeywords: string[];
  metaDescription: string;
  suggestedPageUrl: string;
  articleOutline: string[];
  internalLinkingRecommendations: string[];
  callToAction: string;
  suggestedPublicationDate: string;
  status: 'Planned' | 'In Writing' | 'Under Review' | 'Published';
}

export interface LandingPagePlanItem {
  url: string;
  title: string;
  category: string;
  status: 'Live & Active' | 'Needs Optimization' | 'Recommended to Create';
  primaryCta: string;
  targetAudience: string;
}

// --------------------------------------------------------------------------
// Social Media Growth Center & Approval Workflow
// --------------------------------------------------------------------------
export type SocialPlatform = 'Facebook' | 'Instagram' | 'TikTok' | 'YouTube' | 'LinkedIn' | 'Pinterest';
export type SocialContentApprovalStatus = 'Draft' | 'CEO Review' | 'Approved' | 'Ready to Publish' | 'Published' | 'Performance Review';

export interface SocialMediaPostItem {
  id: string;
  platform: SocialPlatform;
  postType: 'Standard Post' | 'Reel / Short Script' | 'Video Script' | 'Carousel' | 'Pin / Board' | 'B2B Article';
  campaignName: string;
  topic: string;
  captionOrScript: string;
  hashtags: string[];
  callToAction: string;
  mediaNote: string;
  targetAudience: string;
  plannedDate: string;
  contentStatus: SocialContentApprovalStatus;
  ceoApprovedBy?: string;
  ceoApprovalDate?: string;
  rejectionReason?: string;
  createdAt: string;
}

// --------------------------------------------------------------------------
// Marketing Campaign & Promotional Message Center
// --------------------------------------------------------------------------
export interface MarketingCampaignRecord {
  id: string; // CAMP-2026-0001
  campaignName: string;
  campaignObjective: string;
  serviceCategory: string;
  targetAudience: string;
  countryOrRegion: string;
  language: string;
  offerTitle: string;
  offerDescription: string;
  validFromDate: string;
  validUntilDate: string;
  verifiedPrice: number;
  currency: string;
  termsAndConditions: string;
  landingPage: string;
  campaignSource: string;
  trackingParameters: string;
  approvalStatus: 'Draft' | 'CEO Review' | 'Approved' | 'Active' | 'Paused' | 'Completed' | 'Rejected';
  channels: ('Website' | 'Email' | 'WhatsApp Business' | 'Facebook' | 'Instagram' | 'TikTok' | 'YouTube' | 'LinkedIn' | 'Pinterest')[];
  results?: {
    impressions?: number;
    clicks?: number;
    enquiries?: number;
    conversions?: number;
  };
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

// --------------------------------------------------------------------------
// AI Agent Control Centre Registry
// --------------------------------------------------------------------------
export type AgentOperationalStatus =
  | 'Active and Tested'
  | 'Active but Not Fully Tested'
  | 'Needs Configuration'
  | 'Authentication Required'
  | 'API Required'
  | 'Permission Required'
  | 'Paused'
  | 'Failed'
  | 'Disabled';

export interface AiAgentRegistryItem {
  id: string; // AGENT-001
  name: string;
  shortCode: string;
  purpose: string;
  responsibilities: string[];
  dataSources: string[];
  permittedTools: string[];
  readPermissions: string[];
  writePermissions: string[];
  schedule: string;
  lastExecution?: string;
  nextScheduledExecution?: string;
  lastSuccessfulExecution?: string;
  errorStatus?: string;
  operationalStatus: AgentOperationalStatus;
  owner: string;
  version: string;
  configurationNotes?: string;
  lastTestedDate?: string;
  testPassed?: boolean;
}

// --------------------------------------------------------------------------
// Content Calendar & Marketing Campaigns
// --------------------------------------------------------------------------
export interface MarketingContentItem {
  id: string; // CONT-2026-00001
  plannedDate: string;
  platform: 'Website' | 'Facebook' | 'Instagram' | 'TikTok' | 'LinkedIn' | 'X' | 'YouTube' | 'WhatsApp';
  contentCategory: string;
  campaignName: string;
  topic: string;
  country?: string;
  service?: string;
  caption: string;
  hashtags: string[];
  callToAction: string;
  contentStatus: 'Draft' | 'CEO Review' | 'Approved' | 'Ready to Publish' | 'Published';
  factCheckStatus: 'Verified' | 'Pending Verification' | 'Rejected';
  sourceReference?: string;
  performanceNotes?: string;
  createdAt: string;
  updatedAt: string;
}

// --------------------------------------------------------------------------
// CEO Reports & Executive Analytics
// --------------------------------------------------------------------------
export interface CeoReportItem {
  id: string; // REPORT-2026-00001
  reportType: 'Daily Intelligence & Operations' | 'Weekly Growth & Pipeline' | 'Monthly Executive Review';
  title: string;
  period: string;
  generatedAt: string;
  summary: string;
  metrics: {
    newLeads: number;
    verifiedLeads: number;
    activeBookings: number;
    pipelineValuePkr: number;
    totalRevenuePkr: number;
    openInquiries: number;
    verifiedAnnouncements: number;
    urgentAlertsCount: number;
  };
  recommendedPriorities: string[];
  urgentAlerts: string[];
  operationalHighlights: string[];
}

// --------------------------------------------------------------------------
// Section 20: Affiliate Tracking & Travelpayouts Programs
// --------------------------------------------------------------------------
export interface AffiliateTrackingRecord {
  id: string; // AFF-2026-00001
  affiliateNetwork: string; // Travelpayouts / Direct
  brandName: string; // Booking.com, Trip.com, Viator, Agoda, etc.
  brandCategory: 'Hotel' | 'Flight' | 'Tours & Activities' | 'eSIM / Telecom' | 'Car Rental' | 'Airport Transfers' | 'Insurance' | 'Packages';
  country?: string;
  destination?: string;
  projectName: string;
  affiliateAccountStatus: 'Registered' | 'Application Pending' | 'Approved' | 'Suspended';
  programApplicationStatus: 'Approved' | 'Pending' | 'Needs Application';
  programApprovalStatus: 'Approved' | 'Pending Approval' | 'Under Review';
  rewardRate: string; // e.g. "4% - 6% of booking"
  rewardRateType: 'Percentage' | 'Fixed Fee' | 'Tiered';
  cookieDuration: string; // e.g. "30 days"
  affiliateUrl: string;
  deepLink?: string;
  subId: string;
  placement: string;
  landingPageUrl: string;
  campaignName: string;
  linkStatus: 'Active' | 'Needs Testing' | 'Inactive';
  linkLastTested: string;
  apiAvailable: boolean;
  widgetAvailable: boolean;
  integrationStatus: 'Level 1: Manual Links' | 'Level 2: Authorized Widgets' | 'Level 3: Authorized API / White-Label';
  reportedClicks: number;
  reportedConversions: number;
  reportedCommission: number;
  commissionCurrency: string;
  pendingCommission: number;
  approvedCommission: number;
  paidCommission: number;
  lastReportDate: string;
  notes: string;
  updatedAt: string;
}

// --------------------------------------------------------------------------
// Section 21: Website Offers (Approved Customer-Facing Deals)
// --------------------------------------------------------------------------
export interface WebsiteOfferRecord {
  id: string; // OFFER-2026-00001
  offerTitle: string;
  offerCategory: 'Flight' | 'Hotel' | 'Umrah' | 'Holiday Package' | 'Visa Assistance' | 'Overseas Opportunity' | 'Scholarship' | 'Insurance';
  destination: string;
  shortDescription: string;
  fullDescription: string;
  imageUrl?: string;
  displayPrice: number;
  priceCurrency: string;
  priceLastChecked: string;
  priceSource: string;
  availabilityStatus: 'Available' | 'Limited Seats' | 'Call to Confirm' | 'Expired';
  supplierId?: string;
  affiliateRecordId?: string;
  actualAffiliateUrl?: string;
  ctaText: string;
  landingPageUrl: string;
  displayLocation: 'Homepage Hero' | 'Featured Packages' | 'Deals Banner' | 'Visa Portal' | 'Umrah Desk';
  publishStartDate: string;
  publishEndDate: string;
  offerStatus: 'Draft' | 'Published' | 'Paused' | 'Archived';
  adminApproved: boolean;
  lastVerifiedDate: string;
  updatedAt: string;
}

// --------------------------------------------------------------------------
// Section 23: Google Drive Document Register
// --------------------------------------------------------------------------
export interface DocumentRegisterRecord {
  id: string; // DOC-2026-00001
  documentName: string;
  documentCategory:
    | 'Company Registration'
    | 'Travel Agency Licence'
    | 'NTN'
    | 'NOC'
    | 'Supplier Agreement'
    | 'Supplier Rate Sheet'
    | 'Customer Documents'
    | 'Visa Documents'
    | 'Job Documents'
    | 'Scholarship Documents'
    | 'Booking Documents'
    | 'Invoice'
    | 'Receipt'
    | 'Marketing Creative'
    | 'Other';
  relatedCustomerId?: string;
  relatedCustomerName?: string;
  relatedSupplierId?: string;
  relatedJobId?: string;
  relatedScholarshipId?: string;
  relatedBookingId?: string;
  driveFileId?: string;
  driveFileUrl: string;
  documentOwner: string;
  accessClassification: 'Restricted (CEO & Ops Only)' | 'Confidential' | 'Internal Team' | 'Public Documentation';
  documentStatus: 'Active & Verified' | 'Pending Review' | 'Expired' | 'Archived';
  expiryDate?: string;
  lastVerifiedDate: string;
  createdAt: string;
  updatedAt: string;
  notes: string;
}

// --------------------------------------------------------------------------
// Section 32: Integration Status Centre
// --------------------------------------------------------------------------
export interface IntegrationStatusItem {
  id: string;
  name: string;
  category: 'Google Workspace' | 'Suppliers & Portals' | 'Affiliate Networks' | 'Communication & CRM' | 'Cloud & AI Infrastructure';
  purpose: string;
  connectionStatus:
    | 'Connected and Tested'
    | 'Connected but Not Tested'
    | 'Authentication Required'
    | 'Permission Required'
    | 'API Credentials Required'
    | 'Supplier Approval Required'
    | 'Configuration Required'
    | 'Error'
    | 'Disabled'
    | 'Not Supported';
  authStatus: 'Authorized' | 'Pending OAuth' | 'Token Expired' | 'Manual Portal Credential' | 'Public Grounded API';
  permissionStatus: 'Full Operational' | 'Read Only' | 'Pending Approval' | 'Needs Admin Consent';
  apiStatus: 'Operational' | 'Testing Pending' | 'No Public API' | 'API Pending Approval';
  lastSuccessfulTest?: string;
  lastError?: string;
  requiredNextAction: string;
  documentationUrl?: string;
  responsibleAdministrator: string;
}


