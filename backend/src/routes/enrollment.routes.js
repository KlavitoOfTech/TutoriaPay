import express from 'express';
const router = express.Router();
import { enrollStudent } from '../controllers/enrollment.controller.js';
import { authenticateUser, authorizeUser } from '../middlewares/auth.middleware.js';

router.post('/', authenticateUser, authorizeUser('student'), enrollStudent);

export default router;