"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Package, PlusCircle, RotateCcw, ChevronLeft, CheckCircle, XCircle, Loader, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_CONSOLE_URL || "http://localhost:8053"

interface Deployment {
  deployment_id: string
  service: string
  version: string
  environment: "development" | "staging" | "production"
  status: "pending" | "running" | "success" | "failed" | "rolled_back"
  started_at: string
  completed_at?: string
  deployed_by: string
  notes?: string
}

const STATUS_COLORS: Record<string, string> = {
  pending: "text-gray-400 bg-gray-400/10 border-gray-400/30",
  running: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  success: "text-green-400 bg-green-400/10 border-green-400/30",
  failed: "text-red-400 bg-red-400/10 border-red-400/30",
  rolled_back: "text-orange-400 bg-orange-400/10 border-orange-400/30",
}

const STATUS_ICONS: Record<string, React.FC<{ className?: string }>> = {
  pending: Clock,
  running: Loader,
  success: CheckCircle,
  failed: XCircle,
  rolled_back: RotateCcw,
}

const ENV_COLORS: Record<string, string> = {
  development: "text-gray-400",
  staging: "text-yellow-400",
  production: "text-green-400",
}

export default function DeploymentsPage() {
  const [deployments, setDeployments] = useState<Deployment[]>([])
  const [loading, setLoading] = useState(true)
  const [rolling, setRolling] = useState<Set<string>>(new Set())
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ service: "", version: "", environment: "production", notes: "" })

  async function fetchDeployments() {
    setLoading(true)
    try {
      const res = await fetch(`${ADMIN_API}/deployments`)
      if (res.ok) setDeployments(await res.json())
    } catch { /* offline */ } finally { setLoading(false) }
  }

  async function createDeployment() {
    try {
      await fetch(`${ADMIN_API}/deployments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, deployed_by: "system" }),
      })
      setShowForm(false)
      setForm({ service: "", version: "", environment: "production", notes: "" })
      fetchDeployments()
    } catch { /* offline */ }
  }

  async function rollback(id: string) {
    setRolling((prev) => new Set(prev).add(id))
    try {
      await fetch(`${ADMIN_API}/deployments/${id}/rollback`, { method: "POST" })
      fetchDeployments()
    } finally {
      setRolling((prev) => { const s = new Set(prev); s.delete(id); return s })
    }
  }

  useEffect(() => { fetchDeployments() }, [])

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/admin" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Admin</Link>
          <span>/</span>
          <span className="text-white">Deployments</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3"><Package className="w-8 h-8 text-blue-400" />Deployments</h1>
            <p className="text-gray-400 mt-1 text-sm">Track deployments across environments — rollback on demand</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} className="bg-blue-600 hover:bg-blue-700 text-white">
            <PlusCircle className="w-4 h-4 mr-2" />
            New Deployment
          </Button>
        </div>

        {/* New Deployment Form */}
        {showForm && (
          <div className="bg-[#0d1117] border border-blue-500/30 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">New Deployment</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              {[
                { label: "Service", key: "service", placeholder: "e.g. gateway-api" },
                { label: "Version", key: "version", placeholder: "e.g. v3.3.1" },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="text-xs text-gray-400 mb-1 block">{label}</label>
                  <input
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    placeholder={placeholder}
                    className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Environment</label>
                <select
                  value={form.environment}
                  onChange={(e) => setForm({ ...form, environment: e.target.value })}
                  className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
                >
                  <option>development</option>
                  <option>staging</option>
                  <option>production</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-400 mb-1 block">Notes</label>
                <input
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Optional notes"
                  className="w-full bg-[#080c14] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button onClick={createDeployment} className="bg-blue-600 hover:bg-blue-700 text-white text-sm">Deploy</Button>
              <Button variant="ghost" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-white text-sm">Cancel</Button>
            </div>
          </div>
        )}

        {/* Deployments Table */}
        <div className="bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-7 gap-3 px-6 py-3 border-b border-white/10 text-xs text-gray-500 uppercase tracking-wider">
            <span className="col-span-2">Service / Version</span>
            <span>Environment</span>
            <span>Status</span>
            <span>Deployed By</span>
            <span>Time</span>
            <span>Actions</span>
          </div>
          {loading ? (
            <div className="py-16 text-center text-gray-500">Loading deployments…</div>
          ) : deployments.length === 0 ? (
            <div className="py-16 text-center text-gray-500">No deployments yet.</div>
          ) : (
            deployments.map((dep) => {
              const Icon = STATUS_ICONS[dep.status] || Clock
              const statusCls = STATUS_COLORS[dep.status] || ""
              return (
                <div key={dep.deployment_id} className="grid grid-cols-7 gap-3 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/2 items-center">
                  <div className="col-span-2">
                    <p className="font-medium text-sm">{dep.service}</p>
                    <p className="text-xs text-gray-500">{dep.version}</p>
                  </div>
                  <span className={`text-xs font-medium ${ENV_COLORS[dep.environment]}`}>{dep.environment}</span>
                  <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full border text-xs font-medium w-fit ${statusCls}`}>
                    <Icon className={`w-3 h-3 ${dep.status === "running" ? "animate-spin" : ""}`} />
                    {dep.status}
                  </span>
                  <span className="text-sm text-gray-400 truncate">{dep.deployed_by.split("@")[0]}</span>
                  <span className="text-xs text-gray-500">{new Date(dep.started_at).toLocaleString()}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => rollback(dep.deployment_id)}
                    disabled={rolling.has(dep.deployment_id) || dep.status === "rolled_back"}
                    className="text-gray-400 hover:text-orange-400 hover:bg-orange-400/10 w-fit text-xs"
                  >
                    <RotateCcw className={`w-3.5 h-3.5 mr-1 ${rolling.has(dep.deployment_id) ? "animate-spin" : ""}`} />
                    Rollback
                  </Button>
                </div>
              )
            })
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
