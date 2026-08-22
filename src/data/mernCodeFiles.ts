import { CodeFileItem } from '../types';

export const MERN_SERVER_JS = `/**
 * ============================================================================
 * SmartGrade: Student Performance Analysis & Prediction System
 * MERN Backend Entry Point (server.js)
 * ----------------------------------------------------------------------------
 * Objective: Node.js / Express.js REST API with MongoDB (Mongoose ODM)
 * Features: JWT Authentication, Student CRUD, ML Linear Regression, Diagnostics
 * ============================================================================
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const predictRoutes = require('./routes/predictRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/smartgrade_db';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully to database: smartgrade_db'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/predict', predictRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'SmartGrade MERN Stack API Gateway',
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, () => {
  console.log(\`🚀 SmartGrade MERN Server running on port \${PORT}\`);
});
`;

export const MERN_USER_MODEL = `/**
 * models/User.js - MongoDB Mongoose Schema for Users
 */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/\\S+@\\S+\\.\\S+/, 'Please use a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6
  },
  role: {
    type: String,
    enum: ['student', 'faculty', 'admin'],
    default: 'student'
  },
  department: {
    type: String,
    default: 'Computer Science & Engineering'
  },
  rollNumber: {
    type: String,
    trim: true
  },
  avatarColor: {
    type: String,
    default: '#5A6B5D'
  }
}, { timestamps: true });

// Password hashing middleware
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password helper
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
`;

export const MERN_STUDENT_MODEL = `/**
 * models/Student.js - MongoDB Mongoose Schema for Student Academic Records
 */
const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  Student_ID: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  Student_Name: {
    type: String,
    required: true,
    trim: true
  },
  Gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
    default: 'Male'
  },
  Age: {
    type: Number,
    min: 15,
    max: 40,
    default: 20
  },
  Attendance_Percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
    index: true
  },
  Study_Hours_Per_Day: {
    type: Number,
    required: true,
    min: 0,
    max: 24
  },
  Previous_Score: { type: Number, default: 70 },
  Assignment_Score: { type: Number, default: 75 },
  Midterm_Score: { type: Number, default: 70 },
  Final_Exam_Score: { type: Number, default: 70 },
  Practical_Score: { type: Number, default: 75 },
  Internal_Marks: { type: Number, default: 75 },
  Total_Marks: { type: Number, required: true, index: true },
  Grade: {
    type: String,
    enum: ['A+', 'A', 'B', 'C', 'D', 'F'],
    required: true,
    index: true
  },
  Result: {
    type: String,
    enum: ['Pass', 'Fail'],
    required: true,
    index: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Student', StudentSchema);
`;

export const MERN_PREDICTION_MODEL = `/**
 * models/Prediction.js - MongoDB Mongoose Schema for Logged ML Predictions
 */
const mongoose = require('mongoose');

const PredictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: {
    type: String,
    default: 'Guest User'
  },
  userRole: {
    type: String,
    default: 'Guest'
  },
  input: {
    attendancePercentage: Number,
    studyHoursPerDay: Number,
    previousScore: Number,
    assignmentScore: Number,
    midtermScore: Number,
    practicalScore: Number,
    internalMarks: Number
  },
  output: {
    predictedFinalScore: Number,
    performanceCategory: String,
    gradePrediction: String,
    passProbability: Number,
    recommendations: [String]
  }
}, { timestamps: true });

module.exports = mongoose.model('Prediction', PredictionSchema);
`;

export const MERN_AUTH_ROUTES = `/**
 * routes/authRoutes.js - Express Authentication Router (JWT + MongoDB)
 */
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'smartgrade_jwt_secret_2026';

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, department, rollNumber } = req.body;
    
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    const user = new User({ name, email, password, role, department, rollNumber });
    await user.save();

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });
    
    res.status(201).json({
      message: 'Account created successfully in MongoDB',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        rollNumber: user.rollNumber
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      message: 'Login successful',
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        department: user.department,
        rollNumber: user.rollNumber
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
`;

export const MERN_PACKAGE_JSON = `{
  "name": "smartgrade-mern-backend",
  "version": "1.0.0",
  "description": "Node.js Express & MongoDB Backend for Student Performance Prediction",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.3.2"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}
`;

export const ALL_MERN_FILES: CodeFileItem[] = [
  {
    path: "server.js",
    filename: "server.js",
    language: "javascript",
    description: "Main Express.js server entry point connecting MongoDB and routing REST APIs.",
    content: MERN_SERVER_JS
  },
  {
    path: "models/User.js",
    filename: "User.js",
    language: "javascript",
    description: "Mongoose schema with bcrypt password hashing for Student/Faculty/Admin users.",
    content: MERN_USER_MODEL
  },
  {
    path: "models/Student.js",
    filename: "Student.js",
    language: "javascript",
    description: "Mongoose schema with indexes for student academic features and grades.",
    content: MERN_STUDENT_MODEL
  },
  {
    path: "models/Prediction.js",
    filename: "Prediction.js",
    language: "javascript",
    description: "Mongoose schema storing past ML predictions, input features, and advice.",
    content: MERN_PREDICTION_MODEL
  },
  {
    path: "routes/authRoutes.js",
    filename: "authRoutes.js",
    language: "javascript",
    description: "Express authentication routes implementing JWT tokens & user registration.",
    content: MERN_AUTH_ROUTES
  },
  {
    path: "package.json",
    filename: "package.json",
    language: "json",
    description: "Backend dependencies including Express, Mongoose, JWT, and bcrypt.",
    content: MERN_PACKAGE_JSON
  }
];
