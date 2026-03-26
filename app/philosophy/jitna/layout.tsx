import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "JITNA Language",
    "ภาษา JITNA",
    "The JITNA model for precise intent specification, assembly, and auditable workflow execution.",
    "โมเดล JITNA สำหรับการระบุเจตนาอย่างแม่นยำ การประกอบระบบ และการรัน workflow ที่ตรวจสอบย้อนหลังได้",
    "/philosophy/jitna",
    ["JITNA language", "intent specification language", "JITNA model"]
  )
}

export default function JITNALayout({ children }: { children: React.ReactNode }) {
  return children
}