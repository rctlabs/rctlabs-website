import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "RCT Labs - Intent Operating System"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Logo circle */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 60,
            background: "linear-gradient(135deg, #f59e0b, #d97706)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
            boxShadow: "0 0 60px rgba(245,158,11,0.3)",
          }}
        >
          <span style={{ fontSize: 56, fontWeight: 800, color: "#0a0a0a" }}>R</span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#ffffff",
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          RCT Labs
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: 28,
            color: "#f59e0b",
            margin: "12px 0 0 0",
            letterSpacing: "0.08em",
            textTransform: "uppercase" as const,
          }}
        >
          Intent Operating System
        </p>

        {/* Tagline */}
        <p
          style={{
            fontSize: 20,
            color: "#94a3b8",
            margin: "24px 0 0 0",
            maxWidth: 700,
            textAlign: "center" as const,
            lineHeight: 1.4,
          }}
        >
          Constitutional AI &middot; Multi-LLM Consensus &middot; Data Sovereignty
        </p>
      </div>
    ),
    { ...size }
  )
}
