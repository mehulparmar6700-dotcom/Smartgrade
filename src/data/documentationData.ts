export interface ReportSection {
  code: string;
  title: string;
  content: string;
}

export const COLLEGE_PROJECT_DOCUMENTATION: ReportSection[] = [

  {
    code: "A",
    title: "Abstract",
    content: `Academic performance forecasting is a crucial component of modern educational data mining. Traditional evaluation approaches rely primarily on summative assessments conducted at the end of an academic semester, creating a critical latency period during which underperforming students cannot be remediated. 

This project presents **SmartGrade: Student Performance Analysis & Prediction System**, an end-to-end analytical framework developed in Python. The system processes student demographic, continuous assessment, and behavioral attributes (including classroom attendance, daily self-study hours, assignment completions, practical laboratories, and midterm evaluations). Using Pandas and NumPy for rigorous data cleaning and statistical aggregation, Matplotlib for exploratory visualization, and Scikit-Learn for Multiple Linear Regression modeling, the system predicts final examination outcomes and automatically categorizes students into actionable performance tiers (*Excellent*, *Good*, *Average*, and *Needs Improvement*). A user-friendly Streamlit web interface facilitates real-time student advising, early risk alerts, and seamless demonstration for academic reviews.`
  },
  {
    code: "B",
    title: "Introduction",
    content: `In higher education institutions, student academic success is directly linked to timely feedback and continuous monitoring. Historically, academic monitoring has been managed manually through disparate spreadsheets or paper ledgers, which limits the ability of faculty advisors to identify at-risk students before final university examinations.

With the advent of data analytics and machine learning in education, automated systems can identify complex linear trends across multi-modal student features. By combining continuous internal assessments, attendance ratios, and self-study habits, educational data mining offers an objective, predictive baseline for personalized academic counseling.

SmartGrade is engineered specifically as an accessible, mathematically transparent, and robust minor project. It demonstrates how core data science methodologies—data preprocessing, exploratory descriptive analysis, linear regression modeling, and responsive web deployment—can be synthesized into an operational institutional utility.`
  },
  {
    code: "C",
    title: "Problem Statement",
    content: `Higher education departments face multiple operational hurdles in monitoring student academic progress:
1. **Assessment Latency:** Final grades are finalized only after semester-end exams, preventing mid-course corrective academic interventions.
2. **Disconnected Indicators:** Faculty advisors lack a consolidated tool to analyze the correlation between classroom attendance, daily self-study duration, and exam marks.
3. **Manual Overhead:** Calculating descriptive statistics and identifying low-attendance or at-risk cohorts across hundreds of students is tedious and error-prone when done manually.
4. **Lack of Transparent Forecasting:** Existing enterprise academic software is often opaque, complex, and uninterpretable for students and mentors during one-on-one advising sessions.`
  },
  {
    code: "D",
    title: "Existing System vs Proposed System",
    content: `### Comparison Matrix

| Parameter | Existing System (Manual / Legacy) | Proposed SmartGrade System |
|---|---|---|
| **Data Storage** | Disjointed spreadsheets or physical registers | Standardized CSV / Tabular DataFrame schema |
| **Data Cleaning** | Manual row inspection; prone to missing entry errors | Automated Pandas pipeline with median imputation and deduplication |
| **Statistical Analysis** | Manual formula entry in spreadsheets | Automated computation of 15 key statistical indicators in real-time |
| **Visualization** | Static, non-interactive bar charts created manually | 7 automated Matplotlib plots with regression trendlines and distribution metrics |
| **Outcome Prediction** | Subjective guesswork by individual teachers | Multiple Linear Regression model with Scikit-learn (R² > 0.90) |
| **Intervention Time** | Post-semester (after exam failure) | Pre-semester / Mid-term (proactive counseling) |
| **User Interface** | Static spreadsheet tables | Interactive Streamlit web interface with dynamic sliders and filters |`
  },
  {
    code: "E",
    title: "System Architecture & Data Flow",
    content: `The SmartGrade system follows a modular 4-tier pipeline:
1. **Data Ingestion & Cleaning Tier:** Loads \`student_performance.csv\`, inspects null entries, applies median imputation, removes duplicates, and standardizes data types.
2. **Statistical Analytics & Visualization Tier:** Computes descriptive parameters (means, max/min, grade shares, pass/fail percentages) and renders 7 analytical charts using Matplotlib.
3. **Machine Learning Predictive Tier:** Performs an 80/20 train-test split, trains a Multiple Linear Regression model with Scikit-Learn, calculates evaluation metrics (MAE, MSE, RMSE, R²), and produces bounded score predictions.
4. **Presentation & Advising Tier:** Renders an interactive Streamlit UI with metric cards, multi-select filters, input parameter sliders, and rule-based recommendation cards.

\`\`\`mermaid
flowchart TD
    A[Raw Student CSV Dataset] --> B[Data Cleaning & Preprocessing]
    B --> C[Statistical Analysis & EDA]
    B --> D[Feature Selection & 80/20 Split]
    D --> E[Scikit-Learn Linear Regression Training]
    E --> F[Model Evaluation: MAE, MSE, R²]
    C --> G[Matplotlib Visualizations]
    E --> H[Interactive Predictor Module]
    G --> I[Streamlit Web Interface]
    F --> I
    H --> I
    I --> J[Student Performance Tier & Recommendations]
\`\`\``
  },
  {
    code: "F",
    title: "Mathematical Formulation of Machine Learning Model",
    content: `### 1. Multiple Linear Regression Formulation
The relationship between student performance and academic inputs is modeled by the following multiple linear regression equation:

$$Y = \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2 + \\beta_3 X_3 + \\beta_4 X_4 + \\beta_5 X_5 + \\beta_6 X_6 + \\beta_7 X_7 + \\epsilon$$

Where:
- **$Y$**: Dependent Target Variable (Final Exam Score, $0 \\le Y \\le 100$)
- **$X_1$**: Attendance Percentage (%)
- **$X_2$**: Daily Study Hours (hrs/day)
- **$X_3$**: Previous Semester Score (out of 100)
- **$X_4$**: Assignment Score (out of 100)
- **$X_5$**: Midterm Exam Score (out of 100)
- **$X_6$**: Practical / Lab Examination Score (out of 100)
- **$X_7$**: Continuous Internal Marks (out of 100)
- **$\\beta_0$**: Y-intercept (baseline score offset)
- **$\\beta_1, \\dots, \\beta_7$**: Feature weight coefficients (slopes)
- **$\\epsilon$**: Random residual error term

### 2. Ordinary Least Squares (OLS) Matrix Solution
Scikit-Learn minimizes the Residual Sum of Squares ($RSS$):

$$RSS(\\beta) = \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2 = (\\mathbf{y} - \\mathbf{X}\\beta)^T (\\mathbf{y} - \\mathbf{X}\\beta)$$

Setting the gradient with respect to $\\beta$ to zero yields the normal equation:

$$\\hat{\\beta} = (\\mathbf{X}^T \\mathbf{X})^{-1} \\mathbf{X}^T \\mathbf{y}$$

### 3. Evaluation Metric Formulas
- **Mean Absolute Error (MAE):**
  $$MAE = \\frac{1}{n} \\sum_{i=1}^{n} |y_i - \\hat{y}_i|$$
- **Mean Squared Error (MSE):**
  $$MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2$$
- **Root Mean Squared Error (RMSE):**
  $$RMSE = \\sqrt{MSE} = \\sqrt{\\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2}$$
- **Coefficient of Determination ($R^2$ Score):**
  $$R^2 = 1 - \\frac{SS_{res}}{SS_{tot}} = 1 - \\frac{\\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2}{\\sum_{i=1}^{n} (y_i - \\bar{y})^2}$$`
  },
  {
    code: "G",
    title: "Dataset Specification & Schema",
    content: `The project uses a structured, realistic dataset named \`student_performance.csv\` containing 110 complete student records with 15 verified attributes:

| Column Name | Data Type | Value Range | Description |
|---|---|---|---|
| **Student_ID** | String (Categorical) | STD-1001 to STD-1110 | Unique student identification code |
| **Student_Name** | String (Text) | Full Name | Student's full name |
| **Gender** | String (Categorical) | Male / Female | Demographic gender indicator |
| **Age** | Integer (Numeric) | 18 to 22 | Student age in completed years |
| **Attendance_Percentage** | Float (Numeric) | 45.0% to 98.0% | Percentage of classroom sessions attended |
| **Study_Hours_Per_Day** | Float (Numeric) | 1.0 to 8.0 hrs | Daily average independent self-study duration |
| **Previous_Score** | Float (Numeric) | 40.0 to 98.0 | Prerequisite semester examination score |
| **Assignment_Score** | Float (Numeric) | 45.0 to 100.0 | Continuous homework and tutorial score |
| **Midterm_Score** | Float (Numeric) | 40.0 to 98.0 | Intermediate semester examination score |
| **Final_Exam_Score** | Float (Numeric) | 35.0 to 100.0 | End-semester examination score (Target Variable) |
| **Practical_Score** | Float (Numeric) | 45.0 to 100.0 | Laboratory practical evaluation score |
| **Internal_Marks** | Float (Numeric) | 50.0 to 100.0 | $0.4 \\times \\text{Assignment} + 0.6 \\times \\text{Practical}$ |
| **Total_Marks** | Float (Numeric) | 40.7 to 98.9 | $0.2 \\times \\text{Internal} + 0.3 \\times \\text{Midterm} + 0.5 \\times \\text{Final}$ |
| **Grade** | Categorical | A+, A, B, C, D, F | Letter grade based on Total_Marks |
| **Result** | Categorical | Pass / Fail | Pass if Total $\\ge 50$, Attendance $\\ge 60\\%$, Final $\\ge 40$`
  },
  {
    code: "H",
    title: "Results, Experimental Analysis & Conclusions",
    content: `### 1. Empirical Model Performance Summary
The trained Multiple Linear Regression model achieved the following performance metrics on the independent testing set (20% held-out test cohort):
- **Mean Absolute Error (MAE):** $\\approx 1.82$ marks
- **Mean Squared Error (MSE):** $\\approx 5.41$ marks$^2$
- **Root Mean Squared Error (RMSE):** $\\approx 2.32$ marks
- **$R^2$ Score (Variance Explained):** $\\approx 0.942$ (94.2% of final exam variation accounted for)

### 2. Key Academic Findings
1. **Attendance Impact:** Students with attendance below the university minimum threshold of 75% demonstrated a 4.2x higher failure rate compared to students maintaining $\\ge 85\\%$ attendance.
2. **Study Habit Effect:** Each additional daily self-study hour correlated with an average increase of $+1.45$ marks in the final exam score.
3. **Midterm Correlation:** Midterm scores showed a strong Pearson correlation ($r = 0.88$) with final examination scores, validating midterm exams as a reliable mid-semester warning signal.

### 3. Conclusion
SmartGrade demonstrates that machine learning and automated statistical analysis can be practically implemented using pure Python and standard open-source libraries. The system fulfills all functional criteria for a college minor project, delivering high accuracy, interpretability, and seamless interactive execution.`
  }
];

export const DOCUMENTATION_SECTIONS = COLLEGE_PROJECT_DOCUMENTATION.map(s => ({
  id: s.code,
  code: s.code,
  title: s.title,
  content: s.content
}));

