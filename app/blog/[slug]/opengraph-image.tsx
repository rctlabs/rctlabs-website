import { ImageResponse } from "next/og"
import { getBlogPostBySlug, getBlogCategoryLabel } from "@/lib/blog"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

const CATEGORY_COLORS: Record<string, string> = {
  release: "#d946ef",
  research: "#3b82f6",
  news: "#22c55e",
  tutorial: "#a855f7",
  philosophy: "#f97316",
  case_study: "#06b6d4",
}

interface OgImageProps {
  params: Promise<{ slug: string }>
}

export default async function BlogOgImage({ params }: OgImageProps) {
  const { slug } = await params
  const post = getBlogPostBySlug(slug, "en")

  const title = post?.title ?? "RCT Labs Blog"
  const category = post?.category ?? "research"
  const excerpt = post?.excerpt ?? "Enterprise AI research and insights from RCT Labs."
  const accentColor = CATEGORY_COLORS[category] ?? "#f59e0b"
  const categoryLabel = getBlogCategoryLabel(category, "en")

  // Truncate to ~80 chars for OG display
  const displayTitle = title.length > 72 ? title.slice(0, 70) + "…" : title
  const displayExcerpt = excerpt.length > 110 ? excerpt.slice(0, 108) + "…" : excerpt

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0a0a0a 0%, #111827 60%, #1a1a2e 100%)",
          fontFamily: "system-ui, sans-serif",
          position: "relative",
        }}
      >
        {/* Amber glow left */}
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(212,168,83,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Category accent strip — top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
            background: accentColor,
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
            padding: "48px 60px 44px",
          }}
        >
          {/* Top: RCT Labs brand + category */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 10,
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span style={{ fontSize: 22, fontWeight: 800, color: "#0a0a0a" }}>R</span>
              </div>
              <span style={{ fontSize: 20, fontWeight: 600, color: "#d1d5db" }}>RCT Labs</span>
              <span style={{ color: "#4b5563", fontSize: 20, marginLeft: 4 }}>/ Blog</span>
            </div>
            <div
              style={{
                padding: "6px 16px",
                borderRadius: 20,
                border: `1px solid ${accentColor}50`,
                background: `${accentColor}18`,
                fontSize: 14,
                fontWeight: 600,
                color: accentColor,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              {categoryLabel}
            </div>
          </div>

          {/* Center: Article title */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
            <h1
              style={{
                fontSize: displayTitle.length > 50 ? 48 : 58,
                fontWeight: 700,
                color: "#f9fafb",
                margin: 0,
                lineHeight: 1.12,
                letterSpacing: "-0.025em",
              }}
            >
              {displayTitle}
            </h1>
            <p
              style={{
                fontSize: 22,
                color: "#9ca3af",
                margin: 0,
                lineHeight: 1.5,
                maxWidth: 820,
              }}
            >
              {displayExcerpt}
            </p>
          </div>

          {/* Bottom: RCT Labs + tagline */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span
              style={{
                fontSize: 16,
                color: "#6b7280",
                letterSpacing: "0.02em",
              }}
            >
              rctlabs.co
            </span>
            <span
              style={{
                fontSize: 15,
                color: "#4b5563",
                fontStyle: "italic",
              }}
            >
              Intent-Centric AI Operating System
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
