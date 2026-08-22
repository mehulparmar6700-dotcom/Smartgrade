import React, { useState } from 'react';
import { SAMPLE_STUDENTS, calculateDatasetSummary } from './data/sampleDataset';
import { trainLinearRegression } from './utils/mlEngine';
import { StudentRecord } from './types';
import { Navbar } from './components/Navbar';
import { DashboardView } from './components/DashboardView';
import { DatasetView } from './components/DatasetView';
import { AnalysisView } from './components/AnalysisView';
import { VisualizationsView } from './components/VisualizationsView';
import { PredictionView } from './components/PredictionView';
import { ModelPerformanceView } from './components/ModelPerformanceView';
import { VivaPrepView } from './components/VivaPrepView';
import { PresentationView } from './components/PresentationView';
import { DocumentationView } from './components/DocumentationView';
import { AboutView } from './components/AboutView';
import { MernStackView } from './components/MernStackView';
import { AuthProvider } from './context/AuthContext';
import { AuthModal } from './components/AuthModal';

function AppContent() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [students, setStudents] = useState<StudentRecord[]>(SAMPLE_STUDENTS);

  // Dynamically compute summary and re-train model when student records change
  const summary = calculateDatasetSummary(students);
  const metrics = trainLinearRegression(students);

  const handleAddStudent = (newStudent: StudentRecord) => {
    setStudents(prev => [newStudent, ...prev]);
    // Also sync with Express backend in background
    fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStudent)
    }).catch(err => console.log('Synced locally', err));
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#4A443F] flex flex-col font-sans selection:bg-[#5A6B5D] selection:text-white">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Authentication Login / Sign Up Modal */}
      <AuthModal />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === 'dashboard' && (
          <DashboardView 
            students={students} 
            summary={summary} 
            setActiveTab={setActiveTab} 
          />
        )}

        {activeTab === 'dataset' && (
          <DatasetView 
            students={students} 
            onAddStudent={handleAddStudent} 
          />
        )}

        {activeTab === 'analysis' && (
          <AnalysisView 
            students={students} 
            summary={summary} 
          />
        )}

        {activeTab === 'visualizations' && (
          <VisualizationsView 
            students={students} 
          />
        )}

        {activeTab === 'prediction' && (
          <PredictionView 
            metrics={metrics} 
          />
        )}

        {activeTab === 'model' && (
          <ModelPerformanceView 
            metrics={metrics} 
          />
        )}

        {activeTab === 'mern' && (
          <MernStackView />
        )}

        {activeTab === 'viva' && (
          <VivaPrepView />
        )}

        {activeTab === 'presentation' && (
          <PresentationView />
        )}

        {activeTab === 'docs' && (
          <DocumentationView />
        )}

        {activeTab === 'about' && (
          <AboutView />
        )}
      </main>

      {/* Modern Academic Footer */}
      <footer className="bg-white border-t border-[#E5E2DD] mt-12 py-6 text-xs text-[#8C847C]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div>
            <span className="font-bold text-[#4A443F]">SmartGrade System</span> – Student Performance Analysis & Prediction
            <span className="block text-[#8C847C] text-[11px] mt-0.5">
              Secure Academic Analytics Engine & Machine Learning Evaluation Platform
            </span>
          </div>
          <div className="flex items-center space-x-4 text-[11px]">
            <button onClick={() => setActiveTab('dashboard')} className="hover:text-[#5A6B5D] font-medium transition-colors">Dashboard</button>
            <button onClick={() => setActiveTab('prediction')} className="hover:text-[#5A6B5D] font-medium transition-colors">Predictor</button>
            <button onClick={() => setActiveTab('mern')} className="hover:text-[#5A6B5D] font-medium transition-colors">System Diagnostics</button>
            <button onClick={() => setActiveTab('viva')} className="hover:text-[#5A6B5D] font-medium transition-colors">Viva Defense</button>
            <button onClick={() => setActiveTab('presentation')} className="hover:text-[#5A6B5D] font-medium transition-colors">Slides</button>
            <button onClick={() => setActiveTab('docs')} className="hover:text-[#5A6B5D] font-medium transition-colors">Report</button>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

