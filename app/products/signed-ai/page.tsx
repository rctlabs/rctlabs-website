import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import SignedAIPage from "./SignedAIClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "SignedAI — Multi-LLM Verification Consensus API | 99.7% Accuracy",
    "SignedAI — Multi-LLM Verification Consensus API | ความแม่นยำ 99.7%",
    "Multi-LLM verification consensus API with cryptographically signed responses from up to 8 LLMs. Reduce hallucination to 0.3% with complete audit trails for regulated industries.",
    "Multi-LLM Verification Consensus API พร้อม Cryptographic Signing จาก LLMs สูงสุด 8 ตัว ลด Hallucination เหลือ 0.3% พร้อม Audit Trails สำหรับอุตสาหกรรมที่มีการกำกับดูแล",
    "/products/signed-ai",
    ["SignedAI", "multi-LLM verification", "AI consensus API", "cryptographic AI", "audit trail AI"]
  )
}

export default async function Page() {
  return <SignedAIPage />
}
