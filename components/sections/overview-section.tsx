"use client"

import { m, useReducedMotion } from "framer-motion"
import { useTheme } from "@/components/theme-provider"
import { useLanguage } from "@/components/language-provider"
import { LazyEcosystemOverview } from "@/components/diagrams/lazy-diagram-wrapper"
import SectionPreviewCard from "@/components/section-preview-card"
import SectionHeading from "@/components/section-heading"
import { useMounted } from "@/hooks/use-mounted"
import { pixelIcons as pixelIconPaths } from "@/lib/pixel-icons"
import { getLocalePrefix } from "@/lib/i18n"

const PIXEL_ARCH = pixelIconPaths.architecture

const deepDiveCards = [
  {
    iconSrc: pixelIconPaths.architecture,
    title: "10-Layer Architecture",
    titleTh: "สถาปัตยกรรม 10 ชั้น",
    description: "A comprehensive cognitive architecture stack from data ingestion to autonomous improvement.",
    descriptionTh: "สถาปัตยกรรม Cognitive Stack ตั้งแต่ Data Ingestion ถึง Autonomous Improvement",
    href: "/architecture",
    color: "#89B4C8",
    bg: "#DBEAFE",
  },
  {
    iconSrc: pixelIconPaths.genome,
    title: "7 Genome System",
    titleTh: "ระบบ 7 Genome",
    description: "Seven interconnected genomes forming a continuous improvement cycle.",
    descriptionTh: "7 Genomes ที่เชื่อมต่อกันสร้างวงจรปรับปรุงต่อเนื่อง",
    href: "/genome",
    color: "#C4745B",
    bg: "#FEE2E2",
  },
  {
    iconSrc: pixelIconPaths.jitna,
    title: "JITNA Protocol",
    titleTh: "โปรโตคอล JITNA",
    description: "Just-In-Time Nodal Assembly for agent negotiation, routing, and composable workflows.",
    descriptionTh: "Just-In-Time Nodal Assembly สำหรับการเจรจาของ agent, routing และ composable workflows",
    href: "/protocols/jitna-rfc-001",
    color: "#7B9E87",
    bg: "#D1FAE5",
  },
  {
    iconSrc: pixelIconPaths.algorithms,
    title: "Core Systems & Engines",
    titleTh: "ระบบหลักและเอ็นจิน",
    description: "A public-safe overview of HexaCore, Intent Loop, Analysearch, and Delta Memory.",
    descriptionTh: "ภาพรวมแบบ public-safe ของ HexaCore, Intent Loop, Analysearch และ Delta Memory",
    href: "/core-systems",
    color: "#D4A853",
    bg: "#FEF3C7",
  },
  {
    iconSrc: pixelIconPaths.rocket,
    title: "Integration & Deployment",
    titleTh: "การเชื่อมต่อและ Deployment",
    description: "MCP-native integration with multi-provider AI support and deployment infrastructure.",
    descriptionTh: "MCP-native integration พร้อม multi-provider AI support และ deployment infrastructure",
    href: "/integration",
    color: "#B8A9C9",
    bg: "#EDE9FE",
  },
  {
    iconSrc: pixelIconPaths.shield,
    title: "Signed AI & Verification",
    titleTh: "Signed AI และการตรวจสอบ",
    description: "Cryptographic verification, trusted outputs, and governance-ready auditability for enterprise deployment.",
    descriptionTh: "การยืนยันผลลัพธ์ด้วย cryptography ความน่าเชื่อถือของคำตอบ และ auditability สำหรับงานระดับองค์กร",
    href: "/products/signed-ai",
    color: "#7B9E87",
    bg: "#D1FAE5",
  },
]

type OverviewSectionProps = {
  locale: "en" | "th"
}

export default function OverviewSection({ locale }: OverviewSectionProps) {
  const { language } = useLanguage()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = mounted && resolvedTheme === "dark"
  const prefersReducedMotion = useReducedMotion()
  const localePrefix = getLocalePrefix(locale)

  return (
    <section id="overview" aria-label="System Overview" className="relative overflow-hidden bg-transparent py-16 md:py-24 transition-colors duration-300">
      <div className="homepage-ambient-layer absolute inset-0">
        <div className="homepage-ambient-orb homepage-ambient-orb--amber absolute -left-24 top-12 h-72 w-72 rounded-full" />
        <div className="homepage-ambient-orb homepage-ambient-orb--sage homepage-ambient-orb--slow absolute -right-28 bottom-8 h-80 w-80 rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_26%,rgba(123,158,135,0.04)_100%)] dark:bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_28%,rgba(123,158,135,0.028)_100%)]" />
      </div>

      <div className="relative max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tag={language === "en" ? "What Makes RCT Different" : "อะไรทำให้ RCT แตกต่าง"}
          tagColor="sage"
          title={language === "en" ? "The RCT Ecosystem at a Glance" : "ภาพรวมของ RCT Ecosystem"}
          italicWord={language === "en" ? "Ecosystem" : "RCT"}
          description={language === "en" ? "Read the interactive system map first, then jump directly into the layer you need without repeating the same overview twice." : "ดูแผนภาพระบบแบบ interactive ก่อน แล้วเลือกเจาะลึกเฉพาะเลเยอร์ที่ต้องการต่อได้ทันที โดยไม่ต้องไล่อ่านคำอธิบายเดิมซ้ำอีกครั้ง"}
          pixelIcon={PIXEL_ARCH}
        />

        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.4 }}
          className="relative mb-8"
        >
          <div className="pointer-events-none absolute inset-x-[10%] top-6 h-48 rounded-full bg-white/34 blur-3xl dark:bg-warm-amber/10" />
          <LazyEcosystemOverview />
        </m.div>

        <m.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
          whileInView={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
          whileHover={prefersReducedMotion ? undefined : { y: -3, scale: 1.003 }}
          viewport={{ once: true }}
          transition={prefersReducedMotion ? undefined : { duration: 0.28 }}
          className={`main-page-reactive-surface mb-8 rounded-2xl border px-5 py-4 sm:px-6 sm:py-5 ${isDark ? "border-border bg-card/72" : "border-[#e6ddd0] bg-white/90"}`}
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7A5910] dark:text-warm-amber">
              {language === "th" ? "เลือกเส้นทางการสำรวจเชิงลึก" : "Choose a Deep-Dive Path"}
            </p>
            <p className={`text-sm leading-relaxed text-muted-foreground sm:text-[15px] ${language === "th" ? "subtitle-th" : ""}`}>
              {language === "th"
                ? "เลือกเลนส์ที่เกี่ยวกับโจทย์ของคุณโดยตรง ไม่ว่าจะเป็น architecture, protocol, core systems, verification หรือ deployment เพื่อให้หน้าแรกกระชับขึ้นและมีลำดับการอ่านที่ชัดเจนขึ้น"
                : "Choose the lens that matches your evaluation goal directly, whether that is architecture, protocol, core systems, verification, or deployment. This keeps the homepage shorter and more enterprise-oriented."}
            </p>
          </div>
        </m.div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {deepDiveCards.map((card, index) => (
            <SectionPreviewCard
              key={card.href}
              {...card}
              href={`${localePrefix}${card.href}`}
              delay={index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
