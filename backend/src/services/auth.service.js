import { addStudent } from '../models/student.model.js'

const createStudent = async (studentData) => {
    try{
        const studentRes = await addStudent(studentData)
        return studentRes
    }
    catch (error) {
        throw new Error('Error registering student');
    }
}

export { createStudent };