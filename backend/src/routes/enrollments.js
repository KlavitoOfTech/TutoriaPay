import express from "express";
import { query } from "../db/pool.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Student: enroll in a course (creates pending enrollment; payment handled separately)
router.post("/", authenticate(["student"]), async (req, res) => {
  const { course_id } = req.body;
  if (!course_id) return res.status(400).json({ message: "course_id is required" });

  try {
    const course = await query("SELECT * FROM courses WHERE id = $1 AND status = 'active'", [course_id]);
    if (!course.rows.length) return res.status(404).json({ message: "Course not found or inactive" });

    const existing = await query(
      "SELECT * FROM enrollments WHERE student_id = $1 AND course_id = $2",
      [req.user.id, course_id]
    );
    if (existing.rows.length) {
      return res.status(409).json({ message: "Already enrolled in this course", enrollment: existing.rows[0] });
    }

    const result = await query(
      `INSERT INTO enrollments (student_id, course_id, status)
       VALUES ($1, $2, 'pending') RETURNING *`,
      [req.user.id, course_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Enrollment failed" });
  }
});

// Student: list own enrollments
router.get("/me", authenticate(["student"]), async (req, res) => {
  const result = await query(
    `SELECT e.*, c.title, c.price FROM enrollments e
     JOIN courses c ON c.id = e.course_id
     WHERE e.student_id = $1 ORDER BY e.enrolled_at DESC`,
    [req.user.id]
  );
  res.json(result.rows);
});

// Admin: list all enrollments
router.get("/", authenticate(["admin"]), async (req, res) => {
  const result = await query(
    `SELECT e.*, s.full_name, s.email, c.title, c.price FROM enrollments e
     JOIN students s ON s.id = e.student_id
     JOIN courses c ON c.id = e.course_id
     ORDER BY e.enrolled_at DESC`
  );
  res.json(result.rows);
});

// Admin: update enrollment status manually (e.g. cancel)
router.patch("/:id/status", authenticate(["admin"]), async (req, res) => {
  const { status } = req.body;
  if (!["pending", "active", "completed", "cancelled"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }
  const result = await query(
    "UPDATE enrollments SET status = $1 WHERE id = $2 RETURNING *",
    [status, req.params.id]
  );
  if (!result.rows.length) return res.status(404).json({ message: "Enrollment not found" });
  res.json(result.rows[0]);
});

export default router;
