import query from '../config/db.config.js'

const createSchema = async () => {
    const queryText = `
        CREATE TABLE IF NOT EXISTS students (
            student_id UUID PRIMARY KEY,
            full_name TEXT NOT NULL,
            email_address TEXT UNIQUE NOT NULL,
            phone_number TEXT,
            subjects_offered TEXT[] DEFAULT '{}',
            status TEXT DEFAULT 'Pending',
            wallet_balance NUMERIC(12, 2) DEFAULT 0.00,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
        CREATE TABLE IF NOT EXISTS subjects (
            subject_title TEXT PRIMARY KEY,
            no_of_students_enrolled INT, 
            subject_cost NUMERIC(12, 2)
        );
        CREATE TABLE IF NOT EXISTS virtual_accounts (
            account_id UUID PRIMARY KEY,
            student_id UUID,
            account_number TEXT,
            account_name TEXT,
            account_ref TEXT,
            account_status BOOLEAN
        );
    `;
    await query(queryText, []);
};

export { createSchema };