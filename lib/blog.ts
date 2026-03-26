import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { getAuthorProfileById, getAuthorProfileByName } from "@/lib/authors"

const postsDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPostMetadata {
  title: string
  author: string
  authorId?: string
  reviewerId?: string
  date: string
  lastReviewed?: string
  category: "release" | "research" | "philosophy" | "news"
  excerpt: string
  tags: string[]
  readTime: number
  references?: string[]
}

export interface BlogPost extends BlogPostMetadata {
  slug: string
  content: string
}

export function getAllBlogPosts(): BlogPost[] {
  const fileNames = fs.readdirSync(postsDirectory)
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, "")
      const fullPath = path.join(postsDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, "utf8")
      const { data, content } = matter(fileContents)

      return {
        slug,
        content,
        ...(data as BlogPostMetadata),
      }
    })

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      content,
      ...(data as BlogPostMetadata),
    }
  } catch (error) {
    return null
  }
}

export function getBlogPostsByCategory(category: BlogPostMetadata["category"]): BlogPost[] {
  return getAllBlogPosts().filter((post) => post.category === category)
}

export function getResolvedAuthorProfile(post: BlogPost) {
  return getAuthorProfileById(post.authorId) ?? getAuthorProfileByName(post.author)
}

export function getResolvedReviewerProfile(post: BlogPost) {
  return getAuthorProfileById(post.reviewerId) ?? getAuthorProfileById("rct-research-desk")
}

export function getPostReviewDate(post: BlogPost) {
  return post.lastReviewed || post.date
}

export function getPostJourney(post: BlogPost) {
  if (post.slug.includes("memory")) {
    return {
      solutionHref: "/solutions/enterprise-ai-memory",
      solutionLabel: "Explore Enterprise AI Memory",
      authorityHref: "/core-systems",
      authorityLabel: "Review Core Systems",
      conversionContext: "pricing:rctlabs:sales",
      conversionLabel: "Request enterprise evaluation",
    }
  }

  if (post.slug.includes("hallucination") || post.slug.includes("governance") || post.slug.includes("constitutional")) {
    return {
      solutionHref: "/solutions/ai-hallucination-prevention",
      solutionLabel: "Explore AI Hallucination Prevention",
      authorityHref: "/research",
      authorityLabel: "Review Research and Releases",
      conversionContext: "whitepaper:evaluation-pack:request",
      conversionLabel: "Request the evaluation pack",
    }
  }

  if (post.slug.includes("evaluate") || post.slug.includes("routing")) {
    return {
      solutionHref: "/solutions/dynamic-ai-routing",
      solutionLabel: "Explore Dynamic AI Routing",
      authorityHref: "/architecture",
      authorityLabel: "Review Architecture",
      conversionContext: "pricing:rctlabs:sales",
      conversionLabel: "Talk to the platform team",
    }
  }

  return {
    solutionHref: "/solutions",
    solutionLabel: "Explore Solutions",
    authorityHref: "/roadmap",
    authorityLabel: "Review Roadmap",
    conversionContext: "launch:request-access",
    conversionLabel: "Request guided evaluation",
  }
}
