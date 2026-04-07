import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RCT Labs - Intent Operating System",
    short_name: "RCT Labs",
    description: "Public-facing RCT Labs snapshot for enterprise AI architecture, verification, and benchmark framing.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF6F0",
    theme_color: "#D4A853",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/RCTicon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
