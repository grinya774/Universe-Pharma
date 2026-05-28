import { products } from './products'
import type { Marketplace } from './cardGenerator'
import type { CardCategory } from './products'

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/** Находим полную карточку маркетплейса по исходному фото */
export function getFullCardImage(sourceUrl: string): string {
  const product = products.find((p) => p.image === sourceUrl)
  return product?.image ?? sourceUrl
}

/** «Вырезаем» баночку — центральный кроп на белом фоне */
export async function cropProductImage(sourceUrl: string): Promise<string> {
  const img = await loadImage(sourceUrl)
  const size = 400
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, size, size)

  const sw = img.width * 0.35
  const sh = img.height * 0.55
  const sx = (img.width - sw) / 2
  const sy = img.height * 0.15

  ctx.drawImage(img, sx, sy, sw, sh, 40, 30, size - 80, size - 60)

  ctx.strokeStyle = '#e0e0e0'
  ctx.lineWidth = 2
  ctx.strokeRect(20, 20, size - 40, size - 40)

  return canvas.toDataURL('image/jpeg', 0.9)
}

export async function animateRevealCard(
  _sourceUrl: string,
  fullCardUrl: string,
  _marketplace: Marketplace,
  _category: CardCategory,
): Promise<string> {
  return fullCardUrl
}
