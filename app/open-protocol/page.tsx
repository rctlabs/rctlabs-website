"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowRight, Code2, Lock, Zap, Globe, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProtocolPage() {
  const features = [
    {
      icon: Code2,
      title: "Open Source",
      description: "Fully open-source implementation. Review, contribute, and deploy with complete transparency.",
    },
    {
      icon: Lock,
      title: "Secure by Default",
      description: "Built-in security primitives for authentication, authorization, and data protection.",
    },
    {
      icon: Zap,
      title: "High Performance",
      description: "Optimized for real-time intent processing at scale with minimal latency.",
    },
    {
      icon: Globe,
      title: "Distributed",
      description: "Works across devices, networks, and organizations with seamless interoperability.",
    },
    {
      icon: BookOpen,
      title: "Well Documented",
      description: "Comprehensive specifications, examples, and guides for developers.",
    },
    {
      icon: Code2,
      title: "Language Agnostic",
      description: "Implement in any programming language with consistent semantics.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
              RCT Open Protocol
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Open standards for building intent-driven applications. The foundation for a decentralized, AI-aligned
              future.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <Button size="lg" asChild>
              <Link href="https://github.com" target="_blank" className="gap-2">
                View on GitHub <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#documentation">Read Documentation</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="p-8 rounded-lg border border-border hover:border-accent/50 transition bg-card">
                <Icon className="w-12 h-12 text-accent mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Architecture */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg">
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Protocol Architecture</h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              The RCT protocol layers enable seamless intent specification, transmission, and execution across
              distributed systems.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                layer: "Transport Layer",
                description: "Secure, efficient transmission of intent messages across networks and devices.",
              },
              {
                layer: "Intent Layer",
                description: "JITNA-based specification and validation of user intent and constraints.",
              },
              {
                layer: "Execution Layer",
                description: "Distributed agents interpret and execute intents with provable alignment.",
              },
              {
                layer: "Verification Layer",
                description: "Cryptographic proofs and audit trails ensuring intent fidelity.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-background rounded-lg p-6 border border-border/50">
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.layer}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Get Started with RCT Protocol</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose your path and start building intent-driven applications today.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "For Developers",
                items: [
                  "Install the RCT SDK",
                  "Review protocol specifications",
                  "Build with JITNA language",
                  "Deploy to production",
                ],
              },
              {
                title: "For Researchers",
                items: [
                  "Study protocol design",
                  "Contribute improvements",
                  "Publish findings",
                  "Collaborate on standards",
                ],
              },
              {
                title: "For Organizations",
                items: ["Evaluate for enterprise", "Deploy privately", "Integrate with systems", "Get support"],
              },
            ].map((path, i) => (
              <div key={i} className="rounded-lg border border-border p-8 bg-card">
                <h3 className="text-xl font-semibold text-foreground mb-6">{path.title}</h3>
                <ul className="space-y-3">
                  {path.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documentation */}
      <section id="documentation" className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-foreground">Documentation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Quick Start Guide",
                description: "Get up and running with RCT protocol in 5 minutes.",
              },
              {
                title: "API Reference",
                description: "Complete reference for all protocol endpoints and methods.",
              },
              {
                title: "JITNA Language Guide",
                description: "Learn how to specify intent using JITNA syntax.",
              },
              {
                title: "Security Best Practices",
                description: "Guidelines for secure protocol implementation.",
              },
            ].map((doc, i) => (
              <Link key={i} href="/docs">
                <div className="group p-8 rounded-lg border border-border hover:border-accent/50 transition bg-card cursor-pointer">
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-accent transition">
                    {doc.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{doc.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-primary text-primary-foreground rounded-lg p-12 md:p-16 text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Build with Intent?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Join developers building the next generation of intent-driven applications with the RCT protocol.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="https://github.com" target="_blank">
                GitHub Repository
              </Link>
            </Button>
            <Button size="lg" variant="secondary" asChild className="bg-secondary text-secondary-foreground">
              <Link href="/contact">Get Support</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
