import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import HomePageClient from "./HomePageClient"

export const metadata: Metadata = createBilingualMetadata(
  "en",
  "RCT Labs — Constitutional AI Operating System | 41 Algorithms, 0.3% Hallucination",
  "RCT Labs — ระบบปฏิบัติการ AI แบบรัฐธรรมนูญ | 41 อัลกอริทึม, Hallucination 0.3%",
  "RCT Labs builds the Constitutional AI Operating System with 10-layer architecture, 41 production algorithms, Multi-LLM Consensus, and 0.3% hallucination rate. Enterprise-grade AI governance for Thailand and beyond.",
  "RCT Labs สร้างระบบปฏิบัติการ AI แบบรัฐธรรมนูญ สถาปัตยกรรม 10 ชั้น 41 อัลกอริทึม Multi-LLM Consensus อัตราหลอน 0.3% ระบบ AI ระดับองค์กรสำหรับประเทศไทยและทั่วโลก",
  "/",
  ["FDIA equation", "intent operating system", "AI hallucination solution", "enterprise AI Thailand"]
)

export default function HomePage() {
  return <HomePageClient />
}
