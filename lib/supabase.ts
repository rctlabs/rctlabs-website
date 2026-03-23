/*
 * Supabase server-side client — for API routes only (not client components)
 * Uses SUPABASE_SERVICE_KEY (secret) — never expose to browser
 *
 * Required environment variables in Vercel:
 *   SUPABASE_URL         = https://<project>.supabase.co
 *   SUPABASE_SERVICE_KEY = service_role_key (secret)
 */
import { createClient } from "@supabase/supabase-js"

type Database = {
  public: {
    Tables: {
      waitlist: {
        Row: { id: string; email: string; locale: string; source: string; subscribed_at: string }
        Insert: { email: string; locale?: string; source?: string; subscribed_at?: string }
        Update: { email?: string; locale?: string; source?: string; subscribed_at?: string }
      }
      contacts: {
        Row: { id: string; name: string; email: string; subject: string; message: string; locale: string; context: string; submitted_at: string }
        Insert: { name: string; email: string; subject?: string; message?: string; locale?: string; context?: string; submitted_at?: string }
        Update: { name?: string; email?: string; subject?: string; message?: string; locale?: string; context?: string; submitted_at?: string }
      }
    }
  }
}

let _client: ReturnType<typeof createClient<Database>> | null = null

export function getSupabaseAdmin() {
  if (_client) return _client
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_KEY
  if (!url || !key) {
    throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables")
  }
  _client = createClient<Database>(url, key, {
    auth: { persistSession: false },
  })
  return _client
}
