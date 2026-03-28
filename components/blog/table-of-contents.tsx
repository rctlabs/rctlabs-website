"use client"

import { useEffect, useState } from "react"
import { List } from "lucide-react"

interface Heading {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  headings: Heading[]
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    )

    for (const heading of headings) {
      const el = document.getElementById(heading.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [headings])

  if (headings.length === 0) return null

  return (
    <>
      {/* Desktop sticky sidebar */}
      <nav className="sticky top-24 hidden lg:block" aria-label="Table of contents">
        <div className="flex items-center gap-2 mb-4">
          <List className="w-3.5 h-3.5 text-muted-foreground" />
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Contents</span>
        </div>
        <ul className="space-y-1.5">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-xs leading-snug transition-all duration-150 ${
                  h.level === 3 ? "pl-3" : ""
                } ${
                  activeId === h.id
                    ? "text-warm-amber font-semibold border-l-2 border-warm-amber pl-2"
                    : "text-muted-foreground hover:text-foreground border-l-2 border-transparent pl-2"
                }`}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(h.id)?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile collapsible */}
      <details
        className="lg:hidden mb-8 rounded-xl border border-white/10 bg-warm-charcoal/40"
        open={open}
        onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
      >
        <summary className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm font-medium text-muted-foreground">
          <List className="w-4 h-4" />
          Table of Contents
        </summary>
        <ul className="px-4 pb-4 space-y-2 border-t border-white/8 pt-3">
          {headings.map((h) => (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                className={`block text-sm leading-snug text-muted-foreground hover:text-foreground transition-colors ${
                  h.level === 3 ? "pl-4" : ""
                }`}
                onClick={() => setOpen(false)}
              >
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      </details>
    </>
  )
}
