import express from "express";
import { query } from "../db/pool.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

/**
 * VIRTUAL ACCOUNTS — PLACEHOLDER ONLY.
 * This table/routes exist so the schema and frontend can be built against a
 * stable shape now. Actual creation of real virtual accounts via Nomba (or
 * any other PSP) is intentionally NOT implemented yet.
 */

// Student: view own virtual account (if any)
router.get("/me", authenticate(["student"]), async (req, res) => {
  const result = await query(
    "SELECT * FROM virtual_accounts WHERE student_id = $1",
    [req.user.id]
  );
  res.json(result.rows[0] || null);
});

// Admin: list all virtual accounts
router.get("/", authenticate(["admin"]), async (req, res) => {
  const result = await query(
    `SELECT v.*, s.full_name, s.email FROM virtual_accounts v
     JOIN students s ON s.id = v.student_id
     ORDER BY v.created_at DESC`
  );
  res.json(result.rows);
});

// Placeholder endpoint — returns 501 until a provider is integrated
router.post("/", authenticate(["student"]), async (req, res) => {
  res.status(501).json({
    message: "Virtual account provisioning is not implemented yet (Nomba integration pending).",
  });
});

export default router;
