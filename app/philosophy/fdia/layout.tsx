import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "FDIA Formula",
    "สูตร FDIA",
    "The FDIA formula explains how data amplified by intent and shaped by action produces meaningful future outcomes.",
    "สูตร FDIA อธิบายว่าข้อมูลที่ถูกขยายด้วยเจตนาและกำกับด้วยการกระทำสร้างผลลัพธ์อนาคตที่มีความหมายได้อย่างไร",
    "/philosophy/fdia",
    ["FDIA formula", "F D I A", "intent formula", "data intent action"]
  )
}

export default function FDIALayout({ children }: { children: React.ReactNode }) {
  return children
}