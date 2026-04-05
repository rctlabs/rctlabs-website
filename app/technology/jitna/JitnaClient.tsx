"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { Zap, ArrowRight, GitBranch, Layers } from "lucide-react"

const jitnaprimitives = [
  {
    symbol: "I",
    name: "Intent",
    nameEn: "Intent",
    nameTh: "เจตนา",
    descEn: "The structured goal extracted from the input — what the user or system wants to achieve. JITNA parses the raw input into an IntentObject that captures goal, constraints, and priority.",
    descTh: "เป้าหมายที่มีโครงสร้างที่แยกออกมาจาก Input — สิ่งที่ผู้ใช้หรือระบบต้องการบรรลุ JITNA แยก Input ดิบออกเป็น IntentObject ที่จับ Goal, Constraints และลำดับความสำคัญ",
    color: "#D4A853",
  },
  {
    symbol: "D",
    name: "Data",
    nameEn: "Data",
    nameTh: "ข้อมูล",
    descEn: "The current state of available information — retrieved from RCTDB, external APIs, or context window. Represents what the system actually knows at routing time.",
    descTh: "สถานะปัจจุบันของข้อมูลที่มีอยู่ — ดึงมาจาก RCTDB, API ภายนอก หรือ Context Window แสดงถึงสิ่งที่ระบบรู้จริงๆ ในเวลา Routing",
    color: "#7B9E87",
  },
  {
    symbol: "Δ",
    name: "Delta",
    nameEn: "Delta (Gap)",
    nameTh: "เดลต้า (ช่องว่าง)",
    descEn: "The gap between Intent and Data (Δ = I − D). This delta drives the routing decision — a large delta means the system needs more capable models; a small delta allows lightweight routing.",
    descTh: "ช่องว่างระหว่าง Intent และ Data (Δ = I − D) เดลต้านี้ขับเคลื่อนการตัดสินใจ Routing — เดลต้าใหญ่หมายความว่าระบบต้องการโมเดลที่มีความสามารถสูงกว่า; เดลต้าเล็กอนุญาตให้ Routing แบบ Lightweight",
    color: "#C4745B",
  },
  {
    symbol: "A",
    name: "Approach",
    nameEn: "Approach",
    nameTh: "วิธีการ",
    descEn: "The selected algorithm tier and voting method — how JITNA will process the intent given the current delta. Chosen from 41 algorithms across 9 tiers based on task classification.",
    descTh: "Algorithm Tier และ Voting Method ที่เลือก — วิธีที่ JITNA จะประมวลผล Intent ตาม Delta ปัจจุบัน เลือกจาก 41 Algorithms ใน 9 Tiers ตามการจำแนก Task",
    color: "#89B4C8",
  },
  {
    symbol: "R",
    name: "Reflection",
    nameEn: "Reflection",
    nameTh: "การสะท้อน",
    descEn: "Self-evaluation of the output quality — SignedAI consensus scores across 8 dimensions. R is the feedback signal that informs whether the Approach succeeded or needs escalation.",
    descTh: "การประเมินตัวเองของคุณภาพ Output — คะแนน Consensus ของ SignedAI ใน 8 มิติ R คือ Feedback Signal ที่แจ้งว่า Approach ประสบความสำเร็จหรือต้องการ Escalation",
    color: "#B8A9C9",
  },
  {
    symbol: "M",
    name: "Memory",
    nameEn: "Memory",
    nameTh: "หน่วยความจำ",
    descEn: "Persistence of routing weights, proficiency scores, and outcome history in RCTDB 7D. M is what makes JITNA self-improving — each task updates the routing model for future decisions.",
    descTh: "การเก็บรักษา Routing Weights, คะแนนความเชี่ยวชาญ และประวัติผลลัพธ์ใน RCTDB 7D M คือสิ่งที่ทำให้ JITNA Self-Improving — ทุก Task อัปเดต Routing Model สำหรับการตัดสินใจในอนาคต",
    color: "#9B7BB8",
  },
]

const routingFactors = [
  { factor: "Task Type", descEn: "JITNA classifies the incoming intent (ANALYTICAL, CREATIVE, LEGAL, REGIONAL, etc.) and maps it to the best-suited model role.", descTh: "JITNA จำแนก Intent ขาเข้า (ANALYTICAL, CREATIVE, LEGAL, REGIONAL ฯลฯ) และแมปไปยัง Role โมเดลที่เหมาะสม", color: "#D4A853" },
  { factor: "Proficiency Score", descEn: "Each model has domain proficiency scores (0.0–1.0). JITNA uses these to weight model selection — Typhoon G38 scores th=0.99 for Thai tasks.", descTh: "แต่ละโมเดลมีคะแนนความเชี่ยวชาญ (0.0–1.0) JITNA ใช้น้ำหนักเหล่านี้ในการเลือกโมเดล — Typhoon G38 ได้ th=0.99 สำหรับภาษาไทย", color: "#7B9E87" },
  { factor: "Latency Budget", descEn: "Tasks with tight SLA requirements route to faster models (Grok 4.1 Fast, Gemini Flash). Complex tasks can use slower, more capable models.", descTh: "Task ที่มี SLA เข้มงวดจะ Route ไปยังโมเดลที่เร็วกว่า งาน Complex สามารถใช้โมเดลที่ช้าแต่มีความสามารถสูงกว่า", color: "#C4745B" },
  { factor: "Cost Optimization", descEn: "Simple queries route to cheaper models automatically. Complex tasks that need SignedAI consensus are escalated to full multi-model mode.", descTh: "Query ง่ายจะ Route ไปยังโมเดลราคาถูกโดยอัตโนมัติ Task ที่ซับซ้อนและต้องการ SignedAI Consensus จะถูก Escalate", color: "#89B4C8" },
  { factor: "Geo-Sovereignty", descEn: "Tasks flagged as regional (Thai, Japanese, etc.) are automatically routed to the matching regional model — Typhoon G38 for Thai tasks.", descTh: "Task ที่ถูกทำเครื่องหมายว่าเป็น Regional (ไทย ญี่ปุ่น ฯลฯ) จะถูก Route ไปยังโมเดล Regional ที่ตรงกันโดยอัตโนมัติ", color: "#B8A9C9" },
  { factor: "Feedback Weights", descEn: "After each ADAPT cycle, JITNA routing weights are updated based on outcome quality — the router continuously improves itself.", descTh: "หลังทุก ADAPT Cycle น้ำหนัก Routing ของ JITNA จะอัปเดตตามคุณภาพผลลัพธ์ — Router ปรับปรุงตัวเองอย่างต่อเนื่อง", color: "#9B7BB8" },
]

export default function JitnaClient({ locale: propLocale }: { locale?: string }) {
  const pathname = usePathname()
  const isTh = (propLocale ?? getLocaleFromPathname(pathname) ?? "en") === "th"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-sm font-medium"
            style={{ backgroundColor: "#C4745B15", borderColor: "#C4745B30", color: "#C4745B" }}>
            <Zap className="w-4 h-4" /> G3 — JITNA Genome
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            JITNA Protocol
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {isTh
              ? "Just-in-Time Neural Architecture — RFC-001 v2.0 — โปรโตคอล Routing แบบเปิดที่เลือก LLM, Algorithm Tier และ Voting Method ที่เหมาะสมที่สุดสำหรับทุก Task ใน Real-time ต่ำกว่า 50ms"
              : "Just-in-Time Neural Architecture — RFC-001 v2.0 — the open routing protocol that selects the optimal LLM, algorithm tier, and voting method for every task in real-time, under 50ms."}
          </p>
        </div>
      </section>

      {/* What JITNA is */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-3xl mx-auto px-4 space-y-4 text-muted-foreground text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground mb-4">{isTh ? "JITNA คืออะไร?" : "What is JITNA?"}</h2>
          <p>
            {isTh
              ? "JITNA (Just-in-Time Neural Architecture) คือโปรโตคอลแบบเปิดที่กำหนดวิธีที่ระบบ AI ควรเลือก, กำหนดเส้นทาง และประสานงานโมเดลภาษาหลายตัว แรงบันดาลใจมาจาก JIT Compilation ในวิศวกรรมซอฟต์แวร์ — ตัดสินใจ Routing ในช่วงเวลาที่เหมาะสม ไม่ใช่ตอน Compile"
              : "JITNA (Just-in-Time Neural Architecture) is an open protocol defining how AI systems should select, route, and coordinate multiple language models. Inspired by JIT compilation in software engineering — routing decisions made at exactly the right moment, not at compile time."}
          </p>
          <p>
            {isTh
              ? "ใน RCT Ecosystem JITNA ดำเนินการใน ROUTE state ของ IntentLoop ทุกครั้ง — รับ IntentObject ที่แยกส่วนแล้วจาก PARSE state และตัดสินใจใน Real-time ว่าจะใช้โมเดลใด Algorithm Tier ใด และ Voting Method ใด"
              : "In the RCT Ecosystem, JITNA executes in the ROUTE state of every IntentLoop cycle — receiving the parsed IntentObject from the PARSE state and making real-time decisions on which models, algorithm tiers, and voting methods to invoke."}
          </p>
        </div>
      </section>

      {/* 6 JITNA Primitives */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-medium mb-4"
            style={{ backgroundColor: "#C4745B15", borderColor: "#C4745B30", color: "#C4745B" }}>
            <Layers className="w-3 h-3" /> ALGO-06 — Internal Architecture
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {isTh ? "6 Primitives ของ JITNA" : "6 JITNA Primitives"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            {isTh
              ? "ทุกการตัดสินใจ Routing ของ JITNA สร้างขึ้นจาก 6 Primitive เหล่านี้ — ตัวแปรพื้นฐานที่ประกอบกันเป็น Routing Engine"
              : "Every JITNA routing decision is built from these 6 primitives — the fundamental variables that compose the routing engine."}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jitnaprimitives.map((p, i) => (
            <m.div key={p.symbol} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="p-5 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold font-mono"
                  style={{ backgroundColor: `${p.color}18`, color: p.color }}>{p.symbol}</span>
                <div>
                  <div className="text-sm font-bold text-foreground">{isTh ? p.nameTh : p.nameEn}</div>
                  <div className="text-xs font-mono" style={{ color: p.color }}>{p.name}</div>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{isTh ? p.descTh : p.descEn}</p>
            </m.div>
          ))}
        </div>
        <m.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="mt-6 p-4 rounded-xl border border-border bg-muted/20 text-center">
          <p className="text-xs text-muted-foreground font-mono">
            {isTh
              ? "สูตร JITNA: Δ = I − D → เลือก A → Execute → R → อัปเดต M"
              : "JITNA formula: Δ = I − D → select A → Execute → R → update M"}
          </p>
        </m.div>
      </section>

      {/* 6 Routing Factors */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {isTh ? "6 ปัจจัยที่ JITNA ใช้ตัดสินใจ" : "6 Factors JITNA Uses to Route"}
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-xl mx-auto">
            {isTh
              ? "ทุกคำตัดสินใจถูกทำในเวลา <50ms โดยใช้ปัจจัยเหล่านี้ร่วมกัน"
              : "Every routing decision is made in <50ms by evaluating all 6 factors simultaneously."}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          {routingFactors.map((f, i) => (
            <m.div key={f.factor} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              className="p-6 rounded-xl border border-border bg-card">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: f.color }} />
                <span className="text-sm font-bold font-mono" style={{ color: f.color }}>{f.factor}</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{isTh ? f.descTh : f.descEn}</p>
            </m.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-muted/30 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { value: "<50ms", label: isTh ? "Routing Latency" : "Routing Latency", color: "#D4A853" },
              { value: "7", label: isTh ? "โมเดลในคลัง" : "Models in Roster", color: "#7B9E87" },
              { value: "41", label: isTh ? "Algorithm Options" : "Algorithm Options", color: "#C4745B" },
              { value: "4", label: isTh ? "Voting Methods" : "Voting Methods", color: "#89B4C8" },
            ].map((s, i) => (
              <m.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="p-5 rounded-2xl border border-border bg-card text-center">
                <div className="text-3xl font-bold" style={{ color: s.color }}>{s.value}</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.label}</div>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* RFC Reference */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <div className="p-6 sm:p-8 rounded-2xl border border-border bg-card">
          <div className="flex items-center gap-2 mb-3">
            <GitBranch size={18} className="text-warm-amber" />
            <span className="text-sm font-bold font-mono text-foreground">JITNA RFC-001 v2.0</span>
          </div>
          <p className="text-sm leading-relaxed text-muted-foreground mb-4">
            {isTh
              ? "JITNA RFC-001 v2.0 เป็นข้อกำหนดเปิดที่ระบุ: Routing Decision Tree, IntentObject Schema, Model Proficiency Score Format, Voting Method Eligibility Rules และ Feedback Weight Update Algorithm"
              : "JITNA RFC-001 v2.0 is the open specification defining: the Routing Decision Tree, IntentObject Schema, Model Proficiency Score format, Voting Method eligibility rules, and Feedback Weight Update algorithm."}
          </p>
          <div className="flex gap-3">
            <Link href="/open-protocol" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-warm-amber text-white text-xs font-semibold">
              {isTh ? "Open Protocol" : "Open Protocol"} <ArrowRight size={12} />
            </Link>
            <Link href="/solutions/dynamic-ai-routing" className="inline-flex items-center px-4 py-2 rounded-lg border border-border text-foreground text-xs font-semibold">
              {isTh ? "JITNA in Action" : "JITNA in Action"}
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-5xl px-4 pb-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { href: "/genome", icon: "🧬", label: "G3 JITNA Genome", desc: isTh ? "JITNA ใน Context ของ 7 Genome System" : "JITNA in the 7 Genome System context" },
            { href: "/technology/rct-7", icon: "🧠", label: "RCT-7 Mental OS", desc: isTh ? "JITNA รันใน ROUTE state ของ IntentLoop" : "JITNA runs in the ROUTE state of IntentLoop" },
            { href: "/technology/constitutional-ai", icon: "⚖️", label: "Constitutional AI", desc: isTh ? "ผลลัพธ์ JITNA Routing ถูกจำกัดด้วยกฎ Constitutional AI" : "JITNA routing output is constrained by Constitutional AI rules" },
            { href: "/solutions/regional-ai", icon: "🌏", label: "Regional AI", desc: isTh ? "JITNA Routing ไปยัง Typhoon G38 สำหรับภาษาไทย" : "JITNA routing to Typhoon G38 for Thai tasks" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="block p-4 rounded-xl border border-border bg-card hover:border-warm-amber/50 transition-all">
              <span className="text-2xl mb-2 block">{link.icon}</span>
              <span className="font-semibold text-sm block mb-1 text-foreground">{link.label}</span>
              <span className="text-xs text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
