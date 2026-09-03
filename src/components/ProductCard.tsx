import React, { useState } from 'react';
import { ShoppingCart, Heart, Sparkles, ChevronRight } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  // Representative presentation
  const defaultOption = product.options[1] || product.options[0];

  return (
    <div
      id={`product-card-${product.id}`}
      className="group bg-white rounded-[26px] sm:rounded-[30px] border border-[#EFE8DC] p-3 sm:p-4 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
    >
      <div>
        {/* Image Box with Heart Button */}
        <div 
          className="relative w-full aspect-square bg-[#FDFBF7] rounded-2xl overflow-hidden cursor-pointer mb-3"
          onClick={() => onSelectProduct(product)}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />

          {/* Heart favorite button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsFavorite(!isFavorite);
            }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-stone-400 hover:text-rose-500 shadow-xs transition-colors"
            title="Guardar en favoritos"
          >
            <Heart
              className={`w-4 h-4 ${
                isFavorite ? 'fill-rose-500 text-rose-500' : 'text-rose-500'
              }`}
            />
          </button>

          {/* Subtle natural badge */}
          <div className="absolute bottom-2 left-2 pointer-events-none">
            <span className="bg-amber-500/90 backdrop-blur-xs text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full shadow-xs uppercase">
              100% Natural
            </span>
          </div>
        </div>

        {/* Product Details */}
        <div className="px-1">
          <h3 
            onClick={() => onSelectProduct(product)}
            className="text-sm sm:text-base font-extrabold text-[#291B10] leading-tight cursor-pointer hover:text-[#E75A43] transition-colors"
          >
            {product.name.replace(' Deshidratadas', '').replace(' Deshidratados', '').replace(' Deshidratada', '')} •
          </h3>

          <p className="text-xs text-[#8A7563] font-medium mt-0.5">
            {defaultOption?.label.replace(' de patas de pollo', '').replace(' de cuellos de pollo', '').replace(' de orejas de cerdo', '').replace(' de tráquea de res', '') || 'Varias presentaciones'}
          </p>

          {/* Price display */}
          <div className="mt-2 mb-3">
            <div className="text-base sm:text-xl font-black text-[#E75A43] tracking-tight">
              S/ {product.minPrice.toFixed(2)}
            </div>
            <span className="text-[10px] text-[#A39281] font-semibold">
              {product.options.length} opciones disponibles
            </span>
          </div>
        </div>
      </div>

      {/* Button: "Añádelo a tu carrito" in Coral/Orange matching reference */}
      <button
        id={`btn-add-to-cart-${product.id}`}
        type="button"
        onClick={() => onSelectProduct(product)}
        className="w-full py-2.5 sm:py-3 px-3 rounded-2xl bg-[#E75A43] hover:bg-[#D3462F] active:scale-[0.98] text-white font-black text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-sm hover:shadow-md transition-all group/btn"
      >
        <ShoppingCart className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
        <span className="whitespace-nowrap">Añádelo a tu carrito</span>
      </button>
    </div>
  );
};
