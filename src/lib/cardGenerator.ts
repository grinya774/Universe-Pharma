import { cardDescriptions, type CardCategory } from './products'
import { composeMarketplaceCard } from './cardCompositor'

export type Marketplace = 'wb' | 'ozon'

export interface CardInput {
  imageUrl: string
  marketplace: Marketplace
  category: CardCategory
  productName?: string
}

export interface CardResult {
  imageUrl: string
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

/** Внешний API (ваш бэкенд): VITE_CARD_API_URL */
async function tryCustomApi(input: CardInput): Promise<string | null> {
  const apiUrl = import.meta.env.VITE_CARD_API_URL as string | undefined
  if (!apiUrl) return null

  try {
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        imageUrl: input.imageUrl,
        marketplace: input.marketplace,
        category: input.category,
        productName: input.productName,
      }),
    })
    if (!res.ok) return null
    const data = (await res.json()) as { imageUrl?: string; image?: string }
    return data.imageUrl ?? data.image ?? null
  } catch {
    return null
  }
}

/** OpenAI Images API: VITE_OPENAI_API_KEY */
async function tryOpenAI(input: CardInput): Promise<string | null> {
  const key = import.meta.env.VITE_OPENAI_API_KEY as string | undefined
  if (!key) return null

  const mp = input.marketplace === 'wb' ? 'Wildberries' : 'Ozon'
  const prompt = `Professional ${mp} marketplace product infographic card for Turkish supplement brand Universe Pharma. Clean white background, benefit badges, premium pharmacy style, Russian text labels, product bottle center-right, GMP HALAL badges, high conversion e-commerce design.`

  try {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-image-1',
        prompt,
        n: 1,
        size: input.marketplace === 'wb' ? '1024x1536' : '1024x1024',
      }),
    })
    if (!res.ok) return null
    const data = (await res.json()) as { data?: { url?: string; b64_json?: string }[] }
    const item = data.data?.[0]
    if (item?.url) return item.url
    if (item?.b64_json) return `data:image/png;base64,${item.b64_json}`
    return null
  } catch {
    return null
  }
}

export async function generateCard(
  input: CardInput,
  onPhase?: (phase: GenerationPhase) => void,
): Promise<CardResult> {
  onPhase?.('bg-remove')
  await delay(1200)

  onPhase?.('infographic')

  let generatedUrl: string | null = null

  generatedUrl = await tryCustomApi(input)
  if (!generatedUrl) generatedUrl = await tryOpenAI(input)
  if (!generatedUrl) {
    generatedUrl = await composeMarketplaceCard(
      input.imageUrl,
      input.marketplace,
      input.category,
    )
  }

  onPhase?.('description')
  await delay(800)
  onPhase?.('done')

  return {
    imageUrl: generatedUrl,
    description: cardDescriptions[input.category],
    badges: badgesByCategory[input.category],
    marketplace: input.marketplace,
  }
}
