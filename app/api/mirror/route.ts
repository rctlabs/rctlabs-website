import { NextRequest, NextResponse } from "next/server"
import { getServerApiBaseUrl } from "@/lib/api-config"
import { resolveAssistantAuth } from "@/lib/auth/assistant-guard"

const API_BASE_URL = getServerApiBaseUrl()

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  const { token, applyCookies, deniedResponse } = await resolveAssistantAuth(request)
  if (deniedResponse) {
    return deniedResponse
  }

  const { searchParams } = new URL(request.url)
  const maxIterations = searchParams.get("max_iterations") ?? "3"

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return applyCookies(NextResponse.json({ error: "Invalid JSON body" }, { status: 400 }))
  }

  try {
    const upstream = await fetch(
      `${API_BASE_URL}/rctlabs/assistant/mirror?max_iterations=${maxIterations}`,
      {
        method: "POST",
        signal: AbortSignal.timeout(20000),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(body),
      },
    )

    if (!upstream.ok) {
      throw new Error(`upstream ${upstream.status}`)
    }

    const data = await upstream.json()
    return applyCookies(NextResponse.json(data))
  } catch {
    return applyCookies(NextResponse.json(
      {
        status: "fallback",
        analysis: {
          reply:
            "ขณะนี้ระบบ Mirror Mode กำลังอยู่ในช่วงพัฒนา — ทีมงานกำลังเตรียม Backend สำหรับ production\n\nสำหรับข้อมูลเพิ่มเติม สามารถติดต่อได้ที่ contact@rctlabs.co หรือดูเอกสารได้ที่ /docs",
          intent: "general",
          confidence: 0,
          iterations: 0,
          keywords: [],
        },
        source: "fallback",
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
