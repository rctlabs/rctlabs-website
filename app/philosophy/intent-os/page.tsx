"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, Zap, Network, Shield, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

export default function IntentOSPage() {
  const pathname = usePathname()
  const localePrefix = getLocalePrefix(resolveLocale(pathname))
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `https://rctlabs.co${localePrefix}` },
      { "@type": "ListItem", position: 2, name: "Philosophy", item: `https://rctlabs.co${localePrefix}/philosophy` },
      { "@type": "ListItem", position: 3, name: "Intent OS", item: `https://rctlabs.co${localePrefix}/philosophy/intent-os` },
    ],
  }
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Intent OS?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Intent OS is a concept for operating systems that optimize around goals and values instead of only files and processes.",
        },
      },
      {
        "@type": "Question",
        name: "How does Intent OS relate to FDIA and JITNA?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "FDIA provides the decision equation and JITNA provides intent communication primitives; Intent OS uses both as its architectural substrate.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <section className="mx-auto max-w-7xl px-4 py-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href={`${localePrefix}/philosophy`} className="hover:text-foreground transition flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Philosophy
        </Link>
        <span>/</span>
        <span className="text-foreground font-semibold">Intent OS</span>
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">Intent OS</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              The operating system of the future, built on intent-driven principles
            </p>
          </div>

          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed pt-4">
            Instead of managing files, windows, and processes—Intent OS manages goals, values, and outcomes. It
            represents a fundamental reimagining of how humans and AI collaborate.
          </p>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12">Core Pillars</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Lightbulb,
              title: "Intent First Architecture",
              description:
                "Every component prioritizes understanding and aligning with user intent. Intentions are first-class entities in the system.",
            },
            {
              icon: Network,
              title: "Distributed Intelligence",
              description:
                "Intelligence is distributed across the network, with each agent understanding its role in achieving collective intent.",
            },
            {
              icon: Shield,
              title: "Transparent Alignment",
              description:
                "Complete transparency into how system decisions map back to original intent. Auditability and trustworthiness at every layer.",
            },
            {
              icon: Zap,
              title: "Real-Time Adaptation",
              description:
                "Systems continuously adapt to evolving context and intent. Learning and refinement happen in real-time.",
            },
          ].map((pillar, i) => {
            const Icon = pillar.icon
            return (
              <div
                key={i}
                className="bg-card border border-border rounded-lg p-8 space-y-4 hover:border-accent/50 transition"
              >
                <Icon className="w-12 h-12 text-accent" />
                <h3 className="text-xl font-semibold text-foreground">{pillar.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Architectural Layers */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-linear-to-r from-accent/5 to-secondary/5 rounded-lg">
        <h2 className="text-4xl font-bold text-foreground mb-12">Architectural Layers</h2>
        <div className="space-y-4">
          {[
            {
              layer: "Intent Layer",
              description:
                "User goals, values, and constraints expressed through JITNA. The semantic foundation of all operations.",
            },
            {
              layer: "Context Layer",
              description:
                "Real-time understanding of environmental factors, user state, and system capabilities. Dynamic context management.",
            },
            {
              layer: "Reasoning Layer",
              description:
                "Application of FDIA formula and RCT-7 process. Computation of optimal actions aligned with intent.",
            },
            {
              layer: "Execution Layer",
              description:
                "Distributed agents and services that execute decisions. Each action maintains traceability to original intent.",
            },
            {
              layer: "Feedback Layer",
              description:
                "Continuous monitoring and learning. System validates outcomes against intent and adapts accordingly.",
            },
          ].map((item, i) => (
            <div key={i} className="bg-background rounded-lg p-6 border border-border/50 relative">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center shrink-0 text-accent font-bold">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{item.layer}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Practical Applications */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12">Practical Applications</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              title: "Enterprise Systems",
              description:
                "Replace siloed applications with intent-driven workflow orchestration. Employees express what they want to accomplish, not how.",
            },
            {
              title: "AI Assistants",
              description:
                "Build assistants that understand true user intent rather than literally following instructions. Contextual, adaptive, aligned.",
            },
            {
              title: "Robotics & Automation",
              description:
                "Robots and systems that understand objectives and adapt execution to real-world conditions. Not just programmed, but intentional.",
            },
            {
              title: "Personalized Experiences",
              description:
                "Systems that evolve with users, understanding deeper intentions over time. Truly personalized, not just data-driven.",
            },
          ].map((application, i) => (
            <div key={i} className="border-l-4 border-accent pl-6 space-y-2">
              <h3 className="text-lg font-semibold text-foreground">{application.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{application.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Vision */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-primary text-primary-foreground rounded-lg p-12 md:p-16 space-y-6">
          <h2 className="text-4xl font-bold">The Vision</h2>
          <p className="text-lg leading-relaxed opacity-90">
            Intent OS represents more than a technical advancement—it's a philosophical shift in how we design systems
            for human-AI collaboration. Instead of humans adapting to rigid interfaces and workflows, systems adapt to
            human intent. This creates technology that's more intuitive, more aligned, and fundamentally more
            human-centered.
          </p>
          <p className="text-lg leading-relaxed opacity-90">
            The future of computing is intent-driven. Join us in building it.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button size="lg" variant="secondary" asChild>
              <Link href={`${localePrefix}/research`}>View Research</Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="bg-secondary text-secondary-foreground">
              <Link href={`${localePrefix}/contact`}>Get Involved</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Back to Philosophy */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="text-center space-y-4">
          <p className="text-sm text-accent font-semibold uppercase tracking-wide">Philosophy Hub</p>
          <h2 className="text-3xl font-bold text-foreground">Ready to explore more?</h2>
          <Button asChild variant="outline" size="lg" className="mt-4 bg-transparent">
            <Link href={`${localePrefix}/philosophy`}>Return to Philosophy</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
    </>
  )
}
