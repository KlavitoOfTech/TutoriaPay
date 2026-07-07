import React, { useEffect, useState } from "react";
import api from "../api/axios";
import {
  CreditCard,
  Wallet,
  BookOpen,
  ShieldCheck,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";

export default function Payment() {
  const [student, setStudent] = useState(null);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(null);

  const [message, setMessage] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("card");

  useEffect(() => {
    loadPaymentData();
  }, []);

  async function loadPaymentData() {
    setLoading(true);

    try {
      const [paymentRes, /*studentRes*/] = await Promise.all([
        api.get("/payments/me"), // make get request to payment api endpoint
        //api.get("/payments/me/invoice"),
      ]);
      //console.log(studentRes)
      //setStudent(studentRes.data);
      setPayments(paymentRes.data || []);
    } catch (error) {
      console.error(error);

      setMessage(
        error.response?.data?.message ||
          "Unable to load payment information."
      );
    } finally {
      setLoading(false);
    }
  }

  async function handlePayment(enrollment) {
    setProcessing(enrollment.id);
    setMessage("");

    try {
      const response = await api.post("/payments", {
        enrollment_id: enrollment.id,
        payment_method: selectedMethod,
      });

      /**
       * Backend can return:
       *
       * {
       *   payment_url:"https://..."
       * }
       *
       * OR
       *
       * {
       *   status:"paid"
       * }
       */

      if (response.data.payment_url) {
        window.location.href = response.data.payment_url;
        return;
      }

      setMessage("Payment completed successfully.");

      loadPaymentData();
    } catch (error) {
      setMessage(
        error.response?.data?.message ||
          "Payment could not be completed."
      );
    } finally {
      setProcessing(null);
    }
  }

  const totalOutstanding = payments.reduce(
    (sum, item) => sum + Number(item.amount),
    0
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2
          className="animate-spin text-emerald-600"
          size={40}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="mx-auto max-w-7xl px-6 py-10">

        <div className="mb-10">

          <h1 className="text-4xl font-extrabold text-slate-900">
            Payment Center
          </h1>

          <p className="mt-2 text-slate-600">
            Complete payment for your enrolled courses.
          </p>

        </div>

        {message && (
          <div className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
            {message}
          </div>
        )}

        <div className="grid gap-8 lg:grid-cols-3">

          {/* STUDENT */}

          <div className="rounded-3xl bg-white p-8 shadow h-fit">

            <h2 className="mb-6 text-2xl font-bold">
              Student Information
            </h2>

            <div className="space-y-4">

              <div>

                <p className="text-sm text-slate-500">
                  Full Name
                </p>

                <p className="font-semibold">
                  {student?.full_name}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Email
                </p>

                <p className="font-semibold">
                  {student?.email}
                </p>

              </div>

              <div>

                <p className="text-sm text-slate-500">
                  Phone
                </p>

                <p className="font-semibold">
                  {student?.phone}
                </p>

              </div>

            </div>

            <hr className="my-8" />

            <h3 className="mb-4 text-xl font-bold">
              Payment Method
            </h3>

            <div className="space-y-4">

              <button
                onClick={() => setSelectedMethod("card")}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  selectedMethod === "card"
                    ? "border-emerald-500 bg-emerald-50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard />
                  Debit / Credit Card
                </div>
              </button>

              <button
                onClick={() => setSelectedMethod("bank")}
                className={`w-full rounded-2xl border p-5 text-left transition ${
                  selectedMethod === "bank"
                    ? "border-emerald-500 bg-emerald-50"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <Wallet />
                  Bank Transfer
                </div>
              </button>

            </div>

          </div>

                    {/* PENDING PAYMENTS */}

          <div className="lg:col-span-2">

            {payments.length === 0 ? (

              <div className="rounded-3xl bg-white p-12 text-center shadow">

                <CheckCircle2
                  className="mx-auto text-emerald-500"
                  size={60}
                />

                <h2 className="mt-6 text-2xl font-bold">
                  No Pending Payments
                </h2>

                <p className="mt-2 text-slate-500">
                  You have successfully completed payment for all enrolled
                  courses.
                </p>

              </div>

            ) : (

              <>

                <div className="rounded-3xl bg-white p-8 shadow">

                  <div className="mb-8 flex items-center justify-between">

                    <div>

                      <h2 className="text-2xl font-bold">
                        Pending Course Payments
                      </h2>

                      <p className="mt-2 text-slate-500">
                        Complete payment to activate your enrolled courses.
                      </p>

                    </div>

                    <div className="rounded-xl bg-red-50 px-5 py-3">

                      <p className="text-sm text-slate-500">
                        Outstanding
                      </p>

                      <p className="text-2xl font-bold text-red-600">
                        ₦{totalOutstanding.toLocaleString()}
                      </p>

                    </div>

                  </div>

                  <div className="space-y-6">

                    {payments.map((payment) => (

                      <div
                        key={payment.id}
                        className="rounded-2xl border p-6"
                      >

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                          <div>

                            <div className="flex items-center gap-3">

                              <BookOpen className="text-emerald-600" />

                              <h3 className="text-xl font-bold">
                                {payment.title}
                              </h3>

                            </div>

                            <div className="mt-4 space-y-2">

                              <p className="text-slate-500">
                                Duration:
                                <span className="ml-2 font-medium text-slate-700">
                                  {payment.duration}
                                </span>
                              </p>

                              <p className="text-slate-500">
                                Amount:
                                <span className="ml-2 font-bold text-emerald-600">
                                  ₦{Number(payment.price).toLocaleString()}
                                </span>
                              </p>

                              <div className="mt-3">

                                <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                                  {payment.status}
                                </span>

                              </div>

                            </div>

                          </div>

                          <button
                            disabled={processing === payment.id}
                            onClick={() => handlePayment(payment)}
                            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-8 py-4 font-semibold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                          >

                            {processing === payment.id ? (
                              <>
                                <Loader2
                                  size={18}
                                  className="animate-spin"
                                />
                                Processing...
                              </>
                            ) : (
                              <>
                                Pay Now
                                <ArrowRight size={18} />
                              </>
                            )}

                          </button>

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                <div className="mt-8 rounded-3xl bg-white p-8 shadow">

                  <h2 className="mb-6 text-2xl font-bold">
                    Order Summary
                  </h2>

                  <div className="space-y-5">

                    {payments.map((payment) => (

                      <div
                        key={payment.id}
                        className="flex justify-between"
                      >

                        <span>{payment.course}</span>

                        <span className="font-semibold">
                          ₦{Number(payment.amount).toLocaleString()}
                        </span>

                      </div>

                    ))}

                    <hr />

                    <div className="flex justify-between text-2xl font-bold">

                      <span>Total Outstanding</span>

                      <span className="text-emerald-600">
                        ₦{totalOutstanding.toLocaleString()}
                      </span>

                    </div>

                  </div>

                  <div className="mt-8 flex items-center gap-2 text-sm text-slate-500">

                    <ShieldCheck
                      size={18}
                      className="text-emerald-600"
                    />

                    Secure payment powered by your payment gateway.

                  </div>

                </div>

              </>

            )}

          </div>

        </div>

              </div>

    </div>
  );
}

/*
=========================================================
BACKEND API CONTRACT
=========================================================

This page expects these endpoints.

---------------------------------------------------------
1. Get Logged-in Student
---------------------------------------------------------

GET /students/me

Response

{
  "id":1,
  "full_name":"John Doe",
  "email":"john@example.com",
  "phone":"+2348012345678"
}

---------------------------------------------------------
2. Get Pending Payments
---------------------------------------------------------

GET /students/me/pending-payments

Response

[
  {
    "id":12,
    "course":"Frontend Development",
    "duration":"12 Weeks",
    "amount":50000,
    "status":"pending"
  },
  {
    "id":15,
    "course":"Backend Development",
    "duration":"10 Weeks",
    "amount":40000,
    "status":"pending"
  }
]

---------------------------------------------------------
3. Make Payment
---------------------------------------------------------

POST /payments

Request

{
   "enrollment_id":12,
   "payment_method":"card"
}

Possible Response (Redirect)

{
   "payment_url":"https://payment-gateway-url"
}

OR

{
   "status":"paid"
}

=========================================================
EXPECTED WORKFLOW

Admin creates course
        ↓
Student logs in
        ↓
Courses page loads available courses
        ↓
Student enrolls
        ↓
Backend creates enrollment
        ↓
Backend creates pending payment
        ↓
Dashboard updates automatically
        ↓
Payment page lists pending payment(s)
        ↓
Student clicks Pay Now
        ↓
Payment gateway
        ↓
Payment successful
        ↓
Backend updates payment status
        ↓
Dashboard payment history updates
        ↓
Admin dashboard updates
=========================================================
*/