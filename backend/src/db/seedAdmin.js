/**
 * Run with: node src/db/seedAdmin.js "Admin Name" admin@learnpay.com "StrongPass123"
 */
import bcrypt from "bcryptjs";
import { pool } from "./pool.js";

async function seed() {
  const [full_name, email, password] = process.argv.slice(2);
  if (!full_name || !email || !password) {
    console.log('Usage: node src/db/seedAdmin.js "Admin Name" admin@learnpay.com "StrongPass123"');
    process.exit(1);
  }
  const password_hash = await bcrypt.hash(password, 10);
  try {
    const result = await pool.query(
      `INSERT INTO admins (full_name, email, password_hash)
       VALUES ($1, $2, $3)
       ON CONFLICT (email) DO NOTHING
       RETURNING id, email`,
      [full_name, email, password_hash]
    );
    if (result.rows.length) {
      console.log("✅ Admin created:", result.rows[0]);
    } else {
      console.log("⚠️ Admin with that email already exists.");
    }
  } catch (err) {
    console.error("❌ Failed to seed admin:", err.message);
  } finally {
    await pool.end();
  }
}

seed();
