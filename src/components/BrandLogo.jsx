import React from 'react';

/**
 * Veggie Castle II - Official Brand Logo Emblem
 * Combines the royal castle battlement with the Caribbean Ital botanical leaf sprout
 * and crisp "VC II" monogram for an unmistakable, premium restaurant identity.
 */
export default function BrandLogo({ 
  size = "md", 
  variant = "light", // 'light' for header (dark text), 'dark' for footer (white text)
  className = "" 
}) {
  const isSm = size === "sm";

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 shrink-0 ${className}`}>
      {/* Visual Emblem Badge */}
      <div 
        className={`${isSm ? 'w-9 h-9 sm:w-11 sm:h-11' : 'w-11 h-11 sm:w-12 sm:h-12'} rounded-xl bg-gradient-to-br from-[#1b4d28] via-[#143d20] to-[#0a2914] flex items-center justify-center shadow-md border border-amber-400/40 shrink-0 p-1 group-hover:scale-105 transition-transform duration-300`}
        aria-hidden="true"
      >
        <svg viewBox="0 0 40 40" className="w-full h-full drop-shadow-sm" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="goldGradVC" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="leafGradVC" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6EE7B7" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          
          {/* Caribbean Plant-Based Sprout Crown */}
          <path d="M20 21C19.5 14.5 13 11.5 13 11.5C13 11.5 15 18 19.5 20.5" fill="url(#leafGradVC)" />
          <path d="M20.5 21C21 14.5 27 11.5 27 11.5C27 11.5 25 18 20.5 20.5" fill="url(#leafGradVC)" />
          <path d="M20 21V7.5C20 7.5 21.5 6 20 4.5C18.5 6 20 7.5 20 7.5" stroke="#FDE047" strokeWidth="1.6" strokeLinecap="round" />
          
          {/* Royal Castle Battlement Base */}
          <path d="M9 22H12V25H15V22H18V25H22V22H25V25H28V22H31V31H9V22Z" fill="url(#goldGradVC)" />
          {/* Castle Arch Doorway */}
          <path d="M17.5 31V27C17.5 25.5 22.5 25.5 22.5 27V31H17.5Z" fill="#0A2914" />
          
          {/* Typography VC II */}
          <text x="20" y="37.5" textAnchor="middle" fill="#FDE047" fontSize="5.2" fontWeight="900" fontFamily="system-ui, -apple-system, sans-serif" letterSpacing="0.8">VC II</text>
        </svg>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col min-w-0">
        <span className={`font-display font-bold tracking-tight leading-tight truncate ${
          isSm ? 'text-base sm:text-xl' : 'text-xl sm:text-2xl'
        } ${
          variant === 'dark' ? 'text-white' : 'text-primary'
        }`}>
          Veggie Castle II
        </span>
        <span className={`tracking-wider uppercase font-bold truncate ${
          isSm ? 'text-[8px] sm:text-[9px]' : 'text-[9px] sm:text-[10px]'
        } ${
          variant === 'dark' ? 'text-amber-400' : 'text-amber-700 dark:text-amber-400'
        }`}>
          100% Vegan • Queens, NY
        </span>
      </div>
    </div>
  );
}
