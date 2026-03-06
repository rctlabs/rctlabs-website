import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ImpactPage() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Impact</h1>
            <p className="text-xl text-foreground/70">The positive change we create in the world</p>
          </div>

          <div className="space-y-8 text-foreground/80">
            <h2 className="text-2xl font-bold text-foreground">Empowering Teams</h2>
            <p>
              Our primary impact is enabling teams to work more effectively and efficiently. When teams have better
              tools and processes, they can focus on what matters most: creating value for their customers and achieving
              their goals.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Economic Growth</h2>
            <p>
              By reducing friction and eliminating barriers, we help businesses grow faster and create more jobs. Our
              customers report significant improvements in productivity and profitability.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Industry Leadership</h2>
            <p>
              We're raising standards across our industry. By demonstrating what's possible with great design,
              engineering, and customer service, we inspire others to improve as well.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Social Responsibility</h2>
            <p>
              We believe companies have a responsibility to give back. We contribute to communities through
              volunteering, donations, and pro bono services for nonprofits and social enterprises.
            </p>

            <h2 className="text-2xl font-bold text-foreground">Environmental Commitment</h2>
            <p>
              We're committed to minimizing our environmental impact. From carbon-neutral operations to sustainable
              practices, we take our responsibility to the planet seriously.
            </p>

            <div className="bg-primary text-primary-foreground p-8 rounded-lg space-y-4 mt-8">
              <h3 className="text-xl font-bold">Measuring Impact</h3>
              <p>
                We track our impact regularly and report transparently to stakeholders. Our goal is to ensure that every
                decision we make creates positive value for our customers, communities, and the world.
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
