import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, BookOpen, Award, Bell, LogOut } from 'lucide-react';
import StudentDash from './StudentDash';
import MyCourses from './MyCourses';
import Certificates from './Certificates';
import './StudentLayout.css';

const StudentLayout = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('user')) || { name: 'Guest Student', email: 'student@gmail.com', role: 'student' };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
        { id: 'my-courses', label: 'My Learning', icon: BookOpen },
        { id: 'certificates', label: 'Certificates', icon: Award },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard': return <StudentDash />;
            case 'my-courses': return <MyCourses />;
            case 'certificates': return <Certificates />;
            default: return <StudentDash />;
        }
    };

    return (
        <div className="student-layout">
            <aside className="student-sidebar">
                <div className="sidebar-brand">
                    <span>LearnFlux</span>
                    <span className="badge">Student</span>
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
                    <div className="student-profile-mini">
                        <div className="avatar">{currentUser.name.charAt(0)}</div>
                        <div className="info">
                            <p className="name">{currentUser.name}</p>
                            <span className="role-tag">Learner</span>
                        </div>
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            <main className="student-main">
                <header className="main-header">
                    <h1 className="page-title">
                        {navItems.find(item => item.id === activeTab)?.label}
                    </h1>
                    <div className="header-actions">
                        <button className="notif-btn">
                            <Bell size={20} />
                            <span className="notif-badge"></span>
                        </button>
                        <button className="browse-btn" onClick={() => navigate('/courses')}>
                            Browse Catalog
                        </button>
                    </div>
                </header>

                <motion.div
                    className="content-area"
                    key={activeTab}
                    initial={{ opacity: 0, scale: 0.98, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    {renderContent()}
                </motion.div>
            </main>
        </div>
    );
};

export default StudentLayout;
