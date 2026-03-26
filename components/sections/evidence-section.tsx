"use client"

import { motion } from "framer-motion"
import { BookOpen, ExternalLink, FlaskConical, BarChart3, Shield } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

const evidenceCards = [
  {
    icon: FlaskConical,
    tagEn: "Peer-Reviewed Research",
    tagTh: "งานวิจัยที่ผ่านการ peer-review",
    titleEn: "Multi-LLM Consensus Improves Precision from 73% to 94%",
    titleTh: "Multi-LLM Consensus เพิ่มความแม่นยำจาก 73% เป็น 94%",
    quoteEn:
      "In tests across 78 complex cases requiring factual accuracy and causal consistency, our ensemble validation framework improved precision from 73.1% to 93.9%.",
    quoteTh:
      "จากการทดสอบ 78 กรณีที่ต้องการความถูกต้องเชิงข้อเท็จจริงและความสอดคล้องเชิงเหตุผล — ensemble validation framework เพิ่มความแม่นยำจาก 73.1% เป็น 93.9%",
    sourceEn:
      'Naik, N. (2024). "Probabilistic Consensus through Ensemble Validation: A Framework for LLM Reliability." arXiv:2411.06535',
    sourceTh:
      'Naik, N. (2024). "Probabilistic Consensus through Ensemble Validation" — arXiv:2411.06535',
    url: "https://arxiv.org/abs/2411.06535",
    relevanceEn:
      "RCT's multi-LLM orchestration applies this same ensemble consensus principle — cross-validating outputs across multiple models to dramatically reduce hallucination.",
    relevanceTh:
      "RCT ใช้หลักการ ensemble consensus เดียวกันนี้ — ตรวจสอบผลลัพธ์ข้ามหลาย LLM เพื่อลด hallucination อย่างมีนัยสำคัญ",
    color: "#7B9E87",
    stat: "+28.5%",
    statLabelEn: "Precision Gain",
    statLabelTh: "ความแม่นยำที่เพิ่มขึ้น",
  },
  {
    icon: BarChart3,
    tagEn: "Industry Report",
    tagTh: "รายงานอุตสาหกรรม",
    titleEn: "88% of Organizations Now Use AI — 62% Testing AI Agents",
    titleTh: "88% ขององค์กรใช้ AI แล้ว — 62% ทดสอบ AI Agents",
    quoteEn:
      "88% of organizations use AI in at least one business function. 62% are experimenting with AI agents, and 23% are already scaling agentic AI systems across their enterprises.",
    quoteTh:
      "88% ขององค์กรใช้ AI ในอย่างน้อยหนึ่งฟังก์ชันธุรกิจ — 62% กำลังทดลอง AI agents และ 23% กำลัง scale ระบบ agentic AI ข้ามองค์กร",
    sourceEn:
      'McKinsey & Company (2025). "The State of AI: Global Survey 2025." McKinsey Digital.',
    sourceTh: 'McKinsey & Company (2025). "The State of AI: Global Survey 2025"',
    url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai",
    relevanceEn:
      "RCT Ecosystem is built for this agentic AI era — providing the orchestration infrastructure that 62% of enterprises are actively seeking.",
    relevanceTh:
      "RCT Ecosystem ถูกสร้างมาเพื่อยุค agentic AI นี้ — ให้โครงสร้างพื้นฐาน orchestration ที่ 62% ขององค์กรกำลังค้นหา",
    color: "#D4A853",
    stat: "$1.5T",
    statLabelEn: "AI Spending 2025",
    statLabelTh: "การใช้จ่าย AI ปี 2025",
  },
  {
    icon: Shield,
    tagEn: "IEEE Transactions",
    tagTh: "IEEE Transactions",
    titleEn: "Multi-LLM Communication Reduces Bias & Hallucination",
    titleTh: "Multi-LLM Communication ลด Bias และ Hallucination",
    quoteEn:
      "Multi-LLM communication enables collective reduction of bias and hallucinations, outperforming single LLM systems in trust, accuracy, and edge intelligence deployment.",
    quoteTh:
      "การสื่อสารแบบ Multi-LLM ช่วยลด bias และ hallucinations ร่วมกัน — เหนือกว่าระบบ LLM เดี่ยวในด้านความน่าเชื่อถือ ความแม่นยำ และการ deploy edge intelligence",
    sourceEn:
      'Luo, H. et al. (2025). "Toward Edge General Intelligence with Multi-LLM: Architecture, Trust, and Orchestration." IEEE Transactions. Cited by 34.',
    sourceTh:
      'Luo, H. et al. (2025). "Toward Edge General Intelligence with Multi-LLM" — IEEE Transactions. อ้างอิง 34 ครั้ง',
    url: "https://ieeexplore.ieee.org/abstract/document/11175216/",
    relevanceEn:
      "RCT's JITNA Protocol implements exactly this multi-LLM trust architecture — with cryptographic verification at every negotiation step.",
    relevanceTh:
      "JITNA Protocol ของ RCT ใช้สถาปัตยกรรม multi-LLM trust นี้ — พร้อมการยืนยันด้วย cryptography ในทุกขั้นตอนการเจรจา",
    color: "#89B4C8",
    stat: "34",
    statLabelEn: "Citations",
    statLabelTh: "การอ้างอิง",
  },
]

const partners = [
  { name: "OpenAI", abbr: "OAI" },
  { name: "Anthropic", abbr: "ANT" },
  { name: "Google DeepMind", abbr: "GDM" },
  { name: "Meta AI", abbr: "META" },
  { name: "Mistral AI", abbr: "MST" },
  { name: "Hugging Face", abbr: "HF" },
  { name: "LangChain", abbr: "LC" },
  { name: "Vercel", abbr: "VCL" },
  { name: "Notion", abbr: "NTN" },
  { name: "GitHub", abbr: "GH" },
]

const PIXEL_EVIDENCE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/8bit-evidence-book_bad1b506.png"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function EvidenceSection() {
  const { language } = useLanguage()
  const isTh = language === "th"

  return (
    <section
      className="py-16 md:py-24 transition-colors duration-300 bg-background border-t border-border"
      aria-label="Research Evidence and Partners"
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4 bg-secondary text-muted-foreground">
            <BookOpen size={12} />
            {isTh ? "หลักฐานเชิงวิจัย" : "Research-Backed Evidence"}
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3 flex items-center justify-center gap-3 text-foreground">
            <Image
              src={PIXEL_EVIDENCE}
              alt=""
              width={48}
              height={48}
              className="inline-block w-10 h-10 sm:w-12 sm:h-12 object-contain"
              style={{ imageRendering: "pixelated" }}
            />
            <span>
              <span className="font-semibold" style={{ color: "#7B9E87" }}>
                {isTh ? "พิสูจน์แล้ว" : "Proven"}
              </span>{" "}
              {isTh ? "ด้วยงานวิจัย" : "by Research"}
            </span>
          </h2>
          <p className="text-sm max-w-2xl mx-auto text-muted-foreground">
            {isTh
              ? "หลักการของ RCT Ecosystem ได้รับการสนับสนุนจากงานวิจัยระดับสากลที่ผ่านการ peer-review และรายงานอุตสาหกรรมชั้นนำ"
              : "RCT Ecosystem's principles are supported by peer-reviewed research and leading industry reports from trusted institutions."}
          </p>
        </motion.div>

        {/* Evidence Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6 mb-16">
          {evidenceCards.map((card, i) => {
            const Icon = card.icon
            return (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -4 }}
                className="relative flex flex-col p-6 rounded-2xl border transition-shadow hover:shadow-lg group bg-card border-border"
              >
                {/* Top row: tag + stat */}
                <div className="flex items-start justify-between mb-4">
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-secondary text-muted-foreground">
                    <Icon size={10} />
                    {isTh ? card.tagTh : card.tagEn}
                  </span>
                  <div className="text-right">
                    <div
                      className="text-lg font-bold font-mono"
                      style={{ color: card.color }}
                    >
                      {card.stat}
                    </div>
                    <div className="text-[9px] uppercase tracking-wider text-muted-foreground">
                      {isTh ? card.statLabelTh : card.statLabelEn}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold leading-snug mb-3 text-foreground">
                  {isTh ? card.titleTh : card.titleEn}
                </h3>

                {/* Quote */}
                <blockquote className="text-xs leading-relaxed mb-3 pl-3 border-l-2 border-warm-amber/30 text-muted-foreground">
                  {isTh ? card.quoteTh : card.quoteEn}
                </blockquote>

                {/* RCT Relevance */}
                <div className="text-[11px] leading-relaxed mb-4 px-3 py-2 rounded-lg bg-secondary/50 text-muted-foreground">
                  <span className="font-semibold">RCT:</span>{" "}
                  {isTh ? card.relevanceTh : card.relevanceEn}
                </div>

                {/* Source + Link */}
                <div className="mt-auto pt-3 border-t border-dashed border-border flex items-start gap-2">
                  <BookOpen
                    size={12}
                    className="mt-0.5 shrink-0 text-muted-foreground"
                  />
                  <div className="flex-1">
                    <p className="text-[10px] leading-relaxed mb-1 text-muted-foreground">
                      {isTh ? card.sourceTh : card.sourceEn}
                    </p>
                    <a
                      href={card.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-semibold transition-colors hover:underline"
                      style={{ color: card.color }}
                    >
                      {isTh ? "อ่านงานวิจัยต้นฉบับ" : "Read Original Research"}
                      <ExternalLink size={9} />
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Partner compatibility grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
        >
          <p className="text-center text-xs font-semibold uppercase tracking-widest mb-6 text-muted-foreground">
            {isTh ? "เทคโนโลยีที่รองรับ" : "Compatible Technologies"}
          </p>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {partners.map((partner) => (
              <div
                key={partner.name}
                className="flex items-center gap-2.5 rounded-xl border border-border bg-card px-4 py-3 transition-colors hover:border-warm-amber/30"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-secondary text-[10px] font-bold text-muted-foreground">
                  {partner.abbr}
                </div>
                <span className="text-sm font-medium text-muted-foreground">{partner.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
