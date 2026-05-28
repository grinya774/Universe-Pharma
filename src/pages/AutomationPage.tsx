import { useState, useCallback } from 'react'
import PageShell from '../components/PageShell'
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
    <PageShell noPadding className="flex flex-col h-[100dvh] bg-[#1a1a2e] !pt-[calc(3.5rem+env(safe-area-inset-top))] !pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:!pb-0">
      <div className="flex items-center justify-between px-3 py-2 bg-[#252538] border-b border-white/10 flex-shrink-0">
        <div className="min-w-0">
          <p className="text-xs font-medium truncate">Factory Pipeline</p>
          <p className="text-[10px] text-muted">
            {completed ? '✓ Success' : running ? 'Running…' : 'Idle'}
          </p>
        </div>
        <button
          type="button"
          onClick={handleExecute}
          disabled={running}
          className={`px-4 py-2 rounded-lg text-xs font-medium flex-shrink-0 ${
            running ? 'bg-orange-500/50' : 'bg-[#ff6d5a]'
          } text-white`}
        >
          {running ? '⏳' : '▶ Run'}
        </button>
      </div>

      <div className="flex-1 min-h-0 relative">
        <WorkflowCanvas running={running} onComplete={handleComplete} />
      </div>

      {toast && (
        <div className="fixed bottom-[calc(4rem+env(safe-area-inset-bottom))] left-4 right-4 md:left-auto md:right-6 md:bottom-6 md:w-auto bg-mint text-bg px-4 py-3 rounded-xl shadow-2xl z-50 text-sm">
          <p className="font-semibold">✓ Workflow completed</p>
          <p className="text-xs opacity-80">12 карточек на WB и Ozon</p>
        </div>
      )}
    </PageShell>
  )
}
