import { useCallback, useEffect } from 'react'
import {
  ReactFlow,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import N8nNode from './N8nNode'
import { workflowNodes, workflowEdges, nodePayloads } from '../../data/workflowNodes'

const nodeTypes = { n8n: N8nNode }

interface Props {
  running: boolean
  onComplete: () => void
}

export default function WorkflowCanvas({ running, onComplete }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState(workflowNodes)
  const [edges, setEdges, onEdgesChange] = useEdgesState(workflowEdges)

  const reset = useCallback(() => {
    setNodes(workflowNodes.map((n) => ({ ...n, data: { ...n.data, active: false, payload: undefined } })))
    setEdges(workflowEdges.map((e) => ({ ...e, animated: false, style: {} })))
  }, [setNodes, setEdges])

  useEffect(() => {
    if (!running) {
      reset()
      return
    }

    let i = 0
    const ids = workflowNodes.map((n) => n.id)

    const tick = () => {
      if (i >= ids.length) {
        onComplete()
        return
      }

      const currentId = ids[i]

      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: {
            ...n.data,
            active: n.id === currentId,
            payload: n.id === currentId ? nodePayloads[n.id] : undefined,
          },
        })),
      )

      setEdges((eds) =>
        eds.map((e, idx) => ({
          ...e,
          animated: idx < i,
          style: idx < i ? { stroke: '#2dd4a8', strokeWidth: 2 } : {},
        })),
      )

      i++
      setTimeout(tick, 800)
    }

    tick()
  }, [running, onComplete, reset, setNodes, setEdges])

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.1 }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.35 }}
        proOptions={{ hideAttribution: true }}
        panOnDrag
        zoomOnScroll
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background color="#333" gap={20} size={1} />
        <Controls className="!bg-surface !border-white/10 !rounded-lg [&>button]:!bg-surface-2 [&>button]:!border-white/10 [&>button]:!text-white" />
      </ReactFlow>
    </div>
  )
}
