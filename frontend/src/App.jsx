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
import Payment from "./pages/Payment";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

// Future Pages
import PaymentHistory from "./pages/PaymentHistory";
import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* Global Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Routes>
          {/* ================= PUBLIC ROUTES ================= */}

          <Route path="/" element={<Home />} />

          <Route path="/courses" element={<Courses />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ================= STUDENT ROUTES ================= */}

          <Route
            path="/dashboard"
            element={
                <Dashboard />
            }
          />

          <Route
            path="/payment"
            element={
              <Payment />
            }
          />

          {/* ================= ADMIN ROUTES ================= */}

          <Route
            path="/admin/dashboard"
            element={
                <AdminDashboard />
            }
          />

          {/* ================= FUTURE ROUTES ================= */}

          
          <Route
            path="/payments"
            element={
                <PaymentHistory />
            }
          />

          <Route
            path="/profile"
            element={
                <Profile />
            }
          />

          {/* <Route
            path="*"
            element={<NotFound />}
          /> */}
         
        </Routes>
      </main>
    </div>
  );
}