import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import acceptLanguage from 'accept-language'
import { locales, fallbackLocale, localeHeaderName } from './app/i18n/settings'

acceptLanguage.languages([...locales])

export const config = {
  matcher: ['/((?!_next|studio|favicon\\.ico|sitemap\\.xml|robots\\.txt).*)']
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  const pathnameLocale = locales.find(
    l => pathname.startsWith(`/${l}/`) || pathname === `/${l}`
  )

  if (pathnameLocale) {
    const response = NextResponse.next()
    response.headers.set(localeHeaderName, pathnameLocale)
    return response
  }

  const detected =
    acceptLanguage.get(request.headers.get('Accept-Language')) ?? fallbackLocale

  request.nextUrl.pathname = `/${detected}${pathname}`
  return NextResponse.redirect(request.nextUrl)
}
