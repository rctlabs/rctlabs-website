import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import HomePageClient from "./HomePageClient"

export const metadata: Metadata = createPageMetadata(
  "RCT Labs - Intent Operating System",
  "Revolutionizing human-AI interaction through intent-driven design. Explore cutting-edge philosophy, research, and open protocols.",
  "/",
)

export default function HomePage() {
  return <HomePageClient />
}
