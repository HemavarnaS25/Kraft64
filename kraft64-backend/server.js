import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import courseRoutes from './routes/courseRoutes.js';

// Initialize dotenv to load environment variables
dotenv.config();

// Check if environment variables are loaded correctly
if (!process.env.PORT || !process.env.MONGO_URI) {
  console.error('Error: Missing necessary environment variables (PORT or MONGO_URI)');
  process.exit(1);
}

// Create an instance of Express
const app = express();

// Middleware
app.use(cors());  // Enable Cross-Origin Resource Sharing
app.use(express.json({ limit: '5mb' }));  // Allow incoming JSON requests
app.use(express.urlencoded({ extended: true, limit: '5mb' }));  // Handle form data

// DB Connection with error handling
connectDB().catch((err) => {
  console.error('Error connecting to the database', err);
  process.exit(1); // Exit the process if DB connection fails
});

// Routes
app.use('/api/auth', authRoutes);  // Auth routes
app.use('/api/courses', courseRoutes);  // Course-related routes

// Set up a default route for testing
app.get('/', (req, res) => {
  res.send('Welcome to Kraft64 Backend!');
});

// Error handling middleware for uncaught errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ msg: 'Internal Server Error' });
});

// Define the port number
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
