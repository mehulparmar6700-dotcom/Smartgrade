import React, { useState } from 'react';
import { 
  Info, 
  User, 
  CheckSquare, 
  Square, 
  GraduationCap, 
  Sparkles, 
  Code, 
  BookOpen,
  Award
} from 'lucide-react';

export const AboutView: React.FC = () => {
  // Editable student credentials state for viva personalization
  const [studentInfo, setStudentInfo] = useState({
    name: 'Your Name Here',
    rollNumber: 'CS-2025-042',
    branch: 'Computer Science & Engineering',
    semester: '6th Semester (Minor Project)',
    college: 'Your University / Institute of Technology',
    guide: 'Prof. [Guide Name], Department of CSE'
  });

  const [checklist, setChecklist] = useState<Record<string, boolean>>({
    c1: true,
    c2: true,
    c3: true,
    c4: false,
    c5: false,
    c6: false,
  });

  const toggleCheck = (key: string) => {
    setChecklist(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
        <div className="flex items-center space-x-2 mb-2">
          <Info className="w-5 h-5 text-[#5A6B5D]" />
          <h2 className="text-xl font-serif font-bold text-[#4A443F]">About SmartGrade & Candidate Information</h2>
        </div>
        <p className="text-xs text-[#8C847C]">
          Academic Minor Project metadata, personalizable submission details, and viva readiness checklist.
        </p>
      </div>

      {/* Grid: Candidate Details on Left (6 cols), Viva Readiness on Right (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Candidate & Academic Details Card */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#E5E2DD]">
            <User className="w-5 h-5 text-[#5A6B5D]" />
            <h3 className="text-sm font-serif font-bold text-[#4A443F]">Candidate & Project Submission Profile</h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="font-semibold text-[#4A443F] block mb-1">Student Full Name</label>
              <input
                type="text"
                value={studentInfo.name}
                onChange={(e) => setStudentInfo({ ...studentInfo, name: e.target.value })}
                className="w-full px-3.5 py-2 border border-[#E5E2DD] rounded-xl font-semibold text-[#4A443F] bg-[#F9F8F6] focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-[#4A443F] block mb-1">Roll / Register Number</label>
                <input
                  type="text"
                  value={studentInfo.rollNumber}
                  onChange={(e) => setStudentInfo({ ...studentInfo, rollNumber: e.target.value })}
                  className="w-full px-3.5 py-2 border border-[#E5E2DD] rounded-xl font-mono text-[#4A443F] bg-[#F9F8F6] focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
                />
              </div>
              <div>
                <label className="font-semibold text-[#4A443F] block mb-1">Branch / Course</label>
                <input
                  type="text"
                  value={studentInfo.branch}
                  onChange={(e) => setStudentInfo({ ...studentInfo, branch: e.target.value })}
                  className="w-full px-3.5 py-2 border border-[#E5E2DD] rounded-xl text-[#4A443F] bg-[#F9F8F6] focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-[#4A443F] block mb-1">College / University Name</label>
              <input
                type="text"
                value={studentInfo.college}
                onChange={(e) => setStudentInfo({ ...studentInfo, college: e.target.value })}
                className="w-full px-3.5 py-2 border border-[#E5E2DD] rounded-xl text-[#4A443F] bg-[#F9F8F6] focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#4A443F] block mb-1">Faculty Project Guide</label>
              <input
                type="text"
                value={studentInfo.guide}
                onChange={(e) => setStudentInfo({ ...studentInfo, guide: e.target.value })}
                className="w-full px-3.5 py-2 border border-[#E5E2DD] rounded-xl text-[#4A443F] bg-[#F9F8F6] focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
              />
            </div>
          </div>
        </div>

        {/* Viva Readiness Checklist */}
        <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs space-y-4">
          <div className="flex items-center space-x-2 pb-3 border-b border-[#E5E2DD]">
            <Award className="w-5 h-5 text-[#D9A679]" />
            <h3 className="text-sm font-serif font-bold text-[#4A443F]">Pre-Viva Readiness Checklist</h3>
          </div>

          <div className="space-y-2.5 text-xs text-[#4A443F]">
            <div 
              onClick={() => toggleCheck('c1')}
              className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E5E2DD] flex items-start space-x-2.5 cursor-pointer hover:bg-[#F2EFE9] transition-colors"
            >
              {checklist.c1 ? <CheckSquare className="w-4 h-4 text-[#5A6B5D] shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-[#8C847C] shrink-0 mt-0.5" />}
              <span className={checklist.c1 ? 'line-through text-[#8C847C]' : ''}>
                Downloaded project .ZIP and verified <code className="text-[#5A6B5D] font-bold">streamlit run app.py</code> opens cleanly on laptop.
              </span>
            </div>

            <div 
              onClick={() => toggleCheck('c2')}
              className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E5E2DD] flex items-start space-x-2.5 cursor-pointer hover:bg-[#F2EFE9] transition-colors"
            >
              {checklist.c2 ? <CheckSquare className="w-4 h-4 text-[#5A6B5D] shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-[#8C847C] shrink-0 mt-0.5" />}
              <span className={checklist.c2 ? 'line-through text-[#8C847C]' : ''}>
                Practiced the 80/20 train/test split explanation (prevents data leakage).
              </span>
            </div>

            <div 
              onClick={() => toggleCheck('c3')}
              className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E5E2DD] flex items-start space-x-2.5 cursor-pointer hover:bg-[#F2EFE9] transition-colors"
            >
              {checklist.c3 ? <CheckSquare className="w-4 h-4 text-[#5A6B5D] shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-[#8C847C] shrink-0 mt-0.5" />}
              <span className={checklist.c3 ? 'line-through text-[#8C847C]' : ''}>
                Memorized core test metrics: MAE = 1.82 marks, R² Score = 0.942.
              </span>
            </div>

            <div 
              onClick={() => toggleCheck('c4')}
              className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E5E2DD] flex items-start space-x-2.5 cursor-pointer hover:bg-[#F2EFE9] transition-colors"
            >
              {checklist.c4 ? <CheckSquare className="w-4 h-4 text-[#5A6B5D] shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-[#8C847C] shrink-0 mt-0.5" />}
              <span className={checklist.c4 ? 'line-through text-[#8C847C]' : ''}>
                Rehearsed 12-Slide PowerPoint presentation and speaker script notes.
              </span>
            </div>

            <div 
              onClick={() => toggleCheck('c5')}
              className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E5E2DD] flex items-start space-x-2.5 cursor-pointer hover:bg-[#F2EFE9] transition-colors"
            >
              {checklist.c5 ? <CheckSquare className="w-4 h-4 text-[#5A6B5D] shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-[#8C847C] shrink-0 mt-0.5" />}
              <span className={checklist.c5 ? 'line-through text-[#8C847C]' : ''}>
                Reviewed top 32 Viva questions in Flashcard mode.
              </span>
            </div>

            <div 
              onClick={() => toggleCheck('c6')}
              className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E5E2DD] flex items-start space-x-2.5 cursor-pointer hover:bg-[#F2EFE9] transition-colors"
            >
              {checklist.c6 ? <CheckSquare className="w-4 h-4 text-[#5A6B5D] shrink-0 mt-0.5" /> : <Square className="w-4 h-4 text-[#8C847C] shrink-0 mt-0.5" />}
              <span className={checklist.c6 ? 'line-through text-[#8C847C]' : ''}>
                Printed out or saved PDF copy of Project Report (Sections A–AB).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
