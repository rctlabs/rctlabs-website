import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "FDIA Demo",
    "เดโม FDIA",
    "Interactive FDIA calculator for exploring how data, intent, and architect oversight change AI outcomes.",
    "เครื่องคำนวณ FDIA แบบโต้ตอบสำหรับสำรวจว่าข้อมูล เจตนา และการกำกับดูแลโดยสถาปนิกเปลี่ยนผลลัพธ์ของ AI อย่างไร",
    "/demo/fdia",
    ["FDIA demo", "FDIA calculator", "AI readiness calculator"]
  )
}

export default function FDIADemoLayout({ children }: { children: React.ReactNode }) {
  return children
}