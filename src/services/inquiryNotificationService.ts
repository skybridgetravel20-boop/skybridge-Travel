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
  passengers?: number;
  message?: string;
  source?: string;
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
const OFFICIAL_PHONE = '0345 4444167';
const OFFICIAL_PHONE_INTL = '+92 345 4444167';
const OFFICIAL_WHATSAPP_NUMBER = '923454444167';

/**
 * Builds the official WhatsApp URL formatted with inquiry details
 * Directly sends the inquiry message to WhatsApp: https://wa.me/923454444167
 */
export function buildWhatsAppInquiryUrl(data: InquiryNotificationPayload): string {
  const lines = [
    `🔔 *NEW SKYBRIDGE TRAVEL INQUIRY*`,
    data.leadId ? `🆔 *Ref:* ${data.leadId}` : '',
    `👤 *Name:* ${data.fullName}`,
    `📞 *Phone:* ${data.phone}`,
    data.email ? `✉️ *Email:* ${data.email}` : '',
    `✈️ *Service:* ${data.service}`,
    `📍 *Destination:* ${data.destination || 'International Travel'}`,
    data.travelDate ? `📅 *Date:* ${data.travelDate}` : '',
    data.passengers ? `👥 *Travelers:* ${data.passengers}` : '',
    data.message ? `📝 *Details:* ${data.message}` : '',
    `🌐 *Sent from:* skybridgetravelandtourism.com`
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join('\n'));
  return `https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}?text=${text}`;
}

/**
 * Builds the direct mailto: link to info@skybridgetravelandtourism.com
 * pre-filled with the inquiry form details
 */
export function buildMailtoInquiryUrl(data: InquiryNotificationPayload): string {
  const subject = encodeURIComponent(
    `New Travel Inquiry: ${data.service} - ${data.fullName} ${data.leadId ? `[Ref: ${data.leadId}]` : ''}`
  );

  const body = encodeURIComponent(
    `Dear SkyBridge Travel & Tourism Team,\n\n` +
    `I would like to submit the following travel inquiry:\n\n` +
    `• Reference ID: ${data.leadId || 'Web Inquiry'}\n` +
    `• Full Name: ${data.fullName}\n` +
    `• Phone / WhatsApp: ${data.phone}\n` +
    `• Email: ${data.email || 'N/A'}\n` +
    `• Service Required: ${data.service}\n` +
    `• Target Destination: ${data.destination || 'International'}\n` +
    `• Travel Date: ${data.travelDate || 'Flexible'}\n` +
    `• Number of Passengers: ${data.passengers || 1}\n` +
    `• Additional Requirements: ${data.message || 'Please provide information and quotation.'}\n\n` +
    `Official Website: https://skybridgetravelandtourism.com\n` +
    `Contact Phone: ${OFFICIAL_PHONE_INTL} / ${OFFICIAL_PHONE}\n` +
    `Official WhatsApp: https://wa.me/${OFFICIAL_WHATSAPP_NUMBER}`
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
