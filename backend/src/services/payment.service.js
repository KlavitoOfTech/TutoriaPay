import api from '../config/api.nomba.config.js'
import config from '../config/env.config.js';
import { getStudentEnrollments } from '../models/enrollment.model.js'
import { fetchStudentById } from '../models/student.model.js'
import { createVirtualAccount } from './nomba.service.js';

const fetchStudentEnrollmentsById = async (studentId) => {
    try{
        const enrollmentRes = await getStudentEnrollments(studentId)
        return enrollmentRes
    } catch (error) {
        console.error(error.message)
    }
}

const generatePaymentInvoice = async (studentId) => {
    try {
        const studentRes = await fetchStudentById(studentId);
        const invoiceRes = await createVirtualAccount (studentId, studentRes.full_name);
        return invoiceRes;
        console.log(studentRes)
    } catch (error) {
        console.error(error.response?.data || error.message)
    }
}

export { fetchStudentEnrollmentsById, generatePaymentInvoice, };

