import express from "express";
const router = express.Router();
import {getStudentDashboardInfo, fetchStudents} from '../controllers/student.controllers.js';
import {authenticateUser, authorizeUser} from '../middlewares/auth.middleware.js';

router.get('/me/dashboard', authenticateUser, authorizeUser('student'), getStudentDashboardInfo);
router.get('/', authenticateUser, authorizeUser('admin'), fetchStudents);

export default router;