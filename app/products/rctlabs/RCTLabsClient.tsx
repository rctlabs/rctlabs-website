"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { FlaskConical, ArrowRight } from "lucide-react"
import { getBreadcrumbSchema } from "@/lib/schema"
import OptimizedImage from "@/components/ui/optimized-image"

const features = [
  {
    iconSrc: "/images/pixel-art-doc.png", color: "#D4A853",
    titleEn: "62,205+ Test Cases", titleTh: "62,205+ Test Cases",
    descEn: "Comprehensive test suite covering all 9 tiers of the algorithm architecture — from basic intent parsing to self-evolving orchestration.",
    descTh: "ชุดทดสอบครอบคลุมทั้ง 9 Tiers ของสถาปัตยกรรม Algorithm — ตั้งแต่ Basic Intent Parsing ถึง Self-Evolving Orchestration",
  },
  {
    iconSrc: "/images/pixel-art-puzzle.png", color: "#7B9E87",
    titleEn: "9-Tier Validation", titleTh: "9-Tier Validation",
    descEn: "Each algorithm tier has dedicated test suites ensuring correctness, performance, and integration compatibility.",
    descTh: "แต่ละ Algorithm Tier มีชุดทดสอบเฉพาะเพื่อรับรองความถูกต้อง ประสิทธิภาพ และความเข้ากันได้",
  },
  {
    iconSrc: "/images/pixel-art-chat.png", color: "#C4745B",
    titleEn: "Performance Benchmarking", titleTh: "Performance Benchmarking",
    descEn: "Automated benchmarking against industry standards — latency, throughput, accuracy, and resource utilization metrics.",
    descTh: "Benchmarking อัตโนมัติเทียบกับมาตรฐานอุตสาหกรรม — Latency, Throughput, Accuracy และ Resource Utilization",
  },
  {
    iconSrc: "/images/pixel-art-shield.png", color: "#89B4C8",
    titleEn: "Regression Testing", titleTh: "Regression Testing",
    descEn: "Continuous regression testing ensures new updates don't break existing functionality across the entire ecosystem.",
    descTh: "Regression Testing อย่างต่อเนื่องรับประกันว่าอัปเดตใหม่ไม่ทำลายฟังก์ชันที่มีอยู่ทั้ง Ecosystem",
  },
]

export default function RCTLabsPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
        { name: "Home", url: "https://rctlabs.co" },
        { name: isTh ? "ผลิตภัณฑ์" : "Products", url: "https://rctlabs.co/products" },
        { name: "RCTLabs", url: "https://rctlabs.co/products/rctlabs" },
      ])) }} />
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-amber/10 border border-warm-amber/30 text-warm-amber text-sm font-medium">
            <FlaskConical className="w-4 h-4" /> {isTh ? "Testing Platform" : "Testing Platform"}
          </span>
          <h1 className="text-5xl font-bold text-foreground">RCTLabs</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "แพลตฟอร์มทดสอบ AI แบบบูรณาการพร้อม 62,205+ Test Cases — ตรวจสอบ, Benchmark และรับรอง AI Models ข้าม 9 Tiers"
              : "Integrated AI testing platform with 62,205+ test cases — validate, benchmark, and certify AI models across all 9 tiers."}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
            {isTh ? "ทำไม Enterprise AI ต้องมีการทดสอบอย่างเข้มงวด" : "Why Enterprise AI Needs Rigorous Testing"}
          </h2>
          <p>
            {isTh
              ? "ระบบ AI ใน Production เผชิญความท้าทายที่การทดสอบซอฟต์แวร์แบบเดิมไม่สามารถจัดการได้ — อัตรา Hallucination, ความสอดคล้องในการให้เหตุผล, ความล้มเหลวในการประสาน Multi-Model และ Context Drift RCTLabs ถูกสร้างเพื่อทดสอบพฤติกรรม AI ครบทั้ง 9 Tiers ของสถาปัตยกรรม"
              : "AI systems in production face challenges that traditional testing cannot address — hallucination rates, reasoning consistency, multi-model coordination failures, and context drift. RCTLabs validates AI behavior across all 9 tiers of the RCT algorithm architecture."}
          </p>
          <p>
            {isTh
              ? "ด้วย Test Cases อัตโนมัติกว่า 62,205 รายการ RCTLabs ครอบคลุม Unit Testing, Integration Testing, Performance Benchmarking และ Regression Analysis แต่ละ Test Case ถูกแมปกับ Algorithm Tiers และ Components ของ RCT Ecosystem"
              : "With over 62,205 automated test cases covering unit testing, integration testing, performance benchmarking, and regression analysis. Each test case is mapped to specific algorithm tiers and ecosystem components."}
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
            {isTh ? "โครงสร้างพื้นฐานการทดสอบ" : "Testing Infrastructure"}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {isTh
              ? "โครงสร้างพื้นฐานการทดสอบระดับ Enterprise ที่ตรวจสอบทุก Layer ของระบบปฏิบัติการ RCT"
              : "Enterprise-grade testing infrastructure that validates every layer of the RCT operating system."}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feat, i) => (
            <motion.div
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "สำรวจผลิตภัณฑ์อื่น" : "Explore Other Products"}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products/artent-ai" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-colors" style={{ backgroundColor: "#B8A9C9" }}>
              Artent AI <ArrowRight size={16} />
            </Link>
            <Link href="/products/signed-ai" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors">
              SignedAI
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
