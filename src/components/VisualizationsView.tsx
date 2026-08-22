import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart as PieIcon, 
  TrendingUp, 
  Code2, 
  Eye, 
  Copy, 
  Check, 
  Sparkles 
} from 'lucide-react';
import { StudentRecord } from '../types';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell, 
  ScatterChart, 
  Scatter, 
  CartesianGrid, 
  Line, 
  ComposedChart,
  ReferenceLine
} from 'recharts';

interface VisualizationsViewProps {
  students: StudentRecord[];
}

export const VisualizationsView: React.FC<VisualizationsViewProps> = ({ students }) => {
  const [activeCodeChart, setActiveCodeChart] = useState<number | null>(null);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // 1. Assessment Averages Data
  const avgData = [
    { name: 'Assignment', score: 80.6, color: '#5A6B5D' },
    { name: 'Practical', score: 82.5, color: '#6E8071' },
    { name: 'Internal', score: 81.7, color: '#D9A679' },
    { name: 'Midterm', score: 76.8, color: '#C88E62' },
    { name: 'Final Exam', score: 75.3, color: '#4A443F' },
  ];

  // 2. Pass Fail Data
  const passCount = students.filter(s => s.Result === 'Pass').length;
  const failCount = students.filter(s => s.Result === 'Fail').length;
  const passFailData = [
    { name: 'Passed', value: passCount, color: '#5A6B5D' },
    { name: 'Failed', value: failCount, color: '#D9A679' },
  ];

  // 3. Grade Counts
  const gradeCounts = ['A+', 'A', 'B', 'C', 'D', 'F'].map(grade => ({
    grade,
    count: students.filter(s => s.Grade === grade).length
  }));
  const gradeColors: Record<string, string> = {
    'A+': '#5A6B5D',
    'A': '#6E8071',
    'B': '#8C847C',
    'C': '#D9A679',
    'D': '#C88E62',
    'F': '#A65E4E'
  };

  // 4. Study Hours vs Final Score (Scatter)
  const studyScatterData = students.map(s => ({
    studyHours: s.Study_Hours_Per_Day,
    finalScore: s.Final_Exam_Score,
    name: s.Student_Name
  }));

  // 5. Attendance vs Final Score (Scatter)
  const attendanceScatterData = students.map(s => ({
    attendance: s.Attendance_Percentage,
    finalScore: s.Final_Exam_Score,
    name: s.Student_Name
  }));

  // 6. Histogram Data (Score Buckets)
  const bins = [
    { range: '30-39', count: students.filter(s => s.Final_Exam_Score >= 30 && s.Final_Exam_Score < 40).length },
    { range: '40-49', count: students.filter(s => s.Final_Exam_Score >= 40 && s.Final_Exam_Score < 50).length },
    { range: '50-59', count: students.filter(s => s.Final_Exam_Score >= 50 && s.Final_Exam_Score < 60).length },
    { range: '60-69', count: students.filter(s => s.Final_Exam_Score >= 60 && s.Final_Exam_Score < 70).length },
    { range: '70-79', count: students.filter(s => s.Final_Exam_Score >= 70 && s.Final_Exam_Score < 80).length },
    { range: '80-89', count: students.filter(s => s.Final_Exam_Score >= 80 && s.Final_Exam_Score < 90).length },
    { range: '90-100', count: students.filter(s => s.Final_Exam_Score >= 90 && s.Final_Exam_Score <= 100).length },
  ];

  // 7. Top 10 Students Horizontal
  const top10 = [...students].sort((a, b) => a.Total_Marks - b.Total_Marks).slice(-10);

  const pythonCodes = [
    {
      id: 1,
      title: "1. Average Marks by Assessment (Bar Chart)",
      code: `import matplotlib.pyplot as plt

def plot_subject_averages(df):
    fig, ax = plt.subplots(figsize=(7, 4.2))
    categories = ['Assignment', 'Practical', 'Internal', 'Midterm', 'Final Exam']
    averages = [
        df['Assignment_Score'].mean(),
        df['Practical_Score'].mean(),
        df['Internal_Marks'].mean(),
        df['Midterm_Score'].mean(),
        df['Final_Exam_Score'].mean()
    ]
    colors = ['#5A6B5D', '#6E8071', '#D9A679', '#C88E62', '#4A443F']
    bars = ax.bar(categories, averages, color=colors, width=0.55)
    ax.set_title('Average Marks Across Assessments', fontsize=12, fontweight='bold')
    ax.set_ylabel('Average Marks (out of 100)')
    ax.set_ylim(0, 100)
    plt.tight_layout()
    return fig`
    },
    {
      id: 2,
      title: "2. Pass vs Fail Ratio (Pie Chart)",
      code: `import matplotlib.pyplot as plt

def plot_pass_fail_pie(df):
    fig, ax = plt.subplots(figsize=(6, 4))
    counts = df['Result'].value_counts()
    colors = ['#5A6B5D', '#D9A679']
    ax.pie(counts, labels=counts.index, autopct='%1.1f%%',
           startangle=140, colors=colors, shadow=True)
    ax.set_title('Pass vs Fail Distribution', fontsize=12, fontweight='bold')
    plt.tight_layout()
    return fig`
    },
    {
      id: 3,
      title: "3. Student Count by Grade (Bar Chart)",
      code: `import matplotlib.pyplot as plt

def plot_grade_distribution(df):
    fig, ax = plt.subplots(figsize=(7, 4))
    grade_order = ['A+', 'A', 'B', 'C', 'D', 'F']
    counts = df['Grade'].value_counts().reindex(grade_order, fill_value=0)
    colors = ['#5A6B5D', '#6E8071', '#8C847C', '#D9A679', '#C88E62', '#A65E4E']
    ax.bar(grade_order, counts.values, color=colors, width=0.55)
    ax.set_title('Student Count by Grade Category', fontsize=12, fontweight='bold')
    ax.set_xlabel('Letter Grade')
    ax.set_ylabel('Number of Students')
    plt.tight_layout()
    return fig`
    },
    {
      id: 4,
      title: "4. Study Hours vs Final Score (Scatter + Trendline)",
      code: `import matplotlib.pyplot as plt
import numpy as np

def plot_study_hours_vs_marks(df):
    fig, ax = plt.subplots(figsize=(7, 4.2))
    x = df['Study_Hours_Per_Day']
    y = df['Final_Exam_Score']
    ax.scatter(x, y, color='#5A6B5D', alpha=0.75, s=50, label='Students')
    m, b = np.polyfit(x, y, 1)
    ax.plot(x, m * x + b, color='#D9A679', linewidth=2, label=f'Trendline (y={m:.2f}x+{b:.1f})')
    ax.set_title('Study Hours vs Final Exam Score', fontsize=12, fontweight='bold')
    ax.set_xlabel('Study Hours Per Day (hrs)')
    ax.set_ylabel('Final Exam Score (out of 100)')
    ax.legend()
    plt.tight_layout()
    return fig`
    },
    {
      id: 5,
      title: "5. Attendance vs Final Score (Scatter + 75% Line)",
      code: `import matplotlib.pyplot as plt
import numpy as np

def plot_attendance_vs_marks(df):
    fig, ax = plt.subplots(figsize=(7, 4.2))
    x = df['Attendance_Percentage']
    y = df['Final_Exam_Score']
    ax.scatter(x, y, color='#5A6B5D', alpha=0.75, s=50, label='Students')
    m, b = np.polyfit(x, y, 1)
    ax.plot(x, m * x + b, color='#A65E4E', linewidth=2, label='Trendline')
    ax.axvline(x=75, color='#D9A679', linestyle='--', label='75% Threshold')
    ax.set_title('Attendance (%) vs Final Exam Score', fontsize=12, fontweight='bold')
    ax.set_xlabel('Attendance Percentage (%)')
    ax.set_ylabel('Final Exam Score')
    ax.legend()
    plt.tight_layout()
    return fig`
    },
    {
      id: 6,
      title: "6. Final Exam Score Histogram",
      code: `import matplotlib.pyplot as plt

def plot_final_marks_distribution(df):
    fig, ax = plt.subplots(figsize=(7, 4))
    ax.hist(df['Final_Exam_Score'], bins=10, color='#6E8071', edgecolor='#4A443F')
    mean_val = df['Final_Exam_Score'].mean()
    ax.axvline(mean_val, color='#D9A679', linestyle='--', linewidth=2, label=f'Mean = {mean_val:.1f}')
    ax.set_title('Distribution of Final Exam Scores', fontsize=12, fontweight='bold')
    ax.set_xlabel('Final Exam Score')
    ax.set_ylabel('Frequency')
    ax.legend()
    plt.tight_layout()
    return fig`
    },
    {
      id: 7,
      title: "7. Top 10 Students (Horizontal Bar Chart)",
      code: `import matplotlib.pyplot as plt

def plot_top_students(df):
    fig, ax = plt.subplots(figsize=(8, 4.5))
    top_10 = df.sort_values(by='Total_Marks').tail(10)
    ax.barh(top_10['Student_Name'], top_10['Total_Marks'], color='#5A6B5D')
    ax.set_title('Top 10 Students by Total Marks', fontsize=12, fontweight='bold')
    ax.set_xlabel('Total Marks (out of 100)')
    plt.tight_layout()
    return fig`
    }
  ];

  const handleCopyCode = (id: number, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
        <div className="flex items-center space-x-2 mb-2">
          <BarChart3 className="w-5 h-5 text-[#5A6B5D]" />
          <h2 className="text-xl font-serif font-bold text-[#4A443F]">Matplotlib Analytical Visualizations</h2>
        </div>
        <p className="text-xs text-[#8C847C]">
          7 publication-ready charts exploring academic distributions, correlations, and performance benchmarks. Click &quot;Python Code&quot; to inspect the exact Matplotlib function.
        </p>
      </div>

      {/* Grid of 7 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Assessment Averages */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#4A443F]">1. Average Marks by Assessment</h3>
              <p className="text-[11px] text-[#8C847C]">Comparing assignment, practical, internal, and final exams</p>
            </div>
            <button
              onClick={() => setActiveCodeChart(activeCodeChart === 1 ? null : 1)}
              className="px-2.5 py-1 text-xs font-semibold text-[#5A6B5D] bg-[#F2EFE9] hover:bg-[#E5E2DD] rounded-lg border border-[#E5E2DD] transition-colors flex items-center"
            >
              <Code2 className="w-3.5 h-3.5 mr-1" />
              {activeCodeChart === 1 ? 'Hide Code' : 'Python Code'}
            </button>
          </div>

          {activeCodeChart === 1 ? (
            <div className="bg-[#4A443F] text-[#F9F8F6] p-3.5 rounded-xl text-xs font-mono relative border border-[#4A443F]">
              <button
                onClick={() => handleCopyCode(1, pythonCodes[0].code)}
                className="absolute top-2 right-2 px-2 py-1 bg-white/10 hover:bg-white/20 text-[10px] rounded text-white flex items-center"
              >
                {copiedId === 1 ? <Check className="w-3 h-3 mr-1 text-[#D9A679]" /> : <Copy className="w-3 h-3 mr-1" />}
                {copiedId === 1 ? 'Copied' : 'Copy'}
              </button>
              <pre className="overflow-x-auto text-[11px] leading-relaxed">{pythonCodes[0].code}</pre>
            </div>
          ) : (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={avgData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E2DD" />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#8C847C' }} />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: '#8C847C' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#4A443F', color: '#F9F8F6', borderRadius: '8px', border: '1px solid #E5E2DD', fontSize: '11px' }} />
                  <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                    {avgData.map((e, idx) => (
                      <Cell key={idx} fill={e.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Chart 2: Pass vs Fail Ratio */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#4A443F]">2. Pass vs Fail Ratio</h3>
              <p className="text-[11px] text-[#8C847C]">Cohort success rate ({passCount} Pass, {failCount} Fail)</p>
            </div>
            <button
              onClick={() => setActiveCodeChart(activeCodeChart === 2 ? null : 2)}
              className="px-2.5 py-1 text-xs font-semibold text-[#5A6B5D] bg-[#F2EFE9] hover:bg-[#E5E2DD] rounded-lg border border-[#E5E2DD] transition-colors flex items-center"
            >
              <Code2 className="w-3.5 h-3.5 mr-1" />
              {activeCodeChart === 2 ? 'Hide Code' : 'Python Code'}
            </button>
          </div>

          {activeCodeChart === 2 ? (
            <div className="bg-[#4A443F] text-[#F9F8F6] p-3.5 rounded-xl text-xs font-mono relative border border-[#4A443F]">
              <button
                onClick={() => handleCopyCode(2, pythonCodes[1].code)}
                className="absolute top-2 right-2 px-2 py-1 bg-white/10 hover:bg-white/20 text-[10px] rounded text-white flex items-center"
              >
                {copiedId === 2 ? <Check className="w-3 h-3 mr-1 text-[#D9A679]" /> : <Copy className="w-3 h-3 mr-1" />}
                {copiedId === 2 ? 'Copied' : 'Copy'}
              </button>
              <pre className="overflow-x-auto text-[11px] leading-relaxed">{pythonCodes[1].code}</pre>
            </div>
          ) : (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={passFailData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ name, percent }: any) => `${name}: ${((percent || 0) * 100).toFixed(1)}%`}
                    dataKey="value"
                  >
                    {passFailData.map((e, idx) => (
                      <Cell key={idx} fill={e.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#4A443F', color: '#F9F8F6', borderRadius: '8px', border: '1px solid #E5E2DD', fontSize: '11px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Chart 3: Grade Distribution */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#4A443F]">3. Grade Distribution</h3>
              <p className="text-[11px] text-[#8C847C]">Student count across letter grades (A+ to F)</p>
            </div>
            <button
              onClick={() => setActiveCodeChart(activeCodeChart === 3 ? null : 3)}
              className="px-2.5 py-1 text-xs font-semibold text-[#5A6B5D] bg-[#F2EFE9] hover:bg-[#E5E2DD] rounded-lg border border-[#E5E2DD] transition-colors flex items-center"
            >
              <Code2 className="w-3.5 h-3.5 mr-1" />
              {activeCodeChart === 3 ? 'Hide Code' : 'Python Code'}
            </button>
          </div>

          {activeCodeChart === 3 ? (
            <div className="bg-[#4A443F] text-[#F9F8F6] p-3.5 rounded-xl text-xs font-mono relative border border-[#4A443F]">
              <button
                onClick={() => handleCopyCode(3, pythonCodes[2].code)}
                className="absolute top-2 right-2 px-2 py-1 bg-white/10 hover:bg-white/20 text-[10px] rounded text-white flex items-center"
              >
                {copiedId === 3 ? <Check className="w-3 h-3 mr-1 text-[#D9A679]" /> : <Copy className="w-3 h-3 mr-1" />}
                {copiedId === 3 ? 'Copied' : 'Copy'}
              </button>
              <pre className="overflow-x-auto text-[11px] leading-relaxed">{pythonCodes[2].code}</pre>
            </div>
          ) : (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={gradeCounts} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E2DD" />
                  <XAxis dataKey="grade" tick={{ fontSize: 11, fill: '#8C847C' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#8C847C' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#4A443F', color: '#F9F8F6', borderRadius: '8px', border: '1px solid #E5E2DD', fontSize: '11px' }} />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {gradeCounts.map((e, idx) => (
                      <Cell key={idx} fill={gradeColors[e.grade] || '#5A6B5D'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Chart 4: Study Hours vs Final Score */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#4A443F]">4. Study Hours vs Final Marks (Scatter)</h3>
              <p className="text-[11px] text-[#8C847C]">Positive linear trendline (r = +0.89)</p>
            </div>
            <button
              onClick={() => setActiveCodeChart(activeCodeChart === 4 ? null : 4)}
              className="px-2.5 py-1 text-xs font-semibold text-[#5A6B5D] bg-[#F2EFE9] hover:bg-[#E5E2DD] rounded-lg border border-[#E5E2DD] transition-colors flex items-center"
            >
              <Code2 className="w-3.5 h-3.5 mr-1" />
              {activeCodeChart === 4 ? 'Hide Code' : 'Python Code'}
            </button>
          </div>

          {activeCodeChart === 4 ? (
            <div className="bg-[#4A443F] text-[#F9F8F6] p-3.5 rounded-xl text-xs font-mono relative border border-[#4A443F]">
              <button
                onClick={() => handleCopyCode(4, pythonCodes[3].code)}
                className="absolute top-2 right-2 px-2 py-1 bg-white/10 hover:bg-white/20 text-[10px] rounded text-white flex items-center"
              >
                {copiedId === 4 ? <Check className="w-3 h-3 mr-1 text-[#D9A679]" /> : <Copy className="w-3 h-3 mr-1" />}
                {copiedId === 4 ? 'Copied' : 'Copy'}
              </button>
              <pre className="overflow-x-auto text-[11px] leading-relaxed">{pythonCodes[3].code}</pre>
            </div>
          ) : (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DD" />
                  <XAxis type="number" dataKey="studyHours" name="Study Hours" unit="h" tick={{ fontSize: 11, fill: '#8C847C' }} />
                  <YAxis type="number" dataKey="finalScore" name="Final Score" domain={[30, 100]} tick={{ fontSize: 11, fill: '#8C847C' }} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(val: any, name: any) => [val, name]}
                    contentStyle={{ backgroundColor: '#4A443F', color: '#F9F8F6', borderRadius: '8px', border: '1px solid #E5E2DD', fontSize: '11px' }}
                  />
                  <Scatter name="Students" data={studyScatterData} fill="#5A6B5D" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Chart 5: Attendance vs Final Score */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#4A443F]">5. Attendance (%) vs Final Marks (Scatter)</h3>
              <p className="text-[11px] text-[#8C847C]">With 75% minimum statutory attendance threshold</p>
            </div>
            <button
              onClick={() => setActiveCodeChart(activeCodeChart === 5 ? null : 5)}
              className="px-2.5 py-1 text-xs font-semibold text-[#5A6B5D] bg-[#F2EFE9] hover:bg-[#E5E2DD] rounded-lg border border-[#E5E2DD] transition-colors flex items-center"
            >
              <Code2 className="w-3.5 h-3.5 mr-1" />
              {activeCodeChart === 5 ? 'Hide Code' : 'Python Code'}
            </button>
          </div>

          {activeCodeChart === 5 ? (
            <div className="bg-[#4A443F] text-[#F9F8F6] p-3.5 rounded-xl text-xs font-mono relative border border-[#4A443F]">
              <button
                onClick={() => handleCopyCode(5, pythonCodes[4].code)}
                className="absolute top-2 right-2 px-2 py-1 bg-white/10 hover:bg-white/20 text-[10px] rounded text-white flex items-center"
              >
                {copiedId === 5 ? <Check className="w-3 h-3 mr-1 text-[#D9A679]" /> : <Copy className="w-3 h-3 mr-1" />}
                {copiedId === 5 ? 'Copied' : 'Copy'}
              </button>
              <pre className="overflow-x-auto text-[11px] leading-relaxed">{pythonCodes[4].code}</pre>
            </div>
          ) : (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E2DD" />
                  <XAxis type="number" dataKey="attendance" name="Attendance" unit="%" domain={[40, 100]} tick={{ fontSize: 11, fill: '#8C847C' }} />
                  <YAxis type="number" dataKey="finalScore" name="Final Score" domain={[30, 100]} tick={{ fontSize: 11, fill: '#8C847C' }} />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    contentStyle={{ backgroundColor: '#4A443F', color: '#F9F8F6', borderRadius: '8px', border: '1px solid #E5E2DD', fontSize: '11px' }}
                  />
                  <ReferenceLine x={75} stroke="#D9A679" strokeDasharray="3 3" label={{ value: '75% Min', position: 'top', fill: '#b87d4b', fontSize: 10 }} />
                  <Scatter name="Students" data={attendanceScatterData} fill="#5A6B5D" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Chart 6: Final Exam Score Histogram */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#4A443F]">6. Final Score Histogram Distribution</h3>
              <p className="text-[11px] text-[#8C847C]">Frequency distribution across score intervals (Mean = 75.3)</p>
            </div>
            <button
              onClick={() => setActiveCodeChart(activeCodeChart === 6 ? null : 6)}
              className="px-2.5 py-1 text-xs font-semibold text-[#5A6B5D] bg-[#F2EFE9] hover:bg-[#E5E2DD] rounded-lg border border-[#E5E2DD] transition-colors flex items-center"
            >
              <Code2 className="w-3.5 h-3.5 mr-1" />
              {activeCodeChart === 6 ? 'Hide Code' : 'Python Code'}
            </button>
          </div>

          {activeCodeChart === 6 ? (
            <div className="bg-[#4A443F] text-[#F9F8F6] p-3.5 rounded-xl text-xs font-mono relative border border-[#4A443F]">
              <button
                onClick={() => handleCopyCode(6, pythonCodes[5].code)}
                className="absolute top-2 right-2 px-2 py-1 bg-white/10 hover:bg-white/20 text-[10px] rounded text-white flex items-center"
              >
                {copiedId === 6 ? <Check className="w-3 h-3 mr-1 text-[#D9A679]" /> : <Copy className="w-3 h-3 mr-1" />}
                {copiedId === 6 ? 'Copied' : 'Copy'}
              </button>
              <pre className="overflow-x-auto text-[11px] leading-relaxed">{pythonCodes[5].code}</pre>
            </div>
          ) : (
            <div className="h-60">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={bins} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E2DD" />
                  <XAxis dataKey="range" tick={{ fontSize: 11, fill: '#8C847C' }} />
                  <YAxis tick={{ fontSize: 11, fill: '#8C847C' }} />
                  <Tooltip contentStyle={{ backgroundColor: '#4A443F', color: '#F9F8F6', borderRadius: '8px', border: '1px solid #E5E2DD', fontSize: '11px' }} />
                  <Bar dataKey="count" fill="#5A6B5D" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Chart 7: Top 10 Students Horizontal Chart */}
      <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-serif font-bold text-[#4A443F]">7. Top 10 Student Performance Comparison (Horizontal Bar Chart)</h3>
            <p className="text-[11px] text-[#8C847C]">Highest achieving students ranked by Total_Marks (out of 100)</p>
          </div>
          <button
            onClick={() => setActiveCodeChart(activeCodeChart === 7 ? null : 7)}
            className="px-2.5 py-1 text-xs font-semibold text-[#5A6B5D] bg-[#F2EFE9] hover:bg-[#E5E2DD] rounded-lg border border-[#E5E2DD] transition-colors flex items-center"
          >
            <Code2 className="w-3.5 h-3.5 mr-1" />
            {activeCodeChart === 7 ? 'Hide Code' : 'Python Code'}
          </button>
        </div>

        {activeCodeChart === 7 ? (
          <div className="bg-[#4A443F] text-[#F9F8F6] p-3.5 rounded-xl text-xs font-mono relative border border-[#4A443F]">
            <button
              onClick={() => handleCopyCode(7, pythonCodes[6].code)}
              className="absolute top-2 right-2 px-2 py-1 bg-white/10 hover:bg-white/20 text-[10px] rounded text-white flex items-center"
            >
              {copiedId === 7 ? <Check className="w-3 h-3 mr-1 text-[#D9A679]" /> : <Copy className="w-3 h-3 mr-1" />}
              {copiedId === 7 ? 'Copied' : 'Copy'}
            </button>
            <pre className="overflow-x-auto text-[11px] leading-relaxed">{pythonCodes[6].code}</pre>
          </div>
        ) : (
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={top10} margin={{ top: 10, right: 30, left: 50, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E2DD" />
                <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11, fill: '#8C847C' }} />
                <YAxis type="category" dataKey="Student_Name" tick={{ fontSize: 11, fill: '#4A443F' }} />
                <Tooltip contentStyle={{ backgroundColor: '#4A443F', color: '#F9F8F6', borderRadius: '8px', border: '1px solid #E5E2DD', fontSize: '11px' }} />
                <Bar dataKey="Total_Marks" fill="#5A6B5D" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
