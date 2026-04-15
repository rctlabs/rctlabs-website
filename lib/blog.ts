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
  // --- Batch 1: SignedAI / HexaCore / RCTDB / JITNA / Governance / Memory / Hallucination ---
  "signedai-multi-llm-consensus-explained": [
    { value: "0.3%", label: "Hallucination rate", detail: "7-model HexaCore consensus verification" },
    { value: "7", label: "Consensus models", detail: "3 Western + 3 Eastern + 1 Thai geopolitical balance" },
    { value: "Ed25519", label: "Signing algorithm", detail: "RFC 8032 cryptographic audit trail" },
  ],
  "hexacore-7-model-ai-infrastructure": [
    { value: "3.74×", label: "Cost reduction", detail: "vs single-model deployment baseline" },
    { value: "99.7%", label: "Accuracy", detail: "HexaCore consensus vs 85% single-LLM" },
    { value: "7 models", label: "HexaCore roster", detail: "Geopolitically balanced 3W + 3E + 1TH" },
  ],
  "rctdb-8-dimensional-memory-schema": [
    { value: "8 dimensions", label: "Schema depth", detail: "D1–D8 universal memory categories" },
    { value: "74%", label: "Delta compression", detail: "Lossless delta-only state storage" },
    { value: "3 layers", label: "Storage stack", detail: "Qdrant + Neo4j + PostgreSQL hybrid" },
  ],
  "jitna-language-release": [
    { value: "6 fields", label: "JITNA packet", detail: "I, D, Δ, A, R, M structured payload" },
    { value: "50ms", label: "Target latency", detail: "Warm agent negotiation loop" },
    { value: "RFC-001", label: "Protocol version", detail: "Open agent-to-agent standard" },
  ],
  "enterprise-ai-governance-playbook-2026": [
    { value: "3 frameworks", label: "Compliance coverage", detail: "NIST AI RMF + OECD + EU AI Act" },
    { value: "0.3%", label: "Hallucination ceiling", detail: "With constitutional runtime controls" },
    { value: "5 layers", label: "Governance depth", detail: "Policy through operational runtime" },
  ],
  "enterprise-ai-memory-systems-explained": [
    { value: "3 zones", label: "Memory architecture", detail: "Hot + Warm + Cold data placement" },
    { value: "74%", label: "Compression rate", detail: "Delta Engine lossless compression" },
    { value: "<50ms", label: "Recall latency", detail: "Warm path cache-hit threshold" },
  ],
  "how-to-reduce-ai-hallucination": [
    { value: "0.92", label: "FDIA accuracy", detail: "Against ~0.65 industry baseline" },
    { value: "0.3%", label: "Production target", detail: "RCT Ecosystem benchmark" },
    { value: "7 stages", label: "Verification pipeline", detail: "FDIA-governed input to output" },
  ],
  "verification-vs-prompt-engineering": [
    { value: "Deterministic", label: "Constitutional AI type", detail: "Policy-enforced, not probabilistic" },
    { value: "0.3%", label: "Hallucination rate", detail: "With verification layer active" },
    { value: "100%", label: "Policy enforcement", detail: "Constitutional constraints always applied" },
  ],
  // --- Batch 2: Multi-Agent / RCT-7 / PDPA / Constitutional TH / Tests / Evaluate / Harness ---
  "multi-agent-ai-systems-guide": [
    { value: "7 models", label: "HexaCore in multi-agent", detail: "Each model assigned a role via JITNA" },
    { value: "JITNA RFC-001", label: "Communication protocol", detail: "Open agent-to-agent standard" },
    { value: "0.3%", label: "Hallucination target", detail: "Consensus verification layer" },
  ],
  "rct-7-process-explained": [
    { value: "7 stages", label: "RCT-7 pipeline", detail: "Continuous improvement loop" },
    { value: "41 algorithms", label: "Algorithm coverage", detail: "9 tiers fully mapped" },
    { value: "4,849", label: "Test coverage", detail: "0 failures in v5.4.5" },
  ],
  "pdpa-ai-compliance-thailand": [
    { value: "PDPA + NIST", label: "Compliance coverage", detail: "Thai + US + EU AI frameworks" },
    { value: "0.3%", label: "Hallucination ceiling", detail: "With constitutional runtime controls" },
    { value: "2567", label: "Thai regulation year", detail: "พ.ร.บ. คุ้มครองข้อมูลส่วนบุคคล" },
  ],
  "constitutional-ai-thailand-enterprise-guide": [
    { value: "1,000+", label: "Target enterprises", detail: "Thai market vision 2030" },
    { value: "PDPA-native", label: "Compliance approach", detail: "Constitutional by design" },
    { value: "8", label: "Regional language pairs", detail: "Southeast Asia adapters" },
  ],
  "rct-ecosystem-4849-tests-methodology": [
    { value: "4,849", label: "Tests passing", detail: "0 failures, 0 errors in v5.4.5" },
    { value: "62", label: "Microservices", detail: "All green in production suite" },
    { value: "v5.4.5", label: "Current version", detail: "Enterprise full test suite" },
  ],
  "how-to-evaluate-enterprise-ai-platforms": [
    { value: "7 questions", label: "Evaluation framework", detail: "Buyer-side procurement checklist" },
    { value: "0.3%", label: "Hallucination benchmark", detail: "RCT production target rate" },
    { value: "4,849", label: "Test evidence", detail: "Platform reliability proof" },
  ],
  "evaluation-harnesses-enterprise-llm": [
    { value: "9 tiers", label: "Algorithm tier coverage", detail: "From input validation to verified output" },
    { value: "0.92", label: "FDIA benchmark score", detail: "Against ~0.65 industry baseline" },
    { value: "4,849", label: "Test suite size", detail: "Enterprise quality verification" },
  ],
  "designing-low-hallucination-ai-systems": [
    { value: "0.3%", label: "Target hallucination rate", detail: "Systems-design approach" },
    { value: "3 defense layers", label: "Architecture depth", detail: "Retrieval + Verify + Sign" },
    { value: "<50ms", label: "Overhead target", detail: "Constitutional AI latency" },
  ],
  // --- Batch 3: Strategy / Thailand Vision / Philosophy / Release ---
  "thai-ai-platform-vision-2030": [
    { value: "50–100B THB", label: "National economic vision", detail: "Thai enterprise AI value by 2030" },
    { value: "1,000+", label: "Target enterprises", detail: "Thai market 2030" },
    { value: "30 days", label: "Foundation built", detail: "Zero capital, one person" },
  ],
  "intent-operating-system-explained": [
    { value: "JITNA", label: "Core protocol", detail: "RFC-001 agent-to-agent standard" },
    { value: "9 tiers", label: "Kernel architecture", detail: "Input layer to verified output" },
    { value: "62 services", label: "Infrastructure", detail: "RCT microservice platform" },
  ],
  "reverse-component-thinking-explained": [
    { value: "v5.4.5", label: "Platform version", detail: "RCT methodology applied" },
    { value: "4,849", label: "Tests passing", detail: "Zero failures, zero errors" },
    { value: "30 days", label: "Build time", detail: "Full constitutional AI OS" },
  ],
  "v2-7-enterprise-integration-suite": [
    { value: "153 pages", label: "Website scale", detail: "Static generation clean build" },
    { value: "0 errors", label: "TypeScript", detail: "Clean build, enterprise-ready" },
    { value: "2026.03", label: "Snapshot version", detail: "Platform baseline" },
  ],
  "understanding-intent-operations": [
    { value: "JITNA", label: "Intent protocol", detail: "RFC-001 standard" },
    { value: "7 states", label: "Intent loop", detail: "From validation to completion" },
    { value: "62 services", label: "Infrastructure", detail: "RCT microservice count" },
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
  } catch {
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
  // Memory cluster: rctdb | delta (before generic memory check)
  if (post.slug.includes("rctdb") || post.slug.includes("delta")) {
    return {
      solutionHref: "/solutions/enterprise-ai-memory",
      solutionLabel: "Explore Enterprise AI Memory",
      authorityHref: "/benchmark",
      authorityLabel: "Review Benchmark Data",
      conversionContext: "pricing:rctlabs:sales",
      conversionLabel: "Request enterprise evaluation",
    }
  }

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

  // FDIA cluster: equation-first before hallucination rule
  if (post.slug.includes("fdia") || post.slug.includes("equation")) {
    return {
      solutionHref: "/protocols/fdia-equation",
      solutionLabel: "Explore the FDIA Equation",
      authorityHref: "/whitepaper/fdia-equation-v2",
      authorityLabel: "Read FDIA Whitepaper v2",
      conversionContext: "whitepaper:fdia:request",
      conversionLabel: "Request the FDIA evaluation pack",
    }
  }

  // JITNA / Protocol cluster
  if (post.slug.includes("jitna") || post.slug.includes("intent-operat")) {
    return {
      solutionHref: "/protocols/jitna-rfc-001",
      solutionLabel: "Explore JITNA RFC-001",
      authorityHref: "/technology/jitna",
      authorityLabel: "Open JITNA Technology Page",
      conversionContext: "whitepaper:jitna:request",
      conversionLabel: "Request the JITNA specification",
    }
  }

  // SignedAI / HexaCore / Verification cluster
  if (post.slug.includes("signedai") || post.slug.includes("hexacore") || post.slug.startsWith("verification-vs")) {
    return {
      solutionHref: "/products/signed-ai",
      solutionLabel: "Explore SignedAI",
      authorityHref: "/benchmark",
      authorityLabel: "Review Benchmark Results",
      conversionContext: "pricing:signedai:sales",
      conversionLabel: "Talk to the SignedAI team",
    }
  }

  // Multi-Agent cluster
  if (post.slug.includes("multi-agent")) {
    return {
      solutionHref: "/solutions/dynamic-ai-routing",
      solutionLabel: "Explore Dynamic AI Routing",
      authorityHref: "/protocols/jitna-rfc-001",
      authorityLabel: "Open JITNA Protocol Spec",
      conversionContext: "whitepaper:multiagent:request",
      conversionLabel: "Request multi-agent evaluation",
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

  // Evidence / Testing cluster: evaluation harnesses, test methodology, RCT-7
  if (post.slug.includes("evaluation-harness") || post.slug.includes("4849") || post.slug.includes("rct-7")) {
    return {
      solutionHref: "/benchmark",
      solutionLabel: "Open Benchmark Summary",
      authorityHref: "/methodology",
      authorityLabel: "Review Methodology",
      conversionContext: "pricing:rctlabs:evaluation",
      conversionLabel: "Request a platform evaluation",
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

  // Strategy / Architecture cluster
  if (post.slug.includes("reverse-component") || post.slug.includes("v2-7")) {
    return {
      solutionHref: "/architecture",
      solutionLabel: "Explore RCT Architecture",
      authorityHref: "/roadmap",
      authorityLabel: "Open Roadmap",
      conversionContext: "launch:request-access",
      conversionLabel: "View the full platform roadmap",
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
