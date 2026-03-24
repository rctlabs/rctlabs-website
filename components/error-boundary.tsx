"use client"

/*
 * ErrorBoundary — React class component that catches render/lifecycle errors
 * Prevents white screen of death; shows friendly fallback UI
 * Usage: wrap any subtree that may throw with <ErrorBoundary>
 */
import { Component, type ReactNode } from "react"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import Link from "next/link"

interface Props {
  children: ReactNode
  /** Optional custom fallback instead of the default UI */
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Development only — surface the full component stack
    if (process.env.NODE_ENV === "development") {
      console.error("[ErrorBoundary]", error, info.componentStack)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (!this.state.hasError) return this.props.children

    if (this.props.fallback) return this.props.fallback

    return (
      <div className="flex min-h-100 w-full flex-col items-center justify-center gap-6 px-4 py-16">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground">Something went wrong</h2>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            An unexpected error occurred. Try refreshing the page or go back to the homepage.
          </p>
          {process.env.NODE_ENV === "development" && this.state.error && (
            <details className="mt-4 text-left rounded-lg border border-border bg-muted/40 p-3 max-w-lg">
              <summary className="cursor-pointer text-xs font-mono text-muted-foreground">Error details (dev only)</summary>
              <pre className="mt-2 overflow-auto text-xs text-destructive whitespace-pre-wrap">
                {this.state.error.toString()}
              </pre>
            </details>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            <Home className="h-4 w-4" />
            Home
          </Link>
        </div>
      </div>
    )
  }
}

export default ErrorBoundary
