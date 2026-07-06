import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  Menu,
  X,
  GraduationCap,
  LayoutDashboard,
  UserCircle,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    logout();
    navigate("/");
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto">

        <div className="flex items-center justify-between px-6 py-4">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white shadow-lg">
              <GraduationCap size={22} />
            </div>

            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                TutoriaPay
              </h1>

              <p className="text-xs text-slate-500">
                Learn • Pay • Grow
              </p>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">

            {!user ? (
              <>
                <HashLink
                  smooth
                  to="/#hero"
                  className="font-medium text-slate-600 transition hover:text-emerald-600"
                >
                  Home
                </HashLink>

                <Link
                  to="/courses"
                  className="font-medium text-slate-600 transition hover:text-emerald-600"
                >
                  Courses
                </Link>

                <HashLink
                  smooth
                  to="/#features"
                  className="font-medium text-slate-600 transition hover:text-emerald-600"
                >
                  Features
                </HashLink>

                <HashLink
                  smooth
                  to="/#cta"
                  className="font-medium text-slate-600 transition hover:text-emerald-600"
                >
                  About
                </HashLink>

                <Link
                  to="/login"
                  className="rounded-xl px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Student
                </Link>

                <Link
                  to="/admin/login"
                  className="rounded-xl px-5 py-2 font-medium text-slate-700 transition hover:bg-slate-100"
                >
                  Admin
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-600"
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="font-medium text-slate-600 transition hover:text-emerald-600"
                >
                  Home
                </Link>

                <Link
                  to="/courses"
                  className="font-medium text-slate-600 transition hover:text-emerald-600"
                >
                  Courses
                </Link>

                <Link
                  to="/payment"
                  className="font-medium text-slate-600 transition hover:text-emerald-600"
                >
                  Payment
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 rounded-xl bg-red-50 px-5 py-2 font-medium text-red-600 transition hover:bg-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </>
            )}

          </nav>

          {/* Mobile Button */}
          <button
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="border-t bg-white md:hidden">

            <div className="flex flex-col gap-2 p-6">

              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 hover:bg-slate-100"
              >
                Home
              </Link>

              <Link
                to="/courses"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-4 py-3 hover:bg-slate-100"
              >
                Courses
              </Link>

              {!user && (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 hover:bg-slate-100"
                  >
                    Student Login
                  </Link>

                  <Link
                    to="/admin/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 hover:bg-slate-100"
                  >
                    Admin Login
                  </Link>

                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl bg-emerald-500 py-3 text-center font-semibold text-white"
                  >
                    Register
                  </Link>
                </>
              )}

              {user && (
                <>
                  <Link
                    to="/"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 hover:bg-slate-100"
                  >
                    Home
                  </Link>

                  <Link
                    to="/courses"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 hover:bg-slate-100"
                  >
                    Courses
                  </Link>

                  <Link
                    to="/payment"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 hover:bg-slate-100"
                  >
                    Payment
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-xl bg-red-50 py-3 font-semibold text-red-600"
                  >
                    Logout
                  </button>
                </>
              )}

            </div>

          </div>
        )}

      </div>
    </header>
  );
}