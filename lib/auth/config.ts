export type SupabaseRuntime = "browser" | "server" | "admin"

export type SupabaseConfig = {
  url: string
  key: string
}

function getRequiredEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value
}

export function getSupabaseConfig(runtime: SupabaseRuntime): SupabaseConfig {
  const url = getRequiredEnv("SUPABASE_URL")

  if (runtime === "admin") {
    return {
      url,
      key: getRequiredEnv("SUPABASE_SERVICE_KEY"),
    }
  }

  return {
    url,
    key: getRequiredEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
  }
}

export function hasPublicSupabaseEnv() {
  return Boolean(process.env.SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}
