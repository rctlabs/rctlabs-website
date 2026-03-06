import Link from "next/link"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-card/50 mt-16 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="text-lg font-bold text-foreground tracking-tight">RCT Labs</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enterprise AI Infrastructure for intent-driven intelligence.
            </p>
            <div className="flex gap-3 pt-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Platform</h4>
            <div className="space-y-2.5">
              <Link href="/platform" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                Overview
              </Link>
              <Link href="/platform#signedai" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                SignedAI
              </Link>
              <Link href="/platform#rctdb" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                RCTDB
              </Link>
              <Link href="/platform#studio" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                Specialist Studio
              </Link>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Solutions</h4>
            <div className="space-y-2.5">
              <Link href="/solutions" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                Enterprise
              </Link>
              <Link href="/solutions" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                Developers
              </Link>
              <Link href="/solutions" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                SMEs
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Resources</h4>
            <div className="space-y-2.5">
              <Link href="/docs" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                Documentation
              </Link>
              <Link href="/research" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                Research
              </Link>
              <Link href="/blog" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                Blog
              </Link>
              <Link href="/about" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                About
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">Legal</h4>
            <div className="space-y-2.5">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                Privacy
              </Link>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                Terms
              </Link>
              <Link href="/contact" className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                Contact
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} RCT Labs. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground font-mono">
            Designed by The Architect
          </p>
        </div>
      </div>
    </footer>
  )
}
