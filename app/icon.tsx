import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

/**
 * RCT Ecosystem — Dynamic Favicon Generator
 * Replaces the Vercel V0 template icons with the RCT brand mark.
 * Rendered as PNG at 32×32 via Next.js ImageResponse / Vercel Edge.
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Warm amber letter R — RCT brand primary mark */}
        <span
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#D4A853",
            lineHeight: 1,
            letterSpacing: "-0.5px",
            fontFamily: "system-ui, -apple-system, sans-serif",
          }}
        >
          R
        </span>
      </div>
    ),
    { ...size },
  )
}
