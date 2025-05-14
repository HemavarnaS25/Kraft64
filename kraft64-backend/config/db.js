import User from '../models/User.js';
import bcrypt from 'bcryptjs';

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

    // Create new user with the role or default to 'student'
    const newUser = new User({
      username,
      fullName,
      email,
      password: hashedPassword,
      role: role || 'student',  // Default to 'student' if no role is provided
    });

    // Save new user to DB
    await newUser.save();

    // Respond with user details (excluding password)
    res.status(201).json({
      msg: "User created successfully",
      user: {
        id: newUser._id,
        username: newUser.username,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// Login logic with role-based redirect
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Respond with user details (excluding password)
    res.status(200).json({
      msg: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        bio: user.bio || ''
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};