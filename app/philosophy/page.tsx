"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Lightbulb, Zap, BookOpen, Brain } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PhilosophyPage() {
  const concepts = [
    {
      slug: "fdia",
      title: "FDIA Formula",
      description: "F = (D^I) × A framework that defines the relationship between Data, Intent, and Action",
      icon: Lightbulb,
      color: "text-accent",
    },
    {
      slug: "rct-7",
      title: "RCT-7 Process",
      description: "A seven-step implementation methodology for building intent-driven systems",
      icon: Zap,
      color: "text-secondary",
    },
    {
      slug: "jitna",
      title: "JITNA Language",
      description: "Just-In-Time Natural Action language for precise intent specification",
      icon: BookOpen,
      color: "text-accent",
    },
    {
      slug: "intent-os",
      title: "Intent OS",
      description: "The operating system of the future built on intent-driven principles",
      icon: Brain,
      color: "text-secondary",
    },
  ]

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://rctlabs.co/en" },
      { "@type": "ListItem", position: 2, name: "Philosophy", item: "https://rctlabs.co/en/philosophy" },
    ],
  }
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "RCT Philosophy Concepts",
    numberOfItems: 6,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "FDIA", url: "https://rctlabs.co/en/philosophy/fdia" },
      { "@type": "ListItem", position: 2, name: "JITNA", url: "https://rctlabs.co/en/philosophy/jitna" },
      { "@type": "ListItem", position: 3, name: "RCT-7", url: "https://rctlabs.co/en/philosophy/rct-7" },
      { "@type": "ListItem", position: 4, name: "Intent OS", url: "https://rctlabs.co/en/philosophy/intent-os" },
      { "@type": "ListItem", position: 5, name: "Approach", url: "https://rctlabs.co/en/philosophy/approach" },
      { "@type": "ListItem", position: 6, name: "Ethics", url: "https://rctlabs.co/en/philosophy/ethics" },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />
      <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">RCT Philosophy</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Explore the foundational concepts and frameworks that power the Intent Operating System
          </p>
        </div>
      </section>

      {/* Core Concepts Grid */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {concepts.map((concept) => {
            const Icon = concept.icon
            return (
              <Link key={concept.slug} href={`/philosophy/${concept.slug}`}>
                <div className="group h-full p-8 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition cursor-pointer bg-card">
                  <div className="space-y-4 h-full flex flex-col">
                    <Icon className={`w-12 h-12 ${concept.color}`} />
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-accent transition">
                        {concept.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{concept.description}</p>
                    </div>
                    <div className="flex items-center text-accent font-semibold pt-4 opacity-0 group-hover:opacity-100 transition">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Philosophy Overview */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg my-12">
        <div className="space-y-8">
          <div className="max-w-3xl">
            <h2 className="text-4xl font-bold mb-6 text-foreground">The Intent Revolution</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                RCT Labs is pioneering a fundamental shift in how humans and AI interact. Rather than following rigid
                procedures or isolated instructions, we envision systems that understand and align with human intent at
                the deepest level.
              </p>
              <p>
                Our philosophy centers on four interconnected pillars: the mathematical rigor of the FDIA formula, the
                practical implementation of the RCT-7 process, the linguistic precision of JITNA, and the architectural
                vision of Intent OS.
              </p>
              <p>
                Together, these frameworks form a complete paradigm for building AI systems that are not just
                intelligent, but intentional—capable of understanding what users truly want and acting accordingly with
                transparency and alignment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Explore Intent-Driven Design?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Dive deep into our research, join our community, and help shape the future of AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/research" className="gap-2">
                View Research <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="bg-secondary text-secondary-foreground">
              <Link href="/community">Join Community</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}
