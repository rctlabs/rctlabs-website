"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useState } from "react"
import { Mail, MessageSquare, MapPin, AlertCircle, CheckCircle } from "lucide-react"

interface FormErrors {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export default function ContactPageClient() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [serverError, setServerError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setServerError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        if (result.errors) {
          setErrors(result.errors)
        } else {
          setServerError(result.message || "An error occurred. Please try again.")
        }
      } else {
        setSubmitted(true)
        e.currentTarget.reset()
      }
    } catch (error) {
      setServerError("Failed to send message. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      setLoading(false)
    }
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "hello@rctlabs.co",
      href: "mailto:hello@rctlabs.co",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "San Francisco, CA",
      href: "#",
    },
    {
      icon: MessageSquare,
      label: "Discord",
      value: "Join Community",
      href: "https://discord.gg/rctlabs",
    },
  ]

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-24 md:py-32">
        <div className="space-y-6 text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground text-balance leading-tight">Get in Touch</h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Have questions about RCT Labs? Want to collaborate? We'd love to hear from you.
          </p>
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
          {submitted ? (
            <div className="text-center space-y-6 py-12">
              <div className="flex justify-center">
                <CheckCircle className="w-16 h-16 text-accent" />
              </div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold text-foreground">Thank You!</h2>
                <p className="text-lg text-muted-foreground">
                  We've received your message and will get back to you soon.
                </p>
              </div>
              <Button variant="outline" asChild onClick={() => setSubmitted(false)}>
                <button>Send Another Message</button>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 bg-card p-8 rounded-lg border border-border">
              {serverError && (
                <div className="flex gap-3 p-4 bg-destructive/10 border border-destructive/30 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{serverError}</p>
                </div>
              )}

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="Your name"
                  className={errors.name ? "border-destructive" : ""}
                  aria-invalid={!!errors.name}
                  aria-describedby={errors.name ? "name-error" : undefined}
                />
                {errors.name && (
                  <p id="name-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={errors.email ? "border-destructive" : ""}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.email}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  required
                  placeholder="What is this about?"
                  className={errors.subject ? "border-destructive" : ""}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? "subject-error" : undefined}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell us more..."
                  rows={6}
                  className={errors.message ? "border-destructive" : ""}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-error" : undefined}
                />
                {errors.message && (
                  <p id="message-error" className="text-sm text-destructive mt-1 flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" />
                    {errors.message}
                  </p>
                )}
              </div>

              <Button type="submit" size="lg" disabled={loading} className="w-full">
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </section>

      {/* Additional Contact Options */}
      <section className="mx-auto max-w-7xl px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">General Inquiries</h3>
            <p className="text-muted-foreground">For general questions and information about RCT Labs</p>
            <p className="text-sm font-medium text-accent">hello@rctlabs.co</p>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Partnership</h3>
            <p className="text-muted-foreground">Interested in collaborating or partnering with us</p>
            <Link href="/company/partners" className="text-sm font-medium text-accent hover:underline">
              Learn More →
            </Link>
          </div>
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-foreground">Careers</h3>
            <p className="text-muted-foreground">Join our team and help shape the future of AI</p>
            <Link href="/company/careers" className="text-sm font-medium text-accent hover:underline">
              View Openings →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
