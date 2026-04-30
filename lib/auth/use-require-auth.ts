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
          data: { user },
          error,
        } = await supabase.auth.getUser()
        if (error || !user) {
          router.push(`/auth/signin?next=${encodeURIComponent(pathname)}`)
        }
      } catch {
        router.push("/auth/signin")
      }
    }
    void checkAuth()
  }, [router, pathname])
}
