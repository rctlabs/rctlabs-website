import type { Metadata } from "next"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import RoadmapSection from "@/components/sections/roadmap-section"
import { createBilingualMetadata } from "@/lib/seo-bilingual"
import { getBreadcrumbSchema } from "@/lib/schema"
import { getRequestLocale } from "@/lib/request-locale"

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getRequestLocale()

  return createBilingualMetadata(
    locale,
    "Roadmap — RCT Labs 2026 Phases, ArtentAI & SignedAI Launch Timeline",
    "Roadmap — แผนงาน 9 Phase ของ RCT Labs ปี 2026 รวม ArtentAI และ SignedAI",
    "Track RCT Labs' 9-phase public roadmap: foundations, infrastructure, content hardening, production launch, Full RCT OS, open source, ArtentAI + SignedAI platform, and TUI/CLI developer mode. Target: end of 2026.",
    "ติดตาม roadmap สาธารณะ 9 Phase ของ RCT Labs: ตั้งแต่ Foundations, HexaCore, SEO, Production Launch (เม.ย. 2026), Full RCT OS, Open Source, ArtentAI + SignedAI Platform และ TUI/CLI Developer Mode เป้าหมาย: สิ้นปี 2026",
    "/roadmap",
    [
      "RCT Labs roadmap", "ArtentAI roadmap", "SignedAI launch", "RCT OS timeline",
      "RCT Labs 2026", "Early Access RCT Labs", "GitHub Coffee", "TUI CLI developer mode",
      "AI platform roadmap", "enterprise AI milestones"
    ]
  )
}

const ROADMAP_BASE = "https://rctlabs.co"

const phasesItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "RCT Labs Development Roadmap — 9 Phases 2026",
  "description": "Public roadmap for RCT Labs covering 9 strategic phases from Foundations through TUI/CLI Developer Mode, targeting full platform completion by end of 2026.",
  "url": `${ROADMAP_BASE}/roadmap`,
  "numberOfItems": 9,
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Phase 1 — Foundations, FDIA, and Core Documentation", "description": "Define FDIA Equation, design 10-layer architecture model, document the 7 Genome system, publish core JITNA references.", "url": `${ROADMAP_BASE}/roadmap#phase-1` },
    { "@type": "ListItem", "position": 2, "name": "Phase 2 — HexaCore Infrastructure", "description": "Complete HexaCore Phase 1 infrastructure, ship key manager, registry, routing, and consensus foundation.", "url": `${ROADMAP_BASE}/roadmap#phase-2` },
    { "@type": "ListItem", "position": 3, "name": "Phase 3 — Content, Schema & SEO Hardening", "description": "Publish 22 long-form research articles, enrich BlogPosting schema, launch verified author system, publish Glossary.", "url": `${ROADMAP_BASE}/roadmap#phase-3` },
    { "@type": "ListItem", "position": 4, "name": "Phase 4 — Website Content-Complete & Pre-Launch Hardening", "description": "Enterprise blog design, schema standardization, compare landing pages, domain cutover to rctlabs.co.", "url": `${ROADMAP_BASE}/roadmap#phase-4` },
    { "@type": "ListItem", "position": 5, "name": "Phase 5 — Production Launch & SEO Warmup", "description": "rctlabs.co DNS live April 2026, Google Search Console, Early Access program, Lifetime Plan launch, ArtentAI soft launch.", "url": `${ROADMAP_BASE}/roadmap#phase-5` },
    { "@type": "ListItem", "position": 6, "name": "Phase 6 — Backend Phase 1 — Full RCT OS", "description": "ArtentAI connected to real HexaCore backend, Regional LLM Typhoon integration, Full RCT OS operational in production.", "url": `${ROADMAP_BASE}/roadmap#phase-6` },
    { "@type": "ListItem", "position": 7, "name": "Phase 7 — Open Source & Community", "description": "GitHub Public launch for RCT Ecosystem, full documentation, GitHub Coffee sponsors plan, community feedback loop.", "url": `${ROADMAP_BASE}/roadmap#phase-7` },
    { "@type": "ListItem", "position": 8, "name": "Phase 8 — ArtentAI + SignedAI Platform Launch", "description": "Full product launch for ArtentAI Platform and SignedAI Platform, enterprise onboarding pipeline open.", "url": `${ROADMAP_BASE}/roadmap#phase-8` },
    { "@type": "ListItem", "position": 9, "name": "Phase 9 — TUI/CLI Developer Mode", "description": "TUI/CLI Beta Backend Mode, full developer access, power-user workflow toolset, solo developer toolchain complete.", "url": `${ROADMAP_BASE}/roadmap#phase-9` },
  ],
}

export default async function RoadmapPage() {
  const locale = await getRequestLocale()
  const localePrefix = locale === "th" ? "/th" : "/en"
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: `https://rctlabs.co${localePrefix}` },
    { name: "Roadmap", url: `https://rctlabs.co${localePrefix}/roadmap` },
  ])

  return (
    <main className="min-h-screen bg-background">
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(phasesItemList) }} />
      <Navbar />
      <div className="pt-16">
        <RoadmapSection />
      </div>
      <Footer />
    </main>
  )
}