import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Courses from "./pages/Courses";
import Dashboard from "./pages/Dashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Future Pages
// import Payment from "./pages/Payment";
// import PaymentHistory from "./pages/PaymentHistory";
// import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">

      {/* Global Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>

        <Routes>

          {/* Public */}

          <Route
            path="/"
            element={<Home />}
          />

          <Route
            path="/courses"
            element={<Courses />}
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/register"
            element={<Register />}
          />

          <Route
            path="/admin/login"
            element={<AdminLogin />}
          />

          {/* Student */}

          {/* <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="student">
                <Dashboard />
              </ProtectedRoute>
            }
          /> */}

          {/* Admin */}

          {/* <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          /> */}

          {/* Unprotected Student and admin route */}
          <Route 
            path="/dashboard" 
            element={<Dashboard />} 
          />
          <Route 
            path="/admin/dashboard" 
            element={<AdminDashboard />} 
          />

          {/* Future Routes */}

          {/*
          <Route
            path="/payment"
            element={
              <ProtectedRoute role="student">
                <Payment />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payments"
            element={
              <ProtectedRoute role="student">
                <PaymentHistory />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute role="student">
                <Profile />
              </ProtectedRoute>
            }
          />
          */}

          {/* 404 */}

          {/*
          <Route
            path="*"
            element={<NotFound />}
          />
          */}

        </Routes>

      </main>

    </div>
  );
}