export const fallbackLocale = 'es'
export const locales = ['es', 'en'] as const
export type Locale = (typeof locales)[number]
export const defaultNS = 'translation'
export const localeHeaderName = 'x-locale'
