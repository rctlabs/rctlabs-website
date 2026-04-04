import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/**
 * RCT Ecosystem — Dynamic Apple Touch Icon Generator
 * Replaces the Vercel V0 template apple-icon.png with the RCT brand mark.
 * Rendered as PNG at 180×180 via Next.js ImageResponse / Vercel Edge.
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
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Orbital ring — RCT brand accent */}
        <div
          style={{
            position: "absolute",
            width: 148,
            height: 148,
            borderRadius: "50%",
            border: "2.5px solid rgba(212,168,83,0.28)",
          }}
        />
        {/* Warm amber letter R — RCT brand primary mark */}
        <span
          style={{
            fontSize: 112,
            fontWeight: 900,
            color: "#D4A853",
            lineHeight: 1,
            letterSpacing: "-2px",
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
