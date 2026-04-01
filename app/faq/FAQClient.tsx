"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ChevronDown, BookOpen, Zap, Tag, History, HelpCircle } from "lucide-react"

type FAQClientProps = {
  locale: "en" | "th"
}

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
        aEn: "The 41 algorithms span across the 10-layer architecture, covering everything from data ingestion (Layer 1) to autonomous improvement (Layer 10). They include algorithms for intent classification, context compression (74% lossless), hallucination detection, and cost optimization (3.74x reduction). The current public engineering snapshot reports 4,849 passing tests across the platform.",
        aTh: "41 Algorithms กระจายอยู่ใน 10 ชั้นของสถาปัตยกรรม ครอบคลุมตั้งแต่ Data Ingestion ถึง Autonomous Improvement รวมถึง Intent Classification, Context Compression (74% lossless), Hallucination Detection และ Cost Optimization (3.74x reduction) โดย public engineering snapshot ปัจจุบันรายงานผลการทดสอบที่ผ่านทั้งหมด 4,849 รายการทั่วทั้งแพลตฟอร์ม",
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
        aEn: "RCT runs across a 62-microservice architecture with PostgreSQL, Redis, and optional Ollama for local LLM inference. Minimum local evaluation setups can start smaller, while enterprise deployments can scale into containerized runtime boundaries and Kubernetes-style orchestration.",
        aTh: "RCT ทำงานบนสถาปัตยกรรม 62 microservices พร้อม PostgreSQL, Redis และ Ollama (optional) สำหรับ local LLM inference โดยการประเมินในเครื่องเริ่มจากสเกลเล็กได้ และการ deploy ระดับองค์กรสามารถขยายไปยัง containerized runtime boundaries และ Kubernetes-style orchestration",
      },
      {
        qEn: "Does RCT support external integrations?",
        qTh: "RCT รองรับ External Integrations หรือไม่?",
        aEn: "Yes. RCT supports multiple integration surfaces including REST APIs, MCP (Model Context Protocol), Slack-style workflow bridges, and governed runtime adapters. The integration model is designed around policy, verification, and enterprise routing rather than a single connector style.",
        aTh: "ใช่ RCT รองรับ integration surfaces หลายรูปแบบ เช่น REST APIs, MCP (Model Context Protocol), workflow bridges แบบ Slack และ governed runtime adapters โดยออกแบบรอบ policy, verification และ enterprise routing ไม่ได้ยึดติดกับ connector แบบเดียว",
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
] as const

const versions = [
  { ver: "2.7.0", name: "Enterprise Integration Suite", date: "2026-03-10", status: "LATEST" },
  { ver: "2.1.0", name: "Enterprise Refactor Edition", date: "2026-02-15", status: "PRODUCTION" },
  { ver: "8.0", name: "Universal Integration & Open Standard", date: "2026-02-02", status: "PRODUCTION" },
  { ver: "7.0", name: "Complete Ecosystem Edition", date: "2026-01-31", status: "PRODUCTION" },
  { ver: "6.0", name: "Ultimate Testing & Integration", date: "2026-01-20", status: "PRODUCTION" },
  { ver: "5.0", name: "Genome Edition", date: "2026-01-15", status: "STABLE" },
  { ver: "3.0", name: "Cross-chat Integration", date: "2026-01-10", status: "STABLE" },
  { ver: "1.0", name: "Foundation", date: "2025-12-01", status: "STABLE" },
] as const

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-4 text-left transition-colors hover:text-warm-amber"
      >
        <span className="text-sm font-medium leading-relaxed text-foreground">{q}</span>
        <ChevronDown size={18} className={`mt-0.5 shrink-0 text-warm-amber transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open ? (
        <div className="pb-4">
          <p className="text-sm leading-relaxed text-muted-foreground">{a}</p>
        </div>
      ) : null}
    </div>
  )
}

export function FAQClient({ locale }: FAQClientProps) {
  const isTh = locale === "th"
  const [activeCategory, setActiveCategory] = useState("general")

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 py-20 text-center md:py-28">
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-4 py-1.5 text-sm font-medium text-warm-amber">
            <HelpCircle className="h-4 w-4" />
            {isTh ? "คำถามที่พบบ่อย" : "FAQ & Knowledge Base"}
          </div>
          <h1 className="text-5xl font-bold text-foreground">{isTh ? "คำถามที่พบบ่อย" : "Frequently Asked Questions"}</h1>
          <p className="text-lg text-muted-foreground">
            {isTh
              ? "ทุกสิ่งที่คุณต้องรู้เกี่ยวกับ RCT Ecosystem — ตั้งแต่พื้นฐานถึงเทคนิคเชิงลึก"
              : "Everything you need to know about the RCT Ecosystem — from basics to technical deep-dives."}
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-4 pb-24">
        <div className="flex flex-col gap-8 md:flex-row">
          <aside className="shrink-0 md:w-48">
            <nav className="sticky top-24 space-y-1">
              {faqCategories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${activeCategory === cat.id ? "border border-warm-amber/30 bg-warm-amber/10 text-warm-amber" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4 shrink-0" />
                      {isTh ? cat.labelTh : cat.labelEn}
                    </span>
                  </button>
                )
              })}
            </nav>
          </aside>
          <div className="flex-1 space-y-8">
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              {faqCategories.filter((cat) => cat.id === activeCategory).map((cat) => (
                <div key={cat.id}>
                  <h2 className="mb-5 text-2xl font-bold text-foreground">{isTh ? cat.labelTh : cat.labelEn}</h2>
                  {cat.items.map((item) => (
                    <AccordionItem key={item.qEn} q={isTh ? item.qTh : item.qEn} a={isTh ? item.aTh : item.aEn} />
                  ))}
                </div>
              ))}
            </div>
            <div className="rounded-2xl border border-border bg-card/70 p-6">
              <div className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-warm-amber">
                {isTh ? "ประวัติเวอร์ชัน" : "Version History"}
              </div>
              <div className="space-y-3">
                {versions.map((version) => (
                  <div key={version.ver} className="flex flex-col gap-2 rounded-xl border border-border/70 bg-background/70 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <div className="font-semibold text-foreground">{version.ver} — {version.name}</div>
                      <div className="text-sm text-muted-foreground">{version.date}</div>
                    </div>
                    <div className="text-xs font-semibold uppercase tracking-[0.16em] text-warm-amber">{version.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}