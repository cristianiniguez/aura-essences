import { headers } from 'next/headers'
import { fallbackLocale, localeHeaderName, defaultNS } from './settings'
import { createI18nInstance } from './i18next'

export async function getT(ns = defaultNS) {
  const h = await headers()
  const locale = h.get(localeHeaderName) ?? fallbackLocale
  const instance = await createI18nInstance(locale, ns)
  return { t: instance.getFixedT(locale, Array.isArray(ns) ? ns[0] : ns), locale }
}
