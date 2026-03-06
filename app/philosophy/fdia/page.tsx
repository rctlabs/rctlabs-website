"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FDIACalculator } from "@/components/fdia-calculator"

export default function FDIAPage() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Breadcrumb */}
      <section className="mx-auto max-w-7xl px-4 py-8 flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/philosophy" className="hover:text-foreground transition flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Philosophy
        </Link>
        <span>/</span>
        <span className="text-foreground font-semibold">FDIA Formula</span>
      </section>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">FDIA Formula</h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl">
              F = (D^I) × A: The mathematical foundation of intent-driven AI systems
            </p>
          </div>

          {/* Formula Visualization */}
          <div className="bg-card border border-border rounded-lg p-12 my-12">
            <div className="text-center space-y-4">
              <div className="text-6xl md:text-7xl font-bold text-accent font-mono">
                F = (D<sup>I</sup>) × A
              </div>
              <p className="text-muted-foreground text-lg">
                Intent Operating System = (Data raised to Intent power) multiplied by Action
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Components */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            {
              letter: "D",
              title: "Data",
              description:
                "The raw material of understanding. All observable patterns, contexts, and historical information that informs decision-making.",
              details: ["Contextual information", "Historical patterns", "Environmental signals", "User interactions"],
            },
            {
              letter: "I",
              title: "Intent",
              description:
                "The exponential multiplier of understanding. Intent transforms raw data into purposeful knowledge by defining what truly matters.",
              details: ["Goal identification", "Value alignment", "Priority setting", "Objective clarity"],
            },
            {
              letter: "A",
              title: "Action",
              description:
                "The actualization layer. The tangible output that manifests intention in the real world, guided by the Data-Intent relationship.",
              details: ["Decision execution", "Output generation", "System response", "Real-world impact"],
            },
          ].map((component, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-lg p-8 space-y-4 hover:border-accent/50 transition"
            >
              <div className="text-5xl font-bold text-accent mb-4">{component.letter}</div>
              <h3 className="text-2xl font-bold text-foreground">{component.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{component.description}</p>
              <ul className="space-y-2 pt-4">
                {component.details.map((detail, j) => (
                  <li key={j} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Formula Visualization */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <FDIACalculator />
      </section>

      {/* Why It Matters */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg">
        <div className="space-y-8 max-w-3xl">
          <h2 className="text-4xl font-bold text-foreground">Why This Matters</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Exponential Amplification</h3>
              <p className="text-muted-foreground leading-relaxed">
                The exponent in the formula (D^I) represents how intent exponentially amplifies the value of data.
                Without clear intent, data is just noise. With precise intent, data becomes pure signal.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Scalable Understanding</h3>
              <p className="text-muted-foreground leading-relaxed">
                This formula scales from individual tasks to complex organizational systems. Whether optimizing a single
                decision or orchestrating an entire intelligence ecosystem, FDIA provides the mathematical foundation.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-2">Measurable Alignment</h3>
              <p className="text-muted-foreground leading-relaxed">
                By quantifying the relationship between data, intent, and action, we can measure and optimize for true
                alignment between AI systems and human values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Next Concept */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="space-y-4 flex-1">
            <p className="text-sm text-accent font-semibold uppercase tracking-wide">Next Concept</p>
            <h2 className="text-3xl font-bold text-foreground">RCT-7 Process</h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Discover how to implement FDIA principles through our seven-step methodology for building intent-driven
              systems.
            </p>
            <Button asChild className="mt-4">
              <Link href="/philosophy/rct-7" className="gap-2">
                Explore RCT-7 <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
