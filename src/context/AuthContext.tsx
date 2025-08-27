import React, { createContext, useState, useEffect, ReactNode } from 'react';

type User = {
  id: string;
  name: string;
  isModel: boolean;
  avatar?: string;
  bio?: string;
  instagram?: string;
  posts?: number;
  media?: number;
  online?: boolean;
  subscribedModels?: string[];
};

type AuthContextType = {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: Partial<User> & { email: string; password: string }) => Promise<boolean>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('bunny_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = async (email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('bunny_users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('bunny_user', JSON.stringify(found));
      return true;
    }
    return false;
  };

  const register = async (data: any) => {
    const users = JSON.parse(localStorage.getItem('bunny_users') || '[]');
    if (users.find((u: any) => u.email === data.email)) return false;
    const newUser = { ...data, id: Date.now().toString(), posts: 0, media: 0, online: true, subscribedModels: [] };
    users.push(newUser);
    localStorage.setItem('bunny_users', JSON.stringify(users));
    setUser(newUser);
    localStorage.setItem('bunny_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('bunny_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem('bunny_user', JSON.stringify(updated));
    // update in users list
    const users = JSON.parse(localStorage.getItem('bunny_users') || '[]');
    const idx = users.findIndex((u: any) => u.id === user.id);
    if (idx !== -1) {
      users[idx] = updated;
      localStorage.setItem('bunny_users', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};