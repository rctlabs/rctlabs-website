export const SITE_URL = "https://rctlabs.co"
export const SITE_NAME = "RCT Labs"
export const SITE_DESCRIPTION = "Constitutional AI infrastructure for enterprise deployment."
export const SITE_OG_IMAGE = `${SITE_URL}/opengraph-image`
export const SITE_VERSION = "v5.4.5"
export const SITE_TEST_COUNT = 4849
export const SITE_MICROSERVICE_COUNT = 62
export const SITE_UPTIME = "99.98%"
export const SITE_HALLUCINATION_RATE = "0.3%"

export const SOCIAL_LINKS = {
  github: "https://github.com/rctlabs",
  linkedin: "https://linkedin.com/company/rctlabs",
  twitter: "https://twitter.com/rctlabs",
  discord: "https://discord.gg/rctlabs",
  twitterHandle: "@rctlabs",
} as const

export const PUBLIC_ROUTE_PRIORITIES: Record<string, number> = {
  "/": 1,
  "/pricing": 0.95,
  "/solutions": 0.9,
  "/products": 0.9,
  "/about": 0.85,
  "/company": 0.85,
  "/core-systems": 0.85,
  "/architecture": 0.8,
  "/research": 0.8,
  "/blog": 0.8,
  "/evaluation": 0.76,
  "/evaluation/enterprise-ai-governance-vs-generic-copilots": 0.7,
  "/evaluation/enterprise-ai-memory-vs-large-context-windows": 0.7,
  "/evaluation/dynamic-ai-routing-vs-static-orchestration": 0.7,
  "/methodology": 0.74,
  "/benchmark-summary": 0.74,
  "/thailand-enterprise-trust": 0.73,
  "/glossary": 0.72,
  "/editorial-policy": 0.72,
  "/roadmap": 0.75,
  "/contact": 0.75,
  "/docs": 0.7,
}

export const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/pricing",
  "/products",
  "/products/rctlabs",
  "/products/artent-ai",
  "/products/signed-ai",
  "/solutions",
  "/solutions/ai-hallucination-prevention",
  "/solutions/enterprise-ai-memory",
  "/solutions/dynamic-ai-routing",
  "/core-systems",
  "/architecture",
  "/genome",
  "/fdia",
  "/algorithms",
  "/benchmark",
  "/integration",
  "/protocols",
  "/protocols/jitna-rfc-001",
  "/protocols/fdia-equation",
  "/protocols/rct-7-mental-model",
  "/whitepaper",
  "/use-cases",
  "/faq",
  "/changelog",
  "/company",
  "/company/press",
  "/company/careers",
  "/company/partners",
  "/research",
  "/docs",
  "/platform",
  "/community",
  "/blog",
  "/methodology",
  "/editorial-policy",
  "/glossary",
  "/evaluation",
  "/evaluation/enterprise-ai-governance-vs-generic-copilots",
  "/evaluation/enterprise-ai-memory-vs-large-context-windows",
  "/evaluation/dynamic-ai-routing-vs-static-orchestration",
  "/benchmark-summary",
  "/thailand-enterprise-trust",
  "/contact",
  "/privacy",
  "/terms",
  "/roadmap",
] as const

export const NOINDEX_ROUTE_PREFIXES = [
  "/admin",
  "/analytics",
  "/monitor",
  "/owner",
  "/studio",
  "/test-console",
  "/websocket",
  "/api",
] as const