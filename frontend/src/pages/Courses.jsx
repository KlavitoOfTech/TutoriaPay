import React, { useEffect, useState } from "react";
import api from "../api/axios.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Courses() {
  const { user } = useAuth();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/courses").then((res) => setCourses(res.data)).finally(() => setLoading(false));
  }, []);

  async function handleEnroll(courseId) {
    setMessage("");
    if (!user || user.role !== "student") {
      setMessage("Please log in as a student to enroll.");
      return;
    }
    try {
      await api.post("/enrollments", { course_id: courseId });
      setMessage("Enrolled successfully! Check your dashboard to complete payment.");
    } catch (err) {
      setMessage(err.response?.data?.message || "Enrollment failed");
    }
  }

  if (loading) return <p className="text-center py-16">Loading courses...</p>;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">Available Courses</h2>
      {message && <p className="mb-4 text-sm text-brand-700 bg-brand-50 border border-brand-100 rounded-md px-4 py-2">{message}</p>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white border rounded-lg shadow-sm p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-lg text-gray-900">{course.title}</h3>
              <p className="text-gray-600 text-sm mt-1 line-clamp-3">{course.description}</p>
              <p className="text-brand-600 font-bold mt-3">₦{Number(course.price).toLocaleString()}</p>
              {course.duration_weeks && (
                <p className="text-xs text-gray-500 mt-1">{course.duration_weeks} weeks</p>
              )}
            </div>
            <button
              onClick={() => handleEnroll(course.id)}
              className="mt-4 bg-brand-500 text-white py-2 rounded-md hover:bg-brand-600"
            >
              Enroll
            </button>
          </div>
        ))}
        {courses.length === 0 && <p className="text-gray-500">No courses available yet.</p>}
      </div>
    </div>
  );
}
