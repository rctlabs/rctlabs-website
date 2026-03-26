"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { getLocaleFromPathname, getLocalePrefix } from "@/lib/i18n"
import HeroSection from "@/components/sections/hero-section"
import OverviewSection from "@/components/sections/overview-section"
import FDIASection from "@/components/sections/fdia-section"
import EvidenceSection from "@/components/sections/evidence-section"
import RoadmapSection from "@/components/sections/roadmap-section"
import SectionPreviewCard from "@/components/section-preview-card"
import { pixelIcons } from "@/lib/pixel-icons"

const deepDiveCards = [
  {
    iconSrc: pixelIcons.architecture,
    title: "10-Layer Architecture",
    titleTh: "สถาปัตยกรรม 10 ชั้น",
    description: "A comprehensive cognitive architecture stack from data ingestion to autonomous improvement.",
    descriptionTh: "สถาปัตยกรรม Cognitive Stack ตั้งแต่ Data Ingestion ถึง Autonomous Improvement",
    href: "/architecture",
    color: "#89B4C8",
    bg: "#DBEAFE",
  },
  {
    iconSrc: pixelIcons.genome,
    title: "7 Genome System",
    titleTh: "ระบบ 7 Genome",
    description: "Seven interconnected genomes forming a continuous improvement cycle.",
    descriptionTh: "7 Genomes ที่เชื่อมต่อกันสร้างวงจรปรับปรุงต่อเนื่อง",
    href: "/genome",
    color: "#C4745B",
    bg: "#FEE2E2",
  },
  {
    iconSrc: pixelIcons.jitna,
    title: "JITNA Protocol",
    titleTh: "โปรโตคอล JITNA",
    description: "Just-In-Time Nodal Assembly — the 'HTTP of the Agentic AI world'.",
    descriptionTh: "Just-In-Time Nodal Assembly — 'HTTP แห่งโลก Agentic AI'",
    href: "/protocols/jitna-rfc-001",
    color: "#7B9E87",
    bg: "#D1FAE5",
  },
  {
    iconSrc: pixelIcons.algorithms,
    title: "Core Systems & Engines",
    titleTh: "ระบบหลักและเอ็นจิน",
    description: "A public-safe overview of HexaCore, Intent Loop, Analysearch, and Delta Memory.",
    descriptionTh: "ภาพรวมแบบ public-safe ของ HexaCore, Intent Loop, Analysearch และ Delta Memory",
    href: "/core-systems",
    color: "#D4A853",
    bg: "#FEF3C7",
  },
  {
    iconSrc: pixelIcons.rocket,
    title: "Integration & Deployment",
    titleTh: "การเชื่อมต่อ และ Deployment",
    description: "MCP-native integration with multi-provider AI support and deployment infrastructure.",
    descriptionTh: "MCP-native Integration พร้อม Multi-provider AI Support",
    href: "/integration",
    color: "#B8A9C9",
    bg: "#EDE9FE",
  },
  {
    iconSrc: pixelIcons.shield,
    title: "Signed AI & Verification",
    titleTh: "Signed AI และการตรวจสอบ",
    description: "Cryptographic verification, trusted outputs, and governance-ready auditability for enterprise deployment.",
    descriptionTh: "การยืนยันผลลัพธ์ด้วย cryptography ความน่าเชื่อถือของคำตอบ และ auditability สำหรับงานระดับองค์กร",
    href: "/products/signed-ai",
    color: "#7B9E87",
    bg: "#D1FAE5",
  },
]

export default function HomePage() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const locale = (getLocaleFromPathname(pathname) || language || "en") as "en" | "th"
  const localePrefix = getLocalePrefix(locale)

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      <h1 className="sr-only">
        {locale === "en"
          ? "RCT Ecosystem - Intent-Centric AI Operating System"
          : "RCT Ecosystem - ระบบปฏิบัติการ AI ที่เน้น Intent"}
      </h1>

      {/* ── Core Intelligence Pillars ──────────────────────────────── */}
      <section className="border-y border-border bg-card/30 py-12 md:py-14 transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-warm-amber">
              {locale === "en" ? "Core Intelligence Pillars" : "เสาหลักปัญญาประดิษฐ์"}
            </p>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              {locale === "en" ? "Four Engines. One Unified System." : "4 เครื่องยนต์. ระบบเดียวที่สมบูรณ์."}
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                stat: locale === "en" ? "7 Models" : "7 โมเดล",
                title: "HexaCore AI Engine",
                desc: locale === "en"
                  ? "Western, Eastern, and Typhoon (Thai) LLMs. Each task routed to the optimal model automatically."
                  : "LLM Western, Eastern และ Typhoon ภาษาไทย — เลือกโมเดลที่เหมาะกับแต่ละงานอัตโนมัติ",
                color: "#D4A853",
                href: `${localePrefix}/core-systems`,
              },
              {
                stat: "1,500×",
                title: locale === "en" ? "Intent Loop Engine" : "Intent Loop Engine",
                desc: locale === "en"
                  ? "7-state pipeline. Cold start 3–5s → warm recall <50ms. Memory-first routing cuts cost 60–75%."
                  : "Pipeline 7 สถานะ: cold start 3–5 วินาที → warm recall <50ms ลดต้นทุน 60–75% ด้วย memory-first routing",
                color: "#7B9E87",
                href: `${localePrefix}/core-systems`,
              },
              {
                stat: locale === "en" ? "4 Modes" : "4 โหมด",
                title: "Analysearch Intent",
                desc: locale === "en"
                  ? "Quick, Standard, Deep, Mirror. GIGO protection + cross-disciplinary synthesis on every query."
                  : "Quick, Standard, Deep, Mirror — GIGO Protection และ Cross-disciplinary Synthesis ทุก query",
                color: "#89B4C8",
                href: `${localePrefix}/core-systems`,
              },
              {
                stat: "74% less",
                title: locale === "en" ? "Delta Memory Engine" : "Delta Memory Engine",
                desc: locale === "en"
                  ? "Stores only state changes, not full snapshots. 74% compression with <1ms state reconstruction."
                  : "บันทึกเฉพาะสิ่งที่เปลี่ยนแปลง ลดหน่วยความจำ 74% พร้อม reconstruction <1ms",
                color: "#C4745B",
                href: `${localePrefix}/core-systems`,
              },
            ].map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-warm-amber/30"
              >
                <div className="mb-1 text-2xl font-bold" style={{ color: pillar.color }}>{pillar.stat}</div>
                <div className="mb-1.5 text-sm font-semibold text-foreground group-hover:text-warm-amber transition-colors duration-200">{pillar.title}</div>
                <p className={`text-xs leading-relaxed text-muted-foreground ${locale === "th" ? "subtitle-th" : ""}`}>{pillar.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <OverviewSection />
      <FDIASection />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-10">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h2 className="text-foreground">
              {locale === "th" ? "เลือกเส้นทางการสำรวจเชิงลึก" : "Choose a Deep-Dive Path"}
            </h2>
            <p className="text-muted-foreground">
              {locale === "th"
                ? "เริ่มจากเลนส์ที่ต้องการ: ระบบหลัก โปรโตคอล การเชื่อมต่อ การกำกับดูแล หรือ deployment โดยไม่ต้องอ่านคำอธิบายซ้ำจากด้านบนอีกครั้ง"
                : "Start from the lens you need: core systems, protocols, deployment, governance, or architecture. This section is now a navigation hub rather than a repeated overview."}
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
            {deepDiveCards.map((card, index) => (
              <SectionPreviewCard
                key={card.href}
                {...card}
                href={`${localePrefix}${card.href}`}
                delay={index * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      <EvidenceSection />
      <RoadmapSection />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-lg border border-border bg-card p-10 md:p-16">
          <div className="absolute inset-0 grid-background opacity-30" />
          <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-foreground">
              {locale === "en" ? "Ready to Build with Intent?" : "พร้อมเริ่มต้นสร้างระบบ AI ที่ขับเคลื่อนด้วยเจตนาหรือยัง?"}
            </h2>
            <p className="text-muted-foreground">
              {locale === "en"
                ? "Explore the architecture, read the protocols, or experience the live demo to see how RCT assembles intelligence around purpose."
                : "สำรวจสถาปัตยกรรม อ่านโปรโตคอล หรือทดลองเดโม เพื่อดูว่า RCT เชื่อมข้อมูล เจตนา และการตัดสินใจเข้าด้วยกันอย่างไรในบริบทระดับองค์กร"}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href={`${localePrefix}/whitepaper`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-warm-amber px-6 py-3 font-medium text-white transition-colors hover:bg-[#C49A48]"
              >
                {locale === "en" ? "Read the Whitepaper" : "อ่านเอกสาร Whitepaper"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`${localePrefix}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {locale === "en" ? "Contact Us" : "ติดต่อทีมงาน"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
