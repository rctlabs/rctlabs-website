import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema } from "@/lib/schema"
import GenomeClient from "./GenomeClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "7 Genome System",
    "ระบบ Genome 7 ชั้น",
    "The RCT 7 Genome System: WHY, WHAT, HOW, WHO, WHEN, WHERE, and IMPROVEMENT — a cognitive architecture that gives AI systems purpose, identity, and the ability to self-evolve.",
    "ระบบ Genome 7 ชั้นของ RCT: WHY, WHAT, HOW, WHO, WHEN, WHERE และ IMPROVEMENT — สถาปัตยกรรมทางปัญญาที่ให้ AI มีเป้าหมาย ตัวตน และความสามารถในการพัฒนาตนเอง",
    "/genome",
    ["7 genome AI", "AI cognitive architecture", "WHY genome", "HOW genome", "self-evolving AI", "AI personality"]
  )
}

export default async function GenomePage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : ""

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: locale === "th" ? "หน้าหลัก" : "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: locale === "th" ? "7 Genome System" : "7 Genome System", url: `https://rctlabs.co${localePrefix}/genome` },
  ])

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: locale === "th" ? "RCT 7 Genome System" : "RCT 7 Genome System",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "G1 — Architect's Genome (WHY)", url: `https://rctlabs.co${localePrefix}/genome` },
      { "@type": "ListItem", position: 2, name: "G2 — Constitutional Genome (WHAT)", url: `https://rctlabs.co${localePrefix}/genome` },
      { "@type": "ListItem", position: 3, name: "G3 — JITNA Routing Genome (HOW)", url: `https://rctlabs.co${localePrefix}/technology/jitna` },
      { "@type": "ListItem", position: 4, name: "G4 — Trust Genome (WHO)", url: `https://rctlabs.co${localePrefix}/genome` },
      { "@type": "ListItem", position: 5, name: "G5 — Temporal Genome (WHEN)", url: `https://rctlabs.co${localePrefix}/genome` },
      { "@type": "ListItem", position: 6, name: "G6 — Sovereign Genome (WHERE)", url: `https://rctlabs.co${localePrefix}/technology/constitutional-ai` },
      { "@type": "ListItem", position: 7, name: "G7 — RCT-7 Mental OS (IMPROVEMENT)", url: `https://rctlabs.co${localePrefix}/technology/rct-7` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <GenomeClient />
    </>
  )
}
