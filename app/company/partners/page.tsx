import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function PartnersPage() {
  const partnerTypes = [
    {
      title: "Technology Partners",
      description: "Integrations and partnerships with leading technology providers.",
      partners: ["Salesforce", "Slack", "Microsoft Teams", "Google Workspace"],
    },
    {
      title: "Reseller Partners",
      description: "Global network of certified resellers bringing our solutions to market.",
      partners: ["Partner One", "Partner Two", "Partner Three", "Partner Four"],
    },
    {
      title: "Consulting Partners",
      description: "Expert consulting firms helping organizations implement our solutions.",
      partners: ["Deloitte", "Accenture", "McKinsey", "BCG"],
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
            <Link href="/company" className="text-sm text-foreground hover:text-foreground/80 transition">
              Company
            </Link>
          </div>
        </div>
      </nav>

      {/* Header */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/company">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Link>
        </Button>

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">Partners</h1>
          <p className="text-lg text-foreground/70 max-w-2xl">Join our ecosystem and grow together.</p>
        </div>
      </section>

      {/* Partner Types */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="space-y-12">
          {partnerTypes.map((type, i) => (
            <div key={i}>
              <h2 className="text-2xl font-bold text-foreground mb-3">{type.title}</h2>
              <p className="text-foreground/70 mb-6">{type.description}</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {type.partners.map((partner, j) => (
                  <div key={j} className="p-4 rounded-lg border border-border text-center bg-muted/50">
                    <p className="text-foreground font-medium">{partner}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 py-24">
        <div className="bg-primary text-primary-foreground rounded-lg p-12 text-center space-y-4">
          <h2 className="text-3xl font-bold">Interested in Partnership?</h2>
          <p className="text-lg opacity-90">Let's explore how we can work together.</p>
          <Button size="lg" variant="secondary">
            Contact Our Partners Team
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-24 py-12">
        <div className="mx-auto max-w-6xl px-4 flex flex-col md:flex-row justify-between items-center">
          <div className="text-foreground font-semibold">YourBrand © 2025</div>
        </div>
      </footer>
    </main>
  )
}
