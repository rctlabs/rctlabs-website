"use client"

/**
 * HeroAnimatedBackground
 *
 * Enterprise hero background built with restrained structural layers.
 * Motion is limited to slow signal sweeps so the background supports
 * the content hierarchy instead of competing with it.
 *
 * Layers:
 *   1. Field wash      — low-contrast radial/linear atmosphere
 *   2. Structural grid — restrained matrix pattern
 *   3. Guide rails     — architectural lines that anchor the layout
 *   4. Signal sweeps   — slow directional motion on hero only
 *   5. Anchor nodes    — sparse fixed points that suggest topology
 *
 * Props:
 *   variant="hero"   → position: absolute, z-[2], high intensity
 *   variant="global" → position: fixed, z-[1], low intensity
 */

import { motion, useReducedMotion } from "framer-motion"
import { useEffect, useMemo, useState } from "react"
import { useMainPageOrchestration } from "@/components/main-page/main-page-orchestrator"

// ── Sparse structural anchor points (% of container) ───────────────────────

const ANCHOR_NODES = [
  { x: 18, y: 28, delay: 0.18 },
  { x: 34, y: 46, delay: 0.26 },
  { x: 58, y: 32, delay: 0.34 },
  { x: 76, y: 58, delay: 0.42 },
] as const

const GUIDE_RAILS = [
  { top: "24%", left: "12%", width: "36%" },
  { top: "38%", left: "46%", width: "22%" },
  { top: "61%", left: "38%", width: "30%" },
] as const

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

// ── Adaptive soft-glow sizing ──────────────────────────────────────────────

function getGlowRadius(variant: "hero" | "global", isLowEnd: boolean): { beam: number; node: number } {
  if (variant === "global") {
    return isLowEnd ? { beam: 28, node: 10 } : { beam: 42, node: 14 }
  }
  return isLowEnd ? { beam: 38, node: 14 } : { beam: 58, node: 18 }
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
  const orchestration = useMainPageOrchestration()
  const [hasMounted, setHasMounted] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  useEffect(() => {
    setHasMounted(true)
    setIsLowEndDevice((navigator.hardwareConcurrency || 8) <= 4)
  }, [])

  const glow = useMemo(() => getGlowRadius(variant, isLowEndDevice), [isLowEndDevice, variant])
  const resolvedReducedMotion = hasMounted ? (prefersReducedMotion ?? false) : false

  const isGlobal = variant === "global"
  const isTouchInput = orchestration?.isTouchInput ?? false
  const hasMinimalMotion = resolvedReducedMotion || isTouchInput
  const pageProgress = orchestration?.pageProgress ?? 0
  const scrollVelocity = orchestration?.scrollVelocity ?? 0
  const heroPresence = clamp(1.08 - pageProgress * 0.42, 0.66, 1.08)
  const sectionBias = orchestration && !isGlobal
    ? orchestration.activeSection === "hero"
      ? 0.06
      : orchestration.activeSection === "overview"
        ? 0.02
        : orchestration.activeSection === "fdia"
          ? -0.02
          : -0.05
    : 0
  const contextIntensity = isGlobal
    ? 1
    : clamp(heroPresence + sectionBias, 0.62, 1.12)
  const densityScale = isTouchInput ? 0.7 : 1
  const pointerInfluence = clamp(1 - scrollVelocity * 1.8, 0.35, 1)
  const fieldOpacity = isGlobal
    ? `calc(var(--rct-global-field-opacity) * ${densityScale.toFixed(3)})`
    : `calc(var(--rct-hero-field-opacity) * ${(contextIntensity * densityScale).toFixed(3)})`
  const gridOpacity = isGlobal
    ? `calc(var(--rct-global-grid-opacity) * ${densityScale.toFixed(3)})`
    : `calc(var(--rct-hero-grid-opacity) * ${(contextIntensity * densityScale).toFixed(3)})`
  const railOpacity = isGlobal
    ? `calc(var(--rct-global-rail-opacity) * ${densityScale.toFixed(3)})`
    : `calc(var(--rct-hero-rail-opacity) * ${((contextIntensity + 0.08) * densityScale).toFixed(3)})`
  const nodeOpacity = isGlobal
    ? `calc(var(--rct-global-node-opacity) * ${densityScale.toFixed(3)})`
    : `calc(var(--rct-hero-node-opacity) * ${((contextIntensity + 0.05) * densityScale).toFixed(3)})`
  const wrapperClass = isGlobal
    ? "fixed inset-0 z-[1] pointer-events-none overflow-hidden"
    : "absolute inset-0 z-[2] pointer-events-none overflow-hidden"
  const visibleNodes = isGlobal ? ANCHOR_NODES.slice(0, 2) : hasMinimalMotion ? ANCHOR_NODES.slice(0, 2) : ANCHOR_NODES
  const renderedRails = hasMinimalMotion ? GUIDE_RAILS.slice(0, 2) : GUIDE_RAILS
  const pointerShiftX = orchestration && !isGlobal && !hasMinimalMotion
    ? orchestration.pointerIntent.x * 6 * pointerInfluence
    : 0
  const pointerShiftY = orchestration && !isGlobal && !hasMinimalMotion
    ? orchestration.pointerIntent.y * 4.5 * pointerInfluence
    : 0

  return (
    <motion.div
      className={wrapperClass}
      aria-hidden="true"
      animate={{ x: pointerShiftX, y: pointerShiftY }}
      transition={{ type: "spring", stiffness: 44, damping: 26, mass: 1.1 }}
    >
      {/* ── Layer 1: Field wash ────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          opacity: fieldOpacity,
          backgroundImage: "var(--rct-hero-field-wash)",
        }}
      />

      {/* ── Layer 2: Structural grid ──────────────────────────────── */}
      <div
        className="absolute inset-0 mask-[radial-gradient(circle_at_center,black_62%,transparent_100%)]"
        style={{
          opacity: gridOpacity,
          backgroundImage: "var(--rct-hero-grid-lines)",
          backgroundSize: isGlobal ? "96px 96px" : hasMinimalMotion ? "88px 88px" : "82px 82px",
        }}
      />

      {/* ── Layer 3: Guide rails + beam wash ─────────────────────── */}
      {renderedRails.map((rail, index) => (
        <div
          key={`${rail.left}-${rail.top}`}
          className="absolute overflow-hidden rounded-full"
          style={{
            top: rail.top,
            left: rail.left,
            width: rail.width,
            height: isGlobal ? "1px" : "1.5px",
            opacity: railOpacity,
          }}
        >
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "var(--rct-hero-guide-rail)" }}
          />
          <div
            className="absolute -inset-y-1.25 left-[20%] right-[35%] rounded-full bg-warm-amber/40"
            style={{ filter: `blur(${glow.beam}px)` }}
          />
          {!isGlobal && !hasMinimalMotion && (
            <motion.div
              className="absolute -inset-y-px w-18"
              style={{ backgroundImage: "var(--rct-hero-signal-trace)" }}
              initial={{ x: "-140%", opacity: 0 }}
              animate={
                resolvedReducedMotion
                  ? { opacity: 0 }
                  : { x: ["-140%", "260%"], opacity: [0, 0.5, 0.18, 0] }
              }
              transition={{
                duration: index === 0 ? 18 : index === 1 ? 22 : 24,
                repeat: Infinity,
                ease: "linear",
                delay: 1.2 + index * 2.1,
              }}
            />
          )}
        </div>
      ))}

      <motion.div
        className="absolute top-[16%] left-[21%] h-[52%] w-px"
        style={{ backgroundImage: "var(--rct-hero-vertical-guide)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isGlobal ? 0.18 : hasMinimalMotion ? 0.18 : 0.3 }}
        transition={{ duration: 1.4, delay: 0.15 }}
      />

      <motion.div
        className="absolute top-[54%] left-[52%] h-px w-[22%]"
        style={{ backgroundImage: "var(--rct-hero-horizontal-guide)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isGlobal ? 0.12 : hasMinimalMotion ? 0.1 : 0.24 }}
        transition={{ duration: 1.4, delay: 0.24 }}
      />

      {/* ── Layer 4: Anchor nodes ─────────────────────────────────── */}
      {visibleNodes.map((node, index) => (
        <motion.div
          key={`${node.x}-${node.y}`}
          className="absolute"
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: nodeOpacity, scale: 1 }}
          transition={{ duration: 0.8, delay: node.delay + index * 0.08 }}
        >
          <div
            className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-warm-amber/25"
            style={{ filter: `blur(${glow.node}px)` }}
          />
          <div
            className="relative h-2.5 w-2.5 rounded-full border border-white/40 bg-warm-amber/90"
            style={{ boxShadow: "var(--rct-hero-anchor-shadow)" }}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}
