
'use client';

import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const { user, logout } = useAuth();

  return (
    <main style={{ padding: 32 }}>
      <h1>Вітаємо у додатку!</h1>
      {user ? (
        <>
          <p>Ви увійшли як: <b>{user.name || user.email}</b></p>
          <button onClick={logout}>Вийти</button>
        </>
      ) : (
        <>
          <p>Ви не авторизовані.</p>
          <a href="/login">Увійти</a> | <a href="/register">Зареєструватися</a>
        </>
      )}
    </main>
  );
}
