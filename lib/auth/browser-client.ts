import { createBrowserClient } from "@supabase/ssr"
import { getSupabaseConfig } from "./config"

// IMPORTANT: createBrowserClient (from @supabase/ssr) stores the PKCE code verifier
// in cookies — accessible by the server-side /auth/callback route handler.
// Do NOT use createClient (@supabase/supabase-js) here: it stores the verifier
// in localStorage which the server cannot read, causing exchangeCodeForSession to fail.
let browserClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    throw new Error("getSupabaseBrowserClient must only be called in the browser")
  }

  if (browserClient) {
    return browserClient
  }

  const { url, key } = getSupabaseConfig("browser")
  browserClient = createBrowserClient(url, key)

  return browserClient
}
