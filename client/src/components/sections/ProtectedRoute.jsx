import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children, requireAdmin = false, requireSupervisor = false }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (!user.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  if (requireAdmin && user.role !== 'SYSTEM_ADMIN') {
    return <Navigate to="/" replace />;
  }

  if (requireSupervisor && user.role !== 'SUPERVISOR') {
    return <Navigate to="/" replace />;
  }

  return children;
}
