import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

import {
  CheckCircle2,
  Loader2,
  Receipt,
  BookOpen,
  CalendarDays,
  CreditCard,
  Hash,
  ArrowRight,
} from "lucide-react";

export default function PaymentSuccess() {
  const navigate = useNavigate();
  const { paymentId } = useParams();

  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadPayment();
  }, [paymentId]);

  async function loadPayment() {
    setLoading(true);

    try {
      /*
      ============================================================
      BACKEND ENDPOINT

      GET /payments/:paymentId/status

      Response

      {
        "id":15,
        "status":"paid",
        "reference":"NMB938483938",
        "invoice_no":"INV-20260709-00015",

        "amount":50000,

        "currency":"NGN",

        "paid_at":"2026-07-09T10:30:00Z",

        "course":{
            "id":2,
            "title":"Frontend Development"
        },

        "student":{
            "id":1,
            "full_name":"John Doe"
        }
      }
      ============================================================
      */

      const res = await api.get(
        `/payments/${paymentId}/status`
      );

      setPayment(res.data);

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100">
        <Loader2
          size={42}
          className="animate-spin text-emerald-600"
        />
      </div>
    );
  }

  if (!payment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">

        <div className="w-full max-w-lg rounded-3xl bg-white p-10 shadow-xl text-center">

          <Receipt
            size={60}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-6 text-3xl font-bold">

            Payment Not Found

          </h2>

          <p className="mt-3 text-slate-500">

            {message ||
              "We couldn't find this payment."}

          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white hover:bg-emerald-700"
          >
            Back to Dashboard
          </button>

        </div>

      </div>
    );
  }

    return (

    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-5xl px-6 py-12">

        <div className="rounded-3xl bg-white p-10 shadow-xl">

          {/* Success Header */}

          <div className="flex flex-col items-center text-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-100">

              <CheckCircle2
                size={70}
                className="text-emerald-600"
              />

            </div>

            <h1 className="mt-8 text-4xl font-bold text-slate-900">

              Payment Successful

            </h1>

            <p className="mt-3 max-w-xl text-lg text-slate-500">

              Your payment has been successfully received and verified.
              Your enrollment has been updated automatically.

            </p>

          </div>

          {/* Payment Details */}

          <div className="mt-12 grid gap-8 lg:grid-cols-2">

            {/* Left */}

            <div className="rounded-2xl border bg-slate-50 p-8">

              <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">

                <Receipt />

                Payment Details

              </h2>

              <div className="space-y-6">

                <div className="flex items-center justify-between">

                  <span className="text-slate-500">

                    Invoice Number

                  </span>

                  <span className="font-semibold">

                    {payment.invoice_no}

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-slate-500">

                    Transaction Reference

                  </span>

                  <span className="font-semibold">

                    {payment.reference}

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-slate-500">

                    Status

                  </span>

                  <span className="rounded-full bg-emerald-100 px-4 py-1 text-sm font-semibold text-emerald-700">

                    PAID

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-slate-500">

                    Currency

                  </span>

                  <span className="font-semibold">

                    {payment.currency}

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-slate-500">

                    Amount Paid

                  </span>

                  <span className="text-2xl font-bold text-emerald-600">

                    ₦{Number(payment.amount).toLocaleString()}

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-slate-500">

                    Payment Date

                  </span>

                  <span className="font-semibold">

                    {new Date(payment.paid_at).toLocaleString()}

                  </span>

                </div>

              </div>

            </div>

            {/* Right */}

            <div className="rounded-2xl border bg-slate-50 p-8">

              <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">

                <BookOpen />

                Enrollment

              </h2>

              <div className="space-y-6">

                <div className="flex items-center justify-between">

                  <span className="text-slate-500">

                    Course

                  </span>

                  <span className="font-semibold">

                    {payment.course?.title}

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-slate-500">

                    Student

                  </span>

                  <span className="font-semibold">

                    {payment.student?.full_name}

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-slate-500">

                    Payment ID

                  </span>

                  <span className="font-semibold">

                    #{payment.id}

                  </span>

                </div>

                <div className="flex items-center justify-between">

                  <span className="text-slate-500">

                    Reference

                  </span>

                  <span className="font-semibold">

                    {payment.reference}

                  </span>

                </div>

              </div>

            </div>

          </div>

                    {/* Action Buttons */}

          <div className="mt-12 flex flex-col gap-4 md:flex-row md:justify-center">

            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-700"
            >
              Go to Dashboard
              <ArrowRight size={20} />
            </button>

            <button
              onClick={() => navigate("/payments/history")}
              className="rounded-xl border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Payment History
            </button>

            <button
              onClick={() => window.print()}
              className="rounded-xl border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Download Receipt
            </button>

          </div>

          {/* Payment Notice */}

          <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 p-6">

            <h3 className="text-lg font-bold text-emerald-700">

              What's Next?

            </h3>

            <p className="mt-3 leading-7 text-slate-700">

              Your payment has been successfully confirmed.
              Your enrollment has already been updated and you can now
              continue learning from your student dashboard.

            </p>

          </div>

          {/* =========================================================

          BACKEND ENDPOINTS REQUIRED

          ==========================================================

          GET /payments/:paymentId/status

          Returns

          {
              "id": 15,
              "status":"paid",
              "reference":"NMB283847474",
              "invoice_no":"INV-20260709-0001",
              "amount":50000,
              "currency":"NGN",
              "paid_at":"2026-07-09T15:20:00Z",

              "student":{
                  "id":1,
                  "full_name":"John Doe"
              },

              "course":{
                  "id":2,
                  "title":"Frontend Development"
              }
          }


          OPTIONAL ENDPOINT

          GET /payments/:paymentId/receipt

          Returns

          {
             "download_url":"https://..."
          }

          ======================================================== */}

        </div>

      </div>

    </div>

  );

}