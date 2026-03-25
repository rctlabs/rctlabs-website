import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import WhitepaperClient from "./WhitepaperClient"

export async function generateMetadata(): Promise<Metadata> {
  return createBilingualMetadata(
    "en",
    "Whitepapers & Technical Documentation",
    "เอกสารทางเทคนิคและ Whitepaper",
    "Technical whitepapers from RCT Labs: RCT Operating System architecture, Constitutional AI design principles, FDIA benchmark methodology, and enterprise integration guides.",
    "เอกสารทางเทคนิคจาก RCT Labs: สถาปัตยกรรม RCT Operating System, หลักการออกแบบ Constitutional AI, ระเบียบวิธี FDIA Benchmark และคู่มือการ Integration ระดับองค์กร",
    "/whitepaper",
    ["AI whitepaper", "technical documentation", "RCT OS whitepaper", "constitutional AI paper", "FDIA methodology"]
  )
}

export default function WhitepaperPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Whitepapers & Technical Documentation", url: "https://rctlabs.co/en/whitepaper" },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "What can I find in the RCT whitepapers?",
      answer:
        "RCT whitepapers cover the 10-layer architecture, JITNA protocol, SignedAI verification, RCTDB memory design, and related enterprise AI concepts.",
    },
    {
      question: "Are the whitepapers useful for enterprise evaluation?",
      answer:
        "Yes. The whitepapers are intended to support technical, architectural, and pre-procurement evaluation for enterprise AI adoption.",
    },
  ])

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RCT Whitepapers",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "RCT Ecosystem: Intent-Centric AI Operating System",
        url: "https://rctlabs.co/en/architecture",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "JITNA RFC-001: Just-In-Time Neural Allocation Protocol",
        url: "https://rctlabs.co/en/protocols/jitna-rfc-001",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "SignedAI: Cryptographic Verification for AI Outputs",
        url: "https://rctlabs.co/en/solutions/ai-hallucination-prevention",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "RCT-7 Genome: Cognitive Architecture for AI Personality",
        url: "https://rctlabs.co/en/protocols/rct-7-mental-model",
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <WhitepaperClient />
    </>
  )
}
