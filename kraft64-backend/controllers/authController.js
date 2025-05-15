import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Signup logic with role handling
export const signup = async (req, res) => {
  const { username, fullName, email, password, role } = req.body;

  try {
    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) return res.status(400).json({ msg: "Email already in use" });

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) return res.status(400).json({ msg: "Username already taken" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Set default role as 'student' if not provided
    const assignedRole = role && ['student', 'trainer'].includes(role.toLowerCase()) ? role.toLowerCase() : 'student';

    // Create new user
    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
      role: assignedRole,
    });

    // Save new user to DB
    await newUser.save();

    // Generate token
    const token = jwt.sign({ id: newUser._id, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Respond with user details and token
    res.status(201).json({
      msg: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
      },
      token,
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ msg: 'Server error while creating account' });
  }
};

// Login logic with JWT token support
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });

    // Respond with user details and token
    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        bio: user.bio || '',
      },
      token,
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error while logging in' });
  }
};
