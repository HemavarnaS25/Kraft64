import express from 'express';
import { addCourse } from '../controllers/courseController.js';

const router = express.Router();

router.post('/add', addCourse);


export default router;
