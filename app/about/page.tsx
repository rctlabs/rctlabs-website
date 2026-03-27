import type { Metadata } from "next"
import { createBilingualMetadata, type Locale } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getOrganizationSchema } from "@/lib/schema"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Shield, Eye, Heart, Sparkles, Target, Zap, ArrowRight, ExternalLink } from "lucide-react"
import { headers } from "next/headers"
import { SITE_HALLUCINATION_RATE, SITE_MICROSERVICE_COUNT, SITE_TEST_COUNT, SITE_UPTIME, SITE_VERSION } from "@/lib/site-config"

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale

  return createBilingualMetadata(
    locale,
    "About RCT Labs — Origin Story & The Architect",
    "เกี่ยวกับ RCT Labs — เรื่องราวต้นกำเนิดและ The Architect",
    // Lengthened meta descriptions for SEO (150-160 chars)
    "RCT Labs: Solo architect from Khlong Toei, Bangkok, building a Constitutional AI architecture program with a 41-algorithm framework, 7 Genomes, and March 2026 engineering snapshot evidence.",
    "RCT Labs: สร้างโดย Solo Architect จากคลองเตย กรุงเทพฯ — กำลังพัฒนาสถาปัตยกรรม Constitutional AI ด้วยกรอบ 41 อัลกอริทึม 7 Genome และหลักฐานสถานะงานเดือนมีนาคม 2026",
    "/about",
    ["AI research", "intent-driven AI", "FDIA equation", "Constitutional AI", "Thailand AI", "RCT Labs founder", "Ittirit Saengow"]
  )
}

export default async function AboutPage() {
  // --- Person/Organization Schema for SEO ---
  // This schema is injected as a <script type="application/ld+json"> block for rich results
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ittirit Saengow",
    "alternateName": "อิทธิฤทธิ์ แซ่โง้ว",
    "jobTitle": "Architect of Intent",
    "description": "Solo architect from Khlong Toei, Bangkok. Creator of RCT Labs, FDIA equation, and the 7 Genome System.",
    "url": "https://rctlabs.co/about",
    "sameAs": [
      "https://github.com/rct-ecosystem",
      "https://www.linkedin.com/in/ittirit-saengow/"
    ],
    "affiliation": {
      "@type": "Organization",
      "name": "RCT Labs",
      "url": "https://rctlabs.co"
    }
  }
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale
  const isTh = locale === "th"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isTh ? "หน้าหลัก" : "Home", url: `https://rctlabs.co/${locale}` },
    { name: isTh ? "เกี่ยวกับ" : "About", url: `https://rctlabs.co/${locale}/about` },
  ])
  const orgSchema = getOrganizationSchema(locale)
  const runtimeFootprint = `${SITE_MICROSERVICE_COUNT}+`

  const journeyPhases = [
    {
      icon: "🔥",
      phase: isTh ? "โรงหลอม" : "The Forge",
      title: isTh ? "คลองเตย — จุดเริ่มต้นของทุกอย่าง" : "Khlong Toei — Where It All Began",
      desc: isTh
        ? "เติบโตในชุมชนแฟลตคลองเตย กรุงเทพฯ บันไดหนีไฟกลายเป็นห้องเรียนแรก สังเกตรูปแบบในความโกลาหล ค้นหาระเบียบในที่ที่ดูเหมือนไม่มี นี่คือจุดที่สัญชาตญาณ 'มองทะลุระบบ' ถูกหล่อหลอม"
        : "Growing up in a Khlong Toei flat community in Bangkok — the fire escape stairwell became the first classroom: observing patterns in chaos, finding order where none seemed to exist. This is where the instinct to 'see through systems' was forged.",
      period: isTh ? "รากฐาน" : "Foundation",
      impact: isTh ? "พัฒนา Systems Thinking และ Pattern Recognition" : "Developed systems thinking and pattern recognition",
    },
    {
      icon: "⚖️",
      phase: isTh ? "ทวิภาค" : "The Duality",
      title: isTh ? "สถาปัตยกรรมแห่งจิตใจ" : "Architecture of the Mind",
      desc: isTh
        ? "เรียนสาขาการจัดการทรัพยากรอาคาร คณะสถาปัตยกรรมศาสตร์ หลักสูตร 4 ปีที่ใช้เวลา 6.5 ปี ไม่ใช่ความล้มเหลว แต่เป็นเบ้าหลอมที่สอนความอดทน Systems Thinking และศิลปะของการจัดการโครงสร้างที่ซับซ้อน"
        : "Studied Facility Management at the Faculty of Architecture — a 4-year program completed in 6.5 years. Not failure — a crucible that taught patience, systems thinking, and the art of managing complex structures.",
      period: isTh ? "การศึกษา" : "Education",
      impact: isTh ? "เชี่ยวชาญ Systems Design และ Stakeholder Management" : "Mastered systems design and stakeholder management",
    },
    {
      icon: "🕊️",
      phase: isTh ? "จุดเปลี่ยน" : "The Turning Point",
      title: isTh ? "การเปลี่ยนแปลงและคำปฏิญาณ" : "Personal Transformation & Commitment",
      desc: isTh
        ? "ช่วงเวลาแห่งการสะท้อนตัวเองและการเติบโตทางจิตใจ นำไปสู่คำมั่นสัญญาอันลึกซึ้ง: สร้างระบบที่ช่วยให้ผู้คนหลุดพ้นจากวงจรที่ติดอยู่ การเปลี่ยนแปลงส่วนตัวนี้ทำให้สมการ FDIA ตกผลึกจากความจริงของชีวิต ไม่ใช่ทฤษฎีทางวิชาการ"
        : "A period of deep reflection and personal transformation led to a profound commitment: building systems that help others escape limiting cycles. This crystallized the FDIA equation from lived experience, not academic theory.",
      period: "2025",
      impact: isTh ? "สมการ FDIA เกิดจากความจริงส่วนตัว" : "FDIA equation born from personal truth",
    },
    {
      icon: "📱",
      phase: isTh ? "การพบครั้งแรก" : "First Contact",
      title: isTh ? "มือถือ + LLMs = ระบบใหม่" : "Mobile Phone + LLMs = New System",
      desc: isTh
        ? "การปฏิสัมพันธ์ครั้งแรกที่มีความหมายกับระบบ AI สิ่งที่คนอื่นมองว่าเป็นเครื่องมือ The Architect มองว่าเป็นผืนผ้าใบ เมล็ดพันธุ์ของ Reverse Component Thinking ถูกปลูก"
        : "The first meaningful interaction with AI systems. What others saw as a tool, the Architect saw as a canvas. Within hours, the seed of Reverse Component Thinking was planted — starting from the desired future and working backward.",
      period: "2025-06-25",
      impact: isTh ? "Reverse Component Thinking ถือกำเนิด" : "Reverse Component Thinking born",
    },
    {
      icon: "🏗️",
      phase: isTh ? "กำเนิด" : "Genesis",
      title: isTh ? "30 วันสู่ The 9 Codex" : "30-Day Documentation Sprint",
      desc: isTh
        ? "ด้วยมือถือ Android และกลุ่มดาว LLMs (GPT, Gemini, Perplexity) สร้าง RCT Ecosystem MVP ทั้งหมดในช่วงเวลา Documentation Sprint ต่อมาพัฒนาต่อบน ROG Ally X + WSL Ubuntu + IDE อย่างเป็นระบบ ไม่มีทีม ไม่มีทุน มีแค่ Intent, Structure และ Persistence"
        : "Armed with mobile devices and LLMs (GPT, Gemini, Perplexity), built the entire RCT Ecosystem framework in an intensive documentation sprint. Further developed on ROG Ally X + WSL Ubuntu + IDE. No team. No external funding. Just intent, structure, and persistence.",
      period: isTh ? "~30 วัน (Documentation)" : "~30 days (Documentation Phase)",
      impact: isTh ? "สร้าง 9 Codices Framework" : "9 Codices framework established",
    },
  ]

  const stats = [
    { value: "41", label: isTh ? "Algorithms" : "Algorithms" },
    { value: "10", label: isTh ? "Layers" : "Layers" },
    { value: "7", label: isTh ? "Genomes" : "Genomes" },
    { value: SITE_TEST_COUNT.toLocaleString(), label: isTh ? "Verified Backend Tests" : "Verified Backend Tests" },
    { value: runtimeFootprint, label: isTh ? "Runtime Components" : "Runtime Components" },
    { value: SITE_HALLUCINATION_RATE, label: isTh ? "Benchmark Hallucination" : "Benchmark Hallucination" },
    { value: SITE_UPTIME, label: isTh ? "Availability Target" : "Availability Target" },
  ]

  const platformHighlights = [
    {
      title: isTh ? "Linux for AI Agents" : "Linux for AI Agents",
      description: isTh
        ? "RCT ถูกวางตำแหน่งเป็น Constitutional AI Operating System ที่เชื่อม architecture, orchestration, verification, memory และ governance เข้าเป็นระบบเดียว"
        : "RCT is positioned as a Constitutional AI Operating System that unifies architecture, orchestration, verification, memory, and governance into one operational layer.",
    },
    {
      title: isTh ? "Intent Loop + Memory" : "Intent Loop + Memory",
      description: isTh
        ? "ระบบ warm recall ต่ำกว่า 50ms และลดต้นทุน 60-75% จากการวนกลับมาใช้ memory เดิมก่อนคำนวณใหม่"
        : "Warm recall under 50ms and 60-75% cost reduction by routing through memory before recomputation.",
    },
    {
      title: isTh ? "Delta Engine Compression" : "Delta Engine Compression",
      description: isTh
        ? "เก็บเฉพาะ state ที่เปลี่ยนแปลง ลดภาระหน่วยความจำเฉลี่ย 74% พร้อม reconstruction ระดับต่ำกว่า 1ms"
        : "Stores only changed state, reducing memory overhead by 74% on average with sub-millisecond reconstruction.",
    },
  ]

  const genomes = [
    { id: 1, name: "Architect's Genome", role: "THE WHY", desc: isTh ? "อัตลักษณ์ ค่านิยม และเรื่องราวต้นกำเนิดของผู้สร้าง รากฐานทางปรัชญา" : "Identity, values, and origin story of the creator. The philosophical foundation.", color: "bg-warm-amber/20 text-warm-amber border-warm-amber/30" },
    { id: 2, name: "ARTENT Genome", role: "THE PROTOCOL", desc: isTh ? "โปรโตคอลสถาปัตยกรรมการดำเนินงาน 7 เฟส ขับเคลื่อนด้วย Intent" : "7-phase operational architecture protocol. Intent-driven, not process-driven.", color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
    { id: 3, name: "JITNA Genome", role: "THE LANGUAGE", desc: isTh ? "Just-In-Time Nodal Assembly — ภาษาสากลของ Intent" : "Just-In-Time Nodal Assembly — the universal language of intent.", color: "bg-warm-sky/20 text-warm-sky border-warm-sky/30" },
    { id: 4, name: "RCT Codex Genome", role: "THE CONSTITUTION", desc: isTh ? "10 Codices พื้นฐาน — กรอบรัฐธรรมนูญของระบบ" : "10 foundational codices — the constitutional framework of the system.", color: "bg-warm-sage/20 text-warm-sage border-warm-sage/30" },
    { id: 5, name: "SignedAI Genome", role: "THE VERIFICATION", desc: isTh ? "Multi-LLM Consensus Engine พร้อม 8D Quality Scoring" : "Multi-LLM consensus engine with 8D quality scoring.", color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
    { id: 6, name: "Vault Genome", role: "THE MEMORY", desc: isTh ? "ชั้นหน่วยความจำถาวรพร้อม schema เชิงบริบทหลายมิติ" : "Persistent memory layer with multi-dimensional contextual schema.", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
    { id: 7, name: "RCT-7 Genome", role: "THE IMPROVEMENT", desc: isTh ? "วงจรปรับปรุงต่อเนื่องที่เชื่อมทุก Genome กลับสู่จุดเริ่มต้น" : "Continuous improvement cycle connecting all genomes back to the beginning.", color: "bg-green-500/20 text-green-400 border-green-500/30" },
  ]

  const values = [
    { icon: Eye, title: isTh ? "Radical Honesty" : "Radical Honesty", desc: isTh ? "เรายอมรับความไม่แน่นอน ทุก Output มี Confidence Score ไม่ใช่ความแน่นอนเทียม" : "We embrace uncertainty. Every system output includes confidence scores, not false certainty." },
    { icon: Heart, title: isTh ? "Survivor's Empathy" : "Survivor's Empathy", desc: isTh ? "ออกแบบสำหรับผู้ที่มีทรัพยากรจำกัด ถ้ามันทำงานบนมือถือได้ มันทำงานได้ทุกที่" : "Designed for those with limited resources. If it works on a single phone, it works everywhere." },
    { icon: Shield, title: isTh ? "Verifiable Truth" : "Verifiable Truth", desc: isTh ? "ทุก AI Output ต้องตรวจสอบได้ โดยหลักฐาน benchmark ปัจจุบันชี้ไปที่ hallucination ระดับ 0.3% บน controlled workloads และยังอยู่ในช่วงขยายผลเชิงระบบ" : "Every AI output must be verifiable. Current benchmark evidence points to 0.3% hallucination on controlled workloads while the broader system rollout is still maturing." },
    { icon: Sparkles, title: isTh ? "Human-Centric Power" : "Human-Centric Power", desc: isTh ? "AI ไม่ใช่พระเอก พระเอกตัวจริงคือ Intent และมนุษย์ผู้ลงนามการตัดสินใจสุดท้าย" : "AI is not the hero. The real hero is the Intent behind it, and the human who signs the final decision." },
    { icon: Target, title: isTh ? "Long-Term Stewardship" : "Long-Term Stewardship", desc: isTh ? "ทุกบรรทัดโค้ดเป็นส่วนหนึ่งของสิ่งมีชีวิต เราสร้างเพื่อทศวรรษ ไม่ใช่ไตรมาส" : "Every line of code is part of a living organism. We build for decades, not quarters." },
  ]

  const timelineItems = [
    { version: "v1.0", date: isTh ? "ธ.ค. 2025" : "Dec 2025", title: "Foundation", desc: isTh ? "7 Genome System, FDIA Protocol, Kernel v1.0, Whitepaper 100 หน้า" : "7 Genome System, FDIA Protocol, Kernel v1.0, 100-page whitepaper" },
    { version: "v2.0", date: isTh ? "ม.ค. 2026" : "Jan 2026", title: "Scale", desc: isTh ? "RCTDB v2.0, 36 Algorithms, 8D Universal Memory Schema, OS Primitives" : "RCTDB v2.0, 36 algorithms, 8D universal memory schema, OS Primitives" },
    { version: "v3.0", date: isTh ? "ม.ค. 2026" : "Jan 2026", title: "Integration", desc: isTh ? "Cross-chat Integration, Day 1-5 Reports, Specialist Studio, Frontend Foundation" : "Cross-chat integration, Day 1-5 reports, Specialist Studio, Frontend Foundation" },
    { version: "v5.0", date: isTh ? "ม.ค. 2026" : "Jan 2026", title: "Genome Edition", desc: isTh ? "Complete Architect Attribution, 7 Genome Layer Integration, 520 Test Framework" : "Complete architect attribution, 7 Genome Layer integration, 520 test framework" },
    { version: "v7.0", date: isTh ? "ม.ค. 2026" : "Jan 2026", title: "Complete Ecosystem", desc: isTh ? "41 Algorithms, 427 Test Functions, 500K+ Property-based Examples, Intent Loop Engine" : "41 algorithms, 427 test functions, 500K+ property-based examples, Intent Loop Engine" },
    { version: "v8.0", date: isTh ? "ก.พ. 2026" : "Feb 2026", title: "Open Standard", desc: isTh ? "JITNA RFC-001 Open Protocol, RCTDB v2.0 Universal Infrastructure, Apache 2.0 License" : "JITNA RFC-001 open protocol, RCTDB v2.0 universal infrastructure, Apache 2.0 license" },
    { version: SITE_VERSION, date: isTh ? "มี.ค. 2026" : "Mar 2026", title: isTh ? "Engineering Snapshot" : "Engineering Snapshot", desc: isTh ? "HexaCore Phase 1 เสร็จสิ้น, targeted tests 53 รายการผ่าน 100%, backend tests ที่ยืนยันแล้ว 389 รายการ และงาน app separation/deployment parity กำลังดำเนินการ" : "HexaCore Phase 1 completed, 53 targeted tests passed at 100%, 389 backend tests verified, and app separation plus deployment parity remain active work." },
  ]

  const shockItems = [
    { label: "Language Paradox", value: isTh ? "ไม่ได้ใช้ภาษาอังกฤษเป็นหลัก — แต่สร้างภาษา Intent สากล (JITNA)" : "Doesn't primarily use English — yet created a universal intent language (JITNA)" },
    { label: "Resource Paradox", value: isTh ? "สร้าง AI-grade System ผ่านมือถือ Android เครื่องเดียว" : "Built an AI-grade system through a single Android mobile phone" },
    { label: "Constitution Shift", value: isTh ? "จากผู้ใช้ AI → ผู้กำหนดกรอบ Constitutional AI ของตนเอง" : "From AI user to defining an original Constitutional AI framework" },
    { label: "Scale Achievement", value: isTh ? "จาก prototype เชิงเอกสารสู่ engineering snapshot ที่มี backend tests ยืนยันแล้ว 389 รายการ และ targeted rollout เฉพาะทาง" : "From documentation-driven prototype to an engineering snapshot with 389 verified backend tests and targeted rollout milestones." },
  ]

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <main className="min-h-screen bg-background" id="main-content">
        <Navbar />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-amber/10 border border-warm-amber/30 text-warm-amber text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            {isTh ? "เกี่ยวกับผู้สร้างและ Ecosystem" : "About the Architect & Ecosystem"}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight text-balance">
            {isTh ? "จาก Chaos สู่ Architecture" : "From Chaos to Architecture"}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl mx-auto">
            {isTh
              ? "สถาปนิกคนเดียว มือถือเครื่องเดียว สมการเดียวที่เปลี่ยนทุกอย่าง"
              : "One architect. One mobile phone. One equation that changes everything."}
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {isTh
              ? "RCT Ecosystem ไม่ได้เกิดจากห้องแล็บหรือกองทุนร่วมลงทุน แต่เกิดจากประสบการณ์ชีวิตจริง ความเชื่อมั่นว่ามนุษย์คนเดียวที่มี Intent ชัดเจน สามารถออกแบบระบบที่เทียบเท่ากับสิ่งที่ทีมทั้งทีมสร้าง"
              : "RCT Ecosystem was born not from a lab or a venture fund — but from lived experience, relentless curiosity, and the conviction that a single human with clear intent can design systems that rival what entire teams build."}
          </p>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-warm-amber">
            {isTh ? "Constitutional AI Operating System • Linux for AI Agents" : "Constitutional AI Operating System • Linux for AI Agents"}
          </p>
        </div>
      </section>

      {/* ── Stats Bar ────────────────────────────────────────── */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="text-2xl font-bold text-warm-amber font-mono">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {platformHighlights.map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-base font-bold text-foreground">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Origin Story ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 text-warm-amber text-xs font-semibold uppercase tracking-wider">
              {isTh ? "เรื่องราวต้นกำเนิด" : "Origin Story"}
            </div>
            <h2 className="text-4xl font-bold text-foreground">
              {isTh ? "การเดินทางของ The Architect" : "The Architect's Journey"}
            </h2>
          </div>

          <div className="relative max-w-3xl mx-auto space-y-0">
            {/* Vertical line */}
            <div className="absolute left-8 top-6 bottom-6 w-px bg-linear-to-b from-warm-amber via-orange-400 to-warm-sage hidden md:block" />

            {journeyPhases.map((phase, i) => (
              <div key={i} className="relative flex items-start gap-6 md:gap-8 pb-10 last:pb-0">
                {/* Timeline dot */}
                <div className="relative z-10 shrink-0 w-16 h-16 rounded-2xl bg-card border border-border flex flex-col items-center justify-center text-2xl shadow-sm">
                  {phase.icon}
                </div>
                <div className="flex-1 bg-card border border-border rounded-xl p-5 hover:border-warm-amber/40 transition-colors">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-warm-amber uppercase tracking-widest">{phase.phase}</span>
                    <span className="text-xs text-muted-foreground font-mono ml-auto">{phase.period}</span>
                  </div>
                  <h3 className="text-base font-bold text-foreground mb-2">{phase.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-3">{phase.desc}</p>
                  <div className="text-xs text-warm-amber/80 font-medium">↳ {phase.impact}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FDIA Equation ────────────────────────────────────── */}
      <section className="bg-warm-charcoal text-warm-sand py-24">
        <div className="mx-auto max-w-7xl px-4 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/20 text-warm-amber text-xs font-semibold uppercase tracking-wider">
              {isTh ? "ปรัชญาหลัก" : "Core Philosophy"}
            </div>
            <h2 className="text-4xl font-bold text-warm-sand">
              {isTh ? "สมการที่กำกับทุกสิ่ง" : "The Equation That Governs Everything"}
            </h2>
            <div className="text-5xl md:text-7xl font-mono font-bold text-warm-amber tracking-wider py-6">
              F = (D<sup className="text-3xl">I</sup>) × A
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { symbol: "F", name: isTh ? "Future (อนาคต)" : "Future", desc: isTh ? "ผลลัพธ์ที่ออกแบบอย่างมีสติ ไม่ใช่ทำนาย" : "The constructed outcome — consciously designed, not predicted", color: "text-warm-amber border-warm-amber/40" },
              { symbol: "D", name: isTh ? "Data (ข้อมูล)" : "Data", desc: isTh ? "วัตถุดิบของความเป็นจริงทั้งหมด" : "Raw material of reality — all information", color: "text-warm-sky border-warm-sky/40" },
              { symbol: "I", name: isTh ? "Intent (เจตนา)" : "Intent", desc: isTh ? "ตัวขยายแบบ Exponential ที่ทวีคูณพลังของ Data" : "The exponential amplifier that multiplies Data's power", color: "text-orange-400 border-orange-400/40" },
              { symbol: "A", name: isTh ? "Architect (สถาปนิก)" : "Architect", desc: isTh ? "มนุษย์ที่ขาดไม่ได้ — ตัวแทนทางศีลธรรม" : "The indispensable human — the moral agent", color: "text-warm-sage border-warm-sage/40" },
            ].map((c) => (
              <div key={c.symbol} className={`p-4 rounded-xl border ${c.color} bg-white/5 text-center space-y-2`}>
                <div className={`text-3xl font-mono font-bold ${c.color.split(" ")[0]}`}>{c.symbol}</div>
                <div className="text-xs font-semibold text-warm-sand/80">{c.name}</div>
                <p className="text-xs text-warm-sand/60 leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-warm-sand/70 max-w-2xl mx-auto text-sm leading-relaxed">
            {isTh
              ? "นี่ไม่ใช่แค่สูตรสำหรับระบบ AI แต่เป็นสมการชีวิต: Data (ประสบการณ์) ยกกำลังด้วย Intent (เป้าหมาย) คูณด้วย Architect (ตัวแทนมนุษย์) สร้าง Future"
              : "This is not just a formula for AI systems. It is a life equation. Data (experiences) raised to the power of Intent (purpose) multiplied by the Architect (human agency) creates the Future."}
          </p>
        </div>
      </section>

      {/* ── 7 Genome System ──────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 text-warm-amber text-xs font-semibold uppercase tracking-wider">
              {isTh ? "DNA ของระบบ" : "System DNA"}
            </div>
            <h2 className="text-4xl font-bold text-foreground">{isTh ? "ระบบ 7 Genome" : "The 7 Genome System"}</h2>
            <p className="text-muted-foreground">
              {isTh
                ? "7 Genomes ที่เชื่อมต่อกันประกอบเป็น DNA ที่สมบูรณ์ของ RCT Ecosystem แต่ละตัวรับผิดชอบ Domain ที่สำคัญ"
                : "Seven interconnected genomes form the complete DNA of the RCT Ecosystem — each responsible for a critical domain."}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {genomes.map((g) => (
              <div key={g.id} className={`p-5 rounded-xl border ${g.color} bg-card`}>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono font-bold">G{g.id}</span>
                  <span className="text-xs font-semibold opacity-70 uppercase tracking-wider">{g.role}</span>
                </div>
                <h3 className="font-bold text-sm text-foreground mb-2">{g.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{g.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ──────────────────────────────────────── */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 text-warm-amber text-xs font-semibold uppercase tracking-wider">
              {isTh ? "ค่านิยมหลัก" : "Core Values"}
            </div>
            <h2 className="text-4xl font-bold text-foreground">{isTh ? "สิ่งที่เราเชื่อ" : "What We Believe"}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon
              return (
                <div key={i} className="p-6 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-colors">
                  <Icon className="w-10 h-10 text-warm-amber mb-4" />
                  <h3 className="text-lg font-bold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Shock Profile ────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 text-warm-amber text-xs font-semibold uppercase tracking-wider">
              Shock Profile
            </div>
            <h2 className="text-4xl font-bold text-foreground">
              {isTh ? "สิ่งที่ทำให้นี่พิเศษ" : "What Makes This Extraordinary"}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {shockItems.map((item) => (
              <div key={item.label} className="p-5 rounded-xl border border-warm-amber/30 bg-warm-amber/5">
                <div className="text-xs font-bold text-warm-amber uppercase tracking-wider mb-2">{item.label}</div>
                <p className="text-sm text-foreground leading-relaxed">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────── */}
      <section className="bg-muted/30 py-24">
        <div className="mx-auto max-w-7xl px-4 space-y-12">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warm-amber/10 text-warm-amber text-xs font-semibold uppercase tracking-wider">
              {isTh ? "วิวัฒนาการ" : "Evolution"}
            </div>
            <h2 className="text-4xl font-bold text-foreground">
              {isTh ? "เส้นทางจนถึงปัจจุบัน" : "The Journey So Far"}
            </h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-0">
            {timelineItems.map((item, i) => (
              <div key={i} className="flex gap-6 pb-8 last:pb-0">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 rounded-full bg-warm-amber/10 border border-warm-amber/40 flex flex-col items-center justify-center shrink-0">
                    <span className="text-warm-amber text-xs font-mono font-bold leading-tight">{item.version}</span>
                  </div>
                  {i < timelineItems.length - 1 && <div className="w-px flex-1 bg-border mt-2" />}
                </div>
                <div className="pt-2 pb-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-foreground">{item.title}</span>
                    <span className="text-xs text-muted-foreground font-mono">{item.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Architect Profile ────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="w-24 h-24 rounded-full bg-linear-to-br from-warm-amber/30 to-warm-sage/30 border-2 border-warm-amber/40 mx-auto flex items-center justify-center text-4xl">
            🏗️
          </div>
          <div className="space-y-2">
            <div className="text-xs font-semibold text-warm-amber uppercase tracking-widest">The Architect</div>
            <h2 className="text-3xl font-bold text-foreground">Ittirit Saengow</h2>
            <div className="text-lg text-muted-foreground">อิทธิฤทธิ์ แซ่โง้ว</div>
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {["Survivor Architect", "Architect of Intent", "Geneticist of Cognition"].map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-card border border-border text-xs font-medium text-muted-foreground">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <blockquote className="text-xl font-medium text-foreground italic border-l-4 border-warm-amber pl-6 text-left">
            {isTh
              ? '"AI ไม่ใช่พระเอก พระเอกตัวจริงคือ Intent ที่อยู่เบื้องหลัง และมนุษย์ผู้ลงนามการตัดสินใจสุดท้าย"'
              : '"AI is not the hero. The real hero is the Intent behind it, and the human who signs the final decision."'}
          </blockquote>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="bg-warm-charcoal py-24">
        <div className="mx-auto max-w-7xl px-4 text-center space-y-8">
          <h2 className="text-4xl font-bold text-warm-sand">
            {isTh ? "พร้อมที่จะสำรวจ Ecosystem?" : "Ready to Explore the Ecosystem?"}
          </h2>
          <p className="text-warm-sand/70 max-w-xl mx-auto">
            {isTh
              ? "เริ่มต้นด้วยเอกสาร FDIA Protocol หรือดูว่า RCT Labs แก้ปัญหา AI Hallucination ได้อย่างไร"
              : "Start with the FDIA Protocol documentation or see how RCT Labs solves AI hallucination at enterprise scale."}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-warm-amber hover:bg-[#C49A48] text-white gap-2">
              <Link href="/docs">{isTh ? "อ่านเอกสาร" : "Read Documentation"} <ArrowRight className="w-4 h-4" /></Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-warm-sand/30 text-warm-sand hover:bg-warm-sand/10">
              <Link href="/contact">{isTh ? "ติดต่อเรา" : "Get in Touch"}</Link>
            </Button>
            <Button size="lg" variant="ghost" asChild className="text-warm-sand/70 hover:text-warm-sand gap-1">
              <a href="https://github.com/rct-ecosystem" target="_blank" rel="noopener noreferrer">
                GitHub <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}
