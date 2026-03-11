"use client"

import { usePathname, useRouter } from "next/navigation"
import { Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Locale, getLocaleFromPathname, addLocaleToPathname, removeLocaleFromPathname } from "@/lib/i18n"

export function LanguageSwitcher() {
  const pathname = usePathname()
  const router = useRouter()
  
  const currentLocale = getLocaleFromPathname(pathname) || 'en'

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === currentLocale) return
    
    const cleanPath = removeLocaleFromPathname(pathname)
    const newPath = addLocaleToPathname(cleanPath, newLocale)
    
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
