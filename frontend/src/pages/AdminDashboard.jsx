import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("courses");
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [payments, setPayments] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", price: "", duration_weeks: "" });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);
    try {
      const res = await api.get('/admin/login');
      refreshAll();
    } catch (error) {
      console.error("Error loading dashboard:", error.response?.data?.message || error.message);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  }
  
  function refreshAll() {
    api.get("/courses").then((r) => setCourses(r.data));
    api.get("/students").then((r) => setStudents(r.data));
    // api.get("/enrollments").then((r) => setEnrollments(r.data));
    // api.get("/payments").then((r) => setPayments(r.data));
  }

  async function handleCreateCourse(e) {
    e.preventDefault();
    setMessage("");
    try {
      const response = await api.post('/courses', 
        { ...form, 
          price: Number(form.price), 
          duration_weeks: form.duration_weeks ? Number(form.duration_weeks) : null 
        });
      setForm({ title: "", description: "", price: "", duration_weeks: "" });
      setMessage("Course created.");
      refreshAll();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to create course");
      console.error(err);
    }
  }

  async function confirmPayment(id) {
    await api.patch(`/payments/${id}/confirm`);
    refreshAll();
  }

  async function toggleStudentStatus(student) {
    const next = student.status === "active" ? "suspended" : "active";
    await api.patch(`/students/${student.id}/status`, { status: next });
    refreshAll();
  }

  const tabs = [
    { id: "courses", label: "Courses" },
    { id: "students", label: "Students" },
    { id: "enrollments", label: "Enrollments" },
    { id: "payments", label: "Payments" },
  ];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-slate-500 text-lg">
          Loading Dashboard...
        </p>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Admin Dashboard</h2>

      <div className="flex gap-2 mb-6 border-b">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`px-4 py-2 text-sm font-medium ${
              tab === t.id ? "border-b-2 border-brand-500 text-brand-600" : "text-gray-500"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {message && <p className="mb-4 text-sm text-brand-700 bg-brand-50 border border-brand-100 rounded-md px-4 py-2">{message}</p>}

      {tab === "courses" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <form onSubmit={handleCreateCourse} className="bg-white border rounded-lg shadow-sm p-5 space-y-3">
            <h3 className="font-semibold text-gray-800">Create New Course</h3>
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full border rounded-md px-3 py-2"
            />
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
            />
            <input
              type="number"
              placeholder="Price (NGN)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className="w-full border rounded-md px-3 py-2"
            />
            <input
              type="number"
              placeholder="Duration (weeks)"
              value={form.duration_weeks}
              onChange={(e) => setForm({ ...form, duration_weeks: e.target.value })}
              className="w-full border rounded-md px-3 py-2"
            />
            <button className="w-full bg-brand-500 text-white py-2 rounded-md hover:bg-brand-600">
              Create Course
            </button>
          </form>

          <div className="bg-white border rounded-lg shadow-sm divide-y">
            {courses.map((c) => (
              <div key={c.id} className="px-4 py-3">
                <p className="font-medium text-gray-900">{c.title}</p>
                <p className="text-xs text-gray-500">₦{Number(c.price).toLocaleString()} · {c.status}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "students" && (
        <div className="bg-white border rounded-lg shadow-sm divide-y">
          {students.map((s) => (
            <div key={s.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium text-gray-900">{s.full_name}</p>
                <p className="text-xs text-gray-500">{s.email} · {s.status}</p>
              </div>
              <button
                onClick={() => toggleStudentStatus(s)}
                className="text-sm border px-3 py-1.5 rounded-md hover:bg-gray-50"
              >
                {s.status === "active" ? "Suspend" : "Activate"}
              </button>
            </div>
          ))}
        </div>
      )}

      {tab === "enrollments" && (
        <div className="bg-white border rounded-lg shadow-sm divide-y">
          {enrollments.map((e) => (
            <div key={e.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span>{e.full_name} → {e.title}</span>
              <span className="capitalize text-gray-500">{e.status}</span>
            </div>
          ))}
        </div>
      )}

      {tab === "payments" && (
        <div className="bg-white border rounded-lg shadow-sm divide-y">
          {payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span>{p.full_name} — ₦{Number(p.amount).toLocaleString()}</span>
              <div className="flex items-center gap-3">
                <span className="capitalize text-gray-500">{p.status}</span>
                {p.status === "pending" && (
                  <button
                    onClick={() => confirmPayment(p.id)}
                    className="text-xs bg-green-600 text-white px-2.5 py-1 rounded-md hover:bg-green-700"
                  >
                    Confirm
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
