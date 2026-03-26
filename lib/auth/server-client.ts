import { createClient } from "@supabase/supabase-js"
import { getSupabaseConfig } from "./config"

export function createSupabaseServerClient() {
  const { url, key } = getSupabaseConfig("server")

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  })
}
