import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
        Welcome to <span className="text-brand-600">LearnPay</span>
      </h1>
      <p className="text-gray-600 mb-8">
        Manage student registrations, course enrollments, and payments — all in one place.
      </p>
      <div className="flex justify-center gap-4">
        <Link to="/courses" className="bg-brand-500 text-white px-5 py-2.5 rounded-md hover:bg-brand-600">
          Browse Courses
        </Link>
        <Link to="/register" className="border border-brand-500 text-brand-600 px-5 py-2.5 rounded-md hover:bg-brand-50">
          Get Started
        </Link>
      </div>
    </div>
  );
}
