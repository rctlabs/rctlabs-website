"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { Server, Search, RefreshCw, CheckCircle, XCircle, AlertCircle, RotateCcw, ChevronLeft } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_CONSOLE_URL || "http://localhost:8053"

interface ServiceHealth {
  name: string
  port: number
  version: string
  status: "healthy" | "degraded" | "down" | "unknown"
  latency_ms: number
  uptime_pct: number
  requests_per_min: number
  error_rate_pct: number
  last_checked: string
  dependencies: string[]
}

const STATUS_COLORS: Record<string, string> = {
  healthy: "text-green-400 bg-green-400/10 border-green-400/30",
  degraded: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
  down: "text-red-400 bg-red-400/10 border-red-400/30",
  unknown: "text-gray-400 bg-gray-400/10 border-gray-400/30",
}

function StatusBadge({ status }: { status: string }) {
  const cls = STATUS_COLORS[status] || STATUS_COLORS.unknown
  const Icon = status === "healthy" ? CheckCircle : status === "degraded" ? AlertCircle : XCircle
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-medium ${cls}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  )
}

export default function ServicesPage() {
  const [services, setServices] = useState<ServiceHealth[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [restarting, setRestarting] = useState<Set<string>>(new Set())
  const [lastRefresh, setLastRefresh] = useState("")

  const fetchServices = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams()
      if (statusFilter !== "all") params.set("status", statusFilter)
      const res = await fetch(`${ADMIN_API}/services?${params}`)
      if (res.ok) setServices(await res.json())
    } catch { /* offline */ } finally {
      setLoading(false)
      setLastRefresh(new Date().toLocaleTimeString())
    }
  }, [statusFilter])

  async function restartService(name: string) {
    setRestarting((prev) => new Set(prev).add(name))
    try {
      await fetch(`${ADMIN_API}/services/${name}/restart`, { method: "POST" })
      await fetchServices()
    } finally {
      setRestarting((prev) => { const s = new Set(prev); s.delete(name); return s })
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchServices()
    }, 0)

    return () => clearTimeout(timer)
  }, [fetchServices])

  const filtered = services.filter((s) =>
    search === "" || s.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/admin" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Admin</Link>
          <span>/</span>
          <span className="text-white">Services</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3"><Server className="w-8 h-8 text-blue-400" />Services</h1>
            <p className="text-gray-400 mt-1 text-sm">22 microservices · health monitoring &amp; restart controls</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchServices} className="border-white/20 text-white hover:bg-white/10">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            {lastRefresh ? `Refreshed ${lastRefresh}` : "Refresh"}
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search services…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#0d1117] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="flex gap-2">
            {["all", "healthy", "degraded", "down"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${statusFilter === s ? "bg-blue-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-7 gap-4 px-6 py-3 border-b border-white/10 text-xs text-gray-500 uppercase tracking-wider">
            <span className="col-span-2">Service</span>
            <span>Status</span>
            <span>Latency</span>
            <span>Req/min</span>
            <span>Error %</span>
            <span>Actions</span>
          </div>

          {loading ? (
            <div className="py-16 text-center text-gray-500">Loading services…</div>
          ) : filtered.length === 0 ? (
            <div className="py-16 text-center text-gray-500">No services match your filter.</div>
          ) : (
            filtered.map((svc) => (
              <div key={svc.name} className="grid grid-cols-7 gap-4 px-6 py-4 border-b border-white/5 last:border-0 hover:bg-white/2 items-center">
                <div className="col-span-2">
                  <p className="font-medium text-sm">{svc.name}</p>
                  <p className="text-xs text-gray-500">:{svc.port} · {svc.version}</p>
                </div>
                <StatusBadge status={svc.status} />
                <span className={`text-sm font-mono ${svc.latency_ms > 200 ? "text-yellow-400" : "text-green-400"}`}>
                  {svc.latency_ms}ms
                </span>
                <span className="text-sm text-gray-300">{svc.requests_per_min}</span>
                <span className={`text-sm font-mono ${svc.error_rate_pct > 1 ? "text-red-400" : "text-gray-300"}`}>
                  {svc.error_rate_pct}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => restartService(svc.name)}
                  disabled={restarting.has(svc.name)}
                  className="text-gray-400 hover:text-white hover:bg-white/10 w-fit"
                >
                  <RotateCcw className={`w-3.5 h-3.5 mr-1.5 ${restarting.has(svc.name) ? "animate-spin" : ""}`} />
                  Restart
                </Button>
              </div>
            ))
          )}
        </div>

        <p className="text-xs text-gray-600 mt-4 text-right">
          Showing {filtered.length}/{services.length} services
        </p>
      </main>
      <Footer />
    </div>
  )
}
