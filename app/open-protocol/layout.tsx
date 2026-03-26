import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "RCT Open Protocol",
    "โปรโตคอลเปิดของ RCT",
    "Open protocol standards for intent-driven systems, workflow negotiation, and auditable AI runtime design.",
    "มาตรฐานโปรโตคอลเปิดสำหรับระบบที่ขับเคลื่อนด้วยเจตนา การเจรจา workflow และการออกแบบ runtime ของ AI ที่ตรวจสอบย้อนหลังได้",
    "/open-protocol",
    ["open protocol", "RCT protocol", "intent-driven protocol"]
  )
}

export default function OpenProtocolLayout({ children }: { children: React.ReactNode }) {
  return children
}