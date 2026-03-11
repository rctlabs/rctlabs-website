import type { MetadataRoute } from "next"

const baseUrl = "https://rctlabs.co"
const locales = ['en', 'th'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/blog",
    "/contact",
    "/docs",
    "/platform",
    "/research",
    "/solutions",
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

  // Generate entries for each locale with hreflang alternates
  return routes.flatMap((route) => 
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en${route}`,
          th: `${baseUrl}/th${route}`,
        },
      },
    }))
  )
}
