import React, { useEffect } from 'react';
import { authService } from '../services/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  navigate: (path: string) => void;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, navigate }) => {
  useEffect(() => {
    if (!authService.isAuthenticated()) {
      navigate('/admin/login');
    }
  }, [navigate]);

  if (!authService.isAuthenticated()) {
    // Render nothing while redirecting
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
