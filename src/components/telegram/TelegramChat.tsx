import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { products } from '../../lib/products'
import {
  botIntro,
  demoScenarios,
  userMessages,
  getScenarioKey,
  type BotMessage,
  type BotButton,
} from '../../data/telegramBot'

interface ChatItem {
  id: string
  from: 'bot' | 'user'
  message: BotMessage
}

interface Props {
  autoPlay?: boolean
}

export default function TelegramChat({ autoPlay = true }: Props) {
  const [messages, setMessages] = useState<ChatItem[]>([])
  const [typing, setTyping] = useState(false)
  const [activeButtons, setActiveButtons] = useState<BotButton[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<number[]>([])

  const featuredProduct = products.find((p) => p.id === 'iron') ?? products[0]

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    })
  }

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const playMessages = useCallback((msgs: BotMessage[]) => {
    clearTimeouts()
    setTyping(true)
    setActiveButtons([])

    let cumulative = 300
    msgs.forEach((msg) => {
      const t = window.setTimeout(() => {
        setTyping(false)
        setMessages((prev) => [...prev, { id: msg.id, from: 'bot', message: msg }])
        if (msg.buttons) setActiveButtons(msg.buttons)
        scrollToBottom()
        if (msgs.indexOf(msg) < msgs.length - 1) {
          setTimeout(() => setTyping(true), 200)
        }
      }, cumulative)
      timeoutsRef.current.push(t)
      cumulative += (msg.delay ?? 800) + 400
    })
  }, [])

  const handleButton = (label: string) => {
    const userText = userMessages[label] ?? label
    setMessages((prev) => [
      ...prev,
      {
        id: `user-${Date.now()}`,
        from: 'user',
        message: { id: 'user', type: 'text', text: userText },
      },
    ])
    setActiveButtons([])
    scrollToBottom()

    const scenario = getScenarioKey(label)
    const scenarioMsgs = demoScenarios[scenario] ?? demoScenarios.vitamins
    setTimeout(() => playMessages(scenarioMsgs), 600)
  }

  useEffect(() => {
    if (autoPlay) {
      playMessages(demoScenarios.start)
    }
    return clearTimeouts
  }, [autoPlay, playMessages])

  return (
    <div className="flex flex-col h-full bg-[#0e1621]">
      {/* Status bar */}
      <div className="flex items-center justify-between px-6 pt-12 pb-1 text-[10px] text-white/80">
        <span>9:41</span>
        <div className="flex gap-1 items-center">
          <span>●●●●</span>
          <span>WiFi</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Telegram header */}
      <div className="flex items-center gap-3 px-3 py-2 bg-[#17212b] border-b border-white/5">
        <button type="button" className="text-[#6ab2f2] text-sm">‹ Назад</button>
        <div className="flex-1 flex items-center gap-2 min-w-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-mint to-[#1a8a6a] flex items-center justify-center text-sm font-bold text-white flex-shrink-0">
            UP
          </div>
          <div className="min-w-0">
            <p className="text-white text-sm font-medium truncate">{botIntro.name}</p>
            <p className="text-[#6ab2f2] text-[10px]">bot • online</p>
          </div>
        </div>
        <span className="text-white/40 text-lg">⋮</span>
      </div>

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        <div className="flex justify-center mb-3">
          <div className="bg-[#182533] rounded-xl px-3 py-2 text-center max-w-[260px]">
            <p className="text-[10px] text-[#6ab2f2] mb-0.5">📢 Канал</p>
            <p className="text-white text-xs font-medium">{botIntro.channel}</p>
            <p className="text-[10px] text-white/50">{botIntro.subscribers} подписчиков</p>
          </div>
        </div>

        <AnimatePresence>
          {messages.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.25 }}
              className={`flex ${item.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {item.from === 'bot' ? (
                <BotBubble message={item.message} product={featuredProduct} />
              ) : (
                <div className="max-w-[75%] bg-[#2b5278] rounded-2xl rounded-br-sm px-3 py-2">
                  <p className="text-white text-[13px] leading-relaxed whitespace-pre-line">
                    {item.message.text}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-[#182533] rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/40"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {activeButtons.length > 0 && (
        <div className="px-2 pb-1 space-y-1">
          {activeButtons.map((btn, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleButton(btn.label)}
              className="w-full py-2 bg-[#182533] hover:bg-[#1f2d3d] rounded-lg text-[#6ab2f2] text-[13px] font-medium transition-colors"
            >
              {btn.emoji && `${btn.emoji} `}{btn.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-2 px-3 py-2 bg-[#17212b] border-t border-white/5">
        <span className="text-white/30 text-lg">📎</span>
        <div className="flex-1 bg-[#0e1621] rounded-full px-4 py-1.5">
          <span className="text-white/30 text-[13px]">Сообщение</span>
        </div>
        <span className="text-white/30 text-lg">🎤</span>
      </div>
    </div>
  )
}

function BotBubble({
  message,
  product,
}: {
  message: BotMessage
  product: typeof products[0]
}) {
  const mpColor = message.marketplace === 'wb' ? '#CB11AB' : message.marketplace === 'ozon' ? '#005BFF' : undefined

  if (message.type === 'giveaway') {
    return (
      <div className="max-w-[85%] bg-[#182533] rounded-2xl rounded-bl-sm overflow-hidden">
        <div className="bg-gradient-to-r from-gold/30 to-mint/20 px-3 py-2">
          <p className="text-gold text-xs font-bold">🎁 РОЗЫГРЫШ</p>
        </div>
        <div className="px-3 py-2">
          <p className="text-white text-[13px] leading-relaxed whitespace-pre-line">{message.text}</p>
        </div>
      </div>
    )
  }

  if (message.type === 'product') {
    return (
      <div className="max-w-[85%] bg-[#182533] rounded-2xl rounded-bl-sm overflow-hidden">
        {message.text && (
          <div className="px-3 pt-2">
            <p className="text-white text-[13px]">{message.text}</p>
          </div>
        )}
        <div className="p-2">
          <div className="bg-[#0e1621] rounded-xl overflow-hidden">
            <img src={product.image} alt={product.nameRu} className="w-full h-28 object-contain bg-white/5 p-2" />
            <div className="px-3 py-2">
              <p className="text-white text-[13px] font-medium">{product.nameRu}</p>
              <p className="text-white/50 text-[11px]">{product.badge}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-mint text-sm font-bold">{message.price}</span>
                {mpColor && (
                  <span
                    className="text-[10px] px-2 py-0.5 rounded-full text-white font-medium"
                    style={{ background: mpColor }}
                  >
                    {message.marketplace === 'wb' ? 'Wildberries' : 'Ozon'}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[85%] bg-[#182533] rounded-2xl rounded-bl-sm px-3 py-2">
      <p className="text-white text-[13px] leading-relaxed whitespace-pre-line">{message.text}</p>
    </div>
  )
}
