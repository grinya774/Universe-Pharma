import { useCallback, useState } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  type Node,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import N8nNode from './N8nNode'
import NodeDetailPanel from './NodeDetailPanel'
import { workflowNodes, workflowEdges } from '../../data/workflowTree'

const nodeTypes = { n8n: N8nNode }

function enrichNodes(selectedId: string | null, completed: Set<string>): Node[] {
  return workflowNodes.map((n) => ({
    ...n,
    data: {
      nodeId: (n.data as { nodeId: string }).nodeId,
      selected: (n.data as { nodeId: string }).nodeId === selectedId,
      completed: completed.has((n.data as { nodeId: string }).nodeId),
    },
  }))
}

export default function WorkflowCanvas() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [, setCompleted] = useState<Set<string>>(new Set())
  const [nodes, setNodes, onNodesChange] = useNodesState(enrichNodes(null, new Set()))
  const [edges, , onEdgesChange] = useEdgesState(workflowEdges)
  const [panelOpen, setPanelOpen] = useState(false)

  const selectNode = useCallback(
    (nodeId: string) => {
      setSelectedId(nodeId)
      setCompleted((prev) => {
        const next = new Set([...prev, nodeId])
        setNodes(enrichNodes(nodeId, next))
        return next
      })
      setPanelOpen(true)
    },
    [setNodes],
  )

  const onNodeClick = useCallback(
    (_: unknown, node: Node) => {
      const id = (node.data as { nodeId: string }).nodeId
      selectNode(id)
    },
    [selectNode],
  )

  return (
    <div className="flex flex-col md:flex-row h-full min-h-0">
      <div className="flex-1 min-h-[45dvh] md:min-h-0 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.15 }}
          defaultViewport={{ x: 0, y: 0, zoom: 0.55 }}
          proOptions={{ hideAttribution: true }}
          panOnDrag
          zoomOnScroll
          minZoom={0.25}
          maxZoom={1.2}
          nodesDraggable={false}
        >
          <Background color="#333" gap={16} size={1} />
          <Controls className="!bg-surface !border-white/10 !rounded-lg [&>button]:!bg-surface-2 [&>button]:!text-white" />
        </ReactFlow>
        <p className="absolute bottom-2 left-2 right-2 text-center text-[10px] text-muted pointer-events-none md:hidden">
          Нажмите на узел ↓
        </p>
      </div>

      {/* Desktop panel */}
      <div className="hidden md:block w-72 flex-shrink-0">
        <NodeDetailPanel nodeId={selectedId} />
      </div>

      {/* Mobile bottom sheet */}
      {panelOpen && selectedId && (
        <div className="md:hidden fixed inset-x-0 bottom-[calc(3.5rem+env(safe-area-inset-bottom))] z-40 max-h-[50dvh] rounded-t-2xl border-t border-white/10 shadow-2xl overflow-hidden">
          <NodeDetailPanel nodeId={selectedId} onClose={() => setPanelOpen(false)} />
        </div>
      )}
    </div>
  )
}
