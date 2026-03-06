import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MessageSquare, ArrowLeft, TrendingUp } from "lucide-react"

export default function ForumsPage() {
  const topics = [
    {
      title: "Best practices for remote team management",
      category: "Best Practices",
      posts: 234,
      replies: 1203,
      lastActivity: "2 hours ago",
    },
    {
      title: "Implementing AI tools in your workflow",
      category: "Technology",
      posts: 156,
      replies: 892,
      lastActivity: "4 hours ago",
    },
    {
      title: "Building a strong company culture",
      category: "Culture",
      posts: 189,
      replies: 945,
      lastActivity: "1 hour ago",
    },
    {
      title: "Scaling your startup efficiently",
      category: "Growth",
      posts: 203,
      replies: 1056,
      lastActivity: "3 hours ago",
    },
    {
      title: "Data privacy and security concerns",
      category: "Security",
      posts: 142,
      replies: 678,
      lastActivity: "5 hours ago",
    },
    {
      title: "Career development and upskilling",
      category: "Career",
      posts: 178,
      replies: 834,
      lastActivity: "30 min ago",
    },
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

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Community Forums</h1>
            <p className="text-lg text-foreground/70">Join discussions and share knowledge with community members.</p>
          </div>
          <Button asChild>
            <Link href="/contact">Start a Topic</Link>
          </Button>
        </div>
      </section>

      {/* Topics List */}
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="space-y-3">
          {topics.map((topic, i) => (
            <div
              key={i}
              className="p-6 rounded-lg border border-border hover:border-foreground/50 hover:shadow-lg transition cursor-pointer"
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-primary" />
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-muted text-foreground">
                      {topic.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{topic.title}</h3>
                  <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                    <span>{topic.posts} posts</span>
                    <span>{topic.replies} replies</span>
                    <span>Last activity: {topic.lastActivity}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-foreground/70">
                  <TrendingUp className="w-4 h-4" />
                  <span className="text-sm font-medium">Popular</span>
                </div>
              </div>
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
