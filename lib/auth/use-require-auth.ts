"use client"

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/auth/browser-client"

/**
 * Client-side auth guard hook.
 * Redirects unauthenticated users to /auth/signin?next=<currentPath>.
 * Call this at the top of any page that requires login.
 */
export function useRequireAuth() {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()
        if (error || !session) {
          router.push(`/auth/signin?next=${encodeURIComponent(pathname)}`)
        }
      } catch {
        router.push("/auth/signin")
      }
    }
    void checkAuth()
  }, [router, pathname])
}
