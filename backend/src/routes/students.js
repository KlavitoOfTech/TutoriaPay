import express from "express";
import { query } from "../db/pool.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Get own profile
router.get("/me", authenticate(["student"]), async (req, res) => {
  const result = await query(
    "SELECT id, full_name, email, phone, status, created_at FROM students WHERE id = $1",
    [req.user.id]
  );
  if (!result.rows.length) return res.status(404).json({ message: "Student not found" });
  res.json(result.rows[0]);
});

// Student dashboard summary: enrollments + payments
router.get("/me/dashboard", authenticate(["student"]), async (req, res) => {
  const studentId = req.user.id;
  const enrollments = await query(
    `SELECT e.id, e.status, e.enrolled_at, c.id as course_id, c.title, c.price
     FROM enrollments e JOIN courses c ON c.id = e.course_id
     WHERE e.student_id = $1 ORDER BY e.enrolled_at DESC`,
    [studentId]
  );
  const payments = await query(
    `SELECT id, amount, currency, status, provider, paid_at, created_at
     FROM payments WHERE student_id = $1 ORDER BY created_at DESC`,
    [studentId]
  );
  res.json({ enrollments: enrollments.rows, payments: payments.rows });
});

// Admin: list all students
router.get("/", authenticate(["admin"]), async (req, res) => {
  const result = await query(
    "SELECT id, full_name, email, phone, status, created_at FROM students ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

// Admin: get single student detail
router.get("/:id", authenticate(["admin"]), async (req, res) => {
  const result = await query(
    "SELECT id, full_name, email, phone, status, created_at FROM students WHERE id = $1",
    [req.params.id]
  );
  if (!result.rows.length) return res.status(404).json({ message: "Student not found" });
  res.json(result.rows[0]);
});

// Admin: suspend/activate a student
router.patch("/:id/status", authenticate(["admin"]), async (req, res) => {
  const { status } = req.body;
  if (!["active", "suspended"].includes(status)) {
    return res.status(400).json({ message: "status must be 'active' or 'suspended'" });
  }
  const result = await query(
    "UPDATE students SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING id, status",
    [status, req.params.id]
  );
  if (!result.rows.length) return res.status(404).json({ message: "Student not found" });
  res.json(result.rows[0]);
});

export default router;
