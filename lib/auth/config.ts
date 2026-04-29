export type SupabaseRuntime = "browser" | "server" | "admin"

export type SupabaseConfig = {
  url: string
  key: string
}

function getSupabaseUrl(): string {
  return process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || ""
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function getSupabaseConfig(runtime: SupabaseRuntime): SupabaseConfig {
  const url = getSupabaseUrl()
  if (!url) {
    throw new Error("Missing required environment variable: SUPABASE_URL or NEXT_PUBLIC_SUPABASE_URL")
  }

  if (runtime === "admin") {
    return {
      url,
      key: getRequiredEnv("SUPABASE_SERVICE_KEY"),
    }
  }

  // IMPORTANT: NEXT_PUBLIC_* variables must be accessed via static property syntax
  // (process.env.NEXT_PUBLIC_FOO) NOT dynamic bracket notation (process.env["NEXT_PUBLIC_FOO"])
  // because Next.js/webpack only inlines static accesses during build.
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!anonKey) {
    throw new Error("Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY")
  }

  return { url, key: anonKey }
}

export function hasPublicSupabaseEnv() {
  return Boolean(getSupabaseUrl() && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
