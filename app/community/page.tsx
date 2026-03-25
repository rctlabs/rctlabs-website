import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import CommunityClient from "./CommunityClient"

export const metadata: Metadata = createBilingualMetadata(
  "en",
  "RCT Community — Developers, Researchers & Enterprise AI Builders",
  "ชุมชน RCT — นักพัฒนา นักวิจัย และผู้สร้าง AI ระดับองค์กร",
  "Join the RCT Labs community across GitHub, Discord, and discussion forums. Connect with researchers, developers, and enterprise AI teams working on constitutional AI, FDIA, JITNA, and verified intelligence.",
  "เข้าร่วมชุมชน RCT Labs ผ่าน GitHub, Discord และฟอรัม สนทนากับนักวิจัย นักพัฒนา และทีม AI ระดับองค์กรที่ทำงานด้าน Constitutional AI, FDIA, JITNA และ verified intelligence",
  "/community",
  ["RCT community", "AI developer community", "constitutional AI community", "JITNA developers", "FDIA research"]
)

export default function CommunityPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "https://rctlabs.co/en" },
    { name: "Community", url: "https://rctlabs.co/en/community" },
  ])

  const faqSchema = getFAQSchema([
    {
      question: "Who is the RCT community designed for?",
      answer:
        "The RCT community is designed for enterprise AI builders, researchers, developers, and technical teams exploring constitutional AI, verification, routing, and memory systems.",
    },
    {
      question: "What topics are discussed in the RCT community?",
      answer:
        "Community discussions cover FDIA, JITNA, SignedAI, RCTDB, enterprise deployment patterns, benchmarking, and practical AI governance workflows.",
    },
  ])

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <CommunityClient />
    </>
  )
}
