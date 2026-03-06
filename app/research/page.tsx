"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, FileText, Brain, Zap, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function ResearchPage() {
  const papers = [
    {
      slug: "intent-optimization",
      title: "Intent Optimization in Neural Networks",
      description:
        "A comprehensive study on how explicit intent modeling improves neural network alignment and performance across diverse tasks.",
      category: "Mathematics",
      badge: "Mathematics",
      authors: "Smith, Johnson & Chen",
      date: "November 2024",
      icon: Brain,
    },
    {
      slug: "ethical-frameworks",
      title: "Ethical Frameworks for Intent-Driven AI",
      description:
        "Explores the philosophical and practical foundations for building AI systems that respect human values and intent.",
      category: "Ethics",
      badge: "Ethics",
      authors: "Lee, Patel & Rodriguez",
      date: "October 2024",
      icon: BookOpen,
    },
    {
      slug: "scalable-intent-os",
      title: "Scalable Intent Operating Systems",
      description:
        "Technical architecture and implementation patterns for building distributed intent-driven systems at enterprise scale.",
      category: "Systems",
      badge: "Systems",
      authors: "Chen, Kumar & Williams",
      date: "September 2024",
      icon: Zap,
    },
    {
      slug: "jitna-language-spec",
      title: "JITNA Language Specification",
      description:
        "Formal specification and implementation guide for the Just-In-Time Natural Action language used in Intent OS.",
      category: "Language",
      badge: "Language",
      authors: "Park, Thompson & Anderson",
      date: "August 2024",
      icon: FileText,
    },
    {
      slug: "fdia-formula-analysis",
      title: "FDIA Formula: Mathematical Foundations",
      description:
        "Deep mathematical analysis of F = (D^I) × A and its applications in computing exponential improvements in system alignment.",
      category: "Mathematics",
      badge: "Mathematics",
      authors: "Kumar, Zhang & Brown",
      date: "July 2024",
      icon: Brain,
    },
    {
      slug: "rct7-implementation",
      title: "RCT-7 Process Implementation Guide",
      description: "Practical guide for implementing the seven-step RCT process in organizations of all sizes.",
      category: "Implementation",
      badge: "Implementation",
      authors: "Garcia, Moore & Taylor",
      date: "June 2024",
      icon: BookOpen,
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">RCT Research</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Peer-reviewed papers and research advancing the frontier of intent-driven AI
          </p>
        </div>
      </section>

      {/* Featured Papers */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {papers.map((paper) => {
            const Icon = paper.icon
            return (
              <Link key={paper.slug} href={`/research/${paper.slug}`}>
                <div className="group h-full p-8 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition bg-card">
                  <div className="space-y-4 h-full flex flex-col">
                    <div className="flex items-start justify-between">
                      <Icon className="w-10 h-10 text-accent" />
                      <span className="inline-block px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded">
                        {paper.badge}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2 text-foreground group-hover:text-accent transition leading-tight">
                        {paper.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{paper.description}</p>
                    </div>
                    <div className="flex-1" />
                    <div className="space-y-2 pt-4 border-t border-border">
                      <p className="text-xs text-muted-foreground">{paper.authors}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{paper.date}</span>
                        <div className="flex items-center text-accent opacity-0 group-hover:opacity-100 transition">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            { label: "Published Papers", value: "24+" },
            { label: "Research Citations", value: "500+" },
            { label: "Active Researchers", value: "50+" },
            { label: "Research Institutions", value: "15+" },
          ].map((stat, i) => (
            <div key={i} className="text-center space-y-2">
              <div className="text-3xl md:text-4xl font-bold text-accent">{stat.value}</div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg">
        <div className="space-y-6 text-center">
          <h2 className="text-4xl font-bold text-foreground">Submit Your Research</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Contributing to the RCT research community? We welcome peer-reviewed papers on intent-driven systems, AI
            alignment, and related topics.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
