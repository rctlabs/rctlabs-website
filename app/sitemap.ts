import type { MetadataRoute } from "next"

const baseUrl = "https://rctlabs.co"
const locales = ['en', 'th'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  // Priority mapping per plan
  const routePriority: Record<string, number> = {
    // 0.9: revenue/critical
    "/pricing": 0.9,
    "/products": 0.9,
    "/products/rctlabs": 0.9,
    "/products/artent-ai": 0.9,
    "/products/signed-ai": 0.9,
    "/solutions": 0.9,
    "/solutions/ai-hallucination-prevention": 0.9,
    "/solutions/enterprise-ai-memory": 0.9,
    "/solutions/dynamic-ai-routing": 0.9,
    // 0.8: architecture/protocols
    "/architecture": 0.8,
    "/genome": 0.8,
    "/fdia": 0.8,
    "/algorithms": 0.8,
    "/benchmark": 0.8,
    "/integration": 0.8,
    "/protocols": 0.8,
    "/protocols/jitna-rfc-001": 0.8,
    "/protocols/fdia-equation": 0.8,
    "/protocols/rct-7-mental-model": 0.8,
    // 0.7: content/support
    "/whitepaper": 0.7,
    "/use-cases": 0.7,
    "/faq": 0.7,
    "/changelog": 0.7,
    // 0.6: demo/case-studies
    "/demo/fdia": 0.6,
    "/case-studies/stardew-valley": 0.6,
    // blog/how-to-reduce-ai-hallucination (slug route)
    "/blog/how-to-reduce-ai-hallucination": 0.6,
  }

  const routes = [
    "", // home
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
    "/demo/fdia",
    "/case-studies/stardew-valley",
    "/blog/how-to-reduce-ai-hallucination",
    // legacy/support
    "/contact",
    "/docs",
    "/platform",
    "/research",
    "/philosophy",
    "/philosophy/fdia",
    "/philosophy/jitna",
    "/philosophy/rct-7",
    "/philosophy/intent-os",
    "/open-protocol",
    "/community",
    "/privacy",
    "/terms",
  ]

  // Generate entries for each locale with hreflang alternates and correct priority
  return routes.flatMap((route) =>
    locales.map((locale) => {
      const priority = route === "" ? 1 : (routePriority[route] ?? 0.5)
      return {
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority,
        alternates: {
          languages: {
            en: `${baseUrl}/en${route}`,
            th: `${baseUrl}/th${route}`,
          },
        },
      }
    })
  )
}
