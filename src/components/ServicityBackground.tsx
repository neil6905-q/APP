import React from 'react';

export const ServicityBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Top Left / Middle Left vivid magenta/purple gradient splash matching Image 1 */}
      <div 
        className="absolute -top-10 -left-20 w-80 h-96 rounded-full bg-gradient-to-tr from-[#9333EA] via-[#C026D3] to-[#E11D48] opacity-80 blur-[85px] transform -rotate-12" 
      />

      {/* Top Right warm orange / amber crescent matching Image 1 */}
      <div 
        className="absolute top-16 -right-16 w-64 h-80 rounded-full bg-gradient-to-l from-[#F97316] via-[#FB923C] to-[#FBBF24] opacity-85 blur-[75px]" 
      />

      {/* Middle right soft glow */}
      <div 
        className="absolute top-[480px] -right-24 w-72 h-72 rounded-full bg-gradient-to-br from-[#38BDF8] via-[#0284C7] to-[#1E40AF] opacity-40 blur-[80px]" 
      />

      {/* Bottom Left ocean blue / cyan wave matching Image 1 */}
      <div 
        className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-gradient-to-tr from-[#0284C7] via-[#0EA5E9] to-[#38BDF8] opacity-70 blur-[90px]" 
      />

      {/* Bottom Right deep blue / indigo accent matching Image 1 */}
      <div 
        className="absolute -bottom-20 -right-14 w-80 h-80 rounded-full bg-gradient-to-tl from-[#1E3A8A] via-[#2563EB] to-[#60A5FA] opacity-75 blur-[90px]" 
      />
    </div>
  );
};
