import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function MembersPage() {
  const members = [
    { name: "Sarah Anderson", title: "Product Manager", company: "TechCorp", joined: "Jan 2024" },
    { name: "Michael Chen", title: "Software Engineer", company: "StartupXYZ", joined: "Mar 2024" },
    { name: "Jessica Martinez", title: "Design Lead", company: "Creative Inc", joined: "Feb 2024" },
    { name: "David Kim", title: "Data Scientist", company: "Analytics Pro", joined: "Apr 2024" },
    { name: "Emma Wilson", title: "Marketing Director", company: "Brand Solutions", joined: "May 2024" },
    { name: "James Robinson", title: "CEO", company: "Innovation Labs", joined: "Jun 2024" },
    { name: "Lisa Zhang", title: "UX Researcher", company: "Design Systems", joined: "Jul 2024" },
    { name: "Robert Taylor", title: "DevOps Engineer", company: "Cloud Platforms", joined: "Aug 2024" },
  ]

  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground">
            YourBrand
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/community" className="text-sm text-foreground hover:text-foreground/80 transition">
              Community
            </Link>
            <Link href="/company" className="text-sm text-foreground hover:text-foreground/80 transition">
              Company
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/community">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Community Members</h1>
          <p className="text-lg text-foreground/70">Connect with thousands of professionals.</p>
        </div>
      </section>

      {/* Search */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <Input placeholder="Search members by name or title..." className="w-full" />
      </section>

      {/* Members Grid */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {members.map((member, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-border hover:border-foreground/50 hover:shadow-lg transition text-center cursor-pointer"
            >
              <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4"></div>
              <h3 className="font-bold text-foreground mb-1">{member.name}</h3>
              <p className="text-sm text-foreground/70 mb-2">{member.title}</p>
              <p className="text-xs text-foreground/60 mb-4">{member.company}</p>
              <p className="text-xs text-foreground/50">Joined {member.joined}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-12">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-foreground font-semibold">YourBrand © 2025</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/community" className="text-sm text-foreground/70 hover:text-foreground transition">
              Community
            </Link>
            <Link href="/company" className="text-sm text-foreground/70 hover:text-foreground transition">
              Company
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
