import { createStudent } from '../services/auth.service.js'

const registerStudent = async (req, res) => {
    try{
        const studentData = req.body
        const studentId = req.user.id;
        studentData.id = studentId; // Assign the authenticated user's ID to the studentData object

        if (!studentData.full_name || !studentData.email || !studentData.phone || !studentData.id) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const studentRes = await createStudent(studentData)
        res.status(201).json({ message: 'Student registered successfully', student: studentRes });
    }
    catch (error) {
        res.status(500).json({ message: 'Error registering student' });
    }
}

export { registerStudent };