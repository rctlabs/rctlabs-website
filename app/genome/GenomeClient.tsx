"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { ArrowRight, Dna } from "lucide-react"
import InteractiveGenomeExplorer from "@/components/diagrams/interactive-genome-explorer"

const genomes = {
  en: [
    { id: "G1", name: "WHY Genome", color: "#D4A853", desc: "Defines the foundational purpose and intent behind every AI decision. Ensures all system actions trace back to a meaningful user goal, preventing aimless computation." },
    { id: "G2", name: "WHAT Genome", color: "#89B4C8", desc: "Determines what knowledge and data are needed to fulfill an intent. Manages structured and unstructured data retrieval, ensuring the right information reaches the right algorithm." },
    { id: "G3", name: "HOW Genome", color: "#C4745B", desc: "Orchestrates execution strategies using the FDIA Equation and 41 proprietary algorithms. Selects optimal processing paths, balancing speed, accuracy, and cost across multiple LLM providers." },
    { id: "G4", name: "WHO Genome", color: "#7B9E87", desc: "Manages identity, authentication, and role-based access control. Decides which agents, services, and users have permission to access specific resources." },
    { id: "G5", name: "WHEN Genome", color: "#B8A9C9", desc: "Handles temporal coordination, scheduling, and time-sensitive operations. Ensures tasks execute at optimal times and time-dependent data remains fresh." },
    { id: "G6", name: "WHERE Genome", color: "#D4A853", desc: "Controls deployment topology, regional routing, and infrastructure placement. Optimizes latency by routing requests to the nearest available service instance." },
    { id: "G7", name: "IMPROVEMENT Genome", color: "#C4745B", desc: "Drives continuous self-improvement through feedback loops, performance monitoring, and adaptive learning. Connects back to G1, creating a perpetual cycle of refinement." },
  ],
  th: [
    { id: "G1", name: "WHY Genome", color: "#D4A853", desc: "กำหนดจุดประสงค์พื้นฐานและเจตนาเบื้องหลังทุกการตัดสินใจของ AI ทำให้มั่นใจว่าทุกการกระทำกลับไปยังเป้าหมายที่มีความหมาย" },
    { id: "G2", name: "WHAT Genome", color: "#89B4C8", desc: "กำหนดว่าต้องการความรู้และข้อมูลอะไรเพื่อตอบสนองเจตนา จัดการการดึงข้อมูลทั้งแบบมีโครงสร้างและไม่มีโครงสร้าง" },
    { id: "G3", name: "HOW Genome", color: "#C4745B", desc: "ประสานงานกลยุทธ์การทำงานโดยใช้สมการ FDIA และอัลกอริทึม 41 ตัว เลือกเส้นทางที่เหมาะสมที่สุดสมดุลความเร็ว ความแม่นยำ และต้นทุน" },
    { id: "G4", name: "WHO Genome", color: "#7B9E87", desc: "จัดการตัวตน การยืนยันตัวตน และการควบคุมการเข้าถึงตามบทบาท ตัดสินใจว่าใครมีสิทธิ์เข้าถึงทรัพยากร" },
    { id: "G5", name: "WHEN Genome", color: "#B8A9C9", desc: "จัดการการประสานงานด้านเวลา การจัดกำหนดการ และการดำเนินการที่ขึ้นกับเวลาให้เหมาะสม" },
    { id: "G6", name: "WHERE Genome", color: "#D4A853", desc: "ควบคุมโทโพโลยีการ Deploy การกำหนดเส้นทางภูมิภาค และการวางโครงสร้างพื้นฐาน ปรับ Latency ให้เหมาะสม" },
    { id: "G7", name: "IMPROVEMENT Genome", color: "#C4745B", desc: "ขับเคลื่อนการปรับปรุงตัวเองอย่างต่อเนื่องผ่าน Feedback Loops การติดตามประสิทธิภาพ เชื่อมกลับไป G1 สร้างวงจรปรับปรุง" },
  ],
}

export default function GenomePage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"
  const localGenomes = isTh ? genomes.th : genomes.en

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-terracotta/10 border border-warm-terracotta/30 text-warm-terracotta text-sm font-medium">
            <Dna className="w-4 h-4" /> {isTh ? "ระบบ 7 Genome" : "7 Genome System"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">The 7 Genome System</h1>
          <p className="text-lg text-muted-foreground">
            {isTh
              ? "7 Genomes ที่เชื่อมต่อกันสร้างวงจรปรับปรุงต่อเนื่อง — จาก WHY ถึง IMPROVEMENT แล้ววนกลับ"
              : "Seven interconnected genomes forming a continuous improvement cycle — from WHY to IMPROVEMENT and back."}
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 space-y-4 text-muted-foreground text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground mb-6">{isTh ? "ทำไม 7 Genomes?" : "Why 7 Genomes?"}</h2>
          <p>{isTh
            ? "RCT Ecosystem สร้างขึ้นบนอุปมาทางชีวภาพ: เช่นเดียวกับที่ DNA มีพิมพ์เขียวสมบูรณ์ของสิ่งมีชีวิต ระบบ 7 Genome มีพิมพ์เขียวสมบูรณ์ของระบบปฏิบัติการ AI อัจฉริยะ แต่ละ Genome ตอบคำถามพื้นฐาน 7 ข้อของปัญญา"
            : "Built on a biological metaphor: just as DNA contains the complete blueprint for an organism, the 7 Genome System contains the complete blueprint for an intelligent AI operating system."}</p>
          <p>{isTh
            ? "ต่างจาก AI Frameworks แบบดั้งเดิมที่ปฏิบัติต่อ Components เป็นโมดูลแยก ระบบ 7 Genome สร้างสถาปัตยกรรมที่มีชีวิต โดยแต่ละ Genome สื่อสารและมีอิทธิพลต่อกัน ทำให้เกิดปัญญาแบบ Emergent"
            : "Unlike traditional AI frameworks that treat components as isolated modules, the 7 Genome System creates a living architecture where each genome continuously communicates with and influences the others."}</p>
          <p>{isTh
            ? "ลักษณะวงจรของระบบ — จาก G1 (WHY) ผ่าน G7 (IMPROVEMENT) แล้ววนกลับ G1 — หมายความว่า Ecosystem ไม่เคยหยุดวิวัฒนาการ"
            : "The circular nature — from G1 (WHY) through G7 (IMPROVEMENT) and back to G1 — means the ecosystem never stops evolving."}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-terracotta/10 border border-warm-terracotta/30 text-warm-terracotta text-sm font-medium">
            <Dna className="w-4 h-4" /> {isTh ? "Interactive Explorer" : "Interactive Explorer"}
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-foreground">
            {isTh ? "สำรวจ Genome แต่ละตัวแบบโต้ตอบ" : "Explore Each Genome Interactively"}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            {isTh
              ? "เลือก genome เพื่อดูบทบาท พารามิเตอร์การทำงาน ประวัติวิวัฒนาการ และการเชื่อมโยงกับ genomes อื่นในระบบ"
              : "Inspect the role, configuration parameters, evolution history, and cross-connections of each genome in the RCT system."}
          </p>
        </div>
        <InteractiveGenomeExplorer language={isTh ? "th" : "en"} />
      </section>

      {/* Genome Cards */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-2xl font-bold text-foreground text-center mb-10">{isTh ? "รายละเอียด 7 Genomes" : "The Seven Genomes in Detail"}</h2>
        <div className="space-y-5">
          {localGenomes.map((g, i) => (
            <motion.div key={g.id} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}
              className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold font-mono" style={{ backgroundColor: `${g.color}15`, color: g.color }}>{g.id}</span>
                <h3 className="text-lg font-bold text-foreground">{g.name}</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Circular Diagram */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-8">{isTh ? "วงจร Genome" : "The Genome Cycle"}</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {localGenomes.map((g, i) => (
              <div key={g.id} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-lg text-xs font-bold" style={{ backgroundColor: `${g.color}15`, color: g.color }}>{g.id}</span>
                {i < localGenomes.length - 1 && <ArrowRight size={14} className="text-muted-foreground" />}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <ArrowRight size={14} className="text-muted-foreground" />
              <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-warm-amber/10 text-warm-amber">↻ G1</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-6">{isTh ? "วงจรต่อเนื่อง: G7 ป้อนข้อมูลกลับไป G1 เพื่อปรับปรุงอย่างไม่สิ้นสุด" : "Continuous cycle: G7 feeds back into G1 for perpetual improvement."}</p>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">{isTh ? "หัวข้อที่เกี่ยวข้อง" : "Related Topics"}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: "/architecture", icon: "🏗️", label: isTh ? "สถาปัตยกรรม 10 ชั้น" : "10-Layer Architecture", desc: isTh ? "ดูว่า Genomes เชื่อมต่อกับสถาปัตยกรรมอย่างไร" : "How genomes map to the 10-layer cognitive stack" },
            { href: "/fdia", icon: "📐", label: isTh ? "สมการ FDIA" : "FDIA Equation", desc: isTh ? "รากฐานทางคณิตศาสตร์ที่ขับเคลื่อน HOW Genome" : "The mathematical foundation powering HOW Genome" },
            { href: "/algorithms", icon: "⚡", label: isTh ? "41 อัลกอริทึม" : "41 Algorithms", desc: isTh ? "เครื่องยนต์อัลกอริทึมภายใน HOW Genome" : "The algorithmic engine within HOW Genome" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="block p-4 rounded-xl border border-border bg-card hover:border-warm-amber/50 transition-all">
              <span className="text-2xl mb-2 block">{link.icon}</span>
              <span className="font-semibold text-sm block mb-1 text-foreground">{link.label}</span>
              <span className="text-xs text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">{isTh ? "สนใจระบบ 7 Genome?" : "Interested in the 7 Genome System?"}</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-warm-amber text-white font-medium text-sm hover:bg-[#C49A48] transition-colors">
              {isTh ? "ติดต่อเรา" : "Contact Us"} <ArrowRight size={16} />
            </Link>
            <Link href="/architecture" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">
              {isTh ? "ดูสถาปัตยกรรม" : "View Architecture"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
