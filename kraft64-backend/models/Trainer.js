// backend/models/Trainer.js

const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: String,
  place: String,
  mode: String,
  contact: String,
  email: String,
  experience: Number,
  courseName: String,
  courseId: String,
  category: String,
});

module.exports = mongoose.model('Trainer', trainerSchema);
