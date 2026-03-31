"use client"

import { useMemo, useState } from "react"
import { Slider } from "@/components/ui/slider"
import { useCardSpotlight } from "@/hooks/use-card-spotlight"

export default function FDIACalculatorPanel({ language = "en" }: { language?: "en" | "th" }) {
  const [dataVal, setDataVal] = useState(85)
  const [intentVal, setIntentVal] = useState(7)
  const [architectVal, setArchitectVal] = useState(1.5)
  const cardSpotlight = useCardSpotlight<HTMLDivElement>()

  const result = useMemo(
    () => Math.pow(dataVal, intentVal) * architectVal,
    [dataVal, intentVal, architectVal]
  )

  const formatResult = (n: number) => {
    if (n >= 1e15) return n.toExponential(2)
    if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`
    if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
    return n.toFixed(1)
  }

  return (
    <div {...cardSpotlight} className="main-page-reactive-surface rounded-xl border border-border bg-white p-5 shadow-sm dark:bg-card">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-2 h-2 rounded-full bg-warm-amber" />
        <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
          {language === "en" ? "FDIA Calculator" : "เครื่องคำนวณ FDIA"}
        </h3>
      </div>

      <div className="mb-4 rounded-xl border border-[#eee2d6] bg-[#fffaf6] p-4 dark:border-border dark:bg-secondary/30">
        <div className="font-mono text-2xl sm:text-3xl font-bold text-center py-2">
          <span className="text-warm-amber">F</span>
          <span className="mx-2 text-muted-foreground">=</span>
          <span style={{ color: "#89B4C8" }}>{dataVal}</span>
          <sup className="text-xl" style={{ color: "#C4745B" }}>
            {intentVal}
          </sup>
          <span className="mx-2 text-muted-foreground">&times;</span>
          <span style={{ color: "#7B9E87" }}>
            {architectVal.toFixed(1)}
          </span>
        </div>
        <div className="text-center mt-2">
          <span className="text-xs text-muted-foreground">
            {language === "en" ? "Result:" : "ผลลัพธ์:"}
          </span>{" "}
          <span className="font-mono text-xl font-bold text-warm-amber">
            {formatResult(result)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg border border-[#eee2d6] bg-[#fffaf6] p-3 dark:border-border dark:bg-secondary/30">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-semibold font-mono" style={{ color: "#89B4C8" }}>
                D — Data Quality
              </span>
              <p className="text-xs sm:text-sm mt-0.5 text-muted-foreground">
                {language === "en"
                  ? "Quality of input data (0-100)"
                  : "คุณภาพข้อมูล Input (0-100)"}
              </p>
            </div>
            <span className="font-mono text-lg font-bold" style={{ color: "#89B4C8" }}>
              {dataVal}
            </span>
          </div>
          <Slider value={[dataVal]} onValueChange={([v]) => setDataVal(v)} min={1} max={100} step={1} />
        </div>

        <div className="rounded-lg border border-[#eee2d6] bg-[#fffaf6] p-3 dark:border-border dark:bg-secondary/30">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-semibold font-mono" style={{ color: "#C4745B" }}>
                I — Intent Clarity
              </span>
              <p className="text-xs sm:text-sm mt-0.5 text-muted-foreground">
                {language === "en"
                  ? "Clarity of purpose (1-10)"
                  : "ความชัดเจนของเจตนา (1-10)"}{" "}
                <span className="font-semibold" style={{ color: "#C4745B" }}>
                  Exponential!
                </span>
              </p>
            </div>
            <span className="font-mono text-lg font-bold" style={{ color: "#C4745B" }}>
              {intentVal}
            </span>
          </div>
          <Slider value={[intentVal]} onValueChange={([v]) => setIntentVal(v)} min={1} max={10} step={1} />
        </div>

        <div className="rounded-lg border border-[#eee2d6] bg-[#fffaf6] p-3 dark:border-border dark:bg-secondary/30">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-semibold font-mono" style={{ color: "#7B9E87" }}>
                A — Architect (Human)
              </span>
              <p className="text-xs sm:text-sm mt-0.5 text-muted-foreground">
                {language === "en"
                  ? "Human-in-the-Loop oversight (0.8-2.5)"
                  : "ปัจจัย Human-in-the-Loop (0.8-2.5)"}
              </p>
            </div>
            <span className="font-mono text-lg font-bold" style={{ color: "#7B9E87" }}>
              {architectVal.toFixed(1)}
            </span>
          </div>
          <Slider
            value={[Math.round(architectVal * 10)]}
            onValueChange={([v]) => setArchitectVal(v / 10)}
            min={8}
            max={25}
            step={1}
          />
        </div>
      </div>
    </div>
  )
}