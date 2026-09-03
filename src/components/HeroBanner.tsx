import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import heroDogImg from '../assets/images/happy_dog_hero_1787152186706.jpg';

interface HeroBannerProps {
  onExplore: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExplore }) => {
  return (
    <div className="relative w-full rounded-[28px] sm:rounded-[32px] bg-gradient-to-r from-[#FFF9EE] via-[#FFF5E4] to-[#FFF0D4] border border-[#FDE6BA]/70 shadow-sm overflow-hidden p-5 sm:p-7">
      {/* Decorative Paw Watermarks */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[#FDE6BA]/50 pointer-events-none select-none text-4xl">
        🐾
      </div>
      <div className="absolute -bottom-4 right-1/4 text-[#FDE6BA]/30 pointer-events-none select-none text-5xl">
        🐾
      </div>

      <div className="grid grid-cols-12 items-center gap-3 relative z-10">
        {/* Left copy & CTA */}
        <div className="col-span-7 sm:col-span-7 flex flex-col justify-center pr-1">
          <div className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-black uppercase tracking-wider text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full w-fit mb-2">
            <Sparkles className="w-3 h-3 text-amber-600" />
            100% Natural
          </div>

          <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#291B10] leading-[1.15] tracking-tight font-serif">
            El snack favorito de tu engreído
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-[#705642] font-medium leading-snug">
            Combos naturales para premiarlo todos los días
          </p>

          <div className="mt-4">
            <button
              id="hero-see-combos-btn"
              type="button"
              onClick={onExplore}
              className="bg-[#FACC15] hover:bg-[#EAB308] active:scale-95 text-[#291B10] font-black text-xs sm:text-sm px-5 sm:px-6 py-2.5 sm:py-3 rounded-2xl shadow-sm hover:shadow-md transition-all inline-flex items-center gap-1.5"
            >
              <span>Ver combos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Dog Portrait */}
        <div className="col-span-5 sm:col-span-5 flex justify-end items-end relative">
          <div className="relative w-28 h-28 sm:w-44 sm:h-44 lg:w-48 lg:h-48">
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-200/40 to-transparent blur-md transform scale-95" />
            <img
              src={heroDogImg}
              alt="Perrito feliz con bandana amarilla comiendo snacks deshidratados"
              className="w-full h-full object-cover object-center rounded-2xl sm:rounded-3xl shadow-sm border-2 border-white/80 transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Carousel Dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4 pt-1">
        <span className="w-2.5 h-2.5 rounded-full bg-[#E75A43] shadow-xs" />
        <span className="w-2 h-2 rounded-full bg-[#E5D7C5]" />
        <span className="w-2 h-2 rounded-full bg-[#E5D7C5]" />
        <span className="w-2 h-2 rounded-full bg-[#E5D7C5]" />
      </div>
    </div>
  );
};
