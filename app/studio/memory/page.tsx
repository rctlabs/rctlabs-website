"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Brain,
  Search,
  RefreshCw,
  MessageSquare,
  Box,
  Target,
  ChevronDown,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { StudioSidebar } from "@/components/studio/studio-sidebar"
import { useRequireAuth } from "@/lib/auth/use-require-auth"

const API_BASE = process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:8054"

type MemoryType = "conversation" | "module" | "intent"

interface MemoryEntry {
  id: string
  type: MemoryType
  content: string
  timestamp: string
  metadata?: Record<string, unknown>
}

const TYPE_META: Record<MemoryType, { icon: typeof MessageSquare; color: string; label: string }> = {
  conversation: { icon: MessageSquare, color: "text-blue-500 bg-blue-500/10 border-blue-500/30", label: "Conversation" },
  module: { icon: Box, color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/30", label: "Module" },
  intent: { icon: Target, color: "text-primary bg-primary/10 border-primary/30", label: "Intent" },
}

function MemoryCard({ entry }: { entry: MemoryEntry }) {
  const meta = TYPE_META[entry.type] ?? TYPE_META.conversation
  const Icon = meta.icon
  const ts = new Date(entry.timestamp)

  return (
    <div className="bg-card border border-border shadow-sm rounded-xl p-5 hover:border-primary/40 hover:shadow-md transition-all duration-200">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium inline-flex items-center gap-1 ${meta.color}`}>
          <Icon className="w-3 h-3" />
          {meta.label}
        </span>
        <span className="text-xs text-muted-foreground">
          {ts.toLocaleDateString()} {ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed">{entry.content}</p>
    </div>
  )
}

export default function MemoryPage() {
  useRequireAuth()
  const [entries, setEntries] = useState<MemoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [filter, setFilter] = useState<MemoryType | "all">("all")
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const LIMIT = 20
  const pathname = usePathname()

  const fetchMemory = useCallback(
    async ({ reset, offsetValue, query }: { reset: boolean; offsetValue?: number; query?: string }) => {
      const newOffset = reset ? 0 : offsetValue ?? offset
      if (reset) setLoading(true)
      else setLoadingMore(true)

      try {
        const url = new URL(`${API_BASE}/api/v1/agent/memory-timeline/default`)
        url.searchParams.set("limit", String(LIMIT))
        url.searchParams.set("offset", String(newOffset))
        if (filter !== "all") url.searchParams.set("type", filter)
        if (query) url.searchParams.set("q", query)

        const res = await fetch(url.toString())
        if (!res.ok) throw new Error("fetch failed")
        const data = await res.json()
        const items: MemoryEntry[] = data.entries ?? data ?? []
        setFetchError(null)

        if (reset) {
          setEntries(items)
          setOffset(LIMIT)
        } else {
          setEntries((prev) => [...prev, ...items])
          setOffset((prev) => prev + LIMIT)
        }
        setHasMore(items.length >= LIMIT)
      } catch {
        if (reset) setEntries([])
        setFetchError("Memory service is unavailable. Check that the studio backend is running.")
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [LIMIT, filter, offset],
  )

  useEffect(() => {
    void fetchMemory({ reset: true, query: search })
  }, [fetchMemory, search])

  const filtered = entries

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      <div className="flex">
        <StudioSidebar />

        {/* Main */}
        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3 text-foreground">
                <Brain className="w-8 h-8 text-primary" />
                Memory Timeline
              </h1>
              <p className="text-muted-foreground mt-1">Browse and search your AI agent&apos;s memory entries</p>
            </div>
            <button
              onClick={() => void fetchMemory({ reset: true, query: search })}
              disabled={loading}
              className="flex items-center gap-2 bg-muted/50 border border-border px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50 shadow-sm"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && void fetchMemory({ reset: true, query: search })}
                placeholder="Search memories…"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-muted/50 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors shadow-sm"
              />
            </div>
            {(["all", "conversation", "module", "intent"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-lg text-sm border transition-colors shadow-sm ${
                  filter === t
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : "border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {t === "all" ? "All" : TYPE_META[t].label}
              </button>
            ))}
          </div>

          {/* Error banner */}
          {fetchError && (
            <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/30 text-destructive rounded-xl px-5 py-4 text-sm mb-6">
              <span className="text-destructive">⚠</span>
              {fetchError}
            </div>
          )}

          {/* Content */}
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="bg-card border border-border shadow-sm rounded-xl p-5 animate-pulse h-24" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <Brain className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground font-medium">No memory entries found</p>
              <p className="text-xs text-muted-foreground/70 mt-1">Interact with the AI agent to build memory</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {filtered.map((entry) => (
                  <MemoryCard key={entry.id} entry={entry} />
                ))}
              </div>
              {hasMore && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => void fetchMemory({ reset: false, offsetValue: offset, query: search })}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-muted/50 border border-border text-sm text-muted-foreground hover:text-foreground hover:bg-muted transition-colors disabled:opacity-50 shadow-sm"
                  >
                    <ChevronDown className={`w-4 h-4 ${loadingMore ? "animate-bounce" : ""}`} />
                    {loadingMore ? "Loading…" : "Load More"}
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}
