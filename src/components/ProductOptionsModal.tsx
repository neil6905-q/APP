import React, { useState } from 'react';
import { X, Check, ShoppingBag, Plus, Minus, Sparkles, Tag, ShieldCheck, ArrowRight } from 'lucide-react';
import { Product, ProductOption } from '../types';

interface ProductOptionsModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, option: ProductOption, quantity: number) => void;
}

export const ProductOptionsModal: React.FC<ProductOptionsModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
}) => {
  if (!isOpen || !product) return null;

  const [selectedOptionId, setSelectedOptionId] = useState<string>(product.options[0]?.id || '');
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const selectedOption = product.options.find((opt) => opt.id === selectedOptionId) || product.options[0];
  const totalPrice = (selectedOption ? selectedOption.pricePEN : 0) * quantity;

  const handleAdd = () => {
    if (!selectedOption) return;
    onAddToCart(product, selectedOption, quantity);
    setAddedAnimation(true);
    setTimeout(() => {
      setAddedAnimation(false);
      onClose();
    }, 650);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-100 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header with image preview */}
        <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 p-5 sm:p-6 text-white">
          <button
            id="close-options-modal"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-white/80 shadow-md shrink-0"
            />
            <div>
              <span className="inline-block bg-white/20 text-amber-100 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full tracking-wider mb-1">
                Elige tu presentación
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-serif leading-tight">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-amber-100 line-clamp-1 mt-0.5">
                {product.subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-6 max-h-[65vh] overflow-y-auto space-y-5">
          {/* Detailed description */}
          <div className="bg-amber-50/70 p-3.5 rounded-2xl border border-amber-200/60 text-xs sm:text-sm text-stone-700 leading-relaxed">
            <p>{product.description}</p>
          </div>

          {/* Options Selection List */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-sm font-bold text-stone-900 flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-orange-600" />
                <span>Selecciona cantidad o presentación:</span>
              </label>
              <span className="text-xs text-stone-500">
                Precios en PEN (S/)
              </span>
            </div>

            <div className="space-y-2.5">
              {product.options.map((option) => {
                const isSelected = option.id === selectedOptionId;
                return (
                  <div
                    key={option.id}
                    id={`option-${option.id}`}
                    onClick={() => setSelectedOptionId(option.id)}
                    className={`relative p-3.5 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/60 shadow-sm ring-2 ring-orange-400/20'
                        : 'border-stone-200 hover:border-amber-300 hover:bg-stone-50/70'
                    }`}
                  >
                    {/* Left: Radio & text */}
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={`w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center transition-colors shrink-0 ${
                          isSelected
                            ? 'border-orange-500 bg-orange-500 text-white'
                            : 'border-stone-300 bg-white'
                        }`}
                      >
                        {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>

                      <div>
                        <div className="flex items-center flex-wrap gap-1.5">
                          <span className="text-sm sm:text-base font-bold text-stone-900">
                            {option.label}
                          </span>
                          {option.badge && (
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                                option.badge.includes('Mayorista')
                                  ? 'bg-purple-100 text-purple-800 border border-purple-200'
                                  : option.badge.includes('Vendido')
                                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                  : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                              }`}
                            >
                              {option.badge}
                            </span>
                          )}
                        </div>
                        {option.description && (
                          <p className="text-xs text-stone-500 mt-1">
                            {option.description}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Right: Price */}
                    <div className="text-right shrink-0">
                      {option.originalPricePEN && (
                        <div className="text-[11px] text-stone-400 line-through">
                          S/ {option.originalPricePEN.toFixed(2)}
                        </div>
                      )}
                      <div className="text-base sm:text-lg font-black text-orange-600">
                        S/ {option.pricePEN.toFixed(2)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quantity selector */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Cantidad de paquetes</span>
              <div className="text-sm font-bold text-stone-800">
                {selectedOption?.label}
              </div>
            </div>

            <div className="flex items-center gap-3 bg-white p-1 rounded-xl border border-stone-200 shadow-xs">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="w-9 h-9 rounded-lg bg-stone-100 hover:bg-orange-100 text-stone-700 hover:text-orange-700 disabled:opacity-40 disabled:hover:bg-stone-100 flex items-center justify-center transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-black text-stone-900 text-base">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-9 h-9 rounded-lg bg-stone-100 hover:bg-orange-100 text-stone-700 hover:text-orange-700 flex items-center justify-center transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Modal Footer / Add to Cart action */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left w-full sm:w-auto">
            <div className="text-xs text-stone-500 font-medium">Subtotal a añadir:</div>
            <div className="text-2xl sm:text-3xl font-black text-stone-900">
              S/ {totalPrice.toFixed(2)}{' '}
              <span className="text-xs font-bold text-stone-500 uppercase">PEN</span>
            </div>
          </div>

          <button
            id="modal-add-to-cart-btn"
            type="button"
            onClick={handleAdd}
            className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${
              addedAnimation
                ? 'bg-emerald-600 text-white ring-4 ring-emerald-200'
                : 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white shadow-orange-500/25'
            }`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-5 h-5 animate-scale" />
                <span>¡Añadido al Carrito!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-5 h-5" />
                <span>Añadir al Carrito</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
