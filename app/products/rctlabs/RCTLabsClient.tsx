"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { Cpu, ArrowRight } from "lucide-react"
import { getBreadcrumbSchema } from "@/lib/schema"
import OptimizedImage from "@/components/ui/optimized-image"
import { pixelIcons } from "@/lib/pixel-icons"

const features = [
  {
    iconSrc: pixelIcons.brain, color: "#D4A853",
    titleEn: "Intent Loop Engine", titleTh: "Intent Loop Engine",
    descEn: "Warm recall <50ms. 7-state pipeline: OBSERVE → INTENT → SCORE → CONFLICT → GOVERN → EXECUTE → MEMORY. Every inference has a constitutional score before dispatch.",
    descTh: "Warm Recall <50ms. Pipeline 7 State: OBSERVE → INTENT → SCORE → CONFLICT → GOVERN → EXECUTE → MEMORY — ทุก Inference มีคะแนน Constitutional ก่อน Dispatch",
  },
  {
    iconSrc: pixelIcons.formula, color: "#7B9E87",
    titleEn: "FDIA Constitutional Core", titleTh: "FDIA Constitutional Core",
    descEn: "F\u00a0=\u00a0(D\u1da1)\u00a0\u00d7\u00a0A — every output is scored against Desire, Intent, and Alignment. If Alignment = 0, no output is dispatched regardless of confidence.",
    descTh: "F\u00a0=\u00a0(D\u1da1)\u00a0\u00d7\u00a0A — ทุก Output ถูก Score จาก Desire, Intent และ Alignment หาก Alignment = 0 ไม่มี Output ใดถูกส่งออก",
  },
  {
    iconSrc: pixelIcons.shield, color: "#C4745B",
    titleEn: "4,849 Verified Tests / 0 Failures", titleTh: "4,849 Tests ผ่าน / 0 ครั้งผิดพลาด",
    descEn: "8-level test pyramid: Unit → Integration → System → Performance → Security → Chaos → Digital Twin → Hypothesis. v5.4.5 canonical. Zero errors.",
    descTh: "8-Level Test Pyramid: Unit → Integration → System → Performance → Security → Chaos → Digital Twin → Hypothesis v5.4.5 Canonical — Zero Errors",
  },
  {
    iconSrc: pixelIcons.genome, color: "#89B4C8",
    titleEn: "7 Genome System", titleTh: "7 Genome System",
    descEn: "SignedAI, ArtentAI, Analysearch, Delta Engine, Farmer, JITNA, Monitor — all 7 Genomes converge at RCTLabs. This is the operating environment, not an app.",
    descTh: "SignedAI, ArtentAI, Analysearch, Delta Engine, Farmer, JITNA, Monitor — ทั้ง 7 Genome มาบรรจบที่ RCTLabs นี่คือ Operating Environment ไม่ใช่แอป",
  },
]

export default function RCTLabsPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"
  const localePrefix = locale === "th" ? "/th" : "/en"
  const localHref = (href: string) => `${localePrefix}${href}`

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
        { name: "Home", url: `https://rctlabs.co${localePrefix}` },
        { name: isTh ? "ผลิตภัณฑ์" : "Products", url: `https://rctlabs.co${localePrefix}/products` },
        { name: "RCTLabs", url: `https://rctlabs.co${localePrefix}/products/rctlabs` },
      ])) }} />
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-amber/10 border border-warm-amber/30 text-warm-amber text-sm font-medium">
            <Cpu className="w-4 h-4" /> {isTh ? "AI Operating Environment" : "AI Operating Environment"}
          </span>
          <h1 className="text-5xl font-bold text-foreground">RCTLabs</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "Constitutional AI Operating Environment — ศูนย์กลางของ RCT Ecosystem ที่ 7 Genome มาบรรจบกัน, รัน 41 Production Algorithms และ FDIA ควบคุมทุก Inference"
              : "The Constitutional AI Operating Environment where 7 Genomes converge. Runs 41 production algorithms across 62 microservices, with FDIA governing every inference — F\u00a0=\u00a0(D\u1da1)\u00a0\u00d7\u00a0A."}
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-4xl px-4 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {([
            { value: "4,849", label: isTh ? "Tests ผ่าน / 0 ผิด" : "Verified Tests" },
            { value: "41", label: isTh ? "Production Algorithms" : "Production Algorithms" },
            { value: "62", label: isTh ? "Microservices" : "Microservices" },
            { value: "7", label: isTh ? "Genome System" : "Genome System" },
          ] as const).map((stat, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-5 rounded-2xl border border-border bg-card text-center"
            >
              <div className="text-3xl font-bold text-warm-amber">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{stat.label}</div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
            {isTh ? "ทำไม RCTLabs ถึงแตกต่าง" : "Why RCTLabs is Different"}
          </h2>
          <p>
            {isTh
              ? "RCTLabs ไม่ใช่เครื่องมือทดสอบที่คุณรันกับ AI ของคุณ — มันคือ Operating Environment ที่ AI ของคุณทำงานอยู่ภายใน ทุก Inference ถูกควบคุมโดยสมการ FDIA ทุก Output มีคะแนน Constitutional ทุก Agent Interaction ผ่าน JITNA Protocol RFC-001 ก่อน Execution"
              : "RCTLabs is not a testing tool you run against your AI. It is the operating environment your AI runs inside. Every inference is governed by the FDIA equation. Every output carries a constitutional score. Every agent interaction passes through JITNA Protocol RFC-001 before execution."}
          </p>
          <p>
            {isTh
              ? "4,849 Tests ผ่าน / 0 ที่ล้มเหลว (เวอร์ชัน v5.4.5, 21 มีนาคม 2026) ครอบคลุม 8 ระดับ: Unit → Integration → System → Performance → Security → Chaos → Digital Twin → Hypothesis — ภายใต้ 41 Production Algorithms และ 62 Microservices"
              : "4,849 tests passing / 0 failures (v5.4.5, March 21 2026). Covers 8 levels: Unit → Integration → System → Performance → Security → Chaos → Digital Twin → Hypothesis — powering 41 production algorithms across 62 microservices."}
          </p>
          <p>
            {isTh
              ? "ด้วย Test Cases อัตโนมัติ 4,849 รายการที่ผ่าน / 0 ล้มเหลว RCTLabs ครอบคลุม Unit Testing, Integration Testing, Performance Benchmarking และ Regression Analysis ซึ่งแต่ละ Test Case ถูกสร้างเพื่อให้ Algorithm Tier สามารถทำงานได้อย่างถูกต้องใน Production"
              : "With 4,849 verified passing tests / 0 failures, RCTLabs covers unit testing, integration testing, performance benchmarking, and regression analysis. Each test is mapped to specific algorithm tiers to ensure every component works correctly in production."}
          </p>
          <p>
            {isTh
              ? "แพลต๏ฟอร์มเชื่อมต่อกับ CI/CD Pipelines และมี Real-Time Dashboards สำหรับ Test Coverage, Pass Rates และ Performance Trends"
              : "The platform integrates with CI/CD pipelines and provides real-time dashboards for test coverage, pass rates, and performance trends."}
          </p>
          <p>
            {isTh
              ? "แพลตฟอร์มเชื่อมต่อกับ CI/CD Pipelines และให้ Real-Time Dashboards สำหรับ Test Coverage, Pass Rates และ Performance Trends"
              : "The platform integrates with CI/CD pipelines and provides real-time dashboards for test coverage, pass rates, and performance trends."}
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            {isTh ? "สถาปัตยกรรมหลัก" : "Core Architecture"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isTh
              ? "Constitutional AI OS ที่ตรวจสอบทุก Layer ของระบบปฏิบัติการ RCT — จาก Intent Loop Engine ถึง Genome Orchestration"
              : "Constitutional AI OS that validates every layer of the RCT operating system — from Intent Loop Engine to Genome orchestration."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-card"
            >
              <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-xl" style={{ backgroundColor: `${feat.color}20` }}>
                <OptimizedImage src={feat.iconSrc} alt="" width={24} height={24} pixelated showErrorFallback={false} containerClassName="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">{isTh ? feat.titleTh : feat.titleEn}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? feat.descTh : feat.descEn}</p>
            </m.div>
          ))}
        </div>
      </section>

      {/* Why Different */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-8">
            {isTh ? "ทำไมจึงเลือก RCTLabs" : "Why Choose RCTLabs"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                titleEn: "Not a Testing Tool", titleTh: "ไม่ใช่เครื่องมือทดสอบ",
                descEn: "RCTLabs is the operating environment your AI runs inside. Not a tool you point at an existing system — an OS layer that governs it.",
                descTh: "RCTLabs คือ Operating Environment ที่ AI รันอยู่ภายใน ไม่ใช่เครื่องมือที่คุณชี้ไปที่ระบบที่มีอยู่ — เป็น OS Layer ที่ควบคุมมัน",
                color: "#D4A853",
              },
              {
                titleEn: "Constitutional by Design", titleTh: "Constitutional by Design",
                descEn: "Every inference is governed by F\u00a0=\u00a0(D\u1da1)\u00a0\u00d7\u00a0A. Every output carries a constitutional score. Alignment = 0 means no dispatch.",
                descTh: "ทุก Inference ถูกควบคุมโดย F\u00a0=\u00a0(D\u1da1)\u00a0\u00d7\u00a0A ทุก Output มีคะแนน Constitutional Alignment = 0 หมายความไม่ส่ง Output ออก",
                color: "#7B9E87",
              },
              {
                titleEn: "JITNA Protocol Gateway", titleTh: "JITNA Protocol Gateway",
                descEn: "Every agent interaction passes through JITNA RFC-001 before execution — structured, signed, and auditable across all 62 microservices.",
                descTh: "ทุก Agent Interaction ผ่าน JITNA RFC-001 ก่อน Execution — มีโครงสร้าง, Signed และตรวจสอบได้ทั้ง 62 Microservices",
                color: "#C4745B",
              },
            ].map((item, i) => (
              <m.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card">
                <div className="w-2 h-8 rounded-full mb-4" style={{ backgroundColor: item.color }} />
                <h3 className="text-base font-bold mb-2 text-foreground">{isTh ? item.titleTh : item.titleEn}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? item.descTh : item.descEn}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "สำรวจผลิตภัณฑ์อื่น" : "Explore Other Products"}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={localHref("/products/artent-ai")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-colors" style={{ backgroundColor: "#B8A9C9" }}>
              Artent AI <ArrowRight size={16} />
            </Link>
            <Link href={localHref("/products/signed-ai")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors">
              SignedAI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
