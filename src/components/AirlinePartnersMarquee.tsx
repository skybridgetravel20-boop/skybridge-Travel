import React from 'react';
import { Plane, Globe2, ShieldCheck } from 'lucide-react';

interface AirlinePartner {
  id: string;
  name: string;
  iata: string;
  hub: string;
  alliance?: string;
  badgeColor: string;
  renderLogo: () => React.ReactNode;
}

const AIRLINE_PARTNERS: AirlinePartner[] = [
  {
    id: 'emirates',
    name: 'Emirates',
    iata: 'EK',
    hub: 'Dubai (DXB)',
    alliance: 'Major Global Carrier',
    badgeColor: 'bg-red-700 text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[120px]" viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Emirates logo">
        <rect width="160" height="48" rx="6" fill="#D71921" />
        <text x="80" y="30" textAnchor="middle" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="21" letterSpacing="1">
          Emirates
        </text>
      </svg>
    )
  },
  {
    id: 'qatar-airways',
    name: 'Qatar Airways',
    iata: 'QR',
    hub: 'Doha (DOH)',
    alliance: 'oneworld',
    badgeColor: 'bg-[#5C0632] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[140px]" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Qatar Airways logo">
        <circle cx="24" cy="24" r="18" fill="#5C0632" />
        {/* Stylized Oryx head */}
        <path d="M16 32L24 14L32 32M24 14V30" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <text x="50" y="29" fill="#5C0632" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.5">
          QATAR
        </text>
        <text x="114" y="29" fill="#1E293B" fontFamily="sans-serif" fontWeight="600" fontSize="12" letterSpacing="0.5">
          AIRWAYS
        </text>
      </svg>
    )
  },
  {
    id: 'etihad-airways',
    name: 'Etihad Airways',
    iata: 'EY',
    hub: 'Abu Dhabi (AUH)',
    alliance: 'National UAE Carrier',
    badgeColor: 'bg-[#B4975A] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[130px]" viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Etihad Airways logo">
        {/* Faceted gold triangle emblem */}
        <path d="M12 34L24 12L36 34Z" fill="#B4975A" />
        <path d="M24 12L24 34L18 34Z" fill="#91763E" />
        <text x="44" y="30" fill="#24211D" fontFamily="sans-serif" fontWeight="800" fontSize="18" letterSpacing="2">
          ETIHAD
        </text>
      </svg>
    )
  },
  {
    id: 'turkish-airlines',
    name: 'Turkish Airlines',
    iata: 'TK',
    hub: 'Istanbul (IST)',
    alliance: 'Star Alliance',
    badgeColor: 'bg-[#C70000] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[150px]" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Turkish Airlines logo">
        <circle cx="24" cy="24" r="18" fill="#C70000" />
        {/* Stylized wild goose emblem */}
        <path d="M15 22C18 20 28 17 33 22C27 25 19 28 15 22Z" fill="#FFFFFF" />
        <circle cx="28" cy="19" r="2" fill="#FFFFFF" />
        <text x="50" y="24" fill="#0B1B3B" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="0.5">
          TURKISH
        </text>
        <text x="50" y="36" fill="#64748B" fontFamily="sans-serif" fontWeight="700" fontSize="11" letterSpacing="1">
          AIRLINES
        </text>
      </svg>
    )
  },
  {
    id: 'saudia',
    name: 'Saudia',
    iata: 'SV',
    hub: 'Jeddah / Riyadh (JED / RUH)',
    alliance: 'SkyTeam',
    badgeColor: 'bg-[#006C35] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[130px]" viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Saudia Airlines logo">
        <rect width="160" height="48" rx="6" fill="#006C35" />
        {/* Palm and crossed swords */}
        <path d="M20 18C20 15 23 13 25 15C27 13 30 15 30 18C28 20 27 24 25 25C23 24 22 20 20 18Z" fill="#C5A059" />
        <path d="M17 29L33 21M17 21L33 29" stroke="#C5A059" strokeWidth="2" strokeLinecap="round" />
        <text x="42" y="30" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="800" fontSize="18" letterSpacing="1">
          SAUDIA
        </text>
      </svg>
    )
  },
  {
    id: 'flydubai',
    name: 'flydubai',
    iata: 'FZ',
    hub: 'Dubai (DXB)',
    alliance: 'Emirates Partner',
    badgeColor: 'bg-[#0072CE] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[130px]" viewBox="0 0 160 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="flydubai logo">
        <text x="10" y="32" fill="#0072CE" fontFamily="sans-serif" fontWeight="900" fontSize="23">
          fly
        </text>
        <text x="44" y="32" fill="#F58220" fontFamily="sans-serif" fontWeight="900" fontSize="23">
          dubai
        </text>
        <path d="M125 18C135 15 145 22 152 30" stroke="#F58220" strokeWidth="4" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'air-arabia',
    name: 'Air Arabia',
    iata: 'G9',
    hub: 'Sharjah (SHJ)',
    alliance: 'Middle East & Pakistan',
    badgeColor: 'bg-[#E30613] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[140px]" viewBox="0 0 170 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Air Arabia logo">
        <circle cx="22" cy="24" r="16" fill="#E30613" />
        {/* Stylized seagull */}
        <path d="M12 26Q18 16 26 22Q30 18 34 20" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        <text x="46" y="24" fill="#E30613" fontFamily="sans-serif" fontWeight="900" fontSize="14" letterSpacing="0.5">
          Air Arabia
        </text>
        <text x="46" y="36" fill="#64748B" fontFamily="sans-serif" fontWeight="700" fontSize="10">
          العربية للطيران
        </text>
      </svg>
    )
  },
  {
    id: 'pia',
    name: 'Pakistan International Airlines (PIA)',
    iata: 'PK',
    hub: 'Karachi / Lahore / Islamabad (KHI / LHE / ISB)',
    alliance: 'National Flag Carrier',
    badgeColor: 'bg-[#004831] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[150px]" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pakistan International Airlines PIA logo">
        <rect width="180" height="48" rx="6" fill="#004831" />
        {/* Crescent and star & PIA wordmark */}
        <circle cx="24" cy="24" r="12" fill="#C5A059" />
        <circle cx="27" cy="22" r="10" fill="#004831" />
        <polygon points="26,17 27,19 29,19 27.5,20.5 28,22.5 26,21 24,22.5 24.5,20.5 23,19 25,19" fill="#C5A059" />
        <text x="46" y="31" fill="#FFFFFF" fontFamily="sans-serif" fontWeight="900" fontSize="22" letterSpacing="3">
          PIA
        </text>
        <text x="100" y="30" fill="#C5A059" fontFamily="sans-serif" fontWeight="700" fontSize="11" letterSpacing="1">
          PAKISTAN
        </text>
      </svg>
    )
  },
  {
    id: 'british-airways',
    name: 'British Airways',
    iata: 'BA',
    hub: 'London Heathrow (LHR)',
    alliance: 'oneworld',
    badgeColor: 'bg-[#075AAA] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[160px]" viewBox="0 0 190 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="British Airways logo">
        {/* Red and blue speedbird ribbon */}
        <path d="M10 28C22 18 38 16 48 24C36 26 22 34 10 28Z" fill="#EB2226" />
        <path d="M30 22C42 16 54 18 60 22C48 24 38 28 30 22Z" fill="#075AAA" />
        <text x="66" y="24" fill="#075AAA" fontFamily="sans-serif" fontWeight="900" fontSize="13" letterSpacing="1">
          BRITISH
        </text>
        <text x="66" y="37" fill="#EB2226" fontFamily="sans-serif" fontWeight="800" fontSize="12" letterSpacing="1.5">
          AIRWAYS
        </text>
      </svg>
    )
  },
  {
    id: 'lufthansa',
    name: 'Lufthansa',
    iata: 'LH',
    hub: 'Frankfurt / Munich (FRA / MUC)',
    alliance: 'Star Alliance',
    badgeColor: 'bg-[#05164D] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[150px]" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lufthansa logo">
        <circle cx="24" cy="24" r="18" fill="#05164D" />
        <circle cx="24" cy="24" r="15" fill="#FFAD00" />
        {/* Lufthansa crane */}
        <path d="M14 28Q22 18 32 18Q25 22 20 28Z" fill="#05164D" />
        <text x="48" y="30" fill="#05164D" fontFamily="sans-serif" fontWeight="900" fontSize="16" letterSpacing="0.5">
          Lufthansa
        </text>
      </svg>
    )
  },
  {
    id: 'singapore-airlines',
    name: 'Singapore Airlines',
    iata: 'SQ',
    hub: 'Singapore Changi (SIN)',
    alliance: 'Star Alliance',
    badgeColor: 'bg-[#00205B] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[160px]" viewBox="0 0 190 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Singapore Airlines logo">
        {/* Iconic Golden Kris bird mark */}
        <path d="M10 32L24 14L38 32L30 30L24 22L18 30Z" fill="#F58220" />
        <text x="44" y="23" fill="#00205B" fontFamily="sans-serif" fontWeight="900" fontSize="12" letterSpacing="0.5">
          SINGAPORE
        </text>
        <text x="44" y="36" fill="#00205B" fontFamily="sans-serif" fontWeight="700" fontSize="11" letterSpacing="1">
          AIRLINES
        </text>
      </svg>
    )
  },
  {
    id: 'malaysia-airlines',
    name: 'Malaysia Airlines',
    iata: 'MH',
    hub: 'Kuala Lumpur (KUL)',
    alliance: 'oneworld',
    badgeColor: 'bg-[#003087] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[155px]" viewBox="0 0 180 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Malaysia Airlines logo">
        {/* Red and blue stylized wau kite */}
        <path d="M12 24L28 14L22 24L28 34Z" fill="#003087" />
        <path d="M22 24L38 14L32 24L38 34Z" fill="#DA291C" />
        <text x="44" y="24" fill="#003087" fontFamily="sans-serif" fontWeight="900" fontSize="13">
          malaysia
        </text>
        <text x="44" y="36" fill="#64748B" fontFamily="sans-serif" fontWeight="700" fontSize="10" letterSpacing="1">
          AIRLINES
        </text>
      </svg>
    )
  },
  {
    id: 'thai-airways',
    name: 'Thai Airways',
    iata: 'TG',
    hub: 'Bangkok (BKK)',
    alliance: 'Star Alliance',
    badgeColor: 'bg-[#4B1E78] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[140px]" viewBox="0 0 170 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Thai Airways logo">
        {/* Purple, magenta and gold orchid emblem */}
        <path d="M12 24C12 16 22 14 30 24C22 34 12 32 12 24Z" fill="#4B1E78" />
        <path d="M20 24C20 18 28 16 34 24C28 32 20 30 20 24Z" fill="#C4168C" />
        <path d="M28 24C28 20 34 18 38 24C34 30 28 28 28 24Z" fill="#F5A800" />
        <text x="46" y="30" fill="#4B1E78" fontFamily="sans-serif" fontWeight="900" fontSize="18" letterSpacing="1.5">
          THAI
        </text>
      </svg>
    )
  },
  {
    id: 'air-france',
    name: 'Air France',
    iata: 'AF',
    hub: 'Paris Charles de Gaulle (CDG)',
    alliance: 'SkyTeam',
    badgeColor: 'bg-[#002157] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[145px]" viewBox="0 0 170 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Air France logo">
        <text x="10" y="30" fill="#002157" fontFamily="sans-serif" fontWeight="900" fontSize="17" letterSpacing="1">
          AIRFRANCE
        </text>
        {/* Red accent ribbon */}
        <path d="M142 16L158 16L152 32L136 32Z" fill="#ED0000" />
      </svg>
    )
  },
  {
    id: 'klm',
    name: 'KLM Royal Dutch Airlines',
    iata: 'KL',
    hub: 'Amsterdam Schiphol (AMS)',
    alliance: 'SkyTeam',
    badgeColor: 'bg-[#00A1DE] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[130px]" viewBox="0 0 150 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="KLM Royal Dutch Airlines logo">
        {/* Royal Dutch Crown mark */}
        <path d="M16 18L14 24L26 24L24 18L20 21Z" fill="#00A1DE" />
        <circle cx="14" cy="16" r="1.5" fill="#00A1DE" />
        <circle cx="20" cy="19" r="1.5" fill="#00A1DE" />
        <circle cx="26" cy="16" r="1.5" fill="#00A1DE" />
        <text x="34" y="27" fill="#00A1DE" fontFamily="sans-serif" fontWeight="900" fontSize="22" letterSpacing="1.5">
          KLM
        </text>
      </svg>
    )
  },
  {
    id: 'gulf-air',
    name: 'Gulf Air',
    iata: 'GF',
    hub: 'Bahrain (BAH)',
    alliance: 'National Carrier of Bahrain',
    badgeColor: 'bg-[#9E7D3B] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[140px]" viewBox="0 0 170 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Gulf Air logo">
        {/* Golden Falcon emblem */}
        <path d="M14 30C18 20 28 14 36 20C28 24 22 34 14 30Z" fill="#9E7D3B" />
        <circle cx="34" cy="18" r="2.5" fill="#9E7D3B" />
        <text x="44" y="25" fill="#9E7D3B" fontFamily="sans-serif" fontWeight="900" fontSize="14" letterSpacing="1">
          GULF AIR
        </text>
        <text x="44" y="37" fill="#64748B" fontFamily="sans-serif" fontWeight="700" fontSize="10">
          طيران الخليج
        </text>
      </svg>
    )
  },
  {
    id: 'oman-air',
    name: 'Oman Air',
    iata: 'WY',
    hub: 'Muscat (MCT)',
    alliance: 'oneworld (Elect)',
    badgeColor: 'bg-[#B5121B] text-white',
    renderLogo: () => (
      <svg className="h-8 w-auto max-w-[145px]" viewBox="0 0 170 48" fill="none" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Oman Air logo">
        {/* Silver and red swirl emblem */}
        <circle cx="22" cy="24" r="16" fill="#1A4A7A" />
        <path d="M14 26C16 18 26 16 30 22C24 24 18 30 14 26Z" fill="#D4AF37" />
        <text x="46" y="25" fill="#1A4A7A" fontFamily="sans-serif" fontWeight="900" fontSize="14" letterSpacing="1">
          OMAN AIR
        </text>
        <text x="46" y="37" fill="#64748B" fontFamily="sans-serif" fontWeight="700" fontSize="10">
          الطيران العماني
        </text>
      </svg>
    )
  }
];

export const AirlinePartnersMarquee: React.FC = () => {
  return (
    <section className="py-14 sm:py-16 bg-gradient-to-b from-white via-slate-50/70 to-white border-t border-slate-200/80 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-100 text-[#0288D1] text-xs font-bold uppercase tracking-wider mb-2.5 shadow-2xs">
          <Plane className="w-3.5 h-3.5 text-[#4FC3F7]" />
          <span>Global Flight Connectivity</span>
        </div>

        {/* Section Heading & Supporting Text */}
        <h2 className="text-2xl sm:text-3xl font-black text-[#0B1B3B] tracking-tight">
          Our Airline Partners
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
          Explore your journey with airline partners around the world.
        </p>
      </div>

      {/* Continuously Moving Horizontal Marquee Container */}
      <div className="relative w-full group overflow-hidden py-3">
        {/* Gradient edge fades for seamless visual blend */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/80 to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/80 to-transparent z-10"></div>

        {/* Scrolling flex track */}
        <div className="flex w-max space-x-6 sm:space-x-8 animate-marquee motion-reduce:animate-none group-hover:[animation-play-state:paused]">
          {/* First set of airline cards */}
          {AIRLINE_PARTNERS.map((airline) => (
            <div
              key={`airline-1-${airline.id}`}
              className="flex items-center justify-center min-w-[200px] sm:min-w-[230px] h-[90px] px-5 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#4FC3F7]/50 hover:-translate-y-0.5 transition-all duration-300"
              title={`${airline.name} (${airline.iata}) — Hub: ${airline.hub}`}
            >
              <div className="flex flex-col items-center justify-center space-y-1.5 w-full">
                <div className="flex items-center justify-center h-9">
                  {airline.renderLogo()}
                </div>
                <div className="flex items-center justify-between w-full text-[10px] text-slate-400 font-medium px-1">
                  <span className="font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                    {airline.iata}
                  </span>
                  <span className="truncate max-w-[130px] text-slate-500">
                    {airline.hub}
                  </span>
                </div>
              </div>
            </div>
          ))}

          {/* Duplicate set of airline cards for seamless infinite loop */}
          {AIRLINE_PARTNERS.map((airline) => (
            <div
              key={`airline-2-${airline.id}`}
              className="flex items-center justify-center min-w-[200px] sm:min-w-[230px] h-[90px] px-5 py-3 rounded-2xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#4FC3F7]/50 hover:-translate-y-0.5 transition-all duration-300"
              title={`${airline.name} (${airline.iata}) — Hub: ${airline.hub}`}
            >
              <div className="flex flex-col items-center justify-center space-y-1.5 w-full">
                <div className="flex items-center justify-center h-9">
                  {airline.renderLogo()}
                </div>
                <div className="flex items-center justify-between w-full text-[10px] text-slate-400 font-medium px-1">
                  <span className="font-mono font-bold text-slate-600 bg-slate-100 px-1.5 py-0.2 rounded">
                    {airline.iata}
                  </span>
                  <span className="truncate max-w-[130px] text-slate-500">
                    {airline.hub}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Informational Advisory Notice */}
      <div className="max-w-4xl mx-auto px-4 mt-6 text-center">
        <p className="text-[11px] text-slate-400 leading-relaxed flex items-center justify-center gap-1.5">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span>
            Informational partner directory. Worldwide scheduled flight ticketing, re-issuance, and seat reservations are handled through authorized global distribution systems (GDS).
          </span>
        </p>
      </div>
    </section>
  );
};
