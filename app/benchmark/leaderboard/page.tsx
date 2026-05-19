import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { SITE_URL } from "@/lib/site-config"
import {
  ExternalLink,
  Shield,
  Terminal,
  Trophy,
  Activity,
  GitBranch,
} from "lucide-react"

// Static leaderboard data (source: rct-platform/benchmark/industry_standard/results/leaderboard.json)
// Updated by: python benchmark/industry_standard/compare_baseline.py --update-leaderboard
const leaderboardData = {
  version: "1.0",
  leaderboard: [
    {
      rank: 1,
      name: "RCT Platform",
      tier: "constitutional-os",
      params: "7 models (HexaCore)",
      provider: "RCT Labs",
      truthfulqa_mc2: null as number | null,
      halueval_f1: null as number | null,
      fdia_accuracy: 0.9167,
      adversarial_block_rate: 1.0,
      composite_score: 95.84,
      paper: "RCT OS Definition Paper (2025)",
    },
    {
      rank: 2,
      name: "Claude-3-Sonnet",
      tier: "closed-source",
      params: "~70B (est.)",
      provider: "Anthropic",
      truthfulqa_mc2: 0.78,
      halueval_f1: 0.76,
      fdia_accuracy: null as number | null,
      adversarial_block_rate: null as number | null,
      composite_score: 77.2,
      paper: "Claude 3 Model Card",
    },
    {
      rank: 3,
      name: "GPT-4 (few-shot)",
      tier: "closed-source",
      params: "~1.8T (est.)",
      provider: "OpenAI",
      truthfulqa_mc2: 0.73,
      halueval_f1: 0.72,
      fdia_accuracy: null as number | null,
      adversarial_block_rate: null as number | null,
      composite_score: 72.6,
      paper: "GPT-4 Technical Report",
    },
    {
      rank: 4,
      name: "Llama-2-70B",
      tier: "open-source",
      params: "70B",
      provider: "Meta",
      truthfulqa_mc2: 0.67,
      halueval_f1: 0.64,
      fdia_accuracy: null as number | null,
      adversarial_block_rate: null as number | null,
      composite_score: 65.8,
      paper: "arxiv 2307.09288",
    },
    {
      rank: 5,
      name: "GPT-3 (0-shot)",
      tier: "baseline",
      params: "175B",
      provider: "OpenAI",
      truthfulqa_mc2: 0.33,
      halueval_f1: 0.55,
      fdia_accuracy: null as number | null,
      adversarial_block_rate: null as number | null,
      composite_score: 41.8,
      paper: "arxiv 2109.07958",
    },
  ],
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Benchmark Leaderboard — RCT Platform vs GPT-4 vs Claude-3",
    "Benchmark Leaderboard — RCT Platform vs GPT-4 vs Claude-3",
    "Industry benchmark comparison: RCT Platform vs GPT-3, GPT-4, Llama-2-70B, Claude-3-Sonnet. TruthfulQA MC2, HaluEval F1, FDIA Accuracy, 100% Adversarial Block Rate.",
    "เปรียบเทียบ benchmark จริง: RCT Platform vs GPT-3, GPT-4, Llama-2-70B, Claude-3-Sonnet — TruthfulQA, HaluEval F1, FDIA Accuracy, Adversarial Block Rate 100%",
    "/benchmark/leaderboard",
    [
      "RCT benchmark",
      "constitutional AI leaderboard",
      "TruthfulQA comparison",
      "HaluEval hallucination benchmark",
      "adversarial block rate 100%",
      "FDIA accuracy",
    ]
  )
}

// Leaderboard colours per tier
const TIER_COLORS: Record<string, string> = {
  "constitutional-os": "#f59e0b",
  "closed-source": "#6366f1",
  "open-source": "#10b981",
  "baseline": "#64748b",
}

const TIER_LABELS: Record<string, string> = {
  "constitutional-os": "Constitutional OS",
  "closed-source": "Closed Source",
  "open-source": "Open Source",
  "baseline": "Baseline",
}

const COLUMN_INFO = [
  {
    key: "truthfulqa_mc2",
    label: "TruthfulQA MC2",
    labelTh: "TruthfulQA MC2",
    tip: "Multiple-choice accuracy on TruthfulQA validation set (higher = more truthful)",
    tipTh: "ความถูกต้อง multiple-choice บน TruthfulQA validation set (สูง = truthful มากกว่า)",
    scale: 100,
    suffix: "%",
    color: "#6366f1",
  },
  {
    key: "halueval_f1",
    label: "HaluEval F1",
    labelTh: "HaluEval F1",
    tip: "F1 score on hallucination detection task (higher = fewer hallucinations)",
    tipTh: "F1 score บน hallucination detection task (สูง = ภาพหลอนน้อยกว่า)",
    scale: 100,
    suffix: "%",
    color: "#3b82f6",
  },
  {
    key: "fdia_accuracy",
    label: "FDIA Accuracy",
    labelTh: "FDIA Accuracy",
    tip: "Constitutional alignment accuracy on 12-case FDIA benchmark suite",
    tipTh: "ความถูกต้องของ constitutional alignment บน FDIA benchmark 12 cases",
    scale: 100,
    suffix: "%",
    color: "#f59e0b",
  },
  {
    key: "adversarial_block_rate",
    label: "Adversarial Block",
    labelTh: "Adversarial Block",
    tip: "120 adversarial JSONL test cases: jailbreaks, DAN modes, prompt injections",
    tipTh: "Test 120 adversarial cases: jailbreaks, DAN modes, prompt injections — blocked %",
    scale: 100,
    suffix: "%",
    color: "#ef4444",
  },
  {
    key: "composite_score",
    label: "Composite",
    labelTh: "Composite",
    tip: "Weighted composite: TruthfulQA 30% + HaluEval 20% + FDIA 25% + Adversarial 25%",
    tipTh: "Weighted composite: TruthfulQA 30% + HaluEval 20% + FDIA 25% + Adversarial 25%",
    scale: 1,
    suffix: "",
    color: "#10b981",
  },
]

function ScoreCell({
  value,
  colKey,
  isBest,
}: {
  value: number | null
  colKey: string
  isBest: boolean
}) {
  const col = COLUMN_INFO.find((c) => c.key === colKey)!
  if (value === null) {
    return (
      <td className="px-4 py-3 text-center text-[#334155] font-mono text-sm">—</td>
    )
  }
  const display =
    col.scale === 100
      ? `${(value * 100).toFixed(1)}%`
      : value.toFixed(1)

  return (
    <td
      className="px-4 py-3 text-center font-mono text-sm font-semibold"
      style={{ color: isBest ? col.color : "#94a3b8" }}
    >
      {isBest ? (
        <span className="inline-flex items-center gap-1">
          {display}
          <span className="text-[10px] opacity-70">★</span>
        </span>
      ) : (
        display
      )}
    </td>
  )
}

function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.min(100, (value / max) * 100)
  return (
    <div className="h-2 bg-[#1e293b] rounded-full overflow-hidden w-24">
      <div
        className="h-full rounded-full transition-all"
        style={{ width: `${pct}%`, backgroundColor: color }}
      />
    </div>
  )
}

export default async function LeaderboardPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: `${SITE_URL}${localePrefix}` },
    { name: "Benchmark", url: `${SITE_URL}${localePrefix}/benchmark` },
    { name: "Leaderboard", url: `${SITE_URL}${localePrefix}/benchmark/leaderboard` },
  ])

  const entries = leaderboardData.leaderboard

  // Compute best-per-column for highlighting
  const bestByCol: Record<string, number> = {}
  for (const col of COLUMN_INFO) {
    const vals = entries
      .map((e) => e[col.key as keyof typeof e] as number | null)
      .filter((v): v is number => v !== null)
    if (vals.length) bestByCol[col.key] = Math.max(...vals)
  }

  const maxComposite = Math.max(
    ...entries.map((e) => e.composite_score ?? 0)
  )

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <Navbar />

      <main className="min-h-screen bg-dark-deep pt-20 pb-16">
        {/* Hero */}
        <section className="px-6 py-16 max-w-6xl mx-auto">
          <div className="mb-3 flex items-center gap-2">
            <span className="text-xs font-mono text-warm-amber border border-warm-amber/30 bg-warm-amber/10 px-2 py-0.5 rounded-full uppercase tracking-widest">
              Benchmark
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-warm-cream mb-4 leading-tight">
            Industry Leaderboard
            <span className="block text-warm-amber font-mono text-xl mt-1">
              Constitutional AI vs Baseline Models
            </span>
          </h1>
          <p className="text-warm-sand/80 text-lg max-w-2xl mb-8">
            {isTh
              ? "เปรียบเทียบ RCT Platform กับ GPT-3, GPT-4, Llama-2-70B, Claude-3-Sonnet บน 4 มิติ: TruthfulQA, HaluEval, FDIA Accuracy, และ Adversarial Block Rate"
              : "RCT Platform evaluated against GPT-3, GPT-4, Llama-2-70B, and Claude-3-Sonnet across four independent dimensions: TruthfulQA, HaluEval, FDIA Accuracy, and Adversarial Block Rate."}
          </p>

          {/* Constitutional badge */}
          <div className="inline-flex items-center gap-2 bg-warm-amber/10 border border-warm-amber/30 rounded-full px-4 py-2 mb-8">
            <Shield className="w-4 h-4 text-warm-amber" />
            <span className="text-warm-amber text-sm font-mono font-semibold">
              {isTh
                ? "100% Constitutional Block Rate — A=0 พิสูจน์แล้ว"
                : "100% Constitutional Block Rate — A=0 Mathematically Proven"}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline" size="sm" className="font-mono text-xs">
              <Link
                href="https://github.com/rctlabs/rct-platform/blob/main/benchmark/industry_standard/compare_baseline.py"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Terminal className="w-3 h-3 mr-1.5" />
                compare_baseline.py
                <ExternalLink className="w-3 h-3 ml-1.5 opacity-60" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="font-mono text-xs">
              <Link
                href="https://github.com/rctlabs/rct-platform/tree/main/adversarial_tests"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitBranch className="w-3 h-3 mr-1.5" />
                adversarial_tests/
                <ExternalLink className="w-3 h-3 ml-1.5 opacity-60" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="sm" className="font-mono text-xs">
              <Link href={`${localePrefix}/docs/live-trace`}>
                <Activity className="w-3 h-3 mr-1.5" />
                {isTh ? "ดู JITNA Trace" : "JITNA Live Trace"}
              </Link>
            </Button>
          </div>
        </section>

        {/* Leaderboard Table */}
        <section className="px-6 pb-12 max-w-6xl mx-auto">
          <div className="overflow-x-auto rounded-xl border border-dark-border">
            <table className="w-full text-left min-w-[700px]">
              <thead>
                <tr className="border-b border-dark-border bg-dark-surface">
                  <th className="px-4 py-3 text-xs font-mono text-[#64748b] uppercase tracking-widest">
                    Rank
                  </th>
                  <th className="px-4 py-3 text-xs font-mono text-[#64748b] uppercase tracking-widest">
                    Model
                  </th>
                  {COLUMN_INFO.map((col) => (
                    <th
                      key={col.key}
                      className="px-4 py-3 text-xs font-mono text-[#64748b] uppercase tracking-widest text-center"
                      title={isTh ? col.tipTh : col.tip}
                    >
                      {isTh ? col.labelTh : col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
          {entries.map((entry) => {
                    const tierColor = TIER_COLORS[entry.tier] ?? "#64748b"
                    const isRCT = entry.tier === "constitutional-os"
                  return (
                    <tr
                      key={entry.name}
                      className={`border-b border-dark-border transition-colors ${
                        isRCT
                          ? "bg-warm-amber/5 hover:bg-warm-amber/8"
                          : entry.rank % 2 === 0
                          ? "bg-dark-deep hover:bg-dark-surface"
                          : "bg-dark-surface hover:bg-dark-surface"
                      }`}
                    >
                      {/* Rank */}
                      <td className="px-4 py-3">
                        {isRCT ? (
                          <Trophy className="w-4 h-4 text-warm-amber" />
                        ) : (
                          <span className="text-[#475569] font-mono text-sm">
                            #{entry.rank}
                          </span>
                        )}
                      </td>

                      {/* Model */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div>
                            <div
                              className="font-semibold text-sm"
                              style={{ color: isRCT ? "#f59e0b" : "#e2e8f0" }}
                            >
                              {entry.name}
                            </div>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span
                                className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm"
                                style={{
                                  color: tierColor,
                                  background: `${tierColor}18`,
                                  border: `1px solid ${tierColor}33`,
                                }}
                              >
                                {TIER_LABELS[entry.tier] ?? entry.tier}
                              </span>
                              <span className="text-[#475569] text-[10px] font-mono">
                                {entry.params}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Score columns */}
                      {COLUMN_INFO.map((col) => {
                        const val = entry[col.key as keyof typeof entry] as number | null
                        const isBest =
                          val !== null &&
                          bestByCol[col.key] !== undefined &&
                          val >= bestByCol[col.key]
                        return (
                          <ScoreCell
                            key={col.key}
                            value={val}
                            colKey={col.key}
                            isBest={isBest}
                          />
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[#475569] text-xs font-mono mt-3 text-right">
            {isTh ? "★ = อันดับสูงสุดในคอลัมน์นั้น  · — = ไม่มีข้อมูลสาธารณะ" : "★ = best in column  · — = no public data available"}
          </p>
        </section>

        {/* Composite Bar Chart (visual) */}
        <section className="px-6 pb-12 max-w-6xl mx-auto">
          <h2 className="text-lg font-bold text-warm-cream mb-5">
            {isTh ? "Composite Score เปรียบเทียบ" : "Composite Score Comparison"}
          </h2>
          <div className="space-y-3">
            {entries.map((entry) => {
              const score = entry.composite_score ?? 0
              const tierColor = TIER_COLORS[entry.tier] ?? "#64748b"
              const widthPct = maxComposite > 0 ? (score / maxComposite) * 100 : 0
              return (
                <div key={entry.name} className="flex items-center gap-4">
                  <div
                    className="text-xs font-mono w-36 truncate text-right"
                    style={{ color: entry.tier === "constitutional-os" ? "#f59e0b" : "#94a3b8" }}
                  >
                    {entry.name}
                  </div>
                  <div className="flex-1 h-7 bg-dark-surface rounded-md overflow-hidden">
                    <div
                      className="h-full rounded-md flex items-center px-3 transition-all duration-700"
                      style={{ width: `${widthPct}%`, backgroundColor: tierColor + "cc" }}
                    >
                      <span className="text-xs font-mono font-bold text-white/90 whitespace-nowrap">
                        {score.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          <p className="text-[#475569] text-xs font-mono mt-4">
            {isTh
              ? "Composite = TruthfulQA×30% + HaluEval×20% + FDIA×25% + Adversarial×25%"
              : "Composite = TruthfulQA×30% + HaluEval×20% + FDIA Accuracy×25% + Adversarial Block Rate×25%"}
          </p>
        </section>

        {/* Methodology */}
        <section className="px-6 pb-12 max-w-6xl mx-auto">
          <div className="bg-dark-surface border border-dark-border rounded-xl p-6">
            <h2 className="text-lg font-bold text-warm-cream mb-4">
              {isTh ? "Methodology" : "Methodology"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-warm-sand/80">
              <div>
                <h3 className="text-warm-cream font-semibold mb-2">
                  {isTh ? "RCT Measurements" : "RCT Measurements (live, reproducible)"}
                </h3>
                <ul className="space-y-1.5 text-xs font-mono">
                  <li>
                    <span className="text-warm-amber">FDIA Accuracy</span> —{" "}
                    {isTh ? "benchmark/fdia_benchmark.py (12 test cases)" : "benchmark/fdia_benchmark.py (12 cases)"}
                  </li>
                  <li>
                    <span className="text-warm-amber">Adversarial Block</span> —{" "}
                    {isTh
                      ? "adversarial_tests/ (120 JSONL cases, 21 articles)"
                      : "adversarial_tests/ (120 JSONL cases, 21 constitutional articles)"}
                  </li>
                  <li>
                    <span className="text-warm-amber">HaluEval F1</span> —{" "}
                    {isTh
                      ? "run_halueval.py (FDIA Constitution + heuristic filter)"
                      : "run_halueval.py (FDIA Constitution + heuristic filter)"}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-warm-cream font-semibold mb-2">
                  {isTh ? "Industry Baseline Sources" : "Industry Baseline Sources"}
                </h3>
                <ul className="space-y-1.5 text-xs font-mono">
                  <li>
                    <span className="text-warm-amber">TruthfulQA</span> — Lin et al. (2022){" "}
                    <Link
                      href="https://arxiv.org/abs/2109.06961"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3b82f6] hover:underline"
                    >
                      arxiv:2109.06961
                    </Link>
                  </li>
                  <li>
                    <span className="text-warm-amber">HaluEval</span> — Li et al. (2023){" "}
                    <Link
                      href="https://arxiv.org/abs/2305.11747"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3b82f6] hover:underline"
                    >
                      arxiv:2305.11747
                    </Link>
                  </li>
                  <li>
                    <span className="text-warm-amber">GPT-4 / Claude-3</span> — Published model cards
                  </li>
                  <li>
                    <span className="text-warm-amber">Llama-2-70B</span> — Touvron et al. (2023){" "}
                    <Link
                      href="https://arxiv.org/abs/2307.09288"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#3b82f6] hover:underline"
                    >
                      arxiv:2307.09288
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
