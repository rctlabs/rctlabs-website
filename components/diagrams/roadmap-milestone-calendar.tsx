"use client"

import { motion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { MapPin } from "lucide-react"
import { useMounted } from "@/hooks/use-mounted"

interface Milestone {
  label: string
  labelTh: string
  type: "launch" | "feature" | "community" | "product" | "dev"
}

interface TimelineWindow {
  periodEn: string
  periodTh: string
  yearLabelEn: string
  yearLabelTh: string
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

const calendarData: TimelineWindow[] = [
  {
    periodEn: "Mar",
    periodTh: "มี.ค.",
    yearLabelEn: "2026",
    yearLabelTh: "2569",
    isCurrent: true,
    milestones: [
      { label: "Frontend SEO complete", labelTh: "จบงาน Frontend + SEO", type: "launch" },
      { label: "Website soft launch", labelTh: "เปิดตัวเว็บไซต์รอบแรก", type: "launch" },
      { label: "Primary domain routed to rctlabs.co", labelTh: "โยกโดเมนหลักไปยัง rctlabs.co", type: "launch" },
    ],
  },
  {
    periodEn: "Apr",
    periodTh: "เม.ย.",
    yearLabelEn: "2026",
    yearLabelTh: "2569",
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
    periodEn: "May–Jun",
    periodTh: "พ.ค.–มิ.ย.",
    yearLabelEn: "2026",
    yearLabelTh: "2569",
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
    periodEn: "Jul–Aug",
    periodTh: "ก.ค.–ส.ค.",
    yearLabelEn: "2026",
    yearLabelTh: "2569",
    isCurrent: false,
    milestones: [
      { label: "ArtentAI Platform launch", labelTh: "เปิดตัว ArtentAI Platform", type: "product" },
      { label: "SignedAI Platform launch", labelTh: "เปิดตัว SignedAI Platform", type: "product" },
      { label: "Product suite: all core products live", labelTh: "Product suite ครบ: เปิดใช้งานทั้งหมด", type: "product" },
      { label: "Enterprise onboarding pipeline", labelTh: "Enterprise onboarding pipeline เปิด", type: "product" },
      { label: "Platform optimization cycle", labelTh: "รอบ optimization แพลตฟอร์ม", type: "feature" },
    ],
  },
  {
    periodEn: "Sep–Dec",
    periodTh: "ก.ย.–ธ.ค.",
    yearLabelEn: "2026",
    yearLabelTh: "2569",
    isCurrent: false,
    milestones: [
      { label: "TUI/CLI Beta — Backend Mode test", labelTh: "TUI/CLI Beta: เริ่ม Test Backend Mode", type: "dev" },
      { label: "TUI/CLI Dev Mode: full access", labelTh: "TUI/CLI Dev Mode: เข้าถึงได้เต็มรูปแบบ", type: "dev" },
      { label: "Developer toolchain hardening", labelTh: "จัดระเบียบ developer toolchain ให้เสถียร", type: "dev" },
      { label: "Operational trust surfaces refined", labelTh: "ปรับพื้นผิวความน่าเชื่อถือเชิงปฏิบัติการ", type: "feature" },
    ],
  },
  {
    periodEn: "Q1",
    periodTh: "ไตรมาส 1",
    yearLabelEn: "2027",
    yearLabelTh: "2570",
    isCurrent: false,
    milestones: [
      { label: "v6.0.0 — Full API Layer", labelTh: "v6.0.0 — Full API Layer", type: "feature" },
      { label: "OpenAPI 3.1 documentation", labelTh: "เอกสาร OpenAPI 3.1", type: "feature" },
      { label: "API trust and governance review", labelTh: "ทบทวน trust และ governance ของ API", type: "community" },
    ],
  },
  {
    periodEn: "Q2",
    periodTh: "ไตรมาส 2",
    yearLabelEn: "2027",
    yearLabelTh: "2570",
    isCurrent: false,
    milestones: [
      { label: "v7.0.0 — Kubernetes Helm Charts", labelTh: "v7.0.0 — Kubernetes Helm Charts", type: "dev" },
      { label: "Multi-cloud deployment runway", labelTh: "เตรียม runway สำหรับ multi-cloud deployment", type: "dev" },
      { label: "AWS, GCP, Azure deployment patterns", labelTh: "รูปแบบ deployment สำหรับ AWS, GCP, Azure", type: "dev" },
    ],
  },
  {
    periodEn: "H2",
    periodTh: "ครึ่งหลังปี",
    yearLabelEn: "2027",
    yearLabelTh: "2570",
    isCurrent: false,
    milestones: [
      { label: "v8.0.0 — 20+ Universal Adapters", labelTh: "v8.0.0 — 20+ Universal Adapters", type: "product" },
      { label: "Community marketplace foundation", labelTh: "วางฐาน community marketplace", type: "community" },
      { label: "Product and developer ecosystem expansion", labelTh: "ขยาย product และ developer ecosystem", type: "product" },
    ],
  },
]

export default function RoadmapMilestoneCalendar() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const isEn = language === "en"

  return (
    <div className={`rounded-[24px] border p-4 sm:p-5 lg:p-6 ${isDark ? "bg-warm-charcoal border-border shadow-[0_12px_40px_rgba(0,0,0,0.22)]" : "bg-white border-warm-light-gray shadow-[0_12px_36px_rgba(84,61,31,0.06)]"}`}>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-warm-amber" />
          <h3 className={`text-sm font-semibold uppercase tracking-wider ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
            {isEn ? "2026–2027 Milestone Calendar" : "ปฏิทินหมุดหมาย 2026 - 2027"}
          </h3>
        </div>
        <span className={`text-xs ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
          {isEn ? "Mar 2026 — H2 2027" : "มี.ค. 2569 — ครึ่งหลังปี 2570"}
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

      <div className="mb-4 max-w-3xl text-sm leading-7 text-muted-foreground">
        {isEn
          ? "The milestone calendar is reorganized into stronger windows so long Thai and English labels stay readable, time horizons are clearer, and the roadmap reads more like an executive operating plan than a narrow strip calendar."
          : "ปฏิทินถูกจัดใหม่เป็นช่วงเวลาที่ชัดขึ้น เพื่อให้ข้อความไทยและอังกฤษอ่านได้เต็ม ไม่โดนตัด และทำให้ภาพรวม roadmap ดูเป็น executive operating plan มากกว่าปฏิทินแถบแคบ"}
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {calendarData.map((month, monthIdx) => (
            <motion.div
              key={`${month.periodEn}-${month.yearLabelEn}`}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: monthIdx * 0.06 }}
              whileHover={{ y: -4 }}
              className={`relative flex h-full flex-col rounded-[22px] border p-4 transition-colors
                ${month.isCurrent
                  ? isDark
                    ? "border-warm-amber/50 bg-dark-amber-bg shadow-[0_8px_28px_rgba(212,168,83,0.12)]"
                    : "border-warm-amber/40 bg-amber-50/60 shadow-[0_8px_28px_rgba(212,168,83,0.10)]"
                  : isDark
                    ? "border-border bg-warm-charcoal/50 hover:border-warm-amber/25"
                    : "border-warm-light-gray bg-white hover:border-warm-amber/20"
                }`}
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-warm-amber/25 to-transparent" />

              <div className="mb-4 flex items-start justify-between gap-3">
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
                    {isEn ? month.periodEn : month.periodTh}
                  </div>
                  <div className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "text-warm-subtle" : "text-warm-muted"}`}>
                    {isEn ? month.yearLabelEn : month.yearLabelTh}
                  </div>
                </div>
                {month.isCurrent && (
                  <div className="flex items-center gap-0.5 rounded-full px-1.5 py-0.5 bg-warm-amber/20 border border-warm-amber/30">
                    <MapPin size={8} className="text-warm-amber" />
                    <span className="text-[8px] font-bold text-warm-amber">NOW</span>
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                {month.milestones.map((milestone, mIdx) => {
                  const c = milestoneTypeColors[milestone.type]
                  return (
                    <div key={mIdx} className={`rounded-xl border px-3 py-2.5 ${isDark ? "border-border/80 bg-background/25" : "border-warm-light-gray/80 bg-background/70"}`}>
                      <div className="flex items-start gap-2">
                        <div
                          className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
                          style={{ backgroundColor: c.color }}
                        />
                        <span
                          className={`text-[13px] leading-6 ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}
                        >
                          {isEn ? milestone.label : milestone.labelTh}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-auto pt-4">
                <div className={`flex items-center justify-between border-t pt-3 text-[11px] font-semibold uppercase tracking-[0.18em] ${isDark ? "border-border/80 text-warm-subtle" : "border-warm-light-gray text-warm-muted"}`}>
                  <span>{month.milestones.length} {isEn ? "items" : "รายการ"}</span>
                  <span>{month.isCurrent ? (isEn ? "current window" : "ช่วงปัจจุบัน") : (isEn ? "planned window" : "ช่วงแผนงาน")}</span>
                </div>
              </div>
            </motion.div>
        ))}
      </div>
    </div>
  )
}
