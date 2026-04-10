"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FAQSection } from "@/components/faq-section"
import { m, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { ArrowRight, Layers, Cpu, Brain, Shield, Database, Network, Bot, AppWindow, RefreshCw } from "lucide-react"
import { LazyInteractiveArchDiagram } from "@/components/diagrams/lazy-diagram-wrapper"
import { SITE_MICROSERVICE_COUNT } from "@/lib/site-config"

const layers = {
  en: [
    { num: "L1", name: "Hardware Abstraction", desc: "GPU/TPU management, resource allocation, and infrastructure orchestration across cloud and edge deployments.", icon: Cpu, color: "#89B4C8" },
    { num: "L2", name: "Data Ingestion", desc: "Multi-modal data pipeline supporting text, images, audio, video, and structured datasets with real-time streaming.", icon: Database, color: "#7B9E87" },
    { num: "L3", name: "Knowledge Engine", desc: "Semantic indexing, vector search, and knowledge graph construction for intelligent information retrieval.", icon: Brain, color: "#D4A853" },
    { num: "L4", name: "Memory & Context", desc: "RCTDB v2.0 with the 8-dimensional universal memory schema — Identity, Sovereignty, Context, Payload, Value, Social, Delta, Verification — for persistent context across sessions and agents.", icon: Database, color: "#C4745B" },
    { num: "L5", name: "Reasoning Core", desc: "Multi-strategy reasoning including chain-of-thought, tree-of-thought, and hybrid approaches powered by the FDIA Equation.", icon: Brain, color: "#B8A9C9" },
    { num: "L6", name: "Multi-LLM Orchestration", desc: "HexaCore 7-model roster (3 Western: Claude/Gemini/Grok · 3 Eastern: Kimi/MiniMax/DeepSeek · 1 Regional: Typhoon G38 for Thai) with JITNA dynamic routing across all task types.", icon: Network, color: "#D4A853" },
    { num: "L7", name: "Agent Framework", desc: "Autonomous agent lifecycle management with JITNA Protocol for inter-agent communication and consensus.", icon: Bot, color: "#89B4C8" },
    { num: "L8", name: "Safety & Verification", desc: "Consensus-based verification, traceability, and policy controls designed to hold hallucination risk to 0.3% on benchmarked workloads.", icon: Shield, color: "#7B9E87" },
    { num: "L9", name: "Application Layer", desc: "Domain-specific assistants, enterprise workflows, and solution packages built on the shared platform core.", icon: AppWindow, color: "#C4745B" },
    { num: "L10", name: "Self-Evolving Orchestrator", desc: "Continuous self-improvement through performance monitoring, A/B testing, and adaptive algorithm selection.", icon: RefreshCw, color: "#B8A9C9" },
  ],
  th: [
    { num: "L1", name: "Hardware Abstraction", desc: "การจัดการ GPU/TPU การจัดสรรทรัพยากร และการจัดสรร Infrastructure ทั้ง Cloud และ Edge", icon: Cpu, color: "#89B4C8" },
    { num: "L2", name: "Data Ingestion", desc: "Data Pipeline แบบ Multi-modal รองรับ Text, Images, Audio, Video และ Structured Datasets พร้อม Real-time Streaming", icon: Database, color: "#7B9E87" },
    { num: "L3", name: "Knowledge Engine", desc: "Semantic Indexing, Vector Search และ Knowledge Graph สำหรับการดึงข้อมูลอัจฉริยะ", icon: Brain, color: "#D4A853" },
    { num: "L4", name: "Memory & Context", desc: "RCTDB v2.0 พร้อม Schema หน่วยความจำ 8 มิติ — Identity, Sovereignty, Context, Payload, Value, Social, Delta, Verification — สำหรับการเก็บ Context ถาวรข้าม Sessions และ Agents", icon: Database, color: "#C4745B" },
    { num: "L5", name: "Reasoning Core", desc: "การให้เหตุผลหลายกลยุทธ์รวม Chain-of-Thought, Tree-of-Thought กับเคลื่อนด้วยสมการ FDIA", icon: Brain, color: "#B8A9C9" },
    { num: "L6", name: "Multi-LLM Orchestration", desc: "HexaCore 7-Model Roster (3 Western: Claude/Gemini/Grok · 3 Eastern: Kimi/MiniMax/DeepSeek · 1 Regional: Typhoon G38 สำหรับภาษาไทย) คู่กับ JITNA Dynamic Routing", icon: Network, color: "#D4A853" },
    { num: "L7", name: "Agent Framework", desc: "การจัดการ Lifecycle ของ Agent อัตโนมัติพร้อม JITNA Protocol สำหรับการสื่อสารระหว่าง Agent", icon: Bot, color: "#89B4C8" },
    { num: "L8", name: "Safety & Verification", desc: "ชั้น consensus-based verification, traceability และ policy controls ที่ทำให้ hallucination risk เหลือ 0.3% ใน benchmark workloads", icon: Shield, color: "#7B9E87" },
    { num: "L9", name: "Application Layer", desc: "ชั้นสำหรับ assistants, enterprise workflows และ solution packages ที่สร้างบน platform core เดียวกัน", icon: AppWindow, color: "#C4745B" },
    { num: "L10", name: "Self-Evolving Orchestrator", desc: "การปรับปรุงตัวเองต่อเนื่องผ่าน Performance Monitoring, A/B Testing และ Adaptive Algorithm Selection", icon: RefreshCw, color: "#B8A9C9" },
  ],
}

const comparisons = {
  en: [
    { feature: "Architecture", rct: "10-Layer Cognitive Stack", others: "Monolithic / 2-3 layers" },
    { feature: "Memory", rct: "RCTDB v2.0 — 9D Schema", others: "No persistent memory" },
    { feature: "Hallucination", rct: "<0.3% on benchmarks (SignedAI)", others: "12-15% typical" },
    { feature: "Multi-LLM", rct: "7-model HexaCore, dynamic routing", others: "Single provider lock-in" },
    { feature: "Self-Improvement", rct: "L10 autonomous evolution", others: "Manual updates only" },
    { feature: "Protocol", rct: "JITNA open standard", others: "Proprietary APIs" },
  ],
  th: [
    { feature: "Architecture", rct: "10-Layer Cognitive Stack", others: "Monolithic / 2-3 ชั้น" },
    { feature: "Memory", rct: "RCTDB v2.0 — 9D Schema", others: "ไม่มี Persistent Memory" },
    { feature: "Hallucination", rct: "<0.3% บน benchmarks (SignedAI)", others: "12-15% ทั่วไป" },
    { feature: "Multi-LLM", rct: "7-model HexaCore, Dynamic Routing", others: "ผูกกับ Provider เดียว" },
    { feature: "Self-Improvement", rct: "L10 Autonomous Evolution", others: "อัปเดตด้วยมือเท่านั้น" },
    { feature: "Protocol", rct: "JITNA Open Standard", others: "Proprietary APIs" },
  ],
}

export default function ArchitecturePage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : ""
  const prefersReducedMotion = useReducedMotion()

  const localLayers = isTh ? layers.th : layers.en
  const localComparisons = isTh ? comparisons.th : comparisons.en

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-sky/10 border border-warm-sky/30 text-warm-sky text-sm font-medium">
            <Layers className="w-4 h-4" /> {isTh ? "สถาปัตยกรรม" : "Architecture"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            {isTh ? "สถาปัตยกรรม Cognitive 10 ชั้น" : "10-Layer Cognitive Architecture"}
          </h1>
          <p className="text-lg text-muted-foreground">
            {isTh
              ? "สถาปัตยกรรม 10 ชั้นที่ออกแบบสำหรับ Enterprise AI Infrastructure — ตั้งแต่ Hardware Abstraction ถึง Self-Evolving Orchestrator"
              : "A comprehensive 10-layer stack engineered for enterprise AI infrastructure — from hardware abstraction to autonomous improvement."}
          </p>
        </div>
      </section>

      {/* Why 10 Layers */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 space-y-4 text-muted-foreground text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground mb-6">{isTh ? "ทำไม 10 ชั้น?" : "Why 10 Layers?"}</h2>
          <p>{isTh
            ? "สถาปัตยกรรม Cognitive 10 ชั้นได้แรงบันดาลใจจากโมเดลเครือข่าย OSI แต่ออกแบบสำหรับระบบ AI แต่ละชั้นมีขอบเขตความรับผิดชอบชัดเจน ทำให้สามารถปรับขยาย ทดสอบ และพัฒนาแยกกันได้"
            : "Inspired by the OSI networking model but designed specifically for AI systems. Each layer has a clear responsibility boundary, enabling independent scaling, testing, and evolution."}</p>
          <p>{isTh
            ? "ต่างจาก AI Frameworks แบบ Monolithic แนวทาง Layered ช่วยให้สามารถนำชั้นเฉพาะมาใช้ทีละชั้น เช่น เริ่มจาก L6 สำหรับ Multi-LLM Orchestration เพิ่ม L8 สำหรับ Safety Verification จากนั้นขยายสู่ Full Stack ตามความต้องการ"
            : "Unlike monolithic AI frameworks, the layered approach allows enterprises to adopt specific layers incrementally. Start with L6 for orchestration, add L8 for safety, then expand as needs grow."}</p>
          <p>{isTh
            ? `ปัจจุบันสถาปัตยกรรมมี footprint ระดับ ${SITE_MICROSERVICE_COUNT}+ runtime components ที่กระจายข้าม 10 ชั้น และถูกออกแบบให้ขยายต่อได้โดยไม่ทำให้ governance หรือ observability แตกเป็นส่วนๆ`
            : `The architecture currently spans a ${SITE_MICROSERVICE_COUNT}+ runtime-component footprint across all 10 layers, with scaling designed to preserve governance, observability, and operational clarity.`}</p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16 md:py-20">
        <div className="max-w-4xl mx-auto mb-8 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-amber/10 border border-warm-amber/30 text-warm-amber text-sm font-medium">
            <Layers className="w-4 h-4" /> {isTh ? "Interactive Explorer" : "Interactive Explorer"}
          </span>
          <h2 className="mt-5 text-2xl sm:text-3xl font-bold text-foreground">
            {isTh ? "สำรวจแต่ละ Layer แบบโต้ตอบ" : "Explore Each Layer Interactively"}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
            {isTh
              ? "เลือกแต่ละชั้นเพื่อดู service groups และความสามารถหลักที่ประกอบเป็นสถาปัตยกรรม 10 ชั้นของ RCT"
              : "Select a layer to inspect the service groups and platform capabilities that make up the 10-layer RCT architecture."}
          </p>
        </div>
        <LazyInteractiveArchDiagram language={isTh ? "th" : "en"} />
      </section>

      {/* 10 Layers List */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-2xl font-bold text-foreground text-center mb-10">{isTh ? "ภาพรวม 10 ชั้นทั้งหมด" : "All 10 Layers at a Glance"}</h2>
        <div className="space-y-3">
          {localLayers.map((l, i) => (
            <m.div key={l.num} initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }} whileInView={prefersReducedMotion ? undefined : { opacity: 1, x: 0 }} viewport={{ once: true }} transition={prefersReducedMotion ? undefined : { duration: 0.22, delay: i * 0.02 }}
              className="flex gap-4 p-4 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-sm font-bold px-3 py-1 rounded-lg bg-warm-sky/10 text-warm-sky whitespace-nowrap">{l.num}</span>
                <l.icon size={18} style={{ color: l.color }} />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-foreground">{l.name}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{l.desc}</p>
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-10">{isTh ? "RCT เปรียบเทียบกับคู่แข่ง" : "How RCT Compares"}</h2>
          <div className="rounded-2xl border border-border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-card">
                  <th className="text-left p-4 text-foreground font-semibold">{isTh ? "คุณสมบัติ" : "Feature"}</th>
                  <th className="text-left p-4 text-warm-amber font-semibold">RCT Ecosystem</th>
                  <th className="text-left p-4 text-muted-foreground font-semibold">{isTh ? "คู่แข่ง" : "Others"}</th>
                </tr>
              </thead>
              <tbody>
                {localComparisons.map((row, i) => (
                  <tr key={i} className="border-t border-border">
                    <td className="p-4 text-foreground font-medium">{row.feature}</td>
                    <td className="p-4 text-warm-sage">{row.rct}</td>
                    <td className="p-4 text-muted-foreground">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Related Pages */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">{isTh ? "สำรวจเพิ่มเติม" : "Explore More"}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: `${localePrefix}/genome`, label: isTh ? "7 Genome System" : "7 Genome System", desc: isTh ? "ระบบย่อย DNA ที่ขับเคลื่อนแต่ละชั้น" : "The DNA subsystems that power each layer", icon: "🧬" },
            { href: `${localePrefix}/fdia`, label: isTh ? "สมการ FDIA" : "FDIA Equation", desc: isTh ? "แกนกลางทางคณิตศาสตร์ของ Reasoning Layer" : "The mathematical core of the Reasoning Layer", icon: "📐" },
            { href: `${localePrefix}/algorithms`, label: isTh ? "41 อัลกอริทึม" : "41 Algorithms", desc: isTh ? "กรอบงานอัลกอริทึม 41 รายการ แบ่งเป็น 9 capability tiers" : "A 41-algorithm framework organized across 9 capability tiers", icon: "⚡" },
            { href: `${localePrefix}/benchmark`, label: isTh ? "เกณฑ์มาตรฐาน" : "Benchmarks", desc: isTh ? "เมตริกประสิทธิภาพข้ามทุกชั้น" : "Performance metrics across all layers", icon: "📊" },
            { href: `${localePrefix}/integration`, label: isTh ? "การเชื่อมต่อ" : "Integration", desc: isTh ? "วิธี Deploy สถาปัตยกรรม 10 ชั้น" : "How to deploy the 10-layer stack", icon: "🔌" },
            { href: `${localePrefix}/solutions`, label: isTh ? "โซลูชัน" : "Solutions", desc: isTh ? "โซลูชัน Enterprise AI" : "Enterprise AI solutions", icon: "🛡️" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="block p-4 rounded-xl border border-border bg-card hover:border-warm-sky/50 transition-all">
              <span className="text-2xl mb-2 block">{link.icon}</span>
              <span className="font-semibold text-sm block mb-1 text-foreground">{link.label}</span>
              <span className="text-xs text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Test Infrastructure v5.4.5 */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <h2 className="text-2xl font-bold text-foreground text-center mb-2">{isTh ? "Test Infrastructure v5.4.5" : "Test Infrastructure v5.4.5"}</h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          {isTh ? "First ever 0-failure milestone — Mar 21, 2026" : "First ever 0-failure milestone — Mar 21, 2026"}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { value: "4,849", label: isTh ? "Tests Passed" : "Tests Passed", color: "#7B9E87" },
            { value: "0", label: isTh ? "Failures" : "Failures", color: "#C4745B" },
            { value: "6,738+", label: isTh ? "Total Tests" : "Total Tests", color: "#D4A853" },
            { value: "62", label: isTh ? "Microservices" : "Microservices", color: "#89B4C8" },
          ].map((s, i) => (
            <m.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="p-5 rounded-2xl border border-border bg-card text-center">
              <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
            </m.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">{isTh ? "พร้อม Build ด้วย 10-Layer Stack?" : "Ready to Build on the 10-Layer Stack?"}</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`${localePrefix}/contact`} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-warm-amber text-white font-medium text-sm hover:bg-[#C49A48] transition-colors">
              {isTh ? "ติดต่อทีม" : "Contact Us"} <ArrowRight size={16} />
            </Link>
            <Link href={`${localePrefix}/docs`} className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">
              {isTh ? "อ่าน Docs" : "Read Docs"}
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        items={[
          {
            question: isTh ? "สถาปัตยกรรม AI 10 ชั้นของ RCT Labs คืออะไร?" : "What is the RCT Labs 10-Layer AI Architecture?",
            answer: isTh
              ? "สถาปัตยกรรม AI 10 ชั้นคือ constitutional AI stack ที่ครอบคลุมตั้งแต่ hardware abstraction ที่ชั้น 1 ถึง self-evolving orchestration ที่ชั้น 10 แต่ละชั้นมีบทบาทชัดเจนในการรับรองว่า AI execution มีความถูกต้อง ตรวจสอบได้ และควบคุมได้"
              : "The RCT Labs 10-Layer Architecture is a constitutional AI stack spanning from hardware abstraction at layer 1 to self-evolving orchestration at layer 10. Each layer serves a distinct role in ensuring verifiable, auditable, and governed AI execution across enterprise deployments.",
          },
          {
            question: isTh ? "Multi-LLM consensus ทำงานอย่างไรในสถาปัตยกรรมนี้?" : "How does multi-LLM consensus work in the architecture?",
            answer: isTh
              ? "Multi-LLM consensus ทำงานที่ orchestration layer โดยโมเดล AI หลายตัวประเมิน request อย่างอิสระ และ consensus mechanism ที่ถูกควบคุมโดย constitutional rules จะกำหนดผลลัพธ์สุดท้าย ซึ่งช่วยลด bias และลดอัตราการ hallucination"
              : "Multi-LLM consensus operates at the orchestration layer, where multiple AI models independently evaluate a request and a consensus mechanism — governed by constitutional rules — determines the final response. This eliminates single-model bias and reduces hallucination rates.",
          },
          {
            question: isTh ? "Constitutional AI มีบทบาทอย่างไรในสถาปัตยกรรมของ RCT?" : "What is the role of constitutional AI in RCT's architecture?",
            answer: isTh
              ? "หลักการ Constitutional AI ถูกฝังอยู่ในทุกชั้นของ RCT stack โดยกำหนดสิ่งที่ระบบ AI สามารถและไม่สามารถทำได้ วิธีแก้ conflict และวิธีรักษา auditability ทำให้มั่นใจว่า AI decisions สอดคล้องกับ organizational policies"
              : "Constitutional AI principles are embedded at every layer of the RCT stack. They define what the AI system can and cannot do, how conflicts are resolved, and how auditability is maintained. This ensures AI decisions remain aligned with organizational policies and ethical constraints.",
          },
          {
            question: isTh ? "สถาปัตยกรรมมี runtime components กี่ตัว?" : "How many runtime components does the architecture include?",
            answer: isTh
              ? `สถาปัตยกรรม production มี ${SITE_MICROSERVICE_COUNT}+ runtime components กระจายอยู่ข้าม 10 ชั้น ครอบคลุม memory, routing, verification, orchestration และ self-evolution แต่ละ component deploy และ compose แยกกันได้`
              : `The production architecture includes ${SITE_MICROSERVICE_COUNT}+ runtime components distributed across 10 layers, covering memory, routing, verification, orchestration, and self-evolution. Each component is independently deployable and composable.`,
          },
          {
            question: isTh ? "สถาปัตยกรรมสามารถ deploy on-premise ได้ไหม?" : "Can the architecture be deployed on-premise?",
            answer: isTh
              ? "ได้ สถาปัตยกรรม RCT Labs รองรับการ deploy แบบ on-premise, hybrid และ cloud ลูกค้าองค์กรสามารถแยก Layer เฉพาะสำหรับ data sovereignty compliance โดยเฉพาะในตลาดที่มีการควบคุมเช่น PDPA ของไทย"
              : "Yes. The RCT Labs architecture supports on-premise, hybrid, and cloud deployment models. Enterprise clients can isolate specific layers for data sovereignty compliance, particularly in regulated markets such as Thailand under PDPA.",
          },
        ]}
        locale={isTh ? "th" : "en"}
        heading="Frequently Asked Questions"
        headingTh="คำถามที่พบบ่อย"
      />
      <Footer />
    </main>
  )
}
