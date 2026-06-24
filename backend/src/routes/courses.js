import express from "express";
import { query } from "../db/pool.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Public/student: list active courses
router.get("/", async (req, res) => {
  const result = await query(
    "SELECT * FROM courses WHERE status = 'active' ORDER BY created_at DESC"
  );
  res.json(result.rows);
});

// Public/student: get single course
router.get("/:id", async (req, res) => {
  const result = await query("SELECT * FROM courses WHERE id = $1", [req.params.id]);
  if (!result.rows.length) return res.status(404).json({ message: "Course not found" });
  res.json(result.rows[0]);
});

// Admin: create course
router.post("/", authenticate(["admin"]), async (req, res) => {
  const { title, description, price, duration_weeks } = req.body;
  if (!title || price === undefined) {
    return res.status(400).json({ message: "title and price are required" });
  }
  try {
    const result = await query(
      `INSERT INTO courses (title, description, price, duration_weeks, created_by)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description || null, price, duration_weeks || null, req.user.id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create course" });
  }
});

// Admin: update course
router.put("/:id", authenticate(["admin"]), async (req, res) => {
  const { title, description, price, duration_weeks, status } = req.body;
  const result = await query(
    `UPDATE courses SET
       title = COALESCE($1, title),
       description = COALESCE($2, description),
       price = COALESCE($3, price),
       duration_weeks = COALESCE($4, duration_weeks),
       status = COALESCE($5, status),
       updated_at = NOW()
     WHERE id = $6 RETURNING *`,
    [title, description, price, duration_weeks, status, req.params.id]
  );
  if (!result.rows.length) return res.status(404).json({ message: "Course not found" });
  res.json(result.rows[0]);
});

// Admin: archive/delete course
router.delete("/:id", authenticate(["admin"]), async (req, res) => {
  const result = await query(
    "UPDATE courses SET status = 'archived', updated_at = NOW() WHERE id = $1 RETURNING id",
    [req.params.id]
  );
  if (!result.rows.length) return res.status(404).json({ message: "Course not found" });
  res.json({ message: "Course archived" });
});

export default router;
