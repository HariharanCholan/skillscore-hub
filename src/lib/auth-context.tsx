import React, { createContext, useContext, useState, ReactNode } from "react";
import { User } from "./types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  register: (user: User, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("ers_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (email: string, _password: string): boolean => {
    // Demo: accept any @citchennai.net email with password length >= 6
    if (!email.endsWith("@citchennai.net") || _password.length < 6) return false;
    const savedUsers = JSON.parse(localStorage.getItem("ers_users") || "[]");
    const found = savedUsers.find((u: User) => u.email === email);
    if (found) {
      setUser(found);
      localStorage.setItem("ers_user", JSON.stringify(found));
      return true;
    }
    // Fallback demo user
    const demo: User = { name: email.split("@")[0], email, role: "staff", department: "Computer Science" };
    setUser(demo);
    localStorage.setItem("ers_user", JSON.stringify(demo));
    return true;
  };

  const register = (newUser: User, _password: string): boolean => {
    if (!newUser.email.endsWith("@citchennai.net") || _password.length < 6) return false;
    const savedUsers = JSON.parse(localStorage.getItem("ers_users") || "[]");
    savedUsers.push(newUser);
    localStorage.setItem("ers_users", JSON.stringify(savedUsers));
    setUser(newUser);
    localStorage.setItem("ers_user", JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("ers_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
