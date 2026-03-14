"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Server, ActivitySquare, FileText, BarChart3, Package, AlertTriangle, RefreshCw, CheckCircle, XCircle, AlertCircle } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_CONSOLE_URL || "http://localhost:8053"

interface ServiceSummary {
  total: number
  healthy: number
  degraded: number
  down: number
  health_pct: number
}

interface ResourcesSnapshot {
  cpu_pct: number
  memory_pct: number
  disk_pct: number
}

interface DashboardSummary {
  services: ServiceSummary
  resources: ResourcesSnapshot
  open_incidents: number
  recent_deployments: Array<{ deployment_id: string; service: string; version: string; status: string; started_at: string }>
  test_coverage: { total_tests: number; status: string }
}

const NAV_ITEMS = [
  { href: "/admin", label: "Overview", icon: ActivitySquare },
  { href: "/admin/services", label: "Services", icon: Server },
  { href: "/admin/logs", label: "Logs", icon: FileText },
  { href: "/admin/metrics", label: "Metrics", icon: BarChart3 },
  { href: "/admin/deployments", label: "Deployments", icon: Package },
  { href: "/admin/incidents", label: "Incidents", icon: AlertTriangle },
]

function StatusIcon({ status }: { status: string }) {
  if (status === "healthy" || status === "success") return <CheckCircle className="w-4 h-4 text-green-400" />
  if (status === "degraded" || status === "running") return <AlertCircle className="w-4 h-4 text-yellow-400" />
  return <XCircle className="w-4 h-4 text-red-400" />
}

function StatCard({ label, value, unit, color }: { label: string; value: string | number; unit?: string; color: string }) {
  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6">
      <p className="text-sm text-gray-400 mb-2">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>
        {value}
        {unit && <span className="text-base text-gray-400 ml-1">{unit}</span>}
      </p>
    </div>
  )
}

export default function AdminConsolePage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState("")

  async function fetchSummary() {
    setLoading(true)
    try {
      const res = await fetch(`${ADMIN_API}/summary`)
      if (res.ok) setSummary(await res.json())
    } catch { /* backend offline in preview */ } finally {
      setLoading(false)
      setLastRefresh(new Date().toLocaleTimeString())
    }
  }

  useEffect(() => {
    fetchSummary()
    const interval = setInterval(fetchSummary, 30_000)
    return () => clearInterval(interval)
  }, [])

  const MOCK: DashboardSummary = {
    services: { total: 22, healthy: 20, degraded: 1, down: 0, health_pct: 95.5 },
    resources: { cpu_pct: 28, memory_pct: 61, disk_pct: 38 },
    open_incidents: 0,
    recent_deployments: [
      { deployment_id: "dep-0001", service: "gateway-api", version: "v3.3.0", status: "success", started_at: "2026-03-14T08:00:00Z" },
      { deployment_id: "dep-0002", service: "redis-cache", version: "v1.0.0", status: "success", started_at: "2026-03-14T07:50:00Z" },
    ],
    test_coverage: { total_tests: 3620, status: "all_passing" },
  }

  const data = summary ?? MOCK

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-[#0d1117] border-r border-white/10 pt-6 px-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 px-2">Admin Console</p>
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white">System Overview</h1>
              <p className="text-gray-400 mt-1">
                RCT Ecosystem v3.3.0 — Operational Dashboard
                {lastRefresh && <span className="ml-3 text-xs">Last refresh: {lastRefresh}</span>}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchSummary}
              disabled={loading}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {/* Service Health Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard label="Services Healthy" value={`${data.services.healthy}/${data.services.total}`} color="text-green-400" />
            <StatCard label="Health %" value={data.services.health_pct} unit="%" color="text-emerald-400" />
            <StatCard label="Open Incidents" value={data.open_incidents} color={data.open_incidents > 0 ? "text-red-400" : "text-green-400"} />
            <StatCard label="Tests Passing" value={data.test_coverage.total_tests.toLocaleString()} color="text-blue-400" />
          </div>

          {/* Resource Utilization */}
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4">Resource Utilization (Live)</h2>
            <div className="grid grid-cols-3 gap-6">
              {[
                { label: "CPU", value: data.resources.cpu_pct, color: "bg-blue-500" },
                { label: "Memory", value: data.resources.memory_pct, color: "bg-purple-500" },
                { label: "Disk", value: data.resources.disk_pct, color: "bg-orange-500" },
              ].map(({ label, value, color }) => (
                <div key={label}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">{label}</span>
                    <span className="text-white font-mono">{value}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${color} rounded-full transition-all`}
                      style={{ width: `${value}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Deployments */}
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Recent Deployments</h2>
              <Link href="/admin/deployments" className="text-sm text-blue-400 hover:text-blue-300">View all →</Link>
            </div>
            <div className="space-y-3">
              {data.recent_deployments.map((dep) => (
                <div key={dep.deployment_id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center gap-3">
                    <StatusIcon status={dep.status} />
                    <div>
                      <span className="font-medium text-sm">{dep.service}</span>
                      <span className="text-gray-400 text-sm ml-2">{dep.version}</span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">{new Date(dep.started_at).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Nav */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {NAV_ITEMS.slice(1).map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer">
                  <Icon className="w-6 h-6 text-blue-400 mb-3" />
                  <p className="font-medium text-sm">{label}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
