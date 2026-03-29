"use client"

import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, Circle, Clock, Heart, Users, Scale, Target, Trophy, CalendarClock } from "lucide-react"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import VersionTimelineGraph from "@/components/diagrams/version-timeline-graph"
import RoadmapMilestoneCalendar from "@/components/diagrams/roadmap-milestone-calendar"
import SectionHeading from "@/components/section-heading"
import { useMounted } from "@/hooks/use-mounted"
import { pixelIcons } from "@/lib/pixel-icons"

const PIXEL_ROCKET = pixelIcons.rocket

const roadmapData = {
  en: [
    {
      phase: "Phase 1", title: "Foundations, FDIA, and Core Documentation", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      tasks: ["Define FDIA Equation (F = D^I x A)", "Design the 10-layer architecture model", "Document the 7 Genome system", "Publish core JITNA and architecture references"],
    },
    {
      phase: "Phase 2", title: "HexaCore Infrastructure", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      tasks: ["Complete HexaCore Phase 1 infrastructure", "Ship key manager, registry, routing, and consensus foundation", "Validate 53 targeted tests at 100% pass", "Prepare the Phase 2 implementation runway"],
    },
    {
      phase: "Phase 3", title: "Content, Schema & SEO Hardening", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      tasks: ["Published 22 long-form research articles (FDIA, JITNA, RCT-7, SignedAI, PDPA, etc.)", "Enriched BlogPosting schema with image, about[], isPartOf, citation", "Author system: 2 verified entities + full author pages live", "Glossary page with DefinedTerm schemas, editorial policy, methodology"],
    },
    {
      phase: "Phase 4", title: "Website Content-Complete & Pre-Launch Hardening", status: "in-progress" as const,
      color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15",
      tasks: ["Enterprise blog design: Lucide icons, TOC sidebar, reading progress, share strip", "Schema email standardization + sitemap /authors/* routes", "Compare landing pages for key AI methodology differentiators", "Domain cutover to rctlabs.co — scheduled March 30, 2026"],
    },
    {
      phase: "Phase 5", title: "Production Launch & SEO Warmup", status: "planned" as const,
      color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A",
      tasks: ["rctlabs.co DNS live — Early April 2026", "Google Search Console submission + SEO warmup begins", "Early Access program + Lifetime Plan launch", "Market test: first 30-day feedback window", "ArtentAI Product Advisor: static soft launch"],
    },
    {
      phase: "Phase 6", title: "Backend Phase 1 — Full RCT OS", status: "planned" as const,
      color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15",
      tasks: ["ArtentAI Floating Assistant: connected to real HexaCore backend", "Regional LLM integration: Typhoon (Thai-optimized)", "Full RCT OS operational in production", "Live AI responses — not static advisor mode"],
    },
    {
      phase: "Phase 7", title: "Open Source & Community", status: "planned" as const,
      color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A",
      tasks: ["GitHub Public launch — full RCT Ecosystem repo", "Full Documentation: RCT Ecosystem complete", "GitHub Coffee (Sponsors) plan active", "Community feedback loop begins"],
    },
    {
      phase: "Phase 8", title: "ArtentAI + SignedAI Platform Launch", status: "planned" as const,
      color: "#B8A9C9", bg: "#EDE9FE", darkBg: "#2A1E3A",
      tasks: ["ArtentAI Platform: full product launch", "SignedAI Platform: full product launch", "Complete product suite live", "Enterprise onboarding pipeline open"],
    },
    {
      phase: "Phase 9", title: "TUI/CLI Developer Mode", status: "planned" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      tasks: ["TUI/CLI Beta: Backend Mode test opens", "TUI/CLI Dev Mode: full developer access", "Power-user workflow toolset available", "Solo developer toolchain complete"],
    },
  ],
  th: [
    {
      phase: "Phase 1", title: "Foundation, FDIA และเอกสารแกนหลัก", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      tasks: ["กำหนดสมการ FDIA (F = D^I x A)", "ออกแบบโมเดลสถาปัตยกรรม 10 ชั้น", "จัดทำเอกสารระบบ 7 Genome", "เผยแพร่เอกสาร JITNA และ architecture แกนหลัก"],
    },
    {
      phase: "Phase 2", title: "HexaCore Infrastructure", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      tasks: ["ปิดงาน HexaCore Phase 1 infrastructure", "ส่งมอบ key manager, registry, routing และ consensus foundation", "ยืนยัน targeted tests 53 รายการผ่าน 100%", "เตรียม runway สำหรับการขึ้น Phase 2"],
    },
    {
      phase: "Phase 3", title: "Content, Schema และการเสริมความแข็งแกร่ง SEO", status: "done" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      tasks: ["เผยแพร่บทความวิจัยเชิงลึก 22 บทความ (FDIA, JITNA, RCT-7, SignedAI, PDPA ฯลฯ)", "เสริม BlogPosting schema ด้วย image, about[], isPartOf, citation", "ระบบ Author: 2 entities ตรวจสอบแล้ว พร้อมหน้า /authors/* ครบถ้วน", "หน้า Glossary พร้อม DefinedTerm schema, editorial policy และ methodology"],
    },
    {
      phase: "Phase 4", title: "เว็บไซต์ Content-Complete และ Pre-Launch Hardening", status: "in-progress" as const,
      color: "#D4A853", bg: "#FEF3C7", darkBg: "#3A2E15",
      tasks: ["Blog design ระดับองค์กร: Lucide icons, TOC sidebar, reading progress, share strip", "มาตรฐาน schema email + sitemap เส้นทาง /authors/*", "หน้า Compare สำหรับจุดต่างสำคัญของ AI methodology", "Domain cutover ไปยัง rctlabs.co — กำหนด 30 มีนาคม 2026"],
    },
    {
      phase: "Phase 5", title: "เปิดตัว Production & SEO Warmup", status: "planned" as const,
      color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A",
      tasks: ["DNS rctlabs.co เปิดใช้งาน — ต้นเดือน เม.ย. 2026", "ส่ง Google Search Console + เริ่มกระบวนการ SEO warmup", "เปิดแผนงาน Early Access + Lifetime Plan", "Market test: ช่วง feedback 30 วันแรก", "ArtentAI Product Advisor: เปิดตัว static mode รอบแรก"],
    },
    {
      phase: "Phase 6", title: "Backend Phase 1 — Full RCT OS", status: "planned" as const,
      color: "#C4745B", bg: "#FEE2E2", darkBg: "#3A1E15",
      tasks: ["ArtentAI Floating Assistant: เชื่อมต่อ HexaCore backend จริง", "เชื่อมต่อ Regional LLM: Typhoon (Thai-optimized)", "Full RCT OS เปิดใช้งานในสภาพแวดล้อม production", "Live AI response จริง — ไม่ใช่ static mode อีกต่อไป"],
    },
    {
      phase: "Phase 7", title: "Open Source & Community", status: "planned" as const,
      color: "#89B4C8", bg: "#DBEAFE", darkBg: "#152A3A",
      tasks: ["เปิด GitHub Public — repo RCT Ecosystem ทั้งหมด", "Full Documentation: RCT Ecosystem สมบูรณ์", "GitHub Coffee (Sponsors) เปิดใช้งาน", "วงรอบ Community feedback เริ่มต้น"],
    },
    {
      phase: "Phase 8", title: "เปิดตัว ArtentAI + SignedAI Platform", status: "planned" as const,
      color: "#B8A9C9", bg: "#EDE9FE", darkBg: "#2A1E3A",
      tasks: ["ArtentAI Platform: เปิดตัวผลิตภัณฑ์เต็มรูปแบบ", "SignedAI Platform: เปิดตัวผลิตภัณฑ์เต็มรูปแบบ", "Product suite ครบ: เปิดใช้งานทั้งหมด", "Enterprise onboarding pipeline เปิดรับ"],
    },
    {
      phase: "Phase 9", title: "TUI/CLI Developer Mode", status: "planned" as const,
      color: "#7B9E87", bg: "#D1FAE5", darkBg: "#1E3A25",
      tasks: ["TUI/CLI Beta: เริ่ม Test Backend Mode", "TUI/CLI Dev Mode: เข้าถึงได้เต็มรูปแบบ", "Power-user workflow toolset พร้อมใช้", "Developer toolchain แบบ solo ครบถ้วนสมบูรณ์"],
    },
  ],
}

const statusIcons = { done: CheckCircle2, "in-progress": Clock, planned: Circle }
const statusLabelsData = {
  en: { done: "Completed", "in-progress": "In Progress", planned: "Planned" },
  th: { done: "เสร็จสิ้น", "in-progress": "กำลังดำเนินการ", planned: "วางแผนไว้" },
}

const devFactors = {
  en: [
    {
      icon: Heart,
      title: "Community Feedback & Funding",
      description: "Early Access and Lifetime Plan support directly translates to operational capital — accelerating development, enabling new tools, and growing the team sooner.",
      impact: "Accelerator",
      impactType: "positive" as const,
      highlight: true,
    },
    {
      icon: Users,
      title: "Team Growth",
      description: "Solo development now. Future team additions — whether through collaboration, hiring, or community contributors — can multiply delivery speed significantly.",
      impact: "Accelerator",
      impactType: "positive" as const,
      highlight: false,
    },
    {
      icon: Scale,
      title: "Legal & Compliance",
      description: "Post-launch legal processes (entity formation, contracts, compliance review) may run in parallel with development. Legal timelines can occasionally shift product launch dates.",
      impact: "Risk Factor",
      impactType: "neutral" as const,
      highlight: false,
    },
  ],
  th: [
    {
      icon: Heart,
      title: "ผลตอบรับและเงินทุนจากชุมชน",
      description: "การสนับสนุนผ่าน Early Access และ Lifetime Plan แปลงเป็นทุนหมุนเวียนโดยตรง — เร่งการพัฒนา เปิดใช้เครื่องมือใหม่ และขยายทีมได้เร็วขึ้น",
      impact: "ตัวเร่ง",
      impactType: "positive" as const,
      highlight: true,
    },
    {
      icon: Users,
      title: "การขยายทีม",
      description: "ปัจจุบันพัฒนาโดยคนเดียว การเพิ่มสมาชิกทีมในอนาคต ไม่ว่าจะเป็นผู้ร่วมงาน นักพัฒนาที่จ้างมา หรือ contributor จากชุมชน สามารถเพิ่มความเร็วการพัฒนาได้หลายเท่า",
      impact: "ตัวเร่ง",
      impactType: "positive" as const,
      highlight: false,
    },
    {
      icon: Scale,
      title: "กฎหมายและการปฏิบัติตามข้อกำหนด",
      description: "กระบวนการทางกฎหมายหลังเปิดตัว (จัดตั้งนิติบุคคล สัญญา การตรวจสอบ compliance) อาจดำเนินควบคู่กับการพัฒนา และอาจส่งผลต่อกำหนดการเปิดตัวผลิตภัณฑ์",
      impact: "ปัจจัยเสี่ยง",
      impactType: "neutral" as const,
      highlight: false,
    },
  ],
}

export default function RoadmapSection() {
  const { resolvedTheme } = useTheme()
  const { language } = useLanguage()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const roadmap = roadmapData[language as keyof typeof roadmapData] || roadmapData.en
  const statusLabels = statusLabelsData[language as keyof typeof statusLabelsData] || statusLabelsData.en
  const factors = devFactors[language as keyof typeof devFactors] || devFactors.en
  const isEn = language === "en"

  return (
    <section id="roadmap" aria-label="Development Roadmap" className={`py-16 md:py-24 transition-colors duration-300 ${isDark ? "bg-dark-900" : "bg-warm-cream"}`}>
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={isEn ? "Roadmap" : "เส้นทางการพัฒนา"}
          tagColor="gold"
          title="Development Roadmap"
          italicWord="Roadmap"
          description={isEn
            ? "Strategic phases aligned to the actual March 2026 engineering state, not an abstract marketing roadmap."
            : "ภาพรวมระยะการพัฒนาที่ยึดตามสถานะงานจริงของเดือนมีนาคม 2026 ไม่ใช่ roadmap เชิงการตลาดแบบตัดบริบท"}
          pixelIcon={PIXEL_ROCKET}
        />

        {/* Phase progress chain */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
          className="mb-6 flex items-center justify-center gap-2 flex-wrap"
        >
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

        {/* Version Evolution Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="mb-6"
        >
          <VersionTimelineGraph />
        </motion.div>

        {/* Monthly Milestone Calendar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-8"
        >
          <RoadmapMilestoneCalendar />
        </motion.div>

        {/* Phase Cards Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {roadmap.map((item, index) => {
            const StatusIcon = statusIcons[item.status]
            return (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-30px" }} transition={{ duration: 0.5, delay: index * 0.06 }}
                className={`flex h-full flex-col rounded-[24px] border p-6 sm:p-7 transition-all duration-300 ${
                  isDark
                    ? "bg-warm-charcoal border-border hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                    : "bg-white border-warm-light-gray hover:shadow-[0_10px_32px_rgba(0,0,0,0.07)]"
                } ${item.status === "in-progress" ? "ring-2 ring-warm-amber/30" : ""}`}
              >
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-xs font-bold" style={{ backgroundColor: isDark ? item.darkBg : item.bg, color: item.color, borderColor: `${item.color}33` }}>
                    {item.phase.replace("Phase ", "P")}
                  </div>
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
                      {item.status === "done"
                        ? <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-warm-sage" />
                        : <div className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
                      }
                      <span className={`text-sm leading-relaxed sm:text-[15px] ${
                        item.status === "done"
                          ? isDark ? "text-warm-dim line-through" : "text-warm-gray line-through"
                          : isDark ? "text-warm-dim" : "text-warm-secondary"
                      }`}>{task}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Development Velocity Factors */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="mt-14"
        >
          <div className="mb-6 text-center">
            <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
              isDark ? "bg-dark-amber-bg text-warm-amber border-warm-amber/20" : "tag-amber"
            }`}>
              {isEn ? "Velocity Factors" : "ปัจจัยความเร็ว"}
            </span>
            <h2 className={`mt-3 text-2xl sm:text-3xl font-bold tracking-tight ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
              {isEn ? "Development Velocity" : "ความเร็วในการพัฒนา"}
            </h2>
            <p className={`mt-2 text-sm sm:text-base max-w-2xl mx-auto ${isEn ? "" : "subtitle-th"} ${isDark ? "text-warm-muted" : "text-warm-secondary"}`}>
              {isEn
                ? "Development speed may vary month-to-month. These are the primary factors that can accelerate or shift the timeline."
                : "ความเร็วการพัฒนาอาจเปลี่ยนแปลงรายเดือน ปัจจัยเหล่านี้คือสิ่งที่สามารถเร่งหรือเลื่อนกำหนดการได้"}
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {factors.map((factor, index) => {
              const Icon = factor.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.45, delay: index * 0.08 }}
                  className={`rounded-[20px] border p-5 sm:p-6 transition-all duration-300 ${
                    isDark
                      ? "bg-warm-charcoal border-border hover:shadow-[0_6px_24px_rgba(0,0,0,0.25)]"
                      : "bg-white border-warm-light-gray hover:shadow-[0_8px_28px_rgba(0,0,0,0.06)]"
                  } ${factor.highlight ? "ring-1 ring-warm-amber/25" : ""}`}
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      factor.impactType === "positive"
                        ? isDark ? "bg-dark-amber-bg" : "bg-amber-50"
                        : isDark ? "bg-warm-charcoal/80 border border-border" : "bg-warm-cream border border-warm-light-gray"
                    }`}>
                      <Icon size={18} className={factor.impactType === "positive" ? "text-warm-amber" : isDark ? "text-warm-dim" : "text-warm-gray"} />
                    </div>
                    <div>
                      <h3 className={`text-sm font-bold leading-tight ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                        {factor.title}
                      </h3>
                      <span className={`mt-0.5 inline-block text-[10px] font-semibold uppercase tracking-wider ${
                        factor.impactType === "positive" ? "text-warm-amber" : isDark ? "text-warm-dim" : "text-warm-gray"
                      }`}>
                        {factor.impactType === "positive" ? "⚡ " : "⚠ "}{factor.impact}
                      </span>
                    </div>
                  </div>
                  <p className={`text-sm leading-relaxed ${isEn ? "" : "subtitle-th"} ${isDark ? "text-warm-dim" : "text-warm-secondary"}`}>
                    {factor.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* Founder Commitment Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10"
        >
          <div className={`relative overflow-hidden rounded-[24px] border p-7 sm:p-8 ${
            isDark
              ? "bg-warm-charcoal border-warm-amber/20 shadow-[0_0_60px_rgba(212,168,83,0.06)]"
              : "bg-white border-warm-amber/30 shadow-[0_8px_40px_rgba(212,168,83,0.08)]"
          }`}>
            {/* Amber left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-[24px] bg-gradient-to-b from-warm-amber/80 via-warm-amber to-warm-amber/40" />

            <div className="pl-2">
              <div className="mb-4 flex items-center gap-2">
                <CalendarClock size={16} className="text-warm-amber" />
                <span className={`text-xs font-semibold uppercase tracking-wider text-warm-amber`}>
                  {isEn ? "Solo Development Commitment" : "คำมั่นสัญญาการพัฒนาโดยคนเดียว"}
                </span>
              </div>

              <blockquote className={`mb-6 text-base sm:text-lg font-medium italic leading-relaxed ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                {isEn
                  ? "\"Regardless of external support, funding, or feedback — this project will be completed. The target is end of 2026 to early 2027, even as a fully solo endeavour.\""
                  : "\"ไม่ว่าจะมีใครสนับสนุนหรือไม่ ไม่ว่าจะมีเสียงตอบรับหรือเปล่า — งานนี้จะแล้วเสร็จ เป้าหมายคือสิ้นปี 2026 ถึงต้นปี 2027 แม้จะพัฒนาคนเดียวทั้งหมด\""}
              </blockquote>

              <div className={`grid gap-4 sm:grid-cols-2 mb-6 p-4 rounded-2xl border ${isDark ? "bg-dark-900/50 border-border" : "bg-warm-cream border-warm-light-gray"}`}>
                <div className="flex items-start gap-3">
                  <Target size={16} className="mt-0.5 shrink-0 text-warm-amber" />
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
                      {isEn ? "Initial Goal" : "เป้าหมายเบื้องต้น"}
                    </div>
                    <p className={`text-sm ${isEn ? "" : "subtitle-th"} ${isDark ? "text-warm-muted" : "text-warm-secondary"}`}>
                      {isEn
                        ? "Publish the creator's work, build a personal portfolio, and establish SEO presence through this website."
                        : "เผยแพร่ผลงานของผู้สร้าง สร้าง portfolio ส่วนตัว และสร้างฐาน SEO ผ่านเว็บไซต์นี้"}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Trophy size={16} className="mt-0.5 shrink-0 text-warm-amber" />
                  <div>
                    <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
                      {isEn ? "Ultimate Goal" : "เป้าหมายสูงสุด"}
                    </div>
                    <p className={`text-sm ${isEn ? "" : "subtitle-th"} ${isDark ? "text-warm-muted" : "text-warm-secondary"}`}>
                      {isEn
                        ? "RCT OS 100% complete. All products launched. A fully operational Constitutional AI ecosystem."
                        : "RCT OS สำเร็จ 100% ผลิตภัณฑ์ทุกตัวเปิดตัวแล้ว Ecosystem AI แบบ Constitutional พร้อมใช้งานเต็มรูปแบบ"}
                    </p>
                  </div>
                </div>
              </div>

              <div className={`flex items-center gap-2 text-xs ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
                <div className="h-1.5 w-1.5 rounded-full bg-warm-amber/60" />
                <span className={isEn ? "" : "subtitle-th"}>
                  {isEn
                    ? "Timeline accounts for legal, team, and external factors — target remains end of 2026 regardless."
                    : "กำหนดการคำนวณจากปัจจัยกฎหมาย ทีม และสิ่งแวดล้อมภายนอกแล้ว — เป้าหมายสิ้นปี 2026 ยังคงอยู่"}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

