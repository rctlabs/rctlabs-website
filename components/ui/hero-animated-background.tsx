"use client"

/**
 * HeroAnimatedBackground
 *
 * 5-layer animated background built entirely with GPU-composited properties
 * (transform + opacity only) to avoid layout reflow and paint.
 *
 * Layers:
 *   1. Dot-grid  — static radial-gradient pattern
 *   2. Amber orb — animated scale + opacity, top-left
 *   3. Sage orb  — animated scale + opacity, bottom-right (offset timing)
 *   4. Node dots — 6 pulse dots at fixed positions, staggered opacity
 *   5. Parallax  — mouse-driven subtle layer shift
 *
 * Props:
 *   variant="hero"   → position: absolute, full section, high intensity
 *   variant="global" → position: fixed, full viewport, low intensity (Round 2)
 */

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useRef, useState } from "react"

// ── Node pulse dot positions (% of container) ──────────────────────────────

const NODE_DOTS = [
  { x: 15, y: 25, dur: 2.4, delay: 0 },
  { x: 42, y: 68, dur: 3.1, delay: 0.8 },
  { x: 72, y: 18, dur: 2.8, delay: 1.4 },
  { x: 85, y: 55, dur: 3.5, delay: 0.3 },
  { x: 28, y: 82, dur: 2.2, delay: 1.9 },
  { x: 60, y: 40, dur: 3.8, delay: 0.6 },
] as const

// ── Adaptive blur ──────────────────────────────────────────────────────────

function getBlurRadius(variant: "hero" | "global"): { big: number; small: number } {
  if (typeof navigator === "undefined") {
    return variant === "global" ? { big: 64, small: 48 } : { big: 88, small: 72 }
  }
  const isLowEnd = navigator.hardwareConcurrency <= 4
  if (variant === "global") {
    return isLowEnd ? { big: 32, small: 24 } : { big: 64, small: 48 }
  }
  return isLowEnd ? { big: 44, small: 36 } : { big: 88, small: 72 }
}

// ── Types ──────────────────────────────────────────────────────────────────

interface HeroAnimatedBackgroundProps {
  variant?: "hero" | "global"
}

// ── Component ──────────────────────────────────────────────────────────────

export default function HeroAnimatedBackground({
  variant = "hero",
}: HeroAnimatedBackgroundProps) {
  const prefersReducedMotion = useReducedMotion()
  const [blur, setBlur] = useState<{ big: number; small: number } | null>(null)
  const parallaxRef = useRef<HTMLDivElement>(null)
  const parallaxPos = useRef({ x: 0, y: 0 })
  const rafRef = useRef<number | null>(null)

  // Resolve adaptive blur on client only (avoids SSR mismatch)
  useEffect(() => {
    setBlur(getBlurRadius(variant))
  }, [variant])

  // Mouse parallax — only for hero variant, only when motion allowed
  useEffect(() => {
    if (variant !== "hero" || prefersReducedMotion) return
    const FACTOR = 0.018

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2
      const cy = window.innerHeight / 2
      const tx = (e.clientX - cx) * FACTOR
      const ty = (e.clientY - cy) * FACTOR

      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        parallaxPos.current = { x: tx, y: ty }
        if (parallaxRef.current) {
          parallaxRef.current.style.transform = `translate(${tx}px, ${ty}px)`
        }
      })
    }

    window.addEventListener("mousemove", onMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", onMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [variant, prefersReducedMotion])

  const isGlobal = variant === "global"

  // Config per variant
  const orbOpacity = isGlobal ? 0.025 : 0.06
  const nodeOpacityMin = isGlobal ? 0.015 : 0.04
  const nodeOpacityMax = isGlobal ? 0.05 : 0.14
  const orbSizeBig = isGlobal ? "h-64 w-64" : "h-104 w-104"
  const orbSizeSmall = isGlobal ? "h-48 w-48" : "h-84 w-84"
  const gridOpacity = isGlobal ? 0.04 : 0.06

  const wrapperClass = isGlobal
    ? "fixed inset-0 z-0 pointer-events-none overflow-hidden"
    : "absolute inset-0 pointer-events-none overflow-hidden"

  return (
    <div className={wrapperClass} aria-hidden="true">
      {/* ── Layer 1: Dot-grid ─────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #D4A853 0.5px, transparent 0.5px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Layer 2: Amber orb ────────────────────────────────────── */}
      {blur && (
        <motion.div
          className={`absolute top-20 -left-32 ${orbSizeBig} rounded-full bg-warm-amber`}
          style={{ filter: `blur(${blur.big}px)` }}
          animate={
            prefersReducedMotion
              ? { opacity: orbOpacity }
              : {
                  scale: [1, 1.18, 1],
                  opacity: [orbOpacity, orbOpacity * 1.6, orbOpacity],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* ── Layer 3: Sage orb ─────────────────────────────────────── */}
      {blur && (
        <motion.div
          className={`absolute bottom-20 -right-28 ${orbSizeSmall} rounded-full bg-warm-sage`}
          style={{ filter: `blur(${blur.small}px)` }}
          animate={
            prefersReducedMotion
              ? { opacity: orbOpacity * 0.85 }
              : {
                  scale: [1, 1.14, 1],
                  opacity: [
                    orbOpacity * 0.85,
                    orbOpacity * 1.4,
                    orbOpacity * 0.85,
                  ],
                }
          }
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      )}

      {/* ── Layer 4: Node pulse dots ──────────────────────────────── */}
      {!isGlobal &&
        NODE_DOTS.map((dot, i) => (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-warm-amber"
            style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
            animate={
              prefersReducedMotion
                ? { opacity: nodeOpacityMin }
                : {
                    opacity: [nodeOpacityMin, nodeOpacityMax, nodeOpacityMin],
                    scale: [1, 1.5, 1],
                  }
            }
            transition={{
              duration: dot.dur,
              repeat: Infinity,
              ease: "easeInOut",
              delay: dot.delay,
            }}
          />
        ))}

      {/* ── Layer 5: Parallax container (hero only) ───────────────── */}
      {!isGlobal && (
        <div
          ref={parallaxRef}
          className="absolute inset-0 will-change-transform"
          style={{ transform: "translate(0px, 0px)" }}
        >
          {/* Subtle parallax accent orb */}
          <div
            className="absolute top-1/2 left-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-warm-amber"
            style={{ opacity: 0.015, filter: "blur(48px)" }}
          />
        </div>
      )}
    </div>
  )
}
