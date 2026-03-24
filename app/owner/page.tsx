"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Users, Key, Activity, AlertTriangle, DollarSign, Server, ChevronRight, RefreshCw, Shield, BarChart3 } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const OWNER_API = process.env.NEXT_PUBLIC_OWNER_CONSOLE_URL || "http://localhost:8052"

interface SystemMetrics {
  cpu_percent: number
  memory_percent: number
  disk_percent: number
}

interface ServiceItem {
  name: string
  port: number
  status: string
}

interface Alert {
  alert_id: string
  severity: string
  service: string
  message: string
  created_at: string
  acknowledged: boolean
}

const SEVERITY_COLORS: Record<string, string> = {
  critical: "text-red-400 bg-red-400/10 border-red-400/20",
  high: "text-orange-400 bg-orange-400/10 border-orange-400/20",
  medium: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  low: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  info: "text-gray-400 bg-gray-400/10 border-gray-400/20",
}

function MetricCard({ label, value, unit, icon: Icon, color }: {
  label: string; value: number | string; unit?: string; icon: React.FC<{ className?: string }>; color: string
}) {
  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6 flex items-start gap-4">
      <div className={`p-3 rounded-lg ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-sm text-gray-400 mb-1">{label}</p>
        <p className="text-2xl font-bold text-white">
          {value}{unit && <span className="text-sm text-gray-400 ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  )
}

export default function OwnerConsolePage() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [services, setServices] = useState<ServiceItem[]>([])
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)
  const [lastRefresh, setLastRefresh] = useState<string>("")

  async function fetchData() {
    setLoading(true)
    try {
      const [metricsRes, servicesRes, alertsRes] = await Promise.allSettled([
        fetch(`${OWNER_API}/rctlabs/owner/system-metrics`),
        fetch(`${OWNER_API}/rctlabs/owner/services`),
        fetch(`${OWNER_API}/rctlabs/owner/alerts`),
      ])
      if (metricsRes.status === "fulfilled" && metricsRes.value.ok)
        setMetrics(await metricsRes.value.json())
      if (servicesRes.status === "fulfilled" && servicesRes.value.ok)
        setServices(await servicesRes.value.json())
      if (alertsRes.status === "fulfilled" && alertsRes.value.ok)
        setAlerts(await alertsRes.value.json())
    } catch { /* backend may not be running in preview */ }
    setLastRefresh(new Date().toLocaleTimeString())
    setLoading(false)
  }

  useEffect(() => { fetchData() }, [])

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
              <span className="text-white">Owner Console</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Shield className="w-8 h-8 text-violet-400" />
              Owner Console
            </h1>
            <p className="text-gray-400 mt-1 text-sm">System administration · User management · Cost control</p>
          </div>
          <Button
            onClick={fetchData}
            variant="outline"
            className="border-white/20 text-gray-300 hover:border-violet-400 hover:text-white gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {lastRefresh ? `Last: ${lastRefresh}` : "Refresh"}
          </Button>
        </div>

        {/* System Metrics */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-violet-400" />
            System Metrics
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <MetricCard label="CPU Usage" value={metrics?.cpu_percent?.toFixed(1) ?? "—"} unit="%" icon={Server} color="bg-violet-500/10 text-violet-400" />
            <MetricCard label="Memory Usage" value={metrics?.memory_percent?.toFixed(1) ?? "—"} unit="%" icon={BarChart3} color="bg-blue-500/10 text-blue-400" />
            <MetricCard label="Disk Usage" value={metrics?.disk_percent?.toFixed(1) ?? "—"} unit="%" icon={Activity} color="bg-green-500/10 text-green-400" />
          </div>
        </section>

        {/* Services */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <Server className="w-5 h-5 text-blue-400" />
            Registered Services{" "}
            <span className="text-xs text-gray-500 font-normal">({services.length})</span>
          </h2>
          {services.length === 0 ? (
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-8 text-center text-gray-500">
              Start the owner-console backend at port 8052 to see live data
            </div>
          ) : (
            <div className="bg-[#0d1117] border border-white/10 rounded-xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 text-gray-500 text-xs uppercase tracking-wide">
                    <th className="text-left px-4 py-3">Service</th>
                    <th className="text-left px-4 py-3">Port</th>
                    <th className="text-left px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((svc) => (
                    <tr key={svc.name} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                      <td className="px-4 py-3 font-mono text-gray-200">{svc.name}</td>
                      <td className="px-4 py-3 text-gray-400">{svc.port}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${svc.status === "running" ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-gray-400 bg-gray-400/10 border-gray-400/20"}`}>
                          {svc.status ?? "unknown"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Alerts */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            Active Alerts{" "}
            <span className="text-xs text-gray-500 font-normal">
              ({alerts.filter((a) => !a.acknowledged).length} unacknowledged)
            </span>
          </h2>
          {alerts.length === 0 ? (
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-8 text-center text-gray-500">
              No alerts — backend offline or all clear
            </div>
          ) : (
            <div className="space-y-3">
              {alerts.slice(0, 10).map((alert) => (
                <div key={alert.alert_id} className={`border rounded-xl px-5 py-4 ${SEVERITY_COLORS[alert.severity] ?? "text-gray-400 bg-gray-400/10 border-gray-400/20"}`}>
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-wide mr-2">[{alert.severity}]</span>
                      <span className="font-medium">{alert.message}</span>
                      {alert.service && <span className="text-xs opacity-60 ml-2">· {alert.service}</span>}
                    </div>
                    {alert.acknowledged && (
                      <span className="text-xs opacity-50 ml-4 whitespace-nowrap">acknowledged</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Quick Links */}
        <section>
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <Key className="w-5 h-5 text-green-400" />
            Quick Navigation
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Test Console", href: "/test-console", icon: Activity },
              { label: "Monitor", href: "/monitor", icon: Server },
              { label: "Analytics", href: "/analytics", icon: BarChart3 },
              { label: "User Management", href: "/owner#users", icon: Users },
            ].map(({ label, href, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-3 bg-[#0d1117] border border-white/10 rounded-xl px-4 py-3 hover:border-violet-400/40 hover:bg-violet-400/5 transition-all text-sm text-gray-300 hover:text-white"
              >
                <Icon className="w-4 h-4 text-violet-400" />
                {label}
              </Link>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
