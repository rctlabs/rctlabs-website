"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { MapPin, X } from "lucide-react"

interface Milestone {
  label: string
  labelTh: string
  type: "launch" | "feature" | "community" | "product" | "dev"
}

interface MonthData {
  monthEn: string
  monthTh: string
  year: number
  isCurrent: boolean
  milestones: Milestone[]
}

const milestoneTypeColors: Record<Milestone["type"], { color: string; bg: string; darkBg: string }> = {
  launch:    { color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15" },
  feature:   { color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15" },
  community: { color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A" },
  product:   { color: "#B8A9C9", bg: "#EDE9FE", darkBg: "#2A1E3A" },
  dev:       { color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25" },
}

const calendarData: MonthData[] = [
  {
    monthEn: "Mar",
    monthTh: "มี.ค.",
    year: 2026,
    isCurrent: true,
    milestones: [
      { label: "Frontend SEO complete", labelTh: "จบงาน Frontend + SEO", type: "launch" },
      { label: "Website soft launch", labelTh: "เปิดตัวเว็บไซต์รอบแรก", type: "launch" },
      { label: "Domain cutover → rctlabs.co", labelTh: "โอย Domain → rctlabs.co", type: "launch" },
    ],
  },
  {
    monthEn: "Apr",
    monthTh: "เม.ย.",
    year: 2026,
    isCurrent: false,
    milestones: [
      { label: "rctlabs.co DNS live", labelTh: "DNS rctlabs.co เปิดใช้งาน", type: "launch" },
      { label: "Google Search Console submission", labelTh: "ส่ง Google Search Console", type: "launch" },
      { label: "Early Access program open", labelTh: "เปิดแผนงาน Early Access", type: "community" },
      { label: "Lifetime Plan available", labelTh: "Lifetime Plan พร้อมใช้งาน", type: "community" },
      { label: "ArtentAI static soft launch", labelTh: "ArtentAI เปิดตัว static mode", type: "feature" },
    ],
  },
  {
    monthEn: "May",
    monthTh: "พ.ค.",
    year: 2026,
    isCurrent: false,
    milestones: [
      { label: "Backend Phase 1: Full RCT OS", labelTh: "Backend Phase 1: Full RCT OS", type: "feature" },
      { label: "ArtentAI: real backend connected", labelTh: "ArtentAI: เชื่อมต่อ Backend จริง", type: "feature" },
      { label: "Typhoon LLM integration", labelTh: "เชื่อมต่อ Typhoon Regional LLM", type: "feature" },
      { label: "GitHub Public launch", labelTh: "เปิด GitHub Public", type: "community" },
      { label: "Full Docs: RCT Ecosystem", labelTh: "Full Docs: RCT Ecosystem", type: "community" },
      { label: "GitHub Coffee (Sponsors) live", labelTh: "GitHub Coffee/Sponsors เปิดแล้ว", type: "community" },
    ],
  },
  {
    monthEn: "Jun",
    monthTh: "มิ.ย.",
    year: 2026,
    isCurrent: false,
    milestones: [
      { label: "ArtentAI Platform launch", labelTh: "เปิดตัว ArtentAI Platform", type: "product" },
      { label: "SignedAI Platform launch", labelTh: "เปิดตัว SignedAI Platform", type: "product" },
      { label: "Product suite: all core products live", labelTh: "Product suite ครบ: เปิดใช้งานทั้งหมด", type: "product" },
    ],
  },
  {
    monthEn: "Jul",
    monthTh: "ก.ค.",
    year: 2026,
    isCurrent: false,
    milestones: [
      { label: "Enterprise onboarding pipeline", labelTh: "Enterprise onboarding pipeline เปิด", type: "product" },
      { label: "Platform optimization cycle", labelTh: "รอบ optimization แพลตฟอร์ม", type: "feature" },
    ],
  },
  {
    monthEn: "Aug",
    monthTh: "ส.ค.",
    year: 2026,
    isCurrent: false,
    milestones: [
      { label: "TUI/CLI Beta — Backend Mode test", labelTh: "TUI/CLI Beta: เริ่ม Test Backend Mode", type: "dev" },
      { label: "TUI/CLI Dev Mode: full access", labelTh: "TUI/CLI Dev Mode: เข้าถึงได้เต็มรูปแบบ", type: "dev" },
      { label: "Developer toolchain complete", labelTh: "Developer toolchain ครบถ้วน", type: "dev" },
    ],
  },
]

export default function RoadmapMilestoneCalendar() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const isDark = resolvedTheme === "dark"
  const isEn = language === "en"

  const [activeTooltip, setActiveTooltip] = useState<{ month: number; milestone: number } | null>(null)

  const handleMilestoneClick = (monthIdx: number, mIdx: number) => {
    if (activeTooltip?.month === monthIdx && activeTooltip?.milestone === mIdx) {
      setActiveTooltip(null)
    } else {
      setActiveTooltip({ month: monthIdx, milestone: mIdx })
    }
  }

  return (
    <div className={`rounded-xl border p-4 sm:p-5 ${isDark ? "bg-warm-charcoal border-border" : "bg-white border-warm-light-gray"}`}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-warm-amber" />
          <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
            {isEn ? "2026 Milestone Calendar" : "ปฏิทินหมุดหมาย 2026"}
          </h3>
        </div>
        <span className={`text-xs ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
          {isEn ? "Mar — Aug 2026" : "มี.ค. — ส.ค. 2569"}
        </span>
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap gap-3">
        {(["launch", "feature", "community", "product", "dev"] as Milestone["type"][]).map((type) => {
          const c = milestoneTypeColors[type]
          const labels: Record<Milestone["type"], { en: string; th: string }> = {
            launch:    { en: "Launch", th: "เปิดตัว" },
            feature:   { en: "Feature", th: "ฟีเจอร์" },
            community: { en: "Community", th: "Community" },
            product:   { en: "Product", th: "Product" },
            dev:       { en: "Dev Tools", th: "Dev Tools" },
          }
          return (
            <div key={type} className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: c.color }} />
              <span className={`text-[10px] ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
                {isEn ? labels[type].en : labels[type].th}
              </span>
            </div>
          )
        })}
      </div>

      {/* Calendar strip — horizontally scrollable */}
      <div className="overflow-x-auto pb-2">
        <div className="flex gap-3 min-w-[680px]">
          {calendarData.map((month, monthIdx) => (
            <motion.div
              key={month.monthEn}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: monthIdx * 0.06 }}
              className={`relative flex-1 min-w-[100px] rounded-xl border p-3 transition-colors
                ${month.isCurrent
                  ? isDark
                    ? "border-warm-amber/50 bg-dark-amber-bg"
                    : "border-warm-amber/40 bg-amber-50/60"
                  : isDark
                    ? "border-border bg-warm-charcoal/50"
                    : "border-warm-light-gray bg-white"
                }`}
            >
              {/* Month header */}
              <div className="mb-2.5 flex items-center justify-between">
                <div>
                  <div
                    className={`text-sm font-bold ${
                      month.isCurrent
                        ? "text-warm-amber"
                        : isDark
                          ? "text-warm-light-gray"
                          : "text-warm-charcoal"
                    }`}
                  >
                    {isEn ? month.monthEn : month.monthTh}
                  </div>
                  <div className={`text-[10px] font-mono ${isDark ? "text-warm-subtle" : "text-warm-muted"}`}>
                    {month.year}
                  </div>
                </div>
                {month.isCurrent && (
                  <div className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 bg-warm-amber/20 border border-warm-amber/30">
                    <MapPin size={8} className="text-warm-amber" />
                    <span className="text-[8px] font-bold text-warm-amber">NOW</span>
                  </div>
                )}
              </div>

              {/* Milestones */}
              <div className="space-y-1.5">
                {month.milestones.map((milestone, mIdx) => {
                  const c = milestoneTypeColors[milestone.type]
                  const isActive = activeTooltip?.month === monthIdx && activeTooltip?.milestone === mIdx
                  return (
                    <div key={mIdx} className="relative">
                      <button
                        type="button"
                        onClick={() => handleMilestoneClick(monthIdx, mIdx)}
                        className="flex w-full items-start gap-1.5 rounded-md px-1.5 py-1 text-left transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-warm-amber/50"
                        style={{
                          backgroundColor: isActive
                            ? isDark ? c.darkBg : c.bg
                            : "transparent",
                        }}
                      >
                        <div
                          className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ backgroundColor: c.color }}
                        />
                        <span
                          className={`text-[10px] leading-tight ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}
                        >
                          {isEn ? milestone.label : milestone.labelTh}
                        </span>
                      </button>
                    </div>
                  )
                })}
              </div>

              {/* Milestone count badge for months with many items */}
              {month.milestones.length >= 4 && (
                <div
                  className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full text-[9px] font-bold text-white"
                  style={{ backgroundColor: milestoneTypeColors[month.milestones[0].type].color }}
                >
                  {month.milestones.length}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Active tooltip overlay */}
      <AnimatePresence>
        {activeTooltip !== null && (() => {
          const m = calendarData[activeTooltip.month]
          const milestone = m.milestones[activeTooltip.milestone]
          const c = milestoneTypeColors[milestone.type]
          return (
            <motion.div
              key="tooltip"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className={`mt-3 flex items-start justify-between gap-3 rounded-xl border p-3 ${
                isDark ? "border-border bg-warm-charcoal" : "border-warm-light-gray bg-white shadow-sm"
              }`}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className="mt-0.5 h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: c.color }}
                />
                <div>
                  <div className={`text-xs font-semibold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                    {isEn ? m.monthEn : m.monthTh} {m.year}
                  </div>
                  <div className={`text-sm mt-0.5 ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>
                    {isEn ? milestone.label : milestone.labelTh}
                  </div>
                  <div
                    className="mt-1.5 inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold"
                    style={{ backgroundColor: isDark ? c.darkBg : c.bg, color: c.color }}
                  >
                    {milestone.type.charAt(0).toUpperCase() + milestone.type.slice(1)}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveTooltip(null)}
                className={`shrink-0 rounded-md p-1 transition-colors ${isDark ? "text-warm-dim hover:text-warm-light-gray" : "text-warm-muted hover:text-warm-charcoal"}`}
              >
                <X size={12} />
              </button>
            </motion.div>
          )
        })()}
      </AnimatePresence>
    </div>
  )
}
