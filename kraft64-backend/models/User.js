import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bio: { type: String, default: '' },
  profilePic: { type: String, default: '' },
  linkedIn: { type: String, default: '' },
  xLink: { type: String, default: '' },
  role: {
    type: String,
    enum: ['Learner', 'Trainer'], 
    required: true,
    lowercase: false, 
    trim: true,
  },
  trainerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false, 
  },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;
