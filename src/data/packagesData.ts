import { TravelPackage } from '../types';

export const PACKAGES_DATA: TravelPackage[] = [
  {
    id: 'europe-tour',
    title: 'Grand Europe Explorer',
    destination: 'France, Switzerland & Italy',
    category: 'Europe',
    duration: '10 Days / 9 Nights',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Paris Seine River Cruise & Eiffel Tower access',
      'Swiss Alps Mount Titlis cable car excursion',
      'Scenic GoldenPass railway journey in Lucerne',
      'Venice gondola tour & Rome Colosseum guided walk'
    ],
    inclusions: [
      '4-Star hotel accommodation with breakfast',
      'Intercity high-speed train connections',
      'Guided city walking tours & museum entries',
      'Visa reservation assistance files included'
    ],
    exclusions: ['Consular embassy visa fees', 'Personal expenses & travel insurance'],
    isFeatured: true
  },
  {
    id: 'switzerland-experience',
    title: 'Alpine Splendor Switzerland',
    destination: 'Zurich, Interlaken & Lucerne',
    category: 'Europe',
    duration: '7 Days / 6 Nights',
    image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Jungfraujoch – Top of Europe excursion',
      'Lake Geneva private boat cruise',
      'Matterhorn glacier paradise view in Zermatt',
      'First Cliff Walk by Tissot in Grindelwald'
    ],
    inclusions: [
      'Swiss Travel Pass for unlimited rail, boat & bus travel',
      'Scenic Alpine view boutique hotel accommodations',
      'Daily Swiss breakfast buffet',
      'Dedicated local assistance coordinator'
    ],
    exclusions: ['International flights (available upon request)', 'Lunches & dinners'],
    isFeatured: true
  },
  {
    id: 'dubai-holiday',
    title: 'Luxury Dubai & Abu Dhabi Experience',
    destination: 'United Arab Emirates',
    category: 'Middle East',
    duration: '5 Days / 4 Nights',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'At The Top - Burj Khalifa 124th & 125th floor access',
      'Premium Desert Safari with BBQ dinner & dune bashing',
      'Luxury Dubai Marina dinner yacht cruise',
      'Abu Dhabi Sheikh Zayed Grand Mosque & Louvre tour'
    ],
    inclusions: [
      '5-Star city hotel accommodation with breakfast',
      'Private luxury airport & intercity transfers',
      'All attraction tickets & safari coordination',
      'UAE tourist e-Visa assistance'
    ],
    exclusions: ['Tourism Dirham fee paid directly to hotel', 'Gratuities'],
    isFeatured: true
  },
  {
    id: 'turkey-escape',
    title: 'Ottoman Wonders & Cappadocia Ballooning',
    destination: 'Istanbul & Cappadocia, Turkey',
    category: 'Middle East',
    duration: '7 Days / 6 Nights',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Sunrise hot air balloon flight over Cappadocia fairy chimneys',
      'Hagia Sophia, Blue Mosque & Topkapi Palace tour',
      'Bosphorus sunset yacht cruise between two continents',
      'Stay in an authentic luxury cave hotel'
    ],
    inclusions: [
      'Cave hotel in Cappadocia & boutique hotel in Istanbul',
      'Domestic flights between Istanbul and Kayseri',
      'Professional English-speaking licensed guide',
      'Turkey e-Visa / sticker visa guidance'
    ],
    exclusions: ['Personal shopping & optional activities', 'Embassy fees'],
    isFeatured: true
  },
  {
    id: 'thailand-getaway',
    title: 'Tropical Thailand Beach & City',
    destination: 'Bangkok & Phuket',
    category: 'Asia',
    duration: '6 Days / 5 Nights',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Phi Phi Islands speedboat tour with snorkeling',
      'Bangkok Grand Palace & Wat Arun temple exploration',
      'Chao Phraya Princess luxury dinner river cruise',
      'Patong beach leisure and night market excursions'
    ],
    inclusions: [
      'Beachfront resort in Phuket + 4-Star Bangkok hotel',
      'Domestic flight Bangkok - Phuket with baggage',
      'Private airport and pier transfers',
      'Thai e-Visa application guidance'
    ],
    exclusions: ['National park entrance fees', 'Water sports rentals'],
    isFeatured: true
  },
  {
    id: 'bali-honeymoon',
    title: 'Sacred Bali Romantic Escape',
    destination: 'Ubud & Seminyak, Indonesia',
    category: 'Honeymoon',
    duration: '7 Days / 6 Nights',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Private pool villa with romantic floral pool decoration',
      'Sunset candlelight dinner on Jimbaran beach',
      'Couples Balinese aromatherapy spa package (2 hours)',
      'Tegallalang rice terrace & jungle swing photoshoot'
    ],
    inclusions: [
      '3 Nights Ubud luxury jungle resort + 3 Nights Seminyak private villa',
      'Daily floating breakfast & afternoon tea',
      'Private air-conditioned chauffeur for all touring days',
      'Indonesia tourist e-Visa guidance'
    ],
    exclusions: ['International flights (available on request)', 'Alcoholic beverages'],
    isFeatured: true
  },
  {
    id: 'maldives-honeymoon',
    title: 'Overwater Villa Paradise',
    destination: 'Maldives Archipelago',
    category: 'Honeymoon',
    duration: '5 Days / 4 Nights',
    image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80',
    highlights: [
      'Luxury overwater villa with direct turquoise lagoon access',
      'Sunset dolphin safari cruise on a traditional Dhoni',
      'Complimentary honeymoon cake and bed decoration',
      'Snorkeling with marine life and stingrays'
    ],
    inclusions: [
      'Overwater bungalow accommodation on All-Inclusive basis',
      'Return speedboat or seaplane transfer from Male Airport',
      'All gourmet meals, drinks & high tea',
      'Complimentary visa on arrival assistance'
    ],
    exclusions: ['Green tax and motorized water sports'],
    isFeatured: true
  },
  {
    id: 'umrah-journey',
    title: 'Spiritual Umrah Journey',
    destination: 'Makkah & Madinah, Saudi Arabia',
    category: 'Umrah',
    duration: '10 Days / 9 Nights',
    image: 'https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?auto=format&fit=crop&w=800&q=80',
    highlights: [
      '5 Nights in Makkah within close walking distance to Haram',
      '4 Nights in Madinah near Al-Masjid an-Nabawi',
      'Guided historical Ziyarat in Makkah (Jabal al-Nour, Mina, Arafat)',
      'Guided historical Ziyarat in Madinah (Masjid Quba, Mount Uhud)'
    ],
    inclusions: [
      'Hotels in prime courtyard access locations',
      'Saudi Umrah electronic visa processing support',
      'Haramain high-speed train tickets Makkah - Madinah',
      'Meet, greet & 24/7 dedicated bilingual support'
    ],
    exclusions: ['Personal purchases', 'Extra baggage'],
    isFeatured: true
  }
];
