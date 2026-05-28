import { workflowNodeDetails } from '../../data/workflowTree'

interface Props {
  nodeId: string | null
  onClose?: () => void
}

export default function NodeDetailPanel({ nodeId, onClose }: Props) {
  if (!nodeId) {
    return (
      <div className="h-full flex items-center justify-center p-4 text-center">
        <p className="text-sm text-muted">
          Нажмите на узел дерева — увидите бизнес-результат этого шага
        </p>
      </div>
    )
  }

  const info = workflowNodeDetails[nodeId]
  if (!info) return null

  return (
    <div className="h-full overflow-y-auto p-4 bg-[#1e1e2e] border-l border-white/10">
      {onClose && (
        <button type="button" onClick={onClose} className="text-mint text-sm mb-3 md:hidden">
          ← Закрыть
        </button>
      )}
      <div className="flex items-center gap-2 mb-3">
        <span className="text-2xl">{info.icon}</span>
        <div>
          <p className="text-[10px] text-muted uppercase">{info.kind}</p>
          <h3 className="font-semibold text-white text-sm">{info.label}</h3>
        </div>
      </div>

      <p className="text-sm text-white/90 leading-relaxed mb-4">{info.businessValue}</p>

      <div className="space-y-2 mb-4">
        {info.metrics.map((m) => (
          <div key={m.label} className="flex justify-between glass rounded-lg px-3 py-2">
            <span className="text-xs text-muted">{m.label}</span>
            <span className="text-xs font-semibold text-mint">{m.value}</span>
          </div>
        ))}
      </div>

      {info.outcome && (
        <div className="bg-mint/10 border border-mint/30 rounded-xl p-3">
          <p className="text-[10px] text-mint uppercase mb-1">Бизнес-ценность</p>
          <p className="text-sm text-white font-medium">{info.outcome}</p>
        </div>
      )}
    </div>
  )
}
