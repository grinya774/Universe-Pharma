import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import PageShell from '../components/PageShell'
import Marquee from '../components/Marquee'
import ProductCard from '../components/ProductCard'
import { products } from '../lib/products'
import { photos } from '../lib/photos'

const categories = [
  { name: 'Vitamin', desc: 'Витамины и минералы', icon: '💊' },
  { name: 'Bağışıklık', desc: 'Иммунитет', icon: '🛡️' },
  { name: 'Cilt & Kozmetik', desc: 'Кожа и красота', icon: '✨' },
  { name: 'Erkek Sağlığı', desc: 'Мужское здоровье', icon: '💪' },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80])

  return (
    <PageShell className="!pb-[calc(4rem+env(safe-area-inset-bottom))] md:!pb-0">
      {/* Hero — mobile first */}
      <section ref={heroRef} className="relative min-h-[85dvh] flex flex-col justify-center gradient-mesh overflow-hidden px-4">
        <motion.div style={{ y: heroY }} className="w-full max-w-lg mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-mint text-[10px] md:text-sm tracking-[0.25em] uppercase mb-4"
          >
            Turkish Supplements • Istanbul
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="font-display font-bold text-[2rem] leading-[1.05] md:text-7xl mb-4"
          >
            Engineered in <span className="text-mint">Istanbul</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-muted text-sm md:text-lg mb-6 leading-relaxed px-2"
          >
            Премиальные БАДы на Wildberries и Ozon. GMP, HALAL.
          </motion.p>

          {/* Hero product — real WB/Ozon card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="relative mx-auto w-[72%] max-w-[280px] mb-6"
          >
            <div className="absolute -inset-4 bg-mint/15 rounded-3xl blur-2xl" />
            <img
              src={photos.zinc}
              alt="Universe Pharma"
              className="relative w-full rounded-2xl shadow-2xl border border-white/10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:justify-center"
          >
            <Link to="/ai-cards" className="px-6 py-3 bg-mint text-bg font-semibold rounded-full text-sm text-center">
              AI-карточки
            </Link>
            <Link to="/telegram-bot" className="px-6 py-3 glass rounded-full text-sm text-center border border-[#2AABEE]/40 text-[#6ab2f2]">
              Telegram Bot
            </Link>
            <Link to="/automation" className="px-6 py-3 glass rounded-full text-sm text-center hidden sm:block">
              Автоматизация
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <Marquee />

      {/* About */}
      <section className="py-12 md:py-24 px-4">
        <div className="max-w-lg md:max-w-7xl mx-auto">
          <p className="text-mint text-[10px] tracking-[0.3em] uppercase mb-2">О бренде</p>
          <h2 className="font-display font-bold text-2xl md:text-5xl mb-4 leading-tight">
            Завод в Esenyurt, офис в Казани
          </h2>
          <p className="text-muted text-sm leading-relaxed mb-6">
            Universe Pharma — турецкий производитель БАДов. Без диоксида титана, ГМО и вредных добавок.
          </p>
          <div className="grid grid-cols-3 gap-4">
            {[
              { val: '150+', label: 'SKU' },
              { val: 'GMP', label: 'Сертификат' },
              { val: 'WB+Ozon', label: 'МП' },
            ].map((s) => (
              <div key={s.label} className="glass rounded-xl p-3 text-center">
                <p className="font-display font-bold text-lg md:text-3xl text-mint">{s.val}</p>
                <p className="text-[9px] md:text-xs text-muted uppercase">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products — snap scroll */}
      <section className="py-12 md:py-24 bg-surface">
        <div className="px-4 mb-6">
          <h2 className="font-display font-bold text-2xl md:text-5xl">Карточки WB & Ozon</h2>
          <p className="text-muted text-sm mt-1">Реальные инфографики товаров</p>
        </div>
        <div className="overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
          <div className="flex gap-4 px-4 w-max">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Marketplace showcase with photos */}
      <section className="py-12 md:py-24 px-4">
        <div className="max-w-lg md:max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-2xl md:text-5xl mb-8 text-center">Маркетплейсы</h2>

          <div className="space-y-8">
            <div>
              <h3 className="font-display font-bold text-xl mb-4" style={{ color: '#CB11AB' }}>
                Wildberries
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[photos.iron, photos.omega, photos.collagen, photos.magnesiumLipo].map((src, i) => (
                  <motion.img
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    src={src}
                    alt="WB"
                    className="w-full rounded-xl border border-white/10 shadow-lg"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-xl mb-4" style={{ color: '#005BFF' }}>
                Ozon
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[photos.zinc, photos.magnesium, photos.d3k2, photos.omega].map((src, i) => (
                  <motion.img
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    src={src}
                    alt="Ozon"
                    className="w-full rounded-xl border border-white/10 shadow-lg"
                    loading="lazy"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-24 px-4 bg-surface">
        <div className="max-w-lg md:max-w-7xl mx-auto">
          <h2 className="font-display font-bold text-2xl mb-6">Категории</h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((cat) => (
              <div key={cat.name} className="glass rounded-xl p-4">
                <span className="text-2xl mb-2 block">{cat.icon}</span>
                <h3 className="font-display font-semibold text-sm">{cat.name}</h3>
                <p className="text-[11px] text-muted">{cat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-10 px-4 border-t border-white/10 text-center md:text-left">
        <div className="max-w-lg md:max-w-7xl mx-auto">
          <p className="font-display font-bold mb-2">UNIVERSE PHARMA</p>
          <p className="text-xs text-muted">info@universepharma.ru • +7 (843) 245 62 00</p>
        </div>
      </footer>
    </PageShell>
  )
}
