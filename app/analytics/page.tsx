"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { BarChart3, TrendingUp, DollarSign, ChevronRight, RefreshCw, Zap, AlertTriangle, Terminal } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const ANALYTICS_API = process.env.NEXT_PUBLIC_ANALYTICS_CONSOLE_URL || "http://localhost:8055"

interface EndpointStat {
  endpoint: string
  call_count: number
  error_count: number
  avg_latency_ms: number
}

interface UsageStats {
  total_calls: number
  total_errors: number
  error_rate: number
  unique_services: number
  top_endpoints: EndpointStat[]
}

interface PerformanceMetrics {
  p50_latency_ms: number
  p95_latency_ms: number
  p99_latency_ms: number
  max_latency_ms: number
  avg_latency_ms: number
}

interface CostSummary {
  total_cost_usd: number
  compute_cost_usd: number
  storage_cost_usd: number
  per_service: Record<string, number>
}

interface ServiceStats {
  service: string
  total_requests: number
  total_errors: number
  uptime_percent: number
}

function StatCard({ label, value, sub, icon: Icon, color }: {
  label: string; value: string | number; sub?: string;
  icon: React.FC<{ className?: string }>; color: string
}) {
  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5">
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg ${color} bg-opacity-15 flex items-center justify-center`}>
          <Icon className={`w-4 h-4 ${color}`} />
        </div>
        <span className="text-sm text-gray-400">{label}</span>
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
      {sub && <div className="text-xs text-gray-500 mt-1">{sub}</div>}
    </div>
  )
}

function LatencyBar({ label, value, max }: { label: string; value: number; max: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-gray-400 w-8">{label}</span>
      <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500 transition-all duration-700"
          style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
        />
      </div>
      <span className="text-xs text-gray-300 w-16 text-right">{value.toFixed(1)}ms</span>
    </div>
  )
}

export default function AnalyticsPage() {
  const [usage, setUsage] = useState<UsageStats | null>(null)
  const [perf, setPerf] = useState<PerformanceMetrics | null>(null)
  const [cost, setCost] = useState<CostSummary | null>(null)
  const [, setStats] = useState<ServiceStats[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState("")

  async function fetchAll() {
    setLoading(true)
    try {
      const [usageRes, perfRes, costRes, statsRes] = await Promise.allSettled([
        fetch(`${ANALYTICS_API}/rctlabs/analytics/usage`),
        fetch(`${ANALYTICS_API}/rctlabs/analytics/performance`),
        fetch(`${ANALYTICS_API}/rctlabs/analytics/costs`),
        fetch(`${ANALYTICS_API}/rctlabs/analytics/stats`),
      ])
      if (usageRes.status === "fulfilled" && usageRes.value.ok) setUsage(await usageRes.value.json())
      if (perfRes.status === "fulfilled" && perfRes.value.ok) setPerf(await perfRes.value.json())
      if (costRes.status === "fulfilled" && costRes.value.ok) setCost(await costRes.value.json())
      if (statsRes.status === "fulfilled" && statsRes.value.ok) setStats(await statsRes.value.json())
    } catch { /* backend offline */ }
    setLastRefresh(new Date().toLocaleTimeString())
    setLoading(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchAll()
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-[#060910] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-white">Analytics</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <BarChart3 className="w-8 h-8 text-violet-400" />
              Analytics Console
            </h1>
            <p className="text-gray-400 mt-1 text-sm">API usage · Performance telemetry · Cost tracking</p>
          </div>
          <Button
            onClick={fetchAll}
            variant="outline"
            className="border-white/20 text-gray-300 hover:border-violet-400 hover:text-white gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {lastRefresh || "Refresh"}
          </Button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          <StatCard
            label="Total API Calls"
            value={usage ? usage.total_calls.toLocaleString() : "—"}
            sub="All time"
            icon={Terminal}
            color="text-blue-400"
          />
          <StatCard
            label="Error Rate"
            value={usage ? `${(usage.error_rate * 100).toFixed(1)}%` : "—"}
            sub={usage ? `${usage.total_errors} errors` : undefined}
            icon={AlertTriangle}
            color="text-orange-400"
          />
          <StatCard
            label="Avg Latency"
            value={perf ? `${perf.avg_latency_ms.toFixed(1)}ms` : "—"}
            sub={perf ? `p99: ${perf.p99_latency_ms.toFixed(1)}ms` : undefined}
            icon={Zap}
            color="text-green-400"
          />
          <StatCard
            label="Total Cost"
            value={cost ? `$${cost.total_cost_usd.toFixed(4)}` : "—"}
            sub="Compute + Storage"
            icon={DollarSign}
            color="text-violet-400"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Top Endpoints */}
          <div>
            <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Top Endpoints
            </h2>
            <div className="bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden">
              {usage && usage.top_endpoints.length > 0 ? (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-4 py-3 text-gray-500 font-medium">Endpoint</th>
                      <th className="text-right px-4 py-3 text-gray-500 font-medium">Calls</th>
                      <th className="text-right px-4 py-3 text-gray-500 font-medium">Errors</th>
                      <th className="text-right px-4 py-3 text-gray-500 font-medium">Avg ms</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {usage.top_endpoints.map((ep) => (
                      <tr key={ep.endpoint} className="hover:bg-white/3 transition-colors">
                        <td className="px-4 py-2.5 text-gray-300 font-mono text-xs truncate max-w-[180px]">{ep.endpoint}</td>
                        <td className="px-4 py-2.5 text-right text-white">{ep.call_count}</td>
                        <td className="px-4 py-2.5 text-right">
                          <span className={ep.error_count > 0 ? "text-red-400" : "text-gray-500"}>{ep.error_count}</span>
                        </td>
                        <td className="px-4 py-2.5 text-right text-gray-400">{ep.avg_latency_ms.toFixed(1)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="p-8 text-center text-gray-500 text-sm">
                  Start analytics-console at port 8054 for live data
                </div>
              )}
            </div>
          </div>

          {/* Latency Percentiles */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-green-400" />
                Latency Percentiles
              </h2>
              <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 space-y-4">
                {perf ? (
                  <>
                    <LatencyBar label="p50" value={perf.p50_latency_ms} max={perf.max_latency_ms} />
                    <LatencyBar label="p95" value={perf.p95_latency_ms} max={perf.max_latency_ms} />
                    <LatencyBar label="p99" value={perf.p99_latency_ms} max={perf.max_latency_ms} />
                    <LatencyBar label="max" value={perf.max_latency_ms} max={perf.max_latency_ms} />
                  </>
                ) : (
                  <p className="text-gray-500 text-sm text-center">No performance data</p>
                )}
              </div>
            </div>

            {/* Cost Breakdown */}
            <div>
              <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-violet-400" />
                Cost Breakdown
              </h2>
              <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5">
                {cost ? (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Compute</span>
                      <span className="text-white">${cost.compute_cost_usd.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Storage</span>
                      <span className="text-white">${cost.storage_cost_usd.toFixed(4)}</span>
                    </div>
                    <div className="border-t border-white/10 pt-2 mt-2 flex justify-between font-semibold">
                      <span className="text-gray-200">Total</span>
                      <span className="text-violet-400">${cost.total_cost_usd.toFixed(4)}</span>
                    </div>
                    {Object.entries(cost.per_service).slice(0, 4).map(([svc, amt]) => (
                      <div key={svc} className="flex justify-between text-xs text-gray-500">
                        <span className="font-mono">{svc}</span>
                        <span>${(amt as number).toFixed(5)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm text-center">No cost data</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
