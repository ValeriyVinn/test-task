// 'use client';

// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { useAuth } from '../../context/AuthContext';
// import { getProducts } from '../../lib/api';

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   description?: string;
// }

// export default function DashboardPage() {
//   const { user, token, logout } = useAuth();
//   const router = useRouter();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!token) {
//       router.push('/login');
//       return;
//     }

//     const fetchProducts = async () => {
//       try {
//         const data = await getProducts(token);
//         setProducts(data);
//       } catch (error) {
//         console.error('Помилка завантаження продуктів', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [token, router]);

//   if (!user) return <p>Loading user...</p>;
//   if (loading) return <p>Loading products...</p>;

//   return (
//     <div>
//       <h1>Welcome {user.name}</h1>
//       <button onClick={logout}>Logout</button>

//       <h2>Products</h2>
//       {products.length > 0 ? (
//         <ul>
//           {products.map((p) => (
//             <li key={p._id}>
//               {p.name} - ${p.price}
//               {p.description && <p>{p.description}</p>}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No products found</p>
//       )}
//     </div>
//   );
// }

"use client";

import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getProducts, createProduct } from "../../lib/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      if (token) {
        const data = await getProducts(token);
        setProducts(data);
      }
    } catch {
      setError("Не вдалося завантажити продукти");
    }
  }, [token]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      await createProduct(token, name, parseFloat(price), description);
      setName("");
      setPrice("");
      setDescription("");
      await fetchProducts();
    } catch {
      setError("Не вдалося додати продукт");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <button className="text-left px-3 py-2 rounded hover:bg-gray-200">
            Товари
          </button>
          <button className="text-left px-3 py-2 rounded hover:bg-gray-200">
            Профіль
          </button>
        </nav>
        <div className="mt-auto">
          <button
            onClick={logout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome {user.name}</h1>

        {/* Add product form */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">Додати продукт</h2>
          <form onSubmit={handleAddProduct} className="flex flex-col gap-3">
            <input
              placeholder="Назва"
              className="border rounded px-3 py-2"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Ціна"
              type="number"
              className="border rounded px-3 py-2"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              placeholder="Опис"
              className="border rounded px-3 py-2"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? "Додаємо..." : "Додати"}
            </button>
          </form>
        </div>

        {/* Products list */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-3">Список продуктів</h2>
          {error && <p className="text-red-500">{error}</p>}
          <ul className="space-y-2">
            {products.map((p) => (
              <li key={p._id} className="border-b pb-2">
                <span className="font-bold">{p.name}</span> — ${p.price}
                <div className="text-sm text-gray-600">{p.description}</div>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}
