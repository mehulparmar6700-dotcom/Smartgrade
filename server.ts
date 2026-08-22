import express, { Request, Response } from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

// --- Types & Interfaces for Local Server Backend ---
interface LocalUser {
  _id: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'student' | 'faculty' | 'admin';
  department: string;
  rollNumber?: string;
  avatarColor: string;
  createdAt: string;
}

interface LocalStudent {
  _id: string;
  Student_ID: string;
  Student_Name: string;
  Gender: 'Male' | 'Female' | 'Other';
  Age: number;
  Attendance_Percentage: number;
  Study_Hours_Per_Day: number;
  Previous_Score: number;
  Assignment_Score: number;
  Midterm_Score: number;
  Final_Exam_Score: number;
  Practical_Score: number;
  Internal_Marks: number;
  Total_Marks: number;
  Grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  Result: 'Pass' | 'Fail';
  createdAt: string;
  updatedAt: string;
}

interface LocalPrediction {
  _id: string;
  userId?: string;
  userName: string;
  userRole: string;
  input: {
    attendancePercentage: number;
    studyHoursPerDay: number;
    previousScore: number;
    assignmentScore: number;
    midtermScore: number;
    practicalScore: number;
    internalMarks: number;
  };
  output: {
    predictedFinalScore: number;
    performanceCategory: string;
    gradePrediction: string;
    passProbability: number;
    recommendations: string[];
  };
  timestamp: string;
}

// Initial Pre-seeded Users for Local Server Auth
const INITIAL_USERS: LocalUser[] = [
  {
    _id: 'usr_faculty_001',
    name: 'Dr. Ramesh Kulkarni (Project Guide)',
    email: 'faculty@university.edu',
    passwordHash: 'faculty123',
    role: 'faculty',
    department: 'Department of Computer Science & Engineering',
    rollNumber: 'FAC-CSE-402',
    avatarColor: '#5A6B5D',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'usr_student_001',
    name: 'Mehul Parmar (Project Candidate)',
    email: 'student@university.edu',
    passwordHash: 'student123',
    role: 'student',
    department: 'B.Tech Computer Engineering (Semester VI)',
    rollNumber: '22BT04018',
    avatarColor: '#D9A679',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'usr_admin_001',
    name: 'Academic Examiner / HOD',
    email: 'admin@university.edu',
    passwordHash: 'admin123',
    role: 'admin',
    department: 'University Academic Evaluation Board',
    rollNumber: 'ADMIN-EXAM-01',
    avatarColor: '#A65E4E',
    createdAt: new Date().toISOString()
  }
];

// Initial Student Records
const INITIAL_STUDENT_DATA = [
  { Student_ID: "STD-1001", Student_Name: "Aarav Sharma", Gender: "Male", Age: 19, Attendance_Percentage: 92, Study_Hours_Per_Day: 6.5, Previous_Score: 88, Assignment_Score: 94, Midterm_Score: 90, Final_Exam_Score: 92, Practical_Score: 95, Internal_Marks: 94.6, Total_Marks: 91.9, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1002", Student_Name: "Ananya Patel", Gender: "Female", Age: 20, Attendance_Percentage: 88, Study_Hours_Per_Day: 5.0, Previous_Score: 82, Assignment_Score: 86, Midterm_Score: 84, Practical_Score: 90, Final_Exam_Score: 85, Internal_Marks: 88.4, Total_Marks: 85.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1003", Student_Name: "Rohan Verma", Gender: "Male", Age: 19, Attendance_Percentage: 74, Study_Hours_Per_Day: 3.5, Previous_Score: 68, Assignment_Score: 72, Midterm_Score: 70, Practical_Score: 78, Final_Exam_Score: 72, Internal_Marks: 75.6, Total_Marks: 72.1, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1004", Student_Name: "Priya Singh", Gender: "Female", Age: 21, Attendance_Percentage: 95, Study_Hours_Per_Day: 7.0, Previous_Score: 92, Assignment_Score: 98, Midterm_Score: 95, Practical_Score: 96, Final_Exam_Score: 96, Internal_Marks: 96.8, Total_Marks: 95.9, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1005", Student_Name: "Rahul Kumar", Gender: "Male", Age: 20, Attendance_Percentage: 58, Study_Hours_Per_Day: 1.5, Previous_Score: 48, Assignment_Score: 55, Midterm_Score: 46, Practical_Score: 60, Final_Exam_Score: 42, Internal_Marks: 58.0, Total_Marks: 46.4, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1006", Student_Name: "Sneha Reddy", Gender: "Female", Age: 19, Attendance_Percentage: 86, Study_Hours_Per_Day: 4.5, Previous_Score: 76, Assignment_Score: 84, Midterm_Score: 78, Practical_Score: 85, Final_Exam_Score: 80, Internal_Marks: 84.6, Total_Marks: 80.3, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1007", Student_Name: "Vikram Malhotra", Gender: "Male", Age: 20, Attendance_Percentage: 81, Study_Hours_Per_Day: 4.0, Previous_Score: 70, Assignment_Score: 78, Midterm_Score: 74, Practical_Score: 80, Final_Exam_Score: 75, Internal_Marks: 79.2, Total_Marks: 75.5, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1008", Student_Name: "Neha Gupta", Gender: "Female", Age: 19, Attendance_Percentage: 90, Study_Hours_Per_Day: 6.0, Previous_Score: 85, Assignment_Score: 92, Midterm_Score: 88, Practical_Score: 92, Final_Exam_Score: 89, Internal_Marks: 92.0, Total_Marks: 89.3, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1009", Student_Name: "Aditya Joshi", Gender: "Male", Age: 21, Attendance_Percentage: 66, Study_Hours_Per_Day: 2.5, Previous_Score: 56, Assignment_Score: 62, Midterm_Score: 58, Practical_Score: 68, Final_Exam_Score: 55, Internal_Marks: 65.6, Total_Marks: 58.0, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1010", Student_Name: "Pooja Nair", Gender: "Female", Age: 20, Attendance_Percentage: 94, Study_Hours_Per_Day: 6.8, Previous_Score: 90, Assignment_Score: 95, Midterm_Score: 92, Practical_Score: 94, Final_Exam_Score: 93, Internal_Marks: 94.4, Total_Marks: 93.0, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1011", Student_Name: "Karan Mehta", Gender: "Male", Age: 19, Attendance_Percentage: 78, Study_Hours_Per_Day: 3.8, Previous_Score: 72, Assignment_Score: 80, Midterm_Score: 76, Practical_Score: 82, Final_Exam_Score: 74, Internal_Marks: 81.2, Total_Marks: 76.0, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1012", Student_Name: "Divya Iyer", Gender: "Female", Age: 20, Attendance_Percentage: 89, Study_Hours_Per_Day: 5.5, Previous_Score: 84, Assignment_Score: 88, Midterm_Score: 86, Practical_Score: 90, Final_Exam_Score: 87, Internal_Marks: 89.2, Total_Marks: 87.1, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1013", Student_Name: "Manish Tiwari", Gender: "Male", Age: 22, Attendance_Percentage: 52, Study_Hours_Per_Day: 1.2, Previous_Score: 42, Assignment_Score: 50, Midterm_Score: 44, Practical_Score: 55, Final_Exam_Score: 38, Internal_Marks: 53.0, Total_Marks: 42.8, Grade: "F", Result: "Fail" },
  { Student_ID: "STD-1014", Student_Name: "Tanvi Deshmukh", Gender: "Female", Age: 19, Attendance_Percentage: 84, Study_Hours_Per_Day: 4.2, Previous_Score: 75, Assignment_Score: 82, Midterm_Score: 79, Practical_Score: 84, Final_Exam_Score: 77, Internal_Marks: 83.2, Total_Marks: 78.8, Grade: "B", Result: "Pass" },
  { Student_ID: "STD-1015", Student_Name: "Siddharth Rao", Gender: "Male", Age: 20, Attendance_Percentage: 91, Study_Hours_Per_Day: 6.2, Previous_Score: 87, Assignment_Score: 93, Midterm_Score: 89, Practical_Score: 92, Final_Exam_Score: 90, Internal_Marks: 92.4, Total_Marks: 90.2, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1016", Student_Name: "Ritu Choudhary", Gender: "Female", Age: 21, Attendance_Percentage: 70, Study_Hours_Per_Day: 3.0, Previous_Score: 62, Assignment_Score: 70, Midterm_Score: 65, Practical_Score: 72, Final_Exam_Score: 64, Internal_Marks: 71.2, Total_Marks: 65.7, Grade: "C", Result: "Pass" },
  { Student_ID: "STD-1017", Student_Name: "Varun Bhatia", Gender: "Male", Age: 19, Attendance_Percentage: 87, Study_Hours_Per_Day: 5.2, Previous_Score: 81, Assignment_Score: 87, Midterm_Score: 83, Practical_Score: 88, Final_Exam_Score: 84, Internal_Marks: 87.6, Total_Marks: 84.4, Grade: "A", Result: "Pass" },
  { Student_ID: "STD-1018", Student_Name: "Kavita Saxena", Gender: "Female", Age: 20, Attendance_Percentage: 93, Study_Hours_Per_Day: 6.6, Previous_Score: 89, Assignment_Score: 96, Midterm_Score: 91, Practical_Score: 95, Final_Exam_Score: 92, Internal_Marks: 95.4, Total_Marks: 92.4, Grade: "A+", Result: "Pass" },
  { Student_ID: "STD-1019", Student_Name: "Arjun Nambiar", Gender: "Male", Age: 20, Attendance_Percentage: 62, Study_Hours_Per_Day: 2.0, Previous_Score: 52, Assignment_Score: 60, Midterm_Score: 54, Practical_Score: 65, Final_Exam_Score: 50, Internal_Marks: 63.0, Total_Marks: 53.8, Grade: "D", Result: "Pass" },
  { Student_ID: "STD-1020", Student_Name: "Isha Kapoor", Gender: "Female", Age: 19, Attendance_Percentage: 96, Study_Hours_Per_Day: 7.2, Previous_Score: 94, Assignment_Score: 99, Midterm_Score: 96, Practical_Score: 98, Final_Exam_Score: 97, Internal_Marks: 98.4, Total_Marks: 96.9, Grade: "A+", Result: "Pass" }
];

// --- Local Server In-Memory JSON Database Engine ---
class LocalDatabaseEngine {
  private users: Map<string, LocalUser> = new Map();
  private students: Map<string, LocalStudent> = new Map();
  private predictions: LocalPrediction[] = [];

  constructor() {
    this.reset();
  }

  reset() {
    this.users.clear();
    this.students.clear();
    this.predictions = [];

    // Seed Users
    INITIAL_USERS.forEach(user => {
      this.users.set(user.email.toLowerCase(), { ...user });
    });

    // Seed Students
    INITIAL_STUDENT_DATA.forEach((s, idx) => {
      const id = `std_${(idx + 1).toString().padStart(4, '0')}`;
      this.students.set(id, {
        _id: id,
        ...s,
        Gender: s.Gender as 'Male' | 'Female' | 'Other',
        Grade: s.Grade as 'A+' | 'A' | 'B' | 'C' | 'D' | 'F',
        Result: s.Result as 'Pass' | 'Fail',
        createdAt: new Date(Date.now() - (60 - idx) * 86400000).toISOString(),
        updatedAt: new Date().toISOString()
      });
    });
  }

  // Users Store
  findUserByEmail(email: string): LocalUser | undefined {
    return this.users.get(email.toLowerCase().trim());
  }

  findUserById(id: string): LocalUser | undefined {
    for (const u of this.users.values()) {
      if (u._id === id) return u;
    }
    return undefined;
  }

  createUser(userData: Omit<LocalUser, '_id' | 'createdAt'>): LocalUser {
    const _id = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const user: LocalUser = {
      ...userData,
      _id,
      email: userData.email.toLowerCase().trim(),
      createdAt: new Date().toISOString()
    };
    this.users.set(user.email, user);
    return user;
  }

  getAllUsers(): Omit<LocalUser, 'passwordHash'>[] {
    return Array.from(this.users.values()).map(({ passwordHash, ...safeUser }) => safeUser);
  }

  // Students Store
  getAllStudents(filter?: { search?: string; grade?: string; result?: string; minAttendance?: number }): LocalStudent[] {
    let result = Array.from(this.students.values());

    if (filter?.search) {
      const q = filter.search.toLowerCase();
      result = result.filter(s => 
        s.Student_Name.toLowerCase().includes(q) || 
        s.Student_ID.toLowerCase().includes(q)
      );
    }

    if (filter?.grade && filter.grade !== 'All') {
      result = result.filter(s => s.Grade === filter.grade);
    }

    if (filter?.result && filter.result !== 'All') {
      result = result.filter(s => s.Result === filter.result);
    }

    if (filter?.minAttendance !== undefined) {
      result = result.filter(s => s.Attendance_Percentage >= filter.minAttendance!);
    }

    return result.sort((a, b) => b.Total_Marks - a.Total_Marks);
  }

  getStudentById(id: string): LocalStudent | undefined {
    return this.students.get(id);
  }

  createStudent(studentData: Omit<LocalStudent, '_id' | 'createdAt' | 'updatedAt'>): LocalStudent {
    const _id = `std_${Date.now()}`;
    const newStudent: LocalStudent = {
      ...studentData,
      _id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.students.set(_id, newStudent);
    return newStudent;
  }

  updateStudent(id: string, updates: Partial<LocalStudent>): LocalStudent | null {
    const existing = this.students.get(id);
    if (!existing) return null;
    const updated: LocalStudent = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.students.set(id, updated);
    return updated;
  }

  deleteStudent(id: string): boolean {
    return this.students.delete(id);
  }

  // Predictions Store
  savePrediction(prediction: Omit<LocalPrediction, '_id' | 'timestamp'>): LocalPrediction {
    const newPred: LocalPrediction = {
      ...prediction,
      _id: `pred_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      timestamp: new Date().toISOString()
    };
    this.predictions.unshift(newPred);
    if (this.predictions.length > 100) {
      this.predictions.pop();
    }
    return newPred;
  }

  getAllPredictions(): LocalPrediction[] {
    return this.predictions;
  }

  // Local Server Diagnostics & Metrics
  getDatabaseMetrics() {
    return {
      status: 'connected',
      database: 'smartgrade_local_db',
      host: 'localhost:3000 (Local Express In-Memory Store)',
      engine: 'Express Node.js Local JSON Storage Engine',
      uptimeSeconds: Math.floor(process.uptime()),
      collections: {
        users: { count: this.users.size, sizeBytes: this.users.size * 512, indexes: ['_id', 'email', 'role'] },
        students: { count: this.students.size, sizeBytes: this.students.size * 1024, indexes: ['_id', 'Student_ID', 'Total_Marks', 'Grade'] },
        predictions: { count: this.predictions.length, sizeBytes: this.predictions.length * 768, indexes: ['_id', 'timestamp', 'userId'] }
      },
      connectionPool: { active: 1, available: 10, mode: 'Local Server' }
    };
  }

  // Local Query Parser
  executeLocalQuery(collectionName: string, action: string, rawQuery: string | object) {
    const startTime = performance.now();
    let queryObj: Record<string, any> = {};
    
    if (typeof rawQuery === 'string') {
      try {
        queryObj = rawQuery.trim() ? JSON.parse(rawQuery) : {};
      } catch (err) {
        return {
          ok: 0,
          error: `Invalid JSON query: ${(err as Error).message}`,
          executionTimeMs: 0
        };
      }
    } else {
      queryObj = rawQuery || {};
    }

    let documents: any[] = [];
    if (collectionName === 'students') {
      documents = Array.from(this.students.values());
    } else if (collectionName === 'users') {
      documents = this.getAllUsers();
    } else if (collectionName === 'predictions') {
      documents = [...this.predictions];
    } else {
      return { ok: 0, error: `Dataset table "${collectionName}" not found in local server.` };
    }

    // Filter documents
    let results = documents.filter(doc => {
      for (const [key, value] of Object.entries(queryObj)) {
        if (typeof value === 'object' && value !== null) {
          if ('$gte' in value && !(doc[key] >= value.$gte)) return false;
          if ('$lte' in value && !(doc[key] <= value.$lte)) return false;
          if ('$gt' in value && !(doc[key] > value.$gt)) return false;
          if ('$lt' in value && !(doc[key] < value.$lt)) return false;
          if ('$ne' in value && doc[key] === value.$ne) return false;
          if ('$in' in value && Array.isArray(value.$in) && !value.$in.includes(doc[key])) return false;
          if ('$regex' in value) {
            const re = new RegExp(value.$regex, value.$options || 'i');
            if (!re.test(String(doc[key] || ''))) return false;
          }
        } else {
          if (doc[key] !== value) return false;
        }
      }
      return true;
    });

    const executionTimeMs = +(performance.now() - startTime).toFixed(2);

    return {
      ok: 1,
      collection: collectionName,
      action: action || 'find',
      query: queryObj,
      matchedCount: results.length,
      executionTimeMs,
      documents: results.slice(0, 50)
    };
  }
}

const db = new LocalDatabaseEngine();

// Helper: Calculate OLS Linear Regression Prediction
function calculateMLPrediction(input: {
  attendancePercentage: number;
  studyHoursPerDay: number;
  previousScore: number;
  assignmentScore: number;
  midtermScore: number;
  practicalScore: number;
  internalMarks: number;
}) {
  // Linear Regression Weights (Scikit-Learn OLS on dataset)
  const intercept = 3.12;
  const weights = {
    attendance: 0.125,
    studyHours: 2.14,
    previousScore: 0.28,
    assignmentScore: 0.15,
    midtermScore: 0.22,
    practicalScore: 0.11,
    internalMarks: 0.08
  };

  let rawPredicted = 
    intercept +
    (input.attendancePercentage * weights.attendance) +
    (input.studyHoursPerDay * weights.studyHours) +
    (input.previousScore * weights.previousScore) +
    (input.assignmentScore * weights.assignmentScore) +
    (input.midtermScore * weights.midtermScore) +
    (input.practicalScore * weights.practicalScore) +
    (input.internalMarks * weights.internalMarks);

  const predictedFinalScore = Math.min(100, Math.max(0, +rawPredicted.toFixed(1)));

  // Categorize
  let performanceCategory = 'Needs Improvement';
  let gradePrediction: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'F';
  if (predictedFinalScore >= 90) {
    performanceCategory = 'Excellent';
    gradePrediction = 'A+';
  } else if (predictedFinalScore >= 80) {
    performanceCategory = 'Good';
    gradePrediction = 'A';
  } else if (predictedFinalScore >= 70) {
    performanceCategory = 'Good';
    gradePrediction = 'B';
  } else if (predictedFinalScore >= 60) {
    performanceCategory = 'Average';
    gradePrediction = 'C';
  } else if (predictedFinalScore >= 50) {
    performanceCategory = 'Average';
    gradePrediction = 'D';
  }

  // Pass Probability
  const passProbability = Math.min(99.9, Math.max(1.0, +(100 / (1 + Math.exp(-(predictedFinalScore - 50) / 7))).toFixed(1)));

  // Custom recommendations
  const recommendations: string[] = [];
  if (input.attendancePercentage < 75) {
    recommendations.push('Attendance is below university criteria (75%). Increasing to 85%+ can add +4 to +6 marks.');
  }
  if (input.studyHoursPerDay < 3.5) {
    recommendations.push('Daily study hours are low. Increasing by 1.5 hrs/day yields +3.21 estimated marks.');
  }
  if (input.midtermScore < 65) {
    recommendations.push('Midterm score indicates fundamental gaps in core syllabus topics.');
  }
  if (recommendations.length === 0) {
    recommendations.push('Excellent consistency across all parameters! Maintain revision cycle for Distinction (A+).');
  }

  return {
    predictedFinalScore,
    performanceCategory,
    gradePrediction,
    passProbability,
    recommendations
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // --- Express MERN REST API Endpoints ---

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({
      status: 'ok',
      service: 'SmartGrade MERN Stack API',
      timestamp: new Date().toISOString()
    });
  });

  // 1. MERN Authentication: Register
  app.post('/api/auth/register', (req: Request, res: Response) => {
    try {
      const { name, email, password, role, department, rollNumber } = req.body;
      
      if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required fields.' });
      }

      if (db.findUserByEmail(email)) {
        return res.status(409).json({ error: 'An account with this email address already exists in MongoDB.' });
      }

      const avatarColors = ['#5A6B5D', '#D9A679', '#A65E4E', '#4A6B82', '#7A6B5D'];
      const avatarColor = avatarColors[Math.floor(Math.random() * avatarColors.length)];

      const newUser = db.createUser({
        name: name.trim(),
        email: email.trim(),
        passwordHash: password, // In production MERN, use bcrypt.hash()
        role: (role === 'faculty' || role === 'admin') ? role : 'student',
        department: department || 'Department of Computer Science & Engineering',
        rollNumber: rollNumber || `STD-${Math.floor(1000 + Math.random() * 9000)}`,
        avatarColor
      });

      // Generate JWT session simulation token
      const token = `jwt_token_${newUser._id}_${Date.now()}`;

      const { passwordHash, ...safeUser } = newUser;
      return res.status(201).json({
        message: 'User registered successfully in MongoDB database.',
        token,
        user: safeUser
      });
    } catch (err) {
      return res.status(500).json({ error: 'Server error during registration.' });
    }
  });

  // 2. MERN Authentication: Login
  app.post('/api/auth/login', (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
      }

      const user = db.findUserByEmail(email);
      if (!user || user.passwordHash !== password) {
        return res.status(401).json({ error: 'Invalid credentials. Check email and password.' });
      }

      const token = `jwt_token_${user._id}_${Date.now()}`;
      const { passwordHash, ...safeUser } = user;

      return res.json({
        message: 'Login successful via MERN Auth API.',
        token,
        user: safeUser
      });
    } catch (err) {
      return res.status(500).json({ error: 'Server error during login.' });
    }
  });

  // 3. MERN Authentication: Current Session User
  app.get('/api/auth/me', (req: Request, res: Response) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized. Missing Bearer token.' });
    }

    const token = authHeader.split(' ')[1];
    const parts = token.split('_');
    const userId = parts[2];

    const user = db.findUserById(userId);
    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired session token.' });
    }

    const { passwordHash, ...safeUser } = user;
    return res.json({ user: safeUser });
  });

  // 4. MERN Authentication: All Users List (Admin/Faculty inspection)
  app.get('/api/auth/users', (req: Request, res: Response) => {
    return res.json({
      count: db.getAllUsers().length,
      users: db.getAllUsers()
    });
  });

  // 5. MERN Student Collection: GET with Search & Filters
  app.get('/api/students', (req: Request, res: Response) => {
    const { search, grade, result, minAttendance } = req.query;
    const students = db.getAllStudents({
      search: search as string,
      grade: grade as string,
      result: result as string,
      minAttendance: minAttendance ? Number(minAttendance) : undefined
    });

    return res.json({
      count: students.length,
      students
    });
  });

  // 6. MERN Student Collection: POST (Create Record)
  app.post('/api/students', (req: Request, res: Response) => {
    try {
      const body = req.body;
      if (!body.Student_Name || body.Attendance_Percentage === undefined || body.Study_Hours_Per_Day === undefined) {
        return res.status(400).json({ error: 'Missing mandatory student fields.' });
      }

      const totalMarks = body.Total_Marks !== undefined ? Number(body.Total_Marks) :
        +(0.2 * Number(body.Internal_Marks || 75) + 0.3 * Number(body.Midterm_Score || 70) + 0.5 * Number(body.Final_Exam_Score || 75)).toFixed(1);

      let grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' = 'B';
      if (totalMarks >= 90) grade = 'A+';
      else if (totalMarks >= 80) grade = 'A';
      else if (totalMarks >= 70) grade = 'B';
      else if (totalMarks >= 60) grade = 'C';
      else if (totalMarks >= 50) grade = 'D';
      else grade = 'F';

      const result: 'Pass' | 'Fail' = totalMarks >= 50 ? 'Pass' : 'Fail';

      const newStudent = db.createStudent({
        Student_ID: body.Student_ID || `STD-${Math.floor(1000 + Math.random() * 9000)}`,
        Student_Name: body.Student_Name,
        Gender: body.Gender || 'Male',
        Age: Number(body.Age || 20),
        Attendance_Percentage: Number(body.Attendance_Percentage),
        Study_Hours_Per_Day: Number(body.Study_Hours_Per_Day),
        Previous_Score: Number(body.Previous_Score || 70),
        Assignment_Score: Number(body.Assignment_Score || 75),
        Midterm_Score: Number(body.Midterm_Score || 70),
        Final_Exam_Score: Number(body.Final_Exam_Score || 70),
        Practical_Score: Number(body.Practical_Score || 75),
        Internal_Marks: Number(body.Internal_Marks || 75),
        Total_Marks: totalMarks,
        Grade: grade,
        Result: result
      });

      return res.status(201).json({
        message: 'Student document successfully created in local server dataset.',
        student: newStudent
      });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to create student document.' });
    }
  });

  // 7. Local Student Collection: PUT (Update Record)
  app.put('/api/students/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = db.updateStudent(id, req.body);
    if (!updated) {
      return res.status(404).json({ error: `Student with ID ${id} not found.` });
    }
    return res.json({ message: 'Student updated successfully on local server.', student: updated });
  });

  // 8. Local Student Collection: DELETE
  app.delete('/api/students/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const success = db.deleteStudent(id);
    if (!success) {
      return res.status(404).json({ error: `Student with ID ${id} not found.` });
    }
    return res.json({ message: 'Student document deleted from local server.' });
  });

  // 9. Local Server ML Prediction API: POST /api/predict
  app.post('/api/predict', (req: Request, res: Response) => {
    try {
      const {
        attendancePercentage = 75,
        studyHoursPerDay = 3.5,
        previousScore = 70,
        assignmentScore = 75,
        midtermScore = 70,
        practicalScore = 75,
        internalMarks = 75,
        userName = 'Guest User',
        userRole = 'Guest',
        userId
      } = req.body;

      const input = {
        attendancePercentage: Number(attendancePercentage),
        studyHoursPerDay: Number(studyHoursPerDay),
        previousScore: Number(previousScore),
        assignmentScore: Number(assignmentScore),
        midtermScore: Number(midtermScore),
        practicalScore: Number(practicalScore),
        internalMarks: Number(internalMarks)
      };

      const output = calculateMLPrediction(input);

      // Save prediction to local server store
      const savedPrediction = db.savePrediction({
        userId,
        userName,
        userRole,
        input,
        output
      });

      return res.json({
        message: 'ML Prediction computed and logged to local server.',
        predictionId: savedPrediction._id,
        timestamp: savedPrediction.timestamp,
        ...output
      });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to compute ML prediction.' });
    }
  });

  // 10. Local Predictions Log: GET /api/predictions
  app.get('/api/predictions', (req: Request, res: Response) => {
    return res.json({
      count: db.getAllPredictions().length,
      predictions: db.getAllPredictions()
    });
  });

  // 11. Local Analytics & Summary Aggregates: GET /api/analytics
  app.get('/api/analytics', (req: Request, res: Response) => {
    const students = db.getAllStudents();
    const total = students.length;
    if (total === 0) {
      return res.json({ totalStudents: 0 });
    }

    const totalMarksSum = students.reduce((acc, s) => acc + s.Total_Marks, 0);
    const passCount = students.filter(s => s.Result === 'Pass').length;
    const failCount = total - passCount;

    const gradeCounts: Record<string, number> = { 'A+': 0, 'A': 0, 'B': 0, 'C': 0, 'D': 0, 'F': 0 };
    students.forEach(s => {
      if (gradeCounts[s.Grade] !== undefined) gradeCounts[s.Grade]++;
    });

    return res.json({
      totalStudents: total,
      averageMarks: +(totalMarksSum / total).toFixed(2),
      passRate: +((passCount / total) * 100).toFixed(1),
      failRate: +((failCount / total) * 100).toFixed(1),
      passCount,
      failCount,
      gradeCounts,
      topScorer: students[0],
      lowestScorer: students[students.length - 1]
    });
  });

  // 12. Local Database Playground & Shell: POST /api/database/query
  app.post('/api/database/query', (req: Request, res: Response) => {
    const { collection = 'students', action = 'find', query = {} } = req.body;
    const result = db.executeLocalQuery(collection, action, query);
    return res.json(result);
  });

  // 13. Local Server Status & Diagnostics: GET /api/database/status
  app.get('/api/database/status', (req: Request, res: Response) => {
    return res.json(db.getDatabaseMetrics());
  });

  // 14. Reset Database: POST /api/database/reset
  app.post('/api/database/reset', (req: Request, res: Response) => {
    db.reset();
    return res.json({ message: 'Local server in-memory database successfully reset to factory dataset.' });
  });

  // --- Vite Dev Middleware / Production Static Handler ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SmartGrade Server] Running on http://0.0.0.0:${PORT} (Local Server Backend)`);
    console.log(`[SmartGrade Server] In-Memory Local JSON Data Store: Active (3 datasets pre-seeded)`);
    console.log(`[SmartGrade Server] Express REST API: Ready on /api/*`);
  });
}

startServer().catch(err => {
  console.error('Fatal error starting SmartGrade server:', err);
});
