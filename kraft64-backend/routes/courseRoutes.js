// courseRoutes.js
import express from 'express';
import { addCourse, getCoursesByTrainer } from '../controllers/courseController.js';

const router = express.Router();

router.post('/add', addCourse);
router.get('/trainer/:trainerId', getCoursesByTrainer);

export default router;  // Default export
