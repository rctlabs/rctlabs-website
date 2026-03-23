"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { FileText, ArrowRight, Tag, Clock, History } from "lucide-react"

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
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"

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
          <div className="space-y-6 mb-12">
            {whitepapers.map((paper, i) => (
              <motion.div key={paper.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Link href={paper.href} className="block group">
                  <div className={`p-6 sm:p-8 rounded-2xl border bg-card border-border shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1`}>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 bg-muted">
                        <FileText size={24} className={`text-${paper.color}`} />
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
                              <span key={j} className={`text-[10px] font-medium px-2 py-0.5 rounded-full bg-${paper.color}/10 text-${paper.color}`}>{tag}</span>
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
                      <div className={`w-2 h-2 rounded-full shrink-0 bg-${row.color}`}></div>
                      <span className="font-medium truncate text-foreground">{row.doc}</span>
                    </div>
                    <div className={`text-center font-mono font-bold text-${row.color}`}>{row.version}</div>
                    <div className="text-center text-muted-foreground">{row.date}</div>
                    <div className="text-center text-muted-foreground">{isTh ? row.change.th : row.change.en}</div>
                  </motion.div>
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
