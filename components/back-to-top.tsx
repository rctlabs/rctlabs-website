"use client"

/*
 * BackToTop — Floating scroll-to-top button
 * Position: stacked above FloatingAI button (bottom-20/bottom-24)
 * Hides when AI chat panel is open (custom event)
 * Migrated from manus-frontend-design: ThemeContext → next-themes
 */
import { useState, useEffect } from "react"
import { m, AnimatePresence } from "framer-motion"
import { ArrowUp } from "lucide-react"
import { useTheme } from "@/components/theme-provider"

type AIChatToggleEvent = CustomEvent<{ open?: boolean }>

export default function BackToTop() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [visible, setVisible] = useState(false)
  const [aiChatOpen, setAiChatOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const handler = (event: Event) => {
      const customEvent = event as AIChatToggleEvent
      setAiChatOpen(Boolean(customEvent.detail?.open))
    }

    window.addEventListener("rct-ai-chat-toggle", handler)
    return () => window.removeEventListener("rct-ai-chat-toggle", handler)
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <AnimatePresence>
      {visible && !aiChatOpen && (
        <m.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className={`fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-40 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-200 group ${
            isDark
              ? "bg-dark-border border border-dark-border-hard text-warm-muted hover:bg-dark-border-subtle hover:text-warm-light-gray hover:border-warm-sage/50"
              : "bg-white border border-warm-light-gray text-warm-gray hover:bg-warm-sage hover:text-white hover:border-warm-sage hover:shadow-xl"
          }`}
        >
          <ArrowUp size={16} className="transition-transform group-hover:-translate-y-0.5" />
        </m.button>
      )}
    </AnimatePresence>
  )
}
