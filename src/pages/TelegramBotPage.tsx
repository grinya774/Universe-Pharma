import { useState } from 'react'
import { motion } from 'framer-motion'
import Nav from '../components/Nav'
import IPhoneFrame from '../components/telegram/IPhoneFrame'
import TelegramChat from '../components/telegram/TelegramChat'
import { botIntro } from '../data/telegramBot'

export default function TelegramBotPage() {
  const [chatKey, setChatKey] = useState(0)

  const restartDemo = () => setChatKey((k) => k + 1)

  return (
    <div className="min-h-screen pt-16 gradient-mesh">
      <Nav />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: description */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-mint text-sm tracking-[0.3em] uppercase mb-4"
            >
              Telegram Bot
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight"
            >
              Бот для подписчиков<br />
              <span className="text-mint">@universepharma</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-muted leading-relaxed mb-8 max-w-lg"
            >
              {botIntro.tagline}. Бот советует витамины, направляет на Ozon и Wildberries,
              проводит розыгрыши среди {botIntro.subscribers} подписчиков канала{' '}
              <a
                href={botIntro.channelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#6ab2f2] hover:underline"
              >
                {botIntro.channel}
              </a>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4 mb-8"
            >
              {[
                { icon: '💊', title: 'Подборка витаминов', desc: 'Персональные рекомендации по SKU' },
                { icon: '🛒', title: 'Ozon & Wildberries', desc: 'Ссылки на товары с ценами и отзывами' },
                { icon: '🎁', title: 'Розыгрыши', desc: 'Призы для подписчиков канала каждую неделю' },
                { icon: '🔔', title: 'Напоминания', desc: 'О приёме БАДов и новых акциях' },
              ].map((f, i) => (
                <div key={i} className="flex items-start gap-4 glass rounded-xl p-4">
                  <span className="text-2xl">{f.icon}</span>
                  <div>
                    <p className="font-medium text-sm">{f.title}</p>
                    <p className="text-xs text-muted">{f.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

            <button
              onClick={restartDemo}
              className="px-6 py-3 bg-[#2AABEE] text-white font-semibold rounded-full hover:bg-[#229ED9] transition-colors"
            >
              ▶ Перезапустить демо
            </button>
          </div>

          {/* Right: iPhone mockup */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div className="absolute -inset-8 bg-[#2AABEE]/10 rounded-full blur-3xl" />
              <IPhoneFrame>
                <TelegramChat key={chatKey} autoPlay />
              </IPhoneFrame>
            </div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { val: '205+', label: 'Подписчиков канала' },
            { val: '4', label: 'Сценария бота' },
            { val: 'WB + Ozon', label: 'Интеграция маркетплейсов' },
            { val: '24/7', label: 'Автоответы' },
          ].map((s) => (
            <div key={s.label} className="glass rounded-2xl p-6 text-center">
              <p className="font-display font-bold text-2xl text-mint mb-1">{s.val}</p>
              <p className="text-xs text-muted">{s.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
