import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_URL || "http://localhost:8003"

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  try {
    const upstream = await fetch(`${API_BASE_URL}/rctlabs/assistant/analyze`, {
      method: "POST",
      signal: AbortSignal.timeout(15000),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!upstream.ok) {
      throw new Error(`upstream ${upstream.status}`)
    }

    const data = await upstream.json()
    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      {
        status: "fallback",
        analysis: {},
        source: "fallback",
      },
      { status: 200 },
    )
  }
}
