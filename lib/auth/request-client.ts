import { createServerClient } from "@supabase/ssr"
import type { NextRequest, NextResponse } from "next/server"
import { getSupabaseConfig } from "./config"

type CookieMutation = {
  name: string
  value: string
  options?: Record<string, unknown>
}

export function createSupabaseRequestClient(request: NextRequest, response: NextResponse) {
  const { url, key } = getSupabaseConfig("server")

  return createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll()
      },
      setAll(cookiesToSet: CookieMutation[]) {
        cookiesToSet.forEach(({ name, value, options }) => {
          request.cookies.set(name, value)
          response.cookies.set(name, value, options)
        })
      },
    },
  })
}