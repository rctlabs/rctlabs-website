"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, PlusCircle, CheckCircle, ChevronLeft, RefreshCw, Zap, ShieldAlert } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_CONSOLE_URL || "http://localhost:8053"

interface Incident {
  incident_id: string
  title: string
  description: string
  service: string
  severity: "low" | "medium" | "high" | "critical"
  status: "open" | "investigating" | "resolved"
  created_at: string
  resolved_at?: string
  created_by: string
}

const SEVERITY_STYLES: Record<string, string> = {
  low: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  high: "text-orange-400 bg-orange-400/10 border-orange-400/30",
  critical: "text-red-400 bg-red-400/10 border-red-400/30",
}

const STATUS_STYLES: Record<string, string> = {
  open: "text-red-400",
  investigating: "text-yellow-400",
  resolved: "text-green-400",
}

export default function IncidentsPage() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [resolving, setResolving] = useState<Set<string>>(new Set())
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ title: "", description: "", service: "", severity: "medium" })

  async function fetchIncidents() {
    setLoading(true)
    try {
      const res = await fetch(`${ADMIN_API}/incidents`)
      if (res.ok) setIncidents(await res.json())
    } catch { /* offline */ } finally { setLoading(false) }
  }

  async function createIncident() {
    try {
      await fetch(`${ADMIN_API}/incidents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, created_by: "system" }),
      })
      setShowForm(false)
      setForm({ title: "", description: "", service: "", severity: "medium" })
      fetchIncidents()
    } catch { /* offline */ }
  }

  async function resolveIncident(id: string) {
    setResolving((prev) => new Set(prev).add(id))
    try {
      await fetch(`${ADMIN_API}/incidents/${id}/resolve`, { method: "PATCH" })
      fetchIncidents()
    } finally {
      setResolving((prev) => { const s = new Set(prev); s.delete(id); return s })
    }
  }

  useEffect(() => { fetchIncidents() }, [])

  const open = incidents.filter((i) => i.status !== "resolved")
  const resolved = incidents.filter((i) => i.status === "resolved")

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/admin" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Admin</Link>
          <span>/</span>
          <span className="text-white">Incidents</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3"><ShieldAlert className="w-8 h-8 text-red-400" />Incidents</h1>
            <p className="text-gray-400 mt-1 text-sm">Track, investigate, and resolve system incidents</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" size="sm" onClick={fetchIncidents} className="border-white/20 text-white hover:bg-white/10">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />Refresh
            </Button>
            <Button onClick={() => setShowForm(!showForm)} className="bg-red-700 hover:bg-red-600 text-white">
              <PlusCircle className="w-4 h-4 mr-2" />Report Incident
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-[#0d1117] border border-red-500/20 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-red-400">{open.length}</p>
            <p className="text-sm text-gray-400 mt-1">Open Incidents</p>
          </div>
          <div className="bg-[#0d1117] border border-yellow-500/20 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-yellow-400">{open.filter((i) => i.severity === "critical" || i.severity === "high").length}</p>
            <p className="text-sm text-gray-400 mt-1">High/Critical</p>
          </div>
          <div className="bg-[#0d1117] border border-green-500/20 rounded-xl p-5 text-center">
            <p className="text-3xl font-bold text-green-400">{resolved.length}</p>
            <p className="text-sm text-gray-400 mt-1">Resolved (all time)</p>
          </div>
        </div>

        {/* Create Form */}
        {showForm && (
          <div className="bg-[#0d1117] border border-red-500/30 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-red-400" />Report New Incident
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-4">
              {[
                { label: "Title", key: "title", placeholder: "Brief description of the incident" },
                { label: "Service", key: "service", placeholder: "Affected service name" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                  <input
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Severity</label>
                <select
                  value={form.severity}
                  onChange={(e) => setForm({ ...form, severity: e.target.value })}
                  className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option>low</option><option>medium</option><option>high</option><option>critical</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Description</label>
                <input
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Details…"
                  className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={createIncident} className="bg-red-700 hover:bg-red-600 text-white text-sm">Submit Incident</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-sm">Cancel</Button>
            </div>
          </div>
        )}

        {/* Open Incidents */}
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-400" />Open ({open.length})
        </h2>
        <div className="space-y-3 mb-8">
          {open.length === 0 && !loading && (
            <div className="bg-[#0d1117] border border-green-500/20 rounded-xl p-8 text-center">
              <CheckCircle className="w-10 h-10 text-green-400 mx-auto mb-3" />
              <p className="text-green-400 font-semibold">All Clear</p>
              <p className="text-gray-500 text-sm mt-1">No open incidents</p>
            </div>
          )}
          {open.map((inc) => (
            <div key={inc.incident_id} className="bg-[#0d1117] border border-white/10 rounded-xl p-5 flex items-start justify-between gap-4 hover:border-white/20 transition-colors">
              <div className="flex items-start gap-3 flex-1">
                <span className={`mt-0.5 inline-flex items-center px-2 py-0.5 rounded-full border text-xs font-medium ${SEVERITY_STYLES[inc.severity]}`}>
                  {inc.severity}
                </span>
                <div className="flex-1">
                  <p className="font-medium">{inc.title}</p>
                  <p className="text-sm text-gray-400 mt-0.5">{inc.description}</p>
                  <p className="text-xs text-gray-600 mt-1">
                    [{inc.service}] · <span className={STATUS_STYLES[inc.status]}>{inc.status}</span> · {new Date(inc.created_at).toLocaleString()}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => resolveIncident(inc.incident_id)}
                disabled={resolving.has(inc.incident_id)}
                className="border-green-500/30 text-green-400 hover:bg-green-400/10 shrink-0 text-xs"
              >
                <CheckCircle className="w-3.5 h-3.5 mr-1.5" />
                {resolving.has(inc.incident_id) ? "Resolving…" : "Resolve"}
              </Button>
            </div>
          ))}
        </div>

        {/* Resolved */}
        {resolved.length > 0 && (
          <>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-400">
              <CheckCircle className="w-5 h-5 text-green-400" />Resolved ({resolved.length})
            </h2>
            <div className="space-y-2">
              {resolved.slice(0, 5).map((inc) => (
                <div key={inc.incident_id} className="bg-[#0d1117]/50 border border-white/5 rounded-xl p-4 flex items-center gap-3 opacity-70">
                  <CheckCircle className="w-4 h-4 text-green-400 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-300">{inc.title}</p>
                    <p className="text-xs text-gray-600">[{inc.service}] · Resolved {inc.resolved_at ? new Date(inc.resolved_at).toLocaleString() : ""}</p>
                  </div>
                  <span className="text-xs text-gray-600">{inc.severity}</span>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  )
}
