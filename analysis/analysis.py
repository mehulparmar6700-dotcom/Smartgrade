"""
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
