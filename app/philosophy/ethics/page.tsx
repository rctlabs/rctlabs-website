import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function EthicsPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Ethics</h1>
            <p className="text-xl text-foreground/70">Our commitment to responsibility and integrity</p>
          </div>

          <div className="space-y-8 text-foreground/80">
            <h2 className="text-2xl font-bold text-foreground">Data Privacy & Security</h2>
            <p>
              We treat customer data as a sacred trust. We implement industry-leading security measures, are transparent
              about how we handle data, and give customers complete control over their information. We never sell
              customer data or use it for purposes other than providing our services.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Honest Practices</h2>
            <p>
              We conduct business with complete honesty. We don't engage in deceptive marketing, misrepresent our
              capabilities, or make promises we can't keep. When we make mistakes, we own them and fix them quickly.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Fair Pricing</h2>
            <p>
              We believe in fair pricing that reflects real value. We're transparent about our costs, offer flexible
              options for businesses of all sizes, and never engage in predatory pricing practices.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Inclusive Hiring</h2>
            <p>
              We're committed to building a diverse team that reflects the communities we serve. We believe diverse
              perspectives lead to better decisions and more innovative solutions. We actively work to eliminate bias in
              our hiring processes.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Responsible AI</h2>
            <p>
              As we incorporate AI and machine learning, we're committed to using these technologies responsibly. We're
              transparent about where AI is used, work to eliminate bias, and ensure our systems are safe and
              beneficial.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Regulatory Compliance</h2>
            <p>
              We exceed regulatory requirements across all jurisdictions where we operate. We stay ahead of emerging
              regulations and work proactively to ensure our practices meet or exceed the highest standards.
            </p>

            <div className="bg-primary text-primary-foreground p-8 rounded-lg space-y-4 mt-8">
              <h3 className="text-xl font-bold">Our Commitment</h3>
              <p>
                These ethical commitments aren't negotiable. They're core to who we are and how we operate. We welcome
                scrutiny and feedback, and we're always looking for ways to do better.
              </p>
            </div>
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
