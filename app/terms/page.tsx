import { Metadata } from "next"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = createBilingualMetadata(
  "en",
  "Terms of Service — RCT Labs",
  "ข้อกำหนดการให้บริการ — RCT Labs",
  "Terms of Service for RCT Labs website and services. Open-source components under Apache 2.0.",
  "ข้อกำหนดการให้บริการของ RCT Labs เว็บไซต์และบริการ ส่วนประกอบ Open-source ภายใต้ Apache 2.0",
  "/terms",
  ["terms of service", "RCT Labs terms", "Apache 2.0", "open source license"]
)

export default function TermsPage() {
  const sections = [
    {
      title: "1. Acceptance of Terms",
      content:
        "By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      title: "2. License to Use Website",
      content:
        "RCT Labs grants you a limited, non-exclusive, revocable license to access and use the website for personal, non-commercial purposes. You may not modify, copy, or distribute the website or its contents without our prior written permission.",
    },
    {
      title: "3. User Responsibilities",
      content:
        "You agree not to use the website for any unlawful purposes or in any way that could damage, disable, or impair our services. You are responsible for maintaining the confidentiality of any account credentials and for all activities that occur under your account.",
    },
    {
      title: "4. Intellectual Property Rights",
      content:
        "All content on this website, including text, graphics, logos, images, and software, is the property of RCT Labs or its content suppliers and is protected by international copyright laws. Unauthorized use is prohibited.",
    },
    {
      title: "5. Disclaimer of Warranties",
      content:
        "This website is provided on an 'as-is' basis without warranties of any kind, either express or implied. RCT Labs does not warrant that the website will be uninterrupted or error-free.",
    },
    {
      title: "6. Limitation of Liability",
      content:
        "To the fullest extent permitted by law, RCT Labs shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the website.",
    },
    {
      title: "7. Third-Party Content",
      content:
        "Our website may include content from third parties. RCT Labs is not responsible for the accuracy or legality of such third-party content.",
    },
    {
      title: "8. Indemnification",
      content:
        "You agree to indemnify and hold harmless RCT Labs from any claims, damages, or costs arising from your use of the website or violation of these terms.",
    },
    {
      title: "9. Modifications to Terms",
      content:
        "We reserve the right to modify these terms at any time. Continued use of the website following any such modifications constitutes your acceptance of the new terms.",
    },
    {
      title: "10. Open-Source Components",
      content:
        "The JITNA Protocol and core 41 algorithms are licensed under Apache 2.0. Enterprise features and managed services are subject to separate commercial licensing terms. See our pricing page for details.",
    },
    {
      title: "11. Governing Law",
      content:
        "These terms and conditions are governed by the laws of the Kingdom of Thailand, and you irrevocably submit to the jurisdiction of the courts in Bangkok, Thailand.",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <section className="mx-auto max-w-4xl px-4 py-12">
        <Link href="/" className="flex items-center gap-2 text-accent hover:text-accent/80 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="space-y-8">
          <div className="space-y-2">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: November 9, 2025</p>
          </div>

          <div className="space-y-6">
            {sections.map((section, i) => (
              <div key={i} className="space-y-2">
                <h2 className="text-2xl font-bold text-foreground">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
