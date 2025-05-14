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

    // Ensure that required fields are provided
    if (!name || !place || !mode || !contact || !email || !experience || !courseName || !courseId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Create a new trainer document
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

    // Save the new trainer to the database
    await newTrainer.save();

    // Respond with success and the newly added trainer
    res.status(201).json({ message: 'Trainer added successfully', trainer: newTrainer });
  } catch (error) {
    console.error('Error creating trainer:', error);
    res.status(500).json({ message: 'Failed to add trainer', error });
  }
};

module.exports = {
  getAllTrainers,
  createTrainer,
};
