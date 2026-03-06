import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Lightbulb, Target, Zap } from "lucide-react"

export const metadata: Metadata = createPageMetadata(
  "About RCT Labs",
  "Learn about RCT Labs - our mission, values, team, and approach to intent-driven AI research.",
  "/about",
)

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Dr. Sarah Chen",
      role: "Co-Founder & CEO",
      bio: "Leading RCT Labs with 15 years of AI research expertise",
    },
    {
      name: "Prof. James Wilson",
      role: "Chief Research Officer",
      bio: "Advancing intent-driven AI through rigorous research",
    },
    {
      name: "Dr. Alex Patel",
      role: "VP of Engineering",
      bio: "Building scalable systems for AI operations",
    },
  ]

  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Every decision aligns with our mission to revolutionize human-AI interaction",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We push boundaries and explore new frontiers in intent-driven AI",
    },
    {
      icon: Users,
      title: "Community",
      description: "We believe in the power of collaboration and open science",
    },
    {
      icon: Zap,
      title: "Impact",
      description: "Our work creates meaningful change in how AI serves humanity",
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
              About RCT Labs
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Pioneering intent-driven AI through rigorous research, open protocols, and collaborative innovation.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mx-auto max-w-7xl px-4 py-24 grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Our Mission</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We are committed to revolutionizing how humans and AI interact by creating systems that genuinely understand
            and align with human intent. Our work bridges the gap between human values and AI capabilities.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Through rigorous research, open protocols, and community collaboration, we're building the Intent Operating
            System—a fundamental shift in how AI systems operate.
          </p>
        </div>

        <div className="space-y-6">
          <h2 className="text-4xl font-bold text-foreground">Our Vision</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            A future where AI systems transparently understand and respect human intent, amplifying human capability
            while preserving human agency and values.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            We envision a world where intent-driven design becomes the standard for AI development, ensuring alignment
            between human goals and AI objectives.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make at RCT Labs
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
            <h2 className="text-4xl font-bold text-foreground">Leadership Team</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced researchers and builders united by a shared vision
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
            <h2 className="text-4xl font-bold text-foreground">Our Journey</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Key milestones in RCT Labs' evolution</p>
          </div>

          <div className="space-y-8 max-w-3xl mx-auto">
            {[
              { year: "2023", event: "RCT Labs founded with focus on intent-driven AI" },
              { year: "2024", event: "Published foundational research on F=(D^I)×A formula" },
              { year: "2024", event: "Launched RCT-7 process and JITNA language" },
              { year: "2025", event: "Released open protocol for community adoption" },
            ].map((item, i) => (
              <div key={i} className="flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-semibold">
                    {i + 1}
                  </div>
                  {i < 3 && <div className="w-0.5 h-16 bg-border mt-4" />}
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
          <h2 className="text-4xl font-bold text-foreground">Join Our Mission</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're always looking for talented researchers, engineers, and builders to help shape the future of AI.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/company/careers">View Careers</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
