// src/components/Header.tsx
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full flex justify-between items-center p-4 bg-gray-100 shadow">
      <Link href="/" className="text-2xl font-bold text-gray-800">
        Тестове завдання
      </Link>
      <nav className="space-x-4">
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
        <Link href="/register" className="text-green-600 hover:underline">
          Register
        </Link>
      </nav>
    </header>
  );
}
