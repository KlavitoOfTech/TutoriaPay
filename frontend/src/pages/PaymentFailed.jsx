import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

import {
  XCircle,
  Loader2,
  Receipt,
  AlertTriangle,
  ArrowLeft,
  RotateCcw,
} from "lucide-react";

export default function PaymentFailed() {
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
      ======================================================

      BACKEND ENDPOINT

      GET /payments/:paymentId/status

      Response

      {
          "id":15,

          "status":"failed",

          "reason":"Payment was cancelled",

          "reference":"NMB283847474",

          "invoice_no":"INV-20260709-0015",

          "amount":50000,

          "currency":"NGN",

          "student":{
              "id":1,
              "full_name":"John Doe"
          },

          "course":{
              "id":2,
              "title":"Frontend Development"
          }
      }

      ======================================================
      */

      const res = await api.get(
        `/payments/${paymentId}/status`
      );

      setPayment(res.data);

    } catch (error) {

      console.error(error);

      setMessage(
        error.response?.data?.message ||
        "Unable to load payment."
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
          className="animate-spin text-red-600"
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

            {message || "We couldn't locate this payment."}

          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-8 rounded-xl bg-red-600 px-8 py-3 font-semibold text-white hover:bg-red-700"
          >

            Return to Dashboard

          </button>

        </div>

      </div>

    );

  }

    return (

    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-5xl px-6 py-12">

        <div className="rounded-3xl bg-white p-10 shadow-xl">

          {/* Failure Header */}

          <div className="flex flex-col items-center text-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-red-100">

              <XCircle
                size={70}
                className="text-red-600"
              />

            </div>

            <h1 className="mt-8 text-4xl font-bold text-slate-900">

              Payment Failed

            </h1>

            <p className="mt-3 max-w-xl text-lg text-slate-500">

              Unfortunately, we couldn't verify your payment.
              You can review the details below and try again.

            </p>

          </div>

          {/* Failure Alert */}

          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-6">

            <div className="flex items-start gap-4">

              <AlertTriangle
                size={30}
                className="mt-1 text-red-600"
              />

              <div>

                <h3 className="text-lg font-bold text-red-700">

                  Payment Status

                </h3>

                <p className="mt-2 text-slate-700">

                  {payment.reason ||
                    "The payment could not be completed. Please try again or contact support if the issue persists."}

                </p>

              </div>

            </div>

          </div>

          {/* Details */}

          <div className="mt-10 grid gap-8 lg:grid-cols-2">

            {/* Payment */}

            <div className="rounded-2xl border bg-slate-50 p-8">

              <h2 className="mb-8 flex items-center gap-2 text-2xl font-bold">

                <Receipt />

                Payment Details

              </h2>

              <div className="space-y-6">

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Invoice Number

                  </span>

                  <span className="font-semibold">

                    {payment.invoice_no}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Reference

                  </span>

                  <span className="font-semibold">

                    {payment.reference || "--"}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Status

                  </span>

                  <span className="rounded-full bg-red-100 px-4 py-1 text-sm font-semibold text-red-700">

                    FAILED

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Currency

                  </span>

                  <span className="font-semibold">

                    {payment.currency}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Amount

                  </span>

                  <span className="text-2xl font-bold text-red-600">

                    ₦{Number(payment.amount).toLocaleString()}

                  </span>

                </div>

              </div>

            </div>

            {/* Enrollment */}

            <div className="rounded-2xl border bg-slate-50 p-8">

              <h2 className="mb-8 text-2xl font-bold">

                Course Information

              </h2>

              <div className="space-y-6">

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Course

                  </span>

                  <span className="font-semibold">

                    {payment.course?.title}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Student

                  </span>

                  <span className="font-semibold">

                    {payment.student?.full_name}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Payment ID

                  </span>

                  <span className="font-semibold">

                    #{payment.id}

                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-slate-500">

                    Failure Reason

                  </span>

                  <span className="font-semibold text-red-600">

                    {payment.reason || "Unknown"}

                  </span>

                </div>

              </div>

            </div>

          </div>

                    {/* Action Buttons */}

          <div className="mt-12 flex flex-col gap-4 md:flex-row md:justify-center">

            <button
              onClick={() => navigate(`/payment-invoice/${payment.id}`)}
              className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-8 py-4 font-semibold text-white transition hover:bg-red-700"
            >
              <RotateCcw size={20} />
              Retry Payment
            </button>

            <button
              onClick={() => navigate("/dashboard")}
              className="rounded-xl border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              Return to Dashboard
            </button>

            <button
              onClick={() => navigate(-1)}
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-8 py-4 font-semibold text-slate-700 transition hover:bg-slate-100"
            >
              <ArrowLeft size={18} />
              Go Back
            </button>

          </div>

          {/* Help Section */}

          <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6">

            <h3 className="text-lg font-bold text-amber-700">

              Need Help?

            </h3>

            <p className="mt-3 leading-7 text-slate-700">

              If money was deducted from your account but this payment
              still shows as failed, don't attempt another payment
              immediately.

              Please contact support with your transaction reference so
              we can investigate and update your payment status.

            </p>

          </div>

          {/* =========================================================

              BACKEND API CONTRACT

          ============================================================

          GET /payments/:paymentId/status

          SUCCESS RESPONSE

          {
              "id":15,
              "status":"failed",

              "reference":"NMB283847474",

              "invoice_no":"INV-20260709-0015",

              "amount":50000,

              "currency":"NGN",

              "reason":"Payment was cancelled",

              "student":{
                  "id":1,
                  "full_name":"John Doe"
              },

              "course":{
                  "id":2,
                  "title":"Frontend Development"
              }
          }


          OPTIONAL RETRY ENDPOINT

          POST /payments/:paymentId/retry

          Response

          {
              "checkout_url":"https://checkout.nomba.com/..."
          }


          OPTIONAL SUPPORT ENDPOINT

          GET /payments/:paymentId/support

          Response

          {
              "email":"support@tutoriapay.com",
              "phone":"+2348000000000"
          }

          ============================================================ */}

        </div>

      </div>

    </div>

  );

}