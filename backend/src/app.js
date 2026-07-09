import express from 'express';
import cors from 'cors';
import studentRoutes from './routes/student.routes.js';
import courseRoutes from './routes/course.routes.js';
import enrollmentRoutes from './routes/enrollment.routes.js';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import webhookRoutes from './routes/webhook.routes.js'

const app = express();
app.use((req, res, next) => {
    console.log(`➡️ Incoming Request: ${req.method} ${req.url}`);
    next();
});

app.use(cors());
app.use(express.json());
app.use('/api/v1/webhooks', webhookRoutes)

// Server health check
app.get('/api/health', (req, res) => {
    res.status(200).send('Server is awake!');
});

app.use('/api/v1/students', studentRoutes)
app.use('/api/v1/courses', courseRoutes)
app.use('/api/v1/enrollments', enrollmentRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/admin', adminRoutes)
app.use('/api/v1/payments', paymentRoutes)



export default app;