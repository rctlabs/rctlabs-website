import type { Metadata } from "next"
import Link from "next/link"
import { getRequestLocale } from "@/lib/request-locale"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getAllAuthorProfiles } from "@/lib/authors"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()
  return createBilingualMetadata(
    locale,
    "Authors and Reviewers",
    "ผู้เขียนและผู้ตรวจทาน",
    "Meet the authors and reviewers shaping the public research, editorial guidance, and trust signals across RCT Labs.",
    "รู้จักผู้เขียนและผู้ตรวจทานที่ช่วยสร้างงานวิจัย สื่อ และสัญญาณความน่าเชื่อถือของ RCT Labs",
    "/authors",
    ["RCT Labs authors", "AI research reviewers", "editorial policy authors"]
  )
}

export default async function AuthorsPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const isTh = locale === "th"
  const authors = getAllAuthorProfiles()

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">{isTh ? "ผู้เขียนและผู้ตรวจทาน" : "Authors and Reviewers"}</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            {isTh ? "หน้ารวมผู้เขียน ผู้ตรวจทาน และทีมบรรณาธิการที่เกี่ยวข้องกับบทความ งานวิจัย และสัญญาณความน่าเชื่อถือของเว็บไซต์" : "Directory of the authors, reviewers, and editorial roles behind the research, blog, and trust content across the site."}
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {authors.map((author) => (
            <Link key={author.id} href={`${localePrefix}/authors/${author.id}`} className="rounded-2xl border border-border bg-card p-6 transition hover:border-accent/50 hover:shadow-sm">
              <div className="text-xl font-semibold text-foreground">{author.name}</div>
              <div className="mt-2 text-sm text-accent">{author.role[locale]}</div>
              <p className="mt-3 text-sm text-muted-foreground">{author.bio[locale]}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {author.expertise.slice(0, 3).map((item) => (
                  <span key={item} className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">{item}</span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}