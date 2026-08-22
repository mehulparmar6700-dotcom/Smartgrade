import { PresentationSlide } from '../types';

export const PRESENTATION_SLIDES: PresentationSlide[] = [
  {
    slideNumber: 1,
    title: "SmartGrade – Student Performance Analysis & Prediction System",
    bulletPoints: [
      "A Python & Machine Learning Minor Project",
      "Department of Computer Science & Engineering / Information Technology",
      "Presented By: [Your Name & Roll Number]",
      "Under the Guidance of: [Faculty Guide Name]",
      "Academic Year: 2025 – 2026"
    ],
    speakerNotes: "Good morning respected examiners and faculty members. Today I am presenting my minor project titled 'SmartGrade – Student Performance Analysis & Prediction System', built using Python, Pandas, Scikit-learn, and Streamlit.",
    keyTakeaway: "Clear academic title, candidate identification, and faculty guidance acknowledgement."
  },
  {
    slideNumber: 2,
    title: "Introduction & Context",
    bulletPoints: [
      "Importance of continuous monitoring in higher education",
      "Traditional evaluation relies heavily on end-semester exams",
      "Need for early detection of at-risk students",
      "Role of Educational Data Mining (EDM) in proactive counseling",
      "Objective: A lightweight, beginner-friendly decision support tool"
    ],
    speakerNotes: "In traditional college setups, students often realize their academic standing only after final semester results. This project bridges this gap by analyzing ongoing academic indicators like attendance, study hours, and continuous assessments to predict outcomes beforehand.",
    keyTakeaway: "Contextualizes the transition from reactive grading to proactive academic mentoring."
  },
  {
    slideNumber: 3,
    title: "Problem Statement",
    bulletPoints: [
      "High academic failure rates due to delayed remedial intervention",
      "Faculty advisors lack consolidated data visualization tools",
      "Manual statistical calculations across large batches are tedious and error-prone",
      "Lack of interpretable, mathematically transparent predictive models for students",
      "Difficulty in enforcing attendance regulations (>75%) proactively"
    ],
    speakerNotes: "The core problem is latency. Faculty advisors lack automated tools to correlate classroom attendance and study habits with exam scores, making timely student advising difficult.",
    keyTakeaway: "Identifies delayed feedback, manual overhead, and lack of predictive insights."
  },
  {
    slideNumber: 4,
    title: "Project Objectives",
    bulletPoints: [
      "1. Manage realistic student academic records via structured CSV dataset",
      "2. Perform automated data cleaning (missing value imputation & deduplication)",
      "3. Compute 15 descriptive statistical metrics across student cohorts",
      "4. Generate 7 publication-ready Matplotlib charts for visual EDA",
      "5. Train a Multiple Linear Regression model with 80/20 train-test split",
      "6. Deploy an intuitive, pure-Python Streamlit web interface"
    ],
    speakerNotes: "Our primary objective is to build a complete pipeline from data cleaning with Pandas, visualization with Matplotlib, machine learning regression with Scikit-learn, to interactive web deployment with Streamlit.",
    keyTakeaway: "6 concrete, achievable, and verifiable functional deliverables."
  },
  {
    slideNumber: 5,
    title: "Technology Stack & Architecture",
    bulletPoints: [
      "Core Programming Language: Python 3.9+",
      "Data Manipulation & Cleaning: Pandas & NumPy",
      "Data Visualizations: Matplotlib (Pyplot)",
      "Machine Learning Algorithm: Scikit-learn (Linear Regression)",
      "Web Dashboard Framework: Streamlit",
      "Modular Architecture: app.py, model.py, analysis.py, charts.py"
    ],
    speakerNotes: "We intentionally selected standard, lightweight Python technologies without heavyweight frameworks like Django or complex SQL databases, ensuring the project runs seamlessly offline on any laptop.",
    keyTakeaway: "Cohesive Python data science ecosystem with zero unnecessary dependencies."
  },
  {
    slideNumber: 6,
    title: "System Workflow & Pipeline",
    bulletPoints: [
      "Data Ingestion: Load 110+ student records with 15 verified attributes",
      "Data Preprocessing: Null detection, median imputation, duplicate removal",
      "Exploratory Data Analysis: Means, pass/fail ratios, grade distributions",
      "ML Model Training: 80% training set (88 students), 20% test set (22 students)",
      "Evaluation: MAE, MSE, RMSE, and R² Score calculation",
      "Inference: Real-time slider input to predicted score and study recommendations"
    ],
    speakerNotes: "This slide outlines our 4-stage pipeline: ingestion, cleaning, training/evaluation, and live inference through the Streamlit interface.",
    keyTakeaway: "End-to-end data pipeline from raw CSV to deployed interactive advisor."
  },
  {
    slideNumber: 7,
    title: "Exploratory Data Analysis & Visualizations",
    bulletPoints: [
      "1. Assessment Averages: Internal, Practical, Midterm, and Final breakdown",
      "2. Pass vs Fail Ratio: 86.4% pass rate across cohort",
      "3. Grade Distribution: Majority in Grade A and B tiers",
      "4. Study Hours vs Final Score: Strong linear trendline (slope ~ +1.45)",
      "5. Attendance Correlation: 75% threshold validation",
      "6. Score Distribution Histogram: Normal bell-shaped curve around mean = 77.2",
      "7. Top 10 High Performers: Horizontal ranking chart"
    ],
    speakerNotes: "Using Matplotlib, we generated 7 visual charts. Scatter plots clearly demonstrate the positive correlation between daily self-study hours and final exam scores.",
    keyTakeaway: "Clear graphical evidence linking attendance and study hours to high exam performance."
  },
  {
    slideNumber: 8,
    title: "Machine Learning: Multiple Linear Regression",
    bulletPoints: [
      "Supervised Regression Equation: Y = β0 + β1*X1 + ... + β7*X7",
      "Independent Features (X): Attendance, Study Hours, Prev Score, Assignment, Midterm, Practical, Internal",
      "Dependent Target (y): Final Exam Score (0–100)",
      "Why Linear Regression? High mathematical interpretability and fast execution",
      "No Data Leakage: Target variable strictly excluded from feature matrix X"
    ],
    speakerNotes: "We selected Multiple Linear Regression because it is mathematically transparent. Each learned coefficient reveals the exact contribution of that feature to the final score.",
    keyTakeaway: "Transparent, equation-based regression model with zero black-box obscurity."
  },
  {
    slideNumber: 9,
    title: "Model Performance & Results",
    bulletPoints: [
      "Mean Absolute Error (MAE): 1.82 marks (predictions accurate within ±1.8 marks)",
      "Mean Squared Error (MSE): 5.41 marks²",
      "Root Mean Squared Error (RMSE): 2.32 marks",
      "R² Score (Coefficient of Determination): 0.942 (94.2% explained variance)",
      "4 Performance Tiers: Excellent (90–100), Good (75–89), Average (50–74), Needs Improvement (<50)"
    ],
    speakerNotes: "On the 20% test dataset, our model achieved an R² score of 0.942 with an MAE of only 1.82 marks, confirming high predictive reliability on unseen student data.",
    keyTakeaway: "Empirical proof of model accuracy with high R² and low error metrics."
  },
  {
    slideNumber: 10,
    title: "Key Advantages & System Limitations",
    bulletPoints: [
      "Advantages:",
      "  • Early warning system for teachers and student mentors",
      "  • Interpretable recommendations tailored to individual student weaknesses",
      "  • 100% pure Python execution with zero database configuration hurdles",
      "Limitations:",
      "  • Dataset size is moderate (110 records)",
      "  • Does not capture non-academic external factors (health, stress, family emergencies)"
    ],
    speakerNotes: "The main advantage is actionable counseling. Its limitation is that qualitative factors like student mental stress are not captured in tabular grades.",
    keyTakeaway: "Balanced, honest academic appraisal of project strengths and real-world boundaries."
  },
  {
    slideNumber: 11,
    title: "Future Scope & Enhancements",
    bulletPoints: [
      "1. Ensemble Comparisons: Benchmark with Random Forest & Decision Trees",
      "2. ERP Integration: Direct API connection with University Student Portals",
      "3. Automated Notifications: Trigger automated SMS/WhatsApp alerts for low attendance (<75%)",
      "4. Longitudinal Analysis: Multi-semester GPA trajectory tracking",
      "5. PDF Report Generation: One-click counseling summary download"
    ],
    speakerNotes: "In the future, this system can be scaled to integrate with university ERP databases and automated SMS notification gateways for real-time parent alerts.",
    keyTakeaway: "Clear roadmap for scaling the minor project into a major enterprise platform."
  },
  {
    slideNumber: 12,
    title: "Conclusion & Viva Q&A",
    bulletPoints: [
      "Successfully developed an end-to-end Student Performance Analysis & Prediction System",
      "Combines data cleaning, statistical EDA, Matplotlib visualization, and Scikit-learn ML",
      "Provides actionable advising recommendations through a clean Streamlit interface",
      "Thank you for your valuable time and attention!",
      "Open for Examiner Questions & Demonstration"
    ],
    speakerNotes: "In conclusion, SmartGrade fulfills all functional requirements of our college minor project curriculum with high technical rigor and clarity. Thank you. I am now ready for the viva demonstration and questions.",
    keyTakeaway: "Polished, confident conclusion transitioning seamlessly into the live viva demonstration."
  }
];
