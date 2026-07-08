import { fetchInvoice, fetchWallet } from "../models/payment.model.js";
import { fetchStudentById } from "../models/student.model.js"
import { fetchStudentEnrollmentsById } from "./payment.service.js";

const fetchStudentDashboardInformation = async (studentId) => {
    try {
        const studentRes = await fetchStudentById(studentId);
        const enrollmentRes = await fetchStudentEnrollmentsById(studentId);
        const invoiceRes = await fetchInvoice(studentId); 
        const walletBalance = await fetchWallet(studentId)     
        if (!enrollmentRes || !invoiceRes){
            return {
                student: studentRes,
                enrollment: enrollmentRes,
                payments: {
                    totalFee: 0.00,
                    totalPaid: 0.00,
                    outstanding: 0.00,
                    wallet: 0.00
                }
            };
        }       
        const outstandingFee = (Number(invoiceRes.expected_amount) - Number(invoiceRes.amount_paid)) || 0;
        return {
            student: studentRes,
            enrollment: enrollmentRes,
            payments: {
                totalFee: Number(invoiceRes.expected_amount),
                totalPaid: Number(invoiceRes.amount_paid),
                outstanding: outstandingFee,
                wallet: walletBalance || 0.00
            }
        };
    } catch (error) {
        console.error(error.response?.data || error.message)
    }
}
export {fetchStudentDashboardInformation};