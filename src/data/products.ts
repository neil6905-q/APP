import { Product } from '../types';
import patasImg from '../assets/images/patas_pollo_dog_1787149639560.jpg';
import cuellosImg from '../assets/images/cuellos_pollo_dog_1787149650433.jpg';
import orejasImg from '../assets/images/orejas_cerdo_dog_1787149661097.jpg';
import traqueaImg from '../assets/images/traquea_res_dog_1787149670998.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'patas-pollo',
    name: 'Patas de Pollo Deshidratadas',
    slug: 'patas-de-pollo',
    subtitle: 'Masticable 100% natural, rico en colágeno y calcio para articulaciones.',
    description: 'Elaboradas mediante un proceso lento de deshidratación a baja temperatura para preservar nutrientes. Ideales para la limpieza dental natural, remoción de sarro y fortalecimiento articular gracias a su alta concentración de glucosamina y condroitina.',
    image: patasImg,
    benefits: [
      'Glucosamina y condroitina natural',
      'Limpieza de sarro y placa dental',
      '100% libre de químicos y preservantes',
      'Apto para perros de todos los tamaños'
    ],
    category: 'aves',
    tags: ['Articulaciones', 'Dental', 'Popular', 'Colágeno'],
    minPrice: 5.90,
    options: [
      {
        id: 'patas-opt-docena-bolsitas',
        label: '1 docena de bolsitas con 5 unidades de patas',
        unitsCount: 60,
        pricePEN: 18.00,
        badge: 'Pack Porcionado',
        description: '12 bolsitas individuales selladas (5 patas c/u = 60 unidades en total). Ideal para premios diarios.'
      },
      {
        id: 'patas-opt-20',
        label: '20 unidades de patas de pollo',
        unitsCount: 20,
        pricePEN: 5.90,
        badge: 'Económico',
        description: 'Bolsa sellada de 20 patas de pollo crocantes.'
      },
      {
        id: 'patas-opt-50',
        label: '50 unidades de patas de pollo',
        unitsCount: 50,
        pricePEN: 14.90,
        badge: 'Ahorro',
        description: 'Bolsa de 50 patas. Gran balance de rendimiento y frescura.'
      },
      {
        id: 'patas-opt-100',
        label: '100 unidades de patas de pollo',
        unitsCount: 100,
        pricePEN: 24.90,
        originalPricePEN: 29.50,
        badge: 'Más Vendido',
        description: 'Bolsa de 100 patas con cierre hermético. Máximo ahorro mensual.'
      },
      {
        id: 'patas-opt-500',
        label: '500 unidades de patas de pollo',
        unitsCount: 500,
        pricePEN: 121.00,
        originalPricePEN: 147.50,
        badge: 'Mayorista',
        description: 'Presentación para criaderos, paseadores, veterinarias o hogares con varios peludos.'
      },
      {
        id: 'patas-opt-1000',
        label: '1000 unidades de patas de pollo',
        unitsCount: 1000,
        pricePEN: 234.00,
        originalPricePEN: 295.00,
        badge: 'Súper Mayorista',
        description: 'Precio especial por millar. La mejor tarifa del mercado garantizada.'
      }
    ]
  },
  {
    id: 'cuellos-pollo',
    name: 'Cuellos de Pollo Deshidratados',
    slug: 'cuellos-de-pollo',
    subtitle: 'Snack crujiente rico en fósforo, calcio y proteína digestible.',
    description: 'Cuellos enteros deshidratados con cartílago flexible y carne natural. Un premio crujiente que satisface el instinto de masticación de cachorros y adultos mientras aporta minerales esenciales para su estructura ósea.',
    image: cuellosImg,
    benefits: [
      'Fácil digestión y textura crujiente',
      'Alto contenido de fósforo y calcio orgánico',
      'Excelente estimulación mental y calma',
      'Sin aditivos ni colorantes'
    ],
    category: 'aves',
    tags: ['Crocante', 'Calcio', 'Cachorros y Adultos'],
    minPrice: 7.50,
    options: [
      {
        id: 'cuellos-opt-docena-bolsas',
        label: '1 docena de bolsas con 10 unidades',
        unitsCount: 120,
        pricePEN: 38.00,
        badge: 'Pack Familiar',
        description: '12 bolsas prácticas con 10 cuellos cada una (120 unidades en total).'
      },
      {
        id: 'cuellos-opt-20',
        label: '20 unidades de cuellos de pollo',
        unitsCount: 20,
        pricePEN: 7.50,
        badge: 'Prueba',
        description: 'Bolsa de 20 cuellos crocantes de pollo natural.'
      },
      {
        id: 'cuellos-opt-30',
        label: '30 unidades de cuellos de pollo',
        unitsCount: 30,
        pricePEN: 10.90,
        badge: 'Popular',
        description: '30 unidades en empaque resellable para conservar frescura.'
      },
      {
        id: 'cuellos-opt-50',
        label: '50 unidades de cuellos de pollo',
        unitsCount: 50,
        pricePEN: 16.90,
        badge: 'Ahorro',
        description: '50 unidades de cuellos. Ideal para 1 mes de premios continuos.'
      },
      {
        id: 'cuellos-opt-100',
        label: '100 unidades de cuellos de pollo',
        unitsCount: 100,
        pricePEN: 29.90,
        originalPricePEN: 37.50,
        badge: 'Super Pack',
        description: '100 unidades para consentir a tu perro a diario.'
      },
      {
        id: 'cuellos-opt-500',
        label: '500 unidades de cuellos de pollo',
        unitsCount: 500,
        pricePEN: 139.00,
        originalPricePEN: 187.50,
        badge: 'Mayorista',
        description: 'Caja con 500 cuellos deshidratados al por mayor.'
      }
    ]
  },
  {
    id: 'orejas-cerdo',
    name: 'Orejas de Cerdo Deshidratadas',
    slug: 'orejas-de-cerdo',
    subtitle: 'Masticable duradero para aliviar la ansiedad y reforzar la mandíbula.',
    description: 'Orejas enteras de cerdo de corte premium desgrasadas naturalmente. Proveen horas de entretenimiento masticatorio saludable, reduciendo el estrés en el hogar mientras promueven encías sanas y un pelaje brillante.',
    image: orejasImg,
    benefits: [
      'Larga duración y efecto relajante',
      'Alto en ácidos grasos para un pelaje sedoso',
      'Excelente sabor y aroma irresistible para perros',
      'Sin químicos blanqueadores'
    ],
    category: 'cerdo',
    tags: ['Larga Duración', 'Anti-Estrés', 'Pelo Brillante'],
    minPrice: 4.50,
    options: [
      {
        id: 'orejas-opt-1',
        label: '1 unidad de oreja de cerdo',
        unitsCount: 1,
        pricePEN: 4.50,
        badge: 'Individual',
        description: '1 oreja grande deshidratada lista para regalonear a tu mascota.'
      },
      {
        id: 'orejas-opt-2',
        label: '2 unidades de orejas de cerdo',
        unitsCount: 2,
        pricePEN: 8.50,
        badge: 'Dúo',
        description: 'Pack de 2 orejas enteras crujientes.'
      },
      {
        id: 'orejas-opt-5',
        label: '5 unidades de orejas de cerdo',
        unitsCount: 5,
        pricePEN: 19.90,
        originalPricePEN: 22.50,
        badge: 'Semanal',
        description: '5 orejas premium para premios especiales.'
      },
      {
        id: 'orejas-opt-10',
        label: '10 unidades de orejas de cerdo',
        unitsCount: 10,
        pricePEN: 36.90,
        originalPricePEN: 45.00,
        badge: 'Más Vendido',
        description: '10 orejas enteras. Ahorra 18% con este formato.'
      },
      {
        id: 'orejas-opt-50',
        label: '50 unidades de orejas de cerdo',
        unitsCount: 50,
        pricePEN: 169.00,
        originalPricePEN: 225.00,
        badge: 'Mayorista',
        description: 'Pack de 50 orejas enteras para revendedores y criadores.'
      }
    ]
  },
  {
    id: 'traquea-res',
    name: 'Tráquea de Res Deshidratada',
    slug: 'traquea-de-res',
    subtitle: 'Tubo de cartílago puro y colágeno, ideal para rellenar y masticar.',
    description: 'Tráqueas de vacuno 100% naturales, ricas en cartílago esponjoso y anillos de colágeno elástico. Tienen una forma tubular perfecta para rellenar con paté, mantequilla de maní apta para perros o premios húmedos para congelar.',
    image: traqueaImg,
    benefits: [
      'Super fuente de colágeno hidrolizable',
      'Rellenable para estimulación cognitiva',
      'Fortalece cartílagos articulares',
      'Textura crujiente irresistible'
    ],
    category: 'res',
    tags: ['Colágeno Puro', 'Rellenable', 'Articular'],
    minPrice: 12.00,
    options: [
      {
        id: 'traquea-opt-4',
        label: '4 unidades de tráquea de res',
        unitsCount: 4,
        pricePEN: 12.00,
        badge: 'Starter',
        description: 'Pack de 4 tráqueas crujientes de res.'
      },
      {
        id: 'traquea-opt-8',
        label: '8 unidades de tráquea de res',
        unitsCount: 8,
        pricePEN: 22.50,
        originalPricePEN: 24.00,
        badge: 'Popular',
        description: '8 tráqueas naturales listas para masticar.'
      },
      {
        id: 'traquea-opt-15',
        label: '15 unidades de tráquea de res',
        unitsCount: 15,
        pricePEN: 39.90,
        originalPricePEN: 45.00,
        badge: 'Ahorro',
        description: '15 unidades de tráquea entera con alto colágeno.'
      },
      {
        id: 'traquea-opt-30',
        label: '30 unidades de tráquea de res',
        unitsCount: 30,
        pricePEN: 74.90,
        originalPricePEN: 90.00,
        badge: 'Pack Mensual',
        description: '30 unidades. Suministro completo para un perro feliz.'
      },
      {
        id: 'traquea-opt-50',
        label: '50 unidades de tráquea de res',
        unitsCount: 50,
        pricePEN: 119.00,
        originalPricePEN: 150.00,
        badge: 'Mayorista',
        description: '50 tráqueas deshidratadas de primera calidad.'
      },
      {
        id: 'traquea-opt-100',
        label: '100 unidades de tráquea de res',
        unitsCount: 100,
        pricePEN: 225.00,
        originalPricePEN: 300.00,
        badge: 'Súper Mayorista',
        description: '100 unidades al mejor precio para reventa o grandes manadas.'
      }
    ]
  }
];

export const WHATSAPP_PHONE = '51935438508'; // Contacto de WhatsApp M2 / Fary Merk: +51 935438508
export const WHATSAPP_DISPLAY = '+51 935 438 508';

export const YAPE_PHONE = '51969990031'; // Número para Yape/Plin: +51 969990031
export const YAPE_DISPLAY = '+51 969 990 031';
export const YAPE_HOLDER = 'Fary Merk / Neil Q.';
