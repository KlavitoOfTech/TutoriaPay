import api from '../config/api.nomba.config.js'
import config from '../config/env.config.js';
import { getStudentEnrollments } from '../models/enrollment.model.js'
import { fetchStudentById } from '../models/student.model.js'
import { fetchInvoice, addInvoice, addVirtualAccount, fetchInvoiceAndVa } from '../models/payment.model.js';
import { createVirtualAccount } from './nomba.service.js';

const fetchStudentEnrollmentsById = async (studentId) => {
    try{
        const enrollmentRes = await getStudentEnrollments(studentId)
        return enrollmentRes
    } catch (error) {
        console.error(error.message)
    }
}

const fetchPaymentInvoice = async (studentId) => {
    try {
        const invoiceRes = await fetchInvoiceAndVa(studentId); // fetch all the details to be on the invoice from student invoice and VA data
        if (!invoiceRes) {
            const invoiceData = await generateInvoice(studentId) // generate invoice and VA if non exists for the student
            return //invoiceData
        }
        //console.log(invoiceRes)
        return invoiceRes;
    } catch (error) {
        console.error(error.response?.data || error.message)
    }
}

const generateInvoice = async (studentId) => {
    try {
        const studentRes = await fetchStudentById(studentId); // fetch student data
        //await addInvoice(studentId, expectedAmount); // add student invoice details to database
        const invoiceRes = await fetchInvoice(studentId); // fetch only invoice data to be used in VA creation
        const vaRes = await createVirtualAccount (invoiceRes.account_ref, studentRes.full_name); // create nomba virtual account
        await addVirtualAccount(studentId, vaRes); // Add VA data to the database
        const invoiceData = await fetchInvoiceAndVa(studentId); // fetch data needed on the invoice from invoice and VA table
        //console.log(vaRes)
        return invoiceData;
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
}

const fetchPaymentStatus = async (studentId) => {
    try {
        const invoiceRes = await fetchInvoice(studentId); // fetch all the details on invoice
        const paymentRes = await fetchPaymentStatus(invoiceRes.id)
        if (!invoiceRes) {
            const invoiceData = await generateInvoice(studentId) // generate invoice and VA if non exists for the student
            return //invoiceData
        }
        //console.log(invoiceRes)
        return invoiceRes;
    } catch (error) {
        console.error(error.response?.data || error.message)
    }
}

export { fetchStudentEnrollmentsById, fetchPaymentInvoice, fetchPaymentStatus };

