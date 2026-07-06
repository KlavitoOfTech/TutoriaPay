import React, { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";
import {
  BookOpen,
  Clock3,
  Users,
  CreditCard,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
} from "lucide-react";

export default function Courses() {
  //const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      const res = await api.get("/courses");
      setCourses(res.data);
    } finally {
      setLoading(false);
    }
  }

  async function handleEnroll(courseId) {
    setMessage("");

    // if (!user || user.role !== "student") {
    //   setMessage("Please login as a student to enroll.");
    //   return;
    // }
    try {
      const res = await api.post("/enrollments", {
        course_id: courseId,
      });
      setMessage(
        "Enrollment successful! Visit your dashboard to complete payment."
      );
    } catch (err) {
      setMessage(
        err.response?.data?.message ||
          "Unable to enroll."
      );
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-slate-500">
          Loading Courses...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* HERO */}

      <section className="bg-gradient-to-r from-emerald-600 to-blue-600">

        <div className="mx-auto max-w-7xl px-6 py-16 text-white">

          <span className="rounded-full bg-white/20 px-4 py-2 text-sm">
            Explore Courses
          </span>

          <h1 className="mt-6 text-5xl font-extrabold">
            Learn New Skills
          </h1>

          <p className="mt-4 max-w-2xl text-lg text-emerald-50">
            Browse professional courses, enroll instantly,
            and securely pay your tuition with TutoriaPay.
          </p>

        </div>

      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">

        {message && (
          <div className="mb-8 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
            {message}
          </div>
        )}

        {courses.length === 0 ? (
          <div className="rounded-3xl bg-white p-12 text-center shadow">

            <GraduationCap
              className="mx-auto text-slate-400"
              size={60}
            />

            <h2 className="mt-6 text-2xl font-bold">
              No Courses Available
            </h2>

            <p className="mt-2 text-slate-500">
              Courses will appear here once the administrator
              adds them.
            </p>

          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {courses.map((course) => (

              <div
                key={course.id}
                className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* Image */}

                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-emerald-500 to-blue-600">

                  <BookOpen
                    size={70}
                    className="text-white"
                  />

                </div>

                {/* Body */}

                <div className="p-6">

                  <div className="mb-4 flex items-center justify-between">

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Popular
                    </span>

                    <span className="font-bold text-emerald-600">
                      ₦{Number(course.price).toLocaleString()}
                    </span>

                  </div>

                  <h2 className="text-2xl font-bold text-slate-900">
                    {course.title}
                  </h2>

                  <p className="mt-3 text-sm leading-7 text-slate-600">
                    {course.description}
                  </p>

                  <div className="mt-6 space-y-3">

                    {course.duration_weeks && (

                      <div className="flex items-center gap-2 text-sm text-slate-600">

                        <Clock3 size={18} />

                        {course.duration_weeks} Weeks

                      </div>

                    )}

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <Users size={18} />

                      Unlimited Enrollment

                    </div>

                    <div className="flex items-center gap-2 text-sm text-slate-600">

                      <CreditCard size={18} />

                      Secure Tuition Payment

                    </div>

                  </div>

                  <button
                    onClick={() => handleEnroll(course.id)}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-4 font-semibold text-white transition hover:bg-emerald-600"
                  >
                    Enroll Now

                    <ArrowRight size={18} />

                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

        {/* BENEFITS */}

        <section className="mt-20 rounded-3xl bg-white p-10 shadow">

          <h2 className="mb-10 text-center text-3xl font-bold">
            Why Study with TutoriaPay?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            <div className="text-center">

              <CheckCircle2
                className="mx-auto text-emerald-500"
                size={50}
              />

              <h3 className="mt-4 text-xl font-bold">
                Easy Enrollment
              </h3>

              <p className="mt-3 text-slate-600">
                Join your preferred course in a few clicks.
              </p>

            </div>

            <div className="text-center">

              <CreditCard
                className="mx-auto text-blue-600"
                size={50}
              />

              <h3 className="mt-4 text-xl font-bold">
                Secure Payments
              </h3>

              <p className="mt-3 text-slate-600">
                Pay safely through the TutoriaPay platform.
              </p>

            </div>

            <div className="text-center">

              <GraduationCap
                className="mx-auto text-emerald-500"
                size={50}
              />

              <h3 className="mt-4 text-xl font-bold">
                Quality Learning
              </h3>

              <p className="mt-3 text-slate-600">
                Access high-quality educational programs.
              </p>

            </div>

          </div>

        </section>

      </div>

    </div>
  );
}