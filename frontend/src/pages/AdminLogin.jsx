import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  LayoutDashboard,
  GraduationCap,
} from "lucide-react";
import { handleSignIn } from "../context/auth.js";

export default function AdminLogin() {
  //const { loginAdmin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      //await loginAdmin(form.email, form.password);
      const { error, data } = await handleSignIn(form); // Call the Supabase sign-in function
      if (error) return console.error(error); // Handle any errors from Supabase
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10">

        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div className="hidden lg:block text-white">

            <span className="rounded-full bg-white/10 px-4 py-2 text-sm">
              Administrator Portal
            </span>

            <h1 className="mt-8 text-6xl font-extrabold leading-tight">
              Manage
              <span className="text-emerald-400"> TutoriaPay</span>
            </h1>

            <p className="mt-6 text-lg text-slate-300 leading-8">
              Monitor students, courses, tuition payments,
              virtual accounts and platform activity from
              one centralized dashboard.
            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5">

                <div className="rounded-xl bg-emerald-500 p-3">

                  <LayoutDashboard />

                </div>

                <div>

                  <h3 className="font-bold">
                    Admin Dashboard
                  </h3>

                  <p className="text-slate-300 text-sm">
                    Real-time analytics and reports.
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-5">

                <div className="rounded-xl bg-blue-500 p-3">

                  <ShieldCheck />

                </div>

                <div>

                  <h3 className="font-bold">
                    Secure Access
                  </h3>

                  <p className="text-slate-300 text-sm">
                    Protected administrator authentication.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* LOGIN CARD */}

          <div>

            <div className="rounded-3xl bg-white p-8 shadow-2xl">

              <div className="text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-900 text-white">

                  <GraduationCap size={30} />

                </div>

                <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
                  Admin Login
                </h2>

                <p className="mt-2 text-slate-500">
                  Sign in to manage TutoriaPay
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
                    {error}
                  </div>
                )}

                <div>

                  <label className="mb-2 block font-medium">
                    Email
                  </label>

                  <div className="flex items-center rounded-xl border px-4">

                    <Mail
                      className="text-slate-400"
                      size={20}
                    />

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent px-3 py-4 outline-none"
                      placeholder="admin@school.edu"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block font-medium">
                    Password
                  </label>

                  <div className="flex items-center rounded-xl border px-4">

                    <Lock
                      className="text-slate-400"
                      size={20}
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent px-3 py-4 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                    >
                      {showPassword ? (
                        <EyeOff
                          className="text-slate-400"
                          size={20}
                        />
                      ) : (
                        <Eye
                          className="text-slate-400"
                          size={20}
                        />
                      )}
                    </button>

                  </div>

                </div>

                <button
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-4 font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50"
                >
                  {loading
                    ? "Signing In..."
                    : "Login"}

                  {!loading && (
                    <ArrowRight size={18} />
                  )}
                </button>

              </form>

              <div className="mt-8 text-center text-sm text-slate-600">

                Student?

                <Link
                  to="/login"
                  className="ml-2 font-semibold text-emerald-600"
                >
                  Student Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}