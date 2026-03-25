"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Github, MessageCircle, ArrowRight, BookOpen, FileText, Sparkles } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CommunityClient() {
  const channels = [
    {
      icon: Github,
      title: "GitHub",
      description: "Open source repositories, code examples, and collaborative development",
      href: "https://github.com/rctlabs",
      stat: "1,000+",
      statLabel: "Stars",
      color: "text-foreground",
    },
    {
      icon: MessageCircle,
      title: "Discord",
      description: "Real-time chat, discussions, and community support",
      href: "https://discord.gg/rctlabs",
      stat: "24/7",
      statLabel: "Support",
      color: "text-accent",
    },
    {
      icon: Users,
      title: "Forum",
      description: "Threaded discussions, Q&A, and knowledge sharing",
      href: "https://github.com/orgs/rctlabs/discussions",
      stat: "10K+",
      statLabel: "Discussions",
      color: "text-secondary",
    },
  ]

  const highlights = [
    {
      title: "Research Community",
      description: "Join researchers and academics pushing the frontier of intent-driven AI",
      link: "/research",
    },
    {
      title: "Developer Community",
      description: "Build with RCT protocols, solutions, and technical docs across the ecosystem",
      link: "/docs",
    },
    {
      title: "Learning Hub",
      description: "Tutorials, guides, and articles on constitutional AI, FDIA, and enterprise deployment",
      link: "/blog",
    },
  ]

  const jumpLinks = [
    { icon: FileText, label: "Read Whitepapers", href: "/whitepaper" },
    { icon: BookOpen, label: "Browse Documentation", href: "/docs" },
    { icon: Sparkles, label: "Explore Solutions", href: "/solutions" },
  ]

  return (
    <main id="main-content" className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="mx-auto max-w-4xl space-y-8 text-center">
          <h1 className="text-5xl font-bold leading-tight text-foreground text-balance md:text-6xl">
            Join the RCT Community
          </h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground text-balance md:text-2xl">
            Connect with researchers, developers, and operators building constitutional AI, verified intelligence, and enterprise-grade AI infrastructure.
          </p>
          <div className="grid gap-3 sm:grid-cols-3">
            {jumpLinks.map((item) => {
              const Icon = item.icon
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className="rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  <span className="inline-flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {item.label}
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="mb-12 text-center text-4xl font-bold text-foreground">Connect With Us</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {channels.map((channel) => {
            const Icon = channel.icon
            return (
              <Link key={channel.title} href={channel.href} target="_blank" rel="noopener noreferrer">
                <div className="group flex h-full flex-col rounded-lg border border-border bg-card p-8 transition hover:border-accent/50 hover:shadow-lg">
                  <div className="space-y-4">
                    <Icon className={`h-12 w-12 ${channel.color}`} />
                    <div>
                      <h3 className="mb-2 text-2xl font-bold text-foreground transition group-hover:text-accent">
                        {channel.title}
                      </h3>
                      <p className="leading-relaxed text-muted-foreground">{channel.description}</p>
                    </div>
                  </div>
                  <div className="flex-1" />
                  <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                    <div>
                      <p className="text-lg font-bold text-accent">{channel.stat}</p>
                      <p className="text-xs text-muted-foreground">{channel.statLabel}</p>
                    </div>
                    <div className="flex items-center text-accent opacity-0 transition group-hover:opacity-100">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl rounded-lg bg-gradient-to-r from-accent/5 to-secondary/5 px-4 py-24">
        <h2 className="mb-12 text-center text-4xl font-bold text-foreground">Get Involved</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {highlights.map((highlight) => (
            <Link key={highlight.title} href={highlight.link}>
              <div className="group h-full cursor-pointer rounded-lg border border-border bg-background p-8 transition hover:border-accent/50">
                <h3 className="mb-2 text-lg font-semibold text-foreground transition group-hover:text-accent">
                  {highlight.title}
                </h3>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">{highlight.description}</p>
                <div className="flex items-center text-accent opacity-0 transition group-hover:opacity-100">
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-4">
          {[
            { label: "Community Members", value: "5,000+" },
            { label: "Active Contributors", value: "100+" },
            { label: "Publications", value: "24+" },
            { label: "Organizations", value: "50+" },
          ].map((stat) => (
            <div key={stat.label} className="space-y-2">
              <p className="text-4xl font-bold text-accent">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="rounded-lg bg-primary p-12 text-center text-primary-foreground space-y-6 md:p-16">
          <h2 className="text-4xl font-bold">Ready to Join?</h2>
          <p className="mx-auto max-w-2xl text-lg opacity-90">
            Start with the RCT community, then continue into whitepapers, documentation, and solution evaluation with the team.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/contact" className="gap-2">
                Get Started <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/whitepaper" className="gap-2">
                Read Whitepapers <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
