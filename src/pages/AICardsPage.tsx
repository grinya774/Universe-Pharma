import { useState, useRef, useCallback } from 'react'
import Nav from '../components/Nav'
import { generateCard, type GenerationPhase, type Marketplace } from '../lib/cardGenerator'
import type { CardCategory } from '../lib/products'
import { products } from '../lib/products'

const phaseLabels: Record<GenerationPhase, string> = {
  idle: '',
  'bg-remove': 'Удаляем фон…',
  infographic: 'Генерируем инфографику…',
  description: 'Пишем SEO-описание…',
  done: 'Готово!',
}

export default function AICardsPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [marketplace, setMarketplace] = useState<Marketplace>('wb')
  const [category, setCategory] = useState<CardCategory>('probiotic')
  const [phase, setPhase] = useState<GenerationPhase>('idle')
  const [result, setResult] = useState<Awaited<ReturnType<typeof generateCard>> | null>(null)
  const [typedText, setTypedText] = useState('')
  const [toast, setToast] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleFile = (file: File) => {
    const url = URL.createObjectURL(file)
    setImageUrl(url)
    setResult(null)
    setPhase('idle')
    setTypedText('')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file?.type.startsWith('image/')) handleFile(file)
  }

  const typeText = (text: string) => {
    setTypedText('')
    let i = 0
    const interval = setInterval(() => {
      setTypedText(text.slice(0, i))
      i++
      if (i > text.length) clearInterval(interval)
    }, 15)
  }

  const handleGenerate = async () => {
    if (!imageUrl) return
    setResult(null)
    setTypedText('')

    const res = await generateCard(
      { imageUrl, marketplace, category },
      setPhase,
    )
    setResult(res)
    typeText(res.description)
  }

  const handleDownload = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !imageUrl) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const w = marketplace === 'wb' ? 900 : 1000
    const h = marketplace === 'wb' ? 1200 : 1000
    canvas.width = w
    canvas.height = h

    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, marketplace === 'wb' ? '#1a0a2e' : '#0a1a3e')
    grad.addColorStop(1, marketplace === 'wb' ? '#2d1b4e' : '#0a2a5e')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      const imgSize = Math.min(w * 0.5, h * 0.45)
      ctx.drawImage(img, (w - imgSize) / 2, h * 0.08, imgSize, imgSize)

      ctx.fillStyle = marketplace === 'wb' ? '#CB11AB' : '#005BFF'
      ctx.fillRect(0, 0, w, 50)
      ctx.fillStyle = '#fff'
      ctx.font = 'bold 20px Inter, sans-serif'
      ctx.fillText(marketplace === 'wb' ? 'WILDBERRIES' : 'OZON', 20, 33)

      const badges = result?.badges ?? ['Premium Quality']
      badges.forEach((b, i) => {
        const y = h * 0.62 + i * 36
        ctx.fillStyle = 'rgba(45, 212, 168, 0.2)'
        ctx.beginPath()
        ctx.roundRect(40, y, w - 80, 28, 14)
        ctx.fill()
        ctx.fillStyle = '#2dd4a8'
        ctx.font = '14px Inter, sans-serif'
        ctx.fillText(`✓ ${b}`, 56, y + 19)
      })

      ctx.fillStyle = '#fff'
      ctx.font = 'bold 28px Syne, sans-serif'
      ctx.fillText('Universe Pharma', 40, h - 80)
      ctx.fillStyle = '#888'
      ctx.font = '14px Inter, sans-serif'
      ctx.fillText('Made in Turkey • GMP • HALAL', 40, h - 50)

      const link = document.createElement('a')
      link.download = `universe-pharma-${marketplace}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    }
    img.src = imageUrl
  }, [imageUrl, marketplace, result])

  const generating = phase !== 'idle' && phase !== 'done'

  return (
    <div className="min-h-screen pt-16">
      <Nav />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <p className="text-mint text-sm tracking-[0.3em] uppercase mb-2">AI Generator</p>
          <h1 className="font-display font-bold text-4xl md:text-5xl">
            Карточки для WB & Ozon
          </h1>
          <p className="text-muted mt-3 max-w-xl">
            Загрузите фото упаковки — нейросеть создаст продающую карточку с инфографикой и SEO-описанием.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input */}
          <div className="space-y-6">
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileRef.current?.click()}
              className="glass rounded-2xl border-2 border-dashed border-white/20 p-12 text-center cursor-pointer hover:border-mint/50 transition-colors"
            >
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              />
              {imageUrl ? (
                <img src={imageUrl} alt="Upload" className="max-h-48 mx-auto rounded-xl" />
              ) : (
                <>
                  <p className="text-4xl mb-4">📸</p>
                  <p className="font-medium mb-1">Загрузите фото упаковки</p>
                  <p className="text-sm text-muted">Drag & drop или нажмите</p>
                </>
              )}
            </div>

            {/* Quick pick from catalog */}
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-3">Или выберите из каталога</p>
              <div className="flex gap-3 overflow-x-auto pb-2">
                {products.slice(0, 4).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => { setImageUrl(p.image); setResult(null); setPhase('idle') }}
                    className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 border-transparent hover:border-mint transition-colors"
                  >
                    <img src={p.image} alt={p.nameRu} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Marketplace toggle */}
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-3">Маркетплейс</p>
              <div className="flex gap-3">
                {(['wb', 'ozon'] as const).map((mp) => (
                  <button
                    key={mp}
                    onClick={() => setMarketplace(mp)}
                    className={`flex-1 py-3 rounded-xl font-medium text-sm transition-all ${
                      marketplace === mp
                        ? mp === 'wb'
                          ? 'bg-wb text-white'
                          : 'bg-ozon text-white'
                        : 'glass text-muted hover:text-white'
                    }`}
                  >
                    {mp === 'wb' ? 'Wildberries' : 'Ozon'}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <p className="text-xs text-muted uppercase tracking-wider mb-3">Категория</p>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CardCategory)}
                className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-mint"
              >
                <option value="probiotic">Пробиотик</option>
                <option value="vitamins">Витамины</option>
                <option value="iron">Железо</option>
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!imageUrl || generating}
              className="w-full py-4 bg-mint text-bg font-semibold rounded-xl hover:bg-mint/90 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {generating ? phaseLabels[phase] : '✨ Сгенерировать карточку'}
            </button>
          </div>

          {/* Output */}
          <div className="space-y-6">
            {generating && (
              <div className="glass rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex gap-1">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-mint neural-dot"
                        style={{ animationDelay: `${i * 0.2}s` }}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-mint">{phaseLabels[phase]}</span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-mint shimmer rounded-full transition-all duration-500"
                    style={{
                      width: phase === 'bg-remove' ? '33%' : phase === 'infographic' ? '66%' : '90%',
                    }}
                  />
                </div>
              </div>
            )}

            {result && (
              <>
                {/* Card preview */}
                <div
                  className="glass rounded-2xl overflow-hidden mx-auto"
                  style={{
                    maxWidth: marketplace === 'wb' ? 360 : 400,
                    aspectRatio: marketplace === 'wb' ? '900/1200' : '1/1',
                  }}
                >
                  <div
                    className="relative w-full h-full p-4 flex flex-col"
                    style={{
                      background: marketplace === 'wb'
                        ? 'linear-gradient(160deg, #1a0a2e, #2d1b4e)'
                        : 'linear-gradient(160deg, #0a1a3e, #0a2a5e)',
                    }}
                  >
                    <div
                      className="text-xs font-bold text-white px-3 py-1.5 -mx-4 -mt-4 mb-3"
                      style={{ background: marketplace === 'wb' ? '#CB11AB' : '#005BFF' }}
                    >
                      {marketplace === 'wb' ? 'WILDBERRIES' : 'OZON'}
                    </div>
                    {imageUrl && (
                      <img src={imageUrl} alt="Product" className="w-1/2 mx-auto rounded-lg mb-3" />
                    )}
                    <div className="space-y-1.5 flex-1">
                      {result.badges.map((b) => (
                        <div key={b} className="text-[10px] bg-mint/20 text-mint px-2 py-1 rounded-full inline-block mr-1">
                          ✓ {b}
                        </div>
                      ))}
                    </div>
                    <div className="mt-auto">
                      <p className="font-display font-bold text-sm">Universe Pharma</p>
                      <p className="text-[10px] text-muted">Made in Turkey • GMP • HALAL</p>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="glass rounded-2xl p-6">
                  <p className="text-xs text-muted uppercase tracking-wider mb-3">SEO-описание</p>
                  <p className="text-sm leading-relaxed text-white/80">{typedText}<span className="animate-pulse">|</span></p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={handleDownload}
                    className="flex-1 py-3 glass rounded-xl hover:bg-white/10 transition-colors text-sm font-medium"
                  >
                    ⬇ Скачать PNG
                  </button>
                  <button
                    onClick={() => { setToast('Карточка опубликована на ' + (marketplace === 'wb' ? 'Wildberries' : 'Ozon')); setTimeout(() => setToast(''), 3000) }}
                    className="flex-1 py-3 bg-mint/20 text-mint rounded-xl hover:bg-mint/30 transition-colors text-sm font-medium"
                  >
                    🚀 Опубликовать
                  </button>
                </div>
              </>
            )}

            {!result && !generating && (
              <div className="glass rounded-2xl p-12 text-center text-muted">
                <p className="text-4xl mb-4">🎨</p>
                <p>Результат появится здесь после генерации</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {toast && (
        <div className="fixed bottom-6 right-6 bg-mint text-bg px-6 py-3 rounded-xl shadow-2xl z-50">
          ✓ {toast}
        </div>
      )}
    </div>
  )
}
