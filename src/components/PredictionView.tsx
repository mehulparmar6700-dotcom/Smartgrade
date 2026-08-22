import React, { useState } from 'react';
import { 
  Calculator, 
  Sparkles, 
  Award, 
  AlertTriangle, 
  CheckCircle2, 
  TrendingUp, 
  RefreshCw,
  Lightbulb,
  Info,
  Layers,
  ArrowRight,
  Database,
  Check,
  Save
} from 'lucide-react';
import { ModelMetrics, PredictionInput } from '../types';
import { predictScore, classifyPerformance, generateRecommendations } from '../utils/mlEngine';
import { useAuth } from '../context/AuthContext';

interface PredictionViewProps {
  metrics: ModelMetrics;
}

export const PredictionView: React.FC<PredictionViewProps> = ({ metrics }) => {
  const { user } = useAuth();
  const [savingToDb, setSavingToDb] = useState(false);
  const [savedToDb, setSavedToDb] = useState(false);

  // Input parameters state
  const [inputs, setInputs] = useState<PredictionInput>({
    Attendance_Percentage: 85,
    Study_Hours_Per_Day: 5.0,
    Previous_Score: 78,
    Assignment_Score: 82,
    Midterm_Score: 80,
    Practical_Score: 85,
    Internal_Marks: 83.8
  });

  // Calculate prediction live
  const predictedScore = predictScore(inputs, metrics);
  const { category, color, grade, bgLight, border } = classifyPerformance(predictedScore);
  const recommendations = generateRecommendations(predictedScore, inputs);

  const handleSaveToLocalServer = async () => {
    setSavingToDb(true);
    try {
      await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attendancePercentage: inputs.Attendance_Percentage,
          studyHoursPerDay: inputs.Study_Hours_Per_Day,
          previousScore: inputs.Previous_Score,
          assignmentScore: inputs.Assignment_Score,
          midtermScore: inputs.Midterm_Score,
          practicalScore: inputs.Practical_Score,
          internalMarks: inputs.Internal_Marks,
          userId: user?._id,
          userName: user?.name,
          userRole: user?.role
        })
      });
      setSavedToDb(true);
      setTimeout(() => setSavedToDb(false), 3000);
    } catch (e) {
      console.log('Saved in local state');
    } finally {
      setSavingToDb(false);
    }
  };

  // Preset Profiles for Viva Demonstration
  const loadPreset = (preset: 'topper' | 'average' | 'atRisk') => {
    setSavedToDb(false);
    if (preset === 'topper') {
      setInputs({
        Attendance_Percentage: 95,
        Study_Hours_Per_Day: 7.0,
        Previous_Score: 92,
        Assignment_Score: 96,
        Midterm_Score: 94,
        Practical_Score: 98,
        Internal_Marks: 97.2
      });
    } else if (preset === 'average') {
      setInputs({
        Attendance_Percentage: 78,
        Study_Hours_Per_Day: 3.5,
        Previous_Score: 68,
        Assignment_Score: 75,
        Midterm_Score: 70,
        Practical_Score: 78,
        Internal_Marks: 76.8
      });
    } else {
      setInputs({
        Attendance_Percentage: 54,
        Study_Hours_Per_Day: 1.5,
        Previous_Score: 45,
        Assignment_Score: 52,
        Midterm_Score: 44,
        Practical_Score: 56,
        Internal_Marks: 54.4
      });
    }
  };

  const featureWeights = [
    { name: 'Attendance %', value: inputs.Attendance_Percentage ?? 85, weight: metrics.coefficients[0]?.coefficient ?? 0.08, desc: 'Regular classroom presence' },
    { name: 'Study Hours/Day', value: inputs.Study_Hours_Per_Day ?? 5, weight: metrics.coefficients[1]?.coefficient ?? 1.45, desc: 'Self-study & revision time' },
    { name: 'Previous Score', value: inputs.Previous_Score ?? 78, weight: metrics.coefficients[2]?.coefficient ?? 0.28, desc: 'Past semester foundational grasp' },
    { name: 'Assignment Score', value: inputs.Assignment_Score ?? 82, weight: metrics.coefficients[3]?.coefficient ?? 0.12, desc: 'Homework consistency' },
    { name: 'Midterm Exam Score', value: inputs.Midterm_Score ?? 80, weight: metrics.coefficients[4]?.coefficient ?? 0.35, desc: 'Mid-semester performance' },
    { name: 'Practical Score', value: inputs.Practical_Score ?? 85, weight: metrics.coefficients[5]?.coefficient ?? 0.10, desc: 'Laboratory hands-on skills' },
    { name: 'Internal Marks', value: inputs.Internal_Marks ?? 83.8, weight: metrics.coefficients[6]?.coefficient ?? 0.15, desc: 'Continuous assessment score' },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <Calculator className="w-5 h-5 text-[#5A6B5D]" />
              <h2 className="text-xl font-serif font-bold text-[#4A443F]">Student Performance Prediction System</h2>
            </div>
            <p className="text-xs text-[#8C847C] mt-1">
              Linear Regression Supervised ML model trained on 80% train cohort to forecast final semester scores in real-time.
            </p>
          </div>

          {/* Quick Viva Demonstration Presets */}
          <div className="flex items-center space-x-2">
            <span className="text-xs font-semibold text-[#8C847C] hidden md:inline">Viva Presets:</span>
            <button
              onClick={() => loadPreset('topper')}
              className="px-2.5 py-1.5 text-xs font-semibold bg-[#5A6B5D]/15 hover:bg-[#5A6B5D]/25 text-[#5A6B5D] rounded-lg border border-[#5A6B5D]/30 transition-colors"
            >
              🌟 Rank 1
            </button>
            <button
              onClick={() => loadPreset('average')}
              className="px-2.5 py-1.5 text-xs font-semibold bg-[#D9A679]/20 hover:bg-[#D9A679]/30 text-[#8a5d3b] rounded-lg border border-[#D9A679]/40 transition-colors"
            >
              ⚖️ Average
            </button>
            <button
              onClick={() => loadPreset('atRisk')}
              className="px-2.5 py-1.5 text-xs font-semibold bg-[#A65E4E]/15 hover:bg-[#A65E4E]/25 text-[#A65E4E] rounded-lg border border-[#A65E4E]/30 transition-colors"
            >
              🚨 At-Risk
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Sliders Form, Right Output Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: 7 Interactive Input Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E2DD]">
            <div>
              <h3 className="text-sm font-serif font-bold text-[#4A443F]">Adjust Student Academic Parameters</h3>
              <p className="text-[11px] text-[#8C847C]">Live linear inference recalculates dynamically</p>
            </div>
            <button
              onClick={() => loadPreset('average')}
              className="text-xs text-[#8C847C] hover:text-[#4A443F] flex items-center transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1" /> Reset
            </button>
          </div>

          {/* 1. Attendance Percentage Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-[#4A443F]">1. Attendance Percentage (%)</span>
              <span className={`font-mono font-bold ${inputs.Attendance_Percentage >= 75 ? 'text-[#5A6B5D]' : 'text-[#A65E4E]'}`}>
                {inputs.Attendance_Percentage}%
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={inputs.Attendance_Percentage}
              onChange={(e) => setInputs({ ...inputs, Attendance_Percentage: Number(e.target.value) })}
              className="w-full h-2 bg-[#E5E2DD] rounded-lg appearance-none cursor-pointer accent-[#5A6B5D]"
            />
            <div className="flex justify-between text-[10px] text-[#8C847C]">
              <span>0%</span>
              <span className="text-[#D9A679] font-semibold">75% Required</span>
              <span>100%</span>
            </div>
          </div>

          {/* 2. Daily Study Hours Slider */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-[#4A443F]">2. Daily Study Hours (hrs/day)</span>
              <span className="font-mono font-bold text-[#5A6B5D]">{inputs.Study_Hours_Per_Day} hrs</span>
            </div>
            <input
              type="range"
              min="0"
              max="12"
              step="0.5"
              value={inputs.Study_Hours_Per_Day}
              onChange={(e) => setInputs({ ...inputs, Study_Hours_Per_Day: Number(e.target.value) })}
              className="w-full h-2 bg-[#E5E2DD] rounded-lg appearance-none cursor-pointer accent-[#5A6B5D]"
            />
            <div className="flex justify-between text-[10px] text-[#8C847C]">
              <span>0 hrs</span>
              <span>6 hrs</span>
              <span>12 hrs</span>
            </div>
          </div>

          {/* 3. Previous Semester Score */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-[#4A443F]">3. Previous Semester Score (out of 100)</span>
              <span className="font-mono font-bold text-[#4A443F]">{inputs.Previous_Score}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={inputs.Previous_Score}
              onChange={(e) => setInputs({ ...inputs, Previous_Score: Number(e.target.value) })}
              className="w-full h-2 bg-[#E5E2DD] rounded-lg appearance-none cursor-pointer accent-[#5A6B5D]"
            />
          </div>

          {/* 4 & 5. Assignment and Midterm Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#4A443F]">4. Assignment Score</span>
                <span className="font-mono font-bold text-[#4A443F]">{inputs.Assignment_Score}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={inputs.Assignment_Score}
                onChange={(e) => setInputs({ ...inputs, Assignment_Score: Number(e.target.value) })}
                className="w-full h-2 bg-[#E5E2DD] rounded-lg appearance-none cursor-pointer accent-[#5A6B5D]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#4A443F]">5. Midterm Exam Score</span>
                <span className="font-mono font-bold text-[#4A443F]">{inputs.Midterm_Score}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={inputs.Midterm_Score}
                onChange={(e) => setInputs({ ...inputs, Midterm_Score: Number(e.target.value) })}
                className="w-full h-2 bg-[#E5E2DD] rounded-lg appearance-none cursor-pointer accent-[#5A6B5D]"
              />
            </div>
          </div>

          {/* 6 & 7. Practical Score and Internal Marks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#4A443F]">6. Practical / Lab Score</span>
                <span className="font-mono font-bold text-[#4A443F]">{inputs.Practical_Score}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={inputs.Practical_Score}
                onChange={(e) => setInputs({ ...inputs, Practical_Score: Number(e.target.value) })}
                className="w-full h-2 bg-[#E5E2DD] rounded-lg appearance-none cursor-pointer accent-[#5A6B5D]"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-[#4A443F]">7. Internal Marks</span>
                <span className="font-mono font-bold text-[#4A443F]">{inputs.Internal_Marks}</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.5"
                value={inputs.Internal_Marks}
                onChange={(e) => setInputs({ ...inputs, Internal_Marks: Number(e.target.value) })}
                className="w-full h-2 bg-[#E5E2DD] rounded-lg appearance-none cursor-pointer accent-[#5A6B5D]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Prediction Output Card & Recommendations (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Main Prediction Score Card */}
          <div className={`p-6 rounded-2xl border ${border} ${bgLight} shadow-xs relative overflow-hidden transition-all duration-300`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold text-[#8C847C] uppercase tracking-wider">
                Predicted Outcome
              </span>
              <span 
                className="px-3 py-1 text-xs font-bold rounded-full text-white shadow-xs"
                style={{ backgroundColor: color }}
              >
                {category}
              </span>
            </div>

            <div className="text-center my-4">
              <div className="text-5xl font-serif font-black tracking-tight" style={{ color: color }}>
                {predictedScore.toFixed(1)}
                <span className="text-xl font-normal text-[#8C847C]"> / 100</span>
              </div>
              <p className="text-xs font-medium text-[#4A443F] mt-1">
                Projected Final Examination Score
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#E5E2DD] text-center">
              <div className="bg-white/80 rounded-xl p-3 border border-[#E5E2DD]">
                <span className="text-[11px] text-[#8C847C] font-medium">Projected Grade</span>
                <p className="text-2xl font-serif font-bold mt-0.5" style={{ color: color }}>
                  {grade}
                </p>
              </div>
              <div className="bg-white/80 rounded-xl p-3 border border-[#E5E2DD]">
                <span className="text-[11px] text-[#8C847C] font-medium">Academic Standing</span>
                <p className="text-sm font-bold text-[#4A443F] mt-1.5">
                  {predictedScore >= 50 && inputs.Attendance_Percentage >= 60 ? 'Eligible / Pass' : 'Backlog Risk'}
                </p>
              </div>
            </div>

            {/* Local Server Save Action */}
            <div className="mt-4 pt-3 border-t border-[#E5E2DD]">
              <button
                onClick={handleSaveToLocalServer}
                disabled={savingToDb}
                className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all shadow-xs ${
                  savedToDb
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#5A6B5D] hover:bg-[#4a584c] text-white'
                }`}
              >
                {savedToDb ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Saved to Local Server Store (/api/predictions)</span>
                  </>
                ) : savingToDb ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Logging to Local Server...</span>
                  </>
                ) : (
                  <>
                    <Database className="w-3.5 h-3.5" />
                    <span>Log Prediction to Local Server Database</span>
                  </>
                )}
              </button>
            </div>
          </div>


          {/* Actionable Recommendations */}
          <div className="bg-white p-5 rounded-2xl border border-[#E5E2DD] shadow-xs space-y-3">
            <div className="flex items-center space-x-2 pb-2 border-b border-[#E5E2DD]">
              <Lightbulb className="w-4 h-4 text-[#D9A679]" />
              <h3 className="text-xs font-serif font-bold text-[#4A443F] uppercase tracking-wider">
                Tailored Academic Recommendations
              </h3>
            </div>

            <div className="space-y-2 text-xs text-[#4A443F]">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F9F8F6] border border-[#E5E2DD] flex items-start space-x-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#5A6B5D] mt-1.5 shrink-0" />
                  <p className="leading-relaxed">{rec}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mathematical Linear Equation Breakdown */}
      <div className="bg-white p-6 rounded-2xl border border-[#E5E2DD] shadow-xs">
        <div className="flex items-center space-x-2 mb-3">
          <Layers className="w-4 h-4 text-[#5A6B5D]" />
          <h3 className="text-sm font-serif font-bold text-[#4A443F]">How the Model Computes this Prediction (Multiple Linear Equation)</h3>
        </div>

        <div className="bg-[#4A443F] text-[#F9F8F6] p-4 rounded-xl text-xs font-mono mb-4 overflow-x-auto border border-[#4A443F]">
          <span className="text-[#D9A679]">Final_Exam_Score (Y)</span> = {metrics.intercept.toFixed(2)} (Intercept) + 
          {featureWeights.map((f, i) => (
            <span key={i}>
              {' '}+ ({f.weight.toFixed(3)} × {f.name}: {f.value})
            </span>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F9F8F6] text-[#8C847C] font-semibold border-b border-[#E5E2DD]">
              <tr>
                <th className="py-2.5 px-3">Feature Variable ($X_i$)</th>
                <th className="py-2.5 px-3">Input Value</th>
                <th className="py-2.5 px-3">Learned Weight ($\beta_i$)</th>
                <th className="py-2.5 px-3 font-mono">Calculated Product ($\beta_i \times X_i$)</th>
                <th className="py-2.5 px-3 text-[#8C847C]">Mathematical Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F2EFE9] text-[#4A443F]">
              {featureWeights.map((f, i) => (
                <tr key={i} className="hover:bg-[#F9F8F6]">
                  <td className="py-2.5 px-3 font-semibold text-[#4A443F]">{f.name}</td>
                  <td className="py-2.5 px-3 font-mono text-[#4A443F]">{f.value}</td>
                  <td className="py-2.5 px-3 font-mono text-[#5A6B5D] font-semibold">{f.weight.toFixed(4)}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-[#4A443F]">{(f.weight * f.value).toFixed(2)}</td>
                  <td className="py-2.5 px-3 text-[#8C847C] text-[11px]">{f.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
