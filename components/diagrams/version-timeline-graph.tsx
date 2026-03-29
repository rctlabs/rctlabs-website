"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"

interface VersionPoint {
  ver: string
  name: string
  date: string
  features: number
  tests: number
  status: "stable" | "production" | "latest" | "planned"
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
  { ver: "2.7.0", name: "Enterprise", date: "Mar 2026", features: 30, tests: 2210, status: "latest" },
  { ver: "3.0.0", name: "Public Launch", date: "Apr 2026", features: 35, tests: 2400, status: "planned" },
  { ver: "3.5.0", name: "Full RCT OS", date: "May 2026", features: 42, tests: 2700, status: "planned" },
  { ver: "4.0.0", name: "ArtentAI+", date: "Jul 2026", features: 55, tests: 3200, status: "planned" },
  { ver: "5.0.0", name: "TUI/CLI", date: "Aug 2026", features: 65, tests: 3800, status: "planned" },
]

const maxFeatures = 65
const maxTests = 3800
// Index of last "real" version (0-based) — the "NOW" divider sits after this index
const NOW_INDEX = 8

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
  const padB = 65
  const chartW = svgW - padL - padR
  const chartH = svgH - padT - padB
  const xStep = chartW / (versions.length - 1)

  // Split paths: historical (0..NOW_INDEX) vs planned (NOW_INDEX..end)
  const buildPath = (vList: VersionPoint[], startIdx: number, endIdx: number, yFn: (v: VersionPoint) => number) =>
    vList
      .slice(startIdx, endIdx + 1)
      .map((v, i) => {
        const x = padL + (startIdx + i) * xStep
        const y = yFn(v)
        return `${i === 0 ? "M" : "L"} ${x} ${y}`
      })
      .join(" ")

  const yF = (v: VersionPoint) => padT + chartH - (v.features / maxFeatures) * chartH
  const yT = (v: VersionPoint) => padT + chartH - (v.tests / maxTests) * chartH

  const featurePathHist = buildPath(versions, 0, NOW_INDEX, yF)
  const featurePathPlan = buildPath(versions, NOW_INDEX, versions.length - 1, yF)
  const testPathHist = buildPath(versions, 0, NOW_INDEX, yT)
  const testPathPlan = buildPath(versions, NOW_INDEX, versions.length - 1, yT)

  // Area fills (historical only)
  const featureArea = `${featurePathHist} L ${padL + NOW_INDEX * xStep} ${padT + chartH} L ${padL} ${padT + chartH} Z`
  const testArea = `${testPathHist} L ${padL + NOW_INDEX * xStep} ${padT + chartH} L ${padL} ${padT + chartH} Z`

  // NOW divider x position
  const nowX = padL + NOW_INDEX * xStep

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
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-4 border border-dashed border-warm-amber/60 rounded-sm" />
            <span className={`text-xs ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>{isEn ? "Planned" : "แผนงาน"}</span>
          </div>
        </div>
      </div>

      <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full" role="img" aria-label="Version timeline graph showing historical and planned versions">
        {/* Grid lines */}
        {[0, 0.25, 0.5, 0.75, 1].map((pct) => {
          const y = padT + chartH - pct * chartH
          return <line key={pct} x1={padL} y1={y} x2={svgW - padR} y2={y} stroke={isDark ? "#2A2A2A" : "#E8E3DC"} strokeWidth={1} />
        })}

        {/* Planned zone background */}
        <rect x={nowX} y={padT} width={svgW - padR - nowX} height={chartH} fill={isDark ? "rgba(212,168,83,0.03)" : "rgba(212,168,83,0.04)"} />

        {/* Area fills — historical only */}
        <motion.path d={featureArea} fill={isDark ? "rgba(212,168,83,0.08)" : "rgba(212,168,83,0.06)"} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }} />
        <motion.path d={testArea} fill={isDark ? "rgba(123,158,135,0.08)" : "rgba(123,158,135,0.06)"} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} />

        {/* Historical solid paths */}
        <motion.path d={featurePathHist} fill="none" stroke="#D4A853" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.0, ease: "easeOut" }} />
        <motion.path d={testPathHist} fill="none" stroke="#7B9E87" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.0, ease: "easeOut", delay: 0.15 }} />

        {/* Planned dashed paths */}
        <motion.path d={featurePathPlan} fill="none" stroke="#D4A853" strokeWidth={1.5} strokeDasharray="6 4" strokeLinecap="round" strokeLinejoin="round" opacity={0.6} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.0, ease: "easeOut", delay: 0.3 }} />
        <motion.path d={testPathPlan} fill="none" stroke="#7B9E87" strokeWidth={1.5} strokeDasharray="6 4" strokeLinecap="round" strokeLinejoin="round" opacity={0.6} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.0, ease: "easeOut", delay: 0.45 }} />

        {/* NOW vertical divider */}
        <line x1={nowX} y1={padT - 4} x2={nowX} y2={padT + chartH} stroke="#D4A853" strokeWidth={1.5} strokeDasharray="5 3" opacity={0.7} />
        <rect x={nowX - 16} y={padT - 16} width={32} height={14} rx={4} fill="#D4A853" opacity={0.9} />
        <text x={nowX} y={padT - 5} textAnchor="middle" fontSize={8} fontWeight={700} fontFamily="monospace" fill="#0a0a0a">NOW</text>

        {/* Data points */}
        {versions.map((version, index) => {
          const x = padL + index * xStep
          const fY = yF(version)
          const tY = yT(version)
          const isHov = hovered === index
          const isPlanned = version.status === "planned"
          const bgFill = isDark ? "#1A1A1A" : "#fff"

          return (
            <g key={version.ver} onMouseEnter={() => setHovered(index)} onMouseLeave={() => setHovered(null)} className="cursor-pointer">
              {isHov && <line x1={x} y1={padT} x2={x} y2={padT + chartH} stroke={isDark ? "#444" : "#D4D0C8"} strokeWidth={1} strokeDasharray="4 4" />}

              {/* Feature dot: solid for real, hollow for planned */}
              <motion.circle
                cx={x} cy={fY}
                r={isHov ? 5 : 3}
                fill={isPlanned ? bgFill : "#D4A853"}
                stroke="#D4A853"
                strokeWidth={isPlanned ? 1.5 : 2}
                opacity={isPlanned ? 0.75 : 1}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: isPlanned ? 0.75 : 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.07 }}
              />
              {/* Test dot */}
              <motion.circle
                cx={x} cy={tY}
                r={isHov ? 5 : 3}
                fill={isPlanned ? bgFill : "#7B9E87"}
                stroke="#7B9E87"
                strokeWidth={isPlanned ? 1.5 : 2}
                opacity={isPlanned ? 0.75 : 1}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: isPlanned ? 0.75 : 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + index * 0.07 }}
              />

              {/* Version labels */}
              <text x={x} y={padT + chartH + 16} textAnchor="middle" fontSize={isPlanned ? 8 : 9} fontWeight={isHov ? 700 : 500} fontFamily="monospace" fill={isHov ? "#D4A853" : isPlanned ? (isDark ? "#555" : "#BBB") : (isDark ? "#666" : "#999")}>{`v${version.ver}`}</text>
              <text x={x} y={padT + chartH + 27} textAnchor="middle" fontSize={7} fill={isDark ? "#444" : "#BBB"}>{version.date}</text>

              {/* Status dot */}
              <circle
                cx={x} cy={padT + chartH + 40}
                r={isPlanned ? 2.5 : 3}
                fill={isPlanned ? "none" : version.status === "latest" ? "#22C55E" : version.status === "production" ? "#D4A853" : (isDark ? "#555" : "#CCC")}
                stroke={isPlanned ? (isDark ? "#555" : "#CCC") : "none"}
                strokeWidth={isPlanned ? 1 : 0}
                strokeDasharray={isPlanned ? "2 2" : "0"}
              />

              {/* Hover tooltip */}
              {isHov && (
                <g>
                  <rect x={Math.max(5, Math.min(x - 65, svgW - 135))} y={Math.min(fY, tY) - 58} width={130} height={isPlanned ? 54 : 48} rx={6} fill={isDark ? "#333" : "#1A1A1A"} opacity={0.95} />
                  <text x={Math.max(70, Math.min(x, svgW - 70))} y={Math.min(fY, tY) - 40} textAnchor="middle" fontSize={10} fontWeight={700} fill="#D4A853" fontFamily="monospace">{`v${version.ver} — ${version.name}`}</text>
                  <text x={Math.max(70, Math.min(x, svgW - 70))} y={Math.min(fY, tY) - 24} textAnchor="middle" fontSize={9} fill="#CCC">{`${version.features} ${isEn ? "features" : "ฟีเจอร์"} · ${version.tests.toLocaleString()} ${isEn ? "tests" : "เทสต์"}`}</text>
                  {isPlanned && <text x={Math.max(70, Math.min(x, svgW - 70))} y={Math.min(fY, tY) - 10} textAnchor="middle" fontSize={8} fill="#D4A853" fontFamily="monospace">{isEn ? "⬡ planned" : "⬡ แผนงาน"}</text>}
                </g>
              )}
            </g>
          )
        })}

        {/* Y axis labels */}
        <text x={padL - 8} y={padT + 4} textAnchor="end" fontSize={8} fill={isDark ? "#555" : "#999"} fontFamily="monospace">100%</text>
        <text x={padL - 8} y={padT + chartH + 4} textAnchor="end" fontSize={8} fill={isDark ? "#555" : "#999"} fontFamily="monospace">0</text>
      </svg>
    </div>
  )
}
