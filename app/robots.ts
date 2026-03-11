import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/en/", "/th/"],
        disallow: ["/api/", "/admin/", "/_next/", "/_vercel/"],
      },
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
    ],
    sitemap: "https://rctlabs.co/sitemap.xml",
    host: "https://rctlabs.co",
  }
}
