import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import ProductsClient from "./ProductsClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Products",
    "ผลิตภัณฑ์",
    "RCT Labs products: RCTLabs testing platform, ARTENT AI creative engine, and Signed AI verification system. Enterprise AI solutions built on constitutional AI principles.",
    "ผลิตภัณฑ์ RCT Labs: แพลตฟอร์มทดสอบ RCTLabs, ARTENT AI และระบบตรวจสอบ Signed AI สำหรับองค์กร",
    "/products",
    ["RCTLabs platform", "ARTENT AI", "Signed AI", "AI verification", "AI testing platform"]
  )
}

export default async function ProductsPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Products", url: `https://rctlabs.co${localePrefix}/products` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "What products does RCT Labs currently offer?",
      answer:
        "RCT Labs currently presents three core products: RCTLabs for AI testing and benchmarking, ARTENT AI for intent-aligned creative generation, and SignedAI for verification, traceability, and hallucination reduction.",
    },
    {
      question: "How are the products related to the RCT platform?",
      answer:
        "All products are built on the same RCT operating system foundation, including the 10-layer architecture, FDIA Equation, JITNA Protocol, and shared verification and memory infrastructure.",
    },
  ])

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RCT Labs Products",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "RCTLabs", url: `https://rctlabs.co${localePrefix}/products/rctlabs` },
      { "@type": "ListItem", position: 2, name: "ARTENT AI", url: `https://rctlabs.co${localePrefix}/products/artent-ai` },
      { "@type": "ListItem", position: 3, name: "SignedAI", url: `https://rctlabs.co${localePrefix}/products/signed-ai` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <ProductsClient />
    </>
  )
}
