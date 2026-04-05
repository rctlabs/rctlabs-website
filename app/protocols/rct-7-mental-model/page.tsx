"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { useMounted } from "@/hooks/use-mounted"
import { getLocaleFromPathname } from "@/lib/i18n"
import { getBreadcrumbSchema } from "@/lib/schema"
import Link from "next/link"
import { Brain, Eye, Heart, Lightbulb, Shield, Sparkles, Cpu, RefreshCw, ArrowRight } from "lucide-react"

const genomes = [
  {
    id: 1, icon: Eye, color: "#C4745B",
    nameEn: "Perception", nameTh: "Perception",
    descEn: "How the AI perceives and interprets incoming information — sensory processing, pattern recognition, and environmental awareness.",
    descTh: "วิธีที่ AI รับรู้และตีความข้อมูลที่เข้ามา — การประมวลผลทางประสาทสัมผัส การจดจำรูปแบบ และการรับรู้สิ่งแวดล้อม",
  },
  {
    id: 2, icon: Heart, color: "#D4A853",
    nameEn: "Empathy", nameTh: "Empathy",
    descEn: "Emotional intelligence and user understanding — tone matching, sentiment analysis, and contextual sensitivity.",
    descTh: "ความฉลาดทางอารมณ์และความเข้าใจผู้ใช้ — การจับคู่น้ำเสียง การวิเคราะห์ความรู้สึก และความอ่อนไหวต่อบริบท",
  },
  {
    id: 3, icon: Lightbulb, color: "#7B9E87",
    nameEn: "Reasoning", nameTh: "Reasoning",
    descEn: "Logical inference and analytical thinking — chain-of-thought processing, hypothesis testing, and deductive reasoning.",
    descTh: "การอนุมานเชิงตรรกะและการคิดวิเคราะห์ — Chain-of-Thought Processing, Hypothesis Testing และ Deductive Reasoning",
  },
  {
    id: 4, icon: Sparkles, color: "#89B4C8",
    nameEn: "Creativity", nameTh: "Creativity",
    descEn: "Novel solution generation and lateral thinking — combining existing knowledge in new ways to produce innovative outputs.",
    descTh: "การสร้างโซลูชันใหม่และการคิดแบบ Lateral — ผสมผสานความรู้ที่มีในรูปแบบใหม่เพื่อสร้างผลลัพธ์ที่สร้างสรรค์",
  },
  {
    id: 5, icon: Shield, color: "#B8A9C9",
    nameEn: "Ethics", nameTh: "Ethics",
    descEn: "Moral reasoning and safety guardrails — bias detection, fairness assessment, and responsible AI decision-making.",
    descTh: "การใช้เหตุผลทางจริยธรรมและ Safety Guardrails — การตรวจจับอคติ การประเมินความเป็นธรรม และการตัดสินใจ AI อย่างรับผิดชอบ",
  },
  {
    id: 6, icon: Cpu, color: "#C4745B",
    nameEn: "Execution", nameTh: "Execution",
    descEn: "Task planning and action execution — breaking complex goals into steps, resource allocation, and quality assurance.",
    descTh: "การวางแผน Task และการดำเนินการ — แบ่งเป้าหมายซับซ้อนเป็นขั้นตอน การจัดสรรทรัพยากร และการประกันคุณภาพ",
  },
  {
    id: 7, icon: RefreshCw, color: "#D4A853",
    nameEn: "Evolution", nameTh: "Evolution",
    descEn: "Self-improvement and adaptation — learning from outcomes, updating mental models, and evolving capabilities over time.",
    descTh: "การปรับปรุงตัวเองและการปรับตัว — เรียนรู้จากผลลัพธ์ อัปเดต Mental Models และพัฒนาความสามารถตามเวลา",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "RCT-7 Mental Model — 7 Genome AI Cognitive Framework",
  "description": "Cognitive framework defining AI personality through 7 genome subsystems: Perception, Empathy, Reasoning, Creativity, Ethics, Execution, and Evolution.",
  "author": { "@type": "Organization", "name": "RCT Ecosystem" },
}

export default function RCT7MentalModelPage() {
  const pathname = usePathname()
  const { resolvedTheme } = useTheme()
  const mounted = useMounted()
  const isDark = (mounted ? resolvedTheme : "light") === "dark"
  const locale = getLocaleFromPathname(pathname) ?? "en"
  const isEn = locale === "en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isEn ? "Home" : "หน้าหลัก", url: `https://rctlabs.co/${locale}` },
    { name: isEn ? "Protocols" : "โปรโตคอล", url: `https://rctlabs.co/${locale}/protocols` },
    { name: "RCT-7 Mental Model", url: `https://rctlabs.co/${locale}/protocols/rct-7-mental-model` },
  ])

  const bg = isDark ? "#141414" : "#ffffff"
  const bg2 = isDark ? "#1A1A1A" : "#FAF6F0"
  const cardBorder = isDark ? "#2A2A2A" : "#E8E3DC"
  const textPrimary = isDark ? "#E8E3DC" : "#1A1A1A"
  const textSecondary = isDark ? "#999" : "#4A4A4A"

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 px-4 text-center" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ color: "#7B9E87", borderColor: "rgba(123,158,135,0.3)", background: "rgba(123,158,135,0.07)" }}>
              <Brain size={14} /> {isEn ? "Cognitive Framework" : "Cognitive Framework"}
            </m.div>
            <m.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: textPrimary }}>
              RCT-7 <span style={{ color: "#7B9E87" }}>Mental Model</span>
            </m.h1>
            <m.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg mb-10" style={{ color: isDark ? "#999" : "#4A4A4A" }}>
              {isEn
                ? "7 Genome subsystems that define AI personality and behavior — a cognitive architecture for building AI that thinks, not just computes."
                : "7 Genome Subsystems ที่กำหนดบุคลิกภาพและพฤติกรรม AI — สถาปัตยกรรมทางปัญญาสำหรับสร้าง AI ที่คิด ไม่ใช่แค่คำนวณ"}
            </m.p>
            {/* Genome count badge */}
            <m.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-4 px-8 py-4 rounded-2xl border"
              style={{ background: isDark ? "#1E1E1E" : "white", borderColor: "rgba(123,158,135,0.3)" }}>
              <span className="text-4xl font-bold" style={{ color: "#7B9E87" }}>7</span>
              <div className="text-left">
                <div className="text-sm font-semibold" style={{ color: textPrimary }}>{isEn ? "Genome Subsystems" : "Genome Subsystems"}</div>
                <div className="text-xs" style={{ color: isDark ? "#888" : "#6B6B6B" }}>{isEn ? "Cognitive Architecture" : "สถาปัตยกรรมทางปัญญา"}</div>
              </div>
            </m.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-14 px-4" style={{ background: bg }}>
          <div className="max-w-3xl mx-auto">
            <m.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold mb-5" style={{ color: textPrimary }}>
              {isEn ? "What Is the RCT-7 Mental Model?" : "RCT-7 Mental Model คืออะไร?"}
            </m.h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: isDark ? "#999" : "#4A4A4A" }}>
              <m.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {isEn
                  ? "The RCT-7 Mental Model is a cognitive framework that defines how AI systems should think, not just compute. Inspired by cognitive science research, it decomposes intelligence into seven fundamental capabilities. Each is implemented as a genome subsystem within the RCT Ecosystem."
                  : "RCT-7 Mental Model เป็น Cognitive Framework ที่กำหนดวิธีที่ระบบ AI ควรคิด ไม่ใช่แค่คำนวณ ได้แรงบันดาลใจจากวิทยาศาสตร์การรับรู้ แยก Intelligence เป็น 7 ความสามารถพื้นฐาน แต่ละอย่างถูกนำไปใช้เป็น Genome Subsystem ใน RCT Ecosystem"}
              </m.p>
              <m.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                {isEn
                  ? "Traditional AI systems excel at pattern matching but lack a coherent cognitive architecture. The RCT-7 model addresses this gap — Perception feeds data to Reasoning, Ethics constrains Execution, and Evolution improves all subsystems over time through meta-learning."
                  : "ระบบ AI แบบดั้งเดิมเก่งในการจับคู่รูปแบบแต่ขาดสถาปัตยกรรมทางปัญญาที่เชื่อมโยง RCT-7 Model แก้ช่องว่างนี้ — Perception ป้อนข้อมูลให้ Reasoning, Ethics จำกัด Execution และ Evolution ปรับปรุงทุกระบบย่อยผ่าน Meta-Learning"}
              </m.p>
              <m.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                {isEn
                  ? "This model maps to the 7 Genome System and integrates with the 10-Layer Architecture at Layer 5 (Reasoning Core) and Layer 10 (Self-Evolving Orchestrator). By tuning genome weights, developers create AI personalities optimized for specific use cases — from empathetic customer agents to rigorous analytical systems."
                  : "Model นี้เชื่อมโยงกับ 7 Genome System และรวมกับสถาปัตยกรรม 10 ชั้นที่ Layer 5 (Reasoning Core) และ Layer 10 (Self-Evolving Orchestrator) ด้วยการปรับน้ำหนัก Genome นักพัฒนาสร้าง AI Personalities ที่ปรับแต่งสำหรับ Use Cases เฉพาะ"}
              </m.p>
            </div>
          </div>
        </section>

        {/* 7 Genomes */}
        <section className="py-16 px-4" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: textPrimary }}>
                <span style={{ color: "#7B9E87" }}>7 Genome</span> {isEn ? "Subsystems" : "Subsystems"}
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: textSecondary }}>
                {isEn
                  ? "Each genome represents a fundamental cognitive capability — together they form a complete AI mind."
                  : "แต่ละ Genome แสดงถึงความสามารถทางปัญญาพื้นฐาน — รวมกันเป็น AI Mind ที่สมบูรณ์"}
              </p>
            </m.div>
            <div className="space-y-4">
              {genomes.map((genome, i) => {
                const Icon = genome.icon
                return (
                  <m.div key={i} initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="p-5 sm:p-6 rounded-2xl border" style={{ background: isDark ? "#1E1E1E" : "#ffffff", borderColor: cardBorder }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${genome.color}15` }}>
                        <Icon size={24} style={{ color: genome.color }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-xs font-bold px-2 py-0.5 rounded"
                            style={{ background: `${genome.color}15`, color: genome.color }}>G-{genome.id}</span>
                          <h3 className="text-base sm:text-lg font-bold" style={{ color: textPrimary }}>
                            {isEn ? genome.nameEn : genome.nameTh}
                          </h3>
                        </div>
                        <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>
                          {isEn ? genome.descEn : genome.descTh}
                        </p>
                      </div>
                    </div>
                  </m.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-2xl mx-auto text-center">
            <m.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>
                {isEn ? "Explore Related Protocols" : "สำรวจ Protocols ที่เกี่ยวข้อง"}
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/genome"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: "#7B9E87" }}>
                  {isEn ? "Genome Deep Dive" : "Genome เชิงลึก"} <ArrowRight size={16} />
                </Link>
                <Link href="/protocols/jitna-rfc-001"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm"
                  style={{ borderColor: cardBorder, color: textPrimary }}>
                  JITNA RFC-001
                </Link>
              </div>
            </m.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
