'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { getProducts } from '../../lib/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  description?: string;
}

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    const fetchProducts = async () => {
      try {
        const data = await getProducts(token);
        setProducts(data);
      } catch (error) {
        console.error('Помилка завантаження продуктів', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [token, router]);

  if (!user) return <p>Loading user...</p>;
  if (loading) return <p>Loading products...</p>;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={logout}>Logout</button>

      <h2>Products</h2>
      {products.length > 0 ? (
        <ul>
          {products.map((p) => (
            <li key={p._id}>
              {p.name} - ${p.price}
              {p.description && <p>{p.description}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}
