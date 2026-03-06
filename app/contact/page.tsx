import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import ContactPageClient from "./contact-page-client"

export const metadata: Metadata = createPageMetadata({
  title: "Contact Us",
  description: "Get in touch with RCT Labs for inquiries, collaborations, or to join our community.",
  // Relative path to the current file
  relativePath: "./page.tsx",
})

export default function ContactPage() {
  return <ContactPageClient />
}
