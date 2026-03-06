import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata = {
  title: "Privacy Policy - RCT Labs",
  description: "Privacy policy for RCT Labs website and services",
}

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Introduction",
      content:
        "RCT Labs is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and share your personal information when you visit our website or use our services.",
    },
    {
      title: "2. Information We Collect",
      content:
        "We collect information you provide directly to us, such as when you fill out a contact form, subscribe to our newsletter, or create an account. This may include your name, email address, and message content. We also automatically collect certain information about how you interact with our website, including your IP address, browser type, and pages visited.",
    },
    {
      title: "3. How We Use Your Information",
      content:
        "We use the information we collect to respond to your inquiries, send you newsletters, improve our website and services, and comply with legal obligations. We will never sell or share your personal information with third parties without your explicit consent.",
    },
    {
      title: "4. Data Security",
      content:
        "We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure.",
    },
    {
      title: "5. Your Rights",
      content:
        "Depending on your location, you may have certain rights regarding your personal information, including the right to access, correct, or delete your data. Please contact us if you wish to exercise any of these rights.",
    },
    {
      title: "6. Cookies and Tracking",
      content:
        "We use cookies and similar tracking technologies to improve your experience on our website. You can control cookie settings in your browser preferences.",
    },
    {
      title: "7. Third-Party Links",
      content:
        "Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. Please review their privacy policies before sharing your information.",
    },
    {
      title: "8. Changes to This Policy",
      content:
        "We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our website and updating the effective date below.",
    },
    {
      title: "9. Contact Us",
      content: "If you have questions or concerns about this Privacy Policy, please contact us at hello@rctlabs.co",
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: November 9, 2025</p>
          </div>

          <div className="prose prose-invert max-w-none space-y-6">
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
