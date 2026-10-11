/**
 * Official Business Email Handler for SkyBridge Travel & Tourism
 * 
 * Ensures that clicking the email address opens the visitor's default email application
 * with info@skybridgetravelandtourism.com entered as the recipient, with a prefilled subject.
 */

export const OFFICIAL_BUSINESS_EMAIL = 'info@skybridgetravelandtourism.com';
export const OFFICIAL_DIRECT_GMAIL_LINK = 'https://mail.google.com/mail/u/1/?fs=1&to=info@skybridgetravelandtourism.com&tf=cm';
export const OFFICIAL_WEBMAIL_PORTAL = 'https://webmail.skybridgetravelandtourism.com';

export interface EmailOptions {
  to?: string;
  subject?: string;
  body?: string;
  cc?: string;
  bcc?: string;
}

/**
 * Returns a standard mailto: URL to open the visitor's default email application
 * with info@skybridgetravelandtourism.com entered as the recipient and prefilled subject.
 */
export function getOfficialBusinessEmailUrl(options: EmailOptions = {}): string {
  const to = options.to || OFFICIAL_BUSINESS_EMAIL;
  const subject = options.subject || 'Website Enquiry — SkyBridge Travel & Tourism';
  const params = new URLSearchParams();
  
  if (subject) params.append('subject', subject);
  if (options.body) params.append('body', options.body);
  if (options.cc) params.append('cc', options.cc);
  if (options.bcc) params.append('bcc', options.bcc);

  const query = params.toString();
  return query ? `mailto:${to}?${query}` : `mailto:${to}`;
}

/**
 * Opens the visitor's default email application with official business email prefilled.
 */
export function openOfficialBusinessEmail(
  options: EmailOptions = {},
  e?: { preventDefault?: () => void; stopPropagation?: () => void } | MouseEvent
): boolean {
  const url = getOfficialBusinessEmailUrl(options);
  window.location.href = url;
  return true;
}
