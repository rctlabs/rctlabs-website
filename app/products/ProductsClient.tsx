"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { FlaskConical, Palette, ShieldCheck, ArrowRight, Layers, Cpu, Zap } from "lucide-react"

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
  },
]

export default function ProductsPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-amber/10 border border-warm-amber/30 text-warm-amber text-sm font-medium">
            🚀 {isTh ? "ผลิตภัณฑ์" : "Products"}
          </span>
          <h1 className="text-5xl font-bold text-foreground">
            {isTh ? "ผลิตภัณฑ์ AI ที่สร้างขึ้นเฉพาะ" : "Purpose-Built AI Applications"}
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "ทุกผลิตภัณฑ์สร้างบนระบบปฏิบัติการ RCT — ใช้ประโยชน์จากสถาปัตยกรรม 10 ชั้น, 41 Algorithms, สมการ FDIA และ JITNA Protocol"
              : "Every product is built natively on the RCT Operating System — leveraging the full 10-layer architecture, 41 algorithms, FDIA equation, and JITNA Protocol."}
          </p>
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
              <Link href={product.href}>
                <div className="group h-full p-6 sm:p-8 rounded-2xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
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
            <Link href="/contact" className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-warm-amber hover:bg-[#C49A48] text-white font-medium text-sm transition-colors">
              {isTh ? "ติดต่อเรา" : "Contact Us"} <ArrowRight size={16} className="ml-2" />
            </Link>
            <Link href="/docs" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-muted text-foreground font-medium text-sm transition-colors">
              {isTh ? "อ่านเอกสาร" : "View Documentation"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
