-- LearnPay Database Schema (PostgreSQL)

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ========== STUDENTS ==========
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'active', -- active | suspended
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ========== ADMINS ==========
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin', -- admin | superadmin
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========== COURSES ==========
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(200) NOT NULL,
  description TEXT,
  price NUMERIC(12,2) NOT NULL DEFAULT 0,
  duration_weeks INT,
  status VARCHAR(20) DEFAULT 'active', -- active | archived
  created_by UUID REFERENCES admins(id) ON DELETE SET NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ========== ENROLLMENTS ==========
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  status VARCHAR(20) DEFAULT 'pending', -- pending | active | completed | cancelled
  enrolled_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (student_id, course_id)
);

-- ========== PAYMENTS ==========
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  enrollment_id UUID REFERENCES enrollments(id) ON DELETE SET NULL,
  amount NUMERIC(12,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'NGN',
  provider VARCHAR(30) DEFAULT 'manual', -- manual | nomba (future)
  provider_reference VARCHAR(150),
  status VARCHAR(20) DEFAULT 'pending', -- pending | success | failed
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);

-- ========== VIRTUAL ACCOUNTS ==========
-- Reserved for future Nomba (or other PSP) virtual account integration.
CREATE TABLE IF NOT EXISTS virtual_accounts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  provider VARCHAR(30) DEFAULT 'nomba',
  account_number VARCHAR(20),
  bank_name VARCHAR(100),
  account_reference VARCHAR(150),
  status VARCHAR(20) DEFAULT 'inactive', -- inactive | active
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);
CREATE INDEX IF NOT EXISTS idx_payments_student ON payments(student_id);
