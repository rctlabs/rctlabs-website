import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getDefinedTermSchema } from "@/lib/schema"

const glossaryTerms = [
  {
    term: "FDIA Equation",
    termTh: "สมการ FDIA",
    definition: "F = (D^I) × A — A constitutional equation where Future output (F) is determined by Data quality (D) raised to the power of Intent (I), multiplied by Architect authorization (A). When A=0, F=0 always.",
    definitionTh: "F = (D^I) × A — สมการรัฐธรรมนูญที่กำหนดคุณภาพผลลัพธ์ (F) จากคุณภาพข้อมูล (D) ยกกำลัง Intent (I) คูณด้วยการอนุมัติของ Architect (A) เมื่อ A=0 ผลลัพธ์จะเป็นศูนย์เสมอ",
    entityHref: "/en/entity/fdia-equation",
  },
  {
    term: "JITNA Protocol",
    termTh: "โปรโตคอล JITNA",
    definition: "Just In Time Nodal Assembly — an open agent-to-agent communication protocol (RFC-001 v2.0) often called 'the HTTP of Agentic AI.' Defines PROPOSE → COUNTER → ACCEPT negotiation flow with Ed25519 signatures.",
    definitionTh: "Just In Time Nodal Assembly — โปรโตคอลสื่อสารระหว่าง AI Agents แบบ open standard (RFC-001 v2.0) มักเรียกว่า 'HTTP ของ Agentic AI' กำหนด flow PROPOSE → COUNTER → ACCEPT พร้อมลายเซ็น Ed25519",
    entityHref: "/en/entity/jitna-protocol",
  },
  {
    term: "SignedAI",
    termTh: "SignedAI",
    definition: "The multi-LLM consensus verification system of the RCT Ecosystem. Routes critical queries through 4–8 models simultaneously and requires agreement before releasing results. Achieves 0.3% hallucination rate vs 12–15% industry average.",
    definitionTh: "ระบบตรวจสอบ consensus หลาย LLM ของ RCT Ecosystem ส่งคำถามสำคัญผ่าน 4–8 โมเดลพร้อมกัน และต้องการ agreement ก่อนส่งผลลัพธ์ ลด hallucination rate เหลือ 0.3%",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "RCTDB",
    termTh: "RCTDB (ฐานข้อมูลหน่วยความจำ AI)",
    definition: "Universal memory schema with 8 dimensions: query_hash, fdia_scores, subject_uuid, model_chain, consensus_result, delta_chain, timestamp, provenance. Enables PDPA-compliant right to erasure via UUID tombstone pattern.",
    definitionTh: "Schema หน่วยความจำ AI ที่ครอบคลุม 8 มิติ: query_hash, fdia_scores, subject_uuid, model_chain, consensus_result, delta_chain, timestamp, provenance รองรับ right to erasure ตาม PDPA",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "Delta Engine",
    termTh: "Delta Engine (เครื่องยนต์เดลต้า)",
    definition: "Memory compression system that stores only incremental state changes (deltas) rather than full state snapshots. Achieves 74% average lossless compression with sub-1ms reconstruction, enabling warm recall under 50ms.",
    definitionTh: "ระบบบีบอัดหน่วยความจำที่เก็บเฉพาะการเปลี่ยนแปลง (deltas) แทนสถานะเต็ม บีบอัดได้ 74% แบบ lossless พร้อม warm recall ต่ำกว่า 50ms",
    entityHref: "/en/entity/memory-architecture",
  },
  {
    term: "HexaCore",
    termTh: "HexaCore (โครงสร้าง 7 โมเดล AI)",
    definition: "The 7-model AI infrastructure of the RCT Ecosystem: 3 Western models + 3 Eastern models + 1 Thai regional model (Typhoon v2). Provides 3.74x cost reduction vs single-model deployments through intelligent task routing.",
    definitionTh: "โครงสร้าง AI 7 โมเดลของ RCT Ecosystem: โมเดลตะวันตก 3 ตัว + ตะวันออก 3 ตัว + ไทย 1 ตัว (Typhoon v2) ลดต้นทุน 3.74 เท่าด้วย intelligent routing",
    entityHref: "/en/entity/governance-layer",
  },
  {
    term: "Constitutional AI",
    termTh: "Constitutional AI (AI แบบรัฐธรรมนูญ)",
    definition: "A governance-oriented approach where model behavior and system operation are shaped by explicit rules, review logic, and safety boundaries rather than by output generation alone.",
    definitionTh: "แนวทางการออกแบบระบบ AI ที่กำหนดพฤติกรรมผ่านกฎ ขอบเขตความปลอดภัย และตรรกะการตรวจทานอย่างชัดเจน",
  },
  {
    term: "Dynamic Routing",
    termTh: "Dynamic Routing (การจัดเส้นทางแบบพลวัต)",
    definition: "Choosing different model or workflow paths depending on risk, complexity, cost, latency, or evaluation requirements rather than sending every request through the same path.",
    definitionTh: "การเลือกโมเดลหรือ workflow คนละเส้นทางตามระดับความเสี่ยง ความซับซ้อน ต้นทุน latency หรือเงื่อนไขการประเมิน",
  },
  {
    term: "Hallucination Control",
    termTh: "Hallucination Control (การควบคุมการหลอนของ AI)",
    definition: "The system-level discipline of reducing unsupported or overconfident outputs through retrieval quality, memory design, routing, verification, and evaluation loops.",
    definitionTh: "วินัยระดับระบบในการลดผลลัพธ์ที่ไร้หลักฐานหรือมั่นใจเกินจริง ผ่าน retrieval quality, memory design, routing, verification และ evaluation loops",
  },
  {
    term: "Verification",
    termTh: "Verification (การตรวจสอบยืนยัน)",
    definition: "A step that checks generated outputs against references, policies, rules, schemas, or second-pass evaluators before high-value actions are accepted.",
    definitionTh: "ขั้นตอนที่นำผลลัพธ์ไปตรวจเทียบกับแหล่งอ้างอิง policy rules schemas หรือ evaluator รอบที่สองก่อนยอมรับการใช้งานในงานมูลค่าสูง",
  },
  {
    term: "Intent Operations",
    termTh: "Intent Operations (ปฏิบัติการที่ขับเคลื่อนด้วยเจตนา)",
    definition: "A framing for AI behavior that emphasizes understanding goals, context, and constraints before deciding what actions or outputs should follow.",
    definitionTh: "กรอบคิดสำหรับ AI ที่ให้ความสำคัญกับการเข้าใจเป้าหมาย บริบท และข้อจำกัดก่อนตัดสินใจว่าจะตอบหรือกระทำอะไรต่อ",
  },
]

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Glossary — Constitutional AI, Routing, Memory, Verification, and Intent Operations",
    "Glossary — Constitutional AI, Routing, Memory, Verification และ Intent Operations",
    "A glossary of the core terms used across the RCT Labs ecosystem, covering constitutional AI, routing, memory, verification, intent operations, and hallucination control.",
    "คลังคำศัพท์ของแนวคิดหลักที่ใช้ในระบบนิเวศ RCT Labs ครอบคลุม constitutional AI, routing, memory, verification, intent operations และ hallucination control",
    "/glossary",
    ["AI glossary", "constitutional AI glossary", "enterprise AI terms"]
  )
}

export default async function GlossaryPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: isTh ? "หน้าแรก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: isTh ? "อภิธานศัพท์" : "Glossary", url: `https://rctlabs.co${localePrefix}/glossary` },
  ])

  const definedTermsSchema = glossaryTerms.map((t) =>
    getDefinedTermSchema(isTh ? t.termTh : t.term, isTh ? t.definitionTh : t.definition, `https://rctlabs.co${localePrefix}/glossary#${t.term.toLowerCase().replace(/\s+/g, '-')}`)
  )

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(definedTermsSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{isTh ? "อภิธานศัพท์" : "Glossary"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh ? "หน้าคำศัพท์หลักสำหรับอธิบายระบบแนว Ecosystem / OS ของ RCT ให้ค้นหา เข้าใจ และเชื่อมโยงไปยังหน้า authority อื่นได้ง่ายขึ้น" : "A concept hub for the core terms used across the RCT ecosystem, designed to improve discoverability, comprehension, and internal linking."}
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {glossaryTerms.map((entry) => (
            <div key={entry.term} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground">{isTh ? entry.termTh : entry.term}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{isTh ? entry.definitionTh : entry.definition}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "อ่านต่อ" : "Continue exploring"}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/methodology`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "วิธีวิทยา" : "Methodology"}</Link>
            <Link href={`${localePrefix}/evaluation`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "ศูนย์กลางการประเมิน" : "Evaluation"}</Link>
            <Link href={`${localePrefix}/architecture`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "สถาปัตยกรรม" : "Architecture"}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}