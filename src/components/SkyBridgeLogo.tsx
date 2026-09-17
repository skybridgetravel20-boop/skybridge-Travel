import React from 'react';
import { SKYBRIDGE_OFFICIAL_LOGO } from '../assets/logo';
import { COMPANY_INFO } from '../data/companyInfo';

interface SkyBridgeLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  className?: string;
  showText?: boolean;
  textColor?: 'dark' | 'light';
  isDarkBackground?: boolean;
  customHeight?: string;
}

/**
 * Official SkyBridge Travel & Tourism Logo Component.
 * STRICT DIRECTIVE COMPLIANT:
 * Displays the exact uploaded official SkyBridge logo asset from /src/assets/logo.ts
 * without redesigning, recreating, recoloring, cropping (no rounded corners),
 * stretching (maintains natural 1:1 square ratio), or changing it.
 */
export const SkyBridgeLogo: React.FC<SkyBridgeLogoProps> = ({
  size = 'md',
  className = '',
  showText = false,
  textColor = 'dark',
  isDarkBackground = false,
  customHeight
}) => {
  const sizeClasses = {
    sm: 'h-10 w-10',
    md: 'h-14 w-14',
    lg: 'h-20 w-20',
    xl: 'h-28 w-28',
    custom: customHeight || 'h-14 w-14'
  };

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Exact uploaded logo asset without redesigning, recreating, recoloring, cropping, stretching, or changing */}
      <img
        src={SKYBRIDGE_OFFICIAL_LOGO}
        alt="SkyBridge Travel & Tourism Official Logo"
        className={`${sizeClasses[size]} object-contain aspect-square rounded-none shrink-0`}
        referrerPolicy="no-referrer"
        loading="eager"
      />

      {showText && (
        <div className="flex flex-col justify-center">
          <span
            className={`font-black tracking-tight leading-none text-base sm:text-lg ${
              textColor === 'light' || isDarkBackground ? 'text-white' : 'text-[#0B1B3B]'
            }`}
          >
            SKY<span className="text-[#4FC3F7]">BRIDGE</span>
          </span>
          <span
            className={`text-[8px] sm:text-[9px] tracking-[0.2em] uppercase font-bold mt-0.5 ${
              textColor === 'light' || isDarkBackground ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            TRAVEL & TOURISM
          </span>
        </div>
      )}
    </div>
  );
};
