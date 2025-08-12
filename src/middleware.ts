
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['uk', 'en'];
const DEFAULT_LOCALE = 'uk';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Якщо URL вже містить локаль — пропускаємо
  if (SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }

  // Отримуємо мову браузера
  const langHeader = req.headers.get('accept-language');
  const browserLang = langHeader?.split(',')[0].split('-')[0].toLowerCase();

  const locale = SUPPORTED_LOCALES.includes(browserLang!)
    ? browserLang
    : DEFAULT_LOCALE;

  // Редірект
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)']
};
