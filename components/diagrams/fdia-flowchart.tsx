"use client"

import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { pixelIcons } from "@/lib/pixel-icons"

type FDIANode = {
  id: "future" | "data" | "intent" | "architect"
  letter: "F" | "D" | "I" | "A"
  label: string
  labelTh: string
  subtitle: string
  subtitleTh: string
  description: string
  descriptionTh: string
  detail: string
  detailTh: string
  visualRole: string
  visualRoleTh: string
  chip: string
  chipTh: string
  color: string
  glow: string
  badgeClass: string
  icon: string
  x: number
  y: number
}

type Connection = {
  from: FDIANode["id"]
  to: FDIANode["id"]
  label: string
  labelTh: string
  x: number
  y: number
}

const nodes: FDIANode[] = [
  {
    id: "data",
    letter: "D",
    label: "Data",
    labelTh: "Data",
    subtitle: "Verified inputs",
    subtitleTh: "ข้อมูลที่ผ่านการตรวจสอบ",
    description: "Raw signals, evidence, and quality controls that feed the system.",
    descriptionTh: "สัญญาณดิบ หลักฐาน และชั้นคุณภาพข้อมูลที่ป้อนเข้าระบบ",
    detail:
      "Data is not just quantity. It is verified context, provenance, and readiness. Better inputs raise the entire system's ceiling.",
    detailTh:
      "Data ไม่ใช่แค่ปริมาณ แต่รวมถึงบริบทที่ตรวจสอบได้ ที่มา และความพร้อมของข้อมูล ซึ่งเป็นฐานยกระดับทั้งระบบ",
    visualRole: "Foundation layer",
    visualRoleTh: "ชั้นฐานราก",
    chip: "Input quality",
    chipTh: "คุณภาพ input",
    color: "#89B4C8",
    glow: "rgba(137,180,200,0.24)",
    badgeClass: "bg-sky-100 text-[#89B4C8] dark:bg-[#122738]",
    icon: pixelIcons.database,
    x: 14,
    y: 52,
  },
  {
    id: "intent",
    letter: "I",
    label: "Intent",
    labelTh: "Intent",
    subtitle: "Exponential amplifier",
    subtitleTh: "ตัวขยายแบบยกกำลัง",
    description: "Clarity of purpose determines how much value data can unlock.",
    descriptionTh: "ความชัดเจนของเจตนากำหนดว่าข้อมูลจะปลดล็อกคุณค่าได้มากแค่ไหน",
    detail:
      "Intent acts as the exponent, so small increases in clarity create non-linear changes in downstream outcomes.",
    detailTh:
      "Intent ทำหน้าที่เป็น exponent จึงทำให้ความชัดเจนที่เพิ่มขึ้นเพียงเล็กน้อยส่งผลแบบไม่เป็นเส้นตรงต่อผลลัพธ์ปลายทาง",
    visualRole: "Amplification layer",
    visualRoleTh: "ชั้นขยายพลัง",
    chip: "Signal shaping",
    chipTh: "การกำหนดทิศสัญญาณ",
    color: "#C4745B",
    glow: "rgba(196,116,91,0.24)",
    badgeClass: "bg-rose-100 text-[#C4745B] dark:bg-[#341a16]",
    icon: pixelIcons.target,
    x: 50,
    y: 18,
  },
  {
    id: "architect",
    letter: "A",
    label: "Architect",
    labelTh: "Architect",
    subtitle: "Human oversight",
    subtitleTh: "มนุษย์กำกับดูแล",
    description: "Governance, judgment, and system design keep AI aligned with reality.",
    descriptionTh: "ธรรมาภิบาล วิจารณญาณ และการออกแบบระบบทำให้ AI อยู่ในกรอบของโลกจริง",
    detail:
      "Architect is the multiplier because systems need stewardship. Human-in-the-loop oversight turns computation into accountable execution.",
    detailTh:
      "Architect เป็นตัวคูณเพราะระบบต้องมีผู้กำกับ Human-in-the-loop ทำให้การคำนวณกลายเป็นการปฏิบัติที่ตรวจสอบรับผิดชอบได้",
    visualRole: "Governance layer",
    visualRoleTh: "ชั้นกำกับดูแล",
    chip: "Human in loop",
    chipTh: "มนุษย์ในวงจร",
    color: "#7B9E87",
    glow: "rgba(123,158,135,0.24)",
    badgeClass: "bg-emerald-100 text-[#7B9E87] dark:bg-[#172a1f]",
    icon: pixelIcons.architecture,
    x: 50,
    y: 84,
  },
  {
    id: "future",
    letter: "F",
    label: "Future",
    labelTh: "Future",
    subtitle: "Constructed outcome",
    subtitleTh: "ผลลัพธ์ที่ถูกสร้างขึ้น",
    description: "Future is produced by the whole pipeline, not guessed in isolation.",
    descriptionTh: "Future ถูกสร้างขึ้นจากทั้ง pipeline ไม่ใช่การคาดเดาแยกส่วน",
    detail:
      "Future is the result of disciplined inputs, sharp intent, and accountable architecture working together as one system.",
    detailTh:
      "Future คือผลลัพธ์ของ input ที่มีวินัย เจตนาที่ชัด และสถาปัตยกรรมที่รับผิดชอบซึ่งทำงานร่วมกันเป็นระบบเดียว",
    visualRole: "Outcome layer",
    visualRoleTh: "ชั้นผลลัพธ์",
    chip: "Strategic output",
    chipTh: "ผลลัพธ์เชิงกลยุทธ์",
    color: "#D4A853",
    glow: "rgba(212,168,83,0.24)",
    badgeClass: "bg-amber-100 text-[#D4A853] dark:bg-[#36270f]",
    icon: pixelIcons.flag,
    x: 86,
    y: 52,
  },
]

const connections: Connection[] = [
  { from: "data", to: "intent", label: "Amplify", labelTh: "ขยาย", x: 30, y: 28 },
  { from: "data", to: "architect", label: "Guide", labelTh: "กำกับ", x: 30, y: 74 },
  { from: "intent", to: "future", label: "D^I", labelTh: "D^I", x: 69, y: 28 },
  { from: "architect", to: "future", label: "× A", labelTh: "× A", x: 69, y: 74 },
]

function buildPath(from: FDIANode, to: FDIANode) {
  const dx = to.x - from.x
  const c1x = from.x + dx * 0.42
  const c2x = from.x + dx * 0.62
  return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`
}

export default function FDIAFlowchart() {
  const { language } = useLanguage()
  const prefersReducedMotion = useReducedMotion()
  const isEn = language === "en"
  const [activeNode, setActiveNode] = useState<FDIANode["id"]>("intent")

  const active = nodes.find((node) => node.id === activeNode) ?? nodes[1]
  const lowIntent = Math.pow(85, 1) * 1.5
  const highIntent = Math.pow(85, 10) * 1.5
  const intentMultiplier = `${(highIntent / lowIntent).toExponential(2)}x`

  return (
    <div className="main-page-reactive-surface overflow-hidden rounded-[26px] border border-[rgba(176,150,111,0.18)] bg-[linear-gradient(180deg,rgba(33,29,27,0.96),rgba(24,21,19,0.98))] shadow-[0_18px_64px_rgba(17,14,12,0.28)]">
      <div className="grid gap-0 xl:grid-cols-[minmax(0,1.38fr)_minmax(300px,0.84fr)]">
        <div className="relative min-h-116 overflow-hidden px-4 py-4 sm:px-5 sm:py-5 lg:min-h-124">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(212,168,83,0.12),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(137,180,200,0.09),transparent_24%),linear-gradient(180deg,rgba(33,29,27,0.82),rgba(21,20,20,0.96))]" />
          <div className="absolute inset-3 rounded-[22px] border border-[rgba(212,168,83,0.14)] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0.01))]" />
          <div className="absolute inset-3 bg-[linear-gradient(rgba(176,150,111,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(176,150,111,0.08)_1px,transparent_1px)] bg-size-[52px_52px] opacity-45" />

          <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 px-1 pb-3">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-warm-amber">
                {isEn ? "Interactive Blueprint" : "แผนภาพโต้ตอบ"}
              </p>
              <p className="mt-1 max-w-lg text-sm text-[#a89f92] sm:text-[14px]">
                {isEn
                  ? "A cleaner systems view of the FDIA equation: the section now reads like a product blueprint, not a legacy infographic."
                  : "มุมมองใหม่ของสมการ FDIA ในรูปแบบ blueprint ที่อ่านเหมือนระบบผลิตภัณฑ์ ไม่ใช่อินโฟกราฟิกยุคเก่า"}
              </p>
            </div>
            <div className="rounded-full border border-warm-amber/20 bg-[rgba(212,168,83,0.08)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-warm-amber shadow-sm">
              {isEn ? "Future = Data^Intent × Architect" : "Future = Data^Intent × Architect"}
            </div>
          </div>

          <div className="relative z-10 mt-2 aspect-[1.16/1] min-h-96 w-full sm:min-h-105">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
              <defs>
                {nodes.map((node) => (
                  <filter key={`glow-${node.id}`} id={`glow-${node.id}`} x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="2.8" result="blur" />
                    <feFlood floodColor={node.color} floodOpacity="0.24" result="color" />
                    <feComposite in="color" in2="blur" operator="in" result="glow" />
                    <feMerge>
                      <feMergeNode in="glow" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                ))}
              </defs>

              {connections.map((connection) => {
                const from = nodes.find((node) => node.id === connection.from)
                const to = nodes.find((node) => node.id === connection.to)
                if (!from || !to) {
                  return null
                }

                const highlighted = activeNode === connection.from || activeNode === connection.to
                return (
                  <g key={`${connection.from}-${connection.to}`}>
                    <path
                      d={buildPath(from, to)}
                      fill="none"
                      stroke={highlighted ? to.color : "rgba(179,160,138,0.55)"}
                      strokeWidth={highlighted ? 0.65 : 0.42}
                      strokeDasharray={highlighted ? "0 0" : "2.4 1.8"}
                      opacity={highlighted ? 0.92 : 0.5}
                    />
                    <rect
                      x={connection.x - 5}
                      y={connection.y - 2.7}
                      width="10"
                      height="5.4"
                      rx="2.2"
                      fill={highlighted ? "rgba(48,42,36,0.92)" : "rgba(34,31,28,0.9)"}
                      stroke={highlighted ? to.color : "rgba(179,160,138,0.4)"}
                      strokeWidth="0.28"
                    />
                    <text
                      x={connection.x}
                      y={connection.y + 0.8}
                      textAnchor="middle"
                      fontSize="1.55"
                      fontFamily="var(--font-mono)"
                      fontWeight="700"
                      fill={highlighted ? to.color : "#b49f87"}
                    >
                      {isEn ? connection.label : connection.labelTh}
                    </text>
                  </g>
                )
              })}
            </svg>

            <div className="absolute left-1/2 top-1/2 z-20 w-44 -translate-x-1/2 -translate-y-1/2 rounded-[22px] border border-[rgba(212,168,83,0.18)] bg-[linear-gradient(180deg,rgba(35,37,41,0.94),rgba(25,28,34,0.96))] px-4 py-3.5 text-center shadow-[0_14px_36px_rgba(8,8,10,0.28)] backdrop-blur sm:w-54">
              <div className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#a89f92]">
                {isEn ? "Equation Core" : "แกนสมการ"}
              </div>
              <div className="mt-2 font-mono text-[28px] font-bold tracking-[0.12em] sm:text-[34px]">
                <span className="text-warm-amber">F</span>
                <span className="mx-2 text-muted-foreground">=</span>
                <span style={{ color: "#89B4C8" }}>D</span>
                <sup className="text-[0.56em] align-super" style={{ color: "#C4745B" }}>
                  I
                </sup>
                <span className="mx-2 text-muted-foreground">×</span>
                <span style={{ color: "#7B9E87" }}>A</span>
              </div>
              <p className="mt-2 text-[11px] leading-relaxed text-[#cbc2b5] sm:text-xs">
                {isEn
                  ? "Intent is the exponent. Architect is the governance multiplier."
                  : "Intent คือ exponent และ Architect คือตัวคูณด้านการกำกับดูแล"}
              </p>
            </div>

            {nodes.map((node, index) => {
              const selected = activeNode === node.id
              return (
                <motion.button
                  key={node.id}
                  type="button"
                  initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.94, y: 8 }}
                  whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1, y: 0 }}
                  whileHover={prefersReducedMotion ? undefined : { y: -4, scale: 1.01 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.99 }}
                  viewport={{ once: true }}
                  transition={prefersReducedMotion ? undefined : { duration: 0.28, delay: index * 0.05 }}
                  onClick={() => setActiveNode(node.id)}
                  className="group absolute z-30 flex w-31 -translate-x-1/2 -translate-y-1/2 flex-col items-center rounded-[22px] border px-2.5 pb-3 pt-2.5 text-center shadow-[0_12px_24px_rgba(8,8,10,0.24)] backdrop-blur transition-[border-color,background-color,box-shadow] duration-300 sm:w-35 sm:px-3"
                  style={{
                    left: `${node.x}%`,
                    top: `${node.y}%`,
                    borderColor: selected ? node.color : "rgba(176,150,111,0.22)",
                    background: selected ? "linear-gradient(180deg, rgba(47,44,41,0.96), rgba(31,29,28,0.98))" : "linear-gradient(180deg, rgba(38,35,33,0.9), rgba(30,28,27,0.94))",
                    boxShadow: selected ? `0 14px 30px ${node.glow}` : undefined,
                    filter: selected ? `drop-shadow(0 0 10px ${node.glow})` : undefined,
                  }}
                >
                  <div className={`mb-2 inline-flex rounded-full border border-white/10 p-1.5 shadow-sm ${node.badgeClass}`}>
                    <Image
                      src={node.icon}
                      alt=""
                      width={22}
                      height={22}
                      className="h-5.5 w-5.5 pixelated object-contain"
                      style={{ imageRendering: "pixelated" }}
                    />
                  </div>
                  <div className="mb-1 font-mono text-[30px] font-bold leading-none sm:text-[34px]" style={{ color: node.color }}>
                    {node.letter}
                  </div>
                  <div className="text-sm font-semibold text-[#f1ece4] sm:text-[15px]">
                    {isEn ? node.label : node.labelTh}
                  </div>
                  <div className="mt-1 text-[10px] leading-relaxed text-[#b5aa9a] sm:text-[11px]">
                    {isEn ? node.subtitle : node.subtitleTh}
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        <div className="relative border-t border-[rgba(176,150,111,0.12)] bg-[linear-gradient(180deg,rgba(28,25,23,0.96),rgba(22,20,19,0.98))] px-4 py-4 sm:px-5 sm:py-5 xl:border-l xl:border-t-0 xl:border-l-[rgba(176,150,111,0.12)]">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-warm-amber/18 bg-warm-amber/8 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-warm-amber">
              {isEn ? "Blueprint Reading" : "วิธีอ่าน blueprint"}
            </span>
            <span className="rounded-full border border-[rgba(176,150,111,0.12)] bg-white/4 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#b5aa9a]">
              {isEn ? active.visualRole : active.visualRoleTh}
            </span>
          </div>

          <div className="mb-4 rounded-[22px] border border-[rgba(176,150,111,0.12)] bg-[rgba(255,255,255,0.03)] p-4 shadow-sm">
            <div className="mb-3 flex items-center gap-3">
              <div className={`rounded-xl border border-white/10 p-2 shadow-sm ${active.badgeClass}`}>
                <Image
                  src={active.icon}
                  alt=""
                  width={26}
                  height={26}
                  className="h-6.5 w-6.5 pixelated object-contain"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>
              <div>
                <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a89f92]">
                  {isEn ? active.chip : active.chipTh}
                </div>
                <h3 className="text-xl font-bold text-[#f2ece4] sm:text-2xl">
                  <span style={{ color: active.color }}>{active.letter}</span>{" "}
                  {isEn ? active.label : active.labelTh}
                </h3>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-[#c3b8aa] sm:text-[14px]">
              {isEn ? active.description : active.descriptionTh}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#b1a697] sm:text-[14px]">
              {isEn ? active.detail : active.detailTh}
            </p>
          </div>

          <div className="space-y-3">
            <div className="rounded-[20px] border border-[rgba(176,150,111,0.12)] bg-[rgba(255,255,255,0.03)] p-4">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a89f92]">
                {isEn ? "System Notes" : "หมายเหตุของระบบ"}
              </div>
              <ul className="space-y-2 text-sm leading-relaxed text-[#c3b8aa] sm:text-[14px]">
                <li>
                  {isEn
                    ? "Intent is visually elevated because it changes the curve of the whole system, not just one variable."
                    : "Intent ถูกยกตำแหน่งขึ้นด้านบนเพราะมันเปลี่ยนเส้นโค้งของทั้งระบบ ไม่ใช่แค่ค่าตัวแปรเดียว"}
                </li>
                <li>
                  {isEn
                    ? "Architect stays below the equation to signal review, governance, and human accountability under every output."
                    : "Architect ถูกวางด้านล่างสมการเพื่อสื่อถึงชั้น review, governance และความรับผิดชอบของมนุษย์ที่รองรับทุกผลลัพธ์"}
                </li>
                <li>
                  {isEn
                    ? "Future remains on the right as an output target, reinforcing that FDIA is a construction system, not a prediction toy."
                    : "Future อยู่ด้านขวาในฐานะผลลัพธ์ปลายทาง เพื่อย้ำว่า FDIA คือระบบสร้างผลลัพธ์ ไม่ใช่ของเล่นสำหรับทำนาย"}
                </li>
              </ul>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              <div className="rounded-[20px] border border-warm-amber/16 bg-[linear-gradient(180deg,rgba(212,168,83,0.08),rgba(255,255,255,0.03))] p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-warm-amber">
                  {isEn ? "Intent Lift" : "พลังของ Intent"}
                </div>
                <div className="mt-2 font-mono text-xl font-bold text-warm-amber sm:text-2xl">
                  {intentMultiplier}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#c3b8aa] sm:text-[14px]">
                  {isEn
                    ? "With the same data and architect multiplier, moving intent from 1 to 10 changes the outcome by orders of magnitude."
                    : "เมื่อใช้ data และ architect multiplier เท่าเดิม การขยับ intent จาก 1 ไป 10 ทำให้ผลลัพธ์เปลี่ยนระดับขั้นอย่างมหาศาล"}
                </p>
              </div>

              <div className="rounded-[20px] border border-[rgba(176,150,111,0.12)] bg-[rgba(255,255,255,0.03)] p-4">
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a89f92]">
                  {isEn ? "Selection Shortcuts" : "วิธีใช้งาน"}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-[#c3b8aa] sm:text-[14px]">
                  {isEn
                    ? "Select any node to switch the explanation. The new layout is intentionally denser and cleaner so it can live beside the rest of the homepage system cards."
                    : "เลือก node ใดก็ได้เพื่อเปลี่ยนคำอธิบาย เลย์เอาต์ใหม่นี้ตั้งใจให้กระชับและสะอาดขึ้นเพื่ออยู่ร่วมกับ system card ของหน้าแรกส่วนอื่นได้อย่างกลมกลืน"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
