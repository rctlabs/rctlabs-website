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
  nlp: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  code: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  multimodal: "text-green-400 bg-green-400/10 border-green-400/30",
}

function getAlgoStatus(pct: number): { label: string; color: string } {
  if (pct >= 90) return { label: "active", color: "text-green-400 bg-green-400/10 border-green-400/30" }
  if (pct >= 60) return { label: "beta", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" }
  return { label: "deprecated", color: "text-red-400 bg-red-400/10 border-red-400/30" }
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
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/studio" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Studio</Link>
          <span>/</span>
          <span className="text-white">Algorithms</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3"><BookOpen className="w-8 h-8 text-purple-400" />Algorithm Registry</h1>
          <p className="text-gray-400 mt-1 text-sm">10 registered algorithms · algo-10 through algo-19</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search by name, ID, or tag…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0d1117] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 w-64"
            />
          </div>
          <div className="flex gap-1">
            {["all", "nlp", "code"].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${categoryFilter === cat ? "bg-purple-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
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
              <div className="py-16 text-center text-gray-500">Loading…</div>
            ) : (
              <div className="space-y-3">
                {filtered.map((algo) => {
                  const pct = algo.total_tests > 0 ? Math.round((algo.tests_passing / algo.total_tests) * 100) : 0
                  return (
                    <button
                      key={algo.algo_id}
                      onClick={() => setSelected(algo)}
                      className={`w-full text-left bg-[#0d1117] border rounded-xl p-5 hover:border-white/20 transition-all ${selected?.algo_id === algo.algo_id ? "border-purple-500/50 bg-purple-900/10" : "border-white/10"}`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono text-gray-500 bg-white/5 px-2 py-1 rounded">{algo.algo_id}</span>
                          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[algo.category] || ""}`}>{algo.category}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-500 shrink-0">
                          <span className={`px-2 py-0.5 rounded-full border font-medium text-xs ${getAlgoStatus(pct).color}`}>
                            {getAlgoStatus(pct).label}
                          </span>
                          <Sparkline baseLatency={algo.avg_latency_ms} />
                          <span className="text-green-400 font-mono">{pct}%</span>
                          <span>{algo.avg_latency_ms}ms</span>
                        </div>
                      </div>
                      <h3 className="font-semibold text-sm mt-2">{algo.name}</h3>
                      <p className="text-xs text-gray-400 mt-1 line-clamp-1">{algo.description}</p>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {algo.tags.map((tag) => (
                          <span key={tag} className="text-[10px] text-gray-600 bg-white/5 px-1.5 py-0.5 rounded">{tag}</span>
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
              <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 sticky top-24">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono text-gray-500">{selected.algo_id}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[selected.category] || ""}`}>{selected.category}</span>
                </div>
                <h2 className="font-bold text-lg mb-1">{selected.name}</h2>
                <p className="text-sm text-gray-400 mb-4">{selected.description}</p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-green-400">{Math.round((selected.tests_passing / selected.total_tests) * 100)}%</p>
                    <p className="text-xs text-gray-500 mt-0.5">{selected.tests_passing}/{selected.total_tests} tests</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-blue-400">{selected.avg_latency_ms}ms</p>
                    <p className="text-xs text-gray-500 mt-0.5">avg latency</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Input Schema</p>
                  <div className="space-y-1">
                    {Object.entries(selected.input_schema).map(([k, v]) => (
                      <div key={k} className="flex justify-between text-xs">
                        <span className="text-purple-400 font-mono">{k}</span>
                        <span className="text-gray-500">{v}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Endpoints</p>
                  <div className="space-y-1">
                    {Object.entries(selected.endpoints).map(([method, path]) => (
                      <div key={method} className="flex items-center gap-2 text-xs">
                        <span className="text-yellow-400 font-mono uppercase w-10">{method}</span>
                        <span className="text-gray-400 font-mono">{path}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">Example Input</p>
                  <pre className="text-xs font-mono text-green-300 bg-[#080c14] rounded-lg p-3 overflow-auto max-h-32">
                    {JSON.stringify(selected.example_input, null, 2)}
                  </pre>
                </div>

                <Link href={`/studio/playground?algo=${selected.algo_id}`}>
                  <button className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
                    <Play className="w-4 h-4" />Run in Playground
                  </button>
                </Link>
              </div>
            ) : (
              <div className="bg-[#0d1117] border border-white/10 rounded-xl p-8 text-center text-gray-600 sticky top-24">
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
