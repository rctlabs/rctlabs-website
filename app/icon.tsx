import { ImageResponse } from "next/og"

export const runtime = "edge"
export const size = { width: 32, height: 32 }
export const contentType = "image/png"

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0A0A0A",
          borderRadius: 7,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer orbital arc */}
          <path
            d="M 19 9.5 A 9.5 9.5 0 1 1 12.5 2"
            stroke="#D3A853"
            strokeWidth="2.8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Inner orbital arc */}
          <path
            d="M 16 11 A 6.5 6.5 0 1 1 10 4.5"
            stroke="#D3A853"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
          />
          {/* Brand accent node */}
          <circle cx="12.5" cy="2" r="2.2" fill="#D3A853" />
        </svg>
      </div>
    ),
    { ...size }
  )
}
