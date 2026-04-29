"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { FlaskConical, Play, GitCompare, Beaker, Database, BarChart3, ChevronRight, Cpu, BookOpen, Brain, Settings } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { getSupabaseBrowserClient } from "@/lib/auth/browser-client"
import { useRouter } from "next/navigation"

const STUDIO_API = process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:8054"

interface Algorithm {
  algo_id: string
  name: string
  category: string
  description: string
  version: string
  port: number
  avg_latency_ms: number
  tests_passing: number
  total_tests: number
  tags: string[]
}

interface ResultSummary {
  total_algorithms: number
  total_experiments: number
  total_datasets: number
  playground_runs_today: number
  avg_accuracy_pct: number
  most_used_algorithm: string
}

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

const CATEGORY_COLORS: Record<string, string> = {
  nlp: "text-purple-400 bg-purple-400/10 border-purple-400/30",
  code: "text-blue-400 bg-blue-400/10 border-blue-400/30",
  multimodal: "text-green-400 bg-green-400/10 border-green-400/30",
}

function AlgoCard({ algo }: { algo: Algorithm }) {
  const pct = algo.total_tests > 0 ? Math.round((algo.tests_passing / algo.total_tests) * 100) : 0
  return (
    <Link href={`/studio/algorithms/${algo.algo_id}`}>
      <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 hover:border-white/20 hover:bg-white/3 transition-all cursor-pointer h-full">
        <div className="flex items-start justify-between mb-3">
          <span className="text-xs font-mono text-gray-500">{algo.algo_id}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${CATEGORY_COLORS[algo.category] || ""}`}>
            {algo.category}
          </span>
        </div>
        <h3 className="font-semibold text-sm mb-1">{algo.name}</h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-3">{algo.description}</p>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="text-green-400 font-mono">{pct}% tests</span>
          <span>{algo.avg_latency_ms}ms avg</span>
          <span>:{algo.port}</span>
        </div>
      </div>
    </Link>
  )
}

export default function StudioPage() {
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([])
  const [summary, setSummary] = useState<ResultSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error || !session) {
          router.push("/auth/signin?next=/studio")
          return
        }
        
        setUserEmail(session.user.email || "Unknown User")
      } catch (err) {
        console.error("Auth check failed:", err)
        router.push("/auth/signin?next=/studio")
      }
    }
    
    checkAuth()
  }, [router])

  async function fetchData() {
    setLoading(true)
    try {
      const [algoRes, summaryRes] = await Promise.allSettled([
        fetch(`${STUDIO_API}/algorithms`),
        fetch(`${STUDIO_API}/results/summary`),
      ])
      if (algoRes.status === "fulfilled" && algoRes.value.ok) setAlgorithms(await algoRes.value.json())
      if (summaryRes.status === "fulfilled" && summaryRes.value.ok) setSummary(await summaryRes.value.json())
    } catch { /* offline */ } finally { setLoading(false) }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      void fetchData()
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  const MOCK_SUMMARY: ResultSummary = {
    total_algorithms: 10,
    total_experiments: 5,
    total_datasets: 3,
    playground_runs_today: 47,
    avg_accuracy_pct: 87.3,
    most_used_algorithm: "algo-10",
  }
  const stats = summary ?? MOCK_SUMMARY

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-[#0d1117] border-r border-white/10 pt-6 px-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 px-2">Specialist Studio</p>
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-colors">
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            ))}
          </nav>
          <div className="mt-8 px-2">
            <p className="text-xs text-gray-600 mb-2">Quick Links</p>
            <Link href="/admin" className="block text-xs text-gray-500 hover:text-white py-1 transition-colors">→ Admin Console</Link>
            <Link href="/owner" className="block text-xs text-gray-500 hover:text-white py-1 transition-colors">→ Owner Console</Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8">
          <div className="mb-8 flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <FlaskConical className="w-8 h-8 text-purple-400" />
                Specialist Studio
              </h1>
              <p className="text-gray-400 mt-1">Algorithm playground · A/B comparison · Experiment tracking · Dataset catalog</p>
            </div>
            {userEmail && (
              <div className="flex items-center gap-3 bg-[#161b22] border border-white/10 rounded-full px-4 py-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm">
                  {userEmail.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 leading-tight">Logged in as</span>
                  <span className="text-sm font-medium text-white leading-tight">{userEmail}</span>
                </div>
              </div>
            )}
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: "Algorithms", value: stats.total_algorithms, color: "text-purple-400" },
              { label: "Experiments", value: stats.total_experiments, color: "text-blue-400" },
              { label: "Datasets", value: stats.total_datasets, color: "text-green-400" },
              { label: "Runs Today", value: stats.playground_runs_today, color: "text-yellow-400" },
              { label: "Avg Accuracy", value: `${stats.avg_accuracy_pct}%`, color: "text-emerald-400" },
              { label: "Top Algo", value: stats.most_used_algorithm, color: "text-pink-400" },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-[#0d1117] border border-white/10 rounded-xl p-4 text-center">
                <p className={`text-xl font-bold ${color}`}>{value}</p>
                <p className="text-xs text-gray-500 mt-1">{label}</p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { href: "/studio/playground", label: "Run Playground", desc: "Test algorithms interactively", icon: Play, color: "text-green-400" },
              { href: "/studio/compare", label: "Compare Models", desc: "Side-by-side A/B testing", icon: GitCompare, color: "text-blue-400" },
              { href: "/studio/experiments", label: "Experiments", desc: "Track runs & results", icon: Beaker, color: "text-yellow-400" },
              { href: "/studio/datasets", label: "Datasets", desc: "Browse training data", icon: Database, color: "text-purple-400" },
            ].map(({ href, label, desc, icon: Icon, color }) => (
              <Link key={href} href={href}>
                <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5 hover:border-white/30 hover:bg-white/3 transition-all cursor-pointer">
                  <Icon className={`w-7 h-7 ${color} mb-3`} />
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-gray-500 mt-1">{desc}</p>
                  <ChevronRight className="w-4 h-4 text-gray-600 mt-2" />
                </div>
              </Link>
            ))}
          </div>

          {/* Algorithm Grid */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              All Algorithms ({algorithms.length > 0 ? algorithms.length : 10})
            </h2>
            <Link href="/studio/algorithms" className="text-sm text-purple-400 hover:text-purple-300">View all →</Link>
          </div>
          {loading ? (
            <div className="py-16 text-center text-gray-500">Loading algorithms…</div>
          ) : algorithms.length === 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {Array.from({ length: 10 }, (_, i) => (
                <div key={i} className="bg-[#0d1117] border border-white/5 rounded-xl p-5 animate-pulse h-36" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {algorithms.map((algo) => <AlgoCard key={algo.algo_id} algo={algo} />)}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  )
}
