import { NextRequest, NextResponse } from "next/server"
import { getServerApiBaseUrl } from "@/lib/api-config"
import { resolveAssistantAuth } from "@/lib/auth/assistant-guard"

// Server-side only — not exposed to browser bundle.
// Set API_BASE_URL in Vercel environment variables to point to the production backend.
// Falls back to localhost for local development.
const API_BASE_URL = getServerApiBaseUrl()

// No ISR — chat responses must be fresh and user-specific
export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const { token, applyCookies, deniedResponse } = await resolveAssistantAuth(request)
  if (deniedResponse) {
    return deniedResponse
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return applyCookies(NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }))
  }

  try {
    const upstream = await fetch(`${API_BASE_URL}/rctlabs/assistant/chat`, {
      method: "POST",
      signal: AbortSignal.timeout(12000),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body),
    })

    if (!upstream.ok) {
      throw new Error(`upstream ${upstream.status}`)
    }

    const data = await upstream.json()
    return applyCookies(NextResponse.json(data))
  } catch {
    // Graceful fallback — returns a structured response so the client
    // can display a helpful message instead of a raw network error.
    return applyCookies(NextResponse.json(
      {
        reply:
          "ขณะนี้ระบบ AI กำลังอยู่ในช่วงพัฒนาและปรับแต่ง — ทีมงานกำลังเตรียมพร้อม Backend สำหรับ production\n\nสำหรับข้อมูลเพิ่มเติม สามารถติดต่อได้ที่ contact@rctlabs.co หรือดูเอกสารได้ที่ /docs",
        source: "fallback",
        verified: false,
        suggestions: [
          "สำรวจ Architecture →",
          "อ่าน Documentation →",
          "ติดต่อทีมงาน →",
        ],
      },
      { status: 200 },
    ))
  }
}
