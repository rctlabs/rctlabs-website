"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { GitCompare, ChevronLeft, Zap, Plus, X } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const STUDIO_API = process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:8054"

interface Algorithm {
  algo_id: string
  name: string
  category: string
  example_input: Record<string, unknown>
}

interface CompareResult {
  algo_id: string
  model: string
  latency_ms: number
  output: Record<string, unknown>
  error?: string
}

export default function ComparePage() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])
  const [selectedAlgo, setSelectedAlgo] = useState("algo-10")
  const [inputText, setInputText] = useState("")
  const [models, setModels] = useState<string[]>(["", ""])
  const [results, setResults] = useState<CompareResult[]>([])
  const [running, setRunning] = useState(false)
  const [error, setError] = useState("")

  async function fetchAlgorithms() {
    try {
      const res = await fetch(`${STUDIO_API}/algorithms`)
      if (res.ok) {
        const algos: Algorithm[] = await res.json()
        setAlgorithms(algos)
        if (algos.length > 0) {
          setSelectedAlgo(algos[0].algo_id)
          setInputText(JSON.stringify(algos[0].example_input, null, 2))
        }
      }
    } catch { /* offline */ }
  }

  async function runComparison() {
    setRunning(true)
    setError("")
    setResults([])
    try {
      let parsed: Record<string, unknown>
      try { parsed = JSON.parse(inputText) } catch { setError("Invalid JSON input"); setRunning(false); return }
      const activeModels = models.filter((m) => m.trim() !== "")
      const res = await fetch(`${STUDIO_API}/compare`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algo_id: selectedAlgo, input_data: parsed, models: activeModels.length > 0 ? activeModels : undefined }),
      })
      if (!res.ok) { setError(`Error: ${res.status}`); setRunning(false); return }
      setResults(await res.json())
    } catch { setError("Backend offline") } finally { setRunning(false) }
  }

  useEffect(() => { fetchAlgorithms() }, [])

  const fastest = results.length > 0 ? results.reduce((a, b) => a.latency_ms < b.latency_ms ? a : b) : null

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/studio" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Studio</Link>
          <span>/</span>
          <span className="text-white">Compare</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3"><GitCompare className="w-8 h-8 text-blue-400" />Model Comparison</h1>
          <p className="text-gray-400 mt-1 text-sm">Run the same input through multiple model variants and compare outputs side-by-side</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Config panel */}
          <div className="space-y-4">
            {/* Algorithm */}
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5">
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-3 block">Algorithm</label>
              <select
                value={selectedAlgo}
                onChange={(e) => {
                  setSelectedAlgo(e.target.value)
                  const a = algorithms.find((x) => x.algo_id === e.target.value)
                  if (a) setInputText(JSON.stringify(a.example_input, null, 2))
                  setResults([])
                }}
                className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
              >
                {algorithms.map((a) => (
                  <option key={a.algo_id} value={a.algo_id}>{a.algo_id} — {a.name.split("(")[0].trim()}</option>
                ))}
              </select>
            </div>

            {/* Models */}
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5">
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-3 block">Models to Compare</label>
              <p className="text-xs text-gray-600 mb-3">Leave empty to use default models defined per-algorithm</p>
              <div className="space-y-2">
                {models.map((m, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      value={m}
                      onChange={(e) => {
                        const next = [...models]
                        next[i] = e.target.value
                        setModels(next)
                      }}
                      placeholder={`Model variant ${i + 1}`}
                      className="flex-1 bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                    />
                    {models.length > 1 && (
                      <button onClick={() => setModels(models.filter((_, j) => j !== i))} className="text-gray-500 hover:text-red-400 p-1">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                {models.length < 5 && (
                  <button onClick={() => setModels([...models, ""])} className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1 mt-1">
                    <Plus className="w-3 h-3" />Add model
                  </button>
                )}
              </div>
            </div>

            <Button onClick={runComparison} disabled={running} className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <Zap className={`w-4 h-4 mr-2 ${running ? "animate-pulse" : ""}`} />
              {running ? "Comparing…" : "Run Comparison"}
            </Button>
            {error && <p className="text-red-400 text-xs">{error}</p>}
          </div>

          {/* Input + Results */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5">
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-3 block">Input (JSON)</label>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={8}
                className="w-full bg-[#080c14] border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-blue-300 placeholder-gray-600 focus:outline-none focus:border-blue-500 resize-y"
              />
            </div>

            {results.length > 0 && (
              <div>
                {fastest && (
                  <p className="text-xs text-green-400 mb-3">
                    Fastest: <strong>{fastest.model}</strong> at {fastest.latency_ms}ms
                  </p>
                )}
                <div className={`grid gap-4 ${results.length === 2 ? "grid-cols-2" : results.length >= 3 ? "grid-cols-3" : "grid-cols-1"}`}>
                  {results.map((r) => (
                    <div key={`${r.algo_id}-${r.model}`} className={`bg-[#080c14] border rounded-xl p-4 ${r === fastest ? "border-green-500/40" : "border-white/10"}`}>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold">{r.model}</span>
                        <span className={`text-xs font-mono ${r === fastest ? "text-green-400" : "text-gray-400"}`}>{r.latency_ms}ms</span>
                      </div>
                      {r.error ? (
                        <p className="text-red-400 text-xs">{r.error}</p>
                      ) : (
                        <pre className="text-xs font-mono text-blue-300 overflow-auto max-h-48 leading-relaxed">
                          {JSON.stringify(r.output, null, 2)}
                        </pre>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!running && results.length === 0 && (
              <div className="bg-[#0d1117] border border-white/5 rounded-xl p-10 text-center text-gray-600 text-sm">
                Configure models and click "Run Comparison"
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
