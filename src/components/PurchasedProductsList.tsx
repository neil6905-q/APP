import React from 'react';
import { Package, ShoppingBag, Plus, Sparkles, CheckCircle, Dog, ArrowRight, RotateCcw } from 'lucide-react';
import { Order, Product, ProductOption } from '../types';
import { PRODUCTS } from '../data/products';

interface PurchasedProductsListProps {
  orderHistory: Order[];
  onQuickReorder: (product: Product, option: ProductOption) => void;
  onExploreCatalog: () => void;
}

export const PurchasedProductsList: React.FC<PurchasedProductsListProps> = ({
  orderHistory,
  onQuickReorder,
  onExploreCatalog,
}) => {
  // Aggregate all unique items purchased across all completed orders
  const purchasedItemsMap = new Map<string, {
    productId: string;
    productName: string;
    productImage: string;
    option: ProductOption;
    totalUnitsBought: number;
    lastPurchasedDate: string;
    orderCount: number;
  }>();

  orderHistory.forEach((order) => {
    order.items.forEach((item) => {
      const key = `${item.productId}-${item.option.id}`;
      const existing = purchasedItemsMap.get(key);
      if (existing) {
        existing.totalUnitsBought += item.quantity;
        existing.orderCount += 1;
      } else {
        purchasedItemsMap.set(key, {
          productId: item.productId,
          productName: item.productName,
          productImage: item.productImage,
          option: item.option,
          totalUnitsBought: item.quantity,
          lastPurchasedDate: order.createdAt,
          orderCount: 1,
        });
      }
    });
  });

  const purchasedList = Array.from(purchasedItemsMap.values());

  if (purchasedList.length === 0) {
    return (
      <div className="p-6 rounded-3xl bg-[#FAF7F2] border border-[#EDE5D8] text-center space-y-3">
        <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto">
          <Dog className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#291B10]">
            Aún no tienes productos comprados registrados
          </h4>
          <p className="text-xs text-[#705642] mt-1 max-w-xs mx-auto">
            Cuando realices tu primer pedido en Fary Merk, aquí aparecerán tus snacks favoritos para repetir tu compra con un solo clic.
          </p>
        </div>
        <button
          type="button"
          onClick={onExploreCatalog}
          className="px-4 py-2 rounded-xl bg-[#E75A43] hover:bg-[#D3462F] text-white text-xs font-bold transition-all shadow-sm"
        >
          Explorar Snacks Naturales
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-xs font-extrabold text-stone-900 uppercase tracking-wider flex items-center gap-1.5 font-serif">
            <Package className="w-4 h-4 text-orange-600" />
            <span>Tus Snacks Comprados Habituales ({purchasedList.length})</span>
          </h4>
          <p className="text-[11px] text-stone-500">
            Repite tu pedido favorito directamente al carrito.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {purchasedList.map((item) => {
          const originalProduct = PRODUCTS.find((p) => p.id === item.productId);

          return (
            <div
              key={`${item.productId}-${item.option.id}`}
              className="p-3 rounded-2xl bg-white border border-[#EDE5D8] shadow-xs flex flex-col justify-between gap-2.5 hover:border-orange-300 transition-all group"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.productImage}
                  alt={item.productName}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0 flex-1">
                  <h5 className="text-xs font-extrabold text-stone-900 truncate">
                    {item.productName}
                  </h5>
                  <p className="text-[11px] text-stone-500 truncate">
                    {item.option.label}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-black text-orange-600">
                      S/ {item.option.pricePEN.toFixed(2)}
                    </span>
                    <span className="text-[10px] text-stone-400">
                      • {item.totalUnitsBought} {item.totalUnitsBought === 1 ? 'paquete pedido' : 'paquetes pedidos'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                <span className="text-[10px] text-stone-400">
                  Último: {new Date(item.lastPurchasedDate).toLocaleDateString('es-PE')}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    if (originalProduct) {
                      onQuickReorder(originalProduct, item.option);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl bg-orange-50 hover:bg-orange-500 text-orange-700 hover:text-white text-[11px] font-bold flex items-center gap-1 transition-all"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Volver a Comprar</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
