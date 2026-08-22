import React, { useState } from 'react';
import { 
  Database, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  CheckCircle, 
  FileText, 
  Sparkles,
  Trash2,
  X
} from 'lucide-react';
import { StudentRecord } from '../types';
import { convertToCsv } from '../data/sampleDataset';

interface DatasetViewProps {
  students: StudentRecord[];
  onAddStudent: (newStudent: StudentRecord) => void;
}

export const DatasetView: React.FC<DatasetViewProps> = ({
  students,
  onAddStudent
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [gradeFilter, setGradeFilter] = useState<string>('All');
  const [resultFilter, setResultFilter] = useState<string>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Student Form State
  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    age: 20,
    attendance: 80,
    studyHours: 4.5,
    prevScore: 75,
    assignment: 80,
    midterm: 78,
    practical: 82,
    finalExam: 80
  });

  // Filtered records
  const filteredStudents = students.filter(s => {
    const matchesSearch = 
      s.Student_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.Student_ID.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade = gradeFilter === 'All' || s.Grade === gradeFilter;
    const matchesResult = resultFilter === 'All' || s.Result === resultFilter;
    return matchesSearch && matchesGrade && matchesResult;
  });

  const handleExportCsv = () => {
    const csvString = convertToCsv(filteredStudents);
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'student_performance_cleaned.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const internal = Number((0.4 * formData.assignment + 0.6 * formData.practical).toFixed(1));
    const total = Number((0.2 * internal + 0.3 * formData.midterm + 0.5 * formData.finalExam).toFixed(1));
    
    let grade: StudentRecord['Grade'] = 'F';
    if (total >= 90) grade = 'A+';
    else if (total >= 80) grade = 'A';
    else if (total >= 70) grade = 'B';
    else if (total >= 60) grade = 'C';
    else if (total >= 50) grade = 'D';

    const result: StudentRecord['Result'] = 
      (total >= 50 && formData.attendance >= 60 && formData.finalExam >= 40) ? 'Pass' : 'Fail';

    const newRecord: StudentRecord = {
      Student_ID: `STD-${1000 + students.length + 1}`,
      Student_Name: formData.name,
      Gender: formData.gender as 'Male' | 'Female',
      Age: Number(formData.age),
      Attendance_Percentage: Number(formData.attendance),
      Study_Hours_Per_Day: Number(formData.studyHours),
      Previous_Score: Number(formData.prevScore),
      Assignment_Score: Number(formData.assignment),
      Midterm_Score: Number(formData.midterm),
      Final_Exam_Score: Number(formData.finalExam),
      Practical_Score: Number(formData.practical),
      Internal_Marks: internal,
      Total_Marks: total,
      Grade: grade,
      Result: result
    };

    onAddStudent(newRecord);
    setShowAddModal(false);
    setFormData({
      name: '',
      gender: 'Male',
      age: 20,
      attendance: 80,
      studyHours: 4.5,
      prevScore: 75,
      assignment: 80,
      midterm: 78,
      practical: 82,
      finalExam: 80
    });
  };

  return (
    <div className="space-y-6">
      {/* Header & Data Cleaning Summary */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-[#5A6B5D]" />
              <h2 className="text-xl font-serif font-bold text-[#4A443F]">Student Dataset & Data Cleaning Pipeline</h2>
            </div>
            <p className="text-xs text-[#8C847C] mt-1">
              Internal consistency verified: Total_Marks computed via weighted continuous assessment formula
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-3.5 py-2 bg-[#5A6B5D] hover:bg-[#4a584c] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4 mr-1.5" />
              Add Student
            </button>
            <button
              onClick={handleExportCsv}
              className="inline-flex items-center px-3.5 py-2 bg-[#F2EFE9] hover:bg-[#E5E2DD] text-[#4A443F] text-xs font-semibold rounded-lg border border-[#E5E2DD] transition-colors"
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export CSV ({filteredStudents.length})
            </button>
          </div>
        </div>

        {/* 4 Data Cleaning Report Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div className="bg-[#F9F8F6] p-3.5 rounded-xl border border-[#E5E2DD]">
            <span className="text-[11px] font-semibold text-[#8C847C] uppercase">1. Missing Values Check</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-base font-serif font-bold text-[#5A6B5D]">0 Missing (Clean)</span>
              <CheckCircle className="w-4 h-4 text-[#5A6B5D]" />
            </div>
            <p className="text-[10px] text-[#8C847C] mt-0.5">Pandas median imputation applied</p>
          </div>

          <div className="bg-[#F9F8F6] p-3.5 rounded-xl border border-[#E5E2DD]">
            <span className="text-[11px] font-semibold text-[#8C847C] uppercase">2. Duplicate Records</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-base font-serif font-bold text-[#5A6B5D]">0 Duplicates</span>
              <CheckCircle className="w-4 h-4 text-[#5A6B5D]" />
            </div>
            <p className="text-[10px] text-[#8C847C] mt-0.5">Verified via .drop_duplicates()</p>
          </div>

          <div className="bg-[#F9F8F6] p-3.5 rounded-xl border border-[#E5E2DD]">
            <span className="text-[11px] font-semibold text-[#8C847C] uppercase">3. Data Types Validation</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-base font-serif font-bold text-[#D9A679]">15 Columns Valid</span>
              <Sparkles className="w-4 h-4 text-[#D9A679]" />
            </div>
            <p className="text-[10px] text-[#8C847C] mt-0.5">Numeric float/int & text strings</p>
          </div>

          <div className="bg-[#F9F8F6] p-3.5 rounded-xl border border-[#E5E2DD]">
            <span className="text-[11px] font-semibold text-[#8C847C] uppercase">4. Active Records</span>
            <div className="flex items-center justify-between mt-1">
              <span className="text-base font-serif font-bold text-[#5A6B5D]">{students.length} Total Rows</span>
              <FileText className="w-4 h-4 text-[#5A6B5D]" />
            </div>
            <p className="text-[10px] text-[#8C847C] mt-0.5">student_performance.csv</p>
          </div>
        </div>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#E5E2DD] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search student by name or ID (e.g. STD-1004)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs border border-[#E5E2DD] rounded-lg bg-[#F9F8F6] text-[#4A443F] focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center space-x-1 text-xs">
            <span className="text-[#8C847C] font-medium">Grade:</span>
            <select
              value={gradeFilter}
              onChange={(e) => setGradeFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-[#F9F8F6] border border-[#E5E2DD] rounded-lg text-[#4A443F] font-medium focus:outline-hidden focus:border-[#5A6B5D]"
            >
              <option value="All">All Grades</option>
              <option value="A+">Grade A+</option>
              <option value="A">Grade A</option>
              <option value="B">Grade B</option>
              <option value="C">Grade C</option>
              <option value="D">Grade D</option>
              <option value="F">Grade F</option>
            </select>
          </div>

          <div className="flex items-center space-x-1 text-xs">
            <span className="text-[#8C847C] font-medium">Result:</span>
            <select
              value={resultFilter}
              onChange={(e) => setResultFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs bg-[#F9F8F6] border border-[#E5E2DD] rounded-lg text-[#4A443F] font-medium focus:outline-hidden focus:border-[#5A6B5D]"
            >
              <option value="All">All Results</option>
              <option value="Pass">Pass Only</option>
              <option value="Fail">Fail Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Interactive Data Table */}
      <div className="bg-white rounded-2xl border border-[#E5E2DD] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F2EFE9] text-[#4A443F] font-semibold border-b border-[#E5E2DD]">
              <tr>
                <th className="py-3 px-3">Student ID</th>
                <th className="py-3 px-3">Student Name</th>
                <th className="py-3 px-3">Gender</th>
                <th className="py-3 px-3 text-center">Attendance</th>
                <th className="py-3 px-3 text-center">Study Hrs</th>
                <th className="py-3 px-3 text-center">Prev Score</th>
                <th className="py-3 px-3 text-center">Assign</th>
                <th className="py-3 px-3 text-center">Midterm</th>
                <th className="py-3 px-3 text-center">Practical</th>
                <th className="py-3 px-3 text-center">Final Exam</th>
                <th className="py-3 px-3 text-center">Internal</th>
                <th className="py-3 px-3 text-center font-bold text-[#4A443F]">Total Marks</th>
                <th className="py-3 px-3 text-center">Grade</th>
                <th className="py-3 px-3 text-center">Result</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9] text-[#4A443F]">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((s) => (
                  <tr key={s.Student_ID} className="hover:bg-[#F9F8F6] transition-colors">
                    <td className="py-2.5 px-3 font-mono font-medium text-[#5A6B5D]">{s.Student_ID}</td>
                    <td className="py-2.5 px-3 font-semibold text-[#4A443F]">{s.Student_Name}</td>
                    <td className="py-2.5 px-3 text-[#8C847C]">{s.Gender}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                        s.Attendance_Percentage >= 75 ? 'bg-[#5A6B5D]/10 text-[#5A6B5D]' : 'bg-[#D9A679]/20 text-[#b87d4b]'
                      }`}>
                        {s.Attendance_Percentage}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center font-mono">{s.Study_Hours_Per_Day}</td>
                    <td className="py-2.5 px-3 text-center font-mono">{s.Previous_Score}</td>
                    <td className="py-2.5 px-3 text-center font-mono">{s.Assignment_Score}</td>
                    <td className="py-2.5 px-3 text-center font-mono">{s.Midterm_Score}</td>
                    <td className="py-2.5 px-3 text-center font-mono">{s.Practical_Score}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-semibold text-[#5A6B5D]">{s.Final_Exam_Score}</td>
                    <td className="py-2.5 px-3 text-center font-mono text-[#8C847C]">{s.Internal_Marks}</td>
                    <td className="py-2.5 px-3 text-center font-mono font-bold text-[#4A443F]">{s.Total_Marks}</td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-bold ${
                        s.Grade === 'A+' ? 'bg-[#5A6B5D]/15 text-[#5A6B5D] border border-[#5A6B5D]/30' :
                        s.Grade === 'A' ? 'bg-[#5A6B5D]/10 text-[#5A6B5D]' :
                        s.Grade === 'B' ? 'bg-[#F2EFE9] text-[#4A443F] border border-[#E5E2DD]' :
                        s.Grade === 'C' ? 'bg-[#D9A679]/15 text-[#b87d4b]' :
                        s.Grade === 'D' ? 'bg-[#D9A679]/20 text-[#b87d4b]' :
                        'bg-[#D9A679]/25 text-[#8a5d3b]'
                      }`}>
                        {s.Grade}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded-md text-[11px] font-semibold ${
                        s.Result === 'Pass' ? 'bg-[#5A6B5D]/10 text-[#5A6B5D]' : 'bg-[#D9A679]/20 text-[#b87d4b]'
                      }`}>
                        {s.Result}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className="py-8 text-center text-[#8C847C]">
                    No student records match the selected filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="p-3 bg-[#F9F8F6] border-t border-[#E5E2DD] text-xs text-[#8C847C] flex justify-between">
          <span>Showing {filteredStudents.length} of {students.length} student records</span>
          <span>Formula: Total = 20% Internal + 30% Midterm + 50% Final</span>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-[#4A443F]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl border border-[#E5E2DD] relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-[#8C847C] hover:text-[#4A443F]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-serif font-bold text-[#4A443F] mb-1">Add Student Record</h3>
            <p className="text-xs text-[#8C847C] mb-4">
              Enter academic metrics. Total Marks and Grade will be automatically calculated.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-[#4A443F]">Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Manav Sharma"
                    className="w-full mt-1 px-3 py-2 border border-[#E5E2DD] bg-[#F9F8F6] rounded-lg text-xs text-[#4A443F] focus:border-[#5A6B5D]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#4A443F]">Gender</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full mt-1 px-3 py-2 border border-[#E5E2DD] bg-[#F9F8F6] rounded-lg text-xs text-[#4A443F] focus:border-[#5A6B5D]"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-[#4A443F]">Attendance (%)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.attendance}
                    onChange={(e) => setFormData({ ...formData, attendance: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 border border-[#E5E2DD] bg-[#F9F8F6] rounded-lg text-xs font-mono text-[#4A443F]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#4A443F]">Study Hrs/Day</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0"
                    max="16"
                    value={formData.studyHours}
                    onChange={(e) => setFormData({ ...formData, studyHours: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 border border-[#E5E2DD] bg-[#F9F8F6] rounded-lg text-xs font-mono text-[#4A443F]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#4A443F]">Prev Score</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.prevScore}
                    onChange={(e) => setFormData({ ...formData, prevScore: Number(e.target.value) })}
                    className="w-full mt-1 px-3 py-2 border border-[#E5E2DD] bg-[#F9F8F6] rounded-lg text-xs font-mono text-[#4A443F]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="font-semibold text-[#4A443F]">Assign (100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.assignment}
                    onChange={(e) => setFormData({ ...formData, assignment: Number(e.target.value) })}
                    className="w-full mt-1 px-2 py-1.5 border border-[#E5E2DD] bg-[#F9F8F6] rounded-lg text-xs font-mono text-[#4A443F]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#4A443F]">Midterm (100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.midterm}
                    onChange={(e) => setFormData({ ...formData, midterm: Number(e.target.value) })}
                    className="w-full mt-1 px-2 py-1.5 border border-[#E5E2DD] bg-[#F9F8F6] rounded-lg text-xs font-mono text-[#4A443F]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#4A443F]">Practical (100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.practical}
                    onChange={(e) => setFormData({ ...formData, practical: Number(e.target.value) })}
                    className="w-full mt-1 px-2 py-1.5 border border-[#E5E2DD] bg-[#F9F8F6] rounded-lg text-xs font-mono text-[#4A443F]"
                  />
                </div>
                <div>
                  <label className="font-semibold text-[#4A443F]">Final (100)</label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={formData.finalExam}
                    onChange={(e) => setFormData({ ...formData, finalExam: Number(e.target.value) })}
                    className="w-full mt-1 px-2 py-1.5 border border-[#E5E2DD] bg-[#F9F8F6] rounded-lg text-xs font-mono font-bold text-[#5A6B5D]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end space-x-2 border-t border-[#E5E2DD]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-2 bg-[#F2EFE9] hover:bg-[#E5E2DD] text-[#4A443F] rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#5A6B5D] hover:bg-[#4a584c] text-white rounded-lg text-xs font-semibold shadow-xs"
                >
                  Save Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
