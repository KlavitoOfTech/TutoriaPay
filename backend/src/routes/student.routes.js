import express from "express";
const router = express.Router();
import {getStudentById, fetchStudents} from '../controllers/student.controllers.js';
import {authenticateUser, authorizeUser} from '../middlewares/auth.middleware.js';

router.get('/me/dashboard', authenticateUser, authorizeUser('student'), getStudentById);
router.get('/', authenticateUser, authorizeUser('admin'), fetchStudents);

export default router;