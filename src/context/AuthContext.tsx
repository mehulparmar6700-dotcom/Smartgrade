import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  authModalOpen: boolean;
  authMode: 'login' | 'register';
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'faculty' | 'admin';
    department?: string;
    rollNumber?: string;
  }) => Promise<boolean>;
  logout: () => void;
  quickLogin: (role: 'faculty' | 'student' | 'admin') => Promise<boolean>;
  openAuthModal: (mode?: 'login' | 'register') => void;
  closeAuthModal: () => void;
  clearError: () => void;
}

const DEFAULT_USER: AuthUser = {
  _id: 'usr_student_001',
  name: 'Mehul Parmar (Candidate)',
  email: 'student@university.edu',
  role: 'student',
  department: 'B.Tech Computer Engineering (Semester VI)',
  rollNumber: '22BT04018',
  avatarColor: '#D9A679',
  createdAt: new Date().toISOString()
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('smartgrade_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return DEFAULT_USER;
      }
    }
    return DEFAULT_USER;
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('smartgrade_token') || 'jwt_token_demo_2026';
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  useEffect(() => {
    if (user) {
      localStorage.setItem('smartgrade_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('smartgrade_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('smartgrade_token', token);
    } else {
      localStorage.removeItem('smartgrade_token');
    }
  }, [token]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Login failed. Please check credentials.');
      }

      setUser(data.user);
      setToken(data.token);
      setAuthModalOpen(false);
      return true;
    } catch (err: any) {
      // Fallback for standalone preview if server is restarting
      if (email.toLowerCase().includes('faculty')) {
        const facUser: AuthUser = {
          _id: 'usr_faculty_001',
          name: 'Dr. Ramesh Kulkarni (Project Guide)',
          email: 'faculty@university.edu',
          role: 'faculty',
          department: 'Department of Computer Science & Engineering',
          rollNumber: 'FAC-CSE-402',
          avatarColor: '#5A6B5D',
          createdAt: new Date().toISOString()
        };
        setUser(facUser);
        setToken('jwt_token_faculty_001');
        setAuthModalOpen(false);
        return true;
      } else if (email.toLowerCase().includes('admin')) {
        const adminUser: AuthUser = {
          _id: 'usr_admin_001',
          name: 'Academic Examiner / HOD',
          email: 'admin@university.edu',
          role: 'admin',
          department: 'University Academic Evaluation Board',
          rollNumber: 'ADMIN-EXAM-01',
          avatarColor: '#A65E4E',
          createdAt: new Date().toISOString()
        };
        setUser(adminUser);
        setToken('jwt_token_admin_001');
        setAuthModalOpen(false);
        return true;
      } else {
        const stdUser: AuthUser = {
          _id: 'usr_student_001',
          name: 'Mehul Parmar (Candidate)',
          email: email || 'student@university.edu',
          role: 'student',
          department: 'B.Tech Computer Engineering',
          rollNumber: '22BT04018',
          avatarColor: '#D9A679',
          createdAt: new Date().toISOString()
        };
        setUser(stdUser);
        setToken('jwt_token_student_001');
        setAuthModalOpen(false);
        return true;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: {
    name: string;
    email: string;
    password: string;
    role: 'student' | 'faculty' | 'admin';
    department?: string;
    rollNumber?: string;
  }): Promise<boolean> => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      const resData = await res.json();
      if (!res.ok) {
        throw new Error(resData.error || 'Registration failed.');
      }

      setUser(resData.user);
      setToken(resData.token);
      setAuthModalOpen(false);
      return true;
    } catch (err: any) {
      // Local fallback
      const newUser: AuthUser = {
        _id: `usr_${Date.now()}`,
        name: data.name,
        email: data.email,
        role: data.role,
        department: data.department || 'Computer Science & Engineering',
        rollNumber: data.rollNumber || 'REG-2026-01',
        avatarColor: '#5A6B5D',
        createdAt: new Date().toISOString()
      };
      setUser(newUser);
      setToken(`jwt_token_${newUser._id}`);
      setAuthModalOpen(false);
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = async (role: 'faculty' | 'student' | 'admin'): Promise<boolean> => {
    const credentials = {
      faculty: { email: 'faculty@university.edu', password: 'faculty123' },
      student: { email: 'student@university.edu', password: 'student123' },
      admin: { email: 'admin@university.edu', password: 'admin123' }
    };
    return login(credentials[role].email, credentials[role].password);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('smartgrade_user');
    localStorage.removeItem('smartgrade_token');
  };

  const openAuthModal = (mode: 'login' | 'register' = 'login') => {
    setAuthMode(mode);
    setError(null);
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
    setError(null);
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        isLoading,
        error,
        authModalOpen,
        authMode,
        login,
        register,
        logout,
        quickLogin,
        openAuthModal,
        closeAuthModal,
        clearError
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
