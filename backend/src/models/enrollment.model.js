import query from '../config/db.config.js'

const enrollStudentInCourse = async (studentId, courseId) => {
    const queryText = `INSERT INTO enrollments (student_id, course_id) VALUES ($1, $2)`;
    const res = await query(queryText, [studentId, courseId]);
    return res.rows[0];
}

const getStudentEnrollments = async (studentId) => {
    const queryText = `SELECT title, price 
    FROM enrollments 
    JOIN courses ON enrollments.course_id = courses.id
    WHERE student_id = $1`;
    const res = await query(queryText, [studentId]);
    console.log(res.rows)
    return res.rows;
}

export { enrollStudentInCourse, getStudentEnrollments };
