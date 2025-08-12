'use client';

// import { useTranslation } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../../lib/i18n';

export function I18nProvider({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: string;
}) {
  i18n.changeLanguage(locale);
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
