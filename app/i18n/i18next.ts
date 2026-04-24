import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'
import { fallbackLocale, defaultNS } from './settings'

export async function createI18nInstance(locale: string, ns = defaultNS) {
  const instance = createInstance()
  await instance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (lang: string, namespace: string) =>
          import(`./locales/${lang}/${namespace}.json`)
      )
    )
    .init({
      lng: locale,
      ns: [ns],
      defaultNS: ns,
      fallbackLng: fallbackLocale,
      preload: [locale]
    })
  return instance
}
