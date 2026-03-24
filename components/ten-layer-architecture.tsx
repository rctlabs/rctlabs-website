"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface Layer {
  id: number
  name: string
  nameTh: string
  description: string
  descriptionTh: string
  icon: string
  color: string
  badge?: string
  features: string[]
  featuresTh: string[]
}

const layers: Layer[] = [
  {
    id: 10,
    name: "Enterprise Hardening",
    nameTh: "การป้องกันระดับองค์กร",
    description: "JWT RS256, RBAC, CircuitBreaker - Security-first architecture with comprehensive access control and fault tolerance.",
    descriptionTh: "JWT RS256, RBAC, CircuitBreaker - สถาปัตยกรรมที่เน้นความปลอดภัย พร้อมการควบคุมการเข้าถึงและความทนทานต่อความผิดพลาด",
    icon: "Shield",
    color: "from-red-500 to-orange-500",
    badge: "NEW v2.3.1",
    features: ["JWT RS256 Auth", "RBAC Permissions", "CircuitBreaker", "Rate Limiting"],
    featuresTh: ["JWT RS256 Auth", "RBAC Permissions", "CircuitBreaker", "Rate Limiting"]
  },
  {
    id: 9,
    name: "Universal Adapter",
    nameTh: "Universal Adapter",
    description: "Seamless integration with external systems, APIs, and third-party services through standardized protocols.",
    descriptionTh: "การผสานรวมกับระบบภายนอก API และบริการของบุคคลที่สามผ่านโปรโตคอลมาตรฐาน",
    icon: "Plug",
    color: "from-orange-500 to-yellow-500",
    badge: "v2.3.0",
    features: ["REST API", "GraphQL", "WebSocket", "gRPC"],
    featuresTh: ["REST API", "GraphQL", "WebSocket", "gRPC"]
  },
  {
    id: 8,
    name: "Regional Language Adapter",
    nameTh: "Regional Language Adapter",
    description: "Support for 8 markets with localized LLM models and compliance frameworks (PDPA, APPI, PIPA, PIPL).",
    descriptionTh: "รองรับ 8 ตลาดพร้อมโมเดล LLM แบบ localized และกรอบการปฏิบัติตามข้อบังคับ (PDPA, APPI, PIPA, PIPL)",
    icon: "Globe",
    color: "from-yellow-500 to-green-500",
    badge: "8 Markets",
    features: ["TH/EN/JP/KR/CN", "PDPA Compliance", "Local LLMs", "Cultural Adaptation"],
    featuresTh: ["TH/EN/JP/KR/CN", "PDPA Compliance", "Local LLMs", "Cultural Adaptation"]
  },
  {
    id: 7,
    name: "FloatingAI",
    nameTh: "FloatingAI",
    description: "L3 API microservice for conversational AI with real-time context awareness and knowledge base integration.",
    descriptionTh: "L3 API microservice สำหรับ AI สนทนาพร้อมการรับรู้บริบทแบบ real-time และการผสานรวม knowledge base",
    icon: "MessageCircle",
    color: "from-green-500 to-teal-500",
    badge: "NEW v3.4.0",
    features: ["Conversational AI", "KB Integration", "Context Awareness", "Multi-LLM"],
    featuresTh: ["Conversational AI", "KB Integration", "Context Awareness", "Multi-LLM"]
  },
  {
    id: 6,
    name: "JITNA Protocol",
    nameTh: "JITNA Protocol",
    description: "Just-In-Time Natural Action language for precise intent specification and validation.",
    descriptionTh: "ภาษา Just-In-Time Natural Action สำหรับการระบุและตรวจสอบเจตนาอย่างแม่นยำ",
    icon: "FileCode",
    color: "from-teal-500 to-cyan-500",
    badge: "RFC-001",
    features: ["Intent Specification", "Validation Rules", "Action Mapping", "Traceability"],
    featuresTh: ["Intent Specification", "Validation Rules", "Action Mapping", "Traceability"]
  },
  {
    id: 5,
    name: "SignedAI",
    nameTh: "SignedAI",
    description: "Multi-LLM consensus engine with digital signatures for verifiable AI outputs.",
    descriptionTh: "Multi-LLM consensus engine พร้อม digital signatures สำหรับผลลัพธ์ AI ที่ตรวจสอบได้",
    icon: "Signature",
    color: "from-cyan-500 to-blue-500",
    badge: "0.3% Halluc.",
    features: ["Multi-LLM Voting", "Digital Signatures", "Output Verification", "Consensus"],
    featuresTh: ["Multi-LLM Voting", "Digital Signatures", "Output Verification", "Consensus"]
  },
  {
    id: 4,
    name: "RCTDB v2.0",
    nameTh: "RCTDB v2.0",
    description: "8-dimensional universal memory schema with Delta Engine compression and quantum-resistant encryption.",
    descriptionTh: "8-dimensional universal memory schema พร้อม Delta Engine compression และ quantum-resistant encryption",
    icon: "Database",
    color: "from-blue-500 to-indigo-500",
    badge: "8D Memory",
    features: ["8D Schema", "Delta Compression", "Quantum Encryption", "Time Travel"],
    featuresTh: ["8D Schema", "Delta Compression", "Quantum Encryption", "Time Travel"]
  },
  {
    id: 3,
    name: "Algorithm Kernel",
    nameTh: "Algorithm Kernel",
    description: "41 production algorithms across 9 tiers from basic operations to self-evolving systems.",
    descriptionTh: "อัลกอริทึม 41 ตัวสำหรับการผลิตใน 9 tiers จากการดำเนินการพื้นฐานถึงระบบ self-evolving",
    icon: "Cpu",
    color: "from-indigo-500 to-purple-500",
    badge: "41 Algos",
    features: ["9 Tiers", "41 Algorithms", "Self-Evolving", "Auto-Optimization"],
    featuresTh: ["9 Tiers", "41 Algorithms", "Self-Evolving", "Auto-Optimization"]
  },
  {
    id: 2,
    name: "Kernel Services",
    nameTh: "Kernel Services",
    description: "Core infrastructure services including memory management, context switching, and event processing.",
    descriptionTh: "บริการโครงสร้างพื้นฐานหลักรวมถึงการจัดการหน่วยความจำ context switching และการประมวลผลเหตุการณ์",
    icon: "Layers",
    color: "from-purple-500 to-pink-500",
    badge: "Kernel v1.4",
    features: ["Memory Management", "Context Switching", "Event Bus", "Process Scheduling"],
    featuresTh: ["Memory Management", "Context Switching", "Event Bus", "Process Scheduling"]
  },
  {
    id: 1,
    name: "OS Primitives",
    nameTh: "OS Primitives",
    description: "Foundation layer providing process isolation, resource allocation, and hardware abstraction.",
    descriptionTh: "ชั้นพื้นฐานให้การแยกกระบวนการ การจัดสรรทรัพยากร และการนามธรรมฮาร์ดแวร์",
    icon: "Box",
    color: "from-pink-500 to-rose-500",
    badge: "Foundation",
    features: ["Process Isolation", "Resource Allocation", "Hardware Abstraction", "System Calls"],
    featuresTh: ["Process Isolation", "Resource Allocation", "Hardware Abstraction", "System Calls"]
  }
]

export function TenLayerArchitecture({ locale = "en" }: { locale?: "en" | "th" }) {
  const [activeLayer, setActiveLayer] = useState<number | null>(null)
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null)

  const t = (en: string, th: string) => locale === "th" ? th : en

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">
          {t("10-Layer Constitutional AI Architecture", "สถาปัตยกรรม AI แบบรัฐธรรมนูญ 10 ชั้น")}
        </h2>
        <p className="text-muted-foreground">
          {t(
            "From hardware abstraction to enterprise hardening — complete AI operating system stack",
            "จาก hardware abstraction ถึง enterprise hardening — AI operating system ที่สมบูรณ์"
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Layer Stack */}
        <div className="lg:col-span-2 space-y-2">
          <AnimatePresence>
            {layers.map((layer, index) => (
              <motion.div
                key={layer.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: hoveredLayer === layer.id ? 1.02 : 1
                }}
                transition={{ 
                  delay: index * 0.1,
                  duration: 0.3
                }}
                className={cn(
                  "relative rounded-lg p-4 cursor-pointer transition-all duration-300",
                  "border-2 backdrop-blur-sm",
                  hoveredLayer === layer.id || activeLayer === layer.id
                    ? "border-accent bg-accent/10"
                    : "border-border bg-card/50 hover:border-accent/50"
                )}
                onMouseEnter={() => setHoveredLayer(layer.id)}
                onMouseLeave={() => setHoveredLayer(null)}
                onClick={() => setActiveLayer(activeLayer === layer.id ? null : layer.id)}
              >
                <div className="flex items-center gap-4">
                  {/* Layer Number */}
                  <div className={cn(
                    "flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center",
                    "bg-gradient-to-br",
                    layer.color,
                    "text-white font-bold text-lg shadow-lg"
                  )}>
                    {layer.id}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-semibold text-foreground">
                        {t(layer.name, layer.nameTh)}
                      </h3>
                      {layer.badge && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-accent/20 text-accent font-medium">
                          {layer.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {t(layer.description, layer.descriptionTh)}
                    </p>
                  </div>

                  {/* Expand Icon */}
                  <motion.div
                    animate={{ rotate: activeLayer === layer.id ? 180 : 0 }}
                    className="flex-shrink-0 text-muted-foreground"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </motion.div>
                </div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {activeLayer === layer.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="pt-4 mt-4 border-t border-border">
                        <h4 className="text-sm font-medium mb-3 text-foreground">
                          {t("Key Features", "ฟีเจอร์หลัก")}
                        </h4>
                        <div className="grid grid-cols-2 gap-2">
                          {(locale === "th" ? layer.featuresTh : layer.features).map((feature, i) => (
                            <div 
                              key={i}
                              className="flex items-center gap-2 text-sm text-muted-foreground"
                            >
                              <div className={cn(
                                "w-2 h-2 rounded-full",
                                "bg-gradient-to-r",
                                layer.color
                              )} />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Info Panel */}
        <div className="lg:col-span-1">
          <div className="sticky top-4 space-y-4">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4 text-foreground">
                {t("Architecture Stats", "สถิติสถาปัตยกรรม")}
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("Total Layers", "จำนวนชั้น")}</span>
                  <span className="font-medium text-foreground">10</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("Algorithms", "อัลกอริทึม")}</span>
                  <span className="font-medium text-accent">41</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("Services", "บริการ")}</span>
                  <span className="font-medium text-accent">52</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("Test Coverage", "ความคุ้มครองการทดสอบ")}</span>
                  <span className="font-medium text-green-500">100%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">{t("Uptime SLA", "SLA Uptime")}</span>
                  <span className="font-medium text-green-500">99.98%</span>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="font-semibold mb-4 text-foreground">
                {t("Legend", "คำอธิบายสัญลักษณ์")}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-red-500 to-orange-500" />
                  <span className="text-muted-foreground">{t("Security & Enterprise", "ความปลอดภัยและองค์กร")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-yellow-500 to-green-500" />
                  <span className="text-muted-foreground">{t("Integration & Language", "การผสานรวมและภาษา")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-cyan-500 to-blue-500" />
                  <span className="text-muted-foreground">{t("AI & Intelligence", "AI และปัญญาประดิษฐ์")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-gradient-to-r from-purple-500 to-pink-500" />
                  <span className="text-muted-foreground">{t("Core Infrastructure", "โครงสร้างพื้นฐานหลัก")}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
