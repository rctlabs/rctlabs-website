import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Intent Operating System",
    "ระบบปฏิบัติการแห่งเจตนา",
    "The intent operating system model behind RCT Labs and its approach to auditable enterprise AI.",
    "โมเดล intent operating system ที่อยู่เบื้องหลัง RCT Labs และแนวทางต่อ AI ระดับองค์กรที่ตรวจสอบย้อนหลังได้",
    "/philosophy/intent-os",
    ["intent operating system", "intent OS", "enterprise AI operating system"]
  )
}

export default function IntentOsLayout({ children }: { children: React.ReactNode }) {
  return children
}