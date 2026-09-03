import React from 'react';
import { Product } from '../types';

interface CategoryBarProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  onQuickOpenProduct: (product: Product) => void;
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickOpenProduct,
}) => {
  const categoryCards = [
    {
      id: 'patas-pollo',
      slug: 'aves',
      label: 'Patas de pollo',
      pawColor: '#F59E0B', // Yellow / Amber
      bgColor: 'bg-amber-500/10',
      textColor: 'text-[#291B10]',
      borderColor: 'border-amber-200/60',
    },
    {
      id: 'cuellos-pollo',
      slug: 'aves',
      label: 'Cuellos de pollo',
      pawColor: '#EA580C', // Orange / Coral
      bgColor: 'bg-orange-500/10',
      textColor: 'text-[#291B10]',
      borderColor: 'border-orange-200/60',
    },
    {
      id: 'orejas-cerdo',
      slug: 'cerdo',
      label: 'Orejas de cerdo',
      pawColor: '#14B8A6', // Teal / Cyan
      bgColor: 'bg-teal-500/10',
      textColor: 'text-[#291B10]',
      borderColor: 'border-teal-200/60',
    },
    {
      id: 'traquea-res',
      slug: 'res',
      label: 'Tráquea de res',
      pawColor: '#84CC16', // Lime / Green
      bgColor: 'bg-lime-500/10',
      textColor: 'text-[#291B10]',
      borderColor: 'border-lime-200/60',
    },
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-4 gap-2 sm:gap-3">
        {categoryCards.map((cat) => {
          const matchingProduct = products.find((p) => p.id === cat.id);
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              id={`cat-card-${cat.id}`}
              type="button"
              onClick={() => {
                if (matchingProduct) {
                  onQuickOpenProduct(matchingProduct);
                } else {
                  onSelectCategory(cat.id);
                }
              }}
              className={`p-2.5 sm:p-3.5 rounded-2xl sm:rounded-3xl bg-white border transition-all duration-200 flex flex-col items-center justify-center text-center group active:scale-95 shadow-xs hover:shadow-md ${
                isSelected
                  ? 'border-orange-500 ring-2 ring-orange-400/30 shadow-sm'
                  : `${cat.borderColor} hover:border-orange-300`
              }`}
            >
              {/* Paw Icon */}
              <div
                className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center mb-1.5 transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${cat.pawColor}18` }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 sm:w-7 sm:h-7"
                  fill={cat.pawColor}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <ellipse cx="12" cy="17.5" rx="4.5" ry="3.5" />
                  <ellipse cx="6.5" cy="10.5" rx="2.2" ry="3" transform="rotate(-15 6.5 10.5)" />
                  <ellipse cx="17.5" cy="10.5" rx="2.2" ry="3" transform="rotate(15 17.5 10.5)" />
                  <ellipse cx="10" cy="6.5" rx="2" ry="2.8" transform="rotate(-5 10 6.5)" />
                  <ellipse cx="14" cy="6.5" rx="2" ry="2.8" transform="rotate(5 14 6.5)" />
                </svg>
              </div>

              {/* Label */}
              <span className="text-[11px] sm:text-xs font-bold text-[#291B10] leading-tight line-clamp-2 max-w-[80px] sm:max-w-none">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
