"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RCT7FlowDiagram } from "@/components/rct7-flow-diagram"

export default function RCT7Page() {
  const steps = [
    {
      number: 1,
      title: "Intent Extraction",
      description: "Identify and clarify the core intent behind a problem or task",
      details:
        "Extract the fundamental goal, values, and constraints that drive decision-making. What truly matters in this context?",
    },
    {
      number: 2,
      title: "Data Analysis",
      description: "Gather and understand all relevant contextual information",
      details:
        "Collect historical data, patterns, and environmental signals. Create a comprehensive picture of the situation.",
    },
    {
      number: 3,
      title: "Intent Mapping",
      description: "Align data patterns with intentional outcomes",
      details: "Create explicit connections between available data and desired intent. Define the relationship matrix.",
    },
    {
      number: 4,
      title: "Solution Architecture",
      description: "Design the system to compute F = (D^I) × A",
      details: "Build the computational model that transforms data through intent to generate aligned actions.",
    },
    {
      number: 5,
      title: "Implementation",
      description: "Deploy the intent-driven system into production",
      details: "Integrate with existing systems, configure parameters, and establish feedback mechanisms.",
    },
    {
      number: 6,
      title: "Validation",
      description: "Verify that outputs align with original intent",
      details: "Run comprehensive tests to ensure actions generated are truly aligned with stated intentions.",
    },
    {
      number: 7,
      title: "Continuous Refinement",
      description: "Monitor, learn, and improve the system over time",
      details: "Gather feedback, adjust parameters, and evolve the system to better understand and serve intent.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <section className="mx-auto max-w-7xl px-4 py-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/philosophy" className="hover:text-foreground transition flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Philosophy
        </Link>
        <span>/</span>
        <span className="text-foreground font-semibold">RCT-7 Process</span>
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">RCT-7 Process</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              Seven-step methodology for implementing intent-driven systems
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <RCT7FlowDiagram />
      </section>

      {/* Steps Timeline */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div key={step.number} className="relative">
              <div className="bg-card border border-border rounded-lg p-8 hover:border-accent/50 transition">
                <div className="flex gap-8">
                  <div className="flex-shrink-0">
                    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-accent/10 text-accent font-bold text-2xl">
                      {step.number}
                    </div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-2xl font-bold text-foreground">{step.title}</h3>
                    <p className="text-accent font-semibold">{step.description}</p>
                    <p className="text-muted-foreground leading-relaxed">{step.details}</p>
                  </div>
                </div>
              </div>
              {i < steps.length - 1 && (
                <div className="flex justify-center py-4">
                  <div className="w-1 h-8 bg-gradient-to-b from-accent to-transparent rounded-full" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Implementation Guide */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg">
        <div className="space-y-8">
          <h2 className="text-4xl font-bold text-foreground">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "For Individuals",
                points: [
                  "Clarify your personal or professional intent",
                  "Map your current data resources",
                  "Design your decision-making process",
                  "Implement and iterate",
                ],
              },
              {
                title: "For Organizations",
                points: [
                  "Align stakeholders on organizational intent",
                  "Audit existing data and systems",
                  "Design intent-driven architecture",
                  "Deploy organization-wide",
                ],
              },
            ].map((section, i) => (
              <div key={i} className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">{section.title}</h3>
                <ul className="space-y-3">
                  {section.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Concept */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 flex-1">
            <p className="text-sm text-accent font-semibold uppercase tracking-wide">Next Concept</p>
            <h2 className="text-3xl font-bold text-foreground">JITNA Language</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Learn how to specify intent precisely using our Just-In-Time Natural Action language.
            </p>
            <Button asChild className="mt-4">
              <Link href="/philosophy/jitna" className="gap-2">
                Explore JITNA <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
