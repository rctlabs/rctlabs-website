"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Briefcase, FileText, Users, ArrowRight, Building2, Star, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CompanyPage() {
  const sections = [
    {
      icon: Briefcase,
      title: "Careers",
      description:
        "Join our team and help shape the future of intent-driven AI. We're hiring researchers, engineers, and builders.",
      href: "/company/careers",
    },
    {
      icon: FileText,
      title: "Press",
      description: "Latest news, announcements, and media resources about RCT Labs.",
      href: "/company/press",
    },
    {
      icon: Users,
      title: "Partners",
      description: "Explore partnership opportunities and collaboration with RCT Labs.",
      href: "/company/partners",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">RCT Labs</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Building the Intent Operating System. Advancing AI alignment through open research and protocol development.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg">
        <div className="space-y-8 max-w-3xl">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold text-foreground">Our Mission</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              To revolutionize how humans and AI interact by creating systems that genuinely understand and align with
              human intent. We believe AI should enhance human capability, not replace human judgment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
            {[
              { title: "Open Science", description: "Publishing research openly to advance the field" },
              { title: "Public Good", description: "Building infrastructure for the broader AI community" },
              { title: "Transparency", description: "Complete openness about our work and methods" },
            ].map((value, i) => (
              <div key={i} className="space-y-2">
                <h3 className="font-semibold text-foreground">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Team Members", value: "40+" },
            { label: "Research Papers", value: "24+" },
            { label: "Community Size", value: "5,000+" },
            { label: "GitHub Stars", value: "1,000+" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="text-4xl font-bold text-accent">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Company Sections */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Explore</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sections.map((section, i) => {
            const Icon = section.icon
            return (
              <Link key={i} href={section.href}>
                <div className="group h-full p-8 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition bg-card">
                  <Icon className="w-12 h-12 text-accent mb-4" />
                  <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-accent transition">
                    {section.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{section.description}</p>
                  <div className="flex items-center text-accent font-semibold opacity-0 group-hover:opacity-100 transition">
                    Learn More <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: Building2,
              title: "Scientific Rigor",
              description:
                "We approach problems with the discipline of science, testing hypotheses and publishing findings for peer review.",
            },
            {
              icon: Star,
              title: "Excellence",
              description:
                "We maintain the highest standards in research, code, and execution. We settle for nothing less.",
            },
            {
              icon: Globe,
              title: "Openness",
              description:
                "We believe in the power of open science and open source. Knowledge should be shared freely.",
            },
            {
              icon: Users,
              title: "Collaboration",
              description:
                "We work with researchers, developers, and organizations worldwide to advance our shared mission.",
            },
          ].map((value, i) => {
            const Icon = value.icon
            return (
              <div key={i} className="p-8 rounded-lg border border-border bg-card">
                <Icon className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-primary text-primary-foreground rounded-lg p-12 md:p-16 space-y-6">
          <div className="space-y-4">
            <h2 className="text-4xl font-bold">Interested in RCT Labs?</h2>
            <p className="text-lg opacity-90 max-w-2xl">
              Whether you want to join our team, partner with us, or learn more about our work—we'd love to hear from
              you.
            </p>
          </div>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact" className="gap-2">
              Get in Touch <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
