"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"

type ConnectionStatus = "disconnected" | "connecting" | "connected" | "error"

interface Message {
  id: number
  direction: "sent" | "received"
  content: string
  timestamp: string
}

const WS_URL =
  process.env.NEXT_PUBLIC_WS_URL ?? "ws://localhost:8056/ws"

export default function WebSocketConsolePage() {
  const [status, setStatus] = useState<ConnectionStatus>("disconnected")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const wsRef = useRef<WebSocket | null>(null)
  const msgIdRef = useRef(0)
  const bottomRef = useRef<HTMLDivElement | null>(null)

  const addMessage = useCallback(
    (direction: "sent" | "received", content: string) => {
      setMessages((prev) => [
        ...prev,
        {
          id: ++msgIdRef.current,
          direction,
          content,
          timestamp: new Date().toLocaleTimeString(),
        },
      ])
    },
    [],
  )

  const connect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close()
    }
    setStatus("connecting")
    const ws = new WebSocket(WS_URL)

    ws.onopen = () => {
      setStatus("connected")
      addMessage("received", `[connected] ${WS_URL}`)
    }

    ws.onmessage = (e) => {
      addMessage("received", e.data as string)
    }

    ws.onerror = () => {
      setStatus("error")
      addMessage("received", "[error] WebSocket connection failed")
    }

    ws.onclose = () => {
      setStatus("disconnected")
      addMessage("received", "[disconnected]")
    }

    wsRef.current = ws
  }, [addMessage])

  const disconnect = useCallback(() => {
    wsRef.current?.close()
    wsRef.current = null
  }, [])

  const sendMessage = useCallback(() => {
    const text = input.trim()
    if (!text || wsRef.current?.readyState !== WebSocket.OPEN) return
    wsRef.current.send(text)
    addMessage("sent", text)
    setInput("")
  }, [input, addMessage])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    return () => {
      wsRef.current?.close()
    }
  }, [])

  const statusColor: Record<ConnectionStatus, string> = {
    disconnected: "bg-gray-500",
    connecting: "bg-yellow-500",
    connected: "bg-green-500",
    error: "bg-red-500",
  }

  return (
    <main className="min-h-screen bg-background text-foreground p-6 font-mono">
      <div className="max-w-3xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              WebSocket Console
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Live stream — RCT Platform WebSocket Server
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold text-white ${statusColor[status]}`}
          >
            <span className="h-2 w-2 rounded-full bg-white/70 animate-pulse" />
            {status}
          </span>
        </div>

        {/* URL bar */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded px-3 py-2">
          <Badge variant="outline" className="text-[10px]">
            WS
          </Badge>
          <span className="truncate">{WS_URL}</span>
        </div>

        {/* Controls */}
        <div className="flex gap-2">
          <Button
            size="sm"
            onClick={connect}
            disabled={status === "connected" || status === "connecting"}
          >
            Connect
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={disconnect}
            disabled={status === "disconnected"}
          >
            Disconnect
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setMessages([])}
          >
            Clear
          </Button>
        </div>

        {/* Message stream */}
        <ScrollArea className="h-[420px] rounded border bg-black/40 p-3">
          {messages.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No messages yet. Connect and send a packet.
            </p>
          ) : (
            messages.map((m) => (
              <div
                key={m.id}
                className={`mb-1 text-xs leading-relaxed ${
                  m.direction === "sent"
                    ? "text-cyan-400"
                    : "text-emerald-400"
                }`}
              >
                <span className="text-muted-foreground">{m.timestamp} </span>
                <span className="mr-1">
                  {m.direction === "sent" ? "▶" : "◀"}
                </span>
                {m.content}
              </div>
            ))
          )}
          <div ref={bottomRef} />
        </ScrollArea>

        {/* Send bar */}
        <div className="flex gap-2">
          <Input
            className="font-mono text-sm"
            placeholder="Enter message…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            disabled={status !== "connected"}
          />
          <Button
            onClick={sendMessage}
            disabled={status !== "connected" || !input.trim()}
          >
            Send
          </Button>
        </div>

        {/* Footer note */}
        <p className="text-[11px] text-muted-foreground">
          RCT Platform · WebSocket Server on port 8056 ·{" "}
          <code className="text-xs">NEXT_PUBLIC_WS_URL</code> to override
        </p>
      </div>
    </main>
  )
}
