import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AutomationPage from './pages/AutomationPage'
import AICardsPage from './pages/AICardsPage'

export default function App() {
  return (
    <BrowserRouter basename="/Universe-Pharma">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/automation" element={<AutomationPage />} />
        <Route path="/ai-cards" element={<AICardsPage />} />
      </Routes>
    </BrowserRouter>
  )
}
