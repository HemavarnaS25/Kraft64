import express from 'express';
import { signup, login } from '../controllers/authController.js';
import User from '../models/User.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.put('/update-profile/:id', async (req, res) => {
  try {
    const { fullName, bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { fullName, bio },
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ msg: 'User not found' });

    res.json({ msg: 'Profile updated', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error updating profile' });
  }
});

export default router;
