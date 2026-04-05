"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { Palette, ArrowRight, Target, Layers, Eye, Wand2, Brain, ShieldCheck, Cpu } from "lucide-react"
import { getBreadcrumbSchema } from "@/lib/schema"

const capabilities = [
  { icon: Target, color: "#B8A9C9", titleEn: "Intent-Driven Generation", titleTh: "Intent-Driven Generation", descEn: "Understands strategic goals behind creative requests — producing outputs aligned with business objectives, not just aesthetic preferences.", descTh: "เข้าใจเป้าหมายเชิงกลยุทธ์เบื้องหลังคำขอสร้างสรรค์ — สร้างผลลัพธ์ที่สอดคล้องกับวัตถุประสงค์ทางธุรกิจ" },
  { icon: Layers, color: "#D4A853", titleEn: "Multi-Modal Outputs", titleTh: "Multi-Modal Outputs", descEn: "Generate text, images, code, presentations, and multimedia content from a single intent specification.", descTh: "สร้างข้อความ รูปภาพ โค้ด งานนำเสนอ และเนื้อหามัลติมีเดียจาก Intent Specification เดียว" },
  { icon: Eye, color: "#7B9E87", titleEn: "Brand Consistency Engine", titleTh: "Brand Consistency Engine", descEn: "Maintains visual and tonal consistency across all outputs — colors, typography, voice, and messaging stay on-brand.", descTh: "รักษาความสม่ำเสมอทางภาพและน้ำเสียงในทุกผลลัพธ์ — สี ตัวอักษร เสียง และข้อความอยู่ในแบรนด์" },
  { icon: Wand2, color: "#C4745B", titleEn: "Creative Strategy Alignment", titleTh: "Creative Strategy Alignment", descEn: "Connects creative output to measurable KPIs — ensuring every piece of content serves a strategic purpose.", descTh: "เชื่อมต่อผลลัพธ์สร้างสรรค์กับ KPIs ที่วัดได้ — รับประกันว่าทุกชิ้นตอบสนองวัตถุประสงค์เชิงกลยุทธ์" },
]

export default function ArtentAIPage() {
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
        { name: "ArtentAI", url: `https://rctlabs.co${localePrefix}/products/artent-ai` },
      ])) }} />
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium" style={{ backgroundColor: "#B8A9C915", borderColor: "#B8A9C930", color: "#B8A9C9" }}>
            <Brain className="w-4 h-4" /> Personal Agent OS
          </span>
          <h1 className="text-5xl font-bold text-foreground">ArtentAI</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "Personal Agent OS ที่จำแนก Intent ทุกประเภท, จดจำผ่าน RCTDB 9D และรัน Pipeline CLASSIFY→ROUTE→EXECUTE→VERIFY — ขับเคลื่อนโดย SignedAI Verification"
              : "The Personal Agent OS that classifies any intent, persists memory through RCTDB 9D, and routes every task through CLASSIFY \u2192 ROUTE \u2192 EXECUTE \u2192 VERIFY — powered by SignedAI-verified execution."}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
            {isTh ? "Personal Agent OS ที่เข้าใจความต้องการของคุณ" : "Personal Agent OS That Understands Your Intent"}
          </h2>
          <p>
            {isTh
              ? "Artent AI คือ Personal Agent OS ที่จำแนก Input ทุกประเภทเป็น Intent ที่มีโครงสร้าง จดจำผ่าน RCTDB 9D Schema และรันทุก Task ผ่าน Pipeline 4 ขั้นตอน — ไม่ใช่ AI สร้างเนื้อหาทั่วไป แต่เป็น OS ที่ทำงานให้คุณ"
              : "Artent AI is a Personal Agent OS that classifies every input as a structured intent, persists it through RCTDB 9D schema, and routes every task through a 4-stage pipeline — not a generic content AI, but an OS that works for you."}
          </p>
          <p>
            {isTh
              ? "ระยะปัญญา 5 ระดับของ ARTENT: L1 Chatbot → L2 Recall (RCTDB) → L3 Analysis (FDIA) → L4 Synthesis (Multi-Agent) → L5 Evolution (ปรับปรุงตนเอง) — Agent ที่นี่เติบโตไปพร้อมคุณ"
              : "5 intelligence levels: L1 Chatbot → L2 Recall (RCTDB memory) → L3 Analysis (FDIA equation) → L4 Synthesis (multi-agent orchestration) → L5 Evolution (self-improving) — an agent that grows with you."}
          </p>
          <p>
            {isTh
              ? "Sovereignty Vault รับประกันว่าคุณเป็นเจ้าของข้อมูลทุกชิ้น: Encrypted Storage, Selective Disclosure และ Constitutional AI Constraints (A=0) ทำให้มั่นใจได้ว่าข้อมูลของคุณจะไม่ถูกนำไปใช้โดยไม่ได้รับอนุญาต"
              : "The Sovereignty Vault guarantees you own every byte: Encrypted Storage, Selective Disclosure, and Constitutional AI Constraints (A=0) ensure your data is never used without permission."}
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "ความสามารถหลัก" : "Core Capabilities"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 sm:p-8 rounded-2xl border border-border bg-card"
            >
              <cap.icon size={28} style={{ color: cap.color }} className="mb-4" />
              <h3 className="text-lg font-bold mb-2 text-foreground">{isTh ? cap.titleTh : cap.titleEn}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? cap.descTh : cap.descEn}</p>
            </m.div>
          ))}
        </div>
      </section>

      {/* Architecture Integration */}
      <section className="bg-muted/30 py-20">
        <div className="max-w-3xl mx-auto px-4">
          <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-foreground">
              {isTh ? "ขับเคลื่อนด้วยสถาปัตยกรรม RCT" : "Powered by RCT Architecture"}
            </h2>
            <p className="text-sm leading-relaxed mb-6 text-muted-foreground">
              {isTh
                ? "ARTENT Genome ใช้ RCT Stack ทั้งหมด — JITNA Routing สำหรับเลือกโมเดล, RCTDB 9D สำหรับ Memory Timeline และ SignedAI สำหรับ Verification"
                : "The ARTENT Genome leverages the full RCT stack — JITNA for model routing, RCTDB 9D for the Memory Timeline, and SignedAI for result verification."}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "JITNA", desc: isTh ? "Model Routing" : "Model Routing", color: "#C4745B" },
                { label: "RCTDB 9D", desc: isTh ? "Memory Timeline" : "Memory Timeline", color: "#7B9E87" },
                { label: "SignedAI", desc: isTh ? "Verification" : "Verification", color: "#D4A853" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl text-center bg-muted">
                  <div className="text-lg font-bold mb-1" style={{ color: item.color }}>{item.label}</div>
                  <div className="text-xs text-muted-foreground">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-4 py-20 text-center space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href={localHref("/products/signed-ai")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-colors" style={{ backgroundColor: "#7B9E87" }}>
            SignedAI <ArrowRight size={16} />
          </Link>
          <Link href={localHref("/products/rctlabs")} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors">
            RCTLabs
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
