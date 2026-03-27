"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Plug } from "lucide-react"
import { SITE_UPTIME } from "@/lib/site-config"

const integrations = [
  { titleEn: "Notion Integration", titleTh: "Notion Integration", descEn: "Full CRUD operations on Notion databases, pages, and blocks. Programmatic content management with MCP.", descTh: "การดำเนินการ CRUD แบบเต็มรูปแบบบน Notion databases, pages และ blocks ผ่าน MCP", features: ["Database CRUD", "Page Management", "Block Operations", "Search & Query"] },
  { titleEn: "Slack Integration", titleTh: "Slack Integration", descEn: "Channel management, message posting, and real-time event handling. Build AI-powered Slack bots.", descTh: "การจัดการ Channel การโพสต์ข้อความ และการจัดการ Event แบบ Real-Time", features: ["Channel Ops", "Messaging", "Events", "Slash Commands"] },
  { titleEn: "GitHub Integration", titleTh: "GitHub Integration", descEn: "Repository management, issue tracking, and pull request automation. AI-powered development workflow.", descTh: "การจัดการ Repository การติดตาม Issue และ Pull Request Automation", features: ["Repo Management", "Issue Tracking", "PR Automation", "Code Review"] },
  { titleEn: "File System Access", titleTh: "File System Access", descEn: "Secure file operations with permission controls. Read, write, and manage files across local and remote systems.", descTh: "การดำเนินการไฟล์ที่ปลอดภัยพร้อมการควบคุมสิทธิ์", features: ["File I/O", "Directory Ops", "Permissions", "Sync"] },
]

const providers = [
  { name: "OpenAI", models: ["GPT-4", "GPT-4 Turbo", "GPT-3.5"], color: "#10A37F" },
  { name: "Anthropic", models: ["Claude 3 Opus", "Claude 3 Sonnet", "Claude 3 Haiku"], color: "#D97757" },
  { name: "Local LLMs", models: ["Ollama", "LM Studio", "Custom Models"], color: "#7B9E87" },
]

const deployments = [
  { titleEn: "Docker Containerization", titleTh: "Docker Containerization", descEn: "All services as Docker containers with optimized images. Multi-stage builds reduce image size by 60%.", descTh: "บริการทั้งหมดถูก Package เป็น Docker Containers Multi-stage Builds ลดขนาด 60%", specs: ["Multi-stage builds", "Alpine base", "Layer caching", "Health checks"] },
  { titleEn: "Kubernetes Orchestration", titleTh: "Kubernetes Orchestration", descEn: "Auto-scaling, load balancing, and self-healing deployments. Zero-downtime rolling updates.", descTh: "Auto-Scaling, Load Balancing และ Self-Healing Deployments", specs: ["Auto-scaling", "Load balancing", "Rolling updates", "Self-healing"] },
  { titleEn: "CI/CD Pipeline", titleTh: "CI/CD Pipeline", descEn: "Automated testing, building, and deployment. GitHub Actions integration with quality gates.", descTh: "ทดสอบ สร้าง และ Deploy อัตโนมัติ พร้อม Quality Gates", specs: ["Automated tests", "Build pipeline", "Quality gates", "Auto deploy"] },
  { titleEn: "Monitoring & Observability", titleTh: "Monitoring & Observability", descEn: "Prometheus metrics, Grafana dashboards, and distributed tracing. Real-time alerting.", descTh: "Prometheus Metrics, Grafana Dashboards และ Distributed Tracing", specs: ["Prometheus", "Grafana", "Tracing", "Alerting"] },
]

const benefits = [
  { titleEn: "Vendor Independence", titleTh: "ความเป็นอิสระจากผู้ขาย", descEn: "Switch between providers without code changes", descTh: "เปลี่ยนผู้ขายได้โดยไม่ต้องแก้โค้ด" },
  { titleEn: "Cost Optimization", titleTh: "การปรับต้นทุน", descEn: "Route requests to most cost-effective models", descTh: "ส่ง Request ไปยังโมเดลที่คุ้มค่าที่สุด" },
  { titleEn: "Fallback Support", titleTh: "การรองรับ Fallback", descEn: "Automatic failover if primary provider is down", descTh: "Failover อัตโนมัติถ้า Provider หลักล้ม" },
  { titleEn: "Best-of-Breed", titleTh: "เลือกที่ดีที่สุด", descEn: "Use optimal model for each specific task", descTh: "ใช้โมเดลที่เหมาะสมสำหรับแต่ละงาน" },
]

export default function IntegrationPage() {
  const { language } = useLanguage()
  const isTh = language === "th"

  return (
    <main className="min-h-screen bg-background" id="main-content">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:py-28 text-center">
        <div className="max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-warm-lavender/10 border border-warm-lavender/30 text-warm-lavender text-sm font-medium">
            <Plug className="w-4 h-4" /> {isTh ? "การเชื่อมต่อ" : "Integration"}
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Integration & Deployment</h1>
          <p className="text-lg text-muted-foreground">
            {isTh
              ? "สถาปัตยกรรม MCP-native Integration พร้อม Multi-provider AI Support และ Enterprise Deployment Infrastructure"
              : "MCP-native integration architecture with multi-provider AI support and enterprise deployment infrastructure."}
          </p>
        </div>
      </section>

      {/* MCP Integrations */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-4">MCP Protocol <span className="text-warm-lavender">Integration</span></h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            {isTh
              ? "Model Context Protocol (MCP) เชื่อมต่อกับเครื่องมือและบริการภายนอกผ่าน Interface มาตรฐาน"
              : "Model Context Protocol (MCP) enables seamless integration with external tools and services through a standardized interface."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integ, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="text-lg font-bold mb-3 text-foreground">{isTh ? integ.titleTh : integ.titleEn}</h3>
                <p className="text-sm leading-relaxed mb-4 text-muted-foreground">{isTh ? integ.descTh : integ.descEn}</p>
                <div className="flex flex-wrap gap-2">
                  {integ.features.map((f, idx) => (
                    <span key={idx} className="px-3 py-1 rounded-lg text-xs font-semibold bg-warm-lavender/10 text-warm-lavender">{f}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Multi-Provider AI */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-2xl font-bold text-foreground text-center mb-4">Multi-Provider <span className="text-warm-sky">AI Support</span></h2>
        <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
          {isTh
            ? "รองรับ AI Providers หลายรายผ่าน Interface เดียว ทำให้มีความยืดหยุ่นในการเลือกผู้ขาย"
            : "Multiple AI providers through a unified interface, enabling vendor flexibility and best-of-breed model selection."}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {providers.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: p.color }} />
                <h3 className="text-lg font-bold text-foreground">{p.name}</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {p.models.map((model, idx) => (
                  <li key={idx} className="flex items-center gap-2"><span className="text-xs">✓</span> {model}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {benefits.map((b, i) => (
            <div key={i} className="p-4 rounded-xl bg-card border border-border">
              <h4 className="text-sm font-bold mb-1 text-foreground">{isTh ? b.titleTh : b.titleEn}</h4>
              <p className="text-xs text-muted-foreground">{isTh ? b.descTh : b.descEn}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Enterprise Deployment */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-bold text-foreground text-center mb-4">Enterprise <span className="text-warm-terracotta">Deployment</span></h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-10">
            {isTh
              ? "โครงสร้าง deployment แบบ public-safe พร้อม Docker, Kubernetes และ cloud-native architecture"
              : "Public-safe deployment infrastructure with Docker, Kubernetes, and cloud-native architecture."}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deployments.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card">
                <h3 className="text-lg font-bold mb-3 text-foreground">{isTh ? d.titleTh : d.titleEn}</h3>
                <p className="text-sm leading-relaxed mb-4 text-muted-foreground">{isTh ? d.descTh : d.descEn}</p>
                <div className="grid grid-cols-2 gap-2">
                  {d.specs.map((spec, idx) => (
                    <div key={idx} className="px-3 py-2 rounded-lg text-xs font-semibold text-center bg-muted/50 text-muted-foreground">{spec}</div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="mx-auto max-w-4xl px-4 py-20">
        <h2 className="text-2xl font-bold text-foreground text-center mb-10">
          {isTh ? "ข้อมูลจำเพาะทาง" : "Technical "}
          <span className="text-warm-sage">{isTh ? "" : "Specifications"}</span>
          {isTh && <span className="text-warm-sage"> Technical</span>}
        </h2>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-2xl border border-border bg-card"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {[
              { labelEn: "MCP Servers", labelTh: "MCP Servers", value: "10+" },
              { labelEn: "AI Providers", labelTh: "AI Providers", value: "3+" },
              { labelEn: "Deployment Time", labelTh: "เวลา Deploy", value: "< 5 min" },
              { labelEn: "Availability Target", labelTh: "เป้าหมายความพร้อมใช้งาน", value: SITE_UPTIME },
              { labelEn: "Auto-scaling", labelTh: "Auto-Scaling", value: "✓ Yes" },
              { labelEn: "Zero Downtime", labelTh: "Zero Downtime", value: "✓ Yes" },
            ].map((spec, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-4 rounded-xl bg-muted/50"
              >
                <div className="text-xs font-semibold mb-1 text-muted-foreground">{isTh ? spec.labelTh : spec.labelEn}</div>
                <div className="text-lg font-bold font-mono text-foreground">{spec.value}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center space-y-6">
          <h2 className="text-3xl font-bold text-foreground">{isTh ? "พร้อม Integrate?" : "Ready to Integrate?"}</h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {isTh
              ? "สถาปัตยกรรม MCP-native Installation ใน 5 นาที Scale อัตโนมัติ ไม่มี Downtime"
              : "MCP-native architecture. Deploy in under 5 minutes. Auto-scaling with zero-downtime updates."}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-warm-amber text-white font-medium text-sm hover:bg-[#C49A48] transition-colors">
              {isTh ? "ติดต่อทีม" : "Contact Us"} <ArrowRight size={16} />
            </Link>
            <Link href="/docs" className="inline-flex items-center justify-center px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-muted transition-colors">
              {isTh ? "อ่าน Docs" : "Read Docs"}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
