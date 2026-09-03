import React from 'react';
import { ShoppingBag, MessageCircle, Sparkles, Dog, ShieldCheck, Truck, User, LogIn, LayoutGrid, GraduationCap } from 'lucide-react';
import { WHATSAPP_DISPLAY } from '../data/products';
import { UserProfile } from '../types';

interface HeaderProps {
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  onOpenWhatsApp: () => void;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  activeService: 'portal' | 'snacks' | 'mentorias';
  onSelectService: (service: 'portal' | 'snacks' | 'mentorias') => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenWhatsApp,
  currentUser,
  onOpenAuth,
  activeService,
  onSelectService,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#EDE5D8] shadow-xs">
      {/* Top announcement bar */}
      <div className="bg-gradient-to-r from-[#291B10] via-[#3B291A] to-[#291B10] text-white text-xs font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto text-nowrap">
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <span className="bg-amber-400/20 text-amber-300 px-2 py-0.2 rounded-full text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 border border-amber-400/30">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Ecosistema Fary Merk
            </span>
            <span className="text-stone-300 text-xs">
              Portal Multiecosistema: Snacks Deshidratados 100% Naturales & Mentorías Especializadas
            </span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-xs font-semibold text-amber-100/80">
            <span className="flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-amber-300" /> Envíos a Lima y Provincias
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Cero Químicos ni Preservantes
            </span>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 sm:py-3">
        <div className="flex items-center justify-between gap-3">
          {/* Brand & Logo (Clicking returns to Services Portal) */}
          <div 
            onClick={() => onSelectService('portal')}
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
            title="Ir al Portal de Servicios"
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-[#E75A43] to-amber-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20 ring-2 ring-amber-100 group-hover:scale-105 transition-transform">
              <Dog className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black tracking-tight text-[#291B10] font-serif">
                  FARY <span className="text-[#E75A43]">MERK</span>
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-wider hidden sm:inline-flex bg-stone-100 text-stone-700 border-stone-200">
                  {activeService === 'portal' && 'Portal de Servicios'}
                  {activeService === 'snacks' && 'Tienda de Snacks'}
                  {activeService === 'mentorias' && 'Mentorías Pro'}
                </span>
              </div>
              <p className="text-[11px] text-[#705642] font-medium hidden sm:block">
                Snacks Naturales para Mascotas & Mentorías Profesionales
              </p>
            </div>
          </div>

          {/* Quick Service Switcher Tabs (Desktop / Tablet) */}
          <div className="hidden lg:flex items-center p-1 bg-[#FAF7F2] rounded-2xl border border-[#EDE5D8] text-xs font-bold">
            <button
              type="button"
              onClick={() => onSelectService('portal')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeService === 'portal'
                  ? 'bg-[#291B10] text-white shadow-xs'
                  : 'text-[#705642] hover:text-[#291B10]'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Servicios</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectService('snacks')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeService === 'snacks'
                  ? 'bg-[#E75A43] text-white shadow-xs'
                  : 'text-[#705642] hover:text-[#291B10]'
              }`}
            >
              <Dog className="w-3.5 h-3.5" />
              <span>Snacks Caninos</span>
            </button>

            <button
              type="button"
              onClick={() => onSelectService('mentorias')}
              className={`px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                activeService === 'mentorias'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-[#705642] hover:text-[#291B10]'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Mentorías</span>
            </button>
          </div>

          {/* User actions and Cart */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* User Account / Google button */}
            <button
              id="header-user-btn"
              type="button"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl bg-[#FAF7F2] hover:bg-stone-100 text-stone-800 text-xs font-bold transition-all border border-[#EDE5D8] shadow-xs"
              title="Mi perfil y compras"
            >
              <User className="w-3.5 h-3.5 text-[#E75A43]" />
              <span className="max-w-[90px] truncate">
                {currentUser ? currentUser.fullName.split(' ')[0] : 'Ingresar'}
              </span>
            </button>

            {/* Direct WhatsApp help button */}
            <button
              id="header-whatsapp-btn"
              onClick={onOpenWhatsApp}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition-all border border-emerald-200 shadow-xs"
              title="Atención directa por WhatsApp"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="relative flex items-center gap-2 sm:gap-2.5 px-3 py-2 rounded-xl bg-[#291B10] hover:bg-[#E75A43] text-white transition-all shadow-xs active:scale-95 group"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#E75A43] text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <div className="text-left hidden xs:block">
                <div className="text-[9px] text-stone-400 uppercase font-semibold leading-none">Carrito</div>
                <div className="text-xs font-bold text-white leading-tight">
                  S/ {cartTotal.toFixed(2)}
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
