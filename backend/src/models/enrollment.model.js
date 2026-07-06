import query from '../config/db.config.js'

const enrollStudentInCourse = async (studentId, courseId) => {
    const queryText = `INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2)`;
    const res = await query(queryText, [studentId, courseId]);
    return res.rows[0];
}

const getEnrollmentsByStudentId = async (studentId) => {
    const queryText = `SELECT * FROM enrollments WHERE student_id = $1`;
    const res = await query(queryText, [studentId]);
    return res.rows;
}

export { enrollStudentInCourse, getEnrollmentsByStudentId };
