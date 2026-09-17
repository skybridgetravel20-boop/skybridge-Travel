// SkyBridge Travel & Tourism - Data Models & Types

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Documents Requested'
  | 'Documents Received'
  | 'Quotation Sent'
  | 'Follow-up'
  | 'Processing'
  | 'Won'
  | 'Lost';

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

