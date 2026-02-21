import React from 'react';
import { Navigate } from 'react-router-dom';
import { useGlobalState } from '../../context/GlobalStateContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
    // In actual production, this connects to Auth Context token decoded role
    const currentUser = JSON.parse(localStorage.getItem('user'));
    const { users } = useGlobalState();

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    // Check if banned in Global State (Admin Sync)
    const userInState = users.find(u => u.email === currentUser.email);
    if (userInState && userInState.isBanned) {
        // Clear local storage and send to an unauthorized/banned page ideally
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        alert("Your account has been banned by an Administrator.");
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        // Route redirect matrix
        if (currentUser.role === 'admin') return <Navigate to="/admin" replace />;
        if (currentUser.role === 'instructor') return <Navigate to="/instructor" replace />;
        return <Navigate to="/student" replace />; // Default fallback
    }

    return children;
};

export default ProtectedRoute;
