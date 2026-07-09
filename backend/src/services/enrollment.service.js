import { listCourses } from "../models/course.model.js";
import { enrollStudentInCourse, getAllEnrollments, getCourseEnrollment, getStudentEnrollments } from "../models/enrollment.model.js";
import { fetchInvoice, updateInvoice,addInvoice, updateInvoiceAmount } from "../models/payment.model.js"

const enrollAndCreateInvoice = async (studentId, courseId) => {
    try{
        await enrollStudentInCourse(studentId, courseId);
        const enrollmentRes = await getCourseEnrollment(studentId, courseId);
        const invoiceRes = await fetchInvoice(studentId);
        if (!invoiceRes) {
            await addInvoice(studentId, 0);
            const newAmount = Number(enrollmentRes.price);
            await updateInvoiceAmount(newAmount, studentId);
            return;
        }
        const newAmount = Number(enrollmentRes.price) + Number(invoiceRes.expected_amount);
        await updateInvoiceAmount(newAmount, studentId);
        return;
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
}

const getListOfEnrolledStudents = async () => {
    try{
        const courseRes = await listCourses();
        const courses = await Promise.all(
            courseRes.map(async (course) => {
                const enrollmentRes = await getAllEnrollments(course.id);
                return {
                    course: course.title,
                    enrollments: enrollmentRes.length,
                };
            })
        );
        return courses
        //console.log(courses);
    } catch (error) {
        console.error(error.response?.data || error.message);
    }
}
export { enrollAndCreateInvoice, getListOfEnrolledStudents }