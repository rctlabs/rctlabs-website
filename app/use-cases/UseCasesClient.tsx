"use client"

import { usePathname } from "next/navigation"
import { BookOpen, Building2, GraduationCap, Landmark, Scale, Stethoscope, TrendingUp } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ResourceCardGrid, ResourcePageShell, ResourceSection } from "@/components/resource/resource-shell"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

export default function UseCasesClient() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const featuredCases = [
    {
      title: language === "th" ? "Enterprise research intelligence" : "Enterprise research intelligence",
      description: language === "th" ? "รวมข้อมูลหลายแหล่ง สังเคราะห์ด้วย AI และรักษา evidence trail สำหรับทีมวิจัยหรือ strategy ภายในองค์กร." : "Aggregate multiple data sources, synthesize them with AI, and preserve the evidence trail for internal research and strategy teams.",
      href: `${localePrefix}/research`,
      icon: Building2,
      badge: language === "th" ? "Enterprise" : "Enterprise",
      meta: language === "th" ? "Research and decision support" : "Research and decision support",
      tags: ["Research", "Synthesis", "Evidence"],
    },
    {
      title: language === "th" ? "Medical and clinical review support" : "Medical and clinical review support",
      description: language === "th" ? "ลดภาระการทบทวนเอกสารเชิงคลินิกและเชื่อม recommendation กับ evidence surfaces ที่ตรวจสอบได้." : "Reduce the burden of clinical document review and connect recommendations to auditable evidence surfaces.",
      href: `${localePrefix}/methodology`,
      icon: Stethoscope,
      badge: language === "th" ? "Regulated" : "Regulated",
      meta: language === "th" ? "Evidence-first workflow" : "Evidence-first workflow",
      tags: ["Clinical", "Audit trail", "Verification"],
    },
    {
      title: language === "th" ? "Legal and policy analysis" : "Legal and policy analysis",
      description: language === "th" ? "ช่วยทีมกฎหมายและนโยบายแยก clause, flag risk และสร้างเส้นทางตรวจสอบผลลัพธ์ได้ชัดขึ้น." : "Help legal and policy teams isolate clauses, flag risk, and preserve a clear verification path for outputs.",
      href: `${localePrefix}/evaluation`,
      icon: Scale,
      badge: language === "th" ? "Trust-sensitive" : "Trust-sensitive",
      meta: language === "th" ? "Governance and risk review" : "Governance and risk review",
      tags: ["Risk", "Governance", "Review"],
    },
    {
      title: language === "th" ? "Public-sector policy workflows" : "Public-sector policy workflows",
      description: language === "th" ? "ใช้กับการวิเคราะห์ความคิดเห็นสาธารณะ การประเมินผลกระทบ และการสื่อสารเชิงนโยบายที่ต้องตรวจสอบย้อนกลับได้." : "Apply it to public comment analysis, impact review, and policy communication that needs traceability.",
      href: `${localePrefix}/thailand-enterprise-trust`,
      icon: Landmark,
      badge: language === "th" ? "Institutional" : "Institutional",
      meta: language === "th" ? "Regional trust context" : "Regional trust context",
      tags: ["Public policy", "Traceability", "Trust"],
    },
  ]

  const adoptionRoutes = [
    {
      title: language === "th" ? "เริ่มจาก evaluation" : "Start from evaluation",
      description: language === "th" ? "เหมาะกับองค์กรที่ยังต้องถามว่า use case ไหนคุ้มค่าและควรควบคุม risk อย่างไร." : "Best for organizations still asking which use case is worth pursuing and how risk should be controlled.",
      href: `${localePrefix}/evaluation`,
      icon: TrendingUp,
      tags: ["Buyer path", "Assessment", "Prioritization"],
    },
    {
      title: language === "th" ? "ต่อไปที่ integration" : "Continue into integration",
      description: language === "th" ? "เหมาะกับทีมที่เลือก use case แล้วและต้องวาง integration path หรือ deployment model ต่อทันที." : "Best for teams that have already chosen a use case and need the integration path or deployment model next.",
      href: `${localePrefix}/integration`,
      icon: BookOpen,
      tags: ["Implementation", "Deployment", "MCP"],
    },
    {
      title: language === "th" ? "ใช้คู่กับ community" : "Pair it with community",
      description: language === "th" ? "เหมาะกับทีมที่ต้องการ feedback, examples และบริบทจากผู้ใช้งานจริงหรือทีม implement อื่น." : "Best for teams that need feedback, examples, and context from real users or other implementers.",
      href: `${localePrefix}/community`,
      icon: GraduationCap,
      tags: ["Community", "Examples", "Peer learning"],
    },
  ]

  return (
    <ResourcePageShell
      eyebrow={language === "th" ? "Adopt / Use Cases" : "Adopt / Use Cases"}
      title={language === "th" ? "Use cases ที่เชื่อมจากแนวคิดไปสู่การนำไปใช้จริง" : "Use cases that bridge from concept to real adoption"}
      description={language === "th" ? "หน้านี้ทำหน้าที่เป็น adoption layer ของ resource system ช่วยให้ทีมเห็นว่า RCT pattern ถูกแปลไปเป็นงานจริงในบริบทต่าง ๆ อย่างไร." : "This page acts as the adoption layer of the resource system, helping teams see how RCT patterns translate into real work across different environments."}
      taxonomy={language === "th" ? ["Adoption", "Operational scenarios", "Regulated workflows", "Decision context"] : ["Adoption", "Operational scenarios", "Regulated workflows", "Decision context"]}
      accent="amber"
      actions={[
        { href: `${localePrefix}/evaluation`, label: language === "th" ? "เปิด evaluation hub" : "Open evaluation hub", variant: "primary" },
        { href: `${localePrefix}/contact`, label: language === "th" ? "คุย use case กับทีม" : "Discuss a use case with the team", variant: "secondary" },
        { href: `${localePrefix}/community`, label: language === "th" ? "เข้าชุมชน" : "Join the community", variant: "secondary" },
      ]}
      stats={[
        { label: language === "th" ? "Primary role" : "Primary role", value: language === "th" ? "Adoption framing" : "Adoption framing", detail: language === "th" ? "turn theory into scenarios" : "turn theory into scenarios" },
        { label: language === "th" ? "Scenario families" : "Scenario families", value: String(featuredCases.length), detail: language === "th" ? "enterprise, regulated, public-sector" : "enterprise, regulated, public-sector" },
        { label: language === "th" ? "Adjacent layers" : "Adjacent layers", value: "Evaluation / Integration", detail: language === "th" ? "decision and implementation handoff" : "decision and implementation handoff" },
        { label: language === "th" ? "Audience" : "Audience", value: language === "th" ? "Leads + Operators" : "Leads + Operators", detail: language === "th" ? "teams planning adoption" : "teams planning adoption" },
      ]}
      footerTitle={language === "th" ? "ใช้ use-cases เพื่อคัดทาง ไม่ใช่เพื่อปิดการตัดสินใจ" : "Use use cases to narrow the path, not to finish the decision"}
      footerDescription={language === "th" ? "หลังจากเห็น scenario ที่เกี่ยวข้องแล้ว ควรต่อไปที่ evaluation, methodology และ integration เพื่อแปลง use case ให้เป็น plan ที่ลงมือทำได้จริง." : "After identifying a relevant scenario, continue into evaluation, methodology, and integration to turn the use case into an executable plan."}
      footerActions={[
        { href: `${localePrefix}/evaluation`, label: language === "th" ? "ไปหน้า evaluation" : "Go to evaluation", variant: "primary" },
        { href: `${localePrefix}/integration`, label: language === "th" ? "ไปหน้า integration" : "Go to integration", variant: "secondary" },
      ]}
    >
      <ResourceSection
        eyebrow={language === "th" ? "Featured scenarios" : "Featured scenarios"}
        title={language === "th" ? "บริบทตัวอย่างที่ใช้สื่อสารการนำไปใช้ได้ชัดที่สุด" : "The example contexts that explain adoption most clearly"}
        description={language === "th" ? "คัดเฉพาะ scenario ที่ช่วยอธิบายทั้งคุณค่า ความเสี่ยง และ requirement ด้าน trust ของระบบ." : "These scenarios are chosen because they clarify value, risk, and trust requirements at the same time."}
      >
        <ResourceCardGrid cards={featuredCases} />
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Adoption routes" : "Adoption routes"}
        title={language === "th" ? "เมื่อเจอ use case ที่ตรงแล้ว ควรไปหน้าไหนต่อ" : "Once you identify the right use case, which page should you open next"}
        description={language === "th" ? "แยก handoff ระหว่างการตัดสินใจ การ implement และการเรียนรู้จากผู้ใช้จริงให้ชัดเจน." : "This separates the handoff between decision work, implementation work, and learning from real users."}
      >
        <ResourceCardGrid cards={adoptionRoutes} />
      </ResourceSection>
    </ResourcePageShell>
  )
}