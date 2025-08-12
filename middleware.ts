import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LOCALES = ['uk', 'en'];
const DEFAULT_LOCALE = 'uk';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Якщо вже є локаль в URL — нічого не робимо
  if (SUPPORTED_LOCALES.some((locale) => pathname.startsWith(`/${locale}`))) {
    return NextResponse.next();
  }

  // Визначаємо мову з заголовка браузера
  const acceptLang = req.headers.get('accept-language') || '';
  const preferred = acceptLang
    .split(',')[0]
    .split('-')[0]
    .toLowerCase();

  const locale = SUPPORTED_LOCALES.includes(preferred)
    ? preferred
    : DEFAULT_LOCALE;

  // Редірект на вибрану мову
  return NextResponse.redirect(new URL(`/${locale}${pathname}`, req.url));
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'], // щоб не чіпати статику і Next.js внутрішні файли
};
