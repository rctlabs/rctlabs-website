import { NextResponse } from "next/server"
import { API_URL } from "@/lib/constants"
import {
  SITE_TEST_COUNT,
  SITE_MICROSERVICE_COUNT,
  SITE_ALGORITHM_COUNT,
  SITE_LAYER_COUNT,
  SITE_HEXACORE_COUNT,
  SITE_CONSENSUS_MODELS,
  SITE_UPTIME,
  SITE_HALLUCINATION_RATE,
} from "@/lib/site-config"

export const revalidate = 3600 // ISR: cache for 1 hour

const FALLBACK = {
  testCount: SITE_TEST_COUNT,
  microserviceCount: SITE_MICROSERVICE_COUNT,
  algorithmCount: SITE_ALGORITHM_COUNT,
  layerCount: SITE_LAYER_COUNT,
  hexaCoreCount: SITE_HEXACORE_COUNT,
  consensusModels: SITE_CONSENSUS_MODELS,
  uptime: SITE_UPTIME,
  hallucinationRate: SITE_HALLUCINATION_RATE,
  source: "static",
}

export async function GET() {
  try {
    const res = await fetch(`${API_URL}/rctlabs/system/stats`, {
      signal: AbortSignal.timeout(3000),
      headers: { Accept: "application/json" },
    })
    if (!res.ok) throw new Error(`upstream ${res.status}`)
    const data = await res.json()
    return NextResponse.json(
      { ...FALLBACK, ...data, source: "live" },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    )
  } catch {
    return NextResponse.json(
      { ...FALLBACK },
      {
        headers: {
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        },
      }
    )
  }
}
