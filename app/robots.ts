import type { MetadataRoute } from "next"
import { NOINDEX_ROUTE_PREFIXES, SITE_URL } from "@/lib/site-config"

const disallow = [...NOINDEX_ROUTE_PREFIXES.map((prefix) => `${prefix}/`), "/_next/", "/_vercel/"]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/en/", "/th/"],
        disallow,
      },
      {
        userAgent: "GPTBot",
        allow: ["/", "/en/", "/th/"],
        disallow,
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
