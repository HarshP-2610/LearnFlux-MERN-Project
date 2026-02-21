import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalStateProvider, useGlobalState } from './context/GlobalStateContext';
import { useLearnFluxSync } from './hooks/useLearnFluxSync';
import ProtectedRoute from './components/shared/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminPanel from './pages/AdminPanel';
import Courses from './pages/Courses';
import InstructorLayout from './pages/Instructor/InstructorLayout';
import StudentLayout from './pages/Student/StudentLayout';
import './App.css';

// Separate component so hooks can access Context
const AppContent = () => {
  useLearnFluxSync(); // Init background simulation for all panels
  const { notifications } = useGlobalState();
  const latestUnread = notifications.find(n => !n.read);

  return (
    <div className="app-wrapper">
      {latestUnread && (
        <div className="global-notification-toast">
          🔔 {latestUnread.message}
        </div>
      )}
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/courses" element={<Courses />} />

        {/* Protected Admin Suite */}
        <Route path="/admin/*" element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminPanel />
          </ProtectedRoute>
        } />

        {/* Protected Instructor Suite */}
        <Route path="/instructor/*" element={
          <ProtectedRoute allowedRoles={['instructor', 'admin']}>
            <InstructorLayout />
          </ProtectedRoute>
        } />

        {/* Protected Student Suite */}
        <Route path="/student/*" element={
          <ProtectedRoute allowedRoles={['student', 'admin']}>
            <StudentLayout />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <GlobalStateProvider>
      <Router>
        <AppContent />
      </Router>
    </GlobalStateProvider>
  );
}

export default App;
