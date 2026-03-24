"use client"

/*
 * KeyboardShortcutsDialog — Shows all keyboard shortcuts
 * Trigger: press "?" or "Ctrl+/" from anywhere in the app
 * Usage: <KeyboardShortcutsDialog /> anywhere in the layout
 */
import { useEffect, useState } from "react"
import { Keyboard, X } from "lucide-react"

interface Shortcut {
  keys: string[]
  description: string
  category: string
}

const SHORTCUTS: Shortcut[] = [
  // Global navigation
  { keys: ["?"], description: "Show keyboard shortcuts", category: "Navigation" },
  { keys: ["/"], description: "Open search", category: "Navigation" },
  { keys: ["g", "h"], description: "Go to Home", category: "Navigation" },
  { keys: ["g", "b"], description: "Go to Blog", category: "Navigation" },
  { keys: ["g", "p"], description: "Go to Protocols", category: "Navigation" },
  { keys: ["g", "d"], description: "Go to FDIA Demo", category: "Navigation" },
  // UI actions
  { keys: ["Esc"], description: "Close modal / Search", category: "Actions" },
  { keys: ["↑", "↓"], description: "Navigate search results", category: "Actions" },
  { keys: ["Enter"], description: "Open selected result", category: "Actions" },
]

const categories = [...new Set(SHORTCUTS.map((s) => s.category))]

interface KeyboardShortcutsDialogProps {
  /** Called when '/' is pressed so the parent can open Search */
  onOpenSearch?: () => void
}

export function KeyboardShortcutsDialog({ onOpenSearch }: KeyboardShortcutsDialogProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName
      const isInInput = tag === "INPUT" || tag === "TEXTAREA" || (e.target as HTMLElement).isContentEditable

      if (isInInput) return

      if (e.key === "?" && !e.ctrlKey && !e.metaKey) {
        e.preventDefault()
        setOpen((o) => !o)
        return
      }

      // "/" → open search (handled by parent)
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && onOpenSearch) {
        e.preventDefault()
        onOpenSearch()
        return
      }

      if (e.key === "Escape") {
        setOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [onOpenSearch])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => setOpen(false)}
      />

      {/* Dialog */}
      <div className="relative z-10 w-full max-w-lg rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-2">
            <Keyboard className="h-5 w-5 text-primary" />
            <span className="font-semibold text-foreground">Keyboard Shortcuts</span>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-lg p-1 text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Shortcut grid */}
        <div className="p-6 space-y-5 max-h-[60vh] overflow-y-auto">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {category}
              </h3>
              <div className="space-y-2">
                {SHORTCUTS.filter((s) => s.category === category).map((shortcut, i) => (
                  <div key={i} className="flex items-center justify-between gap-4">
                    <span className="text-sm text-foreground/80">{shortcut.description}</span>
                    <div className="flex shrink-0 items-center gap-1">
                      {shortcut.keys.map((key, ki) => (
                        <kbd
                          key={ki}
                          className="inline-flex items-center justify-center rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer hint */}
        <div className="border-t border-border px-6 py-3">
          <p className="text-xs text-muted-foreground text-center">
            Press <kbd className="inline-flex items-center rounded border border-border bg-muted px-1 py-0.5 font-mono text-xs">?</kbd> to toggle this dialog
          </p>
        </div>
      </div>
    </div>
  )
}

export default KeyboardShortcutsDialog
