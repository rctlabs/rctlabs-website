import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import ResearchClient from "./ResearchClient"

export const metadata: Metadata = createBilingualMetadata(
  "en",
  "Research & Releases — RCT Labs Architecture, Algorithms, and Protocol Papers",
  "งานวิจัยและรีลีส — เอกสารสถาปัตยกรรม อัลกอริทึม และโปรโตคอลของ RCT Labs",
  "Explore RCT Labs research, version history, architecture papers, algorithm releases, SignedAI verification, RCTDB memory design, and JITNA protocol specifications for enterprise constitutional AI.",
  "สำรวจงานวิจัยและประวัติรีลีสของ RCT Labs ครอบคลุมสถาปัตยกรรม อัลกอริทึม SignedAI การออกแบบ RCTDB และข้อกำหนดโปรโตคอล JITNA สำหรับ constitutional AI ระดับองค์กร",
  "/research",
  ["RCT research", "constitutional AI research", "JITNA RFC", "RCTDB paper", "SignedAI verification research"]
)

export default function ResearchPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Research", url: "https://rctlabs.co/en/research" },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "What kind of material is published in RCT research?",
      answer:
        "RCT research publishes architecture papers, algorithm releases, protocol specifications, verification methods, and system design notes for enterprise constitutional AI.",
    },
    {
      question: "Is the research page useful for technical evaluation?",
      answer:
        "Yes. The research page is intended for engineering, architecture, and evaluation teams reviewing RCT Labs methods, release history, and technical foundations.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ResearchClient />
    </>
  )
}
