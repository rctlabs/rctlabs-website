"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import WhitepaperAccessForm from "@/components/whitepaper-access-form"
import { useLanguage } from "@/components/language-provider"
import { buildContactHref } from "@/lib/funnel"
import { motion } from "framer-motion"
import Link from "next/link"
import { FileText, ArrowRight, Tag, Clock, History } from "lucide-react"

const colorClasses = {
  "warm-amber": {
    text: "text-warm-amber",
    dot: "bg-warm-amber",
    pill: "bg-warm-amber/10 text-warm-amber",
  },
  "warm-sage": {
    text: "text-warm-sage",
    dot: "bg-warm-sage",
    pill: "bg-warm-sage/10 text-warm-sage",
  },
  "warm-terracotta": {
    text: "text-warm-terracotta",
    dot: "bg-warm-terracotta",
    pill: "bg-warm-terracotta/10 text-warm-terracotta",
  },
  "warm-sky": {
    text: "text-warm-sky",
    dot: "bg-warm-sky",
    pill: "bg-warm-sky/10 text-warm-sky",
  },
} as const

const whitepapers = [
  {
    id: "rct-os",
    color: "warm-amber",
    href: "/architecture",
    title: {
      en: "RCT Ecosystem: Intent-Centric AI Operating System",
      th: "RCT Ecosystem: ระบบปฏิบัติการ AI ที่เน้น Intent"
    },
    desc: {
      en: "Comprehensive overview of the 10-layer architecture, FDIA equation, and how the RCT operating system orchestrates Multi-LLM intelligence.",
      th: "ภาพรวมที่ครอบคลุมของสถาปัตยกรรม 10 ชั้น สมการ FDIA และการประสานงาน Multi-LLM ในระบบ RCT"
    },
    version: "v3.0",
    date: "2025",
    tags: ["Architecture", "FDIA", "Multi-LLM"]
  },
  {
    id: "jitna-spec",
    color: "warm-sage",
    href: "/protocols/jitna-rfc-001",
    title: {
      en: "JITNA RFC-001: Just-In-Time Neural Allocation Protocol",
      th: "JITNA RFC-001: โปรโตคอลการจัดสรรประสาทแบบทันเวลา"
    },
    desc: {
      en: "Technical specification for the JITNA communication protocol — defining how AI models coordinate, share context, and reach consensus in real-time.",
      th: "ข้อกำหนดทางเทคนิคของโปรโตคอล JITNA — วิธีที่โมเดล AI ประสานงาน แบ่งปันบริบท และบรรลุฉันทามติแบบเรียลไทม์"
    },
    version: "RFC-001",
    date: "2025",
    tags: ["Protocol", "Multi-LLM", "Consensus"]
  },
  {
    id: "signedai",
    color: "warm-terracotta",
    href: "/solutions/ai-hallucination-prevention",
    title: {
      en: "SignedAI: Cryptographic Verification for AI Outputs",
      th: "SignedAI: การตรวจสอบผลลัพธ์ AI ด้วยคริปโตกราฟี"
    },
    desc: {
      en: "How Multi-LLM consensus verification reduces hallucination from 15% to 0.3% with cryptographic signing and complete audit trails.",
      th: "วิธีที่ Multi-LLM Consensus Verification ลด Hallucination จาก 15% เหลือ 0.3% ด้วยการลงลายเซ็นดิจิทัลและประวัติการตรวจสอบ"
    },
    version: "v1.0",
    date: "2025",
    tags: ["Verification", "Cryptography", "Hallucination"]
  },
  {
    id: "genome",
    color: "warm-sky",
    href: "/protocols/rct-7-mental-model",
    title: {
      en: "RCT-7 Genome: Cognitive Architecture for AI Personality",
      th: "RCT-7 Genome: สถาปัตยกรรมความคิดสำหรับบุคลิก AI"
    },
    desc: {
      en: "The 7 genome subsystems that define AI personality and behavior — from perception to self-evolution. A framework for building AI that thinks.",
      th: "7 Genome Subsystems ที่กำหนดบุคลิกและพฤติกรรม AI — จากการรับรู้ถึงการวิวัฒนาการตนเอง เฟรมเวิร์กสำหรับสร้าง AI ที่คิดได้"
    },
    version: "v2.0",
    date: "2025",
    tags: ["Genome", "Cognition", "Personality"]
  }
]

const versionHistory = [
  { doc: "RCT Ecosystem OS", version: "v3.0", date: "Mar 2025", change: { en: "Added FDIA v2 + 10-layer diagram", th: "เพิ่ม FDIA v2 + แผนภาพ 10-layer" }, color: "warm-amber" },
  { doc: "RCT Ecosystem OS", version: "v2.1", date: "Jan 2025", change: { en: "Genomic subsystem expansion", th: "ขยาย Genomic subsystem" }, color: "warm-amber" },
  { doc: "RCT Ecosystem OS", version: "v2.0", date: "Nov 2024", change: { en: "Initial public release", th: "เผยแพร่สาธารณะครั้งแรก" }, color: "warm-amber" },
  { doc: "JITNA RFC-001", version: "RFC-001", date: "Feb 2025", change: { en: "First RFC publication", th: "เผยแพร่ RFC ครั้งแรก" }, color: "warm-sage" },
  { doc: "SignedAI Whitepaper", version: "v1.0", date: "Mar 2025", change: { en: "Consensus verification spec", th: "ข้อกำหนด Consensus Verification" }, color: "warm-terracotta" },
  { doc: "RCT-7 Genome", version: "v2.0", date: "Feb 2025", change: { en: "7-genome cognitive framework", th: "กรอบ Cognitive 7-genome" }, color: "warm-sky" },
  { doc: "RCT-7 Genome", version: "v1.0", date: "Oct 2024", change: { en: "Initial genome model", th: "โมเดล Genome เริ่มต้น" }, color: "warm-sky" }
]

export default function WhitepaperPage() {
  const { language } = useLanguage()
  const isTh = language === "th"
  const localePrefix = isTh ? "/th" : "/en"
  const faqs = isTh
    ? [
        {
          question: "Whitepaper เหมาะกับใคร",
          answer:
            "เหมาะกับผู้ประเมินระบบ, technical buyers, architects และทีมที่ต้องการเข้าใจหลักการสถาปัตยกรรม โปรโตคอล และเหตุผลเชิงเทคนิคก่อนตัดสินใจทดลองหรือ deploy RCT",
        },
        {
          question: "ควรอ่านเอกสารลำดับไหนก่อน",
          answer:
            "เริ่มจากภาพรวม RCT Ecosystem และ 10-layer architecture จากนั้นอ่าน JITNA RFC-001, SignedAI และ RCT-7 ตามโจทย์ที่ต้องการประเมินต่อ",
        },
        {
          question: "หน้า Whitepaper นี้ต่างจากหน้า Protocols อย่างไร",
          answer:
            "หน้า Whitepaper รวมเส้นทางเอกสารสำหรับการประเมินเชิงสถาปัตยกรรมและ pre-procurement ส่วนหน้า Protocols จะลงรายละเอียดมาตรฐานหรือแนวคิดเฉพาะรายหัวข้อมากกว่า",
        },
      ]
    : [
        {
          question: "Who are these whitepapers for?",
          answer:
            "They are written for system evaluators, technical buyers, architects, and teams that need to understand the architecture, protocols, and technical rationale behind RCT before piloting or deploying it.",
        },
        {
          question: "What is the recommended reading order?",
          answer:
            "Start with the RCT Ecosystem overview and 10-layer architecture, then move to JITNA RFC-001, SignedAI, and RCT-7 based on the area you are evaluating next.",
        },
        {
          question: "How is this page different from the Protocols page?",
          answer:
            "The Whitepaper page curates a reading path for architectural and pre-procurement evaluation, while the Protocols page focuses more directly on specific standards and concepts in isolation.",
        },
      ]
  const relatedResources = [
    {
      href: `${localePrefix}/protocols`,
      title: isTh ? "Open Protocols" : "Open Protocols",
      description: isTh ? "อ่านเอกสารโปรโตคอลแยกเป็นรายหัวข้อ" : "Read the protocol documents topic by topic.",
    },
    {
      href: `${localePrefix}/benchmark`,
      title: isTh ? "Benchmark และ Validation" : "Benchmark and Validation",
      description: isTh ? "เชื่อมจากเอกสารสู่ตัวเลขเปรียบเทียบจริง" : "Move from theory and architecture to measurable comparisons.",
    },
    {
      href: `${localePrefix}/contact`,
      title: isTh ? "ขอ Evaluation Pack" : "Request the Evaluation Pack",
      description: isTh ? "ขอเอกสารเพิ่มเติมสำหรับทีมประเมินหรือ procurement" : "Request additional materials for evaluators or procurement teams.",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="section-spacing bg-background min-h-[80vh]">
        <div className="max-w-3xl mx-auto px-4">
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-3xl sm:text-4xl font-bold mb-6 text-center">
            {isTh ? "ไวท์เปเปอร์ RCT" : "RCT Whitepapers"}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-muted-foreground text-center mb-10">
            {isTh
              ? "เอกสารไวท์เปเปอร์เชิงเทคนิคของ RCT ครอบคลุมสถาปัตยกรรม โปรโตคอล FDIA และโมเดลความคิด RCT-7"
              : "In-depth technical whitepapers covering the RCT Ecosystem architecture, JITNA protocol, SignedAI verification, and RCT-7 cognitive framework."}
          </motion.p>
          <div className="mb-8 rounded-2xl border border-border bg-card p-6 sm:p-8">
            <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-amber">Answer-First Summary</div>
                <h2 className="mt-3 text-2xl font-bold text-foreground">
                  {isTh ? "สรุปสั้นที่สุด: หน้า Whitepaper นี้มีไว้ทำอะไร" : "Short Answer: What This Whitepaper Page Is For"}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {isTh
                    ? "หน้านี้เป็น reading path สำหรับทีมที่ต้องการประเมิน RCT อย่างเป็นระบบ โดยรวมเอกสารหลัก, protocol references, version history และช่องทางขอ evaluation material เพิ่มเติมไว้ในจุดเดียว"
                    : "This page is a reading path for teams evaluating RCT in a structured way, bringing together core documents, protocol references, version history, and contact paths for deeper evaluation material."}
                </p>
              </div>
              <div className="rounded-xl border border-border bg-background/70 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-warm-sage">{isTh ? "Evaluation Signals" : "Evaluation Signals"}</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  <li>{isTh ? "รวมเอกสารหลักไว้ในจุดเดียว" : "Curates the main documents in one place."}</li>
                  <li>{isTh ? "มี version history สำหรับผู้ประเมินด้าน maturity" : "Includes version history for maturity review."}</li>
                  <li>{isTh ? "เชื่อมต่อไปยัง evaluation pack และ protocol detail pages" : "Connects evaluation materials to detailed protocol pages."}</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mb-10 grid gap-3 sm:grid-cols-3">
            <Link href={`${localePrefix}/architecture`} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
              {isTh ? "ดูสถาปัตยกรรม 10 ชั้น" : "Explore 10-Layer Architecture"}
            </Link>
            <Link href={`${localePrefix}/protocols/jitna-rfc-001`} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
              {isTh ? "อ่าน JITNA RFC-001" : "Read JITNA RFC-001"}
            </Link>
            <Link href={buildContactHref(language, "whitepaper:evaluation-pack:request")} className="rounded-xl border border-border bg-card px-4 py-3 text-center text-sm font-medium text-foreground transition-colors hover:bg-muted">
              {isTh ? "ขอเอกสารเพิ่มเติม" : "Request More Materials"}
            </Link>
          </div>

          <WhitepaperAccessForm language={language} />

          <div className="space-y-6 mb-12">
            {whitepapers.map((paper, i) => (
              <motion.div key={paper.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link href={paper.href} className="block group">
                  <div className={`p-6 sm:p-8 rounded-2xl border bg-card border-border shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-muted">
                        <FileText size={24} className={colorClasses[paper.color].text} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{isTh ? paper.title.th : paper.title.en}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{isTh ? paper.desc.th : paper.desc.en}</p>
                        <div className="flex items-center gap-4 flex-wrap">
                          <span className="text-xs flex items-center gap-1 text-muted-foreground">
                            <Tag size={12} /> {paper.version}
                          </span>
                          <span className="text-xs flex items-center gap-1 text-muted-foreground">
                            <Clock size={12} /> {paper.date}
                          </span>
                          <div className="flex gap-2">
                            {paper.tags.map((tag, j) => (
                              <span key={j} className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${colorClasses[paper.color].pill}`}>{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={18} className="shrink-0 mt-1 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <motion.h2 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-xl sm:text-2xl font-bold mb-6 text-center">
            {isTh ? "ประวัติเอกสารและเวอร์ชัน" : "Document Version History"}
          </motion.h2>
          <div className="overflow-x-auto mb-12">
            <div className="min-w-130">
              <div className="rounded-2xl border overflow-hidden border-border">
                <div className="grid grid-cols-4 px-5 py-3 border-b text-xs font-semibold uppercase tracking-wider bg-muted text-muted-foreground">
                  <div>{isTh ? "เอกสาร" : "Document"}</div>
                  <div className="text-center">{isTh ? "เวอร์ชัน" : "Version"}</div>
                  <div className="text-center">{isTh ? "วันที่" : "Date"}</div>
                  <div className="text-center">{isTh ? "การเปลี่ยนแปลง" : "Change"}</div>
                </div>
                {versionHistory.map((row, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                    className={`grid grid-cols-4 items-center px-5 py-3 border-b last:border-b-0 text-xs sm:text-sm ${i % 2 === 0 ? "bg-muted/50" : "bg-card"}`}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full shrink-0 ${colorClasses[row.color].dot}`}></div>
                      <span className="font-medium truncate text-foreground">{row.doc}</span>
                    </div>
                    <div className={`text-center font-mono font-bold ${colorClasses[row.color].text}`}>{row.version}</div>
                    <div className="text-center text-muted-foreground">{row.date}</div>
                    <div className="text-center text-muted-foreground">{isTh ? row.change.th : row.change.en}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-6 pb-4 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-amber">FAQ</div>
              <h2 className="mt-3 text-2xl font-bold text-foreground">{isTh ? "คำถามที่ผู้ประเมินเอกสารมักถาม" : "Questions Technical Readers Usually Ask"}</h2>
              <div className="mt-4 space-y-3">
                {faqs.map((faq) => (
                  <details key={faq.question} className="rounded-xl border border-border bg-background/70 p-4">
                    <summary className="list-none cursor-pointer font-semibold text-foreground">{faq.question}</summary>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.2em] text-warm-amber">Related Resources</div>
              <h2 className="mt-3 text-2xl font-bold text-foreground">{isTh ? "เส้นทางอ่านต่อที่แนะนำ" : "Recommended Reading Path"}</h2>
              <div className="mt-4 space-y-3">
                {relatedResources.map((item) => (
                  <Link key={item.href} href={item.href} className="block rounded-xl border border-border bg-background/70 p-4 transition-colors hover:border-warm-amber/40 hover:bg-warm-amber/5">
                    <div className="text-sm font-semibold text-foreground">{item.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{item.description}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
