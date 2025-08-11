import Link from "next/link";
import Header from "../components/Header";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center  p-6">
      <Header />

      <div className="mt-10 text-center">
        <h1 className="text-4xl font-bold mb-4">Ласкаво просимо!</h1>

        <div className="mt-6 space-x-4">
          <Link
            href="/login"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}
