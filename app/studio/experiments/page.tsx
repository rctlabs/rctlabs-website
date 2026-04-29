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
  draft: "text-gray-400 bg-gray-400/10 border-gray-400/30",
  running: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  completed: "text-green-400 bg-green-400/10 border-green-400/30",
  failed: "text-red-400 bg-red-400/10 border-red-400/30",
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
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/studio" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Studio</Link>
          <span>/</span>
          <span className="text-white">Experiments</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3"><Beaker className="w-8 h-8 text-yellow-400" />Experiments</h1>
            <p className="text-gray-400 mt-1 text-sm">Create, track, and complete algorithm experiments</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-yellow-600 hover:bg-yellow-500 text-white">
            <Plus className="w-4 h-4 mr-2" />New Experiment
          </Button>
        </div>

        {/* Create form */}
        {showForm && (
          <div className="bg-[#0d1117] border border-yellow-500/30 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">New Experiment</h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: "Name", key: "name", placeholder: "Experiment name" },
                { label: "Description", key: "description", placeholder: "What are you testing?" },
                { label: "Algorithm ID", key: "algo_id", placeholder: "algo-10" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                  <input
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-yellow-500"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Config (JSON)</label>
                <textarea
                  value={form.config}
                  onChange={(e) => setForm({ ...form, config: e.target.value })}
                  rows={3}
                  className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm font-mono text-yellow-300 placeholder-gray-600 focus:outline-none focus:border-yellow-500"
                />
              </div>
            </div>
            {formError && <p className="text-red-400 text-xs mb-3">{formError}</p>}
            <div className="flex gap-3">
              <Button onClick={createExperiment} className="bg-yellow-600 hover:bg-yellow-500 text-white text-sm">Create</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-sm">Cancel</Button>
            </div>
          </div>
        )}

        {/* Experiments list */}
        {loading ? (
          <div className="py-16 text-center text-gray-500">Loading experiments…</div>
        ) : experiments.length === 0 ? (
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-16 text-center text-gray-500">
            No experiments yet — create your first one above.
          </div>
        ) : (
          <div className="space-y-4">
            {experiments.map((exp) => {
              const Icon = STATUS_ICONS[exp.status] || Clock
              return (
                <div key={exp.experiment_id} className="bg-[#0d1117] border border-white/10 rounded-xl p-6 hover:border-white/20 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-semibold">{exp.name}</h3>
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-xs font-medium ${STATUS_STYLES[exp.status]}`}>
                          <Icon className={`w-3 h-3 ${exp.status === "running" ? "animate-spin" : ""}`} />
                          {exp.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{exp.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        <span className="text-purple-400">{exp.algo_id}</span>
                        <span>Created {new Date(exp.created_at).toLocaleString()}</span>
                        {exp.started_at && <span>Started {new Date(exp.started_at).toLocaleString()}</span>}
                      </div>
                      {exp.metrics && (
                        <div className="flex gap-4 mt-3">
                          {exp.metrics.accuracy_pct !== undefined && (
                            <div className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
                              <p className="text-sm font-bold text-green-400">{exp.metrics.accuracy_pct}%</p>
                              <p className="text-[10px] text-gray-500">Accuracy</p>
                            </div>
                          )}
                          {exp.metrics.latency_p95_ms !== undefined && (
                            <div className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
                              <p className="text-sm font-bold text-blue-400">{exp.metrics.latency_p95_ms}ms</p>
                              <p className="text-[10px] text-gray-500">p95 Latency</p>
                            </div>
                          )}
                          {exp.metrics.throughput_rps !== undefined && (
                            <div className="bg-white/5 rounded-lg px-3 py-1.5 text-center">
                              <p className="text-sm font-bold text-yellow-400">{exp.metrics.throughput_rps}</p>
                              <p className="text-[10px] text-gray-500">RPS</p>
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
                          className="border-blue-500/30 text-blue-400 hover:bg-blue-400/10 text-xs"
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
                          className="border-green-500/30 text-green-400 hover:bg-green-400/10 text-xs"
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
