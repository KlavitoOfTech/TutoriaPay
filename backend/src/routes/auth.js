import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { query } from "../db/pool.js";

const router = express.Router();

function signToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
}

// ===== STUDENT REGISTRATION =====
router.post("/student/register", async (req, res) => {
  const { full_name, email, phone, password } = req.body;
  if (!full_name || !email || !password) {
    return res.status(400).json({ message: "full_name, email and password are required" });
  }
  try {
    const existing = await query("SELECT id FROM students WHERE email = $1", [email]);
    if (existing.rows.length) {
      return res.status(409).json({ message: "Email already registered" });
    }
    const password_hash = await bcrypt.hash(password, 10);
    const result = await query(
      `INSERT INTO students (full_name, email, phone, password_hash)
       VALUES ($1, $2, $3, $4)
       RETURNING id, full_name, email, phone, created_at`,
      [full_name, email, phone || null, password_hash]
    );
    const student = result.rows[0];
    const token = signToken({ id: student.id, role: "student", email: student.email });
    res.status(201).json({ student, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }
});

// ===== STUDENT LOGIN =====
router.post("/student/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }
  try {
    const result = await query("SELECT * FROM students WHERE email = $1", [email]);
    const student = result.rows[0];
    if (!student) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, student.password_hash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    if (student.status !== "active") {
      return res.status(403).json({ message: "Account is not active" });
    }

    const token = signToken({ id: student.id, role: "student", email: student.email });
    delete student.password_hash;
    res.json({ student, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

// ===== ADMIN LOGIN =====
// Admins are seeded directly in DB (no public self-registration endpoint for security).
router.post("/admin/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }
  try {
    const result = await query("SELECT * FROM admins WHERE email = $1", [email]);
    const admin = result.rows[0];
    if (!admin) return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.password_hash);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken({ id: admin.id, role: "admin", email: admin.email });
    delete admin.password_hash;
    res.json({ admin, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }
});

// ===== CURRENT USER (works for both roles) =====
router.get("/me", async (req, res) => {
  res.json({ message: "Use /students/me or /admin/me with a Bearer token" });
});

export default router;
