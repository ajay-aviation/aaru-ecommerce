"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const USER_KEY = "aaru_user_v1";
const ORDERS_KEY = "aaru_orders_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch (e) {
      // ignore
    }
    setLoaded(true);
  }, []);

  function login(name, email) {
    const u = { name, email };
    setUser(u);
    try {
      localStorage.setItem(USER_KEY, JSON.stringify(u));
    } catch (e) {
      // ignore
    }
    return u;
  }

  function logout() {
    setUser(null);
    try {
      localStorage.removeItem(USER_KEY);
    } catch (e) {
      // ignore
    }
  }

  function saveOrder(order) {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.unshift(order);
      localStorage.setItem(ORDERS_KEY, JSON.stringify(list));
    } catch (e) {
      // ignore
    }
  }

  function getOrders() {
    try {
      const raw = localStorage.getItem(ORDERS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  return (
    <AuthContext.Provider value={{ user, loaded, login, logout, saveOrder, getOrders }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
