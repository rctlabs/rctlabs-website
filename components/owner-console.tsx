"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  Activity,
  Users,
  Key,
  Server,
  HardDrive,
  Cpu,
  Network,
  Clock,
  Shield,
  DollarSign,
  RefreshCw,
  Eye,
  EyeOff,
} from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8052"

interface SystemMetrics {
  cpu_percent: number
  memory_percent: number
  memory_used_mb: number
  memory_total_mb: number
  disk_percent: number
  uptime_seconds: number
  active_connections: number
}

interface ServiceHealth {
  name: string
  status: string
  uptime: number
  requests_per_minute: number
  error_rate: number
}

interface User {
  user_id: string
  email: string
  name: string
  tier: string
  api_calls_today: number
}

interface AuditLog {
  log_id: string
  timestamp: string
  user_id: string
  action: string
  resource: string
}

interface CostSummary {
  by_purpose: Record<string, { cost: number; requests: number; tokens: number }>
  total_cost: number
}

interface APIKey {
  key_id: string
  purpose: string
  active: boolean
  requests_today: number
}

export function OwnerConsole() {
  const [metrics, setMetrics] = useState<SystemMetrics | null>(null)
  const [services, setServices] = useState<ServiceHealth[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([])
  const [costSummary, setCostSummary] = useState<CostSummary | null>(null)
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [loading, setLoading] = useState(true)

  const loadData = async () => {
    setLoading(true)
    try {
      const [metricsRes, servicesRes, usersRes, logsRes, costRes, keysRes] = await Promise.all([
        fetch(`${API_URL}/metrics`),
        fetch(`${API_URL}/services`),
        fetch(`${API_URL}/users`),
        fetch(`${API_URL}/audit-logs?limit=20`),
        fetch(`${API_URL}/cost-summary`),
        fetch(`${API_URL}/api-keys`),
      ])

      setMetrics(await metricsRes.json())
      const servicesData = await servicesRes.json()
      setServices(servicesData.services || [])
      const usersData = await usersRes.json()
      setUsers(usersData.users || [])
      const logsData = await logsRes.json()
      setAuditLogs(logsData.logs || [])
      setCostSummary(await costRes.json())
      const keysData = await keysRes.json()
      setApiKeys(keysData.keys || [])
    } catch (err) {
      console.error("Failed to load data:", err)
    }
    setLoading(false)
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void loadData()
    }, 0)
    const interval = setInterval(() => {
      void loadData()
    }, 30000)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  const formatUptime = (seconds: number) => {
    const days = Math.floor(seconds / 86400)
    const hours = Math.floor((seconds % 86400) / 3600)
    return `${days}d ${hours}h`
  }

  const getTierBadge = (tier: string) => {
    const colors: Record<string, string> = {
      admin: "bg-red-500",
      architect: "bg-purple-500",
      specialist: "bg-blue-500",
      foundation: "bg-gray-500",
    }
    return (
      <Badge className={`${colors[tier] || "bg-gray-500"} text-white`}>
        {tier}
      </Badge>
    )
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
              <Shield className="w-8 h-8" />
              Owner Console
            </h1>
            <p className="text-muted-foreground mt-1">
              System administration, metrics, and user management
            </p>
          </div>
          <Button onClick={loadData} variant="outline" size="sm">
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>

        {/* System Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CPU Usage</p>
                  <p className="text-2xl font-bold">{metrics?.cpu_percent.toFixed(1)}%</p>
                </div>
                <Cpu className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Memory</p>
                  <p className="text-2xl font-bold">
                    {metrics?.memory_percent.toFixed(1)}%
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {metrics?.memory_used_mb.toFixed(0)} / {metrics?.memory_total_mb.toFixed(0)} MB
                  </p>
                </div>
                <HardDrive className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Disk</p>
                  <p className="text-2xl font-bold">{metrics?.disk_percent.toFixed(1)}%</p>
                </div>
                <Activity className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Connections</p>
                  <p className="text-2xl font-bold">{metrics?.active_connections || 0}</p>
                </div>
                <Network className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="services" className="space-y-4">
          <TabsList>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="costs">Costs</TabsTrigger>
            <TabsTrigger value="keys">API Keys</TabsTrigger>
          </TabsList>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Server className="w-5 h-5" />
                  Service Health
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {services.map((svc) => (
                    <div
                      key={svc.name}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            svc.status === "running" ? "bg-green-500" : "bg-red-500"
                          }`}
                        />
                        <span className="font-medium">{svc.name}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Uptime: {formatUptime(svc.uptime)}</span>
                        <span>{svc.requests_per_minute.toFixed(1)} req/min</span>
                        <span>Error: {(svc.error_rate * 100).toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {users.map((user) => (
                    <div
                      key={user.user_id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        {getTierBadge(user.tier)}
                        <span className="text-sm text-muted-foreground">
                          {user.api_calls_today} calls today
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="audit">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Audit Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {auditLogs.map((log) => (
                    <div
                      key={log.log_id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div>
                        <p className="font-medium">{log.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {log.resource} • {log.user_id}
                        </p>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {new Date(log.timestamp).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="costs">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Cost Summary
                </CardTitle>
              </CardHeader>
              <CardContent>
                {costSummary && (
                  <div className="space-y-4">
                    <div className="text-2xl font-bold">
                      ${costSummary.total_cost.toFixed(2)}
                      <span className="text-sm text-muted-foreground ml-2">this month</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {Object.entries(costSummary.by_purpose).map(([purpose, data]) => (
                        <div key={purpose} className="text-center">
                          <p className="text-lg font-semibold">${data.cost.toFixed(2)}</p>
                          <p className="text-xs text-muted-foreground capitalize">{purpose}</p>
                          <p className="text-xs text-muted-foreground">{data.requests} requests</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="keys">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Keys
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {apiKeys.map((key) => (
                    <div
                      key={key.key_id}
                      className="flex items-center justify-between py-2 border-b last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        {key.active ? (
                          <Eye className="w-4 h-4 text-green-500" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-red-500" />
                        )}
                        <div>
                          <p className="font-mono text-sm">{key.key_id}</p>
                          <p className="text-xs text-muted-foreground capitalize">{key.purpose}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">
                          {key.requests_today} requests today
                        </span>
                        <Badge variant={key.active ? "default" : "secondary"}>
                          {key.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
