import { NextRequest, NextResponse } from "next/server"
import { createSupabaseRequestClient } from "@/lib/auth/request-client"

function getSafeNextPath(raw: string | null): string {
  if (!raw || !raw.startsWith("/")) return "/"
  return raw
}

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const nextPath = getSafeNextPath(requestUrl.searchParams.get("next"))

  const redirectUrl = new URL(nextPath, request.url)
  const response = NextResponse.redirect(redirectUrl)

  if (!code) {
    return response
  }

  try {
    const supabase = createSupabaseRequestClient(request, response)
    await supabase.auth.exchangeCodeForSession(code)
    return response
  } catch {
    const errorUrl = new URL("/auth/signin", request.url)
    errorUrl.searchParams.set("next", nextPath)
    errorUrl.searchParams.set("error", "callback_failed")
    return NextResponse.redirect(errorUrl)
  }
}
