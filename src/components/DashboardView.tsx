import React from 'react';
import { 
  Users, 
  Award, 
  CalendarCheck, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle, 
  ArrowRight,
  Sparkles,
  BookOpen,
  HelpCircle
} from 'lucide-react';
import { StudentRecord, DatasetSummary } from '../types';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';

interface DashboardViewProps {
  students: StudentRecord[];
  summary: DatasetSummary;
  setActiveTab: (tab: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  students,
  summary,
  setActiveTab
}) => {
  const topStudents = [...students].sort((a, b) => b.Total_Marks - a.Total_Marks).slice(0, 5);
  const lowAttendanceStudents = students.filter(s => s.Attendance_Percentage < 75).slice(0, 5);

  const assessmentAverages = [
    { name: 'Assignment', score: summary.averageAssignment, color: '#5A6B5D' },
    { name: 'Practical', score: summary.averagePractical, color: '#6E8071' },
    { name: 'Internal', score: summary.averageInternal, color: '#D9A679' },
    { name: 'Midterm', score: summary.averageMidterm, color: '#C88E62' },
    { name: 'Final Exam', score: summary.averageFinalExam, color: '#4A443F' },
  ];

  const passFailData = [
    { name: 'Passed', value: summary.passCount, color: '#5A6B5D' },
    { name: 'Failed', value: summary.failCount, color: '#D9A679' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner / Hero */}
      <div className="bg-gradient-to-br from-[#47544A] via-[#5A6B5D] to-[#3D473F] text-white rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden border border-[#5A6B5D]/30">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/15 text-[#F2EFE9] text-xs font-semibold mb-3 border border-white/20 backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D9A679]" />
            <span>College Minor Project in Python & Machine Learning</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white mb-2">
            SmartGrade: Student Performance Analysis & Prediction System
          </h1>
          <p className="text-[#E5E2DD] text-sm sm:text-base leading-relaxed mb-6">
            A comprehensive, beginner-friendly system implementing data cleaning, statistical evaluation, Matplotlib visual analytics, and Scikit-Learn Linear Regression for student advising and college viva demonstration.
          </p>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('prediction')}
              className="inline-flex items-center px-4 py-2 bg-[#D9A679] hover:bg-[#c99464] text-white text-sm font-semibold rounded-lg shadow-xs transition-all"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Try ML Predictor
            </button>
            <button
              onClick={() => setActiveTab('viva')}
              className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg border border-white/20 transition-all"
            >
              <HelpCircle className="w-4 h-4 mr-2 text-[#D9A679]" />
              Prepare 32 Viva Questions
            </button>
            <button
              onClick={() => setActiveTab('code')}
              className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg border border-white/20 transition-all"
            >
              <BookOpen className="w-4 h-4 mr-2" />
              View Python Source Code
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Summary Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#8C847C] uppercase tracking-wider">Total Students</p>
            <h3 className="text-3xl font-serif font-bold text-[#5A6B5D] mt-1">{summary.totalStudents}</h3>
            <p className="text-xs text-[#8C847C] mt-1">110 Verified records</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#F2EFE9] border border-[#E5E2DD] flex items-center justify-center text-[#5A6B5D]">
            <Users className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#8C847C] uppercase tracking-wider">Class Average Score</p>
            <h3 className="text-3xl font-serif font-bold text-[#5A6B5D] mt-1">{summary.averageTotalMarks}%</h3>
            <p className="text-xs text-[#5A6B5D] font-medium mt-1">High: {summary.highestMarks}% | Low: {summary.lowestMarks}%</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#F2EFE9] border border-[#E5E2DD] flex items-center justify-center text-[#5A6B5D]">
            <Award className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#8C847C] uppercase tracking-wider">Average Attendance</p>
            <h3 className="text-3xl font-serif font-bold text-[#D9A679] mt-1">{summary.averageAttendance}%</h3>
            <p className="text-xs text-[#8C847C] mt-1">Min threshold: 75%</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#F2EFE9] border border-[#E5E2DD] flex items-center justify-center text-[#D9A679]">
            <CalendarCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-[#8C847C] uppercase tracking-wider">Pass Percentage</p>
            <h3 className="text-3xl font-serif font-bold text-[#5A6B5D] mt-1">{summary.passPercentage}%</h3>
            <p className="text-xs text-[#8C847C] mt-1">{summary.passCount} Passed / {summary.failCount} Failed</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#F2EFE9] border border-[#E5E2DD] flex items-center justify-center text-[#5A6B5D]">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Visual Summary: 2 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: Assessment Averages Bar Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-serif font-bold text-[#4A443F]">Assessment Average Scores</h2>
              <p className="text-xs text-[#8C847C]">Comparison across internal, practical, midterm, and final scores</p>
            </div>
            <button 
              onClick={() => setActiveTab('visualizations')}
              className="text-xs font-semibold text-[#5A6B5D] hover:text-[#47544A] flex items-center transition-colors"
            >
              All 7 Charts <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={assessmentAverages} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#8C847C' }} />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12, fill: '#8C847C' }} />
                <Tooltip 
                  formatter={(value: any) => [`${value}%`, 'Average Score']}
                  contentStyle={{ backgroundColor: '#4A443F', color: '#F9F8F6', borderRadius: '10px', border: '1px solid #E5E2DD' }}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                  {assessmentAverages.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Pass vs Fail Ratio */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-base font-serif font-bold text-[#4A443F] mb-1">Pass vs Fail Ratio</h2>
            <p className="text-xs text-[#8C847C]">Passing criteria: Total ≥ 50 & Attendance ≥ 60%</p>
            
            <div className="h-48 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={passFailData}
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {passFailData.map((entry, index) => (
                      <Cell key={`cell-pie-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any, name: any) => [`${value} students (${((value/summary.totalStudents)*100).toFixed(1)}%)`, name]}
                    contentStyle={{ backgroundColor: '#4A443F', color: '#F9F8F6', borderRadius: '10px', border: '1px solid #E5E2DD' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-2xl font-serif font-bold text-[#5A6B5D]">{summary.passPercentage}%</span>
                <span className="text-[10px] text-[#8C847C] uppercase font-semibold">Pass Rate</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-[#E5E2DD] text-center">
            <div className="bg-[#F2EFE9] rounded-xl p-2">
              <span className="text-xs text-[#5A6B5D] font-semibold">Passed</span>
              <p className="text-lg font-serif font-bold text-[#5A6B5D]">{summary.passCount}</p>
            </div>
            <div className="bg-[#D9A679]/15 rounded-xl p-2">
              <span className="text-xs text-[#b87d4b] font-semibold">Failed</span>
              <p className="text-lg font-serif font-bold text-[#b87d4b]">{summary.failCount}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Cohort Snapshots: Top 5 & Low Attendance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 High Performers */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-[#D9A679]" />
              <h2 className="text-base font-serif font-bold text-[#4A443F]">Top Performing Students</h2>
            </div>
            <button
              onClick={() => setActiveTab('analysis')}
              className="text-xs font-semibold text-[#5A6B5D] hover:text-[#47544A] transition-colors"
            >
              View All 10
            </button>
          </div>

          <div className="divide-y divide-[#F2EFE9]">
            {topStudents.map((s, idx) => (
              <div key={s.Student_ID} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    idx === 0 ? 'bg-[#D9A679]/20 text-[#8a5d3b]' :
                    idx === 1 ? 'bg-[#F2EFE9] text-[#4A443F]' :
                    idx === 2 ? 'bg-[#5A6B5D]/15 text-[#5A6B5D]' : 'bg-[#F2EFE9] text-[#8C847C]'
                  }`}>
                    #{idx + 1}
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-[#4A443F]">{s.Student_Name}</p>
                    <p className="text-xs text-[#8C847C]">{s.Student_ID} • {s.Study_Hours_Per_Day} hrs/day</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#4A443F]">{s.Total_Marks}%</span>
                  <span className="ml-2 inline-block px-2 py-0.5 text-xs font-semibold rounded-md bg-[#5A6B5D]/10 text-[#5A6B5D] border border-[#5A6B5D]/20">
                    Grade {s.Grade}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Low Attendance Alert (<75%) */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-[#D9A679]" />
              <h2 className="text-base font-serif font-bold text-[#4A443F]">Attendance Shortfall Alert (&lt;75%)</h2>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#D9A679]/20 text-[#8a5d3b]">
              Needs Intervention
            </span>
          </div>

          <div className="divide-y divide-[#F2EFE9]">
            {lowAttendanceStudents.map((s) => (
              <div key={s.Student_ID} className="py-2.5 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#4A443F]">{s.Student_Name}</p>
                  <p className="text-xs text-[#8C847C]">{s.Student_ID} • Total: {s.Total_Marks}%</p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-[#b87d4b]">{s.Attendance_Percentage}%</span>
                  <span className="block text-[11px] text-[#8C847C]">Short by {(75 - s.Attendance_Percentage).toFixed(1)}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
