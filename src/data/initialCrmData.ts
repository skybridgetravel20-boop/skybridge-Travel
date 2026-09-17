import { Lead, Customer, TravelCase, Booking, Payment, FollowUp, Task, DocumentItem, StaffUser, BackupRecord, AuditLog } from '../types';

export const INITIAL_STAFF_USERS: StaffUser[] = [
  {
    id: 'staff-1',
    name: 'Saman (CEO)',
    email: 'skybridgetravel20@gmail.com',
    role: 'CEO & Founder',
    phone: '+92 324 4444167',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    active: true
  },
  {
    id: 'staff-2',
    name: 'Bilal Khan',
    email: 'bilal@skybridgetravel.com',
    role: 'Operations Manager',
    phone: '+92 324 4444167',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    active: true
  },
  {
    id: 'staff-3',
    name: 'Ayesha Malik',
    email: 'ayesha@skybridgetravel.com',
    role: 'Senior Visa Consultant',
    phone: '+92 322 8889911',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    active: true
  }
];

export const INITIAL_DEMO_LEADS: Lead[] = [
  {
    id: 'SB-2026-00001',
    fullName: 'Kamran Siddiqui',
    email: 'kamran.siddiqui@example.com',
    phone: '+92 300 1234567',
    whatsApp: '+923001234567',
    country: 'Pakistan',
    city: 'Lahore',
    destination: 'France',
    travelDate: '2026-10-15',
    returnDate: '2026-10-28',
    passengers: 2,
    adults: 2,
    children: 0,
    travelType: 'Tourism',
    service: 'Tourist Visa',
    source: 'Website',
    assignedStaffId: 'staff-1',
    assignedStaffName: 'Syed Hamza (Admin)',
    priority: 'High',
    status: 'Documents Requested',
    estimatedValue: 450,
    notes: 'Client requested Schengen visa consultation for couple vacation in Paris. Bank statements requested.',
    createdAt: '2026-09-08T10:30:00.000Z',
    lastContactedAt: '2026-09-09T14:15:00.000Z',
    nextFollowUpDate: '2026-09-12',
    isDemo: true
  },
  {
    id: 'SB-2026-00002',
    fullName: 'Zainab Qureshi',
    email: 'zainab.q@example.com',
    phone: '+92 321 9876543',
    whatsApp: '+923219876543',
    country: 'Pakistan',
    city: 'Karachi',
    destination: 'Saudi Arabia',
    travelDate: '2026-11-01',
    returnDate: '2026-11-12',
    passengers: 4,
    adults: 3,
    children: 1,
    travelType: 'Spiritual',
    service: 'Umrah Package',
    source: 'WhatsApp',
    assignedStaffId: 'staff-2',
    assignedStaffName: 'Bilal Khan',
    priority: 'High',
    status: 'Quotation Sent',
    estimatedValue: 1200,
    notes: 'Family of 4 inquiring about 5-star hotel near Clock Tower Makkah and Haramain train.',
    createdAt: '2026-09-09T08:20:00.000Z',
    lastContactedAt: '2026-09-10T11:00:00.000Z',
    nextFollowUpDate: '2026-09-11',
    isDemo: true
  },
  {
    id: 'SB-2026-00003',
    fullName: 'Hamid Ali',
    email: 'hamid.ali@example.com',
    phone: '+92 333 4567890',
    whatsApp: '+923334567890',
    country: 'Pakistan',
    city: 'Islamabad',
    destination: 'United Kingdom',
    travelDate: '2026-12-05',
    returnDate: '2026-12-20',
    passengers: 1,
    adults: 1,
    children: 0,
    travelType: 'Family Visit',
    service: 'Family Visa',
    source: 'Referral',
    assignedStaffId: 'staff-3',
    assignedStaffName: 'Ayesha Malik',
    priority: 'Medium',
    status: 'New',
    estimatedValue: 350,
    notes: 'Visiting siblings in Manchester. Needs cover letter and financial documentation audit.',
    createdAt: '2026-09-11T09:15:00.000Z',
    nextFollowUpDate: '2026-09-11',
    isDemo: true
  },
  {
    id: 'SB-2026-00004',
    fullName: 'Farhan & Sarah',
    email: 'farhan.sarah@example.com',
    phone: '+92 345 6789012',
    whatsApp: '+923456789012',
    country: 'Pakistan',
    city: 'Lahore',
    destination: 'Bali, Indonesia',
    travelDate: '2026-11-20',
    returnDate: '2026-11-28',
    passengers: 2,
    adults: 2,
    children: 0,
    travelType: 'Leisure',
    service: 'Honeymoon Package',
    source: 'Instagram',
    assignedStaffId: 'staff-2',
    assignedStaffName: 'Bilal Khan',
    priority: 'Medium',
    status: 'Qualified',
    estimatedValue: 850,
    notes: 'Interested in 7-day Ubud jungle villa and Seminyak beach resort combo.',
    createdAt: '2026-09-07T16:45:00.000Z',
    lastContactedAt: '2026-09-08T12:30:00.000Z',
    nextFollowUpDate: '2026-09-14',
    isDemo: true
  }
];

export const INITIAL_DEMO_CUSTOMERS: Customer[] = [
  {
    id: 'CUS-2026-00001',
    fullName: 'Dr. Tariq Mahmood',
    email: 'tariq.mahmood@example.com',
    phone: '+92 301 5554321',
    whatsApp: '+923015554321',
    country: 'Pakistan',
    city: 'Lahore',
    passportNumber: 'BL••••••4',
    notes: 'Converted client. Regularly travels to UK and Schengen for academic conferences.',
    totalBusinessValue: 1850,
    originalLeadId: 'SB-2026-00000',
    createdAt: '2026-08-15T11:00:00.000Z',
    lastInteractionAt: '2026-09-05T16:00:00.000Z',
    isDemo: true
  }
];

export const INITIAL_DEMO_CASES: TravelCase[] = [
  {
    id: 'CASE-2026-00001',
    customerId: 'CUS-2026-00001',
    customerName: 'Dr. Tariq Mahmood',
    service: 'Tourist Visa',
    destination: 'Germany & Switzerland',
    assignedStaffName: 'Syed Hamza (Admin)',
    status: 'In Progress',
    priority: 'High',
    startDate: '2026-09-01',
    targetTravelDate: '2026-10-20',
    notes: 'Conference attendance in Munich followed by Alpine tour. Dossier preparation in review.',
    isDemo: true
  }
];

export const INITIAL_DEMO_BOOKINGS: Booking[] = [
  {
    id: 'BK-2026-00001',
    customerId: 'CUS-2026-00001',
    customerName: 'Dr. Tariq Mahmood',
    caseId: 'CASE-2026-00001',
    type: 'Flight',
    service: 'Flight Booking',
    destination: 'Munich, Germany',
    bookingStatus: 'Quote Sent',
    details: 'Qatar Airways (LHE - DOH - MUC) roundtrip reservation assistance',
    quotedAmount: 950,
    finalAmount: 950,
    currency: 'USD',
    paymentStatus: 'Pending',
    travelDate: '2026-10-18',
    createdAt: '2026-09-04T12:00:00.000Z',
    isDemo: true
  }
];

export const INITIAL_DEMO_PAYMENTS: Payment[] = [
  {
    id: 'PAY-2026-00001',
    customerId: 'CUS-2026-00001',
    customerName: 'Dr. Tariq Mahmood',
    caseId: 'CASE-2026-00001',
    bookingId: 'BK-2026-00001',
    amount: 250,
    currency: 'USD',
    paymentMethod: 'Bank Transfer',
    paymentDate: '2026-09-02',
    transactionReference: 'TXN-984214-PK',
    paymentStatus: 'Paid',
    notes: 'Professional file preparation and documentation retainer fee.',
    createdBy: 'Syed Hamza (Admin)',
    isDemo: true
  }
];

export const INITIAL_DEMO_FOLLOWUPS: FollowUp[] = [
  {
    id: 'fu-1',
    leadId: 'SB-2026-00003',
    customerName: 'Hamid Ali',
    service: 'Family Visa',
    destination: 'United Kingdom',
    date: '2026-09-11',
    time: '14:30',
    staffMember: 'Ayesha Malik',
    followUpType: 'Phone Call',
    notes: 'Discuss UK sponsorship paperwork received from sibling.',
    status: 'Pending',
    priority: 'Medium',
    createdAt: '2026-09-11T09:30:00.000Z',
    isDemo: true
  },
  {
    id: 'fu-2',
    leadId: 'SB-2026-00002',
    customerName: 'Zainab Qureshi',
    service: 'Umrah Package',
    destination: 'Saudi Arabia',
    date: '2026-09-11',
    time: '16:00',
    staffMember: 'Bilal Khan',
    followUpType: 'WhatsApp',
    notes: 'Confirm hotel proximity preference between Clock Tower and Jabal Omar.',
    status: 'Pending',
    priority: 'High',
    createdAt: '2026-09-10T11:30:00.000Z',
    isDemo: true
  },
  {
    id: 'fu-3',
    leadId: 'SB-2026-00001',
    customerName: 'Kamran Siddiqui',
    service: 'Tourist Visa',
    destination: 'France',
    date: '2026-09-12',
    time: '11:00',
    staffMember: 'Syed Hamza (Admin)',
    followUpType: 'Document Reminder',
    notes: 'Remind client for 6-month certified bank statement and NTN tax returns.',
    status: 'Pending',
    priority: 'High',
    createdAt: '2026-09-09T14:30:00.000Z',
    isDemo: true
  }
];

export const INITIAL_DEMO_TASKS: Task[] = [
  {
    id: 'task-1',
    customerName: 'Kamran Siddiqui',
    leadId: 'SB-2026-00001',
    title: 'Draft French Schengen Cover Letter',
    description: 'Structure custom cover letter addressing the French consulate with day-by-day Paris and Nice itinerary.',
    assignedEmployee: 'Syed Hamza (Admin)',
    dueDate: '2026-09-12',
    priority: 'High',
    status: 'In Progress',
    createdAt: '2026-09-09T10:00:00.000Z',
    isDemo: true
  },
  {
    id: 'task-2',
    customerName: 'Zainab Qureshi',
    leadId: 'SB-2026-00002',
    title: 'Prepare Umrah 5-Star Hotel Quotation',
    description: 'Calculate quote for 4 adults including Makkah Swissotel and Madinah Oberoi with transfers.',
    assignedEmployee: 'Bilal Khan',
    dueDate: '2026-09-11',
    priority: 'High',
    status: 'Completed',
    createdAt: '2026-09-10T09:00:00.000Z',
    isDemo: true
  },
  {
    id: 'task-3',
    customerName: 'Dr. Tariq Mahmood',
    leadId: 'CASE-2026-00001',
    title: 'Verify German Visa Appointment Availability',
    description: 'Check appointment slots in Islamabad/Lahore for late September submission.',
    assignedEmployee: 'Ayesha Malik',
    dueDate: '2026-09-13',
    priority: 'Medium',
    status: 'Pending',
    createdAt: '2026-09-10T15:00:00.000Z',
    isDemo: true
  }
];

export const INITIAL_DEMO_DOCUMENTS: DocumentItem[] = [
  {
    id: 'doc-1',
    leadId: 'SB-2026-00001',
    customerName: 'Kamran Siddiqui',
    documentName: 'Passports_Scans_Couple.pdf',
    type: 'Passport',
    uploadDate: '2026-09-08',
    status: 'Under Review',
    notes: 'Valid for 24 months, 6 blank pages verified.',
    fileSize: '3.4 MB',
    isDemo: true
  },
  {
    id: 'doc-2',
    leadId: 'SB-2026-00001',
    customerName: 'Kamran Siddiqui',
    documentName: 'Bank_Statement_6_Months.pdf',
    type: 'Bank Statement',
    uploadDate: '2026-09-09',
    status: 'Requested',
    notes: 'Awaiting official bank branch seal and account maintenance certificate.',
    isDemo: true
  },
  {
    id: 'doc-3',
    customerId: 'CUS-2026-00001',
    customerName: 'Dr. Tariq Mahmood',
    documentName: 'Conference_Invitation_Munich.pdf',
    type: 'Supporting Documents',
    uploadDate: '2026-09-03',
    status: 'Approved',
    notes: 'Official verified conference letter with delegate registration stamp.',
    fileSize: '1.2 MB',
    isDemo: true
  }
];

export const INITIAL_BACKUP_HISTORY: BackupRecord[] = [
  {
    id: 'BKP-2026-00001',
    startTime: '2026-09-10T02:00:00.000Z',
    completionTime: '2026-09-10T02:01:14.000Z',
    size: '4.8 MB',
    status: 'Successful',
    storageLocation: 'Secure Encrypted Volume (Primary DB)',
    schemaVersion: 'v2.4-relational',
    verificationStatus: 'Verified',
    recordCount: 148
  },
  {
    id: 'BKP-2026-00002',
    startTime: '2026-09-11T02:00:00.000Z',
    completionTime: '2026-09-11T02:01:22.000Z',
    size: '5.2 MB',
    status: 'Successful',
    storageLocation: 'Secure Encrypted Volume (Primary DB)',
    schemaVersion: 'v2.4-relational',
    verificationStatus: 'Verified',
    recordCount: 156
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: 'aud-1',
    user: 'Syed Hamza (Admin)',
    action: 'System Startup',
    recordType: 'System',
    recordId: 'SYS-INIT',
    timestamp: '2026-09-11T08:00:00.000Z',
    details: 'SkyBridge Travel CRM and Lead Management core initialized.'
  },
  {
    id: 'aud-2',
    user: 'Syed Hamza (Admin)',
    action: 'Lead Created',
    recordType: 'Lead',
    recordId: 'SB-2026-00003',
    timestamp: '2026-09-11T09:15:00.000Z',
    details: 'Customer inquiry for UK Family Visa received and logged.'
  }
];
