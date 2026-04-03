import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import ArtentAIPage from "./ArtentAIClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Artent AI — Architecture-Driven Creative AI for Enterprise",
    "Artent AI — Creative AI ขับเคลื่อนด้วยสถาปัตยกรรมสำหรับองค์กร",
    "Architecture-driven creative AI combining intent understanding with artistic generation. Multi-modal outputs, brand consistency engine, and creative strategy alignment powered by FDIA equation.",
    "Creative AI ขับเคลื่อนด้วยสถาปัตยกรรม ผสมผสาน Intent Understanding กับ Artistic Generation รองรับ Multi-Modal, Brand Consistency Engine และ Creative Strategy Alignment",
    "/products/artent-ai",
    ["Artent AI", "creative AI platform", "intent-driven generation", "brand consistency AI", "multi-modal AI"]
  )
}

export default async function Page() {
  return <ArtentAIPage />
}
