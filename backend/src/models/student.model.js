import query from '../config/db.config.js'

const addStudent = async (studentData) => {
    const queryText = `INSERT INTO students 
    (id, full_name, email, phone_number) VALUES 
    ($1, $2, $3, $4)`
    const res = await query(queryText, [studentData.id, studentData.full_name, studentData.email, studentData.phone])
    return res.rows[0]
}
const listStudents = async () => {
    const queryText = `SELECT * FROM students`
    const res = await query(queryText, [])
    return res.rows
}
const fetchStudentById = async (id) => {
    const queryText = `SELECT * FROM students WHERE id = $1`
    const res = await query(queryText, [id])
    return res.rows[0]
}
export {addStudent, listStudents, fetchStudentById};