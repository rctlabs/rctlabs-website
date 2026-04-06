import { NextResponse } from "next/server"
import { API_URL } from "@/lib/constants"

export const revalidate = 86400 // ISR: cache for 24 hours

const STATIC_BENCHMARK = {
  radarData: [
    { subject: "Accuracy", rct: 99.7, single: 85, fullMark: 100 },
    { subject: "Safety", rct: 99, single: 70, fullMark: 100 },
    { subject: "Speed", rct: 92, single: 75, fullMark: 100 },
    { subject: "Cost Eff.", rct: 88, single: 40, fullMark: 100 },
    { subject: "Auditability", rct: 100, single: 10, fullMark: 100 },
    { subject: "Memory", rct: 95, single: 20, fullMark: 100 },
  ],
  barData: [
    { name: "Accuracy", rct: 99.7, single: 85 },
    { name: "Safety", rct: 99, single: 70 },
    { name: "Speed Score", rct: 92, single: 75 },
    { name: "Cost Score", rct: 88, single: 40 },
    { name: "Audit Score", rct: 100, single: 10 },
    { name: "Memory", rct: 95, single: 20 },
  ],
  counterStats: [
    { value: 99.7, suffix: "%", labelEn: "Accuracy", labelTh: "ความแม่นยำ" },
    { value: 0.3, suffix: "%", labelEn: "Hallucination Rate", labelTh: "อัตรา Hallucination" },
    { value: 60, suffix: "%", labelEn: "Cost Savings", labelTh: "ประหยัดต้นทุน" },
    { value: 200, suffix: "ms", labelEn: "Response Latency", labelTh: "Latency", prefix: "<" },
  ],
  updatedAt: null as string | null,
  source: "static",
}

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/rctlabs/benchmark/summary`, {
      signal: AbortSignal.timeout(3000),
      headers: { Accept: "application/json" },
    })
    if (!res.ok) throw new Error(`upstream ${res.status}`)
    const live = await res.json()
    return NextResponse.json(
      { ...STATIC_BENCHMARK, ...live, source: "live", updatedAt: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    )
  } catch {
    return NextResponse.json(
      { ...STATIC_BENCHMARK, updatedAt: new Date().toISOString() },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    )
  }
}
