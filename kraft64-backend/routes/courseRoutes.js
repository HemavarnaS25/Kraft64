import express from 'express';
import { addCourse, getCoursesByTrainer, enrollStudent } from '../controllers/courseController.js';

const router = express.Router();

// Add a course
router.post('/add', addCourse);

// Get all courses for a trainer
router.get('/trainer/:trainerId', getCoursesByTrainer);

// Enroll student in a course
router.post('/join/:courseId', enrollStudent);

export default router;
