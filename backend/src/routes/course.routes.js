import express from 'express';
const router = express.Router();
import { registerCourse, fetchCourses } from '../controllers/courses.controller.js';
import { authenticateUser, authorizeUser } from '../middlewares/auth.middleware.js';

router.post('/', authenticateUser, authorizeUser('admin'), registerCourse);
router.get('/', authenticateUser, fetchCourses);

export default router;