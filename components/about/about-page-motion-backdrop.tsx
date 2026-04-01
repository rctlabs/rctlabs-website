"use client"

import { motion, useReducedMotion } from "framer-motion"

export function AboutPageMotionBackdrop() {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return null
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute left-[8%] top-64 h-96 w-96 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(212,168,83,0.12), rgba(212,168,83,0.02) 58%, transparent 78%)", filter: "blur(72px)" }}
        animate={{ x: [0, 22, -12, 0], y: [0, -20, 14, 0], scale: [1, 1.05, 0.98, 1] }}
        transition={{ duration: 26, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[6%] top-112 h-104 w-104 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(123,158,135,0.12), rgba(123,158,135,0.02) 60%, transparent 80%)", filter: "blur(78px)" }}
        animate={{ x: [0, -24, 10, 0], y: [0, 18, -16, 0], scale: [1, 0.97, 1.04, 1] }}
        transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-[34%] top-208 h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(137,180,200,0.1), rgba(137,180,200,0.015) 56%, transparent 78%)", filter: "blur(70px)" }}
        animate={{ x: [0, 16, -14, 0], y: [0, -14, 10, 0], scale: [1, 1.03, 0.98, 1] }}
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -left-24 top-104 h-px w-160"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,168,83,0.22), transparent)" }}
        animate={{ rotate: [12, 15, 10, 12], opacity: [0.4, 0.7, 0.45, 0.4], x: [0, 12, -8, 0] }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-28 top-232 h-px w-176"
        style={{ background: "linear-gradient(90deg, transparent, rgba(196,116,91,0.18), transparent)" }}
        animate={{ rotate: [-16, -12, -18, -16], opacity: [0.34, 0.62, 0.38, 0.34], x: [0, -10, 16, 0] }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
    </div>
  )
}