import type { Metadata } from "next"
import Link from "next/link"
import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { getBreadcrumbSchema, getFAQSchema } from "@/lib/schema"
import { SITE_HALLUCINATION_RATE, SITE_MICROSERVICE_COUNT, SITE_TEST_COUNT, SITE_UPTIME, SITE_VERSION } from "@/lib/site-config"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Benchmark Summary — Public-Safe Performance, Quality, and Evaluation Framing",
    "Benchmark Summary — กรอบสาธารณะสำหรับประสิทธิภาพ คุณภาพ และการประเมิน",
    "Public-safe benchmark summary describing RCT Labs version baselines, performance framing, quality signals, caveats, and how benchmark language should be interpreted by buyers.",
    "หน้าสรุป benchmark แบบ public-safe สำหรับอธิบาย baseline เวอร์ชัน กรอบประสิทธิภาพ สัญญาณคุณภาพ ข้อจำกัด และวิธีตีความ benchmark language ของ RCT Labs",
    "/benchmark-summary",
    ["benchmark summary", "AI benchmark methodology", "public-safe benchmark"]
  )
}

export default async function BenchmarkSummaryPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Benchmark Summary", url: `https://rctlabs.co${localePrefix}/benchmark-summary` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: isTh ? "หน้า Benchmark Summary นี้เท่ากับ benchmark report เต็มหรือไม่" : "Is this the full benchmark report?",
      answer: isTh
        ? "ไม่ใช่ หน้านี้เป็น public-safe summary สำหรับ framing, caveats, และ baseline ที่ใช้บนเว็บไซต์"
        : "No. This is a public-safe summary page for framing, caveats, and baseline interpretation on the website.",
    },
    {
      question: isTh ? "เหตุใดจึงต้องมี caveats" : "Why are caveats necessary?",
      answer: isTh
        ? "เพราะ benchmark language ที่ดีต้องอธิบายขอบเขต วิธีวัด และสิ่งที่ไม่ควรตีความเกินจริง"
        : "Because responsible benchmark language should explain scope, measurement context, and what should not be over-interpreted.",
    },
  ])

  const stats = [
    { label: isTh ? "Version baseline" : "Version baseline", value: SITE_VERSION },
    { label: isTh ? "Verified tests" : "Verified tests", value: SITE_TEST_COUNT.toLocaleString() },
    { label: isTh ? "Microservices" : "Microservices", value: String(SITE_MICROSERVICE_COUNT) },
    { label: isTh ? "Uptime framing" : "Uptime framing", value: SITE_UPTIME },
    { label: isTh ? "Hallucination framing" : "Hallucination framing", value: SITE_HALLUCINATION_RATE },
  ]

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{isTh ? "Benchmark Summary" : "Benchmark Summary"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh ? "หน้าสรุป benchmark แบบ public-safe สำหรับช่วยตีความตัวเลขและ quality signals บนเว็บไซต์อย่างระมัดระวังมากขึ้น" : "A public-safe benchmark framing page for interpreting the site's performance and quality language more carefully."}
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-5">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</div>
              <div className="mt-3 text-2xl font-bold text-foreground">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground">{isTh ? "What this page does" : "What this page does"}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {isTh ? "อธิบาย baseline สาธารณะ วิธีมองตัวเลข และขอบเขตการใช้ benchmark language บนหน้า blog, research, pricing, และ changelog" : "It explains public baselines, how to interpret numbers, and how benchmark language is used across blog, research, pricing, and changelog surfaces."}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-xl font-semibold text-foreground">{isTh ? "What this page does not do" : "What this page does not do"}</h2>
            <p className="mt-3 text-sm leading-7 text-muted-foreground">
              {isTh ? "ไม่ได้เปิดเผย benchmark dataset, internal evaluator configuration, proprietary implementation details หรือหลักฐานภายในเต็มรูปแบบบน public web" : "It does not disclose benchmark datasets, internal evaluator configuration, proprietary implementation details, or full internal evidence packs on the public web."}
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "หน้าที่เกี่ยวข้อง" : "Related pages"}</h2>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/research`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Research</Link>
            <Link href={`${localePrefix}/changelog`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Changelog</Link>
            <Link href={`${localePrefix}/methodology`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Methodology</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}