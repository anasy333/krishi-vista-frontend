import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

// Context Providers
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Components
import Navbar from './components/common/Navbar';
import LoadingSpinner from './components/common/LoadingSpinner';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import FarmerDashboard from './pages/FarmerDashboard';
import StaffDashboard from './pages/StaffDashboard';
import GovtDashboard from './pages/GovtDashboard';
import CropDashboard from './pages/CropDashboard';
import AnalysisResults from './pages/AnalysisResults';
import MapDrawing from './pages/MapDrawing';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.user_type)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// App Layout Component
const AppLayout = ({ children, showNavbar = true }) => {
  return (
    <div className="min-h-screen bg-background">
      {showNavbar && <Navbar />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

// Main App Component
const AppContent = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <AppLayout>
              <Landing />
            </AppLayout>
          }
        />
        
        <Route
          path="/login"
          element={
            <AppLayout showNavbar={false}>
              <Login />
            </AppLayout>
          }
        />
        
        <Route
          path="/register"
          element={
            <AppLayout showNavbar={false}>
              <Register />
            </AppLayout>
          }
        />

        {/* Farmer Routes */}
        <Route
          path="/farmer-dashboard"
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <AppLayout>
                <FarmerDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/crop-dashboard/:farmerId/farm/:farmId"
          element={
            <ProtectedRoute allowedRoles={['farmer', 'staff']}>
              <AppLayout>
                <CropDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/analysis-results/:farmerId/farm/:farmId"
          element={
            <ProtectedRoute allowedRoles={['farmer', 'staff', 'govt_official']}>
              <AppLayout>
                <AnalysisResults />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/map/:farmId/farmer/:farmerId"
          element={
            <ProtectedRoute allowedRoles={['farmer', 'staff']}>
              <AppLayout>
                <MapDrawing />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Staff Routes */}
        <Route
          path="/staff-dashboard"
          element={
            <ProtectedRoute allowedRoles={['staff']}>
              <AppLayout>
                <StaffDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* Government Official Routes */}
        <Route
          path="/govt-dashboard"
          element={
            <ProtectedRoute allowedRoles={['govt_official']}>
              <AppLayout>
                <GovtDashboard />
              </AppLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 Route */}
        <Route
          path="*"
          element={
            <AppLayout>
              <NotFound />
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AppContent />
          <Toaster />
          <Sonner />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;