"use client"

import { useState, useRef, useEffect, useCallback, Fragment, type FormEvent } from "react"
import { m, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Sparkles,
  X,
  Send,
  Loader2,
  RotateCcw,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Minimize2,
  Maximize2,
  CheckCircle,
} from "lucide-react"
import { getSupabaseBrowserClient } from "@/lib/auth/browser-client"
// Chat is proxied through /api/chat (server-side route) to hide backend credentials
// and provide graceful fallback when the backend is not yet deployed.

/* ------------------------------------------------------------------ */
/* Types                                                               */
/* ------------------------------------------------------------------ */

interface ChatMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  verified?: boolean
  intent?: string
  topic?: string | null
  suggestions?: string[]
  feedback?: "up" | "down" | null
  source?: "knowledge_base" | "llm" | "hybrid" | "cache" | "fallback" | "analysearch"
  model_used?: string
  tokens_used?: number
  isStreaming?: boolean
  isAuthError?: boolean
  metadata?: {
    intent?: string
    keywords?: string[]
    confidence?: number
    crystallized?: string
    iterations?: number
  }
}

type AnalysisMode = "chat" | "analyze" | "mirror"

/* ------------------------------------------------------------------ */
/* Quick-action scenarios shown on first open                          */
/* ------------------------------------------------------------------ */

const SCENARIOS = [
  { emoji: "🎯", label: "เข้าใจ RCT ใน 3 นาที", query: "What is RCT?" },
  { emoji: "🧪", label: "สูตร FDIA คืออะไร?", query: "What is the FDIA formula?" },
  { emoji: "✅", label: "ดู AI ตรวจ AI (SignedAI)", query: "How does SignedAI verification work?" },
  { emoji: "🧠", label: "รู้จักภาษา JITNA", query: "What is JITNA?" },
]

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [showScenarios, setShowScenarios] = useState(true)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // P7 — Session ID: persistent across page navigations within the same browser session
  const [sessionId] = useState<string>(() => {
    if (typeof window === "undefined") return "rctlabs-v0-ssr"
    const stored = sessionStorage.getItem("rct-session-id")
    if (stored) return stored
    const id = "rctlabs-v0-" + Date.now()
    sessionStorage.setItem("rct-session-id", id)
    return id
  })

  // P6 — Authenticated user ID from Supabase session
  const [userId, setUserId] = useState<string>("anonymous")
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const supabase = getSupabaseBrowserClient()
        const { data: { session } } = await supabase.auth.getSession()
        if (session?.user?.id) setUserId(session.user.id)
      } catch { /* not critical */ }
    }
    void fetchUserId()
  }, [])

  // Analysis mode state
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>("chat")
  // P8 — analysisResult is now read + used for metadata display
  const [analysisResult, setAnalysisResult] = useState<Record<string, unknown> | null>(null)

  /* Auto-scroll on new messages */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages, loading])

  /* Build conversation_history from last 6 messages for API context.
     Filters out empty streaming placeholders to avoid polluting history. */
  const buildHistory = useCallback((): Array<{ role: string; content: string; _topic?: string }> => {
    return messages.filter((m) => !m.isStreaming && m.content).slice(-6).map((_item) => ({
      role: _item.role,
      content: _item.content,
      ...(_item.topic ? { _topic: _item.topic } : {}),
    }))
  }, [messages])

  /* ---------------------------------------------------------------- */
  /* Send message to L3 API                                           */
  /* ---------------------------------------------------------------- */

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim() || loading) return

      // Capture history before any state changes
      const history = buildHistory()

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setLoading(true)
      setShowScenarios(false)

      // Add streaming placeholder immediately so user sees activity
      const assistantId = `asst-${Date.now()}`
      setMessages((prev) => [
        ...prev,
        {
          id: assistantId,
          role: "assistant" as const,
          content: "",
          timestamp: new Date(),
          feedback: null,
          source: "knowledge_base" as const,
          isStreaming: true,
        },
      ])

      try {
        const res = await fetch("/api/chat/stream", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            session_id: sessionId,
            message: text.trim(),
            language: typeof window !== "undefined" && window.location.pathname.startsWith("/th") ? "th" : "en",
            channel: "web",
            conversation_history: history,
          }),
        })

        if (!res.ok) {
          const isAuth = res.status === 401
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content: isAuth
                      ? "กรุณาล็อกอินก่อนใช้งาน RCT AI Assistant"
                      : "ขณะนี้ระบบ AI กำลังอยู่ในช่วงพัฒนา — ทีมงานกำลังเตรียม Backend สำหรับ production\nสามารถติดต่อทีมงานได้ที่ contact@rctlabs.co",
                    verified: false,
                    source: "fallback" as const,
                    isStreaming: false,
                    isAuthError: isAuth,
                  }
                : m,
            ),
          )
          return
        }

        const reader = res.body?.getReader()
        const decoder = new TextDecoder()
        let buffer = ""
        let accumulated = ""
        let finalMeta: Partial<ChatMessage> = {}

        if (reader) {
          // eslint-disable-next-line no-constant-condition
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            buffer += decoder.decode(value, { stream: true })
            const lines = buffer.split("\n")
            buffer = lines.pop() ?? ""
            for (const line of lines) {
              if (!line.startsWith("data: ")) continue
              const jsonStr = line.slice(6).trim()
              if (!jsonStr) continue
              try {
                const event = JSON.parse(jsonStr) as Record<string, unknown>
                if (event.done) {
                  finalMeta = {
                    verified: true,
                    intent: typeof event.intent === "string" ? event.intent : undefined,
                    topic: typeof event.topic === "string" ? event.topic : null,
                    suggestions: Array.isArray(event.suggestions) ? (event.suggestions as string[]) : [],
                    source: (event.source as ChatMessage["source"]) ?? "knowledge_base",
                  }
                } else {
                  accumulated += typeof event.token === "string" ? event.token : ""
                  setMessages((prev) =>
                    prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m)),
                  )
                }
              } catch {
                /* ignore malformed SSE event */
              }
            }
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content: accumulated || "ขออภัย — ไม่ได้รับข้อมูลจากระบบ",
                  isStreaming: false,
                  ...finalMeta,
                }
              : m,
          ),
        )
      } catch {
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId
              ? {
                  ...m,
                  content:
                    "ขณะนี้ระบบ AI กำลังอยู่ในช่วงพัฒนา — ทีมงานกำลังเตรียม Backend สำหรับ production\nสามารถติดต่อทีมงานได้ที่ contact@rctlabs.co หรือดูข้อมูลเพิ่มเติมได้ที่ /docs",
                  verified: false,
                  source: "fallback" as const,
                  isStreaming: false,
                }
              : m,
          ),
        )
      } finally {
        setLoading(false)
      }
    },
    [loading, buildHistory, userId, sessionId],
  )

  /* ---------------------------------------------------------------- */
  /* Handlers                                                          */
  /* ---------------------------------------------------------------- */

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    handleAnalysisSubmit(input)
  }

  function handleSuggestion(text: string) {
    sendMessage(text)
  }

  function handleScenario(query: string) {
    sendMessage(query)
  }

  function handleFeedback(msgId: string, type: "up" | "down") {
    setMessages((prev) =>
      prev.map((_item) => (_item.id === msgId ? { ..._item, feedback: type } : _item)),
    )
    // Fire-and-forget feedback to backend analytics — failure is non-critical
    void fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message_id: msgId, type, session_id: sessionId }),
    }).catch(() => { /* intentionally silent */ })
  }

  function handleClearChat() {
    setMessages([])
    setShowScenarios(true)
    setAnalysisResult(null)
  }

  // Analysis function
  const runAnalysis = useCallback(
    async (text: string, mode: AnalysisMode) => {
      if (!text.trim() || loading) return

      const userMsg: ChatMessage = {
        id: Date.now().toString(),
        role: "user",
        content: text.trim(),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, userMsg])
      setInput("")
      setLoading(true)
      setShowScenarios(false)

      try {
        const endpoint = mode === "mirror" 
          ? `/api/mirror?max_iterations=3`
          : `/api/analyze`
        
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: text.trim(),
            mode: mode === "mirror" ? "mirror" : "deep",
            query_type: "general",
            complexity: "high",
            session_id: sessionId,
          }),
        })

        if (!res.ok) {
          const isAuth = res.status === 401
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: "assistant" as const,
              content: isAuth
                ? "กรุณาล็อกอินก่อนใช้งาน RCT AI Assistant"
                : "ขออภัย — ไม่สามารถวิเคราะห์คำถามได้ในขณะนี้",
              timestamp: new Date(),
              verified: false,
              source: "fallback" as const,
              isAuthError: isAuth,
            },
          ])
          return
        }

        const data = await res.json()
        setAnalysisResult(data)

        // Format analysis result for display
        const analysis = data.analysis || {}
        const formattedContent = formatAnalysisResult(analysis)

        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: formattedContent,
            timestamp: new Date(),
            verified: data.status === "success",
            source: data.source || "analysearch",
            metadata: {
              intent: analysis.intent,
              keywords: analysis.keywords,
              confidence: analysis.confidence,
              crystallized: analysis.crystallized,
              iterations: analysis.iterations,
            },
          },
        ])
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "ขออภัย — ไม่สามารถวิเคราะห์คำถามได้ในขณะนี้",
            timestamp: new Date(),
            verified: false,
            source: "fallback",
          },
        ])
      } finally {
        setLoading(false)
      }
    },
    [loading, sessionId]
  )

  // Format analysis result
  const formatAnalysisResult = (analysis: Record<string, unknown>): string => {
    const lines: string[] = []
    
    // If backend is in fallback mode, show the helpful reply directly
    if (typeof analysis.reply === "string") {
      return analysis.reply
    }
    if (analysis.intent) {
      lines.push(`**Intent Detected:** ${analysis.intent}`)
    }
    if (analysis.confidence) {
      lines.push(`**Confidence:** ${((analysis.confidence as number) * 100).toFixed(1)}%`)
    }
    if (analysis.keywords && Array.isArray(analysis.keywords) && (analysis.keywords as string[]).length > 0) {
      lines.push(`**Keywords:** ${(analysis.keywords as string[]).join(", ")}`)
    }
    if (analysis.crystallized) {
      lines.push(`\n**Crystallized:** ${analysis.crystallized}`)
    }
    if (analysis.iterations) {
      lines.push(`**Mirror Iterations:** ${analysis.iterations}`)
    }
    
    return lines.join("\n") || "No analysis data available"
  }

  // Auto-classify user intent → choose the best analysis mode
  function classifyIntent(text: string): AnalysisMode {
    const lower = text.toLowerCase()
    const ANALYZE_KEYWORDS = [
      "architecture", "layer", "algorithm", "fdia", "jitna", "signemai", "signedai",
      "consensus", "rctdb", "genome", "benchmark", "hallucination", "แสดง", "วิเคราะห์",
      "อธิบาย", "explain", "compare", "compare", "breakdown", "how does", "what is",
      "สถาปัตยกรรม", "โปรโตคอล",
    ]
    const MIRROR_KEYWORDS = [
      "refine", "improve", "rewrite", "revise", "better", "alternative", "version",
      "ปรับปรุง", "เขียนใหม่", "แก้ไข",
    ]
    if (MIRROR_KEYWORDS.some((kw) => lower.includes(kw))) return "mirror"
    if (text.length > 80 || ANALYZE_KEYWORDS.some((kw) => lower.includes(kw))) return "analyze"
    return "chat"
  }

  // Handle analysis mode submission
  const handleAnalysisSubmit = useCallback(
    (text: string) => {
      const detectedMode = classifyIntent(text)
      if (detectedMode !== analysisMode) {
        setAnalysisMode(detectedMode)
      }
      if (detectedMode === "chat") {
        sendMessage(text)
      } else {
        runAnalysis(text, detectedMode)
      }
    },
    [analysisMode, sendMessage, runAnalysis]
  )

  /* ---------------------------------------------------------------- */
  /* Source indicator helper                                           */
  /* ---------------------------------------------------------------- */

  function sourceIndicator(msg: ChatMessage) {
    if (msg.source === "llm") {
      return (
        <span className="text-purple-400" title={`Answered by ${msg.model_used || "Ollama LLM"}`}>
          🤖
        </span>
      )
    }
    if (msg.source === "hybrid") {
      return (
        <span className="text-blue-400" title={`Hybrid KB+LLM (${msg.model_used || "Ollama"})`}>
          🔗
        </span>
      )
    }
    if (msg.source === "cache") {
      return (
        <span className="text-cyan-400" title="Cached response (instant)">
          ⚡
        </span>
      )
    }
    if (msg.source === "fallback") {
      return (
        <span className="text-yellow-400" title="Fallback response">
          ⚠️
        </span>
      )
    }
    return (
      <span className="text-green-400" title="Answered by RCT Knowledge Base">
        ✓
      </span>
    )
  }

  /* ---------------------------------------------------------------- */
  /* Minimal inline markdown renderer (bold + inline code)           */
  /* Used inside whitespace-pre-line container — handles \n natively  */
  /* ---------------------------------------------------------------- */
  function renderMarkdown(text: string) {
    const parts = text.split(/(\*\*[^*\n]+\*\*|`[^`\n]+`)/g)
    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={i} className="font-semibold">{part.slice(2, -2)}</strong>
      }
      if (part.startsWith("`") && part.endsWith("`")) {
        return (
          <code key={i} className="font-mono text-[0.8em] bg-warm-amber/20 dark:bg-warm-amber/10 px-1 rounded">
            {part.slice(1, -1)}
          </code>
        )
      }
      return <Fragment key={i}>{part}</Fragment>
    })
  }

  /* ---------------------------------------------------------------- */
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  const lastAssistant = [...messages].reverse().find((msg) => msg.role === "assistant")
  const suggestions = lastAssistant?.suggestions || []

  return (
    <>
      {/* ============ Floating Button ============ */}
      <AnimatePresence>
        {!isOpen && (
          <m.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-warm-charcoal text-warm-sand dark:bg-warm-amber dark:text-warm-charcoal shadow-lg shadow-warm-amber/20 flex items-center justify-center animate-glow-pulse"
            aria-label="Open AI Assistant"
          >
            <Sparkles className="w-6 h-6" />
          </m.button>
        )}
      </AnimatePresence>

      {/* ============ Chat Panel ============ */}
      <AnimatePresence>
        {isOpen && (
          <m.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={`fixed z-50 flex flex-col rounded-2xl border border-warm-light-gray dark:border-border bg-background/85 backdrop-blur-2xl shadow-2xl overflow-hidden transition-all duration-300 ${
              isExpanded
                ? "inset-4 md:inset-8"
                : "bottom-6 right-6 w-100 h-140 max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]"
            }`}
          >
            {/* ---------- Header ---------- */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-warm-light-gray dark:border-border bg-transparent">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-warm-amber/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-warm-amber" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">RCT Assistant</p>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-xs px-1.5 py-0 text-warm-amber border-warm-amber/30">
                      SignedAI
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    className="p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground"
                    title="Clear conversation"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground"
                  aria-label={isExpanded ? "Minimize" : "Expand"}
                >
                  {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-secondary rounded-md transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* ---------- Analysis Mode Selector ---------- */}
            <div className="flex items-center gap-1 px-3 py-2 border-b border-warm-light-gray dark:border-[#2A2A2A] bg-warm-cream/60 dark:bg-[#141414]/60">
              <button
                onClick={() => setAnalysisMode("chat")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  analysisMode === "chat"
                    ? "bg-warm-charcoal text-warm-sand dark:bg-warm-amber dark:text-warm-charcoal"
                    : "text-[#6B6B5B] dark:text-[#888] hover:text-warm-charcoal dark:hover:text-warm-light-gray hover:bg-[#EDE8E0] dark:hover:bg-[#2A2A2A]"
                }`}
              >
                <span>💬</span>
                <span>Chat</span>
              </button>
              <button
                onClick={() => setAnalysisMode("analyze")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  analysisMode === "analyze"
                    ? "bg-warm-charcoal text-warm-sand dark:bg-warm-amber dark:text-warm-charcoal"
                    : "text-[#6B6B5B] dark:text-[#888] hover:text-warm-charcoal dark:hover:text-warm-light-gray hover:bg-[#EDE8E0] dark:hover:bg-[#2A2A2A]"
                }`}
              >
                <span>🔍</span>
                <span>Analyze</span>
              </button>
              <button
                onClick={() => setAnalysisMode("mirror")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  analysisMode === "mirror"
                    ? "bg-warm-charcoal text-warm-sand dark:bg-warm-amber dark:text-warm-charcoal"
                    : "text-[#6B6B5B] dark:text-[#888] hover:text-warm-charcoal dark:hover:text-warm-light-gray hover:bg-[#EDE8E0] dark:hover:bg-[#2A2A2A]"
                }`}
              >
                <span>🪞</span>
                <span>Mirror</span>
              </button>
              {analysisMode !== "chat" && (
                <span className="ml-auto text-xs text-muted-foreground">
                  {analysisMode === "mirror" ? "Iterative refinement" : "Deep intent analysis"}
                </span>
              )}
            </div>

            {/* ---------- Messages Area ---------- */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">

              {/* Scenario Picker (shown on first open) */}
              {showScenarios && messages.length === 0 && (
                <div className="space-y-3">
                  <div className="text-center py-2">
                    <Sparkles className="w-8 h-8 text-warm-amber mx-auto mb-2" />
                    <p className="text-sm text-foreground font-medium">Welcome to RCT Ecosystem</p>
                    <p className="text-xs text-muted-foreground mt-1">เลือกหัวข้อที่สนใจ หรือพิมพ์คำถามของคุณ</p>
                  </div>
                  <div className="space-y-2">
                    {SCENARIOS.map((s) => (
                      <button
                        key={s.query}
                        onClick={() => handleScenario(s.query)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-warm-light-gray dark:border-[#2A2A2A] bg-warm-cream dark:bg-[#1E1E1E] hover:border-warm-amber/50 hover:bg-[#F5EFE6] dark:hover:bg-[#2A2A2A] transition-all text-left group"
                      >
                        <span className="text-lg">{s.emoji}</span>
                        <span className="flex-1 text-sm text-muted-foreground group-hover:text-foreground">{s.label}</span>
                        <ChevronRight className="w-4 h-4 text-[#999] group-hover:text-warm-amber" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((msg) => (
                <div key={msg.id}>
                  <div className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[85%] rounded-xl px-3 py-2 text-sm whitespace-pre-line ${
                        msg.role === "user"
                          ? "bg-warm-charcoal text-warm-sand dark:bg-warm-amber dark:text-warm-charcoal"
                          : "bg-[#EDE8E0] dark:bg-[#1E1E1E] text-warm-charcoal dark:text-warm-light-gray border border-[#D8D3CC] dark:border-[#2A2A2A]"
                      }`}
                    >
                      {msg.role === "assistant" ? renderMarkdown(msg.content) : msg.content}
                      {msg.isStreaming && (
                        <span className="inline-block w-0.5 h-3.5 bg-warm-amber animate-pulse ml-0.5 align-text-bottom" />
                      )}
                      {msg.role === "assistant" && !msg.isStreaming && (
                        <span className="ml-1 text-xs">
                          {sourceIndicator(msg)}
                        </span>
                      )}
                      {msg.isAuthError && (
                        <div className="mt-2 pt-2 border-t border-border/50">
                          <a href="/auth/signin" className="text-xs text-warm-amber hover:underline">
                            → ล็อกอินเพื่อใช้งาน RCT AI Assistant
                          </a>
                        </div>
                      )}

                      {/* Verification Badge */}
                      {msg.role === "assistant" && msg.verified && (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-xs font-mono text-green-400">SignedAI Verified</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Feedback buttons for assistant messages */}
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1 mt-1 ml-1">
                      <button
                        onClick={() => handleFeedback(msg.id, "up")}
                        className={`p-0.5 rounded ${
                          msg.feedback === "up"
                            ? "text-green-400"
                            : "text-muted-foreground/40 hover:text-muted-foreground"
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => handleFeedback(msg.id, "down")}
                        className={`p-0.5 rounded ${
                          msg.feedback === "down"
                            ? "text-red-400"
                            : "text-muted-foreground/40 hover:text-muted-foreground"
                        }`}
                      >
                        <ThumbsDown className="w-3 h-3" />
                      </button>
                      {msg.intent && (
                        <span className="text-xs text-muted-foreground/60 ml-1">{msg.intent}</span>
                      )}
                      {msg.source === "llm" && msg.model_used && (
                        <span className="text-xs text-muted-foreground/60 ml-1">({msg.model_used})</span>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator — only for analyze/mirror mode.
                  Chat mode uses live-streaming message bubble instead. */}
              {loading && !messages.some((m) => m.isStreaming) && (
                <div className="flex justify-start">
                  <div className="bg-[#EDE8E0] dark:bg-[#1E1E1E] border border-[#D8D3CC] dark:border-[#2A2A2A] rounded-xl px-3 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-warm-amber" />
                  </div>
                </div>
              )}
            </div>

            {/* ---------- Suggestions ---------- */}
            {suggestions.length > 0 && !loading && (
              <div className="px-3 pb-1 flex flex-wrap gap-1">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="text-xs px-2 py-1 rounded-full border border-warm-light-gray dark:border-[#2A2A2A] text-[#6B6B5B] dark:text-[#888] hover:text-warm-charcoal dark:hover:text-warm-light-gray hover:border-warm-amber/50 transition-colors truncate max-w-45"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* ---------- P8: Analysis Result Metadata Strip ---------- */}
            {analysisResult && analysisMode !== "chat" && (
              <div className="mx-3 mb-1 px-3 py-2 rounded-lg bg-warm-amber/5 border border-warm-amber/20 text-xs text-muted-foreground flex items-center gap-3 flex-wrap">
                <span className="text-warm-amber font-medium">
                  {analysisMode === "mirror" ? "🪞 Mirror" : "🔍 Analyse"}
                </span>
                {typeof (analysisResult as Record<string, unknown>).status === "string" && (
                  <span>Status: {String((analysisResult as Record<string, unknown>).status)}</span>
                )}
                {typeof ((analysisResult as Record<string, unknown>).analysis as Record<string, unknown> | undefined)?.confidence === "number" && (
                  <span>Confidence: {(((analysisResult as Record<string, unknown>).analysis as Record<string, unknown>).confidence as number * 100).toFixed(0)}%</span>
                )}
                {typeof ((analysisResult as Record<string, unknown>).analysis as Record<string, unknown> | undefined)?.iterations === "number" && (
                  <span>Iterations: {((analysisResult as Record<string, unknown>).analysis as Record<string, unknown>).iterations as number}</span>
                )}
                <button
                  onClick={() => setAnalysisResult(null)}
                  className="ml-auto text-muted-foreground/50 hover:text-muted-foreground"
                  aria-label="Dismiss"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            )}

            {/* ---------- Input ---------- */}
            <form onSubmit={handleSubmit} className="border-t border-border px-3 py-2 flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about RCT Ecosystem..."
                className="flex-1 h-9 text-sm bg-secondary/30"
                disabled={loading}
              />
              <Button
                type="submit"
                size="icon"
                className="h-9 w-9 bg-warm-charcoal hover:bg-[#333] dark:bg-warm-amber dark:hover:bg-[#C49A48] text-warm-sand dark:text-warm-charcoal shrink-0"
                disabled={loading || !input.trim()}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </m.div>
        )}
      </AnimatePresence>
    </>
  )
}
