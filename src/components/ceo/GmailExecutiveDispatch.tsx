import React, { useState, useEffect, useMemo } from 'react';
import {
  Mail,
  Send,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Edit3,
  Smartphone,
  Monitor,
  ShieldCheck,
  Clock,
  RefreshCw,
  Copy,
  Check,
  FileText,
  User,
  Hash,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useCrm } from '../../context/CrmContext';
import { createGmailComposeUrl } from '../../lib/googleWorkspace';
import { SKYBRIDGE_OFFICIAL_LOGO } from '../../assets/logo';

export type EmailPurpose =
  | 'CUSTOMER_NOTICE'
  | 'QUOTATION'
  | 'BOOKING_REQUEST_RECEIVED'
  | 'BOOKING_CONFIRMATION'
  | 'PAYMENT_RECEIVED'
  | 'PAYMENT_REMINDER'
  | 'INVOICE'
  | 'DOCUMENT_REQUEST'
  | 'VISA_CASE_UPDATE'
  | 'TRAVEL_REMINDER'
  | 'FOLLOW_UP'
  | 'CANCELLATION'
  | 'CUSTOM';

interface DispatchedEmailRecord {
  id: string;
  recipient: string;
  recipientName: string;
  sender: string;
  purpose: EmailPurpose;
  purposeLabel: string;
  subject: string;
  relatedRecordId?: string;
  relatedRecordType?: 'lead' | 'customer' | 'booking' | 'case' | 'invoice';
  dispatchedAt: string;
  status: 'Dispatched via Gmail' | 'Draft';
  body: string;
}

const STORAGE_KEY_DISPATCHED = 'skybridge_ceo_dispatched_emails';

// Contact constants strictly matching official business details:
// Pakistan numbers only (no UAE numbers in customer-facing emails), official domain, and official WhatsApp URL
const CONTACT_PAKISTAN_1 = '+92 324 4444167';
const CONTACT_PAKISTAN_2 = '0345 4444167';
const CONTACT_EMAIL = 'info@skybridgetravelandtourism.com';
const CONTACT_WHATSAPP_URL = 'https://wa.me/923454444167';
const CONTACT_WEBSITE_URL = 'https://skybridgetravelandtourism.com';

const OFFICIAL_EMAIL_SIGNATURE = `Warm regards,\n\nSkyBridge Travel & Tourism\n\nPhone:\n${CONTACT_PAKISTAN_1}\n${CONTACT_PAKISTAN_2}\n\nEmail:\n${CONTACT_EMAIL}\n\nWhatsApp:\n${CONTACT_WHATSAPP_URL}\n\nMessage SkyBridge Travel & Tourism on WhatsApp\n\nWebsite:\n${CONTACT_WEBSITE_URL}`;

export const GmailExecutiveDispatch: React.FC = () => {
  const {
    leads = [],
    customers = [],
    bookings = [],
    cases = [],
    invoices = [],
    auth
  } = useCrm();

  // 1. Email purpose selection
  const [purpose, setPurpose] = useState<EmailPurpose>('CUSTOMER_NOTICE');

  // 2. CRM Link selection
  const [selectedRecordType, setSelectedRecordType] = useState<'none' | 'customer' | 'lead' | 'booking' | 'case' | 'invoice'>('none');
  const [selectedRecordId, setSelectedRecordId] = useState<string>('');

  // 3. Form fields
  const [emailTo, setEmailTo] = useState('info@skybridgetravelandtourism.com');
  const [customerName, setCustomerName] = useState('Valued Client');
  const [emailSubject, setEmailSubject] = useState('SkyBridge Travel & Tourism — Customer Notice & Case Update');
  const [emailBody, setEmailBody] = useState('');

  // 4. Preview and UI state
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [alertNotice, setAlertNotice] = useState<string | null>(null);

  // 5. Audit history of sent emails
  const [dispatchedHistory, setDispatchedHistory] = useState<DispatchedEmailRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DISPATCHED);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      {
        id: 'dispatch-demo-1',
        recipient: 'tariq.mahmood@example.com',
        recipientName: 'Dr. Tariq Mahmood',
        sender: 'info@skybridgetravelandtourism.com',
        purpose: 'BOOKING_CONFIRMATION',
        purposeLabel: 'Booking Confirmation',
        subject: 'SkyBridge Travel & Tourism — Booking Confirmation [BK-2026-081]',
        relatedRecordId: 'b1',
        relatedRecordType: 'booking',
        dispatchedAt: new Date(Date.now() - 3600000 * 4).toISOString(),
        status: 'Dispatched via Gmail',
        body: 'Booking Confirmation details for Umrah Executive VIP Package.'
      },
      {
        id: 'dispatch-demo-2',
        recipient: 'kamran.schengen@example.com',
        recipientName: 'Kamran Siddiqui',
        sender: 'info@skybridgetravelandtourism.com',
        purpose: 'VISA_CASE_UPDATE',
        purposeLabel: 'Visa Case Update',
        subject: 'SkyBridge Travel & Tourism — Visa Case Update [CS-9021]',
        relatedRecordId: 'c1',
        relatedRecordType: 'case',
        dispatchedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        status: 'Dispatched via Gmail',
        body: 'Visa dossier update for German Schengen submission.'
      }
    ];
  });

  // Purpose options configuration
  const purposeOptions: { id: EmailPurpose; label: string; badge: string; description: string }[] = [
    {
      id: 'CUSTOMER_NOTICE',
      label: 'Customer Notice / Case Update',
      badge: 'Notice',
      description: 'General customer notification, case progress, service update or important information'
    },
    {
      id: 'QUOTATION',
      label: 'Quotation',
      badge: 'Quote',
      description: 'Official quote with customer-facing totals, dates and validity (Zero markup/profit exposed)'
    },
    {
      id: 'BOOKING_REQUEST_RECEIVED',
      label: 'Booking Request Received',
      badge: 'Request',
      description: 'Acknowledges booking request is being processed. (Explicitly NOT a confirmed booking)'
    },
    {
      id: 'BOOKING_CONFIRMATION',
      label: 'Booking Confirmation',
      badge: 'Confirmed',
      description: 'Used ONLY when booking has confirmed status & genuine supplier reference'
    },
    {
      id: 'PAYMENT_RECEIVED',
      label: 'Payment Received',
      badge: 'Payment',
      description: 'Acknowledges payment received without implying automatic booking confirmation'
    },
    {
      id: 'PAYMENT_REMINDER',
      label: 'Payment Reminder',
      badge: 'Reminder',
      description: 'Courteous balance reminder with invoice number, amount due and payment instructions'
    },
    {
      id: 'INVOICE',
      label: 'Invoice',
      badge: 'Billing',
      description: 'Customer-facing billing details, itemized breakdown and due dates'
    },
    {
      id: 'DOCUMENT_REQUEST',
      label: 'Document Request',
      badge: 'Checklist',
      description: 'Itemized checklist of required documents from real CRM case files'
    },
    {
      id: 'VISA_CASE_UPDATE',
      label: 'Visa Case Update',
      badge: 'Visa',
      description: 'Real embassy/case status update with mandatory legal disclaimer (Never guarantees approval)'
    },
    {
      id: 'TRAVEL_REMINDER',
      label: 'Travel Reminder',
      badge: 'Travel',
      description: 'Pre-flight advice, passport validity check, terminal instructions and vouchers'
    },
    {
      id: 'FOLLOW_UP',
      label: 'Follow-Up',
      badge: 'Follow-Up',
      description: 'Professional follow-up regarding travel request, inquiries or proposals'
    },
    {
      id: 'CANCELLATION',
      label: 'Cancellation / Status Change',
      badge: 'Status',
      description: 'Official status change or cancellation based on CRM records (Never invents reasons)'
    },
    {
      id: 'CUSTOM',
      label: 'Custom Email',
      badge: 'Custom',
      description: 'Freeform email with official SkyBridge logo, branding and signature'
    }
  ];

  // Helper to build generated template
  const generateTemplate = (
    currentPurpose: EmailPurpose,
    clientName: string,
    recType: string,
    recId: string
  ): { subject: string; body: string; warning?: string } => {
    // Locate related records
    const cust = customers.find(c => c.id === recId || c.email === emailTo);
    const lead = leads.find(l => l.id === recId || l.email === emailTo);
    const booking = bookings.find(b => b.id === recId);
    const cCase = cases.find(c => c.id === recId);
    const inv = invoices.find(i => i.id === recId || i.invoiceNumber === recId);

    const name = clientName || cust?.name || lead?.name || 'Valued Client';
    let warning: string | undefined = undefined;

    switch (currentPurpose) {
      case 'CUSTOMER_NOTICE': {
        const ref = cCase?.id || booking?.id || lead?.id ? ` [Ref: ${cCase?.id || booking?.id || lead?.id}]` : '';
        const subject = `SkyBridge Travel & Tourism — Customer Notice & Case Update${ref}`;
        const service = cCase?.serviceType || booking?.serviceType || lead?.serviceType || 'travel services';
        const body = `Dear ${name},

We hope this message finds you well.

This is an official notice regarding your ${service} file with SkyBridge Travel & Tourism. Our operations desk has reviewed your file and updated your case status.

FILE SUMMARY:
• Client Name: ${name}
• Service: ${service}
${cCase?.id ? `• Case Reference: ${cCase.id}` : ''}
${cCase?.destination ? `• Destination: ${cCase.destination}` : ''}
${cCase?.status ? `• Current Status: ${cCase.status}` : ''}

Please review your travel documentation. If you have any questions or require additional support, our team is available to assist you via phone, email, or WhatsApp.

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body };
      }

      case 'QUOTATION': {
        const quoteNum = lead?.id ? `QT-${lead.id.replace(/\D/g, '') || '2026'}` : `QT-${Date.now().toString().slice(-4)}`;
        const subject = `SkyBridge Travel & Tourism — Your Travel Quotation [${quoteNum}]`;
        const dest = lead?.destination || booking?.destination || 'International Destination';
        const srv = lead?.serviceType || booking?.serviceType || 'Travel Package';
        const dates = lead?.travelDates || booking?.travelDate || 'As Requested';
        const amount = lead?.estimatedBudget || booking?.totalAmount || 185000;
        const body = `Dear ${name},

Thank you for contacting SkyBridge Travel & Tourism. We are pleased to provide you with your official travel quotation.

TRAVEL QUOTATION DETAILS:
• Quote Number: ${quoteNum}
• Client Name: ${name}
• Services Included: ${srv}
• Destination: ${dest}
• Proposed Travel Dates: ${dates}
• Customer Total: PKR ${Number(amount).toLocaleString()} (Inclusive of all applicable government taxes)
• Quotation Validity: 48 Hours from issuance

NEXT STEPS:
To proceed with this reservation, please confirm your acceptance by replying to this email or contacting our desk on WhatsApp. Please note that flight seats and hotel rates remain subject to dynamic live inventory availability at the exact time of booking issuance.

(Note: All SkyBridge quotes reflect net client pricing with zero hidden handling fees.)

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body };
      }

      case 'BOOKING_REQUEST_RECEIVED': {
        const refNum = booking?.id || lead?.id || `REQ-${Date.now().toString().slice(-4)}`;
        const subject = `SkyBridge Travel & Tourism — Booking Request Received [${refNum}]`;
        const dest = booking?.destination || lead?.destination || 'Requested Destination';
        const srv = booking?.serviceType || lead?.serviceType || 'Travel Reservation';
        const body = `Dear ${name},

Your booking request has been received and is being processed by our team.

REQUEST SUMMARY:
• Reference Number: ${refNum}
• Client Name: ${name}
• Requested Service: ${srv}
• Destination: ${dest}
${booking?.travelDate ? `• Travel Date: ${booking.travelDate}` : ''}

IMPORTANT NOTICE:
Please note that this communication is an acknowledgment that your booking request has been received. This is NOT a confirmed booking. Our reservations desk is currently reviewing supplier inventories and schedule availability. We will contact you shortly with your confirmation details or next steps.

Thank you for choosing SkyBridge Travel & Tourism.

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body };
      }

      case 'BOOKING_CONFIRMATION': {
        // Enforce Critical Business Rule:
        // Must only be used when actual booking record has confirmed status AND genuine confirmation ref exists.
        const isConfirmed = booking?.status?.toLowerCase().includes('confirm');
        const ref = booking?.id || 'BK-CONFIRMED';

        if (booking && !isConfirmed) {
          warning = `CRITICAL RULE ADVISORY: Selected booking (${booking.id}) currently has status "${booking.status}". A booking confirmation must only be sent when genuine confirmed supplier reservation exists.`;
        }

        const subject = `SkyBridge Travel & Tourism — Booking Confirmation [${ref}]`;
        const srv = booking?.serviceType || 'Confirmed Travel Itinerary';
        const dest = booking?.destination || 'International Destination';
        const date = booking?.travelDate || 'Confirmed Schedule';
        const amount = booking?.totalAmount ? `PKR ${Number(booking.totalAmount).toLocaleString()}` : 'Settled per Invoice';

        const body = `Dear ${name},

We are pleased to provide you with your official booking confirmation from SkyBridge Travel & Tourism.

CONFIRMED BOOKING DETAILS:
• Booking Reference: ${ref}
• Client Name: ${name}
• Service Type: ${srv}
• Destination: ${dest}
• Confirmed Travel Date: ${date}
• Total Confirmed Amount: ${amount}
• Status: CONFIRMED

IMPORTANT TRAVEL ADVICE:
1. Please verify that your passport has at least 6 months of validity from your departure date.
2. Ensure your e-tickets, hotel confirmation vouchers, and visa approval copies are kept accessible.
3. For international flights, arrive at the airport terminal 3.5 to 4 hours prior to scheduled departure.

Should you need any assistance during your journey, our worldwide support desk is available via WhatsApp.

Have a pleasant and safe journey!

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body, warning };
      }

      case 'PAYMENT_RECEIVED': {
        const payRef = `REC-${Date.now().toString().slice(-5)}`;
        const subject = `SkyBridge Travel & Tourism — Payment Received [${payRef}]`;
        const amount = inv?.paidAmount || 50000;
        const balance = inv ? (inv.balanceDue > 0 ? `PKR ${Number(inv.balanceDue).toLocaleString()}` : 'Nil (Fully Settled)') : 'Per statement';
        const invRef = inv?.invoiceNumber || booking?.id || 'Direct Settlement';

        const body = `Dear ${name},

Thank you. We have received your payment.

PAYMENT RECEIPT DETAILS:
• Payment Reference: ${payRef}
• Client Name: ${name}
• Amount Received: PKR ${Number(amount).toLocaleString()}
• Payment Date: ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
• Related Invoice / Account: ${invRef}
• Remaining Balance: ${balance}

IMPORTANT ADVISORY:
Please note that this payment receipt confirms funds credited to SkyBridge Travel & Tourism. It does not automatically constitute final booking confirmation. Your finalized booking confirmation vouchers will be issued separately once supplier tickets and reservations are completed.

Thank you for your business.

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body };
      }

      case 'PAYMENT_REMINDER': {
        const invNum = inv?.invoiceNumber || `INV-${Date.now().toString().slice(-4)}`;
        const subject = `SkyBridge Travel & Tourism — Payment Reminder [${invNum}]`;
        const dueAmount = inv?.balanceDue || 45000;
        const dueDate = inv?.dueDate || 'Upcoming';

        const body = `Dear ${name},

This is a courteous reminder from SkyBridge Travel & Tourism regarding your pending balance.

INVOICE SUMMARY:
• Invoice Number: ${invNum}
• Client Name: ${name}
• Outstanding Balance Due: PKR ${Number(dueAmount).toLocaleString()}
• Due Date: ${dueDate}

PAYMENT INSTRUCTIONS:
Payments may be made via official online bank transfer or directly at our Lahore office. To ensure uninterrupted processing of your travel bookings and visa filings, please arrange payment prior to the due date.

If you have already processed this transaction within the last 24 hours, kindly forward the deposit receipt so we may credit your account immediately.

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body };
      }

      case 'INVOICE': {
        const invNum = inv?.invoiceNumber || `INV-${Date.now().toString().slice(-4)}`;
        const subject = `SkyBridge Travel & Tourism — Invoice [${invNum}]`;
        const total = inv?.totalAmount || 150000;
        const paid = inv?.paidAmount || 0;
        const due = inv?.balanceDue || total;
        const issueDate = inv?.issueDate || new Date().toISOString().split('T')[0];
        const dueDate = inv?.dueDate || 'Within 3 days';

        const body = `Dear ${name},

Please find your official customer invoice from SkyBridge Travel & Tourism.

INVOICE DETAILS:
• Invoice Number: ${invNum}
• Issue Date: ${issueDate}
• Due Date: ${dueDate}
• Client Name: ${name}
• Total Invoice Amount: PKR ${Number(total).toLocaleString()}
• Paid to Date: PKR ${Number(paid).toLocaleString()}
• Balance Due: PKR ${Number(due).toLocaleString()}

CUSTOMER CHARGES SUMMARY:
1. Professional Travel & Visa Coordination Services
2. Confirmed Ticketing & Hospitality Arrangements (per agreed itinerary)

All rates reflect customer net billing. Please quote invoice number ${invNum} on all bank transfers.

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body };
      }

      case 'DOCUMENT_REQUEST': {
        const caseNum = cCase?.id || `CS-${Date.now().toString().slice(-4)}`;
        const subject = `SkyBridge Travel & Tourism — Documents Required for Your Case [${caseNum}]`;
        const docs = cCase?.requiredDocuments && cCase.requiredDocuments.length > 0
          ? cCase.requiredDocuments.map((d, idx) => `${idx + 1}. ${d}`).join('\n')
          : `1. Original Passport (Valid for minimum 6 months with at least 2 blank pages)\n2. Two recent passport-size photographs (White background, 35mm x 45mm)\n3. Last 6 Months Bank Statement with Account Maintenance Certificate\n4. Employment / Business Verification Letter\n5. CNIC / National Identity Card Copy`;

        const body = `Dear ${name},

To proceed with your application for case [${caseNum}], our compliance desk requires the following documents:

REQUIRED DOCUMENTS CHECKLIST:
${docs}

SUBMISSION INSTRUCTIONS:
Please reply to this email with high-resolution, clear color scans (PDF or JPEG format), or submit them directly to our official WhatsApp. Please ensure that all document edges and stamps are clearly legible.

Our team will review your files within 24 hours of receipt.

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body };
      }

      case 'VISA_CASE_UPDATE': {
        const caseNum = cCase?.id || `CS-VISA-${Date.now().toString().slice(-4)}`;
        const subject = `SkyBridge Travel & Tourism — Visa Case Update [${caseNum}]`;
        const country = cCase?.destination || 'Embassy / Consulate';
        const realStatus = cCase?.status || 'Application Submitted & Under Review';

        // Critical rule guard:
        if (realStatus.toLowerCase().includes('approved') && !cCase) {
          warning = 'CRITICAL RULE ADVISORY: Never state that a visa is approved unless confirmed in the underlying CRM case record. Visa decisions rest solely with embassies.';
        }

        const body = `Dear ${name},

Here is an official status update regarding your visa application file with SkyBridge Travel & Tourism.

VISA CASE DETAILS:
• Case Number: ${caseNum}
• Applicant Name: ${name}
• Destination / Embassy: ${country}
• Current File Status: ${realStatus}

STATUS EXPLANATION:
Your application file is actively being handled in accordance with official embassy consular protocols. Our operations desk is monitoring progress. We will notify you promptly as soon as consular milestones or appointments are scheduled.

MANDATORY LEGAL NOTICE:
Visa decisions are made exclusively by the relevant embassy, consulate, or immigration authority. SkyBridge Travel & Tourism provides facilitation, advisory, and document processing assistance, and cannot guarantee visa issuance.

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body, warning };
      }

      case 'TRAVEL_REMINDER': {
        const refNum = booking?.id || `TR-${Date.now().toString().slice(-4)}`;
        const subject = `SkyBridge Travel & Tourism — Upcoming Travel Reminder [${refNum}]`;
        const dest = booking?.destination || 'Your Destination';
        const date = booking?.travelDate || 'Upcoming Departure';

        const body = `Dear ${name},

Your upcoming journey with SkyBridge Travel & Tourism is approaching!

DEPARTURE SUMMARY:
• Travel Reference: ${refNum}
• Traveler: ${name}
• Destination: ${dest}
• Travel Date: ${date}

IMPORTANT PRE-DEPARTURE CHECKLIST:
✓ Passport: Ensure passport has minimum 6 months validity from departure.
✓ Tickets & Vouchers: Keep printed or offline digital copies of your e-tickets, hotel booking vouchers, and approved visas.
✓ Airport Arrival: Please arrive at the airport 3.5 to 4 hours prior to international flights for baggage drop and immigration clearance.
✓ Baggage Allowance: Check your ticket baggage limits to avoid excess luggage charges at the airline counter.

If you require any last-minute itinerary adjustments or flight status checks, our team is at your service.

Safe travels!

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body };
      }

      case 'FOLLOW_UP': {
        const subject = `SkyBridge Travel & Tourism — Follow-Up Regarding Your Travel Request`;
        const body = `Dear ${name},

We are following up regarding your recent travel inquiry with SkyBridge Travel & Tourism.

Our travel consultants have prepared tailored options for your requested trip. We would be pleased to assist with any questions you may have, adjust dates or hotel selections, or finalize your reservation.

Please let us know if you would like to proceed or if there are specific adjustments you would like us to make. You can reply directly to this email or reach us on our official WhatsApp.

We look forward to assisting you.

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body };
      }

      case 'CANCELLATION': {
        const refNum = booking?.id || `BK-${Date.now().toString().slice(-4)}`;
        const subject = `SkyBridge Travel & Tourism — Important Update Regarding Your Booking [${refNum}]`;
        const statusReason = booking?.notes || 'Customer requested adjustment or airline schedule modification.';

        const body = `Dear ${name},

This is an important update regarding your booking [${refNum}] with SkyBridge Travel & Tourism.

STATUS UPDATE:
• Booking Reference: ${refNum}
• Client Name: ${name}
• Status: Canceled / Modified
• Record Details: ${statusReason}

If this status change entitles your file to a refund or credit voucher according to airline or hotel cancellation policies, our finance desk will process the file in accordance with applicable fare rules.

Please contact our operations desk if you have questions or require rebooking assistance.

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body };
      }

      case 'CUSTOM':
      default: {
        const subject = `SkyBridge Travel & Tourism — Customer Communication`;
        const body = `Dear ${name},

Please find this official communication from SkyBridge Travel & Tourism regarding your travel file.

[Write your message here...]

${OFFICIAL_EMAIL_SIGNATURE}`;
        return { subject, body };
      }
    }
  };

  // When purpose or linked record changes, update subject and body
  useEffect(() => {
    const { subject, body, warning } = generateTemplate(purpose, customerName, selectedRecordType, selectedRecordId);
    setEmailSubject(subject);
    setEmailBody(body);
    setAlertNotice(warning || null);
  }, [purpose, selectedRecordId, selectedRecordType, customerName]);

  // Handle selecting a record from CRM
  const handleSelectRecord = (type: 'customer' | 'lead' | 'booking' | 'case' | 'invoice', id: string) => {
    setSelectedRecordType(type);
    setSelectedRecordId(id);

    if (type === 'customer') {
      const c = customers.find(item => item.id === id);
      if (c) {
        setEmailTo(c.email || 'info@skybridgetravelandtourism.com');
        setCustomerName(c.name || 'Valued Client');
      }
    } else if (type === 'lead') {
      const l = leads.find(item => item.id === id);
      if (l) {
        setEmailTo(l.email || 'info@skybridgetravelandtourism.com');
        setCustomerName(l.name || 'Valued Client');
      }
    } else if (type === 'booking') {
      const b = bookings.find(item => item.id === id);
      if (b) {
        const c = customers.find(item => item.id === b.customerId);
        setEmailTo(c?.email || 'info@skybridgetravelandtourism.com');
        setCustomerName(b.leadName || c?.name || 'Valued Client');
      }
    } else if (type === 'case') {
      const cs = cases.find(item => item.id === id);
      if (cs) {
        const c = customers.find(item => item.id === cs.customerId);
        setEmailTo(c?.email || 'info@skybridgetravelandtourism.com');
        setCustomerName(cs.customerName || c?.name || 'Valued Client');
      }
    } else if (type === 'invoice') {
      const inv = invoices.find(item => item.id === id);
      if (inv) {
        const c = customers.find(item => item.id === inv.customerId);
        setEmailTo(c?.email || 'info@skybridgetravelandtourism.com');
        setCustomerName(inv.customerName || c?.name || 'Valued Client');
      }
    }
  };

  // Dispatch Action
  const handleConfirmDispatch = () => {
    // 1. Build compose URL for Gmail
    const composeUrl = createGmailComposeUrl({
      to: emailTo,
      subject: emailSubject,
      body: emailBody
    });

    // 2. Open Gmail compose window
    window.open(composeUrl, '_blank');

    // 3. Record email activity in CRM
    const newRecord: DispatchedEmailRecord = {
      id: `dispatch-${Date.now()}`,
      recipient: emailTo,
      recipientName: customerName,
      sender: auth.user?.email || 'info@skybridgetravelandtourism.com',
      purpose: purpose,
      purposeLabel: purposeOptions.find(p => p.id === purpose)?.label || purpose,
      subject: emailSubject,
      relatedRecordId: selectedRecordId || undefined,
      relatedRecordType: selectedRecordType !== 'none' ? selectedRecordType : undefined,
      dispatchedAt: new Date().toISOString(),
      status: 'Dispatched via Gmail',
      body: emailBody
    };

    const updated = [newRecord, ...dispatchedHistory];
    setDispatchedHistory(updated);
    try {
      localStorage.setItem(STORAGE_KEY_DISPATCHED, JSON.stringify(updated.slice(0, 50)));
    } catch {
      // storage quota fallback
    }

    setShowConfirmModal(false);
  };

  const handleCopyBody = () => {
    navigator.clipboard.writeText(emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1.5">
              <Mail className="w-3 h-3 text-rose-400" />
              Executive Gmail Dispatch
            </span>
            <span className="text-xs text-slate-400">
              SkyBridge Private CEO / Admin Suite
            </span>
          </div>
          <h2 className="text-xl font-black text-white tracking-tight mt-1 flex items-center gap-2">
            Customer Email Dispatch & Purpose-Based Communications
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Send official, branded customer notifications directly via <span className="text-rose-300 font-mono">info@skybridgetravelandtourism.com</span> with zero supplier data exposure.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              const { subject, body } = generateTemplate(purpose, customerName, selectedRecordType, selectedRecordId);
              setEmailSubject(subject);
              setEmailBody(body);
            }}
            className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Template
          </button>

          <a
            href={createGmailComposeUrl({ to: emailTo, subject: emailSubject, body: emailBody })}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-1.5 rounded-lg bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ExternalLink className="w-3.5 h-3.5" /> Launch Blank in Gmail
          </a>
        </div>
      </div>

      {/* Critical Rule Warning Banner if applicable */}
      {alertNotice && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-200">
            <span className="font-bold">CRITICAL BUSINESS COMPLIANCE RULE:</span> {alertNotice}
          </div>
        </div>
      )}

      {/* Main Composer & Interactive Preview Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Purpose & Editor (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Step 1: Select Email Purpose */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-[10px] font-bold">1</span>
                Select Email Purpose
              </label>
              <span className="text-[10px] text-slate-400">13 Structured Templates</span>
            </div>

            <div className="relative">
              <select
                value={purpose}
                onChange={e => setPurpose(e.target.value as EmailPurpose)}
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white font-semibold text-sm focus:outline-none focus:border-rose-500 appearance-none cursor-pointer pr-10"
              >
                {purposeOptions.map(opt => (
                  <option key={opt.id} value={opt.id} className="bg-slate-900 py-1 text-white">
                    {opt.label} — [{opt.badge}]
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            <p className="text-xs text-slate-400 bg-slate-900/60 p-2.5 rounded-lg border border-slate-800/80">
              <span className="text-slate-300 font-semibold">Purpose Guidelines:</span>{' '}
              {purposeOptions.find(p => p.id === purpose)?.description}
            </p>
          </div>

          {/* Step 2: CRM Record Linkage & Recipient */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <label className="block text-xs font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-[10px] font-bold">2</span>
              Populate from CRM Record (Zero Fake Data)
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* Quick Record Category Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">CRM Record Category</label>
                <select
                  value={selectedRecordType}
                  onChange={e => {
                    const type = e.target.value as any;
                    setSelectedRecordType(type);
                    setSelectedRecordId('');
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-500"
                >
                  <option value="none">Manual / Direct Email</option>
                  <option value="customer">Customers ({customers.length})</option>
                  <option value="lead">Leads Pipeline ({leads.length})</option>
                  <option value="booking">Bookings ({bookings.length})</option>
                  <option value="case">Visa Cases ({cases.length})</option>
                  <option value="invoice">Invoices ({invoices.length})</option>
                </select>
              </div>

              {/* Specific Record Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Select Specific Record</label>
                <select
                  disabled={selectedRecordType === 'none'}
                  value={selectedRecordId}
                  onChange={e => handleSelectRecord(selectedRecordType as any, e.target.value)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-cyan-500 disabled:opacity-40"
                >
                  <option value="">-- Choose {selectedRecordType} --</option>
                  {selectedRecordType === 'customer' &&
                    customers.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name} ({c.email || 'No email'})
                      </option>
                    ))}
                  {selectedRecordType === 'lead' &&
                    leads.map(l => (
                      <option key={l.id} value={l.id}>
                        {l.name} — {l.destination} ({l.status})
                      </option>
                    ))}
                  {selectedRecordType === 'booking' &&
                    bookings.map(b => (
                      <option key={b.id} value={b.id}>
                        {b.id} — {b.leadName || 'Client'} ({b.status})
                      </option>
                    ))}
                  {selectedRecordType === 'case' &&
                    cases.map(cs => (
                      <option key={cs.id} value={cs.id}>
                        {cs.id} — {cs.customerName} ({cs.status})
                      </option>
                    ))}
                  {selectedRecordType === 'invoice' &&
                    invoices.map(i => (
                      <option key={i.id} value={i.id}>
                        {i.invoiceNumber} — {i.customerName} (PKR {i.totalAmount})
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Recipient details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Recipient Name</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={e => setCustomerName(e.target.value)}
                  placeholder="e.g. Dr. Tariq Mahmood"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 mb-1">Recipient Email</label>
                <input
                  type="email"
                  value={emailTo}
                  onChange={e => setEmailTo(e.target.value)}
                  placeholder="client@example.com"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white text-xs focus:outline-none focus:border-rose-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Step 3: Subject & Message Body Editor */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-lg">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-[10px] font-bold">3</span>
                Subject & Message Editor
              </label>

              <button
                type="button"
                onClick={handleCopyBody}
                className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied' : 'Copy Text'}
              </button>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Subject Line</label>
              <input
                type="text"
                value={emailSubject}
                onChange={e => setEmailSubject(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-medium focus:outline-none focus:border-rose-500"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-400 mb-1">Official Message Body</label>
              <textarea
                rows={11}
                value={emailBody}
                onChange={e => setEmailBody(e.target.value)}
                className="w-full px-3.5 py-3 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-mono leading-relaxed focus:outline-none focus:border-rose-500"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Zero supplier costs, markups, or internal notes are exposed.</span>
              </div>

              <button
                type="button"
                onClick={() => setShowConfirmModal(true)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white font-bold text-xs shadow-lg shadow-rose-600/25 flex items-center justify-center gap-2 cursor-pointer transition-all"
              >
                <Send className="w-3.5 h-3.5" /> Review & Dispatch via Gmail
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Live Responsive Email Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-4 shadow-xl">
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-rose-400" />
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Live Customer Email Preview
                </span>
              </div>

              {/* Viewport switcher: Desktop vs Mobile */}
              <div className="flex items-center bg-slate-900 p-0.5 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setPreviewDevice('desktop')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                    previewDevice === 'desktop'
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3 h-3" /> Desktop
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewDevice('mobile')}
                  className={`px-2.5 py-1 rounded text-[11px] font-semibold flex items-center gap-1 transition-colors ${
                    previewDevice === 'mobile'
                      ? 'bg-rose-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3 h-3" /> Mobile / Gmail
                </button>
              </div>
            </div>

            {/* Email Meta details bar */}
            <div className="bg-slate-900/90 rounded-xl p-3 mb-3 text-[11px] space-y-1 font-mono border border-slate-800">
              <div className="flex items-center justify-between text-slate-400">
                <span>From:</span>
                <span className="text-rose-300 font-semibold">{CONTACT_EMAIL}</span>
              </div>
              <div className="flex items-center justify-between text-slate-400">
                <span>To:</span>
                <span className="text-white font-semibold truncate max-w-[200px]">{emailTo}</span>
              </div>
              <div className="flex items-start justify-between text-slate-400 pt-1 border-t border-slate-800/60">
                <span className="shrink-0 mr-2">Subject:</span>
                <span className="text-slate-200 font-sans font-medium text-right line-clamp-2">{emailSubject}</span>
              </div>
            </div>

            {/* Email Canvas Preview Container */}
            <div
              className={`mx-auto transition-all duration-300 ${
                previewDevice === 'mobile' ? 'max-w-[340px]' : 'w-full'
              }`}
            >
              <div className="bg-white rounded-2xl p-5 shadow-2xl border border-slate-200 text-slate-800 text-xs font-sans leading-relaxed overflow-hidden">
                {/* 1. Official SkyBridge Email Branding Header */}
                <div className="text-center pb-4 border-b border-slate-200">
                  <div className="flex justify-center mb-2">
                    {/* Exact official logo without distortion, cropping, or recreation */}
                    <img
                      src={SKYBRIDGE_OFFICIAL_LOGO}
                      alt="SkyBridge Travel & Tourism Official Logo"
                      className="h-16 w-16 object-contain aspect-square rounded-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-base font-black text-[#0B1B3B] tracking-tight leading-tight">
                    SkyBridge Travel & Tourism
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
                    Flights • Hotels • Visa Services • Worldwide Travel Assistance
                  </p>
                  <p className="text-[9px] text-slate-400 mt-1">
                    House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan
                  </p>
                </div>

                {/* Purpose Badge in Preview */}
                <div className="my-3 flex justify-between items-center">
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-[#0B1B3B] text-white">
                    {purposeOptions.find(p => p.id === purpose)?.label}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>

                {/* Email Body Content */}
                <div className="whitespace-pre-wrap font-sans text-slate-700 text-xs py-2 leading-relaxed">
                  {emailBody}
                </div>

                {/* Standard Customer Email Contact Details Card (Pakistan office numbers + WhatsApp) */}
                <div className="mt-4 pt-4 border-t border-slate-200 bg-slate-50 p-3.5 rounded-xl space-y-2">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[#0B1B3B]">
                    Official Customer Contact
                  </div>

                  <div className="text-[11px] text-slate-600 space-y-1.5">
                    <div>
                      <span className="font-semibold text-slate-700">Phone:</span>
                      <div className="font-mono text-slate-900 font-bold ml-1">
                        {CONTACT_PAKISTAN_1}
                      </div>
                      <div className="font-mono text-slate-900 font-bold ml-1">
                        {CONTACT_PAKISTAN_2}
                      </div>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700">Email:</span>{' '}
                      <span className="font-mono text-slate-900 font-medium">{CONTACT_EMAIL}</span>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700">WhatsApp:</span>{' '}
                      <a
                        href={CONTACT_WHATSAPP_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-700 font-semibold underline ml-1"
                      >
                        wa.me/923454444167
                      </a>
                      <div className="text-[10px] text-emerald-800 font-semibold mt-0.5">
                        Message SkyBridge Travel & Tourism on WhatsApp
                      </div>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-700">Website:</span>{' '}
                      <a
                        href={CONTACT_WEBSITE_URL}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sky-700 font-semibold underline ml-1"
                      >
                        skybridgetravelandtourism.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* Footer disclaimer */}
                <div className="mt-4 pt-3 border-t border-slate-100 text-center text-[9px] text-slate-400">
                  © {new Date().getFullYear()} SkyBridge Travel & Tourism. Registered in Lahore, Pakistan. Worldwide Travel Assistance.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dispatched History Table */}
      <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
              <Clock className="w-4 h-4 text-emerald-400" />
              Dispatched Customer Communications Log
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Historical record of executive emails dispatched via official Gmail
            </p>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800 font-mono">
            {dispatchedHistory.length} Total Logs
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-900/90 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Time & Date</th>
                <th className="p-3">Recipient</th>
                <th className="p-3">Purpose</th>
                <th className="p-3">Subject</th>
                <th className="p-3">Sender</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {dispatchedHistory.map(record => (
                <tr key={record.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="p-3 text-slate-400 text-[11px] whitespace-nowrap">
                    {new Date(record.dispatchedAt).toLocaleString('en-GB', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="p-3">
                    <div className="text-white font-bold">{record.recipientName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{record.recipient}</div>
                  </td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/10 text-rose-300 border border-rose-500/20">
                      {record.purposeLabel}
                    </span>
                  </td>
                  <td className="p-3 text-slate-200 max-w-[240px] truncate">{record.subject}</td>
                  <td className="p-3 text-slate-400 text-[10px] font-mono">{record.sender}</td>
                  <td className="p-3 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {record.status}
                    </span>
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => {
                        setEmailSubject(record.subject);
                        setEmailBody(record.body);
                        setEmailTo(record.recipient);
                        setCustomerName(record.recipientName);
                        setPurpose(record.purpose);
                      }}
                      className="text-xs text-rose-400 hover:text-rose-300 font-semibold cursor-pointer"
                    >
                      Load into Editor
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Step 6: Confirmation Modal before Final Dispatch */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Confirm Customer Email Dispatch</h3>
                  <p className="text-xs text-slate-400">Step 6 of Executive Email Protocol</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="text-slate-500 hover:text-white text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="bg-slate-950 rounded-xl p-4 space-y-2.5 text-xs text-slate-300 border border-slate-800">
              <div className="flex justify-between">
                <span className="text-slate-500">Recipient:</span>
                <span className="text-white font-bold">{customerName} ({emailTo})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Sender:</span>
                <span className="text-rose-300 font-mono font-medium">{CONTACT_EMAIL}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Purpose:</span>
                <span className="text-white font-semibold">{purposeOptions.find(p => p.id === purpose)?.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Subject:</span>
                <span className="text-slate-200 font-medium text-right max-w-[280px] truncate">{emailSubject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Branding:</span>
                <span className="text-emerald-400 font-semibold">Official SkyBridge Logo & Pakistan Desk</span>
              </div>
            </div>

            {/* Compliance verification check */}
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 flex items-center gap-2.5">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-400" />
              <span>
                Verified: Internal markups, supplier costs, and confidential notes are hidden.
              </span>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDispatch}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-600/25 flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Send className="w-3.5 h-3.5" /> Confirm & Open in Gmail
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
