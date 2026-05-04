"use client"

import { usePathname } from "next/navigation"
import { BarChart3, BookOpen, Globe, Layers, Rocket, Sparkles, Zap } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { ResourcePageShell, ResourceSection } from "@/components/resource/resource-shell"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"

interface ReleaseEntry {
  version: string
  date: string
  title: string
  description: string
  icon: typeof Rocket
  highlights: string[]
  tone: string
}

export default function ChangelogClient() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))

  const releases: ReleaseEntry[] = [
    {
      version: "Website v3.4.0",
      date: "2026-04-30",
      title: language === "th" ? "MEE + MOIP blog batch · lcp-trace.mjs CI fix · SDK public launch" : "MEE + MOIP blog batch · lcp-trace.mjs CI fix · SDK public launch",
      description: language === "th" ? "เผยแพร่บทความ MEE และ MOIP (EN + TH) พร้อม article rct-platform open-source launch แก้ไข lcp-trace.mjs hang บน Linux CI ด้วย process group kill และอัปเดต sitemap lastmod เป็น hardcoded date" : "Published MEE and MOIP articles (EN + TH), rct-platform open-source launch article, fixed lcp-trace.mjs Linux CI hang via process group kill, and hardcoded SITE_LAST_DEPLOY for stable sitemap lastmod.",
      icon: Rocket,
      highlights: language === "th" ? ["MEE + MOIP articles EN + TH", "rct-platform launch article", "lcp-trace.mjs CI fix (process group kill)", "SITE_LAST_DEPLOY hardcoded", "hallucinationRate card ใน /benchmark"] : ["MEE + MOIP articles EN + TH", "rct-platform launch article", "lcp-trace.mjs CI fix (process group kill)", "SITE_LAST_DEPLOY hardcoded", "hallucinationRate card in /benchmark"],
      tone: "border-green-500/25 bg-green-500/10 text-green-600 dark:text-green-400",
    },
    {
      version: "SDK v1.0.2a0",
      date: "2026-04-30",
      title: language === "th" ? "Public Alpha Launch — 1,193 tests · 94% coverage · Apache 2.0" : "Public Alpha Launch — 1,193 tests · 94% coverage · Apache 2.0",
      description: language === "th" ? "เปิดตัว rct-platform public SDK บน GitHub (Apache 2.0) พร้อม 1,193 tests ผ่าน 94% coverage, 41 algorithms, 7 HexaCore models, GitHub Pages docs, Discussions, Milestones และ distribution docs ครบชุด" : "Launched rct-platform public SDK on GitHub (Apache 2.0) with 1,193 passing tests, 94% coverage, 41 algorithms, 7 HexaCore models, GitHub Pages docs, Discussions, Milestones, and full distribution docs.",
      icon: BookOpen,
      highlights: language === "th" ? ["1,193 tests · 94% coverage · 0 skips", "github.com/rctlabs/rct-platform public", "41 algorithms · 7 HexaCore models", "GitHub Pages + Discussions + Milestones live", "CLAIM_REGISTRY + PLATFORM_KITS docs"] : ["1,193 tests · 94% coverage · 0 skips", "github.com/rctlabs/rct-platform public", "41 algorithms · 7 HexaCore models", "GitHub Pages + Discussions + Milestones live", "CLAIM_REGISTRY + PLATFORM_KITS docs"],
      tone: "border-teal-500/25 bg-teal-500/10 text-teal-600 dark:text-teal-400",
    },
    {
      version: "Website v3.3.0",
      date: "2026-04-16",
      title: language === "th" ? "Mobile optimization + FAQ/Speakable schema + BLOG_RELATED_MAP 72 edges" : "Mobile optimization + FAQ/Speakable schema + BLOG_RELATED_MAP 72 edges",
      description: language === "th" ? "แก้ไข mobile layout บน 3 หน้า (genome, rct-7, rct-7-thinking) เพิ่ม FAQPage JSON-LD schema อัตโนมัติจาก H2 และ Speakable schema ใน BlogPosting JSON-LD เพิ่ม BLOG_RELATED_MAP 72 edges พร้อม Semantic Related Articles UI และแก้ไข GA4 CSP" : "Fixed mobile hero padding on 3 article pages, added FAQPage JSON-LD auto-extracted from H2 headings, Speakable schema in BlogPosting, BLOG_RELATED_MAP with 72 cluster edges, Semantic Related Articles UI, and GA4 CSP fix. Lighthouse mobile: 87–92 / 96 / 100 / 100.",
      icon: Rocket,
      highlights: language === "th" ? ["Mobile hero padding แก้ไขแล้ว 3 หน้า", "FAQPage JSON-LD จาก H2 headings", "Speakable schema ใน BlogPosting", "BLOG_RELATED_MAP 72 edges + Related Articles UI", "GA4 CSP fix (www.google.com)", "Lighthouse mobile 87–92/96/100/100"] : ["Mobile hero padding fixed on 3 pages", "FAQPage JSON-LD auto-extracted from H2", "Speakable schema in BlogPosting", "BLOG_RELATED_MAP 72 edges + Related Articles UI", "GA4 CSP fix (www.google.com added)", "Lighthouse mobile 87–92/96/100/100"],
      tone: "border-indigo-500/25 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400",
    },
    {
      version: "Website v3.2.0",
      date: "2026-04-15",
      title: language === "th" ? "BLOG_HERO_METRICS 24/24 + getPostJourney() 11 rules + E-E-A-T evidence badges" : "BLOG_HERO_METRICS 24/24 + getPostJourney() 11 rules + E-E-A-T evidence badges",
      description: language === "th" ? "ขยาย BlogHeroMetric interface เป็น 8 fields พร้อม evidenceType, evidenceRef, evidenceNote และ verifiedAt เพิ่ม validateMetricSet() enforcement เพิ่ม evidence badges ใน article-hero.tsx และ StatGrid เพิ่ม 72 metric cards ครบทั้ง 24 slugs และ getPostJourney() 11 rules ครอบคลุม 23/24 blog cluster" : "Expanded BlogHeroMetric interface to 8 fields with evidence taxonomy (evidenceType, evidenceRef, evidenceNote, verifiedAt). Added validateMetricSet() enforcement, evidence badges in article-hero.tsx and StatGrid. All 24/24 BLOG_HERO_METRICS complete. getPostJourney() now has 11 specific rules covering 23/24 blog clusters. Lighthouse 77/100/100/100.",
      icon: BarChart3,
      highlights: language === "th" ? ["BlogHeroMetric interface 8 fields", "validateMetricSet() enforcement", "Evidence badges ใน article-hero + StatGrid", "BLOG_HERO_METRICS 24/24 slugs ✅", "getPostJourney() 11 rules", "Lighthouse 77/100/100/100"] : ["BlogHeroMetric interface 8 fields", "validateMetricSet() enforcement", "Evidence badges in article-hero + StatGrid", "BLOG_HERO_METRICS 24/24 slugs complete ✅", "getPostJourney() 11 rules", "Lighthouse 77/100/100/100"],
      tone: "border-blue-500/25 bg-blue-500/10 text-blue-600 dark:text-blue-400",
    },
    {
      version: "Ecosystem v5.4.5",
      date: "2026-03-21",
      title: language === "th" ? "Backend Ecosystem v5.4.5 — 4,849 tests ผ่าน, Tier 8-9 algorithms สมบูรณ์" : "Backend Ecosystem v5.4.5 — 4,849 passing tests, Tier 8-9 algorithms complete",
      description: language === "th" ? "ระบบ backend ecosystem ผ่าน 4,849 automated tests บน CI/CD pipeline — Tier 8 (Synthesis) และ Tier 9 (Autonomy) algorithm tiers สมบูรณ์ครบถ้วน GitHub Actions pipeline ทำงานบนทุก PR" : "The backend ecosystem reached 4,849 passing automated tests across the CI/CD pipeline. Tier 8 (Synthesis) and Tier 9 (Autonomy) algorithm tiers are now complete, with GitHub Actions running on every PR.",
      icon: BookOpen,
      highlights: language === "th" ? ["4,849 tests (pytest + Hypothesis)", "Tier 8-9 algorithm rollout สมบูรณ์", "GitHub Actions CI/CD", "v5.4.5 released Mar 21, 2026"] : ["4,849 tests (pytest + Hypothesis)", "Tier 8-9 algorithm rollout complete", "GitHub Actions CI/CD", "v5.4.5 released Mar 21, 2026"],
      tone: "border-teal-500/25 bg-teal-500/10 text-teal-600 dark:text-teal-400",
    },
    {
      version: "v3.1.0",
      date: "2026-03-14",
      title: language === "th" ? "8-bit identity และการจัดระบบ navigation ใหม่" : "8-bit identity and navigation restructuring",
      description: language === "th" ? "เพิ่ม visual identity ใหม่ จัด navigation ใหม่ และทำให้ resource discovery ชัดขึ้นทั่วระบบ." : "Introduced the new visual identity, navigation overhaul, and clearer resource discovery across the site.",
      icon: Sparkles,
      highlights: language === "th" ? ["new identity system", "navigation overhaul", "resource discovery"] : ["new identity system", "navigation overhaul", "resource discovery"],
      tone: "border-violet-500/25 bg-violet-500/10 text-violet-600 dark:text-violet-400",
    },
    {
      version: "v3.0.0",
      date: "2026-03-14",
      title: language === "th" ? "AI assistant v3 และ interactive FDIA demo" : "AI assistant v3 and interactive FDIA demo",
      description: language === "th" ? "ยกระดับ AI assistant ให้รู้จักโครงสร้างเว็บและเพิ่ม FDIA interaction surfaces สำหรับการสาธิต." : "Upgraded the AI assistant with site knowledge and added richer FDIA interaction surfaces for demonstration.",
      icon: Zap,
      highlights: language === "th" ? ["site-aware assistant", "interactive FDIA", "research evidence cards"] : ["site-aware assistant", "interactive FDIA", "research evidence cards"],
      tone: "border-sky-500/25 bg-sky-500/10 text-sky-600 dark:text-sky-400",
    },
    {
      version: "v2.7.0",
      date: "2026-03-13",
      title: language === "th" ? "ระบบฟอนต์ใหม่และการปรับประสิทธิภาพ" : "Font system overhaul and performance tuning",
      description: language === "th" ? "เปลี่ยนระบบ typography และจัดการการโหลดฟอนต์ให้สอดคล้องกับการใช้งานสองภาษา." : "Rebuilt the typography system and tuned font loading for bilingual usage.",
      icon: Globe,
      highlights: language === "th" ? ["Space Grotesk + Kanit", "Thai subtitle tuning", "font preloading"] : ["Space Grotesk + Kanit", "Thai subtitle tuning", "font preloading"],
      tone: "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
    },
    {
      version: "v2.5.0",
      date: "2026-03-12",
      title: language === "th" ? "benchmark dashboard แบบ interactive" : "Interactive benchmark dashboard",
      description: language === "th" ? "เพิ่ม benchmark surfaces ที่เปรียบเทียบประสิทธิภาพและคุณภาพได้ชัดขึ้นสำหรับคนประเมินระบบ." : "Added richer benchmark surfaces for teams evaluating performance and quality trade-offs.",
      icon: BarChart3,
      highlights: language === "th" ? ["radar and bar charts", "animated metrics", "platform comparison"] : ["radar and bar charts", "animated metrics", "platform comparison"],
      tone: "border-orange-500/25 bg-orange-500/10 text-orange-600 dark:text-orange-400",
    },
    {
      version: "v2.0.0",
      date: "2026-03-11",
      title: language === "th" ? "multi-page SEO architecture" : "Multi-page SEO architecture",
      description: language === "th" ? "ขยายจากหน้าเดี่ยวไปสู่ระบบหลายหน้า พร้อม hubs สำหรับ solutions, products และ protocols." : "Expanded from a single experience into a multi-page system with hubs for solutions, products, and protocols.",
      icon: Layers,
      highlights: language === "th" ? ["resource hubs", "SEO silos", "protocol and product routes"] : ["resource hubs", "SEO silos", "protocol and product routes"],
      tone: "border-warm-amber/25 bg-warm-amber/10 text-warm-amber",
    },
  ]

  return (
    <ResourcePageShell
      eyebrow={language === "th" ? "Track / Changelog" : "Track / Changelog"}
      title={language === "th" ? "ประวัติเวอร์ชันและการเปลี่ยนแปลงเชิงระบบของ RCT" : "Version history and system-level change tracking for RCT"}
      description={language === "th" ? "Changelog ถูกจัดใหม่ให้เป็น track layer ของ resource system ใช้ดูการเปลี่ยนแปลงของ product, IA และ technical direction แบบตามลำดับเวลา." : "The changelog is restructured as the track layer of the resource system so teams can follow product, IA, and technical direction changes over time."}
      taxonomy={language === "th" ? ["Release history", "Feature milestones", "Platform evolution", "Track layer"] : ["Release history", "Feature milestones", "Platform evolution", "Track layer"]}
      accent="terracotta"
      actions={[
        { href: `${localePrefix}/research`, label: language === "th" ? "เปิด research archive" : "Open research archive", variant: "primary" },
        { href: `${localePrefix}/roadmap`, label: language === "th" ? "เปิด roadmap" : "Open roadmap", variant: "secondary" },
        { href: `${localePrefix}/docs`, label: language === "th" ? "เปิด docs" : "Open docs", variant: "secondary" },
      ]}
      stats={[
        { label: language === "th" ? "Tracked milestones" : "Tracked milestones", value: String(releases.length), detail: language === "th" ? "curated major changes" : "curated major changes" },
        { label: language === "th" ? "Current release" : "Current release", value: releases[0].version, detail: language === "th" ? "latest public version marker" : "latest public version marker" },
        { label: language === "th" ? "Neighbor routes" : "Neighbor routes", value: "Roadmap / Research", detail: language === "th" ? "context around forward and backward change" : "context around forward and backward change" },
        { label: language === "th" ? "Primary audience" : "Primary audience", value: language === "th" ? "Operators + Evaluators" : "Operators + Evaluators", detail: language === "th" ? "teams tracking release movement" : "teams tracking release movement" },
      ]}
      footerTitle={language === "th" ? "อ่าน changelog คู่กับ roadmap และ research" : "Read the changelog together with roadmap and research"}
      footerDescription={language === "th" ? "Changelog บอกว่าอะไรเปลี่ยน Roadmap บอกว่าจะไปไหน และ Research บอกว่าทำไมการเปลี่ยนแปลงนั้นสำคัญในเชิงระบบ." : "The changelog shows what changed, the roadmap shows where the platform is heading, and research explains why those changes matter at the system level."}
      footerActions={[
        { href: `${localePrefix}/roadmap`, label: language === "th" ? "ไปหน้า roadmap" : "Go to roadmap", variant: "primary" },
        { href: `${localePrefix}/research`, label: language === "th" ? "ไปหน้า research" : "Go to research", variant: "secondary" },
      ]}
    >
      <ResourceSection
        eyebrow={language === "th" ? "Recent milestones" : "Recent milestones"}
        title={language === "th" ? "การเปลี่ยนแปลงหลักที่ควรอ่านก่อน" : "The primary milestones worth reading first"}
        description={language === "th" ? "สรุปเฉพาะ milestone ที่ขยับโครงสร้าง product หรือเปลี่ยนประสบการณ์ของผู้ใช้และทีม implement อย่างมีนัยสำคัญ." : "This view focuses on the milestones that materially changed product structure or the experience of users and implementation teams."}
      >
        <div className="space-y-5">
          {releases.map((release) => {
            const Icon = release.icon

            return (
              <article key={release.version} className="rounded-3xl border border-border/70 bg-card/90 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.04)] md:p-8">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] ${release.tone}`}>
                        {release.version}
                      </span>
                      <span className="text-sm text-muted-foreground">{release.date}</span>
                    </div>
                    <h2 className="mt-4 text-2xl font-bold text-foreground md:text-3xl">{release.title}</h2>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted-foreground md:text-base">{release.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {release.highlights.map((highlight) => (
                        <span key={highlight} className="rounded-full border border-border bg-background/75 px-3 py-1 text-xs text-muted-foreground">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border bg-background/75 text-warm-amber">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </ResourceSection>

      <ResourceSection
        eyebrow={language === "th" ? "Operational follow-up" : "Operational follow-up"}
        title={language === "th" ? "หน้าที่ควรใช้ประกอบหลังจากเห็นการเปลี่ยนแปลง" : "The pages to pair with the changelog after you see a platform change"}
        description={language === "th" ? "ช่วยแยกว่าควรไป research เพื่อดูรากฐานทางเทคนิค หรือไป roadmap เพื่อดูทิศทางถัดไป." : "This helps separate whether you should continue into research for technical grounding or into roadmap for forward direction."}
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            {
              title: language === "th" ? "จับคู่กับ research archive" : "Pair it with the research archive",
              description: language === "th" ? "ใช้เมื่อ release ที่เห็นมีผลต่อ protocol, runtime, benchmark หรือ trust layer และต้องการหลักฐานเชิงลึกเพิ่ม." : "Use this when a release affects protocol, runtime, benchmark, or trust layers and you need deeper technical grounding.",
              href: `${localePrefix}/research`,
              icon: BookOpen,
            },
            {
              title: language === "th" ? "จับคู่กับ roadmap" : "Pair it with the roadmap",
              description: language === "th" ? "ใช้เมื่ออยากรู้ว่าสิ่งที่เปลี่ยนล่าสุดกำลังพา platform ไปทางไหนในรอบต่อไป." : "Use this when you want to see what the latest changes imply for the next platform direction.",
              href: `${localePrefix}/roadmap`,
              icon: Rocket,
            },
          ].map((item) => {
            const Icon = item.icon

            return (
              <a key={item.href} href={item.href} className="group rounded-3xl border border-border/70 bg-card/90 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.04)] transition hover:border-warm-amber/35 hover:shadow-[0_18px_42px_rgba(0,0,0,0.06)]">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-background/75 text-warm-amber">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-foreground transition group-hover:text-warm-amber">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
              </a>
            )
          })}
        </div>
      </ResourceSection>
    </ResourcePageShell>
  )
}