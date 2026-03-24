import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "RCT Labs - Intent Operating System",
    short_name: "RCT Labs",
    description: "Revolutionizing human-AI interaction through intent-driven design.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAF6F0",
    theme_color: "#D4A853",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-maskable-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-maskable-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: "/screenshot-540x720.png",
        sizes: "540x720",
        type: "image/png",
        form_factor: "narrow",
      },
      {
        src: "/screenshot-1280x720.png",
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
      },
    ],
  }
}
