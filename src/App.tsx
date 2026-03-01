import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Dashboard } from './pages/Dashboard';
import { SignIn } from './pages/SignIn';
import SignUp from './pages/SignUp';
import { BMICalculator } from './pages/BMICalculator';
import { CaloriesTracker } from './pages/CaloriesTracker';
import { WeeklyPlanner } from './pages/WeeklyPlanner';
import { WorkoutScheduler } from './pages/WorkoutScheduler';
import { Progress } from './pages/Progress';

import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  const location = useLocation();
  const isAuthPage = ['/signin', '/signup'].includes(location.pathname);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#f7f7f7] text-slate-900 antialiased">
        {!isAuthPage && <Navbar />}
        <main>
          <Routes>
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route path="/" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/bmi" element={
              <ProtectedRoute>
                <BMICalculator />
              </ProtectedRoute>
            } />
            <Route path="/nutrition" element={
              <ProtectedRoute>
                <CaloriesTracker />
              </ProtectedRoute>
            } />
            <Route path="/planner" element={
              <ProtectedRoute>
                <WeeklyPlanner />
              </ProtectedRoute>
            } />
            <Route path="/workouts" element={
              <ProtectedRoute>
                <WorkoutScheduler />
              </ProtectedRoute>
            } />
            <Route path="/progress" element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            } />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
