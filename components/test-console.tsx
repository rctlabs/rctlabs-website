"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  FileCode,
  BarChart3,
  RefreshCw,
  Loader2,
  ChevronRight,
  Terminal,
  Eye,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8051"

interface TestResult {
  test_id: string
  name: string
  status: "pending" | "running" | "passed" | "failed" | "skipped"
  duration_ms: number
  error_message?: string
}

interface TestSuite {
  suite_id: string
  suite_name: string
  total_tests: number
  passed: number
  failed: number
  skipped: number
  duration_ms: number
  tests: TestResult[]
}

interface TestRun {
  run_id: string
  status: string
  started_at: string
  completed_at?: string
  suites: TestSuite[]
  passed?: number
  failed?: number
}

interface Service {
  name: string
  path: string
  has_tests: boolean
}

export function TestConsole() {
  const [services, setServices] = useState<Service[]>([])
  const [selectedService, setSelectedService] = useState<string>("")
  const [testRuns, setTestRuns] = useState<TestRun[]>([])
  const [currentRun, setCurrentRun] = useState<TestRun | null>(null)
  const [loading, setLoading] = useState(false)
  const [running, setRunning] = useState(false)

  useEffect(() => {
    fetchServices()
    fetchRecentRuns()
  }, [])

  const fetchServices = async () => {
    try {
      const res = await fetch(`${API_URL}/services`)
      const data = await res.json()
      setServices(data.services || [])
    } catch {
      console.error("Failed to fetch services")
    }
  }

  const fetchRecentRuns = async () => {
    try {
      const res = await fetch(`${API_URL}/runs?limit=10`)
      const data = await res.json()
      setTestRuns(data.runs || [])
    } catch {
      console.error("Failed to fetch test runs")
    }
  }

  const runTests = async () => {
    if (!selectedService) return
    setRunning(true)

    try {
      const res = await fetch(`${API_URL}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ service: selectedService }),
      })
      const data = await res.json()

      // Poll for results
      const pollResult = async () => {
        const res = await fetch(`${API_URL}/runs/${data.run_id}`)
        const runData = await res.json()
        setCurrentRun(runData)

        if (runData.status === "running") {
          setTimeout(pollResult, 2000)
        } else {
          setRunning(false)
          fetchRecentRuns()
        }
      }

      setTimeout(pollResult, 1000)
    } catch {
      setRunning(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "failed":
        return <XCircle className="w-4 h-4 text-red-500" />
      case "skipped":
        return <AlertCircle className="w-4 h-4 text-yellow-500" />
      case "running":
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "destructive" | "secondary" | "outline"> = {
      passed: "default",
      failed: "destructive",
      skipped: "secondary",
      running: "outline",
    }
    return (
      <Badge variant={variants[status] || "outline"} className="capitalize">
        {status}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">🧪 Test Console</h1>
            <p className="text-muted-foreground mt-1">
              Run tests, view results, and analyze coverage
            </p>
          </div>
          <Button onClick={fetchServices} variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>

        {/* Run Tests Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Run Tests
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <select
                className="flex-1 h-10 px-3 rounded-md border border-input bg-background text-sm"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">Select a service...</option>
                {services.map((svc) => (
                  <option key={svc.name} value={svc.name}>
                    {svc.name}
                  </option>
                ))}
              </select>
              <Button onClick={runTests} disabled={!selectedService || running}>
                {running ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Run Tests
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results Tabs */}
        <Tabs defaultValue="runs" className="space-y-4">
          <TabsList>
            <TabsTrigger value="runs">Recent Runs</TabsTrigger>
            <TabsTrigger value="current">Current Run</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          <TabsContent value="runs" className="space-y-4">
            {testRuns.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No test runs yet</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {testRuns.map((run) => (
                  <Card key={run.run_id} className="cursor-pointer hover:bg-accent/5">
                    <CardContent className="flex items-center justify-between py-4">
                      <div className="flex items-center gap-4">
                        {getStatusIcon(run.status)}
                        <div>
                          <p className="font-mono text-sm">{run.run_id}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(run.started_at).toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm">
                            {(() => {
                              const passed = run.passed ?? run.suites.reduce((s, t) => s + t.passed, 0)
                              const failed = run.failed ?? run.suites.reduce((s, t) => s + t.failed, 0)
                              return (
                                <>
                                  <span className="text-green-500">{passed} passed</span>
                                  {failed > 0 && (
                                    <span className="text-red-500"> • {failed} failed</span>
                                  )}
                                </>
                              )
                            })()}
                          </p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="current">
            {currentRun ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{currentRun.run_id}</h3>
                    <p className="text-sm text-muted-foreground">
                      Status: {currentRun.status}
                    </p>
                  </div>
                  {getStatusBadge(currentRun.status)}
                </div>

                {currentRun.suites.map((suite) => (
                  <Card key={suite.suite_id}>
                    <CardHeader className="py-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">{suite.suite_name}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant="outline">{suite.passed} passed</Badge>
                          {suite.failed > 0 && (
                            <Badge variant="destructive">{suite.failed} failed</Badge>
                          )}
                          {suite.skipped > 0 && (
                            <Badge variant="secondary">{suite.skipped} skipped</Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-1">
                        {suite.tests.slice(0, 10).map((test) => (
                          <div
                            key={test.test_id}
                            className="flex items-center justify-between py-1 text-sm"
                          >
                            <div className="flex items-center gap-2">
                              {getStatusIcon(test.status)}
                              <span>{test.name}</span>
                            </div>
                            <span className="text-muted-foreground text-xs">
                              {test.duration_ms.toFixed(0)}ms
                            </span>
                          </div>
                        ))}
                        {suite.tests.length > 10 && (
                          <p className="text-xs text-muted-foreground text-center py-2">
                            +{suite.tests.length - 10} more tests
                          </p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No active test run</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {services.map((svc) => (
                <Card key={svc.name}>
                  <CardContent className="py-4">
                    <div className="flex items-center gap-3">
                      <FileCode className="w-8 h-8 text-accent" />
                      <div>
                        <p className="font-semibold">{svc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {svc.has_tests ? "✓ Has tests" : "No tests"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
