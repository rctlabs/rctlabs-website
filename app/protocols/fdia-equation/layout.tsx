import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "FDIA Equation",
    "สมการ FDIA",
    "The FDIA equation defines how future outcomes emerge from data, intent, and architect oversight.",
    "สมการ FDIA อธิบายว่าผลลัพธ์ในอนาคตเกิดจากข้อมูล เจตนา และการกำกับดูแลของสถาปนิกอย่างไร",
    "/protocols/fdia-equation",
    ["FDIA equation", "protocol FDIA", "intent equation"]
  )
}

export default function FDIAEquationLayout({ children }: { children: React.ReactNode }) {
  return children
}