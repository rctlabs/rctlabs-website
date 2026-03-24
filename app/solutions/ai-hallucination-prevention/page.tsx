import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import HallucinationPreventionPage from "./HallucinationPreventionClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "AI Hallucination Prevention — 99.7% Accuracy with Multi-LLM Consensus",
    "ป้องกัน AI Hallucination — ความแม่นยำ 99.7% ด้วย Multi-LLM Consensus",
    "Reduce AI hallucination from 15% to 0.3% with SignedAI multi-LLM consensus verification. Cryptographic signing, complete audit trails, and enterprise-grade accuracy for regulated industries.",
    "ลด AI Hallucination จาก 15% เหลือ 0.3% ด้วย SignedAI Multi-LLM Consensus Cryptographic Signing และ Audit Trails สำหรับอุตสาหกรรมที่มีการกำกับดูแล",
    "/solutions/ai-hallucination-prevention",
    ["reduce AI hallucination", "multi-LLM consensus", "SignedAI verification", "AI accuracy", "cryptographic AI signing"]
  )
}

export default function Page() {
  return <HallucinationPreventionPage />
}
