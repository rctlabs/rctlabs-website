"use client"

import { motion } from "framer-motion"
import { Check, X, Zap, Shield, Brain, ArrowRight, Sparkles } from "lucide-react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { buildContactHref } from "@/lib/funnel"
import { pricingCheckoutLinks } from "@/lib/payment-links"
import { pixelIcons } from "@/lib/pixel-icons"
import { SITE_UPTIME } from "@/lib/site-config"

const fadeUp = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }

const subscriptionPlans = [
  {
    nameEn: "Free",
    nameTh: "Free",
    priceEn: "$0",
    priceTh: "$0",
    periodEn: "/month",
    periodTh: "/เดือน",
    descriptionEn: "For learning, evaluation, and early exploration.",
    descriptionTh: "สำหรับการเรียนรู้ ประเมินระบบ และทดลองใช้งานระยะแรก",
    featuresEn: ["50 templates", "1K tokens", "Entry access"],
    featuresTh: ["50 เทมเพลต", "1K tokens", "สิทธิ์เริ่มต้น"],
    accent: "#89B4C8",
    popular: false,
  },
  {
    nameEn: "Starter",
    nameTh: "Starter",
    priceEn: "$14.99",
    priceTh: "$14.99",
    periodEn: "/month",
    periodTh: "/เดือน",
    descriptionEn: "For individuals and small teams validating workflows.",
    descriptionTh: "สำหรับบุคคลหรือทีมเล็กที่กำลังตรวจสอบ workflow",
    featuresEn: ["100 templates", "5K tokens", "2 LLMs"],
    featuresTh: ["100 เทมเพลต", "5K tokens", "2 LLMs"],
    accent: "#7B9E87",
    popular: false,
  },
  {
    nameEn: "Pro",
    nameTh: "Pro",
    priceEn: "$39.99",
    priceTh: "$39.99",
    periodEn: "/month",
    periodTh: "/เดือน",
    descriptionEn: "Best fit for professional teams using consensus workflows.",
    descriptionTh: "เหมาะที่สุดสำหรับทีมมืออาชีพที่ใช้ consensus workflow",
    featuresEn: ["150+ templates", "25K tokens", "Multi-LLM consensus"],
    featuresTh: ["150+ เทมเพลต", "25K tokens", "Multi-LLM consensus"],
    accent: "#D4A853",
    popular: true,
  },
  {
    nameEn: "Business",
    nameTh: "Business",
    priceEn: "$99.99",
    priceTh: "$99.99",
    periodEn: "/month",
    periodTh: "/เดือน",
    descriptionEn: "For growing businesses that need white-label and integration support.",
    descriptionTh: "สำหรับธุรกิจที่ต้องการ white-label และการเชื่อมต่อเพิ่มเติม",
    featuresEn: ["Unlimited usage bands", "White-label", "Custom integrations"],
    featuresTh: ["ระดับใช้งานไม่จำกัด", "White-label", "Custom integrations"],
    accent: "#C4745B",
    popular: false,
  },
  {
    nameEn: "Enterprise",
    nameTh: "Enterprise",
    priceEn: "Custom",
    priceTh: "กำหนดเอง",
    periodEn: "plan",
    periodTh: "แพ็กเกจ",
    descriptionEn: "Private infrastructure, compliance, and dedicated support.",
    descriptionTh: "Private infrastructure, compliance และทีม support เฉพาะ",
    featuresEn: ["Private deployment", "Custom SLA", "Dedicated team"],
    featuresTh: ["Private deployment", "Custom SLA", "ทีมเฉพาะ"],
    accent: "#B8A9C9",
    popular: false,
  },
]

/* ─── PRICING TIERS ────────────────────────────────────────────────── */
const tiers = [
  {
    id: "rctlabs",
    nameEn: "RCTLabs",
    nameTh: "RCTLabs",
    tagEn: "Research & Development",
    tagTh: "วิจัยและพัฒนา",
    descEn:
      "AI research platform with multi-LLM orchestration, FDIA equation engine, and cognitive architecture tools for teams building next-generation AI systems.",
    descTh:
      "แพลตฟอร์มวิจัย AI พร้อม multi-LLM orchestration, FDIA equation engine และเครื่องมือ cognitive architecture สำหรับทีมที่สร้างระบบ AI ยุคใหม่",
    priceEn: "Contact Sales",
    priceTh: "ติดต่อฝ่ายขาย",
    periodEn: "Custom enterprise pricing",
    periodTh: "ราคาสำหรับองค์กรแบบกำหนดเอง",
    icon: Brain,
    color: "#7B9E87",
    popular: false,
    pixelIcon: pixelIcons.brain,
    features: [
      { en: "Multi-LLM Orchestration Engine", th: "Multi-LLM Orchestration Engine" },
      { en: "FDIA Equation Framework", th: "FDIA Equation Framework" },
      { en: "10-Layer Cognitive Architecture", th: "10-Layer Cognitive Architecture" },
      { en: "7 Genome Subsystems", th: "7 Genome Subsystems" },
      { en: "Production Algorithm Engine", th: "Production Algorithm Engine" },
      { en: "Analysearch Methodology", th: "Analysearch Methodology" },
      { en: "Custom Model Training", th: "Custom Model Training" },
      { en: "Dedicated Support Team", th: "ทีม Support เฉพาะ" },
      { en: "On-premise Deployment", th: "On-premise Deployment" },
      { en: `${SITE_UPTIME} availability target`, th: `เป้าหมายความพร้อมใช้งาน ${SITE_UPTIME.replace(" target", "")}` },
    ],
  },
  {
    id: "artent-ai",
    nameEn: "Artent AI",
    nameTh: "Artent AI",
    tagEn: "Creative Intelligence",
    tagTh: "ปัญญาสร้างสรรค์",
    descEn:
      "Intent-driven creative AI platform that transforms artistic vision into reality through multi-modal generation, style transfer, and creative workflow automation.",
    descTh:
      "แพลตฟอร์ม AI สร้างสรรค์ที่ขับเคลื่อนด้วย intent — แปลงวิสัยทัศน์ทางศิลปะเป็นความจริงผ่าน multi-modal generation และ workflow automation",
    priceEn: "Contact Sales",
    priceTh: "ติดต่อฝ่ายขาย",
    periodEn: "Usage-based pricing available",
    periodTh: "มีราคาตามการใช้งาน",
    icon: Sparkles,
    color: "#D4A853",
    popular: true,
    pixelIcon: pixelIcons.rocket,
    features: [
      { en: "Multi-Modal Content Generation", th: "Multi-Modal Content Generation" },
      { en: "Intent-Driven Creative Engine", th: "Intent-Driven Creative Engine" },
      { en: "Style Transfer & Consistency", th: "Style Transfer & Consistency" },
      { en: "Brand Voice Management", th: "Brand Voice Management" },
      { en: "Creative Workflow Automation", th: "Creative Workflow Automation" },
      { en: "Real-time Collaboration", th: "Real-time Collaboration" },
      { en: "API Access", th: "API Access" },
      { en: "Priority Support", th: "Priority Support" },
      { en: "Custom Integrations", th: "Custom Integrations" },
      { en: "Analytics Dashboard", th: "Analytics Dashboard" },
    ],
  },
  {
    id: "signed-ai",
    nameEn: "SignedAI",
    nameTh: "SignedAI",
    tagEn: "Verified Intelligence",
    tagTh: "ปัญญาที่ยืนยันได้",
    descEn:
      "Cryptographically verified AI output platform with blockchain-anchored audit trails, ensuring every AI decision is traceable, tamper-proof, and compliance-ready.",
    descTh:
      "แพลตฟอร์ม AI ที่ยืนยันด้วย cryptography พร้อม audit trail บน blockchain — ทำให้ทุกการตัดสินใจของ AI ตรวจสอบได้และพร้อมสำหรับ compliance",
    priceEn: "Contact Sales",
    priceTh: "ติดต่อฝ่ายขาย",
    periodEn: "Volume-based enterprise pricing",
    periodTh: "ราคาองค์กรตามปริมาณการใช้งาน",
    icon: Shield,
    color: "#89B4C8",
    popular: false,
    pixelIcon: pixelIcons.shield,
    features: [
      { en: "Cryptographic Output Verification", th: "Cryptographic Output Verification" },
      { en: "Blockchain Audit Trail", th: "Blockchain Audit Trail" },
      { en: "Tamper-Proof AI Decisions", th: "Tamper-Proof AI Decisions" },
      { en: "Compliance Reporting (SOC2, GDPR)", th: "Compliance Reporting (SOC2, GDPR)" },
      { en: "Real-time Verification API", th: "Real-time Verification API" },
      { en: "Multi-Model Consensus Signing", th: "Multi-Model Consensus Signing" },
      { en: "Enterprise Key Management", th: "Enterprise Key Management" },
      { en: "Dedicated Security Team", th: "ทีม Security เฉพาะ" },
      { en: "Custom Compliance Modules", th: "Custom Compliance Modules" },
      { en: "SLA 99.99% Uptime", th: "SLA 99.99% Uptime" },
    ],
  },
]

/* ─── COMPARISON TABLE ─────────────────────────────────────────────── */
const comparisonCategories = [
  {
    nameEn: "Core Capabilities",
    nameTh: "ความสามารถหลัก",
    rows: [
      { en: "Multi-LLM Orchestration", th: "Multi-LLM Orchestration", rctlabs: true, artent: "partial", signed: true },
      { en: "FDIA Equation Engine", th: "FDIA Equation Engine", rctlabs: true, artent: "partial", signed: "partial" },
      { en: "Cryptographic Verification", th: "Cryptographic Verification", rctlabs: "partial", artent: false, signed: true },
      { en: "Creative AI Generation", th: "Creative AI Generation", rctlabs: false, artent: true, signed: false },
      { en: "JITNA Protocol Support", th: "JITNA Protocol Support", rctlabs: true, artent: true, signed: true },
    ],
  },
  {
    nameEn: "Enterprise Features",
    nameTh: "ฟีเจอร์สำหรับองค์กร",
    rows: [
      { en: "On-premise Deployment", th: "On-premise Deployment", rctlabs: true, artent: false, signed: true },
      { en: "SOC2 Compliance", th: "SOC2 Compliance", rctlabs: true, artent: "partial", signed: true },
      { en: "Custom SLA", th: "Custom SLA", rctlabs: true, artent: true, signed: true },
      { en: "Dedicated Support", th: "Dedicated Support", rctlabs: true, artent: true, signed: true },
      { en: "API Rate Limits", th: "API Rate Limits", rctlabs: "unlimited", artent: "10K/min", signed: "50K/min" },
    ],
  },
]

function CellValue({ value }: { value: boolean | string }) {
  if (value === true) return <Check size={16} className="text-warm-sage mx-auto" />
  if (value === false) return <X size={16} className="text-[#CCC] dark:text-[#555] mx-auto" />
  return <span className="text-xs font-medium text-warm-amber">{value}</span>
}

/* ─── PAGE ──────────────────────────────────────────────────────────── */
export default function PricingPage() {
  const { language } = useLanguage()
  const isTh = language === "th"
  const searchParams = useSearchParams()
  const checkoutSuccess = searchParams.get("status") === "success"

  const lh = (path: string) => `/${language}${path}`

  return (
    <div className="min-h-screen bg-warm-cream dark:bg-[#0D0D0D] transition-colors duration-300">
      <Navbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-300 mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ duration: 0.6 }}>
            {checkoutSuccess ? (
              <div className="mx-auto mb-6 max-w-2xl rounded-2xl border border-warm-sage/30 bg-warm-sage/10 px-5 py-4 text-sm text-warm-charcoal dark:text-warm-light-gray">
                {isTh
                  ? "ระบบได้รับสถานะการชำระเงินแล้ว ทีมงานจะติดต่อกลับเพื่อยืนยันขั้นตอนถัดไป"
                  : "Your checkout status was received. The team will follow up with onboarding and the next steps."}
              </div>
            ) : null}
            <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-6 bg-[#D4A85318] text-warm-amber">
              <Zap size={12} />
              {isTh ? "แผนราคา" : "Pricing Plans"}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-warm-charcoal dark:text-warm-light-gray">
              {isTh ? "เลือก" : "Choose the"}{" "}
              <span className="font-display font-semibold text-warm-amber">{isTh ? "โซลูชัน" : "Solution"}</span>{" "}
              {isTh ? "ที่เหมาะกับคุณ" : "That Fits"}
            </h1>
            <p className="text-base max-w-2xl mx-auto text-warm-gray dark:text-[#888]">
              {isTh
                ? "ทุกผลิตภัณฑ์ใน RCT Ecosystem ถูกออกแบบมาเพื่อตอบโจทย์ที่แตกต่างกัน — เลือกสิ่งที่ตรงกับความต้องการขององค์กรคุณ"
                : "Each product in the RCT Ecosystem is designed for different needs — choose what aligns with your organization's goals."}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <Link href={lh("/products")} className="rounded-xl border border-warm-light-gray bg-white px-4 py-3 text-sm font-medium text-warm-charcoal transition-colors hover:bg-warm-sand dark:border-[#2A2A2A] dark:bg-[#1E1E1E] dark:text-warm-light-gray dark:hover:bg-[#252525]">
                {isTh ? "สำรวจผลิตภัณฑ์ทั้งหมด" : "Explore All Products"}
              </Link>
              <Link href={lh("/solutions")} className="rounded-xl border border-warm-light-gray bg-white px-4 py-3 text-sm font-medium text-warm-charcoal transition-colors hover:bg-warm-sand dark:border-[#2A2A2A] dark:bg-[#1E1E1E] dark:text-warm-light-gray dark:hover:bg-[#252525]">
                {isTh ? "ดูโซลูชันตามปัญหา" : "Match Solutions to Problems"}
              </Link>
              <Link href={lh("/whitepaper")} className="rounded-xl border border-warm-light-gray bg-white px-4 py-3 text-sm font-medium text-warm-charcoal transition-colors hover:bg-warm-sand dark:border-[#2A2A2A] dark:bg-[#1E1E1E] dark:text-warm-light-gray dark:hover:bg-[#252525]">
                {isTh ? "อ่าน Whitepaper ก่อนตัดสินใจ" : "Read the Whitepaper First"}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-300 mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-warm-charcoal dark:text-warm-light-gray">
              {isTh ? "แผนสมาชิกที่เผยแพร่สาธารณะ" : "Public Subscription Tiers"}
            </h2>
            <p className="mt-3 text-sm max-w-2xl mx-auto text-warm-gray dark:text-[#888]">
              {isTh
                ? "โครงสร้างราคาสำหรับการประเมินและเริ่มใช้งาน ก่อนขยายไปสู่ deployment ระดับองค์กร"
                : "Commercial entry points for evaluation and early production adoption before moving into enterprise deployment."}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {subscriptionPlans.map((plan) => (
              <div key={plan.nameEn} className={`rounded-2xl border p-5 ${plan.popular ? "border-warm-amber/40 bg-white ring-1 ring-warm-amber/20 dark:bg-[#1E1E1E]" : "border-warm-light-gray bg-white dark:border-[#2A2A2A] dark:bg-[#1E1E1E]"}`}>
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base font-bold text-warm-charcoal dark:text-warm-light-gray">{isTh ? plan.nameTh : plan.nameEn}</h3>
                  {plan.popular ? <span className="rounded-full bg-warm-amber px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">{isTh ? "แนะนำ" : "Popular"}</span> : null}
                </div>
                <p className="mt-2 text-sm text-warm-gray dark:text-[#888]">{isTh ? plan.descriptionTh : plan.descriptionEn}</p>
                <div className="mt-4 flex items-end gap-1">
                  <div className="text-3xl font-bold font-display" style={{ color: plan.accent }}>{isTh ? plan.priceTh : plan.priceEn}</div>
                  <div className="pb-1 text-xs text-[#999] dark:text-[#666]">{isTh ? plan.periodTh : plan.periodEn}</div>
                </div>
                <ul className="mt-4 space-y-2">
                  {(isTh ? plan.featuresTh : plan.featuresEn).map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-xs text-[#4A4A4A] dark:text-[#AAA]">
                      <Check size={14} className="mt-0.5 shrink-0" style={{ color: plan.accent }} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product Suites ───────────────────────────────────────────── */}
      <section className="pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-300 mx-auto">
          <div className="mb-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-warm-charcoal dark:text-warm-light-gray">
              {isTh ? "ชุดผลิตภัณฑ์สำหรับองค์กร" : "Enterprise Product Suites"}
            </h2>
            <p className="mt-3 text-sm max-w-2xl mx-auto text-warm-gray dark:text-[#888]">
              {isTh
                ? "เมื่อทีมของคุณผ่านช่วงประเมินแล้ว ให้เลือก product suite ที่ตรงกับ use case, governance และรูปแบบ deployment"
                : "Once your team moves beyond evaluation, choose the product suite that fits your use case, governance model, and deployment needs."}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((tier, i) => {
            const Icon = tier.icon
            const paymentLink = pricingCheckoutLinks[tier.id as keyof typeof pricingCheckoutLinks]
            const hasHostedCheckout = Boolean(paymentLink)
            const contactHref = buildContactHref(language, `pricing:${tier.id}:sales`)
            return (
              <motion.div
                key={tier.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col rounded-2xl border overflow-hidden transition-shadow hover:shadow-xl ${
                  tier.popular
                    ? "border-warm-amber/40 bg-white dark:bg-[#1E1E1E] ring-1 ring-warm-amber/20"
                    : "border-warm-light-gray dark:border-[#2A2A2A] bg-white dark:bg-[#1E1E1E]"
                }`}
              >
                {tier.popular && (
                  <div className="absolute top-0 right-0 bg-warm-amber text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-bl-xl">
                    {isTh ? "แนะนำ" : "Popular"}
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  {/* Pixel art accent */}
                  <Image
                    src={tier.pixelIcon}
                    alt=""
                    aria-hidden="true"
                    className="absolute top-4 right-4 w-10 h-10 opacity-10 pointer-events-none"
                    style={{ imageRendering: "pixelated" }}
                    width={40}
                    height={40}
                    loading="lazy"
                    unoptimized
                    priority={false}
                  />

                  {/* Icon + Name */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${tier.color}18` }}
                    >
                      <Icon size={20} style={{ color: tier.color }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-warm-charcoal dark:text-warm-light-gray">
                        {isTh ? tier.nameTh : tier.nameEn}
                      </h3>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#999] dark:text-[#666]">
                        {isTh ? tier.tagTh : tier.tagEn}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs leading-relaxed mb-5 text-warm-gray dark:text-[#888]">
                    {isTh ? tier.descTh : tier.descEn}
                  </p>

                  {/* Price */}
                  <div className="mb-5">
                    <div className="text-2xl font-bold font-display text-warm-charcoal dark:text-warm-light-gray">
                      {isTh ? tier.priceTh : tier.priceEn}
                    </div>
                    <div className="text-[11px] text-[#999] dark:text-[#666]">
                      {isTh ? tier.periodTh : tier.periodEn}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2.5 mb-6 flex-1">
                    {tier.features.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2">
                        <Check size={14} className="mt-0.5 shrink-0" style={{ color: tier.color }} />
                        <span className="text-xs text-[#4A4A4A] dark:text-[#AAA]">{isTh ? f.th : f.en}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  {hasHostedCheckout ? (
                    <a
                      href={paymentLink}
                      target="_blank"
                      rel="noreferrer noopener"
                      className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                        tier.popular
                          ? "bg-warm-amber text-white hover:bg-[#C49A48] shadow-md"
                          : "bg-warm-sand dark:bg-[#2A2A2A] text-warm-charcoal dark:text-warm-light-gray hover:bg-warm-light-gray dark:hover:bg-[#333]"
                      }`}
                    >
                      {isTh ? "เริ่ม Checkout" : "Start Checkout"}
                      <ArrowRight size={14} />
                    </a>
                  ) : (
                    <Link
                      href={contactHref}
                      className={`w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                        tier.popular
                          ? "bg-warm-amber text-white hover:bg-[#C49A48] shadow-md"
                          : "bg-warm-sand dark:bg-[#2A2A2A] text-warm-charcoal dark:text-warm-light-gray hover:bg-warm-light-gray dark:hover:bg-[#333]"
                      }`}
                    >
                      {isTh ? "ติดต่อฝ่ายขาย" : "Contact Sales"}
                      <ArrowRight size={14} />
                    </Link>
                  )}
                  <Link href={contactHref} className="mt-3 text-center text-xs font-medium text-muted-foreground transition-colors hover:text-foreground">
                    {isTh ? "ขอใบเสนอราคาและนัดคุยกับทีม" : "Request a quote and talk to the team"}
                  </Link>
                </div>
              </motion.div>
            )
          })}
          </div>
        </div>
      </section>

      {/* ── Feature Comparison ───────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-[#141414]">
        <div className="max-w-250 mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3 text-warm-charcoal dark:text-warm-light-gray">
              {isTh ? "เปรียบเทียบ" : "Compare"}{" "}
              <span className="font-display font-semibold text-warm-sage">{isTh ? "ฟีเจอร์" : "Features"}</span>
            </h2>
            <p className="text-sm max-w-xl mx-auto text-warm-gray dark:text-[#888]">
              {isTh
                ? "ดูรายละเอียดความสามารถของแต่ละผลิตภัณฑ์เพื่อเลือกสิ่งที่เหมาะกับองค์กรคุณ"
                : "See detailed capabilities of each product to find the best fit for your organization."}
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-warm-light-gray dark:border-[#2A2A2A] overflow-hidden"
          >
            {/* Table header */}
            <div className="grid grid-cols-4 text-center text-xs font-semibold uppercase tracking-wider py-4 px-4 bg-warm-cream dark:bg-[#1E1E1E] text-warm-gray dark:text-[#888]">
              <div className="text-left">{isTh ? "ฟีเจอร์" : "Feature"}</div>
              <div style={{ color: "#7B9E87" }}>RCTLabs</div>
              <div style={{ color: "#D4A853" }}>Artent AI</div>
              <div style={{ color: "#89B4C8" }}>SignedAI</div>
            </div>

            {comparisonCategories.map((cat, ci) => (
              <div key={ci}>
                <div className="px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider bg-[#F5F0E8] dark:bg-warm-charcoal text-[#999] dark:text-[#666]">
                  {isTh ? cat.nameTh : cat.nameEn}
                </div>
                {cat.rows.map((row, ri) => (
                  <div
                    key={ri}
                    className="grid grid-cols-4 text-center items-center py-3 px-4 border-t border-warm-light-gray/50 dark:border-[#2A2A2A]"
                  >
                    <div className="text-left text-xs text-[#4A4A4A] dark:text-[#CCC]">{isTh ? row.th : row.en}</div>
                    <CellValue value={row.rctlabs} />
                    <CellValue value={row.artent} />
                    <CellValue value={row.signed} />
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────────── */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-warm-cream dark:bg-[#0D0D0D]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          transition={{ duration: 0.6 }}
          className="max-w-200 mx-auto text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 text-warm-charcoal dark:text-warm-light-gray">
            {isTh ? "ต้องการ" : "Need a"}{" "}
            <span className="font-display font-semibold text-warm-amber">
              {isTh ? "แผนที่กำหนดเอง" : "Custom Plan"}
            </span>
            ?
          </h2>
          <p className="text-sm mb-8 max-w-xl mx-auto text-warm-gray dark:text-[#888]">
            {isTh
              ? "เราสามารถปรับแต่งโซลูชันให้ตรงกับความต้องการเฉพาะขององค์กรคุณ — รวมถึงการ deploy แบบ on-premise, custom SLA, และ dedicated support"
              : "We can tailor solutions to your organization's specific needs — including on-premise deployment, custom SLAs, and dedicated support teams."}
          </p>
          <Link
            href={buildContactHref(language, "pricing:rctlabs:sales")}
            className="inline-flex items-center gap-2 bg-warm-amber text-white px-8 py-3.5 rounded-xl text-sm font-semibold hover:bg-[#C49A48] transition-colors shadow-md"
          >
            {isTh ? "พูดคุยกับทีมเรา" : "Talk to Our Team"}
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  )
}
