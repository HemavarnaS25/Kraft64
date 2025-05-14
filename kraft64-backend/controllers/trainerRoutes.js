// backend/routes/trainerRoutes.js

const express = require('express');
const router = express.Router();
const { getAllTrainers, createTrainer } = require('../controllers/courseController');

router.get('/trainers', getAllTrainers);
router.post('/add', createTrainer);

module.exports = router;
