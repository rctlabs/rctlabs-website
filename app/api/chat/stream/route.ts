import { NextRequest } from "next/server"
import { getServerApiBaseUrl } from "@/lib/api-config"
import { resolveAssistantAuth } from "@/lib/auth/assistant-guard"

// Server-side only — SSE passthrough from L3 backend to browser.
// The upstream L3 endpoint is /rctlabs/assistant/chat/stream which emits:
//   data: {"token": "...", "done": false}
//   data: {"token": "", "done": true, "source": "...", "intent": "...", "suggestions": [...]}
const API_BASE_URL = getServerApiBaseUrl()

export const dynamic = "force-dynamic"

// Fallback SSE body when backend is unavailable
function fallbackSSE(message: string): string {
  const tokenEvent = JSON.stringify({ token: message, done: false })
  const doneEvent = JSON.stringify({
    token: "",
    done: true,
    source: "fallback",
    suggestions: [
      "สำรวจ Architecture →",
      "อ่าน Documentation →",
      "ติดต่อทีมงาน →",
    ],
  })
  return `data: ${tokenEvent}\n\ndata: ${doneEvent}\n\n`
}

export async function POST(request: NextRequest) {
  const { token, deniedResponse } = await resolveAssistantAuth(request)
  if (deniedResponse) {
    return deniedResponse
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return new Response(
      fallbackSSE("ขออภัย — ส่ง request ไม่ถูกต้อง"),
      {
        status: 200,
        headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache" },
      },
    )
  }

  try {
    const upstream = await fetch(
      `${API_BASE_URL}/rctlabs/assistant/chat/stream`,
      {
        method: "POST",
        signal: AbortSignal.timeout(30000),
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      },
    )

    if (!upstream.ok || !upstream.body) {
      return new Response(
        fallbackSSE(
          "ขณะนี้ระบบ AI กำลังอยู่ในช่วงพัฒนา — ทีมงานกำลังเตรียม Backend สำหรับ production\n\n" +
            "สำหรับข้อมูลเพิ่มเติม สามารถติดต่อได้ที่ contact@rctlabs.co หรือดูเอกสารได้ที่ /docs",
        ),
        {
          status: 200,
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
          },
        },
      )
    }

    // Pipe upstream SSE stream directly to the browser response
    return new Response(upstream.body, {
      status: 200,
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        // Prevent Nginx/proxy buffering that breaks streaming
        "X-Accel-Buffering": "no",
      },
    })
  } catch {
    return new Response(
      fallbackSSE(
        "ขณะนี้ระบบ AI กำลังอยู่ในช่วงพัฒนา — ทีมงานกำลังเตรียม Backend สำหรับ production\n\n" +
          "สำหรับข้อมูลเพิ่มเติม สามารถติดต่อได้ที่ contact@rctlabs.co หรือดูเอกสารได้ที่ /docs",
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          Connection: "keep-alive",
        },
      },
    )
  }
}
