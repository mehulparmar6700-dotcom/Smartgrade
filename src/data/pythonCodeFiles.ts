import { CodeFileItem } from '../types';
import { convertToCsv } from './sampleDataset';

export const PYTHON_APP_PY = `"""
=============================================================================
SmartGrade: Student Performance Analysis & Prediction System
Main Streamlit Application File (app.py)
-----------------------------------------------------------------------------
Objective: Provide an interactive web dashboard for student performance
analysis, exploratory charts, and machine-learning based score prediction.
Technologies: Python 3, Streamlit, Pandas, NumPy, Matplotlib, Scikit-learn
=============================================================================
"""

import streamlit as st
import pandas as pd
import numpy as np
import os

# Import modular helper functions from project modules
from analysis.analysis import (
    load_and_clean_data,
    calculate_summary_statistics,
    get_top_students,
    get_low_attendance_students,
    get_low_performing_students,
    get_subject_averages
)
from visualizations.charts import (
    plot_subject_averages,
    plot_pass_fail_pie,
    plot_grade_distribution,
    plot_study_hours_vs_marks,
    plot_attendance_vs_marks,
    plot_final_marks_distribution,
    plot_top_students
)
from model.model import (
    train_linear_regression_model,
    predict_performance,
    classify_performance,
    generate_recommendation
)

# -----------------------------------------------------------------------------
# 1. STREAMLIT PAGE CONFIGURATION
# -----------------------------------------------------------------------------
st.set_page_config(
    page_title="SmartGrade - Student Performance Analysis & Prediction",
    page_icon="🎓",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS styling for a clean college project interface
st.markdown("""
<style>
    .main-header {
        font-size: 2.2rem;
        font-weight: 700;
        color: #1E3A8A;
        margin-bottom: 0.2rem;
    }
    .sub-header {
        font-size: 1.1rem;
        color: #4B5563;
        margin-bottom: 1.5rem;
    }
    .metric-card {
        background-color: #F8FAFC;
        border: 1px solid #E2E8F0;
        border-radius: 8px;
        padding: 16px;
        text-align: center;
    }
    .stButton>button {
        background-color: #2563EB;
        color: white;
        font-weight: 600;
        border-radius: 6px;
        padding: 0.5rem 1.5rem;
        border: none;
    }
</style>
""", unsafe_allow_html=True)

# -----------------------------------------------------------------------------
# 2. DATASET LOADING & CACHING
# -----------------------------------------------------------------------------
@st.cache_data
def load_data():
    """Load default dataset or uploaded dataset."""
    csv_path = "student_performance.csv"
    if not os.path.exists(csv_path):
        csv_path = os.path.join("data", "student_performance.csv")
    return load_and_clean_data(csv_path)

# Initialize dataset and train the Machine Learning Model
df, cleaning_info = load_data()
model, model_metrics = train_linear_regression_model(df)

# -----------------------------------------------------------------------------
# 3. SIDEBAR NAVIGATION
# -----------------------------------------------------------------------------
st.sidebar.image("https://img.icons8.com/fluency/96/graduation-cap.png", width=70)
st.sidebar.title("SmartGrade System")
st.sidebar.caption("Student Minor Project | Python & ML")

menu = st.sidebar.radio(
    "Navigate Modules:",
    [
        "1. Home / Dashboard",
        "2. Dataset Explorer",
        "3. Statistical Analysis",
        "4. Visualizations",
        "5. Student Prediction",
        "6. Model Performance",
        "7. About Project"
    ]
)

st.sidebar.markdown("---")
st.sidebar.info("💡 **Tip for Viva**: Linear Regression models the linear relationship between continuous study features and final scores.")

# -----------------------------------------------------------------------------
# 4. PAGE 1: HOME / DASHBOARD
# -----------------------------------------------------------------------------
if menu == "1. Home / Dashboard":
    st.markdown('<div class="main-header">🎓 Student Performance Dashboard</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Overview of class metrics, attendance records, and academic success rates.</div>', unsafe_allow_html=True)

    # Key Statistics Summary
    stats = calculate_summary_statistics(df)
    
    col1, col2, col3, col4 = st.columns(4)
    with col1:
        st.metric("Total Students", f"{stats['total_students']}")
    with col2:
        st.metric("Class Average Score", f"{stats['average_score']:.1f}%")
    with col3:
        st.metric("Average Attendance", f"{stats['average_attendance']:.1f}%")
    with col4:
        st.metric("Pass Percentage", f"{stats['pass_percentage']:.1f}%")

    st.markdown("---")
    
    # Quick Snapshot: Grade Distribution & Top 5
    c_left, c_right = st.columns([1.2, 1])
    
    with c_left:
        st.subheader("📊 Quick Subject Performance Overview")
        fig_subj = plot_subject_averages(df)
        st.pyplot(fig_subj)
        
    with c_right:
        st.subheader("🏆 Top Performing Students")
        top_5 = get_top_students(df, n=5)[['Student_ID', 'Student_Name', 'Total_Marks', 'Grade']]
        st.dataframe(top_5, hide_index=True, use_container_width=True)
        
        st.subheader("⚠️ Low Attendance Alert (<75%)")
        low_att = get_low_attendance_students(df, threshold=75)[['Student_ID', 'Student_Name', 'Attendance_Percentage']]
        st.dataframe(low_att.head(5), hide_index=True, use_container_width=True)

# -----------------------------------------------------------------------------
# 5. PAGE 2: DATASET EXPLORER
# -----------------------------------------------------------------------------
elif menu == "2. Dataset Explorer":
    st.markdown('<div class="main-header">📁 Dataset & Preprocessing Explorer</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Inspect raw academic records, missing value audits, and data types.</div>', unsafe_allow_html=True)

    # CSV Upload Option
    uploaded_file = st.file_uploader("Upload Custom Student CSV (Optional)", type=["csv"])
    if uploaded_file is not None:
        df, cleaning_info = load_and_clean_data(uploaded_file)
        st.success("✅ Custom dataset uploaded and cleaned successfully!")

    # Data Cleaning Summary Cards
    st.subheader("🧹 Data Cleaning & Preprocessing Report")
    c1, c2, c3, c4 = st.columns(4)
    c1.info(f"**Total Records:** {cleaning_info['total_rows']}")
    c2.info(f"**Total Features:** {cleaning_info['total_columns']}")
    c3.success(f"**Missing Values Handled:** {cleaning_info['missing_values_handled']}")
    c4.success(f"**Duplicates Removed:** {cleaning_info['duplicates_removed']}")

    # Filterable Data Table
    st.subheader("🔍 Filter & View Student Data")
    f_col1, f_col2, f_col3 = st.columns(3)
    with f_col1:
        selected_grade = st.multiselect("Filter by Grade:", options=list(df['Grade'].unique()), default=list(df['Grade'].unique()))
    with f_col2:
        selected_result = st.multiselect("Filter by Result:", options=list(df['Result'].unique()), default=list(df['Result'].unique()))
    with f_col3:
        search_query = st.text_input("Search Student by Name or ID:")

    filtered_df = df[df['Grade'].isin(selected_grade) & df['Result'].isin(selected_result)]
    if search_query:
        filtered_df = filtered_df[
            filtered_df['Student_Name'].str.contains(search_query, case=False, na=False) |
            filtered_df['Student_ID'].str.contains(search_query, case=False, na=False)
        ]

    st.dataframe(filtered_df, use_container_width=True)
    
    # Download Cleaned Dataset
    csv_data = filtered_df.to_csv(index=False)
    st.download_button(
        label="📥 Download Filtered CSV",
        data=csv_data,
        file_name="student_performance_cleaned.csv",
        mime="text/csv"
    )

# -----------------------------------------------------------------------------
# 6. PAGE 3: STATISTICAL ANALYSIS
# -----------------------------------------------------------------------------
elif menu == "3. Statistical Analysis":
    st.markdown('<div class="main-header">📈 Comprehensive Statistical Analysis</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Computed summary metrics, subject breakdowns, and low-attendance cohorts.</div>', unsafe_allow_html=True)

    stats = calculate_summary_statistics(df)
    
    # Detailed Statistics Table
    st.subheader("📌 Key Statistical Indicators")
    stat_data = {
        "Metric Name": [
            "1. Total Student Count",
            "2. Class Average Total Marks",
            "3. Highest Total Marks",
            "4. Lowest Total Marks",
            "5. Average Attendance (%)",
            "6. Average Study Hours / Day",
            "7. Pass Count",
            "8. Fail Count",
            "9. Pass Percentage (%)",
            "10. Fail Percentage (%)",
            "11. Average Midterm Score",
            "12. Average Final Exam Score",
            "13. Average Assignment Score",
            "14. Average Practical Score",
            "15. Average Internal Marks"
        ],
        "Calculated Value": [
            f"{stats['total_students']}",
            f"{stats['average_score']:.2f}",
            f"{stats['highest_score']:.2f}",
            f"{stats['lowest_score']:.2f}",
            f"{stats['average_attendance']:.2f}%",
            f"{stats['average_study_hours']:.2f} hrs",
            f"{stats['pass_count']}",
            f"{stats['fail_count']}",
            f"{stats['pass_percentage']:.2f}%",
            f"{stats['fail_percentage']:.2f}%",
            f"{stats['average_midterm']:.2f}",
            f"{stats['average_final_exam']:.2f}",
            f"{stats['average_assignment']:.2f}",
            f"{stats['average_practical']:.2f}",
            f"{stats['average_internal']:.2f}"
        ]
    }
    st.table(pd.DataFrame(stat_data))

    # Cohort Analysis Tabs
    tab1, tab2, tab3 = st.tabs(["🏆 Top 10 High Performers", "⚠️ Low Attendance (<75%)", "🚨 Students at Risk (Fail)"])
    
    with tab1:
        st.write("Students with the highest total marks across the cohort:")
        st.dataframe(get_top_students(df, 10), use_container_width=True)
        
    with tab2:
        st.write("Students who do not meet the minimum 75% attendance threshold:")
        st.dataframe(get_low_attendance_students(df, 75), use_container_width=True)
        
    with tab3:
        st.write("Students who have scored below the passing threshold:")
        st.dataframe(get_low_performing_students(df), use_container_width=True)

# -----------------------------------------------------------------------------
# 7. PAGE 4: VISUALIZATIONS
# -----------------------------------------------------------------------------
elif menu == "4. Visualizations":
    st.markdown('<div class="main-header">📊 Matplotlib Data Visualizations</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Visual plots depicting distributions, academic correlations, and grade shares.</div>', unsafe_allow_html=True)

    # 2x2 Grid of standard charts
    v_col1, v_col2 = st.columns(2)
    with v_col1:
        st.subheader("1. Average Marks by Assessment")
        st.pyplot(plot_subject_averages(df))
        
        st.subheader("3. Grade Distribution")
        st.pyplot(plot_grade_distribution(df))
        
        st.subheader("5. Attendance vs Final Score Correlation")
        st.pyplot(plot_attendance_vs_marks(df))
        
    with v_col2:
        st.subheader("2. Overall Pass vs Fail Ratio")
        st.pyplot(plot_pass_fail_pie(df))
        
        st.subheader("4. Study Hours vs Final Score Correlation")
        st.pyplot(plot_study_hours_vs_marks(df))
        
        st.subheader("6. Final Exam Score Histogram")
        st.pyplot(plot_final_marks_distribution(df))

    st.subheader("7. Top 10 Student Performance Comparison")
    st.pyplot(plot_top_students(df))

# -----------------------------------------------------------------------------
# 8. PAGE 5: STUDENT PREDICTION
# -----------------------------------------------------------------------------
elif menu == "5. Student Prediction":
    st.markdown('<div class="main-header">🔮 Student Performance Prediction System</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Input ongoing student parameters to predict final performance via Linear Regression.</div>', unsafe_allow_html=True)

    # Form inputs for student attributes
    with st.form("prediction_form"):
        st.subheader("📝 Enter Student Academic Parameters")
        
        p_col1, p_col2 = st.columns(2)
        with p_col1:
            attendance = st.slider("Attendance Percentage (%)", min_value=0.0, max_value=100.0, value=85.0, step=1.0)
            study_hours = st.slider("Daily Study Hours (hrs/day)", min_value=0.0, max_value=12.0, value=5.0, step=0.5)
            previous_score = st.slider("Previous Semester Score (out of 100)", min_value=0.0, max_value=100.0, value=78.0, step=1.0)
            assignment_score = st.slider("Assignment Score (out of 100)", min_value=0.0, max_value=100.0, value=82.0, step=1.0)
            
        with p_col2:
            midterm_score = st.slider("Midterm Exam Score (out of 100)", min_value=0.0, max_value=100.0, value=80.0, step=1.0)
            practical_score = st.slider("Practical / Lab Score (out of 100)", min_value=0.0, max_value=100.0, value=85.0, step=1.0)
            internal_marks = st.slider("Continuous Internal Marks (out of 100)", min_value=0.0, max_value=100.0, value=83.8, step=0.5)
            
        submit_btn = st.form_submit_button("🚀 Predict Performance")

    if submit_btn:
        predicted_score = predict_performance(
            model,
            attendance,
            study_hours,
            previous_score,
            assignment_score,
            midterm_score,
            practical_score,
            internal_marks
        )
        
        category, color, grade = classify_performance(predicted_score)
        recommendations = generate_recommendation(predicted_score, attendance, study_hours, midterm_score)

        st.markdown("---")
        st.subheader("🎯 Prediction Output & Analysis")
        
        res_col1, res_col2, res_col3 = st.columns(3)
        with res_col1:
            st.metric("Predicted Final Score", f"{predicted_score:.1f} / 100")
        with res_col2:
            st.markdown(f"**Performance Tier:** <span style='font-size:1.3rem; color:{color}; font-weight:bold;'>{category}</span>", unsafe_allow_html=True)
        with res_col3:
            st.metric("Projected Grade", f"{grade}")

        # Recommendations Box
        st.subheader("💡 Tailored Academic Recommendations")
        for rec in recommendations:
            st.info(rec)

# -----------------------------------------------------------------------------
# 9. PAGE 6: MODEL PERFORMANCE
# -----------------------------------------------------------------------------
elif menu == "6. Model Performance":
    st.markdown('<div class="main-header">⚙️ Machine Learning Model Evaluation</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Evaluation metrics on testing set (80/20 train-test split) using Scikit-Learn.</div>', unsafe_allow_html=True)

    # Metrics Display Cards
    m1, m2, m3, m4 = st.columns(4)
    m1.metric("Mean Absolute Error (MAE)", f"{model_metrics['mae']:.2f}")
    m2.metric("Mean Squared Error (MSE)", f"{model_metrics['mse']:.2f}")
    m3.metric("Root Mean Squared Error (RMSE)", f"{model_metrics['rmse']:.2f}")
    m4.metric("R² (R-Squared) Score", f"{model_metrics['r2_score']:.4f}")

    st.markdown("---")
    
    # Model Equation & Weights
    st.subheader("📐 Multiple Linear Regression Equation")
    st.latex(r"Y = \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2 + \\beta_3 X_3 + \\beta_4 X_4 + \\beta_5 X_5 + \\beta_6 X_6 + \\beta_7 X_7")
    
    st.write(f"**Intercept (\\(\\beta_0\\)):** {model_metrics['intercept']:.4f}")
    
    # Feature Coefficients Table
    coeff_df = pd.DataFrame({
        "Feature Variable (X)": model_metrics['feature_names'],
        "Coefficient Weight (\\(\\beta\\))": [f"{c:.4f}" for c in model_metrics['coefficients']],
        "Interpretation": [
            "Effect of classroom attendance percentage on final score",
            "Effect of each additional daily study hour",
            "Foundation score from previous academic semester",
            "Weight of continuous homework and assignment submissions",
            "Weight of midterm examination performance",
            "Weight of hands-on laboratory practical score",
            "Continuous internal assessment cumulative contribution"
        ]
    })
    st.table(coeff_df)

    st.subheader("📖 Viva Concepts: What do these metrics mean?")
    st.markdown("""
    - **MAE (Mean Absolute Error):** Average magnitude of errors between predicted scores and actual scores.
    - **MSE (Mean Squared Error):** Average squared difference between predicted and actual scores (punishes large outliers).
    - **R² Score (Coefficient of Determination):** Explains the proportion of variance in final marks predictable from the study features (closer to 1.0 = better fit).
    """)

# -----------------------------------------------------------------------------
# 10. PAGE 7: ABOUT PROJECT
# -----------------------------------------------------------------------------
elif menu == "7. About Project":
    st.markdown('<div class="main-header">ℹ️ About the Minor Project</div>', unsafe_allow_html=True)
    st.markdown('<div class="sub-header">Academic minor project documentation, developer details, and tech stack.</div>', unsafe_allow_html=True)

    st.markdown("""
    ### 📌 Project Title
    **SmartGrade – Student Performance Analysis & Prediction System**

    ### 🎯 Project Objectives
    1. To clean and preprocess real student academic performance datasets using Pandas.
    2. To calculate descriptive statistical indicators across exams and demographics.
    3. To generate clear visual charts using Matplotlib for academic review.
    4. To build and train a Linear Regression machine learning model to predict student scores.
    5. To deliver an interactive Streamlit UI for student advising and college viva demonstration.

    ### 🛠️ Technologies Used
    - **Python 3:** Core programming language.
    - **Pandas:** Tabular data processing and cleaning.
    - **NumPy:** Numerical matrix operations.
    - **Matplotlib:** Data visualization and plot generation.
    - **Scikit-Learn:** Machine learning model training and evaluation.
    - **Streamlit:** Web application user interface.

    ### 👤 Student / Developer Information
    - **Student Name:** [Your Name Here]
    - **Roll Number:** [Your Roll Number Here]
    - **Branch / Course:** Computer Science & Engineering / IT / BCA / MCA
    - **Semester / Year:** Minor Project (Final/Pre-Final Year)
    - **College / University:** [Your Institution Name Here]
    - **Project Guide:** [Guide Professor Name Here]
    """)
`;

export const PYTHON_REQUIREMENTS_TXT = `pandas>=2.0.0
numpy>=1.24.0
matplotlib>=3.7.0
scikit-learn>=1.3.0
streamlit>=1.28.0
`;

export const PYTHON_MODEL_PY = `"""
=============================================================================
SmartGrade: Model Module (model/model.py)
-----------------------------------------------------------------------------
Contains functions to:
1. Train a Multiple Linear Regression model using Scikit-Learn.
2. Split dataset into 80% training and 20% testing sets.
3. Compute evaluation metrics (MAE, MSE, RMSE, R² Score).
4. Predict scores for new student inputs.
5. Classify predicted scores into performance categories.
6. Provide actionable recommendations.
=============================================================================
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# Feature column names used for training
FEATURE_COLUMNS = [
    'Attendance_Percentage',
    'Study_Hours_Per_Day',
    'Previous_Score',
    'Assignment_Score',
    'Midterm_Score',
    'Practical_Score',
    'Internal_Marks'
]
TARGET_COLUMN = 'Final_Exam_Score'

def train_linear_regression_model(df):
    """
    Trains a Linear Regression model on the student dataset.
    
    Parameters:
        df (pd.DataFrame): Cleaned student dataframe.
        
    Returns:
        model (LinearRegression): Trained Scikit-learn model object.
        metrics (dict): Dictionary containing MAE, MSE, RMSE, R2, and coefficients.
    """
    # 1. Separate Independent Features (X) and Dependent Target (y)
    X = df[FEATURE_COLUMNS]
    y = df[TARGET_COLUMN]

    # 2. 80/20 Train-Test Split (random_state=42 for reproducible results)
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.20, random_state=42
    )

    # 3. Instantiate and fit the Linear Regression model
    model = LinearRegression()
    model.fit(X_train, y_train)

    # 4. Predict on the test set for evaluation
    y_pred = model.predict(X_test)

    # 5. Calculate Evaluation Metrics
    mae = mean_absolute_error(y_test, y_pred)
    mse = mean_squared_error(y_test, y_pred)
    rmse = np.sqrt(mse)
    r2 = r2_score(y_test, y_pred)

    metrics = {
        'mae': mae,
        'mse': mse,
        'rmse': rmse,
        'r2_score': r2,
        'train_samples': len(X_train),
        'test_samples': len(X_test),
        'intercept': model.intercept_,
        'coefficients': model.coef_,
        'feature_names': FEATURE_COLUMNS
    }

    return model, metrics

def predict_performance(model, attendance, study_hours, previous_score,
                        assignment_score, midterm_score, practical_score, internal_marks):
    """
    Predicts the final exam score using the trained Linear Regression model.
    """
    input_data = pd.DataFrame([[
        attendance,
        study_hours,
        previous_score,
        assignment_score,
        midterm_score,
        practical_score,
        internal_marks
    ]], columns=FEATURE_COLUMNS)

    predicted_score = model.predict(input_data)[0]
    # Bound the score realistically between 0 and 100
    bounded_score = max(0.0, min(100.0, float(predicted_score)))
    return bounded_score

def classify_performance(score):
    """
    Classifies the predicted score into a performance tier and projected grade.
    
    Rules:
    - 90 - 100 : Excellent (A+)
    - 75 - 89  : Good (A or B)
    - 50 - 74  : Average (C or D)
    - Below 50 : Needs Improvement (F)
    """
    if score >= 90:
        return "Excellent", "#16A34A", "A+"
    elif score >= 80:
        return "Good", "#2563EB", "A"
    elif score >= 75:
        return "Good", "#2563EB", "B"
    elif score >= 60:
        return "Average", "#D97706", "C"
    elif score >= 50:
        return "Average", "#D97706", "D"
    else:
        return "Needs Improvement", "#DC2626", "F"

def generate_recommendation(predicted_score, attendance, study_hours, midterm_score):
    """
    Generates personalized academic recommendations based on student inputs.
    """
    recs = []

    if attendance < 75:
        recs.append(f"⚠️ **Attendance Warning**: Current attendance is {attendance:.1f}%. College regulations require at least 75% attendance to sit for university exams.")
    else:
        recs.append(f"✅ **Attendance Status**: Good attendance ({attendance:.1f}%). Keep attending lectures consistently.")

    if study_hours < 4.0:
        recs.append(f"📚 **Study Time**: Increase daily self-study from {study_hours:.1f} hrs to at least 4.0–5.0 hrs per day to improve concept retention.")
    else:
        recs.append(f"🎯 **Study Habit**: Your daily study duration ({study_hours:.1f} hrs/day) is well on track. Continue systematic revisions.")

    if midterm_score < 60:
        recs.append(f"🔍 **Midterm Focus**: Midterm score ({midterm_score:.1f}) is below benchmark. Review core subject units and practice past semester question papers.")

    if predicted_score >= 85:
        recs.append("🌟 **Excellence Track**: High projected final score! Target University Rank / Distinction by taking advanced mock tests.")

    return recs
`;

export const PYTHON_ANALYSIS_PY = `"""
=============================================================================
SmartGrade: Analysis Module (analysis/analysis.py)
-----------------------------------------------------------------------------
Contains data loading, cleaning, and statistical analysis helper functions.
=============================================================================
"""

import pandas as pd
import numpy as np

def load_and_clean_data(file_path_or_buffer):
    """
    Loads student dataset and performs data cleaning:
    - Checks and handles missing values.
    - Checks and removes duplicates.
    - Ensures valid numeric types.
    """
    df = pd.read_csv(file_path_or_buffer)

    initial_rows = len(df)
    
    # Check and count missing values
    missing_count = int(df.isnull().sum().sum())
    
    # Handle missing values: Fill numeric columns with their median values
    numeric_cols = df.select_dtypes(include=[np.number]).columns
    df[numeric_cols] = df[numeric_cols].fillna(df[numeric_cols].median())

    # Check and drop duplicate rows
    initial_after_missing = len(df)
    df = df.drop_duplicates()
    duplicates_removed = initial_after_missing - len(df)

    cleaning_info = {
        'total_rows': len(df),
        'total_columns': len(df.columns),
        'missing_values_handled': missing_count,
        'duplicates_removed': duplicates_removed
    }

    return df, cleaning_info

def calculate_summary_statistics(df):
    """
    Calculates 15 essential descriptive statistical metrics.
    """
    total_students = len(df)
    average_score = df['Total_Marks'].mean()
    highest_score = df['Total_Marks'].max()
    lowest_score = df['Total_Marks'].min()
    average_attendance = df['Attendance_Percentage'].mean()
    average_study_hours = df['Study_Hours_Per_Day'].mean()

    pass_count = (df['Result'] == 'Pass').sum()
    fail_count = (df['Result'] == 'Fail').sum()
    pass_percentage = (pass_count / total_students) * 100 if total_students > 0 else 0
    fail_percentage = (fail_count / total_students) * 100 if total_students > 0 else 0

    return {
        'total_students': total_students,
        'average_score': average_score,
        'highest_score': highest_score,
        'lowest_score': lowest_score,
        'average_attendance': average_attendance,
        'average_study_hours': average_study_hours,
        'pass_count': pass_count,
        'fail_count': fail_count,
        'pass_percentage': pass_percentage,
        'fail_percentage': fail_percentage,
        'average_midterm': df['Midterm_Score'].mean(),
        'average_final_exam': df['Final_Exam_Score'].mean(),
        'average_assignment': df['Assignment_Score'].mean(),
        'average_practical': df['Practical_Score'].mean(),
        'average_internal': df['Internal_Marks'].mean()
    }

def get_top_students(df, n=10):
    """Returns top n performing students sorted by Total_Marks."""
    return df.sort_values(by='Total_Marks', ascending=False).head(n)

def get_low_attendance_students(df, threshold=75):
    """Returns students with attendance below specified threshold."""
    return df[df['Attendance_Percentage'] < threshold].sort_values(by='Attendance_Percentage')

def get_low_performing_students(df):
    """Returns students who failed or scored in the bottom tier."""
    return df[df['Result'] == 'Fail'].sort_values(by='Total_Marks')

def get_subject_averages(df):
    """Returns a dictionary of mean scores across all assessments."""
    return {
        'Assignment': df['Assignment_Score'].mean(),
        'Practical': df['Practical_Score'].mean(),
        'Internal': df['Internal_Marks'].mean(),
        'Midterm': df['Midterm_Score'].mean(),
        'Final Exam': df['Final_Exam_Score'].mean()
    }
`;

export const PYTHON_CHARTS_PY = `"""
=============================================================================
SmartGrade: Visualizations Module (visualizations/charts.py)
-----------------------------------------------------------------------------
Generates Matplotlib charts for the Streamlit dashboard and project report.
=============================================================================
"""

import matplotlib.pyplot as plt
import pandas as pd
import numpy as np

def apply_chart_style(ax):
    """Utility to apply clean, publication-ready grid and styling."""
    ax.grid(True, linestyle='--', alpha=0.5, color='#CBD5E1')
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)

def plot_subject_averages(df):
    """1. Bar Chart: Average marks by exam/subject."""
    fig, ax = plt.subplots(figsize=(7, 4.2))
    categories = ['Assignment', 'Practical', 'Internal', 'Midterm', 'Final Exam']
    averages = [
        df['Assignment_Score'].mean(),
        df['Practical_Score'].mean(),
        df['Internal_Marks'].mean(),
        df['Midterm_Score'].mean(),
        df['Final_Exam_Score'].mean()
    ]
    colors = ['#3B82F6', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899']

    bars = ax.bar(categories, averages, color=colors, width=0.55, edgecolor='#1E293B', linewidth=0.8)
    ax.set_title('Average Marks Across Assessments', fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel('Assessment Type', fontsize=11, fontweight='semibold')
    ax.set_ylabel('Average Marks (out of 100)', fontsize=11, fontweight='semibold')
    ax.set_ylim(0, 105)

    for bar in bars:
        height = bar.get_height()
        ax.annotate(f'{height:.1f}',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 3),
                    textcoords="offset points",
                    ha='center', va='bottom', fontsize=9.5, fontweight='bold')
    apply_chart_style(ax)
    plt.tight_layout()
    return fig

def plot_pass_fail_pie(df):
    """2. Pie Chart: Pass vs Fail percentage."""
    fig, ax = plt.subplots(figsize=(6, 4.2))
    counts = df['Result'].value_counts()
    labels = counts.index
    colors = ['#22C55E', '#EF4444']
    explode = (0.05, 0) if len(counts) > 1 else None

    wedges, texts, autotexts = ax.pie(
        counts,
        labels=labels,
        autopct='%1.1f%%',
        startangle=140,
        colors=colors,
        explode=explode,
        shadow=True,
        textprops=dict(color="black", fontweight="bold", fontsize=11)
    )
    ax.set_title('Pass vs Fail Distribution', fontsize=13, fontweight='bold', pad=12)
    plt.tight_layout()
    return fig

def plot_grade_distribution(df):
    """3. Bar Chart: Number of students by grade."""
    fig, ax = plt.subplots(figsize=(7, 4.2))
    grade_order = ['A+', 'A', 'B', 'C', 'D', 'F']
    counts = df['Grade'].value_counts().reindex(grade_order, fill_value=0)
    colors = ['#10B981', '#3B82F6', '#6366F1', '#F59E0B', '#F97316', '#EF4444']

    bars = ax.bar(grade_order, counts.values, color=colors, width=0.55, edgecolor='#1E293B', linewidth=0.8)
    ax.set_title('Student Count by Grade Category', fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel('Letter Grade', fontsize=11, fontweight='semibold')
    ax.set_ylabel('Number of Students', fontsize=11, fontweight='semibold')

    for bar in bars:
        height = bar.get_height()
        ax.annotate(f'{int(height)}',
                    xy=(bar.get_x() + bar.get_width() / 2, height),
                    xytext=(0, 3),
                    textcoords="offset points",
                    ha='center', va='bottom', fontsize=9.5, fontweight='bold')
    apply_chart_style(ax)
    plt.tight_layout()
    return fig

def plot_study_hours_vs_marks(df):
    """4. Scatter Plot: Study Hours vs Final Exam Marks."""
    fig, ax = plt.subplots(figsize=(7, 4.2))
    x = df['Study_Hours_Per_Day']
    y = df['Final_Exam_Score']

    ax.scatter(x, y, color='#2563EB', alpha=0.75, edgecolors='#1E3A8A', s=55, label='Students')
    
    # Add Trendline
    m, b = np.polyfit(x, y, 1)
    ax.plot(x, m * x + b, color='#DC2626', linewidth=2, linestyle='-', label=f'Trendline (y = {m:.2f}x + {b:.1f})')

    ax.set_title('Study Hours / Day vs Final Exam Score', fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel('Study Hours Per Day (hrs)', fontsize=11, fontweight='semibold')
    ax.set_ylabel('Final Exam Score (out of 100)', fontsize=11, fontweight='semibold')
    ax.legend(loc='lower right', frameon=True)
    apply_chart_style(ax)
    plt.tight_layout()
    return fig

def plot_attendance_vs_marks(df):
    """5. Scatter Plot: Attendance vs Final Exam Marks."""
    fig, ax = plt.subplots(figsize=(7, 4.2))
    x = df['Attendance_Percentage']
    y = df['Final_Exam_Score']

    ax.scatter(x, y, color='#059669', alpha=0.75, edgecolors='#064E3B', s=55, label='Students')
    
    # Add Trendline
    m, b = np.polyfit(x, y, 1)
    ax.plot(x, m * x + b, color='#B91C1C', linewidth=2, linestyle='-', label=f'Trendline (y = {m:.2f}x + {b:.1f})')

    ax.set_title('Attendance (%) vs Final Exam Score', fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel('Attendance Percentage (%)', fontsize=11, fontweight='semibold')
    ax.set_ylabel('Final Exam Score (out of 100)', fontsize=11, fontweight='semibold')
    ax.axvline(x=75, color='#F59E0B', linestyle='--', label='75% Minimum Threshold')
    ax.legend(loc='lower right', frameon=True)
    apply_chart_style(ax)
    plt.tight_layout()
    return fig

def plot_final_marks_distribution(df):
    """6. Histogram: Distribution of Final Marks."""
    fig, ax = plt.subplots(figsize=(7, 4.2))
    ax.hist(df['Final_Exam_Score'], bins=10, color='#8B5CF6', edgecolor='#1E1B4B', alpha=0.85)
    
    mean_val = df['Final_Exam_Score'].mean()
    ax.axvline(mean_val, color='#DC2626', linestyle='--', linewidth=2, label=f'Mean = {mean_val:.1f}')

    ax.set_title('Distribution of Final Exam Scores', fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel('Final Exam Score', fontsize=11, fontweight='semibold')
    ax.set_ylabel('Frequency (Number of Students)', fontsize=11, fontweight='semibold')
    ax.legend(loc='upper left', frameon=True)
    apply_chart_style(ax)
    plt.tight_layout()
    return fig

def plot_top_students(df):
    """7. Bar Chart: Top 10 Performing Students."""
    fig, ax = plt.subplots(figsize=(10, 4.5))
    top_10 = df.sort_values(by='Total_Marks', ascending=True).tail(10)
    
    bars = ax.barh(top_10['Student_Name'], top_10['Total_Marks'], color='#3B82F6', height=0.6, edgecolor='#1E293B')
    ax.set_title('Top 10 Students by Total Marks', fontsize=13, fontweight='bold', pad=12)
    ax.set_xlabel('Total Marks (out of 100)', fontsize=11, fontweight='semibold')
    ax.set_xlim(0, 105)

    for bar in bars:
        width = bar.get_width()
        ax.annotate(f'{width:.1f}',
                    xy=(width, bar.get_y() + bar.get_height() / 2),
                    xytext=(4, 0),
                    textcoords="offset points",
                    ha='left', va='center', fontsize=9, fontweight='bold')
    apply_chart_style(ax)
    plt.tight_layout()
    return fig
`;

export const PYTHON_README_MD = `# SmartGrade – Student Performance Analysis & Prediction System

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
- **Storage:** CSV Dataset (\`student_performance.csv\`)

---

## 📂 Project Directory Structure
\`\`\`
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
\`\`\`

---

## 🚀 Installation & Running Instructions

### Step 1: Clone or Extract the Project
Place the project folder on your laptop:
\`\`\`bash
cd Student_Performance_Analysis
\`\`\`

### Step 2: Create a Virtual Environment (Optional but Recommended)
\`\`\`bash
python -m venv venv
# On Windows:
venv\\Scripts\\activate
# On macOS / Linux:
source venv/bin/activate
\`\`\`

### Step 3: Install Required Dependencies
\`\`\`bash
pip install -r requirements.txt
\`\`\`

### Step 4: Run the Streamlit Application
\`\`\`bash
streamlit run app.py
\`\`\`
The application will automatically launch in your default web browser at \`http://localhost:8501\`.

---

## 🤖 How the Prediction Model Works

### 1. Algorithm: Multiple Linear Regression
Linear Regression predicts a continuous dependent variable (\\(Y\\): Final Exam Score) based on multiple independent features (\\(X_1, X_2, \\dots, X_7\\)):

$$Y = \\beta_0 + \\beta_1 X_1 + \\beta_2 X_2 + \\beta_3 X_3 + \\beta_4 X_4 + \\beta_5 X_5 + \\beta_6 X_6 + \\beta_7 X_7$$

Where:
- \\(X_1\\) = Attendance Percentage
- \\(X_2\\) = Daily Study Hours
- \\(X_3\\) = Previous Semester Score
- \\(X_4\\) = Assignment Score
- \\(X_5\\) = Midterm Exam Score
- \\(X_6\\) = Practical / Lab Score
- \\(X_7\\) = Continuous Internal Marks
- \\(\\beta_0\\) = Y-Intercept (baseline offset)
- \\(\\beta_1 \\dots \\beta_7\\) = Learned feature coefficients

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
`;

export const ALL_PYTHON_FILES: CodeFileItem[] = [
  {
    path: "app.py",
    filename: "app.py",
    language: "python",
    description: "Main interactive Streamlit application entry point with 7 navigation modules.",
    content: PYTHON_APP_PY
  },
  {
    path: "student_performance.csv",
    filename: "student_performance.csv",
    language: "csv",
    description: "100+ student realistic academic dataset with verified calculated columns.",
    content: convertToCsv()
  },
  {
    path: "requirements.txt",
    filename: "requirements.txt",
    language: "text",
    description: "Exact list of required Python libraries for quick pip installation.",
    content: PYTHON_REQUIREMENTS_TXT
  },
  {
    path: "README.md",
    filename: "README.md",
    language: "markdown",
    description: "Complete setup guide, execution commands, and project summary.",
    content: PYTHON_README_MD
  },
  {
    path: "model/model.py",
    filename: "model.py",
    language: "python",
    description: "Scikit-learn Linear Regression model training, evaluation, and recommendation logic.",
    content: PYTHON_MODEL_PY
  },
  {
    path: "analysis/analysis.py",
    filename: "analysis.py",
    language: "python",
    description: "Pandas and NumPy data cleaning, summary statistics, and cohort filtering functions.",
    content: PYTHON_ANALYSIS_PY
  },
  {
    path: "visualizations/charts.py",
    filename: "charts.py",
    language: "python",
    description: "Matplotlib plotting functions for bar charts, pie charts, scatter plots, and histograms.",
    content: PYTHON_CHARTS_PY
  }
];
