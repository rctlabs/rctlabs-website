import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import { getAllBlogPosts } from "@/lib/blog"
import { BlogPageClient } from "./BlogPageClient"

export const metadata: Metadata = createPageMetadata(
  "Blog - RCT Labs",
  "Read the latest insights, research, and updates from RCT Labs about intent-driven AI and open protocols.",
  "/blog",
)

export default function BlogPage() {
  const posts = getAllBlogPosts()
  return <BlogPageClient posts={posts} />
}
