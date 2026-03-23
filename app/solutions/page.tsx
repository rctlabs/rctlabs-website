import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import SolutionsClient from "./SolutionsClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "AI Solutions",
    "โซลูชัน AI",
    "Enterprise AI solutions by RCT Labs: AI Hallucination Prevention (99.7% accuracy), Enterprise AI Memory, and Dynamic AI Routing. Production-ready constitutional AI for regulated industries.",
    "โซลูชัน AI สำหรับองค์กรจาก RCT Labs: การป้องกัน AI Hallucination (ความแม่นยำ 99.7%), AI Memory ระดับองค์กร และ Dynamic AI Routing",
    "/solutions",
    ["AI hallucination prevention", "enterprise AI memory", "dynamic AI routing", "constitutional AI", "regulated industries AI"]
  )
}

export default function SolutionsPage() {
  return <SolutionsClient />
}
