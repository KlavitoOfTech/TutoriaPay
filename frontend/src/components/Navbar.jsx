import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-xl font-bold text-brand-600">
          LearnPay
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link to="/courses" className="text-gray-600 hover:text-brand-600">
            Courses
          </Link>
          {!user && (
            <>
              <Link to="/login" className="text-gray-600 hover:text-brand-600">
                Student Login
              </Link>
              <Link to="/admin/login" className="text-gray-600 hover:text-brand-600">
                Admin Login
              </Link>
              <Link
                to="/register"
                className="bg-brand-500 text-white px-3 py-1.5 rounded-md hover:bg-brand-600"
              >
                Register
              </Link>
            </>
          )}
          {user && user.role === "student" && (
            <Link to="/dashboard" className="text-gray-600 hover:text-brand-600">
              Dashboard
            </Link>
          )}
          {user && user.role === "admin" && (
            <Link to="/admin/dashboard" className="text-gray-600 hover:text-brand-600">
              Admin Dashboard
            </Link>
          )}
          {user && (
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-red-600 border border-gray-300 rounded-md px-3 py-1.5"
            >
              Logout ({user.full_name?.split(" ")[0] || user.email})
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
