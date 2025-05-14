// backend/controllers/courseController.js

const Trainer = require('../models/Trainer'); // Your Mongoose model

// GET all trainers
const getAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.find();
    res.status(200).json(trainers);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trainers', error });
  }
};

// POST create a new trainer
const createTrainer = async (req, res) => {
  try {
    const { name, place, mode, contact, email, experience, courseName, courseId, category } = req.body;
    const newTrainer = new Trainer({
      name,
      place,
      mode,
      contact,
      email,
      experience,
      courseName,
      courseId,
      category,
    });

    await newTrainer.save();
    res.status(201).json({ message: 'Trainer added successfully', trainer: newTrainer });
  } catch (error) {
    res.status(500).json({ message: 'Failed to add trainer', error });
  }
};

module.exports = {
  getAllTrainers,
  createTrainer,
};
