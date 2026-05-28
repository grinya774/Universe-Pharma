import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'

interface N8nNodeData {
  label: string
  icon: string
  color: string
  active?: boolean
  payload?: object
}

function N8nNode({ data }: NodeProps) {
  const d = data as unknown as N8nNodeData
  const active = d.active

  return (
    <div
      className={`rounded-lg overflow-hidden min-w-[180px] transition-all duration-300 ${
        active ? 'ring-2 ring-mint shadow-lg shadow-mint/20 scale-105' : ''
      }`}
      style={{ background: '#2d2d3a' }}
    >
      <Handle type="target" position={Position.Left} className="!bg-gray-500 !w-2 !h-2" />
      <div className="flex items-stretch">
        <div className="w-1.5 flex-shrink-0" style={{ background: d.color }} />
        <div className="flex-1 px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="text-base">{d.icon}</span>
            <span className="text-xs font-medium text-white/90 leading-tight">{d.label}</span>
          </div>
          {active && d.payload && (
            <pre className="mt-2 text-[9px] text-mint/80 bg-black/30 rounded p-1.5 overflow-hidden max-h-16 leading-tight">
              {JSON.stringify(d.payload, null, 0).slice(0, 120)}…
            </pre>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Right} className="!bg-gray-500 !w-2 !h-2" />
    </div>
  )
}

export default memo(N8nNode)
