import { SKYBRIDGE_OFFICIAL_LOGO } from '../assets/logo';

// SkyBridge Travel & Tourism - Official Company Details & Config

export const COMPANY_INFO = {
  name: "SkyBridge Travel & Tourism",
  ceoName: "Urwa Ali",
  directorName: "Urwa Ali",
  directorTitle: "Director, Skybridge Travel and Tourism",
  tagline: "Explore The World With SkyBridge Travel & Tourism",
  subheading: "Flights • Hotels • Visa Services • Worldwide Travel Assistance • Holiday Packages",
  
  // Official Production Website URLs:
  websiteUrl: "https://skybridgetravelandtourism.com",
  canonicalDomain: "skybridgetravelandtourism.com",
  supportedDomains: [
    "https://skybridgetravelandtourism.com",
    "https://www.skybridgetravelandtourism.com"
  ],

  // 🇵🇰 Official Customer Phone Numbers (Both Pakistan numbers, no UAE phone in customer-facing):
  phonePakistan1: "+92 324 4444167",
  phonePakistan2: "+92 345 4444167",
  phonePakistan2Raw: "+92 345 4444167",
  phoneDisplay: "+92 324 4444167 / +92 345 4444167",
  whatsAppPhone: "+92 345 4444167",

  // Global Desk Coordination:
  uaeOfficeLabel: "Global Partner Coordination Desk",
  uaeOfficeDescription: "International Travel & Partner Coordination",
  uaeSupportDesk: "Global Coordination Desk",
  
  // Official Customer-Facing Email:
  email: "info@skybridgetravelandtourism.com",
  
  // Exact registered office:
  registeredOffice: "House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan",
  addressLahore: "House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan",
  workingHours: "Mon - Sat: 9:00 AM - 11:00 PM (PKT)",
  regionsSupported: "Pakistan Office • Worldwide Travel Assistance",

  // Official Verified WhatsApp Contact:
  officialWhatsAppUrl: "https://wa.me/923454444167",
  whatsAppButtonText: "Message SkyBridge Travel & Tourism on WhatsApp",
  officialWhatsAppChannelUrl: "https://whatsapp.com/channel/0029VbBp5p6BA1f1hdWSCE0V",
  officialFacebookUrl: "https://www.facebook.com/share/1C5KePenAa/",
  officialInstagramUrl: "https://www.instagram.com/SkyBridge_Travel_Tourism",
  officialGoogleMapsUrl: "https://maps.app.goo.gl/1z2Zc9Z4vF2GH9nh6",

  // Single centralized official logo asset
  logoUrl: SKYBRIDGE_OFFICIAL_LOGO,
  logoHdUrl: SKYBRIDGE_OFFICIAL_LOGO,
  uploadedLogoAsset: SKYBRIDGE_OFFICIAL_LOGO,

  // WhatsApp pre-filled default message
  defaultWhatsAppMessage: "Hello SkyBridge Travel & Tourism, I would like assistance with my travel plans.",

  // Mandatory legal disclaimer
  visaDisclaimer: "Visa decisions are made by the relevant embassy, consulate, or immigration authority. SkyBridge Travel & Tourism provides assistance and guidance and does not guarantee visa approval."
};

export const getWhatsAppLink = (customText?: string) => {
  if (!customText) return COMPANY_INFO.officialWhatsAppUrl;
  return `${COMPANY_INFO.officialWhatsAppUrl}?text=${encodeURIComponent(customText)}`;
};

// Official Director Email Signature (Strictly per executive specifications)
export const OFFICIAL_DIRECTOR_SIGNATURE_TEXT = `Best regards,

Urwa Ali
Director, Skybridge Travel and Tourism

Contact Info:
Phone: +92 324 4444167 | +92 345 4444167
Email: info@skybridgetravelandtourism.com
Website: skybridgetravelandtourism.com

Pakistan Office:
House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan`;

export const OFFICIAL_DIRECTOR_SIGNATURE_HTML = `
<div style="font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 13px; color: #1e293b; line-height: 1.5; margin-top: 24px; padding-top: 18px; border-top: 1px solid #e2e8f0;">
  <p style="margin: 0 0 12px 0;">Best regards,</p>
  <p style="margin: 0 0 2px 0; font-size: 15px; font-weight: 700; color: #0b1b3b;">Urwa Ali</p>
  <p style="margin: 0 0 12px 0; font-size: 13px; font-weight: 600; color: #475569;">Director, Skybridge Travel and Tourism</p>
  <div style="margin: 0 0 10px 0; font-size: 12px; color: #334155;">
    <strong style="color: #0b1b3b;">Contact Info:</strong><br />
    Phone: <a href="tel:+923244444167" style="color: #0288d1; text-decoration: none;">+92 324 4444167</a> | <a href="tel:+923454444167" style="color: #0288d1; text-decoration: none;">+92 345 4444167</a><br />
    Email: <a href="mailto:info@skybridgetravelandtourism.com" style="color: #0288d1; text-decoration: none;">info@skybridgetravelandtourism.com</a><br />
    Website: <a href="https://skybridgetravelandtourism.com" style="color: #0288d1; text-decoration: none;">skybridgetravelandtourism.com</a>
  </div>
  <div style="font-size: 12px; color: #475569;">
    <strong style="color: #0b1b3b;">Pakistan Office:</strong><br />
    House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan
  </div>
</div>
`.trim();

