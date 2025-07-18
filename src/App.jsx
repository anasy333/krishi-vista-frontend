import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';

// Components
import Navbar from './components/common/Navbar';

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
      staleTime: 5 * 60 * 1000,
    },
  },
});

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

        {/* Dashboard Routes - No auth required for testing */}
        <Route
          path="/farmer-dashboard"
          element={
            <AppLayout>
              <FarmerDashboard />
            </AppLayout>
          }
        />

        <Route
          path="/staff-dashboard"
          element={
            <AppLayout>
              <StaffDashboard />
            </AppLayout>
          }
        />

        <Route
          path="/govt-dashboard"
          element={
            <AppLayout>
              <GovtDashboard />
            </AppLayout>
          }
        />

        <Route
          path="/crop-dashboard/:farmerId/farm/:farmId"
          element={
            <AppLayout>
              <CropDashboard />
            </AppLayout>
          }
        />

        <Route
          path="/analysis-results/:farmerId/farm/:farmId"
          element={
            <AppLayout>
              <AnalysisResults />
            </AppLayout>
          }
        />

        <Route
          path="/map/:farmId/farmer/:farmerId"
          element={
            <AppLayout>
              <MapDrawing />
            </AppLayout>
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