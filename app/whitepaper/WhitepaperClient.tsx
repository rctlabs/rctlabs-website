"use client"

import { usePathname } from "next/navigation"
import { BookOpen, FileText, GitBranch, History, Network, ShieldCheck } from "lucide-react"
import WhitepaperAccessForm from "@/components/whitepaper-access-form"
import { useLanguage } from "@/components/language-provider"
import { ResourceCardGrid, ResourcePageShell, ResourceSection } from "@/components/resource/resource-shell"
import { buildContactHref } from "@/lib/funnel"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

export default function WhitepaperClient() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const dossiers = [
    {
      title: language === "th" ? "RCT Ecosystem และสถาปัตยกรรม 10 ชั้น" : "RCT Ecosystem and the 10-layer architecture",
      description: language === "th" ? "เอกสารแกนกลางสำหรับทีม architecture และ evaluator ที่ต้องการเข้าใจ operating model, FDIA และขอบเขตของระบบโดยรวม." : "The core dossier for architecture and evaluation teams that need the operating model, FDIA framing, and the boundaries of the overall system.",
      href: `${localePrefix}/architecture`,
      icon: BookOpen,
      badge: "Core",
      meta: language === "th" ? "Architecture dossier · Jan 2026" : "Architecture dossier · Jan 2026",
      tags: ["Architecture", "FDIA", "Operating system"],
    },
    {
      title: language === "th" ? "JITNA RFC-001 และ control-plane logic" : "JITNA RFC-001 and control-plane logic",
      description: language === "th" ? "อ่านเมื่อทีมต้องการประเมิน protocol layer, negotiation model และวิธีสื่อสารระหว่าง agent หรือ service." : "Read this when the team needs to evaluate the protocol layer, negotiation model, and service-to-agent communication logic.",
      href: `${localePrefix}/protocols/jitna-rfc-001`,
      icon: Network,
      badge: "RFC-001",
      meta: language === "th" ? "Protocol specification · Feb 2026" : "Protocol specification · Feb 2026",
      tags: ["Protocol", "Negotiation", "Control plane"],
    },
    {
      title: language === "th" ? "SignedAI และ verification layer" : "SignedAI and the verification layer",
      description: language === "th" ? "ใช้สำหรับตรวจว่าระบบลด hallucination และสร้าง audit trail อย่างไรในบริบทที่ trust-sensitive." : "Use this to review how the system reduces hallucination and preserves an audit trail in trust-sensitive environments.",
      href: `${localePrefix}/solutions/ai-hallucination-prevention`,
      icon: ShieldCheck,
      badge: "Trust",
      meta: language === "th" ? "Verification dossier · Nov 2025" : "Verification dossier · Nov 2025",
      tags: ["Verification", "Auditability", "Safety"],
    },
    {
      title: language === "th" ? "RCT-7 mental model และ cognitive frame" : "RCT-7 mental model and cognitive frame",
      description: language === "th" ? "เหมาะกับทีมที่กำลังประเมิน behaviour model, persona control และ cognition frame ของระบบ." : "Best for teams evaluating behavior models, persona controls, and the cognitive frame behind the system.",
      href: `${localePrefix}/protocols/rct-7-mental-model`,
      icon: GitBranch,
      badge: "Model",
      meta: language === "th" ? "Cognitive framework · Dec 2025" : "Cognitive framework · Dec 2025",
      tags: ["Cognition", "Behavior", "Framework"],
    },
  ]

  const evaluationRoutes = [
    {
      title: language === "th" ? "เปิด methodology" : "Open methodology",
      description: language === "th" ? "ใช้เมื่ออยากรู้ว่าการอ้างอิง การเปิดเผยข้อมูล และการทวนสอบใน public site ถูกกำหนดอย่างไร." : "Use this when you need the public-site method for references, disclosure boundaries, and review loops.",
      href: `${localePrefix}/methodology`,
      icon: FileText,
      tags: ["Methodology", "Disclosure", "Review"],
    },
    {
      title: language === "th" ? "เปิด evaluation hub" : "Open evaluation hub",
      description: language === "th" ? "ใช้เมื่อต้องเปลี่ยนจากการอ่านเอกสารไปสู่ buyer checklist, comparison route และ decision support." : "Use this when the team needs to move from documents into buyer checklists, comparison routes, and decision support.",
      href: `${localePrefix}/evaluation`,
      icon: BookOpen,
      tags: ["Buyer path", "Checklist", "Decision"],
    },
    {
      title: language === "th" ? "เปิด benchmark summary" : "Open benchmark summary",
      description: language === "th" ? "ใช้เพื่อเชื่อมข้ออ้างทางเทคนิคใน dossier กับวิธีวัดและ caveat ของตัวเลขสำคัญ." : "Use this to connect the technical dossiers to the measurement methods and caveats behind the public metrics.",
      href: `${localePrefix}/benchmark-summary`,
      icon: History,
      tags: ["Benchmarks", "Evidence", "Caveats"],
    },
  ]

  const contactHref = buildContactHref(language, "whitepaper:evaluation-pack:request")

  return (
    <ResourcePageShell
      eyebrow={language === "th" ? "Evaluate / Whitepaper Dossier" : "Evaluate / Whitepaper Dossier"}
      title={language === "th" ? "คลัง whitepaper สำหรับทีมที่ต้องประเมินเชิงสถาปัตยกรรมและ procurement" : "A whitepaper dossier for architecture and pre-procurement evaluation"}
      description={language === "th" ? "Whitepaper ไม่ควรเป็นเพียงรายการเอกสาร แต่ควรเป็น route สำหรับทีมที่ต้องอ่าน architecture, protocol, verification และ readiness context อย่างเป็นระบบก่อนตัดสินใจ." : "Whitepapers should not behave like a flat document list. This route is organized for teams reviewing architecture, protocol, verification, and readiness context before making decisions."}
      taxonomy={language === "th" ? ["Technical dossiers", "Architecture review", "Trust evidence", "Pre-procurement"] : ["Technical dossiers", "Architecture review", "Trust evidence", "Pre-procurement"]}
      accent="terracotta"
      actions={[
        { href: `${localePrefix}/architecture`, label: language === "th" ? "เปิด architecture" : "Open architecture", variant: "primary" },
        { href: `${localePrefix}/protocols`, label: language === "th" ? "เปิด protocol library" : "Open protocol library", variant: "secondary" },
        { href: contactHref, label: language === "th" ? "ขอ evaluation pack" : "Request evaluation pack", variant: "secondary" },
      ]}
      stats={[
        { label: language === "th" ? "Primary role" : "Primary role", value: language === "th" ? "Evaluation dossier" : "Evaluation dossier", detail: language === "th" ? "for architecture and buyer review" : "for architecture and buyer review" },
        { label: language === "th" ? "Core document lanes" : "Core document lanes", value: String(dossiers.length), detail: language === "th" ? "architecture, protocol, trust, cognition" : "architecture, protocol, trust, cognition" },
        { label: language === "th" ? "Decision adjacency" : "Decision adjacency", value: "Method / Eval / Bench", detail: language === "th" ? "structured handoff after document review" : "structured handoff after document review" },
        { label: language === "th" ? "Audience" : "Audience", value: language === "th" ? "Architects + Buyers" : "Architects + Buyers", detail: language === "th" ? "technical and procurement review" : "technical and procurement review" },
      ]}
      footerTitle={language === "th" ? "อ่าน dossier แล้วควรไปต่อที่การตัดสินใจ ไม่ใช่หยุดที่เอกสาร" : "After reading the dossier, move into decision work instead of stopping at the documents"}
      footerDescription={language === "th" ? "หลังจากทีมอ่าน whitepaper ครบแล้ว ให้ต่อที่ methodology, benchmark summary และ evaluation hub เพื่อเชื่อม technical understanding เข้ากับ buyer questions และ governance review." : "After the team reviews the whitepapers, continue into methodology, the benchmark summary, and the evaluation hub to connect technical understanding to buyer questions and governance review."}
      footerActions={[
        { href: `${localePrefix}/methodology`, label: language === "th" ? "ไปหน้า methodology" : "Go to methodology", variant: "primary" },
        { href: `${localePrefix}/evaluation`, label: language === "th" ? "ไปหน้า evaluation" : "Go to evaluation", variant: "secondary" },
      ]}
    >
      <ResourceSection
        eyebrow={language === "th" ? "Core dossiers" : "Core dossiers"}
        title={language === "th" ? "เอกสารหลักที่ควรอ่านก่อนตามเส้นทางการประเมิน" : "The core documents worth reading first in the evaluation path"}
        description={language === "th" ? "คัดเฉพาะ dossier ที่ช่วยตอบคำถามระดับ architecture, protocol, trust และ cognition โดยไม่ปล่อยให้หน้า Whitepaper ซ้ำกับ Docs หรือ Protocols." : "These dossiers are chosen to answer architecture, protocol, trust, and cognition questions without turning the whitepaper page into a duplicate of Docs or Protocols."}
      >
        <ResourceCardGrid cards={dossiers} />
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Access path" : "Access path"}
        title={language === "th" ? "ขอเอกสารหรือ material เพิ่มเติมสำหรับทีมประเมิน" : "Request deeper material for evaluation teams"}
        description={language === "th" ? "เก็บฟอร์มไว้เป็นส่วนหนึ่งของ resource flow แทนการวางแยกเป็น landing page ลอย ๆ." : "The access form stays inside the resource flow instead of behaving like a disconnected landing step."}
      >
        <div className="rounded-3xl border border-border/70 bg-card/90 p-6 shadow-[0_12px_32px_rgba(0,0,0,0.04)] md:p-8">
          <WhitepaperAccessForm language={language} />
        </div>
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Next routes" : "Next routes"}
        title={language === "th" ? "เมื่ออ่านเอกสารแล้วควรเปิดหน้าไหนต่อ" : "Which page should the team open next after the documents"}
        description={language === "th" ? "เส้นทางนี้ช่วย handoff จาก document review ไปสู่ methodology, benchmarking และ buyer evaluation อย่างชัดเจน." : "This route hands off cleanly from document review into methodology, benchmarking, and buyer-side evaluation."}
      >
        <ResourceCardGrid cards={evaluationRoutes} />
      </ResourceSection>
    </ResourcePageShell>
  )
}
