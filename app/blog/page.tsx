import type { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getAllBlogPosts } from "@/lib/blog"
import { getRequestLocale } from "@/lib/request-locale"
import { BlogPageClient } from "./BlogPageClient"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Blog — RCT Labs AI Research, Insights & Technical Deep-Dives",
    "บล็อก — งานวิจัย AI, ข้อมูลเชิงลึก และบทความเทคนิคจาก RCT Labs",
    "Read the latest AI research, technical deep-dives, and industry insights from RCT Labs. Topics include AI hallucination prevention, constitutional AI governance, FDIA equation, and enterprise LLM deployment.",
    "อ่านงานวิจัย AI ล่าสุด บทวิเคราะห์เชิงลึก และข้อมูลเชิงลึกจาก RCT Labs ครอบคลุม AI Hallucination Prevention, Constitutional AI Governance, สมการ FDIA และ Enterprise LLM Deployment",
    "/blog",
    ["AI research blog", "AI hallucination articles", "constitutional AI insights", "enterprise AI guides"]
  )
}

export default async function BlogPage() {
  const locale = await getRequestLocale()
  const posts = getAllBlogPosts(locale)
  return <BlogPageClient posts={posts} />
}
