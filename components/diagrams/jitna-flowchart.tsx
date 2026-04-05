"use client"

import { useEffect, useRef, useState } from "react"
import { AnimatePresence, m } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

interface StepNode {
  id: string
  num: number
  name: string
  nameTh: string
  desc: string
  descTh: string
  color: string
  bg: string
  bgLight: string
  icon: string
}

const steps: StepNode[] = [
  {
    id: "capture",
    num: 1,
    name: "Context Capture",
    nameTh: "Context Capture (จับบริบท)",
    desc: "Capture user intent, environmental context, and prior signals to form the narrative foundation.",
    descTh: "จับ intent ของผู้ใช้ สภาพแวดล้อม และสัญญาณก่อนหน้าเพื่อสร้างฐานของ narrative",
    color: "#D4A853",
    bg: "#FEF3C7",
    bgLight: "#FFFBEB",
    icon: "📡",
  },
  {
    id: "analysis",
    num: 2,
    name: "Intent Analysis",
    nameTh: "Intent Analysis (วิเคราะห์เจตนา)",
    desc: "Decompose captured context into structured intent vectors using the FDIA intent layer.",
    descTh: "แยก context ที่จับได้ให้เป็น structured intent vectors โดยใช้ชั้น intent ของ FDIA",
    color: "#C4745B",
    bg: "#FEE2E2",
    bgLight: "#FEF2F2",
    icon: "🔍",
  },
  {
    id: "assembly",
    num: 3,
    name: "Narrative Assembly",
    nameTh: "Narrative Assembly (ประกอบเรื่องเล่า)",
    desc: "Construct a coherent negotiation thread that connects intent to actionable outcomes.",
    descTh: "ประกอบ negotiation thread ที่เชื่อม intent ไปสู่ผลลัพธ์ที่ปฏิบัติได้จริง",
    color: "#7B9E87",
    bg: "#D1FAE5",
    bgLight: "#ECFDF5",
    icon: "🧩",
  },
  {
    id: "quality",
    num: 4,
    name: "Quality Gate",
    nameTh: "Quality Gate (ด่านคุณภาพ)",
    desc: "Validate the narrative against constitutional rules, accuracy thresholds, and hallucination checks.",
    descTh: "ตรวจ narrative เทียบกับ constitutional rules, accuracy thresholds และ hallucination checks",
    color: "#89B4C8",
    bg: "#DBEAFE",
    bgLight: "#EFF6FF",
    icon: "🛡️",
  },
  {
    id: "delivery",
    num: 5,
    name: "Adaptive Delivery",
    nameTh: "Adaptive Delivery (ส่งมอบแบบปรับตัว)",
    desc: "Deliver the negotiated output in the optimal format for the current user and channel.",
    descTh: "ส่งมอบผลลัพธ์ที่ผ่านการเจรจาในรูปแบบที่เหมาะสมกับผู้ใช้และช่องทางนั้น",
    color: "#B8A9C9",
    bg: "#EDE9FE",
    bgLight: "#F5F3FF",
    icon: "🚀",
  },
  {
    id: "feedback",
    num: 6,
    name: "Feedback Loop",
    nameTh: "Feedback Loop (วงรอบป้อนกลับ)",
    desc: "Collect outcomes and feed learning back into the protocol for continuous evolution.",
    descTh: "เก็บผลลัพธ์และป้อนบทเรียนกลับเข้าระบบเพื่อให้โปรโตคอลพัฒนาต่อเนื่อง",
    color: "#D4A853",
    bg: "#FEF3C7",
    bgLight: "#FFFBEB",
    icon: "🔄",
  },
]

const positions = [
  { x: 140, y: 140 },
  { x: 380, y: 140 },
  { x: 620, y: 140 },
  { x: 620, y: 340 },
  { x: 380, y: 340 },
  { x: 140, y: 340 },
]

const connectionPairs = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
] as const

function getConnectionPath(fromIdx: number, toIdx: number) {
  const from = positions[fromIdx]
  const to = positions[toIdx]
  const nodeW = 130
  const nodeH = 70

  if (from.y === to.y && from.x < to.x) {
    return `M ${from.x + nodeW / 2} ${from.y} L ${to.x - nodeW / 2} ${to.y}`
  }

  if (fromIdx === 2 && toIdx === 3) {
    return `M ${from.x} ${from.y + nodeH / 2} L ${to.x} ${to.y - nodeH / 2}`
  }

  if (from.y === to.y && from.x > to.x) {
    return `M ${from.x - nodeW / 2} ${from.y} L ${to.x + nodeW / 2} ${to.y}`
  }

  if (fromIdx === 5 && toIdx === 0) {
    return `M ${from.x} ${from.y - nodeH / 2} C ${from.x - 60} ${from.y - 100}, ${to.x - 60} ${to.y + 100}, ${to.x} ${to.y + nodeH / 2}`
  }

  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`
}

export default function JITNAFlowchart({ language = "en" }: { language?: "en" | "th" }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [activeStep, setActiveStep] = useState<string | null>(null)
  const [hoveredStep, setHoveredStep] = useState<string | null>(null)
  const [focusedIndex, setFocusedIndex] = useState<number>(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!containerRef.current?.contains(document.activeElement)) return

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          event.preventDefault()
          setFocusedIndex((prev) => (prev + 1) % steps.length)
          break
        case "ArrowLeft":
        case "ArrowUp":
          event.preventDefault()
          setFocusedIndex((prev) => (prev - 1 + steps.length) % steps.length)
          break
        case "Enter":
        case " ":
          event.preventDefault()
          setActiveStep(steps[focusedIndex].id)
          break
        case "Escape":
          event.preventDefault()
          setActiveStep(null)
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [focusedIndex])

  const activeData = steps.find((step) => step.id === activeStep) ?? steps[0]
  const svgW = 760
  const svgH = 460
  const nodeW = 130
  const nodeH = 70

  return (
    <div ref={containerRef} className="space-y-4" role="application" aria-label="JITNA protocol pipeline diagram">
      <div className="text-center">
        <span className="text-2xs text-warm-muted dark:text-warm-subtle">
          {language === "en" ? "Use arrow keys or click a step" : "ใช้ปุ่มลูกศรหรือคลิกที่แต่ละขั้นตอน"}
        </span>
      </div>

      <div className={`overflow-hidden rounded-2xl border ${isDark ? "border-dark-border bg-dark-950" : "border-warm-light-gray bg-white shadow-[0_8px_30px_rgba(0,0,0,0.06)]"}`}>
        <svg viewBox={`0 0 ${svgW} ${svgH}`} className="h-auto w-full" style={{ minHeight: "320px" }}>
          <defs>
            <pattern id="jitna-grid-rctlabs" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#E8E3DC" strokeWidth="0.5" opacity="0.3" />
            </pattern>
            {steps.map((step) => (
              <marker
                key={`marker-${step.id}`}
                id={`marker-${step.id}`}
                viewBox="0 0 10 6"
                refX="10"
                refY="3"
                markerWidth="8"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 3 L 0 6 z" fill={step.color} opacity="0.7" />
              </marker>
            ))}
            <marker id="marker-default" viewBox="0 0 10 6" refX="10" refY="3" markerWidth="8" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 0 L 10 3 L 0 6 z" fill="#D4D0C8" opacity="0.4" />
            </marker>
          </defs>

          <rect width="100%" height="100%" fill={isDark ? "rgba(255,255,255,0.01)" : "url(#jitna-grid-rctlabs)"} />
          <text x={svgW / 2} y={28} textAnchor="middle" fill="#9CA3AF" fontFamily="'Inter', 'Kanit', sans-serif" fontSize="10" fontWeight="500" letterSpacing="2">
            {language === "en" ? "JITNA PROTOCOL PIPELINE" : "JITNA PROTOCOL PIPELINE"}
          </text>

          {connectionPairs.map(([fromIdx, toIdx]) => {
            const fromStep = steps[fromIdx]
            const toStep = steps[toIdx]
            const active = activeStep === fromStep.id || activeStep === toStep.id || hoveredStep === fromStep.id || hoveredStep === toStep.id
            const isFeedback = fromIdx === 5 && toIdx === 0

            return (
              <g key={`${fromIdx}-${toIdx}`}>
                <path
                  d={getConnectionPath(fromIdx, toIdx)}
                  fill="none"
                  stroke={active ? toStep.color : "#D4D0C8"}
                  strokeWidth={active ? 2.5 : 1.5}
                  strokeDasharray={isFeedback ? "6 4" : active ? "none" : "6 4"}
                  markerEnd={active ? `url(#marker-${toStep.id})` : "url(#marker-default)"}
                  style={{ opacity: active ? 1 : 0.35, transition: "all 0.3s ease" }}
                />
                {active && !isFeedback && (
                  <circle r="3" fill={toStep.color} opacity="0.7">
                    <animateMotion dur="2s" repeatCount="indefinite" path={getConnectionPath(fromIdx, toIdx)} />
                  </circle>
                )}
              </g>
            )
          })}

          {steps.map((step, index) => {
            const pos = positions[index]
            const highlighted = activeStep === step.id || hoveredStep === step.id

            return (
              <g
                key={step.id}
                onClick={() => setActiveStep(activeStep === step.id ? null : step.id)}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
                className="cursor-pointer"
              >
                <rect
                  x={pos.x - nodeW / 2}
                  y={pos.y - nodeH / 2}
                  width={nodeW}
                  height={nodeH}
                  rx={16}
                  fill={highlighted ? step.bg : step.bgLight}
                  stroke={step.color}
                  strokeWidth={highlighted ? 2.5 : 1.5}
                  style={{ transition: "all 0.3s ease" }}
                />
                <circle cx={pos.x - nodeW / 2 + 14} cy={pos.y - nodeH / 2} r={10} fill={step.color} />
                <text x={pos.x - nodeW / 2 + 14} y={pos.y - nodeH / 2 + 3} textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
                  {step.num}
                </text>
                <text x={pos.x} y={language === "th" ? pos.y - 10 : pos.y - 6} textAnchor="middle" fontSize="20">
                  {step.icon}
                </text>
                {language === "en" ? (
                  <text x={pos.x} y={pos.y + 16} textAnchor="middle" fill="#1A1A1A" fontFamily="'Inter', 'Kanit', sans-serif" fontSize="11" fontWeight="600">
                    {step.name}
                  </text>
                ) : (
                  <text textAnchor="middle" fill="#1A1A1A" fontFamily="'Inter', 'Kanit', sans-serif" fontWeight="600">
                    <tspan x={pos.x} y={pos.y + 9} fontSize="9">{step.nameTh.includes(" (") ? step.nameTh.split(" (")[0] : step.nameTh}</tspan>
                    {step.nameTh.includes(" (") && (
                      <tspan x={pos.x} dy="11" fontSize="8.5" opacity={0.7}>{`(${step.nameTh.split(" (")[1]}`}</tspan>
                    )}
                  </text>
                )}
              </g>
            )
          })}
        </svg>
      </div>

      <AnimatePresence mode="wait">
        <m.div
          key={activeData.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className={`rounded-2xl border p-5 ${isDark ? "border-dark-border bg-dark-deep" : "border-warm-light-gray bg-warm-cream/70"}`}
        >
          <div className="mb-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl text-lg" style={{ backgroundColor: activeData.bg }}>
              {activeData.icon}
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider" style={{ color: activeData.color }}>
                {language === "en" ? `Step ${activeData.num}` : `ขั้นตอน ${activeData.num}`}
              </div>
              <h4 className="text-base font-bold text-foreground">{language === "en" ? activeData.name : activeData.nameTh}</h4>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground">{language === "en" ? activeData.desc : activeData.descTh}</p>
        </m.div>
      </AnimatePresence>
    </div>
  )
}