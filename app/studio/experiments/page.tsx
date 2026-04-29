"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Beaker, ChevronLeft, Plus, Play, CheckCircle, Clock, Loader, PauseCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useRequireAuth } from "@/lib/auth/use-require-auth"

const STUDIO_API = process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:8054"

interface Experiment {
  experiment_id: string
  name: string
  description: string
  algo_id: string
  config: Record<string, unknown>
  status: "draft" | "running" | "completed" | "failed"
  created_at: string
  started_at?: string
  completed_at?: string
  results?: Record<string, unknown>
  metrics?: { accuracy_pct?: number; latency_p95_ms?: number; throughput_rps?: number }
}

const STATUS_STYLES: Record<string, string> = {
  draft: "text-muted-foreground bg-muted border-border",
  running: "text-blue-500 bg-blue-500/10 border-blue-500/30",
  completed: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30",
  failed: "text-destructive bg-destructive/10 border-destructive/30",
}

const STATUS_ICONS: Record<string, React.FC<{ className?: string }>> = {
  draft: PauseCircle,
  running: Loader,
  completed: CheckCircle,
  failed: Clock,
}

export default function ExperimentsPage() {
  useRequireAuth()
  const [experiments, setExperiments] = useState<Experiment[]>([])
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState<Set<string>>(new Set())
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: "", description: "", algo_id: "algo-10", config: "{}" })
  const [formError, setFormError] = useState("")

  async function fetchExperiments() {
    setLoading(true)
    try {
      const res = await fetch(`${STUDIO_API}/experiments`)
      if (res.ok) setExperiments(await res.json())
    } catch { /* offline */ } finally { setLoading(false) }
  }

  async function createExperiment() {
    setFormError("")
    let config: Record<string, unknown>
    try { config = JSON.parse(form.config) } catch { setFormError("Invalid JSON config"); return }
    try {
      await fetch(`${STUDIO_API}/experiments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, config }),
      })
      setShowForm(false)
      setForm({ name: "", description: "", algo_id: "algo-10", config: "{}" })
      fetchExperiments()
    } catch { setFormError("Backend offline") }
  }

  async function startExperiment(id: string) {
    setActing((prev) => new Set(prev).add(id))
    try {
      await fetch(`${STUDIO_API}/experiments/${id}/start`, { method: "POST" })
      fetchExperiments()
    } finally { setActing((prev) => { const s = new Set(prev); s.delete(id); return s }) }
  }

  async function completeExperiment(id: string) {
    setActing((prev) => new Set(prev).add(id))
    try {
      await fetch(`${STUDIO_API}/experiments/${id}/complete`, { method: "POST" })
      fetchExperiments()
    } finally { setActing((prev) => { const s = new Set(prev); s.delete(id); return s }) }
  }

  useEffect(() => { fetchExperiments() }, [])

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/studio" className="hover:text-foreground flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Studio</Link>
          <span>/</span>
          <span className="text-foreground">Experiments</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3 text-foreground"><Beaker className="w-8 h-8 text-amber-500" />Experiments</h1>
            <p className="text-muted-foreground mt-1 text-sm">Create, track, and complete algorithm experiments</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-sm">
            <Plus className="w-4 h-4 mr-2" />New Experiment
          </Button>
        </div>

        {/* Create form */}
        {showForm && (
          <div className="bg-card border border-primary/30 rounded-xl p-6 mb-8 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-foreground">New Experiment</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: "Name", key: "name", placeholder: "Experiment name" },
                { label: "Description", key: "description", placeholder: "What are you testing?" },
                { label: "Algorithm ID", key: "algo_id", placeholder: "algo-10" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-muted-foreground mb-1 block">{label}</label>
                  <input
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Config (JSON)</label>
                <textarea
                  value={form.config}
                  onChange={(e) => setForm({ ...form, config: e.target.value })}
                  rows={3}
                  className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm font-mono text-primary placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                />
              </div>
            </div>
            {formError && <p className="text-destructive text-xs mb-3">{formError}</p>}
            <div className="flex gap-3">
              <Button onClick={createExperiment} className="bg-primary hover:bg-primary/90 text-primary-foreground text-sm shadow-sm">Create</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)} className="text-muted-foreground hover:text-foreground text-sm transition-colors">Cancel</Button>
            </div>
          </div>
        )}

        {/* Experiments list */}
        {loading ? (
          <div className="py-16 text-center text-muted-foreground">Loading experiments…</div>
        ) : experiments.length === 0 ? (
          <div className="bg-card border border-border rounded-xl p-16 text-center text-muted-foreground shadow-sm">
            No experiments yet — create your first one above.
          </div>
        ) : (
          <div className="space-y-4">
            {experiments.map((exp) => {
              const Icon = STATUS_ICONS[exp.status] || Clock
              return (
                <div key={exp.experiment_id} className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 hover:shadow-md transition-all shadow-sm">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold text-foreground">{exp.name}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium ${STATUS_STYLES[exp.status]}`}>
                          <Icon className={`w-3 h-3 ${exp.status === "running" ? "animate-spin" : ""}`} />
                          {exp.status}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{exp.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <span className="text-primary">{exp.algo_id}</span>
                        <span>Created {new Date(exp.created_at).toLocaleString()}</span>
                        {exp.started_at && <span>Started {new Date(exp.started_at).toLocaleString()}</span>}
                      </div>
                      {exp.metrics && (
                        <div className="flex gap-4 mt-3">
                          {exp.metrics.accuracy_pct !== undefined && (
                            <div className="bg-muted/50 border border-border rounded-lg px-3 py-1.5 text-center">
                              <p className="text-sm font-bold text-emerald-500">{exp.metrics.accuracy_pct}%</p>
                              <p className="text-[10px] text-muted-foreground">Accuracy</p>
                            </div>
                          )}
                          {exp.metrics.latency_p95_ms !== undefined && (
                            <div className="bg-muted/50 border border-border rounded-lg px-3 py-1.5 text-center">
                              <p className="text-sm font-bold text-blue-500">{exp.metrics.latency_p95_ms}ms</p>
                              <p className="text-[10px] text-muted-foreground">p95 Latency</p>
                            </div>
                          )}
                          {exp.metrics.throughput_rps !== undefined && (
                            <div className="bg-muted/50 border border-border rounded-lg px-3 py-1.5 text-center">
                              <p className="text-sm font-bold text-amber-500">{exp.metrics.throughput_rps}</p>
                              <p className="text-[10px] text-muted-foreground">RPS</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 shrink-0">
                      {exp.status === "draft" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => startExperiment(exp.experiment_id)}
                          disabled={acting.has(exp.experiment_id)}
                          className="border-blue-500/30 text-blue-500 hover:bg-blue-500/10 text-xs"
                        >
                          <Play className="w-3.5 h-3.5 mr-1.5" />Start
                        </Button>
                      )}
                      {exp.status === "running" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => completeExperiment(exp.experiment_id)}
                          disabled={acting.has(exp.experiment_id)}
                          className="border-emerald-500/30 text-emerald-500 hover:bg-emerald-500/10 text-xs"
                        >
                          <CheckCircle className="w-3.5 h-3.5 mr-1.5" />Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}
