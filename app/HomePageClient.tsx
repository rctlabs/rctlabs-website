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

      <section className="border-y border-border bg-card/30 py-12 transition-colors duration-300 md:py-16">
        <div className="mx-auto max-w-300 px-4 sm:px-6 lg:px-8">
          <h2 className="mb-6 text-2xl font-bold text-foreground sm:text-3xl">
            {locale === "en" ? "Why RCT Ecosystem?" : "ทำไมองค์กรจึงเลือก RCT Ecosystem?"}
          </h2>
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              {locale === "en"
                ? <>
                    RCT Ecosystem is the world&apos;s first <TechTooltip term="Constitutional AI" language="en">Intent-Centric AI Operating System</TechTooltip>. It moves beyond prompt engineering by understanding the outcome you are trying to create, then assembling the optimal AI pipeline to produce it.
                  </>
                : <>
                    RCT Ecosystem คือระบบปฏิบัติการ AI แบบเน้นเจตนาที่ออกแบบมาสำหรับงานระดับองค์กร โดยก้าวข้ามการสั่งงานแบบ prompt engineering ไปสู่การทำความเข้าใจผลลัพธ์ที่ธุรกิจต้องการ แล้วประกอบลำดับการทำงานของ AI ที่เหมาะสมที่สุดภายใต้แนวคิด <TechTooltip term="Constitutional AI" language="th">Constitutional AI</TechTooltip>
                  </>}
            </p>
            <p>
              {locale === "en"
                ? <>
                    Built on the <TechTooltip term="FDIA" language="en">FDIA Equation</TechTooltip>, a 10-Layer cognitive architecture, and <TechTooltip term="7 Genome" language="en">7 interlocking genomes</TechTooltip>, the system delivers enterprise-grade reliability with verified outputs, persistent memory via <TechTooltip term="RCTDB" language="en">RCTDB</TechTooltip>, and orchestrated intelligence through <TechTooltip term="JITNA" language="en">JITNA</TechTooltip>.
                  </>
                : <>
                    ระบบนี้สร้างบนสมการ <TechTooltip term="FDIA" language="th">FDIA</TechTooltip> สถาปัตยกรรมเชิงปัญญา 10 ชั้น และ <TechTooltip term="7 Genome" language="th">7 genomes</TechTooltip> ที่ทำงานประสานกัน เพื่อให้ได้ความน่าเชื่อถือระดับองค์กรผ่านผลลัพธ์ที่ตรวจสอบได้ หน่วยความจำถาวรด้วย <TechTooltip term="RCTDB" language="th">RCTDB</TechTooltip> และการประสานงานอัจฉริยะผ่าน <TechTooltip term="JITNA" language="th">JITNA</TechTooltip>
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
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              >
                <div className="mb-1 text-3xl font-bold" style={{ color: item.color }}>
                  {item.stat}
                </div>
                <div className={`text-sm text-muted-foreground ${locale === "th" ? "subtitle-th" : ""}`}>{item.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-2xl border border-border bg-card p-8 md:p-10">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-warm-amber">
              {locale === "en" ? "Built for enterprise evaluation" : "ออกแบบเพื่อการประเมินระดับองค์กร"}
            </p>
            <h2 className="text-foreground">
              {locale === "en"
                ? "Evaluate governance, verification, and deployment readiness in one journey"
                : "ประเมินด้าน governance การตรวจสอบผลลัพธ์ และความพร้อมในการใช้งานจริงได้ในเส้นทางเดียว"}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {locale === "en"
                ? "Start from the whitepaper, compare solutions, review pricing, and inspect current research releases to decide where RCT fits in your enterprise AI roadmap."
                : "เริ่มจาก whitepaper เปรียบเทียบโซลูชัน ตรวจสอบ pricing และอ่านงานวิจัยล่าสุด เพื่อประเมินว่า RCT เหมาะกับแผน AI ระดับองค์กรของคุณอย่างไร"}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {[
                {
                  title: locale === "en" ? "Whitepaper" : "Whitepaper",
                  description: locale === "en" ? "Architecture and platform thesis" : "ภาพรวมสถาปัตยกรรมและแนวคิดของแพลตฟอร์ม",
                  href: `${localePrefix}/whitepaper`,
                },
                {
                  title: locale === "en" ? "Solutions" : "โซลูชัน",
                  description: locale === "en" ? "Use cases and business outcomes" : "กรณีใช้งานและผลลัพธ์ทางธุรกิจ",
                  href: `${localePrefix}/solutions`,
                },
                {
                  title: locale === "en" ? "Pricing" : "ราคา",
                  description: locale === "en" ? "Commercial fit and deployment model" : "รูปแบบการใช้งานและความเหมาะสมเชิงพาณิชย์",
                  href: `${localePrefix}/pricing`,
                },
                {
                  title: locale === "en" ? "Research" : "งานวิจัย",
                  description: locale === "en" ? "Releases, evidence, and technical depth" : "รีลีส หลักฐาน และความลึกทางเทคนิค",
                  href: `${localePrefix}/research`,
                },
              ].map((item) => (
                <Link key={item.href} href={item.href} className="rounded-xl border border-border bg-background p-4 transition-colors hover:bg-muted">
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className={`mt-1 text-sm text-muted-foreground ${locale === "th" ? "subtitle-th" : ""}`}>{item.description}</div>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-warm-sage">
              {locale === "en" ? "Common evaluation goals" : "เป้าหมายที่พบบ่อยในการประเมิน"}
            </p>
            <div className="mt-4 space-y-4 text-sm text-muted-foreground">
              {[
                locale === "en"
                  ? "Reduce hallucination risk in customer-facing and operational workflows"
                  : "ลดความเสี่ยงจาก AI hallucination ในงานที่เกี่ยวข้องกับลูกค้าและการปฏิบัติงาน",
                locale === "en"
                  ? "Add verifiable outputs, memory, and policy-aligned orchestration"
                  : "เพิ่มผลลัพธ์ที่ตรวจสอบได้ ระบบหน่วยความจำ และการ orchestration ที่สอดคล้องกับนโยบายองค์กร",
                locale === "en"
                  ? "Prepare for private deployment, governance, and regional compliance"
                  : "เตรียมความพร้อมสำหรับ private deployment, governance และการปฏิบัติตามข้อกำหนดระดับภูมิภาค",
              ].map((item) => (
                <div key={item} className="rounded-xl border border-border/70 bg-background px-4 py-3">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <OverviewSection />
      <FDIASection />

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="space-y-10">
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            <h2 className="text-foreground">
              {locale === "th" ? "สำรวจองค์ประกอบของ Ecosystem" : "Explore the Ecosystem"}
            </h2>
            <p className="text-muted-foreground">
              {locale === "th"
                ? "แต่ละองค์ประกอบของ RCT Ecosystem ถูกออกแบบให้ทำงานได้ทั้งแบบแยกส่วนและเสริมกัน สำรวจแต่ละโมดูลเพื่อทำความเข้าใจบทบาทเชิงธุรกิจและเชิงเทคนิค"
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
