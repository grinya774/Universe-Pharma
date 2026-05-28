import { photos } from './photos'

export interface Product {
  id: string
  name: string
  nameRu: string
  category: string
  image: string
  badge: string
  description: string
}

export const products: Product[] = [
  {
    id: 'zinc',
    name: 'Liposomal Zinc Complex',
    nameRu: 'Липосомальный комплекс цинка',
    category: 'Vitamin',
    image: photos.zinc,
    badge: '25 мг в капсуле',
    description: 'Цинк + селен + медь. 3 биодоступные формы.',
  },
  {
    id: 'iron',
    name: 'Universe Iroton',
    nameRu: 'Биодоступное железо Iroton',
    category: 'Vitamin',
    image: photos.iron,
    badge: '150 мл • 30 порций',
    description: 'Железо с витаминами C, B6, B9, B12. Максимальная усвояемость.',
  },
  {
    id: 'magnesium',
    name: 'Magnesium Pro',
    nameRu: 'Магний Pro',
    category: 'Vitamin',
    image: photos.magnesium,
    badge: '200 мг • 60 таблеток',
    description: 'Таурат, бисглицинат, цитрат + B6. Без диоксида титана.',
  },
  {
    id: 'omega',
    name: 'Omega-3 TG',
    nameRu: 'Омега-3 триглицериды',
    category: 'Vitamin',
    image: photos.omega,
    badge: 'EPA+DHA 1240 мг',
    description: '60 капсул. Рыбий жир из Исландии.',
  },
  {
    id: 'd3k2',
    name: 'Vitamin D3 + K2',
    nameRu: 'Витамин D3 + K2 липосомальный',
    category: 'Vitamin',
    image: photos.d3k2,
    badge: 'Биодоступность 98%',
    description: '30 мл спрей. 300 порций. На MCT-масле.',
  },
  {
    id: 'collagen',
    name: 'Anti-Aging Collagen',
    nameRu: 'Коллаген Anti-Aging',
    category: 'Cilt & Kozmetik',
    image: photos.collagen,
    badge: '10 000 мг • VERISOL',
    description: '30 порций. Кожа, волосы, суставы.',
  },
  {
    id: 'magnesium-lipo',
    name: 'Liposomal Magnesium',
    nameRu: 'Липосомальный магний 5-в-1',
    category: 'Vitamin',
    image: photos.magnesiumLipo,
    badge: '120 капсул',
    description: '5 форм магния + B6. Сырьё из Германии.',
  },
]

export type CardCategory = 'probiotic' | 'vitamins' | 'iron'

export const cardDescriptions: Record<CardCategory, string> = {
  probiotic: `Universe Pharma — премиальные БАДы турецкого производства. GMP, HALAL, без диоксида титана. Сертифицированная продукция для Wildberries и Ozon.`,
  vitamins: `Universe Pharma — витаминный комплекс премиум-класса. Произведено на заводе в Стамбуле по стандартам GMP и HALAL. Натуральные компоненты, без искусственных красителей.`,
  iron: `Universe Pharma Iroton — биодоступное железо с комплексом витаминов для максимального усвоения. Рекомендованная врачами формула. Made in Türkiye.`,
}
