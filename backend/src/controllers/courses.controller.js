import { addCourse, listCourses } from '../models/course.model.js';

const registerCourse = async (req, res) => {
    try {
        const courseData = req.body;
        if (!courseData.title || !courseData.description || !courseData.price) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const courseRes = await addCourse(courseData);
        res.status(201).json({ message: 'Course registered successfully', course: courseRes });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}

const fetchCourses = async (req, res) => {
    try {
        const courses = await listCourses();
        res.status(200).json(courses);
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error' });
    }
}
export { registerCourse, fetchCourses };