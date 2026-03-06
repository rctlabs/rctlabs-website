import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function ValuesPage() {
  const values = [
    {
      title: "Innovation",
      description: "We constantly challenge the status quo and seek better solutions to complex problems.",
    },
    {
      title: "Integrity",
      description: "We operate with honesty, transparency, and strong ethical principles in all dealings.",
    },
    {
      title: "Impact",
      description: "We measure success by the positive difference we create for our customers and society.",
    },
    {
      title: "Inclusion",
      description: "We celebrate diversity and believe different perspectives lead to better ideas.",
    },
    {
      title: "Excellence",
      description: "We pursue excellence in everything we do, from product quality to customer service.",
    },
    {
      title: "Collaboration",
      description: "We achieve more together, valuing teamwork and open communication across all levels.",
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

        <article className="space-y-12">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Our Values</h1>
            <p className="text-xl text-foreground/70">The principles that guide every decision we make</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, i) => (
              <div key={i} className="p-6 rounded-lg border border-border">
                <h3 className="text-xl font-bold text-foreground mb-3">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary text-primary-foreground p-8 rounded-lg space-y-4">
            <h2 className="text-2xl font-bold">Living Our Values</h2>
            <p>
              These values aren't just words on a wall. They're embedded in our culture, reflected in our decisions, and
              evident in how we interact with customers, partners, and each other. We hold ourselves accountable to
              these principles every single day.
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
