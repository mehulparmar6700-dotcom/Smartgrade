import React, { useState } from 'react';
import { 
  GraduationCap, 
  Code, 
  HelpCircle, 
  BookOpen, 
  Presentation, 
  Sparkles,
  BarChart3,
  Database,
  Calculator,
  LineChart,
  Info,
  Check,
  User,
  LogIn,
  LogOut,
  ChevronDown,
  Layers
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const { user, isAuthenticated, logout, openAuthModal, quickLogin } = useAuth();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'dataset', label: 'Student Directory', icon: Database },
    { id: 'analysis', label: 'Data Analysis', icon: LineChart },
    { id: 'visualizations', label: 'Visualizations', icon: BarChart3 },
    { id: 'prediction', label: 'Grade Predictor', icon: Calculator },
    { id: 'model', label: 'Model Evaluation', icon: Sparkles },
    { id: 'mern', label: 'System Diagnostics', icon: Layers },
    { id: 'viva', label: 'Viva Prep (32 Q&A)', icon: HelpCircle },
    { id: 'presentation', label: 'Presentation (PPT)', icon: Presentation },
    { id: 'docs', label: 'Project Report', icon: BookOpen },
    { id: 'about', label: 'About & Profile', icon: Info },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'faculty':
        return { label: 'Faculty Guide', bg: 'bg-[#5A6B5D]/15 text-[#5A6B5D] border-[#5A6B5D]/30' };
      case 'admin':
        return { label: 'Examiner / HOD', bg: 'bg-[#A65E4E]/15 text-[#A65E4E] border-[#A65E4E]/30' };
      default:
        return { label: 'Candidate', bg: 'bg-[#D9A679]/20 text-[#8a5d3b] border-[#D9A679]/40' };
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E5E2DD] shadow-2xs">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-[#5A6B5D] flex items-center justify-center text-white shadow-xs">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg text-[#4A443F] tracking-tight font-serif">SmartGrade</span>
                <span className="text-[11px] font-medium tracking-wide px-2.5 py-0.5 rounded-full bg-[#F2EFE9] text-[#5A6B5D] border border-[#E5E2DD]">
                  Academic Edition
                </span>
              </div>
              <p className="text-xs text-[#8C847C] hidden sm:block">
                Student Performance Analysis & Prediction System
              </p>
            </div>
          </div>

          {/* Quick Actions & User Auth */}
          <div className="flex items-center space-x-3">
            {/* User Profile / Login Button */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-xl bg-[#F9F8F6] hover:bg-[#F2EFE9] border border-[#E5E2DD] transition-all text-left"
                >
                  <div 
                    className="w-7 h-7 rounded-lg text-white font-bold flex items-center justify-center text-xs shadow-2xs"
                    style={{ backgroundColor: user.avatarColor || '#5A6B5D' }}
                  >
                    {user.name.charAt(0)}
                  </div>
                  <div className="hidden sm:block">
                    <span className="text-xs font-bold text-[#4A443F] block leading-tight truncate max-w-[130px]">
                      {user.name.split(' ')[0]}
                    </span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-sm border ${getRoleBadge(user.role).bg}`}>
                      {getRoleBadge(user.role).label}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-[#8C847C]" />
                </button>

                {/* Dropdown Menu */}
                {userMenuOpen && (
                  <div 
                    className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-[#E5E2DD] shadow-xl p-3 space-y-2 z-50 animate-in fade-in zoom-in-95"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-2.5 bg-[#F9F8F6] rounded-xl border border-[#E5E2DD]">
                      <span className="text-xs font-bold text-[#4A443F] block">{user.name}</span>
                      <span className="text-[11px] text-[#8C847C] block truncate">{user.email}</span>
                      <span className="text-[10px] text-[#5A6B5D] font-mono block mt-1">ID: {user.rollNumber || user._id}</span>
                    </div>

                    <div className="pt-1 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-[#8C847C] px-2 block">Switch Academic Role</span>
                      <button
                        onClick={() => { quickLogin('student'); setUserMenuOpen(false); }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-[#4A443F] hover:bg-[#F2EFE9] rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>Candidate (Student)</span>
                        {user.role === 'student' && <Check className="w-3.5 h-3.5 text-[#5A6B5D]" />}
                      </button>
                      <button
                        onClick={() => { quickLogin('faculty'); setUserMenuOpen(false); }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-[#4A443F] hover:bg-[#F2EFE9] rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>Project Guide (Faculty)</span>
                        {user.role === 'faculty' && <Check className="w-3.5 h-3.5 text-[#5A6B5D]" />}
                      </button>
                      <button
                        onClick={() => { quickLogin('admin'); setUserMenuOpen(false); }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-[#4A443F] hover:bg-[#F2EFE9] rounded-lg transition-colors flex items-center justify-between"
                      >
                        <span>Academic Examiner (Admin)</span>
                        {user.role === 'admin' && <Check className="w-3.5 h-3.5 text-[#5A6B5D]" />}
                      </button>
                    </div>

                    <div className="pt-2 border-t border-[#E5E2DD] flex items-center justify-between">
                      <button
                        onClick={() => { openAuthModal('login'); setUserMenuOpen(false); }}
                        className="text-xs text-[#5A6B5D] hover:underline font-medium"
                      >
                        Switch Account
                      </button>
                      <button
                        onClick={() => { logout(); setUserMenuOpen(false); }}
                        className="text-xs text-[#A65E4E] hover:underline font-medium flex items-center space-x-1"
                      >
                        <LogOut className="w-3.5 h-3.5 mr-1" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => openAuthModal('login')}
                className="inline-flex items-center px-3.5 py-1.5 text-xs font-semibold text-[#4A443F] bg-[#F2EFE9] hover:bg-[#E5E2DD] border border-[#E5E2DD] rounded-xl transition-colors shadow-2xs"
              >
                <LogIn className="w-3.5 h-3.5 mr-1.5 text-[#5A6B5D]" />
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-[#E5E2DD] bg-[#F9F8F6] overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex space-x-1 py-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-white text-[#5A6B5D] shadow-xs border border-[#E5E2DD] font-semibold'
                    : 'text-[#8C847C] hover:text-[#4A443F] hover:bg-[#F2EFE9]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 mr-1.5 ${isActive ? 'text-[#5A6B5D]' : 'text-[#8C847C]'}`} />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

