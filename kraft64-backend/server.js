import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

// Initialize dotenv
dotenv.config();

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(express.json({ limit: '5mb' }));  // Allow incoming JSON requests
app.use(express.urlencoded({ extended: true, limit: '5mb' }));  // Handle form data

// DB Connection
connectDB();  // Connect to the database

// Routes
app.use('/api/auth', authRoutes);  // Auth routes
app.use('/api/courses', courseRoutes);  // Course-related routes

// Set up a default route for testing
app.get('/', (req, res) => {
  res.send('Welcome to Kraft64 Backend!');
});

// Define the port number
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
