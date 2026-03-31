"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import Link from "next/link"
import { FileText, Search, RefreshCw, ChevronLeft, AlertTriangle, AlertCircle, Info, Bug } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"

const ADMIN_API = process.env.NEXT_PUBLIC_ADMIN_CONSOLE_URL || "http://localhost:8053"

interface LogEntry {
  log_id: string
  timestamp: string
  service: string
  level: "DEBUG" | "INFO" | "WARNING" | "ERROR" | "CRITICAL"
  message: string
  trace_id?: string
  details?: Record<string, unknown>
}

interface ErrorSummary {
  errors_last_hour: number
  top_errors: Array<{ message: string; service: string; count: number }>
  services_with_errors: string[]
}

const LEVEL_STYLES: Record<string, string> = {
  DEBUG: "text-gray-400",
  INFO: "text-blue-400",
  WARNING: "text-yellow-400",
  ERROR: "text-red-400",
  CRITICAL: "text-red-500 font-bold",
}

const LEVEL_ICONS: Record<string, React.FC<{ className?: string }>> = {
  DEBUG: Bug,
  INFO: Info,
  WARNING: AlertCircle,
  ERROR: AlertTriangle,
  CRITICAL: AlertTriangle,
}

export default function LogsPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [errorSummary, setErrorSummary] = useState<ErrorSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [serviceFilter] = useState("all")
  const [limit] = useState(50)
  const [sinceMinutes, setSinceMinutes] = useState(60)
  const [autoScroll, setAutoScroll] = useState(true)
  const bottomRef = useRef<HTMLDivElement>(null)

  const fetchLogs = useCallback(async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({ limit: String(limit), since_minutes: String(sinceMinutes) })
      if (levelFilter !== "all") params.set("level", levelFilter)
      if (serviceFilter !== "all") params.set("service", serviceFilter)
      const [logsRes, summaryRes] = await Promise.allSettled([
        fetch(`${ADMIN_API}/logs?${params}`),
        fetch(`${ADMIN_API}/logs/error-summary`),
      ])
      if (logsRes.status === "fulfilled" && logsRes.value.ok) setLogs(await logsRes.value.json())
      if (summaryRes.status === "fulfilled" && summaryRes.value.ok) setErrorSummary(await summaryRes.value.json())
    } catch { /* offline */ } finally { setLoading(false) }
  }, [levelFilter, serviceFilter, limit, sinceMinutes])

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchLogs()
    }, 0)

    return () => clearTimeout(timer)
  }, [fetchLogs])

  useEffect(() => {
    if (autoScroll) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [logs, autoScroll])

  const filtered = logs.filter((l) =>
    search === "" || l.message.toLowerCase().includes(search.toLowerCase()) || l.service.includes(search)
  )

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />
      <main className="max-w-7xl mx-auto px-6 pt-28 pb-20">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <Link href="/admin" className="hover:text-white flex items-center gap-1"><ChevronLeft className="w-3 h-3" />Admin</Link>
          <span>/</span>
          <span className="text-white">Logs</span>
        </div>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-3"><FileText className="w-8 h-8 text-blue-400" />System Logs</h1>
            <p className="text-gray-400 mt-1 text-sm">Real-time log streaming across all microservices</p>
          </div>
          <Button variant="outline" size="sm" onClick={fetchLogs} className="border-white/20 text-white hover:bg-white/10">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* Error Summary Banner */}
        {errorSummary && errorSummary.errors_last_hour > 0 && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-4 mb-6">
            <p className="text-red-400 font-semibold flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              {errorSummary.errors_last_hour} errors in the last hour
            </p>
            <div className="mt-2 space-y-1">
              {errorSummary.top_errors.slice(0, 3).map((e, i) => (
                <p key={i} className="text-sm text-gray-400">
                  <span className="text-red-400 font-mono">×{e.count}</span> [{e.service}] {e.message}
                </p>
              ))}
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              placeholder="Filter by message or service…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0d1117] border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 w-64"
            />
          </div>

          <div className="flex gap-1">
            {["all", "DEBUG", "INFO", "WARNING", "ERROR", "CRITICAL"].map((l) => (
              <button
                key={l}
                onClick={() => setLevelFilter(l)}
                className={`px-2.5 py-1.5 rounded text-xs font-medium transition-colors ${levelFilter === l ? "bg-blue-600 text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"}`}
              >
                {l}
              </button>
            ))}
          </div>

          <select
            value={sinceMinutes}
            onChange={(e) => setSinceMinutes(Number(e.target.value))}
            className="bg-[#0d1117] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500"
          >
            <option value={15}>Last 15m</option>
            <option value={60}>Last 1h</option>
            <option value={360}>Last 6h</option>
            <option value={1440}>Last 24h</option>
          </select>

          <label className="flex items-center gap-2 text-sm text-gray-400 cursor-pointer">
            <input type="checkbox" checked={autoScroll} onChange={(e) => setAutoScroll(e.target.checked)} className="accent-blue-500" />
            Auto-scroll
          </label>
        </div>

        {/* Log Stream */}
        <div className="bg-[#080c14] border border-white/10 rounded-xl overflow-hidden font-mono text-xs">
          <div className="px-4 py-2 border-b border-white/10 flex items-center justify-between bg-[#0d1117]">
            <span className="text-gray-400">Showing {filtered.length} entries</span>
            <span className="text-gray-600">RCT Log Stream</span>
          </div>
          <div className="max-h-[600px] overflow-y-auto p-4 space-y-0.5">
            {loading ? (
              <div className="text-gray-500 py-8 text-center">Loading logs…</div>
            ) : filtered.length === 0 ? (
              <div className="text-gray-600 py-8 text-center">No log entries match your filter.</div>
            ) : (
              filtered.map((entry) => {
                const LevelIcon = LEVEL_ICONS[entry.level] || Info
                return (
                  <div key={entry.log_id} className="flex items-start gap-3 py-0.5 hover:bg-white/3 rounded px-1">
                    <span className="text-gray-600 shrink-0 w-[180px]">{new Date(entry.timestamp).toLocaleTimeString()}</span>
                    <LevelIcon className={`w-3 h-3 mt-0.5 shrink-0 ${LEVEL_STYLES[entry.level]}`} />
                    <span className={`shrink-0 w-14 ${LEVEL_STYLES[entry.level]}`}>{entry.level}</span>
                    <span className="text-purple-400 shrink-0 w-28">[{entry.service}]</span>
                    <span className={`flex-1 ${LEVEL_STYLES[entry.level] || "text-gray-300"}`}>{entry.message}</span>
                    {entry.trace_id && <span className="text-gray-600 shrink-0">{entry.trace_id.slice(0, 8)}</span>}
                  </div>
                )
              })
            )}
            <div ref={bottomRef} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
