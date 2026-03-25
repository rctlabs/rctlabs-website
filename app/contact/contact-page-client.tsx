"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import ContactForm from "@/components/contact-form"
import { useLanguage } from "@/components/language-provider"
import { buildContactHref, getFunnelIntent } from "@/lib/funnel"
import Link from "next/link"
import { Mail, MessageSquare, MapPin } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function ContactPageClient() {
  const { language } = useLanguage()
  const isTh = language === "th"
  const searchParams = useSearchParams()
  const contextKey = searchParams.get("context")
  const funnelIntent = getFunnelIntent(language, contextKey)

  const contactInfo = [
    {
      icon: Mail,
      label: isTh ? "อีเมล" : "Email",
      value: "hello@rctlabs.co",
      href: "mailto:hello@rctlabs.co",
    },
    {
      icon: MapPin,
      label: isTh ? "ที่ตั้ง" : "Location",
      value: isTh ? "Bangkok, Thailand" : "Bangkok, Thailand",
      href: "#",
    },
    {
      icon: MessageSquare,
      label: isTh ? "คอมมูนิตี้" : "Discord",
      value: isTh ? "เข้าร่วมคอมมูนิตี้" : "Join Community",
      href: "https://discord.gg/rctlabs",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">
            {isTh ? "ติดต่อเรา" : "Get in Touch"}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            {isTh
              ? "มีคำถามเกี่ยวกับ RCT Labs หรืออยากร่วมงานกับเรา? เรายินดีพูดคุยกับคุณ"
              : "Have questions about RCT Labs? Want to collaborate? We'd love to hear from you."}
          </p>
          {funnelIntent ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-warm-amber/30 bg-warm-amber/10 px-5 py-4 text-left">
              <div className="text-sm font-semibold text-foreground">{funnelIntent.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{funnelIntent.description}</p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="mx-auto max-w-4xl px-4 py-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Contact Info */}
        <div className="md:col-span-1 space-y-6">
          {contactInfo.map((item, i) => {
            const Icon = item.icon
            return (
              <Link
                key={i}
                href={item.href}
                className="group block p-6 rounded-lg border border-border bg-card hover:border-accent/50 transition"
              >
                <Icon className="w-8 h-8 text-accent mb-4" />
                <h3 className="font-semibold text-foreground mb-2">{item.label}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-accent transition">{item.value}</p>
              </Link>
            )
          })}
        </div>

        {/* Form */}
        <div className="md:col-span-2">
          <ContactForm
            language={language}
            initialContext={funnelIntent?.context ?? "contact"}
            initialValues={{
              subject: funnelIntent?.subject ?? "",
              message: funnelIntent?.message ?? "",
            }}
          />
        </div>
      </section>

      {/* Additional Contact Options */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">{isTh ? "สอบถามทั่วไป" : "General Inquiries"}</h3>
            <p className="text-muted-foreground">{isTh ? "สำหรับคำถามทั่วไปและข้อมูลเกี่ยวกับ RCT Labs" : "For general questions and information about RCT Labs"}</p>
            <p className="text-sm font-medium text-accent">hello@rctlabs.co</p>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">{isTh ? "พาร์ตเนอร์" : "Partnership"}</h3>
            <p className="text-muted-foreground">{isTh ? "สนใจร่วมงานหรือเป็นพาร์ตเนอร์กับเรา" : "Interested in collaborating or partnering with us"}</p>
            <Link href={buildContactHref(language, "pricing:rctlabs:sales")} className="text-sm font-medium text-accent hover:underline">
              {isTh ? "ดูรายละเอียด →" : "Learn More →"}
            </Link>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">{isTh ? "ร่วมงานกับเรา" : "Careers"}</h3>
            <p className="text-muted-foreground">{isTh ? "ร่วมเป็นส่วนหนึ่งของทีมที่กำลังสร้างอนาคตของ AI" : "Join our team and help shape the future of AI"}</p>
            <Link href="/company/careers" className="text-sm font-medium text-accent hover:underline">
              {isTh ? "ดูตำแหน่งงาน →" : "View Openings →"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
