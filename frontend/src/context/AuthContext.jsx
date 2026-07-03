import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/axios.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { id, email, role, full_name }
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("learnpay_user");
    if (stored) setUser(JSON.parse(stored));
    setLoading(false);
  }, []);

  function persistSession(token, userData) {
    localStorage.setItem("learnpay_token", token);
    localStorage.setItem("learnpay_user", JSON.stringify(userData));
    setUser(userData);
  }

  async function registerStudent(payload) {
    const { data } = await api.post("/auth/student/register", payload);
    const userData = { ...data.student, role: "student" };
    persistSession(data.token, userData);
    return userData;
  }

  async function loginStudent(email, password) {
    const { data } = await api.post("/auth/student/login", { email, password });
    const userData = { ...data.student, role: "student" };
    persistSession(data.token, userData);
    return userData;
  }

  async function loginAdmin(email, password) {
    const { data } = await api.post("/auth/admin/login", { email, password });
    const userData = { ...data.admin, role: "admin" };
    persistSession(data.token, userData);
    return userData;
  }

  function logout() {
    localStorage.removeItem("learnpay_token");
    localStorage.removeItem("learnpay_user");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, loading, loginStudent, loginAdmin, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
