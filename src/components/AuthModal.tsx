import React, { useState } from 'react';
import { 
  X, 
  Lock, 
  Mail, 
  User, 
  GraduationCap, 
  ShieldCheck, 
  Building2, 
  Hash, 
  ArrowRight,
  Sparkles,
  KeyRound,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const AuthModal: React.FC = () => {
  const { 
    authModalOpen, 
    closeAuthModal, 
    authMode, 
    openAuthModal, 
    login, 
    register, 
    quickLogin, 
    isLoading, 
    error,
    clearError 
  } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'student' | 'faculty' | 'admin'>('student');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [rollNumber, setRollNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    if (authMode === 'login') {
      await login(email, password);
    } else {
      await register({
        name,
        email,
        password,
        role,
        department,
        rollNumber
      });
    }
  };

  const handleQuick = async (selectedRole: 'faculty' | 'student' | 'admin') => {
    await quickLogin(selectedRole);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl border border-[#E5E2DD] shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 pb-4 bg-[#F9F8F6] border-b border-[#E5E2DD] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-[#5A6B5D] text-white flex items-center justify-center shadow-xs">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#4A443F]">
                {authMode === 'login' ? 'Sign In to SmartGrade' : 'Create User Account'}
              </h3>
              <p className="text-xs text-[#8C847C]">
                {authMode === 'login' 
                  ? 'Access ML prediction model, MongoDB records & Viva defense' 
                  : 'Register as Student, Faculty Guide, or Department Examiner'}
              </p>
            </div>
          </div>
          <button 
            onClick={closeAuthModal}
            className="w-8 h-8 rounded-full hover:bg-[#E5E2DD] flex items-center justify-center text-[#8C847C] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          
          {/* 1-Click Fast Viva Demo Credentials */}
          <div className="bg-[#5A6B5D]/8 border border-[#5A6B5D]/20 rounded-2xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold text-[#5A6B5D] uppercase tracking-wider flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> Quick 1-Click Viva Credentials:
              </span>
              <span className="text-[10px] text-[#8C847C]">Instant Login</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuick('student')}
                disabled={isLoading}
                className="px-2.5 py-2 rounded-xl text-left bg-white border border-[#E5E2DD] hover:border-[#5A6B5D] hover:bg-[#5A6B5D]/5 transition-all text-xs group"
              >
                <span className="font-bold text-[#4A443F] block truncate text-[11px]">Candidate</span>
                <span className="text-[10px] text-[#8C847C] block truncate">Mehul Parmar</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuick('faculty')}
                disabled={isLoading}
                className="px-2.5 py-2 rounded-xl text-left bg-white border border-[#E5E2DD] hover:border-[#5A6B5D] hover:bg-[#5A6B5D]/5 transition-all text-xs group"
              >
                <span className="font-bold text-[#4A443F] block truncate text-[11px]">Faculty Guide</span>
                <span className="text-[10px] text-[#8C847C] block truncate">Dr. R. Kulkarni</span>
              </button>

              <button
                type="button"
                onClick={() => handleQuick('admin')}
                disabled={isLoading}
                className="px-2.5 py-2 rounded-xl text-left bg-white border border-[#E5E2DD] hover:border-[#5A6B5D] hover:bg-[#5A6B5D]/5 transition-all text-xs group"
              >
                <span className="font-bold text-[#4A443F] block truncate text-[11px]">Examiner/HOD</span>
                <span className="text-[10px] text-[#8C847C] block truncate">Academic Board</span>
              </button>
            </div>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex bg-[#F2EFE9] p-1 rounded-2xl border border-[#E5E2DD]">
            <button
              type="button"
              onClick={() => openAuthModal('login')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                authMode === 'login' 
                  ? 'bg-white text-[#4A443F] shadow-xs' 
                  : 'text-[#8C847C] hover:text-[#4A443F]'
              }`}
            >
              Sign In (MERN Auth)
            </button>
            <button
              type="button"
              onClick={() => openAuthModal('register')}
              className={`flex-1 py-2 text-xs font-semibold rounded-xl transition-all ${
                authMode === 'register' 
                  ? 'bg-white text-[#4A443F] shadow-xs' 
                  : 'text-[#8C847C] hover:text-[#4A443F]'
              }`}
            >
              Sign Up (Register)
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3.5 bg-[#A65E4E]/10 border border-[#A65E4E]/30 rounded-xl text-xs text-[#A65E4E] flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {authMode === 'register' && (
              <>
                <div>
                  <label className="text-xs font-semibold text-[#4A443F] block mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Mehul Parmar"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#F9F8F6] border border-[#E5E2DD] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#4A443F] block mb-1">Account Role</label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value as any)}
                      className="w-full px-3 py-2.5 text-xs bg-[#F9F8F6] border border-[#E5E2DD] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
                    >
                      <option value="student">Student Candidate</option>
                      <option value="faculty">Faculty Project Guide</option>
                      <option value="admin">Academic Examiner / HOD</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#4A443F] block mb-1">Roll / ID Number</label>
                    <div className="relative">
                      <Hash className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="e.g. 22BT04018"
                        value={rollNumber}
                        onChange={(e) => setRollNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-[#F9F8F6] border border-[#E5E2DD] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#4A443F] block mb-1">Department / Branch</label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Computer Science & Engineering"
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#F9F8F6] border border-[#E5E2DD] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-xs font-semibold text-[#4A443F] block mb-1">University Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  placeholder="name@university.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#F9F8F6] border border-[#E5E2DD] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-[#4A443F]">Password</label>
                {authMode === 'login' && (
                  <span className="text-[11px] text-[#8C847C]">Demo: <code className="text-[#5A6B5D]">student123</code></span>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8C847C] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 text-xs bg-[#F9F8F6] border border-[#E5E2DD] rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#5A6B5D]/20 focus:border-[#5A6B5D]"
                />
              </div>
            </div>

            {authMode === 'login' && (
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center space-x-2 text-[#4A443F] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded text-[#5A6B5D] focus:ring-[#5A6B5D]"
                  />
                  <span>Remember Session (JWT)</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('For college presentation, use the Quick 1-Click login buttons above or student123/faculty123/admin123.')}
                  className="text-[#5A6B5D] hover:underline text-[11px]"
                >
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#5A6B5D] hover:bg-[#4d5c4f] text-white rounded-xl font-semibold text-xs transition-colors shadow-xs flex items-center justify-center space-x-2 mt-4"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Authenticating with MongoDB...</span>
                </>
              ) : (
                <>
                  <span>{authMode === 'login' ? 'Sign In to Dashboard' : 'Register Account in MongoDB'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F9F8F6] border-t border-[#E5E2DD] text-center text-[11px] text-[#8C847C] flex items-center justify-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-[#5A6B5D]" />
          <span>MERN Stack Architecture: MongoDB + Express.js + React.js + Node.js</span>
        </div>
      </div>
    </div>
  );
};
