import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockEcosystemData } from '../mockData';
import './GlobalStateContext.css';

const GlobalStateContext = createContext();

export const useGlobalState = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
    const [state, setState] = useState(() => {
        const saved = localStorage.getItem('learnflux_global');
        return saved ? JSON.parse(saved) : mockEcosystemData;
    });

    useEffect(() => {
        localStorage.setItem('learnflux_global', JSON.stringify(state));
    }, [state]);

    // Actions
    const updateCourseStatus = (courseId, newStatus) => {
        setState(prev => ({
            ...prev,
            courses: prev.courses.map(c => c.id === courseId ? { ...c, status: newStatus } : c)
        }));
    };

    const addCourse = (course) => {
        setState(prev => ({
            ...prev,
            courses: [...prev.courses, { ...course, id: `c${Date.now()}`, status: 'pending', studentsEnrolled: 0, rating: 0 }]
        }));
    };

    const updateStudentProgress = (studentId, courseId, progress, grade) => {
        setState(prev => ({
            ...prev,
            enrollments: prev.enrollments.map(e =>
                (e.studentId === studentId && e.courseId === courseId)
                    ? { ...e, progress, grade, lastActive: 'Just now' }
                    : e
            )
        }));
    };

    const banUser = (userId) => {
        setState(prev => ({
            ...prev,
            users: prev.users.map(u => u.id === userId ? { ...u, isBanned: true } : u)
        }));
    };

    const addNotification = (message) => {
        setState(prev => ({
            ...prev,
            notifications: [{ id: `n${Date.now()}`, message, timestamp: new Date().toISOString(), read: false }, ...prev.notifications]
        }));
    };

    const [pendingRequestsCount, setPendingRequestsCount] = useState(0);

    const value = {
        ...state,
        updateCourseStatus,
        addCourse,
        updateStudentProgress,
        banUser,
        addNotification,
        setState,
        pendingRequestsCount,
        setPendingRequestsCount
    };

    return (
        <GlobalStateContext.Provider value={value}>
            {children}
        </GlobalStateContext.Provider>
    );
};
