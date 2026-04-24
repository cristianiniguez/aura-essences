'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'
import { locales, type Locale } from '@/app/i18n/settings'

export function LocaleSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const params = useParams()
  const currentLocale = (params?.locale as Locale) ?? 'es'

  function switchLocale(newLocale: Locale) {
    const newPath = pathname.replace(/^\/(en|es)/, `/${newLocale}`)
    router.push(newPath)
  }

  return (
    <div className='flex items-center gap-1'>
      {locales.map(locale => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className={`text-xs font-medium px-2 py-1 rounded transition-colors uppercase ${
            locale === currentLocale
              ? 'bg-foreground text-background'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {locale}
        </button>
      ))}
    </div>
  )
}
