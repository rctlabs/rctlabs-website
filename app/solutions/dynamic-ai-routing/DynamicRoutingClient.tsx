"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { GitBranch, Zap, Target, Cpu, Network, ArrowRight } from "lucide-react"
import { getBreadcrumbSchema } from "@/lib/schema"

const tiers = [
  { tier: "S", nameEn: "Supervisor", nameTh: "Supervisor", descEn: "System-level orchestration and resource management", descTh: "การจัดการระดับระบบและทรัพยากร", count: 3, color: "#C4745B" },
  { tier: "1", nameEn: "Foundation", nameTh: "Foundation", descEn: "Core intent parsing and basic NLP operations", descTh: "การแยกวิเคราะห์ Intent หลักและ NLP พื้นฐาน", count: 4, color: "#D4A853" },
  { tier: "2", nameEn: "Analysis", nameTh: "Analysis", descEn: "Deep semantic analysis and context extraction", descTh: "การวิเคราะห์เชิงลึกและการสกัด Context", count: 5, color: "#7B9E87" },
  { tier: "3", nameEn: "Reasoning", nameTh: "Reasoning", descEn: "Logical inference and chain-of-thought processing", descTh: "การอนุมานเชิงตรรกะและ Chain-of-Thought", count: 5, color: "#89B4C8" },
  { tier: "4", nameEn: "Synthesis", nameTh: "Synthesis", descEn: "Multi-source data integration and synthesis", descTh: "การรวมข้อมูลจากหลายแหล่งและสังเคราะห์", count: 4, color: "#B8A9C9" },
  { tier: "5", nameEn: "Verification", nameTh: "Verification", descEn: "Cross-validation and fact-checking mechanisms", descTh: "กลไก Cross-Validation และ Fact-Checking", count: 5, color: "#C4745B" },
  { tier: "6", nameEn: "Optimization", nameTh: "Optimization", descEn: "Performance tuning and cost optimization", descTh: "การปรับแต่งประสิทธิภาพและต้นทุน", count: 4, color: "#D4A853" },
  { tier: "7", nameEn: "Adaptation", nameTh: "Adaptation", descEn: "Dynamic model selection and routing adaptation", descTh: "การเลือก Model แบบ Dynamic และการปรับ Routing", count: 5, color: "#7B9E87" },
  { tier: "8", nameEn: "Evolution", nameTh: "Evolution", descEn: "Self-evolving orchestration and meta-learning", descTh: "Self-Evolving Orchestration และ Meta-Learning", count: 6, color: "#89B4C8" },
]

const routingBenefits = [
  {
    icon: Zap, color: "#D4A853",
    titleEn: "Sub-50ms Routing", titleTh: "Routing ต่ำกว่า 50ms",
    descEn: "Intent classification and model selection in under 50 milliseconds — faster than traditional API gateway routing.",
    descTh: "Intent Classification และ Model Selection ภายใน 50 มิลลิวินาที — เร็วกว่า API Gateway Routing แบบดั้งเดิม",
  },
  {
    icon: Target, color: "#7B9E87",
    titleEn: "Cost-Optimized", titleTh: "ปรับต้นทุนให้เหมาะสม",
    descEn: "Automatically routes simple queries to cheaper models and complex tasks to premium models — reducing API costs by up to 60%.",
    descTh: "กำหนดเส้นทาง Query ง่ายไปยัง Model ราคาถูก และ Task ซับซ้อนไปยัง Model ระดับ Premium — ลดค่า API สูงสุด 60%",
  },
  {
    icon: Network, color: "#C4745B",
    titleEn: "Multi-LLM Orchestration", titleTh: "Multi-LLM Orchestration",
    descEn: "Coordinate multiple LLMs working in parallel or sequence — each handling the subtask it's best suited for.",
    descTh: "ประสานงาน LLMs หลายตัวทำงานแบบ Parallel หรือ Sequence — แต่ละตัวจัดการ Subtask ที่เหมาะสมที่สุด",
  },
  {
    icon: Cpu, color: "#89B4C8",
    titleEn: "Self-Evolving", titleTh: "วิวัฒนาการด้วยตัวเอง",
    descEn: "The routing system learns from outcomes and continuously improves model selection accuracy through meta-learning.",
    descTh: "ระบบ Routing เรียนรู้จากผลลัพธ์และปรับปรุงความแม่นยำในการเลือก Model อย่างต่อเนื่องผ่าน Meta-Learning",
  },
]

export default function DynamicAIRoutingPage() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const locale = getLocaleFromPathname(pathname) ?? "en"
  const isEn = locale === "en"

  const bg = isDark ? "#141414" : "#ffffff"
  const bg2 = isDark ? "#1A1A1A" : "#FAF6F0"
  const cardBg = isDark ? "#1E1E1E" : "#ffffff"
  const cardBorder = isDark ? "#2A2A2A" : "#E8E3DC"
  const textPrimary = isDark ? "#E8E3DC" : "#1A1A1A"
  const textSecondary = isDark ? "#999" : "#4A4A4A"
  const textMuted = isDark ? "#888" : "#6B6B6B"

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema([
        { name: "Home", url: "https://rctlabs.co" },
        { name: isEn ? "Solutions" : "โซลูชัน", url: "https://rctlabs.co/solutions" },
        { name: isEn ? "Dynamic AI Routing" : "Dynamic AI Routing", url: "https://rctlabs.co/solutions/dynamic-ai-routing" },
      ])) }} />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 px-4 text-center" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ color: "#D4A853", borderColor: "rgba(212,168,83,0.3)", background: "rgba(212,168,83,0.07)" }}>
              <GitBranch size={14} /> {isEn ? "Solutions" : "โซลูชัน"}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: textPrimary }}>
              <span style={{ color: "#D4A853" }}>{isEn ? "Dynamic" : "Dynamic"}</span>
              {isEn ? " AI Routing" : " AI Routing"}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg mb-10" style={{ color: textSecondary }}>
              {isEn
                ? "Intelligent Multi-LLM routing across 9 tiers of 41 algorithms — from basic intent parsing to self-evolving orchestration. Sub-50ms with 60% cost savings."
                : "Routing Multi-LLM อัจฉริยะผ่าน 9 Tiers ของ 41 Algorithms — ตั้งแต่การแยกวิเคราะห์ Intent พื้นฐานถึง Self-Evolving Orchestration ต่ำกว่า 50ms ประหยัดต้นทุน 60%"}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/algorithms"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                style={{ background: "#D4A853" }}>
                {isEn ? "View 41 Algorithms" : "ดู 41 Algorithms"} <ArrowRight size={16} />
              </Link>
              <Link href="/architecture"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm"
                style={{ borderColor: cardBorder, color: textPrimary }}>
                {isEn ? "Architecture Overview" : "ภาพรวมสถาปัตยกรรม"}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: textPrimary }}>
                {isEn ? "Why " : "ทำไม "}
                <span style={{ color: "#D4A853" }}>Dynamic Routing</span>
                {isEn ? " Matters" : " จึงสำคัญ"}
              </h2>
              <p className="text-base max-w-2xl mx-auto" style={{ color: textSecondary }}>
                {isEn
                  ? "Static model assignment wastes resources and limits quality. Dynamic routing ensures every task gets the optimal AI model."
                  : "การกำหนด Model แบบคงที่สิ้นเปลืองทรัพยากรและจำกัดคุณภาพ Dynamic Routing รับประกันว่าทุก Task ได้รับ AI Model ที่เหมาะสมที่สุด"}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {routingBenefits.map((benefit, i) => {
                const Icon = benefit.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="p-6 sm:p-8 rounded-2xl border" style={{ background: isDark ? "#1E1E1E" : "#FAF6F0", borderColor: cardBorder }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: `${benefit.color}15` }}>
                        <Icon size={22} style={{ color: benefit.color }} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold mb-2" style={{ color: textPrimary }}>
                          {isEn ? benefit.titleEn : benefit.titleTh}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>
                          {isEn ? benefit.descEn : benefit.descTh}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* 9-Tier Architecture */}
        <section className="py-16 px-4" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: textPrimary }}>
                <span style={{ color: "#D4A853" }}>9 Tiers</span>
                {isEn ? " of Algorithm Intelligence" : " แห่ง Algorithm Intelligence"}
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: textSecondary }}>
                {isEn
                  ? "41 algorithms organized into 9 tiers — from foundational operations to self-evolving meta-intelligence."
                  : "41 Algorithms จัดเป็น 9 Tiers — ตั้งแต่การดำเนินการพื้นฐานถึง Self-Evolving Meta-Intelligence"}
              </p>
            </motion.div>
            <div className="space-y-3">
              {tiers.map((tier, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="p-4 sm:p-5 rounded-xl border flex items-center gap-4" style={{ background: cardBg, borderColor: cardBorder }}>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0 font-bold text-sm sm:text-base"
                    style={{ background: `${tier.color}15`, color: tier.color }}>
                    T-{tier.tier}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm sm:text-base font-bold" style={{ color: textPrimary }}>
                      {isEn ? tier.nameEn : tier.nameTh}
                    </h3>
                    <p className="text-xs sm:text-sm" style={{ color: textMuted }}>
                      {isEn ? tier.descEn : tier.descTh}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xl font-bold" style={{ color: tier.color }}>{tier.count}</div>
                    <div className="text-[10px] uppercase tracking-wider" style={{ color: textMuted }}>Algo</div>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Total */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="mt-6 p-5 rounded-xl border-2 text-center"
              style={{ borderColor: "rgba(212,168,83,0.3)", background: isDark ? "rgba(58,46,21,0.3)" : "rgba(254,243,199,0.4)" }}>
              <span className="text-3xl sm:text-4xl font-bold" style={{ color: "#D4A853" }}>41</span>
              <span className="text-sm font-medium ml-2" style={{ color: textPrimary }}>
                {isEn ? "Total Algorithms across 9 Tiers" : "Algorithms ทั้งหมดใน 9 Tiers"}
              </span>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-2xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6" style={{ color: textPrimary }}>
                {isEn ? "Explore Related Solutions" : "สำรวจโซลูชันที่เกี่ยวข้อง"}
              </h2>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/algorithms"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: "#D4A853" }}>
                  {isEn ? "View All 41 Algorithms" : "ดู 41 Algorithms ทั้งหมด"} <ArrowRight size={16} />
                </Link>
                <Link href="/solutions/ai-hallucination-prevention"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm"
                  style={{ borderColor: cardBorder, color: textPrimary }}>
                  AI Hallucination Prevention
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
