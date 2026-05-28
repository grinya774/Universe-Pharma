import { memo } from 'react'
import { Handle, Position, type NodeProps } from '@xyflow/react'
import { workflowNodeDetails } from '../../data/workflowTree'

interface N8nNodeData {
  nodeId: string
  selected?: boolean
  completed?: boolean
}

function N8nNode({ data }: NodeProps) {
  const d = data as unknown as N8nNodeData
  const info = workflowNodeDetails[d.nodeId]
  if (!info) return null

  const selected = d.selected
  const completed = d.completed

  return (
    <div
      className={`rounded-xl overflow-hidden min-w-[140px] max-w-[160px] cursor-pointer transition-all duration-200 border-2 ${
        selected
          ? 'border-mint shadow-lg shadow-mint/30 scale-105'
          : completed
            ? 'border-mint/40'
            : 'border-transparent'
      }`}
      style={{ background: '#2d2d3a' }}
    >
      <Handle type="target" position={Position.Top} className="!bg-gray-500 !w-2 !h-2 !border-0" />
      <div className="flex items-stretch">
        <div className="w-1.5 flex-shrink-0" style={{ background: info.color }} />
        <div className="flex-1 px-2.5 py-2">
          <div className="flex items-center gap-1.5">
            <span className="text-sm">{info.icon}</span>
            <span className="text-[10px] font-medium text-white/90 leading-tight line-clamp-2">
              {info.label}
            </span>
          </div>
          {info.kind === 'decision' && (
            <span className="text-[8px] text-gold mt-1 block">◇ решение</span>
          )}
          {completed && !selected && (
            <span className="text-[8px] text-mint mt-0.5 block">✓</span>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-gray-500 !w-2 !h-2 !border-0" />
    </div>
  )
}

export default memo(N8nNode)
