"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Terminal, Play, CheckCircle, XCircle, Clock, ChevronRight, RefreshCw, BarChart3, FileCode } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const TEST_API = process.env.NEXT_PUBLIC_TEST_CONSOLE_URL || "http://localhost:8051"

interface TestSuiteResult {
  suite_name: string
  total: number
  passed: number
  failed: number
  errors: number
  duration_seconds: number
  status: string
}

interface TestRun {
  run_id: string
  service_name: string
  status: string
  started_at: string
  completed_at?: string
  results?: TestSuiteResult[]
}

interface ServiceInfo {
  name: string
  path: string
}

const STATUS_STYLE: Record<string, string> = {
  passed: "text-green-400 bg-green-400/10 border-green-400/20",
  failed: "text-red-400 bg-red-400/10 border-red-400/20",
  running: "text-blue-400 bg-blue-400/10 border-blue-400/20 animate-pulse",
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  error: "text-orange-400 bg-orange-400/10 border-orange-400/20",
}

export default function TestConsolePage() {
  const [services, setServices] = useState<ServiceInfo[]>([])
  const [runs, setRuns] = useState<TestRun[]>([])
  const [selectedService, setSelectedService] = useState("")
  const [loading, setLoading] = useState(true)
  const [running, setRunning] = useState(false)
  const [lastRefresh, setLastRefresh] = useState("")

  async function fetchData() {
    setLoading(true)
    try {
      const [svcRes, runsRes] = await Promise.allSettled([
        fetch(`${TEST_API}/rctlabs/test/services`),
        fetch(`${TEST_API}/rctlabs/test/runs?limit=10`),
      ])
      if (svcRes.status === "fulfilled" && svcRes.value.ok)
        setServices(await svcRes.value.json())
      if (runsRes.status === "fulfilled" && runsRes.value.ok)
        setRuns(await runsRes.value.json())
    } catch { /* backend may not be running */ }
    setLastRefresh(new Date().toLocaleTimeString())
    setLoading(false)
  }

  async function runTests() {
    if (!selectedService) return
    setRunning(true)
    try {
      const res = await fetch(`${TEST_API}/rctlabs/test/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service_name: selectedService }),
      })
      if (res.ok) {
        setTimeout(fetchData, 2000)
      }
    } catch { /* backend offline */ }
    setRunning(false)
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
              <span className="text-white">Test Console</span>
            </div>
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Terminal className="w-8 h-8 text-green-400" />
              Test Console
            </h1>
            <p className="text-gray-400 mt-1 text-sm">Run tests · View results · Track coverage</p>
          </div>
          <Button
            onClick={fetchData}
            variant="outline"
            className="border-white/20 text-gray-300 hover:border-green-400 hover:text-white gap-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            {lastRefresh ? `Last: ${lastRefresh}` : "Refresh"}
          </Button>
        </div>

        {/* Run Tests Panel */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <Play className="w-5 h-5 text-green-400" />
            Run Tests
          </h2>
          <div className="bg-[#0d1117] border border-white/10 rounded-xl p-6">
            <div className="flex gap-3">
              <Input
                placeholder="Service name (e.g. algo-10-sentiment-analysis)"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 flex-1"
                list="service-options"
              />
              <datalist id="service-options">
                {services.map((s) => (
                  <option key={s.name} value={s.name} />
                ))}
              </datalist>
              <Button
                onClick={runTests}
                disabled={!selectedService || running}
                className="bg-green-500 hover:bg-green-400 text-black font-semibold gap-2 px-6"
              >
                <Play className="w-4 h-4" />
                {running ? "Running…" : "Run"}
              </Button>
            </div>
            {services.length > 0 && (
              <p className="text-xs text-gray-500 mt-3">
                {services.length} services available · Start backend at port 8051 for live test execution
              </p>
            )}
          </div>
        </section>

        {/* Recent Runs */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-400" />
            Recent Runs
          </h2>
          {runs.length === 0 ? (
            <div className="bg-[#0d1117] border border-white/10 rounded-xl p-8 text-center text-gray-500">
              No test runs yet — backend offline or no runs recorded
            </div>
          ) : (
            <div className="space-y-3">
              {runs.map((run) => (
                <div key={run.run_id} className="bg-[#0d1117] border border-white/10 rounded-xl px-5 py-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <FileCode className="w-4 h-4 text-gray-400" />
                      <span className="font-mono text-sm text-white">{run.service_name}</span>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full border ${STATUS_STYLE[run.status] ?? STATUS_STYLE.pending}`}>
                      {run.status}
                    </span>
                  </div>
                  {run.results && run.results.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 text-sm text-center">
                      {[
                        { label: "Total", val: run.results.reduce((a, r) => a + r.total, 0), cls: "text-gray-300" },
                        { label: "Passed", val: run.results.reduce((a, r) => a + r.passed, 0), cls: "text-green-400" },
                        { label: "Failed", val: run.results.reduce((a, r) => a + r.failed, 0), cls: "text-red-400" },
                        { label: "Errors", val: run.results.reduce((a, r) => a + r.errors, 0), cls: "text-orange-400" },
                      ].map(({ label, val, cls }) => (
                        <div key={label}>
                          <div className={`text-xl font-bold ${cls}`}>{val}</div>
                          <div className="text-xs text-gray-500">{label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Statistical Summary (static showcase) */}
        <section>
          <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-violet-400" />
            Platform Test Coverage
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Total Tests", value: "3,765", color: "text-violet-400" },
              { label: "Passing Rate", value: "100%", color: "text-green-400" },
              { label: "Microservices", value: "15", color: "text-blue-400" },
              { label: "Version", value: "v3.4.0", color: "text-yellow-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-[#0d1117] border border-white/10 rounded-xl p-5 text-center">
                <div className={`text-2xl font-bold ${color}`}>{value}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
