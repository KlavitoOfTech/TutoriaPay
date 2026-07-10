# TutoriaPay

TutoriaPay is a modern tutorial fee management platform that simplifies how students pay for courses and how administrators manage payments. It provides a seamless experience for course registration, payment tracking, and automated payment reconcilliation, with integration-ready support for Nomba payment services.

## ✨ Features

* Student authentication
* Admin authentication
* Browse and register courses
* Course payment management
* Payment history
* Payment success and failure pages
* Responsive modern UI
* Nomba payment integration
* Dashboard for students and administrators

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* React Router
* Lucide React

### Backend

* Node.js
* Express.js
* PostgreSQL
* Supabase Authentication

---

## 🚀 Getting Started

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

---

## 🔐 Demo Login Credentials

### 👨‍💼 Admin

**Email:** `admin@gmail.com`

**Password:** `nombaadmin`

---

### 👨‍🎓 Student

**Email:** `student@gmail.com`

**Password:** `nombastudent`

---

## 📂 Project Structure

```
src/
│── components/
│── pages/
│── layouts/
│── assets/
│── services/
│── hooks/
│── utils/
│── App.jsx
│── main.jsx
```

---

## 💳 Payment Flow

1. Student logs in.
2. Student browses available courses.
3. Student registers for selected courses.
4. Student proceeds to the payment page.
5. Transfer is made to the student virtual account.
6. Payment is processed through Nomba and reconcilled.
7. Payment status is displayed.
8. Successful payments are recorded in the payment history.

---

## 📌 Future Improvements

* Email notifications
* Receipt generation
* Student profile management
* Admin analytics dashboard
* Recurring payment support

---

## 👥 Demo Accounts

| Role    | Email               | Password       |
| ------- | ------------------- | -------------- |
| Admin   | `admin@gmail.com`   | `nombaadmin`   |
| Student | `student@gmail.com` | `nombastudent` |

---

Built with ❤️ for modern education payment management.
