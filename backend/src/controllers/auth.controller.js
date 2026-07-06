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

const loginAdmin = async (req, res) => {
    try {
        // If the user is authenticated and authorized, send a success response
        res.status(200).json({ message: 'Admin login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in as admin' });
    }
}
export { registerStudent, loginAdmin };