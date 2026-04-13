import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { getSupabaseConfig } from "./config"

type CookieMutation = {
  name: string
  value: string
  options?: Record<string, unknown>
}

export async function createSupabaseServerClient() {
  const { url, key } = getSupabaseConfig("server")
  const cookieStore = await cookies()

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet: CookieMutation[]) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options)
          })
        } catch {
          // Ignore set failures in contexts where cookies are read-only.
        }
      },
    },
  })
}
