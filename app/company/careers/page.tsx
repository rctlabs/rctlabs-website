import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { MapPin, Briefcase, Users, Target, Zap } from "lucide-react"

export default function CareersPage() {
  const jobs = [
    {
      title: "Senior ML Researcher",
      department: "Research",
      location: "Remote",
      type: "Full-time",
      description: "Lead research on intent-driven AI systems and FDIA formula applications",
    },
    {
      title: "Full Stack Engineer",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Build scalable backend services and frontend interfaces for Intent OS",
    },
    {
      title: "Protocol Architect",
      department: "Engineering",
      location: "Remote",
      type: "Full-time",
      description: "Design and implement the RCT open protocol specification",
    },
    {
      title: "Design Manager",
      department: "Design",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Lead design vision for intent-driven user experiences",
    },
    {
      title: "Developer Relations Manager",
      department: "Community",
      location: "Remote",
      type: "Full-time",
      description: "Build relationships with developers and open source community",
    },
    {
      title: "Data Scientist",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      description: "Analyze intent patterns and optimize system performance",
    },
  ]

  const values = [
    { icon: Target, title: "Mission-Driven", desc: "Every role directly contributes to our mission" },
    { icon: Users, title: "Collaborative", desc: "Work alongside brilliant minds across disciplines" },
    { icon: Zap, title: "Impact-Focused", desc: "Your work shapes the future of AI" },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-8 text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">Join Our Team</h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Help us build the future of intent-driven AI at RCT Labs
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {values.map((value, i) => {
            const Icon = value.icon
            return (
              <div key={i} className="text-center space-y-4">
                <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto">
                  <Icon className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{value.title}</h3>
                <p className="text-muted-foreground">{value.desc}</p>
              </div>
            )
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24">
        <h2 className="text-4xl font-bold text-foreground mb-12">Open Positions</h2>
        <div className="space-y-4">
          {jobs.map((job, i) => (
            <div
              key={i}
              className="group p-6 rounded-lg border border-border hover:border-accent/50 hover:shadow-lg hover:bg-card/50 transition cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <h3 className="text-xl font-bold text-foreground group-hover:text-accent transition">{job.title}</h3>
                  <p className="text-muted-foreground text-sm">{job.description}</p>
                  <div className="flex flex-wrap gap-3 pt-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-accent" />
                      {job.department}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-accent" />
                      {job.location}
                    </div>
                    <span className="px-2 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                      {job.type}
                    </span>
                  </div>
                </div>
                <Button variant="default" className="flex-shrink-0">
                  Apply Now
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 bg-gradient-to-r from-accent/5 to-secondary/5 rounded-lg">
        <h2 className="text-4xl font-bold text-foreground mb-12">Why Join RCT Labs?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            { title: "Competitive Compensation", desc: "Market-leading salary and equity packages" },
            { title: "Remote Flexibility", desc: "Work from anywhere with flexible hours" },
            { title: "Learning & Development", desc: "Budget for conferences, courses, and growth" },
            { title: "Health & Wellness", desc: "Comprehensive benefits including mental health support" },
            { title: "Inclusive Culture", desc: "Diverse team committed to belonging" },
            { title: "Impact", desc: "Work on problems that matter globally" },
          ].map((benefit, i) => (
            <div key={i} className="space-y-2">
              <h3 className="text-lg font-semibold text-foreground">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="bg-primary text-primary-foreground rounded-lg p-12 md:p-16 text-center space-y-6">
          <h2 className="text-4xl font-bold">Don't see your role?</h2>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            We're always looking for talented people to join our mission. Send us your resume and let's talk!
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </main>
  )
}
