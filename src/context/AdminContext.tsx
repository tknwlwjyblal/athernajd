import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from 'firebase/auth';
import {
  auth,
  isCurrentUserAdmin,
  signInWithGoogle,
  signOutAdmin,
  subscribeToProjects,
  seedInitialProjects,
} from '../lib/firebase';
import { Project } from '../types';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/mockData';
import { onAuthStateChanged } from 'firebase/auth';

interface AdminContextType {
  currentUser: User | null;
  isAdmin: boolean;
  isLoadingAuth: boolean;
  authError: string | null;
  isDashboardOpen: boolean;
  openDashboard: () => void;
  closeDashboard: () => void;
  login: () => Promise<boolean>;
  logout: () => Promise<void>;
  projects: Project[];
  isLoadingProjects: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState<boolean>(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isDashboardOpen, setIsDashboardOpen] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true);

  // Auth state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        try {
          const adminStatus = await isCurrentUserAdmin(user);
          setIsAdmin(adminStatus);
          if (adminStatus) {
            seedInitialProjects(DEFAULT_PROJECTS).catch(() => {});
          }
        } catch {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setIsLoadingAuth(false);
    });

    return () => unsubscribe();
  }, []);

  // Subscribe to live Firestore projects
  useEffect(() => {
    const unsubscribe = subscribeToProjects(
      async (liveProjects) => {
        if (liveProjects && liveProjects.length > 0) {
          setProjects(liveProjects);
        } else {
          // If Firestore is empty and we have an admin logged in, we can seed or display defaults
          setProjects(DEFAULT_PROJECTS);
        }
        setIsLoadingProjects(false);
      },
      (error) => {
        console.warn('Real-time projects listener error, using local fallback:', error);
        setProjects(DEFAULT_PROJECTS);
        setIsLoadingProjects(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const login = async (): Promise<boolean> => {
    setAuthError(null);
    try {
      const user = await signInWithGoogle();
      const adminStatus = await isCurrentUserAdmin(user);
      setIsAdmin(adminStatus);
      if (!adminStatus) {
        setAuthError(
          `تم تسجيل الدخول بحساب (${user.email}). هذا الحساب غير مصرح له بإدارة الموقع. يرجى تسجيل الدخول بحساب مالك وإدارة الموقع المعتمد.`
        );
        return false;
      }
      setIsDashboardOpen(true);
      return true;
    } catch (err: any) {
      if (err.code !== 'auth/popup-closed-by-user') {
        if (
          err.code === 'auth/unauthorized-domain' ||
          err.message?.includes('unauthorized-domain')
        ) {
          const currentHostname = typeof window !== 'undefined' ? window.location.hostname : 'athernajd.com';
          setAuthError(
            `DOMAIN_UNAUTHORIZED:${currentHostname}`
          );
        } else {
          setAuthError(err.message || 'حدث خطأ أثناء تسجيل الدخول');
        }
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOutAdmin();
      setCurrentUser(null);
      setIsAdmin(false);
      setIsDashboardOpen(false);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const openDashboard = () => {
    setIsDashboardOpen(true);
  };

  const closeDashboard = () => {
    setIsDashboardOpen(false);
  };

  return (
    <AdminContext.Provider
      value={{
        currentUser,
        isAdmin,
        isLoadingAuth,
        authError,
        isDashboardOpen,
        openDashboard,
        closeDashboard,
        login,
        logout,
        projects,
        isLoadingProjects,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = (): AdminContextType => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
