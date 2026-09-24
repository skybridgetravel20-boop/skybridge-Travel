import React, { createContext, useContext, useState, useEffect } from 'react';

export type SupportedLanguage = 'EN' | 'UR' | 'AR';

export interface Translations {
  // Navigation & Brand
  brandName: string;
  brandTagline: string;
  home: string;
  aboutUs: string;
  visaServices: string;
  flights: string;
  hotels: string;
  packages: string;
  tourPackages: string;
  honeymoonPackages: string;
  umrahPackages: string;
  destinations: string;
  contactUs: string;
  skybridgeCrm: string;
  ceoDashboard: string;
  publicWebsite: string;
  whatsAppUs: string;
  pakistanOffice: string;
  uaeSupport: string;

  // Hero Section
  heroBadge: string;
  heroTitle1: string;
  heroTitle2: string;
  heroTitle3: string;
  heroSubtitle: string;
  heroCtaConsult: string;
  heroCtaWhatsApp: string;
  heroHighlight1: string;
  heroHighlight2: string;
  heroHighlight3: string;

  // Search & Services
  searchFlights: string;
  searchHotels: string;
  searchVisas: string;
  searchTours: string;
  searchUmrah: string;
  ourServices: string;
  popularDestinations: string;
  featuredPackages: string;

  // Mode Switcher
  switchToCeo: string;
  switchToPublic: string;
  ceoModeActive: string;
  oneClickAccess: string;

  // Common UI
  language: string;
  selectLanguage: string;
  viewDetails: string;
  contactNow: string;
  registeredAgency: string;
  lahoreAddress: string;
}

const TRANSLATIONS: Record<SupportedLanguage, Translations> = {
  EN: {
    brandName: "SkyBridge Travel & Tourism",
    brandTagline: "Explore The World With SkyBridge Travel & Tourism",
    home: "Home",
    aboutUs: "About Us",
    visaServices: "Visa Services",
    flights: "Flights",
    hotels: "Hotels",
    packages: "Packages",
    tourPackages: "Tour Packages",
    honeymoonPackages: "Honeymoon Packages",
    umrahPackages: "Umrah Packages",
    destinations: "Destinations",
    contactUs: "Contact Us",
    skybridgeCrm: "SkyBridge CRM",
    ceoDashboard: "CEO Dashboard",
    publicWebsite: "Public Website",
    whatsAppUs: "Message SkyBridge Travel & Tourism on WhatsApp",
    pakistanOffice: "Pakistan Office",
    uaeSupport: "UAE & Pakistan Support",

    heroBadge: "Premier Travel Consultancy & Visa Assistance",
    heroTitle1: "Connecting You to the",
    heroTitle2: "World",
    heroTitle3: "with Confidence.",
    heroSubtitle: "Worldwide travel services, verified flight bookings, premium hotel accommodations, specialized visa documentation clearance, and unforgettable tour packages tailored to your journey.",
    heroCtaConsult: "Inquire for Travel Consultation",
    heroCtaWhatsApp: "Message SkyBridge Travel & Tourism on WhatsApp",
    heroHighlight1: "Verified Travel Itineraries",
    heroHighlight2: "Embassy Documentation Guidance",
    heroHighlight3: "UAE & Pakistan Support",

    searchFlights: "Flights",
    searchHotels: "Hotels",
    searchVisas: "Visa Assistance",
    searchTours: "Tour Packages",
    searchUmrah: "Umrah Services",
    ourServices: "Our Comprehensive Services",
    popularDestinations: "Popular Global Destinations",
    featuredPackages: "Handcrafted Holiday Packages",

    switchToCeo: "Open CEO Dashboard",
    switchToPublic: "View Public Website",
    ceoModeActive: "CEO Dashboard Active",
    oneClickAccess: "1-Click Direct Access",

    language: "Language",
    selectLanguage: "Select Language",
    viewDetails: "View Details",
    contactNow: "Contact Us Now",
    registeredAgency: "Registered Travel & Tourism Agency",
    lahoreAddress: "House No 05, Gulshan Street, Nadeem Town, Multan Road, Lahore, Pakistan"
  },
  UR: {
    brandName: "اسکائی برج ٹریول اینڈ ٹورازم",
    brandTagline: "اسکائی برج ٹریول اینڈ ٹورازم کے ساتھ دنیا کی سیر کریں",
    home: "صفحہ اول",
    aboutUs: "ہمارے بارے میں",
    visaServices: "ویزہ سروسز",
    flights: "پروازیں",
    hotels: "ہوٹلز",
    packages: "پیکجز",
    tourPackages: "ٹور پیکجز",
    honeymoonPackages: "ہنی مون پیکجز",
    umrahPackages: "عمرہ پیکجز",
    destinations: "سیاحتی مقامات",
    contactUs: "ہم سے رابطہ کریں",
    skybridgeCrm: "اسکائی برج CRM",
    ceoDashboard: "سی ای او ڈیش بورڈ",
    publicWebsite: "عوامی ویب سائٹ",
    whatsAppUs: "واٹس ایپ پر رابطہ کریں",
    pakistanOffice: "پاکستان آفس",
    uaeSupport: "یو اے ای اور پاکستان سپورٹ",

    heroBadge: "معیاری ٹریول کنسلٹنسی اور ویزا رہنمائی",
    heroTitle1: "آپ کو دنیا سے جوڑیں",
    heroTitle2: "پورے اعتماد",
    heroTitle3: "اور حفاظت کے ساتھ۔",
    heroSubtitle: "دنیا بھر کے لیے پروازیں، ہوٹل بکنگز، سفارت خانے کے لیے مستند ویزہ فائلز اور یادگار تعطیلاتی پیکجز۔",
    heroCtaConsult: "سفری مشاورت حاصل کریں",
    heroCtaWhatsApp: "واٹس ایپ پر فوری رابطہ",
    heroHighlight1: "تصدیق شدہ سفری شیڈول",
    heroHighlight2: "سفارت خانے کے کاغذات کی تیاری",
    heroHighlight3: "پاکستان اور دبئی سے 24/7 سپورٹ",

    searchFlights: "پروازیں تلاش کریں",
    searchHotels: "ہوٹلز تلاش کریں",
    searchVisas: "ویزہ رہنمائی",
    searchTours: "ٹور پیکجز",
    searchUmrah: "مقدس عمرہ پیکجز",
    ourServices: "ہماری جامع خدمات",
    popularDestinations: "مشہور عالمی سیاحتی مقامات",
    featuredPackages: "خصوصی ٹریول پیکجز",

    switchToCeo: "سی ای او ڈیش بورڈ کھولیں",
    switchToPublic: "عوامی ویب سائٹ پر جائیں",
    ceoModeActive: "سی ای او ڈیش بورڈ فعال ہے",
    oneClickAccess: "1-کلک میں رسائی",

    language: "زبان (Language)",
    selectLanguage: "زبان منتخب کریں",
    viewDetails: "مزید تفصیلات",
    contactNow: "ابھی رابطہ کریں",
    registeredAgency: "رجسٹرڈ ٹریول اینڈ ٹورازم ایجنسی",
    lahoreAddress: "مکان نمبر 05، گلشن اسٹریٹ، ندیم ٹاؤن، ملتان روڈ، لاہور، پاکستان"
  },
  AR: {
    brandName: "سكاي بريدج للسياحة والسفر",
    brandTagline: "استكشف العالم بكل ثقة مع سكاي بريدج للسياحة والسفر",
    home: "الرئيسية",
    aboutUs: "من نحن",
    visaServices: "خدمات التأشيرات",
    flights: "حجوزات الطيران",
    hotels: "الفنادق",
    packages: "الباقات السياحية",
    tourPackages: "باقات الجولات",
    honeymoonPackages: "باقات شهر العسل",
    umrahPackages: "باقات العمرة",
    destinations: "الوجهات السياحية",
    contactUs: "اتصل بنا",
    skybridgeCrm: "نظام سكاي بريدج CRM",
    ceoDashboard: "لوحة تحكم المدير التنفيذي",
    publicWebsite: "الموقع الإلكتروني العام",
    whatsAppUs: "تواصل عبر واتساب",
    pakistanOffice: "مكتب باكستان",
    uaeSupport: "دعم الإمارات وباكستان",

    heroBadge: "استشارات السفر الفاخرة وخدمات التأشيرات المعتمدة",
    heroTitle1: "نربطك بالعالم أجمع",
    heroTitle2: "بكل ثقة",
    heroTitle3: "وراحة بال واطمئنان.",
    heroSubtitle: "خدمات سفر عالمية متكاملة، تذاكر طيران مؤكدة، أفضل الفنادق، إعداد وتدقيق ملفات التأشيرات للسفارات، وباقات سفر مخصصة لك.",
    heroCtaConsult: "طلب استشارة سفر فورية",
    heroCtaWhatsApp: "محادثة مباشرة عبر واتساب",
    heroHighlight1: "جداول رحلات معتمدة ومؤكدة",
    heroHighlight2: "إعداد مستندات السفارات المعتمدة",
    heroHighlight3: "دعم مخصص في الإمارات وباكستان",

    searchFlights: "البحث عن رحلات",
    searchHotels: "البحث عن فنادق",
    searchVisas: "مساعدة التأشيرات",
    searchTours: "الباقات السياحية",
    searchUmrah: "رحلات العمرة المباركة",
    ourServices: "خدماتنا المتميزة",
    popularDestinations: "أشهر الوجهات العالمية",
    featuredPackages: "باقات العطلات المميزة",

    switchToCeo: "فتح لوحة تحكم المدير التنفيذي",
    switchToPublic: "الرجوع للموقع العام",
    ceoModeActive: "لوحة التحكم التنفيذية نشطة",
    oneClickAccess: "دخول مباشر بنقرة واحدة",

    language: "اللغة (Language)",
    selectLanguage: "اختر اللغة",
    viewDetails: "عرض التفاصيل",
    contactNow: "تواصل معنا الآن",
    registeredAgency: "وكالة سفر وسياحة مسجلة ومعتمدة",
    lahoreAddress: "منزل رقم 05، شارع جلشن، نديم تاون، طريق ملتان، لاهور، باكستان"
  }
};

interface LanguageContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: (key: keyof Translations) => string;
  isRTL: boolean;
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<SupportedLanguage>(() => {
    const saved = localStorage.getItem('skybridge_selected_lang');
    if (saved === 'UR' || saved === 'AR' || saved === 'EN') {
      return saved;
    }
    return 'EN';
  });

  const isRTL = language === 'UR' || language === 'AR';
  const dir = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    localStorage.setItem('skybridge_selected_lang', language);
    document.documentElement.dir = dir;
    document.documentElement.lang = language.toLowerCase();
    
    // Add RTL class helper to body
    if (isRTL) {
      document.body.classList.add('rtl-mode');
    } else {
      document.body.classList.remove('rtl-mode');
    }
  }, [language, dir, isRTL]);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
  };

  const t = (key: keyof Translations): string => {
    const currentDict = TRANSLATIONS[language] || TRANSLATIONS.EN;
    return currentDict[key] || TRANSLATIONS.EN[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
