"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronDown, BookOpen, Zap, Tag, History, HelpCircle } from "lucide-react"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { getFAQSchema } from "@/lib/schema"

/* ─── FAQ Data ─────────────────────────────────────────────── */
const faqCategories = [
  {
    id: "general",
    labelEn: "General",
    labelTh: "ทั่วไป",
    icon: BookOpen,
    items: [
      {
        qEn: "What is the RCT Ecosystem?",
        qTh: "RCT Ecosystem คืออะไร?",
        aEn: "RCT (Reverse Component Thinking) is a sovereign AI governance framework that combines the FDIA equation (F=D^I×A), JITNA Protocol, 10-Layer Cognitive Architecture, 41 Algorithms, and 7 Genome Subsystems to create enterprise-grade AI infrastructure.",
        aTh: "RCT (Reverse Component Thinking) คือ Framework สำหรับการกำกับดูแล AI ที่ผสมผสาน FDIA Equation (F=D^I×A), JITNA Protocol, สถาปัตยกรรม 10 ชั้น, 41 Algorithms และ 7 Genome Subsystems เพื่อสร้าง Enterprise AI Infrastructure",
      },
      {
        qEn: "Who created the RCT Ecosystem?",
        qTh: "ใครเป็นผู้สร้าง RCT Ecosystem?",
        aEn: "RCT was created by 'The Architect' — Ittirit Saengow (อิทธิฤทธิ์ แซ่โง้ว), a systems thinker who grew up in a Khlong Toei flat community in Bangkok. As a solo developer with no external funding, working from a small apartment with mobile devices and later a ROG Ally X setup, the system evolved from personal problem-solving into a comprehensive enterprise platform through AI-assisted development and intensive iteration.",
        aTh: "RCT ถูกสร้างโดย 'The Architect' — อิทธิฤทธิ์ แซ่โง้ว นักคิดเชิงระบบที่เติบโตในชุมชนแฟลตคลองเตย กรุงเทพฯ ในฐานะ Solo Developer ที่ไม่มีเงินทุนภายนอก ระบบพัฒนาจากการแก้ปัญหาส่วนตัวจนกลายเป็นแพลตฟอร์ม Enterprise ที่ครบวงจร",
      },
      {
        qEn: "What makes RCT different from LangChain or AutoGPT?",
        qTh: "RCT แตกต่างจาก LangChain หรือ AutoGPT อย่างไร?",
        aEn: "RCT is a complete ecosystem, not just a framework. It includes its own equation (FDIA), protocol (JITNA), database (RCTDB), 41 algorithms, and 7 genome subsystems. While LangChain focuses on chaining LLM calls and AutoGPT on autonomous agents, RCT provides end-to-end AI governance with built-in quality control (0.3% hallucination rate vs industry 12-15%), cost optimization, and evolutionary improvement.",
        aTh: "RCT เป็น Ecosystem ที่สมบูรณ์ ไม่ใช่แค่ Framework มี Equation (FDIA), Protocol (JITNA), Database (RCTDB), 41 Algorithms และ 7 Genome Subsystems พร้อม Hallucination Rate เพียง 0.3% เทียบกับ Industry 12-15%",
      },
      {
        qEn: "Is RCT open source?",
        qTh: "RCT เป็น open source หรือไม่?",
        aEn: "RCT follows an 85/15 marketplace model — 85% of the core framework is open for community use, while 15% consists of premium enterprise features. The JITNA Protocol is published as an open standard (RFC-001) under Apache 2.0 license.",
        aTh: "RCT ใช้โมเดล 85/15 Marketplace — 85% ของ Core Framework เปิดให้ชุมชนใช้งาน ส่วน 15% เป็น Premium Enterprise Features โดย JITNA Protocol เผยแพร่เป็น Open Standard (RFC-001) ภายใต้ Apache 2.0",
      },
    ],
  },
  {
    id: "technical",
    labelEn: "Technical",
    labelTh: "เทคนิค",
    icon: Zap,
    items: [
      {
        qEn: "What is the FDIA Equation?",
        qTh: "FDIA Equation คืออะไร?",
        aEn: "F = D^I × A — Future equals Data raised to the power of Intent, multiplied by Architect. It is the core philosophical and mathematical foundation that governs how the system processes information, makes decisions, and evolves. This is not just an AI formula — it is a life equation.",
        aTh: "F = D^I × A — Future เท่ากับ Data ยกกำลัง Intent คูณด้วย Architect เป็นรากฐานทางปรัชญาและคณิตศาสตร์หลักที่กำกับวิธีที่ระบบประมวลผลข้อมูล ตัดสินใจ และวิวัฒนาการ",
      },
      {
        qEn: "How does the JITNA Protocol work?",
        qTh: "JITNA Protocol ทำงานอย่างไร?",
        aEn: "JITNA (Just-In-Time Nodal Assembly) operates in 5 phases: Intent Capture → Data Enrichment → Delta Synthesis → Architect Review → Response Delivery. Each phase has quality gates and can be executed at 9 different tiers of complexity.",
        aTh: "JITNA (Just-In-Time Nodal Assembly) ทำงาน 5 เฟส: Intent Capture → Data Enrichment → Delta Synthesis → Architect Review → Response Delivery แต่ละเฟสมี Quality Gates และสามารถทำงานได้ 9 ระดับความซับซ้อน",
      },
      {
        qEn: "What are the 41 Algorithms?",
        qTh: "41 Algorithms คืออะไร?",
        aEn: "The 41 algorithms span across the 10-layer architecture, covering everything from data ingestion (Layer 1) to autonomous improvement (Layer 10). They include algorithms for intent classification, context compression (74% lossless), hallucination detection, and cost optimization (3.74x reduction). All 41 pass 2,210 tests at 100%.",
        aTh: "41 Algorithms กระจายอยู่ใน 10 ชั้นของสถาปัตยกรรม ครอบคลุมตั้งแต่ Data Ingestion ถึง Autonomous Improvement รวมถึง Intent Classification, Context Compression (74% lossless), Hallucination Detection และ Cost Optimization (3.74x reduction) ผ่านการทดสอบ 2,210 tests ที่ 100%",
      },
      {
        qEn: "What LLM providers are supported?",
        qTh: "รองรับ LLM Providers อะไรบ้าง?",
        aEn: "RCT is LLM-agnostic and supports OpenAI, Anthropic Claude, Google Gemini, local Ollama models, and any OpenAI-compatible API. The Intent Loop Engine automatically selects the optimal model based on task complexity and cost constraints.",
        aTh: "RCT เป็น LLM-agnostic รองรับ OpenAI, Anthropic Claude, Google Gemini, Ollama models ในเครื่อง และ API ที่เข้ากันได้กับ OpenAI ทุกตัว Intent Loop Engine จะเลือก Model ที่เหมาะสมที่สุดอัตโนมัติ",
      },
    ],
  },
  {
    id: "deployment",
    labelEn: "Deployment & Integration",
    labelTh: "การ Deploy และ Integration",
    icon: Tag,
    items: [
      {
        qEn: "What infrastructure does RCT require?",
        qTh: "RCT ต้องการ Infrastructure อะไรบ้าง?",
        aEn: "RCT runs on Docker containers (33+ services) with PostgreSQL, Redis, and optional Ollama for local LLM inference. Minimum: 8GB RAM, 4 CPU cores. Enterprise deployments can scale to Kubernetes with Helm charts.",
        aTh: "RCT ทำงานบน Docker Containers (33+ services) พร้อม PostgreSQL, Redis และ Ollama (optional) ขั้นต่ำต้องการ RAM 8GB และ CPU 4 cores การ Deploy ระดับ Enterprise สามารถ scale ด้วย Kubernetes Helm Charts",
      },
      {
        qEn: "Does RCT support external integrations?",
        qTh: "RCT รองรับ External Integrations หรือไม่?",
        aEn: "Yes. RCT supports 10 Universal Adapters including REST API, MCP (Model Context Protocol), Slack Gateway, Discord Bot, and more. The Slack Gateway enables full research-to-execution workflows within Slack channels.",
        aTh: "ใช่ RCT รองรับ 10 Universal Adapters รวมถึง REST API, MCP (Model Context Protocol), Slack Gateway, Discord Bot และอื่นๆ Slack Gateway ช่วยให้ทำ Research-to-Execution Workflows ภายใน Slack Channels ได้",
      },
    ],
  },
  {
    id: "pricing",
    labelEn: "Pricing & Plans",
    labelTh: "ราคาและแผน",
    icon: History,
    items: [
      {
        qEn: "What are the pricing tiers?",
        qTh: "มีแผนราคาอะไรบ้าง?",
        aEn: "RCT Labs offers three tiers: RCTLabs Core (open source, free), ArtentAI Enterprise (commercial, contact for pricing), and SignedAI Governance (enterprise contract). The JITNA Protocol and core 41 algorithms are always free under Apache 2.0.",
        aTh: "RCT Labs มี 3 Tier: RCTLabs Core (open source, ฟรี), ArtentAI Enterprise (เชิงพาณิชย์ ติดต่อสอบถาม) และ SignedAI Governance (Enterprise Contract) โดย JITNA Protocol และ 41 Algorithms หลักฟรีตลอดภายใต้ Apache 2.0",
      },
      {
        qEn: "Is there a free trial for enterprise features?",
        qTh: "มี free trial สำหรับ enterprise features หรือไม่?",
        aEn: "Yes — you can run the full RCT stack locally with Docker. Enterprise features like multi-tenant management, SLA-backed support, and managed cloud hosting are available through a paid plan. Contact us via the contact form for an enterprise demo.",
        aTh: "ใช่ — คุณสามารถรัน RCT Stack ทั้งหมดในเครื่องด้วย Docker ได้ Enterprise Features เช่น Multi-tenant Management, SLA-backed Support และ Managed Cloud Hosting มีให้ผ่านแผนที่ต้องชำระเงิน ติดต่อผ่านแบบฟอร์มสำหรับ Enterprise Demo",
      },
    ],
  },
]

/* ─── Accordion Item ────────────────────────────────────────── */
function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between py-4 text-left gap-4 hover:text-warm-amber transition-colors"
      >
        <span className="text-sm font-medium text-foreground leading-relaxed">{q}</span>
        <ChevronDown
          size={18}
          className={`shrink-0 mt-0.5 text-warm-amber transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="pb-4">
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      )}
    </div>
  )
}

/* ─── Version History ───────────────────────────────────────── */
const versions = [
  { ver: "2.7.0", name: "Enterprise Integration Suite", date: "2026-03-10", status: "LATEST" },
  { ver: "2.1.0", name: "Enterprise Refactor Edition", date: "2026-02-15", status: "PRODUCTION" },
  { ver: "8.0", name: "Universal Integration & Open Standard", date: "2026-02-02", status: "PRODUCTION" },
  { ver: "7.0", name: "Complete Ecosystem Edition", date: "2026-01-31", status: "PRODUCTION" },
  { ver: "6.0", name: "Ultimate Testing & Integration", date: "2026-01-20", status: "PRODUCTION" },
  { ver: "5.0", name: "Genome Edition", date: "2026-01-15", status: "STABLE" },
  { ver: "3.0", name: "Cross-chat Integration", date: "2026-01-10", status: "STABLE" },
  { ver: "1.0", name: "Foundation", date: "2025-12-01", status: "STABLE" },
]

/* ─── Page ─────────────────────────────────────────────────── */
export default function FAQPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"
  const [activeCategory, setActiveCategory] = useState("general")

  const faqSchemaData = faqCategories.flatMap((cat) =>
    cat.items.map((item) => ({ question: item.qEn, answer: item.aEn }))
  )

  return (
    <main className="min-h-screen bg-background" id="main-content">
      {/* FAQ Schema.org */}
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQSchema(faqSchemaData)) }}
      />

      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-amber/10 border border-warm-amber/30 text-warm-amber text-sm font-medium">
            <HelpCircle className="w-4 h-4" />
            {isTh ? "คำถามที่พบบ่อย" : "FAQ & Knowledge Base"}
          </div>
          <h1 className="text-5xl font-bold text-foreground">
            {isTh ? "คำถามที่พบบ่อย" : "Frequently Asked Questions"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isTh
              ? "ทุกสิ่งที่คุณต้องรู้เกี่ยวกับ RCT Ecosystem — ตั้งแต่พื้นฐานถึงเทคนิคเชิงลึก"
              : "Everything you need to know about the RCT Ecosystem — from basics to technical deep-dives."}
          </p>
        </div>
      </section>

      {/* ── FAQ Body ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Category sidebar */}
          <aside className="md:w-48 shrink-0">
            <nav className="space-y-1 sticky top-24">
              {faqCategories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors text-left ${
                      activeCategory === cat.id
                        ? "bg-warm-amber/10 text-warm-amber border border-warm-amber/30"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    {isTh ? cat.labelTh : cat.labelEn}
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Accordion content */}
          <div className="flex-1">
            {faqCategories
              .filter((cat) => cat.id === activeCategory)
              .map((cat) => (
                <div key={cat.id} className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-2 mb-6">
                    <cat.icon className="w-5 h-5 text-warm-amber" />
                    <h2 className="text-lg font-bold text-foreground">
                      {isTh ? cat.labelTh : cat.labelEn}
                    </h2>
                    <span className="ml-auto text-xs text-muted-foreground">{cat.items.length} {isTh ? "คำถาม" : "questions"}</span>
                  </div>
                  <div>
                    {cat.items.map((item, i) => (
                      <AccordionItem
                        key={i}
                        q={isTh ? item.qTh : item.qEn}
                        a={isTh ? item.aTh : item.aEn}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* ── Version History ──────────────────────────────────── */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-4 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 text-warm-amber text-xs font-semibold uppercase tracking-wider">
              <History className="w-3.5 h-3.5" />
              {isTh ? "ประวัติเวอร์ชัน" : "Version History"}
            </div>
            <h2 className="text-3xl font-bold text-foreground">
              {isTh ? "Changelog" : "Changelog"}
            </h2>
          </div>
          <div className="space-y-3">
            {versions.map((v) => (
              <div key={v.ver} className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl">
                <div className="w-14 text-center">
                  <span className="text-xs font-mono font-bold text-warm-amber">v{v.ver}</span>
                </div>
                <div className="flex-1">
                  <span className="text-sm font-medium text-foreground">{v.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground font-mono">{v.date}</span>
                  <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                    v.status === "LATEST"
                      ? "bg-warm-amber/20 text-warm-amber"
                      : v.status === "PRODUCTION"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {v.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-5xl px-4 py-20 text-center space-y-6">
        <h2 className="text-3xl font-bold text-foreground">
          {isTh ? "ยังมีคำถามอื่น?" : "Still have questions?"}
        </h2>
        <p className="text-muted-foreground">
          {isTh
            ? "ติดต่อเราโดยตรงหรืออ่านเอกสารเพิ่มเติม"
            : "Contact us directly or read the documentation for more details."}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-warm-amber hover:bg-[#C49A48] text-white font-medium text-sm transition-colors"
          >
            {isTh ? "ติดต่อเรา" : "Contact Us"}
          </a>
          <a
            href="/docs"
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border hover:bg-muted text-foreground font-medium text-sm transition-colors"
          >
            {isTh ? "อ่านเอกสาร" : "Read Docs"}
          </a>
        </div>
      </section>

      <Footer />
    </main>
  )
}
