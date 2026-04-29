"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Play, ChevronLeft, Zap, Eye, Trash2 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useRequireAuth } from "@/lib/auth/use-require-auth"

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
  useRequireAuth()
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

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchData()
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const selectedAlgoObj = algorithms.find((a) => a.algo_id === selectedAlgo)

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/studio" className="hover:text-foreground flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Studio</Link>
          <span>/</span>
          <span className="text-foreground">Playground</span>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-3 text-foreground"><Play className="w-8 h-8 text-primary" />Playground</h1>
          <p className="text-muted-foreground mt-1 text-sm">Interactive algorithm execution with optional distributed tracing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Panel */}
          <div className="lg:col-span-2 space-y-4">
            {/* Algorithm selector */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <label className="text-xs text-muted-foreground uppercase tracking-wider mb-3 block">Algorithm</label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {algorithms.map((a) => (
                  <button
                    key={a.algo_id}
                    onClick={() => {
                      setSelectedAlgo(a.algo_id)
                      setInputText(JSON.stringify(a.example_input, null, 2))
                      setResult(null)
                    }}
                    className={`px-3 py-2 rounded-lg text-xs font-medium text-left transition-colors shadow-sm ${selectedAlgo === a.algo_id ? "bg-primary text-primary-foreground" : "bg-muted/50 text-muted-foreground hover:bg-muted"}`}
                  >
                    <span className="font-mono text-xs">{a.algo_id}</span>
                    <p className="truncate text-[10px] mt-0.5 opacity-70">{a.name.split("(")[0].trim()}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Input JSON */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <label className="text-xs text-muted-foreground uppercase tracking-wider">Input (JSON)</label>
                {selectedAlgoObj && (
                  <button
                    onClick={() => setInputText(JSON.stringify(selectedAlgoObj.example_input, null, 2))}
                    className="text-xs text-primary hover:text-primary/80 transition-colors"
                  >
                    Load example
                  </button>
                )}
              </div>
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                rows={10}
                className="w-full bg-muted border border-border rounded-lg px-4 py-3 text-sm font-mono text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary resize-y"
                placeholder='{"text": "..."}'
              />
              {error && <p className="text-destructive text-xs mt-2">{error}</p>}
            </div>

            {/* Options */}
            <div className="bg-card border border-border rounded-xl p-5 flex flex-wrap gap-4 items-center shadow-sm">
              <div className="flex-1 min-w-[200px]">
                <label className="text-xs text-muted-foreground mb-1 block">Model Override (optional)</label>
                <input
                  value={modelOverride}
                  onChange={(e) => setModelOverride(e.target.value)}
                  placeholder="e.g. gpt-4o"
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer mt-4">
                <input type="checkbox" checked={enableTrace} onChange={(e) => setEnableTrace(e.target.checked)} className="accent-primary" />
                Enable Distributed Trace
              </label>
              <Button onClick={runAlgorithm} disabled={running} className="bg-primary hover:bg-primary/90 text-primary-foreground mt-4 ml-auto shadow-sm">
                <Zap className={`w-4 h-4 mr-2 ${running ? "animate-pulse" : ""}`} />
                {running ? "Running…" : "Run Algorithm"}
              </Button>
            </div>

            {/* Result */}
            {result && (
              <div className="bg-card border border-primary/30 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <Eye className="w-4 h-4" />Result — {result.run_id}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{result.latency_ms}ms</span>
                    <span>Model: {result.model_used}</span>
                  </div>
                </div>
                <pre className="text-xs text-primary font-mono overflow-auto max-h-64 leading-relaxed">
                  {JSON.stringify(result.output, null, 2)}
                </pre>
                {result.trace && (
                  <details className="mt-3">
                    <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground transition-colors">Trace data</summary>
                    <pre className="text-xs text-muted-foreground font-mono overflow-auto max-h-48 mt-2">
                      {JSON.stringify(result.trace, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            )}
          </div>

          {/* History sidebar */}
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-foreground">Run History</h3>
                <Button variant="ghost" size="sm" onClick={clearHistory} disabled={loadingHistory || history.length === 0} className="text-muted-foreground hover:text-destructive transition-colors p-1.5">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              {history.length === 0 ? (
                <p className="text-xs text-muted-foreground/70 text-center py-8">No runs yet</p>
              ) : (
                <div className="space-y-2">
                  {history.map((h) => (
                    <div key={h.run_id} className="rounded-lg bg-muted/50 border border-border p-3">
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-mono text-primary">{h.algo_id}</span>
                        <span className="text-xs text-muted-foreground/70">{h.latency_ms}ms</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{h.model_used}</p>
                      <p className="text-xs text-muted-foreground/50 mt-0.5">{new Date(h.timestamp).toLocaleTimeString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
              <h3 className="text-sm font-semibold mb-3 text-foreground">What is this?</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                The Playground lets you run any RCT algorithm against live input data. Results are deterministic in mock mode — connect to live microservices to see actual inference output.
              </p>
              <div className="mt-3 space-y-1.5">
                <Link href="/studio/compare" className="block text-xs text-primary hover:text-primary/80 transition-colors">→ Compare multiple models</Link>
                <Link href="/studio/experiments" className="block text-xs text-primary hover:text-primary/80 transition-colors">→ Save as experiment</Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
