"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { Palette, ArrowRight, Target, Layers, Eye, Wand2 } from "lucide-react"

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

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium" style={{ backgroundColor: "#B8A9C915", borderColor: "#B8A9C930", color: "#B8A9C9" }}>
            <Palette className="w-4 h-4" /> Creative AI
          </span>
          <h1 className="text-5xl font-bold text-foreground">Artent AI</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "Creative AI ที่ขับเคลื่อนด้วยสถาปัตยกรรม ผสมผสาน Intent Understanding กับ Artistic Generation — สร้างผลลัพธ์ที่สอดคล้องกับเป้าหมายเชิงกลยุทธ์"
              : "Architecture-driven creative AI that combines intent understanding with artistic generation — producing outputs aligned with strategic goals."}
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4 space-y-4 text-muted-foreground leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-5">
            {isTh ? "Creative AI ที่เข้าใจกลยุทธ์" : "Creative AI That Understands Strategy"}
          </h2>
          <p>
            {isTh
              ? "เครื่องมือ Creative AI ส่วนใหญ่สร้างผลงานจาก Prompts ระดับผิวเผิน แต่ Artent AI ลึกกว่า — ใช้สมการ FDIA ของ RCT Ecosystem แยก Creative Intent เป็น Components ที่มีโครงสร้าง เข้าใจไม่ใช่แค่สิ่งที่คุณต้องการสร้าง แต่ทำไมถึงสร้าง และตอบโจทย์ธุรกิจอย่างไร"
              : "Most creative AI tools generate content based on surface-level prompts. Artent AI goes deeper — it leverages the FDIA equation to decompose creative intent into structured components, understanding not just what you want to create, but why."}
          </p>
          <p>
            {isTh
              ? "แพลตฟอร์มรวม Genome Subsystem สำหรับ Personality Modeling กับ Multi-Modal Generation Engine ที่สร้างข้อความ รูปภาพ โค้ด งานนำเสนอ วิดีโอ จาก Intent เดียว"
              : "The platform combines the Genome subsystem for personality modeling with a multi-modal generation engine capable of producing text, images, code, presentations, and video content from a single intent specification."}
          </p>
          <p>
            {isTh
              ? "สำหรับทีม Enterprise Artent AI เชื่อมต่อผลลัพธ์สร้างสรรค์กับ KPIs ที่วัดได้ผ่าน Creative Strategy Alignment Module — ปิดลูประหว่างการสร้างและผลลัพธ์"
              : "For enterprise teams, Artent AI connects creative output to measurable KPIs through the Creative Strategy Alignment module — closing the loop between creation and performance."}
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">
            {isTh ? "ความสามารถสร้างสรรค์" : "Creative Capabilities"}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
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
            </motion.div>
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
                ? "Artent AI ใช้ประโยชน์จาก RCT Stack ทั้งหมด — สมการ FDIA สำหรับ Intent Decomposition, Genome Subsystem สำหรับ Personality Modeling และสถาปัตยกรรม 9-Tier Algorithm"
                : "Artent AI leverages the full RCT stack — FDIA equation for intent decomposition, Genome subsystem for personality modeling, and the 9-tier algorithm architecture."}
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "FDIA", desc: isTh ? "Intent Decomposition" : "Intent Decomposition", color: "#C4745B" },
                { label: "Genome", desc: isTh ? "Personality Model" : "Personality Model", color: "#7B9E87" },
                { label: "9-Tier", desc: isTh ? "Content Routing" : "Content Routing", color: "#D4A853" },
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
          <Link href="/products/signed-ai" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold text-sm transition-colors" style={{ backgroundColor: "#7B9E87" }}>
            SignedAI <ArrowRight size={16} />
          </Link>
          <Link href="/products/rctlabs" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-foreground font-semibold text-sm hover:bg-muted transition-colors">
            RCTLabs
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
