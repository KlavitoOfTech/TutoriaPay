import express from 'express';
const router = express.Router();
import { fetchStudentEnrollments, getPaymentInvoice } from '../controllers/payment.controller.js';
import { authenticateUser, authorizeUser } from '../middlewares/auth.middleware.js';

router.get('/me', authenticateUser, authorizeUser('student'), fetchStudentEnrollments);
router.get('/me/invoice', authenticateUser, authorizeUser('student'), getPaymentInvoice);

export default router;