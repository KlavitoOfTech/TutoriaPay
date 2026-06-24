import express from "express";
import { query } from "../db/pool.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

/**
 * NOTE: Nomba (or any other payment gateway) integration is NOT implemented yet.
 * For now, payments can only be recorded manually by an admin (e.g. bank transfer
 * confirmed offline) or marked as "pending" by a student initiating intent to pay.
 * This keeps the data model ready for a future automated gateway plug-in.
 */

// Student: create a payment intent (status = pending) for an enrollment
router.post("/", authenticate(["student"]), async (req, res) => {
  const { enrollment_id, amount, currency } = req.body;
  if (!enrollment_id || !amount) {
    return res.status(400).json({ message: "enrollment_id and amount are required" });
  }
  try {
    const enrollment = await query(
      "SELECT * FROM enrollments WHERE id = $1 AND student_id = $2",
      [enrollment_id, req.user.id]
    );
    if (!enrollment.rows.length) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    const result = await query(
      `INSERT INTO payments (student_id, enrollment_id, amount, currency, provider, status)
       VALUES ($1, $2, $3, $4, 'manual', 'pending') RETURNING *`,
      [req.user.id, enrollment_id, amount, currency || "NGN"]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create payment" });
  }
});

// Student: view own payments
router.get("/me", authenticate(["student"]), async (req, res) => {
  const result = await query(
    "SELECT * FROM payments WHERE student_id = $1 ORDER BY created_at DESC",
    [req.user.id]
  );
  res.json(result.rows);
});

// Admin: list all payments
router.get("/", authenticate(["admin"]), async (req, res) => {
  const result = await query(
    `SELECT p.*, s.full_name, s.email FROM payments p
     JOIN students s ON s.id = p.student_id
     ORDER BY p.created_at DESC`
  );
  res.json(result.rows);
});

// Admin: manually confirm a payment (e.g. after verifying bank transfer)
router.patch("/:id/confirm", authenticate(["admin"]), async (req, res) => {
  try {
    const result = await query(
      `UPDATE payments SET status = 'success', paid_at = NOW()
       WHERE id = $1 RETURNING *`,
      [req.params.id]
    );
    if (!result.rows.length) return res.status(404).json({ message: "Payment not found" });

    const payment = result.rows[0];
    if (payment.enrollment_id) {
      await query("UPDATE enrollments SET status = 'active' WHERE id = $1", [payment.enrollment_id]);
    }
    res.json(payment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to confirm payment" });
  }
});

// Admin: mark a payment as failed
router.patch("/:id/fail", authenticate(["admin"]), async (req, res) => {
  const result = await query(
    "UPDATE payments SET status = 'failed' WHERE id = $1 RETURNING *",
    [req.params.id]
  );
  if (!result.rows.length) return res.status(404).json({ message: "Payment not found" });
  res.json(result.rows[0]);
});

export default router;
