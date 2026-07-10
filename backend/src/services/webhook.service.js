import { fetchInvoice, updateInvoice, updatewallet, fetchVirtualAccount, addWallet, fetchPayment, fetchWallet, addPayment } from "../models/payment.model.js";

const reconcilePayment = async (payloadData) => {
    try {
        const {transaction} = payloadData; // destructure payload data
        const { transactionId, transactionAmount, aliasAccountReference } = transaction   // destructure transaction in payload data

        // Check for duplicate payment
        const paymentRes = await fetchPayment(transactionId);
        if (paymentRes) {
            return;
        }

        // Fetch existing virtual account data
        const virtualAccountRes = await fetchVirtualAccount(aliasAccountReference);
        if (!virtualAccountRes) {
            throw new Error('Anonymous payment detected');
        };

        // Fetch existing invoice
        const studentId = virtualAccountRes.student_id;
        const invoiceRes = await fetchInvoice(studentId);
        if (!invoiceRes) {
            await handleOverpayment(studentId, transactionAmount)
            return;
        }

        // Update payment log
        await addPayment(invoiceRes.id, transactionAmount, transactionId, payloadData)

        // Handle reconciliation logic
        const totalPaid = Number(invoiceRes.amount_paid) + Number(transactionAmount);
        const amountLeft = Number(invoiceRes.expected_amount) - Number(totalPaid);

        // Handle full payment
        if (amountLeft == 0) {
            const status = 'paid'
            await updateInvoice(totalPaid, status, amountLeft, aliasAccountReference);
            return;
        }

        // Handle over payment
        if (amountLeft < 0) {
            const status = 'paid'
            const balance = Number(totalPaid) - Number(invoiceRes.expected_amount)
            await handleOverpayment (studentId, balance)
            await updateInvoice(totalPaid, status, amountLeft, aliasAccountReference);
            return;
        }

        // Handle under payment
        const status = 'partially_paid'
        await updateInvoice(totalPaid, status, amountLeft, aliasAccountReference);
    } 
    catch (error) {
        console.error(error.response?.data || error.message);
    }

}

const handleOverpayment = async (studentId, transactionBalance) => {
    try{
        const newBalance = Number(walletRes.balance) + Number(transactionBalance)  // Calculate new wallet balance
        const walletRes = await fetchWallet(studentId);  // Fetch existing wallet
        if (!walletRes) {
            await addWallet(studentId, transactionBalance);  // Create new wallet if none exists
            await updatewallet(newBalance, studentId);
            return;
        }
        await updatewallet(newBalance, studentId);  // Update wallet with new balance
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
}
export {reconcilePayment}