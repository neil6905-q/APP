import React from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Truck, ShieldCheck, Lock } from 'lucide-react';
import { CartItem, UserProfile } from '../types';
import { GoogleIcon } from './GoogleIcon';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onClearCart: () => void;
  onProceedToCheckout: () => void;
  currentUser?: UserProfile | null;
  onOpenAuth?: (promptMsg?: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedToCheckout,
  currentUser,
  onOpenAuth,
}) => {
  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.option.pricePEN * item.quantity,
    0
  );

  const freeShippingThreshold = 80;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-y-0 right-0 max-w-full flex pl-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-amber-500 to-orange-600 text-white flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold font-serif leading-tight">
                  Tu Carrito de Snacks
                </h2>
                <p className="text-xs text-amber-100 font-medium">
                  {items.length} {items.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
                </p>
              </div>
            </div>

            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-2 rounded-full bg-black/10 hover:bg-black/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free shipping bar indicator */}
          <div className="bg-amber-50 p-3.5 border-b border-amber-200/70">
            <div className="flex items-center justify-between text-xs font-bold text-amber-900 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-orange-600" />
                {remainingForFreeShipping === 0
                  ? '¡Felicidades! Tienes Envío Gratis en Lima 🎉'
                  : `Agrega S/ ${remainingForFreeShipping.toFixed(2)} más para Envío Gratis`}
              </span>
              <span>{Math.round(progressPercent)}%</span>
            </div>
            <div className="w-full bg-amber-200 rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-orange-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Google Verification Status Notice */}
          <div className="px-4 py-2.5 bg-[#FAF7F2] border-b border-[#EDE5D8] flex items-center justify-between text-xs">
            {currentUser?.isGoogleVerified ? (
              <div className="flex items-center gap-2 text-emerald-800">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span className="font-semibold truncate">
                  Google: <strong>{currentUser.fullName}</strong>
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold">
                  ✓ Verificado
                </span>
              </div>
            ) : (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-1.5 text-stone-600">
                  <GoogleIcon className="w-4 h-4 shrink-0" />
                  <span className="text-[11px]">Compra protegida con Google</span>
                </div>
                {onOpenAuth && (
                  <button
                    type="button"
                    onClick={() => onOpenAuth('Inicia sesión con Google para verificar tu cuenta antes de pagar.')}
                    className="text-[11px] text-blue-600 font-bold hover:underline"
                  >
                    Verificarme
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 ? (
              <div className="text-center py-16 px-4">
                <div className="w-20 h-20 bg-orange-50 rounded-full flex items-center justify-center mx-auto mb-4 text-orange-400">
                  <ShoppingBag className="w-10 h-10" />
                </div>
                <h3 className="text-base font-bold text-stone-800">
                  Tu carrito está vacío
                </h3>
                <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
                  Elige tus patas, cuellos, orejas o tráqueas deshidratadas favoritas para consentir a tu perro.
                </p>
                <button
                  onClick={onClose}
                  className="mt-5 px-6 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-orange-500/20"
                >
                  Explorar Snacks
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.cartItemId}
                  id={`cart-item-${item.cartItemId}`}
                  className="bg-stone-50 p-3.5 rounded-2xl border border-stone-200/80 flex gap-3 items-start relative group"
                >
                  <img
                    src={item.productImage}
                    alt={item.productName}
                    className="w-16 h-16 rounded-xl object-cover border border-stone-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-bold text-stone-900 leading-snug">
                        {item.productName}
                      </h4>
                      <button
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="text-stone-400 hover:text-red-600 transition-colors p-1"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="text-xs font-medium text-orange-700 mt-0.5">
                      {item.option.label}
                    </div>

                    <div className="flex items-center justify-between mt-2.5">
                      {/* Quantity buttons */}
                      <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border border-stone-200">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="text-stone-500 hover:text-orange-600 disabled:opacity-30"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-stone-900 min-w-4 text-center">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="text-stone-500 hover:text-orange-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Line total */}
                      <div className="text-right">
                        <span className="text-xs text-stone-400 font-normal mr-1">
                          S/ {item.option.pricePEN.toFixed(2)} c/u =
                        </span>
                        <span className="text-sm font-black text-stone-900">
                          S/ {(item.option.pricePEN * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with totals and Proceed to Payment button */}
          {items.length > 0 && (
            <div className="p-5 bg-stone-50 border-t border-stone-200 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Subtotal productos</span>
                  <span className="font-semibold text-stone-900">
                    S/ {subtotal.toFixed(2)} PEN
                  </span>
                </div>
                <div className="flex justify-between text-xs text-stone-600">
                  <span>Estimado de entrega</span>
                  <span className="font-medium text-emerald-700">
                    {subtotal >= freeShippingThreshold ? 'Envío Gratis' : 'Calculado al checkout'}
                  </span>
                </div>
                <div className="border-t border-stone-200 pt-2 flex justify-between items-baseline">
                  <span className="text-sm font-bold text-stone-900">Total a pagar:</span>
                  <span className="text-2xl font-black text-orange-600">
                    S/ {subtotal.toFixed(2)}{' '}
                    <span className="text-xs font-bold text-stone-500">PEN</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  id="btn-proceed-to-checkout"
                  type="button"
                  onClick={onProceedToCheckout}
                  className="w-full py-4 px-5 rounded-2xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-500/25 active:scale-95 transition-all"
                >
                  <span>Pasar a la parte de Pago</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  onClick={onClearCart}
                  className="w-full py-2 text-xs text-stone-400 hover:text-red-500 font-medium transition-colors"
                >
                  Vaciar carrito
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Compra protegida • Yape, Plin o Tarjeta</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
