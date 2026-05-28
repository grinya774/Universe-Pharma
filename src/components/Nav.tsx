import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/automation', label: 'Автоматизация' },
  { to: '/ai-cards', label: 'AI Карточки' },
  { to: '/telegram-bot', label: 'Telegram Bot' },
]

export default function Nav() {
  const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg tracking-wider">
          UNIVERSE <span className="text-mint">PHARMA</span>
        </Link>
        <div className="flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-wide transition-colors ${
                location.pathname === link.to
                  ? 'text-mint'
                  : 'text-muted hover:text-text'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}
