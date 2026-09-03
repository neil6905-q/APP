import React from 'react';

export const MentorshipBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 select-none bg-[#0B132B]">
      {/* Subtle blueprint grid */}
      <div 
        className="absolute inset-0 opacity-[0.035]" 
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #FFFFFF 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }} 
      />

      {/* Deep formal radial glows */}
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gradient-to-br from-amber-600/15 via-amber-500/10 to-transparent blur-3xl" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 rounded-full bg-gradient-to-tr from-blue-900/30 via-indigo-900/20 to-transparent blur-3xl" />
      <div className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-gradient-to-tl from-slate-800/40 via-amber-700/10 to-transparent blur-3xl" />
    </div>
  );
};
