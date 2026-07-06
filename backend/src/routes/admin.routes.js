import express from 'express';
const router = express.Router();
import { loginAdmin } from '../controllers/auth.controller.js';
import { authenticateUser, authorizeUser } from '../middlewares/auth.middleware.js';

router.get('/login', authenticateUser, authorizeUser('admin'), loginAdmin);

export default router;