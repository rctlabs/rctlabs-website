import { NextRequest, NextResponse } from "next/server"
import { createSupabaseRequestClient } from "@/lib/auth/request-client"

function getSafeNextPath(raw: string | null): string {
  if (!raw || !raw.startsWith("/")) return "/auth/signin"
  return raw
}

async function signOutAndRedirect(request: NextRequest) {
  const nextPath = getSafeNextPath(new URL(request.url).searchParams.get("next"))
  const redirectUrl = new URL(nextPath, request.url)
  const response = NextResponse.redirect(redirectUrl)

  try {
    const supabase = createSupabaseRequestClient(request, response)
    await supabase.auth.signOut()
  } catch {
    // Continue redirect even if sign-out fails.
  }

  return response
}

export async function GET(request: NextRequest) {
  return signOutAndRedirect(request)
}

export async function POST(request: NextRequest) {
  return signOutAndRedirect(request)
}
