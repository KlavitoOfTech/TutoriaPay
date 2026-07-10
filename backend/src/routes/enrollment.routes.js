import express from 'express';
const router = express.Router();
import { enrollStudent, getEnrollmentData } from '../controllers/enrollment.controller.js';
import { authenticateUser, authorizeUser } from '../middlewares/auth.middleware.js';

router.post('/', authenticateUser, authorizeUser('student'), enrollStudent);
router.get('/', authenticateUser, authorizeUser('admin'), getEnrollmentData);


export default router;