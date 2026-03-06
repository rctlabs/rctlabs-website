import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ExternalLink, Download, ArrowRight } from "lucide-react"

export default function PressPage() {
  const releases = [
    {
      date: "November 9, 2025",
      title: "RCT Labs Releases Intent OS Open Protocol",
      excerpt:
        "Launching open-source protocol for intent-driven application development, advancing AI alignment research.",
      category: "Product Launch",
    },
    {
      date: "November 2, 2025",
      title: "RCT Labs Publishes FDIA Formula Research",
      excerpt:
        "Peer-reviewed paper on F=(D^I)×A framework accepted by top AI conference, gaining international recognition.",
      category: "Research",
    },
    {
      date: "October 28, 2025",
      title: "Community Milestone: 5,000+ Members",
      excerpt:
        "RCT Labs community reaches 5,000 members across Discord, GitHub, and forums, growing intent-driven AI movement.",
      category: "Community",
    },
    {
      date: "October 15, 2025",
      title: "RCT-7 Process Implementation Guide Published",
      excerpt: "Free comprehensive guide for organizations implementing intent-driven systems using RCT methodology.",
      category: "Education",
    },
  ]

  const mediaKit = [
    { title: "Logo Suite", desc: "Full color, monochrome, and icon variants" },
    { title: "Brand Colors", desc: "Official color palette and usage guidelines" },
    { title: "Typography", desc: "Font specifications and hierarchy" },
    { title: "Photography", desc: "High-res images and brand photography" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">Press & Media</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Latest news, press releases, and resources for journalists and media partners
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12">Press Releases</h2>
        <div className="space-y-6">
          {releases.map((release, i) => (
            <div
              key={i}
              className="group p-8 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition bg-card"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      {release.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{release.date}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-accent transition leading-tight">
                    {release.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{release.excerpt}</p>
                  <div className="flex items-center gap-2 text-accent font-semibold pt-2">
                    Read More <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Media Kit */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Media Kit</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Download official brand assets, logos, and guidelines for media use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mediaKit.map((item, i) => (
              <div
                key={i}
                className="bg-background rounded-lg p-6 border border-border hover:border-accent/50 transition"
              >
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{item.desc}</p>
                <Button variant="outline" size="sm" className="gap-2 bg-transparent">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact for Press */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-primary text-primary-foreground rounded-lg p-12 md:p-16 text-center space-y-6">
          <h2 className="text-4xl font-bold">Media Inquiries?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            For press inquiries, interview requests, or to receive press releases, please contact our media team.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact" className="gap-2">
              Contact Press Team <ExternalLink className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
