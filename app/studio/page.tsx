"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FlaskConical, Play, GitCompare, Beaker, Database, ChevronRight, Cpu, BookOpen } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StudioSidebar } from "@/components/studio/studio-sidebar"
import { useRequireAuth } from "@/lib/auth/use-require-auth"

const STUDIO_API = process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:8054"

interface Algorithm {
  algo_id: string
  name: string
  category: string
  description: string
  version: string
  port: number
  avg_latency_ms: number
  tests_passing: number
  total_tests: number
  tags: string[]
}

interface ResultSummary {
  total_algorithms: number
  total_experiments: number
  total_datasets: number
  playground_runs_today: number
  avg_accuracy_pct: number
  most_used_algorithm: string
}

const CATEGORY_COLORS: Record<string, string> = {
  nlp: "text-primary bg-primary/10 border-primary/30",
  code: "text-blue-500 bg-blue-500/10 border-blue-500/30",
  multimodal: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
}

function getAlgoStatus(pct: number): { label: string; color: string } {
  if (pct >= 90) return { label: "active", color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30" }
  if (pct >= 60) return { label: "beta", color: "text-amber-500 bg-amber-500/10 border-amber-500/30" }
  return { label: "deprecated", color: "text-destructive bg-destructive/10 border-destructive/30" }
}

function Sparkline({ baseLatency }: { baseLatency: number }) {
  const seed = baseLatency % 100
  const points = Array.from({ length: 7 }, (_, i) => {
    const variation = ((seed * (i + 1) * 17) % 40) - 20
    return Math.max(10, baseLatency + variation)
  })
  const max = Math.max(...points)
  const min = Math.min(...points)
  const range = max - min || 1
  const w = 56; const h = 18
  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * w
    const y = h - ((p - min) / range) * h
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const d = `M ${coords.join(" L ")}`
  return (
    <svg width={w} height={h} className="opacity-70">
      <path d={d} fill="none" stroke="#4ade80" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function AlgoCard({ algo }: { algo: Algorithm }) {
  const pct = algo.total_tests > 0 ? Math.round((algo.tests_passing / algo.total_tests) * 100) : 0
  const status = getAlgoStatus(pct)
  return (
    <Link href={`/studio/algorithms/${algo.algo_id}`}>
      <div className="group bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <code className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{algo.algo_id}</code>
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[algo.category] || "text-muted-foreground bg-muted border-border"}`}>
            {algo.category}
          </span>
        </div>
        <h3 className="font-semibold text-sm text-foreground mb-1 group-hover:text-primary transition-colors">{algo.name}</h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-3 flex-1">{algo.description}</p>
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${status.color}`}>
            {status.label}
          </span>
          <Sparkline baseLatency={algo.avg_latency_ms} />
        </div>
        <div className="flex items-center justify-between text-xs text-muted-foreground border-t border-border pt-2 mt-1">
          <span className="text-emerald-500 font-mono font-medium">{pct}%</span>
          <span>{algo.avg_latency_ms}ms avg</span>
        </div>
      </div>
    </Link>
  )
}

export default function StudioPage() {
  const { isLoading: authLoading } = useRequireAuth()
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])
  const [summary, setSummary] = useState<ResultSummary | null>(null)
  const [loading, setLoading] = useState(true)

  async function fetchData() {
    setLoading(true)
    try {
      const [algoRes, summaryRes] = await Promise.allSettled([
        fetch(`${STUDIO_API}/algorithms`),
        fetch(`${STUDIO_API}/results/summary`),
      ])
      if (algoRes.status === "fulfilled" && algoRes.value.ok) setAlgorithms(await algoRes.value.json())
      if (summaryRes.status === "fulfilled" && summaryRes.value.ok) setSummary(await summaryRes.value.json())
    } catch { /* offline */ } finally { setLoading(false) }
  }

  useEffect(() => {
    // Only fetch data after auth check passes (isLoading=false = user is authenticated)
    if (authLoading) return
    const timer = setTimeout(() => {
      void fetchData()
    }, 0)
    return () => clearTimeout(timer)
  }, [authLoading])

  const MOCK_SUMMARY: ResultSummary = {
    total_algorithms: 10,
    total_experiments: 5,
    total_datasets: 3,
    playground_runs_today: 47,
    avg_accuracy_pct: 87.3,
    most_used_algorithm: "algo-10",
  }
  const stats = summary ?? MOCK_SUMMARY

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      <div className="flex">
        <StudioSidebar />

        {/* Main content — shows skeleton while auth is checking */}
        <main className="flex-1 p-8">
          {authLoading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-10 bg-muted rounded-xl w-64" />
              <div className="grid grid-cols-6 gap-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="h-20 bg-muted rounded-xl" />
                ))}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 4 }, (_, i) => (
                  <div key={i} className="h-28 bg-muted rounded-xl" />
                ))}
              </div>
            </div>
          ) : (
            <>
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3 text-foreground">
                <FlaskConical className="w-8 h-8 text-primary" />
                Specialist Studio
              </h1>
              <p className="text-muted-foreground mt-1">Algorithm playground · A/B comparison · Experiment tracking · Dataset catalog</p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: "Algorithms", value: stats.total_algorithms, color: "text-primary" },
              { label: "Experiments", value: stats.total_experiments, color: "text-foreground" },
              { label: "Datasets", value: stats.total_datasets, color: "text-foreground" },
              { label: "Runs Today", value: stats.playground_runs_today, color: "text-primary" },
              { label: "Avg Accuracy", value: `${stats.avg_accuracy_pct}%`, color: "text-emerald-500" },
              { label: "Top Algo", value: stats.most_used_algorithm, color: "text-muted-foreground" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                <p className={`text-xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { href: "/studio/playground", label: "Run Playground", desc: "Test algorithms interactively", icon: Play, color: "text-emerald-500" },
              { href: "/studio/compare", label: "Compare Models", desc: "Side-by-side A/B testing", icon: GitCompare, color: "text-blue-500" },
              { href: "/studio/experiments", label: "Experiments", desc: "Track runs & results", icon: Beaker, color: "text-amber-500" },
              { href: "/studio/datasets", label: "Datasets", desc: "Browse training data", icon: Database, color: "text-primary" },
            ].map(({ href, label, desc, icon: Icon, color }) => (
              <Link key={href} href={href}>
                <div className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all cursor-pointer shadow-sm">
                  <Icon className={`w-7 h-7 ${color} mb-3`} />
                  <p className="font-semibold text-sm text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                  <ChevronRight className="w-4 h-4 text-muted-foreground mt-2" />
                </div>
              </Link>
            ))}
          </div>

          {/* Algorithm Grid */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2 text-foreground">
              <Cpu className="w-5 h-5 text-primary" />
              All Algorithms ({algorithms.length > 0 ? algorithms.length : 10})
            </h2>
            <Link href="/studio/algorithms" className="text-sm text-primary hover:text-primary/80">View all →</Link>
          </div>
          {loading ? (
            <div className="py-16 text-center text-muted-foreground">Loading algorithms…</div>
          ) : algorithms.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="bg-card border border-border rounded-xl p-5 animate-pulse h-36" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {algorithms.map((algo) => <AlgoCard key={algo.algo_id} algo={algo} />)}
            </div>
          )}
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}
