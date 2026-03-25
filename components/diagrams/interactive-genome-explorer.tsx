"use client"

import { useMemo, useState } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useTheme } from "next-themes"

interface GenomeParam {
  name: string
  value: string
  desc: string
}

interface GenomeItem {
  id: string
  name: string
  symbol: string
  color: string
  desc: string
  version: string
  evolution: string[]
  params: GenomeParam[]
  connections: string[]
}

const genomesData: Record<"en" | "th", GenomeItem[]> = {
  en: [
    { id: "why", name: "WHY Genome", symbol: "G1", color: "#D4A853", desc: "Defines purpose, intent, and the directional logic behind every action in the system.", version: "v3.0", evolution: ["Goal alignment core", "Intent decomposition", "Outcome-first orchestration"], params: [{ name: "Purpose Map", value: "Active", desc: "Keeps all actions aligned with a defined goal" }, { name: "Intent Weight", value: "High", desc: "Prioritizes purpose over raw token prediction" }, { name: "Decision Frame", value: "Outcome-first", desc: "Routes decisions toward end-state value" }], connections: ["WHAT", "HOW", "IMPROVEMENT"] },
    { id: "what", name: "WHAT Genome", symbol: "G2", color: "#89B4C8", desc: "Controls what knowledge, memory, and data the system should retrieve to fulfill a goal.", version: "v2.7", evolution: ["Keyword retrieval", "Semantic retrieval", "Structured knowledge routing"], params: [{ name: "Retrieval Mode", value: "Hybrid", desc: "Combines vector, graph, and structured memory" }, { name: "Context Window", value: "Adaptive", desc: "Balances relevance with context size" }, { name: "Source Priority", value: "Verified", desc: "Prefers high-confidence sources" }], connections: ["WHY", "HOW", "WHERE"] },
    { id: "how", name: "HOW Genome", symbol: "G3", color: "#C4745B", desc: "Orchestrates execution using FDIA, algorithm routing, and multi-model processing strategies.", version: "v3.1", evolution: ["Static pipelines", "FDIA orchestration", "Dynamic algorithm routing"], params: [{ name: "FDIA Mode", value: "Enabled", desc: "Uses Future = Data^Intent × Architect" }, { name: "Algorithm Pool", value: "41", desc: "Access to 41 proprietary algorithms" }, { name: "Routing", value: "Dynamic", desc: "Selects the best reasoning path in real time" }], connections: ["WHY", "WHAT", "WHO"] },
    { id: "who", name: "WHO Genome", symbol: "G4", color: "#7B9E87", desc: "Handles identity, responsibility, and which agents or humans are authorized to act.", version: "v2.2", evolution: ["Basic roles", "RBAC enforcement", "Agent-human accountability"], params: [{ name: "Identity Layer", value: "RBAC", desc: "Matches actor capability to system permissions" }, { name: "Trust Model", value: "Signed", desc: "Verifies actor legitimacy" }, { name: "Human Loop", value: "Required", desc: "Keeps governance tied to humans where needed" }], connections: ["HOW", "WHEN", "IMPROVEMENT"] },
    { id: "when", name: "WHEN Genome", symbol: "G5", color: "#B8A9C9", desc: "Coordinates timing, sequencing, and the right moment for execution or escalation.", version: "v2.0", evolution: ["Static schedule", "Adaptive timing", "Latency-aware sequencing"], params: [{ name: "Execution Window", value: "Adaptive", desc: "Aligns response timing with task urgency" }, { name: "Refresh Rate", value: "Contextual", desc: "Keeps time-sensitive knowledge current" }, { name: "Escalation Rule", value: "Threshold-based", desc: "Triggers deeper review when needed" }], connections: ["WHO", "WHERE", "IMPROVEMENT"] },
    { id: "where", name: "WHERE Genome", symbol: "G6", color: "#D4A853", desc: "Determines deployment, routing region, and infrastructure locality for optimal performance.", version: "v2.4", evolution: ["Single region", "Regional awareness", "Latency-optimized placement"], params: [{ name: "Topology", value: "Distributed", desc: "Supports cloud, edge, and mixed placement" }, { name: "Latency Target", value: "Low", desc: "Optimizes service placement around response time" }, { name: "Residency", value: "Policy-based", desc: "Keeps workloads aligned with jurisdictional rules" }], connections: ["WHAT", "WHEN", "IMPROVEMENT"] },
    { id: "improvement", name: "IMPROVEMENT Genome", symbol: "G7", color: "#C4745B", desc: "Drives feedback, evolution, and continuous optimization across the full genome loop.", version: "v3.0", evolution: ["Manual tuning", "Feedback-assisted learning", "Continuous self-improvement"], params: [{ name: "Feedback Loop", value: "Continuous", desc: "Uses outcomes to refine future behavior" }, { name: "Regression Guard", value: "Active", desc: "Prevents degraded evolution" }, { name: "Optimization", value: "Cross-genome", desc: "Improves not one part, but the entire cycle" }], connections: ["WHY", "WHO", "WHEN", "WHERE"] },
  ],
  th: [
    { id: "why", name: "WHY Genome", symbol: "G1", color: "#D4A853", desc: "กำหนดเป้าประสงค์ เจตนา และตรรกะเชิงทิศทางของทุกการกระทำในระบบ", version: "v3.0", evolution: ["จัดแนวเป้าหมาย", "แตก intent", "orchestration แบบ outcome-first"], params: [{ name: "Purpose Map", value: "Active", desc: "ทำให้ทุกการกระทำยังผูกกับเป้าหมายหลัก" }, { name: "Intent Weight", value: "High", desc: "ให้น้ำหนักกับ purpose มากกว่าการเดาคำถัดไป" }, { name: "Decision Frame", value: "Outcome-first", desc: "ผลักการตัดสินใจไปสู่คุณค่าปลายทาง" }], connections: ["WHAT", "HOW", "IMPROVEMENT"] },
    { id: "what", name: "WHAT Genome", symbol: "G2", color: "#89B4C8", desc: "ควบคุมว่าระบบควรดึงความรู้ หน่วยความจำ และข้อมูลใดมาสนับสนุนเป้าหมาย", version: "v2.7", evolution: ["ค้นแบบ keyword", "ค้นแบบ semantic", "routing ความรู้แบบมีโครงสร้าง"], params: [{ name: "Retrieval Mode", value: "Hybrid", desc: "รวม vector, graph และ structured memory" }, { name: "Context Window", value: "Adaptive", desc: "สมดุลความเกี่ยวข้องกับขนาด context" }, { name: "Source Priority", value: "Verified", desc: "ให้ความสำคัญกับแหล่งข้อมูลที่เชื่อถือได้" }], connections: ["WHY", "HOW", "WHERE"] },
    { id: "how", name: "HOW Genome", symbol: "G3", color: "#C4745B", desc: "ประสาน execution ด้วย FDIA, algorithm routing และกลยุทธ์การประมวลผลหลายโมเดล", version: "v3.1", evolution: ["pipeline แบบคงที่", "FDIA orchestration", "algorithm routing แบบ dynamic"], params: [{ name: "FDIA Mode", value: "Enabled", desc: "ใช้ Future = Data^Intent × Architect" }, { name: "Algorithm Pool", value: "41", desc: "เข้าถึงอัลกอริทึมเฉพาะ 41 ตัว" }, { name: "Routing", value: "Dynamic", desc: "เลือก reasoning path ที่เหมาะสมแบบเรียลไทม์" }], connections: ["WHY", "WHAT", "WHO"] },
    { id: "who", name: "WHO Genome", symbol: "G4", color: "#7B9E87", desc: "จัดการตัวตน ความรับผิดชอบ และกำหนดว่า agent หรือมนุษย์ใดมีสิทธิ์ดำเนินการ", version: "v2.2", evolution: ["roles พื้นฐาน", "RBAC", "accountability ระหว่าง agent กับมนุษย์"], params: [{ name: "Identity Layer", value: "RBAC", desc: "จับคู่ actor กับสิทธิ์ในระบบ" }, { name: "Trust Model", value: "Signed", desc: "ตรวจสอบความถูกต้องของผู้กระทำ" }, { name: "Human Loop", value: "Required", desc: "คง governance ที่ผูกกับมนุษย์ไว้" }], connections: ["HOW", "WHEN", "IMPROVEMENT"] },
    { id: "when", name: "WHEN Genome", symbol: "G5", color: "#B8A9C9", desc: "ประสานเวลา ลำดับขั้น และจังหวะที่เหมาะสมของการดำเนินการหรือ escalation", version: "v2.0", evolution: ["ตารางเวลาแบบคงที่", "timing แบบ adaptive", "sequencing ที่คำนึงถึง latency"], params: [{ name: "Execution Window", value: "Adaptive", desc: "จัดเวลาตอบสนองตามความเร่งด่วนของงาน" }, { name: "Refresh Rate", value: "Contextual", desc: "รักษาความใหม่ของความรู้ที่อิงเวลา" }, { name: "Escalation Rule", value: "Threshold-based", desc: "ยกระดับการตรวจสอบเมื่อจำเป็น" }], connections: ["WHO", "WHERE", "IMPROVEMENT"] },
    { id: "where", name: "WHERE Genome", symbol: "G6", color: "#D4A853", desc: "กำหนด topology, region routing และ locality ของโครงสร้างพื้นฐานเพื่อประสิทธิภาพสูงสุด", version: "v2.4", evolution: ["single region", "รับรู้หลายภูมิภาค", "placement ที่คำนึงถึง latency"], params: [{ name: "Topology", value: "Distributed", desc: "รองรับ cloud, edge และ mixed placement" }, { name: "Latency Target", value: "Low", desc: "วาง service ตามเป้าหมาย response time" }, { name: "Residency", value: "Policy-based", desc: "ให้ workload สอดคล้องข้อกำหนดเขตข้อมูล" }], connections: ["WHAT", "WHEN", "IMPROVEMENT"] },
    { id: "improvement", name: "IMPROVEMENT Genome", symbol: "G7", color: "#C4745B", desc: "ขับเคลื่อน feedback, evolution และ optimization ต่อเนื่องข้ามทั้งวงจร genome", version: "v3.0", evolution: ["manual tuning", "เรียนรู้จาก feedback", "continuous self-improvement"], params: [{ name: "Feedback Loop", value: "Continuous", desc: "ใช้ผลลัพธ์จริงมาปรับพฤติกรรมรอบต่อไป" }, { name: "Regression Guard", value: "Active", desc: "ป้องกันการพัฒนาที่ทำให้ประสิทธิภาพถอยหลัง" }, { name: "Optimization", value: "Cross-genome", desc: "ปรับปรุงทั้งวงจร ไม่ใช่แค่จุดเดียว" }], connections: ["WHY", "WHO", "WHEN", "WHERE"] },
  ],
}

export default function InteractiveGenomeExplorer({ language = "en" }: { language?: "en" | "th" }) {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const prefersReducedMotion = useReducedMotion()
  const genomes = useMemo(() => genomesData[language], [language])
  const [activeGenome, setActiveGenome] = useState<string>(genomes[0].id)
  const [focusedIndex, setFocusedIndex] = useState(0)
  const activeData = genomes.find((genome) => genome.id === activeGenome) ?? genomes[0]

  return (
    <div
      onKeyDown={(event) => {
        switch (event.key) {
          case "ArrowRight":
          case "ArrowDown":
            event.preventDefault()
            setFocusedIndex((prev) => (prev + 1) % genomes.length)
            break
          case "ArrowLeft":
          case "ArrowUp":
            event.preventDefault()
            setFocusedIndex((prev) => (prev - 1 + genomes.length) % genomes.length)
            break
          case "Enter":
          case " ":
            event.preventDefault()
            setActiveGenome(genomes[focusedIndex].id)
            break
        }
      }}
      className={`rounded-2xl border p-4 sm:p-5 ${isDark ? "bg-warm-charcoal border-border" : "bg-white border-warm-light-gray shadow-[0_8px_30px_rgba(0,0,0,0.06)]"}`}
      role="application"
      aria-label="Interactive genome explorer"
      tabIndex={0}
    >
      <div className="mb-4 text-center">
        <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
          {language === "en" ? "Interactive Genome Explorer" : "ตัวสำรวจ Genome แบบโต้ตอบ"}
        </h3>
        <p className={`mt-1 text-xs ${isDark ? "text-warm-subtle" : "text-warm-secondary"}`}>
          {language === "en" ? "Select a genome to inspect evolution, parameters, and cross-connections." : "เลือก genome เพื่อดูวิวัฒนาการ พารามิเตอร์ และการเชื่อมต่อ"}
        </p>
      </div>

      <div className="mb-4 flex flex-wrap justify-center gap-2.5">
        {genomes.map((genome, index) => {
          const isActive = genome.id === activeGenome
          return (
            <motion.button
              key={genome.id}
              type="button"
              onClick={() => {
                setActiveGenome(genome.id)
                setFocusedIndex(index)
              }}
              onFocus={() => setFocusedIndex(index)}
              whileHover={prefersReducedMotion ? undefined : { y: -2 }}
              whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
              className={`min-w-23 rounded-xl border px-3 py-3 text-center transition-all duration-300 ${
                isActive
                  ? "shadow-md"
                  : isDark
                    ? "border-border bg-dark-900"
                    : "border-warm-light-gray bg-warm-cream/60"
              }`}
              style={isActive ? { borderColor: genome.color, backgroundColor: `${genome.color}14` } : undefined}
            >
              <div className="mx-auto mb-1.5 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ backgroundColor: genome.color }}>
                {genome.symbol}
              </div>
              <div className={`text-[11px] font-semibold leading-tight ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                {genome.name.replace(" Genome", "")}
              </div>
              <div className={`mt-1 font-mono text-[9px] ${isDark ? "text-warm-subtle" : "text-warm-gray"}`}>{genome.version}</div>
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeData.id}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
          transition={prefersReducedMotion ? { duration: 0.01 } : { duration: 0.2 }}
          className="rounded-2xl border p-4 sm:p-5"
          style={{ borderColor: `${activeData.color}45`, backgroundColor: isDark ? "rgba(255,255,255,0.02)" : `${activeData.color}08` }}
        >
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white" style={{ backgroundColor: activeData.color }}>
              {activeData.symbol}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <h4 className={`text-base font-bold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{activeData.name}</h4>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-mono" style={{ backgroundColor: `${activeData.color}18`, color: activeData.color }}>{activeData.version}</span>
              </div>
              <p className={`text-sm leading-relaxed ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>{activeData.desc}</p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: activeData.color }}>
                {language === "en" ? "Configuration Parameters" : "พารามิเตอร์การตั้งค่า"}
              </div>
              <div className="space-y-2.5">
                {activeData.params.map((param) => (
                  <div key={param.name} className={`rounded-xl border p-3 ${isDark ? "border-border bg-dark-900" : "border-white/60 bg-white/80"}`}>
                    <div className="mb-1 flex items-center justify-between gap-3">
                      <span className={`text-sm font-semibold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{param.name}</span>
                      <span className="rounded px-1.5 py-0.5 font-mono text-[10px]" style={{ backgroundColor: `${activeData.color}15`, color: activeData.color }}>{param.value}</span>
                    </div>
                    <p className={`text-xs leading-relaxed ${isDark ? "text-warm-dim-alt" : "text-warm-secondary"}`}>{param.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: activeData.color }}>
                  {language === "en" ? "Evolution History" : "ประวัติวิวัฒนาการ"}
                </div>
                <div className="space-y-2">
                  {activeData.evolution.map((step) => (
                    <div key={step} className="flex items-start gap-2">
                      <ChevronRight size={14} className="mt-0.5 shrink-0" style={{ color: activeData.color }} />
                      <span className={`text-sm ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="mb-2 text-[10px] font-semibold uppercase tracking-wider" style={{ color: activeData.color }}>
                  {language === "en" ? "Connected Genomes" : "Genomes ที่เชื่อมต่อ"}
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeData.connections.map((connection) => (
                    <span key={connection} className="rounded-full px-2.5 py-1 text-xs font-medium" style={{ backgroundColor: `${activeData.color}14`, color: activeData.color }}>
                      {connection}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}