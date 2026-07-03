import React, { useEffect, useState } from "react";
import api from "../api/axios.js";

export default function Dashboard() {
  const [data, setData] = useState({ enrollments: [], payments: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // useEffect(() => {
  //   loadDashboard();
  // }, []);

  // function loadDashboard() {
  //   setLoading(true);
  //   api
  //     .get("/students/me/dashboard")
  //     .then((res) => setData(res.data))
  //     .finally(() => setLoading(false));
  // }

  async function handlePay(enrollment) {
    setMessage("");
    try {
      await api.post("/payments", {
        enrollment_id: enrollment.id,
        amount: enrollment.price,
      });
      setMessage("Payment recorded as pending. Awaiting admin confirmation.");
      loadDashboard();
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to initiate payment");
    }
  }

  //if (loading) return <p className="text-center py-16">Loading dashboard...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">My Dashboard</h2>
      {message && <p className="mb-4 text-sm text-brand-700 bg-brand-50 border border-brand-100 rounded-md px-4 py-2">{message}</p>}

      <section className="mb-10">
        <h3 className="text-lg font-semibold mb-3 text-gray-800">My Enrollments</h3>
        <div className="bg-white border rounded-lg shadow-sm divide-y">
          {data.enrollments.map((e) => (
            <div key={e.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="font-medium text-gray-900">{e.title}</p>
                <p className="text-xs text-gray-500">
                  Status: <span className="capitalize">{e.status}</span> · ₦{Number(e.price).toLocaleString()}
                </p>
              </div>
              {e.status === "pending" && (
                <button
                  onClick={() => handlePay(e)}
                  className="bg-brand-500 text-white text-sm px-3 py-1.5 rounded-md hover:bg-brand-600"
                >
                  Pay Now
                </button>
              )}
            </div>
          ))}
          {data.enrollments.length === 0 && (
            <p className="px-4 py-3 text-gray-500 text-sm">No enrollments yet. Browse courses to get started.</p>
          )}
        </div>
      </section>

      <section>
        <h3 className="text-lg font-semibold mb-3 text-gray-800">Payment History</h3>
        <div className="bg-white border rounded-lg shadow-sm divide-y">
          {data.payments.map((p) => (
            <div key={p.id} className="flex items-center justify-between px-4 py-3 text-sm">
              <span>₦{Number(p.amount).toLocaleString()} ({p.currency})</span>
              <span className="capitalize text-gray-500">{p.status}</span>
            </div>
          ))}
          {data.payments.length === 0 && (
            <p className="px-4 py-3 text-gray-500 text-sm">No payments yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
