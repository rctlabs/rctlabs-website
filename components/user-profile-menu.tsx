"use client"

/*
 * UserProfileMenu — Auth shell for the Navbar
 * Currently shows Sign In / Early Access CTAs (Supabase auth in Phase 8)
 * Props: isAuthenticated, user for when auth is wired
 */
import { useState } from "react"
import { User, LogOut, Settings, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import { buildContactHref } from "@/lib/funnel"

interface UserProfileMenuProps {
  /** Future: pass user object when Supabase Auth is wired */
  user?: { name?: string; email?: string; avatarUrl?: string } | null
  isAuthenticated?: boolean
}

export function UserProfileMenu({ user = null, isAuthenticated = false }: UserProfileMenuProps) {
  const [open, setOpen] = useState(false)
  const { language } = useLanguage()

  const copy = language === "th"
    ? {
        contact: "ติดต่อทีมงาน",
        requestAccess: "ขอสิทธิ์เข้าถึง",
        settings: "ตั้งค่า",
        signOut: "ออกจากระบบ",
      }
    : {
        contact: "Contact Team",
        requestAccess: "Request Access",
        settings: "Settings",
        signOut: "Sign out",
      }

  const localePrefix = language === "th" ? "/th" : "/en"
  const contactHref = `${localePrefix}/contact`
  const accessHref = buildContactHref(language, "launch:request-access")

  // ── Authenticated state (Phase 8) ──────────────────────────────────────
  if (isAuthenticated && user) {
    return (
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          {user.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatarUrl} alt="avatar" className="h-6 w-6 rounded-full object-cover" />
          ) : (
            <User className="h-4 w-4" />
          )}
          <span className="hidden sm:block max-w-30 truncate">{user.name ?? user.email}</span>
          <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
        </button>

        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <div className="absolute right-0 top-full mt-2 z-50 w-48 rounded-xl border border-border bg-popover shadow-lg p-1">
              <Link
                href="/studio/settings"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-popover-foreground hover:bg-accent transition-colors"
              >
                <Settings className="h-4 w-4" /> {copy.settings}
              </Link>
              <div className="my-1 h-px bg-border" />
              <button
                onClick={() => { setOpen(false); /* TODO: supabase signOut */ }}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="h-4 w-4" /> {copy.signOut}
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  // ── Unauthenticated state — current live state ─────────────────────────
  return (
    <div className="flex items-center gap-2">
      <Link
        href={contactHref}
        className="hidden sm:inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[13px] font-medium text-foreground/70 hover:text-foreground hover:bg-accent transition-colors"
      >
        {copy.contact}
      </Link>
      <Link
        href={accessHref}
        className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-[13px] font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {copy.requestAccess}
      </Link>
    </div>
  )
}

export default UserProfileMenu
