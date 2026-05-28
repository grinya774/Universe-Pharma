import PageShell from '../components/PageShell'
import WorkflowCanvas from '../components/n8n/WorkflowCanvas'

export default function AutomationPage() {
  return (
    <PageShell noPadding className="flex flex-col h-[100dvh] bg-[#1a1a2e] !pt-[calc(3.5rem+env(safe-area-inset-top))] !pb-[calc(3.5rem+env(safe-area-inset-bottom))] md:!pb-0">
      <div className="px-3 py-2 bg-[#252538] border-b border-white/10 flex-shrink-0">
        <p className="text-xs font-medium">Дерево решений — автоматизация завода</p>
        <p className="text-[10px] text-muted">Нажмите узел → бизнес-результат шага</p>
      </div>
      <div className="flex-1 min-h-0">
        <WorkflowCanvas />
      </div>
    </PageShell>
  )
}
