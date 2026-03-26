import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "RCT-7 Mental Model",
    "โมเดลความคิด RCT-7",
    "The RCT-7 mental model explains the human-centered cognitive stages behind reliable AI systems.",
    "โมเดลความคิด RCT-7 อธิบายลำดับทางความคิดที่ยึดมนุษย์เป็นศูนย์กลางซึ่งอยู่เบื้องหลังระบบ AI ที่เชื่อถือได้",
    "/protocols/rct-7-mental-model",
    ["RCT-7 mental model", "human-centered AI model", "AI cognition model"]
  )
}

export default function RCT7MentalModelLayout({ children }: { children: React.ReactNode }) {
  return children
}