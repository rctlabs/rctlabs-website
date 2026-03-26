"use client"

import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Locale, addLocaleToPathname, resolveLocale } from "@/lib/i18n"

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  const { language } = useLanguage()

  const currentLocale = resolveLocale(pathname, language)

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return

    const newPath = addLocaleToPathname(pathname || "/", newLocale)

    router.push(newPath)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="w-4 h-4" />
          <span className="uppercase text-xs">{currentLocale}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => switchLocale("en")}
          className={currentLocale === 'en' ? 'bg-accent/10' : ''}
        >
          <span className="mr-2">🇬🇧</span>
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => switchLocale("th")}
          className={currentLocale === 'th' ? 'bg-accent/10' : ''}
        >
          <span className="mr-2">🇹🇭</span>
          ไทย
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
