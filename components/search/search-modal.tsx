"use client"

/*
 * SearchModal — Global search modal with keyboard shortcut (Cmd/Ctrl+K)
 * Features fuzzy search, recent searches, and keyboard navigation
 * Migrated from manus-frontend-design: wouter Link → next/link (no nested <a>), router.push
 */
import { useEffect, useMemo, useRef, useState } from "react"
import { Search, X, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export interface SearchResult {
  title: string
  description?: string
  href: string
  category: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  searchData: SearchResult[]
}

export default function SearchModal({ isOpen, onClose, searchData }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const results = useMemo(() => {
    if (!query.trim()) return []
    return fuzzySearch(query, searchData).slice(0, 8)
  }, [query, searchData])

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus()
      const stored = localStorage.getItem("rct-recent-searches")
      if (stored) {
        const timer = setTimeout(() => {
          setRecentSearches(JSON.parse(stored))
        }, 0)
        return () => clearTimeout(timer)
      }
    } else {
      const timer = setTimeout(() => {
        setQuery("")
        setSelectedIndex(0)
      }, 0)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  useEffect(() => {
    const timer = setTimeout(() => {
      setSelectedIndex(0)
    }, 0)

    return () => clearTimeout(timer)
  }, [query])

  const saveRecentSearch = (search: string) => {
    const updated = [search, ...recentSearches.filter((s) => s !== search)].slice(0, 5)
    setRecentSearches(updated)
    localStorage.setItem("rct-recent-searches", JSON.stringify(updated))
  }

  const handleSelectResult = (result: SearchResult) => {
    saveRecentSearch(query)
    onClose()
    router.push(result.href)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex((prev) => Math.max(prev - 1, 0))
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelectResult(results[selectedIndex])
    } else if (e.key === "Escape") {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] px-4">
        <div
          className="w-full max-w-2xl bg-white/95 dark:bg-background/85 backdrop-blur-2xl border border-warm-light-gray dark:border-border rounded-2xl shadow-2xl overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Input */}
          <div className="flex items-center gap-3 p-4 border-b border-warm-light-gray dark:border-white/10">
            <Search size={20} className="text-warm-gray dark:text-white/60" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search documentation, pages, and more..."
              className="flex-1 bg-transparent text-warm-charcoal dark:text-white placeholder:text-warm-gray dark:placeholder:text-white/60 outline-none text-lg"
            />
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-warm-cream dark:hover:bg-white/5 transition-colors"
              aria-label="Close search"
            >
              <X size={20} className="text-warm-gray dark:text-white/60" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto">
            {query.trim() === "" && recentSearches.length > 0 && (
              <div className="p-4">
                <div className="flex items-center gap-2 mb-3 text-sm text-warm-gray dark:text-white/60">
                  <Clock size={14} />
                  <span>Recent Searches</span>
                </div>
                <div className="space-y-1">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => setQuery(search)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-warm-cream dark:hover:bg-white/5 text-warm-charcoal dark:text-white transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {query.trim() !== "" && results.length === 0 && (
              <div className="p-8 text-center text-warm-gray dark:text-white/60">
                No results found for &quot;{query}&quot;
              </div>
            )}

            {results.length > 0 && (
              <div className="p-2">
                {results.map((result, index) => (
                  <Link
                    key={index}
                    href={result.href}
                    onClick={() => handleSelectResult(result)}
                    className={`block p-3 rounded-lg transition-colors ${
                      index === selectedIndex
                        ? "bg-warm-cream dark:bg-white/5"
                        : "hover:bg-warm-cream dark:hover:bg-white/5"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-warm-amber/10 text-warm-amber">
                            {result.category}
                          </span>
                        </div>
                        <h4 className="font-semibold text-warm-charcoal dark:text-white mb-1">
                          {result.title}
                        </h4>
                        {result.description && (
                          <p className="text-sm text-warm-gray dark:text-white/60 line-clamp-1">
                            {result.description}
                          </p>
                        )}
                      </div>
                      <ArrowRight size={16} className="text-warm-gray dark:text-white/40 shrink-0 mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center gap-4 px-4 py-3 border-t border-warm-light-gray dark:border-white/10 text-xs text-warm-gray dark:text-white/60">
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 rounded bg-warm-cream dark:bg-white/5 border border-warm-light-gray dark:border-white/10">
                ↑↓
              </kbd>
              <span>Navigate</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 rounded bg-warm-cream dark:bg-white/5 border border-warm-light-gray dark:border-white/10">
                ↵
              </kbd>
              <span>Select</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-2 py-1 rounded bg-warm-cream dark:bg-white/5 border border-warm-light-gray dark:border-white/10">
                Esc
              </kbd>
              <span>Close</span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function fuzzySearch(query: string, data: SearchResult[]): SearchResult[] {
  const lowerQuery = query.toLowerCase()
  const words = lowerQuery.split(" ").filter(Boolean)

  return data
    .map((item) => {
      const titleLower = item.title.toLowerCase()
      const descLower = (item.description || "").toLowerCase()
      const categoryLower = item.category.toLowerCase()
      let score = 0

      if (titleLower === lowerQuery) score += 100
      else if (titleLower.startsWith(lowerQuery)) score += 50
      else if (titleLower.includes(lowerQuery)) score += 30

      words.forEach((word) => {
        if (titleLower.includes(word)) score += 10
        if (descLower.includes(word)) score += 5
        if (categoryLower.includes(word)) score += 3
      })

      return { item, score }
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item)
}

export function useSearchModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
  }
}
