"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  BookOpen,
  ChevronLeft,
  Play,
  Clock,
  CheckCircle,
  XCircle,
  Tag,
  Cpu,
  Network,
  FileJson,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StudioSidebar } from "@/components/studio/studio-sidebar"
import { useRequireAuth } from "@/lib/auth/use-require-auth"

const STUDIO_API = process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:8054"

interface AlgorithmDetail {
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

export default function AlgorithmDetailPage() {
  const { isLoading: authLoading } = useRequireAuth()
  const params = useParams()
  const algoId = typeof params?.algo_id === "string" ? params.algo_id : ""

  const [algo, setAlgo] = useState<AlgorithmDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (authLoading || !algoId) return

    const fetchAlgo = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${STUDIO_API}/algorithms/${algoId}`)
        if (!res.ok) {
          // Fallback: try fetching the full list and finding by algo_id
          const listRes = await fetch(`${STUDIO_API}/algorithms`)
          if (listRes.ok) {
            const list: AlgorithmDetail[] = await listRes.json()
            const found = list.find((a) => a.algo_id === algoId)
            if (found) { setAlgo(found); return }
          }
          setError(`Algorithm "${algoId}" not found.`)
          return
        }
        setAlgo(await res.json())
      } catch {
        setError("Studio backend is offline. Cannot load algorithm details.")
      } finally {
        setLoading(false)
      }
    }

    void fetchAlgo()
  }, [authLoading, algoId])

  const pct = algo && algo.total_tests > 0
    ? Math.round((algo.tests_passing / algo.total_tests) * 100)
    : 0
  const status = algo ? getAlgoStatus(pct) : null

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      <div className="flex">
        <StudioSidebar />

        <main className="flex-1 p-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/studio" className="hover:text-foreground transition-colors">Studio</Link>
            <span>/</span>
            <Link href="/studio/algorithms" className="hover:text-foreground flex items-center gap-1 transition-colors">
              <BookOpen className="w-3 h-3" />
              Algorithms
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">{algoId}</span>
          </div>

          {authLoading || loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-10 bg-muted rounded-xl w-72" />
              <div className="grid grid-cols-2 gap-4">
                <div className="h-40 bg-muted rounded-xl" />
                <div className="h-40 bg-muted rounded-xl" />
              </div>
              <div className="h-32 bg-muted rounded-xl" />
            </div>
          ) : error ? (
            <div className="py-24 text-center">
              <XCircle className="w-12 h-12 text-destructive/40 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">{error}</p>
              <div className="mt-6 flex justify-center gap-3">
                <Link
                  href="/studio/algorithms"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-muted border border-border text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Back to Algorithms
                </Link>
              </div>
            </div>
          ) : algo ? (
            <div className="max-w-4xl space-y-6">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <code className="text-sm text-muted-foreground bg-muted px-2.5 py-1 rounded font-mono">
                      {algo.algo_id}
                    </code>
                    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[algo.category] || "text-muted-foreground bg-muted border-border"}`}>
                      {algo.category}
                    </span>
                    {status && (
                      <span className={`text-xs px-2.5 py-0.5 rounded-full border font-medium ${status.color}`}>
                        {status.label}
                      </span>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-foreground">{algo.name}</h1>
                  <p className="text-muted-foreground mt-1 max-w-2xl">{algo.description}</p>
                </div>
                <Link
                  href={`/studio/playground?algo=${algo.algo_id}`}
                  className="flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shrink-0"
                >
                  <Play className="w-4 h-4" />
                  Test in Playground
                </Link>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-500 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-emerald-500">{pct}%</p>
                  <p className="text-xs text-muted-foreground mt-1">Test Pass Rate</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                  <Cpu className="w-5 h-5 text-primary mx-auto mb-1" />
                  <p className="text-2xl font-bold text-primary">{algo.tests_passing}</p>
                  <p className="text-xs text-muted-foreground mt-1">Tests Passing</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                  <Clock className="w-5 h-5 text-amber-500 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-amber-500">{algo.avg_latency_ms}</p>
                  <p className="text-xs text-muted-foreground mt-1">Avg Latency (ms)</p>
                </div>
                <div className="bg-card border border-border rounded-xl p-4 text-center shadow-sm">
                  <Network className="w-5 h-5 text-blue-500 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-foreground">:{algo.port}</p>
                  <p className="text-xs text-muted-foreground mt-1">Service Port</p>
                </div>
              </div>

              {/* Tags */}
              {algo.tags && algo.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  {algo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-0.5 rounded-full bg-muted border border-border text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                {/* Input Schema */}
                {algo.input_schema && Object.keys(algo.input_schema).length > 0 && (
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h2 className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
                      <FileJson className="w-4 h-4 text-primary" />
                      Input Schema
                    </h2>
                    <div className="space-y-2">
                      {Object.entries(algo.input_schema).map(([key, type]) => (
                        <div key={key} className="flex items-center gap-3">
                          <code className="text-xs font-mono text-primary bg-primary/10 px-2 py-0.5 rounded min-w-20">{key}</code>
                          <span className="text-xs text-muted-foreground">{type}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Endpoints */}
                {algo.endpoints && Object.keys(algo.endpoints).length > 0 && (
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <h2 className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
                      <Network className="w-4 h-4 text-blue-500" />
                      Endpoints
                    </h2>
                    <div className="space-y-2">
                      {Object.entries(algo.endpoints).map(([method, path]) => (
                        <div key={method} className="flex items-center gap-3">
                          <code className="text-xs font-mono text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded min-w-16 text-center">{method.toUpperCase()}</code>
                          <code className="text-xs font-mono text-muted-foreground">{path}</code>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Example Input */}
              {algo.example_input && Object.keys(algo.example_input).length > 0 && (
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h2 className="font-semibold text-sm text-foreground mb-4 flex items-center gap-2">
                    <FileJson className="w-4 h-4 text-emerald-500" />
                    Example Input
                  </h2>
                  <pre className="text-xs text-emerald-400 bg-muted/50 rounded-lg p-4 overflow-auto max-h-48 font-mono leading-relaxed">
                    {JSON.stringify(algo.example_input, null, 2)}
                  </pre>
                </div>
              )}

              {/* Version info */}
              <div className="flex items-center gap-4 pt-2 text-xs text-muted-foreground border-t border-border">
                <span>Version: <code className="font-mono text-foreground">{algo.version}</code></span>
                <span>Port: <code className="font-mono text-foreground">{algo.port}</code></span>
              </div>
            </div>
          ) : null}
        </main>
      </div>

      <Footer />
    </div>
  )
}
