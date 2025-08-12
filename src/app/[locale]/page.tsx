
'use client';
import React from 'react';
import Link from "next/link";
import Header from "../../components/Header";
import { useTranslation } from "react-i18next";

export default function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = React.use(params);
  const { t } = useTranslation('common');

  return (
    <main className="min-h-screen flex flex-col items-center p-6">
      <Header />

      <div className="mt-10 text-center">
        <h1 className="text-4xl font-bold mb-4">{t('welcome')}</h1>

        <div className="mt-6 space-x-4">
          <Link
            href={`/${locale}/login`}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {t('login')}
          </Link>
          <Link
            href={`/${locale}/register`}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {t('register')}
          </Link>
        </div>
      </div>
    </main>
  );
}

