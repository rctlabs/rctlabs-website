"use client"

import { usePathname } from "next/navigation"
import { BookOpen, Boxes, Database, Github, MessageCircle, Plug, Server, ShieldCheck, Workflow } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ResourceCardGrid, ResourcePageShell, ResourceSection } from "@/components/resource/resource-shell"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import { SITE_UPTIME } from "@/lib/site-config"

export default function IntegrationClient() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const adapters = [
    {
      title: language === "th" ? "Notion integration" : "Notion integration",
      description: language === "th" ? "เชื่อม CRUD, search และ content workflows ผ่าน MCP เพื่อให้ทีมใช้ Notion เป็น data surface หรือ operating layer ได้." : "Connect CRUD, search, and content workflows over MCP so teams can use Notion as a data surface or operating layer.",
      href: `${localePrefix}/docs`,
      icon: Database,
      badge: "MCP",
      meta: language === "th" ? "Database and page operations" : "Database and page operations",
      tags: ["CRUD", "Search", "Workflows"],
    },
    {
      title: language === "th" ? "Slack and team comms" : "Slack and team comms",
      description: language === "th" ? "ใช้ MCP bridge สำหรับ channel actions, operational updates และ event-driven workflows กับทีมภายใน." : "Use MCP bridges for channel actions, operational updates, and event-driven internal workflows.",
      href: `${localePrefix}/docs`,
      icon: MessageCircle,
      badge: "MCP",
      meta: language === "th" ? "Realtime operational channels" : "Realtime operational channels",
      tags: ["Events", "Messaging", "Ops"],
    },
    {
      title: language === "th" ? "GitHub and delivery workflows" : "GitHub and delivery workflows",
      description: language === "th" ? "ผูก repository actions, issue/PR lifecycle และ review support เข้ากับระบบ reasoning และ planning." : "Bind repository actions, issue and PR lifecycles, and review support into reasoning and planning flows.",
      href: `${localePrefix}/docs`,
      icon: Github,
      badge: language === "th" ? "Dev workflow" : "Dev workflow",
      meta: language === "th" ? "Repositories, issues, pull requests" : "Repositories, issues, pull requests",
      tags: ["PRs", "Issues", "Automation"],
    },
  ]

  const patterns = [
    {
      title: language === "th" ? "Multi-provider routing" : "Multi-provider routing",
      description: language === "th" ? "จัดเส้นทาง LLM หลายค่ายด้วยนโยบายเดียว แทนการผูกระบบกับ provider รายเดียว." : "Route across multiple LLM providers with one policy layer instead of binding the system to a single vendor.",
      href: `${localePrefix}/solutions/dynamic-ai-routing`,
      icon: Workflow,
      tags: ["Providers", "Policies", "Fallback"],
    },
    {
      title: language === "th" ? "Container and runtime architecture" : "Container and runtime architecture",
      description: language === "th" ? "วางโครง deploy สำหรับ services, adapters และ observability โดยใช้ production-safe runtime boundaries." : "Design deployment boundaries for services, adapters, and observability with production-safe runtime layers.",
      href: `${localePrefix}/research/v250-infrastructure-layer`,
      icon: Boxes,
      tags: ["Containers", "Runtime", "Observability"],
    },
    {
      title: language === "th" ? "Trust and verification controls" : "Trust and verification controls",
      description: language === "th" ? "เชื่อม verification, disclosure และ governance controls เข้ากับ integration path ตั้งแต่ต้น." : "Connect verification, disclosure, and governance controls into the integration path from the start.",
      href: `${localePrefix}/methodology`,
      icon: ShieldCheck,
      tags: ["Verification", "Disclosure", "Governance"],
    },
  ]

  const deployment = [
    {
      title: language === "th" ? "Protocol-first build path" : "Protocol-first build path",
      description: language === "th" ? "เริ่มจาก protocol layer หากทีมต้องกำหนด interface, negotiation และ control plane เอง." : "Start with the protocol layer if your team needs to own interfaces, negotiation, and control-plane logic.",
      href: `${localePrefix}/protocols`,
      icon: Plug,
      tags: ["JITNA", "FDIA", "Control plane"],
    },
    {
      title: language === "th" ? "Operational docs path" : "Operational docs path",
      description: language === "th" ? "ใช้ docs path เมื่อต้องการวิธีเชื่อมเครื่องมือจริงและ workflow ของทีม implement." : "Use the docs path when you need practical connection steps and implementer workflows.",
      href: `${localePrefix}/docs`,
      icon: BookOpen,
      tags: ["Docs", "Setup", "Implementation"],
    },
    {
      title: language === "th" ? "Enterprise deployment path" : "Enterprise deployment path",
      description: language === "th" ? "ใช้ research และ benchmark context เพื่อยืนยัน readiness ก่อน rollout ในองค์กร." : "Use research and benchmark context to confirm readiness before enterprise rollout.",
      href: `${localePrefix}/benchmark-summary`,
      icon: Server,
      tags: ["Benchmarks", "Readiness", "Rollout"],
    },
  ]

  return (
    <ResourcePageShell
      eyebrow={language === "th" ? "Build / Integration" : "Build / Integration"}
      title={language === "th" ? "เส้นทางเชื่อมต่อและ deploy สำหรับทีมที่ต้องลงระบบจริง" : "Integration and deployment paths for teams shipping real systems"}
      description={language === "th" ? "หน้า Integration ถูกจัดใหม่ให้เป็น build-oriented hub สำหรับ MCP adapters, provider routing, deployment boundaries และ trust controls แทนการเป็นหน้า feature dump." : "The integration page is restructured as a build-oriented hub for MCP adapters, provider routing, deployment boundaries, and trust controls instead of a feature dump."}
      taxonomy={language === "th" ? ["MCP adapters", "Provider routing", "Deployment patterns", "Trust controls"] : ["MCP adapters", "Provider routing", "Deployment patterns", "Trust controls"]}
      accent="lavender"
      actions={[
        { href: `${localePrefix}/docs`, label: language === "th" ? "เปิด docs" : "Open docs", variant: "primary" },
        { href: `${localePrefix}/protocols`, label: language === "th" ? "เปิด protocols" : "Open protocols", variant: "secondary" },
        { href: `${localePrefix}/contact`, label: language === "th" ? "คุยกับทีม implementation" : "Talk to the implementation team", variant: "secondary" },
      ]}
      stats={[
        { label: language === "th" ? "MCP surfaces" : "MCP surfaces", value: "10+", detail: language === "th" ? "tools and adapter families" : "tools and adapter families" },
        { label: language === "th" ? "AI providers" : "AI providers", value: "3+", detail: language === "th" ? "policy-driven routing options" : "policy-driven routing options" },
        { label: language === "th" ? "Availability target" : "Availability target", value: SITE_UPTIME, detail: language === "th" ? "deployment readiness target" : "deployment readiness target" },
        { label: language === "th" ? "Primary audience" : "Primary audience", value: language === "th" ? "Builders + Platform teams" : "Builders + Platform teams", detail: language === "th" ? "integration and rollout ownership" : "integration and rollout ownership" },
      ]}
      footerTitle={language === "th" ? "Integration ที่ดีต้องต่อกับ trust และ evaluation ด้วย" : "Good integration work also needs trust and evaluation context"}
      footerDescription={language === "th" ? "หลังจากกำหนด adapter และ deployment path แล้ว ให้ไปต่อที่ methodology, benchmark summary และ evaluation เพื่อเช็คว่า implementation ตอบโจทย์องค์กรจริงหรือไม่." : "After defining the adapter and deployment path, continue into methodology, benchmark summary, and evaluation to confirm the implementation fits the enterprise decision model."}
      footerActions={[
        { href: `${localePrefix}/methodology`, label: language === "th" ? "เปิด methodology" : "Open methodology", variant: "primary" },
        { href: `${localePrefix}/evaluation`, label: language === "th" ? "ไปหน้า evaluation" : "Go to evaluation", variant: "secondary" },
      ]}
    >
      <ResourceSection
        eyebrow={language === "th" ? "Adapters" : "Adapters"}
        title={language === "th" ? "จุดเชื่อม MCP ที่ทีม implement ใช้บ่อยที่สุด" : "The MCP connection surfaces implementation teams use most often"}
        description={language === "th" ? "ย่อ adapter landscape ให้เห็นบทบาทแต่ละชุดอย่างชัดเจน แทนการแสดงเป็นรายการยาวที่ไม่มี priority." : "The adapter landscape is compressed into the highest-value surfaces instead of a long undifferentiated list."}
      >
        <ResourceCardGrid cards={adapters} />
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Build patterns" : "Build patterns"}
        title={language === "th" ? "รูปแบบการออกแบบที่ควรอ่านก่อนลงระบบ" : "Design patterns worth reading before implementation begins"}
        description={language === "th" ? "เส้นทางนี้แยกให้เห็นทั้ง provider strategy, runtime architecture และ trust controls." : "This route separates provider strategy, runtime architecture, and trust controls into explicit design choices."}
      >
        <ResourceCardGrid cards={patterns} />
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Deployment routes" : "Deployment routes"}
        title={language === "th" ? "เส้นทางถัดไปตามรูปแบบการ deploy ที่ทีมคุณต้องการ" : "The next route to open based on the deployment model your team needs"}
        description={language === "th" ? "ใช้ route เหล่านี้เพื่อแยกคนที่ต้องการ protocol ownership, docs-first rollout หรือ readiness validation." : "Use these routes to separate protocol ownership, docs-first rollout, and readiness validation work."}
      >
        <ResourceCardGrid cards={deployment} />
      </ResourceSection>
    </ResourcePageShell>
  )
}