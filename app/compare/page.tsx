import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import CompareClient from "./CompareClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "AI Methodology Comparisons",
    "เปรียบเทียบแนวทางสถาปัตยกรรม AI",
    "Side-by-side comparisons of Constitutional AI, RAG, verification-first methods, and more. Evidence-based analysis from RCT Labs engineers.",
    "เปรียบเทียบ Constitutional AI, RAG, verification-first และแนวทางสถาปัตยกรรม AI อื่น ๆ แบบเทียบกันชัดเจน พร้อมการวิเคราะห์เชิงหลักฐานจากทีม RCT Labs",
    "/compare",
    [
      "constitutional AI vs RAG",
      "RCT vs LLM APIs",
      "verification vs prompt engineering",
      "RCTdb vs vector database",
      "AI methodology comparison",
    ]
  )
}

export default function ComparePage() {
  return <CompareClient />
}
