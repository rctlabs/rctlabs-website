"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-background flex flex-col justify-center items-center text-center space-y-8 px-4">
      <div className="space-y-4">
        <h1 className="text-6xl md:text-7xl font-bold text-accent">500</h1>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Something Went Wrong</h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          We encountered an unexpected error. Please try again or contact our support team if the problem persists.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <Button size="lg" onClick={() => reset()}>
          Try Again
        </Button>
        <Button size="lg" variant="outline" asChild>
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}
