import {addStudent, listStudents, fetchStudentById} from '../models/student.model.js'

const fetchStudents = async (req, res) => {
    try{
        const students = await listStudents();
        res.status(200).json(students);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching students' });
    }
}
const getStudentById = async (req, res) => {
    try{
        const studentId = req.user.id; // Assuming the authenticated user's ID is available in req.user.id

        if (!studentId) {
            return res.status(400).json({ message: 'Student ID is required' });
        };
        const student = await fetchStudentById(studentId);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        };
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching student' });
    }
}
const updateStudent = async (req, res) => {
    try{

    }
    catch (error) {

    }
}
const deleteStudent = async (req, res) => {
    try{

    }
    catch (error) {

    }
}

export { fetchStudents, getStudentById, updateStudent, deleteStudent };