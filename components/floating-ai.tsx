"use client"

import { useState, useRef, useEffect, useCallback, type FormEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
import { API_URL } from "@/lib/constants"

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

const SESSION_ID = "rctlabs-v0-" + Date.now()

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
  
  // Analysis mode state
  const [analysisMode, setAnalysisMode] = useState<AnalysisMode>("chat")
  const [, setAnalysisResult] = useState<Record<string, unknown> | null>(null)

  /* Auto-scroll on new messages */
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" })
    }
  }, [messages, loading])

  /* Build conversation_history from last 6 messages for API context */
  const buildHistory = useCallback((): Array<{ role: string; content: string; _topic?: string }> => {
    return messages.slice(-6).map((m) => ({
      role: m.role,
      content: m.content,
      ...(m.topic ? { _topic: m.topic } : {}),
    }))
  }, [messages])

  /* ---------------------------------------------------------------- */
  /* Send message to L3 API                                           */
  /* ---------------------------------------------------------------- */

  const sendMessage = useCallback(
    async (text: string) => {
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
        const res = await fetch(`${API_URL}/rctlabs/assistant/chat`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: "anonymous",
            session_id: SESSION_ID,
            message: text.trim(),
            language: "en",
            channel: "web",
            conversation_history: buildHistory(),
          }),
        })

        if (!res.ok) throw new Error("API error")

        const data = await res.json()
        setMessages((prev) => [
          ...prev,
          {
            id: data.execution_id || (Date.now() + 1).toString(),
            role: "assistant",
            content: data.reply,
            timestamp: new Date(),
            verified: true,
            intent: data.intent,
            topic: data.topic,
            suggestions: data.suggestions || [],
            feedback: null,
            source: data.source || "knowledge_base",
            model_used: data.model_used,
            tokens_used: data.tokens_used,
          },
        ])
      } catch {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content: "ขออภัย — ระบบ backend ยังไม่พร้อมใช้งานในขณะนี้ กรุณาลองอีกครั้ง",
            timestamp: new Date(),
            verified: false,
            feedback: null,
          },
        ])
      } finally {
        setLoading(false)
      }
    },
    [loading, buildHistory],
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
      prev.map((m) => (m.id === msgId ? { ...m, feedback: type } : m)),
    )
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
          ? `${API_URL}/rctlabs/assistant/mirror?max_iterations=3`
          : `${API_URL}/rctlabs/assistant/analyze`
        
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: text.trim(),
            mode: mode === "mirror" ? "mirror" : "deep",
            query_type: "general",
            complexity: "high",
            session_id: SESSION_ID,
          }),
        })

        if (!res.ok) throw new Error("API error")

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
    [loading]
  )

  // Format analysis result
  const formatAnalysisResult = (analysis: Record<string, unknown>): string => {
    const lines: string[] = []
    
    if (analysis.intent) {
      lines.push(`**Intent Detected:** ${analysis.intent}`)
    }
    if (analysis.confidence) {
      lines.push(`**Confidence:** ${((analysis.confidence as number) * 100).toFixed(1)}%`)
    }
    if (analysis.keywords && Array.isArray(analysis.keywords)) {
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

  // Handle analysis mode submission
  const handleAnalysisSubmit = useCallback(
    (text: string) => {
      if (analysisMode === "chat") {
        sendMessage(text)
      } else {
        runAnalysis(text, analysisMode)
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
  /* Render                                                            */
  /* ---------------------------------------------------------------- */

  const lastAssistant = [...messages].reverse().find((m) => m.role === "assistant")
  const suggestions = lastAssistant?.suggestions || []

  return (
    <>
      {/* ============ Floating Button ============ */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-warm-charcoal text-warm-sand dark:bg-warm-amber dark:text-warm-charcoal shadow-lg shadow-warm-amber/20 flex items-center justify-center animate-glow-pulse"
            aria-label="Open AI Assistant"
          >
            <Sparkles className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ============ Chat Panel ============ */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
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
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-warm-amber border-warm-amber/30">
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
                <span className="ml-auto text-[10px] text-muted-foreground">
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
                      {msg.content}
                      {msg.role === "assistant" && (
                        <span className="ml-1 text-[10px]">
                          {sourceIndicator(msg)}
                        </span>
                      )}

                      {/* Verification Badge */}
                      {msg.role === "assistant" && msg.verified && (
                        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-[10px] font-mono text-green-400">SignedAI Verified</span>
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
                        <span className="text-[10px] text-muted-foreground/60 ml-1">{msg.intent}</span>
                      )}
                      {msg.source === "llm" && msg.model_used && (
                        <span className="text-[10px] text-muted-foreground/60 ml-1">({msg.model_used})</span>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {/* Loading indicator */}
              {loading && (
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
                    className="text-[11px] px-2 py-1 rounded-full border border-warm-light-gray dark:border-[#2A2A2A] text-[#6B6B5B] dark:text-[#888] hover:text-warm-charcoal dark:hover:text-warm-light-gray hover:border-warm-amber/50 transition-colors truncate max-w-45"
                  >
                    {s}
                  </button>
                ))}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
