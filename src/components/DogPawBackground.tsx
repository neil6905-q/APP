import React from 'react';

export const DogPawBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Scattered dog paw prints matching Image 2 */}
      {/* Top Left Paws */}
      <svg
        viewBox="0 0 100 100"
        className="absolute -top-4 -left-6 w-28 h-28 text-[#8C7A99]/20 transform -rotate-12"
        fill="currentColor"
      >
        <ellipse cx="50" cy="65" rx="20" ry="16" />
        <ellipse cx="26" cy="36" rx="9" ry="13" transform="rotate(-18 26 36)" />
        <ellipse cx="74" cy="36" rx="9" ry="13" transform="rotate(18 74 36)" />
        <ellipse cx="40" cy="22" rx="8" ry="12" transform="rotate(-6 40 22)" />
        <ellipse cx="60" cy="22" rx="8" ry="12" transform="rotate(6 60 22)" />
      </svg>

      {/* Behind Hero Card Right Side Paws (matching Image 2) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute top-12 -right-8 w-32 h-32 text-[#8C7A99]/22 transform rotate-25"
        fill="currentColor"
      >
        <ellipse cx="50" cy="65" rx="20" ry="16" />
        <ellipse cx="26" cy="36" rx="9" ry="13" transform="rotate(-18 26 36)" />
        <ellipse cx="74" cy="36" rx="9" ry="13" transform="rotate(18 74 36)" />
        <ellipse cx="40" cy="22" rx="8" ry="12" transform="rotate(-6 40 22)" />
        <ellipse cx="60" cy="22" rx="8" ry="12" transform="rotate(6 60 22)" />
      </svg>

      {/* Middle Left behind categories */}
      <svg
        viewBox="0 0 100 100"
        className="absolute top-72 -left-8 w-36 h-36 text-[#8C7A99]/25 transform rotate-45"
        fill="currentColor"
      >
        <ellipse cx="50" cy="65" rx="20" ry="16" />
        <ellipse cx="26" cy="36" rx="9" ry="13" transform="rotate(-18 26 36)" />
        <ellipse cx="74" cy="36" rx="9" ry="13" transform="rotate(18 74 36)" />
        <ellipse cx="40" cy="22" rx="8" ry="12" transform="rotate(-6 40 22)" />
        <ellipse cx="60" cy="22" rx="8" ry="12" transform="rotate(6 60 22)" />
      </svg>

      {/* Middle Right behind categories (visible in Image 2 behind the teal/green paws) */}
      <svg
        viewBox="0 0 100 100"
        className="absolute top-96 -right-6 w-32 h-32 text-[#8C7A99]/25 transform -rotate-20"
        fill="currentColor"
      >
        <ellipse cx="50" cy="65" rx="20" ry="16" />
        <ellipse cx="26" cy="36" rx="9" ry="13" transform="rotate(-18 26 36)" />
        <ellipse cx="74" cy="36" rx="9" ry="13" transform="rotate(18 74 36)" />
        <ellipse cx="40" cy="22" rx="8" ry="12" transform="rotate(-6 40 22)" />
        <ellipse cx="60" cy="22" rx="8" ry="12" transform="rotate(6 60 22)" />
      </svg>

      {/* Center subtle watermark */}
      <svg
        viewBox="0 0 100 100"
        className="absolute top-[520px] left-10 w-24 h-24 text-[#8C7A99]/18 transform rotate-15"
        fill="currentColor"
      >
        <ellipse cx="50" cy="65" rx="20" ry="16" />
        <ellipse cx="26" cy="36" rx="9" ry="13" transform="rotate(-18 26 36)" />
        <ellipse cx="74" cy="36" rx="9" ry="13" transform="rotate(18 74 36)" />
        <ellipse cx="40" cy="22" rx="8" ry="12" transform="rotate(-6 40 22)" />
        <ellipse cx="60" cy="22" rx="8" ry="12" transform="rotate(6 60 22)" />
      </svg>

      {/* Lower right watermark */}
      <svg
        viewBox="0 0 100 100"
        className="absolute bottom-32 -right-4 w-40 h-40 text-[#8C7A99]/20 transform -rotate-12"
        fill="currentColor"
      >
        <ellipse cx="50" cy="65" rx="20" ry="16" />
        <ellipse cx="26" cy="36" rx="9" ry="13" transform="rotate(-18 26 36)" />
        <ellipse cx="74" cy="36" rx="9" ry="13" transform="rotate(18 74 36)" />
        <ellipse cx="40" cy="22" rx="8" ry="12" transform="rotate(-6 40 22)" />
        <ellipse cx="60" cy="22" rx="8" ry="12" transform="rotate(6 60 22)" />
      </svg>
    </div>
  );
};
