import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Nav from '../components/Nav'
import Marquee from '../components/Marquee'
import ProductCard from '../components/ProductCard'
import { products } from '../lib/products'

const categories = [
  { name: 'Probiyotikler', desc: 'Пробиотики и пребиотики', icon: '🦠' },
  { name: 'Vitamin', desc: 'Витаминные комплексы', icon: '💊' },
  { name: 'Bağışıklık', desc: 'Поддержка иммунитета', icon: '🛡️' },
  { name: 'Erkek Sağlığı', desc: 'Мужское здоровье', icon: '💪' },
  { name: 'Cilt & Kozmetik', desc: 'Кожа и красота', icon: '✨' },
  { name: 'İç Sağlık', desc: 'Внутреннее здоровье', icon: '❤️' },
]

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="min-h-screen">
      <Nav />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center gradient-mesh overflow-hidden pt-16">
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-mint text-sm tracking-[0.4em] uppercase mb-6"
            >
              Turkish Supplements • Since Istanbul
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="font-display font-bold text-5xl md:text-7xl leading-[0.95] mb-8"
            >
              Engineered<br />
              in <span className="text-mint">Istanbul</span>.<br />
              Sold on WB & Ozon.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-muted text-lg max-w-md mb-10 leading-relaxed"
            >
              Премиальные БАДы турецкого производства. GMP, HALAL, без диоксида титана.
              150+ SKU на маркетплейсах России.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/automation" className="px-8 py-3 bg-mint text-bg font-semibold rounded-full hover:bg-mint/90 transition-colors">
                Автоматизация завода
              </Link>
              <Link to="/ai-cards" className="px-8 py-3 glass rounded-full hover:bg-white/10 transition-colors">
                AI-карточки →
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}
            className="relative flex justify-center"
          >
            <div className="absolute inset-0 bg-mint/10 rounded-full blur-3xl scale-75" />
            <motion.img
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              src={products[0].image}
              alt="Multibiotic"
              className="relative w-72 md:w-96 drop-shadow-2xl rounded-2xl"
            />
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 0.5 }}
              className="absolute -right-4 top-10 glass rounded-xl p-3 text-xs"
            >
              <span className="text-mint font-bold">50 млрд КОЕ</span>
              <br />18 штаммов
            </motion.div>
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 1 }}
              className="absolute -left-4 bottom-20 glass rounded-xl p-3 text-xs"
            >
              <span className="text-gold font-bold">GMP • HALAL</span>
              <br />Made in Turkey
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      <Marquee />

      {/* About */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-mint text-sm tracking-[0.3em] uppercase mb-4">О бренде</p>
            <h2 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">
              Завод в Esenyurt,<br />офис в Казани
            </h2>
            <p className="text-muted leading-relaxed mb-6">
              Universe Pharma — турецкий производитель БАДов премиум-класса. Завод в Стамбуле
              (Esenyurt), представительство в России (Казань). Продукты без диоксида титана,
              ГМО и вредных добавок.
            </p>
            <div className="grid grid-cols-3 gap-6">
              {[
                { val: '150+', label: 'SKU' },
                { val: 'GMP', label: 'Сертификат' },
                { val: '2', label: 'Маркетплейса' },
              ].map((s) => (
                <div key={s.label}>
                  <p className="font-display font-bold text-3xl text-mint">{s.val}</p>
                  <p className="text-xs text-muted uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl p-8 aspect-video flex items-center justify-center relative overflow-hidden"
          >
            <div className="absolute inset-0 gradient-mesh" />
            <div className="relative text-center">
              <p className="font-display text-6xl font-bold text-mint/30">TR</p>
              <p className="text-sm text-muted mt-2">Gökevler Mah. Esenyurt/İstanbul</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products horizontal scroll */}
      <section className="py-32 bg-surface">
        <div className="max-w-7xl mx-auto px-6 mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl"
          >
            Наша линейка
          </motion.h2>
        </div>
        <div className="overflow-x-auto pb-8 px-6">
          <div className="flex gap-6 max-w-none w-max mx-auto px-6">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Marketplaces */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl md:text-5xl mb-16 text-center"
          >
            Маркетплейсы
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'Wildberries', color: '#CB11AB', metrics: [{ l: 'Карточек', v: '87' }, { l: 'CTR', v: '4.8%' }, { l: 'Отзывы', v: '4.7★' }] },
              { name: 'Ozon', color: '#005BFF', metrics: [{ l: 'Карточек', v: '63' }, { l: 'CTR', v: '3.9%' }, { l: 'Отзывы', v: '4.6★' }] },
            ].map((mp, i) => (
              <motion.div
                key={mp.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-3xl p-8"
              >
                <h3 className="font-display font-bold text-2xl mb-6" style={{ color: mp.color }}>{mp.name}</h3>
                <div className="grid grid-cols-3 gap-4">
                  {mp.metrics.map((m) => (
                    <div key={m.l}>
                      <p className="font-display font-bold text-2xl">{m.v}</p>
                      <p className="text-xs text-muted">{m.l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-32 px-6 bg-surface">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display font-bold text-4xl mb-16"
          >
            Категории
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-6 cursor-pointer hover:border-mint/30 transition-colors"
              >
                <span className="text-3xl mb-4 block">{cat.icon}</span>
                <h3 className="font-display font-semibold text-lg mb-1">{cat.name}</h3>
                <p className="text-sm text-muted">{cat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <p className="font-display font-bold text-xl mb-2">UNIVERSE PHARMA</p>
            <p className="text-sm text-muted">Turkish supplements for Russian marketplaces</p>
          </div>
          <div className="text-sm text-muted space-y-1">
            <p>info@universepharma.ru</p>
            <p>+7 (843) 245 62 00</p>
            <p>Esenyurt, Istanbul / Kazan, Russia</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
