import { enrollStudentInCourse } from '../models/enrollment.model.js';

const enrollStudent = async (req, res) => {
    try {
        const courseId = req.body.course_id;
        const studentId = req.user.id;
        const enrollment = await enrollStudentInCourse(studentId, courseId);
        res.status(201).json(enrollment);
    } catch (error) {
        console.error("Error enrolling student in course:", error.response?.data?.message || error.message);
        res.status(500).json({ message: "Error enrolling student in course" });
    }
}
export { enrollStudent };