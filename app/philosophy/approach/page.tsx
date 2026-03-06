import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ApproachPage() {
  return (
    <main className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground">
            YourBrand
          </Link>
          <div className="flex gap-8 items-center">
            <Link href="/about" className="text-sm text-foreground hover:text-foreground/80 transition">
              About
            </Link>
            <Link href="/philosophy" className="text-sm text-foreground hover:text-foreground/80 transition">
              Philosophy
            </Link>
            <Link href="/contact" className="text-sm text-foreground hover:text-foreground/80 transition">
              Contact
            </Link>
          </div>
        </div>
      </nav>

      {/* Content */}
      <section className="mx-auto max-w-4xl px-4 py-24">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/philosophy">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>

        <article className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Approach</h1>
            <p className="text-xl text-foreground/70">How we solve problems and serve our customers</p>
          </div>

          <div className="space-y-6 text-foreground/80">
            <h2 className="text-2xl font-bold text-foreground">Customer-Centric Design</h2>
            <p>
              Everything starts with understanding our customers. We invest time in listening, learning their
              challenges, and deeply understanding their needs before we build anything.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Iterative Development</h2>
            <p>
              We don't try to get everything perfect on day one. Instead, we build, measure, learn, and iterate
              continuously. This approach allows us to adapt quickly and incorporate feedback in real-time.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Technical Excellence</h2>
            <p>
              We maintain high standards for code quality, performance, and security. Our technical foundation is
              robust, allowing us to scale confidently as our business grows.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Transparency & Communication</h2>
            <p>
              We believe in open communication with our customers. We share our roadmaps, discuss challenges openly, and
              keep everyone informed about where we're headed.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Data-Driven Decisions</h2>
            <p>
              We use data to guide our decisions while maintaining our human-centered perspective. Metrics help us
              understand impact, but we never lose sight of the qualitative insights that reveal true needs.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Sustainable Growth</h2>
            <p>
              We focus on building a sustainable business that can serve our customers for the long term. We avoid
              shortcuts and make decisions with a multi-year perspective.
            </p>
          </div>
        </article>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-12">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-foreground font-semibold">YourBrand © 2025</div>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/about" className="text-sm text-foreground/70 hover:text-foreground transition">
              About
            </Link>
            <Link href="/philosophy" className="text-sm text-foreground/70 hover:text-foreground transition">
              Philosophy
            </Link>
            <Link href="/contact" className="text-sm text-foreground/70 hover:text-foreground transition">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </main>
  )
}
