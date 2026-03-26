"use client"

import { useRef, useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"

interface Node {
  id: string
  label: string
  labelTh: string
  color: string
  bg: string
  darkBg: string
  desc: string
  descTh: string
  angle: number
}

const nodes: Node[] = [
  { id: "fdia", label: "FDIA Equation", labelTh: "สมการ FDIA", color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15", desc: "F = D^I × A — The core equation governing all system behavior", descTh: "F = D^I × A — สมการหลักที่กำกับพฤติกรรมทั้งหมดของระบบ", angle: 0 },
  { id: "arch", label: "10-Layer Stack", labelTh: "10 Layers", color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", desc: "Hierarchical cognitive architecture with 52+ microservices", descTh: "สถาปัตยกรรมเชิงปัญญาแบบลำดับชั้น 52+ Microservices", angle: 60 },
  { id: "genome", label: "7 Genomes", labelTh: "7 Genomes", color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15", desc: "DNA of the ecosystem — WHY, WHAT, HOW, PROOF, MEASURE, LEARN, IMPROVE", descTh: "DNA ของ Ecosystem — WHY, WHAT, HOW, PROOF, MEASURE, LEARN, IMPROVE", angle: 120 },
  { id: "jitna", label: "JITNA Protocol", labelTh: "JITNA Protocol", color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A", desc: "Just-In-Time Neuro-Adaptive — AI-to-AI negotiation protocol", descTh: "Just-In-Time Neuro-Adaptive — Protocol สำหรับ AI-to-AI Negotiation", angle: 180 },
  { id: "analysearch", label: "Analysearch", labelTh: "Analysearch", color: "#B8A9C9", bg: "#EDE9FE", darkBg: "#2A1E3A", desc: "4-mode research engine: Quick, Standard, Deep, Mirror", descTh: "Research Engine 4 โหมด: Quick, Standard, Deep, Mirror", angle: 240 },
  { id: "algorithms", label: "41 Algorithms", labelTh: "41 Algorithms", color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15", desc: "9 tiers from foundational processing to autonomous evolution", descTh: "9 Tiers ตั้งแต่การประมวลผลพื้นฐานถึง Autonomous Evolution", angle: 300 },
]

const cx = 250
const cy = 210
const orbitR = 145
const nodeR = 36
const centerR = 46

function polarToXY(angleDeg: number, radius: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) }
}

export default function EcosystemOverviewDiagram() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const isDark = resolvedTheme === "dark"
  const [hovered, setHovered] = useState<string | null>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const isEn = language === "en"
  const nodePositions = nodes.map((node) => ({ ...node, ...polarToXY(node.angle, orbitR) }))

  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown": {
        event.preventDefault()
        const nextIndex = (focusedIndex + 1) % nodes.length
        setFocusedIndex(nextIndex)
        setHovered(nodes[nextIndex].id)
        break
      }
      case "ArrowLeft":
      case "ArrowUp": {
        event.preventDefault()
        const nextIndex = (focusedIndex - 1 + nodes.length) % nodes.length
        setFocusedIndex(nextIndex)
        setHovered(nodes[nextIndex].id)
        break
      }
      case "Enter":
      case " ":
        event.preventDefault()
        setSelected(nodes[focusedIndex].id)
        setHovered(nodes[focusedIndex].id)
        break
      case "Escape":
        event.preventDefault()
        setSelected(null)
        setHovered(null)
        break
    }
  }

  const renderNodeLabel = (node: Node) => {
    const label = isEn ? node.label : node.labelTh
    const parts = label.split(" ")
    const firstLine = parts.length > 2 ? parts.slice(0, Math.ceil(parts.length / 2)).join(" ") : parts[0]
    const secondLine = parts.length > 2 ? parts.slice(Math.ceil(parts.length / 2)).join(" ") : parts.slice(1).join(" ")

    return (
      <text x={(node as Node & { x: number }).x} y={(node as Node & { x: number; y: number }).y - 1} textAnchor="middle" fontSize={parts.length > 2 ? 7.2 : 8.2} fontWeight={600} fill={node.color} fontFamily="var(--font-sans)">
        <tspan x={(node as Node & { x: number }).x} dy={secondLine ? -4 : 3}>{firstLine}</tspan>
        {secondLine ? <tspan x={(node as Node & { x: number }).x} dy={10}>{secondLine}</tspan> : null}
      </text>
    )
  }

  return (
    <div ref={containerRef} className={`rounded-xl border p-4 ${isDark ? "bg-warm-charcoal border-border" : "bg-white border-warm-light-gray"}`}>
      <p className={`mb-3 text-right text-xs ${language === "th" ? "subtitle-th" : ""} ${isDark ? "text-warm-subtle" : "text-warm-muted"}`}>
        {isEn ? "Use ← → or click to explore" : "ใช้ ← → หรือคลิกเพื่อสำรวจ"}
      </p>

      <svg viewBox="0 0 500 420" className="mx-auto w-full max-w-120" role="application" aria-label="RCT Ecosystem Overview Diagram" tabIndex={0} onKeyDown={handleKeyDown}>
        <circle cx={cx} cy={cy} r={orbitR} fill="none" stroke={isDark ? "#2A2A2A" : "#E8E3DC"} strokeWidth={1} strokeDasharray="6 4" />

        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${cx}px ${cy}px` }}
        >
          <circle cx={cx} cy={cy - orbitR} r="5" fill="#D4A853" opacity="0.9" />
          <circle cx={cx + 8} cy={cy - orbitR + 26} r="3" fill="#89B4C8" opacity="0.65" />
          <circle cx={cx - 10} cy={cy - orbitR + 52} r="2.5" fill="#C4745B" opacity="0.45" />
        </motion.g>

        {nodePositions.map((node) => (
          <motion.line key={`line-${node.id}`} x1={cx} y1={cy} x2={node.x} y2={node.y} stroke={hovered === node.id ? node.color : isDark ? "#333" : "#D4D0C8"} strokeWidth={hovered === node.id ? 2.5 : 1.5} strokeDasharray={hovered === node.id ? "none" : "6 4"} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }} />
        ))}

        <motion.circle cx={cx} cy={cy} r={centerR} fill={isDark ? "#222" : "#FAF6F0"} stroke="#D4A853" strokeWidth={2.5} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.5, type: "spring" }} style={{ transformOrigin: `${cx}px ${cy}px` }} />
        <text x={cx} y={cy - 8} textAnchor="middle" fontSize={13} fontWeight={700} fill="#D4A853" fontFamily="monospace">RCT</text>
        <text x={cx} y={cy + 8} textAnchor="middle" fontSize={9} fontWeight={500} fill={isDark ? "#888" : "#6B6B6B"}>Ecosystem</text>

        {nodePositions.map((node, index) => {
          const isHovered = hovered === node.id
          const isSelected = selected === node.id
          const isFocused = focusedIndex === index
          return (
            <motion.g key={node.id} onMouseEnter={() => setHovered(node.id)} onMouseLeave={() => setHovered(null)} onClick={() => { setSelected(node.id); setFocusedIndex(index) }} className="cursor-pointer" initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 + index * 0.1, duration: 0.4, type: "spring" }} style={{ transformOrigin: `${node.x}px ${node.y}px` }} role="button" aria-label={`${isEn ? node.label : node.labelTh}. ${isEn ? node.desc : node.descTh}`}>
              {(isHovered || isSelected) && <circle cx={node.x} cy={node.y} r={nodeR + 6} fill={node.color} opacity={isSelected ? 0.25 : 0.15} />}
              {isFocused && <circle cx={node.x} cy={node.y} r={nodeR + 4} fill="none" stroke={node.color} strokeWidth={2} strokeDasharray="4 4" opacity={0.8} />}
              <circle cx={node.x} cy={node.y} r={nodeR} fill={isDark ? node.darkBg : node.bg} stroke={isHovered || isSelected ? node.color : isDark ? "#333" : "#D4D0C8"} strokeWidth={isHovered || isSelected ? 2.5 : 1.5} />
              {renderNodeLabel(node)}
            </motion.g>
          )
        })}

        {(hovered || selected) && (() => {
          const activeId = selected || hovered
          const node = nodePositions.find((item) => item.id === activeId)
          if (!node) return null
          const tooltipW = 260
          const tooltipH = 80
          const padding = 12
          let tx = node.x - tooltipW / 2
          let ty = node.y + nodeR + 20
          if (tx < 10) tx = 10
          if (tx + tooltipW > 490) tx = 490 - tooltipW
          if (ty + tooltipH > 410) ty = node.y - nodeR - tooltipH - 20
          if (ty < 10) ty = 10
          const desc = isEn ? node.desc : node.descTh
          return (
            <g className="pointer-events-none">
              <rect x={tx} y={ty} width={tooltipW} height={tooltipH} rx={10} fill={isDark ? "#2A2A2A" : "#1A1A1A"} opacity={0.98} filter="drop-shadow(0 4px 12px rgba(0,0,0,0.3))" />
              <text x={tx + tooltipW / 2} y={ty + padding + 12} textAnchor="middle" fontSize={11} fontWeight={700} fill="#D4A853" fontFamily="var(--font-sans)">{isEn ? node.label : node.labelTh}</text>
              <foreignObject x={tx + padding} y={ty + padding + 22} width={tooltipW - padding * 2} height={tooltipH - padding - 26}>
                <div style={{ fontSize: "9px", lineHeight: "1.4", color: "#CCC", textAlign: "center", fontFamily: "var(--font-sans)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical" }}>{desc}</div>
              </foreignObject>
            </g>
          )
        })()}
      </svg>
    </div>
  )
}
