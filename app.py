"""
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
