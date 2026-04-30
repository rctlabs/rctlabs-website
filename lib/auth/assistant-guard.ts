import { NextRequest, NextResponse } from "next/server"
import { createSupabaseRequestClient } from "./request-client"

type AssistantAuthState = {
  token: string | null
  applyCookies: (response: NextResponse) => NextResponse
  deniedResponse: NextResponse | null
}

export async function resolveAssistantAuth(request: NextRequest): Promise<AssistantAuthState> {
  const authResponse = NextResponse.next()

  const applyCookies = (response: NextResponse) => {
    authResponse.cookies.getAll().forEach((cookie) => {
      response.cookies.set(cookie)
    })
    return response
  }

  if (process.env.REQUIRE_AUTH_FOR_ASSISTANT !== "true") {
    return {
      token: null,
      applyCookies,
      deniedResponse: null,
    }
  }

  try {
    const supabase = createSupabaseRequestClient(request, authResponse)
    // Use getUser() — verifies JWT with Supabase Auth server (secure)
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return {
        token: null,
        applyCookies,
        deniedResponse: applyCookies(
          NextResponse.json({ error: "Unauthorized" }, { status: 401 })
        ),
      }
    }

    // getUser() confirmed token is valid — read access_token for backend forwarding
    const { data: { session } } = await supabase.auth.getSession()
    return {
      token: session?.access_token ?? null,
      applyCookies,
      deniedResponse: null,
    }
  } catch {
    return {
      token: null,
      applyCookies,
      deniedResponse: applyCookies(
        NextResponse.json({ error: "Unauthorized" }, { status: 401 })
      ),
    }
  }
}
