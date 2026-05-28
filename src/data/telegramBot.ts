import type { Product } from '../lib/products'
import { SURVEY_START_BUTTON } from './telegramSurvey'

export type MessageType = 'text' | 'product' | 'giveaway' | 'buttons'

export interface BotButton {
  label: string
  emoji?: string
  action?: 'menu' | 'scenario' | 'survey' | 'survey-answer'
}

export interface BotMessage {
  id: string
  type: MessageType
  text?: string
  product?: Product
  productId?: string
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
  SURVEY_START_BUTTON,
  { label: '💊 Подборка', action: 'scenario' },
  { label: '🛒 Ozon', action: 'scenario' },
  { label: '🟣 WB', action: 'scenario' },
]

function withMenu(buttons: BotButton[]): BotButton[] {
  const filtered = buttons.filter((b) => b.action !== 'menu')
  return [...filtered, MENU_BUTTON]
}

export const demoScenarios: Record<string, BotMessage[]> = {
  start: [
    {
      id: 'welcome',
      type: 'text',
      text: '👋 Добро пожаловать в Universe Pharma!\n\nТурецкое производство с премиальным сырьём. Постоянный контроль качества.\n\nВыберите раздел:',
      delay: 0,
      buttons: quickReplies,
    },
  ],
  vitamins: [
    {
      id: 'vit-pick',
      type: 'text',
      text: '🌿 Подборка на сегодня:\n\n• Иммунитет → Омега-3\n• Энергия → Iroton\n• Красота → Коллаген\n• Сон → Магний',
      delay: 800,
    },
    {
      id: 'vit-product-1',
      type: 'product',
      productId: 'iron',
      text: '⭐ Хит продаж:',
      marketplace: 'ozon',
      price: '1 260 ₽',
      delay: 1200,
    },
    {
      id: 'vit-cta',
      type: 'text',
      text: '💡 GMP, HALAL. Made in Türkiye.',
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
      text: '🛒 Топ на Ozon:\n\n1️⃣ Цинк — 4.8★\n2️⃣ Омега-3 — 4.7★\n3️⃣ D3+K2 — 4.9★',
      delay: 800,
    },
    {
      id: 'ozon-product',
      type: 'product',
      productId: 'zinc',
      marketplace: 'ozon',
      price: '1 260 ₽',
      delay: 1000,
    },
    {
      id: 'ozon-link',
      type: 'text',
      text: '🔗 Промокод UNIVERSE10 для @universepharma',
      delay: 800,
      buttons: withMenu([{ label: '🛒 Ozon', action: 'scenario' }]),
    },
  ],
  wb: [
    {
      id: 'wb-intro',
      type: 'text',
      text: '🟣 Топ на WB:\n\n• Iroton — от 890 ₽\n• Коллаген — от 980 ₽\n• Магний — от 1 100 ₽',
      delay: 800,
    },
    {
      id: 'wb-product',
      type: 'product',
      productId: 'iron',
      marketplace: 'wb',
      price: '890 ₽',
      delay: 1000,
    },
    {
      id: 'wb-link',
      type: 'text',
      text: '📦 Подпишитесь на @universepharma',
      delay: 800,
      buttons: withMenu([{ label: '🟣 WB', action: 'scenario' }]),
    },
  ],
}

export const userMessages: Record<string, string> = {
  '🩺 Подбор по симптомам': '🩺 Подбор по симптомам',
  '💊 Подборка': '💊 Подборка',
  '🛒 Ozon': '🛒 Ozon',
  '🟣 WB': '🟣 WB',
  '✅ Да': 'Да',
  '❌ Нет': 'Нет',
  '◀️ Главное меню': '◀️ Главное меню',
}

export function getScenarioKey(buttonLabel: string): string | 'menu' | 'survey' {
  if (buttonLabel.includes('Главное меню') || buttonLabel.includes('Меню')) return 'menu'
  if (buttonLabel.includes('симптом') || buttonLabel.includes('🩺')) return 'survey'
  if (buttonLabel.includes('Подборка') || buttonLabel.includes('витамин')) return 'vitamins'
  if (buttonLabel.includes('Ozon') || buttonLabel.includes('🛒')) return 'ozon'
  if (buttonLabel.includes('WB') || buttonLabel.includes('🟣')) return 'wb'
  return 'start'
}
