import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Approach",
    "แนวทาง",
    "How RCT Labs approaches intent-driven AI design, system discipline, and deployment quality.",
    "แนวทางของ RCT Labs ต่อการออกแบบ AI ที่ขับเคลื่อนด้วยเจตนา วินัยของระบบ และคุณภาพการ deploy",
    "/philosophy/approach",
    ["RCT approach", "AI system design approach", "intent-driven AI methodology"]
  )
}

export default function ApproachLayout({ children }: { children: React.ReactNode }) {
  return children
}