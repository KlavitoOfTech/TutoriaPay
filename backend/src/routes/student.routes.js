import express from "express";
const router = express.Router();
import {getStudents, getStudentById, createStudent, updateStudent, deleteStudent} from '../controllers/student.controllers.js';
import {authenticateUser, authorizeUser} from '../middlewares/auth.middleware.js';

router.get('/:id', authenticateUser, authorizeUser('student'), getStudentById);
router.put('/:id', authenticateUser, authorizeUser('student'), updateStudent);

export default router;