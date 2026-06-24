# LearnPay

Full-stack student payment management application.

**Stack:** React (Vite) + TailwindCSS · Node.js/Express · PostgreSQL

> Nomba (or any payment gateway) integration is **not implemented yet**. Payments are currently recorded manually (student creates a pending payment, admin confirms it). The `payments` and `virtual_accounts` tables/routes are structured so a gateway can be plugged in later without schema changes.

## 1. Folder Structure

```
learnpay/
├── backend/
│   ├── schema.sql                 # Full DB schema
│   ├── .env.example
│   ├── package.json
│   └── src/
│       ├── server.js              # Express app entry
│       ├── db/
│       │   ├── pool.js            # pg Pool connection
│       │   ├── migrate.js         # Runs schema.sql
│       │   └── seedAdmin.js       # CLI script to create first admin
│       ├── middleware/
│       │   └── auth.js            # JWT verification + role guard
│       └── routes/
│           ├── auth.js             # register/login (student + admin)
│           ├── students.js
│           ├── courses.js
│           ├── enrollments.js
│           ├── payments.js         # manual-only for now
│           └── virtualAccounts.js  # placeholder, 501 until Nomba added
│
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── .env.example
    └── src/
        ├── main.jsx
        ├── App.jsx                 # routes
        ├── index.css
        ├── api/axios.js            # axios instance with auth header
        ├── context/AuthContext.jsx # shared login/register/logout state
        ├── components/
        │   ├── Navbar.jsx
        │   └── ProtectedRoute.jsx
        └── pages/
            ├── Home.jsx
            ├── Register.jsx        # student registration
            ├── Login.jsx            # student login
            ├── AdminLogin.jsx
            ├── Courses.jsx          # browse + enroll
            ├── Dashboard.jsx        # student dashboard
            └── AdminDashboard.jsx   # course mgmt, students, enrollments, payments
```

## 2. Database Schema

See `backend/schema.sql`. Tables: `students`, `admins`, `courses`, `enrollments`, `payments`, `virtual_accounts`, with foreign keys linking enrollments/payments back to students and courses, and `virtual_accounts` reserved for future PSP (Nomba) integration.

## 3. Backend API Routes

| Method | Route | Access | Description |
|---|---|---|---|
| POST | `/api/auth/student/register` | Public | Register a student, returns JWT |
| POST | `/api/auth/student/login` | Public | Student login, returns JWT |
| POST | `/api/auth/admin/login` | Public | Admin login, returns JWT |
| GET | `/api/students/me` | Student | Own profile |
| GET | `/api/students/me/dashboard` | Student | Enrollments + payments summary |
| GET | `/api/students` | Admin | List all students |
| PATCH | `/api/students/:id/status` | Admin | Suspend/activate student |
| GET | `/api/courses` | Public | List active courses |
| POST | `/api/courses` | Admin | Create course |
| PUT | `/api/courses/:id` | Admin | Update course |
| DELETE | `/api/courses/:id` | Admin | Archive course |
| POST | `/api/enrollments` | Student | Enroll in a course (status: pending) |
| GET | `/api/enrollments/me` | Student | Own enrollments |
| GET | `/api/enrollments` | Admin | All enrollments |
| POST | `/api/payments` | Student | Create pending payment for an enrollment |
| GET | `/api/payments/me` | Student | Own payment history |
| GET | `/api/payments` | Admin | All payments |
| PATCH | `/api/payments/:id/confirm` | Admin | Confirm payment → activates enrollment |
| GET/POST | `/api/virtual-accounts` | Student/Admin | Placeholder, returns 501 on create (Nomba pending) |

## 4. Frontend Pages

- `/` – Home/landing
- `/register` – Student registration
- `/login` – Student login
- `/admin/login` – Admin login
- `/courses` – Browse + enroll in courses
- `/dashboard` – Student dashboard (enrollments, "Pay Now", payment history)
- `/admin/dashboard` – Admin dashboard (create courses, manage students, view enrollments, confirm payments)

## 5. Authentication Flow

1. Student registers or logs in → backend issues a JWT (`{ id, role: "student", email }`) signed with `JWT_SECRET`.
2. Admin logs in (admins are seeded via `seedAdmin.js`, no public self-signup) → JWT with `role: "admin"`.
3. Frontend stores the token + user object in `localStorage` via `AuthContext`.
4. Every API request attaches `Authorization: Bearer <token>` (axios interceptor).
5. Backend's `authenticate([roles])` middleware verifies the JWT and checks the role matches the route's allowed roles, rejecting with 401/403 otherwise.
6. `ProtectedRoute` on the frontend redirects unauthenticated users to the correct login page, and blocks cross-role access (e.g. a student can't open `/admin/dashboard`).

## Getting Started

### Backend
```bash
cd backend
cp .env.example .env   # fill in DATABASE_URL and JWT_SECRET
npm install
npm run migrate        # creates tables from schema.sql
node src/db/seedAdmin.js "Super Admin" admin@learnpay.com "StrongPass123"
npm run dev             # http://localhost:5000
```

### Frontend
```bash
cd frontend
cp .env.example .env
npm install
npm run dev              # http://localhost:5173
```

## Next Steps (not yet implemented)
- Nomba virtual account creation + webhook for automatic payment confirmation
- Email notifications (registration, payment receipts)
- Password reset flow
- Pagination/filtering on admin tables
