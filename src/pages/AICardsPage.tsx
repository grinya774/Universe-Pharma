import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell'
import { generateCard, type GenerationPhase, type Marketplace } from '../lib/cardGenerator'
import type { CardCategory } from '../lib/products'
import { products } from '../lib/products'
import { photos } from '../lib/photos'

const phaseLabels: Record<GenerationPhase, string> = {
  idle: '',
  'bg-remove': 'Вырезаем упаковку…',
  infographic: 'Собираем карточку с текстом…',
  description: 'Пишем SEO-описание…',
  done: 'Готово!',
}

export default function AICardsPage() {
  const [sourceUrl, setSourceUrl] = useState<string | null>(photos.zinc)
  const [marketplace, setMarketplace] = useState<Marketplace>('wb')
  const [category, setCategory] = useState<CardCategory>('vitamins')
  const [phase, setPhase] = useState<GenerationPhase>('idle')
  const [result, setResult] = useState<Awaited<ReturnType<typeof generateCard>> | null>(null)
  const [typedText, setTypedText] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [toast, setToast] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File) => {
    setSourceUrl(URL.createObjectURL(file))
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
    if (!sourceUrl) return
    setResult(null)
    setTypedText('')

    const res = await generateCard({ imageUrl: sourceUrl, marketplace, category }, setPhase)
    setResult(res)
    typeText(res.description)
  }

  const handleDownload = useCallback(() => {
    if (!result?.imageUrl) return
    const link = document.createElement('a')
    link.download = `universe-pharma-${marketplace}.jpg`
    link.href = result.imageUrl
    link.click()
    setToast('Сохранено')
    setTimeout(() => setToast(''), 2500)
  }, [result, marketplace])

  const generating = phase !== 'idle' && phase !== 'done'
  const showCropped = Boolean(result?.croppedUrl)
  const showFull = Boolean(result?.imageUrl) && (phase === 'infographic' || phase === 'description' || phase === 'done')

  return (
    <PageShell>
      <div className="max-w-lg md:max-w-7xl mx-auto px-4 py-6">
        <h1 className="font-display font-bold text-2xl md:text-4xl mb-6">AI-карточки WB & Ozon</h1>

        <div className="space-y-5">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {products.map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => { setSourceUrl(p.image); setResult(null); setPhase('idle') }}
                className={`flex-shrink-0 w-14 h-[4.5rem] rounded-lg overflow-hidden border-2 ${
                  sourceUrl === p.image ? 'border-mint' : 'border-transparent'
                }`}
              >
                <img src={p.image} alt={p.nameRu} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>

          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
          <button type="button" onClick={() => fileRef.current?.click()} className="w-full py-2.5 glass rounded-xl text-sm text-muted">
            📸 Загрузить фото упаковки
          </button>

          <div className="flex gap-2">
            {(['wb', 'ozon'] as const).map((mp) => (
              <button
                key={mp}
                type="button"
                onClick={() => setMarketplace(mp)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium ${
                  marketplace === mp ? (mp === 'wb' ? 'bg-wb text-white' : 'bg-ozon text-white') : 'glass text-muted'
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
            disabled={!sourceUrl || generating}
            className="w-full py-3.5 bg-mint text-bg font-semibold rounded-xl text-sm disabled:opacity-40"
          >
            {generating ? phaseLabels[phase] : '✨ Сгенерировать карточку'}
          </button>

          {generating && (
            <div className="glass rounded-xl p-4">
              <p className="text-xs text-mint mb-2">{phaseLabels[phase]}</p>
              <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-mint transition-all duration-500"
                  style={{
                    width: phase === 'bg-remove' ? '35%' : phase === 'infographic' ? '70%' : '95%',
                  }}
                />
              </div>
            </div>
          )}

          <AnimatePresence mode="wait">
            {(generating || result) && (
              <motion.div
                key={phase}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-3"
              >
                <p className="text-[10px] text-muted uppercase tracking-wider text-center">
                  {showFull ? 'Готовая карточка' : 'Шаг 1: вырезка упаковки'}
                </p>

                <div className="flex justify-center gap-3 items-end">
                  {showCropped && result?.croppedUrl && (
                    <div className="w-[28%]">
                      <p className="text-[9px] text-center text-muted mb-1">Баночка</p>
                      <img src={result.croppedUrl} alt="Crop" className="w-full rounded-lg border border-white/20 bg-white" />
                    </div>
                  )}

                  {showCropped && result?.croppedUrl && showFull && (
                    <span className="text-mint text-2xl pb-8">→</span>
                  )}

                  {showFull && result?.imageUrl && (
                    <div className="w-[58%]">
                      <p className="text-[9px] text-center text-mint mb-1">Карточка {marketplace === 'wb' ? 'WB' : 'Ozon'}</p>
                      <motion.img
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        src={result.imageUrl}
                        alt="Карточка"
                        className="w-full rounded-lg shadow-2xl border-2 border-mint/40"
                      />
                    </div>
                  )}

                  {generating && phase === 'bg-remove' && !result && sourceUrl && (
                    <div className="w-[40%]">
                      <img src={sourceUrl} alt="Processing" className="w-full rounded-lg opacity-50 blur-sm" />
                    </div>
                  )}
                </div>

                {result && showFull && (
                  <>
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
                        onClick={() => { setToast('Опубликовано'); setTimeout(() => setToast(''), 2500) }}
                        className="flex-1 py-3 bg-mint/20 text-mint rounded-xl text-sm"
                      >
                        🚀 Опубликовать
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-[calc(4.5rem+env(safe-area-inset-bottom))] left-4 right-4 bg-mint text-bg px-4 py-3 rounded-xl z-50 text-sm text-center">
          ✓ {toast}
        </div>
      )}
    </PageShell>
  )
}
