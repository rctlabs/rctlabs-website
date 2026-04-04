import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return {
    ...createBilingualMetadata(
      locale,
      "Vision",
      "วิสัยทัศน์",
      "The long-term vision behind RCT Labs and the evolution of intent-driven AI infrastructure.",
      "วิสัยทัศน์ระยะยาวของ RCT Labs และทิศทางการพัฒนาโครงสร้างพื้นฐาน AI ที่ขับเคลื่อนด้วยเจตนา",
      "/philosophy/vision",
      ["RCT vision", "AI infrastructure vision", "intent-driven AI future"]
    ),
    robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
  }
}

export default function VisionLayout({ children }: { children: React.ReactNode }) {
  return children
}