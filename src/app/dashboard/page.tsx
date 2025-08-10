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


'use client';

import {useCallback, useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { getProducts, createProduct } from '../../lib/api';

interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
}

export default function DashboardPage() {
  const { user, token, logout } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const fetchProducts = useCallback(async () => {
  try {
    if (token) {
      const data = await getProducts(token);
      setProducts(data);
    }
  } catch {
    setError('Не вдалося завантажити продукти');
  }
}, [token]);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      setLoading(true);
      await createProduct(token, name, parseFloat(price), description);
      setName('');
      setPrice('');
      setDescription('');
      await fetchProducts();
    } catch {
      setError('Не вдалося додати продукт');
    } finally {
      setLoading(false);
    }
  };

useEffect(() => {
  fetchProducts();
}, [fetchProducts]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome {user.name}</h1>
      <button onClick={logout}>Logout</button>

      <h2>Додати продукт</h2>
      <form onSubmit={handleAddProduct}>
        <input
          placeholder="Назва"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Ціна"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Опис"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Додаємо...' : 'Додати'}
        </button>
      </form>

      <h2>Список продуктів</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.name} - ${p.price} <br /> {p.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
