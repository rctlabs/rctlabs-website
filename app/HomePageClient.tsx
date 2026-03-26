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
import MetricsSection from "@/components/sections/metrics-section"
import EvidenceSection from "@/components/sections/evidence-section"
import RoadmapSection from "@/components/sections/roadmap-section"
import ArchitectMascot from "@/components/architect-mascot"
import SectionPreviewCard from "@/components/section-preview-card"
import TechTooltip from "@/components/tech-tooltip"
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
    title: "41 Algorithms & Analysearch",
    titleTh: "41 อัลกอริทึม และ Analysearch",
    description: "41 proprietary algorithms plus the Analysearch hybrid methodology.",
    descriptionTh: "41 อัลกอริทึมเฉพาะ พร้อม Analysearch Hybrid Methodology",
    href: "/algorithms",
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
]

export default function HomePage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) || "en"
  const localePrefix = getLocalePrefix(locale)
  const { language } = useLanguage()

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />

      <h1 className="sr-only">
        {locale === "en"
          ? "RCT Ecosystem - Intent-Centric AI Operating System"
          : "RCT Ecosystem - ระบบปฏิบัติการ AI ที่เน้น Intent"}
      </h1>

      <section className="border-y border-border bg-card/30 py-12 transition-colors duration-300 md:py-16">
        <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
            {language === "en" ? "Why RCT Ecosystem?" : "ทำไมต้อง RCT Ecosystem?"}
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              {locale === "en"
                ? <>
                    RCT Ecosystem is the world&apos;s first <TechTooltip term="Constitutional AI" language="en">Intent-Centric AI Operating System</TechTooltip>. It moves beyond prompt engineering by understanding the outcome you are trying to create, then assembling the optimal AI pipeline to produce it.
                  </>
                : <>
                    RCT Ecosystem คือระบบปฏิบัติการ AI ที่เน้น Intent เป็นแห่งแรกของโลก โดยก้าวข้าม prompt engineering ไปสู่การเข้าใจว่าคุณต้องการสร้างผลลัพธ์แบบใด แล้วประกอบ AI pipeline ที่เหมาะสมที่สุดขึ้นมา ภายใต้แนวคิด <TechTooltip term="Constitutional AI" language="th">Constitutional AI</TechTooltip>
                  </>}
            </p>
            <p>
              {locale === "en"
                ? <>
                    Built on the <TechTooltip term="FDIA" language="en">FDIA Equation</TechTooltip>, a 10-Layer cognitive architecture, and <TechTooltip term="7 Genome" language="en">7 interlocking genomes</TechTooltip>, the system delivers enterprise-grade reliability with verified outputs, persistent memory via <TechTooltip term="RCTDB" language="en">RCTDB</TechTooltip>, and orchestrated intelligence through <TechTooltip term="JITNA" language="en">JITNA</TechTooltip>.
                  </>
                : <>
                    ระบบนี้สร้างบนสมการ <TechTooltip term="FDIA" language="th">FDIA</TechTooltip>, สถาปัตยกรรมเชิงปัญญา 10 ชั้น และ <TechTooltip term="7 Genome" language="th">7 genomes</TechTooltip> ที่ทำงานร่วมกัน เพื่อให้ได้ความน่าเชื่อถือระดับองค์กรผ่าน verified outputs, persistent memory ด้วย <TechTooltip term="RCTDB" language="th">RCTDB</TechTooltip> และ orchestrated intelligence ผ่าน <TechTooltip term="JITNA" language="th">JITNA</TechTooltip>
                  </>}
            </p>
          </div>
          <div className="mt-8">
            <ArchitectMascot className="mx-auto max-w-3xl" />
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
              { stat: "41", label: locale === "en" ? "Proprietary Algorithms" : "อัลกอริทึมเฉพาะ", color: "#D4A853", href: `${localePrefix}/algorithms` },
              { stat: "99.7%", label: locale === "en" ? "Accuracy Rate" : "อัตราความแม่นยำ", color: "#7B9E87", href: `${localePrefix}/solutions/ai-hallucination-prevention` },
              { stat: "10", label: locale === "en" ? "Architecture Layers" : "ชั้นสถาปัตยกรรม", color: "#89B4C8", href: `${localePrefix}/architecture` },
            ].map((item, index) => (
              <Link key={item.label} href={item.href} className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
                <div className="mb-1 text-3xl font-bold" style={{ color: item.color }}>
                  {item.stat}
                </div>
                <div className={`text-sm text-muted-foreground ${language === "th" ? "subtitle-th" : ""}`}>{item.label}</div>
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
              {locale === "th" ? "สำรวจ Ecosystem" : "Explore the Ecosystem"}
            </h2>
            <p className="text-muted-foreground">
              {locale === "th"
                ? "แต่ละ Component ของ RCT Ecosystem ออกแบบให้ทำงานอิสระและเสริมกัน สำรวจแต่ละ Module โดยละเอียด"
                : "Each component of the RCT Ecosystem is designed to work independently and synergistically. Explore each module in detail."}
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

      <MetricsSection />
      <EvidenceSection />
      <RoadmapSection />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="relative overflow-hidden rounded-lg border border-border bg-card p-10 md:p-16">
          <div className="absolute inset-0 grid-background opacity-30" />
          <div className="relative z-10 mx-auto max-w-2xl space-y-6 text-center">
            <h2 className="text-foreground">
              {language === "en" ? "Ready to Build with Intent?" : "พร้อมจะสร้างด้วย Intent แล้วหรือยัง?"}
            </h2>
            <p className="text-muted-foreground">
              {language === "en"
                ? "Explore the architecture, read the protocols, or experience the live demo to see how RCT assembles intelligence around purpose."
                : "สำรวจสถาปัตยกรรม อ่านโปรโตคอล หรือทดลอง live demo เพื่อดูว่า RCT ประกอบ intelligence รอบเจตนาอย่างไร"}
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                href={`${localePrefix}/whitepaper`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-warm-amber px-6 py-3 font-medium text-white transition-colors hover:bg-[#C49A48]"
              >
                {language === "en" ? "Read the Whitepaper" : "อ่าน Whitepaper"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`${localePrefix}/contact`}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {language === "en" ? "Contact Us" : "ติดต่อเรา"}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
