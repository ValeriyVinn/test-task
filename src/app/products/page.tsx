'use client';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProducts } from '../../lib/api';

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
    <div>
      <h2>Products</h2>
      {products.map((p) => (
        <div key={p._id}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>
          <strong>${p.price}</strong>
        </div>
      ))}
    </div>
  );
}
