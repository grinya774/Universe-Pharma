import type { Marketplace } from './cardGenerator'
import type { CardCategory } from './products'

const benefits: Record<CardCategory, string[]> = {
  vitamins: ['GMP • HALAL', 'Без диоксида титана', 'Made in Türkiye', 'Премиум сырьё'],
  iron: ['Максимальная усвояемость', 'С витаминами B', 'Рекомендовано врачами', '150 мл • 30 порций'],
  probiotic: ['50 млрд КОЕ', '18 штаммов', 'Веган', 'Без ГМО'],
}

const titles: Record<CardCategory, string> = {
  vitamins: 'ПРЕМИУМ\nВИТАМИНЫ',
  iron: 'БИОДОСТУПНОЕ\nЖЕЛЕЗО',
  probiotic: 'ПРОБИОТИК\nПРЕМИУМ',
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

/** Генерирует стилизованную карточку маркетплейса из фото товара */
export async function composeMarketplaceCard(
  sourceUrl: string,
  marketplace: Marketplace,
  category: CardCategory,
): Promise<string> {
  const w = marketplace === 'wb' ? 900 : 1000
  const h = marketplace === 'wb' ? 1200 : 1000

  const canvas = document.createElement('canvas')
  canvas.width = w
  canvas.height = h
  const ctx = canvas.getContext('2d')!
  const isWb = marketplace === 'wb'
  const accent = isWb ? '#CB11AB' : '#005BFF'
  const accent2 = isWb ? '#9b0d85' : '#003db8'

  // Фон
  const bg = ctx.createLinearGradient(0, 0, w * 0.6, h)
  bg.addColorStop(0, '#f8f9fa')
  bg.addColorStop(0.5, '#ffffff')
  bg.addColorStop(1, isWb ? '#f3e8f8' : '#e8f0ff')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, w, h)

  // Декор
  ctx.fillStyle = accent + '12'
  ctx.beginPath()
  ctx.arc(w * 0.85, h * 0.2, w * 0.35, 0, Math.PI * 2)
  ctx.fill()

  // Шапка маркетплейса
  const headerGrad = ctx.createLinearGradient(0, 0, w, 0)
  headerGrad.addColorStop(0, accent)
  headerGrad.addColorStop(1, accent2)
  ctx.fillStyle = headerGrad
  ctx.fillRect(0, 0, w, 56)
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 22px Inter, Arial, sans-serif'
  ctx.fillText(isWb ? 'WILDBERRIES' : 'OZON', 24, 36)

  // Бренд
  ctx.fillStyle = '#1a5c4a'
  ctx.font = 'bold 16px Inter, Arial, sans-serif'
  ctx.fillText('UNIVERSE PHARMA', 24, 88)

  // Заголовок
  ctx.fillStyle = '#111'
  ctx.font = 'bold 32px Syne, Arial, sans-serif'
  const titleLines = titles[category].split('\n')
  titleLines.forEach((line, i) => {
    ctx.fillText(line, 24, 130 + i * 38)
  })

  // Бейджи слева
  const badges = benefits[category]
  badges.forEach((b, i) => {
    const y = 220 + i * 52
    ctx.fillStyle = '#2dd4a8'
    ctx.beginPath()
    ctx.arc(40, y + 14, 18, 0, Math.PI * 2)
    ctx.fill()
    ctx.fillStyle = '#fff'
    ctx.font = 'bold 14px Inter, sans-serif'
    ctx.fillText(String(i + 1), 40 - 4, y + 19)
    ctx.fillStyle = '#333'
    ctx.font = '500 15px Inter, sans-serif'
    ctx.fillText(b, 68, y + 19)
  })

  // Фото товара
  try {
    const productImg = await loadImage(sourceUrl)
    const pw = w * 0.42
    const ph = h * 0.55
    const px = w - pw - 24
    const py = h * 0.22

    ctx.shadowColor = 'rgba(0,0,0,0.25)'
    ctx.shadowBlur = 30
    ctx.shadowOffsetY = 12
    ctx.drawImage(productImg, px, py, pw, ph)
    ctx.shadowColor = 'transparent'
  } catch {
    ctx.fillStyle = '#ddd'
    ctx.fillRect(w * 0.5, h * 0.25, w * 0.4, h * 0.5)
  }

  // Низ
  ctx.fillStyle = accent
  ctx.fillRect(0, h - 72, w, 72)
  ctx.fillStyle = '#fff'
  ctx.font = 'bold 18px Inter, sans-serif'
  ctx.fillText('Made in Türkiye • GMP • HALAL', 24, h - 32)

  return canvas.toDataURL('image/jpeg', 0.92)
}
