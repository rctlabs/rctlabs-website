import { NextRequest, NextResponse } from "next/server"
import { getServerApiBaseUrl } from "@/lib/api-config"
import { resolveAssistantAuth } from "@/lib/auth/assistant-guard"

const API_BASE_URL = getServerApiBaseUrl()

export const dynamic = "force-dynamic"

interface FeedbackBody {
  message_id: string
  type: "up" | "down"
  session_id?: string
  message_content?: string
}

export async function POST(request: NextRequest) {
  const { token } = await resolveAssistantAuth(request)

  let body: FeedbackBody
  try {
    body = await request.json() as FeedbackBody
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  // Validate required fields
  if (!body.message_id || !["up", "down"].includes(body.type)) {
    return NextResponse.json({ error: "message_id and type (up|down) required" }, { status: 400 })
  }

  // Fire-and-forget to backend analytics endpoint.
  // Failure is silently swallowed — feedback errors must not block the user.
  void fetch(`${API_BASE_URL}/rctlabs/assistant/feedback`, {
    method: "POST",
    signal: AbortSignal.timeout(5000),
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({
      message_id: body.message_id,
      type: body.type,
      session_id: body.session_id ?? null,
      message_content: body.message_content ?? null,
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {
    // Intentionally silent — feedback is non-critical telemetry
  })

  // Always succeed from the client's perspective
  return NextResponse.json({ status: "ok" })
}
