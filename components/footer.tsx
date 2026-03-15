"use client"

import Link from "next/link"
import { Github, Twitter, Linkedin } from "lucide-react"
import { usePathname } from "next/navigation"
import { getLocaleFromPathname } from "@/lib/i18n"

export function Footer() {
  const currentYear = new Date().getFullYear()
  const pathname = usePathname()
  const locale = getLocaleFromPathname(pathname) || 'en'

  const t = {
    tagline: locale === 'th' 
      ? 'ระบบปฏิบัติการ AI แบบรัฐธรรมนูญสำหรับยุคปัญญาประดิษฐ์'
      : 'Constitutional AI Operating System for the Intelligence Age',
    copyright: locale === 'th'
      ? `© ${currentYear} RCT Labs สงวนลิขสิทธิ์`
      : `© ${currentYear} RCT Labs. All rights reserved.`,
    designedBy: locale === 'th' ? 'ออกแบบโดย The Architect' : 'Designed by The Architect',
    uptime: '99.98% Uptime SLA',
    version: 'v3.7.0',
    testsPassingLabel: locale === 'th' ? 'การทดสอบผ่าน' : 'tests passing',
  }

  return (
    <footer className="border-t border-border bg-card/50 mt-16 py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Company Info */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="text-lg font-bold text-foreground tracking-tight">RCT Labs</div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t.tagline}
            </p>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">{t.version}</span>
              <span className="text-xs font-mono text-emerald-400">4,076 {t.testsPassingLabel}</span>
            </div>
            <div className="flex gap-3 pt-2">
              <Link href="https://github.com/rctlabs" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
              </Link>
              <Link href="https://twitter.com/rctlabs" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-4 h-4" />
              </Link>
              <Link href="https://linkedin.com/company/rctlabs" className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noopener noreferrer">
                <Linkedin className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">{locale === 'th' ? 'แพลตฟอร์ม' : 'Platform'}</h4>
            <div className="space-y-2.5">
              <Link href={`/${locale}/platform`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'ภาพรวม' : 'Overview'}
              </Link>
              <Link href={`/${locale}/platform#signedai`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                SignedAI
              </Link>
              <Link href={`/${locale}/platform#rctdb`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                RCTDB
              </Link>
              <Link href={`/${locale}/platform#studio`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                Specialist Studio
              </Link>
              <Link href={`/${locale}/platform#infrastructure`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'โครงสร้างพื้นฐาน' : 'Infrastructure'}
              </Link>
              <Link href={`/${locale}/platform#regional`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'ภาษาท้องถิ่น' : 'Regional Language'}
              </Link>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">{locale === 'th' ? 'โซลูชัน' : 'Solutions'}</h4>
            <div className="space-y-2.5">
              <Link href={`/${locale}/solutions`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'องค์กร' : 'Enterprise'}
              </Link>
              <Link href={`/${locale}/solutions`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'นักพัฒนา' : 'Developers'}
              </Link>
              <Link href={`/${locale}/solutions`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                SMEs
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">{locale === 'th' ? 'ทรัพยากร' : 'Resources'}</h4>
            <div className="space-y-2.5">
              <Link href={`/${locale}/docs`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'เอกสาร' : 'Documentation'}
              </Link>
              <Link href={`/${locale}/research`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'งานวิจัย' : 'Research'}
              </Link>
              <Link href={`/${locale}/blog`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'บล็อก' : 'Blog'}
              </Link>
              <Link href={`/${locale}/about`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'เกี่ยวกับเรา' : 'About'}
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold mb-4 text-foreground">{locale === 'th' ? 'กฎหมาย' : 'Legal'}</h4>
            <div className="space-y-2.5">
              <Link href={`/${locale}/privacy`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'ความเป็นส่วนตัว' : 'Privacy'}
              </Link>
              <Link href={`/${locale}/terms`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'ข้อกำหนด' : 'Terms'}
              </Link>
              <Link href={`/${locale}/contact`} className="text-xs text-muted-foreground hover:text-foreground transition-colors block">
                {locale === 'th' ? 'ติดต่อเรา' : 'Contact'}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            {t.copyright}
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-muted-foreground font-mono">
              {t.designedBy}
            </p>
            <span className="text-xs text-muted-foreground">|</span>
            <p className="text-xs text-muted-foreground font-mono">
              {t.uptime}
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
