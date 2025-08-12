// src/components/Header.tsx
// import Link from 'next/link';

// export default function Header() {
//   return (
//     <header className="w-full flex justify-between items-center p-4 bg-gray-100 shadow">
//       <Link href="/" className="text-2xl font-bold text-gray-800">
//         Тестове завдання
//       </Link>
//       <nav className="space-x-4">
//         <Link href="/login" className="text-blue-600 hover:underline">
//           Login
//         </Link>
//         <Link href="/register" className="text-green-600 hover:underline">
//           Register
//         </Link>
//       </nav>
//     </header>
//   );
// }

'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import { languages } from '../../lib/settings';

export default function Header() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (lng: string) => {
    const segments = pathname.split('/');
    segments[1] = lng; // замінюємо локаль в URL
    const newPath = segments.join('/');
    i18n.changeLanguage(lng);
    router.push(newPath);
  };

  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-100 shadow">
      <Link href={`/${i18n.language}`} className="text-2xl font-bold text-gray-800">
        Тестове завдання
      </Link>

      <nav className="space-x-4">
        {languages.map((lng) => (
          <button
            key={lng}
            onClick={() => handleLanguageChange(lng)}
            className={`px-3 py-1 rounded ${
              i18n.language === lng ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border'
            }`}
          >
            {lng.toUpperCase()}
          </button>
        ))}
      </nav>
    </header>
  );
}