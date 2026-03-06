import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background flex flex-col">
      <Navbar />

      <section className="flex-1 mx-auto max-w-7xl px-4 py-24 flex flex-col justify-center items-center text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-9xl md:text-[120px] font-bold text-accent/20">404</h1>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">Page Not Found</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="/" className="gap-2">
              Back to Home <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Contact Support</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t border-border w-full">
          {[
            { title: "Philosophy", href: "/philosophy" },
            { title: "Research", href: "/research" },
            { title: "Community", href: "/community" },
          ].map((link, i) => (
            <Link key={i} href={link.href} className="text-accent hover:text-accent/80 transition font-semibold">
              {link.title}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  )
}
