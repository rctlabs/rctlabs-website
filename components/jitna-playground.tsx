"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Check } from "lucide-react"

export function JITNAPlayground() {
  const [code, setCode] = useState(`// JITNA Language Example
INTENT user_satisfaction {
  GOAL: maximize_experience
  CONSTRAINTS: [cost_efficient, privacy_first]
  
  ACTION recommend_product {
    FILTER: user_preferences
    SORT_BY: relevance DESC
    LIMIT: 5
  }
}`)

  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card className="p-8 space-y-6">
      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-foreground">JITNA Playground</h3>
        <p className="text-muted-foreground">Explore Just-In-Time Natural Action language syntax</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Code Editor */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-sm font-semibold text-foreground">JITNA Code</label>
            <Button size="sm" variant="ghost" onClick={handleCopy} className="gap-2">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="font-mono text-sm h-80 bg-muted"
            placeholder="Enter JITNA code..."
          />
        </div>

        {/* Reference Guide */}
        <div className="space-y-4 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            <div className="bg-background rounded-lg p-4 border border-border space-y-2">
              <p className="font-mono text-xs text-accent font-semibold">INTENT</p>
              <p className="text-xs text-muted-foreground">Define intention blocks for system behavior</p>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border space-y-2">
              <p className="font-mono text-xs text-accent font-semibold">GOAL</p>
              <p className="text-xs text-muted-foreground">Primary objective or desired outcome</p>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border space-y-2">
              <p className="font-mono text-xs text-accent font-semibold">CONSTRAINTS</p>
              <p className="text-xs text-muted-foreground">Boundaries and limitations for execution</p>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border space-y-2">
              <p className="font-mono text-xs text-accent font-semibold">ACTION</p>
              <p className="text-xs text-muted-foreground">Specific operations or tasks to execute</p>
            </div>

            <div className="bg-background rounded-lg p-4 border border-border space-y-2">
              <p className="font-mono text-xs text-accent font-semibold">FILTER, SORT_BY, LIMIT</p>
              <p className="text-xs text-muted-foreground">Query operations for data manipulation</p>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/50 rounded-lg p-3">
            <p className="text-xs text-blue-900 dark:text-blue-200">
              JITNA combines natural language clarity with computational precision, making intent explicit and
              executable.
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}
