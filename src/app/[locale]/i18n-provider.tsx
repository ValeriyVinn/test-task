'use client';

import { I18nextProvider } from 'react-i18next';
import { useEffect } from 'react';
import i18n from '../../../lib/i18n';

export function I18nProvider({
  children,
  locale
}: {
  children: React.ReactNode;
  locale: string;
}) {
  useEffect(() => {
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale);
    }
  }, [locale]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
