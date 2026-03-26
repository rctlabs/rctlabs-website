import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "RCT-7 Process",
    "กระบวนการ RCT-7",
    "The RCT-7 process for implementing intent-driven systems with structured human oversight.",
    "กระบวนการ RCT-7 สำหรับการสร้างระบบที่ขับเคลื่อนด้วยเจตนาและมีการกำกับดูแลโดยมนุษย์อย่างเป็นระบบ",
    "/philosophy/rct-7",
    ["RCT-7 process", "intent process", "AI governance process"]
  )
}

export default function RCT7Layout({ children }: { children: React.ReactNode }) {
  return children
}