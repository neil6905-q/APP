import React from 'react';
import { 
  X, 
  Dog, 
  GraduationCap, 
  Home, 
  ShoppingCart, 
  User, 
  MessageCircle, 
  Sparkles, 
  ShieldCheck, 
  Truck,
  Wrench,
  Sparkle,
  ChevronRight
} from 'lucide-react';
import { ServicityLogo } from './ServicityLogo';
import { UserProfile } from '../types';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '../data/products';

interface ServicityMenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: 'portal' | 'snacks' | 'mentorias') => void;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  currentUser: UserProfile | null;
  cartCount: number;
}

export const ServicityMenuDrawer: React.FC<ServicityMenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenCart,
  onOpenAuth,
  currentUser,
  cartCount,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative z-10 w-full max-w-xs bg-white h-full shadow-2xl flex flex-col justify-between p-5 overflow-y-auto">
        {/* Top Header */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-stone-100 pb-3">
            <ServicityLogo size="md" />
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 text-stone-600 hover:bg-stone-200 flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* User Profile Bar */}
          <div 
            onClick={() => {
              onClose();
              onOpenAuth();
            }}
            className="p-3 rounded-2xl bg-[#F8FAFC] border border-stone-200/80 flex items-center gap-3 cursor-pointer hover:bg-stone-100 transition-colors"
          >
            {currentUser?.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt="Perfil"
                className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                {currentUser ? currentUser.fullName.charAt(0) : <User className="w-5 h-5" />}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="font-bold text-xs text-stone-900 block truncate">
                {currentUser ? currentUser.fullName : 'Iniciar sesión con Google'}
              </span>
              <span className="text-[11px] text-blue-600 font-semibold block">
                {currentUser ? currentUser.email : 'Accede a tus servicios y pedidos'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 block px-2">
              Explorar Servicios
            </span>

            {/* Link 1: Portal / Home */}
            <button
              type="button"
              onClick={() => {
                onNavigate('portal');
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-blue-50 text-stone-800 font-bold text-xs flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <Home className="w-4 h-4 text-blue-600" />
                <span>Portal de Servicios (FaryServi)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Link 2: Snacks Caninos Fary Merk */}
            <button
              type="button"
              onClick={() => {
                onNavigate('snacks');
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl bg-orange-50/60 hover:bg-orange-100/80 text-[#291B10] font-bold text-xs flex items-center justify-between border border-orange-200/60 group transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#E75A43] text-white flex items-center justify-center">
                  <Dog className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-[#291B10]">Snacks para Perros</span>
                  <span className="text-[10px] text-[#E75A43] font-semibold">100% Naturales deshidratados</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-[#E75A43] group-hover:translate-x-0.5 transition-transform" />
            </button>

            {/* Link 3: Mentorías Pro */}
            <button
              type="button"
              onClick={() => {
                onNavigate('mentorias');
                onClose();
              }}
              className="w-full text-left px-3 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center justify-between group transition-colors"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-amber-500 text-slate-900 flex items-center justify-center font-bold">
                  <GraduationCap className="w-3.5 h-3.5" />
                </div>
                <div>
                  <span className="block text-white">Centro de Mentorías</span>
                  <span className="text-[10px] text-amber-300 font-semibold">Consultoría y asesorías 1 a 1</span>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Footer Support */}
        <div className="pt-4 border-t border-stone-100 space-y-2">
          <button
            type="button"
            onClick={() => {
              const text = encodeURIComponent('Hola FaryServi, quisiera información sobre los servicios disponibles.');
              window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
            }}
            className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Atención por WhatsApp</span>
          </button>
          <p className="text-[10px] text-center text-stone-400">
            FaryServi & Fary Merk • Todos los derechos reservados
          </p>
        </div>
      </div>
    </div>
  );
};
