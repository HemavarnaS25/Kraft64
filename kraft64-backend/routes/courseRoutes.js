import express from 'express';
import { addCourse } from '../controllers/courseController.js';

const router = express.Router();

router.post('/add', addCourse);
router.get('/trainer/:trainerId', getCoursesByTrainer);


export default router;
