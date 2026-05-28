import { useState, useRef, useCallback } from 'react'
import PageShell from '../components/PageShell'
import { generateCard, type GenerationPhase, type Marketplace } from '../lib/cardGenerator'
import type { CardCategory } from '../lib/products'
import { products } from '../lib/products'
import { photos } from '../lib/photos'

const phaseLabels: Record<GenerationPhase, string> = {
  idle: '',
  'bg-remove': 'Удаляем фон…',
  infographic: 'Генерируем инфографику…',
  description: 'Пишем SEO-описание…',
  done: 'Готово!',
}

export default function AICardsPage() {
  const [imageUrl, setImageUrl] = useState<string | null>(photos.zinc)
  const [marketplace, setMarketplace] = useState<Marketplace>('wb')
  const [category, setCategory] = useState<CardCategory>('vitamins')
  const [phase, setPhase] = useState<GenerationPhase>('idle')
  const [result, setResult] = useState<Awaited<ReturnType<typeof generateCard>> | null>(null)
  const [typedText, setTypedText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
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

  const typeText = (text: string) => {
    setTypedText('')
    setTypingDone(false)
    let i = 0
    const interval = setInterval(() => {
      setTypedText(text.slice(0, i))
      i++
      if (i > text.length) {
        clearInterval(interval)
        setTypingDone(true)
      }
    }, 12)
  }

  const handleGenerate = async () => {
    if (!imageUrl) return
    setResult(null)
    setTypedText('')

    const res = await generateCard({ imageUrl, marketplace, category }, setPhase)
    setResult(res)
    typeText(res.description)
  }

  const handleDownload = useCallback(() => {
    if (!imageUrl) return
    const link = document.createElement('a')
    link.download = `universe-pharma-${marketplace}.jpg`
    link.href = imageUrl
    link.target = '_blank'
    link.click()
    setToast('Сохранено')
    setTimeout(() => setToast(''), 2500)
  }, [imageUrl, marketplace])

  const generating = phase !== 'idle' && phase !== 'done'

  return (
    <PageShell>
      <div className="max-w-lg md:max-w-7xl mx-auto px-4 py-6 md:py-12">
        <div className="mb-6">
          <p className="text-mint text-[10px] tracking-[0.3em] uppercase mb-1">AI Generator</p>
          <h1 className="font-display font-bold text-2xl md:text-5xl">Карточки WB & Ozon</h1>
        </div>

        <div className="space-y-5">
          {/* Catalog picker — real photos */}
          <div>
            <p className="text-[10px] text-muted uppercase tracking-wider mb-2">Выберите товар</p>
            <div className="flex gap-2 overflow-x-auto pb-2 snap-x scrollbar-hide">
              {products.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => { setImageUrl(p.image); setResult(null); setPhase('idle') }}
                  className={`flex-shrink-0 w-14 h-[4.5rem] rounded-lg overflow-hidden border-2 snap-center ${
                    imageUrl === p.image ? 'border-mint' : 'border-transparent'
                  }`}
                >
                  <img src={p.image} alt={p.nameRu} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full py-2.5 glass rounded-xl text-sm text-muted"
          >
            📸 Загрузить своё фото
          </button>

          <div className="flex gap-2">
            {(['wb', 'ozon'] as const).map((mp) => (
              <button
                key={mp}
                type="button"
                onClick={() => setMarketplace(mp)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${
                  marketplace === mp
                    ? mp === 'wb' ? 'bg-wb text-white' : 'bg-ozon text-white'
                    : 'glass text-muted'
                }`}
              >
                {mp === 'wb' ? 'Wildberries' : 'Ozon'}
              </button>
            ))}
          </div>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as CardCategory)}
            className="w-full bg-surface border border-white/10 rounded-xl px-4 py-3 text-sm"
          >
            <option value="vitamins">Витамины</option>
            <option value="iron">Железо</option>
          </select>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={!imageUrl || generating}
            className="w-full py-3.5 bg-mint text-bg font-semibold rounded-xl text-sm disabled:opacity-40"
          >
            {generating ? phaseLabels[phase] : '✨ Сгенерировать карточку'}
          </button>

          {generating && (
            <div className="glass rounded-xl p-4">
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-mint shimmer rounded-full transition-all"
                  style={{ width: phase === 'bg-remove' ? '33%' : phase === 'infographic' ? '66%' : '90%' }}
                />
              </div>
            </div>
          )}

          {result && imageUrl && (
            <div className="space-y-4">
              <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <div
                  className="text-[10px] font-bold text-white px-3 py-1.5"
                  style={{ background: marketplace === 'wb' ? '#CB11AB' : '#005BFF' }}
                >
                  {marketplace === 'wb' ? 'WILDBERRIES' : 'OZON'} — готово
                </div>
                <img src={imageUrl} alt="Карточка" className="w-full" />
              </div>

              <div className="glass rounded-xl p-4">
                <p className="text-[10px] text-muted uppercase mb-2">SEO-описание</p>
                <p className="text-xs leading-relaxed text-white/80">
                  {typedText}
                  {!typingDone && <span className="animate-pulse">|</span>}
                </p>
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={handleDownload} className="flex-1 py-3 glass rounded-xl text-sm">
                  ⬇ Скачать
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setToast('Опубликовано на ' + (marketplace === 'wb' ? 'WB' : 'Ozon'))
                    setTimeout(() => setToast(''), 2500)
                  }}
                  className="flex-1 py-3 bg-mint/20 text-mint rounded-xl text-sm"
                >
                  🚀 Опубликовать
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {toast && (
        <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-4 right-4 bg-mint text-bg px-4 py-3 rounded-xl z-50 text-sm text-center">
          ✓ {toast}
        </div>
      )}
    </PageShell>
  )
}
