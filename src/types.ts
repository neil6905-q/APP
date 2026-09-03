export interface ProductOption {
  id: string;
  label: string; // e.g. "1 docena de bolsitas con 5 unidades", "20 unidades", "100 unidades"
  unitsCount: number; // approximate total units
  pricePEN: number;
  originalPricePEN?: number;
  badge?: string; // e.g. "Pack Ahorro", "Mayorista", "Más Popular"
  description?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  subtitle: string;
  description: string;
  image: string;
  benefits: string[];
  category: 'aves' | 'cerdo' | 'res';
  tags: string[];
  options: ProductOption[];
  minPrice: number;
}

export interface CartItem {
  cartItemId: string; // unique combo of productId + optionId
  productId: string;
  productName: string;
  productImage: string;
  option: ProductOption;
  quantity: number;
}

export interface CustomerData {
  fullName: string;
  phone: string;
  email?: string;
  dogName?: string; // "Nombre de tu perrito (Opcional - le enviaremos un regalito en su paquete 🐶)"
  department: string;
  district: string;
  address: string;
  reference: string;
  paymentMethod: 'yape_contra_entrega' | 'tarjeta';
  notes?: string;
  cardDetails?: {
    cardNumberMasked: string;
    cardHolder: string;
    cardBrand: string;
  };
}

export interface UserProfile {
  id: string;
  username: string; // Nombre de usuario o handle
  email: string; // Correo verificado de Google
  fullName: string; // Nombre según cuenta de Google
  avatarUrl?: string; // Foto de perfil de Google
  isGoogleVerified: boolean; // Verificado por Google obligatorio para comprar
  googleId?: string; // ID único de Google
  phone: string;
  dogName?: string;
  department: string;
  district: string;
  address: string;
  reference: string;
  createdAt: string;
  verifiedAt?: string;
}

export type OrderTrackingStep = 'recibido' | 'preparacion' | 'en_camino' | 'entregado';

export interface Order {
  id: string;
  trackingCode: string; // e.g. "FMK-829104"
  createdAt: string;
  customer: CustomerData;
  items: CartItem[];
  subtotalPEN: number;
  deliveryCostPEN: number;
  totalPEN: number;
  status: 'completado' | 'pendiente_pago';
  trackingStatus: OrderTrackingStep;
  estimatedDeliveryTime: string;
  courierName?: string;
  dogGiftIncluded: boolean;
}
