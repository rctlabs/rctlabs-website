"use client"

/*
 * Breadcrumb — Dynamic breadcrumb navigation with SEO structured data
 * Automatically generates breadcrumbs based on current route
 * Migrated from manus-frontend-design: wouter → next/navigation, Helmet → script JSON-LD
 */
import { useMemo } from "react"
import { usePathname } from "next/navigation"
import { Home } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"
import {
  Breadcrumb as BreadcrumbRoot,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface BreadcrumbSegment {
  label: string
  href: string
}

const routeLabels: Record<string, { en: string; th: string }> = {
  solutions: { en: "Solutions", th: "โซลูชัน" },
  "ai-hallucination-prevention": { en: "AI Hallucination Prevention", th: "ป้องกัน AI Hallucination" },
  "enterprise-ai-memory": { en: "Enterprise AI Memory", th: "ระบบความจำ AI" },
  "dynamic-ai-routing": { en: "Dynamic AI Routing", th: "การกำหนดเส้นทาง AI" },
  products: { en: "Products", th: "ผลิตภัณฑ์" },
  rctlabs: { en: "RCT Labs", th: "RCT Labs" },
  "artent-ai": { en: "ARTENT AI", th: "ARTENT AI" },
  "signed-ai": { en: "Signed AI", th: "Signed AI" },
  pricing: { en: "Pricing", th: "ราคา" },
  architecture: { en: "System Architecture", th: "สถาปัตยกรรมระบบ" },
  genome: { en: "7 Genome System", th: "ระบบ 7 Genome" },
  algorithms: { en: "41 Algorithms", th: "41 อัลกอริทึม" },
  benchmark: { en: "Hexa Core Benchmark", th: "Hexa Core Benchmark" },
  protocols: { en: "Protocols", th: "โปรโตคอล" },
  "jitna-rfc-001": { en: "JITNA RFC-001", th: "JITNA RFC-001" },
  "fdia-equation": { en: "FDIA Equation", th: "สมการ FDIA" },
  "rct-7-mental-model": { en: "RCT-7 Mental Model", th: "RCT-7 Mental Model" },
  whitepaper: { en: "Whitepaper", th: "เอกสารทางเทคนิค" },
  blog: { en: "Blog", th: "บล็อก" },
  "use-cases": { en: "Use Cases", th: "กรณีศึกษา" },
  integration: { en: "Integration Guide", th: "คู่มือการใช้งาน" },
  changelog: { en: "Changelog", th: "บันทึกการเปลี่ยนแปลง" },
  about: { en: "About Us", th: "เกี่ยวกับเรา" },
  faq: { en: "FAQ", th: "คำถามที่พบบ่อย" },
  "case-studies": { en: "Case Studies", th: "กรณีศึกษา" },
  "stardew-valley": { en: "Stardew Valley", th: "Stardew Valley" },
  demo: { en: "Demo", th: "สาธิต" },
  fdia: { en: "FDIA Demo", th: "สาธิต FDIA" },
  research: { en: "Research", th: "งานวิจัย" },
  community: { en: "Community", th: "ชุมชน" },
  philosophy: { en: "Philosophy", th: "ปรัชญา" },
}

export default function Breadcrumb() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const effectivePathname = pathname || ""

  const pathSegments = effectivePathname.split("/").filter(Boolean)

  const breadcrumbs: BreadcrumbSegment[] = [
    { label: language === "en" ? "Home" : "หน้าแรก", href: "/" },
  ]

  let currentPath = ""
  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`
    const labels = routeLabels[segment]
    if (labels) {
      breadcrumbs.push({ label: language === "en" ? labels.en : labels.th, href: currentPath })
    } else {
      breadcrumbs.push({
        label: segment.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        href: currentPath,
      })
    }
  })

  const breadcrumbJsonLd = useMemo(() => JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.label,
      "item": `https://rctlabs.co${crumb.href}`,
    })),
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [effectivePathname, language])

  // Don't show breadcrumb on homepage
  if (effectivePathname === "/") return null

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbJsonLd }}
      />
      <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-6 lg:px-8">
        <BreadcrumbRoot>
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1
              return (
                <BreadcrumbItem key={crumb.href}>
                  {index === 0 && (
                    <BreadcrumbLink asChild>
                      <Link href={crumb.href} aria-label="Home">
                        <Home size={14} />
                      </Link>
                    </BreadcrumbLink>
                  )}
                  {index > 0 && !isLast && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbLink asChild>
                        <Link href={crumb.href}>{crumb.label}</Link>
                      </BreadcrumbLink>
                    </>
                  )}
                  {index > 0 && isLast && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                    </>
                  )}
                </BreadcrumbItem>
              )
            })}
          </BreadcrumbList>
        </BreadcrumbRoot>
      </nav>
    </>
  )
}
