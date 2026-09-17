import { SKYBRIDGE_OFFICIAL_LOGO } from '../assets/logo';

// SkyBridge Travel & Tourism - Official Company Details & Config

export const COMPANY_INFO = {
  name: "SkyBridge Travel & Tourism",
  ceoName: "Saman",
  tagline: "Explore The World With SkyBridge Travel & Tourism",
  subheading: "Flights • Hotels • Visa Services • Worldwide Travel Assistance • Holiday Packages",
  
  // 🇵🇰 Pakistan Office Phone Numbers (Display both numbers):
  phonePakistan1: "+92 324 4444167",
  phonePakistan2: "+92 345 4444167",
  phonePakistan2Raw: "+92 3454444167",
  whatsAppPhone: "+92 324 4444167",

  // 🇦🇪 UAE & Global Desk:
  uaeOfficeLabel: "UAE & Global Desk",
  uaeOfficeDescription: "Dubai & International Partner Coordination",
  uaeSupportDesk: "Dubai & Partner Coordination Desk",
  
  email: "skybridgetravel20@gmail.com",
  
  // Exact registered office from prompt:
  registeredOffice: "House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan",
  addressLahore: "House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan",
  workingHours: "Mon - Sat: 9:00 AM - 7:00 PM (PKT)",
  regionsSupported: "UAE & Pakistan Support • Worldwide Travel Assistance",

  // Official verified links provided by SkyBridge:
  officialWhatsAppUrl: "https://wa.me/message/5VQNHABQ6NCZN1",
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
