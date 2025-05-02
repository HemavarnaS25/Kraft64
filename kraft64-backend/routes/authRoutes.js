import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import User from '../models/User.js';
import { signup, login } from '../controllers/authController.js';

const router = express.Router();

// Avatar storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = './uploads/avatars';
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Existing routes
router.post('/signup', signup);
router.post('/login', login);

// Add this route to update profile
router.put('/update-profile/:id', upload.single('avatar'), async (req, res) => {
  try {
    const { fullName, email, bio } = req.body;
    const updateData = { fullName, email, bio };

    if (req.file) {
      updateData.avatar = `/uploads/avatars/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({ msg: 'Profile updated', user: updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error updating profile' });
  }
});

export default router;
