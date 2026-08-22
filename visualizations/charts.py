"""
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
