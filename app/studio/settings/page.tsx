"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Settings,
  BarChart3,
  Play,
  GitCompare,
  Beaker,
  Database,
  BookOpen,
  Brain,
  Globe,
  Bell,
  Shield,
  Save,
  Check,
} from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AIEngineSelector } from "@/components/ai-engine-selector"

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

export default function SettingsPage() {
  const pathname = usePathname()
  const initialLocale: "en" | "th" = pathname?.startsWith("/th") ? "th" : "en"
  const [locale, setLocale] = useState<"en" | "th">(initialLocale)
  const [notifications, setNotifications] = useState(true)
  const [privacyMode, setPrivacyMode] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSave = async () => {
    try {
      await fetch(`${API_BASE}/api/v1/user/default/settings`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ locale, notifications, privacy_mode: privacyMode }),
      })
    } catch { /* offline fallback */ }
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-[#0d1117] border-r border-white/10 pt-6 px-4">
          <p className="text-xs text-gray-500 uppercase tracking-widest mb-4 px-2">Specialist Studio</p>
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname?.endsWith(href) || (href === "/studio/settings" && pathname?.endsWith("/settings"))
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
        <main className="flex-1 p-8 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
              <Settings className="w-8 h-8 text-gray-400" />
              Settings
            </h1>
            <p className="text-gray-400 mt-1">Manage your AI engine, language, and notification preferences</p>
          </div>

          <div className="space-y-6">
            {/* AI Engine Section */}
            <section>
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                AI Engine Selection
              </h2>
              <AIEngineSelector userId="default" userTier="REGISTERED" />
            </section>

            {/* Language */}
            <section className="bg-[#0d1117] border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                Language
              </h2>
              <div className="flex gap-3">
                {(["en", "th"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`px-5 py-2.5 rounded-lg text-sm border transition-colors ${
                      locale === l
                        ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                        : "border-white/10 bg-white/5 text-gray-400 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    {l === "en" ? "English" : "ภาษาไทย"}
                  </button>
                ))}
              </div>
            </section>

            {/* Notifications */}
            <section className="bg-[#0d1117] border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-yellow-400" />
                Notifications
              </h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setNotifications(!notifications)}
                  className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                    notifications ? "bg-blue-500 justify-end" : "bg-gray-700 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full mx-1" />
                </div>
                <span className="text-sm text-gray-300">
                  Enable push notifications
                </span>
              </label>
            </section>

            {/* Privacy */}
            <section className="bg-[#0d1117] border border-white/10 rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-green-400" />
                Privacy
              </h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setPrivacyMode(!privacyMode)}
                  className={`w-10 h-6 rounded-full flex items-center transition-colors ${
                    privacyMode ? "bg-green-500 justify-end" : "bg-gray-700 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full mx-1" />
                </div>
                <span className="text-sm text-gray-300">
                  Privacy mode — mask personal data in memory timeline
                </span>
              </label>
            </section>

            {/* Save */}
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                saved
                  ? "bg-green-500/20 border border-green-500/30 text-green-400"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}
            >
              {saved ? <Check className="w-4 h-4" /> : <Save className="w-4 h-4" />}
              {saved ? "Saved" : "Save Settings"}
            </button>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  )
}
