import React from 'react';
import './globals.css';
import { AuthProvider } from '../../context/AuthContext';
import { dir } from 'i18next';
import { languages } from '../../../lib/settings';
import { I18nProvider } from './i18n-provider';

export async function generateStaticParams() {
  return languages.map((lng) => ({ locale: lng }));
}

export default function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  const { locale } = params;
  return (
    <html lang={locale} dir={dir(locale)}>
      <body>
        <AuthProvider>
          <I18nProvider locale={locale}>
            {children}
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
