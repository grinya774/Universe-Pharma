import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const links = [
  { to: '/', label: 'Главная' },
  { to: '/automation', label: 'Автоматизация' },
  { to: '/ai-cards', label: 'AI Карточки' },
  { to: '/telegram-bot', label: 'Telegram Bot' },
]

export default function Nav() {
  const location = useLocation()
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-14 md:h-16 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-sm md:text-lg tracking-wider">
          UNIVERSE <span className="text-mint">PHARMA</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-wide transition-colors ${
                location.pathname === link.to ? 'text-mint' : 'text-muted hover:text-text'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-white p-2 -mr-2"
          onClick={() => setOpen(!open)}
          aria-label="Меню"
        >
          <span className="text-xl">{open ? '✕' : '☰'}</span>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-white/10 bg-bg/95 backdrop-blur-xl px-4 py-3 space-y-1">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block py-3 px-2 text-sm rounded-lg ${
                location.pathname === link.to ? 'text-mint bg-mint/10' : 'text-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
