import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Signup and Login Routes
router.post('/signup', signup);
router.post('/login', login);

// Change Password Route (with current password verification)
router.put('/change-password', async (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Incorrect current password' });

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error updating password' });
  }
});

export default router;
