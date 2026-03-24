"use client"

import { Card } from "@/components/ui/card"

export function RCT7FlowDiagram() {
  const steps = [
    {
      number: 1,
      title: "Recognize",
      description: "Identify the situation, context, and existing patterns",
      icon: "📍",
    },
    {
      number: 2,
      title: "Categorize",
      description: "Classify data, patterns, and relationships accurately",
      icon: "🗂️",
    },
    {
      number: 3,
      title: "Translate",
      description: "Convert raw data into meaningful intent signals",
      icon: "🔄",
    },
    {
      number: 4,
      title: "Analyze",
      description: "Deep-dive into patterns and dependencies",
      icon: "🔍",
    },
    {
      number: 5,
      title: "Test",
      description: "Validate assumptions and hypotheses",
      icon: "✓",
    },
    {
      number: 6,
      title: "Refine",
      description: "Optimize based on results and feedback",
      icon: "⚙️",
    },
    {
      number: 7,
      title: "Execute",
      description: "Implement aligned actions and measure impact",
      icon: "🚀",
    },
  ]

  return (
    <Card className="p-8 space-y-8">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">RCT-7 Process Flow</h3>
        <p className="text-muted-foreground">Seven interconnected steps for implementing intent-driven systems</p>
      </div>

      {/* Circular Flow Visualization */}
      <div className="relative w-full aspect-square max-w-2xl mx-auto">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          {/* Center circle */}
          <circle cx="200" cy="200" r="40" fill="var(--color-accent)" opacity="0.1" />
          <circle cx="200" cy="200" r="40" fill="none" stroke="var(--color-accent)" strokeWidth="2" />
          <text x="200" y="210" textAnchor="middle" className="text-xs font-bold fill-current text-accent">
            RCT-7
          </text>

          {/* Outer steps */}
          {steps.map((step, i) => {
            const angle = (i / steps.length) * Math.PI * 2 - Math.PI / 2
            const x = 200 + 120 * Math.cos(angle)
            const y = 200 + 120 * Math.sin(angle)

            return (
              <g key={i}>
                {/* Connector lines */}
                <line x1="240" y1="200" x2={x} y2={y} stroke="var(--color-border)" strokeWidth="2" opacity="0.5" />
                {/* Step circles */}
                <circle cx={x} cy={y} r="30" fill="var(--color-card)" stroke="var(--color-border)" strokeWidth="2" />
                <text x={x} y={y + 1} textAnchor="middle" className="text-xs font-bold fill-current text-foreground">
                  {step.number}
                </text>
              </g>
            )
          })}
        </svg>
      </div>

      {/* Step Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {steps.map((step, i) => (
          <div
            key={i}
            className="bg-card border border-border rounded-lg p-4 space-y-3 hover:border-accent/50 transition"
          >
            <div className="flex items-start justify-between">
              <div className="text-2xl">{step.icon}</div>
              <div className="bg-accent text-accent-foreground rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                {step.number}
              </div>
            </div>
            <h4 className="font-semibold text-foreground">{step.title}</h4>
            <p className="text-xs text-muted-foreground">{step.description}</p>
          </div>
        ))}
      </div>

      {/* Process Description */}
      <div className="bg-linear-to-r from-accent/5 to-secondary/5 rounded-lg p-6 space-y-3">
        <h4 className="font-semibold text-foreground">The Cyclical Nature</h4>
        <p className="text-muted-foreground text-sm">
          RCT-7 is not linear—it's cyclical. After execution, feedback loops back to the Recognize phase, allowing
          continuous improvement. This creates adaptive systems that learn and evolve with new data and changing
          circumstances.
        </p>
      </div>
    </Card>
  )
}
