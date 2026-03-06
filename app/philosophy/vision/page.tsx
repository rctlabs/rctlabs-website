import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function VisionPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Vision</h1>
            <p className="text-xl text-foreground/70">Where we are headed and what we aspire to build</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6 text-foreground/80">
            <p>
              Our vision is to create a world where technology empowers every organization to achieve extraordinary
              things. We imagine a future where innovation is accessible to all, regardless of size or resources.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">The Future We're Building</h2>
            <p>We see a world where:</p>
            <ul className="space-y-3 ml-6">
              <li>Barriers to success are eliminated through intelligent solutions</li>
              <li>Teams collaborate seamlessly across any distance</li>
              <li>Data-driven insights guide every decision</li>
              <li>Technology serves humanity, not the other way around</li>
              <li>Innovation creates positive impact for everyone</li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Commitment</h2>
            <p>
              We're committed to realizing this vision through continuous innovation, exceptional service, and an
              unwavering focus on our customers' success. Every product we build, every feature we launch, and every
              decision we make is guided by this vision.
            </p>

            <p>
              Together with our community, partners, and customers, we're not just imagining the future—we're actively
              building it, one solution at a time.
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
