export interface StudentRecord {
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
}

export interface DatasetSummary {
  totalStudents: number;
  averageTotalMarks: number;
  highestMarks: number;
  lowestMarks: number;
  averageAttendance: number;
  averageStudyHours: number;
  averageFinalExam: number;
  averageMidterm: number;
  averageAssignment: number;
  averagePractical: number;
  averageInternal: number;
  passCount: number;
  failCount: number;
  passPercentage: number;
  failPercentage: number;
  gradeCounts: Record<string, number>;
  maleCount: number;
  femaleCount: number;
}

export interface ModelMetrics {
  mae: number;
  mse: number;
  rmse: number;
  r2Score: number;
  r2_score?: number;
  trainSize: number;
  testSize: number;
  train_samples?: number;
  test_samples?: number;
  intercept: number;
  coefficients: {
    feature: string;
    coefficient: number;
    description: string;
  }[];
  feature_names?: string[];
  raw_coefficients?: number[];
}

export interface PredictionInput {
  attendancePercentage: number;
  studyHoursPerDay: number;
  previousScore: number;
  assignmentScore: number;
  midtermScore: number;
  practicalScore: number;
  internalMarks: number;
  // support snake_case aliases too
  Attendance_Percentage?: number;
  Study_Hours_Per_Day?: number;
  Previous_Score?: number;
  Assignment_Score?: number;
  Midterm_Score?: number;
  Practical_Score?: number;
  Internal_Marks?: number;
}

export interface PredictionOutput {
  predictedFinalScore: number;
  performanceCategory: 'Excellent' | 'Good' | 'Average' | 'Needs Improvement';
  gradePrediction: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  passProbability: number;
  recommendations: string[];
  formulaBreakdown: {
    feature: string;
    value: number;
    weight: number;
    contribution: number;
  }[];
}

export interface VivaQuestion {
  id: number;
  category: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  fullAnswer?: string;
  keyKeywords: string[];
  keywords?: string[];
  difficulty: 'Easy' | 'Medium' | 'Important' | 'High Priority';
}

export interface PresentationSlide {
  slideNumber: number;
  title: string;
  bulletPoints: string[];
  speakerNotes: string;
  keyTakeaway: string;
}

export interface CodeFileItem {
  path: string;
  filename: string;
  language: string;
  description: string;
  content: string;
}

export interface DocSection {
  id: string;
  code?: string;
  title: string;
  content: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'admin';
  department: string;
  rollNumber?: string;
  avatarColor: string;
  createdAt: string;
}

export interface DatabaseMetrics {
  status: string;
  database: string;
  host: string;
  engine: string;
  uptimeSeconds: number;
  collections: {
    users: { count: number; sizeBytes: number; indexes: string[] };
    students: { count: number; sizeBytes: number; indexes: string[] };
    predictions: { count: number; sizeBytes: number; indexes: string[] };
  };
  connectionPool: { active: number; available: number };
}

export interface MongoQueryResult {
  ok: number;
  collection?: string;
  action?: string;
  query?: any;
  matchedCount?: number;
  executionTimeMs?: number;
  documents?: any[];
  error?: string;
}
