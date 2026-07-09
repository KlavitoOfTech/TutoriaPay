import { enrollAndCreateInvoice, getListOfEnrolledStudents } from "../services/enrollment.service.js";

const enrollStudent = async (req, res) => {
    try {
        const courseId = req.body.course_id;
        const studentId = req.user.id;
        const enrollment = await enrollAndCreateInvoice(studentId, courseId);
        res.status(201).json(enrollment);
    } catch (error) {
        console.error("Error enrolling student in course:", error.response?.data?.message || error.message);
        res.status(500).json({ message: "Error enrolling student in course" });
    }
}

const getEnrollmentData = async (req, res) => {
    try {
        const enrollments = await getListOfEnrolledStudents();
        // if (!enrollments) {
        //     return res.status(404).json({ message: 'Enrollments not found' });
        // };
        //console.log(enrollments)
        res.status(200).json(enrollments);
    } catch (error) {
        res.status(500).json({ message: "Error getting enrollments" });
    }
}
export { enrollStudent, getEnrollmentData };