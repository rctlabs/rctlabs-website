import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import RoadmapSection from "@/components/sections/roadmap-section"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema } from "@/lib/schema"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Roadmap — RCT Labs Launch Priorities, Releases, and Platform Milestones",
    "Roadmap — แผนงาน รีลีส และหมุดหมายแพลตฟอร์มของ RCT Labs",
    "Track the public roadmap for RCT Labs across platform hardening, enterprise launch readiness, documentation, and future system expansion.",
    "ติดตาม roadmap สาธารณะของ RCT Labs ครอบคลุมการเสริมความพร้อมแพลตฟอร์ม การเตรียมเปิดตัวระดับองค์กร เอกสาร และการขยายระบบในอนาคต",
    "/roadmap",
    ["RCT Labs roadmap", "AI platform roadmap", "enterprise AI milestones", "product roadmap"]
  )
}

export default async function RoadmapPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Roadmap", url: `https://rctlabs.co${localePrefix}/roadmap` },
  ])

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Navbar />
      <div className="pt-16">
        <RoadmapSection />
      </div>
      <Footer />
    </main>
  )
}