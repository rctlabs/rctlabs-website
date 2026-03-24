"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import VersionTimelineGraph from "@/components/diagrams/version-timeline-graph"
import SectionHeading from "@/components/section-heading"
import { useMounted } from "@/hooks/use-mounted"

const PIXEL_ROCKET = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-rocket-icon-oSMB9StjMFt3Nvu8bxaJcw.webp"

const roadmapData = {
  en: [
    { phase: "Phase 1", title: "Core Architecture & FDIA", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["Define FDIA Equation (F = D^I x A)", "Design 10-Layer Architecture Stack", "Build 7 Genome Subsystems", "Implement JITNA Protocol v1"] },
    { phase: "Phase 2", title: "Algorithm Engine & Analysearch", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["Develop 41 Algorithms across 9 Tiers", "Build Analysearch Intent (4 Modes)", "Implement GIGO Protection System", "Create SignedAI Hash Verification"] },
    { phase: "Phase 3", title: "UX/UI & Visual Assets", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["Enterprise-grade website redesign", "Generate FDIA/JITNA/Architecture infographics", "Bilingual (EN/TH) i18n system", "Motion animations & micro-interactions"] },
    { phase: "Phase 4", title: "Integration & Deployment", status: "in-progress" as const, color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15", tasks: ["Connect Notion + GitHub + Vercel via MCP", "Production deployment on Vercel Edge", "API Documentation & Onboarding Guide", "Performance optimization & monitoring"] },
    { phase: "Phase 5", title: "Evolution & Scale", status: "planned" as const, color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A", tasks: ["Self-Evolving Orchestrator (Layer 10)", "Cross-Disciplinary Synthesis Engine", "Marketplace Genome activation", "Sovereign Innovation Infrastructure"] },
  ],
  th: [
    { phase: "Phase 1", title: "Core Architecture & FDIA", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["กำหนดสมการ FDIA (F = D^I x A)", "ออกแบบ 10-Layer Architecture Stack", "สร้าง 7 Genome Subsystems", "Implement JITNA Protocol v1"] },
    { phase: "Phase 2", title: "Algorithm Engine & Analysearch", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["พัฒนา 41 Algorithms ใน 9 Tiers", "สร้าง Analysearch Intent (4 โหมด)", "Implement ระบบ GIGO Protection", "สร้าง SignedAI Hash Verification"] },
    { phase: "Phase 3", title: "UX/UI & Visual Assets", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["ออกแบบเว็บไซต์ระดับ Enterprise", "สร้าง Infographics สำหรับ FDIA/JITNA/Architecture", "ระบบ Bilingual (EN/TH) i18n", "Motion Animations & Micro-Interactions"] },
    { phase: "Phase 4", title: "Integration & Deployment", status: "in-progress" as const, color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15", tasks: ["เชื่อมต่อ Notion + GitHub + Vercel ผ่าน MCP", "Production Deployment บน Vercel Edge", "API Documentation & Onboarding Guide", "Performance Optimization & Monitoring"] },
    { phase: "Phase 5", title: "Evolution & Scale", status: "planned" as const, color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A", tasks: ["Self-Evolving Orchestrator (Layer 10)", "Cross-Disciplinary Synthesis Engine", "เปิดใช้งาน Marketplace Genome", "Sovereign Innovation Infrastructure"] },
  ],
}

const statusIcons = { done: CheckCircle2, "in-progress": Clock, planned: Circle }
const statusLabelsData = {
  en: { done: "Completed", "in-progress": "In Progress", planned: "Planned" },
  th: { done: "เสร็จสิ้น", "in-progress": "กำลังดำเนินการ", planned: "วางแผนไว้" },
}

export default function RoadmapSection() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const roadmap = roadmapData[language as keyof typeof roadmapData] || roadmapData.en
  const statusLabels = statusLabelsData[language as keyof typeof statusLabelsData] || statusLabelsData.en

  return (
    <section id="roadmap" aria-label="Development Roadmap" className={`py-16 md:py-24 transition-colors duration-300 ${isDark ? "bg-dark-900" : "bg-warm-cream"}`}>
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={language === "th" ? "เส้นทางการพัฒนา" : "Roadmap"}
          tagColor="gold"
          title={language === "th" ? "Development Roadmap" : "Development Roadmap"}
          italicWord="Roadmap"
          description="Strategic phases for evolving the RCT Ecosystem from current state to full production deployment."
          pixelIcon={PIXEL_ROCKET}
        />

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-6 flex items-center justify-center gap-2 flex-wrap">
          {roadmap.map((item, index) => {
            const StatusIcon = statusIcons[item.status]
            return (
              <div key={item.phase} className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-lg px-3 py-1.5" style={{ backgroundColor: isDark ? item.darkBg : item.bg }}>
                  <StatusIcon size={14} style={{ color: item.color }} />
                  <span className="text-xs font-semibold" style={{ color: item.color }}>{item.phase.replace("Phase ", "P")}</span>
                </div>
                {index < roadmap.length - 1 && <ArrowRight size={14} className={isDark ? "text-warm-subtle" : "text-muted-foreground/40"} />}
              </div>
            )
          })}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="mb-8">
          <VersionTimelineGraph />
        </motion.div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((item, index) => {
            const StatusIcon = statusIcons[item.status]
            return (
              <motion.div key={item.phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: index * 0.08 }} className={`rounded-2xl border p-6 transition-all duration-300 ${isDark ? "bg-warm-charcoal border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]" : "bg-white border-warm-light-gray hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"} ${item.status === "in-progress" ? "ring-2 ring-warm-amber/30" : ""}`}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl text-xs font-bold" style={{ backgroundColor: isDark ? item.darkBg : item.bg, color: item.color }}>{item.phase.replace("Phase ", "P")}</div>
                  <div className="flex-1">
                    <h3 className={`text-base font-bold ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{item.title}</h3>
                    <div className="mt-0.5 flex items-center gap-1.5">
                      <StatusIcon size={12} style={{ color: item.color }} />
                      <span className="text-xs font-medium" style={{ color: item.color }}>{statusLabels[item.status]}</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  {item.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-start gap-2.5">
                      {item.status === "done" ? <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-warm-sage" /> : <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />}
                      <span className={`text-sm sm:text-[15px] ${item.status === "done" ? isDark ? "text-warm-dim line-through" : "text-warm-gray line-through" : isDark ? "text-warm-dim" : "text-warm-secondary"}`}>{task}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
