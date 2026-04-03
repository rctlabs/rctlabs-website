import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import { SITE_URL } from "@/lib/site-config"
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
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `/products` },
    { name: "Artent AI", url: `/products/artent-ai` },
  ])
  const productSchema = { "@context": "https://schema.org", "@type": "SoftwareApplication", "name": "Artent AI", "applicationCategory": "BusinessApplication", "operatingSystem": "Any", "description": "Architecture-driven creative AI combining intent understanding with artistic generation.", "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "featureList": "Multi-Modal Generation, Brand Consistency Engine, Intent-Driven Creativity, FDIA", "url": `/products/artent-ai`, "publisher": { "@type": "Organization", "name": "RCT Labs", "url": SITE_URL } }
  return (
    <>
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type={"application/ld+json"} suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <ArtentAIPage />
    </>
  )
}
