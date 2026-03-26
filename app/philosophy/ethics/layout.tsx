import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Ethics",
    "จริยธรรม",
    "RCT Labs ethics framework for constitutional AI, governance, and responsible deployment.",
    "กรอบจริยธรรมของ RCT Labs สำหรับ constitutional AI การกำกับดูแล และการ deploy อย่างรับผิดชอบ",
    "/philosophy/ethics",
    ["AI ethics", "constitutional AI ethics", "RCT governance ethics"]
  )
}

export default function EthicsLayout({ children }: { children: React.ReactNode }) {
  return children
}