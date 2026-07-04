import query from '../config/db.config.js'

const addStudent = async (name, email, phone) => {
    const queryText = `INSERT INTO students (student_id, full_name, email_address, phone_number) VALUES (gen_random_uuid(), $1, $2, $3)`
    await query(queryText, [name, email, phone])
}
const listStudents = async () => {
    const queryText = `SELECT * FROM students`
    const res = await query(queryText, [])
    return res.rows
}
const fetchStudentById = async (id) => {
    const queryText = `SELECT * FROM students WHERE email_address = $1`
    const res = await query(queryText, [id])
    return res.rows[0]
}
export {addStudent, listStudents, fetchStudentById};