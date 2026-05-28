import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AutomationPage from './pages/AutomationPage'
import AICardsPage from './pages/AICardsPage'

import TelegramBotPage from './pages/TelegramBotPage'

export default function App() {
  return (
    <BrowserRouter basename="/Universe-Pharma">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/automation" element={<AutomationPage />} />
        <Route path="/ai-cards" element={<AICardsPage />} />
        <Route path="/telegram-bot" element={<TelegramBotPage />} />
      </Routes>
    </BrowserRouter>
  )
}
