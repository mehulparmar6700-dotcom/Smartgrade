"""
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
