import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getRequestLocale } from "@/lib/request-locale"
import { ArrowLeft, ArrowRight, Globe2, Handshake, ShieldCheck } from "lucide-react"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Partners — Technology, Consulting, and Channel Ecosystem",
    "พันธมิตร — ระบบนิเวศด้านเทคโนโลยี ที่ปรึกษา และช่องทางการขาย",
    "Learn how RCT Labs partners with technology providers, consulting firms, and channel teams to deploy constitutional AI systems in enterprise environments.",
    "ดูแนวทางที่ RCT Labs ทำงานร่วมกับพันธมิตรด้านเทคโนโลยี บริษัทที่ปรึกษา และทีม channel เพื่อขับเคลื่อน constitutional AI ในองค์กร",
    "/company/partners",
    ["technology partners", "AI channel partners", "consulting partners", "enterprise AI partnership"]
  )
}

export default async function PartnersPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const partnerTypes = [
    {
      title: "Technology Partners",
      description: "Integrations and partnerships with leading technology providers.",
      partners: ["Salesforce", "Slack", "Microsoft Teams", "Google Workspace"],
    },
    {
      title: "Reseller Partners",
      description: "Global network of certified resellers bringing our solutions to market.",
      partners: ["Partner One", "Partner Two", "Partner Three", "Partner Four"],
    },
    {
      title: "Consulting Partners",
      description: "Expert consulting firms helping organizations implement our solutions.",
      partners: ["Deloitte", "Accenture", "McKinsey", "BCG"],
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(191,160,110,0.08),transparent_58%)] pointer-events-none" />
        <div className="mx-auto max-w-6xl px-4 py-24 md:py-32">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href={`${localePrefix}/company`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>

        <div className="max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-warm-amber/30 bg-warm-amber/10 px-4 py-1.5 text-sm font-medium text-warm-amber">
            <Handshake className="h-4 w-4" />
            Partner Ecosystem
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Partners</h1>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Work with RCT Labs across technology integrations, consulting delivery, and enterprise channels to bring constitutional AI systems into production.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5"><Globe2 className="h-4 w-4 text-warm-amber" />Technology alliances</span>
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5"><ShieldCheck className="h-4 w-4 text-warm-sage" />Compliance-ready delivery</span>
          </div>
        </div>
        </div>
      </section>

      {/* Partner Types */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="space-y-12">
          {partnerTypes.map((type, i) => (
            <div key={i} className="rounded-3xl border border-border bg-card/70 p-8 shadow-[0_18px_44px_rgba(31,24,18,0.04)]">
              <h2 className="mb-3 text-2xl font-bold text-foreground">{type.title}</h2>
              <p className="mb-6 text-muted-foreground">{type.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {type.partners.map((partner, j) => (
                  <div key={j} className="rounded-2xl border border-border bg-background p-4 text-center transition-colors hover:border-warm-amber/30 hover:bg-warm-cream/40">
                    <p className="text-foreground font-medium">{partner}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="rounded-3xl border border-warm-amber/20 bg-linear-to-br from-warm-amber/10 via-card to-transparent p-12 text-center space-y-4">
          <h2 className="text-3xl font-bold">Interested in Partnership?</h2>
          <p className="text-lg text-muted-foreground">Let's explore how we can work together.</p>
          <Button size="lg" asChild>
            <Link href={`${localePrefix}/contact`}>
              Contact Our Partners Team
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
