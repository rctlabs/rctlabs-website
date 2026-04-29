"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { BookOpen, ChevronLeft, Search, Play } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useRequireAuth } from "@/lib/auth/use-require-auth"

const STUDIO_API = process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:8054"

interface Algorithm {
  algo_id: string
  name: string
  category: string
  description: string
  version: string
  port: number
  endpoints: Record<string, string>
  input_schema: Record<string, string>
  example_input: Record<string, unknown>
  avg_latency_ms: number
  tests_passing: number
  total_tests: number
  tags: string[]
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

export default function AlgorithmsPage() {
  useRequireAuth()
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selected, setSelected] = useState<Algorithm | null>(null)

  const fetchAlgorithms = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (categoryFilter !== "all") params.set("category", categoryFilter)
      const res = await fetch(`${STUDIO_API}/algorithms?${params}`)
      if (res.ok) setAlgorithms(await res.json())
    } catch { /* offline */ } finally { setLoading(false) }
  }, [categoryFilter])

  useEffect(() => { void fetchAlgorithms() }, [fetchAlgorithms])

  const filtered = algorithms.filter((a) =>
    search === "" ||
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.algo_id.toLowerCase().includes(search.toLowerCase()) ||
    a.tags.some((t) => t.includes(search.toLowerCase()))
  )

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/studio" className="hover:text-foreground flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Studio</Link>
          <span>/</span>
          <span className="text-foreground">Algorithms</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-foreground"><BookOpen className="w-8 h-8 text-primary" />Algorithm Registry</h1>
          <p className="text-muted-foreground mt-1 text-sm">10 registered algorithms · algo-10 through algo-19</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, ID, or tag…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-card border border-border rounded-lg pl-10 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary w-64 shadow-sm"
            />
          </div>
          <div className="flex gap-1">
            {["all", "nlp", "code"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors shadow-sm ${categoryFilter === cat ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* List */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="py-16 text-center text-muted-foreground">Loading…</div>
            ) : (
              <div className="space-y-3">
                {filtered.map((algo) => {
                  const pct = algo.total_tests > 0 ? Math.round((algo.tests_passing / algo.total_tests) * 100) : 0
                  return (
                    <button
                      key={algo.algo_id}
                      onClick={() => setSelected(algo)}
                      className={`w-full text-left bg-card border rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all shadow-sm ${selected?.algo_id === algo.algo_id ? "border-primary/50 bg-primary/5" : "border-border"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-muted-foreground bg-muted px-2 py-1 rounded">{algo.algo_id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[algo.category] || ""}`}>{algo.category}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                          <span className={`px-2 py-0.5 rounded-full border font-medium text-xs ${getAlgoStatus(pct).color}`}>
                            {getAlgoStatus(pct).label}
                          </span>
                          <Sparkline baseLatency={algo.avg_latency_ms} />
                          <span className="text-emerald-500 font-mono">{pct}%</span>
                          <span>{algo.avg_latency_ms}ms</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm mt-2 text-foreground">{algo.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{algo.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {algo.tags.map((tag) => (
                           <span key={tag} className="text-[10px] text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{tag}</span>
                        ))}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:col-span-1">
            {selected ? (
              <div className="bg-card border border-border rounded-xl p-5 sticky top-24 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-muted-foreground">{selected.algo_id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[selected.category] || ""}`}>{selected.category}</span>
                </div>
                <h2 className="font-bold text-lg mb-1 text-foreground">{selected.name}</h2>
                <p className="text-sm text-muted-foreground mb-4">{selected.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-muted/50 rounded-lg p-3 text-center border border-border">
                    <p className="text-lg font-bold text-emerald-500">{Math.round((selected.tests_passing / selected.total_tests) * 100)}%</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{selected.tests_passing}/{selected.total_tests} tests</p>
                  </div>
                  <div className="bg-muted/50 rounded-lg p-3 text-center border border-border">
                    <p className="text-lg font-bold text-blue-500">{selected.avg_latency_ms}ms</p>
                    <p className="text-xs text-muted-foreground mt-0.5">avg latency</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Input Schema</p>
                  <div className="space-y-1">
                    {Object.entries(selected.input_schema).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-primary font-mono">{k}</span>
                        <span className="text-muted-foreground">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Endpoints</p>
                  <div className="space-y-1">
                    {Object.entries(selected.endpoints).map(([method, path]) => (
                      <div key={method} className="flex items-center gap-2 text-xs">
                        <span className="text-amber-500 font-mono uppercase w-10">{method}</span>
                        <span className="text-muted-foreground font-mono">{path}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Example Input</p>
                  <pre className="text-xs font-mono text-primary bg-muted rounded-lg p-3 overflow-auto max-h-32 border border-border">
                    {JSON.stringify(selected.example_input, null, 2)}
                  </pre>
                </div>

                <Link href={`/studio/playground?algo=${selected.algo_id}`}>
                  <button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-sm py-2 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm">
                    <Play className="w-4 h-4" />Run in Playground
                  </button>
                </Link>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl p-8 text-center text-muted-foreground sticky top-24 shadow-sm">
                <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Select an algorithm to view details</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
