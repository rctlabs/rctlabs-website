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
    "Enterprise AI Memory vs Large Context Windows — Why They Are Not the Same",
    "Enterprise AI Memory vs Large Context Windows — ทำไมสองสิ่งนี้ไม่เหมือนกัน",
    "A focused comparison page explaining why enterprise AI memory systems are different from simply increasing context windows, including retention, validation, expiry, and audit concerns.",
    "หน้าเปรียบเทียบแบบเจาะจง อธิบายว่าระบบ enterprise AI memory ต่างจากการเพิ่ม context window อย่างไร รวมถึงเรื่อง retention, validation, expiry และ audit",
    "/evaluation/enterprise-ai-memory-vs-large-context-windows",
    ["enterprise ai memory vs context windows", "ai memory systems comparison", "large context windows enterprise ai"]
  )
}

export default async function MemoryVsContextWindowsPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Evaluation", url: `https://rctlabs.co${localePrefix}/evaluation` },
    { name: "Enterprise AI Memory vs Large Context Windows", url: `https://rctlabs.co${localePrefix}/evaluation/enterprise-ai-memory-vs-large-context-windows` },
  ])

  const faqSchema = getFAQSchema([
    {
      question: isTh ? "ทำไมทีมองค์กรจึงสับสนสองอย่างนี้บ่อย" : "Why do enterprise teams often confuse these two ideas?",
      answer: isTh
        ? "เพราะทั้งสองอย่างเกี่ยวข้องกับการใช้ context แต่ context window คือความจุ ส่วน memory system คือวินัยในการเก็บ ใช้ ลบ และตรวจสอบบริบทนั้นในระยะยาว"
        : "Because both involve context usage, but a context window is capacity while a memory system is the discipline for storing, reusing, expiring, and validating context over time.",
    },
    {
      question: isTh ? "อะไรคือคำถามที่ buyer ควรถาม" : "What should buyers ask?",
      answer: isTh
        ? "ควรถามว่าระบบเก็บอะไรไว้นานแค่ไหน ใครอนุญาตให้ใช้ซ้ำได้อย่างไร และมีวิธีตรวจสอบหรือหมดอายุของ memory อย่างไร"
        : "Buyers should ask what is retained, for how long, under what approval model, and how memory reuse, validation, and expiry are governed.",
    },
  ])

  const sections = [
    {
      title: isTh ? "Capacity vs governance" : "Capacity vs governance",
      body: isTh
        ? "การมี context window ใหญ่ขึ้นช่วยให้โมเดลอ่านข้อความได้มากขึ้นในคำขอเดียว แต่ยังไม่ตอบคำถามเรื่องความจำถาวร การอนุญาตให้ใช้ซ้ำ และการล้างข้อมูลออกจากระบบ"
        : "A larger context window lets a model process more text in a single request, but it does not answer questions about durable memory, reuse permissions, or data expiration.",
    },
    {
      title: isTh ? "Retention and expiry" : "Retention and expiry",
      body: isTh
        ? "memory system ที่ดีต้องกำหนดว่าอะไรควรถูกเก็บ อะไรไม่ควรถูกเก็บ และอะไรควรหมดอายุอัตโนมัติเมื่อหมด relevance หรือเกินนโยบาย"
        : "A sound memory system defines what should be retained, what should never be stored, and what should automatically expire once relevance or policy limits are exceeded.",
    },
    {
      title: isTh ? "Validation before reuse" : "Validation before reuse",
      body: isTh
        ? "บริบทที่เคยถูกเก็บไว้ไม่ควรถูกดึงกลับมาใช้โดยอัตโนมัติทุกครั้ง ควรมีชั้น validation หรือ confidence checks ก่อนนำไปใช้ในงานมูลค่าสูง"
        : "Previously stored context should not always be reused automatically. High-value workflows need validation or confidence checks before memory is reintroduced.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-4xl">
          <p className="text-sm font-semibold text-accent">{isTh ? "Memory system evaluation" : "Memory system evaluation"}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold text-foreground">{isTh ? "Enterprise AI Memory vs Large Context Windows" : "Enterprise AI Memory vs Large Context Windows"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh
              ? "ถ้าผู้ขายบอกเพียงว่า model รองรับ context ได้ยาวขึ้น นั่นยังไม่เท่ากับว่าระบบมี memory architecture ที่พร้อมใช้ในองค์กร"
              : "If a vendor says the model supports a longer context window, that still does not mean the system has an enterprise-ready memory architecture."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <div key={section.title} className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-foreground">{section.title}</h2>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-border bg-card p-8">
          <h2 className="text-2xl font-bold text-foreground">{isTh ? "Buyer checklist เบื้องต้น" : "Buyer-side checklist"}</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-muted-foreground">
            <li>{isTh ? "ระบบนี้อธิบาย memory classes หรือไม่" : "Does the system describe its memory classes?"}</li>
            <li>{isTh ? "มี retention / expiry rules ที่ชัดเจนหรือไม่" : "Are retention and expiry rules explicit?"}</li>
            <li>{isTh ? "มีการตรวจสอบก่อน reuse memory หรือไม่" : "Is memory validated before reuse?"}</li>
            <li>{isTh ? "สามารถ audit ได้ว่าบริบทใดถูกใช้เพื่อสร้างผลลัพธ์" : "Can teams audit which context contributed to an output?"}</li>
          </ul>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            <Link href={`${localePrefix}/solutions/enterprise-ai-memory`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">{isTh ? "ดู memory solution" : "Explore memory solution"}</Link>
            <Link href={`${localePrefix}/benchmark-summary`} className="rounded-full bg-accent/10 px-4 py-2 font-medium text-accent hover:underline">Benchmark Summary</Link>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}