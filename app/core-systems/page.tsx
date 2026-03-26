import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import CoreSystemsClient from "./CoreSystemsClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Core Systems — HexaCore, Intent Loop, Analysearch, Delta Memory",
    "Core Systems — HexaCore, Intent Loop, Analysearch, Delta Memory",
    "A public-safe overview of the four core systems behind RCT: model routing, intent continuity, multi-depth analysis, and enterprise memory.",
    "ภาพรวมแบบ public-safe ของ 4 ระบบหลักเบื้องหลัง RCT: model routing, intent continuity, multi-depth analysis และ enterprise memory",
    "/core-systems",
    ["HexaCore", "Intent Loop", "Analysearch", "Delta Memory", "enterprise AI systems"]
  )
}

export default function Page() {
  return <CoreSystemsClient />
}
