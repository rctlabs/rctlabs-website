import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import AlgorithmsClient from "./AlgorithmsClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "41 Proprietary Algorithms",
    "41 อัลกอริทึมเฉพาะ",
    "RCT Labs 41 proprietary algorithms across 9 tiers: from foundation processing to meta-cognitive orchestration. Each algorithm is battle-tested across 62,205+ test cases in production environments.",
    "อัลกอริทึมเฉพาะ 41 ตัวของ RCT Labs ใน 9 Tiers: จากการประมวลผลพื้นฐานถึง Meta-cognitive Orchestration ผ่านการทดสอบใน 62,205+ Test Cases",
    "/algorithms",
    ["41 algorithms", "AI algorithms", "9-tier algorithm", "production AI algorithms", "AI orchestration algorithms"]
  )
}

export default function AlgorithmsPage() {
  return <AlgorithmsClient />
}
