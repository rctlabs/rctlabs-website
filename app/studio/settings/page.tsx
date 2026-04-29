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
import { useRequireAuth } from "@/lib/auth/use-require-auth"

const API_BASE = process.env.NEXT_PUBLIC_STUDIO_URL || "http://localhost:8054"

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
  useRequireAuth()
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
    <div className="min-h-screen bg-background text-foreground transition-colors duration-200">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border pt-6 px-4">
          <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4 px-2">Specialist Studio</p>
          <nav className="space-y-1">
            {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
              const active = pathname?.endsWith(href) || (href === "/studio/settings" && pathname?.endsWith("/settings"))
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-8 px-2">
            <p className="text-xs text-muted-foreground mb-2">Quick Links</p>
            <Link href="/admin" className="block text-xs text-muted-foreground hover:text-foreground py-1 transition-colors">→ Admin Console</Link>
            <Link href="/owner" className="block text-xs text-muted-foreground hover:text-foreground py-1 transition-colors">→ Owner Console</Link>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-8 max-w-3xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3 text-foreground">
              <Settings className="w-8 h-8 text-muted-foreground" />
              Settings
            </h1>
            <p className="text-muted-foreground mt-1">Manage your AI engine, language, and notification preferences</p>
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
            <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-500" />
                Language
              </h2>
              <div className="flex gap-3">
                {(["en", "th"] as const).map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`px-5 py-2.5 rounded-lg text-sm border transition-colors shadow-sm ${
                      locale === l
                        ? "border-primary/50 bg-primary/10 text-primary"
                        : "border-border bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted"
                    }`}
                  >
                    {l === "en" ? "English" : "ภาษาไทย"}
                  </button>
                ))}
              </div>
            </section>

            {/* Notifications */}
            <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Bell className="w-4 h-4 text-amber-500" />
                Notifications
              </h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setNotifications(!notifications)}
                  className={`w-10 h-6 rounded-full flex items-center transition-colors shadow-inner ${
                    notifications ? "bg-primary justify-end" : "bg-muted-foreground/30 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Enable push notifications
                </span>
              </label>
            </section>

            {/* Privacy */}
            <section className="bg-card border border-border rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                Privacy
              </h2>
              <label className="flex items-center gap-3 cursor-pointer">
                <div
                  onClick={() => setPrivacyMode(!privacyMode)}
                  className={`w-10 h-6 rounded-full flex items-center transition-colors shadow-inner ${
                    privacyMode ? "bg-emerald-500 justify-end" : "bg-muted-foreground/30 justify-start"
                  }`}
                >
                  <div className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm" />
                </div>
                <span className="text-sm text-muted-foreground">
                  Privacy mode — mask personal data in memory timeline
                </span>
              </label>
            </section>

            {/* Save */}
            <button
              onClick={handleSave}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all shadow-sm ${
                saved
                  ? "bg-emerald-500/20 border border-emerald-500/30 text-emerald-500"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
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
