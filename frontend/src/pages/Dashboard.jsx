import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import {
  Wallet,
  CreditCard,
  BookOpen,
  Clock3,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    enrollments: [],
    payments: [],
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    setLoading(true);

    try {
      const res = await api.get(`/students/me/dashboard`);
       //console.log("Dashboard data:", res.data);
       //setData(res.data);
    } 
    catch (error) {
      console.error("Error loading dashboard:", error.res?.data?.message || error.message);
      navigate("/login");
    }
    finally {
      setLoading(false);
    }
  }

  async function handlePay(enrollment) {
    setMessage("");

    try {
      await api.post("/payments", {
        enrollment_id: enrollment.id,
        amount: enrollment.price,
      });

      setMessage(
        "Payment initiated successfully. Awaiting confirmation."
      );

      loadDashboard();
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Unable to initiate payment."
      );
    }
  }

  const totalFees = useMemo(
    () =>
      data.enrollments.reduce(
        (sum, item) => sum + Number(item.price),
        0
      ),
    [data]
  );

  const totalPaid = useMemo(
    () =>
      data.payments
        .filter((p) => p.status === "paid")
        .reduce((sum, p) => sum + Number(p.amount), 0),
    [data]
  );

  const balance = totalFees - totalPaid;

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
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-10">

          <h1 className="text-4xl font-extrabold text-slate-900">
            Welcome back, {data.full_name}
          </h1>

          <p className="mt-2 text-slate-600">
            Welcome back. Manage your learning and payments.
          </p>

        </div>

        {message && (
          <div className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
            {message}
          </div>
        )}

        {/* SUMMARY */}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl bg-white p-6 shadow">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Total Fees
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  ₦{totalFees.toLocaleString()}
                </h2>

              </div>

              <div className="rounded-xl bg-blue-100 p-3">
                <Wallet className="text-blue-600" />
              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Paid
                </p>

                <h2 className="mt-2 text-3xl font-bold text-emerald-600">
                  ₦{totalPaid.toLocaleString()}
                </h2>

              </div>

              <div className="rounded-xl bg-emerald-100 p-3">
                <CreditCard className="text-emerald-600" />
              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Outstanding
                </p>

                <h2 className="mt-2 text-3xl font-bold text-red-500">
                  ₦{balance.toLocaleString()}
                </h2>

              </div>

              <div className="rounded-xl bg-red-100 p-3">
                <AlertCircle className="text-red-500" />
              </div>

            </div>

          </div>

          <div className="rounded-3xl bg-white p-6 shadow">

            <div className="flex items-center justify-between">

              <div>

                <p className="text-sm text-slate-500">
                  Courses
                </p>

                <h2 className="mt-2 text-3xl font-bold">
                  {data.enrollments.length}
                </h2>

              </div>

              <div className="rounded-xl bg-purple-100 p-3">
                <BookOpen className="text-purple-600" />
              </div>

            </div>

          </div>

        </div>

        {/* ENROLLMENTS */}

        <div className="mt-12 rounded-3xl bg-white p-8 shadow">

          <div className="mb-6 flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              My Courses
            </h2>

            <span className="text-sm text-slate-500">
              {data.enrollments.length} Enrolled
            </span>

          </div>

          <div className="space-y-5">

            {data.enrollments.length === 0 && (
              <div className="rounded-xl bg-slate-50 p-8 text-center text-slate-500">
                You haven't enrolled in any course yet.
              </div>
            )}

            {data.enrollments.map((course) => (

              <div
                key={course.id}
                className="flex flex-col justify-between gap-5 rounded-2xl border p-6 md:flex-row md:items-center"
              >

                <div>

                  <h3 className="text-xl font-bold">
                    {course.title}
                  </h3>

                  <p className="mt-2 text-slate-500">
                    ₦{Number(course.price).toLocaleString()}
                  </p>

                  <div className="mt-3 flex gap-3">

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700 capitalize">
                      {course.status}
                    </span>

                  </div>

                </div>

                {course.status === "pending" ? (
                  <button
                    onClick={() => handlePay(course)}
                    className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Pay Now
                    <ArrowRight size={18} />
                  </button>
                ) : (
                  <div className="flex items-center gap-2 rounded-xl bg-emerald-50 px-5 py-3 text-emerald-700">
                    <CheckCircle2 size={18} />
                    Payment Completed
                  </div>
                )}

              </div>

            ))}

          </div>

        </div>

        {/* PAYMENT HISTORY */}

        <div className="mt-12 rounded-3xl bg-white p-8 shadow">

          <h2 className="mb-6 text-2xl font-bold">
            Payment History
          </h2>

          {data.payments.length === 0 ? (
            <div className="rounded-xl bg-slate-50 p-8 text-center text-slate-500">
              No payments recorded.
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>

                  <tr className="border-b text-left">

                    <th className="pb-4">
                      Amount
                    </th>

                    <th className="pb-4">
                      Currency
                    </th>

                    <th className="pb-4">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {data.payments.map((payment) => (

                    <tr
                      key={payment.id}
                      className="border-b"
                    >

                      <td className="py-4 font-semibold">
                        ₦{Number(payment.amount).toLocaleString()}
                      </td>

                      <td className="py-4">
                        {payment.currency}
                      </td>

                      <td className="py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-sm capitalize ${
                            payment.status === "paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {payment.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}