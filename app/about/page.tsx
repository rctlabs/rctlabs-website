import type { Metadata } from "next"
import { createBilingualMetadata, type Locale } from "@/lib/seo-bilingual"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Lightbulb, Target, Zap } from "lucide-react"
import { headers } from "next/headers"
import { loadTranslations } from "@/lib/i18n"

export async function generateMetadata(): Promise<Metadata> {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale

  return createBilingualMetadata(
    locale,
    "About RCT Labs",
    "เกี่ยวกับ RCT Labs",
    "Learn about RCT Labs - our mission, values, team, and approach to intent-driven AI research.",
    "เรียนรู้เกี่ยวกับ RCT Labs - พันธกิจ ค่านิยม ทีมงาน และแนวทางการวิจัย AI ที่ขับเคลื่อนด้วยเจตนา",
    "/about",
    ["AI research", "intent-driven AI", "Thailand AI", "Constitutional AI"]
  )
}

export default async function AboutPage() {
  const headersList = await headers()
  const locale = (headersList.get("x-locale") || "en") as Locale
  const t = await loadTranslations(locale)

  const a = (key: string) => {
    const about = (t as Record<string, unknown>)?.about as Record<string, string> | undefined
    return about?.[key] || key
  }

  const values = [
    {
      icon: Target,
      title: a("value_constitutional_title"),
      description: a("value_constitutional_desc"),
    },
    {
      icon: Lightbulb,
      title: a("value_architecture_title"),
      description: a("value_architecture_desc"),
    },
    {
      icon: Users,
      title: a("value_regional_title"),
      description: a("value_regional_desc"),
    },
    {
      icon: Zap,
      title: a("value_enterprise_title"),
      description: a("value_enterprise_desc"),
    },
  ]

  const teamMembers = [
    {
      name: locale === 'th' ? "ดร. ซาร่า เฉิน" : "Dr. Sarah Chen",
      role: locale === 'th' ? "ผู้ร่วมก่อตั้งและ CEO" : "Co-Founder & CEO",
      bio: locale === 'th' 
        ? "ผู้นำ RCT Labs ด้วยประสบการณ์วิจัย AI 15 ปี"
        : "Leading RCT Labs with 15 years of AI research expertise",
    },
    {
      name: locale === 'th' ? "ศ. เจมส์ วิลสัน" : "Prof. James Wilson",
      role: locale === 'th' ? "Chief Research Officer" : "Chief Research Officer",
      bio: locale === 'th'
        ? "พัฒนา AI ที่ขับเคลื่อนด้วยเจตนาผ่านการวิจัยอย่างเข้มงวด"
        : "Advancing intent-driven AI through rigorous research",
    },
    {
      name: locale === 'th' ? "ดร. อเล็กซ์ พาเทล" : "Dr. Alex Patel",
      role: locale === 'th' ? "VP of Engineering" : "VP of Engineering",
      bio: locale === 'th'
        ? "สร้างระบบที่สามารถขยายได้สำหรับการดำเนินงาน AI"
        : "Building scalable systems for AI operations",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
              {a("title")}
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
              {a("subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-foreground">{a("mission_title")}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {a("mission_p1")}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {a("mission_p2")}
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-foreground">{a("vision_title")}</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {a("vision_p1")}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {a("vision_p2")}
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">{a("values_title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {locale === 'th' ? 'หลักการเหล่านี้เป็นแนวทางในทุกการตัดสินใจของเราที่ RCT Labs' : 'These principles guide every decision we make at RCT Labs'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <div key={i} className="p-8 rounded-lg border border-border bg-card hover:border-accent/50 transition">
                  <Icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-xl font-semibold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">{a("team_title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {a("team_subtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="w-32 h-32 bg-gradient-to-br from-accent/20 to-secondary/20 rounded-full mx-auto flex items-center justify-center">
                  <Users className="w-16 h-16 text-accent/40" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm font-medium text-accent">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">{a("journey_title")}</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{a("journey_subtitle")}</p>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              { year: "v1.0", event: "RCT Ecosystem founded — 7 Genome System, FDIA Protocol, Kernel v1.0" },
              { year: "v2.0", event: "RCTDB v2.0 — 8D universal memory schema, 36 algorithms, OS Primitives" },
              { year: "v2.2", event: "Regional Language Adapter — 8 markets, JITNA Protocol RFC-001 v2.0" },
              { year: "v2.3", event: "Control Plane + Enterprise Hardening — ED25519, JWT RS256, RBAC" },
              { year: "v2.4", event: "Analysearch Intent Engine — 41 production algorithms, 2,210 tests" },
              { year: "v2.5", event: "Infrastructure Layer — Docker, Kubernetes, API Gateway, Monitoring" },
              { year: "v2.7", event: "Enterprise Integration Suite — Slack Gateway, Notion Auto-Sync, 3,176 tests" },
              { year: "v3.3", event: "ArtentAI Engine, Farmer Pipeline, Discord Bot — 3,695 tests" },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-mono text-xs">
                    {item.year}
                  </div>
                  {i < 7 && <div className="w-0.5 h-16 bg-border mt-4" />}
                </div>
                <div className="pt-2">
                  <p className="text-sm font-semibold text-accent mb-1">{item.year}</p>
                  <p className="text-lg text-foreground">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg p-12 md:p-16 text-center space-y-6">
          <h2 className="text-4xl font-bold text-foreground">{a("cta_title")}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {a("cta_subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/company/careers">{locale === 'th' ? 'ดูตำแหน่งงาน' : 'View Careers'}</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">{locale === 'th' ? 'ติดต่อเรา' : 'Get in Touch'}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
