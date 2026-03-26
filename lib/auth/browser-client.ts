import { createClient } from "@supabase/supabase-js"
import { getSupabaseConfig } from "./config"

let browserClient: ReturnType<typeof createClient> | null = null

export function getSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowserClient must only be called in the browser")
  }

  if (browserClient) {
    return browserClient
  }

  const { url, key } = getSupabaseConfig("browser")
  browserClient = createClient(url, key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  })

  return browserClient
}
