"use client"

import { motion } from "framer-motion"
import { useLanguage } from "@/components/language-provider"

interface ArchitectMascotProps {
  className?: string
}

export default function ArchitectMascot({ className = "" }: ArchitectMascotProps) {
  const { language } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={`pixel-float warm-card relative overflow-hidden p-5 ${className}`.trim()}
    >
      <div className="pixel-corner absolute inset-0 text-warm-amber" aria-hidden="true" />
      <div className="relative z-10 flex items-center gap-4">
        <svg viewBox="0 0 96 96" className="pixel-icon pixel-glow h-20 w-20 text-warm-amber" role="img" aria-label="Architect Mascot">
          <rect x="20" y="14" width="56" height="56" rx="8" fill="currentColor" opacity="0.12" />
          <rect x="28" y="22" width="40" height="40" rx="6" fill="currentColor" opacity="0.2" />
          <circle cx="40" cy="40" r="5" fill="currentColor" />
          <circle cx="56" cy="40" r="5" fill="currentColor" />
          <rect x="38" y="52" width="20" height="4" rx="2" fill="currentColor" />
          <path d="M22 72h52l-10 10H32Z" fill="currentColor" opacity="0.35" />
          <path d="M48 6l6 10H42Z" fill="currentColor" />
        </svg>
        <div className="space-y-1">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-warm-amber">
            {language === "th" ? "Architect Loop" : "Architect Loop"}
          </p>
          <h3 className="text-lg font-semibold text-foreground">
            {language === "th" ? "Human-in-the-Loop ยังเป็นศูนย์กลาง" : "Human-in-the-Loop remains central"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {language === "th"
              ? "มาสคอตนี้เป็น SVG fallback สำหรับแบรนด์ช่วงก่อน pixel-art production asset จะพร้อม"
              : "This mascot is an SVG fallback for brand identity until the final pixel-art production asset is ready."}
          </p>
        </div>
      </div>
    </motion.div>
  )
}
