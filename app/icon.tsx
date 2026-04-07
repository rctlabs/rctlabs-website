import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

/**
 * RCT Labs — Dynamic Favicon (32×32)
 * Orbital mark: 3 concentric arcs + diagonal axis + 3 nodes
 * Dark background (#0D0D0D), white arcs, amber center node (#D4A853)
 * Geometry: gap at upper-right (-30° to -60°), axis at -45°/135°
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0D0D0D",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Orbital mark — native 32×32 coordinates, center at (16,16) */}
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          {/* Diagonal axis: small-node (10,22) → medium-node (24,8), passes through (16,16) */}
          <line x1="10" y1="22" x2="24" y2="8" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>

          {/* Outer arc (r=12): start -30°(26,10) → end -60°(22,6), clockwise 330° */}
          <path d="M 26 10 A 12 12 0 1 1 22 6" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>

          {/* Middle arc (r=9): start -30°(24,12) → end -60°(21,8) */}
          <path d="M 24 12 A 9 9 0 1 1 21 8" stroke="white" strokeWidth="2" strokeLinecap="round"/>

          {/* Inner arc (r=6): start -30°(21,13) → end -60°(19,11) */}
          <path d="M 21 13 A 6 6 0 1 1 19 11" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>

          {/* Center node — amber accent */}
          <circle cx="16" cy="16" r="4" fill="#D4A853"/>

          {/* Outer node — medium, upper-right at -45° on outer ring */}
          <circle cx="24" cy="8" r="2.5" fill="white"/>

          {/* Inner node — small, lower-left at 135° on middle ring */}
          <circle cx="10" cy="22" r="1.5" fill="white"/>
        </svg>
      </div>
    ),
    { ...size },
  )
}

