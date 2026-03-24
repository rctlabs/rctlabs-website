"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Play, ChevronLeft, RefreshCw, Zap, Eye, Trash2 } from "lucide-react"
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

interface PlaygroundResult {
  run_id: string
  algo_id: string
  input_data: Record<string, unknown>
  output: Record<string, unknown>
  latency_ms: number
  model_used: string
  timestamp: string
  trace?: Record<string, unknown>
}

interface HistoryEntry {
  run_id: string
  algo_id: string
  latency_ms: number
  timestamp: string
  model_used: string
}

export default function PlaygroundPage() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])
  const [selectedAlgo, setSelectedAlgo] = useState("algo-10")
  const [inputText, setInputText] = useState("")
  const [modelOverride, setModelOverride] = useState("")
  const [enableTrace, setEnableTrace] = useState(false)
  const [result, setResult] = useState<PlaygroundResult | null>(null)
  const [history, setHistory] = useState<HistoryEntry[]>([])
  const [running, setRunning] = useState(false)
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [error, setError] = useState("")

  async function fetchData() {
    const [algoRes, histRes] = await Promise.allSettled([
      fetch(`${STUDIO_API}/algorithms`),
      fetch(`${STUDIO_API}/playground/history`),
    ])
    if (algoRes.status === "fulfilled" && algoRes.value.ok) {
      const algos: Algorithm[] = await algoRes.value.json()
      setAlgorithms(algos)
      if (algos.length > 0) {
        const first = algos[0]
        setSelectedAlgo(first.algo_id)
        setInputText(JSON.stringify(first.example_input, null, 2))
      }
    }
    if (histRes.status === "fulfilled" && histRes.value.ok) setHistory(await histRes.value.json())
  }

  async function runAlgorithm() {
    setRunning(true)
    setError("")
    setResult(null)
    try {
      let parsed: Record<string, unknown>
      try { parsed = JSON.parse(inputText) } catch { setError("Invalid JSON input"); setRunning(false); return }
      const res = await fetch(`${STUDIO_API}/playground/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algo_id: selectedAlgo, input_data: parsed, model_override: modelOverride || undefined, trace: enableTrace }),
      })
      if (!res.ok) { setError(`Error: ${res.status}`); setRunning(false); return }
      const r: PlaygroundResult = await res.json()
      setResult(r)
      setHistory((prev) => [{ run_id: r.run_id, algo_id: r.algo_id, latency_ms: r.latency_ms, timestamp: r.timestamp, model_used: r.model_used }, ...prev].slice(0, 20))
    } catch { setError("Backend offline or network error") } finally { setRunning(false) }
  }

  async function clearHistory() {
    setLoadingHistory(true)
    try {
      await fetch(`${STUDIO_API}/playground/history`, { method: "DELETE" })
      setHistory([])
    } finally { setLoadingHistory(false) }
  }

  useEffect(() => { fetchData() }, [])

  const selectedAlgoObj = algorithms.find((a) => a.algo_id === selectedAlgo)

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/studio" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Studio</Link>
          <span>/</span>
          <span className="text-white">Playground</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3"><Play className="w-8 h-8 text-green-400" />Playground</h1>
          <p className="text-gray-400 mt-1 text-sm">Interactive algorithm execution with optional distributed tracing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Algorithm selector */}
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5">
              <label className="text-xs text-gray-400 uppercase tracking-wider mb-3 block">Algorithm</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {algorithms.map((a) => (
                  <button
                    key={a.algo_id}
                    onClick={() => {
                      setSelectedAlgo(a.algo_id)
                      setInputText(JSON.stringify(a.example_input, null, 2))
                      setResult(null)
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors ${selectedAlgo === a.algo_id ? "bg-green-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
                  >
                    <span className="font-mono text-xs">{a.algo_id}</span>
                    <p className="truncate text-[10px] mt-0.5 text-white/60">{a.name.split("(")[0].trim()}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Input JSON */}
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs text-gray-400 uppercase tracking-wider">Input (JSON)</label>
                {selectedAlgoObj && (
                  <button
                    onClick={() => setInputText(JSON.stringify(selectedAlgoObj.example_input, null, 2))}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Load example
                  </button>
                )}
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={10}
                className="w-full bg-[#080c14] border border-white/10 rounded-lg px-4 py-3 text-sm font-mono text-green-300 placeholder-gray-600 focus:outline-none focus:border-green-500 resize-y"
                placeholder='{"text": "..."}'
              />
              {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
            </div>

            {/* Options */}
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 flex flex-wrap gap-4 items-center">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-gray-400 mb-1 block">Model Override (optional)</label>
                <input
                  value={modelOverride}
                  onChange={(e) => setModelOverride(e.target.value)}
                  placeholder="e.g. gpt-4o"
                  className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-green-500"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer mt-4">
                <input type="checkbox" checked={enableTrace} onChange={(e) => setEnableTrace(e.target.checked)} className="accent-green-500" />
                Enable Distributed Trace
              </label>
              <Button onClick={runAlgorithm} disabled={running} className="bg-green-600 hover:bg-green-700 text-white mt-4 ml-auto">
                <Zap className={`w-4 h-4 mr-2 ${running ? "animate-pulse" : ""}`} />
                {running ? "Running…" : "Run Algorithm"}
              </Button>
            </div>

            {/* Result */}
            {result && (
              <div className="bg-[#080c14] border border-green-500/30 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-green-400 flex items-center gap-2">
                    <Eye className="w-4 h-4" />Result — {result.run_id}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-gray-500">
                    <span>{result.latency_ms}ms</span>
                    <span>Model: {result.model_used}</span>
                  </div>
                </div>
                <pre className="text-xs text-green-300 font-mono overflow-auto max-h-64 leading-relaxed">
                  {JSON.stringify(result.output, null, 2)}
                </pre>
                {result.trace && (
                  <details className="mt-3">
                    <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-300">Trace data</summary>
                    <pre className="text-xs text-gray-400 font-mono overflow-auto max-h-48 mt-2">
                      {JSON.stringify(result.trace, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>

          {/* History sidebar */}
          <div className="space-y-4">
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold">Run History</h3>
                <Button variant="ghost" size="sm" onClick={clearHistory} disabled={loadingHistory || history.length === 0} className="text-gray-500 hover:text-red-400 p-1.5">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {history.length === 0 ? (
                <p className="text-xs text-gray-600 text-center py-8">No runs yet</p>
              ) : (
                <div className="space-y-2">
                  {history.map((h) => (
                    <div key={h.run_id} className="rounded-lg bg-white/3 border border-white/5 p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-purple-400">{h.algo_id}</span>
                        <span className="text-xs text-gray-600">{h.latency_ms}ms</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{h.model_used}</p>
                      <p className="text-xs text-gray-700 mt-0.5">{new Date(h.timestamp).toLocaleTimeString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5">
              <h3 className="text-sm font-semibold mb-3">What is this?</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                The Playground lets you run any RCT algorithm against live input data. Results are deterministic in mock mode — connect to live microservices to see actual inference output.
              </p>
              <div className="mt-3 space-y-1.5">
                <Link href="/studio/compare" className="block text-xs text-blue-400 hover:text-blue-300">→ Compare multiple models</Link>
                <Link href="/studio/experiments" className="block text-xs text-blue-400 hover:text-blue-300">→ Save as experiment</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
