# SmartGrade – Student Performance Analysis & Prediction System

**A College Minor Project in Python & Machine Learning**

---

## 📌 Project Overview
**SmartGrade** is a complete, beginner-friendly academic minor project built using **Python, Pandas, NumPy, Matplotlib, Scikit-learn, and Streamlit**. The system loads student academic records, performs data cleaning and exploratory data analysis (EDA), calculates summary statistics, plots analytical charts, and utilizes a **Multiple Linear Regression** machine learning model to predict student final performance and provide personalized counseling recommendations.

---

## 🎯 Key Objectives
1. **Data Management:** Store and manage student academic performance data using a clean CSV schema.
2. **Data Cleaning:** Detect missing values, handle null entries, and eliminate duplicate records using Pandas.
3. **Statistical Analysis:** Compute class averages, pass/fail percentages, grade frequencies, and attendance cohorts.
4. **Visual Analytics:** Plot 7 publication-ready Matplotlib charts (bar charts, pie charts, scatter plots with regression trendlines, and histograms).
5. **Machine Learning Prediction:** Implement Multiple Linear Regression (80/20 train/test split) to forecast final exam scores.
6. **Performance Classification:** Categorize students into *Excellent*, *Good*, *Average*, and *Needs Improvement* tiers with actionable study recommendations.
7. **Interactive User Interface:** Provide an easy-to-use Streamlit dashboard for viva demonstration.

---

## 🛠️ Technology Stack
- **Programming Language:** Python 3.9+
- **Data Manipulation:** Pandas & NumPy
- **Data Visualization:** Matplotlib
- **Machine Learning:** Scikit-learn (Linear Regression, Train-Test Split, Metrics)
- **Web Application Framework:** Streamlit
- **Storage:** CSV Dataset (`student_performance.csv`)

---

## 📂 Project Directory Structure
```
Student_Performance_Analysis/
│
├── app.py                      # Main Streamlit web application
├── student_performance.csv     # 100+ student realistic academic dataset
├── requirements.txt            # Python dependencies
├── README.md                   # Setup guide and project documentation
│
├── data/
│   └── student_performance.csv # Backup dataset directory
│
├── model/
│   └── model.py                # Scikit-learn Linear Regression & prediction logic
│
├── analysis/
│   └── analysis.py             # Data cleaning, statistics, and cohort filtering
│
└── visualizations/
    └── charts.py               # Matplotlib graph generation routines
```

---

## 🚀 Installation & Running Instructions

### Step 1: Clone or Extract the Project
Place the project folder on your laptop:
```bash
cd Student_Performance_Analysis
```

### Step 2: Create a Virtual Environment (Optional but Recommended)
```bash
python -m venv venv
# On Windows:
venv\Scripts\activate
# On macOS / Linux:
source venv/bin/activate
```

### Step 3: Install Required Dependencies
```bash
pip install -r requirements.txt
```

### Step 4: Run the Streamlit Application
```bash
streamlit run app.py
```
The application will automatically launch in your default web browser at `http://localhost:8501`.

---

## 🤖 How the Prediction Model Works

### 1. Algorithm: Multiple Linear Regression
Linear Regression predicts a continuous dependent variable ($Y$: Final Exam Score) based on multiple independent features ($X_1, X_2, \dots, X_7$):

$$Y = \beta_0 + \beta_1 X_1 + \beta_2 X_2 + \beta_3 X_3 + \beta_4 X_4 + \beta_5 X_5 + \beta_6 X_6 + \beta_7 X_7$$

Where:
- $X_1$ = Attendance Percentage
- $X_2$ = Daily Study Hours
- $X_3$ = Previous Semester Score
- $X_4$ = Assignment Score
- $X_5$ = Midterm Exam Score
- $X_6$ = Practical / Lab Score
- $X_7$ = Continuous Internal Marks
- $\beta_0$ = Y-Intercept (baseline offset)
- $\beta_1 \dots \beta_7$ = Learned feature coefficients

### 2. Training and Testing Split
The dataset is split into **80% training data** (to learn the mathematical coefficients) and **20% testing data** (to evaluate predictions on unseen records without data leakage).

### 3. Evaluation Metrics
- **Mean Absolute Error (MAE):** Measures average absolute deviation between actual and predicted scores.
- **Mean Squared Error (MSE):** Measures average squared deviation (penalizes large outlier errors).
- **R² Score (Coefficient of Determination):** Represents percentage of score variance explained by features (~0.92 to 0.98).

---

## 📊 Performance Categories
| Final Score Range | Category | Projected Grade | Recommendation Focus |
|---|---|---|---|
| **90 – 100** | **Excellent** | A+ | University rank preparation & competitive contests |
| **75 – 89** | **Good** | A / B | Consistent revision and strong concept consolidation |
| **50 – 74** | **Average** | C / D | Increase study hours and focus on weaker exam modules |
| **Below 50** | **Needs Improvement** | F | Remedial lectures, attendance counseling & daily practice |

---

## 🔮 Future Scope
1. Implement Random Forest Regressor and Decision Tree models for non-linear comparisons.
2. Integrate Automated SMS/Email alerts to parents and student mentors.
3. Add a multi-semester longitudinal tracking module with SQL database storage.
4. Add export capabilities for PDF report generation.
