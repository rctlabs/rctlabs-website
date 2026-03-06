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
  source?: "knowledge_base" | "llm" | "hybrid" | "cache" | "fallback"
  model_used?: string
  tokens_used?: number
}

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
    sendMessage(input)
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
  }

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
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/30 flex items-center justify-center animate-glow-pulse"
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
            className={`fixed z-50 flex flex-col rounded-2xl border border-border glass shadow-2xl overflow-hidden transition-all duration-300 ${
              isExpanded
                ? "inset-4 md:inset-8"
                : "bottom-6 right-6 w-[400px] h-[560px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]"
            }`}
          >
            {/* ---------- Header ---------- */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-accent" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-500 border-2 border-background" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">RCT Assistant</p>
                  <div className="flex items-center gap-1">
                    <Badge variant="outline" className="text-[10px] px-1.5 py-0 text-accent border-accent/30">
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

            {/* ---------- Messages Area ---------- */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-3 space-y-3">

              {/* Scenario Picker (shown on first open) */}
              {showScenarios && messages.length === 0 && (
                <div className="space-y-3">
                  <div className="text-center py-2">
                    <Sparkles className="w-8 h-8 text-accent mx-auto mb-2" />
                    <p className="text-sm text-foreground font-medium">Welcome to RCT Ecosystem</p>
                    <p className="text-xs text-muted-foreground mt-1">เลือกหัวข้อที่สนใจ หรือพิมพ์คำถามของคุณ</p>
                  </div>
                  <div className="space-y-2">
                    {SCENARIOS.map((s) => (
                      <button
                        key={s.query}
                        onClick={() => handleScenario(s.query)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border border-border bg-card hover:border-accent/50 hover:bg-secondary/50 transition-all text-left group"
                      >
                        <span className="text-lg">{s.emoji}</span>
                        <span className="flex-1 text-sm text-muted-foreground group-hover:text-foreground">{s.label}</span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-accent" />
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
                          ? "bg-accent text-accent-foreground"
                          : "bg-card text-foreground border border-border"
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
                  <div className="bg-card border border-border rounded-xl px-3 py-2">
                    <Loader2 className="w-4 h-4 animate-spin text-accent" />
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
                    className="text-[11px] px-2 py-1 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-accent/50 transition-colors truncate max-w-[180px]"
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
                className="h-9 w-9 bg-accent hover:bg-accent/90 text-accent-foreground shrink-0"
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
