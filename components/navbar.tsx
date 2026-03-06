"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { Menu, X, Command } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown)
    }
    
    window.addEventListener("scroll", handleScroll)
    
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isOpen])

  const links = [
    { href: "/platform", label: "Platform" },
    { href: "/solutions", label: "Solutions" },
    { href: "/research", label: "Research" },
    { href: "/docs", label: "Docs" },
    { href: "/about", label: "About" },
  ]

  return (
    <nav 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "border-b border-border glass" 
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          <div className="text-xl font-bold tracking-tight text-foreground">RCT</div>
          <span className="text-sm font-medium text-muted-foreground">Labs</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 rounded-md transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side Actions */}
        <div className="hidden md:flex items-center gap-3">
          {/* Search Hint */}
          <button className="flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-md border border-border hover:border-accent/50 transition-colors">
            <Command className="w-3 h-3" />
            <span>K</span>
          </button>
          
          {/* Primary CTA */}
          <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/docs">Initialize</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 hover:bg-secondary rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          aria-controls="mobile-nav"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="md:hidden border-t border-border glass py-4 px-4 flex flex-col gap-1"
          role="navigation"
          aria-label="Mobile navigation"
        >
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground hover:bg-secondary px-3 py-2.5 rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3 mt-2 border-t border-border">
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="sm">
              <Link href="/docs" onClick={() => setIsOpen(false)}>Initialize</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
