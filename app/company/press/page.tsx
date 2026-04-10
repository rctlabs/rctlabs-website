import { headers } from "next/headers"

export default async function CompanyPressRedirect() {
  const locale = (await headers()).get("x-locale") === "th" ? "th" : "en"
  const target = `/${locale}/press`
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://rctlabs.co/${locale}` },
      { "@type": "ListItem", position: 2, name: "Press", item: `https://rctlabs.co${target}` },
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
