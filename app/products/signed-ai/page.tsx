import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
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
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `/products` },
    { name: "SignedAI", url: `/products/signed-ai` },
  ])
  const productSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "SignedAI", "applicationCategory": "BusinessApplication", "operatingSystem": "Any", "description": "Multi-LLM verification consensus API. Reduces hallucination to 0.3% with cryptographic signing and complete audit trails.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "featureList": "Multi-LLM Consensus, Cryptographic Signing, 0.3% Hallucination Rate, Complete Audit Trails, 99.7% Accuracy", "url": `/products/signed-ai`, "publisher": { "@type": "Organization", "name": "RCT Labs", "url": SITE_URL } }
  return (
    <>
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <SignedAIPage />
    </>
  )
}
