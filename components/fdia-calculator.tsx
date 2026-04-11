"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"

export function FDIACalculator() {
  const [data, setData] = useState(50)
  const [intent, setIntent] = useState(50)
  const [action, setAction] = useState(50)

  // F = (D^I) × A
  const calculation = Math.pow(data / 100, (intent / 100) * 2) * (action / 100)
  const result = Math.round(calculation * 10000) / 100

  return (
    <Card className="p-8 space-y-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">FDIA Formula Calculator</h3>
        <p className="text-muted-foreground">Explore how Data, Intent, and Action combine to produce outcomes</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Data Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Data Quality: {data}%</Label>
            <p className="text-xs text-muted-foreground">Raw material and contextual information available</p>
          </div>
          <Slider value={[data]} onValueChange={(v) => setData(v[0])} min={0} max={100} step={1} className="w-full" />
        </div>

        {/* Intent Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Intent Clarity: {intent}%</Label>
            <p className="text-xs text-muted-foreground">How well-defined is the goal or objective</p>
          </div>
          <Slider
            value={[intent]}
            onValueChange={(v) => setIntent(v[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Action Input */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-base font-semibold">Action Alignment: {action}%</Label>
            <p className="text-xs text-muted-foreground">How well actions align with intent and data</p>
          </div>
          <Slider
            value={[action]}
            onValueChange={(v) => setAction(v[0])}
            min={0}
            max={100}
            step={1}
            className="w-full"
          />
        </div>
      </div>

      {/* Formula Display */}
      <div className="bg-gradient-to-r from-accent/10 to-secondary/10 rounded-lg p-8 space-y-4">
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-mono">F = (D^I) × A</p>
          <div className="text-3xl md:text-4xl font-bold text-warm-amber font-mono">
            ({(data / 100).toFixed(2)}
            <sup>{((intent / 100) * 2).toFixed(2)}</sup>) × {(action / 100).toFixed(2)} = {result.toFixed(2)}
          </div>
        </div>
        <p className="text-muted-foreground text-sm">
          With your current settings, the formula produces a result of{" "}
          <span className="font-bold text-foreground">{result.toFixed(2)}</span>. Try adjusting sliders to see how each
          factor influences the outcome.
        </p>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-background rounded-lg p-6 border border-border">
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Current Data Input</p>
          <p className="text-2xl font-bold text-foreground">{(data / 100).toFixed(2)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Intent Exponent</p>
          <p className="text-2xl font-bold text-warm-amber">{((intent / 100) * 2).toFixed(2)}</p>
        </div>
        <div className="space-y-2">
          <p className="text-xs text-muted-foreground uppercase font-semibold">Final Output</p>
          <p className="text-2xl font-bold text-foreground">{result.toFixed(2)}</p>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-lg p-4 space-y-2">
        <p className="text-sm font-semibold text-blue-900 dark:text-blue-200">Insight</p>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Notice how Intent acts as an exponent—even small increases in intent clarity dramatically amplify the value of
          your data. This is why precise goal definition is crucial for AI systems.
        </p>
      </div>
    </Card>
  )
}
