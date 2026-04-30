import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/**
 * RCT Labs — Apple Touch Icon (180×180)
 * Matches RCTicon-blackbg.svg: gold (#D3A853) orbital mark on black background.
 * Two dominant orbital arcs + white inner fill reflecting the actual brand mark.
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#000000",
          borderRadius: 38,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <svg width="150" height="150" viewBox="0 0 150 150" fill="none">
          {/* Outer gold orbital ring — dominant arc matching brand mark */}
          <path
            d="M 138 60 A 70 70 0 1 1 100 15"
            stroke="#D3A853"
            strokeWidth="20"
            strokeLinecap="round"
            fill="none"
          />
          {/* Secondary inner gold arc */}
          <path
            d="M 120 75 A 50 50 0 1 1 90 32"
            stroke="#D3A853"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* Inner white orbital detail */}
          <path
            d="M 103 80 A 32 32 0 1 1 80 50"
            stroke="#FBFBFB"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          {/* Brand accent node — upper right convergence point */}
          <circle cx="100" cy="15" r="10" fill="#D3A853" />
          {/* Center core */}
          <circle cx="75" cy="75" r="9" fill="#D3A853" />
        </svg>
      </div>
    ),
    { ...size },
  )
}

