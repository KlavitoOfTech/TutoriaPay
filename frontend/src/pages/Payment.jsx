import { useState } from "react";
import {
  CreditCard,
  Wallet,
  User,
  BookOpen,
  CheckCircle2,
  Clock3,
  ShieldCheck,
} from "lucide-react";

export default function Payment() {
  const [activeTab, setActiveTab] = useState("payment");

  const student = {
    name: "John Doe",
    email: "john@example.com",
    phone: "+234 801 234 5678",
  };

  const course = {
    title: "Frontend Development Bootcamp",
    duration: "12 Weeks",
    price: 50000,
  };

  const paymentHistory = [
    {
      id: 1,
      amount: 50000,
      status: "paid",
      date: "12 Jun 2026",
    },
    {
      id: 2,
      amount: 30000,
      status: "pending",
      date: "03 Jun 2026",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* HEADER */}

        <div className="mb-10">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Payment Center
          </h1>

          <p className="mt-2 text-slate-600">
            Manage payments, view history and profile details.
          </p>
        </div>

        {/* TABS */}

        <div className="mb-8 flex flex-wrap gap-3">

          <button
            onClick={() => setActiveTab("payment")}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              activeTab === "payment"
                ? "bg-emerald-500 text-white"
                : "bg-white text-slate-700 shadow"
            }`}
          >
            Payment
          </button>

          <button
            onClick={() => setActiveTab("history")}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              activeTab === "history"
                ? "bg-emerald-500 text-white"
                : "bg-white text-slate-700 shadow"
            }`}
          >
            History
          </button>

          <button
            onClick={() => setActiveTab("profile")}
            className={`rounded-xl px-5 py-3 font-semibold transition ${
              activeTab === "profile"
                ? "bg-emerald-500 text-white"
                : "bg-white text-slate-700 shadow"
            }`}
          >
            Profile
          </button>

        </div>

        {/* PAYMENT TAB */}

        {activeTab === "payment" && (
          <div className="grid gap-8 lg:grid-cols-3">

            {/* COURSE DETAILS */}

            <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow">

              <div className="mb-8 flex items-center gap-3">
                <BookOpen className="text-emerald-500" />
                <h2 className="text-2xl font-bold">
                  Course Information
                </h2>
              </div>

              <div className="rounded-2xl border p-6">

                <h3 className="text-xl font-bold">
                  {course.title}
                </h3>

                <p className="mt-2 text-slate-500">
                  Duration: {course.duration}
                </p>

                <p className="mt-4 text-3xl font-bold text-emerald-600">
                  ₦{course.price.toLocaleString()}
                </p>

              </div>

              {/* STUDENT INFO */}

              <div className="mt-8">

                <div className="mb-4 flex items-center gap-3">
                  <User className="text-emerald-500" />
                  <h2 className="text-2xl font-bold">
                    Student Information
                  </h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">

                  <input
                    value={student.name}
                    readOnly
                    className="rounded-xl border p-3"
                  />

                  <input
                    value={student.email}
                    readOnly
                    className="rounded-xl border p-3"
                  />

                  <input
                    value={student.phone}
                    readOnly
                    className="rounded-xl border p-3"
                  />

                </div>

              </div>

              {/* PAYMENT METHODS */}

              <div className="mt-8">

                <h2 className="mb-4 text-2xl font-bold">
                  Payment Method
                </h2>

                <div className="grid gap-4 md:grid-cols-2">

                  <div className="cursor-pointer rounded-2xl border-2 border-emerald-500 bg-emerald-50 p-5">
                    <div className="flex items-center gap-3">
                      <CreditCard />
                      <span className="font-semibold">
                        Debit / Credit Card
                      </span>
                    </div>
                  </div>

                  <div className="cursor-pointer rounded-2xl border p-5">
                    <div className="flex items-center gap-3">
                      <Wallet />
                      <span className="font-semibold">
                        Bank Transfer
                      </span>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* ORDER SUMMARY */}

            <div className="rounded-3xl bg-white p-8 shadow h-fit">

              <h2 className="mb-6 text-2xl font-bold">
                Order Summary
              </h2>

              <div className="space-y-4">

                <div className="flex justify-between">
                  <span>Course Fee</span>
                  <span>₦50,000</span>
                </div>

                <div className="flex justify-between">
                  <span>Processing Fee</span>
                  <span>₦0</span>
                </div>

                <hr />

                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>₦50,000</span>
                </div>

              </div>

              <button className="mt-8 w-full rounded-xl bg-emerald-500 py-4 font-semibold text-white transition hover:bg-emerald-600">
                Pay ₦50,000
              </button>

              <div className="mt-6 flex items-center gap-2 text-sm text-slate-500">
                <ShieldCheck size={18} />
                Secure payment processing
              </div>

            </div>

          </div>
        )}

        {/* HISTORY TAB */}

        {activeTab === "history" && (
          <div className="rounded-3xl bg-white p-8 shadow">

            <h2 className="mb-6 text-2xl font-bold">
              Payment History
            </h2>

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead>
                  <tr className="border-b text-left">
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>

                <tbody>

                  {paymentHistory.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b"
                    >
                      <td className="py-4">
                        {payment.date}
                      </td>

                      <td className="py-4 font-semibold">
                        ₦{payment.amount.toLocaleString()}
                      </td>

                      <td className="py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-sm ${
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

          </div>
        )}

        {/* PROFILE TAB */}

        {activeTab === "profile" && (
          <div className="grid gap-8 lg:grid-cols-3">

            <div className="rounded-3xl bg-white p-8 shadow">

              <div className="flex flex-col items-center">

                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-emerald-100">
                  <User
                    size={40}
                    className="text-emerald-600"
                  />
                </div>

                <h2 className="mt-4 text-2xl font-bold">
                  {student.name}
                </h2>

                <p className="text-slate-500">
                  Student
                </p>

              </div>

            </div>

            <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow">

              <h2 className="mb-6 text-2xl font-bold">
                Profile Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <p className="text-sm text-slate-500">
                    Full Name
                  </p>
                  <p className="font-semibold">
                    {student.name}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Email
                  </p>
                  <p className="font-semibold">
                    {student.email}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Phone
                  </p>
                  <p className="font-semibold">
                    {student.phone}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Enrolled Courses
                  </p>
                  <p className="font-semibold">
                    1
                  </p>
                </div>

              </div>

              <div className="mt-8 grid gap-6 md:grid-cols-3">

                <div className="rounded-2xl bg-slate-50 p-5">
                  <BookOpen className="mb-3 text-emerald-500" />
                  <p className="text-sm text-slate-500">
                    Courses
                  </p>
                  <p className="text-2xl font-bold">
                    1
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <CheckCircle2 className="mb-3 text-emerald-500" />
                  <p className="text-sm text-slate-500">
                    Paid
                  </p>
                  <p className="text-2xl font-bold">
                    ₦50,000
                  </p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-5">
                  <Clock3 className="mb-3 text-emerald-500" />
                  <p className="text-sm text-slate-500">
                    Status
                  </p>
                  <p className="text-2xl font-bold">
                    Active
                  </p>
                </div>

              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
}