"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { getProducts } from "../../../lib/api";

type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
};

export default function ProductsPage() {
  const { token } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (token) {
      getProducts(token).then(setProducts).catch(console.error);
    }
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Products</h2>
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
