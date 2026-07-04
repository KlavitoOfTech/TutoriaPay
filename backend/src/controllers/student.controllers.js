import {addStudent, listStudents, fetchStudentById} from '../models/student.models.js'

const getStudents = async (req, res) => {
    try{
        const students = await listStudents()
        res.json(students)
    }
    catch (error) {

    }
}
const getStudentById = async (req, res) => {
    try{
        const {id} = req.params
        if (!id) {
            return res.status(400).json({ message: 'Student ID is required' });
        };
        const student = await fetchStudentById(id);
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        };
        res.json(student.full_name);
    }
    catch (error) {
        res.status(500).json({ message: 'Error fetching student' });
    }
}
const createStudent = async (req, res) => {
    try{
        const {name, email, phone} = req.body
        if (!name || !email || !phone) {
            return res.status(400).json({ message: 'Name, email, and phone are required' });
        }
        await addStudent(name, email, phone)
        res.status(201).json({ message: 'Student created successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Error creating student' });
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

export { getStudents, getStudentById, createStudent, updateStudent, deleteStudent };