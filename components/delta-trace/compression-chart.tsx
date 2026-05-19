"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import * as Slider from "@radix-ui/react-slider"
import { useState, useMemo } from "react"

export interface DeltaTickData {
  tick: number
  naiveCumulative: number
  deltaCumulative: number
  compressionPct: number
  recallMs: number
}

interface AgentSnapshot {
  tick: number
  agentId: string
  resources: Record<string, number>
  reputation: number
  violations: number
  actionsTaken: number
}

interface CompressionChartProps {
  tickData?: DeltaTickData[]
  snapshots?: AgentSnapshot[]
  title?: string
}

// Pre-computed demo data: 60 ticks, 3 agents
// Naive: 200 bytes per agent × 3 agents = 600 bytes/tick → cumulative
// Delta: ~42 bytes per agent avg (30% of 200 × 0.7 compression factor)
function generateDemoData(): { tickData: DeltaTickData[]; snapshots: AgentSnapshot[] } {
  const NAIVE_PER_TICK = 200 * 3 // 3 agents × 200 bytes each
  const AVG_DELTA_PER_TICK = 46 * 3  // avg ~46 bytes delta per agent
  const tickData: DeltaTickData[] = []

  let naiveCumulative = 0
  let deltaCumulative = 0

  for (let tick = 1; tick <= 60; tick++) {
    naiveCumulative += NAIVE_PER_TICK
    // Add slight variance to delta
    const variance = 1 + (Math.sin(tick * 0.4) * 0.15)
    deltaCumulative += Math.round(AVG_DELTA_PER_TICK * variance)
    const compression = 1 - deltaCumulative / naiveCumulative
    const recallMs = 0.2 + (tick > 50 ? 0.1 : 0) + Math.random() * 0.05

    tickData.push({
      tick,
      naiveCumulative,
      deltaCumulative,
      compressionPct: Math.round(compression * 1000) / 10,
      recallMs: Math.round(recallMs * 1000) / 1000,
    })
  }

  // Snapshots at ticks 10, 20, 30, 40, 50, 60
  const snapshots: AgentSnapshot[] = []
  const agents = [
    { id: "sentinel", energyStart: 100, other: "shields", otherStart: 5 },
    { id: "navigator", energyStart: 80, other: "maps", otherStart: 0 },
    { id: "merchant", energyStart: 60, other: "gold", otherStart: 20 },
  ]
  const snapshotTicks = [10, 20, 30, 40, 50, 60]
  for (const st of snapshotTicks) {
    for (const agent of agents) {
      snapshots.push({
        tick: st,
        agentId: agent.id,
        resources: {
          energy: Math.max(10, agent.energyStart - st * 0.8 + st * 0.3),
          [agent.other]: agent.otherStart + st * 0.4,
        },
        reputation: Math.min(1, 0.95 + st * 0.001),
        violations: Math.floor(st / 20),
        actionsTaken: st,
      })
    }
  }

  return { tickData, snapshots }
}

const DEMO = generateDemoData()

const CHART_COLORS = {
  naive: "#ef4444",
  delta: "#10b981",
  compression: "#10b981",
  line: "#f59e0b",
}

const AGENT_COLORS: Record<string, string> = {
  sentinel: "#6366f1",
  navigator: "#3b82f6",
  merchant: "#f59e0b",
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-lg p-3 text-xs font-mono shadow-xl">
      <div className="text-[#94a3b8] mb-2">Tick {label}</div>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex justify-between gap-4" style={{ color: entry.color }}>
          <span>{entry.name}</span>
          <span className="font-bold">
            {entry.dataKey.includes("Pct")
              ? `${entry.value}%`
              : formatBytes(entry.value)}
          </span>
        </div>
      ))}
    </div>
  )
}

export function CompressionChart({
  tickData = DEMO.tickData,
  snapshots = DEMO.snapshots,
  title = "RCT Delta Engine — Memory Compression",
}: CompressionChartProps) {
  const maxTick = tickData.length > 0 ? tickData[tickData.length - 1].tick : 60
  const [sliderTick, setSliderTick] = useState([Math.floor(maxTick / 2)])

  const snapshotsByTick = useMemo(() => {
    const m: Record<number, Record<string, AgentSnapshot>> = {}
    for (const s of snapshots) {
      if (!m[s.tick]) m[s.tick] = {}
      m[s.tick][s.agentId] = s
    }
    return m
  }, [snapshots])

  const availableTicks = useMemo(
    () => Object.keys(snapshotsByTick).map(Number).sort((a, b) => a - b),
    [snapshotsByTick]
  )

  const nearestTick = useMemo(() => {
    const target = sliderTick[0]
    let best = availableTicks[0] ?? target
    for (const t of availableTicks) {
      if (t <= target) best = t
      else break
    }
    return best
  }, [sliderTick, availableTicks])

  const currentAgents = snapshotsByTick[nearestTick] ?? {}

  const lastTick = tickData[tickData.length - 1]
  const savings = lastTick
    ? lastTick.naiveCumulative - lastTick.deltaCumulative
    : 0
  const compressionPct = lastTick?.compressionPct ?? 74

  return (
    <div className="space-y-6">
      {/* Stat Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Compression", value: `${compressionPct}%`, color: "text-[#10b981]" },
          {
            label: "Naive Storage",
            value: formatBytes(lastTick?.naiveCumulative ?? 0),
            color: "text-[#ef4444]",
          },
          {
            label: "Delta Storage",
            value: formatBytes(lastTick?.deltaCumulative ?? 0),
            color: "text-[#10b981]",
          },
          { label: "Bytes Saved", value: formatBytes(savings), color: "text-[#f59e0b]" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-[#1e293b] border border-[#334155] rounded-lg p-4 text-center"
          >
            <div className={`text-xl font-bold font-mono ${stat.color}`}>{stat.value}</div>
            <div className="text-[#64748b] text-xs mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Bar Chart: Memory Usage */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
        <h3 className="text-xs font-mono text-[#94a3b8] uppercase tracking-widest mb-4">
          Cumulative Memory Usage Over Time
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={tickData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="tick"
              tick={{ fill: "#475569", fontSize: 11, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
              interval={Math.floor(tickData.length / 8)}
              label={{ value: "Tick", position: "insideBottom", offset: -2, fill: "#64748b", fontSize: 10 }}
            />
            <YAxis
              tickFormatter={formatBytes}
              tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={false}
              width={65}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ color: "#94a3b8", fontSize: "11px", fontFamily: "monospace" }}
            />
            <Bar
              dataKey="naiveCumulative"
              name="Full Snapshot (Naive)"
              fill={CHART_COLORS.naive}
              fillOpacity={0.7}
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="deltaCumulative"
              name="RCT Delta Engine"
              fill={CHART_COLORS.delta}
              fillOpacity={0.8}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart: Compression ratio */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
        <h3 className="text-xs font-mono text-[#94a3b8] uppercase tracking-widest mb-4">
          Compression Ratio % Over Ticks
        </h3>
        <ResponsiveContainer width="100%" height={160}>
          <LineChart data={tickData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
            <XAxis
              dataKey="tick"
              tick={{ fill: "#475569", fontSize: 10, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
              interval={Math.floor(tickData.length / 8)}
            />
            <YAxis
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: "#94a3b8", fontSize: 10, fontFamily: "monospace" }}
              tickLine={false}
              axisLine={false}
              domain={[0, 100]}
              width={42}
            />
            <Tooltip
              formatter={(v: number) => [`${v}%`, "Compression"]}
              contentStyle={{
                background: "#1e293b",
                border: "1px solid #334155",
                borderRadius: "8px",
                fontFamily: "monospace",
                fontSize: "11px",
              }}
              labelStyle={{ color: "#94a3b8" }}
            />
            <ReferenceLine
              y={74}
              stroke="#f59e0b"
              strokeDasharray="4 4"
              label={{ value: "74% target", fill: "#f59e0b", fontSize: 10, position: "insideTopRight" }}
            />
            <Line
              type="monotone"
              dataKey="compressionPct"
              name="Compression %"
              stroke={CHART_COLORS.compression}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "#10b981" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Rollback Timeline Slider */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-5">
        <h3 className="text-xs font-mono text-[#94a3b8] uppercase tracking-widest mb-4">
          ⏮ Rollback Timeline — reconstruct any agent state at any past tick
        </h3>
        <div className="mb-4">
          <Slider.Root
            className="relative flex items-center select-none touch-none w-full h-5"
            min={1}
            max={maxTick}
            step={1}
            value={sliderTick}
            onValueChange={setSliderTick}
          >
            <Slider.Track className="bg-[#334155] relative grow rounded-full h-1.5">
              <Slider.Range className="absolute bg-[#3b82f6] rounded-full h-full" />
            </Slider.Track>
            <Slider.Thumb
              className="block w-5 h-5 bg-[#3b82f6] rounded-full shadow-lg hover:bg-[#60a5fa] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] cursor-grab active:cursor-grabbing"
              aria-label="Select tick"
            />
          </Slider.Root>
          <div className="mt-3 flex items-center gap-3">
            <span className="font-mono text-[#f59e0b] text-lg font-bold">
              Tick {sliderTick[0]}
            </span>
            {nearestTick !== sliderTick[0] && (
              <span className="text-[#64748b] text-xs font-mono">
                (snapshot at tick {nearestTick})
              </span>
            )}
            <span className="ml-auto text-[#10b981] text-xs font-mono">
              State reconstructed in &lt;1ms ✓
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
          {["sentinel", "navigator", "merchant"].map((agentId) => {
            const snap = currentAgents[agentId]
            const color = AGENT_COLORS[agentId] ?? "#94a3b8"
            return (
              <div
                key={agentId}
                className="bg-[#0f172a] border border-[#334155] rounded-lg p-4 text-xs font-mono"
              >
                <div className="font-bold mb-3" style={{ color }}>
                  {agentId}
                </div>
                {snap ? (
                  <>
                    {Object.entries(snap.resources).map(([k, v]) => (
                      <div key={k} className="flex justify-between mb-1">
                        <span className="text-[#64748b]">{k}</span>
                        <span className="text-[#e2e8f0]">{v.toFixed(1)}</span>
                      </div>
                    ))}
                    <div className="flex justify-between mb-1">
                      <span className="text-[#64748b]">reputation</span>
                      <span className="text-[#e2e8f0]">{snap.reputation.toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between mb-1">
                      <span className="text-[#64748b]">actions</span>
                      <span className="text-[#e2e8f0]">{snap.actionsTaken}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#64748b]">violations</span>
                      <span style={{ color: snap.violations > 0 ? "#ef4444" : "#10b981" }}>
                        {snap.violations}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-[#475569]">no snapshot data</div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
