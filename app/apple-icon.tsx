import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/**
 * RCT Labs — Dynamic Apple Touch Icon (180×180)
 * Orbital mark: 3 concentric arcs + diagonal axis + 3 nodes
 * Scaled from native 32×32 design (factor 5.625), center at (90,90)
 * Dark background (#0D0D0D), white arcs, amber center node (#D4A853)
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#0D0D0D",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Orbital mark — 180×180 coordinates (32×32 design × 5.625), center at (90,90) */}
        <svg width="180" height="180" viewBox="0 0 180 180" fill="none">
          {/* Diagonal axis: (56,124) → (135,45), passes through (90,90) */}
          <line x1="56" y1="124" x2="135" y2="45" stroke="white" strokeWidth="8.4" strokeLinecap="round"/>

          {/* Outer arc (r=67.5): start -30°(146,56) → end -60°(124,34), clockwise 330° */}
          <path d="M 146 56 A 67.5 67.5 0 1 1 124 34" stroke="white" strokeWidth="14" strokeLinecap="round"/>

          {/* Middle arc (r=50.6): start -30°(135,68) → end -60°(118,45) */}
          <path d="M 135 68 A 50.6 50.6 0 1 1 118 45" stroke="white" strokeWidth="11.25" strokeLinecap="round"/>

          {/* Inner arc (r=33.75): start -30°(118,73) → end -60°(107,62) */}
          <path d="M 118 73 A 33.75 33.75 0 1 1 107 62" stroke="white" strokeWidth="8.4" strokeLinecap="round"/>

          {/* Center node — amber accent */}
          <circle cx="90" cy="90" r="22.5" fill="#D4A853"/>

          {/* Outer node — medium, upper-right */}
          <circle cx="135" cy="45" r="14" fill="white"/>

          {/* Inner node — small, lower-left */}
          <circle cx="56" cy="124" r="8.4" fill="white"/>
        </svg>
      </div>
    ),
    { ...size },
  )
}

