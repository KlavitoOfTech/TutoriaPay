import express from 'express';
const router = express.Router();
import { registerStudent } from '../controllers/auth.controller.js';
import { authenticateUser, authorizeUser } from '../middlewares/auth.middleware.js';

router.post('/student/register', registerStudent);
// router.post('/login/student', loginUser);

export default router;