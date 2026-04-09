import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 180, height: 180 }
export const contentType = "image/png"

/**
 * RCT Labs — Dynamic Apple Touch Icon (180×180)
 * Matches RCTicon.svg aesthetic: gold (#D4A953) orbital mark on white background
 * Scaled from 26×26 design (factor 6.923), center at (90,90)
 */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 180,
          height: 180,
          background: "#000000",
          borderRadius: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Gold orbital mark — matching RCTicon-blackbg.svg: gold arcs on black background */}
        <svg width="160" height="160" viewBox="0 0 160 160" fill="none">
          {/* Outer arc (r=68): gap at upper-right */}
          <path d="M 142 68 A 68 68 0 1 1 111 25" stroke="#D4A953" strokeWidth="18.5" strokeLinecap="round"/>

          {/* Middle arc (r=49) */}
          <path d="M 130 80 A 49 49 0 1 1 105 43" stroke="#D4A953" strokeWidth="15.4" strokeLinecap="round"/>

          {/* Inner arc (r=31) */}
          <path d="M 111 86 A 31 31 0 1 1 93 55" stroke="#D4A953" strokeWidth="12.3" strokeLinecap="round"/>

          {/* Diagonal axis */}
          <line x1="43" y1="117" x2="123" y2="37" stroke="#D4A953" strokeWidth="9.2" strokeLinecap="round"/>

          {/* Center node */}
          <circle cx="80" cy="80" r="18.5" fill="#D4A953"/>

          {/* Outer node — upper-right */}
          <circle cx="123" cy="37" r="12.3" fill="#C49240"/>

          {/* Inner node — lower-left */}
          <circle cx="43" cy="117" r="9.2" fill="#C49240"/>
        </svg>
      </div>
    ),
    { ...size },
  )
}

