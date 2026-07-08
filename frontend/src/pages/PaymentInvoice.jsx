import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axios";

import {
  Loader2,
  Receipt,
  BookOpen,
  User,
  CalendarDays,
  CreditCard,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

export default function PaymentInvoice() {
  const navigate = useNavigate();
  const { paymentId } = useParams();
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadInvoice();
  }, [paymentId]);

  async function loadInvoice() {
    setLoading(true);
    try {
      const res = await api.get(`/payments/me/invoice`);
      console.log(res.data)
      setInvoice(res.data);
    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message ||
          "Unable to load invoice."
      );
    } finally {
      setLoading(false);
    }
  }

  async function confirmPayment() {

    if (!invoice) return;

    setProcessing(true);

    try {
      const response = await api.post(
        `/payments/${paymentId}/pay`
      );

      if (response.data.payment_url) {

        window.location.href =
          response.data.payment_url;

        return;
      }

      if (response.data.status === "paid") {

        navigate("/dashboard");

        return;
      }

    } catch (error) {
      console.error(error);
      setMessage(
        error.response?.data?.message ||
          "Unable to confirm payment."
      );

    } finally {
      setProcessing(false);
    }
  }

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

  if (!invoice) {

    return (

      <div className="flex h-screen items-center justify-center">

        <div className="rounded-3xl bg-white p-10 shadow text-center">

          <AlertCircle
            size={60}
            className="mx-auto text-red-500"
          />

          <h2 className="mt-5 text-2xl font-bold">

            Invoice Not Found

          </h2>

          <button
            onClick={() => navigate(-1)}
            className="mt-6 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white"
          >

            Go Back

          </button>

        </div>

      </div>

    );

  }

  return (

    <div className="min-h-screen bg-slate-100">

      <div className="mx-auto max-w-5xl px-6 py-10">

        <div className="mb-10 flex items-center justify-between">

          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-xl border bg-white px-5 py-3 hover:bg-slate-50"
          >

            <ArrowLeft size={18} />

            Back

          </button>

          <h1 className="flex items-center gap-3 text-4xl font-bold">

            Payment Checkout

          </h1>

          <div />

        </div>

        {message && (

          <div className="mb-8 rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">

            {message}

          </div>

        )}

        <div className="rounded-3xl bg-white p-10 shadow">
                  {/* Header */}

          {/* Invoice Summary */}

          <div className="mt-10 rounded-2xl border p-8">

            <h3 className="mb-8 text-2xl font-bold">

              Payment Summary

            </h3>

            <div className="space-y-6">

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Payment For

                </span>

                <span className="font-semibold">

                  {invoice.invoice_no}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Account Number

                </span>

                <span className="font-semibold">

                  {invoice.account_number}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Bank Name

                </span>

                <span className="font-semibold">

                  {invoice.bank_name}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Account Name

                </span>

                <span className="font-semibold">

                  {invoice.account_name}

                </span>

              </div>

              <div className="flex justify-between">

                <span className="text-slate-500">

                  Amount

                </span>

                <span className="font-semibold">

                  ₦{Number(invoice.expected_amount).toLocaleString()}

                </span>

              </div>

              <hr />

            </div>

          </div>
                    {/* Actions */}

          <div className="mt-10 flex flex-col gap-4 border-t pt-8 md:flex-row md:items-center md:justify-between">

            <div className="flex gap-4">

              <button
                disabled={
                  processing ||
                  invoice.status === "paid"
                }
                onClick={confirmPayment}
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-8 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {processing ? (

                  <>
                    <Loader2
                      className="animate-spin"
                      size={18}
                    />

                    Processing...

                  </>

                ) : invoice.status === "paid" ? (

                  "Already Paid"

                ) : (

                  <>
                    I Have Paid Already

                    {/* <CreditCard size={18} /> */}
                  </>

                )}

              </button>

            </div>

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

1. GET INVOICE

GET /payments/:paymentId

Response

{
  "id": 15,

  "invoice_no": "INV-20260707-00015",

  "invoice_date": "2026-07-07",

  "due_date": "2026-07-14",

  "currency": "NGN",

  "amount": 50000,

  "status": "pending",

  "student": {
      "id": 4,
      "full_name": "John Doe",
      "email": "john@example.com",
      "phone": "+2348012345678"
  },

  "course": {
      "id": 10,
      "title": "Frontend Development",
      "duration": "12 Weeks",
      "instructor": "Jane Smith"
  }
}

=========================================================

2. START PAYMENT

POST /payments/:paymentId/pay

Response

{
    "payment_url":
    "https://checkout.paystack.com/xxxxx"
}

OR

{
    "status":"paid"
}

=========================================================

3. PAYMENT CALLBACK

POST /payments/webhook

Backend updates payment

↓

Payment status becomes

Paid

↓

Dashboard payment history updates

↓

Student dashboard refreshes

=========================================================

RECOMMENDED FLOW

Dashboard

↓

Courses

↓

Enroll

↓

Payment Page
(list pending payments)

↓

Payment Invoice

↓

Proceed To Payment

↓

Payment Gateway

↓

Backend Callback

↓

Dashboard

=========================================================
*/