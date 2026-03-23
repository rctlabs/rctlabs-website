"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import { Shield, AlertTriangle, Eye, Lock, Layers, BarChart3, ArrowRight } from "lucide-react"

const verificationSteps = [
  {
    step: 1, icon: Layers,
    titleEn: "Multi-LLM Query Distribution", titleTh: "กระจาย Query ไปยัง Multi-LLM",
    descEn: "The same query is sent to up to 8 different LLMs simultaneously, each processing independently without knowledge of other responses.",
    descTh: "Query เดียวกันถูกส่งไปยัง LLMs สูงสุด 8 ตัวพร้อมกัน แต่ละตัวประมวลผลอิสระโดยไม่รู้คำตอบของตัวอื่น",
  },
  {
    step: 2, icon: Eye,
    titleEn: "Cross-Verification Analysis", titleTh: "วิเคราะห์ Cross-Verification",
    descEn: "Responses are compared using semantic similarity, factual consistency, and logical coherence algorithms from Tier-6 to Tier-8.",
    descTh: "คำตอบถูกเปรียบเทียบด้วย Semantic Similarity, Factual Consistency และ Logical Coherence Algorithms จาก Tier-6 ถึง Tier-8",
  },
  {
    step: 3, icon: Lock,
    titleEn: "Cryptographic Signing", titleTh: "Cryptographic Signing",
    descEn: "Verified consensus responses are cryptographically signed with a complete audit trail — every step is traceable and tamper-proof.",
    descTh: "คำตอบที่ผ่าน Consensus ถูก Cryptographically Signed พร้อม Audit Trail ที่สมบูรณ์ — ทุกขั้นตอนตรวจสอบได้และป้องกันการแก้ไข",
  },
  {
    step: 4, icon: BarChart3,
    titleEn: "Confidence Scoring", titleTh: "การให้คะแนนความมั่นใจ",
    descEn: "Each response receives a confidence score based on consensus level — responses below threshold are flagged for human review.",
    descTh: "แต่ละคำตอบได้รับ Confidence Score ตาม Consensus Level — คำตอบที่ต่ำกว่า Threshold จะถูกส่งให้มนุษย์ตรวจสอบ",
  },
]

const comparisonData = [
  { metric: "Accuracy Rate", single: "85%", signedAI: "99.7%", improvement: "+17.3%" },
  { metric: "Hallucination Rate", single: "15%", signedAI: "0.3%", improvement: "-98%" },
  { metric: "Audit Trail", single: "None", signedAI: "Complete", improvement: "New" },
  { metric: "Verification", single: "Self-check", signedAI: "Multi-LLM", improvement: "8x" },
  { metric: "Tamper Proof", single: "No", signedAI: "Cryptographic", improvement: "New" },
]

const caseStudies = [
  {
    industry: { en: "Financial Services", th: "บริการทางการเงิน" }, icon: "🏦", color: "#D4A853",
    metrics: [
      { label: { en: "Hallucination rate reduced", th: "ลดอัตรา Hallucination" }, before: "18.2%", after: "0.4%", delta: "-97.8%" },
      { label: { en: "Compliance audit pass rate", th: "ผ่าน Compliance Audit" }, before: "71%", after: "99.6%", delta: "+40%" },
      { label: { en: "Response latency", th: "Response latency" }, before: "420ms", after: "185ms", delta: "-56%" },
    ],
    quote: {
      en: "SignedAI eliminated the risk of AI-generated financial misinformation — our compliance team now approves AI outputs on the first pass.",
      th: "SignedAI ขจัดความเสี่ยงจากข้อมูลทางการเงินที่ AI สร้างผิดพลาด — ทีม Compliance อนุมัติผลลัพธ์ AI ได้ทันทีในครั้งแรก",
    },
  },
  {
    industry: { en: "Healthcare AI", th: "ระบบ AI สุขภาพ" }, icon: "🏥", color: "#C4745B",
    metrics: [
      { label: { en: "Clinical data accuracy", th: "ความแม่นยำข้อมูลคลินิก" }, before: "84%", after: "99.5%", delta: "+18.5%" },
      { label: { en: "False positive diagnoses", th: "False Positive Diagnoses" }, before: "12%", after: "0.5%", delta: "-95.8%" },
      { label: { en: "Audit trail completeness", th: "ความสมบูรณ์ Audit Trail" }, before: "0%", after: "100%", delta: "New" },
    ],
    quote: {
      en: "Multi-LLM consensus on patient data analysis reduced false positives by 95.8% — critical for regulatory submissions.",
      th: "Multi-LLM Consensus ในการวิเคราะห์ข้อมูลผู้ป่วยลด False Positive 95.8% — สำคัญมากสำหรับ Regulatory Submission",
    },
  },
  {
    industry: { en: "Legal Document AI", th: "AI เอกสารกฎหมาย" }, icon: "⚖️", color: "#7B9E87",
    metrics: [
      { label: { en: "Factual error rate", th: "อัตราข้อผิดพลาดข้อเท็จจริง" }, before: "14.7%", after: "0.2%", delta: "-98.6%" },
      { label: { en: "Contract review time", th: "เวลา Review สัญญา" }, before: "4.2h", after: "22min", delta: "-91%" },
      { label: { en: "Lawyer override rate", th: "อัตราที่ทนายต้องแก้ไข" }, before: "43%", after: "3%", delta: "-93%" },
    ],
    quote: {
      en: "We processed 10,000+ contracts with 98.6% fewer AI hallucinations. Attorneys now trust the AI output enough to use it in first drafts.",
      th: "เราประมวลผลสัญญากว่า 10,000 ฉบับโดยลด AI Hallucination ได้ 98.6% ทนายความไว้วางใจผลลัพธ์ AI พอจะใช้ใน Draft แรก",
    },
  },
]

export default function HallucinationPreventionPage() {
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
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">

        {/* Hero */}
        <section className="py-20 px-4 text-center" style={{ background: bg2 }}>
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ color: "#C4745B", borderColor: "rgba(196,116,91,0.3)", background: "rgba(196,116,91,0.07)" }}>
              <Shield size={14} /> {isEn ? "Solutions" : "โซลูชัน"}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6" style={{ color: textPrimary }}>
              {isEn ? "AI Hallucination " : "การป้องกัน "}
              <span style={{ color: "#C4745B" }}>{isEn ? "Prevention" : "AI Hallucination"}</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="text-lg mb-10" style={{ color: textSecondary }}>
              {isEn
                ? "Reduce AI hallucination from 15% to 0.3% using SignedAI Multi-LLM consensus verification with cryptographic audit trails."
                : "ลด AI Hallucination จาก 15% เป็น 0.3% ด้วย SignedAI Multi-LLM Consensus Verification พร้อม Cryptographic Audit Trails"}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/products/signed-ai"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                style={{ background: "#C4745B" }}>
                {isEn ? "SignedAI Product" : "SignedAI Product"} <ArrowRight size={16} />
              </Link>
              <Link href="/demo/fdia"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border"
                style={{ borderColor: cardBorder, color: textPrimary }}>
                {isEn ? "Try FDIA Demo" : "ลอง FDIA Demo"}
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider border mb-5"
                style={{ color: "#C4745B", borderColor: "rgba(196,116,91,0.25)", background: "rgba(196,116,91,0.06)" }}>
                {isEn ? "The Problem" : "ปัญหา"}
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mb-5" style={{ color: textPrimary }}>
                {isEn ? "15% of AI Outputs Are " : "15% ของผลลัพธ์ AI "}
                <span style={{ color: "#C4745B" }}>{isEn ? "Fabricated" : "ถูกสร้างขึ้นผิดพลาด"}</span>
              </h2>
              <p className="text-base leading-relaxed mb-6" style={{ color: textSecondary }}>
                {isEn
                  ? "Single-LLM systems have no built-in mechanism to verify their own outputs. They confidently generate plausible-sounding but factually incorrect information — a critical risk in healthcare, finance, and legal domains."
                  : "ระบบ Single-LLM ไม่มีกลไกตรวจสอบผลลัพธ์ของตัวเอง มันสร้างข้อมูลที่ฟังดูน่าเชื่อถือแต่ผิดข้อเท็จจริงอย่างมั่นใจ — ความเสี่ยงสำคัญในด้าน Healthcare, Finance และ Legal"}
              </p>
              <div className="space-y-3">
                {[
                  { en: "No self-verification capability", th: "ไม่มีความสามารถตรวจสอบตัวเอง" },
                  { en: "Confident but incorrect outputs", th: "ผลลัพธ์ที่มั่นใจแต่ไม่ถูกต้อง" },
                  { en: "No audit trail for accountability", th: "ไม่มี Audit Trail" },
                  { en: "Enterprise compliance risk", th: "ความเสี่ยง Enterprise Compliance" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <AlertTriangle size={15} style={{ color: "#C4745B" }} className="shrink-0" />
                    <span className="text-sm" style={{ color: isDark ? "#CCC" : "#333" }}>{isEn ? item.en : item.th}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}
              className="p-8 rounded-3xl border text-center" style={{ background: isDark ? "#1E1E1E" : "#FAF6F0", borderColor: cardBorder }}>
              <div className="text-7xl font-bold mb-2" style={{ color: "#C4745B" }}>15%</div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-6" style={{ color: textMuted }}>
                {isEn ? "Average Hallucination Rate" : "อัตรา Hallucination เฉลี่ย"}
              </p>
              <div className="h-px w-full mb-6" style={{ background: cardBorder }} />
              <div className="text-7xl font-bold mb-2" style={{ color: "#7B9E87" }}>0.3%</div>
              <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: textMuted }}>
                {isEn ? "With SignedAI Verification" : "ด้วย SignedAI Verification"}
              </p>
            </motion.div>
          </div>
        </section>

        {/* How SignedAI Works */}
        <section className="py-16 px-4" style={{ background: bg2 }}>
          <div className="max-w-5xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4" style={{ color: textPrimary }}>
                {isEn ? "How SignedAI " : "SignedAI "}
                <span style={{ color: "#D4A853" }}>{isEn ? "Works" : "ทำงานอย่างไร"}</span>
              </h2>
              <p className="text-base max-w-2xl mx-auto" style={{ color: textSecondary }}>
                {isEn
                  ? "A 4-step verification pipeline that transforms unreliable single-LLM outputs into cryptographically verified enterprise-grade responses."
                  : "Pipeline 4 ขั้นตอนที่เปลี่ยนผลลัพธ์ Single-LLM ที่ไม่น่าเชื่อถือเป็นคำตอบระดับ Enterprise ที่ได้รับการยืนยัน Cryptographic"}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {verificationSteps.map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="p-6 sm:p-8 rounded-2xl border" style={{ background: cardBg, borderColor: cardBorder }}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: isDark ? "#3A2E15" : "#FEF3C7" }}>
                        <Icon size={22} style={{ color: "#D4A853" }} />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#D4A853" }}>
                          {isEn ? `Step ${step.step}` : `ขั้นตอนที่ ${step.step}`}
                        </span>
                        <h3 className="text-base font-bold mt-1 mb-2" style={{ color: textPrimary }}>
                          {isEn ? step.titleEn : step.titleTh}
                        </h3>
                        <p className="text-sm leading-relaxed" style={{ color: textSecondary }}>
                          {isEn ? step.descEn : step.descTh}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Comparison Table */}
        <section className="py-16 px-4" style={{ background: bg }}>
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3" style={{ color: textPrimary }}>
                Single LLM vs <span style={{ color: "#7B9E87" }}>SignedAI</span>
              </h2>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
              className="rounded-2xl border overflow-hidden" style={{ borderColor: cardBorder }}>
              <div className="grid grid-cols-4 text-xs font-semibold uppercase tracking-wider p-4"
                style={{ background: isDark ? "#1E1E1E" : "#FAF6F0", color: textMuted, borderBottom: `1px solid ${cardBorder}` }}>
                <div>{isEn ? "Metric" : "ตัวชี้วัด"}</div>
                <div className="text-center">Single LLM</div>
                <div className="text-center" style={{ color: "#7B9E87" }}>SignedAI</div>
                <div className="text-center">{isEn ? "Improvement" : "ปรับปรุง"}</div>
              </div>
              {comparisonData.map((row, i) => (
                <div key={i} className="grid grid-cols-4 p-4 text-sm" style={{
                  borderTop: `1px solid ${cardBorder}`,
                  background: i % 2 === 0 ? "transparent" : (isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)")
                }}>
                  <div className="font-medium" style={{ color: textPrimary }}>{row.metric}</div>
                  <div className="text-center" style={{ color: textMuted }}>{row.single}</div>
                  <div className="text-center font-semibold" style={{ color: "#7B9E87" }}>{row.signedAI}</div>
                  <div className="text-center font-semibold" style={{ color: "#D4A853" }}>{row.improvement}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Case Studies */}
        <section className="py-16 px-4" style={{ background: bg2 }}>
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: textPrimary }}>
                {isEn ? "Real-World " : "ผลลัพธ์"}{" "}
                <span style={{ color: "#7B9E87" }}>{isEn ? "Case Studies" : "จริง"}</span>
              </h2>
              <p className="text-sm max-w-xl mx-auto" style={{ color: textMuted }}>
                {isEn ? "Verified results from enterprise deployments across regulated industries." : "ผลลัพธ์ที่ตรวจสอบได้จากการ Deploy ใน Enterprise ในอุตสาหกรรมที่มีการกำกับดูแล"}
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {caseStudies.map((cs, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="rounded-2xl border overflow-hidden" style={{ background: cardBg, borderColor: cardBorder }}>
                  <div className="px-5 py-4 flex items-center gap-3" style={{ background: `${cs.color}12` }}>
                    <span className="text-2xl">{cs.icon}</span>
                    <h3 className="font-bold text-base" style={{ color: cs.color }}>{isEn ? cs.industry.en : cs.industry.th}</h3>
                  </div>
                  <div className="px-5 py-4 space-y-3">
                    {cs.metrics.map((m, j) => (
                      <div key={j} className="text-xs rounded-lg px-3 py-2.5"
                        style={{ background: isDark ? "#161616" : "#FAF6F0" }}>
                        <div className="font-semibold mb-1.5" style={{ color: isDark ? "#CCC" : "#333" }}>
                          {isEn ? m.label.en : m.label.th}
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="line-through" style={{ color: textMuted }}>{m.before}</span>
                          <span style={{ color: "#9CA3AF" }}>→</span>
                          <span className="font-bold" style={{ color: cs.color }}>{m.after}</span>
                          <span className="ml-auto font-bold" style={{ color: "#7B9E87" }}>{m.delta}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-5 pb-5">
                    <blockquote className="text-xs leading-relaxed italic border-l-2 pl-3"
                      style={{ color: textMuted, borderColor: `${cs.color}40` }}>
                      "{isEn ? cs.quote.en : cs.quote.th}"
                    </blockquote>
                  </div>
                </motion.div>
              ))}
            </div>
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
                <Link href="/solutions/enterprise-ai-memory"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white"
                  style={{ background: "#7B9E87" }}>
                  {isEn ? "Enterprise AI Memory" : "Enterprise AI Memory"} <ArrowRight size={16} />
                </Link>
                <Link href="/products/signed-ai"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border font-semibold text-sm"
                  style={{ borderColor: cardBorder, color: textPrimary }}>
                  SignedAI Product
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
