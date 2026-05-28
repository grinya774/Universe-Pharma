import type { Product } from '../lib/products'

export type MessageType = 'text' | 'product' | 'giveaway' | 'buttons'

export interface BotButton {
  label: string
  emoji?: string
}

export interface BotMessage {
  id: string
  type: MessageType
  text?: string
  product?: Product
  marketplace?: 'wb' | 'ozon'
  price?: string
  buttons?: BotButton[]
  delay?: number
}

export const botIntro = {
  name: 'Universe Pharma Bot',
  username: '@universepharma_bot',
  channel: '@universepharma',
  channelUrl: 'https://t.me/universepharma',
  subscribers: 205,
  tagline: 'Повышаем качество и продолжительность жизни людей',
}

export const quickReplies: BotButton[] = [
  { label: 'Подборка витаминов', emoji: '💊' },
  { label: 'Что заказать на Ozon?', emoji: '🛒' },
  { label: 'Что заказать на WB?', emoji: '🟣' },
  { label: 'Розыгрыш для подписчиков', emoji: '🎁' },
]

export const demoScenarios: Record<string, BotMessage[]> = {
  start: [
    {
      id: 'welcome',
      type: 'text',
      text: '👋 Добро пожаловать в Universe Pharma!\n\nТурецкое производство с премиальным сырьём. Постоянный контроль качества — независимые исследования.\n\nВыберите, чем могу помочь:',
      delay: 0,
      buttons: quickReplies,
    },
  ],
  vitamins: [
    {
      id: 'vit-pick',
      type: 'text',
      text: '🌿 Персональная подборка на сегодня:\n\nДля иммунитета → Иммунитет Плюс\nДля кишечника → Мультибиотик 50 млрд КОЕ\nДля энергии → Макс. Эффективное Железо\nДля красоты → Коллаген Бьюти',
      delay: 800,
    },
    {
      id: 'vit-product-1',
      type: 'product',
      text: '⭐ Хит продаж — рекомендуем начать с этого:',
      marketplace: 'ozon',
      price: '1 260 ₽',
      delay: 1200,
    },
    {
      id: 'vit-cta',
      type: 'text',
      text: '💡 Совет: при приёме антибиотиков Мультибиотик восстанавливает микрофлору за 2 недели. Без диоксида титана — безопасно для ежедневного приёма.',
      delay: 1000,
      buttons: [
        { label: 'Заказать на Ozon', emoji: '🔵' },
        { label: 'Заказать на WB', emoji: '🟣' },
      ],
    },
  ],
  ozon: [
    {
      id: 'ozon-intro',
      type: 'text',
      text: '🛒 Топ-3 на Ozon прямо сейчас:\n\n1️⃣ Мультибиотик — 4.8★ (127 отзывов)\n2️⃣ Омега-3 Премиум — 4.7★\n3️⃣ Иммунитет Плюс — 4.9★\n\nБесплатная доставка от 500 ₽',
      delay: 800,
    },
    {
      id: 'ozon-product',
      type: 'product',
      marketplace: 'ozon',
      price: '1 260 ₽',
      delay: 1000,
    },
    {
      id: 'ozon-link',
      type: 'text',
      text: '🔗 Перейти в магазин Universe Pharma на Ozon →\n\nИспользуйте промокод UNIVERSE10 при первом заказе через наш канал!',
      delay: 800,
      buttons: [{ label: 'Открыть Ozon', emoji: '🔵' }],
    },
  ],
  wb: [
    {
      id: 'wb-intro',
      type: 'text',
      text: '🟣 Лучшие предложения на Wildberries:\n\n• Мультибиотик 20 капс — от 890 ₽\n• Мужская Витальность — от 1 100 ₽\n• Коллаген Бьюти — от 980 ₽\n\nЭкспресс-доставка 1–2 дня',
      delay: 800,
    },
    {
      id: 'wb-product',
      type: 'product',
      marketplace: 'wb',
      price: '890 ₽',
      delay: 1000,
    },
    {
      id: 'wb-link',
      type: 'text',
      text: '📦 Добавьте в корзину — бот напомнит о приёме через 7 дней!\n\nПодпишитесь на канал @universepharma — там эксклюзивные скидки.',
      delay: 800,
      buttons: [{ label: 'Открыть Wildberries', emoji: '🟣' }],
    },
  ],
  giveaway: [
    {
      id: 'giveaway-announce',
      type: 'giveaway',
      text: '🎁 РОЗЫГРЫШ ДЛЯ ПОДПИСЧИКОВ\n\nПризы:\n🏆 1 место — набор Universe Pharma (5 SKU)\n🥈 2 место — Мультибиотик + Омега-3\n🥉 3 место — Иммунитет Плюс\n\nУсловия:\n✅ Подписаться на @universepharma\n✅ Нажать «Участвую» ниже\n✅ Быть подписчиком канала 205+',
      delay: 800,
    },
    {
      id: 'giveaway-timer',
      type: 'text',
      text: '⏰ Итоги — через 48 часов. Победителей объявим в канале @universepharma\n\nУдачи! 🍀',
      delay: 1200,
      buttons: [
        { label: 'Участвую! 🎉', emoji: '' },
        { label: 'Подписаться на канал', emoji: '📢' },
      ],
    },
  ],
}

export const userMessages: Record<string, string> = {
  'Подборка витаминов': '💊 Подборка витаминов',
  'Что заказать на Ozon?': '🛒 Что заказать на Ozon?',
  'Что заказать на WB?': '🟣 Что заказать на WB?',
  'Розыгрыш для подписчиков': '🎁 Розыгрыш для подписчиков',
}

export function getScenarioKey(buttonLabel: string): string {
  if (buttonLabel.includes('витамин') || buttonLabel.includes('Подборка')) return 'vitamins'
  if (buttonLabel.includes('Ozon') || buttonLabel.includes('ozon')) return 'ozon'
  if (buttonLabel.includes('WB') || buttonLabel.includes('Wildberries')) return 'wb'
  if (buttonLabel.includes('Розыгрыш') || buttonLabel.includes('Участвую')) return 'giveaway'
  return 'start'
}
