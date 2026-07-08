import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios.js";
// import { useAuth } from "../context/AuthContext.jsx";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  CheckCircle,
  ArrowRight,
} from "lucide-react";
import { handleSignUp, handleSignOut } from "../context/auth.js";

export default function Register() {
  //const { registerStudent } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      //await registerStudent(form);
      const {error, data} = await handleSignUp(form); // Call the Supabase sign-up function
      if (error) return console.error(error); // Handle any errors from Supabase

      //const response = await api.post('/auth/student/register', form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message);
      console.error(err);
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
              Create Your Student Account
            </span>

            <h1 className="mt-8 text-6xl font-extrabold leading-tight text-slate-900">
              Start Learning
              <span className="text-emerald-600"> Today.</span>
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Join TutoriaPay to enroll in courses, pay tuition securely,
              receive a virtual account and manage your learning journey
              from one dashboard.
            </p>

            <div className="mt-12 space-y-5">

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg">

                <div className="rounded-xl bg-emerald-100 p-3">
                  <CheckCircle className="text-emerald-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Easy Registration
                  </h3>

                  <p className="text-sm text-slate-600">
                    Create your account in less than one minute.
                  </p>
                </div>

              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-lg">

                <div className="rounded-xl bg-blue-100 p-3">
                  <GraduationCap className="text-blue-600" />
                </div>

                <div>
                  <h3 className="font-bold text-slate-800">
                    Access Courses
                  </h3>

                  <p className="text-sm text-slate-600">
                    Learn from trusted institutions with secure payments.
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
                  Student Registration
                </h2>

                <p className="mt-2 text-slate-500">
                  Create your TutoriaPay account
                </p>

              </div>

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
                    {error}
                  </div>
                )}

                <div>

                  <label className="mb-2 block font-medium text-slate-700">
                    Full Name
                  </label>

                  <div className="flex items-center rounded-xl border px-4">

                    <User className="text-slate-400" size={20} />

                    <input
                      name="full_name"
                      value={form.full_name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className="w-full bg-transparent px-3 py-4 outline-none"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block font-medium text-slate-700">
                    Email Address
                  </label>

                  <div className="flex items-center rounded-xl border px-4">

                    <Mail className="text-slate-400" size={20} />

                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                      className="w-full bg-transparent px-3 py-4 outline-none"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block font-medium text-slate-700">
                    Phone Number
                  </label>

                  <div className="flex items-center rounded-xl border px-4">

                    <Phone className="text-slate-400" size={20} />

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+234..."
                      className="w-full bg-transparent px-3 py-4 outline-none"
                    />

                  </div>

                </div>

                <div>

                  <label className="mb-2 block font-medium text-slate-700">
                    Password
                  </label>

                  <div className="flex items-center rounded-xl border px-4">

                    <Lock className="text-slate-400" size={20} />

                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={form.password}
                      onChange={handleChange}
                      required
                      placeholder="Create a strong password"
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

                <button
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-semibold text-white transition hover:bg-emerald-600 disabled:opacity-50"
                >
                  {loading ? "Creating Account..." : "Create Account"}

                  {!loading && <ArrowRight size={20} />}
                </button>

              </form>

              <div className="mt-8 text-center text-sm text-slate-600">

                Already have an account?

                <Link
                  to="/login"
                  className="ml-2 font-semibold text-emerald-600"
                >
                  Login
                </Link>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}