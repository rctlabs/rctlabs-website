"use client"

/*
 * Footer — Warm Enterprise design
 * Adapted from manus-frontend-design; Next.js-compatible
 * Newsletter form → POST /api/newsletter with Supabase backend
 */
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/language-provider"
import { useTheme } from "next-themes"
import { toast } from "sonner"
import { useMounted } from "@/hooks/use-mounted"
import { getLocalePrefix, resolveLocale } from "@/lib/i18n"
import { SITE_VERSION, SOCIAL_LINKS } from "@/lib/site-config"

const LOGO_PNG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663194929524/dtmGiwqwKJmsY6Rj8xtHTM/Logo-horizontal-600x200-transparent_7bebf81e.png"

export function Footer() {
  const { language, t } = useLanguage()
  const pathname = usePathname()
  const { theme } = useTheme()
  const mounted = useMounted()
  const isDark = (mounted ? theme : "light") === "dark"
  const isTh = language === "th"

  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailError, setEmailError] = useState("")
  const [isSuccess, setIsSuccess] = useState(false)

  const localePrefix = getLocalePrefix(resolveLocale(pathname, language))
  const lh = (href: string) => `${localePrefix}${href}`

  const validateEmail = (value: string) => {
    if (!value) return isTh ? "กรุณากรอกอีเมล" : "Email is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return isTh ? "รูปแบบอีเมลไม่ถูกต้อง" : "Invalid email format"
    return ""
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
    setIsSuccess(false)
    if (emailError) setEmailError("")
  }

  const handleEmailBlur = () => {
    const err = validateEmail(email)
    setEmailError(err)
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const err = validateEmail(email)
    if (err) { setEmailError(err); toast.error(err); return }
    setIsSubmitting(true)
    setEmailError("")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), locale: language, source: "footer" }),
      })
      const data = await res.json()
      if (res.ok && data.success) {
        setIsSuccess(true)
        setEmail("")
        toast.success(isTh ? "สมัครรับข่าวสารสำเร็จ! 🎉" : "Subscribed successfully! 🎉")
      } else {
        toast.error(data.error || (isTh ? "เกิดข้อผิดพลาด กรุณาลองใหม่" : "An error occurred. Please try again."))
      }
    } catch {
      toast.error(isTh ? "ไม่สามารถเชื่อมต่อได้ กรุณาลองใหม่" : "Connection failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const footerLinks = {
    [isTh ? "โซลูชัน" : "Solutions"]: [
      { label: isTh ? "โซลูชันทั้งหมด" : "All Solutions", href: "/solutions" },
      { label: isTh ? "ป้องกัน Hallucination" : "Hallucination Prevention", href: "/solutions/ai-hallucination-prevention" },
      { label: "Enterprise AI Memory", href: "/solutions/enterprise-ai-memory" },
      { label: "Dynamic AI Routing", href: "/solutions/dynamic-ai-routing" },
    ],
    [isTh ? "ผลิตภัณฑ์" : "Products"]: [
      { label: "RCTLabs", href: "/products/rctlabs" },
      { label: "Artent AI", href: "/products/artent-ai" },
      { label: "SignedAI", href: "/products/signed-ai" },
      { label: isTh ? "ราคา" : "Pricing", href: "/pricing" },
    ],
    [isTh ? "เทคโนโลยี" : "Technology"]: [
      { label: isTh ? "ระบบหลัก" : "Core Systems", href: "/core-systems" },
      { label: isTh ? "สถาปัตยกรรม" : "Architecture", href: "/architecture" },
      { label: "7 Genome System", href: "/genome" },
      { label: "41 Algorithms", href: "/algorithms" },
      { label: "Protocols", href: "/protocols" },
    ],
    [isTh ? "ทรัพยากร" : "Resources"]: [
      { label: "Whitepaper", href: "/whitepaper" },
      { label: isTh ? "บทความ" : "Blog", href: "/blog" },
      { label: isTh ? "แผนงาน" : "Roadmap", href: "/roadmap" },
      { label: isTh ? "Methodology" : "Methodology", href: "/methodology" },
      { label: isTh ? "Benchmark" : "Benchmark Summary", href: "/benchmark-summary" },
      { label: isTh ? "Thailand Trust" : "Thailand Trust", href: "/thailand-enterprise-trust" },
      { label: isTh ? "กรณีศึกษา" : "Use Cases", href: "/use-cases" },
      { label: isTh ? "การเชื่อมต่อ" : "Integration", href: "/integration" },
    ],
    [isTh ? "บริษัท" : "Company"]: [
      { label: isTh ? "เกี่ยวกับเรา" : "About Us", href: "/about" },
      { label: "FAQ", href: "/faq" },
      { label: isTh ? "นโยบายความเป็นส่วนตัว" : "Privacy Policy", href: "/privacy" },
      { label: isTh ? "ข้อกำหนด" : "Terms", href: "/terms" },
      { label: "GitHub", href: SOCIAL_LINKS.github, external: true },
    ],
  }

  const socialLinks = [
    {
      label: "GitHub",
      href: SOCIAL_LINKS.github,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      ),
    },
    {
      label: "LinkedIn",
      href: SOCIAL_LINKS.linkedin,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      label: "Twitter / X",
      href: SOCIAL_LINKS.twitter,
      icon: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      ),
    },
  ]

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isDark ? "bg-dark-deep border-dark-border" : "bg-warm-sand border-warm-light-gray"
      }`}
      role="contentinfo"
    >
      <div className="max-w-300 mx-auto px-4 sm:px-6 lg:px-8">

        {/* Newsletter */}
        <div className={`py-8 border-b ${isDark ? "border-dark-border" : "border-warm-light-gray"}`}>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
            <div className="flex-1 text-center md:text-left">
              <h3 className={`text-lg font-bold mb-1.5 ${isDark ? "text-warm-light-gray" : "text-warm-charcoal"}`}>
                {isTh ? "รับข่าวสาร RCT Ecosystem" : "Stay Updated with RCT Ecosystem"}
              </h3>
              <p className={`text-sm leading-relaxed ${isTh ? "subtitle-th" : ""} ${isDark ? "text-warm-dim" : "text-warm-gray"}`}>
                {isTh
                  ? "สมัครรับข่าวสารเกี่ยวกับ AI innovations, product updates, และ technical insights จาก RCT Ecosystem"
                  : "Subscribe for AI innovations, product updates, and technical insights from RCT Ecosystem."}
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col w-full md:w-auto gap-2" noValidate>
              <div className="flex gap-2">
                <div className="flex-1 md:w-64">
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    onBlur={handleEmailBlur}
                    placeholder={isTh ? "กรอกอีเมลของคุณ" : "Enter your email"}
                    className={`w-full px-4 py-2.5 rounded-xl text-sm border transition-colors focus:outline-none focus:ring-2 ${
                      emailError
                        ? "border-red-400 focus:ring-red-400/30"
                        : isSuccess
                          ? "border-warm-sage focus:ring-warm-sage/30"
                          : "focus:ring-warm-sage/40"
                    } ${
                      isDark
                        ? "bg-dark-surface border-dark-border-subtle text-warm-light-gray placeholder:text-warm-subtle"
                        : "bg-white border-warm-light-gray text-warm-charcoal placeholder:text-warm-muted"
                    }`}
                    aria-label={isTh ? "อีเมลสำหรับสมัครรับข่าวสาร" : "Email for newsletter subscription"}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? "footer-email-error" : undefined}
                  />
                  {emailError && (
                    <p id="footer-email-error" className="text-xs text-red-500 mt-1 ml-1" role="alert">
                      {emailError}
                    </p>
                  )}
                  {isSuccess && (
                    <p className="text-xs text-warm-sage mt-1 ml-1 flex items-center gap-1" role="status">
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {isTh ? "สมัครสำเร็จ!" : "Subscribed!"}
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting || !!emailError}
                  className="px-5 py-2.5 rounded-xl bg-warm-sage text-white text-sm font-semibold hover:bg-warm-sage-hover transition-all duration-200 hover:scale-105 hover:-translate-y-0.5 active:scale-95 active:translate-y-0 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:translate-y-0 whitespace-nowrap"
                  style={{
                    transitionProperty: "background-color, transform, box-shadow",
                    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {isSubmitting ? (isTh ? "กำลังส่ง..." : "Sending...") : (isTh ? "สมัครรับ" : "Subscribe")}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="py-8">
          {/* Logo centered */}
          <div className="flex flex-col items-center mb-8 text-center">
            <Link href={lh("/")} className="inline-block">
              <Image
                src={LOGO_PNG}
                alt="RCT — Reverse Component Thinking"
                width={160}
                height={32}
                className={`h-8 w-40 object-contain ${isDark ? "brightness-0 invert" : ""}`}
              />
            </Link>
            <p className={`text-xs sm:text-sm leading-relaxed max-w-sm mt-2 text-center ${isTh ? "subtitle-th" : ""} ${
              isDark ? "text-warm-dim" : "text-warm-secondary"
            }`}>
              {t("footer.tagline")}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-2xs px-2 py-0.5 rounded-full font-medium ${
                isDark ? "bg-dark-sage-bg text-warm-sage" : "tag-sage"
              }`}>{SITE_VERSION}</span>
              <span className={`text-2xs px-2 py-0.5 rounded-full font-medium ${
                isDark ? "bg-dark-amber-bg text-warm-amber" : "tag-amber"
              }`}>
                {isTh ? "สแนปช็อตสถานะสาธารณะ" : "Public Status Snapshot"}
              </span>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center sm:text-left">
            {Object.entries(footerLinks).map(([title, links]) => (
              <nav key={title} aria-label={title}>
                <h4 className={`text-xs font-semibold uppercase tracking-wider mb-2.5 ${
                  isDark ? "text-warm-subdued" : "text-warm-charcoal"
                }`}>
                  {title}
                </h4>
                <ul className="space-y-1.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      {"external" in link && link.external ? (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-xs sm:text-sm transition-colors ${
                            isDark ? "text-[#777] hover:text-[#DDD]" : "text-warm-secondary hover:text-warm-charcoal"
                          }`}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link
                          href={lh(link.href)}
                          className={`text-xs sm:text-sm transition-colors ${
                            isDark ? "text-[#777] hover:text-[#DDD]" : "text-warm-secondary hover:text-warm-charcoal"
                          }`}
                        >
                          {link.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className={`py-4 border-t flex flex-col items-center gap-3 ${
          isDark ? "border-dark-border" : "border-warm-light-gray"
        }`}>
          <div className="flex items-center gap-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-8 h-8 rounded-lg border flex items-center justify-center transition-all duration-200 ${
                  isDark
                    ? "bg-[#222] border-[#333] text-[#777] hover:text-[#DDD] hover:border-warm-amber/40"
                    : "bg-white border-warm-light-gray text-warm-gray hover:text-warm-charcoal hover:border-warm-amber/40 hover:shadow-sm"
                }`}
                aria-label={link.label}
              >
                {link.icon}
              </a>
            ))}
          </div>
          <p className={`text-[11px] text-center ${isDark ? "text-[#555]" : "text-warm-secondary"}`}>
            &copy; {new Date().getFullYear()} RCT Ecosystem — Reverse Component Thinking.{" "}
            {t("footer.rights")}
          </p>
        </div>
      </div>
    </footer>
  )
}
