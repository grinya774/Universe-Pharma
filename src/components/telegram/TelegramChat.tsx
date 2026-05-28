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
import {
  surveyQuestions,
  scoreProducts,
  getRecommendationText,
  surveyButtons,
} from '../../data/telegramSurvey'

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
  const [surveyStep, setSurveyStep] = useState<number | null>(null)
  const [surveyAnswers, setSurveyAnswers] = useState<Record<string, boolean>>({})
  const scrollRef = useRef<HTMLDivElement>(null)
  const timeoutsRef = useRef<number[]>([])

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
    })
  }

  const clearTimeouts = () => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }

  const addBotMessage = (msg: BotMessage) => {
    setMessages((prev) => [...prev, { id: msg.id + Date.now(), from: 'bot', message: msg }])
    if (msg.buttons) setActiveButtons(msg.buttons)
    scrollToBottom()
  }

  const playMessages = useCallback((msgs: BotMessage[]) => {
    clearTimeouts()
    setTyping(true)
    setActiveButtons([])
    setSurveyStep(null)

    let cumulative = 300
    msgs.forEach((msg, idx) => {
      const t = window.setTimeout(() => {
        setTyping(false)
        addBotMessage(msg)
        if (idx < msgs.length - 1) setTimeout(() => setTyping(true), 200)
      }, cumulative)
      timeoutsRef.current.push(t)
      cumulative += (msg.delay ?? 700) + 350
    })
  }, [])

  const goToMenu = () => {
    setSurveyStep(null)
    setSurveyAnswers({})
    playMessages(demoScenarios.start)
  }

  const finishSurvey = (answers: Record<string, boolean>) => {
    setSurveyStep(null)
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      const ids = scoreProducts(answers)
        const topId = ids[0] ?? 'omega'
        const product = products.find((p) => p.id === topId) ?? products[0]
        addBotMessage({
          id: 'survey-result-text',
          type: 'text',
          text: getRecommendationText(ids),
          delay: 0,
        })
        setTimeout(() => {
          addBotMessage({
            id: 'survey-result-product',
            type: 'product',
            productId: product.id,
            text: '⭐ Ваш персональный подбор:',
            marketplace: 'ozon',
            price: 'от 890 ₽',
            buttons: [
              { label: '🛒 Заказать на Ozon', action: 'scenario' },
              { label: '🟣 Заказать на WB', action: 'scenario' },
              { label: '🩺 Пройти заново', action: 'survey' },
              { label: '◀️ Главное меню', action: 'menu' },
            ],
          })
        }, 800)
      }, 600)
  }

  const askSurveyQuestion = (step: number, answers: Record<string, boolean>) => {
    if (step >= surveyQuestions.length) {
      finishSurvey(answers)
      return
    }

    const q = surveyQuestions[step]
    setSurveyStep(step)
    setTyping(true)
    setTimeout(() => {
      setTyping(false)
      addBotMessage({
        id: `survey-q-${q.id}`,
        type: 'text',
        text: `Вопрос ${step + 1}/${surveyQuestions.length}\n\n${q.text}`,
        buttons: surveyButtons(q.id),
      })
    }, 500)
  }

  const startSurvey = () => {
    setSurveyAnswers({})
    setMessages((prev) => [
      ...prev,
      { id: `user-survey-${Date.now()}`, from: 'user', message: { id: 'u', type: 'text', text: '🩺 Подбор по симптомам' } },
    ])
    setActiveButtons([])
    setTimeout(() => {
      setTyping(true)
      setTimeout(() => {
        setTyping(false)
        addBotMessage({
          id: 'survey-intro',
          type: 'text',
          text: '🩺 Анкета займёт 1 минуту.\n\nОтветьте «Да» или «Нет» — подберём БАДы под ваши симптомы.',
          delay: 0,
        })
        setTimeout(() => askSurveyQuestion(0, {}), 700)
      }, 400)
    }, 300)
  }

  const handleButton = (label: string) => {
    const userText = userMessages[label] ?? label
    setMessages((prev) => [
      ...prev,
      { id: `user-${Date.now()}`, from: 'user', message: { id: 'user', type: 'text', text: userText } },
    ])
    setActiveButtons([])
    scrollToBottom()

    if (label.includes('Главное меню') || label.includes('Меню')) {
      setTimeout(goToMenu, 400)
      return
    }

    if (label.includes('заново') || (label.includes('🩺') && label.includes('симптом'))) {
      setTimeout(startSurvey, 400)
      return
    }

    if (surveyStep !== null && (label.includes('Да') || label.includes('Нет'))) {
      const q = surveyQuestions[surveyStep]
      const answer = label.includes('✅') || (label.includes('Да') && !label.includes('Нет'))
      const newAnswers = { ...surveyAnswers, [q.id]: answer }
      setSurveyAnswers(newAnswers)
      setTimeout(() => askSurveyQuestion(surveyStep + 1, newAnswers), 500)
      return
    }

    if (label.includes('симптом') || label.includes('🩺')) {
      setTimeout(startSurvey, 400)
      return
    }

    const scenario = getScenarioKey(label)
    if (scenario === 'menu') {
      setTimeout(goToMenu, 400)
      return
    }
    if (scenario === 'survey') {
      setTimeout(startSurvey, 400)
      return
    }
    const scenarioMsgs = demoScenarios[scenario] ?? demoScenarios.vitamins
    setTimeout(() => playMessages(scenarioMsgs), 500)
  }

  useEffect(() => {
    if (autoPlay) playMessages(demoScenarios.start)
    return clearTimeouts
  }, [autoPlay, playMessages])

  return (
    <div className="flex flex-col h-full bg-[#0e1621]">
      <div className="flex items-center justify-between px-6 pt-12 pb-1 text-[10px] text-white/80">
        <span>9:41</span>
        <span>🔋</span>
      </div>

      <div className="flex items-center gap-3 px-3 py-2 bg-[#17212b] border-b border-white/5">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-mint to-[#1a8a6a] flex items-center justify-center text-sm font-bold text-white">
          UP
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white text-sm font-medium truncate">{botIntro.name}</p>
          <p className="text-[#6ab2f2] text-[10px]">bot • online</p>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        <div className="flex justify-center mb-2">
          <div className="bg-[#182533] rounded-xl px-3 py-2 text-center">
            <p className="text-white text-xs font-medium">{botIntro.channel}</p>
            <p className="text-[10px] text-white/50">{botIntro.subscribers} подписчиков</p>
          </div>
        </div>

        <AnimatePresence>
          {messages.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${item.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {item.from === 'bot' ? (
                <BotBubble message={item.message} />
              ) : (
                <div className="max-w-[80%] bg-[#2b5278] rounded-2xl rounded-br-sm px-3 py-2">
                  <p className="text-white text-[13px]">{item.message.text}</p>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {typing && (
          <div className="flex justify-start">
            <div className="bg-[#182533] rounded-2xl px-4 py-3 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/40"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {activeButtons.length > 0 && (
        <div className="px-2 pb-1">
          <div className="grid grid-cols-2 gap-1.5">
            {activeButtons.map((btn, i) => {
              const isMenu = btn.label.includes('Главное меню')
              const isWide = isMenu || btn.label.includes('симптом') || btn.label.includes('заново')
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleButton(btn.label)}
                  className={`py-2.5 rounded-lg text-[12px] font-medium ${
                    isMenu
                      ? 'col-span-2 bg-[#2AABEE]/20 text-[#6ab2f2] border border-[#2AABEE]/30'
                      : isWide
                        ? 'col-span-2 bg-[#182533] text-[#6ab2f2]'
                        : 'bg-[#182533] text-[#6ab2f2]'
                  }`}
                >
                  {btn.label}
                </button>
              )
            })}
          </div>
        </div>
      )}

      <div className="flex items-center gap-2 px-3 py-2 bg-[#17212b] border-t border-white/5">
        <div className="flex-1 bg-[#0e1621] rounded-full px-4 py-1.5">
          <span className="text-white/30 text-[13px]">Сообщение</span>
        </div>
      </div>
    </div>
  )
}

function BotBubble({ message }: { message: BotMessage }) {
  const product =
    products.find((p) => p.id === message.productId) ?? products[0]
  const mpColor = message.marketplace === 'wb' ? '#CB11AB' : message.marketplace === 'ozon' ? '#005BFF' : undefined

  if (message.type === 'product') {
    return (
      <div className="max-w-[85%] bg-[#182533] rounded-2xl rounded-bl-sm overflow-hidden">
        {message.text && <p className="px-3 pt-2 text-white text-[13px]">{message.text}</p>}
        <div className="p-2">
          <img src={product.image} alt={product.nameRu} className="w-full rounded-lg" />
          <div className="px-2 py-2">
            <p className="text-white text-[13px] font-medium">{product.nameRu}</p>
            <p className="text-white/50 text-[11px]">{product.badge}</p>
            {message.price && (
              <div className="flex justify-between mt-1">
                <span className="text-mint text-sm font-bold">{message.price}</span>
                {mpColor && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full text-white" style={{ background: mpColor }}>
                    {message.marketplace === 'wb' ? 'WB' : 'Ozon'}
                  </span>
                )}
              </div>
            )}
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
