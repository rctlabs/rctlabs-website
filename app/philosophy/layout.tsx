import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "RCT Philosophy",
    "ปรัชญา RCT",
    "Foundational concepts behind RCT Labs, including FDIA, JITNA, RCT-7, and the intent operating system model.",
    "แนวคิดรากฐานของ RCT Labs รวมถึง FDIA, JITNA, RCT-7 และโมเดล intent operating system",
    "/philosophy",
    ["RCT philosophy", "intent operating system philosophy", "FDIA philosophy", "JITNA philosophy"]
  )
}

export default function PhilosophyLayout({ children }: { children: React.ReactNode }) {
  return children
}