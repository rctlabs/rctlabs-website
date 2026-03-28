"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react"
import { useTheme } from "next-themes"
import { useLanguage } from "@/components/language-provider"
import VersionTimelineGraph from "@/components/diagrams/version-timeline-graph"
import SectionHeading from "@/components/section-heading"
import { useMounted } from "@/hooks/use-mounted"
import { pixelIcons } from "@/lib/pixel-icons"

const PIXEL_ROCKET = pixelIcons.rocket

const roadmapData = {
  en: [
    { phase: "Phase 1", title: "Foundations, FDIA, and Core Documentation", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["Define FDIA Equation (F = D^I x A)", "Design the 10-layer architecture model", "Document the 7 Genome system", "Publish core JITNA and architecture references"] },
    { phase: "Phase 2", title: "HexaCore Infrastructure", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["Complete HexaCore Phase 1 infrastructure", "Ship key manager, registry, routing, and consensus foundation", "Validate 53 targeted tests at 100% pass", "Prepare the Phase 2 implementation runway"] },
    { phase: "Phase 3", title: "Content, Schema & SEO Hardening", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["Published 22 long-form research articles (FDIA, JITNA, RCT-7, SignedAI, PDPA, etc.)", "Enriched BlogPosting schema with image, about[], isPartOf, citation", "Author system: 2 verified entities + full author pages live", "Glossary page with DefinedTerm schemas, editorial policy, methodology"] },
    { phase: "Phase 4", title: "Website Content-Complete & Pre-Launch Hardening", status: "in-progress" as const, color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15", tasks: ["Enterprise blog design: Lucide icons, TOC sidebar, reading progress, share strip", "Schema email standardization + sitemap /authors/* routes", "Compare landing pages for key AI methodology differentiators", "Domain cutover to rctlabs.co — scheduled March 30, 2026"] },
    { phase: "Phase 5", title: "Production Launch and Scale", status: "planned" as const, color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A", tasks: ["rctlabs.co live DNS cutover and Google Search Console submission", "Lighthouse ≥90 score verified on all primary routes", "ArtentAI Product Advisor soft launch", "Enterprise outreach and partnership pipeline"] },
  ],
  th: [
    { phase: "Phase 1", title: "Foundation, FDIA และเอกสารแกนหลัก", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["กำหนดสมการ FDIA (F = D^I x A)", "ออกแบบโมเดลสถาปัตยกรรม 10 ชั้น", "จัดทำเอกสารระบบ 7 Genome", "เผยแพร่เอกสาร JITNA และ architecture แกนหลัก"] },
    { phase: "Phase 2", title: "HexaCore Infrastructure", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["ปิดงาน HexaCore Phase 1 infrastructure", "ส่งมอบ key manager, registry, routing และ consensus foundation", "ยืนยัน targeted tests 53 รายการผ่าน 100%", "เตรียม runway สำหรับการขึ้น Phase 2"] },
    { phase: "Phase 3", title: "Content, Schema และการเสริมความแข็งแกร่ง SEO", status: "done" as const, color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25", tasks: ["เผยแพร่บทความวิจัยเชิงลึก 22 บทความ (FDIA, JITNA, RCT-7, SignedAI, PDPA ฯลฯ)", "เสริม BlogPosting schema ด้วย image, about[], isPartOf, citation", "ระบบ Author: 2 entities ตรวจสอบแล้ว พร้อมหน้า /authors/* ครบถ้วน", "หน้า Glossary พร้อม DefinedTerm schema, editorial policy และ methodology"] },
    { phase: "Phase 4", title: "เว็บไซต์ Content-Complete และ Pre-Launch Hardening", status: "in-progress" as const, color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15", tasks: ["Blog design ระดับองค์กร: Lucide icons, TOC sidebar, reading progress, share strip", "มาตรฐาน schema email + sitemap เส้นทาง /authors/*", "หน้า Compare สำหรับจุดต่างสำคัญของ AI methodology", "Domain cutover ไปยัง rctlabs.co — กำหนด 30 มีนาคม 2026"] },
    { phase: "Phase 5", title: "Production Launch และการขยายระบบ", status: "planned" as const, color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A", tasks: ["เปิดใช้งาน DNS rctlabs.co และส่ง Google Search Console", "ยืนยัน Lighthouse score ≥90 บนทุก route หลัก", "เปิดตัว ArtentAI Product Advisor รอบ soft launch", "เริ่มโปรแกรม enterprise pilot และ partnership pipeline"] },
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
          description={language === "th" ? "ภาพรวมระยะการพัฒนาที่ยึดตามสถานะงานจริงของเดือนมีนาคม 2026 ไม่ใช่ roadmap เชิงการตลาดแบบตัดบริบท" : "Strategic phases aligned to the actual March 2026 engineering state, not an abstract marketing roadmap."}
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
              <motion.div key={item.phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: index * 0.08 }} className={`flex h-full flex-col rounded-[24px] border p-6 sm:p-7 transition-all duration-300 ${isDark ? "bg-warm-charcoal border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]" : "bg-white border-warm-light-gray hover:shadow-[0_10px_32px_rgba(0,0,0,0.07)]"} ${item.status === "in-progress" ? "ring-2 ring-warm-amber/30" : ""}`}>
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-xs font-bold" style={{ backgroundColor: isDark ? item.darkBg : item.bg, color: item.color, borderColor: `${item.color}33` }}>{item.phase.replace("Phase ", "P")}</div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`text-base font-bold leading-snug ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>{item.title}</h3>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <StatusIcon size={12} style={{ color: item.color }} />
                      <span className="text-xs font-medium" style={{ color: item.color }}>{statusLabels[item.status]}</span>
                    </div>
                  </div>
                </div>
                <div className="mt-1 space-y-2.5">
                  {item.tasks.map((task, taskIndex) => (
                    <div key={taskIndex} className="flex items-start gap-2.5">
                      {item.status === "done" ? <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-warm-sage" /> : <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />}
                      <span className={`text-sm leading-relaxed sm:text-[15px] ${item.status === "done" ? isDark ? "text-warm-dim line-through" : "text-warm-gray line-through" : isDark ? "text-warm-dim" : "text-warm-secondary"}`}>{task}</span>
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
