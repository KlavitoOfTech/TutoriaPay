import query from '../config/db.config.js'

const addCourse = async (courseData) => {
    const queryText = `INSERT INTO 
    courses (title, description, price) 
    VALUES ($1, $2, $3)`
    const res = await query(queryText, [courseData.title, courseData.description, courseData.price])
    return res.rows[0]
}

const listCourses = async () => {
    const queryText = `SELECT * FROM courses`
    const res = await query(queryText, [])
    return res.rows
}   
export {addCourse, listCourses};