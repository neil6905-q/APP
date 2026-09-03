import React, { useState } from 'react';
import { MessageCircle, X, Send, HelpCircle, AlertTriangle, Package, Sparkles, PhoneCall, ChevronRight } from 'lucide-react';
import { WHATSAPP_PHONE, WHATSAPP_DISPLAY } from '../data/products';

interface WhatsAppSupportBubbleProps {
  isOpen?: boolean;
  onToggle?: () => void;
}

export const WhatsAppSupportBubble: React.FC<WhatsAppSupportBubbleProps> = ({
  isOpen: externalIsOpen,
  onToggle: externalOnToggle,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const [customQuery, setCustomQuery] = useState('');

  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const toggleOpen = () => {
    if (externalOnToggle) {
      externalOnToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  const quickQuestions = [
    {
      icon: HelpCircle,
      title: 'Dudas sobre porciones o beneficios',
      text: 'Hola Fary Merk, tengo dudas sobre qué snack deshidratado es mejor para mi perrito.',
      tag: 'Consulta',
    },
    {
      icon: Package,
      title: 'Consultar sobre envíos y cobertura',
      text: 'Hola Fary Merk, quisiera consultar tiempos y costos de entrega para mi distrito.',
      tag: 'Envíos',
    },
    {
      icon: AlertTriangle,
      title: 'Tengo una queja, reclamo o incidencia',
      text: 'Hola Fary Merk, me comunico porque tengo una queja o duda sobre mi pedido reciente.',
      tag: 'Quejas & Reclamos',
    },
    {
      icon: Sparkles,
      title: 'Precios por Mayor (500 a 1000 unidades)',
      text: 'Hola Fary Merk, deseo cotizar pedidos al por mayor de patas, cuellos, orejas o tráqueas.',
      tag: 'Mayoristas',
    },
  ];

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuery.trim()) return;

    const encoded = encodeURIComponent(`Hola Fary Merk! 🐾 ${customQuery}`);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, '_blank');
    setCustomQuery('');
    if (!externalOnToggle) setInternalIsOpen(false);
  };

  const handleSendQuick = (text: string) => {
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, '_blank');
    if (!externalOnToggle) setInternalIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 inset-x-0 z-30 flex justify-center pointer-events-none px-4">
      {/* Support Chat Popup Window */}
      {isOpen && (
        <div 
          id="whatsapp-chat-popup"
          className="pointer-events-auto mb-3 w-full max-w-sm bg-white rounded-3xl shadow-2xl border-2 border-[#22C55E] overflow-hidden animate-in slide-in-from-bottom-5 duration-200"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#22C55E] to-[#16A34A] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#16A34A] shadow-xs font-black text-sm">
                    FM
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-300 border-2 border-white rounded-full" />
                </div>
                <div>
                  <h3 className="text-sm font-bold leading-tight">
                    Soporte Fary Merk
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-green-100">
                    <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                    <span>En línea • Dudas o quejas al instante</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={toggleOpen}
                className="w-8 h-8 rounded-full bg-black/15 hover:bg-black/30 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FAF7F2] max-h-[50vh] overflow-y-auto space-y-3">
            <div className="bg-white p-3 rounded-2xl rounded-tl-xs shadow-xs border border-[#EDE5D8] text-xs text-[#291B10] leading-relaxed">
              <p className="font-bold text-[#291B10] mb-0.5">
                ¡Hola pet lover! 👋 🐶
              </p>
              <p className="text-[#705642]">
                ¿Tienes dudas sobre los snacks de Fary Merk o deseas presentar una consulta o queja? Elige una opción o escribe tu mensaje.
              </p>
            </div>

            {/* Quick questions list */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-stone-400 block px-1">
                Preguntas frecuentes
              </span>
              {quickQuestions.map((q, idx) => {
                const Icon = q.icon;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendQuick(q.text)}
                    className="w-full text-left p-2.5 rounded-xl bg-white hover:bg-green-50 border border-stone-200 hover:border-green-300 transition-all flex items-center justify-between gap-2 group"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-1.5 rounded-lg bg-green-100 text-green-700 shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div className="truncate">
                        <span className="text-xs font-bold text-stone-800 block truncate group-hover:text-green-800">
                          {q.title}
                        </span>
                        <span className="text-[10px] text-stone-400">
                          {q.tag}
                        </span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-green-600 shrink-0" />
                  </button>
                );
              })}
            </div>

            <div className="text-center p-2 rounded-xl bg-green-50 border border-green-200 text-green-900 text-xs font-semibold flex items-center justify-center gap-1.5">
              <PhoneCall className="w-3.5 h-3.5 text-green-600" />
              <span>Número directo: {WHATSAPP_DISPLAY}</span>
            </div>
          </div>

          {/* Footer Input */}
          <form
            onSubmit={handleSendCustom}
            className="p-3 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Escribe tu consulta o queja aquí..."
              value={customQuery}
              onChange={(e) => setCustomQuery(e.target.value)}
              className="flex-1 px-3 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              type="submit"
              className="p-2.5 rounded-xl bg-[#22C55E] hover:bg-[#16A34A] text-white transition-colors shadow-xs disabled:opacity-50"
              disabled={!customQuery.trim()}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* WhatsApp Pill Trigger Button matching reference */}
      {!isOpen && (
        <button
          id="whatsapp-pill-btn"
          type="button"
          onClick={toggleOpen}
          className="pointer-events-auto group relative flex items-center gap-2 px-6 py-3 rounded-full bg-[#22C55E] hover:bg-[#16A34A] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg active:scale-95 transition-all duration-200 border-2 border-white"
          aria-label="Abrir chat de WhatsApp para dudas o quejas"
        >
          {/* Subtle pulse */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-300" />
          </span>

          <svg
            viewBox="0 0 24 24"
            className="w-4 h-4 sm:w-5 sm:h-5 fill-current"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2 1.05 1.05-3.12-.2-.32a8.17 8.17 0 01-1.25-4.48c0-4.52 3.68-8.2 8.2-8.2 2.19 0 4.25.85 5.8 2.4 1.55 1.55 2.4 3.61 2.4 5.8 0 4.52-3.68 8.23-8.19 8.23z" />
          </svg>
          
          <span className="tracking-tight">
            ¿Tienes dudas? WhatsApp
          </span>
        </button>
      )}
    </div>
  );
};
