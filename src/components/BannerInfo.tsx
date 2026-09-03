import React from 'react';
import { Bone, Sparkles, HeartPulse, Shield, Award, Zap } from 'lucide-react';

export const BannerInfo: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-amber-50/80 via-orange-50/40 to-white pt-6 pb-4 border-b border-amber-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero title & value proposition */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100/90 text-orange-800 text-xs font-bold uppercase tracking-wider mb-3 border border-orange-200 shadow-xs">
            <Bone className="w-3.5 h-3.5 text-orange-600" />
            Nutrición Real & Estimulación Masticatoria
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight font-serif leading-tight">
            Snacks Deshidratados Naturales <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-amber-600 to-amber-500">
              para la Salud y Felicidad de tu Perro
            </span>
          </h1>
          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed">
            Masticables artesanales deshidratados a fuego lento. Ricos en colágeno, calcio orgánico y condroprotectores. 
            Elige la presentación por unidad, docena o mayorista y agrégalo a tu carrito en un clic.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-2">
          <div className="bg-white p-3.5 rounded-2xl border border-amber-100/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-600 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">100% Puros</h4>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Sin químicos, sales, harinas ni conservantes.</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-amber-100/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 shrink-0">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">Salud Dental</h4>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Remueve el sarro y fortalece encías y mandíbula.</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-amber-100/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">Anti-Estrés</h4>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Libera endorfinas y calma la ansiedad del perro.</p>
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-amber-100/80 shadow-xs hover:shadow-md transition-shadow flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-600 shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-stone-900">Venta Mayorista</h4>
              <p className="text-[11px] sm:text-xs text-stone-500 mt-0.5">Precios especiales por docenas y cientos.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
