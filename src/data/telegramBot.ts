import type { Product } from '../lib/products'

export type MessageType = 'text' | 'product' | 'giveaway' | 'buttons'

export interface BotButton {
  label: string
  emoji?: string
  action?: 'menu' | 'scenario'
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

export const MENU_BUTTON: BotButton = { label: '◀️ Главное меню', action: 'menu' }

export const quickReplies: BotButton[] = [
  { label: '💊 Подборка', action: 'scenario' },
  { label: '🛒 Ozon', action: 'scenario' },
  { label: '🟣 WB', action: 'scenario' },
  { label: '🎁 Розыгрыш', action: 'scenario' },
]

function withMenu(buttons: BotButton[]): BotButton[] {
  return [...buttons, MENU_BUTTON]
}

export const demoScenarios: Record<string, BotMessage[]> = {
  start: [
    {
      id: 'welcome',
      type: 'text',
      text: '👋 Добро пожаловать в Universe Pharma!\n\nТурецкое производство с премиальным сырьём. Постоянный контроль качества — независимые исследования.\n\nВыберите раздел:',
      delay: 0,
      buttons: quickReplies,
    },
  ],
  vitamins: [
    {
      id: 'vit-pick',
      type: 'text',
      text: '🌿 Подборка на сегодня:\n\n• Иммунитет → Омега-3\n• Энергия → Iroton железо\n• Красота → Коллаген\n• Сон → Магний 5-в-1',
      delay: 800,
    },
    {
      id: 'vit-product-1',
      type: 'product',
      text: '⭐ Хит продаж:',
      marketplace: 'ozon',
      price: '1 260 ₽',
      delay: 1200,
    },
    {
      id: 'vit-cta',
      type: 'text',
      text: '💡 Без диоксида титана. GMP, HALAL. Made in Türkiye.',
      delay: 1000,
      buttons: withMenu([
        { label: '🛒 Ozon', action: 'scenario' },
        { label: '🟣 WB', action: 'scenario' },
      ]),
    },
  ],
  ozon: [
    {
      id: 'ozon-intro',
      type: 'text',
      text: '🛒 Топ на Ozon:\n\n1️⃣ Цинк — 4.8★\n2️⃣ Омега-3 — 4.7★\n3️⃣ D3+K2 — 4.9★\n\nДоставка от 500 ₽',
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
      text: '🔗 Промокод UNIVERSE10 для подписчиков @universepharma',
      delay: 800,
      buttons: withMenu([{ label: 'Открыть Ozon', action: 'scenario' }]),
    },
  ],
  wb: [
    {
      id: 'wb-intro',
      type: 'text',
      text: '🟣 Топ на Wildberries:\n\n• Iroton — от 890 ₽\n• Коллаген — от 980 ₽\n• Магний — от 1 100 ₽\n\nДоставка 1–2 дня',
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
      text: '📦 Подпишитесь на @universepharma — эксклюзивные акции',
      delay: 800,
      buttons: withMenu([{ label: 'Открыть WB', action: 'scenario' }]),
    },
  ],
  giveaway: [
    {
      id: 'giveaway-announce',
      type: 'giveaway',
      text: '🎁 РОЗЫГРЫШ\n\n🏆 Набор 5 SKU\n🥈 Омега-3 + Цинк\n🥉 Магний\n\n✅ Подписка @universepharma\n✅ Нажать «Участвую»',
      delay: 800,
    },
    {
      id: 'giveaway-timer',
      type: 'text',
      text: '⏰ Итоги через 48 ч в канале @universepharma',
      delay: 1200,
      buttons: withMenu([
        { label: 'Участвую 🎉', action: 'scenario' },
        { label: 'Подписаться', action: 'scenario' },
      ]),
    },
  ],
}

export const userMessages: Record<string, string> = {
  '💊 Подборка': '💊 Подборка витаминов',
  'Подборка витаминов': '💊 Подборка витаминов',
  '🛒 Ozon': '🛒 Ozon',
  'Что заказать на Ozon?': '🛒 Ozon',
  'Открыть Ozon': '🛒 Ozon',
  '🟣 WB': '🟣 WB',
  'Что заказать на WB?': '🟣 WB',
  'Открыть WB': '🟣 WB',
  'Открыть Wildberries': '🟣 WB',
  '🎁 Розыгрыш': '🎁 Розыгрыш',
  'Розыгрыш для подписчиков': '🎁 Розыгрыш',
  'Участвую 🎉': 'Участвую!',
  'Участвую! 🎉': 'Участвую!',
  'Подписаться': 'Подписаться на канал',
  '◀️ Главное меню': '◀️ Главное меню',
}

export function getScenarioKey(buttonLabel: string): string | 'menu' {
  if (buttonLabel.includes('Главное меню') || buttonLabel.includes('Меню')) return 'menu'
  if (buttonLabel.includes('Подборка') || buttonLabel.includes('витамин')) return 'vitamins'
  if (buttonLabel.includes('Ozon') || buttonLabel.includes('ozon') || buttonLabel.includes('🛒')) return 'ozon'
  if (buttonLabel.includes('WB') || buttonLabel.includes('Wildberries') || buttonLabel.includes('🟣')) return 'wb'
  if (buttonLabel.includes('Розыгрыш') || buttonLabel.includes('Участвую') || buttonLabel.includes('🎁')) return 'giveaway'
  return 'start'
}
