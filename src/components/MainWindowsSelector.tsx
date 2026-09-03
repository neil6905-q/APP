import React from 'react';
import { Package, GraduationCap, Sparkles, ChevronRight, LayoutGrid, Dog, ArrowLeft } from 'lucide-react';

interface MainWindowsSelectorProps {
  activeWindow: 'portal' | 'snacks' | 'mentorias';
  onSelectWindow: (window: 'portal' | 'snacks' | 'mentorias') => void;
}

export const MainWindowsSelector: React.FC<MainWindowsSelectorProps> = ({
  activeWindow,
  onSelectWindow,
}) => {
  return (
    <section className="space-y-2">
      {/* Top Breadcrumb & Status Navigation */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          {activeWindow !== 'portal' && (
            <button
              type="button"
              onClick={() => onSelectWindow('portal')}
              className="inline-flex items-center gap-1 text-xs font-bold text-[#E75A43] hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Servicios</span>
            </button>
          )}
          <span className="text-[11px] font-black uppercase tracking-wider text-[#8A7563] flex items-center gap-1">
            <span>•</span>
            <span>
              {activeWindow === 'portal' && 'Directorio de Servicios'}
              {activeWindow === 'snacks' && 'Ventana: Snacks para Perros'}
              {activeWindow === 'mentorias' && 'Ventana: Mentorías & Consultoría'}
            </span>
          </span>
        </div>

        {activeWindow !== 'portal' && (
          <button
            type="button"
            onClick={() => onSelectWindow('portal')}
            className="text-[11px] font-bold text-stone-600 hover:text-stone-900 bg-white px-2.5 py-1 rounded-xl border border-[#EDE5D8] flex items-center gap-1 shadow-2xs"
          >
            <LayoutGrid className="w-3 h-3" />
            <span>Ver todos los servicios</span>
          </button>
        )}
      </div>

      {/* Switcher Pills Strip */}
      <div className="p-1.5 rounded-2xl bg-white border border-[#EDE5D8] shadow-xs flex items-center gap-1.5 text-xs font-bold">
        {/* Tab 1: Portal / Recopilación */}
        <button
          type="button"
          onClick={() => onSelectWindow('portal')}
          className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeWindow === 'portal'
              ? 'bg-[#291B10] text-white shadow-xs'
              : 'text-[#705642] hover:bg-[#FAF7F2]'
          }`}
        >
          <LayoutGrid className="w-4 h-4" />
          <span className="truncate">Portal Servicios</span>
        </button>

        {/* Tab 2: Snacks */}
        <button
          type="button"
          onClick={() => onSelectWindow('snacks')}
          className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeWindow === 'snacks'
              ? 'bg-[#E75A43] text-white shadow-xs'
              : 'text-[#705642] hover:bg-orange-50/50'
          }`}
        >
          <Dog className="w-4 h-4" />
          <span className="truncate">Snacks Caninos</span>
        </button>

        {/* Tab 3: Mentorías */}
        <button
          type="button"
          onClick={() => onSelectWindow('mentorias')}
          className={`flex-1 py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeWindow === 'mentorias'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-[#705642] hover:bg-slate-100'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span className="truncate">Mentorías Pro</span>
        </button>
      </div>
    </section>
  );
};
