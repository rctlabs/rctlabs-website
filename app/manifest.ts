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
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-light-32x32.png",
        sizes: "32x32",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
        purpose: "any",
      },
    ],
  }
}
