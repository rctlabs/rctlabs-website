import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return {
    ...createBilingualMetadata(
      locale,
      "Values",
      "ค่านิยม",
      "The public values behind RCT Labs, including trust, rigor, and responsible AI system design.",
      "ค่านิยมสาธารณะที่อยู่เบื้องหลัง RCT Labs รวมถึงความน่าเชื่อถือ ความเข้มงวด และการออกแบบระบบ AI อย่างรับผิดชอบ",
      "/philosophy/values",
      ["RCT values", "AI company values", "responsible AI values"]
    ),
    robots: { index: false, follow: false, googleBot: { index: false, follow: false, noimageindex: true } },
  }
}

export default function ValuesLayout({ children }: { children: React.ReactNode }) {
  return children
}