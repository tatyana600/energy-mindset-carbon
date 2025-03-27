import React from 'react';
 import { Navigate, useLocation } from 'react-router-dom';
 import { useAuth } from '@/contexts/AuthContext';
 
 interface ProtectedRouteProps {
   children: React.ReactNode;
 }
 
 const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
   const { user, loading } = useAuth();
   const location = useLocation();
 
   if (loading) {
     // You could show a loading spinner here
     return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
   }
 
   if (!user) {
     // Redirect to login page if not logged in, but save where they were going
     return <Navigate to="/login" state={{ from: location }} replace />;
   }
 
   return <>{children}</>;
 };
 
 export default ProtectedRoute;