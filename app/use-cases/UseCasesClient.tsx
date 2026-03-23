"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { getLocaleFromPathname } from "@/lib/i18n"
import Link from "next/link"
import {
  Beaker, Code2, Bot, TrendingUp, Building2, Stethoscope, Scale,
  GraduationCap, Newspaper, Palette, Landmark,
  ChevronDown, CheckCircle, ShieldCheck, Brain, Globe
} from "lucide-react"

type Status = "proven" | "deployed" | "prototype" | "potential"

interface CaseStudy {
  id: string
  category: string[]
  icon: React.ComponentType<{ size?: number; className?: string; style?: React.CSSProperties }>
  color: string
  status: Status
  title: { en: string; th: string }
  subtitle: { en: string; th: string }
  desc: { en: string; th: string }
  metrics: { label: string; value: string }[]
  technologies?: string[]
  rctComponents?: string[]
}

const casesData: CaseStudy[] = [
  {
    id: "proving-ground",
    category: ["proven", "enterprise"],
    icon: Beaker,
    color: "#7B9E87",
    status: "proven",
    title: { en: "RCT Proving Ground — Ghost Tester QA", th: "RCT Proving Ground — Ghost Tester QA" },
    subtitle: { en: "Automated Quality Assurance System", th: "ระบบ QA อัตโนมัติ" },
    desc: {
      en: "A production-ready FastAPI-integrated QA system with self-healing capabilities. The Ghost Tester validates code, detects visual regressions, tests interactions, and auto-fixes issues across 34 test scenarios with 100% coverage.",
      th: "ระบบ QA ที่พร้อมใช้งานจริง ผสาน FastAPI พร้อมความสามารถ Self-Healing ตรวจสอบโค้ด ตรวจจับ Visual Regression ทดสอบ Interaction และแก้ไขอัตโนมัติ ครอบคลุม 34 สถานการณ์ทดสอบ 100%"
    },
    metrics: [
      { label: "Test Coverage", value: "100%" },
      { label: "Tests Passing", value: "34/34" },
      { label: "Execution Time", value: "< 1s" },
      { label: "Self-Heal Rate", value: "92%" }
    ],
    technologies: ["FastAPI", "Python", "Gemini", "Docker"],
    rctComponents: ["JITNA Kernel", "SignedAI", "Ghost Tester", "Sandbox Manager"]
  },
  {
    id: "specialist-studio",
    category: ["proven", "enterprise"],
    icon: Code2,
    color: "#D4A853",
    status: "deployed",
    title: { en: "Specialist Studio — Module Development Platform", th: "Specialist Studio — แพลตฟอร์มพัฒนา Module" },
    subtitle: { en: "5-Layer Architecture for Specialty Modules", th: "สถาปัตยกรรม 5 ชั้นสำหรับ Specialty Modules" },
    desc: {
      en: "A platform enabling users to create, validate, test, and publish specialty modules. Features 50+ API endpoints, evidence generation, execution analytics, and team publishing workflows.",
      th: "แพลตฟอร์มครอบคลุมการสร้าง ทดสอบ และเผยแพร่ Specialty Modules มี 50+ API Endpoints, Evidence Generation, Execution Analytics และ Team Publishing"
    },
    metrics: [
      { label: "API Endpoints", value: "50+" },
      { label: "Architecture", value: "5 Layers" },
      { label: "Test Coverage", value: "100%" },
      { label: "Status", value: "Active Dev" }
    ],
    technologies: ["React 18", "FastAPI", "PostgreSQL", "Redis", "Celery"],
    rctComponents: ["Specialist Engine", "Evidence Layer", "Validation Pipeline", "Publishing System"]
  },
  {
    id: "discord-integration",
    category: ["proven", "enterprise"],
    icon: Bot,
    color: "#89B4C8",
    status: "deployed",
    title: { en: "Discord x RCT Integration — JITNA Bot", th: "Discord x RCT Integration — JITNA Bot" },
    subtitle: { en: "AI-Powered Community Management", th: "การจัดการ Community ด้วย AI" },
    desc: {
      en: "Full Discord integration with JITNA commands for generating apps from prompts, deploying to production, and syncing membership tiers with Discord roles in real-time.",
      th: "เชื่อมต่อ Discord เต็มรูปแบบ พร้อม JITNA Commands สำหรับสร้างแอปจาก Prompt, Deploy สู่ Production และ Sync Membership Tiers กับ Discord Roles แบบ Real-time"
    },
    metrics: [
      { label: "Commands", value: "15+" },
      { label: "Tier Sync", value: "Real-time" },
      { label: "Uptime", value: "99.9%" },
      { label: "Users", value: "500+" }
    ],
    technologies: ["discord.py", "FastAPI", "Redis", "PostgreSQL"],
    rctComponents: ["JITNA Kernel", "Membership Engine", "Tier Management", "Webhook Handler"]
  },
  {
    id: "benchmark-framework",
    category: ["proven", "research"],
    icon: TrendingUp,
    color: "#C4745B",
    status: "proven",
    title: { en: "Comprehensive Benchmark Framework", th: "Benchmark Framework ครอบคลุมจริง" },
    subtitle: { en: "756 Test Scenarios, 1M+ Requests", th: "756 Test Scenarios, 1M+ Requests" },
    desc: {
      en: "Production benchmarking framework validating the entire RCT Ecosystem across 756 test scenarios with 1,000,000+ requests. Measures GAIA L1/L2 accuracy (≥91%), hallucination detection (≥95%), semantic accuracy (≥96%), and cost per request (<$0.01).",
      th: "Benchmark Framework สำหรับ Production ที่ทดสอบ RCT Ecosystem ครอบคลุม 756 สถานการณ์ทดสอบ 1M+ Requests วัด GAIA Accuracy ≥91%, Hallucination Detection ≥95%, Cost <$0.01"
    },
    metrics: [
      { label: "Test Scenarios", value: "756" },
      { label: "Total Requests", value: "1M+" },
      { label: "Accuracy", value: "≥91%" },
      { label: "Cost/Request", value: "<$0.01" }
    ],
    technologies: ["Python", "Locust", "Prometheus", "Grafana"],
    rctComponents: ["FDIA Engine", "SignedAI", "Benchmark Runner", "Metrics Collector"]
  },
  {
    id: "enterprise-research",
    category: ["potential", "enterprise", "research"],
    icon: Building2,
    color: "#B8A9C9",
    status: "potential",
    title: { en: "Enterprise Research Intelligence", th: "Enterprise Research Intelligence" },
    subtitle: { en: "Multi-Source Research & Synthesis Platform", th: "แพลตฟอร์มวิจัยและสังเคราะห์หลายแหล่ง" },
    desc: {
      en: "RCT Ecosystem can power enterprise research platforms that aggregate data from multiple sources, synthesize insights with AI verification, and provide auditable research trails with SignedAI evidence.",
      th: "RCT Ecosystem สามารถขับเคลื่อนแพลตฟอร์มวิจัยองค์กร รวบรวมข้อมูลจากหลายแหล่ง สังเคราะห์ insight พร้อม AI Verification และ SignedAI Evidence ที่ตรวจสอบได้"
    },
    metrics: [
      { label: "Data Sources", value: "50+" },
      { label: "Verification", value: "SHA-256" },
      { label: "Report Speed", value: "< 5min" },
      { label: "Accuracy", value: "≥95%" }
    ],
    technologies: ["RAG Pipeline", "Vector DB", "FastAPI", "SignedAI"],
    rctComponents: ["JITNA Kernel", "SignedAI", "Research Engine", "Evidence Layer"]
  },
  {
    id: "medical-research",
    category: ["potential", "research"],
    icon: Stethoscope,
    color: "#A8C4B8",
    status: "potential",
    title: { en: "Medical Research Assistant", th: "ผู้ช่วยวิจัยทางการแพทย์" },
    subtitle: { en: "Clinical Literature Analysis & Synthesis", th: "วิเคราะห์และสังเคราะห์วรรณกรรมทางคลินิก" },
    desc: {
      en: "Potential application for medical research: automated literature review, clinical trial data synthesis, drug interaction analysis, and treatment protocol recommendations with full evidence trails.",
      th: "การประยุกต์ใช้ที่มีศักยภาพสำหรับการวิจัยทางการแพทย์ — ทบทวนวรรณกรรมอัตโนมัติ, สังเคราะห์ข้อมูลการทดลองทางคลินิก, วิเคราะห์ drug interaction พร้อม Evidence Trail"
    },
    metrics: [
      { label: "Papers/Hour", value: "1,000+" },
      { label: "Hallucination", value: "<1%" },
      { label: "Evidence", value: "Full Trail" },
      { label: "Compliance", value: "HIPAA Ready" }
    ],
    technologies: ["PubMed API", "FHIR", "Vector DB", "RAG"],
    rctComponents: ["FDIA Engine", "SignedAI", "Specialist Engine", "Compliance Layer"]
  },
  {
    id: "legal-compliance",
    category: ["potential", "enterprise"],
    icon: Scale,
    color: "#C4A882",
    status: "potential",
    title: { en: "Legal Compliance & Contract Analysis", th: "การวิเคราะห์สัญญาและการปฏิบัติตามกฎหมาย" },
    subtitle: { en: "Intelligent Legal Document Processing", th: "ประมวลผลเอกสารทางกฎหมายอย่างชาญฉลาด" },
    desc: {
      en: "RCT Ecosystem could automate contract review, regulatory compliance checks, and legal risk assessment with verifiable outputs — enabling law firms and corporate legal teams to scale efficiently.",
      th: "RCT Ecosystem สามารถทำให้การตรวจสอบสัญญา, การตรวจสอบการปฏิบัติตามกฎระเบียบ และการประเมินความเสี่ยงทางกฎหมายเป็นแบบอัตโนมัติ พร้อม Output ที่ตรวจสอบได้"
    },
    metrics: [
      { label: "Doc Processing", value: "< 2min" },
      { label: "Clauses Found", value: "99%+" },
      { label: "Risk Flags", value: "Auto" },
      { label: "Audit Trail", value: "Full" }
    ],
    technologies: ["OCR", "NLP", "FastAPI", "PostgreSQL"],
    rctComponents: ["JITNA Kernel", "SignedAI", "Compliance Engine", "Risk Analyzer"]
  },
  {
    id: "education-platform",
    category: ["potential", "creative"],
    icon: GraduationCap,
    color: "#89C4A8",
    status: "potential",
    title: { en: "Adaptive Education Platform", th: "แพลตฟอร์มการศึกษาแบบปรับตัว" },
    subtitle: { en: "Personalized Learning with AI Tutors", th: "การเรียนรู้เฉพาะบุคคลด้วย AI Tutor" },
    desc: {
      en: "AI tutoring platform powered by RCT Ecosystem that adapts to student learning patterns, generates personalized curricula, and provides verifiable assessment with detailed evidence of student progress.",
      th: "แพลตฟอร์ม AI Tutoring ขับเคลื่อนด้วย RCT Ecosystem ที่ปรับตาม Pattern การเรียนรู้ของนักเรียน สร้างหลักสูตรเฉพาะบุคคล และให้การประเมินที่ตรวจสอบได้"
    },
    metrics: [
      { label: "Adaptation", value: "Real-time" },
      { label: "Engagement", value: "+40%" },
      { label: "Curriculum", value: "Auto-gen" },
      { label: "Progress", value: "Verified" }
    ],
    technologies: ["Next.js", "FastAPI", "Redis", "Vector DB"],
    rctComponents: ["Specialist Engine", "FDIA Engine", "Adaptive Kernel", "Progress Tracker"]
  },
  {
    id: "journalism-factcheck",
    category: ["potential", "research"],
    icon: Newspaper,
    color: "#C4B889",
    status: "potential",
    title: { en: "Journalism Fact-Checking System", th: "ระบบตรวจสอบข้อเท็จจริงสำหรับสื่อ" },
    subtitle: { en: "Real-Time News Verification Pipeline", th: "Pipeline ตรวจสอบข่าวแบบ Real-time" },
    desc: {
      en: "Automated fact-checking pipeline for news organizations — cross-referencing claims against authoritative sources, flagging misinformation, and generating transparent verification reports with full source citations.",
      th: "Pipeline ตรวจสอบข้อเท็จจริงอัตโนมัติสำหรับองค์กรสื่อ — เปรียบเทียบข้อกล่าวอ้างกับแหล่งข้อมูลที่น่าเชื่อถือ ระบุ Misinformation และสร้างรายงานการตรวจสอบที่โปร่งใส"
    },
    metrics: [
      { label: "Check Speed", value: "< 30s" },
      { label: "Sources", value: "1,000+" },
      { label: "Accuracy", value: "≥94%" },
      { label: "Citations", value: "Full" }
    ],
    technologies: ["Web Search API", "NLP", "FastAPI", "Redis"],
    rctComponents: ["JITNA Kernel", "SignedAI", "Source Validator", "Evidence Layer"]
  },
  {
    id: "creative-innovation",
    category: ["potential", "creative"],
    icon: Palette,
    color: "#C89BC4",
    status: "potential",
    title: { en: "Creative Innovation Studio", th: "Creative Innovation Studio" },
    subtitle: { en: "AI-Assisted Game & Narrative Development", th: "การพัฒนาเกมและเนื้อเรื่องด้วย AI" },
    desc: {
      en: "RCT Ecosystem applied to creative industries: generating consistent game narratives, NPC behavior trees, world-building documentation, and interactive story branching with verifiable creative outputs.",
      th: "RCT Ecosystem ประยุกต์ใช้กับอุตสาหกรรมสร้างสรรค์ — สร้าง Game Narrative, NPC Behavior Trees, World-building Documentation และ Interactive Story Branching"
    },
    metrics: [
      { label: "NPC Profiles", value: "100+" },
      { label: "Story Branches", value: "Auto" },
      { label: "Consistency", value: "≥96%" },
      { label: "Lore Files", value: "Linked" }
    ],
    technologies: ["LLM Pipeline", "Graph DB", "FastAPI", "Vector DB"],
    rctComponents: ["JITNA Kernel", "Specialist Engine", "Narrative Engine", "Consistency Checker"]
  },
  {
    id: "government-policy",
    category: ["potential", "enterprise", "research"],
    icon: Landmark,
    color: "#A8B8C4",
    status: "potential",
    title: { en: "Government Policy Analysis Platform", th: "แพลตฟอร์มวิเคราะห์นโยบายภาครัฐ" },
    subtitle: { en: "Public Policy Impact Assessment", th: "การประเมินผลกระทบนโยบายสาธารณะ" },
    desc: {
      en: "AI-powered policy analysis for government agencies — synthesizing public comments, modeling policy impacts, and generating evidence-based recommendations with full auditability for democratic accountability.",
      th: "วิเคราะห์นโยบายด้วย AI สำหรับหน่วยงานภาครัฐ — รวบรวมความคิดเห็นสาธารณะ จำลองผลกระทบนโยบาย และสร้างคำแนะนำที่อิงหลักฐาน ตรวจสอบได้ตลอด"
    },
    metrics: [
      { label: "Comments/hr", value: "10K+" },
      { label: "Impact Models", value: "Multi-dim" },
      { label: "Transparency", value: "Full Audit" },
      { label: "Compliance", value: "Gov Ready" }
    ],
    technologies: ["NLP", "Simulation Engine", "FastAPI", "PostgreSQL"],
    rctComponents: ["FDIA Engine", "SignedAI", "Policy Analyzer", "Audit Trail"]
  }
]

const categoriesEn = [
  { id: "all", label: "All Cases" },
  { id: "proven", label: "Proven" },
  { id: "enterprise", label: "Enterprise" },
  { id: "research", label: "Research" },
  { id: "creative", label: "Creative" },
  { id: "potential", label: "Potential" }
]

const categoriesTh = [
  { id: "all", label: "ทั้งหมด" },
  { id: "proven", label: "พิสูจน์แล้ว" },
  { id: "enterprise", label: "Enterprise" },
  { id: "research", label: "วิจัย" },
  { id: "creative", label: "สร้างสรรค์" },
  { id: "potential", label: "ที่มีศักยภาพ" }
]

const statusConfig: Record<Status, { label: { en: string; th: string }; color: string }> = {
  proven: { label: { en: "Proven", th: "พิสูจน์แล้ว" }, color: "#7B9E87" },
  deployed: { label: { en: "Deployed", th: "ใช้งานจริง" }, color: "#D4A853" },
  prototype: { label: { en: "Prototype", th: "ต้นแบบ" }, color: "#89B4C8" },
  potential: { label: { en: "Potential", th: "มีศักยภาพ" }, color: "#B8A9C9" }
}

const analysisSections = [
  {
    icon: ShieldCheck,
    color: "#7B9E87",
    title: { en: "Verifiable AI", th: "AI ที่ตรวจสอบได้" },
    desc: {
      en: "Every output is SHA-256 signed via SignedAI, creating tamper-proof evidence chains that enterprise clients and regulators can independently verify.",
      th: "ทุก Output ถูก Sign ด้วย SHA-256 ผ่าน SignedAI สร้าง Evidence Chain ที่ป้องกันการแก้ไข ทั้งลูกค้า Enterprise และผู้กำกับดูแลสามารถตรวจสอบได้อิสระ"
    }
  },
  {
    icon: Brain,
    color: "#D4A853",
    title: { en: "Human-in-the-Loop", th: "มนุษย์ควบคุมในกระบวนการ" },
    desc: {
      en: "The FDIA equation (F = D^I × A) ensures AI decisions always incorporate human judgment at key decision points, maintaining accountability across all use cases.",
      th: "สมการ FDIA (F = D^I × A) รับประกันว่าการตัดสินใจของ AI จะรวมการตัดสินของมนุษย์ในจุดสำคัญเสมอ รักษาความรับผิดชอบในทุกกรณีใช้งาน"
    }
  },
  {
    icon: Globe,
    color: "#89B4C8",
    title: { en: "Sovereign Infrastructure", th: "โครงสร้างพื้นฐานที่เป็นอิสระ" },
    desc: {
      en: "Multi-provider support (Gemini, OpenAI, Claude) with on-premise deployment options means organizations retain full data sovereignty and avoid vendor lock-in.",
      th: "รองรับ Multi-provider (Gemini, OpenAI, Claude) พร้อม On-premise Deployment ทำให้องค์กรรักษา Data Sovereignty อย่างสมบูรณ์ ไม่ผูกติดกับ Vendor"
    }
  }
]

export default function UseCasesPage() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const locale = getLocaleFromPathname(pathname) ?? "en"
  const isEn = locale === "en"

  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [expandedCase, setExpandedCase] = useState<string | null>(null)

  const categories = isEn ? categoriesEn : categoriesTh

  const filtered = activeCategory === "all"
    ? casesData
    : casesData.filter(c => c.category.includes(activeCategory))

  const provenCount = casesData.filter(c => c.status === "proven" || c.status === "deployed").length
  const potentialCount = casesData.filter(c => c.status === "potential").length

  const stats = [
    { value: `${provenCount}`, label: isEn ? "Proven Cases" : "เคสที่พิสูจน์แล้ว" },
    { value: "52+", label: isEn ? "Microservices" : "Microservices" },
    { value: `${potentialCount}`, label: isEn ? "Potential Domains" : "โดเมนที่มีศักยภาพ" },
    { value: "10+", label: isEn ? "Industries" : "อุตสาหกรรม" }
  ]

  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen bg-background">
        {/* Hero */}
        <section className="py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{ borderColor: "#7B9E87", color: "#7B9E87", background: "rgba(123,158,135,0.08)" }}
            >
              {isEn ? "Real-World Impact" : "ผลกระทบในโลกจริง"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-bold mb-6"
            >
              {isEn ? "Case Studies & " : "กรณีศึกษา & "}
              <span style={{ color: "#7B9E87" }}>{isEn ? "Use Cases" : "กรณีการใช้งาน"}</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
            >
              {isEn
                ? "From production-ready systems to potential applications — RCT Ecosystem powers verifiable AI across industries."
                : "จากระบบที่พร้อมใช้งานจริงถึงการประยุกต์ที่มีศักยภาพ — RCT Ecosystem ขับเคลื่อน AI ที่ตรวจสอบได้ทั่วอุตสาหกรรม"}
            </motion.p>

            {/* Summary Stats */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="p-4 rounded-2xl border text-center"
                  style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}
                >
                  <div className="text-2xl font-bold" style={{ color: "#7B9E87" }}>{s.value}</div>
                  <div className="text-xs text-muted-foreground mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="px-4 pb-6">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border"
                  style={{
                    borderColor: activeCategory === cat.id ? "#7B9E87" : (isDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.12)"),
                    background: activeCategory === cat.id ? "rgba(123,158,135,0.15)" : "transparent",
                    color: activeCategory === cat.id ? "#7B9E87" : undefined
                  }}
                >
                  {cat.label}
                  <span className="ml-1.5 text-xs opacity-60">
                    ({cat.id === "all" ? casesData.length : casesData.filter(c => c.category.includes(cat.id)).length})
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Case Cards */}
        <section className="px-4 pb-20">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence mode="popLayout">
              <div className="grid grid-cols-1 gap-4">
                {filtered.map((c, i) => {
                  const Icon = c.icon
                  const status = statusConfig[c.status]
                  const isExpanded = expandedCase === c.id

                  return (
                    <motion.div
                      key={c.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10, scale: 0.98 }}
                      transition={{ duration: 0.3, delay: i * 0.04 }}
                      className="rounded-2xl border overflow-hidden"
                      style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                    >
                      {/* Card Header */}
                      <button
                        className="w-full text-left p-6 flex items-start gap-4"
                        style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.01)" }}
                        onClick={() => setExpandedCase(isExpanded ? null : c.id)}
                        aria-expanded={isExpanded}
                      >
                        {/* Icon */}
                        <span
                          className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl mt-0.5"
                          style={{ background: `${c.color}18` }}
                        >
                          <Icon size={24} style={{ color: c.color }} />
                        </span>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span
                              className="inline-block px-2 py-0.5 rounded-full text-xs font-semibold"
                              style={{ background: `${status.color}18`, color: status.color }}
                            >
                              {isEn ? status.label.en : status.label.th}
                            </span>
                          </div>
                          <h3 className="font-bold text-foreground leading-snug">
                            {isEn ? c.title.en : c.title.th}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {isEn ? c.subtitle.en : c.subtitle.th}
                          </p>

                          {/* Quick Metrics */}
                          <div className="flex flex-wrap gap-2 mt-3">
                            {c.metrics.map((m, j) => (
                              <span
                                key={j}
                                className="inline-block px-2 py-0.5 rounded-lg text-xs font-medium"
                                style={{ background: `${c.color}10`, color: c.color }}
                              >
                                {m.label}: <span className="font-bold">{m.value}</span>
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Expand Arrow */}
                        <motion.div
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="shrink-0 mt-1"
                        >
                          <ChevronDown size={18} className="text-muted-foreground" />
                        </motion.div>
                      </button>

                      {/* Expandable Detail */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            key="detail"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ overflow: "hidden" }}
                          >
                            <div
                              className="px-6 pb-6 pt-0 border-t"
                              style={{ borderColor: isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)" }}
                            >
                              <p className="text-sm text-muted-foreground mt-4 mb-4 leading-relaxed">
                                {isEn ? c.desc.en : c.desc.th}
                              </p>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {c.technologies && (
                                  <div>
                                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                      {isEn ? "Technologies" : "เทคโนโลยี"}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                      {c.technologies.map((t, j) => (
                                        <span
                                          key={j}
                                          className="inline-block px-2 py-0.5 rounded-md text-xs font-medium border"
                                          style={{ borderColor: isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)" }}
                                        >
                                          {t}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}

                                {c.rctComponents && (
                                  <div>
                                    <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                                      {isEn ? "RCT Components" : "RCT Components"}
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                      {c.rctComponents.map((comp, j) => (
                                        <span
                                          key={j}
                                          className="inline-block px-2 py-0.5 rounded-md text-xs font-medium"
                                          style={{ background: `${c.color}12`, color: c.color }}
                                        >
                                          {comp}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </div>
            </AnimatePresence>
          </div>
        </section>

        {/* Why RCT Ecosystem Matters */}
        <section className="px-4 py-16" style={{ background: isDark ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)" }}>
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                {isEn ? "Why RCT Ecosystem Matters" : "ทำไม RCT Ecosystem จึงสำคัญ"}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto text-sm">
                {isEn
                  ? "Three pillars that make RCT the foundation for production-grade AI systems."
                  : "สามเสาหลักที่ทำให้ RCT เป็นรากฐานของระบบ AI ระดับ Production"}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {analysisSections.map((sec, i) => {
                const Icon = sec.icon
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-6 rounded-2xl border"
                    style={{ borderColor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)" }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ background: `${sec.color}18` }}
                    >
                      <Icon size={24} style={{ color: sec.color }} />
                    </div>
                    <h3 className="font-bold mb-2">{isEn ? sec.title.en : sec.title.th}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {isEn ? sec.desc.en : sec.desc.th}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-4 py-20">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl"
              style={{ background: isDark ? "rgba(123,158,135,0.08)" : "rgba(123,158,135,0.06)", border: "1px solid rgba(123,158,135,0.2)" }}
            >
              <div className="flex items-center justify-center gap-2 mb-4">
                <CheckCircle size={20} style={{ color: "#7B9E87" }} />
                <span className="text-sm font-semibold" style={{ color: "#7B9E87" }}>
                  {isEn ? "Open Source & Verifiable" : "Open Source และตรวจสอบได้"}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                {isEn ? "Build Your Use Case" : "สร้างกรณีใช้งานของคุณ"}
              </h2>
              <p className="text-muted-foreground mb-8 text-sm leading-relaxed">
                {isEn
                  ? "Whether you're validating an enterprise workflow or exploring a new AI application, RCT Ecosystem gives you the infrastructure for verifiable, sovereign intelligence."
                  : "ไม่ว่าจะเป็นการตรวจสอบ Workflow ขององค์กรหรือสำรวจแอปพลิเคชัน AI ใหม่ RCT Ecosystem มอบโครงสร้างพื้นฐานสำหรับ Intelligence ที่ตรวจสอบได้และเป็นอิสระ"}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="https://github.com/rctlabs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all"
                  style={{ background: "#7B9E87", color: "#fff" }}
                >
                  {isEn ? "View on GitHub" : "ดูบน GitHub"}
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm border transition-all"
                  style={{ borderColor: "rgba(123,158,135,0.4)", color: "#7B9E87" }}
                >
                  {isEn ? "Learn About RCT" : "เรียนรู้เกี่ยวกับ RCT"}
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
