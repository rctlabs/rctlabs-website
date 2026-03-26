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
    "Methodology — How RCT Labs Uses Frameworks, Testing, and Disclosure Controls",
    "Methodology — วิธีที่ RCT Labs ใช้กรอบภายนอก การทดสอบ และขอบเขตการเปิดเผยข้อมูล",
    "Methodology page describing how RCT Labs uses external governance frameworks, internal testing, disclosure boundaries, and review loops across public research and platform claims.",
    "หน้า methodology ที่อธิบายว่า RCT Labs ใช้กรอบกำกับดูแลภายนอก การทดสอบภายใน ขอบเขตการเปิดเผยข้อมูล และวงรอบการตรวจทานอย่างไร",
    "/methodology",
    ["AI methodology", "enterprise AI evaluation methodology", "RCT Labs methodology"]
  )
}

export default async function MethodologyPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Methodology", url: `https://rctlabs.co${localePrefix}/methodology` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: isTh ? "หน้า Methodology มีไว้เพื่ออะไร" : "What is the methodology page for?",
      answer: isTh
        ? "เพื่ออธิบายว่าการอ้างอิง การทดสอบ การเปิดเผยข้อมูล และการตรวจทานบนเว็บไซต์ RCT Labs มีกรอบและขอบเขตอย่างไร"
        : "It explains the framework behind how RCT Labs handles references, testing, disclosure, and review across the public site.",
    },
    {
      question: isTh ? "Methodology นี้เท่ากับเอกสาร compliance หรือไม่" : "Is this methodology the same as compliance documentation?",
      answer: isTh
        ? "ไม่ใช่ เอกสารนี้เป็น public-facing explanation ของวิธีทำงานและการกำกับคุณภาพ ไม่ใช่เอกสาร compliance เต็มรูปแบบ"
        : "No. It is a public-facing explanation of quality controls and evidence practices, not a full compliance dossier.",
    },
  ])

  const pillars = [
    {
      title: isTh ? "External frameworks" : "External frameworks",
      body: isTh
        ? "เราใช้กรอบสาธารณะอย่าง NIST AI RMF, OECD AI Principles, Stanford HAI AI Index, และแนวคิดเชิงกำกับดูแลระดับสากลเพื่อจัดวางภาษากลางของ trust, governance, และ evaluation"
        : "We use public frameworks such as NIST AI RMF, OECD AI Principles, Stanford HAI AI Index, and other governance-oriented sources to anchor the language of trust, governance, and evaluation.",
    },
    {
      title: isTh ? "Internal testing" : "Internal testing",
      body: isTh
        ? "ตัวเลขสาธารณะและการวาง positioning จะต้องไม่ขัดกับ baseline ภายในที่ถูกยืนยันแล้ว เช่น version, tests, uptime, และขอบเขตของ public-safe metrics"
        : "Public positioning and numerical claims are expected to remain aligned with verified internal baselines such as version, tests, uptime, and public-safe quality metrics.",
    },
    {
      title: isTh ? "Disclosure boundary" : "Disclosure boundary",
      body: isTh
        ? "เว็บไซต์สาธารณะจะอธิบาย capability, governance, และ buyer evaluation path โดยไม่เปิดเผย implementation detail ที่ไม่เหมาะกับ public web"
        : "The public website explains capability, governance, and buyer evaluation paths without exposing implementation details that are not appropriate for the public web.",
    },
    {
      title: isTh ? "Review and updates" : "Review and updates",
      body: isTh
        ? "บทความและหน้าที่มีผลต่อ trust จะใช้ระบบ author, reviewer, reviewed date, และ reference hygiene เพื่อให้คุณภาพสม่ำเสมอมากขึ้น"
        : "Trust-sensitive pages use author, reviewer, reviewed-date, and reference hygiene patterns so content quality remains more consistent over time.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-accent">{isTh ? "Knowledge trust system" : "Knowledge trust system"}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">{isTh ? "Methodology" : "Methodology"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh
              ? "หน้ากลางสำหรับอธิบายว่า RCT Labs ใช้กรอบอ้างอิงภายนอก การทดสอบภายใน ขอบเขตการเปิดเผยข้อมูล และการตรวจทานเนื้อหาอย่างไร"
              : "A central page describing how RCT Labs uses external frameworks, internal testing, disclosure boundaries, and content review loops."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-foreground">{pillar.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{pillar.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "ใช้หน้า Methodology นี้อย่างไร" : "How to use this page"}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            <Link href={`${localePrefix}/editorial-policy`} className="rounded-xl border border-border/70 bg-background/60 p-5 transition hover:border-accent/50">
              <div className="font-semibold text-foreground">{isTh ? "Editorial policy" : "Editorial policy"}</div>
              <p className="mt-2 text-sm text-muted-foreground">{isTh ? "ดูรูปแบบ author, reviewer, references, และ update policy" : "See the author, reviewer, reference, and update policy pattern."}</p>
            </Link>
            <Link href={`${localePrefix}/benchmark-summary`} className="rounded-xl border border-border/70 bg-background/60 p-5 transition hover:border-accent/50">
              <div className="font-semibold text-foreground">{isTh ? "Benchmark summary" : "Benchmark summary"}</div>
              <p className="mt-2 text-sm text-muted-foreground">{isTh ? "ดูการอธิบาย public-safe benchmark framing และข้อจำกัด" : "Review public-safe benchmark framing and caveats."}</p>
            </Link>
            <Link href={`${localePrefix}/evaluation`} className="rounded-xl border border-border/70 bg-background/60 p-5 transition hover:border-accent/50">
              <div className="font-semibold text-foreground">{isTh ? "Evaluation hub" : "Evaluation hub"}</div>
              <p className="mt-2 text-sm text-muted-foreground">{isTh ? "ต่อยอดไปยังหน้าเปรียบเทียบและ buyer evaluation path" : "Continue into comparison pages and buyer evaluation paths."}</p>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}