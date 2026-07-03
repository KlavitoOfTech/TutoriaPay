import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useAuth } from "../context/AuthContext.jsx";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { handleSignIn } from "../context/auth.js";


export default function Login() {
  //const { loginStudent } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      //await loginStudent(form.email, form.password);
      const { error, data } = await handleSignIn(form.email, form.password); // Call the Supabase sign-in function
      if (error) return console.error(error); // Handle any errors from Supabase
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">

      <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-10">

        <div className="grid w-full items-center gap-16 lg:grid-cols-2">

          {/* LEFT */}

          <div className="hidden lg:block">

            <span className="inline-flex items-center rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
              Student Portal
            </span>

            <h1 className="mt-8 text-6xl font-extrabold leading-tight text-slate-900">
              Welcome
              <span className="text-emerald-600"> Back.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Access your courses, pay tuition securely, manage your virtual
              account and track payment history from one dashboard.
            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg">

                <div className="rounded-xl bg-emerald-100 p-3">
                  <ShieldCheck className="text-emerald-600" />
                </div>

                <div>

                  <h3 className="font-bold">
                    Secure Login
                  </h3>

                  <p className="text-sm text-slate-600">
                    Protected student authentication.
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg">

                <div className="rounded-xl bg-blue-100 p-3">
                  <GraduationCap className="text-blue-600" />
                </div>

                <div>

                  <h3 className="font-bold">
                    Continue Learning
                  </h3>

                  <p className="text-sm text-slate-600">
                    Resume your enrolled courses instantly.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <div className="rounded-3xl bg-white p-8 shadow-2xl">

              <div className="text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500 text-white">

                  <GraduationCap size={30} />

                </div>

                <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
                  Student Login
                </h2>

                <p className="mt-2 text-slate-500">
                  Sign in to continue to TutoriaPay
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-6"
              >

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div>

                  <label className="mb-2 block font-medium text-slate-700">
                    Email Address
                  </label>

                  <div className="flex items-center rounded-xl border bg-white px-4">

                    <Mail className="text-slate-400" size={20} />

                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      placeholder="student@email.com"
                      className="w-full bg-transparent px-3 py-4 outline-none"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block font-medium text-slate-700">
                    Password
                  </label>

                  <div className="flex items-center rounded-xl border bg-white px-4">

                    <Lock className="text-slate-400" size={20} />

                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={form.password}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password: e.target.value,
                        })
                      }
                      placeholder="••••••••"
                      className="w-full bg-transparent px-3 py-4 outline-none"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="text-slate-400" size={20} />
                      ) : (
                        <Eye className="text-slate-400" size={20} />
                      )}
                    </button>

                  </div>

                </div>

                <div className="flex items-center justify-between">

                  <label className="flex items-center gap-2 text-sm text-slate-600">

                    <input type="checkbox" />

                    Remember me

                  </label>

                  <button
                    type="button"
                    className="text-sm font-semibold text-emerald-600"
                  >
                    Forgot Password?
                  </button>

                </div>

                <button
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
                >
                  {loading ? "Signing In..." : "Login"}

                  {!loading && <ArrowRight size={20} />}

                </button>

              </form>

              <div className="mt-8 text-center text-sm text-slate-600">

                Don't have an account?

                <Link
                  to="/register"
                  className="ml-2 font-semibold text-emerald-600"
                >
                  Create Account
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}