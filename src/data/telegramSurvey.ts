import { products } from '../lib/products'
import type { BotButton } from './telegramBot'
import { MENU_BUTTON } from './telegramBot'

export interface SurveyQuestion {
  id: string
  text: string
  yesScores: Record<string, number>
  noScores?: Record<string, number>
}

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'headache',
    text: '🤕 Беспокоит головная боль или головокружение?',
    yesScores: { magnesium: 3, 'magnesium-lipo': 2, iron: 1 },
  },
  {
    id: 'energy',
    text: '⚡ Чувствуете снижение энергии, усталость?',
    yesScores: { iron: 4, zinc: 2, d3k2: 1 },
  },
  {
    id: 'sleep',
    text: '😴 Проблемы со сном, тревожность?',
    yesScores: { magnesium: 3, 'magnesium-lipo': 4 },
  },
  {
    id: 'immunity',
    text: '🛡️ Часто болеете, слабый иммунитет?',
    yesScores: { omega: 4, d3k2: 3, zinc: 2 },
  },
  {
    id: 'skin',
    text: '✨ Кожа, волосы, ногти — нужна поддержка?',
    yesScores: { collagen: 5, zinc: 2, omega: 1 },
  },
  {
    id: 'digest',
    text: '🦠 Пищеварение, дискомфорт в ЖКТ?',
    yesScores: { omega: 2, magnesium: 1 },
    noScores: {},
  },
]

export const SURVEY_START_BUTTON: BotButton = { label: '🩺 Подбор по симптомам', action: 'survey' }

export function scoreProducts(answers: Record<string, boolean>): string[] {
  const scores: Record<string, number> = {}
  products.forEach((p) => { scores[p.id] = 0 })

  surveyQuestions.forEach((q) => {
    const yes = answers[q.id]
    const map = yes ? q.yesScores : (q.noScores ?? {})
    Object.entries(map).forEach(([id, pts]) => {
      scores[id] = (scores[id] ?? 0) + pts
    })
  })

  return Object.entries(scores)
    .sort((a, b) => b[1] - a[1])
    .filter(([, s]) => s > 0)
    .slice(0, 3)
    .map(([id]) => id)
}

export function getRecommendationText(productIds: string[]): string {
  if (productIds.length === 0) {
    return 'Рекомендуем базовый комплекс: Омега-3 + Цинк для общей поддержки здоровья.'
  }
  const names = productIds
    .map((id) => products.find((p) => p.id === id)?.nameRu)
    .filter(Boolean)
  return `На основе ваших ответов рекомендуем:\n\n${names.map((n, i) => `${i + 1}. ${n}`).join('\n')}\n\nВсе продукты — GMP, HALAL, без диоксида титана.`
}

export function surveyButtons(_questionId: string): BotButton[] {
  return [
    { label: '✅ Да', action: 'survey-answer' },
    { label: '❌ Нет', action: 'survey-answer' },
    MENU_BUTTON,
  ]
}
