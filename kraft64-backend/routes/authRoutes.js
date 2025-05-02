import express from 'express';
import User from '../models/User.js';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Signup/Login
router.post('/signup', signup);
router.post('/login', login);

// Update Profile with Base64 Avatar
// /api/auth/update-profile/:id
router.put('/update-profile/:id', async (req, res) => {
  try {
    const { fullName, email, bio, avatar } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, email, bio, avatar },
      { new: true }
    );

    res.json({ msg: 'Profile updated', user: updatedUser });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ msg: 'Error updating profile' });
  }
});


export default router;
