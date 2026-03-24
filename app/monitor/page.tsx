"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Activity, Server, AlertCircle, ChevronRight, RefreshCw, Cpu, HardDrive, Zap, CheckCircle, XCircle, Clock } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const MONITOR_API = process.env.NEXT_PUBLIC_MONITOR_CONSOLE_URL || "http://localhost:8053"

interface ServiceHealth {
  name: string
  status: "healthy" | "degraded" | "down" | "unknown"
  port: number
  latency_ms: number | null
  uptime_seconds: number
}

interface SysMetrics {
  cpu_percent: number
  memory_percent: number
  memory_used_mb: number
  memory_total_mb: number
  disk_percent: number
}

interface Alert {
  alert_id: string
  severity: string
  service: string
  message: string
  acknowledged: boolean
}

interface SnapShot {
  total_services: number
  healthy_count: number
  degraded_count: number
  down_count: number
  active_alerts: number
}

const STATUS_ICON: Record<string, React.FC<{ className?: string }>> = {
  healthy: CheckCircle,
  degraded: Clock,
  down: XCircle,
  unknown: AlertCircle,
}

const STATUS_COLOR: Record<string, string> = {
  healthy: "text-green-400",
  degraded: "text-yellow-400",
  down: "text-red-400",
  unknown: "text-gray-400",
}

function GaugeBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 bg-white/5 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${Math.min(value, 100)}%` }}
        />
      </div>
      <span className="text-xs text-gray-400 w-10 text-right">{value.toFixed(1)}%</span>
    </div>
  )
}

export default function MonitorPage() {
  const [snapshot, setSnapshot] = useState<SnapShot | null>(null)
  const [services, setServices] = useState<ServiceHealth[]>([])
  const [metrics, setMetrics] = useState<SysMetrics | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState("")

  async function fetchAll() {
    setLoading(true)
    try {
      const [snapRes, svcRes, metRes, alertRes] = await Promise.allSettled([
        fetch(`${MONITOR_API}/rctlabs/monitor/snapshot`),
        fetch(`${MONITOR_API}/rctlabs/monitor/services`),
        fetch(`${MONITOR_API}/rctlabs/monitor/metrics`),
        fetch(`${MONITOR_API}/rctlabs/monitor/alerts?acknowledged=false`),
      ])
      if (snapRes.status === "fulfilled" && snapRes.value.ok) setSnapshot(await snapRes.value.json())
      if (svcRes.status === "fulfilled" && svcRes.value.ok) setServices(await svcRes.value.json())
      if (metRes.status === "fulfilled" && metRes.value.ok) setMetrics(await metRes.value.json())
      if (alertRes.status === "fulfilled" && alertRes.value.ok) setAlerts(await alertRes.value.json())
    } catch { /* backend offline */ }
    setLastRefresh(new Date().toLocaleTimeString())
    setLoading(false)
  }

  useEffect(() => {
    fetchAll()
    const interval = setInterval(fetchAll, 30000)
    return () => clearInterval(interval)
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
              <span className="text-white">Monitor</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Activity className="w-8 h-8 text-blue-400" />
              Monitor Console
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Real-time service health · System metrics · Alert management</p>
          </div>
          <Button
            onClick={fetchAll}
            variant="outline"
            className="border-white/20 text-gray-300 hover:border-blue-400 hover:text-white gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {lastRefresh ? `${lastRefresh}` : "Live"}
          </Button>
        </div>

        {/* Snapshot cards */}
        {snapshot ? (
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-10">
            {[
              { label: "Total Services", val: snapshot.total_services, cls: "text-white" },
              { label: "Healthy", val: snapshot.healthy_count, cls: "text-green-400" },
              { label: "Degraded", val: snapshot.degraded_count, cls: "text-yellow-400" },
              { label: "Down", val: snapshot.down_count, cls: "text-red-400" },
              { label: "Active Alerts", val: snapshot.active_alerts, cls: "text-orange-400" },
            ].map(({ label, val, cls }) => (
              <div key={label} className="bg-[#0d1117] border border-white/10 rounded-xl p-4 text-center">
                <div className={`text-2xl font-bold ${cls}`}>{val}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-8 text-center text-gray-500 mb-10">
            Start monitor-console at port 8053 for live data
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Services */}
          <div className="lg:col-span-2">
            <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <Server className="w-5 h-5 text-blue-400" />
              Services ({services.length})
            </h2>
            <div className="bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden">
              {services.length === 0 ? (
                <div className="p-6 text-center text-gray-500 text-sm">No service data available</div>
              ) : (
                <div className="divide-y divide-white/5">
                  {services.map((svc) => {
                    const Icon = STATUS_ICON[svc.status] ?? AlertCircle
                    return (
                      <div key={svc.name} className="px-4 py-3 flex items-center justify-between hover:bg-white/3 transition-colors">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-4 h-4 ${STATUS_COLOR[svc.status]}`} />
                          <span className="font-mono text-sm text-gray-200">{svc.name}</span>
                          <span className="text-xs text-gray-500">:{svc.port}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-400">
                          {svc.latency_ms !== null && (
                            <span className="flex items-center gap-1">
                              <Zap className="w-3 h-3" />
                              {svc.latency_ms.toFixed(1)}ms
                            </span>
                          )}
                          <span className={`capitalize ${STATUS_COLOR[svc.status]}`}>{svc.status}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Right panel: Metrics + Alerts */}
          <div className="space-y-6">
            {/* System Metrics */}
            <div>
              <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-violet-400" />
                System Load
              </h2>
              <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 space-y-4">
                {metrics ? (
                  <>
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                        <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> CPU</span>
                      </div>
                      <GaugeBar value={metrics.cpu_percent} color={metrics.cpu_percent > 80 ? "bg-red-400" : "bg-violet-400"} />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                        <span>Memory</span>
                        <span>{(metrics.memory_used_mb / 1024).toFixed(1)} / {(metrics.memory_total_mb / 1024).toFixed(1)} GB</span>
                      </div>
                      <GaugeBar value={metrics.memory_percent} color={metrics.memory_percent > 85 ? "bg-red-400" : "bg-blue-400"} />
                    </div>
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                        <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> Disk</span>
                      </div>
                      <GaugeBar value={metrics.disk_percent} color={metrics.disk_percent > 90 ? "bg-red-400" : "bg-green-400"} />
                    </div>
                  </>
                ) : (
                  <p className="text-gray-500 text-sm text-center">No metrics</p>
                )}
              </div>
            </div>

            {/* Alerts */}
            <div>
              <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-400" />
                Alerts ({alerts.length})
              </h2>
              <div className="bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden">
                {alerts.length === 0 ? (
                  <div className="p-5 text-center text-gray-500 text-sm">All clear</div>
                ) : (
                  <div className="divide-y divide-white/5">
                    {alerts.slice(0, 5).map((a) => (
                      <div key={a.alert_id} className="px-4 py-3">
                        <div className="flex items-start gap-2">
                          <span className={`text-xs font-bold uppercase mt-0.5 ${
                            a.severity === "critical" ? "text-red-400" :
                            a.severity === "high" ? "text-orange-400" :
                            a.severity === "medium" ? "text-yellow-400" : "text-gray-400"
                          }`}>{a.severity}</span>
                        </div>
                        <p className="text-xs text-gray-300 mt-0.5">{a.message}</p>
                        {a.service && <p className="text-xs text-gray-500 mt-0.5">{a.service}</p>}
                      </div>
                    ))}
                  </div>
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
