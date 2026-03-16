"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Brain,
  BarChart3,
  Play,
  GitCompare,
  Beaker,
  Database,
  BookOpen,
  Settings,
  Search,
  RefreshCw,
  MessageSquare,
  Box,
  Target,
  ChevronDown,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"

const NAV_ITEMS = [
  { href: "/studio", label: "Overview", icon: BarChart3 },
  { href: "/studio/playground", label: "Playground", icon: Play },
  { href: "/studio/compare", label: "Compare", icon: GitCompare },
  { href: "/studio/experiments", label: "Experiments", icon: Beaker },
  { href: "/studio/datasets", label: "Datasets", icon: Database },
  { href: "/studio/algorithms", label: "Algorithms", icon: BookOpen },
  { href: "/studio/memory", label: "Memory", icon: Brain },
  { href: "/studio/settings", label: "Settings", icon: Settings },
]

type MemoryType = "conversation" | "module" | "intent"

interface MemoryEntry {
  id: string
  type: MemoryType
  content: string
  timestamp: string
  metadata?: Record<string, unknown>
}

const TYPE_META: Record<MemoryType, { icon: typeof MessageSquare; color: string; label: string }> = {
  conversation: { icon: MessageSquare, color: "text-blue-400 bg-blue-400/10 border-blue-400/30", label: "Conversation" },
  module: { icon: Box, color: "text-green-400 bg-green-400/10 border-green-400/30", label: "Module" },
  intent: { icon: Target, color: "text-purple-400 bg-purple-400/10 border-purple-400/30", label: "Intent" },
}

function MemoryCard({ entry }: { entry: MemoryEntry }) {
  const meta = TYPE_META[entry.type] ?? TYPE_META.conversation
  const Icon = meta.icon
  const ts = new Date(entry.timestamp)

  return (
    <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 hover:border-white/20 transition-all">
      <div className="flex items-start justify-between mb-3">
        <span className={`text-xs px-2 py-0.5 rounded-full border font-medium inline-flex items-center gap-1 ${meta.color}`}>
          <Icon className="w-3 h-3" />
          {meta.label}
        </span>
        <span className="text-xs text-gray-500">
          {ts.toLocaleDateString()} {ts.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      </div>
      <p className="text-sm text-gray-300 leading-relaxed">{entry.content}</p>
    </div>
  )
}

export default function MemoryPage() {
  const [entries, setEntries] = useState<MemoryEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [filter, setFilter] = useState<MemoryType | "all">("all")
  const [search, setSearch] = useState("")
  const [offset, setOffset] = useState(0)
  const [hasMore, setHasMore] = useState(true)
  const LIMIT = 20
  const pathname = usePathname()

  const fetchMemory = useCallback(
    async (reset: boolean) => {
      const newOffset = reset ? 0 : offset
      if (reset) setLoading(true)
      else setLoadingMore(true)

      try {
        const url = new URL(`${API_BASE}/api/v1/agent/memory-timeline/default`)
        url.searchParams.set("limit", String(LIMIT))
        url.searchParams.set("offset", String(newOffset))
        if (filter !== "all") url.searchParams.set("type", filter)
        if (search) url.searchParams.set("q", search)

        const res = await fetch(url.toString())
        if (!res.ok) throw new Error("fetch failed")
        const data = await res.json()
        const items: MemoryEntry[] = data.entries ?? data ?? []

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
      } finally {
        setLoading(false)
        setLoadingMore(false)
      }
    },
    [offset, filter, search],
  )

  useEffect(() => {
    fetchMemory(true)
  }, [filter])

  const filtered = entries

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-[#0d1117] border-r border-white/10 pt-6 px-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 px-2">Specialist Studio</p>
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname?.endsWith(href) || (href === "/studio/memory" && pathname?.endsWith("/memory"))
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active ? "text-white bg-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-8 px-2">
            <p className="text-xs text-gray-600 mb-2">Quick Links</p>
            <Link href="/admin" className="block text-xs text-gray-500 hover:text-white py-1 transition-colors">→ Admin Console</Link>
            <Link href="/owner" className="block text-xs text-gray-500 hover:text-white py-1 transition-colors">→ Owner Console</Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Brain className="w-8 h-8 text-cyan-400" />
                Memory Timeline
              </h1>
              <p className="text-gray-400 mt-1">Browse and search your AI agent&apos;s memory entries</p>
            </div>
            <button
              onClick={() => fetchMemory(true)}
              disabled={loading}
              className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </button>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3 mb-6">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchMemory(true)}
                placeholder="Search memories…"
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-white/10 bg-black/40 text-sm text-white placeholder:text-gray-600 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/30 transition-colors"
              />
            </div>
            {(["all", "conversation", "module", "intent"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-4 py-2 rounded-lg text-sm border transition-colors ${
                  filter === t
                    ? "border-cyan-500/50 bg-cyan-500/10 text-cyan-400"
                    : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                }`}
              >
                {t === "all" ? "All" : TYPE_META[t].label}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading ? (
            <div className="space-y-4">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="bg-[#0d1117] border border-white/5 rounded-xl p-5 animate-pulse h-24" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-24 text-center">
              <Brain className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-500">No memory entries found</p>
              <p className="text-xs text-gray-600 mt-1">Interact with the AI agent to build memory</p>
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
                    onClick={() => fetchMemory(false)}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-white/5 border border-white/10 text-sm text-gray-300 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50"
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
