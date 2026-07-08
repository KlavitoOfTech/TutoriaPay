import query from '../config/db.config.js'

const addVirtualAccount = async (studentId, virtualAccountData) => {
    const {accountRef, accountName, bankName, bankAccountNumber, bankAccountName} = virtualAccountData
    const queryText = `INSERT INTO 
        virtual_accounts (student_id, account_number, bank_name, account_name, account_ref) 
        VALUES ($1, $2, $3, $4, $5)`
    const res = await query(queryText, [studentId, bankAccountNumber, bankName, bankAccountName, accountRef])
}

const addInvoice = async (studentId, expectedAmount) => {
    const queryText = `INSERT INTO 
        invoices (student_id, expected_amount) 
        VALUES ($1, $2)`
    const res = await query(queryText, [studentId, expectedAmount])
}

const fetchInvoice = async (studentId) => {
    const queryText = `SELECT * FROM invoices WHERE student_id = $1`;
    const res = await query(queryText, [studentId]);
    return res.rows[0];
}

const fetchInvoiceAndVa = async (studentId) => {
    const queryText = `SELECT account_number, bank_name, account_name, expected_amount
        FROM invoices 
        JOIN virtual_accounts ON invoices.student_id = virtual_accounts.student_id
        WHERE virtual_accounts.student_id = $1`;
    const res = await query(queryText, [studentId]);
    return res.rows[0];
}

const fetchVirtualAccount = async (accountRef) => {
    const queryText = `SELECT * FROM virtual_accounts WHERE account_ref = $1`;
    const res = await query(queryText, [accountRef]);
    return res.rows[0];
}

const updateInvoice = async (amountPaid, status, accountRef) => {
    const queryText = `UPDATE invoices 
        SET amount_paid = $1, status = $2 
        WHERE account_ref = $3`;
    const res = await query(queryText, [amountPaid, status, accountRef]);
}

const updateInvoiceAmount =  async (newAmount, studentId) => {
    const queryText = `UPDATE invoices 
        SET expected_amount = $1 
        WHERE student_id = $2`;
    const res = await query(queryText, [newAmount, studentId]);
}

const addPayment = async (invoiceId, amountReceived, paymentRef, webhookPayload) => {
    const queryText = `INSERT INTO 
        payments (invoice_id, amount_received, payment_ref, raw_webhook_payload)
        VALUES ($1, $2, $3, $4)`
    const res = await query(queryText, [invoiceId, amountReceived, paymentRef, webhookPayload]);
}

const fetchPayment = async (paymentRef) => {
    const queryText = `SELECT * FROM payments WHERE payment_ref = $1`;
    const res = await query(queryText, [paymentRef]);
    return res.rows[0];
}

const addWallet = async (studentId, balance) => {
    const queryText = `INSERT INTO 
        wallets (student_id, balance)
        VALUES ($1, $2)`
    const res = await query(queryText, [studentId, balance]);
}

const updatewallet = async (balance, studentId) => {
    const queryText = `UPDATE wallets
        SET balance = $1 
        WHERE student_id = $2`;
    const res = await query(queryText, [balance, studentId]);
}

const fetchWallet = async (studentId) => {
    const queryText = `SELECT balance FROM wallets WHERE student_id = $1`;
    const res = await query(queryText, [studentId]);
    return res.rows[0];
}
export { updateInvoiceAmount, addVirtualAccount, addInvoice, fetchInvoice, fetchInvoiceAndVa, fetchVirtualAccount, updateInvoice, addPayment, fetchPayment, addWallet, updatewallet, fetchWallet }