import { cardDescriptions, type CardCategory } from './products'
import { cropProductImage, getFullCardImage } from './cardCompositor'

export type Marketplace = 'wb' | 'ozon'

export interface CardInput {
  imageUrl: string
  marketplace: Marketplace
  category: CardCategory
  productName?: string
}

export interface CardResult {
  imageUrl: string
  croppedUrl: string
  description: string
  badges: string[]
  marketplace: Marketplace
}

const badgesByCategory: Record<CardCategory, string[]> = {
  probiotic: ['50 млрд КОЕ', '18 штаммов', 'Без диоксида титана', 'GMP • HALAL'],
  vitamins: ['GMP сертификат', 'Натуральный состав', 'Made in Turkey', 'Premium Quality'],
  iron: ['С кофакторами', 'Против анемии', 'Высокая биодоступность', 'GMP • HALAL'],
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export type GenerationPhase = 'idle' | 'bg-remove' | 'infographic' | 'description' | 'done'

export async function generateCard(
  input: CardInput,
  onPhase?: (phase: GenerationPhase) => void,
): Promise<CardResult> {
  onPhase?.('bg-remove')
  const croppedUrl = await cropProductImage(input.imageUrl)
  await delay(1400)

  onPhase?.('infographic')
  await delay(1200)
  const fullCardUrl = getFullCardImage(input.imageUrl)

  onPhase?.('description')
  await delay(900)
  onPhase?.('done')

  return {
    imageUrl: fullCardUrl,
    croppedUrl,
    description: cardDescriptions[input.category],
    badges: badgesByCategory[input.category],
    marketplace: input.marketplace,
  }
}
