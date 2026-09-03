import React, { useState, useEffect } from 'react';
import { 
  X, 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  MapPin, 
  User, 
  Phone, 
  CreditCard, 
  Sparkles, 
  AlertCircle, 
  Plus, 
  Minus, 
  Trash2, 
  ShoppingBag,
  RotateCcw,
  Edit3,
  Dog,
  Gift,
  Lock,
  QrCode,
  Check,
  Mail,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, CustomerData, Order, UserProfile } from '../types';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY, YAPE_DISPLAY, YAPE_HOLDER } from '../data/products';
import { GoogleIcon } from './GoogleIcon';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToCart: () => void;
  onBackToStore: () => void;
  items: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onOrderSuccess: (order: Order) => void;
  currentUser: UserProfile | null;
  onOpenAuth: (promptMsg?: string) => void;
  onOpenPrivacyPolicy?: (tab?: 'privacidad' | 'terminos' | 'arco' | 'envios') => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  onBackToCart,
  onBackToStore,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOrderSuccess,
  currentUser,
  onOpenAuth,
  onOpenPrivacyPolicy,
}) => {
  if (!isOpen) return null;

  // Checkout Step: 1 = Revisión & Verificación Google, 2 = Datos de Entrega, 3 = Forma de Pago
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [authErrorNotice, setAuthErrorNotice] = useState(false);

  const [formData, setFormData] = useState<CustomerData>({
    fullName: currentUser?.fullName || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    dogName: currentUser?.dogName || '',
    department: currentUser?.department || 'Lima Metropolitana',
    district: currentUser?.district || '',
    address: currentUser?.address || '',
    reference: currentUser?.reference || '',
    paymentMethod: 'yape_contra_entrega',
    notes: '',
  });

  // Credit Card Form States for direct platform payment
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState(currentUser?.fullName || '');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isProcessingCard, setIsProcessingCard] = useState(false);
  const [cardPaymentSuccess, setCardPaymentSuccess] = useState(false);

  // Sync if user logs in or updates Google profile
  useEffect(() => {
    if (currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: currentUser.fullName || prev.fullName,
        email: currentUser.email || prev.email,
        phone: prev.phone || currentUser.phone,
        dogName: prev.dogName || currentUser.dogName || '',
        department: currentUser.department || prev.department,
        district: prev.district || currentUser.district,
        address: prev.address || currentUser.address,
        reference: prev.reference || currentUser.reference,
      }));
      if (!cardHolder) setCardHolder(currentUser.fullName);
      setAuthErrorNotice(false);
    }
  }, [currentUser]);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.option.pricePEN * item.quantity,
    0
  );

  // Delivery calculation: Free for orders >= 80 in Lima, else 8 PEN Lima or 15 PEN Provincias
  const isProvincia = formData.department.toLowerCase().includes('provincia');
  const freeDelivery = subtotal >= 80 && !isProvincia;
  const deliveryCost = items.length === 0 ? 0 : freeDelivery ? 0 : isProvincia ? 15 : 8;
  const total = subtotal + deliveryCost;

  const validateCustomerStep = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Por favor ingresa tu nombre completo';
    if (!formData.phone.trim() || formData.phone.length < 8) {
      newErrors.phone = 'Ingresa un número de celular/WhatsApp válido (mínimo 9 dígitos)';
    }
    if (!formData.district.trim()) newErrors.district = 'Ingresa tu distrito o ciudad';
    if (!formData.address.trim()) newErrors.address = 'Ingresa tu dirección exacta de entrega';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCardPayment = () => {
    const newErrors: Record<string, string> = {};
    const cleanNum = cardNumber.replace(/\s+/g, '');
    if (cleanNum.length < 15) newErrors.cardNumber = 'Ingresa un número de tarjeta válido (16 dígitos)';
    if (!cardHolder.trim()) newErrors.cardHolder = 'Ingresa el nombre del titular de la tarjeta';
    if (cardExpiry.length < 5 || !cardExpiry.includes('/')) newErrors.cardExpiry = 'Ingresa fecha MM/AA';
    if (cardCvv.length < 3) newErrors.cardCvv = 'CVV inválido (3 dígitos)';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Card input helpers
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.match(/.{1,4}/g)?.join(' ') || raw;
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setCardExpiry(val);
  };

  const generateTrackingCode = () => {
    return `FMK-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const generateWhatsAppMessage = (orderId: string, trackingCode: string) => {
    let msg = `🦴 *¡HOLA FARY MERK! DESEO CONFIRMAR MI PEDIDO DE SNACKS DESHIDRATADOS* 🐾\n\n`;
    msg += `📄 *Orden:* #${orderId}\n`;
    msg += `📦 *Código de Seguimiento:* ${trackingCode}\n`;
    msg += `👤 *Cliente:* ${formData.fullName}\n`;
    msg += `✉️ *Cuenta Google Verificada:* ${formData.email || currentUser?.email || 'Verificada'}\n`;
    msg += `📱 *Teléfono:* ${formData.phone}\n`;
    if (formData.dogName) {
      msg += `🐶 *Nombre de mi perrito (con regalito):* ${formData.dogName}\n`;
    }
    msg += `📍 *Dirección:* ${formData.address}, ${formData.district} (${formData.department})\n`;
    if (formData.reference) {
      msg += `📌 *Referencia:* ${formData.reference}\n`;
    }
    msg += `💳 *Método de Pago:* ${
      formData.paymentMethod === 'yape_contra_entrega'
        ? `Yape / Plin (Pago Contra Entrega al recibir - Cel: ${YAPE_DISPLAY})`
        : 'Tarjeta Débito / Crédito (Pagado en la plataforma Fary Merk)'
    }\n\n`;

    msg += `🛒 *DETALLE DEL PEDIDO:*\n`;
    items.forEach((item, index) => {
      msg += `${index + 1}. *${item.productName}*\n`;
      msg += `   - Presentación: ${item.option.label}\n`;
      msg += `   - Cantidad: ${item.quantity} paquete(s) x S/ ${item.option.pricePEN.toFixed(2)} = S/ ${(item.option.pricePEN * item.quantity).toFixed(2)}\n`;
    });

    msg += `\n💰 *Subtotal:* S/ ${subtotal.toFixed(2)} PEN`;
    msg += `\n🚚 *Envío:* ${deliveryCost === 0 ? '¡GRATIS!' : `S/ ${deliveryCost.toFixed(2)} PEN`}`;
    msg += `\n🏷️ *TOTAL:* S/ ${total.toFixed(2)} PEN\n`;

    if (formData.notes) {
      msg += `\n📝 *Notas:* ${formData.notes}\n`;
    }
    msg += `\n_Quedo atento a la confirmación de entrega y seguimiento. ¡Gracias Fary Merk!_`;

    return encodeURIComponent(msg);
  };

  const handleWhatsAppCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.isGoogleVerified) {
      setCurrentStep(1);
      setAuthErrorNotice(true);
      onOpenAuth('Debes registrarte o iniciar sesión con Google y estar verificado para finalizar tu pedido.');
      return;
    }
    if (!validateCustomerStep()) {
      setCurrentStep(2);
      return;
    }

    setIsSubmitting(true);
    const orderId = `FMK-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingCode = generateTrackingCode();

    const newOrder: Order = {
      id: orderId,
      trackingCode,
      createdAt: new Date().toISOString(),
      customer: formData,
      items,
      subtotalPEN: subtotal,
      deliveryCostPEN: deliveryCost,
      totalPEN: total,
      status: 'completado',
      trackingStatus: 'recibido',
      estimatedDeliveryTime: '24-48 horas',
      courierName: 'Fary Merk Express',
      dogGiftIncluded: Boolean(formData.dogName?.trim()),
    };

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${generateWhatsAppMessage(orderId, trackingCode)}`;
    window.open(waUrl, '_blank');

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 400);
  };

  const handleDirectWebCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser?.isGoogleVerified) {
      setCurrentStep(1);
      setAuthErrorNotice(true);
      onOpenAuth('Debes registrarte o iniciar sesión con Google y estar verificado para finalizar tu compra.');
      return;
    }
    if (!validateCustomerStep()) {
      setCurrentStep(2);
      return;
    }

    // If card payment selected, validate card details
    if (formData.paymentMethod === 'tarjeta') {
      if (!validateCardPayment()) return;
      setIsProcessingCard(true);
      setTimeout(() => {
        setIsProcessingCard(false);
        setCardPaymentSuccess(true);
        completeOrder();
      }, 1200);
      return;
    }

    completeOrder();
  };

  const completeOrder = () => {
    setIsSubmitting(true);
    const orderId = `FMK-${Math.floor(100000 + Math.random() * 900000)}`;
    const trackingCode = generateTrackingCode();

    const updatedFormData = {
      ...formData,
      cardDetails: formData.paymentMethod === 'tarjeta' ? {
        cardNumberMasked: `**** **** **** ${cardNumber.slice(-4)}`,
        cardHolder,
        cardBrand: cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
      } : undefined,
    };

    const newOrder: Order = {
      id: orderId,
      trackingCode,
      createdAt: new Date().toISOString(),
      customer: updatedFormData,
      items,
      subtotalPEN: subtotal,
      deliveryCostPEN: deliveryCost,
      totalPEN: total,
      status: 'completado',
      trackingStatus: 'recibido',
      estimatedDeliveryTime: '24-48 horas',
      courierName: 'Fary Merk Express',
      dogGiftIncluded: Boolean(formData.dogName?.trim()),
    };

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 600);
  };

  const handleStepClick = (targetStep: 1 | 2 | 3) => {
    if (targetStep > 1 && !currentUser?.isGoogleVerified) {
      setAuthErrorNotice(true);
      onOpenAuth('Por seguridad, primero debes iniciar sesión y verificarte con Google para continuar con la compra.');
      return;
    }
    if (targetStep === 3 && !validateCustomerStep()) {
      return;
    }
    setCurrentStep(targetStep);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-stone-900/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#291B10] via-stone-900 to-[#291B10] p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-amber-200/40">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg sm:text-xl font-bold font-serif leading-tight text-white">
                  Finalizar Compra • Fary Merk 🐾
                </h2>
                {currentUser?.isGoogleVerified && (
                  <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-black uppercase bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3" /> Verificado por Google
                  </span>
                )}
              </div>
              <p className="text-xs text-amber-200/80">
                Snacks deshidratados 100% naturales con compra protegida
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3 Steps Visual Navigation with Security Lock */}
        <div className="bg-[#FAF7F2] border-b border-[#EDE5D8] px-4 py-3 flex items-center justify-between text-xs font-bold">
          <button
            type="button"
            onClick={() => handleStepClick(1)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              currentStep === 1
                ? 'bg-[#E75A43] text-white shadow-xs'
                : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">1</span>
            <span>Revisar & Verificación</span>
          </button>

          <span className="text-stone-300">→</span>

          <button
            type="button"
            onClick={() => handleStepClick(2)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              currentStep === 2
                ? 'bg-[#E75A43] text-white shadow-xs'
                : !currentUser?.isGoogleVerified
                ? 'text-stone-400 bg-stone-100 border border-stone-200 cursor-not-allowed'
                : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
            }`}
          >
            {!currentUser?.isGoogleVerified ? (
              <Lock className="w-3.5 h-3.5 text-stone-400" />
            ) : (
              <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">2</span>
            )}
            <span>Datos & Perrito</span>
          </button>

          <span className="text-stone-300">→</span>

          <button
            type="button"
            onClick={() => handleStepClick(3)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              currentStep === 3
                ? 'bg-[#E75A43] text-white shadow-xs'
                : !currentUser?.isGoogleVerified
                ? 'text-stone-400 bg-stone-100 border border-stone-200 cursor-not-allowed'
                : 'text-stone-600 hover:text-stone-900 bg-white border border-stone-200'
            }`}
          >
            {!currentUser?.isGoogleVerified ? (
              <Lock className="w-3.5 h-3.5 text-stone-400" />
            ) : (
              <span className="w-4 h-4 rounded-full bg-black/20 flex items-center justify-center text-[10px]">3</span>
            )}
            <span>Forma de Pago</span>
          </button>
        </div>

        {/* Modal Body Container */}
        <div className="p-4 sm:p-6 max-h-[68vh] overflow-y-auto">
          {/* STEP 1: REVIEW AND GOOGLE VERIFICATION GATE */}
          {currentStep === 1 && (
            <div className="space-y-4">
              {/* MANDATORY GOOGLE VERIFICATION CARD */}
              {!currentUser?.isGoogleVerified ? (
                <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-amber-50 via-orange-50/60 to-red-50/40 border-2 border-orange-400 shadow-sm space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-2xl bg-white shadow-xs border border-orange-200 shrink-0">
                      <GoogleIcon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm sm:text-base font-black text-stone-900">
                          Paso Requerido: Iniciar Sesión con Google
                        </h4>
                        <span className="text-[10px] font-black uppercase tracking-wider bg-red-100 text-red-700 px-2 py-0.5 rounded-md border border-red-200">
                          Obligatorio
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        Para mayor seguridad en tu compra y proteger tu paquete en Fary Merk, <strong>debes registrarte o iniciar sesión con Google</strong>. Solo tras ser verificado por Google se habilitarán los datos de entrega y la forma de pago.
                      </p>
                    </div>
                  </div>

                  {authErrorNotice && (
                    <div className="p-2.5 rounded-xl bg-red-100/90 border border-red-300 text-red-800 text-xs font-bold flex items-center gap-2 animate-shake">
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>¡Atención! Es indispensable verificarte con Google para continuar con el proceso de compra.</span>
                    </div>
                  )}

                  <div className="pt-1 flex flex-col sm:flex-row items-center gap-2.5">
                    <button
                      type="button"
                      id="checkout-google-auth-btn"
                      onClick={() =>
                        onOpenAuth('Inicia sesión con Google para verificar tu cuenta y continuar con tu compra.')
                      }
                      className="w-full sm:w-auto flex-1 py-3 px-5 rounded-2xl bg-white hover:bg-stone-50 border border-stone-300 hover:border-blue-400 text-stone-800 font-bold text-xs sm:text-sm flex items-center justify-center gap-2.5 shadow-md active:scale-95 transition-all"
                    >
                      <GoogleIcon className="w-5 h-5 shrink-0" />
                      <span>Registrarme / Iniciar sesión con Google</span>
                    </button>

                    <div className="flex items-center gap-1 text-[11px] text-stone-500">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Verificación rápida en 1 clic</span>
                    </div>
                  </div>

                  {/* Privacy note */}
                  <div className="text-[11px] text-stone-500 pt-1 flex items-center justify-between flex-wrap gap-1">
                    <span>Tus datos están protegidos bajo la Ley N° 29733 (Perú).</span>
                    {onOpenPrivacyPolicy && (
                      <button
                        type="button"
                        onClick={() => onOpenPrivacyPolicy('privacidad')}
                        className="text-[#E75A43] hover:underline font-bold"
                      >
                        Políticas de Privacidad
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                /* ALREADY VERIFIED WITH GOOGLE CARD */
                <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-300 shadow-xs flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {currentUser.avatarUrl ? (
                        <img
                          src={currentUser.avatarUrl}
                          alt={currentUser.fullName}
                          className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs"
                        />
                      ) : (
                        <div className="w-11 h-11 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow-xs">
                          {currentUser.fullName.charAt(0)}
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 bg-white p-0.5 rounded-full shadow-xs">
                        <GoogleIcon className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs sm:text-sm font-black text-stone-900">
                          {currentUser.fullName}
                        </span>
                        <span className="text-[10px] font-black uppercase bg-emerald-100 text-emerald-800 border border-emerald-300 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verificado por Google
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 font-mono">
                        {currentUser.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onOpenAuth('Puedes cambiar tu cuenta de Google o revisar tus compras anteriores.')}
                    className="text-[11px] font-bold text-blue-700 hover:text-blue-900 bg-white px-3 py-1.5 rounded-xl border border-blue-200 hover:border-blue-300 transition-colors shrink-0"
                  >
                    Cambiar cuenta
                  </button>
                </div>
              )}

              {/* Items List */}
              <div className="space-y-2.5 pt-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-extrabold text-stone-900 font-serif">
                    Snacks en tu pedido ({items.reduce((s, i) => s + i.quantity, 0)} paquetes):
                  </h3>

                  <button
                    type="button"
                    onClick={onBackToStore}
                    className="text-xs font-bold text-[#E75A43] hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Añadir más snacks</span>
                  </button>
                </div>

                {items.map((item) => (
                  <div
                    key={item.cartItemId}
                    className="flex items-center justify-between p-3 rounded-2xl bg-[#FAF7F2] border border-[#EDE5D8] text-xs gap-3"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <img
                        src={item.productImage}
                        alt={item.productName}
                        className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-extrabold text-stone-900 truncate">
                          {item.productName}
                        </div>
                        <div className="text-stone-500 text-[11px] truncate">
                          {item.option.label}
                        </div>
                        <div className="text-[#E75A43] font-black">
                          S/ {item.option.pricePEN.toFixed(2)} c/u
                        </div>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="flex items-center bg-white border border-stone-200 rounded-xl p-1 shadow-xs">
                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-stone-700"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="w-7 text-center font-black text-xs text-stone-900">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => onUpdateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded-lg bg-[#E75A43] hover:bg-[#D3462F] flex items-center justify-center text-white"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.cartItemId)}
                        className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                        title="Eliminar producto"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Delivery info summary */}
              <div className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs flex items-center justify-between">
                <span className="text-stone-600">Subtotal de snacks seleccionados:</span>
                <span className="font-black text-stone-900 text-sm">S/ {subtotal.toFixed(2)} PEN</span>
              </div>
            </div>
          )}

          {/* STEP 2: CUSTOMER DATA & DOG'S NAME (Unlocked only after Google Verification) */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-stone-900 font-serif">
                    2. Datos de Entrega & Nombre de tu Perrito
                  </h3>
                  <p className="text-xs text-stone-500">
                    Ingresa a dónde enviaremos tu pedido de snacks deshidratados Fary Merk.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs font-bold text-[#E75A43] hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Modificar productos</span>
                </button>
              </div>

              {/* Google Verified Identity Badge for Checkout Form */}
              <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <GoogleIcon className="w-4 h-4" />
                  <span className="text-stone-700">
                    Comprador verificado con Google: <strong className="text-stone-900">{formData.email}</strong>
                  </span>
                </div>
                <span className="text-emerald-700 font-bold flex items-center gap-0.5 text-[11px]">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verificado
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Nombre del Comprador (Cuenta Google) *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Carlos Quispe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-red-400 focus:ring-red-300 bg-red-50/30'
                        : 'border-stone-200 focus:ring-[#E75A43] focus:border-[#E75A43]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Celular / WhatsApp para Coordinación *
                  </label>
                  <input
                    type="tel"
                    placeholder="Ej. 935438508"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-red-400 focus:ring-red-300 bg-red-50/30'
                        : 'border-stone-200 focus:ring-[#E75A43] focus:border-[#E75A43]'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* PROMINENT DOG NAME FIELD WITH GIFT NOTICE */}
                <div className="sm:col-span-2 bg-gradient-to-r from-amber-50 to-orange-50 p-3.5 rounded-2xl border-2 border-amber-300/80 shadow-xs">
                  <label className="block text-xs font-black text-amber-950 mb-1 flex items-center gap-1.5">
                    <Dog className="w-4 h-4 text-orange-600" />
                    <span>Nombre de tu perrito (Opcional - le enviaremos un regalito en su paquete 🐶)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Toby, Max, Luna, Pelusa..."
                    value={formData.dogName}
                    onChange={(e) => setFormData({ ...formData, dogName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-amber-300 bg-white text-sm focus:ring-2 focus:ring-orange-400 focus:border-orange-500 placeholder-amber-900/40 font-medium"
                  />
                  <p className="text-[11px] text-amber-800 mt-1.5 flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                    <span>¡Incluiremos un snack de cortesía personalizado con su nombre en el empaque sellado!</span>
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Ciudad / Departamento *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm bg-white focus:ring-[#E75A43] focus:border-[#E75A43]"
                  >
                    <option value="Lima Metropolitana">Lima Metropolitana (Delivery 24-48 hrs)</option>
                    <option value="Callao">Callao</option>
                    <option value="Provincias - Olva / Shalom">Provincias (Envíos por Olva Courier / Shalom)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Distrito *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Miraflores, Surco, Los Olivos..."
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      errors.district
                        ? 'border-red-400 focus:ring-red-300 bg-red-50/30'
                        : 'border-stone-200 focus:ring-[#E75A43] focus:border-[#E75A43]'
                    }`}
                  />
                  {errors.district && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.district}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Dirección exacta (Calle, Av, Jr, Número, Dpto) *
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Av. Larco 743 Dpto 402"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm focus:outline-none focus:ring-2 ${
                      errors.address
                        ? 'border-red-400 focus:ring-red-300 bg-red-50/30'
                        : 'border-stone-200 focus:ring-[#E75A43] focus:border-[#E75A43]'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-red-500 mt-1 font-medium">{errors.address}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    Referencia de entrega (Opcional)
                  </label>
                  <input
                    type="text"
                    placeholder="Ej. Frente al parque, rejas blancas..."
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-200 text-sm focus:ring-[#E75A43] focus:border-[#E75A43]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: EXACTLY 2 PAYMENT METHODS */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-base font-extrabold text-stone-900 font-serif">
                    3. Elige tu Forma de Pago
                  </h3>
                  <p className="text-xs text-stone-500">
                    Solo 2 opciones seguras: Yape/Plin Contra Entrega o Tarjeta en la plataforma.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs font-bold text-[#E75A43] hover:underline flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Modificar datos / perrito</span>
                </button>
              </div>

              {/* 2 Payment Methods Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Method 1: Yape / Plin Contra Entrega */}
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex flex-col justify-between gap-2 transition-all ${
                    formData.paymentMethod === 'yape_contra_entrega'
                      ? 'border-purple-600 bg-purple-50/70 ring-2 ring-purple-400/20 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="yape_contra_entrega"
                      checked={formData.paymentMethod === 'yape_contra_entrega'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'yape_contra_entrega' })}
                      className="w-4 h-4 text-purple-600 mt-0.5"
                    />
                    <div>
                      <div className="text-sm font-extrabold text-purple-950 flex items-center gap-1.5">
                        <span>📱 Yape / Plin</span>
                        <span className="text-[10px] bg-purple-200 text-purple-900 px-2 py-0.5 rounded-full font-black">
                          Contra Entrega
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        <strong>Pago al recibir:</strong> Yapearás o escanearás el QR cuando el repartidor llegue con tu paquete.
                      </p>
                    </div>
                  </div>

                  <div className="bg-purple-100/70 p-2.5 rounded-xl text-[11px] text-purple-900 border border-purple-200 mt-1">
                    <span className="font-bold block">Número Yape Fary Merk:</span>
                    <span className="font-mono font-black text-xs text-purple-950">{YAPE_DISPLAY}</span>
                    <span className="block text-[10px] text-purple-700">({YAPE_HOLDER})</span>
                  </div>
                </label>

                {/* Method 2: Tarjeta Débito / Crédito en Plataforma */}
                <label
                  className={`p-4 rounded-2xl border-2 cursor-pointer flex flex-col justify-between gap-2 transition-all ${
                    formData.paymentMethod === 'tarjeta'
                      ? 'border-orange-500 bg-orange-50/70 ring-2 ring-orange-400/20 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <input
                      type="radio"
                      name="payment"
                      value="tarjeta"
                      checked={formData.paymentMethod === 'tarjeta'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'tarjeta' })}
                      className="w-4 h-4 text-[#E75A43] mt-0.5"
                    />
                    <div>
                      <div className="text-sm font-extrabold text-stone-900 flex items-center gap-1.5">
                        <span>💳 Tarjeta Débito / Crédito</span>
                        <span className="text-[10px] bg-orange-200 text-orange-950 px-2 py-0.5 rounded-full font-black">
                          En Plataforma
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                        <strong>Pago directo aquí:</strong> Pasarela cifrada de 256-bit dentro de la misma web (Visa, Mastercard, etc.).
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mt-1 pt-2 border-t border-stone-200">
                    <Lock className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Transacción protegida con token SSL</span>
                  </div>
                </label>
              </div>

              {/* Integrated Card Form inside the platform if 'tarjeta' is selected */}
              {formData.paymentMethod === 'tarjeta' && (
                <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 text-white space-y-3.5 shadow-lg border border-stone-800 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-orange-400" />
                      <span className="text-xs font-bold uppercase tracking-wider text-amber-200">
                        Pasarela de Pago Fary Merk
                      </span>
                    </div>
                    <span className="text-[11px] bg-white/10 px-2 py-0.5 rounded text-stone-300 font-mono">
                      Cifrado SSL 256-bit
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-stone-300 mb-1">
                      Número de Tarjeta (Débito o Crédito) *
                    </label>
                    <input
                      type="text"
                      placeholder="4557 1234 5678 9012"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength={19}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-stone-800 border border-stone-700 text-white font-mono text-sm focus:ring-2 focus:ring-orange-400 focus:outline-none"
                    />
                    {errors.cardNumber && (
                      <p className="text-[11px] text-red-400 mt-1 font-medium">{errors.cardNumber}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-bold text-stone-300 mb-1">
                        Nombre del Titular (como figura en la tarjeta) *
                      </label>
                      <input
                        type="text"
                        placeholder="Ej. CARLOS QUISPE"
                        value={cardHolder}
                        onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                        className="w-full px-3.5 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white text-xs uppercase focus:ring-2 focus:ring-orange-400 focus:outline-none"
                      />
                      {errors.cardHolder && (
                        <p className="text-[11px] text-red-400 mt-1 font-medium">{errors.cardHolder}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-stone-300 mb-1">
                          Vence *
                        </label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          value={cardExpiry}
                          onChange={handleExpiryChange}
                          maxLength={5}
                          className="w-full px-2.5 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white font-mono text-xs text-center focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        />
                        {errors.cardExpiry && (
                          <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.cardExpiry}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-stone-300 mb-1">
                          CVV *
                        </label>
                        <input
                          type="password"
                          placeholder="123"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                          maxLength={4}
                          className="w-full px-2.5 py-2 rounded-xl bg-stone-800 border border-stone-700 text-white font-mono text-xs text-center focus:ring-2 focus:ring-orange-400 focus:outline-none"
                        />
                        {errors.cardCvv && (
                          <p className="text-[10px] text-red-400 mt-1 font-medium">{errors.cardCvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Summary Card with explicit options to modify */}
              <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#EDE5D8] space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900">
                  <span>Resumen del Pedido:</span>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-[#E75A43] hover:underline text-xs flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Modificar productos</span>
                  </button>
                </div>

                <div className="text-xs text-stone-600 space-y-1">
                  <div className="flex justify-between">
                    <span>Productos ({items.reduce((s, i) => s + i.quantity, 0)} unidades):</span>
                    <span className="font-bold text-stone-900">S/ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Envío ({formData.department}):</span>
                    <span className="font-bold text-emerald-700">
                      {deliveryCost === 0 ? '¡GRATIS!' : `S/ ${deliveryCost.toFixed(2)}`}
                    </span>
                  </div>
                  {formData.dogName && (
                    <div className="flex justify-between text-amber-800 font-semibold bg-amber-100/50 p-1 rounded-md">
                      <span>🐶 Regalito para {formData.dogName}:</span>
                      <span className="text-emerald-700 font-bold">¡INCLUIDO GRATIS!</span>
                    </div>
                  )}
                  <div className="border-t border-stone-200 pt-1.5 flex justify-between items-baseline text-sm font-black text-stone-900">
                    <span>Total a Pagar:</span>
                    <span className="text-lg text-[#E75A43] font-black">
                      S/ {total.toFixed(2)} PEN
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200 space-y-2.5">
          <div className="flex flex-col sm:flex-row gap-2.5">
            {currentStep === 1 ? (
              !currentUser?.isGoogleVerified ? (
                /* Google Verification Trigger Button */
                <button
                  type="button"
                  id="checkout-step1-verify-btn"
                  onClick={() => {
                    setAuthErrorNotice(true);
                    onOpenAuth('Inicia sesión con Google para verificar tu cuenta y continuar con la compra.');
                  }}
                  className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-blue-500/25 active:scale-95 transition-all"
                >
                  <GoogleIcon className="w-5 h-5 brightness-0 invert" />
                  <span>Verificarme con Google para Continuar</span>
                </button>
              ) : (
                /* Verified: Proceed to Step 2 */
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3.5 px-5 rounded-2xl bg-[#E75A43] hover:bg-[#D3462F] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 active:scale-95 transition-all"
                >
                  <span>Continuar con Datos de Entrega →</span>
                </button>
              )
            ) : currentStep === 2 ? (
              <button
                type="button"
                onClick={() => {
                  if (validateCustomerStep()) setCurrentStep(3);
                }}
                className="w-full py-3.5 px-5 rounded-2xl bg-[#E75A43] hover:bg-[#D3462F] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 active:scale-95 transition-all"
              >
                <span>Continuar a la Forma de Pago →</span>
              </button>
            ) : (
              <>
                {/* Primary WhatsApp / Web Confirmation depending on payment choice */}
                <button
                  type="button"
                  onClick={handleWhatsAppCheckout}
                  disabled={isSubmitting || isProcessingCard}
                  className="flex-1 py-3.5 px-5 rounded-2xl bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-emerald-600/25 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Pedido por WhatsApp ({WHATSAPP_DISPLAY})</span>
                </button>

                <button
                  type="button"
                  onClick={handleDirectWebCheckout}
                  disabled={isSubmitting || isProcessingCard}
                  className="py-3.5 px-5 rounded-2xl bg-stone-900 hover:bg-[#E75A43] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-sm"
                >
                  {isProcessingCard ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Procesando pago...</span>
                    </span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-orange-400" />
                      <span>{formData.paymentMethod === 'tarjeta' ? 'Pagar con Tarjeta Ahora' : 'Finalizar en Web'}</span>
                    </>
                  )}
                </button>
              </>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-stone-500 pt-1">
            <button
              type="button"
              onClick={onBackToStore}
              className="text-stone-600 hover:text-[#E75A43] font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>← Volver al catálogo</span>
            </button>

            <div className="flex items-center gap-2 text-[11px] text-stone-400">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{currentUser?.isGoogleVerified ? '✓ Compra Verificada por Google' : 'Seguridad Fary Merk'}</span>
              </div>
              {onOpenPrivacyPolicy && (
                <>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={() => onOpenPrivacyPolicy('privacidad')}
                    className="text-stone-500 hover:text-[#E75A43] underline font-medium"
                  >
                    Políticas
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
