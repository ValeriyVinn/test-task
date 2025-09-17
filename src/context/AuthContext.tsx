"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchMe, loginUser, registerUser, logoutUser } from "../lib/api";

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  // Перевірка авторизації при завантаженні
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const me = await fetchMe();
        setUser(me);
      } catch {
        setUser(null);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    await loginUser(email, password);
    const me = await fetchMe();
    setUser(me);
    router.push("/dashboard");
  };

  const register = async (name: string, email: string, password: string) => {
    await registerUser(name, email, password);
    const me = await fetchMe();
    setUser(me);
    router.push("/dashboard");
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
