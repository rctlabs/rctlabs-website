import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

/**
 * RCT Labs — Dynamic Favicon (32×32)
 * Matches RCTicon.svg aesthetic: gold (#D4A953) orbital mark on white background
 * 3 concentric arcs + diagonal axis + nodes, all in gold/amber
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#000000",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Gold orbital mark — matching RCTicon-blackbg.svg: gold on black */}
        <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
          {/* Outer arc (r=11): gap at upper-right */}
          <path d="M 23 11 A 11 11 0 1 1 18 4" stroke="#D4A953" strokeWidth="3" strokeLinecap="round"/>

          {/* Middle arc (r=8) */}
          <path d="M 21 13 A 8 8 0 1 1 17 7" stroke="#D4A953" strokeWidth="2.5" strokeLinecap="round"/>

          {/* Inner arc (r=5) */}
          <path d="M 18 14 A 5 5 0 1 1 15 9" stroke="#D4A953" strokeWidth="2" strokeLinecap="round"/>

          {/* Diagonal axis */}
          <line x1="7" y1="19" x2="20" y2="6" stroke="#D4A953" strokeWidth="1.5" strokeLinecap="round"/>

          {/* Center node */}
          <circle cx="13" cy="13" r="3" fill="#D4A953"/>

          {/* Outer node — upper-right */}
          <circle cx="20" cy="6" r="2" fill="#C49240"/>

          {/* Inner node — lower-left */}
          <circle cx="7" cy="19" r="1.5" fill="#C49240"/>
        </svg>
      </div>
    ),
    { ...size },
  )
}

