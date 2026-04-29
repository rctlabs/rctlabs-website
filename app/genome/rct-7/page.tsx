import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import Link from "next/link"
import { ArrowLeft, RefreshCw, Dna } from "lucide-react"
import AuthorBlock from "@/components/author-block"
import RelatedContent from "@/components/related-content"
import { Button } from "@/components/ui/button"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "G7 — RCT-7 Genome: Continuous Improvement Framework",
    "G7 — RCT-7 Genome: ระบบปรับปรุงต่อเนื่อง",
    "The RCT-7 Genome is the Mental OS and self-evolution engine of RCT Labs — 4 improvement variants (RCT-S, RCT-I, RCT-V, RCT-F) that feed system-wide learning back to G1 (Architect's Genome).",
    "RCT-7 Genome คือ Mental OS และ Self-Evolution Engine ของ RCT Labs — 4 Variants (RCT-S, RCT-I, RCT-V, RCT-F) ที่ป้อน Learning กลับไปยัง G1",
    "/genome/rct-7",
    ["RCT-7", "continuous improvement AI", "RCT-S RCT-I RCT-V RCT-F", "AI self-evolution", "mental OS", "IntentLoop"]
  )
}

const VARIANTS = [
  {
    id: "RCT-S",
    en: {
      name: "Systemic",
      tagline: "4-Step system-level improvement",
      steps: ["OBSERVE — Monitor system-wide performance metrics across all 7 genomes", "ANALYZE — Identify root cause of metric divergence (not symptoms)", "REDESIGN — Propose architectural changes at genome level (requires Codex review)", "VALIDATE — A/B test redesign against baseline; constitutional review before deploy"],
      use: "Core architecture changes, new genome-level rules, major capability expansions",
    },
    th: {
      name: "Systemic — การปรับปรุงระดับระบบ",
      tagline: "4 ขั้นตอนการปรับปรุงระดับระบบ",
      steps: ["OBSERVE — ตรวจสอบ Metrics ประสิทธิภาพทั่วทั้งระบบใน 7 Genomes", "ANALYZE — ระบุสาเหตุหลักของการแยก Metrics (ไม่ใช่อาการ)", "REDESIGN — เสนอการเปลี่ยนแปลงสถาปัตยกรรมที่ระดับ Genome (ต้องการการตรวจสอบ Codex)", "VALIDATE — A/B Test การปรับออกแบบเทียบกับ Baseline; การตรวจสอบรัฐธรรมนูญก่อน Deploy"],
      use: "การเปลี่ยนแปลงสถาปัตยกรรมหลัก กฎระดับ Genome ใหม่ การขยายความสามารถหลัก",
    },
    color: "border-warm-amber/30 bg-warm-amber/5",
    accent: "text-warm-amber",
  },
  {
    id: "RCT-I",
    en: {
      name: "Interpretation",
      tagline: "7-Step intent-level improvement",
      steps: [
        "RECEIVE — Collect intent classification failures from WF-00 Interpreter logs",
        "DECODE — Map failure patterns to ambiguity categories",
        "HYPOTHESIZE — Generate candidate disambiguation rules",
        "TEST — Run candidates against historical false-classification corpus",
        "COMPARE — Score candidates against current classifier performance",
        "INTEGRATE — Merge winning rules into JITNA I-primitive schema",
        "MONITOR — Track live classification accuracy for 30-day stability window",
      ],
      use: "JITNA protocol improvements, intent schema updates, classification accuracy",
    },
    th: {
      name: "Interpretation — การปรับปรุงระดับ Intent",
      tagline: "7 ขั้นตอนการปรับปรุงระดับ Intent",
      steps: [
        "RECEIVE — รวบรวมความล้มเหลวในการจำแนก Intent จาก Log WF-00 Interpreter",
        "DECODE — แมปรูปแบบความล้มเหลวไปยังหมวดหมู่ความกำกวม",
        "HYPOTHESIZE — สร้างกฎการ Disambiguation ที่เป็น Candidate",
        "TEST — รัน Candidates กับ Corpus การจำแนกผิดในอดีต",
        "COMPARE — ให้คะแนน Candidates เทียบกับประสิทธิภาพ Classifier ปัจจุบัน",
        "INTEGRATE — รวมกฎที่ชนะเข้าใน Schema JITNA I-Primitive",
        "MONITOR — ติดตามความถูกต้องในการจำแนก Live สำหรับ Window ความเสถียร 30 วัน",
      ],
      use: "การปรับปรุงโปรโตคอล JITNA, การอัปเดต Intent Schema, ความถูกต้องในการจำแนก",
    },
    color: "border-sky-400/30 bg-sky-400/5",
    accent: "text-sky-400",
  },
  {
    id: "RCT-V",
    en: {
      name: "Visual",
      tagline: "Visual output and UX improvement loop",
      steps: ["CAPTURE — Record user interaction patterns with visual outputs", "CLUSTER — Group interaction patterns by output type and user segment", "REDESIGN — Update visual output templates based on cluster analysis", "DEPLOY — Progressive rollout with satisfaction measurement"],
      use: "UI layout improvements, visual output quality, dashboard enhancements",
    },
    th: {
      name: "Visual — การปรับปรุง Visual Output",
      tagline: "Loop การปรับปรุง Visual Output และ UX",
      steps: ["CAPTURE — บันทึกรูปแบบการโต้ตอบของผู้ใช้กับ Visual Outputs", "CLUSTER — จัดกลุ่มรูปแบบการโต้ตอบตาม Output Type และ User Segment", "REDESIGN — อัปเดตเทมเพลต Visual Output ตามการวิเคราะห์ Cluster", "DEPLOY — Progressive Rollout พร้อมการวัดความพึงพอใจ"],
      use: "การปรับปรุง Layout UI, คุณภาพ Visual Output, การปรับปรุง Dashboard",
    },
    color: "border-emerald-500/30 bg-emerald-500/5",
    accent: "text-emerald-500",
  },
  {
    id: "RCT-F",
    en: {
      name: "Framework Expansion",
      tagline: "4-Dimension new capability framework",
      steps: ["IDENTIFY — Define the new capability's scope and constitutional impact (Codex 09 review)", "DESIGN — Build with mandatory Janus Destroy-face (Codex 10 compliance)", "PILOT — Controlled rollout to 1% of sessions with full telemetry", "SCALE — Progressive expansion with constitutional gate at each tier (1% → 10% → 100%)"],
      use: "New product features, new genome additions, major autonomy level changes",
    },
    th: {
      name: "Framework Expansion — การขยาย Framework",
      tagline: "4 มิติสำหรับ Framework ความสามารถใหม่",
      steps: ["IDENTIFY — กำหนดขอบเขตความสามารถใหม่และผลกระทบตามรัฐธรรมนูญ (การตรวจสอบ Codex 09)", "DESIGN — สร้างด้วย Janus Destroy-Face ที่บังคับ (การปฏิบัติตาม Codex 10)", "PILOT — Rollout แบบควบคุมไปยัง 1% ของ Sessions พร้อม Full Telemetry", "SCALE — การขยายแบบ Progressive พร้อม Constitutional Gate ที่แต่ละ Tier (1% → 10% → 100%)"],
      use: "ฟีเจอร์ Product ใหม่, การเพิ่ม Genome ใหม่, การเปลี่ยนแปลง Autonomy Level หลัก",
    },
    color: "border-violet-400/30 bg-violet-400/5",
    accent: "text-violet-400",
  },
]

export default async function GenomeRCT7Page() {
  const locale = await getRequestLocale()
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"

  const breadcrumb = getBreadcrumbSchema([
    { name: isTh ? "หน้าหลัก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "7 Genome System", url: `https://rctlabs.co${localePrefix}/genome` },
    { name: "RCT-7 Genome", url: `https://rctlabs.co${localePrefix}/genome/rct-7` },
  ])

  const faq = getFAQSchema([
    {
      question: isTh ? "RCT-7 Genome ส่ง Performance Signals กลับไป G1 อย่างไร?" : "How does RCT-7 Genome feed performance signals back to G1?",
      answer: isTh
        ? "WF-05 Reflector Phase รวบรวม Delta Signals จากทุก Task ใน Pipeline RCT-7 Genome ใช้สัญญาณเหล่านี้เพื่อกำหนดว่า Variant ใด (RCT-S/I/V/F) เหมาะสมที่สุด จากนั้น Proposed Updates ถูกส่งไปยัง G1 Architect's Genome ผ่าน Meta-Phase โดยต้องการการตรวจสอบจากมนุษย์ก่อน Genome-Level Changes"
        : "The WF-05 Reflector Phase collects delta signals from every task in the pipeline. The RCT-7 Genome uses these signals to determine which variant (RCT-S/I/V/F) is appropriate. Proposed updates are then sent to G1 Architect's Genome via the Meta-Phase, requiring human review before any genome-level changes.",
    },
    {
      question: isTh ? "RCT-7 เป็น 'Self-Improving AI' หรือไม่?" : "Is RCT-7 a 'self-improving AI'?",
      answer: isTh
        ? "RCT-7 เป็นระบบ Self-Learning ไม่ใช่ Self-Modifying อัตโนมัติ มันเรียนรู้รูปแบบและเสนอ Updates แต่การเปลี่ยนแปลงทุกอย่างที่ระดับ Genome ต้องผ่านการตรวจสอบจากมนุษย์ก่อน (Codex 09 และ Codex 10) Autonomous Self-Modification โดยไม่มีการ Override ของมนุษย์ถือเป็นการละเมิด Codex"
        : "RCT-7 is self-learning, not autonomously self-modifying. It learns patterns and proposes updates, but every genome-level change must pass human review first (Codex 09 and Codex 10). Autonomous self-modification without human override is a Codex violation.",
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
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-medium">
                  <Dna className="w-3 h-3" /> G7 — {isTh ? "IMPROVEMENT" : "IMPROVEMENT"}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-foreground">RCT-7 Genome</h1>
              <p className="text-xl text-foreground/70 max-w-2xl">
                {isTh
                  ? "Mental OS และ Self-Evolution Engine — ระบบที่เรียนรู้และปรับปรุงตนเองอย่างต่อเนื่อง"
                  : "Mental OS and Self-Evolution Engine — a system that continuously learns and improves itself."}
              </p>
            </div>

            {/* Principle */}
            <div className="border border-cyan-400/20 bg-cyan-400/5 rounded-xl p-6 flex gap-4">
              <RefreshCw className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-2">
                  {isTh ? "วงจรต่อเนื่อง: G7 → G1 → G2 → ... → G7" : "Continuous Cycle: G7 → G1 → G2 → ... → G7"}
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  {isTh
                    ? "RCT-7 เป็น Genome สุดท้ายในวงจรแต่ไม่ใช่จุดสิ้นสุด สัญญาณที่ G7 สร้างป้อนกลับไปยัง G1 (Architect's Genome) เพื่อให้ 'WHY' ของระบบพัฒนาตามประสบการณ์โลกจริง วงจรนี้คือสิ่งที่ทำให้ RCT Ecosystem ไม่ใช่แค่ชุดเครื่องมือ แต่เป็น System ที่มีชีวิต"
                    : "RCT-7 is the final genome in the cycle but not the endpoint. The signals G7 generates feed back into G1 (Architect's Genome), allowing the system's 'WHY' to evolve with real-world experience. This cycle is what makes the RCT Ecosystem not merely a tool suite, but a living system."}
                </p>
              </div>
            </div>

            {/* 4 Variants */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "4 Variants การปรับปรุง" : "4 Improvement Variants"}
              </h2>
              <div className="space-y-5">
                {VARIANTS.map((variant) => {
                  const t = isTh ? variant.th : variant.en
                  return (
                    <div key={variant.id} className={`p-6 rounded-xl border ${variant.color} space-y-4`}>
                      <div className="flex items-start gap-3">
                        <span className={`font-mono text-sm font-bold px-2 py-0.5 rounded border ${variant.color} ${variant.accent}`}>{variant.id}</span>
                        <div>
                          <h3 className="font-bold text-foreground">{t.name}</h3>
                          <p className="text-xs text-foreground/50 mt-0.5">{t.tagline}</p>
                        </div>
                      </div>
                      <ol className="space-y-2">
                        {t.steps.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-foreground/70">
                            <span className={`font-mono text-xs font-bold shrink-0 mt-0.5 ${variant.accent}`}>{String(i + 1).padStart(2, "0")}</span>
                            <span className="leading-relaxed">{step}</span>
                          </li>
                        ))}
                      </ol>
                      <div className="pt-2 border-t border-foreground/10">
                        <p className="text-xs text-foreground/40">
                          {isTh ? "ใช้สำหรับ: " : "Use for: "}<span className="text-foreground/60">{t.use}</span>
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* IntentLoop */}
            <div className="space-y-5">
              <h2 className="text-2xl font-bold text-foreground">
                {isTh ? "IntentLoop 7 สถานะ" : "7-State IntentLoop"}
              </h2>
              <div className="flex flex-wrap gap-2 items-center">
                {["IDLE", "RECEIVE", "PARSE", "ROUTE", "EXECUTE", "VERIFY", "ADAPT"].map((state, i, arr) => (
                  <div key={state} className="flex items-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-foreground/5 border border-foreground/10 text-foreground/70 font-mono">{state}</span>
                    {i < arr.length - 1 && <span className="text-foreground/30 text-sm">→</span>}
                  </div>
                ))}
                <span className="text-foreground/30 text-sm">→</span>
                <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-mono">↻ G1</span>
              </div>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {isTh
                  ? "ทุก Agent Session รัน IntentLoop 7 สถานะนี้ ADAPT คือสถานะที่ 7 ที่สำคัญ — มันไม่ใช่แค่การส่ง Output แต่เป็นการเขียน Learnings กลับเข้าสู่ Sistema ก่อนที่ Loop ถัดไปจะเริ่ม ทำให้แต่ละ Interaction ทิ้งระบบในสถานะที่ฉลาดกว่าเล็กน้อย"
                  : "Every agent session runs this 7-state IntentLoop. ADAPT is the critical seventh state — it does not merely deliver output, but writes learnings back into the system before the next loop begins. This ensures each interaction leaves the system marginally smarter than before."}
              </p>
            </div>

            {/* Navigation — Complete the cycle */}
            <div className="border-t border-border pt-10">
              <p className="text-sm text-foreground/40 text-center mb-5">
                {isTh ? "— วงจรเสร็จสมบูรณ์ — G7 กลับสู่ G1 —" : "— Cycle complete — G7 returns to G1 —"}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                <Link
                  href={`${localePrefix}/genome/vault`}
                  className="flex items-center gap-3 p-5 rounded-xl border border-border bg-card hover:border-warm-amber/40 transition-all group"
                >
                  <ArrowLeft className="w-4 h-4 text-foreground/30 group-hover:text-warm-amber transition-colors" />
                  <div>
                    <p className="text-xs font-mono text-foreground/40">G6</p>
                    <p className="font-bold text-foreground text-sm">RCT Knowledge Vault Genome</p>
                  </div>
                </Link>
                <Link
                  href={`${localePrefix}/genome/architect`}
                  className="flex items-center justify-between p-5 rounded-xl border border-cyan-400/30 bg-cyan-400/5 hover:border-cyan-400/60 transition-all group"
                >
                  <div>
                    <p className="text-xs font-mono text-foreground/40">G1 ↻</p>
                    <p className="font-bold text-foreground text-sm">Architect's Genome</p>
                    <p className="text-xs text-foreground/50">{isTh ? "วงจรเริ่มใหม่" : "Cycle begins again"}</p>
                  </div>
                  <RefreshCw className="w-4 h-4 text-cyan-400" />
                </Link>
              </div>
            </div>

            <AuthorBlock authorSlug="ittirit-saengow" locale={locale} />
          </article>
        </section>

        <Footer />
      </main>
    </>
  )
}
