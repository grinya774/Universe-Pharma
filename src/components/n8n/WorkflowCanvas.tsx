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
import {
  workflowNodes,
  workflowEdges,
  nodePayloads,
  executionSteps,
} from '../../data/workflowNodes'

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

    let stepIndex = 0
    const completedEdges = new Set<string>()

    const highlightNodes = (activeIds: string[]) => {
      setNodes((nds) =>
        nds.map((n) => ({
          ...n,
          data: {
            ...n.data,
            active: activeIds.includes(n.id),
            payload: activeIds.includes(n.id) ? nodePayloads[n.id] : undefined,
          },
        })),
      )
    }

    const tick = () => {
      if (stepIndex >= executionSteps.length) {
        onComplete()
        return
      }

      const activeIds = executionSteps[stepIndex]
      highlightNodes(activeIds)

      // Подсветить входящие рёбра к активным узлам
      setEdges((eds) =>
        eds.map((e) => {
          const targetActive = activeIds.includes(e.target)
          const shouldAnimate = targetActive || completedEdges.has(e.id)
          if (targetActive) completedEdges.add(e.id)
          return {
            ...e,
            animated: shouldAnimate,
            style: shouldAnimate ? { stroke: '#2dd4a8', strokeWidth: 2 } : {},
          }
        }),
      )

      stepIndex++
      setTimeout(tick, 900)
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
        fitViewOptions={{ padding: 0.08 }}
        defaultViewport={{ x: 0, y: 0, zoom: 0.28 }}
        proOptions={{ hideAttribution: true }}
        panOnDrag
        zoomOnScroll
        minZoom={0.15}
        maxZoom={1.2}
      >
        <Background color="#333" gap={20} size={1} />
        <Controls className="!bg-surface !border-white/10 !rounded-lg [&>button]:!bg-surface-2 [&>button]:!border-white/10 [&>button]:!text-white" />
      </ReactFlow>
    </div>
  )
}
