"use client"

import { m } from "framer-motion"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function AnimatedFDIAEquation({ locale = "en" }: { locale?: "en" | "th" }) {
  const [isAnimating, setIsAnimating] = useState(true)
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)

  const t = (en: string, th: string) => locale === "th" ? th : en

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  }

  const pulseVariants = {
    pulse: {
      scale: [1, 1.05, 1],
      opacity: [1, 0.8, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
          {t("FDIA Equation", "สูตร FDIA")}
        </h2>
        <p className="text-muted-foreground">
          {t(
            "The mathematical foundation of intent-driven AI systems",
            "รากฐานทางคณิตศาสตร์ของระบบ AI ที่ขับเคลื่อนด้วยเจตนา"
          )}
        </p>
      </div>

      {/* Main Equation */}
      <m.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-wrap items-center justify-center gap-2 text-4xl md:text-6xl font-mono mb-12"
      >
        {/* F = */}
        <m.span variants={itemVariants} className="font-bold text-foreground">
          F
        </m.span>
        <m.span variants={itemVariants} className="text-muted-foreground">
          =
        </m.span>

        {/* ( */}
        <m.span variants={itemVariants} className="text-muted-foreground">
          (
        </m.span>

        {/* D */}
        <m.div
          variants={itemVariants}
          className={cn(
            "relative cursor-pointer transition-all duration-300",
            hoveredPart === "D" && "scale-110"
          )}
          onMouseEnter={() => setHoveredPart("D")}
          onMouseLeave={() => setHoveredPart(null)}
        >
          <m.span
            animate={isAnimating ? "pulse" : ""}
            variants={pulseVariants}
            className="font-bold text-blue-500"
          >
            D
          </m.span>
          {hoveredPart === "D" && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-card border border-border rounded-lg px-3 py-2 shadow-lg z-10"
            >
              <span className="font-semibold text-blue-500">D</span>
              <span className="text-muted-foreground"> = {t("Data", "ข้อมูล")}</span>
            </m.div>
          )}
        </m.div>

        {/* ^ */}
        <m.span variants={itemVariants} className="text-muted-foreground">
          <sup className="text-2xl md:text-3xl">^</sup>
        </m.span>

        {/* I */}
        <m.div
          variants={itemVariants}
          className={cn(
            "relative cursor-pointer transition-all duration-300",
            hoveredPart === "I" && "scale-110"
          )}
          onMouseEnter={() => setHoveredPart("I")}
          onMouseLeave={() => setHoveredPart(null)}
        >
          <m.span
            animate={isAnimating ? "pulse" : ""}
            variants={pulseVariants}
            className="font-bold text-green-500"
          >
            I
          </m.span>
          {hoveredPart === "I" && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-card border border-border rounded-lg px-3 py-2 shadow-lg z-10"
            >
              <span className="font-semibold text-green-500">I</span>
              <span className="text-muted-foreground"> = {t("Intent", "เจตนา")}</span>
            </m.div>
          )}
        </m.div>

        {/* ) */}
        <m.span variants={itemVariants} className="text-muted-foreground">
          )
        </m.span>

        {/* × */}
        <m.span variants={itemVariants} className="text-muted-foreground">
          ×
        </m.span>

        {/* A */}
        <m.div
          variants={itemVariants}
          className={cn(
            "relative cursor-pointer transition-all duration-300",
            hoveredPart === "A" && "scale-110"
          )}
          onMouseEnter={() => setHoveredPart("A")}
          onMouseLeave={() => setHoveredPart(null)}
        >
          <m.span
            animate={isAnimating ? "pulse" : ""}
            variants={pulseVariants}
            className="font-bold text-purple-500"
          >
            A
          </m.span>
          {hoveredPart === "A" && (
            <m.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm bg-card border border-border rounded-lg px-3 py-2 shadow-lg z-10"
            >
              <span className="font-semibold text-purple-500">A</span>
              <span className="text-muted-foreground"> = {t("Action", "การกระทำ")}</span>
            </m.div>
          )}
        </m.div>
      </m.div>

      {/* Component Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Data Card */}
        <m.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
          className={cn(
            "rounded-lg border bg-card p-6 transition-all duration-300",
            hoveredPart === "D" ? "border-blue-500 shadow-lg shadow-blue-500/20" : "border-border"
          )}
          onMouseEnter={() => setHoveredPart("D")}
          onMouseLeave={() => setHoveredPart(null)}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-500">D</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t("Data", "ข้อมูล")}</h3>
              <p className="text-xs text-muted-foreground">{t("Raw Material", "วัตถุดิบ")}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {t(
              "The raw material of understanding. Contextual information, historical patterns, and environmental signals.",
              "วัตถุดิบของความเข้าใจ ข้อมูลบริบท รูปแบบประวัติ และสัญญาณสิ่งแวดล้อม"
            )}
          </p>
        </m.div>

        {/* Intent Card */}
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className={cn(
            "rounded-lg border bg-card p-6 transition-all duration-300",
            hoveredPart === "I" ? "border-green-500 shadow-lg shadow-green-500/20" : "border-border"
          )}
          onMouseEnter={() => setHoveredPart("I")}
          onMouseLeave={() => setHoveredPart(null)}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-green-500">I</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t("Intent", "เจตนา")}</h3>
              <p className="text-xs text-muted-foreground">{t("Exponential Multiplier", "ตัวคูณเลขชี้กำลัง")}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {t(
              "The exponential multiplier of understanding. Transforms raw data into purposeful knowledge.",
              "ตัวคูณเลขชี้กำลังของความเข้าใจ เปลี่ยนข้อมูลดิบให้เป็นความรู้ที่มีจุดประสงค์"
            )}
          </p>
          <div className="mt-3 inline-flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">
            <span>^</span>
            <span className="font-bold">{t("Exponent", "เลขชี้กำลัง")}</span>
          </div>
        </m.div>

        {/* Action Card */}
        <m.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.4 }}
          className={cn(
            "rounded-lg border bg-card p-6 transition-all duration-300",
            hoveredPart === "A" ? "border-purple-500 shadow-lg shadow-purple-500/20" : "border-border"
          )}
          onMouseEnter={() => setHoveredPart("A")}
          onMouseLeave={() => setHoveredPart(null)}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
              <span className="text-2xl font-bold text-purple-500">A</span>
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{t("Action", "การกระทำ")}</h3>
              <p className="text-xs text-muted-foreground">{t("Actualization Layer", "ชั้นการทำให้เป็นจริง")}</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            {t(
              "The tangible output that manifests intention in the real world, guided by the Data-Intent relationship.",
              "ผลลัพธ์ที่จับต้องได้ซึ่งแสดงเจตนาในโลกจริง นำทางด้วยความสัมพันธ์ระหว่างข้อมูลและเจตนา"
            )}
          </p>
        </m.div>
      </div>

      {/* Formula Explanation */}
      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-8 rounded-lg border border-accent/20 bg-accent/5 p-6"
      >
        <h4 className="font-semibold mb-2 text-foreground">
          {t("How it Works", "วิธีการทำงาน")}
        </h4>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {t(
            "F = (D^I) × A represents how Intent (I) exponentially amplifies the value of Data (D). Without clear intent, data is just noise. With precise intent, data becomes pure signal that drives meaningful Action (A).",
            "F = (D^I) × A แสดงว่าเจตนา (I) ขยายคุณค่าของข้อมูล (D) แบบเลขชี้กำลัง โดยไม่มีเจตนาที่ชัดเจน ข้อมูลเป็นแค่สัญญาณรบกวน แต่เมื่อมีเจตนาที่แม่นยำ ข้อมูลกลายเป็นสัญญาณที่บริสุทธิ์ที่ขับเคลื่อนการกระทำ (A) ที่มีความหมาย"
          )}
        </p>
      </m.div>
    </div>
  )
}
