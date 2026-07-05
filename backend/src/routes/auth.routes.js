import express from 'express';
const router = express.Router();
import { registerStudent } from '../controllers/auth.controller.js';
import { authenticateUser, authorizeUser } from '../middlewares/auth.middleware.js';

router.post('/register/student', authenticateUser, registerStudent);
// router.post('/login', )

export default router;