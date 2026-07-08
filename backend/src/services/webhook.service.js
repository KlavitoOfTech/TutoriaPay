import { fetchInvoice, updateInvoice, updatewallet, fetchVirtualAccount, addWallet, fetchPayment, fetchWallet, addPayment } from "../models/payment.model.js";

const reconcilePayment = async (payloadData) => {
    try {
        const {transactionId, transactionAmount, accountReference} = payloadData;     
        const paymentRes = await fetchPayment(transactionId); // checks for duplicate payment
        if (paymentRes) {
            return;
        }
        const virtualAccountRes = fetchVirtualAccount(accountReference);
        if (!virtualAccountRes) {
            throw new Error('Anonymous payment detected');
        };
        const studentId = virtualAccountRes.studentId;
        const invoiceRes = await fetchInvoice(studentId);
        if (!invoiceRes) {
            await handleOverpayment(studentId, transactionAmount)
            return;
        }
        await addPayment(invoiceRes.id, transactionAmount, transactionId, payloadData)
        const totalPaid = Number(invoiceRes.amount_paid) + Number(transactionAmount);
        const amountLeft = Number(invoiceRes.expected_amount) - Number(totalPaid);
        if (amountLeft == 0) {
            const status = 'Paid'
            await updateInvoice(totalPaid, status, accountReference);
            return;
        }
        if (amountLeft < 0) {
            const status = 'Paid'
            const balance = Number(totalPaid) - Number(invoiceRes.expected_amount)
            await handleOverpayment (studentId, balance)
            await updateInvoice(totalPaid, status, accountReference);
            return;
        }
        const status = 'Partially paid'
        await updateInvoice(totalPaid, status, accountReference);
    } 
    catch (error) {
        console.error(error.response?.data || error.message);
    }

}

const handleOverpayment = async (studentId, transactionBalance) => {
    try{
        const walletRes = await fetchWallet(studentId);
        if (!walletRes) {
            await addWallet(studentId, transactionBalance);
            return;
        }
        const newBalance = Number(walletRes.balance) + Number(transactionBalance)
        await updatewallet(newBalance, studentId);
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
}
export {reconcilePayment}