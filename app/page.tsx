import { headers } from "next/headers"

// This page handles bare "/" requests that bypass middleware (edge cases only).
// Middleware normally redirects "/" to "/en" or "/th" based on Accept-Language.
// Keeping this as force-dynamic is fine -- it's just a single redirect response.
export const dynamic = "force-dynamic"

export default async function RootPage() {
  const headerList = await headers()
  const locale = headerList.get("x-locale") === "th" ? "th" : "en"
  const target = `/${locale}`
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://rctlabs.co${target}` },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script dangerouslySetInnerHTML={{ __html: `window.location.replace('${target}')` }} />
      <main className="min-h-screen flex items-center justify-center bg-background text-muted-foreground">
        Redirecting...
      </main>
    </>
  )
}
