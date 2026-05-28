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
    id: 'multibiotic',
    name: 'Multibiotic',
    nameRu: 'Мультибиотик',
    category: 'Probiyotikler',
    image: `${import.meta.env.BASE_URL}products/multibiotic.svg`,
    badge: '50 млрд КОЕ',
    description: '18 штаммов полезных бактерий. Без диоксида титана.',
  },
  {
    id: 'iron',
    name: 'Max Iron Complex',
    nameRu: 'Максимально Эффективное Железо',
    category: 'Vitamin',
    image: `${import.meta.env.BASE_URL}products/iron.svg`,
    badge: 'С кофакторами',
    description: 'Комплекс против анемии, для выносливости.',
  },
  {
    id: 'immunity',
    name: 'Immunity Boost',
    nameRu: 'Иммунитет Плюс',
    category: 'Bağışıklık',
    image: `${import.meta.env.BASE_URL}products/immunity.svg`,
    badge: 'Vitamin C + D3',
    description: 'Поддержка иммунной системы.',
  },
  {
    id: 'omega',
    name: 'Omega-3 Premium',
    nameRu: 'Омега-3 Премиум',
    category: 'Vitamin',
    image: `${import.meta.env.BASE_URL}products/omega.svg`,
    badge: '1000 mg EPA/DHA',
    description: 'Высокая концентрация омега-3.',
  },
  {
    id: 'collagen',
    name: 'Collagen Beauty',
    nameRu: 'Коллаген Бьюти',
    category: 'Cilt & Kozmetik',
    image: `${import.meta.env.BASE_URL}products/collagen.svg`,
    badge: 'Marine Collagen',
    description: 'Кожа, волосы, ногти.',
  },
  {
    id: 'men-health',
    name: 'Men\'s Vitality',
    nameRu: 'Мужская Витальность',
    category: 'Erkek Sağlığı',
    image: `${import.meta.env.BASE_URL}products/men.svg`,
    badge: 'Zinc + Tribulus',
    description: 'Комплекс для мужского здоровья.',
  },
]

export type CardCategory = 'probiotic' | 'vitamins' | 'iron'

export const cardDescriptions: Record<CardCategory, string> = {
  probiotic: `Universe Pharma Мультибиотик — премиальный пробиотик турецкого производства. 50 млрд КОЕ в каждой капсуле, 18 штаммов бифидо- и лактобактерий. Содержит пребиотик инулин и пиколинат цинка. Без диоксида титана, ГМО, лактозы и сахара. Подходит веганам. Рекомендуется при приёме антибиотиков и для восстановления микрофлоры кишечника.`,
  vitamins: `Universe Pharma — витаминный комплекс премиум-класса. Произведено на заводе в Стамбуле по стандартам GMP и HALAL. Натуральные компоненты, без искусственных красителей. Сертифицированная продукция для маркетплейсов Wildberries и Ozon.`,
  iron: `Universe Pharma Максимально Эффективное Железо — комплекс с кофакторами для максимального усвоения. Помогает при анемии, повышает выносливость. Турецкое качество, проверенное временем. Безопасная формула без побочных эффектов.`,
}
