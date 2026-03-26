import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Editorial Policy — Authors, Review, References, and Update Discipline",
    "Editorial Policy — ผู้เขียน การตรวจทาน การอ้างอิง และวินัยการอัปเดต",
    "Editorial policy for RCT Labs covering authorship, review roles, references, update cadence, and public-safe disclosure rules across research and blog content.",
    "นโยบายบรรณาธิการของ RCT Labs ครอบคลุมผู้เขียน ผู้ตรวจทาน การอ้างอิง รอบการอัปเดต และกฎการเปิดเผยข้อมูลแบบ public-safe",
    "/editorial-policy",
    ["editorial policy", "AI research editorial policy", "RCT Labs review policy"]
  )
}

export default async function EditorialPolicyPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Editorial Policy", url: `https://rctlabs.co${localePrefix}/editorial-policy` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: isTh ? "ทุกบทความต้องมี reviewer หรือไม่" : "Does every article need a reviewer?",
      answer: isTh
        ? "บทความที่มีผลต่อ trust, governance, buyer evaluation, หรือ external references ควรมี reviewer หรือ editorial review ชัดเจน"
        : "Articles affecting trust, governance, buyer evaluation, or external references should use a clear reviewer or editorial review pattern.",
    },
    {
      question: isTh ? "เหตุใดจึงต้องมี disclosure boundary" : "Why does the site use a disclosure boundary?",
      answer: isTh
        ? "เพื่อให้เว็บสาธารณะยังคงอธิบายระบบได้ชัดเจนโดยไม่เปิดเผย implementation detail ที่ไม่ควรลงบน public web"
        : "To keep the public site informative without exposing implementation detail that should not appear on the public web.",
    },
  ])

  const policies = [
    {
      title: isTh ? "Authorship" : "Authorship",
      body: isTh ? "ทุกบทความควรระบุ author ที่รับผิดชอบต่อ framing ของบทความนั้น ไม่ว่าจะเป็นบุคคลหรือ organization-backed research desk" : "Every article should identify an accountable author, whether that is an individual contributor or an organization-backed research desk.",
    },
    {
      title: isTh ? "Review" : "Review",
      body: isTh ? "บทความที่อ้างอิง framework ภายนอก, buyer evaluation, หรือ trust claims ควรมี reviewer หรือ editorial role ที่ชัดเจน" : "Articles involving external frameworks, buyer evaluation, or trust claims should carry a clear reviewer or editorial role.",
    },
    {
      title: isTh ? "References" : "References",
      body: isTh ? "references ควรใช้แหล่งอ้างอิงสาธารณะที่ตรวจสอบได้จริง และแยกออกจากข้อสรุปหรือ interpretation ของ RCT เอง" : "References should use public, checkable sources and be kept distinct from RCT's own interpretations or positioning.",
    },
    {
      title: isTh ? "Updates" : "Updates",
      body: isTh ? "บทความเชิง authority ควรมี reviewed date และเมื่อจำเป็นต้องปรับให้สอดคล้องกับ version, roadmap, benchmark, หรือ policy ล่าสุด" : "Authority content should carry a reviewed date and be updated when version, roadmap, benchmark, or policy context materially changes.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{isTh ? "Editorial Policy" : "Editorial Policy"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh ? "กติกาการสร้าง ตรวจทาน อ้างอิง และอัปเดตเนื้อหาบน RCT Labs สำหรับ blog, research, และหน้าที่มีผลต่อ trust" : "The rules used to create, review, reference, and update content across the blog, research library, and trust-sensitive pages on RCT Labs."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {policies.map((policy) => (
            <div key={policy.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-foreground">{policy.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{policy.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "หน้าที่เกี่ยวข้อง" : "Related trust pages"}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/authors`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "Authors" : "Authors"}</Link>
            <Link href={`${localePrefix}/methodology`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "Methodology" : "Methodology"}</Link>
            <Link href={`${localePrefix}/glossary`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "Glossary" : "Glossary"}</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}