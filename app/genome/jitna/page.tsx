import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowLeft, Dna } from "lucide-react"
import AuthorBlock from "@/components/author-block"
import RelatedContent from "@/components/related-content"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "G3 — JITNA Genome: The Language of Agentic AI",
    "G3 — JITNA Genome: ภาษากลางของ Agentic AI",
    "JITNA is the universal communication protocol for AI agents — 6 primitives (I/D/Δ/A/R/M) that replace prompt engineering with structured intent. The HTTP of agentic AI.",
    "JITNA คือโปรโตคอลการสื่อสารสากลสำหรับ AI Agents — 6 Primitives (I/D/Δ/A/R/M) ที่แทนที่ Prompt Engineering ด้วย Structured Intent",
    "/genome/jitna",
    ["JITNA", "agentic AI language", "AI primitives", "intent protocol", "prompt engineering alternative", "I D Delta A R M"]
  )
}

const PRIMITIVES = [
  {
    symbol: "I",
    en: { name: "Intent", body: "The core 'what': a precise, machine-readable statement of what the agent is asked to achieve. Intent is not a prompt — it is a structured declaration that survives model version upgrades and API changes.", example: "I: Summarise Q4 financial report into 5 executive bullets" },
    th: { name: "Intent — เจตนา", body: "แก่น 'อะไร': การประกาศที่แม่นยำ อ่านได้ด้วยเครื่องของสิ่งที่ Agent ถูกถามให้บรรลุ Intent ไม่ใช่ Prompt แต่เป็นการประกาศที่มีโครงสร้างที่รอดจากการอัปเกรด Model Version และการเปลี่ยนแปลง API", example: "I: สรุปรายงานการเงิน Q4 เป็น 5 bullet ระดับผู้บริหาร" },
    color: "border-warm-amber/40 bg-warm-amber/5",
    accent: "text-warm-amber bg-warm-amber/10",
  },
  {
    symbol: "D",
    en: { name: "Data", body: "The inputs: files, database references, API endpoints, prior conversation context. Data declarations are explicit — no hidden state, no ambient context. What you declare is what the agent uses.", example: "D: file=reports/q4_2025.pdf, context=prior_summary_id:8821" },
    th: { name: "Data — ข้อมูล", body: "Input: ไฟล์, การอ้างอิงฐานข้อมูล, API Endpoints, Context การสนทนาก่อนหน้า การประกาศ Data ชัดเจน — ไม่มี Hidden State ไม่มี Ambient Context สิ่งที่ประกาศคือสิ่งที่ Agent ใช้", example: "D: file=reports/q4_2025.pdf, context=prior_summary_id:8821" },
    color: "border-sky-400/40 bg-sky-400/5",
    accent: "text-sky-400 bg-sky-400/10",
  },
  {
    symbol: "Δ",
    en: { name: "Delta", body: "The change specification: what should be different after this task completes vs. before. Delta is the success condition expressed as a differential — not 'write a report' but 'the report exists and contains bullets 1–5'. Without Delta, verification has no target.", example: "Δ: output=5_bullets, format=markdown, word_limit=30_per_bullet" },
    th: { name: "Delta — การเปลี่ยนแปลง", body: "ข้อกำหนดการเปลี่ยนแปลง: สิ่งที่ควรแตกต่างหลังจาก Task เสร็จสิ้นเทียบกับก่อน Delta คือเงื่อนไขความสำเร็จที่แสดงเป็น Differential — ไม่ใช่ 'เขียนรายงาน' แต่ 'รายงานมีอยู่และมี Bullets 1–5' หากไม่มี Delta การตรวจสอบจะไม่มีเป้าหมาย", example: "Δ: output=5_bullets, format=markdown, word_limit=30_per_bullet" },
    color: "border-emerald-500/40 bg-emerald-500/5",
    accent: "text-emerald-500 bg-emerald-500/10",
  },
  {
    symbol: "A",
    en: { name: "Action/Approach", body: "The execution constraints and human authority parameter. A=0 means zero output regardless of model confidence — the absolute constitutional kill switch. A=1 to A=5 define increasingly autonomous execution modes. This is how FDIA's F=(D^I)×A operationalises human sovereignty over AI.", example: "A: autonomy=3, model_tier=hexacore, max_cost=0.50usd" },
    th: { name: "Action/Approach — การกระทำ", body: "ข้อจำกัดการดำเนินการและพารามิเตอร์อำนาจของมนุษย์ A=0 หมายความว่า Output เป็นศูนย์โดยไม่คำนึงถึงความมั่นใจของโมเดล — Kill Switch รัฐธรรมนูญสัมบูรณ์ A=1 ถึง A=5 กำหนด Mode การดำเนินการที่เป็น Autonomous เพิ่มขึ้น นี่คือวิธีที่ F=(D^I)×A ของ FDIA Operationalise อธิปไตยของมนุษย์เหนือ AI", example: "A: autonomy=3, model_tier=hexacore, max_cost=0.50usd" },
    color: "border-rose-400/40 bg-rose-400/5",
    accent: "text-rose-400 bg-rose-400/10",
  },
  {
    symbol: "R",
    en: { name: "Reflection", body: "The post-execution self-assessment. Every completed task generates an R block: what worked, what degraded, what was uncertain. R blocks feed the WF-05 Reflector phase and are the raw material for JITNA's continuous self-improvement.", example: "R: accuracy_confidence=0.91, ambiguity_detected=false, latency=1.3s" },
    th: { name: "Reflection — การสะท้อน", body: "การประเมินตนเองหลังการดำเนินการ ทุก Task ที่เสร็จสิ้นสร้าง R Block: อะไรที่ทำงานได้ดี อะไรที่เสื่อมลง อะไรที่ไม่แน่นอน R Blocks ป้อน WF-05 Reflector Phase และเป็นวัตถุดิบสำหรับการปรับปรุงตนเองอย่างต่อเนื่องของ JITNA", example: "R: accuracy_confidence=0.91, ambiguity_detected=false, latency=1.3s" },
    color: "border-violet-400/40 bg-violet-400/5",
    accent: "text-violet-400 bg-violet-400/10",
  },
  {
    symbol: "M",
    en: { name: "Memory", body: "The persistence specification: what should be written to the RCT Knowledge Vault (long-term), session state (medium-term), or discarded. M declarations make memory explicit — agents cannot silently accumulate state without the human's declared permission.", example: "M: persist=summary, scope=project:q4, ttl=90days, vault=user_private" },
    th: { name: "Memory — ความจำ", body: "ข้อกำหนดความถาวร: อะไรควรเขียนไปยัง RCT Knowledge Vault (ระยะยาว), Session State (ระยะกลาง) หรือทิ้ง การประกาศ M ทำให้ Memory ชัดเจน — Agent ไม่สามารถสะสม State อย่างเงียบๆ โดยไม่ได้รับอนุญาตที่ประกาศไว้จากมนุษย์", example: "M: persist=summary, scope=project:q4, ttl=90days, vault=user_private" },
    color: "border-orange-400/40 bg-orange-400/5",
    accent: "text-orange-400 bg-orange-400/10",
  },
]

export default async function GenomeJitnaPage() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"

  const breadcrumb = getBreadcrumbSchema([
    { name: isTh ? "หน้าหลัก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "7 Genome System", url: `https://rctlabs.co${localePrefix}/genome` },
    { name: "JITNA Genome", url: `https://rctlabs.co${localePrefix}/genome/jitna` },
  ])

  const faq = getFAQSchema([
    {
      question: isTh ? "ทำไม JITNA ถึงถูกเรียกว่า 'HTTP of Agentic AI'?" : "Why is JITNA called the 'HTTP of Agentic AI'?",
      answer: isTh
        ? "HTTP กำหนดวิธีที่เว็บเบราว์เซอร์และเซิร์ฟเวอร์สื่อสาร — ไม่ว่าใครจะสร้าง JITNA กำหนดวิธีที่ AI Agents สื่อสาร Task และ Memory ในทุกโมเดลและทุกแพลตฟอร์ม เป็น Protocol Layer ไม่ใช่แค่ Prompt Format"
        : "HTTP defines how web browsers and servers communicate — regardless of who built them. JITNA defines how AI agents communicate tasks and memory across any model and any platform. It's a protocol layer, not merely a prompt format.",
    },
    {
      question: isTh ? "JITNA แทนที่ Prompt Engineering หรือไม่?" : "Does JITNA replace prompt engineering?",
      answer: isTh
        ? "ใช่ในระยะยาว Prompt Engineering ขึ้นอยู่กับ Model-Specific Phrasing ที่เสียหายเมื่อ Model เปลี่ยน JITNA ใช้ Primitives ที่มีโครงสร้างซึ่งแปลอัตโนมัติเป็น Optimal Prompt สำหรับแต่ละโมเดลใน Roster — มนุษย์ประกาศ Intent โมเดลรับ Instruction ที่เหมาะสมที่สุด"
        : "Yes, structurally. Prompt engineering relies on model-specific phrasing that breaks when models change. JITNA uses structured primitives that automatically translate into optimal prompt format for each model in the roster — humans declare intent, models receive optimally-formatted instructions.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
      <main className="min-h-screen bg-background">
        <Navbar />

        <section className="mx-auto max-w-4xl px-4 py-24">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href={`${localePrefix}/genome`}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {isTh ? "กลับไป 7 Genome System" : "Back to 7 Genome System"}
            </Link>
          </Button>

          <article className="space-y-14">
            {/* Header */}
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-500 text-xs font-medium">
                  <Dna className="w-3 h-3" /> G3 — {isTh ? "The Language" : "The Language"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">JITNA Genome</h1>
              <p className="text-xl text-foreground/70 max-w-2xl">
                {isTh
                  ? "ภาษากลาง 6 Primitives สำหรับ Agentic AI — HTTP ของยุค AI"
                  : "The universal 6-primitive language for agentic AI — the HTTP of the AI era."}
              </p>
            </div>

            {/* Tagline */}
            <div className="border border-emerald-500/20 bg-emerald-500/5 rounded-xl p-6">
              <p className="text-lg font-semibold text-foreground">
                {isTh
                  ? '"Prompt Engineering won\'t last. Protocols do."'
                  : '"Prompt Engineering won\'t last. Protocols do."'}
              </p>
              <p className="text-sm text-foreground/50 mt-2">
                {isTh
                  ? "JITNA RFC-001 — Open Protocol Specification, Apache 2.0"
                  : "JITNA RFC-001 — Open Protocol Specification, Apache 2.0"}
              </p>
            </div>

            {/* Primitives Table */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "6 Primitives: I / D / Δ / A / R / M" : "6 Primitives: I / D / Δ / A / R / M"}
              </h2>
              <div className="grid gap-4">
                {PRIMITIVES.map((p) => {
                  const t = isTh ? p.th : p.en
                  return (
                    <div key={p.symbol} className={`p-5 rounded-xl border ${p.color} space-y-3`}>
                      <div className="flex items-start gap-4">
                        <span className={`font-mono text-lg font-bold w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${p.accent}`}>{p.symbol}</span>
                        <div className="space-y-1">
                          <h3 className="font-bold text-foreground">{t.name}</h3>
                          <p className="text-sm text-foreground/70 leading-relaxed">{t.body}</p>
                          <code className="block mt-2 text-xs text-foreground/50 bg-foreground/5 px-3 py-2 rounded-lg font-mono">{t.example}</code>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Syntax Forms */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "3 รูปแบบ Syntax" : "3 Syntax Forms"}
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  {
                    en: { form: "Minimal", desc: "I + A only — fastest path, uses system defaults for D/Δ/R/M", use: "Quick queries, low-stakes tasks" },
                    th: { form: "Minimal", desc: "I + A เท่านั้น — เส้นทางเร็วที่สุด ใช้ Defaults ของระบบสำหรับ D/Δ/R/M", use: "คำถามด่วน Task ที่มีความเสี่ยงต่ำ" },
                  },
                  {
                    en: { form: "Standard", desc: "I + D + Δ + A — explicit inputs and success conditions, default memory", use: "Business tasks, report generation" },
                    th: { form: "Standard", desc: "I + D + Δ + A — Input และเงื่อนไขความสำเร็จที่ชัดเจน, Default Memory", use: "งานธุรกิจ การสร้างรายงาน" },
                  },
                  {
                    en: { form: "Full", desc: "All 6 primitives declared — complete audit trail, full memory control, explicit reflection", use: "Enterprise tasks, multi-step automation" },
                    th: { form: "Full", desc: "Primitives ทั้ง 6 ที่ประกาศ — Audit Trail สมบูรณ์ การควบคุม Memory เต็ม Reflection ชัดเจน", use: "งานระดับองค์กร Automation หลายขั้นตอน" },
                  },
                ].map((item, i) => {
                  const t = isTh ? item.th : item.en
                  return (
                    <div key={i} className="p-5 rounded-xl border border-border bg-card space-y-2">
                      <p className="font-bold text-foreground text-sm">{t.form}</p>
                      <p className="text-xs text-foreground/60 leading-relaxed">{t.desc}</p>
                      <p className="text-xs text-warm-amber mt-2">{isTh ? "ใช้สำหรับ: " : "Use for: "}{t.use}</p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Navigation */}
            <div className="border-t border-border pt-10 grid sm:grid-cols-2 gap-4">
              <Link
                href={`${localePrefix}/genome/artent`}
                className="flex items-center gap-3 p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-all group"
              >
                <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:text-warm-amber transition-colors" />
                <div>
                  <p className="text-xs font-mono text-foreground/40">G2</p>
                  <p className="font-bold text-foreground text-sm">ARTENT Genome</p>
                </div>
              </Link>
              <Link
                href={`${localePrefix}/genome/codex`}
                className="flex items-center justify-between p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-all group"
              >
                <div>
                  <p className="text-xs font-mono text-foreground/40">G4</p>
                  <p className="font-bold text-foreground text-sm">RCT Codex Genome</p>
                  <p className="text-xs text-foreground/50">{isTh ? "The Constitution — 10 Codices" : "The Constitution — 10 Codices"}</p>
                </div>
                <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:text-warm-amber transition-colors rotate-180" />
              </Link>
            </div>

            <RelatedContent
              title={isTh ? "เนื้อหาที่เกี่ยวข้อง" : "Related Content"}
              items={[
                { href: `${localePrefix}/protocols`, title: isTh ? "ข้อกำหนด Protocol" : "Protocol Specifications", description: isTh ? "โปรโตคอลทางเทคนิคที่ขับเคลื่อน RCT Ecosystem" : "The technical protocols powering the RCT Ecosystem.", category: "Protocols" },
                { href: `${localePrefix}/genome`, title: isTh ? "7 Genome System" : "7 Genome System", description: isTh ? "สำรวจ Genome ทั้ง 7 ตัวของ RCT Ecosystem" : "Explore all 7 Genomes of the RCT Ecosystem.", category: "Genome" },
                { href: `${localePrefix}/blog`, title: isTh ? "บทความวิจัย" : "Research & Blog", description: isTh ? "งานวิจัยและบทความเกี่ยวกับ AI จาก RCT Labs" : "Research papers and AI articles from RCT Labs.", category: "Research" },
              ]}
            />
            <AuthorBlock authorSlug="ittirit-saengow" locale={locale} />
          </article>
        </section>

        <Footer />
      </main>
    </>
  )
}
