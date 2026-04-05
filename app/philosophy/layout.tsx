import type React from "react"
import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "RCT Philosophy",
    "ปรัชญา RCT",
    "Foundational concepts behind RCT Labs, including FDIA, JITNA, RCT-7, and the intent operating system model.",
    "แนวคิดรากฐานของ RCT Labs รวมถึง FDIA, JITNA, RCT-7 และโมเดล intent operating system",
    "/philosophy",
    ["RCT philosophy", "intent operating system philosophy", "FDIA philosophy", "JITNA philosophy"]
  )
}

export default async function PhilosophyLayout({ children }: { children: React.ReactNode }) {
  const breadcrumb = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Philosophy", url: "https://rctlabs.co/en/philosophy" },
  ])
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RCT Philosophy Concepts",
    description: "The six foundational principles behind RCT Labs: FDIA, JITNA, RCT-7, Intent OS, intent-driven architecture, and constitutional AI.",
    numberOfItems: 6,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "FDIA — Fault Detection & Intent Alignment", url: "https://rctlabs.co/en/philosophy/fdia" },
      { "@type": "ListItem", position: 2, name: "JITNA — Just-In-Time Neural Architecture", url: "https://rctlabs.co/en/philosophy/jitna" },
      { "@type": "ListItem", position: 3, name: "RCT-7 — Seven-Genome Reasoning System", url: "https://rctlabs.co/en/philosophy/rct-7" },
      { "@type": "ListItem", position: 4, name: "Intent OS — Intent Operating System", url: "https://rctlabs.co/en/philosophy/intent-os" },
      { "@type": "ListItem", position: 5, name: "RCT Approach — Constitutional AI Methodology", url: "https://rctlabs.co/en/philosophy/approach" },
      { "@type": "ListItem", position: 6, name: "RCT Ethics — Governance and Accountability", url: "https://rctlabs.co/en/philosophy/ethics" },
    ],
  }
  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      {children}
    </>
  )
}