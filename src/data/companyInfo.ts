import { SKYBRIDGE_OFFICIAL_LOGO } from '../assets/logo';

// SkyBridge Travel & Tourism - Official Company Details & Config

export const COMPANY_INFO = {
  name: "SkyBridge Travel & Tourism",
  ceoName: "Saman",
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
  phonePakistan2: "0345 4444167",
  phonePakistan2Raw: "+92 345 4444167",
  phoneDisplay: "+92 324 4444167 / 0345 4444167",
  whatsAppPhone: "0345 4444167",

  // Global Desk Coordination:
  uaeOfficeLabel: "Global Partner Coordination Desk",
  uaeOfficeDescription: "International Travel & Partner Coordination",
  uaeSupportDesk: "Global Coordination Desk",
  
  // Official Customer-Facing Email:
  email: "info@skybridgetravelandtourism.com",
  
  // Exact registered office:
  registeredOffice: "House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan",
  addressLahore: "House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM (PKT)",
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
