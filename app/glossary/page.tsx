import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"

const glossaryTerms = [
  {
    term: "Constitutional AI",
    definition: "A governance-oriented approach where model behavior and system operation are shaped by explicit rules, review logic, and safety boundaries rather than by output generation alone.",
  },
  {
    term: "Dynamic Routing",
    definition: "Choosing different model or workflow paths depending on risk, complexity, cost, latency, or evaluation requirements rather than sending every request through the same path.",
  },
  {
    term: "Enterprise AI Memory",
    definition: "A governed memory model for preserving relevant context, durable knowledge, working state, and audit history across enterprise AI workflows.",
  },
  {
    term: "Verification",
    definition: "A step that checks generated outputs against references, policies, rules, schemas, or second-pass evaluators before high-value actions are accepted.",
  },
  {
    term: "Intent Operations",
    definition: "A framing for AI behavior that emphasizes understanding goals, context, and constraints before deciding what actions or outputs should follow.",
  },
  {
    term: "Hallucination Control",
    definition: "The system-level discipline of reducing unsupported or overconfident outputs through retrieval quality, memory design, routing, verification, and evaluation loops.",
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
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Glossary", url: `https://rctlabs.co${localePrefix}/glossary` },
  ])

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{isTh ? "Glossary" : "Glossary"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh ? "หน้าคำศัพท์หลักสำหรับอธิบายระบบแนว Ecosystem / OS ของ RCT ให้ค้นหา เข้าใจ และเชื่อมโยงไปยังหน้า authority อื่นได้ง่ายขึ้น" : "A concept hub for the core terms used across the RCT ecosystem, designed to improve discoverability, comprehension, and internal linking."}
          </p>
        </div>

        <div className="mt-10 grid gap-5">
          {glossaryTerms.map((entry) => (
            <div key={entry.term} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-2xl font-semibold text-foreground">{entry.term}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{entry.definition}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "อ่านต่อ" : "Continue exploring"}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/methodology`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "Methodology" : "Methodology"}</Link>
            <Link href={`${localePrefix}/evaluation`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "Evaluation" : "Evaluation"}</Link>
            <Link href={`${localePrefix}/architecture`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "Architecture" : "Architecture"}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}