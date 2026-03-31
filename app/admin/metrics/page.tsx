"use client"

import { useCallback, useEffect, useState } from "react"
import Link from "next/link"
import { BarChart3, TrendingUp, ChevronLeft, RefreshCw, Cpu, MemoryStick, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_CONSOLE_URL || "http://localhost:8053"

interface PerformanceSnapshot {
  timestamp: string
  avg_latency_ms: number
  p95_latency_ms: number
  p99_latency_ms: number
  requests_per_second: number
  error_rate_pct: number
  throughput_mb_s: number
}

interface ResourceSnapshot {
  cpu_pct: number
  memory_pct: number
  memory_used_mb: number
  memory_total_mb: number
  disk_pct: number
  disk_used_gb: number
  disk_total_gb: number
  network_in_mb_s: number
  network_out_mb_s: number
  load_1m: number
  load_5m: number
  load_15m: number
}

function MiniBar({ label, value, color = "bg-blue-500" }: { label: string; value: number; color?: string }) {
  const warn = value > 80
  const barColor = warn ? "bg-red-500" : value > 60 ? "bg-yellow-500" : color
  return (
    <div>
      <div className="flex justify-between text-sm mb-1.5">
        <span className="text-gray-400">{label}</span>
        <span className={`font-mono font-medium ${warn ? "text-red-400" : "text-white"}`}>{value.toFixed(1)}%</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full ${barColor} rounded-full transition-all duration-700`} style={{ width: `${Math.min(value, 100)}%` }} />
      </div>
    </div>
  )
}

function MetricTile({ label, value, sub, icon: Icon }: { label: string; value: string; sub?: string; icon: React.FC<{ className?: string }> }) {
  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 flex items-center gap-4">
      <Icon className="w-8 h-8 text-blue-400 shrink-0" />
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
        {sub && <p className="text-xs text-gray-600 mt-0.5">{sub}</p>}
      </div>
    </div>
  )
}

export default function MetricsPage() {
  const [perf, setPerf] = useState<PerformanceSnapshot[]>([])
  const [resources, setResources] = useState<ResourceSnapshot | null>(null)
  const [loading, setLoading] = useState(true)
  const [hours, setHours] = useState(1)

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const [perfRes, resRes] = await Promise.allSettled([
        fetch(`${ADMIN_API}/metrics/performance?hours=${hours}`),
        fetch(`${ADMIN_API}/metrics/resources`),
      ])
      if (perfRes.status === "fulfilled" && perfRes.value.ok) setPerf(await perfRes.value.json())
      if (resRes.status === "fulfilled" && resRes.value.ok) setResources(await resRes.value.json())
    } catch { /* offline */ } finally { setLoading(false) }
  }, [hours])

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchData()
    }, 0)

    return () => clearTimeout(timer)
  }, [fetchData])

  const latest = perf.length > 0 ? perf[perf.length - 1] : null

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/admin" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Admin</Link>
          <span>/</span>
          <span className="text-white">Metrics</span>
        </div>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3"><BarChart3 className="w-8 h-8 text-blue-400" />Metrics</h1>
            <p className="text-gray-400 mt-1 text-sm">Performance, latency, throughput, and resource utilization</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1">
              {[1, 6, 24, 72, 168].map((h) => (
                <button
                  key={h}
                  onClick={() => setHours(h)}
                  className={`px-3 py-1.5 rounded text-xs font-medium transition-colors ${hours === h ? "bg-blue-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
                >
                  {h < 24 ? `${h}h` : `${h / 24}d`}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" onClick={fetchData} className="border-white/20 text-white hover:bg-white/10">
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        {/* Performance KPIs */}
        {latest && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <MetricTile label="Avg Latency" value={`${latest.avg_latency_ms}ms`} sub={`p95: ${latest.p95_latency_ms}ms`} icon={Clock} />
            <MetricTile label="Requests/sec" value={`${latest.requests_per_second.toFixed(1)}`} icon={TrendingUp} />
            <MetricTile label="Error Rate" value={`${latest.error_rate_pct}%`} icon={BarChart3} />
            <MetricTile label="Throughput" value={`${latest.throughput_mb_s} MB/s`} icon={TrendingUp} />
          </div>
        )}

        {/* Latency Timeline (simple ASCII-style) */}
        {perf.length > 0 && (
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 mb-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-blue-400" />Latency Timeline</h2>
            <div className="flex items-end gap-1 h-24">
              {perf.slice(-48).map((p, i) => {
                const max = Math.max(...perf.map((x) => x.p99_latency_ms))
                const h = Math.round((p.avg_latency_ms / max) * 100)
                const hP99 = Math.round((p.p99_latency_ms / max) * 100)
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end gap-px" title={`avg:${p.avg_latency_ms}ms p99:${p.p99_latency_ms}ms`}>
                    <div className="bg-blue-800 rounded-sm" style={{ height: `${hP99}%` }} />
                    <div className="bg-blue-500 rounded-sm" style={{ height: `${h}%` }} />
                  </div>
                )
              })}
            </div>
            <div className="flex justify-between mt-2 text-xs text-gray-600">
              <span>{hours}h ago</span>
              <span className="text-blue-400">■ avg</span>
              <span className="text-blue-800">■ p99</span>
              <span>now</span>
            </div>
          </div>
        )}

        {/* Resource Utilization */}
        {resources && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-5 flex items-center gap-2"><Cpu className="w-5 h-5 text-blue-400" />CPU &amp; Load</h2>
              <div className="space-y-4">
                <MiniBar label="CPU Utilization" value={resources.cpu_pct} color="bg-blue-500" />
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {[["1m load", resources.load_1m], ["5m load", resources.load_5m], ["15m load", resources.load_15m]].map(([l, v]) => (
                    <div key={String(l)} className="bg-white/5 rounded-lg p-3 text-center">
                      <p className="text-lg font-mono font-bold">{Number(v).toFixed(2)}</p>
                      <p className="text-xs text-gray-500 mt-1">{l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-5 flex items-center gap-2"><MemoryStick className="w-5 h-5 text-purple-400" />Memory &amp; Disk</h2>
              <div className="space-y-4">
                <MiniBar label={`Memory — ${resources.memory_used_mb.toFixed(0)}/${resources.memory_total_mb.toFixed(0)} MB`} value={resources.memory_pct} color="bg-purple-500" />
                <MiniBar label={`Disk — ${resources.disk_used_gb.toFixed(1)}/${resources.disk_total_gb.toFixed(1)} GB`} value={resources.disk_pct} color="bg-orange-500" />
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-lg font-mono font-bold text-green-400">{resources.network_in_mb_s} MB/s</p>
                  <p className="text-xs text-gray-500 mt-1">Network In</p>
                </div>
                <div className="bg-white/5 rounded-lg p-3 text-center">
                  <p className="text-lg font-mono font-bold text-sky-400">{resources.network_out_mb_s} MB/s</p>
                  <p className="text-xs text-gray-500 mt-1">Network Out</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && !latest && <div className="py-20 text-center text-gray-500">Loading metrics…</div>}
      </main>
      <Footer />
    </div>
  )
}
