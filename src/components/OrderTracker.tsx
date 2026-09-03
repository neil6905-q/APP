import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Dog, 
  Sparkles, 
  MessageCircle, 
  ExternalLink, 
  RefreshCw, 
  ShieldCheck, 
  Phone,
  Gift
} from 'lucide-react';
import { Order, OrderTrackingStep } from '../types';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '../data/products';

interface OrderTrackerProps {
  order: Order;
  compact?: boolean;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({ order, compact = false }) => {
  // Allow user to simulate live progress
  const [currentStep, setCurrentStep] = useState<OrderTrackingStep>(order.trackingStatus || 'preparacion');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const steps: {
    id: OrderTrackingStep;
    title: string;
    description: string;
    time: string;
    icon: any;
  }[] = [
    {
      id: 'recibido',
      title: 'Pedido Recibido',
      description: 'Tu orden fue confirmada en el sistema Fary Merk.',
      time: 'Hoy, ' + new Date(order.createdAt).toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
      icon: Clock,
    },
    {
      id: 'preparacion',
      title: 'En Preparación & Empaque 100% Sellado',
      description: order.customer.dogName 
        ? `Deshidratado natural con premio especial para ${order.customer.dogName} 🐶.`
        : 'Deshidratado natural y sellado hermético para máxima frescura.',
      time: 'En curso',
      icon: Package,
    },
    {
      id: 'en_camino',
      title: 'En Camino con Motorizado Fary Merk',
      description: `Ruta asignada hacia ${order.customer.district || 'tu domicilio'}.`,
      time: 'Estimado: 24-48 hrs',
      icon: Truck,
    },
    {
      id: 'entregado',
      title: 'Entregado & Perrito Feliz 🐾',
      description: 'Paquete recibido en la dirección de entrega.',
      time: 'Final',
      icon: CheckCircle,
    },
  ];

  const getStepIndex = (step: OrderTrackingStep) => {
    switch (step) {
      case 'recibido': return 0;
      case 'preparacion': return 1;
      case 'en_camino': return 2;
      case 'entregado': return 3;
      default: return 1;
    }
  };

  const activeIndex = getStepIndex(currentStep);

  const handleRefreshStatus = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Advance step for interactive demo if not finished
      if (currentStep === 'recibido') setCurrentStep('preparacion');
      else if (currentStep === 'preparacion') setCurrentStep('en_camino');
      setIsRefreshing(false);
    }, 600);
  };

  const getWhatsAppTrackingUrl = () => {
    const text = encodeURIComponent(
      `Hola Fary Merk! 👋 Quisiera consultar el estado de seguimiento de mi pedido con código #${order.trackingCode || order.id} a nombre de ${order.customer.fullName}.`
    );
    return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
  };

  return (
    <div className="bg-white rounded-3xl border border-[#EDE5D8] shadow-sm p-4 sm:p-6 overflow-hidden">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#EDE5D8]">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-orange-100 text-[#E75A43] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full">
              Seguimiento en Vivo Fary Merk
            </span>
            <span className="text-xs font-mono font-bold text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md">
              Código: {order.trackingCode || `FMK-${order.id.slice(-6)}`}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-extrabold text-[#291B10] mt-1 font-serif flex items-center gap-2">
            <span>Estado de tu Pedido</span>
            {order.customer.dogName && (
              <span className="text-xs font-normal text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                <Dog className="w-3 h-3 text-orange-600" />
                <span>Para: {order.customer.dogName}</span>
              </span>
            )}
          </h3>
        </div>

        <button
          type="button"
          onClick={handleRefreshStatus}
          disabled={isRefreshing}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-orange-50 border border-[#EDE5D8] text-xs font-bold text-[#705642] hover:text-[#E75A43] transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#E75A43]' : ''}`} />
          <span>{isRefreshing ? 'Actualizando...' : 'Actualizar Estado'}</span>
        </button>
      </div>

      {/* Dog Gift Callout if provided */}
      {order.customer.dogName && (
        <div className="mt-4 bg-gradient-to-r from-amber-50 to-orange-50 p-3 rounded-2xl border border-amber-200 flex items-center gap-2.5 text-xs text-amber-900">
          <div className="w-7 h-7 rounded-xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-xs">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold">¡Regalito Incluido!</span>
            <p className="text-[11px] text-amber-800">
              Estamos preparando un snack sorpresa para consentir a <strong>{order.customer.dogName}</strong> en este paquete 🐶.
            </p>
          </div>
        </div>
      )}

      {/* Progress Bar Visualizer */}
      <div className="mt-6 mb-6">
        <div className="relative">
          {/* Track Line */}
          <div className="absolute top-4 left-4 right-4 h-1 bg-stone-200 -z-0 rounded-full" />
          <div 
            className="absolute top-4 left-4 h-1 bg-[#22C55E] -z-0 rounded-full transition-all duration-500" 
            style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
          />

          {/* Dots */}
          <div className="flex justify-between relative z-10">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isPassed = idx <= activeIndex;
              const isCurrent = idx === activeIndex;

              return (
                <div key={step.id} className="flex flex-col items-center text-center max-w-[80px]">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all shadow-xs ${
                      isPassed
                        ? 'bg-[#22C55E] text-white ring-4 ring-green-100'
                        : 'bg-white text-stone-400 border-2 border-stone-300'
                    } ${isCurrent ? 'scale-110' : ''}`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-bold mt-1.5 leading-tight ${
                      isCurrent ? 'text-[#291B10]' : isPassed ? 'text-green-700' : 'text-stone-400'
                    }`}
                  >
                    {step.title.split(' ')[0]}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Detailed Steps Timeline */}
      <div className="space-y-3 mt-4">
        {steps.map((step, idx) => {
          const isPassed = idx <= activeIndex;
          const isCurrent = idx === activeIndex;

          return (
            <div
              key={step.id}
              className={`p-3 rounded-2xl border transition-all text-xs flex items-start justify-between gap-3 ${
                isCurrent
                  ? 'bg-orange-50/70 border-orange-200 ring-1 ring-orange-300/50'
                  : isPassed
                  ? 'bg-[#FAF7F2] border-[#EDE5D8]'
                  : 'bg-stone-50/50 border-stone-200/60 opacity-60'
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className={`p-1.5 rounded-lg shrink-0 mt-0.5 ${
                    isCurrent
                      ? 'bg-orange-500 text-white'
                      : isPassed
                      ? 'bg-emerald-500 text-white'
                      : 'bg-stone-200 text-stone-400'
                  }`}
                >
                  <step.icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="font-bold text-[#291B10] flex items-center gap-1.5">
                    <span>{step.title}</span>
                    {isCurrent && (
                      <span className="text-[9px] bg-orange-200 text-orange-900 font-extrabold px-1.5 py-0.2 rounded uppercase">
                        En curso
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#705642] mt-0.5 leading-tight">
                    {step.description}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-semibold text-stone-500 shrink-0">
                {step.time}
              </span>
            </div>
          );
        })}
      </div>

      {/* Delivery & Payment Note */}
      <div className="mt-4 p-3.5 rounded-2xl bg-stone-50 border border-stone-200 text-xs space-y-1.5">
        <div className="flex items-center justify-between text-stone-800 font-bold">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-orange-600" />
            <span>Destino: {order.customer.district}, {order.customer.department}</span>
          </div>
          <span className="text-[11px] text-stone-500">{order.customer.address}</span>
        </div>

        <div className="text-[11px] text-stone-600 flex items-center justify-between pt-1 border-t border-stone-200/80">
          <span>Forma de Pago:</span>
          <span className="font-bold text-stone-900">
            {order.customer.paymentMethod === 'yape_contra_entrega'
              ? '📱 Yape / Plin (Pago Contra Entrega)'
              : '💳 Tarjeta Débito / Crédito (Pagado en Plataforma)'}
          </span>
        </div>
      </div>

      {/* WhatsApp Help / Support Button */}
      <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2">
        <a
          href={getWhatsAppTrackingUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs transition-all"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Consultar al Repartidor por WhatsApp ({WHATSAPP_DISPLAY})</span>
        </a>

        <div className="flex items-center gap-1 text-[11px] text-stone-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Garantía Fary Merk 100% Sellado</span>
        </div>
      </div>
    </div>
  );
};
