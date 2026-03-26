import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Impact",
    "ผลกระทบ",
    "How RCT Labs evaluates the operational and societal impact of intent-driven AI systems.",
    "แนวทางที่ RCT Labs ใช้ประเมินผลกระทบเชิงปฏิบัติการและสังคมของระบบ AI ที่ขับเคลื่อนด้วยเจตนา",
    "/philosophy/impact",
    ["AI impact", "intent-driven AI impact", "responsible AI impact"]
  )
}

export default function ImpactLayout({ children }: { children: React.ReactNode }) {
  return children
}