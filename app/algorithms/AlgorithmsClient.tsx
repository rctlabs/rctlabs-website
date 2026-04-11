"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { m } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"
import { ArrowRight, Zap } from "lucide-react"
import SectionHeading from "@/components/section-heading"
import AnalysearchDemo from "@/components/demos/analysearch-demo"
import OptimizedImage from "@/components/ui/optimized-image"
import { pixelIcons } from "@/lib/pixel-icons"
import { SITE_HALLUCINATION_RATE } from "@/lib/site-config"

const PIXEL_ALGO = pixelIcons.algorithms

// Algorithm count per tier (total = 41)
const TIER_ALGO_COUNTS = [4, 5, 5, 4, 5, 4, 5, 5, 4]

const KEY_ALGOS: string[][] = [
  ["Intent Parser", "Token Normalizer", "Schema Validator", "Baseline Router"],
  ["Entity Extractor", "Context Classifier", "Semantic Tagger", "Pattern Recognizer", "Priority Scorer"],
  ["Chain-of-Thought Engine", "Counterfactual Comparator", "Hypothesis Generator", "Path Evaluator", "Delta Validator"],
  ["Task-to-Model Router", "Load Balancer", "Priority Queue", "Session Coordinator"],
  ["Consensus Aggregator", "Hallucination Detector", "Evidence Scorer", "Quality Gate", "Audit Logger"],
  ["Delta Engine Compressor", "Semantic Indexer", "Context Retriever", "TTL Manager"],
  ["Personalization Engine", "Feedback Processor", "Profile Tuner", "Behavior Calibrator", "Domain Adapter"],
  ["Cross-Domain Fusion", "Insight Generator", "Multi-Source Merger", "Output Assembler", "Format Renderer"],
  ["Long-Horizon Planner", "Constraint Solver", "Goal Decomposer", "Execution Monitor"],
]

const TIER_CROSS_LINKS: Record<number, { labelEn: string; labelTh: string; href: string }> = {
  2: { labelEn: "See: FDIA Equation →", labelTh: "ดู: FDIA Equation →", href: "/protocols/fdia-equation" },
  3: { labelEn: "See: JITNA RFC-001 →", labelTh: "ดู: JITNA RFC-001 →", href: "/protocols/jitna-rfc-001" },
  4: { labelEn: "See: SignedAI →", labelTh: "ดู: SignedAI →", href: "/products/signed-ai" },
}

const tiers = {
  en: [
    { tier: "Tier 1", name: "Foundation", algos: "Core primitives", desc: "Intent parsing, normalization, token discipline, and baseline routing used across every workflow.", color: "#89B4C8" },
    { tier: "Tier 2", name: "Analysis", algos: "Signal extraction", desc: "Entity detection, context classification, semantic tagging, and pattern recognition for incoming tasks.", color: "#7B9E87" },
    { tier: "Tier 3", name: "Reasoning", algos: "Decision paths", desc: "Structured reasoning strategies that expand, compare, and validate alternative solution paths.", color: "#D4A853" },
    { tier: "Tier 4", name: "Orchestration", algos: "Model routing", desc: "Task-to-model coordination that selects the best reasoning surface for speed, cost, and quality.", color: "#C4745B" },
    { tier: "Tier 5", name: "Verification", algos: "Trust controls", desc: "Consensus, hallucination checks, evidence scoring, and quality gates for production responses.", color: "#B8A9C9" },
    { tier: "Tier 6", name: "Memory", algos: "Persistent context", desc: "Compression, semantic indexing, retrieval, and continuity logic that preserve context across sessions.", color: "#89B4C8" },
    { tier: "Tier 7", name: "Adaptation", algos: "Feedback loops", desc: "System behaviors that personalize output, tune execution, and learn from repeated enterprise use cases.", color: "#7B9E87" },
    { tier: "Tier 8", name: "Synthesis", algos: "Cross-domain fusion", desc: "Mechanisms that connect signals from multiple disciplines to produce more useful insights.", color: "#D4A853" },
    { tier: "Tier 9", name: "Autonomy", algos: "Planning systems", desc: "Longer-horizon planning, constraint handling, and governed autonomous execution for complex workflows.", color: "#C4745B" },
  ],
  th: [
    { tier: "Tier 1", name: "Foundation", algos: "Core primitives", desc: "Primitive พื้นฐานสำหรับ intent parsing, normalization, token discipline และ baseline routing", color: "#89B4C8" },
    { tier: "Tier 2", name: "Analysis", algos: "Signal extraction", desc: "การดึง entity, การจัดชั้น context, semantic tagging และ pattern recognition สำหรับงานที่เข้ามา", color: "#7B9E87" },
    { tier: "Tier 3", name: "Reasoning", algos: "Decision paths", desc: "กลยุทธ์ reasoning แบบมีโครงสร้างเพื่อขยาย เปรียบเทียบ และตรวจสอบหลายแนวทางคำตอบ", color: "#D4A853" },
    { tier: "Tier 4", name: "Orchestration", algos: "Model routing", desc: "การประสาน model ตามงานเพื่อบาลานซ์ความเร็ว ต้นทุน และคุณภาพ", color: "#C4745B" },
    { tier: "Tier 5", name: "Verification", algos: "Trust controls", desc: "consensus, hallucination checks, evidence scoring และ quality gates สำหรับ production responses", color: "#B8A9C9" },
    { tier: "Tier 6", name: "Memory", algos: "Persistent context", desc: "compression, semantic indexing, retrieval และ continuity logic ที่รักษาบริบทข้าม session", color: "#89B4C8" },
    { tier: "Tier 7", name: "Adaptation", algos: "Feedback loops", desc: "behavior ที่ personalize output ปรับ execution และเรียนรู้จากการใช้งานจริงขององค์กร", color: "#7B9E87" },
    { tier: "Tier 8", name: "Synthesis", algos: "Cross-domain fusion", desc: "กลไกที่เชื่อมสัญญาณจากหลายโดเมนเพื่อสร้าง insight ที่ใช้งานได้มากขึ้น", color: "#D4A853" },
    { tier: "Tier 9", name: "Autonomy", algos: "Planning systems", desc: "การวางแผนระยะยาว การจัดการ constraint และการทำงานอัตโนมัติแบบมี governance", color: "#C4745B" },
  ],
}

const analysearchModes = [
  { mode: "Quick", descEn: "Instant responses for straightforward queries", descTh: "คำตอบทันทีสำหรับคำถามตรงไปตรงมา", color: "#89B4C8" },
  { mode: "Standard", descEn: "Balanced analysis with multi-source validation", descTh: "การวิเคราะห์ที่สมดุลพร้อมการตรวจสอบจากหลายแหล่ง", color: "#7B9E87" },
  { mode: "Deep", descEn: "Thorough cross-domain synthesis and research-grade output", descTh: "Synthesis ข้ามโดเมนอย่างละเอียดและผลลัพธ์ระดับงานวิจัย", color: "#D4A853" },
  { mode: "Mirror", descEn: "Reflective self-evaluation for maximum accuracy", descTh: "การประเมินตัวเองแบบ Reflective เพื่อความแม่นยำสูงสุด", color: "#C4745B" },
]

export default function AlgorithmsPage() {
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname)
  const isTh = locale === "th"
  const localePrefix = isTh ? "/th" : "/en"
  const localTiers = isTh ? tiers.th : tiers.en

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-amber/10 border border-warm-amber/30 text-warm-amber text-sm font-medium">
            <Zap className="w-4 h-4" /> {isTh ? "อัลกอริทึม" : "Algorithms"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">41 Algorithms & Analysearch</h1>
          <p className="text-lg text-muted-foreground">
            {isTh
              ? "41-algorithm framework พร้อม staged rollout ใน 9 tiers — Analysearch สำหรับการวิเคราะห์และสังเคราะห์แบบหลายระดับ"
              : "41-algorithm framework with staged rollout across 9 tiers, with Analysearch providing the multi-depth analysis and synthesis layer."}
          </p>

          {/* Hero stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2">
            {[
              { value: "41", label: isTh ? "Algorithms" : "Algorithms" },
              { value: "9", label: isTh ? "Capability Tiers" : "Capability Tiers" },
              { value: "4", label: isTh ? "Analysearch Modes" : "Analysearch Modes" },
              { value: SITE_HALLUCINATION_RATE, label: isTh ? "Hallucination Rate" : "Hallucination Rate" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-warm-amber/20 bg-warm-amber/5 px-4 py-3 text-left">
                <p className="text-2xl font-bold text-warm-amber">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-6 md:pb-10">
        <div className="rounded-[28px] border border-warm-light-gray bg-linear-to-br from-white via-warm-cream to-[#F3EBDD] p-6 shadow-[0_16px_60px_rgba(0,0,0,0.07)] dark:border-white/10 dark:from-dark-950 dark:via-dark-900 dark:to-[#17130f]">
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <SectionHeading
                tag={isTh ? "Interactive System" : "Interactive System"}
                tagColor="terracotta"
                title={isTh ? "Analysearch Intent Engine" : "Analysearch Intent Engine"}
                italicWord="Intent"
                description={isTh ? "ทดลอง Analysearch โดยตรง — เลือกโหมด Quick, Standard, Deep หรือ Mirror เพื่อดูลำดับการประมวลผลและผลลัพธ์จำลองแบบ step-by-step" : "Test Analysearch directly — select Quick, Standard, Deep, or Mirror mode to see the full execution pipeline and simulated output at each reasoning depth."}
                pixelIcon={PIXEL_ALGO}
              />
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { label: isTh ? "4 โหมด" : "4 Modes", value: isTh ? "Analysearch" : "Analysearch" },
                  { label: isTh ? "ความลึก" : "Depth", value: isTh ? "Adaptive" : "Adaptive" },
                  { label: isTh ? "ผลลัพธ์" : "Output", value: isTh ? "Traceable" : "Traceable" },
                ].map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/70 bg-white/80 p-4 dark:border-white/10 dark:bg-white/5">
                    <div className="text-xs uppercase tracking-wider text-warm-muted">{item.label}</div>
                    <div className="mt-1 text-lg font-bold text-warm-charcoal dark:text-warm-light-gray">{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-md">
              <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(circle_at_top,rgba(212,168,83,0.24),transparent_55%)]" aria-hidden="true" />
              <div className="relative rounded-[28px] border border-warm-light-gray/80 bg-white/85 p-5 dark:border-white/10 dark:bg-dark-900/80">
                <div className="absolute right-4 top-4 h-14 w-14 opacity-80">
                  <OptimizedImage src={PIXEL_ALGO} alt="" pixelated containerClassName="h-full w-full" objectFit="contain" width={56} height={56} />
                </div>
                <div className="pr-16">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-warm-terracotta">{isTh ? "Pixel Accent" : "Pixel Accent"}</div>
                  <h3 className="text-xl font-bold text-foreground">{isTh ? "41 algorithms, one intent surface" : "41 algorithms, one intent surface"}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {isTh ? "หน้านี้แสดงให้เห็นว่า capability แต่ละกลุ่มทำงานร่วมกันอย่างไร ตั้งแต่การตีความ intent ไปจนถึงการตัดสินใจแบบมี verification" : "This page shows how the capability groups work together, from intent interpretation to verified decision support."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="bg-muted/30 py-16">
        <div className="mx-auto max-w-3xl px-4 space-y-4 text-muted-foreground text-base leading-relaxed">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "สถาปัตยกรรม 9 ระดับ" : "The 9-Tier Architecture"}</h2>
          <p>{isTh
            ? "RCT Ecosystem จัดอัลกอริทึม 41 ตัวเป็น 9 ระดับความสามารถ โดยแต่ละระดับต่อยอดจากระดับก่อนหน้าเพื่อสร้าง routing และ reasoning ที่เหมาะกับบริบทธุรกิจต่างกัน"
            : "The 41 algorithms are grouped into 9 capability tiers. Each tier extends the one below it so the platform can route work according to business context, depth, and risk."}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <div className="mb-8 max-w-4xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-4 py-1.5 text-sm font-medium text-warm-amber">
            <Zap className="h-4 w-4" /> {isTh ? "Live Interaction" : "Live Interaction"}
          </span>
          <h2 className="mt-5 text-2xl font-bold text-foreground sm:text-3xl">
            {isTh ? "ทดลอง Analysearch แบบโต้ตอบ" : "Try Analysearch Interactively"}
          </h2>
          <p className="mt-3 max-w-3xl text-sm text-muted-foreground sm:text-base">
            {isTh ? "เติมคำถามหรือ เลือกตัวอย่าง query แล้วเปลี่ยนโหมดเพื่อดูว่า execution trace เปลี่ยนไปตามความลึกของ reasoning อย่างไร (ผลลัพธ์ที่แสดงเป็น simulation ไม่ใช่การเชื่อมต่อ backend จริง)" : "Enter a question or select an example query, then switch modes to observe how the execution trace changes with reasoning depth. (Results shown are a simulation — not a live backend connection.)"}
          </p>
        </div>
        <AnalysearchDemo language={isTh ? "th" : "en"} />
      </section>

      {/* 9 Tiers */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <div className="space-y-3">
          {localTiers.map((t, i) => (
            <m.div id={`tier-${i + 1}`} key={t.tier} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.04 }} whileHover={{ y: -3, scale: 1.005, transition: { duration: 0.2 } }}
              className="p-4 rounded-xl border border-border bg-card main-page-reactive-card group hover:border-warm-amber/40 hover:shadow-[0_8px_20px_rgba(212,168,83,0.08)] transition-[border-color,box-shadow] duration-300">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-warm-amber/10 text-warm-amber">{t.tier}</span>
                <span className="font-semibold text-sm text-foreground">{t.name}</span>
                <span className="text-xs text-muted-foreground">({t.algos})</span>
                <span className="ml-auto text-xs font-semibold text-warm-amber">{TIER_ALGO_COUNTS[i]} alg.</span>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{t.desc}</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {KEY_ALGOS[i].map((algoName) => (
                  <span key={algoName} className="inline-block text-[10px] px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground">{algoName}</span>
                ))}
                {TIER_CROSS_LINKS[i] && (
                  <Link href={`${localePrefix}${TIER_CROSS_LINKS[i].href}`} className="inline-block text-[10px] px-2 py-0.5 rounded-full border text-warm-amber border-warm-amber/40 hover:bg-warm-amber/8 transition-colors">
                    {isTh ? TIER_CROSS_LINKS[i].labelTh : TIER_CROSS_LINKS[i].labelEn}
                  </Link>
                )}
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>{isTh ? "ระดับความซับซ้อน" : "Complexity level"}</span>
                <span>T{i + 1}/9</span>
              </div>
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full" style={{ backgroundColor: t.color, width: `${15 + i * 9.5}%` }} />
              </div>
            </m.div>
          ))}
        </div>
      </section>

      {/* Analysearch */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-4xl px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-4">Analysearch</h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            {isTh
              ? "Hybrid Methodology ที่ผสานการวิเคราะห์เชิงลึกกับ Synthesis ระดับงานวิจัย ทำงานใน 4 โหมด"
              : "A hybrid methodology that seamlessly combines analytical processing with research-grade synthesis across 4 distinct modes."}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {analysearchModes.map((mode, i) => (
              <m.div key={mode.mode} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} whileHover={{ y: -4, scale: 1.006, transition: { duration: 0.24 } }}
                className="p-5 rounded-2xl border border-border bg-card text-center main-page-reactive-card group hover:border-warm-amber/40 hover:shadow-[0_12px_28px_rgba(212,168,83,0.09)] transition-[border-color,box-shadow] duration-300">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold mx-auto mb-3" style={{ backgroundColor: `${mode.color}15`, color: mode.color }}>{i + 1}</div>
                <h3 className="font-bold text-sm text-foreground mb-2">{mode.mode}</h3>
                <p className="text-xs text-muted-foreground">{isTh ? mode.descTh : mode.descEn}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-5xl px-4 py-20">
        <h2 className="text-2xl font-bold text-foreground text-center mb-8">{isTh ? "หัวข้อที่เกี่ยวข้อง" : "Related Topics"}</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { href: `${localePrefix}/architecture`, icon: "🏗️", label: isTh ? "สถาปัตยกรรม 10 ชั้น" : "10-Layer Architecture", desc: isTh ? "อัลกอริทึมอยู่ตรงไหนใน Cognitive Stack" : "Where algorithms fit in the cognitive stack" },
            { href: `${localePrefix}/fdia`, icon: "📐", label: isTh ? "สมการ FDIA" : "FDIA Equation", desc: isTh ? "รากฐานทางคณิตศาสตร์ของ Reasoning Tier" : "Mathematical foundation of the reasoning tier" },
            { href: `${localePrefix}/benchmark`, icon: "📊", label: isTh ? "เกณฑ์มาตรฐาน" : "Benchmarks", desc: isTh ? "เมตริกประสิทธิภาพของ 41 อัลกอริทึม" : "Performance metrics for all 41 algorithms" },
          ].map((link) => (
            <Link key={link.href} href={link.href} className="block p-4 rounded-xl border border-border bg-card hover:border-warm-amber/50 transition-all">
              <span className="text-2xl mb-2 block">{link.icon}</span>
              <span className="font-semibold text-sm block mb-1 text-foreground">{link.label}</span>
              <span className="text-xs text-muted-foreground">{link.desc}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">{isTh ? "สนใจ 41 Algorithms?" : "Explore Our 41 Algorithms"}</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href={`${localePrefix}/contact`} className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-warm-amber text-white font-medium text-sm hover:bg-warm-amber/90 transition-colors">
              {isTh ? "ขอ Demo" : "Request Demo"} <ArrowRight size={16} />
            </Link>
            <Link href={`${localePrefix}/docs`} className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">
              {isTh ? "อ่าน Docs" : "Read Docs"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
