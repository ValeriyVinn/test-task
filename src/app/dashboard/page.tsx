// "use client";

// import { useCallback, useEffect, useState } from "react";
// import { useAuth } from "../../context/AuthContext";
// import { getProducts, createProduct } from "../../lib/api";

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   description: string;
// }

// export default function DashboardPage() {
//   const { user, token, logout } = useAuth();
//   const [products, setProducts] = useState<Product[]>([]);
//   const [name, setName] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchProducts = useCallback(async () => {
//     try {
//       if (token) {
//         const data = await getProducts(token);
//         setProducts(data);
//       }
//     } catch {
//       setError("Не вдалося завантажити продукти");
//     }
//   }, [token]);

//   const handleAddProduct = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!token) return;

//     try {
//       setLoading(true);
//       await createProduct(token, name, parseFloat(price), description);
//       setName("");
//       setPrice("");
//       setDescription("");
//       await fetchProducts();
//     } catch {
//       setError("Не вдалося додати продукт");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   if (!user) return <p>Loading...</p>;

//   return (
//     <div className="flex min-h-screen bg-gray-100">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
//         <h2 className="text-xl font-bold mb-6">Dashboard</h2>
//         <nav className="flex flex-col gap-2">
//           <button className="text-left px-3 py-2 rounded hover:bg-gray-200">
//             Товари
//           </button>
//           <button className="text-left px-3 py-2 rounded hover:bg-gray-200">
//             Профіль
//           </button>
//         </nav>
//         <div className="mt-auto">
//           <button
//             onClick={logout}
//             className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       {/* Main content */}
//       <main className="flex-1 p-6">
//         <h1 className="text-2xl font-bold mb-4">Welcome {user.name}</h1>

//         {/* Add product form */}
//         <div className="bg-white p-4 rounded-lg shadow mb-6">
//           <h2 className="text-lg font-semibold mb-3">Додати продукт</h2>
//           <form onSubmit={handleAddProduct} className="flex flex-col gap-3">
//             <input
//               placeholder="Назва"
//               className="border rounded px-3 py-2"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <input
//               placeholder="Ціна"
//               type="number"
//               className="border rounded px-3 py-2"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//             />
//             <input
//               placeholder="Опис"
//               className="border rounded px-3 py-2"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50"
//             >
//               {loading ? "Додаємо..." : "Додати"}
//             </button>
//           </form>
//         </div>

//         {/* Products list */}
//         <div className="bg-white p-4 rounded-lg shadow">
//           <h2 className="text-lg font-semibold mb-3">Список продуктів</h2>
//           {error && <p className="text-red-500">{error}</p>}
//           <ul className="space-y-2">
//             {products.map((p) => (
//               <li key={p._id} className="border-b pb-2">
//                 <span className="font-bold">{p.name}</span> — ${p.price}
//                 <div className="text-sm text-gray-600">{p.description}</div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </main>
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

  // новий стан для активної секції
  const [activeSection, setActiveSection] = useState<"add" | "products" | "profile">("add");

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
    if (activeSection === "products") {
      fetchProducts();
    }
  }, [activeSection, fetchProducts]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-5 flex flex-col">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="flex flex-col gap-2">
          <button
            onClick={() => setActiveSection("add")}
            className={`text-left px-3 py-2 rounded hover:bg-gray-200 ${activeSection === "add" ? "bg-gray-200 font-semibold" : ""}`}
          >
            Додати продукт
          </button>
          <button
            onClick={() => setActiveSection("products")}
            className={`text-left px-3 py-2 rounded hover:bg-gray-200 ${activeSection === "products" ? "bg-gray-200 font-semibold" : ""}`}
          >
            Товари
          </button>
          <button
            onClick={() => setActiveSection("profile")}
            className={`text-left px-3 py-2 rounded hover:bg-gray-200 ${activeSection === "profile" ? "bg-gray-200 font-semibold" : ""}`}
          >
            Профіль
          </button>
        </nav>
        <div className="mt-auto">
          <button
            onClick={() => {
              logout();
              window.location.href = "/"; // ← після logout перенаправляє на головну
            }}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6">
        {activeSection === "add" && (
          <>
            <h1 className="text-2xl font-bold mb-4">Welcome {user.name}</h1>
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
          </>
        )}

        {activeSection === "products" && (
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
        )}

        {activeSection === "profile" && (
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-3">Профіль</h2>
            <p><strong>Ім’я:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
          </div>
        )}
      </main>
    </div>
  );
}
