import React from 'react';
import { 
  Home, 
  Search, 
  Clock, 
  User, 
  LayoutGrid, 
  ShoppingCart, 
  GraduationCap, 
  Dog,
  Sparkles,
  Layers
} from 'lucide-react';
import { UserProfile } from '../types';
import { GoogleIcon } from './GoogleIcon';

export type NavTabType = 'servicios' | 'snacks' | 'mentorias' | 'carrito' | 'cuenta';

interface BottomNavProps {
  activeWindow: 'portal' | 'snacks' | 'mentorias';
  activeTab: NavTabType;
  onTabChange: (tab: NavTabType) => void;
  cartCount: number;
  currentUser: UserProfile | null;
  onOpenAuth: () => void;
  onToggleSearch?: () => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeWindow,
  activeTab,
  onTabChange,
  cartCount,
  currentUser,
  onOpenAuth,
  onToggleSearch,
}) => {
  // If in Image 1 (SERVICITY Portal), render the modern clean navigation of Image 1
  if (activeWindow === 'portal') {
    return (
      <div className="fixed bottom-0 inset-x-0 z-30 pb-3 pt-1 px-3 sm:px-4 pointer-events-none flex justify-center">
        <nav className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-[28px] border border-stone-200 shadow-xl shadow-stone-900/10 px-3 sm:px-5 py-2 flex items-center justify-around gap-2 max-w-md w-full">
          {/* 1. Home / Portal */}
          <button
            id="servicity-nav-home"
            type="button"
            onClick={() => onTabChange('servicios')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
              activeTab === 'servicios'
                ? 'text-[#1E3A8A] font-bold'
                : 'text-stone-400 hover:text-stone-700'
            }`}
          >
            <Home className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] sm:text-[11px] font-bold">Home</span>
          </button>

          {/* 2. Snacks Caninos */}
          <button
            id="servicity-nav-snacks"
            type="button"
            onClick={() => onTabChange('snacks')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
              activeTab === 'snacks'
                ? 'text-[#E75A43] font-bold'
                : 'text-stone-400 hover:text-[#E75A43]'
            }`}
          >
            <Dog className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] sm:text-[11px] font-bold">Snacks</span>
          </button>

          {/* 3. Mentorías */}
          <button
            id="servicity-nav-mentorias"
            type="button"
            onClick={() => onTabChange('mentorias')}
            className={`flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl transition-all ${
              activeTab === 'mentorias'
                ? 'text-blue-900 font-bold'
                : 'text-stone-400 hover:text-blue-900'
            }`}
          >
            <GraduationCap className="w-5 h-5 stroke-[2.2]" />
            <span className="text-[10px] sm:text-[11px] font-bold">Mentorías</span>
          </button>

          {/* 4. Perfil / Google */}
          <button
            id="servicity-nav-profile"
            type="button"
            onClick={onOpenAuth}
            className="flex flex-col items-center gap-0.5 py-1 px-2.5 rounded-xl text-stone-400 hover:text-stone-700 transition-all"
          >
            <div className="relative">
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt="Perfil"
                  className="w-5 h-5 rounded-full object-cover ring-1 ring-blue-500"
                />
              ) : currentUser ? (
                <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                  {currentUser.fullName.charAt(0)}
                </div>
              ) : (
                <User className="w-5 h-5 stroke-[2.2]" />
              )}
            </div>
            <span className="text-[10px] sm:text-[11px] font-bold truncate max-w-[60px]">
              {currentUser ? currentUser.fullName.split(' ')[0] : 'Cuenta'}
            </span>
          </button>
        </nav>
      </div>
    );
  }

  // If in Image 2 (Snacks Caninos Theme), render the EXACT Image 2 bottom navigation bar
  return (
    <div className="fixed bottom-0 inset-x-0 z-30 pb-3 pt-1 px-3 sm:px-4 pointer-events-none flex justify-center">
      <nav className="pointer-events-auto bg-white/95 backdrop-blur-md rounded-[28px] border border-[#EDE5D8] shadow-lg shadow-stone-900/5 px-2.5 sm:px-4 py-2 flex items-center justify-around gap-1 sm:gap-4 max-w-lg w-full">
        {/* 1. Servicios (Grid Icon) */}
        <button
          id="nav-servicios"
          type="button"
          onClick={() => onTabChange('servicios')}
          className={`flex flex-col items-center gap-0.5 transition-colors py-0.5 px-2 rounded-xl ${
            activeTab === 'servicios' ? 'text-[#291B10] bg-stone-100 font-bold' : 'text-[#8A7563] hover:text-[#291B10]'
          }`}
        >
          <div className="relative">
            <LayoutGrid className="w-5 h-5 stroke-[2.2]" />
            {activeTab === 'servicios' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#291B10]" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold">Servicios</span>
        </button>

        {/* 2. Snacks (Dog Head Icon matching Image 2 in cute red style) */}
        <button
          id="nav-snacks"
          type="button"
          onClick={() => onTabChange('snacks')}
          className={`flex flex-col items-center gap-0.5 transition-colors py-0.5 px-2 rounded-xl ${
            activeTab === 'snacks' ? 'text-[#E75A43] font-bold bg-orange-50/70' : 'text-[#8A7563] hover:text-[#E75A43]'
          }`}
        >
          <div className="relative">
            {/* Cute Puppy Face Icon matching Image 2 */}
            <svg
              viewBox="0 0 24 24"
              className={`w-5 h-5 fill-none stroke-[2.2] ${activeTab === 'snacks' ? 'stroke-[#E75A43]' : 'stroke-current'}`}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {/* Dog head circle */}
              <circle cx="12" cy="13" r="7" />
              {/* Left floppy ear */}
              <path d="M5.5 10 C3.5 8, 2.5 13, 5 15" />
              {/* Right floppy ear */}
              <path d="M18.5 10 C20.5 8, 21.5 13, 19 15" />
              {/* Eyes */}
              <circle cx="9.5" cy="12" r="0.8" fill="currentColor" />
              <circle cx="14.5" cy="12" r="0.8" fill="currentColor" />
              {/* Nose */}
              <ellipse cx="12" cy="14.5" rx="1.2" ry="0.8" fill="currentColor" />
              {/* Mouth */}
              <path d="M11 16 Q12 17 13 16" />
            </svg>

            {activeTab === 'snacks' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#E75A43]" />
            )}
          </div>
          <span className={`text-[10px] sm:text-[11px] font-bold ${activeTab === 'snacks' ? 'text-[#E75A43]' : ''}`}>
            Snacks
          </span>
        </button>

        {/* 3. Mentorías */}
        <button
          id="nav-mentorias"
          type="button"
          onClick={() => onTabChange('mentorias')}
          className={`flex flex-col items-center gap-0.5 transition-colors py-0.5 px-2 rounded-xl ${
            activeTab === 'mentorias' ? 'text-slate-900 bg-slate-100 font-bold' : 'text-[#8A7563] hover:text-slate-900'
          }`}
        >
          <div className="relative">
            <GraduationCap className="w-5 h-5 stroke-[2.2]" />
            {activeTab === 'mentorias' && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-900" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold">Mentorías</span>
        </button>

        {/* 4. Carrito */}
        <button
          id="nav-carrito"
          type="button"
          onClick={() => onTabChange('carrito')}
          className={`flex flex-col items-center gap-0.5 transition-colors py-0.5 px-2 rounded-xl relative ${
            activeTab === 'carrito' ? 'text-[#E75A43] bg-orange-50/70 font-bold' : 'text-[#8A7563] hover:text-[#291B10]'
          }`}
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-[#E75A43] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                {cartCount}
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold">Carrito</span>
        </button>

        {/* 5. Google / Mi Cuenta */}
        <button
          id="nav-cuenta"
          type="button"
          onClick={onOpenAuth}
          className={`flex flex-col items-center gap-0.5 transition-colors py-0.5 px-2 rounded-xl relative ${
            currentUser ? 'text-stone-800 hover:text-[#E75A43]' : 'text-[#8A7563] hover:text-[#291B10]'
          }`}
        >
          <div className="relative">
            {currentUser?.avatarUrl ? (
              <img
                src={currentUser.avatarUrl}
                alt="Perfil Google"
                className="w-5 h-5 rounded-full object-cover ring-1 ring-emerald-500"
              />
            ) : currentUser ? (
              <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold">
                {currentUser.fullName.charAt(0)}
              </div>
            ) : (
              <GoogleIcon className="w-5 h-5" />
            )}
            {currentUser?.isGoogleVerified && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-emerald-500 rounded-full ring-2 ring-white" />
            )}
          </div>
          <span className="text-[10px] sm:text-[11px] font-bold truncate max-w-[65px]">
            {currentUser ? currentUser.fullName.split(' ')[0] : 'Google'}
          </span>
        </button>
      </nav>
    </div>
  );
};
