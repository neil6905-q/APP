import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft,
  ArrowRight, 
  Dog, 
  GraduationCap, 
  CheckCircle2, 
  X,
  Phone,
  MessageCircle,
  ExternalLink,
  Search,
  Star,
  Wrench,
  ShieldCheck
} from 'lucide-react';
import { WHATSAPP_PHONE } from '../data/products';

interface ServicesPortalProps {
  onSelectService: (service: 'snacks' | 'mentorias') => void;
  cartCount: number;
}

export const ServicesPortal: React.FC<ServicesPortalProps> = ({
  onSelectService,
  cartCount,
}) => {
  const [selectedDemoService, setSelectedDemoService] = useState<{
    id: string;
    title: string;
    description: string;
    image: string;
    features: string[];
  } | null>(null);

  // Carousel state for displacable hero banner (Image 3)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Displacable Carousel Slides (Image 3: Mentorías + Snacks option requested + FaryServi options)
  const carouselSlides = [
    {
      id: 'mentorias',
      tag: 'NUEVO SERVICIO DE MENTORÍAS:',
      title: 'Impulsa tu Carrera.',
      description: 'Conéctate 1 a 1 con líderes y especialistas. Recibe asesoría estratégica personalizada o postúlate como mentor.',
      btnText: 'Explorar ventana de Mentorías',
      btnIcon: ArrowRight,
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80',
      bgGradient: 'from-[#0F172A] via-[#1E3A8A] to-[#1E293B]',
      accentColor: 'text-[#38BDF8]',
      action: () => onSelectService('mentorias')
    },
    {
      id: 'snacks',
      tag: 'SNACKS CANINOS 100% NATURALES:',
      title: 'Nutrición & Premios Fary Merk.',
      description: 'Orejas de cerdo, patitas deshidratadas y tráqueas de res sin químicos ni conservantes. El snack favorito y saludable para tu perro.',
      btnText: 'Explorar Tienda de Snacks',
      btnIcon: ArrowRight,
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=800&auto=format&fit=crop&q=80',
      bgGradient: 'from-[#7C2D12] via-[#C2410C] to-[#291B10]',
      accentColor: 'text-amber-300',
      action: () => onSelectService('snacks')
    },
    {
      id: 'servicios-hogar',
      tag: 'SERVICIOS DEL HOGAR FARYSERVI:',
      title: 'Técnicos & Mantenimiento.',
      description: 'Gasfitería, electricidad, limpieza profunda y mudanzas seguras con personal calificado y garantía escrita.',
      btnText: 'Ver Directorio de Servicios',
      btnIcon: ArrowRight,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&auto=format&fit=crop&q=80',
      bgGradient: 'from-[#064E3B] via-[#0F766E] to-[#134E4A]',
      accentColor: 'text-emerald-300',
      action: () => {
        const el = document.getElementById('directorio-servicios');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    },
    {
      id: 'whatsapp-soporte',
      tag: 'ATENCIÓN PERSONALIZADA 24/7:',
      title: 'Cotiza en Minutos por WhatsApp.',
      description: '¿Buscas una cotización express o servicio a tu medida? Escríbenos directamente y te asesoramos al instante.',
      btnText: 'Escribir a WhatsApp',
      btnIcon: MessageCircle,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
      bgGradient: 'from-[#065F46] via-[#10B981] to-[#047857]',
      accentColor: 'text-emerald-200',
      action: () => {
        const text = encodeURIComponent('Hola FaryServi! Quisiera información y cotización sobre sus servicios.');
        window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
      }
    }
  ];

  // Auto-play displacement effect (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, carouselSlides.length]);

  const handlePrevSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? carouselSlides.length - 1 : prev - 1));
  };

  const handleNextSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (diff > 40) {
      handleNextSlide();
    } else if (diff < -40) {
      handlePrevSlide();
    }
    setTouchStartX(null);
  };

  // 6 Services corresponding to Image 1's grid
  const servicesList = [
    {
      id: 'limpieza',
      title: 'Limpieza',
      subtitle: 'Spertizan arcoult man semuat aus vimten.',
      tag: 'Hogar & Oficinas',
      image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format&fit=crop&q=80',
      isInteractive: true,
      actionType: 'modal',
      features: [
        'Limpieza profunda y desinfección de espacios',
        'Personal verificado y asegurado',
        'Productos eco-amigables certificados',
        'Disponibilidad por horas o planes mensuales'
      ]
    },
    {
      id: 'mantenimiento',
      title: 'Mantenimiento',
      subtitle: 'Banqiue vansorioes portizas ai un concepto.',
      tag: 'Técnicos Certificados',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=80',
      isInteractive: true,
      actionType: 'modal',
      features: [
        'Gasfitería, fontanería y filtraciones',
        'Instalaciones eléctricas y tableros',
        'Línea blanca y electrodomésticos',
        'Diagnóstico inmediato y garantía escrita'
      ]
    },
    {
      id: 'mudanza',
      title: 'Mudanza',
      subtitle: 'Transporte confiable y embalaje seguro.',
      tag: 'Express & Cuidado',
      image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=500&auto=format&fit=crop&q=80',
      isInteractive: true,
      actionType: 'modal',
      features: [
        'Fletes locales y mudanzas residenciales',
        'Embalaje profesional con mantas y burbuja',
        'Estibadores calificados y cuidadosos',
        'Monitoreo en ruta en tiempo real'
      ]
    },
    {
      id: 'mascotas',
      title: 'Cuidado de Mascotas',
      subtitle: 'Dealme vinvas ayung ganitas.',
      tag: '🐾 Snacks Fary Merk',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      image: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&auto=format&fit=crop&q=80',
      isInteractive: true,
      actionType: 'snacks',
      features: [
        'Tienda oficial de snacks deshidratados 100% naturales',
        'Patas, cuellos, orejas de cerdo y tráqueas de res',
        'Precios por menor, docenas y mayoristas',
        'Paseos y cuidado responsable para perros'
      ]
    },
    {
      id: 'belleza',
      title: 'Belleza & Bienestar',
      subtitle: 'Cuidado personal y estética a domicilio.',
      tag: 'Relax & Spa',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&auto=format&fit=crop&q=80',
      isInteractive: true,
      actionType: 'modal',
      features: [
        'Peluquería y estilismo a domicilio',
        'Masajes terapéuticos y relajantes',
        'Manicure, pedicure y spa de manos',
        'Tratamientos faciales y corporales'
      ]
    },
    {
      id: 'mentorias-grid',
      title: 'Mentorías Pro',
      subtitle: 'Impulsa tu carrera 1 a 1 con expertos.',
      tag: '🎓 Nueva Ventana',
      badgeColor: 'bg-slate-900 text-amber-300 border-slate-700',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=500&auto=format&fit=crop&q=80',
      isInteractive: true,
      actionType: 'mentorias',
      features: [
        'Sesiones 1 a 1 con mentores y consultores senior',
        'Orientación de carrera, tecnología y negocios',
        'Opción para postularte como mentor acreditado',
        'Plan de acción y acompañamiento personalizado'
      ]
    },
  ];

  const handleCardClick = (service: typeof servicesList[0]) => {
    if (service.actionType === 'snacks') {
      onSelectService('snacks');
    } else if (service.actionType === 'mentorias') {
      onSelectService('mentorias');
    } else {
      setSelectedDemoService({
        id: service.id,
        title: service.title,
        description: service.subtitle,
        image: service.image,
        features: service.features,
      });
    }
  };

  return (
    <div className="space-y-4 sm:space-y-5 pb-6 animate-in fade-in duration-300">
      {/* 1. TOP HERO BANNER CAROUSEL matching Image 3: Displacable / Swipable with Mentorías + Snacks option */}
      <div 
        id="faryservi-hero-carousel"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative overflow-hidden rounded-[26px] sm:rounded-[30px] shadow-lg hover:shadow-xl transition-all duration-300 select-none group"
      >
        {/* Sliding Track */}
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {carouselSlides.map((slide) => (
            <div 
              key={slide.id}
              onClick={slide.action}
              className={`w-full flex-shrink-0 cursor-pointer relative overflow-hidden bg-gradient-to-r ${slide.bgGradient} text-white p-5 sm:p-7`}
            >
              {/* Subtle decorative glow */}
              <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />

              <div className="grid grid-cols-12 items-center gap-3 relative z-10">
                {/* Left Text Copy */}
                <div className="col-span-7 sm:col-span-7 pr-1 space-y-2">
                  <h2 className="text-base sm:text-2xl font-black text-white leading-[1.2] tracking-tight font-sans uppercase">
                    {slide.tag} <br className="hidden sm:inline" />
                    <span className={`${slide.accentColor} normal-case`}>{slide.title}</span>
                  </h2>

                  <p className="text-[11px] sm:text-xs text-stone-200/90 line-clamp-2 sm:line-clamp-3">
                    {slide.description}
                  </p>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        slide.action();
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-[10px] sm:text-xs font-bold transition-all hover:scale-102 active:scale-95 shadow-xs"
                    >
                      <span>{slide.btnText}</span>
                      <slide.btnIcon className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Right Image: Framed with rounded border matching Image 3 */}
                <div className="col-span-5 sm:col-span-5 flex justify-end">
                  <div className="relative w-28 h-28 sm:w-44 sm:h-36 rounded-2xl overflow-hidden shadow-md border-2 border-white/25 hover:scale-105 transition-transform duration-300">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Left Arrow Button for displacement */}
        <button
          type="button"
          onClick={handlePrevSlide}
          className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/35 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-85 hover:opacity-100 z-20 shadow-xs active:scale-90"
          aria-label="Diapositiva anterior"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Right Arrow Button for displacement */}
        <button
          type="button"
          onClick={handleNextSlide}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/35 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs transition-all opacity-85 hover:opacity-100 z-20 shadow-xs active:scale-90"
          aria-label="Siguiente diapositiva"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Carousel Indicator Dots matching Image 3: Clickable to displace to specific slide */}
        <div className="absolute bottom-2.5 sm:bottom-3 inset-x-0 flex items-center justify-center gap-1.5 z-20 pointer-events-auto">
          {carouselSlides.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentSlide(idx);
              }}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx
                  ? 'w-5 sm:w-6 h-2 bg-white shadow-xs'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Ir a diapositiva ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 2. THE SERVICES 2-COLUMN GRID matching Image 1 */}
      <div id="directorio-servicios" className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 px-1 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-sm sm:text-base font-black text-[#0F172A] tracking-tight">
              Directorio de Servicios
            </h3>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-blue-700 bg-blue-50/95 px-2.5 py-0.5 rounded-full border border-blue-200/80 shadow-2xs whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
              Disponibles
            </span>
          </div>
          <span className="text-[11px] font-medium text-stone-500 whitespace-nowrap">
            Toca cualquier servicio para ingresar
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {servicesList.map((service) => {
            const isSpecial = service.actionType === 'snacks' || service.actionType === 'mentorias';

            return (
              <div
                key={service.id}
                id={`service-grid-card-${service.id}`}
                onClick={() => handleCardClick(service)}
                className={`group cursor-pointer rounded-2xl sm:rounded-3xl bg-white border transition-all duration-200 overflow-hidden shadow-xs hover:shadow-md flex flex-col justify-between ${
                  isSpecial
                    ? service.actionType === 'snacks'
                      ? 'border-amber-300 ring-2 ring-amber-400/20 hover:border-[#E75A43]'
                      : 'border-slate-800 ring-2 ring-slate-800/20 hover:border-blue-600'
                    : 'border-stone-200 hover:border-blue-400'
                }`}
              >
                {/* Image Box */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Subtle top tag badge */}
                  <div className="absolute top-2 left-2">
                    <span
                      className={`text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs border ${
                        service.badgeColor || 'bg-white/95 text-stone-700 border-white/80'
                      }`}
                    >
                      {service.tag}
                    </span>
                  </div>

                  {/* Visual cue for special interactive windows */}
                  {isSpecial && (
                    <div className="absolute bottom-2 right-2 w-6 h-6 rounded-full bg-white/95 text-[#0F172A] flex items-center justify-center shadow-xs group-hover:bg-[#E75A43] group-hover:text-white transition-colors">
                      <ChevronRight className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                {/* Text Details matching Image 1: Title and short subtitle */}
                <div className="p-3 sm:p-4 space-y-1">
                  <h4 className="font-bold text-sm sm:text-base text-[#0F172A] leading-tight group-hover:text-blue-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-[11px] sm:text-xs text-stone-500 leading-snug line-clamp-2">
                    {service.subtitle}
                  </p>

                  {/* Highlights */}
                  {service.actionType === 'snacks' && (
                    <div className="pt-1 flex items-center gap-1 text-[10px] font-bold text-[#E75A43]">
                      <span>Abrir tienda de snacks</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  )}
                  {service.actionType === 'mentorias' && (
                    <div className="pt-1 flex items-center gap-1 text-[10px] font-bold text-blue-700">
                      <span>Abrir ventana de mentorías</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Demo Service Information Modal (for Limpieza, Mantenimiento, Mudanza, Belleza) */}
      {selectedDemoService && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full overflow-hidden shadow-2xl border border-stone-200">
            <div className="relative aspect-video w-full">
              <img
                src={selectedDemoService.image}
                alt={selectedDemoService.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setSelectedDemoService(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-5 space-y-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                  Servicio FaryServi
                </span>
                <h3 className="text-lg font-bold text-[#0F172A] mt-1">
                  {selectedDemoService.title}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {selectedDemoService.description}
                </p>
              </div>

              <div className="space-y-1.5 pt-1">
                <span className="text-[11px] font-bold text-stone-700">
                  ¿Qué incluye este servicio?
                </span>
                {selectedDemoService.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-stone-600">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const text = encodeURIComponent(`Hola FaryServi! Quisiera cotizar el servicio de ${selectedDemoService.title}.`);
                    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${text}`, '_blank');
                    setSelectedDemoService(null);
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Cotizar por WhatsApp</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedDemoService(null)}
                  className="px-4 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-bold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
