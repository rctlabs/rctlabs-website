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
  const intentDelta = useMemo(() => Math.pow(dataVal, 10) * architectVal - Math.pow(dataVal, 1) * architectVal, [architectVal, dataVal])

  const formatResult = (n: number) => {
    if (n >= 1e15) return n.toExponential(2)
    if (n >= 1e12) return `${(n / 1e12).toFixed(1)}T`
    if (n >= 1e9) return `${(n / 1e9).toFixed(1)}B`
    if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
    if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
    return n.toFixed(1)
  }

  const controls = [
    {
      key: "data",
      label: language === "en" ? "D — Data Quality" : "D — คุณภาพข้อมูล",
      description: language === "en" ? "Quality of input data (0-100)" : "คุณภาพของข้อมูลตั้งต้น (0-100)",
      value: dataVal,
      display: dataVal,
      color: "#89B4C8",
      onChange: ([value]: number[]) => setDataVal(value),
      min: 1,
      max: 100,
      step: 1,
    },
    {
      key: "intent",
      label: language === "en" ? "I — Intent Clarity" : "I — ความชัดเจนของ Intent",
      description:
        language === "en"
          ? "Clarity of purpose (1-10) drives the exponential lift."
          : "ความชัดเจนของเจตนา (1-10) เป็นตัวขับพลังแบบยกกำลัง",
      value: intentVal,
      display: intentVal,
      color: "#C4745B",
      onChange: ([value]: number[]) => setIntentVal(value),
      min: 1,
      max: 10,
      step: 1,
    },
    {
      key: "architect",
      label: language === "en" ? "A — Architect Oversight" : "A — การกำกับดูแลของ Architect",
      description:
        language === "en"
          ? "Human-in-the-loop multiplier (0.8-2.5)."
          : "ตัวคูณจากมนุษย์ในวงจร (0.8-2.5)",
      value: Math.round(architectVal * 10),
      display: architectVal.toFixed(1),
      color: "#7B9E87",
      onChange: ([value]: number[]) => setArchitectVal(value / 10),
      min: 8,
      max: 25,
      step: 1,
    },
  ]

  return (
    <div {...cardSpotlight} className="main-page-reactive-surface rounded-[22px] border border-[rgba(176,150,111,0.14)] bg-[linear-gradient(180deg,rgba(255,251,245,0.76),rgba(250,244,235,0.6))] p-4.5 shadow-sm dark:bg-[linear-gradient(180deg,rgba(32,28,25,0.92),rgba(24,22,21,0.94))] sm:p-5">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-warm-amber" />
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
              {language === "en" ? "FDIA Calculator" : "เครื่องคำนวณ FDIA"}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground">
            {language === "en"
              ? "Adjust the three live inputs and watch how Intent changes the magnitude of the result."
              : "ปรับ 3 ตัวแปรหลักแบบสด แล้วดูว่า Intent เปลี่ยนขนาดของผลลัพธ์อย่างไร"}
          </p>
        </div>
        <div className="rounded-full border border-warm-amber/20 bg-warm-amber/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-warm-amber">
          {language === "en" ? "Intent is exponential" : "Intent เป็น exponent"}
        </div>
      </div>

      <div className="mb-4 rounded-[20px] border border-[#eadfce] bg-[linear-gradient(180deg,rgba(255,249,241,0.9),rgba(255,255,255,0.78))] p-4 dark:border-[rgba(176,150,111,0.14)] dark:bg-[linear-gradient(180deg,rgba(44,32,20,0.62),rgba(255,255,255,0.04))]">
        <div className="font-mono text-center text-[24px] font-bold sm:text-[30px]">
          <span className="text-warm-amber">F</span>
          <span className="mx-2 text-muted-foreground">=</span>
          <span style={{ color: "#89B4C8" }}>{dataVal}</span>
          <sup className="text-[0.65em] align-super" style={{ color: "#C4745B" }}>
            {intentVal}
          </sup>
          <span className="mx-2 text-muted-foreground">&times;</span>
          <span style={{ color: "#7B9E87" }}>{architectVal.toFixed(1)}</span>
        </div>
        <div className="mt-3 grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              {language === "en" ? "Live Result" : "ผลลัพธ์แบบสด"}
            </div>
            <div className="mt-1 font-mono text-xl font-bold text-warm-amber sm:text-2xl">{formatResult(result)}</div>
          </div>
          <div className="rounded-2xl border border-border/70 bg-white/72 px-3.5 py-2.5 dark:bg-white/5">
            <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {language === "en" ? "Intent Delta" : "ผลต่างจาก Intent"}
            </div>
            <div className="mt-1 font-mono text-lg font-bold" style={{ color: "#C4745B" }}>
              {formatResult(intentDelta)}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {controls.map((control) => (
          <div key={control.key} className="rounded-[18px] border border-[#e8ddcf] bg-white/78 p-3.5 dark:border-[rgba(176,150,111,0.14)] dark:bg-white/4">
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <span className="text-sm font-semibold font-mono" style={{ color: control.color }}>
                  {control.label}
                </span>
                <p className="mt-0.5 text-xs sm:text-sm text-muted-foreground">{control.description}</p>
              </div>
              <span className="rounded-full border border-border/60 bg-white/78 px-3 py-1 font-mono text-sm font-bold dark:bg-white/5" style={{ color: control.color }}>
                {control.display}
              </span>
            </div>
            <Slider value={[control.value]} onValueChange={control.onChange} min={control.min} max={control.max} step={control.step} />
          </div>
        ))}
      </div>
    </div>
  )
}