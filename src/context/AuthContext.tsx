// 'use client';

// import { createContext, useState, useContext, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { loginUser, registerUser } from '../lib/api';
// import { User } from '../types';

// interface AuthContextType {
//   user: User | null;
//   token: string | null;
//   login: (email: string, password: string) => Promise<void>;
//   register: (name: string, email: string, password: string) => Promise<void>;
//   logout: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [token, setToken] = useState<string | null>(null);
//   const router = useRouter();

// useEffect(() => {
//   const savedToken = localStorage.getItem('token');
//   const savedUser = localStorage.getItem('user');

//   if (savedToken) {
//     setToken(savedToken);
//   }

//   if (savedUser) {
//     try {
//       const parsedUser = JSON.parse(savedUser);
//       setUser(parsedUser);
//     } catch (err) {
//       console.error('Error parsing saved user:', err);
//       localStorage.removeItem('user'); // очищаємо зіпсовані дані
//     }
//   }
// }, []);


//   const login = async (email: string, password: string) => {
//     const data = await loginUser(email, password);
//     setToken(data.token);
//     setUser(data.user);
//     localStorage.setItem('token', data.token);
//     localStorage.setItem('user', JSON.stringify(data.user));
//     router.push('/dashboard');
//   };

//   const register = async (name: string, email: string, password: string) => {
//     const data = await registerUser(name, email, password);
//     setToken(data.token);
//     setUser(data.user);
//     localStorage.setItem('token', data.token);
//     localStorage.setItem('user', JSON.stringify(data.user));
//     router.push('/dashboard');
//   };

//   const logout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     router.push('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) throw new Error('useAuth must be used within AuthProvider');
//   return context;
// };


'use client';

import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, registerUser } from '../lib/api';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');

      if (savedToken && typeof savedToken === 'string') {
        setToken(savedToken);
      }

      if (savedUser && typeof savedUser === 'string') {
        try {
          const parsedUser = JSON.parse(savedUser);
          if (parsedUser && typeof parsedUser === 'object') {
            setUser(parsedUser);
          } else {
            throw new Error('Invalid user format');
          }
        } catch (err) {
          console.error('Error parsing saved user from localStorage:', err);
          localStorage.removeItem('user');
        }
      }
    } catch (err) {
      console.error('Error reading from localStorage:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, []);

  const login = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    if (!data?.token || !data?.user) {
      throw new Error('Invalid login response');
    }
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    router.push('/dashboard');
  };

  const register = async (name: string, email: string, password: string) => {
    const data = await registerUser(name, email, password);
    if (!data?.token || !data?.user) {
      throw new Error('Invalid register response');
    }
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    router.push('/dashboard');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
