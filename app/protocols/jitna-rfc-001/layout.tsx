import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "JITNA RFC-001",
    "JITNA RFC-001",
    "JITNA RFC-001 documents the protocol primitives for intent packets, negotiation, reflection, and memory.",
    "JITNA RFC-001 อธิบาย primitive ของโปรโตคอลสำหรับ intent packets การเจรจา การสะท้อนผล และหน่วยความจำ",
    "/protocols/jitna-rfc-001",
    ["JITNA RFC", "JITNA RFC-001", "intent packet protocol"]
  )
}

export default function JITNARfcLayout({ children }: { children: React.ReactNode }) {
  return children
}