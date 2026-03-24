"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"

interface VersionPoint {
  ver: string
  name: string
  date: string
  features: number
  tests: number
  status: "stable" | "production" | "latest"
}

const versions: VersionPoint[] = [
  { ver: "1.0", name: "Foundation", date: "Dec 2025", features: 1, tests: 0, status: "stable" },
  { ver: "2.0", name: "Test Integration", date: "Jan 9", features: 2, tests: 150, status: "stable" },
  { ver: "3.0", name: "Cross-chat", date: "Jan 10", features: 4, tests: 200, status: "stable" },
  { ver: "5.0", name: "Ultimate", date: "Jan 15", features: 8, tests: 520, status: "stable" },
  { ver: "5.1", name: "Genome", date: "Jan 15", features: 11, tests: 600, status: "production" },
  { ver: "6.0", name: "Testing", date: "Jan 20", features: 15, tests: 902, status: "production" },
  { ver: "7.0", name: "Complete", date: "Jan 31", features: 20, tests: 1500, status: "production" },
  { ver: "8.0", name: "Universal", date: "Feb 2", features: 25, tests: 2000, status: "production" },
  { ver: "2.7.0", name: "Enterprise", date: "Mar 10", features: 30, tests: 2210, status: "latest" },
]

const maxFeatures = 30
const maxTests = 2210

export default function VersionTimelineGraph() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const isDark = resolvedTheme === "dark"
  const isEn = language === "en"
  const [hovered, setHovered] = useState<number | null>(null)

  const svgW = 700
  const svgH = 300
  const padL = 50
  const padR = 30
  const padT = 40
  const padB = 60
  const chartW = svgW - padL - padR
  const chartH = svgH - padT - padB
  const xStep = chartW / (versions.length - 1)

  const featurePath = versions
    .map((version, index) => {
      const x = padL + index * xStep
      const y = padT + chartH - (version.features / maxFeatures) * chartH
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  const testPath = versions
    .map((version, index) => {
      const x = padL + index * xStep
      const y = padT + chartH - (version.tests / maxTests) * chartH
      return `${index === 0 ? "M" : "L"} ${x} ${y}`
    })
    .join(" ")

  const featureArea = `${featurePath} L ${padL + (versions.length - 1) * xStep} ${padT + chartH} L ${padL} ${padT + chartH} Z`
  const testArea = `${testPath} L ${padL + (versions.length - 1) * xStep} ${padT + chartH} L ${padL} ${padT + chartH} Z`

  return (
    <div className={`rounded-xl border p-4 ${isDark ? "bg-warm-charcoal border-border" : "bg-white border-warm-light-gray"}`}>
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-warm-amber" />
          <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
            {isEn ? "Version Evolution" : "วิวัฒนาการเวอร์ชัน"}
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-1 w-3 rounded bg-warm-amber" />
            <span className={`text-xs ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>{isEn ? "Features" : "ฟีเจอร์"}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-1 w-3 rounded bg-warm-sage" />
            <span className={`text-xs ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>{isEn ? "Tests" : "เทสต์"}</span>
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" role="img" aria-label="Version timeline graph">
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = padT + chartH - pct * chartH
          return <line key={pct} x1={padL} y1={y} x2={svgW - padR} y2={y} stroke={isDark ? "#2A2A2A" : "#E8E3DC"} strokeWidth={1} />
        })}

        <motion.path d={featureArea} fill={isDark ? "rgba(212,168,83,0.08)" : "rgba(212,168,83,0.06)"} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        <motion.path d={testArea} fill={isDark ? "rgba(123,158,135,0.08)" : "rgba(123,158,135,0.06)"} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />

        <motion.path d={featurePath} fill="none" stroke="#D4A853" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut" }} />
        <motion.path d={testPath} fill="none" stroke="#7B9E87" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }} />

        {versions.map((version, index) => {
          const x = padL + index * xStep
          const yF = padT + chartH - (version.features / maxFeatures) * chartH
          const yT = padT + chartH - (version.tests / maxTests) * chartH
          const isHov = hovered === index
          return (
            <g key={version.ver} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
              {isHov && <line x1={x} y1={padT} x2={x} y2={padT + chartH} stroke={isDark ? "#444" : "#D4D0C8"} strokeWidth={1} strokeDasharray="4 4" />}
              <motion.circle cx={x} cy={yF} r={isHov ? 5 : 3} fill="#D4A853" stroke={isDark ? "#1A1A1A" : "#fff"} strokeWidth={2} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 + index * 0.08 }} />
              <motion.circle cx={x} cy={yT} r={isHov ? 5 : 3} fill="#7B9E87" stroke={isDark ? "#1A1A1A" : "#fff"} strokeWidth={2} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.6 + index * 0.08 }} />
              <text x={x} y={padT + chartH + 16} textAnchor="middle" fontSize={9} fontWeight={isHov ? 700 : 500} fontFamily="monospace" fill={isHov ? "#D4A853" : isDark ? "#666" : "#999"}>{`v${version.ver}`}</text>
              <text x={x} y={padT + chartH + 28} textAnchor="middle" fontSize={7} fill={isDark ? "#555" : "#AAA"}>{version.date}</text>
              <circle cx={x} cy={padT + chartH + 40} r={3} fill={version.status === "latest" ? "#22C55E" : version.status === "production" ? "#D4A853" : isDark ? "#555" : "#CCC"} />
              {isHov && (
                <g>
                  <rect x={Math.max(5, Math.min(x - 65, svgW - 135))} y={Math.min(yF, yT) - 55} width={130} height={48} rx={6} fill={isDark ? "#333" : "#1A1A1A"} opacity={0.95} />
                  <text x={Math.max(70, Math.min(x, svgW - 70))} y={Math.min(yF, yT) - 38} textAnchor="middle" fontSize={10} fontWeight={700} fill="#D4A853" fontFamily="monospace">{`v${version.ver} — ${version.name}`}</text>
                  <text x={Math.max(70, Math.min(x, svgW - 70))} y={Math.min(yF, yT) - 22} textAnchor="middle" fontSize={9} fill="#CCC">{`${version.features} ${isEn ? "features" : "ฟีเจอร์"} · ${version.tests.toLocaleString()} ${isEn ? "tests" : "เทสต์"}`}</text>
                </g>
              )}
            </g>
          )
        })}

        <text x={padL - 8} y={padT + 4} textAnchor="end" fontSize={8} fill={isDark ? "#555" : "#999"} fontFamily="monospace">100%</text>
        <text x={padL - 8} y={padT + chartH + 4} textAnchor="end" fontSize={8} fill={isDark ? "#555" : "#999"} fontFamily="monospace">0</text>
      </svg>
    </div>
  )
}
