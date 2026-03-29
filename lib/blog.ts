import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { getAuthorProfileById, getAuthorProfileByName } from "@/lib/authors"

const postsDirectory = path.join(process.cwd(), "content/blog")

export type BlogLocale = "en" | "th"
export type BlogCategory = "release" | "research" | "philosophy" | "news" | "tutorial" | "case_study"

export interface BlogHeroMetric {
  value: string
  label: string
  detail?: string
}

const BLOG_VARIANT_SUFFIX = ".th.mdx"
const BLOG_CATEGORY_LABELS: Record<BlogCategory, Record<BlogLocale, string>> = {
  release: { en: "Release", th: "รีลีส" },
  research: { en: "Research", th: "งานวิจัย" },
  philosophy: { en: "Philosophy", th: "ปรัชญา" },
  news: { en: "News", th: "ข่าวสาร" },
  tutorial: { en: "Tutorial", th: "คู่มือ" },
  case_study: { en: "Case Study", th: "กรณีศึกษา" },
}

const BLOG_PUBLICATION_TYPES: Record<BlogCategory, Record<BlogLocale, string>> = {
  release: { en: "Platform Release Note", th: "บันทึกการออกรุ่นแพลตฟอร์ม" },
  research: { en: "Enterprise Research Briefing", th: "สรุปวิจัยระดับองค์กร" },
  philosophy: { en: "Executive Thinking Note", th: "บันทึกแนวคิดเชิงบริหาร" },
  news: { en: "Enterprise Market Update", th: "อัปเดตข่าวสารระดับองค์กร" },
  tutorial: { en: "Applied Implementation Guide", th: "คู่มือการนำไปใช้จริง" },
  case_study: { en: "Case Study Briefing", th: "บทสรุปกรณีศึกษา" },
}

const BLOG_HERO_METRICS: Partial<Record<string, BlogHeroMetric[]>> = {
  "constitutional-ai-vs-rag-comparison": [
    { value: "0.3%", label: "Hallucination rate", detail: "RCT Ecosystem combined architecture" },
    { value: "Dual-layer", label: "Recommended pattern", detail: "RAG plus constitutional controls" },
    { value: "<50ms", label: "Warm recall path", detail: "Delta Engine cache hit" },
  ],
  "delta-engine-74-percent-compression": [
    { value: "74%", label: "Lossless compression", detail: "Delta-only state storage" },
    { value: "<50ms", label: "Warm recall", detail: "Semantic match threshold 0.95" },
    { value: "3 zones", label: "Storage architecture", detail: "Hot, warm, and cold data placement" },
  ],
  "fdia-equation-explained": [
    { value: "0.92", label: "Measured FDIA accuracy", detail: "Against ~0.65 industry baseline" },
    { value: "0.3%", label: "Hallucination rate", detail: "Production RCT workload" },
    { value: "7 states", label: "Intent loop pipeline", detail: "Governed from validation to completion" },
  ],
}

export interface BlogPostMetadata {
  title: string
  author: string
  authorId?: string
  reviewerId?: string
  date: string
  lastReviewed?: string
  category: BlogCategory
  excerpt: string
  tags: string[]
  readTime: number
  references?: string[]
}

export interface BlogPost extends BlogPostMetadata {
  slug: string
  content: string
  isLocalized: boolean
  availableLocales: BlogLocale[]
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/&[^;]+;/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
}

function mapMarkdownLinesOutsideFences(
  content: string,
  transform: (line: string, inFence: boolean) => string
) {
  const lines = content.split("\n")
  let inFence = false

  return lines
    .map((line) => {
      if (/^```/.test(line.trim())) {
        const nextLine = transform(line, inFence)
        inFence = !inFence
        return nextLine
      }

      return transform(line, inFence)
    })
    .join("\n")
}

function stripLeadingMarkdownTitle(content: string) {
  return content.replace(/^\s*#\s+.+?\r?\n(?:\r?\n)*/, "").trimStart()
}

function demoteMarkdownBodyH1(content: string) {
  return mapMarkdownLinesOutsideFences(content, (line, inFence) => {
    if (inFence) {
      return line
    }

    return line.replace(/^#\s+(.*)$/, "## $1")
  })
}

function getCanonicalBlogFileNames() {
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx") && !fileName.endsWith(BLOG_VARIANT_SUFFIX))
}

function parseBlogPostFile(filePath: string, slug: string) {
  const fileContents = fs.readFileSync(filePath, "utf8")
  const { data, content } = matter(fileContents)

  return {
    slug,
    content,
    ...(data as Partial<BlogPostMetadata>),
  }
}

function getLocalizedVariantPath(slug: string, locale: BlogLocale) {
  if (locale === "en") return null

  const localizedPath = path.join(postsDirectory, `${slug}.${locale}.mdx`)
  return fs.existsSync(localizedPath) ? localizedPath : null
}

function escapeComparisonOperators(content: string) {
  return mapMarkdownLinesOutsideFences(content, (line, inFence) => {
    if (inFence) {
      return line
    }

    return line.replace(/(^|[^\\w`])<(?=\d)/g, "$1&lt;")
  })
}

function localizeInlineLinks(content: string, locale: BlogLocale) {
  return content.replace(/\]\(\/(?:en|th)(\/[^)]+)\)/g, (_, suffix: string) => {
    const localizedHref = locale === "th" ? `/th${suffix}` : suffix
    return `](${localizedHref})`
  })
}

function normalizeBlogContent(content: string, locale: BlogLocale) {
  return demoteMarkdownBodyH1(
    stripLeadingMarkdownTitle(
      escapeComparisonOperators(localizeInlineLinks(content, locale))
    )
  )
}

function buildBlogPost(slug: string, locale: BlogLocale): BlogPost {
  const basePath = path.join(postsDirectory, `${slug}.mdx`)
  const basePost = parseBlogPostFile(basePath, slug)
  const variantPath = getLocalizedVariantPath(slug, locale)
  const localizedPost = variantPath ? parseBlogPostFile(variantPath, slug) : null

  const merged = {
    ...basePost,
    ...localizedPost,
    slug,
    content: localizedPost?.content?.trim() ? localizedPost.content : basePost.content,
  }

  return {
    ...(merged as BlogPostMetadata),
    slug,
    content: normalizeBlogContent(merged.content, locale),
    isLocalized: locale === "en" || Boolean(localizedPost),
    availableLocales: localizedPost ? ["en", locale] : ["en"],
  }
}

export function hasLocalizedBlogVariant(slug: string, locale: BlogLocale) {
  return Boolean(getLocalizedVariantPath(slug, locale))
}

export function getBlogCategoryLabel(category: BlogCategory, locale: BlogLocale) {
  return BLOG_CATEGORY_LABELS[category]?.[locale] ?? category.replace(/_/g, " ")
}

export function getBlogPublicationType(category: BlogCategory, locale: BlogLocale) {
  return BLOG_PUBLICATION_TYPES[category]?.[locale] ?? BLOG_PUBLICATION_TYPES.research[locale]
}

export function getBlogHeroMetrics(slug: string) {
  return BLOG_HERO_METRICS[slug] ?? []
}

export function getAllBlogPosts(locale: BlogLocale = "en"): BlogPost[] {
  const posts = getCanonicalBlogFileNames().map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, "")
    return buildBlogPost(slug, locale)
  })

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPostBySlug(slug: string, locale: BlogLocale = "en"): BlogPost | null {
  try {
    return buildBlogPost(slug, locale)
  } catch (error) {
    return null
  }
}

export function getBlogPostsByCategory(category: BlogPostMetadata["category"], locale: BlogLocale = "en"): BlogPost[] {
  return getAllBlogPosts(locale).filter((post) => post.category === category)
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
      authorityHref: "/benchmark-summary",
      authorityLabel: "Review Benchmark Summary",
      conversionContext: "pricing:rctlabs:sales",
      conversionLabel: "Request enterprise evaluation",
    }
  }

  if (post.slug.includes("thailand")) {
    return {
      solutionHref: "/solutions/ai-hallucination-prevention",
      solutionLabel: "Explore AI Hallucination Prevention",
      authorityHref: "/thailand-enterprise-trust",
      authorityLabel: "Open Thailand Enterprise Trust Layer",
      conversionContext: "whitepaper:evaluation-pack:request",
      conversionLabel: "Request the Thailand evaluation path",
    }
  }

  if (post.slug.includes("hallucination") || post.slug.includes("governance") || post.slug.includes("constitutional")) {
    return {
      solutionHref: "/solutions/ai-hallucination-prevention",
      solutionLabel: "Explore AI Hallucination Prevention",
      authorityHref: "/methodology",
      authorityLabel: "Review Methodology",
      conversionContext: "whitepaper:evaluation-pack:request",
      conversionLabel: "Request the evaluation pack",
    }
  }

  if (post.slug.includes("evaluate") || post.slug.includes("routing")) {
    return {
      solutionHref: "/solutions/dynamic-ai-routing",
      solutionLabel: "Explore Dynamic AI Routing",
      authorityHref: "/evaluation",
      authorityLabel: "Open Evaluation Hub",
      conversionContext: "pricing:rctlabs:sales",
      conversionLabel: "Talk to the platform team",
    }
  }

  return {
    solutionHref: "/solutions",
    solutionLabel: "Explore Solutions",
    authorityHref: "/glossary",
    authorityLabel: "Open Glossary",
    conversionContext: "launch:request-access",
    conversionLabel: "Request guided evaluation",
  }
}
