import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import ProtocolsClient from "./ProtocolsClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Open Protocols",
    "โปรโตคอลเปิด",
    "Open AI protocols by RCT Labs: JITNA RFC-001 multi-LLM communication standard, FDIA Equation (F = D^I × A) mathematical foundation, and RCT-7 Mental Model cognitive architecture.",
    "โปรโตคอล AI เปิดจาก RCT Labs: JITNA RFC-001 มาตรฐานการสื่อสาร Multi-LLM, สมการ FDIA (F = D^I × A) และ RCT-7 Mental Model สถาปัตยกรรมทางปัญญา",
    "/protocols",
    ["JITNA RFC-001", "FDIA equation", "RCT-7 mental model", "open AI protocols", "multi-LLM communication"]
  )
}

export default function ProtocolsPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Protocols", url: "https://rctlabs.co/en/protocols" },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "Which protocols are published by RCT Labs?",
      answer:
        "RCT Labs currently publishes JITNA RFC-001 for multi-LLM communication, the FDIA Equation for intent-centric decision computation, and the RCT-7 Mental Model for cognitive architecture design.",
    },
    {
      question: "Why are the RCT protocols published openly?",
      answer:
        "The protocols are published as open standards to support transparency, peer review, interoperability, and incremental enterprise adoption without vendor lock-in.",
    },
  ])

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RCT Open Protocols",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "JITNA RFC-001", url: "https://rctlabs.co/en/protocols/jitna-rfc-001" },
      { "@type": "ListItem", position: 2, name: "FDIA Equation", url: "https://rctlabs.co/en/protocols/fdia-equation" },
      { "@type": "ListItem", position: 3, name: "RCT-7 Mental Model", url: "https://rctlabs.co/en/protocols/rct-7-mental-model" },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <ProtocolsClient />
    </>
  )
}
