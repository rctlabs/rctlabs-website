"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FlaskConical, Palette, ShieldCheck, ArrowRight, Layers, Cpu, Zap } from "lucide-react"
import OptimizedImage from "@/components/ui/optimized-image"
import { getLocaleFromPathname } from "@/lib/i18n"

const PIXEL_LABS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-algorithm-gears_dbfb4610.png"
const PIXEL_ARTENT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-brain-icon-YV3hZvbAaJBXWEMr6T2Tnc.webp"
const PIXEL_SIGNED = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-shield-icon-MfxsPeu6XRAKST8C3hCmf9.webp"

const products = [
  {
    id: "rctlabs",
    href: "/products/rctlabs",
    icon: FlaskConical,
    color: "#D4A853",
    titleEn: "RCTLabs",
    titleTh: "RCTLabs",
    tagEn: "Testing Platform",
    tagTh: "Testing Platform",
    descEn: "Integrated AI testing platform with 62,205+ test cases — validate, benchmark, and certify AI models across all 9 tiers of the algorithm architecture.",
    descTh: "แพลตฟอร์มทดสอบ AI แบบบูรณาการพร้อม 62,205+ Test Cases — ตรวจสอบ, Benchmark และรับรอง AI Models ข้าม 9 Tiers",
    features: [
      { en: "62,205+ Test Cases", th: "62,205+ Test Cases" },
      { en: "9-Tier Algorithm Validation", th: "9-Tier Algorithm Validation" },
      { en: "Automated Regression Testing", th: "Automated Regression Testing" },
      { en: "Performance Benchmarking", th: "Performance Benchmarking" },
    ],
    accentSrc: PIXEL_LABS,
  },
  {
    id: "artent",
    href: "/products/artent-ai",
    icon: Palette,
    color: "#B8A9C9",
    titleEn: "Artent AI",
    titleTh: "Artent AI",
    tagEn: "Creative AI",
    tagTh: "Creative AI",
    descEn: "Architecture-driven creative AI that combines intent understanding with artistic generation — producing outputs aligned with strategic goals.",
    descTh: "Creative AI ที่ขับเคลื่อนด้วยสถาปัตยกรรม ผสมผสาน Intent Understanding กับ Artistic Generation — สร้างผลลัพธ์ที่สอดคล้องกับเป้าหมายเชิงกลยุทธ์",
    features: [
      { en: "Intent-Driven Generation", th: "Intent-Driven Generation" },
      { en: "Multi-Modal Outputs", th: "Multi-Modal Outputs" },
      { en: "Brand Consistency Engine", th: "Brand Consistency Engine" },
      { en: "Creative Strategy Alignment", th: "Creative Strategy Alignment" },
    ],
    accentSrc: PIXEL_ARTENT,
  },
  {
    id: "signedai",
    href: "/products/signed-ai",
    icon: ShieldCheck,
    color: "#7B9E87",
    titleEn: "SignedAI",
    titleTh: "SignedAI",
    tagEn: "Verification API",
    tagTh: "Verification API",
    descEn: "Multi-LLM verification consensus API — cryptographically signed responses from up to 8 LLMs, reducing hallucination to 0.3% with complete audit trails.",
    descTh: "Multi-LLM Verification Consensus API — Cryptographically Signed Responses จาก LLMs สูงสุด 8 ตัว ลด Hallucination เหลือ 0.3%",
    features: [
      { en: "Multi-LLM Consensus", th: "Multi-LLM Consensus" },
      { en: "Cryptographic Signing", th: "Cryptographic Signing" },
      { en: "99.7% Accuracy", th: "99.7% Accuracy" },
      { en: "Complete Audit Trails", th: "Complete Audit Trails" },
    ],
    accentSrc: PIXEL_SIGNED,
  },
]

export default function ProductsPage() {
  const { language } = useLanguage()
  const pathname = usePathname()
  const isTh = language === "th"
  const locale = getLocaleFromPathname(pathname) || language
  const localePrefix = locale === "th" ? "/th" : "/en"
  const localHref = (href: string) => `${localePrefix}${href}`

  const productMetrics = [
    { value: "62,205+", labelEn: "Test Cases", labelTh: "กรณีทดสอบ", color: "#D4A853" },
    { value: "99.7%", labelEn: "Verified Accuracy", labelTh: "ความแม่นยำที่ตรวจสอบได้", color: "#7B9E87" },
    { value: "3", labelEn: "Core Products", labelTh: "ผลิตภัณฑ์หลัก", color: "#B8A9C9" },
  ]

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-[radial-gradient(circle_at_top,rgba(123,158,135,0.10),transparent_42%)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-[minmax(0,1.15fr)_minmax(320px,420px)] md:py-28">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-4 py-1.5 text-sm font-medium text-warm-amber">
              🚀 {isTh ? "ผลิตภัณฑ์" : "Products"}
            </span>
            <div className="space-y-4">
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                {isTh ? "ผลิตภัณฑ์ AI ที่สร้างบนระบบปฏิบัติการ RCT โดยตรง" : "Purpose-Built AI Products Running on the RCT Operating System"}
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted-foreground">
                {isTh
                  ? "ทุกผลิตภัณฑ์ต่อยอดจากสถาปัตยกรรม 10 ชั้น, 41 algorithms, FDIA Equation และ JITNA Protocol เพื่อให้แต่ละ use case ได้ UX เฉพาะทางโดยไม่เสียความน่าเชื่อถือระดับองค์กร"
                  : "Each product is built on the same 10-layer architecture, 41 algorithms, FDIA Equation, and JITNA Protocol, translating core infrastructure into task-specific user experiences without sacrificing enterprise trust."}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {productMetrics.map((metric) => (
                <div key={metric.labelEn} className="rounded-2xl border border-border bg-card/80 p-4 shadow-sm">
                  <div className="text-2xl font-bold" style={{ color: metric.color }}>{metric.value}</div>
                  <div className="mt-1 text-sm text-muted-foreground">{isTh ? metric.labelTh : metric.labelEn}</div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={localHref("/contact")} className="inline-flex items-center justify-center gap-2 rounded-xl bg-warm-amber px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C49A48]">
                {isTh ? "ขอ Early Access" : "Request Early Access"}
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href={localHref("/pricing")} className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "ดูแผนราคา" : "Explore Pricing"}
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              <Link href={localHref("/solutions")} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "เริ่มจากปัญหาที่ต้องการแก้" : "Start from Your Use Case"}
              </Link>
              <Link href={localHref("/whitepaper")} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "อ่าน Whitepaper" : "Read the Whitepaper"}
              </Link>
              <Link href={localHref("/architecture")} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
                {isTh ? "ดูสถาปัตยกรรมเบื้องหลัง" : "See the Architecture"}
              </Link>
            </div>
          </div>
          <div className="relative rounded-[28px] border border-border bg-card p-6 shadow-[0_20px_60px_rgba(0,0,0,0.08)]">
            <div className="pointer-events-none absolute right-5 top-5 h-12 w-12 opacity-60">
              <OptimizedImage src={PIXEL_LABS} alt="" pixelated showErrorFallback={false} containerClassName="h-full w-full" objectFit="contain" width={48} height={48} />
            </div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-warm-sage">
              {isTh ? "Product Stack" : "Product Stack"}
            </div>
            <div className="space-y-4">
              {[
                { title: "RCTLabs", body: isTh ? "แพลตฟอร์มทดสอบ, benchmark, regression และ certification สำหรับ workflow AI" : "Testing, benchmarking, regression, and certification platform for AI workflows." },
                { title: "ARTENT AI", body: isTh ? "creative engine ที่แปลง intent ให้เป็น output ที่ยังคุมทิศทางเชิงกลยุทธ์ได้" : "A creative engine that turns intent into output without losing strategic direction." },
                { title: "SignedAI", body: isTh ? "verification layer สำหรับกรณีใช้ AI ในงานที่ต้องมี trust, traceability และ auditability" : "A verification layer for AI use cases that require trust, traceability, and auditability." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-border bg-background/70 p-4">
                  <div className="text-sm font-semibold text-foreground">{item.title}</div>
                  <div className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OS Foundation Banner */}
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-warm-amber/10">
              <Layers size={32} className="text-warm-amber" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 text-foreground">
                {isTh ? "สร้างบนระบบปฏิบัติการ RCT" : "Built on the RCT Operating System"}
              </h2>
              <p className="text-sm text-muted-foreground">
                {isTh
                  ? "ทุกผลิตภัณฑ์ใช้ประโยชน์จากสถาปัตยกรรม 10 Layers, สมการ FDIA, JITNA Protocol และ 41 Algorithms — รับประกันความน่าเชื่อถือระดับ Enterprise"
                  : "Every product leverages the full 10-layer architecture, FDIA equation, JITNA Protocol, and 41 algorithms — ensuring enterprise-grade reliability."}
              </p>
            </div>
            <div className="flex gap-3 shrink-0">
              {[
                { icon: Cpu, label: "10 Layers" },
                { icon: Zap, label: "41 Algos" },
              ].map((item, i) => (
                <div key={i} className="px-4 py-2 rounded-lg text-center bg-muted">
                  <item.icon size={18} className="text-warm-amber mx-auto mb-1" />
                  <span className="text-xs font-medium text-foreground">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <Link href={localHref(product.href)}>
                <div className="group relative h-full cursor-pointer rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-8">
                  <div className="pointer-events-none absolute right-5 top-5 h-12 w-12 opacity-55">
                    <OptimizedImage src={product.accentSrc} alt="" pixelated showErrorFallback={false} containerClassName="h-full w-full" objectFit="contain" width={48} height={48} className="transition duration-200 group-hover:brightness-75 group-hover:contrast-125" />
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"
                      style={{ backgroundColor: `${product.color}15` }}
                    >
                      <product.icon size={24} style={{ color: product.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground group-hover:text-warm-amber transition-colors">
                        {isTh ? product.titleTh : product.titleEn}
                      </h3>
                      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: product.color }}>
                        {isTh ? product.tagTh : product.tagEn}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm leading-relaxed mb-5 text-muted-foreground">
                    {isTh ? product.descTh : product.descEn}
                  </p>

                  <div className="space-y-2 mb-5">
                    {product.features.map((feat, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: product.color }} />
                        <span className="text-xs text-muted-foreground">{isTh ? feat.th : feat.en}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-sm font-semibold group-hover:gap-3 transition-all" style={{ color: product.color }}>
                    {isTh ? "เรียนรู้เพิ่มเติม" : "Learn More"}
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "สนใจผลิตภัณฑ์ของเรา?" : "Interested in Our Products?"}
          </h2>
          <p className="text-muted-foreground">
            {isTh
              ? "ขอ Early Access สำหรับ RCTLabs, Artent AI หรือ SignedAI ทีมงานจะจัด Onboarding ส่วนตัวให้คุณ"
              : "Request early access to RCTLabs, Artent AI, or SignedAI. We'll set up a personalized onboarding experience."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={localHref("/contact")} className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-warm-amber hover:bg-[#C49A48] text-white font-medium text-sm transition-colors">
              {isTh ? "ติดต่อเรา" : "Contact Us"} <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link href={localHref("/docs")} className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-muted text-foreground font-medium text-sm transition-colors">
              {isTh ? "อ่านเอกสาร" : "View Documentation"}
            </Link>
          </div>
        </div>
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-foreground">
            {isTh ? "ถ้าไม่แน่ใจว่าจะเริ่มจากตัวไหน" : "If you are unsure where to start"}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {isTh
              ? "เลือก RCTLabs หากคุณต้องการ platform สำหรับทดสอบและ benchmark AI เลือก Artent AI หากโจทย์หลักคือ creative workflow และเลือก SignedAI หากคุณต้องการ verification, audit trail และการลด hallucination ในงานที่มีความเสี่ยงสูง"
              : "Choose RCTLabs if you need a platform for testing and benchmarking AI systems. Choose Artent AI if your main challenge is creative workflow execution. Choose SignedAI if you need verification, audit trails, and hallucination reduction for high-risk AI outputs."}
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href={localHref("/pricing")} className="inline-flex items-center justify-center rounded-xl bg-warm-amber px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-[#C49A48]">
              {isTh ? "เปรียบเทียบแผนราคา" : "Compare Pricing Plans"}
            </Link>
            <Link href={localHref("/contact")} className="inline-flex items-center justify-center rounded-xl border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted">
              {isTh ? "คุยกับทีมเพื่อเลือกผลิตภัณฑ์" : "Talk to the Team"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
