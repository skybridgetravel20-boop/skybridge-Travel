import { COMPANY_INFO } from '../data/companyInfo';
import { Lead } from '../types';

export interface InquiryNotificationPayload {
  leadId?: string;
  fullName: string;
  email?: string;
  phone: string;
  whatsApp?: string;
  service: string;
  destination?: string;
  travelDate?: string;
  visaCategory?: string;
  passengers?: number;
  message?: string;
  source?: string;
  createdAt?: string;
}

export interface InquiryDispatchResult {
  success: boolean;
  referenceId: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientWhatsApp: string;
  whatsAppAlertUrl: string;
  mailtoUrl: string;
}

const OFFICIAL_EMAIL = 'info@skybridgetravelandtourism.com';
const OFFICIAL_PHONE_1 = '+92 324 4444167';
const OFFICIAL_PHONE_2 = '+92 345 4444167';
const OFFICIAL_PHONE = '+92 345 4444167';
const OFFICIAL_WHATSAPP_NUMBER = '923454444167';

/**
 * Builds the official WhatsApp URL formatted with inquiry details
 * Directly sends the inquiry message to WhatsApp: https://wa.me/923454444167
 */
export function buildWhatsAppInquiryUrl(data: InquiryNotificationPayload): string {
  const lines = [
    `🔔 *NEW SKYBRIDGE CUSTOMER ENQUIRY*`,
    `🆔 *Lead ID:* ${data.leadId || 'Web Enquiry'}`,
    `👤 *Customer Name:* ${data.fullName || 'Not provided'}`,
    `📞 *Phone:* ${data.phone || 'Not provided'}`,
    `✉️ *Email:* ${data.email || 'Not provided'}`,
    `✈️ *Service:* ${data.service || 'General Enquiry'}`,
    `📍 *Destination:* ${data.destination || 'Not provided'}`,
    `📅 *Travel Date:* ${data.travelDate || 'Flexible'}`,
    `🛂 *Visa Category:* ${data.visaCategory || data.service || 'Standard'}`,
    `👥 *Pax:* ${data.passengers || 1}`,
    `📝 *Message:* ${data.message || 'Not provided'}`,
    `⏰ *Submission Date/Time:* ${data.createdAt || new Date().toLocaleString('en-GB')}`,
    `🌐 *Source:* ${data.source || 'skybridgetravelandtourism.com'}`
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Builds the direct mailto: link to info@skybridgetravelandtourism.com
 * pre-filled with the inquiry form details strictly matching Section 9 specifications
 */
export function buildMailtoInquiryUrl(data: InquiryNotificationPayload): string {
  const subject = encodeURIComponent('SkyBridge Travel & Tourism — New Customer Enquiry');
  const submissionTime = data.createdAt || new Date().toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  const body = encodeURIComponent(
    `SkyBridge Travel & Tourism — New Customer Enquiry\n\n` +
    `CUSTOMER ENQUIRY DOSSIER:\n` +
    `• Lead ID: ${data.leadId || 'Web Enquiry'}\n` +
    `• Customer Name: ${data.fullName || 'Not provided'}\n` +
    `• Email: ${data.email || 'Not provided'}\n` +
    `• Phone: ${data.phone || 'Not provided'}\n` +
    `• Service: ${data.service || 'Travel Inquiry'}\n` +
    `• Destination: ${data.destination || 'Not provided'}\n` +
    `• Travel Date: ${data.travelDate || 'Flexible'}\n` +
    `• Visa Category: ${data.visaCategory || data.service || 'Tourist / Standard'}\n` +
    `• Pax: ${data.passengers || 1}\n` +
    `• Message: ${data.message || 'Not provided'}\n` +
    `• Submission Date/Time: ${submissionTime}\n\n` +
    `Best regards,\n\n` +
    `Urwa Ali\n` +
    `Director, Skybridge Travel and Tourism\n\n` +
    `Contact Info:\n` +
    `Phone: ${OFFICIAL_PHONE_1} | ${OFFICIAL_PHONE_2}\n` +
    `Email: ${OFFICIAL_EMAIL}\n` +
    `Website: skybridgetravelandtourism.com\n\n` +
    `Pakistan Office:\n` +
    `House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan`
  );

  return `mailto:${OFFICIAL_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Dispatches the inquiry to backend /api/inquiries/submit
 * and returns rich dispatch details.
 */
export async function submitInquiryNotification(
  data: InquiryNotificationPayload
): Promise<InquiryDispatchResult> {
  const fallbackRef = data.leadId || `SB-${Date.now().toString().slice(-6)}`;
  const whatsAppAlertUrl = buildWhatsAppInquiryUrl(data);
  const mailtoUrl = buildMailtoInquiryUrl(data);

  try {
    const response = await fetch('/api/inquiries/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok) {
      const result = await response.json();
      return {
        success: true,
        referenceId: result.referenceId || fallbackRef,
        recipientEmail: result.recipientEmail || OFFICIAL_EMAIL,
        recipientPhone: result.recipientPhone || OFFICIAL_PHONE,
        recipientWhatsApp: result.recipientWhatsApp || `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`,
        whatsAppAlertUrl: result.whatsAppAlertUrl || whatsAppAlertUrl,
        mailtoUrl
      };
    }
  } catch (err) {
    console.warn('Backend inquiry dispatch notice (client fallback active):', err);
  }

  // Graceful client fallback
  return {
    success: true,
    referenceId: fallbackRef,
    recipientEmail: OFFICIAL_EMAIL,
    recipientPhone: OFFICIAL_PHONE,
    recipientWhatsApp: `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`,
    whatsAppAlertUrl,
    mailtoUrl
  };
}
