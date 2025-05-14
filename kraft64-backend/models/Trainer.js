// backend/models/Trainer.js

const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  mode: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  experience: { type: String, required: true },
  courseName: { type: String, required: true },
  courseId: { type: String, required: true },
  category: { type: String, required: false }, // Optional field
});

module.exports = mongoose.model('Trainer', trainerSchema);
