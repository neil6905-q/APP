import React, { useState } from 'react';
import { 
  CheckCircle, 
  MessageCircle, 
  Copy, 
  Check, 
  Dog, 
  Sparkles, 
  MapPin, 
  CreditCard, 
  ArrowRight, 
  RotateCcw, 
  PackageCheck,
  Gift,
  QrCode,
  Truck
} from 'lucide-react';
import { Order } from '../types';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY, YAPE_DISPLAY, YAPE_HOLDER } from '../data/products';
import { OrderTracker } from './OrderTracker';

interface OrderConfirmationModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
  onModifyOrder?: () => void;
}

export const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({
  order,
  isOpen,
  onClose,
  onModifyOrder,
}) => {
  if (!isOpen || !order) return null;

  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    let summary = `🐾 PEDIDO FARY MERK #${order.id} (Código de Seguimiento: ${order.trackingCode})\n`;
    summary += `Cliente: ${order.customer.fullName} (${order.customer.phone})\n`;
    if (order.customer.dogName) {
      summary += `Perrito: ${order.customer.dogName} 🐶 (Con regalito sorpresa)\n`;
    }
    summary += `Dirección: ${order.customer.address}, ${order.customer.district} (${order.customer.department})\n\n`;
    summary += `Productos:\n`;
    order.items.forEach((item) => {
      summary += `- ${item.quantity}x ${item.productName} (${item.option.label}): S/ ${(item.option.pricePEN * item.quantity).toFixed(2)}\n`;
    });
    summary += `\nTotal: S/ ${order.totalPEN.toFixed(2)} PEN`;
    summary += `\nForma de pago: ${order.customer.paymentMethod === 'yape_contra_entrega' ? `Yape/Plin Contra Entrega al cel ${YAPE_DISPLAY}` : 'Tarjeta Débito/Crédito en plataforma'}`;

    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getWhatsAppReceiptUrl = () => {
    const text = encodeURIComponent(
      `Hola Fary Merk! 👋 Registré mi pedido #${order.id} (Seguimiento: ${order.trackingCode}). Adjunto mi comprobante para coordinar la entrega y ${order.customer.paymentMethod === 'yape_contra_entrega' ? `el pago contra entrega de S/ ${order.totalPEN.toFixed(2)}` : 'la verificación del pago con tarjeta'}.`
    );
    return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-amber-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Banner */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-700 to-emerald-700 p-6 sm:p-7 text-white text-center relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
          
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center mx-auto mb-2.5 shadow-lg shadow-emerald-900/20 text-emerald-600 animate-bounce">
            <CheckCircle className="w-9 h-9 stroke-[2.5]" />
          </div>

          <span className="inline-block bg-white/20 text-emerald-100 text-[11px] font-black uppercase px-3 py-1 rounded-full tracking-wider mb-1.5">
            ¡Pedido Registrado con Éxito en Fary Merk!
          </span>

          <h2 className="text-2xl sm:text-3xl font-black font-serif">
            ¡Gracias por tu compra, {order.customer.fullName.split(' ')[0]}! 🐾
          </h2>

          <p className="text-xs sm:text-sm text-emerald-100 mt-1 max-w-md mx-auto">
            Orden <span className="font-mono font-bold text-white">#{order.id}</span> • Código de Seguimiento <span className="font-mono font-black text-amber-200">{order.trackingCode}</span>
          </p>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-4 sm:p-6 max-h-[62vh] overflow-y-auto space-y-5">
          {/* 1. SEGUIMIENTO DEL PRODUCTO (ORDER TRACKER SECTION) */}
          <div>
            <div className="flex items-center gap-1.5 text-xs font-black uppercase text-stone-900 mb-2">
              <Truck className="w-4 h-4 text-orange-600" />
              <span>Seguimiento de tu Producto en Tiempo Real</span>
            </div>
            <OrderTracker order={order} />
          </div>

          {/* Payment Guidance Box */}
          {order.customer.paymentMethod === 'yape_contra_entrega' ? (
            <div className="bg-purple-50 p-4 rounded-2xl border border-purple-200">
              <div className="flex items-center gap-2 text-xs font-bold text-purple-900 mb-1">
                <QrCode className="w-4 h-4 text-purple-600" />
                <span>Pago Contra Entrega con Yape / Plin</span>
              </div>
              <p className="text-xs text-purple-800 leading-relaxed">
                Yapearás o escanearás el código QR cuando el motorizado llegue a tu domicilio. Puedes tener listo tu Yape al número oficial <strong>{YAPE_DISPLAY}</strong> ({YAPE_HOLDER}) por el monto exacto de <strong>S/ {order.totalPEN.toFixed(2)} PEN</strong>.
              </p>
            </div>
          ) : (
            <div className="bg-emerald-50 p-4 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <span className="font-bold">Pago con Tarjeta Procesado en Plataforma</span>
                <p className="text-[11px] text-emerald-800">
                  Tu transacción fue verificada exitosamente. Tu pedido pasará directo a despacho.
                </p>
              </div>
            </div>
          )}

          {/* Customer & Delivery Information */}
          <div className="bg-stone-50 p-4 rounded-2xl border border-stone-200 space-y-2 text-xs text-stone-700">
            <div className="font-bold text-stone-900 uppercase text-[11px] tracking-wider mb-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-orange-600" />
                <span>Datos de Entrega</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <span className="text-stone-500">Destinatario:</span> <strong className="text-stone-900">{order.customer.fullName}</strong>
              </div>
              <div>
                <span className="text-stone-500">Teléfono:</span> <strong className="text-stone-900">{order.customer.phone}</strong>
              </div>
              {order.customer.dogName && (
                <div className="sm:col-span-2 text-amber-800 bg-amber-50 p-1.5 rounded-lg border border-amber-200">
                  <span className="font-semibold">🐶 Perrito a Consentir:</span> <strong>{order.customer.dogName}</strong> (¡Regalito sorpresa incluido!)
                </div>
              )}
              <div className="sm:col-span-2">
                <span className="text-stone-500">Dirección:</span> <strong className="text-stone-900">{order.customer.address}, {order.customer.district} ({order.customer.department})</strong>
              </div>
              {order.customer.reference && (
                <div className="sm:col-span-2">
                  <span className="text-stone-500">Ref:</span> {order.customer.reference}
                </div>
              )}
            </div>
          </div>

          {/* Ordered items breakdown */}
          <div>
            <div className="font-bold text-stone-900 uppercase text-xs tracking-wider mb-3 flex items-center gap-1.5">
              <PackageCheck className="w-4 h-4 text-orange-600" />
              <span>Detalle de Snacks Deshidratados Fary Merk</span>
            </div>

            <div className="space-y-2">
              {order.items.map((item) => (
                <div
                  key={item.cartItemId}
                  className="flex items-center justify-between p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-10 h-10 rounded-lg object-cover border border-stone-200"
                    />
                    <div>
                      <div className="font-bold text-stone-900">{item.productName}</div>
                      <div className="text-stone-500 text-[11px]">
                        {item.option.label} • {item.quantity} {item.quantity === 1 ? 'paquete' : 'paquetes'}
                      </div>
                    </div>
                  </div>

                  <div className="text-right font-black text-stone-900">
                    S/ {(item.option.pricePEN * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Total breakdown */}
            <div className="mt-3 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200/70 space-y-1.5 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal snacks:</span>
                <span className="font-semibold text-stone-900">S/ {order.subtotalPEN.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Costo de envío:</span>
                <span className="font-semibold text-emerald-700">
                  {order.deliveryCostPEN === 0 ? '¡GRATIS!' : `S/ ${order.deliveryCostPEN.toFixed(2)}`}
                </span>
              </div>
              <div className="border-t border-amber-200 pt-1.5 flex justify-between items-baseline text-sm font-black text-stone-900">
                <span>TOTAL A PAGAR:</span>
                <span className="text-lg text-[#E75A43] font-black">
                  S/ {order.totalPEN.toFixed(2)} PEN
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCopySummary}
              className="flex-1 sm:flex-initial px-4 py-3 rounded-xl bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 text-xs font-bold flex items-center justify-center gap-2 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>¡Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copiar Resumen</span>
                </>
              )}
            </button>

            {onModifyOrder && (
              <button
                type="button"
                onClick={onModifyOrder}
                className="px-3.5 py-3 rounded-xl bg-orange-100 text-orange-800 hover:bg-orange-200 text-xs font-bold flex items-center gap-1 transition-colors"
                title="Modificar productos o datos de este pedido"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Modificar</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href={getWhatsAppReceiptUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enviar por WhatsApp</span>
            </a>

            <button
              type="button"
              onClick={onClose}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-stone-900 hover:bg-[#E75A43] text-white text-xs sm:text-sm font-bold transition-all"
            >
              <span>Seguir Comprando</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
