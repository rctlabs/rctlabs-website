"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Users, Github, MessageCircle, ArrowRight } from "lucide-react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function CommunityPage() {
  const channels = [
    {
      icon: Github,
      title: "GitHub",
      description: "Open source repositories, code examples, and collaborative development",
      href: "https://github.com",
      stat: "1,000+",
      statLabel: "Stars",
      color: "text-foreground",
    },
    {
      icon: MessageCircle,
      title: "Discord",
      description: "Real-time chat, discussions, and community support",
      href: "#",
      stat: "5,000+",
      statLabel: "Members",
      color: "text-accent",
    },
    {
      icon: Users,
      title: "Forum",
      description: "Threaded discussions, Q&A, and knowledge sharing",
      href: "#",
      stat: "10K+",
      statLabel: "Discussions",
      color: "text-secondary",
    },
  ]

  const highlights = [
    {
      title: "Research Community",
      description: "Join researchers and academics pushing the frontier of intent-driven AI",
      link: "/philosophy",
    },
    {
      title: "Developer Community",
      description: "Build with RCT protocols and share your intent-driven applications",
      link: "/open-protocol",
    },
    {
      title: "Learning Hub",
      description: "Tutorials, guides, and courses on intent-driven design principles",
      link: "/blog",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
            Join the RCT Community
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Connect with researchers, developers, and visionaries building the future of intent-driven AI
          </p>
        </div>
      </section>

      {/* Community Channels */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Connect With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {channels.map((channel) => {
            const Icon = channel.icon
            return (
              <Link key={channel.title} href={channel.href} target="_blank" rel="noopener noreferrer">
                <div className="group h-full p-8 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg transition bg-card">
                  <div className="space-y-4 h-full flex flex-col">
                    <Icon className={`w-12 h-12 ${channel.color}`} />
                    <div>
                      <h3 className="text-2xl font-bold mb-2 text-foreground group-hover:text-accent transition">
                        {channel.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{channel.description}</p>
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <div>
                        <p className="text-lg font-bold text-accent">{channel.stat}</p>
                        <p className="text-xs text-muted-foreground">{channel.statLabel}</p>
                      </div>
                      <div className="flex items-center text-accent opacity-0 group-hover:opacity-100 transition">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Community Highlights */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg">
        <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Get Involved</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((highlight, i) => (
            <Link key={i} href={highlight.link}>
              <div className="group h-full p-8 rounded-lg border border-border hover:border-accent/50 transition bg-background cursor-pointer">
                <h3 className="text-lg font-semibold mb-2 text-foreground group-hover:text-accent transition">
                  {highlight.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{highlight.description}</p>
                <div className="flex items-center text-accent opacity-0 group-hover:opacity-100 transition">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "Community Members", value: "5,000+" },
            { label: "Active Contributors", value: "100+" },
            { label: "Publications", value: "24+" },
            { label: "Organizations", value: "50+" },
          ].map((stat, i) => (
            <div key={i} className="space-y-2">
              <p className="text-4xl font-bold text-accent">{stat.value}</p>
              <p className="text-muted-foreground text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-primary text-primary-foreground rounded-lg p-12 md:p-16 text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to Join?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Start your journey in the RCT community. Whether you're a researcher, developer, or curious about
            intent-driven AI, there's a place for you.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact" className="gap-2">
              Get Started <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
