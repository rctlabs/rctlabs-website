"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  Play,
  GitCompare,
  Beaker,
  Database,
  BookOpen,
  Brain,
  Settings,
  LogOut,
} from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/auth/browser-client"

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

export function StudioSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()
        if (user?.email) setUserEmail(user.email)
      } catch {
        // not critical — sidebar still renders without user email
      }
    }
    void fetchUser()
  }, [])

  async function handleSignOut() {
    setSigningOut(true)
    try {
      const supabase = getSupabaseBrowserClient()
      await supabase.auth.signOut()
    } finally {
      router.push("/auth/signin")
    }
  }

  // Determine active item: exact match for /studio, prefix match for sub-pages
  function isActive(href: string) {
    if (href === "/studio") return pathname === "/studio"
    return pathname.startsWith(href)
  }

  return (
    <aside className="w-64 min-h-screen bg-sidebar border-r border-sidebar-border pt-6 px-4 flex flex-col shrink-0">
      <p className="text-xs text-muted-foreground uppercase tracking-widest mb-4 px-2">
        Specialist Studio
      </p>

      <nav className="space-y-1 flex-1">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
              isActive(href)
                ? "bg-primary/10 text-primary border border-primary/20"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="mt-6 px-2">
        <p className="text-xs text-muted-foreground mb-2">Quick Links</p>
        <Link
          href="/admin"
          className="block text-xs text-muted-foreground hover:text-foreground py-1 transition-colors"
        >
          → Admin Console
        </Link>
        <Link
          href="/owner"
          className="block text-xs text-muted-foreground hover:text-foreground py-1 transition-colors"
        >
          → Owner Console
        </Link>
      </div>

      {/* User footer with logout */}
      <div className="border-t border-sidebar-border mt-6 pt-4 pb-6 px-2">
        {userEmail && (
          <div className="flex items-center gap-2 mb-3 min-w-0">
            <div className="w-7 h-7 shrink-0 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
              {userEmail.charAt(0).toUpperCase()}
            </div>
            <span className="text-xs text-muted-foreground truncate">{userEmail}</span>
          </div>
        )}
        <button
          onClick={handleSignOut}
          disabled={signingOut}
          className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors disabled:opacity-60"
        >
          <LogOut className="w-4 h-4 shrink-0" />
          {signingOut ? "Signing out…" : "Sign out"}
        </button>
      </div>
    </aside>
  )
}
