import React, { useState, useMemo, useEffect } from 'react';
import { 
  Bone, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  Heart, 
  Award, 
  Dog, 
  ChevronRight,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Flame,
  User,
  LogIn,
  PackageCheck,
  RotateCcw,
  Lock,
  Scale,
  FileText,
  Mail,
  Phone,
  CheckCircle2,
  Menu,
  ArrowLeft
} from 'lucide-react';
import { PRODUCTS, WHATSAPP_DISPLAY, WHATSAPP_PHONE } from './data/products';
import { Product, ProductOption, CartItem, Order, UserProfile } from './types';
import { HeroBanner } from './components/HeroBanner';
import { CategoryBar } from './components/CategoryBar';
import { ProductCard } from './components/ProductCard';
import { ProductOptionsModal } from './components/ProductOptionsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { WhatsAppSupportBubble } from './components/WhatsAppSupportBubble';
import { BottomNav, NavTabType } from './components/BottomNav';
import { AuthModal } from './components/AuthModal';
import { GoogleIcon } from './components/GoogleIcon';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { MainWindowsSelector } from './components/MainWindowsSelector';
import { MentorshipSection } from './components/MentorshipSection';
import { ServicesPortal } from './components/ServicesPortal';
import { ServicityLogo } from './components/ServicityLogo';
import { ServicityBackground } from './components/ServicityBackground';
import { DogPawBackground } from './components/DogPawBackground';
import { MentorshipBackground } from './components/MentorshipBackground';
import { ServicityMenuDrawer } from './components/ServicityMenuDrawer';

export default function App() {
  // Navigation & Tab state
  const [activeTab, setActiveTab] = useState<NavTabType>('servicios');
  const [activeWindow, setActiveWindow] = useState<'portal' | 'snacks' | 'mentorias'>('portal');

  // User Authentication & Customer Profiles (Google login)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('farymerk_current_user') || localStorage.getItem('merca2_current_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [orderHistory, setOrderHistory] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('farymerk_orders_history') || localStorage.getItem('merca2_orders_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authPromptMessage, setAuthPromptMessage] = useState<string>('');

  const handleOpenAuth = (msg?: string) => {
    setAuthPromptMessage(msg || '');
    setIsAuthOpen(true);
  };

  // State management for Catalog & Shopping Cart
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isWhatsAppBubbleOpen, setIsWhatsAppBubbleOpen] = useState(false);
  const [isMenuDrawerOpen, setIsMenuDrawerOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [privacyModalTab, setPrivacyModalTab] = useState<'privacidad' | 'terminos' | 'arco' | 'envios'>('privacidad');

  const handleOpenPrivacyPolicy = (tab: 'privacidad' | 'terminos' | 'arco' | 'envios' = 'privacidad') => {
    setPrivacyModalTab(tab);
    setIsPrivacyModalOpen(true);
  };

  // Filter & Search states
  const [activeCategory, setActiveCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Save auth user state
  const handleLogin = (user: UserProfile) => {
    setCurrentUser(user);
    localStorage.setItem('farymerk_current_user', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('farymerk_current_user');
  };

  // Sync order history to local storage
  useEffect(() => {
    localStorage.setItem('farymerk_orders_history', JSON.stringify(orderHistory));
  }, [orderHistory]);

  // Cart calculations
  const cartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const cartTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.option.pricePEN * item.quantity, 0);
  }, [cartItems]);

  // Product Selection & Add to Cart
  const handleOpenProductOptions = (product: Product) => {
    setSelectedProduct(product);
    setIsOptionsModalOpen(true);
  };

  const handleAddToCart = (product: Product, option: ProductOption, quantity: number) => {
    const cartItemId = `${product.id}-${option.id}`;
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            productId: product.id,
            productName: product.name,
            productImage: product.image,
            option,
            quantity,
          },
        ];
      }
    });
  };

  const handleUpdateQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(cartItemId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (cartItemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleBackToCart = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(true);
  };

  const handleBackToStore = () => {
    setIsCheckoutOpen(false);
    setIsCartOpen(false);
    const el = document.getElementById('catalog-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleOrderSuccess = (order: Order) => {
    setConfirmedOrder(order);
    setIsCheckoutOpen(false);
    setIsConfirmationOpen(true);
    setOrderHistory((prev) => [order, ...prev]);
    setCartItems([]); // clear cart on success
  };

  const handleModifyConfirmedOrder = () => {
    if (confirmedOrder) {
      setCartItems(confirmedOrder.items);
      setIsConfirmationOpen(false);
      setIsCheckoutOpen(true);
    }
  };

  const handleTabChange = (tab: NavTabType) => {
    setActiveTab(tab);
    if (tab === 'carrito') {
      setIsCartOpen(true);
    } else if (tab === 'cuenta') {
      setIsAuthOpen(true);
    } else if (tab === 'mentorias') {
      setActiveWindow('mentorias');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'snacks') {
      setActiveWindow('snacks');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveWindow('portal');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory =
        activeCategory === 'todos' || product.category === activeCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const isPortal = activeWindow === 'portal';
  const isSnacks = activeWindow === 'snacks';
  const isMentorias = activeWindow === 'mentorias';

  const bgContainerClass = isMentorias
    ? 'bg-[#0B132B] text-slate-100'
    : isSnacks
      ? 'bg-[#FAF7F2] text-[#291B10]'
      : 'bg-[#F8FAFC] text-[#0F172A]';

  return (
    <div className={`min-h-screen ${bgContainerClass} flex flex-col selection:bg-[#E75A43] selection:text-white pb-32 relative overflow-x-hidden transition-colors duration-300`}>
      {/* Dynamic Thematic Backgrounds matching User Prompt:
          - Image 1 (Portal): ServicityBackground with modern fluid colorful gradients.
          - Image 2 (Snacks): DogPawBackground with cute scattered dog paws.
          - Mentorias: MentorshipBackground with executive dark blueprint.
      */}
      {isPortal && <ServicityBackground />}
      {isSnacks && <DogPawBackground />}
      {isMentorias && <MentorshipBackground />}

      {/* Dynamic Top App Header */}
      {isPortal ? (
        /* Header for Image 1: Servicity Portal */
        <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 py-3 px-4 sm:px-6 shadow-2xs">
          <div className="max-w-2xl lg:max-w-4xl mx-auto flex items-center justify-between gap-3">
            {/* Left: Hamburger menu icon */}
            <button
              id="servicity-menu-btn"
              type="button"
              onClick={() => setIsMenuDrawerOpen(true)}
              className="p-2 rounded-xl text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              aria-label="Abrir menú de servicios"
            >
              <Menu className="w-6 h-6 stroke-[2.2]" />
            </button>

            {/* Center: SERVICITY logo with rainbow gear */}
            <div 
              className="cursor-pointer" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <ServicityLogo size="md" />
            </div>

            {/* Right: Profile / Login Button (Cart only appears when entering Snacks) */}
            <button
              id="servicity-header-user"
              type="button"
              onClick={() => handleOpenAuth()}
              className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full hover:bg-stone-100 border border-stone-200/80 transition-all active:scale-95 text-stone-700 shadow-2xs"
              aria-label="Mi Cuenta"
            >
              {currentUser?.avatarUrl ? (
                <img
                  src={currentUser.avatarUrl}
                  alt={currentUser.fullName}
                  className="w-6 h-6 rounded-full object-cover ring-1 ring-blue-500"
                />
              ) : (
                <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-slate-700">
                  <User className="w-3.5 h-3.5" />
                </div>
              )}
              <span className="hidden sm:inline text-xs font-bold text-stone-800">
                {currentUser ? currentUser.fullName.split(' ')[0] : 'Ingresar'}
              </span>
            </button>
          </div>
        </header>
      ) : isSnacks ? (
        /* Header for Image 2: Fary Merk Snacks */
        <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EDE5D8]/80 py-3 px-4 sm:px-6 shadow-2xs">
          <div className="max-w-2xl lg:max-w-4xl mx-auto flex items-center justify-between gap-3">
            {/* Back to Servicity / Services Button */}
            <button
              id="snacks-back-to-portal"
              type="button"
              onClick={() => {
                setActiveWindow('portal');
                setActiveTab('servicios');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-[#E75A43] hover:underline bg-white px-3 py-1.5 rounded-full border border-orange-200/80 shadow-2xs active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden xs:inline">Servicios</span>
            </button>

            {/* Center Brand */}
            <div 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xs">
                <Dog className="w-4 h-4" />
              </div>
              <div className="text-left">
                <span className="text-sm sm:text-base font-black tracking-tight text-[#291B10] font-serif block leading-none">
                  FARY <span className="text-[#E75A43]">MERK</span>
                </span>
                <span className="text-[10px] text-[#8A7563] font-semibold">
                  Snacks Caninos 🐾
                </span>
              </div>
            </div>

            {/* Right: Search, Google, Cart */}
            <div className="flex items-center gap-2">
              <div className="relative hidden sm:block">
                <Search className="w-3.5 h-3.5 text-[#8A7563] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar snack..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-full bg-white border border-[#E5D7C5] text-xs focus:outline-none focus:ring-2 focus:ring-[#E75A43]"
                />
              </div>

              <button
                id="header-user-btn"
                type="button"
                onClick={() => handleOpenAuth()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#EDE5D8] hover:border-orange-300 text-xs font-bold text-[#291B10] shadow-xs active:scale-95 transition-all"
              >
                {currentUser?.avatarUrl ? (
                  <img src={currentUser.avatarUrl} alt="" className="w-4 h-4 rounded-full object-cover" />
                ) : (
                  <GoogleIcon className="w-3.5 h-3.5" />
                )}
                <span className="hidden md:inline">
                  {currentUser ? currentUser.fullName.split(' ')[0] : 'Google'}
                </span>
              </button>

              <button
                id="header-cart-quick"
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-white border border-[#EDE5D8] hover:border-orange-300 text-[#291B10] shadow-xs active:scale-95 transition-all"
                aria-label="Ver carrito"
              >
                <ShoppingBag className="w-4 h-4 text-[#291B10]" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#E75A43] text-white text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </header>
      ) : (
        /* Header for Window 3: Mentorías Pro (Formal) */
        <header className="sticky top-0 z-40 bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800 py-3 px-4 sm:px-6 shadow-md text-white">
          <div className="max-w-2xl lg:max-w-4xl mx-auto flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => {
                setActiveWindow('portal');
                setActiveTab('servicios');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-1.5 text-xs font-bold text-amber-400 hover:underline bg-slate-900 px-3 py-1.5 rounded-full border border-slate-700 shadow-xs active:scale-95 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Volver a Servicios</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold">
                🎓
              </div>
              <div className="text-left">
                <span className="text-sm sm:text-base font-black tracking-tight text-white block leading-none">
                  FARY MERK
                </span>
                <span className="text-[10px] text-amber-300/90 font-semibold">
                  Mentorías & Consultoría Pro
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleOpenAuth()}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-800 border border-slate-700 hover:border-amber-400 text-xs font-bold text-white shadow-xs active:scale-95 transition-all"
              >
                <GoogleIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">
                  {currentUser ? currentUser.fullName.split(' ')[0] : 'Ingresar'}
                </span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Container matching mobile-first layout */}
      <main className="max-w-2xl lg:max-w-4xl mx-auto px-4 sm:px-6 w-full pt-3 sm:pt-5 space-y-5 relative z-10">
        {/* View 1: Recopilación de Servicios */}
        {activeWindow === 'portal' ? (
          <ServicesPortal
            onSelectService={(service) => {
              setActiveWindow(service);
              setActiveTab(service);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            cartCount={cartCount}
          />
        ) : activeWindow === 'snacks' ? (
          /* View 2: Tienda de Snacks Deshidratados (trabajado como en la imagen) */
          <>
            {/* 1. Hero Banner Component matching reference image */}
            <HeroBanner
              onExplore={() => {
                const el = document.getElementById('catalog-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            />

            {/* User Quick Bar if logged in to show purchased products quick access */}
            {currentUser && (
              <div className="p-3.5 rounded-2xl bg-white border border-[#EDE5D8] shadow-xs flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 text-xs">
                  {currentUser.avatarUrl ? (
                    <img
                      src={currentUser.avatarUrl}
                      alt={currentUser.fullName}
                      className="w-8 h-8 rounded-full object-cover border border-emerald-400 shrink-0"
                    />
                  ) : (
                    <span className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">
                      🐶
                    </span>
                  )}
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#291B10]">
                        ¡Hola {currentUser.fullName}!
                      </span>
                      {currentUser.isGoogleVerified && (
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                          ✓ Google
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-[#705642] block">
                      {currentUser.dogName ? `Perrito: ${currentUser.dogName}` : 'Revisa tus compras de snacks anteriores'}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleOpenAuth()}
                  className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] hover:bg-orange-50 border border-[#EDE5D8] text-xs font-bold text-[#E75A43] flex items-center gap-1 transition-colors shrink-0"
                >
                  <span>Mis compras</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* 2. Category Quick Bar with 4 Paw Cards */}
            <div>
              <CategoryBar
                products={PRODUCTS}
                selectedCategory={activeCategory}
                onSelectCategory={(catSlug) => {
                  setActiveCategory(catSlug);
                }}
                onQuickOpenProduct={(product) => {
                  handleOpenProductOptions(product);
                }}
              />
            </div>

            {/* 3. Section: "Destacados" with "Ver todos >" */}
            <section id="catalog-section" className="pt-2">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl sm:text-2xl font-black text-[#291B10] tracking-tight font-serif">
                  Destacados Fary Merk
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('todos');
                    setSearchQuery('');
                  }}
                  className="text-xs sm:text-sm font-bold text-[#E75A43] hover:text-[#D44730] flex items-center gap-0.5"
                >
                  <span>Ver todos</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Product Cards Grid: 2 columns */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-3xl border border-[#EDE5D8] p-6">
                  <Dog className="w-10 h-10 text-[#C4B5A5] mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-[#291B10]">No encontramos resultados</h3>
                  <p className="text-xs text-[#8A7563] mt-0.5">Prueba con otra palabra o limpia el filtro.</p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setActiveCategory('todos');
                    }}
                    className="mt-3 px-4 py-2 bg-[#E75A43] text-white text-xs font-bold rounded-xl"
                  >
                    Ver todos los snacks
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelectProduct={handleOpenProductOptions}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* 4. Wholesale / Combos Callout Box */}
            <section className="bg-gradient-to-r from-[#FFF4DF] to-[#FFEACC] rounded-3xl p-5 sm:p-6 border border-[#FCDDA7] shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 rounded-2xl bg-[#E75A43] text-white shrink-0 shadow-xs">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-[#E75A43] bg-white/70 px-2 py-0.5 rounded-md">
                    Packs Ahorro & Mayorista Fary Merk
                  </span>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#291B10] mt-1 font-serif">
                    ¿Buscas precios por docenas, 500 o 1000 unidades?
                  </h3>
                  <p className="text-xs text-[#705642] mt-1 leading-relaxed">
                    Tenemos las mejores tarifas para criaderos, veterinarias y pet lovers. Presiona en cada producto para ver la escala por mayor.
                  </p>
                </div>
              </div>
            </section>
          </>
        ) : (
          /* View 3: Mentorías & Asesorías Caninas (Presentación Formal) */
          <MentorshipSection
            currentUser={currentUser}
            onOpenAuth={handleOpenAuth}
            onBackToStore={() => {
              setActiveWindow('snacks');
              setActiveTab('snacks');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToPortal={() => {
              setActiveWindow('portal');
              setActiveTab('servicios');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* 5. Discreet Legal & Support Footer (Unobtrusive & does not distract from products) */}
        <footer className="mt-10 pt-6 pb-6 border-t border-[#EDE5D8]/70 text-[#8A7563] space-y-2.5">
          {/* Subtle Legal Links */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[11px] font-medium">
            <button
              type="button"
              id="footer-link-privacidad"
              onClick={() => handleOpenPrivacyPolicy('privacidad')}
              className="hover:text-[#E75A43] transition-colors"
            >
              Políticas de Privacidad (Ley N° 29733)
            </button>
            <span className="text-stone-300 select-none">•</span>
            <button
              type="button"
              id="footer-link-arco"
              onClick={() => handleOpenPrivacyPolicy('arco')}
              className="hover:text-[#E75A43] transition-colors"
            >
              Derechos ARCO
            </button>
            <span className="text-stone-300 select-none">•</span>
            <button
              type="button"
              id="footer-link-terminos"
              onClick={() => handleOpenPrivacyPolicy('terminos')}
              className="hover:text-[#E75A43] transition-colors"
            >
              Términos y Condiciones
            </button>
            <span className="text-stone-300 select-none">•</span>
            <button
              type="button"
              id="footer-link-envios"
              onClick={() => handleOpenPrivacyPolicy('envios')}
              className="hover:text-[#E75A43] transition-colors"
            >
              Envíos & Devoluciones
            </button>
          </div>

          {/* Discreet compliance note */}
          <p className="text-[10px] text-center text-stone-400 max-w-lg mx-auto leading-relaxed">
            © 2026 Fary Merk Perú • Snacks y Masticables 100% Naturales. Transparencia y cero testimonios falsos conforme a Ley N° 29571 e Indecopi. Lima, Perú.
          </p>

          {/* Micro contact links */}
          <div className="flex items-center justify-center gap-4 text-[10px] text-stone-400 pt-0.5">
            <a
              href={`https://wa.me/${WHATSAPP_PHONE}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-emerald-700 transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-emerald-600" />
              <span>WhatsApp: {WHATSAPP_DISPLAY}</span>
            </a>
            <span>•</span>
            <a
              href="mailto:neilq6905@gmail.com"
              className="hover:text-stone-600 transition-colors flex items-center gap-1"
            >
              <Mail className="w-3 h-3" />
              <span>neilq6905@gmail.com</span>
            </a>
          </div>
        </footer>
      </main>

      {/* Floating WhatsApp Pill Button matching reference */}
      <WhatsAppSupportBubble
        isOpen={isWhatsAppBubbleOpen}
        onToggle={() => setIsWhatsAppBubbleOpen(!isWhatsAppBubbleOpen)}
      />

      {/* Bottom Navigation Bar with dynamic layout matching Image 1 vs Image 2 */}
      <BottomNav
        activeTab={activeTab}
        activeWindow={activeWindow}
        onTabChange={handleTabChange}
        cartCount={cartCount}
        currentUser={currentUser}
        onOpenAuth={() => handleOpenAuth()}
      />

      {/* Servicity Drawer Menu (Hamburger Menu in Image 1) */}
      <ServicityMenuDrawer
        isOpen={isMenuDrawerOpen}
        onClose={() => setIsMenuDrawerOpen(false)}
        onNavigate={(view) => {
          setActiveWindow(view);
          setActiveTab(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => handleOpenAuth()}
        currentUser={currentUser}
        cartCount={cartCount}
      />

      {/* User Login & Profile Modal with Purchased Products Section & Google Auth */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={currentUser}
        onLogin={handleLogin}
        onLogout={handleLogout}
        orderHistory={orderHistory}
        customPromptMessage={authPromptMessage}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
        onVerifiedSuccess={() => {
          setIsAuthOpen(false);
        }}
        onQuickReorder={(product, option) => {
          handleAddToCart(product, option, 1);
          setIsCartOpen(true);
        }}
        onExploreCatalog={() => {
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Modals & Drawers */}
      <ProductOptionsModal
        product={selectedProduct}
        isOpen={isOptionsModalOpen}
        onClose={() => setIsOptionsModalOpen(false)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onProceedToCheckout={handleProceedToCheckout}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onBackToCart={handleBackToCart}
        onBackToStore={handleBackToStore}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOrderSuccess={handleOrderSuccess}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onOpenPrivacyPolicy={handleOpenPrivacyPolicy}
      />

      <OrderConfirmationModal
        order={confirmedOrder}
        isOpen={isConfirmationOpen}
        onClose={() => setIsConfirmationOpen(false)}
        onModifyOrder={handleModifyConfirmedOrder}
      />

      {/* Legal Privacy Policy & Terms Modal */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
        initialTab={privacyModalTab}
      />
    </div>
  );
}
