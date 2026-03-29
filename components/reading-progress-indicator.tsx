"use client"

/*
 * ReadingProgressIndicator — Horizontal progress bar at top of page
 * Shows reading progress based on scroll position
 * Migrated from manus-frontend-design: ThemeContext → next-themes
 */
import { useState, useEffect } from "react"
import { motion, useScroll, useSpring } from "framer-motion"
import { useTheme } from "@/components/theme-provider"

export default function ReadingProgressIndicator() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })
  const { resolvedTheme } = useTheme()
  const [isVisible, setIsVisible] = useState(false)
  const isDark = resolvedTheme === "dark"

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest: number) => {
      setIsVisible(latest > 0.05)
    })
    return () => unsubscribe()
  }, [scrollYProgress])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-49 h-1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className={`h-full origin-left ${
          isDark
            ? "bg-linear-to-r from-warm-amber via-[#C49A48] to-warm-amber"
            : "bg-linear-to-r from-warm-charcoal via-dark-border-subtle to-warm-charcoal"
        }`}
        style={{ scaleX }}
      />
    </motion.div>
  )
}
