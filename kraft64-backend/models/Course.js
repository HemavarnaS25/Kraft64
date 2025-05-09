import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  experience: { type: String, required: true },
  proof: { type: String },  // Optional field to store proof or reference links
  contact: { type: String, required: true },
  fees: { type: Number, required: true },
  mode: { type: String, required: true, enum: ['Online', 'Offline', 'Hybrid'] },
  trainerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the trainer (user)
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

export default Course;
