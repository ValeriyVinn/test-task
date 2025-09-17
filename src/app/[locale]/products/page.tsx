"use client";
import { useEffect, useState } from "react";


type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export default function ProductsPage() {
 
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/products", {
      method: "GET",
      credentials: "include", // 👈 автоматично додає HttpOnly cookie
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Failed to fetch products");
        }
        return res.json();
      })
      .then((data) => setProducts(data))
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Products</h2>

      {error && <p className="text-red-500">{error}</p>}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600">{p.description}</p>
            <strong className="text-blue-600">${p.price}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}
