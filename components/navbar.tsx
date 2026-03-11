"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useState, useEffect } from "react"
import { Menu, X, Command } from "lucide-react"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) || 'en'

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
    { href: `/${locale}/platform`, label: locale === 'th' ? "แพลตฟอร์ม" : "Platform" },
    { href: `/${locale}/platform#infrastructure`, label: locale === 'th' ? "โครงสร้างพื้นฐาน" : "Infrastructure" },
    { href: `/${locale}/solutions`, label: locale === 'th' ? "โซลูชัน" : "Solutions" },
    { href: `/${locale}/research`, label: locale === 'th' ? "งานวิจัย" : "Research" },
    { href: `/${locale}/docs`, label: locale === 'th' ? "เอกสาร" : "Docs" },
    { href: `/${locale}/about`, label: locale === 'th' ? "เกี่ยวกับเรา" : "About" },
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
          href={`/${locale}`}
          className="flex items-center gap-2 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-sm"
        >
          <div className="text-xl font-bold tracking-tight text-foreground flex items-center gap-1.5">
            <span>RCT</span>
            <span className="text-sm font-medium text-muted-foreground">Labs</span>
          </div>
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
          
          {/* Language Switcher */}
          <LanguageSwitcher />
          
          {/* Primary CTA */}
          <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href={`/${locale}/docs`}>{locale === 'th' ? 'เริ่มต้นใช้งาน' : 'Initialize'}</Link>
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
          <div className="pt-3 mt-2 border-t border-border space-y-2">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm text-muted-foreground">{locale === 'th' ? 'ภาษา' : 'Language'}</span>
              <LanguageSwitcher />
            </div>
            <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground" size="sm">
              <Link href={`/${locale}/docs`} onClick={() => setIsOpen(false)}>{locale === 'th' ? 'เริ่มต้นใช้งาน' : 'Initialize'}</Link>
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
