"use client"

import { useRef, useState } from "react"
import { useLanguage } from "@/components/language-provider"

interface NodeData {
  id: string
  letter: string
  label: string
  labelTh: string
  desc: string
  descTh: string
  color: string
  bg: string
  bgLight: string
  x: number
  y: number
  icon: string
}

const nodes: NodeData[] = [
  { id: "data", letter: "D", label: "Data", labelTh: "Data (ข้อมูล)", desc: "Raw data ingestion, validation, and quality scoring. The essential inputs and raw material that feed the entire system.", descTh: "การรับข้อมูลดิบ ตรวจสอบ และให้คะแนนคุณภาพ — Input ที่จำเป็นและวัตถุดิบหลักที่ป้อนเข้าระบบทั้งหมด", color: "#89B4C8", bg: "#DBEAFE", bgLight: "#EFF6FF", x: 120, y: 200, icon: "📊" },
  { id: "intent", letter: "I", label: "Intent", labelTh: "Intent (เจตนา)", desc: "The exponential amplifier — clarity of purpose that multiplies Data's power. Small changes in Intent create massive differences in output.", descTh: "ตัวขยายแบบ Exponential — ความชัดเจนของเป้าหมายที่ขยายพลังของ Data การเปลี่ยนแปลงเล็กน้อยใน Intent สร้างความแตกต่างมหาศาลในผลลัพธ์", color: "#C4745B", bg: "#FEE2E2", bgLight: "#FEF2F2", x: 380, y: 100, icon: "🎯" },
  { id: "architect", letter: "A", label: "Architect", labelTh: "Architect (สถาปนิก)", desc: "The Human-in-the-Loop — the guiding hand ensuring ethical, strategic, and effective application. Without human oversight, AI output lacks direction.", descTh: "Human-in-the-Loop — ผู้กำกับดูแลที่รับประกันการใช้ AI อย่างมีจริยธรรม เชิงกลยุทธ์ และมีประสิทธิภาพ หากไม่มีมนุษย์กำกับ ผลลัพธ์ AI จะไร้ทิศทาง", color: "#7B9E87", bg: "#D1FAE5", bgLight: "#ECFDF5", x: 380, y: 300, icon: "🏗️" },
  { id: "future", letter: "F", label: "Future", labelTh: "Future (อนาคต)", desc: "The ultimate outcome — the Future that is created and shaped by the entire FDIA pipeline. Not a prediction, but a result built through deliberate action.", descTh: "ผลลัพธ์สุดท้าย — Future (อนาคต) ที่ถูกสร้างและกำหนดโดย FDIA Pipeline ทั้งหมด ไม่ใช่การทำนาย แต่เป็นผลลัพธ์ที่สร้างจากการกระทำอย่างตั้งใจ", color: "#D4A853", bg: "#FEF3C7", bgLight: "#FFFBEB", x: 640, y: 200, icon: "🏛️" },
]

export default function FDIAFlowchart() {
  const { language } = useLanguage()
  const [activeNode, setActiveNode] = useState<string | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [announcement, setAnnouncement] = useState("")
  const isEn = language === "en"
  const svgW = 760
  const svgH = 400
  const nodeR = 44
  const nodeOrder = ["data", "intent", "architect", "future"]

  const touchStartX = useRef<number | null>(null)
  const touchStartY = useRef<number | null>(null)

  const handleTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0].clientX
    touchStartY.current = event.touches[0].clientY
  }

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return
    const dx = event.changedTouches[0].clientX - touchStartX.current
    const dy = event.changedTouches[0].clientY - touchStartY.current
    touchStartX.current = null
    touchStartY.current = null
    if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy)) return
    const currentIndex = activeNode ? nodeOrder.indexOf(activeNode) : -1
    if (dx < 0) {
      const nextNode = nodeOrder[(currentIndex + 1) % nodeOrder.length]
      setActiveNode(nextNode)
      setAnnouncement(isEn ? `Navigated to ${nextNode} node` : `ไปที่ node ${nextNode}`)
      return
    }
    const prevNode = nodeOrder[(currentIndex + nodeOrder.length - 1) % nodeOrder.length]
    setActiveNode(prevNode)
    setAnnouncement(isEn ? `Navigated to ${prevNode} node` : `ไปที่ node ${prevNode}`)
  }

  const connections = [
    { from: "data", to: "intent", label: isEn ? "Amplify" : "ขยาย", labelPos: { x: 240, y: 130 } },
    { from: "data", to: "architect", label: isEn ? "Guide" : "กำกับ", labelPos: { x: 240, y: 275 } },
    { from: "intent", to: "future", label: "D^I", labelPos: { x: 520, y: 130 } },
    { from: "architect", to: "future", label: "× A", labelPos: { x: 520, y: 275 } },
  ]

  const getPath = (fromId: string, toId: string) => {
    const from = nodes.find((node) => node.id === fromId)!
    const to = nodes.find((node) => node.id === toId)!
    const dx = to.x - from.x
    const cx1 = from.x + dx * 0.4
    const cx2 = from.x + dx * 0.6
    return `M ${from.x} ${from.y} C ${cx1} ${from.y}, ${cx2} ${to.y}, ${to.x} ${to.y}`
  }

  const isConnectionActive = (fromId: string, toId: string) => {
    if (!activeNode && !hoveredNode) return false
    const target = activeNode || hoveredNode
    return fromId === target || toId === target
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown": {
        event.preventDefault()
        const nextIndex = (focusedIndex + 1) % nodes.length
        setFocusedIndex(nextIndex)
        setHoveredNode(nodes[nextIndex].id)
        break
      }
      case "ArrowLeft":
      case "ArrowUp": {
        event.preventDefault()
        const nextIndex = (focusedIndex - 1 + nodes.length) % nodes.length
        setFocusedIndex(nextIndex)
        setHoveredNode(nodes[nextIndex].id)
        break
      }
      case "Enter":
      case " ":
        event.preventDefault()
        setActiveNode(nodes[focusedIndex].id)
        setAnnouncement(isEn ? `Selected ${nodes[focusedIndex].label} node` : `เลือก node ${nodes[focusedIndex].labelTh}`)
        break
      case "Escape":
        event.preventDefault()
        setActiveNode(null)
        setHoveredNode(null)
        setAnnouncement(isEn ? "Node deselected" : "ยกเลิกการเลือก node")
        break
    }
  }

  const renderNodeLabel = (node: NodeData) => {
    const label = isEn ? node.label : node.labelTh
    const parts = label.split(" ")
    if (parts.length <= 1) {
      return (
        <text x={node.x} y={node.y + 18} textAnchor="middle" dominantBaseline="middle" fill={node.color} fontFamily="var(--font-sans)" fontSize="11" fontWeight="500">
          {label}
        </text>
      )
    }

    const midpoint = Math.ceil(parts.length / 2)
    return (
      <text x={node.x} y={node.y + 13} textAnchor="middle" fill={node.color} fontFamily="var(--font-sans)" fontSize="10" fontWeight="500">
        <tspan x={node.x} dy="0">{parts.slice(0, midpoint).join(" ")}</tspan>
        <tspan x={node.x} dy="11">{parts.slice(midpoint).join(" ")}</tspan>
      </text>
    )
  }

  return (
    <div ref={containerRef} className="w-full" role="application" aria-label="FDIA Equation Flowchart" tabIndex={0} onKeyDown={handleKeyDown}>
      <div role="status" aria-live="polite" aria-atomic="true" className="sr-only">{announcement}</div>
      <div className="relative overflow-hidden rounded-2xl border border-warm-light-gray bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="h-auto w-full" style={{ minHeight: "280px" }}>
          <defs>
            {nodes.map((node) => (
              <marker key={`arrow-${node.id}`} id={`arrow-${node.id}`} viewBox="0 0 10 6" refX="10" refY="3" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 3 L 0 6 z" fill={node.color} opacity="0.6" />
              </marker>
            ))}
            <marker id="arrow-default" viewBox="0 0 10 6" refX="10" refY="3" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 3 L 0 6 z" fill="#D4D0C8" opacity="0.5" />
            </marker>
            {nodes.map((node) => (
              <filter key={`glow-${node.id}`} id={`glow-${node.id}`} x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feFlood floodColor={node.color} floodOpacity="0.25" result="color" />
                <feComposite in="color" in2="blur" operator="in" result="glow" />
                <feMerge>
                  <feMergeNode in="glow" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            ))}
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8E3DC" strokeWidth="0.5" opacity="0.3" />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />
          <text x={svgW / 2} y={svgH / 2} textAnchor="middle" dominantBaseline="middle" className="pointer-events-none select-none">
            <tspan fill="#D4A853" fontFamily="var(--font-mono)" fontSize="28" fontWeight="700">F</tspan>
            <tspan fill="#9CA3AF" fontFamily="var(--font-mono)" fontSize="22" dx="6">=</tspan>
            <tspan fill="#89B4C8" fontFamily="var(--font-mono)" fontSize="28" fontWeight="700" dx="6">D</tspan>
            <tspan fill="#C4745B" fontFamily="var(--font-mono)" fontSize="18" fontWeight="700" dy="-10">I</tspan>
            <tspan fill="#9CA3AF" fontFamily="var(--font-mono)" fontSize="22" dy="10" dx="4">×</tspan>
            <tspan fill="#7B9E87" fontFamily="var(--font-mono)" fontSize="28" fontWeight="700" dx="4">A</tspan>
          </text>

          {connections.map((connection) => {
            const active = isConnectionActive(connection.from, connection.to)
            const toNode = nodes.find((node) => node.id === connection.to)!
            return (
              <g key={`${connection.from}-${connection.to}`}>
                <path d={getPath(connection.from, connection.to)} fill="none" stroke={active ? toNode.color : "#D4D0C8"} strokeWidth={active ? 2.5 : 1.5} strokeDasharray={active ? "none" : "6 4"} markerEnd={active ? `url(#arrow-${connection.to})` : "url(#arrow-default)"} style={{ transition: "all 0.4s ease", opacity: active ? 1 : 0.4 }} />
                <rect x={connection.labelPos.x - 22} y={connection.labelPos.y - 10} width="44" height="20" rx="6" fill={active ? toNode.bg : "#F5F0E8"} stroke={active ? toNode.color : "#E8E3DC"} strokeWidth="1" style={{ transition: "all 0.4s ease" }} />
                <text x={connection.labelPos.x} y={connection.labelPos.y + 4} textAnchor="middle" fill={active ? toNode.color : "#9CA3AF"} fontFamily="var(--font-mono)" fontSize="10" fontWeight="600" className="pointer-events-none select-none" style={{ transition: "fill 0.4s ease" }}>{connection.label}</text>
              </g>
            )
          })}

          {nodes.map((node) => {
            const isActive = activeNode === node.id
            const isHovered = hoveredNode === node.id
            const highlighted = isActive || isHovered
            return (
              <g
                key={node.id}
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                className="cursor-pointer"
                style={{ filter: highlighted ? `url(#glow-${node.id})` : "none" }}
              >
                {isActive && <circle cx={node.x} cy={node.y} r={nodeR + 6} fill="none" stroke={node.color} strokeWidth="2" strokeDasharray="4 3" opacity="0.5" />}
                <circle cx={node.x} cy={node.y} r={nodeR} fill={highlighted ? node.bg : node.bgLight} stroke={node.color} strokeWidth={highlighted ? 2.5 : 1.5} style={{ transition: "all 0.3s ease" }} />
                <text x={node.x} y={node.y - 6} textAnchor="middle" dominantBaseline="middle" fill={node.color} fontFamily="var(--font-mono)" fontSize="28" fontWeight="700">{node.letter}</text>
                {renderNodeLabel(node)}
                <text x={node.x} y={node.y - nodeR - 14} textAnchor="middle" fontSize="18">{node.icon}</text>
              </g>
            )
          })}
        </svg>

        {activeNode && (() => {
          const node = nodes.find((item) => item.id === activeNode)
          if (!node) return null
          return (
            <div className="absolute bottom-4 left-4 right-4 rounded-xl border border-warm-light-gray bg-white/96 px-5 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.08)] backdrop-blur-sm">
              <div className="mb-1 flex items-center gap-2">
                <span className="text-lg">{node.icon}</span>
                <span className="font-mono text-lg font-bold" style={{ color: node.color }}>{node.letter}</span>
                <h4 className="text-base font-semibold text-warm-charcoal">{isEn ? node.label : node.labelTh}</h4>
              </div>
              <p className="text-sm leading-relaxed text-warm-secondary">{isEn ? node.desc : node.descTh}</p>
            </div>
          )
        })()}
      </div>
    </div>
  )
}
