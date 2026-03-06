"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { AlertCircle, CheckCircle } from "lucide-react"

export function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const result = await response.json()

      if (!response.ok) {
        setStatus("error")
        setMessage(result.error || "Failed to subscribe")
      } else {
        setStatus("success")
        setMessage(result.message || "Successfully subscribed!")
        setEmail("")
        setTimeout(() => {
          setStatus("idle")
          setMessage("")
        }, 5000)
      }
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred. Please try again.")
    }
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "success"}
          required
          className="flex-1"
          aria-label="Email for newsletter"
        />
        <Button type="submit" disabled={status === "loading" || status === "success"} size="sm">
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>

      {status === "success" && (
        <div className="flex gap-2 p-3 bg-accent/10 border border-accent/30 rounded-lg">
          <CheckCircle className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
          <p className="text-sm text-accent">{message}</p>
        </div>
      )}

      {status === "error" && (
        <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg">
          <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{message}</p>
        </div>
      )}
    </div>
  )
}
