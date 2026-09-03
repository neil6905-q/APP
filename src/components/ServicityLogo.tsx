import React from 'react';

interface ServicityLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ServicityLogo: React.FC<ServicityLogoProps> = ({
  className = '',
  size = 'md',
}) => {
  const sizeMap = {
    sm: { icon: 'w-7 h-7', text: 'text-lg' },
    md: { icon: 'w-8 h-8 sm:w-9 sm:h-9', text: 'text-xl sm:text-2xl' },
    lg: { icon: 'w-11 h-11', text: 'text-2xl sm:text-3xl' },
  };

  return (
    <div className={`flex items-center gap-2 select-none ${className}`}>
      {/* Rainbow Multi-colored Cogwheel Icon matching Image 1 */}
      <div className={`relative ${sizeMap[size].icon} flex-shrink-0`}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-xs"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Smooth rainbow radial / angular effect */}
            <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="20%" stopColor="#8B5CF6" />
              <stop offset="40%" stopColor="#3B82F6" />
              <stop offset="60%" stopColor="#06B6D4" />
              <stop offset="75%" stopColor="#10B981" />
              <stop offset="88%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>

            <filter id="gearShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* 8-toothed colorful cogwheel */}
          <path
            d="M 50 15 
               L 55 15 L 57 23 L 64 26 L 71 21 L 76 25 L 75 33 L 80 38 L 88 38 L 89 45 L 83 49 L 83 57 L 89 61 L 86 68 L 78 69 L 75 75 L 77 83 L 71 86 L 65 82 L 58 84 L 55 92 L 47 92 L 44 84 L 37 82 L 31 87 L 26 83 L 28 75 L 23 69 L 15 68 L 13 61 L 19 57 L 19 49 L 13 45 L 15 38 L 23 38 L 27 32 L 25 24 L 31 20 L 37 25 L 45 23 Z"
            fill="url(#rainbowGrad)"
            filter="url(#gearShadow)"
          />

          {/* Center Cutout hole */}
          <circle cx="50" cy="53" r="16" fill="#FFFFFF" />
          {/* Inner ring accent */}
          <circle cx="50" cy="53" r="11" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
        </svg>
      </div>

      {/* Modern geometric bold font FARYSERVI */}
      <span
        className={`font-black tracking-tight text-[#0F172A] font-sans ${sizeMap[size].text}`}
        style={{ letterSpacing: '-0.02em' }}
      >
        FARYSERVI
      </span>
    </div>
  );
};
