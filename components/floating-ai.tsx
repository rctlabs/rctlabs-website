"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { 
  X, 
  Send, 
  Minimize2, 
  Maximize2,
  Shield,
  CheckCircle,
  Loader2,
  Sparkles
} from "lucide-react"

interface Message {
  id: string
  role: "user" | "assistant" | "system"
  content: string
  verified?: boolean
  tier?: string
  thinking?: string[]
}

export function FloatingAI() {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "system",
      content: "RCT Assistant initialized. SignedAI verification active.",
    }
  ])
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingLogs, setThinkingLogs] = useState<string[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, thinkingLogs])

  const simulateThinking = async () => {
    const logs = [
      "> Parsing intent structure...",
      "> Accessing RCTDB...",
      "> Querying knowledge base...",
      "> Running Tier-4 verification...",
      "> SignedAI consensus check...",
      "> Generating response...",
    ]

    for (const log of logs) {
      setThinkingLogs(prev => [...prev, log])
      await new Promise(resolve => setTimeout(resolve, 300))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isThinking) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsThinking(true)
    setThinkingLogs([])

    await simulateThinking()

    // Simulate response
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: "assistant",
      content: `I understand you're asking about "${input.trim()}". This is a demo of the RCT Floating AI Assistant. In production, this would connect to the full RCT infrastructure for intent-driven responses.`,
      verified: true,
      tier: "S-4",
      thinking: thinkingLogs,
    }

    setMessages(prev => [...prev, assistantMessage])
    setIsThinking(false)
    setThinkingLogs([])
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg animate-glow-pulse transition-transform hover:scale-105"
        aria-label="Open AI Assistant"
      >
        <Sparkles className="w-6 h-6" />
      </button>
    )
  }

  return (
    <div 
      className={`fixed z-50 glass border border-border rounded-lg shadow-2xl flex flex-col transition-all duration-300 ${
        isExpanded 
          ? "inset-4 md:inset-8" 
          : "bottom-6 right-6 w-[380px] h-[500px] max-w-[calc(100vw-3rem)] max-h-[calc(100vh-3rem)]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-accent" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-background" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">RCT Assistant</p>
            <p className="text-xs text-muted-foreground font-mono">SignedAI Active</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            aria-label={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-secondary rounded-md transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
            <div 
              className={`max-w-[85%] rounded-lg px-4 py-3 ${
                message.role === "user" 
                  ? "bg-accent text-accent-foreground" 
                  : message.role === "system"
                  ? "bg-secondary/50 text-muted-foreground text-xs font-mono"
                  : "bg-card border border-border"
              }`}
            >
              <p className="text-sm">{message.content}</p>
              
              {/* Verification Badge */}
              {message.verified && (
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border">
                  <CheckCircle className="w-3 h-3 text-success" />
                  <span className="text-xs font-mono text-success">SignedAI Verified</span>
                  <span className="text-xs font-mono text-muted-foreground">Tier: {message.tier}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Thinking Logs */}
        {isThinking && thinkingLogs.length > 0 && (
          <div className="bg-secondary/30 rounded-lg p-3 border border-border">
            <div className="flex items-center gap-2 mb-2">
              <Loader2 className="w-3 h-3 animate-spin text-accent" />
              <span className="text-xs font-mono text-muted-foreground">Processing...</span>
            </div>
            <div className="space-y-1">
              {thinkingLogs.map((log, i) => (
                <p key={i} className="text-xs font-mono text-muted-foreground animate-fade-in-up">
                  {log}
                </p>
              ))}
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything..."
            className="flex-1 bg-secondary/50 border border-border rounded-md px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            disabled={isThinking}
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isThinking || !input.trim()}
            className="bg-accent hover:bg-accent/90 text-accent-foreground shrink-0"
          >
            {isThinking ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Responses verified by SignedAI
        </p>
      </form>
    </div>
  )
}
