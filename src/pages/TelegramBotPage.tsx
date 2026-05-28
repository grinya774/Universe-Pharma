import { useState } from 'react'
import PageShell from '../components/PageShell'
import IPhoneFrame from '../components/telegram/IPhoneFrame'
import TelegramChat from '../components/telegram/TelegramChat'
import { botIntro } from '../data/telegramBot'

export default function TelegramBotPage() {
  const [chatKey, setChatKey] = useState(0)

  return (
    <PageShell noPadding className="flex flex-col !pb-0 md:!pb-0">
      {/* Mobile: нативный полноэкранный Telegram */}
      <div className="md:hidden flex flex-col flex-1 min-h-0 bg-[#0e1621]">
        <div className="flex items-center justify-between px-4 py-2 bg-[#17212b] border-b border-white/5 flex-shrink-0 pt-[env(safe-area-inset-top)]">
          <div>
            <p className="text-white text-sm font-medium">Universe Pharma Bot</p>
            <p className="text-[#6ab2f2] text-[10px]">@universepharma • demo</p>
          </div>
          <button
            type="button"
            onClick={() => setChatKey((k) => k + 1)}
            className="text-xs bg-[#2AABEE] text-white px-3 py-1.5 rounded-full"
          >
            ↺ Сброс
          </button>
        </div>
        <div className="flex-1 min-h-0">
          <TelegramChat key={`m-${chatKey}`} autoPlay />
        </div>
      </div>

      {/* Desktop: описание + iPhone mockup */}
      <div className="hidden md:block px-6 py-12 gradient-mesh flex-1">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-mint text-sm tracking-[0.3em] uppercase mb-4">Telegram Bot</p>
            <h1 className="font-display font-bold text-4xl md:text-5xl mb-6 leading-tight">
              Бот для подписчиков<br />
              <span className="text-mint">@universepharma</span>
            </h1>
            <p className="text-muted leading-relaxed mb-8 max-w-lg">
              {botIntro.tagline}. Бот советует витамины, направляет на Ozon и Wildberries,
              проводит розыгрыши среди {botIntro.subscribers} подписчиков{' '}
              <a href={botIntro.channelUrl} target="_blank" rel="noopener noreferrer" className="text-[#6ab2f2]">
                {botIntro.channel}
              </a>
            </p>
            <button
              type="button"
              onClick={() => setChatKey((k) => k + 1)}
              className="px-6 py-3 bg-[#2AABEE] text-white font-semibold rounded-full"
            >
              ▶ Перезапустить демо
            </button>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute -inset-8 bg-[#2AABEE]/10 rounded-full blur-3xl" />
              <IPhoneFrame>
                <TelegramChat key={`d-${chatKey}`} autoPlay />
              </IPhoneFrame>
            </div>
          </div>
        </div>
      </div>
    </PageShell>
  )
}
