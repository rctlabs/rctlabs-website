import type { Metadata } from "next"
import { createPageMetadata } from "@/lib/seo"
import ContactPageClient from "./contact-page-client"

export const metadata: Metadata = createPageMetadata(
  "Contact Us",
  "Get in touch with RCT Labs for inquiries, collaborations, or to join our community.",
  "/contact"
)

export default function ContactPage() {
  return <ContactPageClient />
}
