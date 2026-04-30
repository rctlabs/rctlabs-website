"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { getSupabaseBrowserClient } from "@/lib/auth/browser-client"

/**
 * Client-side auth guard hook.
 * Redirects unauthenticated users to /auth/signin?next=<currentPath>.
 * Returns { isLoading } — true while the auth check is in-flight.
 * Call this at the top of any page that requires login.
 */
export function useRequireAuth(): { isLoading: boolean } {
  const [isLoading, setIsLoading] = useState(true)
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
          // Keep isLoading=true while redirect is in-flight so callers can show a spinner
          return
        }
        setIsLoading(false)
      } catch {
        router.push("/auth/signin")
      }
    }
    void checkAuth()
  }, [router, pathname])

  return { isLoading }
}
