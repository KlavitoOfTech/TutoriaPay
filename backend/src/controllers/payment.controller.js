import { fetchStudentEnrollmentsById, fetchPaymentInvoice } from "../services/payment.service.js";

const fetchStudentEnrollments = async(req, res) => {
    try {
        const studentId = req.user.id;
        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        };
        const enrolledCourses = await fetchStudentEnrollmentsById(studentId);
        if (!enrolledCourses) {
            return res.status(404).json({ message: 'Enrolled courses not found' });
        };
        res.status(200).json(enrolledCourses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching courses' });
    }
}

const getPaymentInvoice = async(req, res) => {
    try {
        const studentId = req.user.id;
        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        };
        const invoiceRes = await fetchPaymentInvoice(studentId)
        if (!invoiceRes) {
            return res.status(404).json({ message: 'invoice not found' });
        };
        console.log(invoiceRes) 
        res.status(200).json(invoiceRes);
    } catch (error) {
        res.status(500).json({ message: 'Error getting invoice' });
    }
}
export { fetchStudentEnrollments, getPaymentInvoice }