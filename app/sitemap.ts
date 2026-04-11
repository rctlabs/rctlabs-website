import type { MetadataRoute } from "next"
import { getAllBlogPosts } from "@/lib/blog"
import { PUBLIC_ROUTES, PUBLIC_ROUTE_PRIORITIES, SITE_URL } from "@/lib/site-config"

const locales = ["en", "th"] as const

function localizeUrl(locale: (typeof locales)[number], route: string) {
  return route === "/" ? `${SITE_URL}/${locale}` : `${SITE_URL}/${locale}${route}`
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()
  const publicEntries = PUBLIC_ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: localizeUrl(locale, route),
      lastModified,
      changeFrequency: route === "/" ? "daily" as const : "weekly" as const,
      priority: PUBLIC_ROUTE_PRIORITIES[route] ?? 0.65,
      alternates: {
        languages: {
          en: localizeUrl("en", route),
          th: localizeUrl("th", route),
        },
      },
    }))
  )

  const blogEntries = getAllBlogPosts().flatMap((post) => {
    const route = `/blog/${post.slug}`
    const postModified = new Date(post.lastReviewed || post.date)
    return locales.map((locale) => ({
      url: localizeUrl(locale, route),
      lastModified: Number.isNaN(postModified.getTime()) ? lastModified : postModified,
      changeFrequency: "monthly" as const,
      priority:
        post.slug.includes("fdia") || post.slug.includes("jitna") || post.slug.includes("signedai") || post.slug.includes("constitutional")
          ? 0.78
          : post.category === "research"
            ? 0.75
            : 0.68,
      alternates: {
        languages: {
          en: localizeUrl("en", route),
          th: localizeUrl("th", route),
        },
      },
    }))
  })

  return [...publicEntries, ...blogEntries]
}
