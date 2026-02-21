import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, BrainCircuit, Users, DollarSign, LogOut } from 'lucide-react';
import InstructorDash from './InstructorDash';
import CourseManager from './CourseManager';
import QuestionBank from './QuestionBank';
import StudentRoster from './StudentRoster';
import './InstructorLayout.css';

const InstructorLayout = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('user')) || { name: 'Guest Instructor', email: 'ins@gmail.com', role: 'instructor' };

    useEffect(() => {
        if (!currentUser || currentUser.role !== 'instructor') {
            navigate('/login');
        }
    }, [navigate]);

    const mockInstructor = { name: currentUser.name, email: currentUser.email };

    const handleLogout = () => {
        // Implement logout logic
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'courses', label: 'Course Manager', icon: BookOpen },
        { id: 'questions', label: 'Question Bank', icon: BrainCircuit },
        { id: 'students', label: 'Student Analytics', icon: Users },
        { id: 'revenue', label: 'Revenue', icon: DollarSign } // Placeholder for future
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <InstructorDash />;
            case 'courses': return <CourseManager />;
            case 'questions': return <QuestionBank />;
            case 'students': return <StudentRoster />;
            case 'revenue': return <div className="placeholder-card"><h2>Revenue Analytics</h2><p>Coming Soon</p></div>;
            default: return <InstructorDash />;
        }
    };

    return (
        <div className="instructor-layout">
            <aside className="instructor-sidebar">
                <div className="sidebar-brand">
                    <span>LearnFlux</span>
                    <span className="badge">Instructor</span>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                            onClick={() => setActiveTab(item.id)}
                        >
                            <item.icon className="nav-icon" size={20} />
                            <span>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-bottom">
                    <div className="instructor-profile-mini">
                        <div className="avatar">{mockInstructor.name.charAt(4)}</div>
                        <div className="info">
                            <p className="name">{mockInstructor.name}</p>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="instructor-main">
                <header className="main-header">
                    <h1 className="page-title">
                        {navItems.find(item => item.id === activeTab)?.label}
                    </h1>
                </header>

                <motion.div
                    className="content-area"
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderContent()}
                </motion.div>
            </main>
        </div>
    );
};

export default InstructorLayout;
