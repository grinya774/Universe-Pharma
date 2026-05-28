import { Link, useLocation } from 'react-router-dom'

const tabs = [
  { to: '/', label: 'Главная', icon: '⌂' },
  { to: '/automation', label: 'n8n', icon: '⚡' },
  { to: '/ai-cards', label: 'AI', icon: '✨' },
  { to: '/telegram-bot', label: 'Bot', icon: '💬' },
]

export default function BottomNav() {
  const location = useLocation()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-white/10 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-14">
        {tabs.map((tab) => {
          const active = location.pathname === tab.to
          return (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center justify-center flex-1 h-full gap-0.5 transition-colors ${
                active ? 'text-mint' : 'text-muted'
              }`}
            >
              <span className="text-lg leading-none">{tab.icon}</span>
              <span className="text-[10px] font-medium">{tab.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
