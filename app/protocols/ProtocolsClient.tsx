"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "@/components/theme-provider"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { ArrowRight, FileText, Calculator, Brain, BookOpen } from "lucide-react"
import JITNAFlowchart from "@/components/diagrams/jitna-flowchart"
import OptimizedImage from "@/components/ui/optimized-image"
import { pixelIcons } from "@/lib/pixel-icons"

const PIXEL_JITNA = pixelIcons.jitna

const protocols = [
  {
    id: "jitna",
    href: "/protocols/jitna-rfc-001",
    icon: FileText,
    color: "#D4A853",
    bgLight: "rgba(212,168,83,0.1)",
    bgDark: "rgba(212,168,83,0.12)",
    titleEn: "JITNA RFC-001",
    titleTh: "JITNA RFC-001",
    tagEn: "Communication Protocol",
    tagTh: "Communication Protocol",
    statusEn: "RFC Published",
    statusTh: "RFC เผยแพร่แล้ว",
    descEn: "Just-In-Time Neural Allocation — the communication standard for Multi-LLM orchestration. 6 Primitives (I, D, Δ, A, R, M) encoding intent, synthesis, reflection, and memory into a universal packet structure.",
    descTh: "Just-In-Time Neural Allocation — มาตรฐานการสื่อสารสำหรับ Multi-LLM Orchestration 6 Primitives (I, D, Δ, A, R, M) เข้ารหัส Intent, Synthesis, Reflection และ Memory เป็น Packet Structure สากล",
  },
  {
    id: "fdia",
    href: "/protocols/fdia-equation",
    icon: Calculator,
    color: "#C4745B",
    bgLight: "rgba(196,116,91,0.1)",
    bgDark: "rgba(196,116,91,0.12)",
    titleEn: "FDIA Equation",
    titleTh: "สมการ FDIA",
    tagEn: "Mathematical Foundation",
    tagTh: "Mathematical Foundation",
    statusEn: "Core Standard",
    statusTh: "มาตรฐานหลัก",
    descEn: "F = (D^I) × A — Future equals Data raised to the power of Intent, multiplied by the Architect (Human-in-the-Loop). The master equation governing all AI decision-making within the RCT Ecosystem.",
    descTh: "F = (D^I) × A — Future เท่ากับ Data ยกกำลัง Intent คูณด้วย Architect (Human-in-the-Loop) สมการหลักที่ควบคุมการตัดสินใจ AI ทั้งหมดภายใน RCT Ecosystem",
  },
  {
    id: "rct7",
    href: "/protocols/rct-7-mental-model",
    icon: Brain,
    color: "#7B9E87",
    bgLight: "rgba(123,158,135,0.1)",
    bgDark: "rgba(123,158,135,0.12)",
    titleEn: "RCT-7 Mental Model",
    titleTh: "RCT-7 Mental Model",
    tagEn: "Cognitive Framework",
    tagTh: "Cognitive Framework",
    statusEn: "Active Standard",
    statusTh: "มาตรฐานที่ใช้งานอยู่",
    descEn: "The 7 Genome subsystems that define AI personality: Perception, Empathy, Reasoning, Creativity, Ethics, Execution, and Evolution. A cognitive architecture for building AI that thinks, not just computes.",
    descTh: "7 Genome Subsystems ที่กำหนดบุคลิกภาพ AI: Perception, Empathy, Reasoning, Creativity, Ethics, Execution และ Evolution สถาปัตยกรรมทางปัญญาสำหรับสร้าง AI ที่คิด ไม่ใช่แค่คำนวณ",
  },
]

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TechArticle",
  "headline": "RCT Protocols — JITNA, FDIA Equation, and RCT-7 Model",
  "description": "Open protocols and mathematical foundations powering the RCT Ecosystem: JITNA communication protocol, FDIA decision equation, and RCT-7 cognitive model.",
  "author": { "@type": "Organization", "name": "RCT Labs" },
  "about": [
    { "@type": "SoftwareApplication", "name": "JITNA Protocol RFC-001", "applicationCategory": "CommunicationProtocol" },
    { "@type": "SoftwareApplication", "name": "FDIA Equation Framework", "applicationCategory": "AIFramework" },
    { "@type": "SoftwareApplication", "name": "RCT-7 Mental Model", "applicationCategory": "CognitiveFramework" },
  ],
}

export default function ProtocolsPage() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const locale = getLocaleFromPathname(pathname) ?? "en"
  const isEn = locale === "en"

  const bg = isDark ? "#141414" : "#ffffff"
  const bg2 = isDark ? "#0D0D0D" : "#FAF6F0"
  const cardBorder = isDark ? "#2A2A2A" : "#E8E3DC"
  const textPrimary = isDark ? "#E8E3DC" : "#1A1A1A"
  const textSecondary = isDark ? "#999" : "#4A4A4A"

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 px-4 text-center" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ color: "#C4745B", borderColor: "rgba(196,116,91,0.3)", background: "rgba(196,116,91,0.07)" }}>
              📜 {isEn ? "Open Standards" : "มาตรฐานเปิด"}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: textPrimary }}>
              {isEn ? "RCT " : "RCT "}<span style={{ color: "#C4745B" }}>{isEn ? "Protocols" : "Protocols"}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg mb-8" style={{ color: isDark ? "#999" : "#4A4A4A" }}>
              {isEn
                ? "Open protocols and mathematical foundations powering the RCT Ecosystem. Published as transparent, peer-reviewable standards available to the AI community."
                : "โปรโตคอลเปิดและรากฐานทางคณิตศาสตร์ที่ขับเคลื่อน RCT Ecosystem เผยแพร่เป็น Standards ที่โปร่งใสและตรวจสอบได้จาก Community ด้าน AI"}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3">
              {[
                { v: "3", l: isEn ? "Open Protocols" : "Open Protocols" },
                { v: "Apache 2.0", l: isEn ? "License" : "ใบอนุญาต" },
                { v: "RFC-001", l: isEn ? "Latest Version" : "เวอร์ชันล่าสุด" },
              ].map((stat) => (
                <div key={stat.v} className="px-5 py-3 rounded-xl border text-center" style={{ background: isDark ? "#1E1E1E" : "white", borderColor: cardBorder }}>
                  <div className="text-base font-bold" style={{ color: "#C4745B" }}>{stat.v}</div>
                  <div className="text-xs" style={{ color: textSecondary }}>{stat.l}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-14 px-4" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-2xl sm:text-3xl font-bold mb-5" style={{ color: textPrimary }}>
              {isEn ? "The Foundation of Interoperable AI" : "รากฐานของ AI ที่ทำงานร่วมกันได้"}
            </motion.h2>
            <div className="space-y-4 text-base leading-relaxed" style={{ color: textSecondary }}>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                {isEn
                  ? "Protocols are the backbone of any reliable system. The RCT Ecosystem publishes its three core protocols as open standards, enabling transparency, peer review, and interoperability with external AI frameworks. Each protocol addresses a different dimension of AI intelligence: communication (JITNA), decision-making (FDIA), and cognitive architecture (RCT-7)."
                  : "โปรโตคอลเป็นแกนหลักของระบบที่เชื่อถือได้ RCT Ecosystem เผยแพร่โปรโตคอลหลัก 3 ตัวเป็น Open Standards เปิดให้โปร่งใส Peer Review และ Interoperability กับ AI Frameworks ภายนอก แต่ละโปรโตคอลจัดการมิติที่แตกต่างกัน"}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
                {isEn
                  ? "Together, these three protocols form a complete specification for building intelligent, safe, and scalable AI systems. JITNA defines how agents communicate, FDIA defines how decisions are computed, and RCT-7 defines how AI personality and behavior emerge from seven cognitive subsystems."
                  : "โปรโตคอลทั้ง 3 ตัวรวมกันเป็นข้อกำหนดสมบูรณ์สำหรับสร้างระบบ AI ที่ฉลาด ปลอดภัย และปรับขนาดได้ JITNA กำหนดวิธีที่ Agents สื่อสาร FDIA กำหนดวิธีคำนวณการตัดสินใจ และ RCT-7 กำหนดบุคลิกภาพ AI จาก 7 Subsystems"}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
                {isEn
                  ? "By adopting these open protocols, enterprises can integrate RCT capabilities into existing infrastructure without vendor lock-in. Each protocol is versioned, backward-compatible, and designed for incremental adoption — start with one and expand as your AI maturity grows."
                  : "ด้วยการนำ Open Protocols เหล่านี้มาใช้ องค์กรสามารถเชื่อมต่อความสามารถ RCT เข้ากับ Infrastructure ที่มีอยู่โดยไม่ถูกล็อคกับ Vendor แต่ละโปรโตคอลรองรับ Backward-Compatible และออกแบบให้นำไปใช้แบบ Incremental"}
              </motion.p>
            </div>
          </div>
        </section>

        <section className="px-4 py-14" style={{ background: bg }}>
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-8 text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium border" style={{ color: "#7B9E87", borderColor: "rgba(123,158,135,0.28)", background: "rgba(123,158,135,0.08)" }}>
                <OptimizedImage src={PIXEL_JITNA} alt="" pixelated containerClassName="h-6 w-6" objectFit="contain" width={24} height={24} />
                {isEn ? "Interactive Protocol Flow" : "Interactive Protocol Flow"}
              </div>
              <h2 className="mt-5 text-3xl font-bold" style={{ color: textPrimary }}>
                {isEn ? "See JITNA as a Negotiation Runtime" : "ดู JITNA เป็น Negotiation Runtime"}
              </h2>
              <p className="mt-3 max-w-3xl mx-auto text-sm sm:text-base" style={{ color: textSecondary }}>
                {isEn
                  ? "The landing page now exposes the protocol mechanics directly: intent capture, negotiation, validation, adaptive delivery, and feedback are all visible in a Manus-style interactive flow."
                  : "หน้า protocols แสดงกลไกของโปรโตคอลโดยตรงแล้ว: ตั้งแต่การจับ intent, การเจรจา, การตรวจสอบ, การส่งมอบแบบปรับตัว จนถึง feedback loop ผ่าน flow แบบ interactive ตามแนวทาง Manus"}
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <JITNAFlowchart language={isEn ? "en" : "th"} />
            </motion.div>
          </div>
        </section>

        {/* Open Protocols banner */}
        <section className="py-6 px-4" style={{ background: bg }}>
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="p-6 sm:p-8 rounded-2xl border flex flex-col md:flex-row items-center gap-6"
              style={{ background: isDark ? "#1E1E1E" : "#FAF6F0", borderColor: cardBorder }}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
                style={{ background: "rgba(196,116,91,0.1)" }}>
                <BookOpen size={28} style={{ color: "#C4745B" }} />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-lg sm:text-xl font-bold mb-1" style={{ color: textPrimary }}>
                  {isEn ? "Open Protocols, Transparent AI" : "Open Protocols, AI ที่โปร่งใส"}
                </h2>
                <p className="text-sm" style={{ color: textSecondary }}>
                  {isEn
                    ? "RCT publishes its core protocols as open standards — enabling peer review, community contribution, and interoperability with other AI systems. Transparency builds trust."
                    : "RCT เผยแพร่ Core Protocols เป็น Open Standards — เปิดให้ Peer Review, Community Contribution และ Interoperability กับระบบ AI อื่น ความโปร่งใสสร้างความเชื่อมั่น"}
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Protocol Cards */}
        <section className="py-12 px-4" style={{ background: isDark ? "#1A1A1A" : "#FAF6F0" }}>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-5">
              {protocols.map((protocol, i) => {
                const Icon = protocol.icon
                return (
                  <motion.div key={protocol.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                    <Link href={protocol.href}>
                      <div className="group p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer hover:-translate-y-1"
                        style={{
                          background: isDark ? "#1E1E1E" : "white",
                          borderColor: cardBorder,
                        }}>
                        <div className="flex flex-col md:flex-row items-start gap-5">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform"
                            style={{ background: isDark ? protocol.bgDark : protocol.bgLight }}>
                            <Icon size={24} style={{ color: protocol.color }} />
                          </div>
                          <div className="flex-1">
                            <div className="flex flex-wrap items-center gap-2 mb-1">
                              <h3 className="text-lg font-bold group-hover:opacity-80 transition-opacity" style={{ color: textPrimary }}>
                                {isEn ? protocol.titleEn : protocol.titleTh}
                              </h3>
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                                style={{ background: `${protocol.color}15`, color: protocol.color }}>
                                {isEn ? protocol.statusEn : protocol.statusTh}
                              </span>
                            </div>
                            <span className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: protocol.color }}>
                              {isEn ? protocol.tagEn : protocol.tagTh}
                            </span>
                            <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>
                              {isEn ? protocol.descEn : protocol.descTh}
                            </p>
                          </div>
                          <ArrowRight size={18} className="shrink-0 mt-1 group-hover:translate-x-1 transition-transform" style={{ color: isDark ? "#666" : "#999" }} />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
