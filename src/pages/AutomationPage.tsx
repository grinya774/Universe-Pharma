import { useState, useCallback } from 'react'
import Nav from '../components/Nav'
import WorkflowCanvas from '../components/n8n/WorkflowCanvas'

export default function AutomationPage() {
  const [running, setRunning] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [toast, setToast] = useState(false)

  const handleExecute = () => {
    if (running) return
    setCompleted(false)
    setToast(false)
    setRunning(true)
  }

  const handleComplete = useCallback(() => {
    setRunning(false)
    setCompleted(true)
    setToast(true)
    setTimeout(() => setToast(false), 5000)
  }, [])

  return (
    <div className="h-screen flex flex-col bg-[#1a1a2e] overflow-hidden">
      <Nav />

      {/* Top bar */}
      <div className="mt-16 flex items-center justify-between px-4 py-2 bg-[#252538] border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">Universe Pharma — Factory Pipeline</span>
          <span className="text-xs text-muted px-2 py-0.5 bg-white/5 rounded">
            {completed ? 'Success' : running ? 'Running…' : 'Idle'}
          </span>
        </div>
        <button
          onClick={handleExecute}
          disabled={running}
          className={`px-5 py-1.5 rounded text-sm font-medium transition-all ${
            running
              ? 'bg-orange-500/50 cursor-not-allowed'
              : 'bg-[#ff6d5a] hover:bg-[#ff8577] cursor-pointer'
          } text-white`}
        >
          {running ? '⏳ Running…' : '▶ Execute Workflow'}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-48 bg-[#252538] border-r border-white/10 p-4 flex-shrink-0 hidden md:block">
          <p className="text-xs text-muted uppercase tracking-wider mb-4">Menu</p>
          {['Workflows', 'Executions', 'Credentials', 'Settings'].map((item, i) => (
            <div
              key={item}
              className={`text-sm py-2 px-3 rounded mb-1 cursor-pointer ${
                i === 0 ? 'bg-white/10 text-white' : 'text-muted hover:text-white hover:bg-white/5'
              }`}
            >
              {item}
            </div>
          ))}
          <div className="mt-8 pt-4 border-t border-white/10">
            <p className="text-[10px] text-muted">Last run: {completed ? 'just now' : '2s ago'}</p>
            <p className="text-[10px] text-muted">10 nodes • {completed ? 'Success ✓' : '—'}</p>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <WorkflowCanvas running={running} onComplete={handleComplete} />
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 bg-mint text-bg px-6 py-4 rounded-xl shadow-2xl z-50 animate-pulse">
          <p className="font-semibold">✓ Workflow completed</p>
          <p className="text-sm opacity-80">12 карточек обновлены на WB и Ozon</p>
        </div>
      )}
    </div>
  )
}
