'use client'

import i18next from 'i18next'
import { initReactI18next, useTranslation } from 'react-i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { fallbackLocale, locales, defaultNS, type Locale } from './settings'

const isServer = typeof window === 'undefined'

i18next
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (lang: string, ns: string) => import(`./locales/${lang}/${ns}.json`)
    )
  )
  .use(LanguageDetector)
  .init({
    supportedLngs: [...locales],
    fallbackLng: fallbackLocale,
    lng: isServer ? fallbackLocale : undefined,
    fallbackNS: defaultNS,
    defaultNS,
    detection: { order: ['path', 'htmlTag', 'cookie', 'navigator'] },
    preload: isServer ? [...locales] : []
  })

export function useT(ns = defaultNS) {
  const params = useParams()
  const locale = (params?.locale as Locale) ?? fallbackLocale
  const { t, i18n } = useTranslation(ns)

  // Sync language to URL locale on client
  useEffect(() => {
    if (i18n.resolvedLanguage !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return { t }
}
