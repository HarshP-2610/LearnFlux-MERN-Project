import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminProvider, useAdmin } from '../context/AdminContext';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminStats from '../components/admin/AdminStats';
import UserTable from '../components/admin/UserTable';
import AdminReview from '../components/admin/AdminReview';
import GlobalAnalytics from '../components/admin/GlobalAnalytics';
import './AdminPanel.css';

const AdminDashboard = () => {
    const { isAdmin, loading } = useAdmin();
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('user')) || { email: 'admin@learnflux.com' };

    useEffect(() => {
        if (!loading && !isAdmin) {
            navigate('/login');
        }
    }, [isAdmin, loading, navigate]);

    if (loading) {
        return <div className="admin-loading">Loading Admin Panel...</div>;
    }

    if (!isAdmin) {
        return (
            <div className="unauthorized">
                <h1>401 - Unauthorized</h1>
                <p>You do not have permission to access this page.</p>
                <button onClick={() => navigate('/')}>Go Home</button>
            </div>
        );
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'overview': return <AdminStats />;
            case 'users': return <UserTable />;
            case 'requests': return <AdminReview />;
            case 'analytics': return <GlobalAnalytics />;
            case 'settings': return (
                <div className="admin-settings">
                    <h2>System Settings</h2>
                    <p>Configuration options will be available here.</p>
                </div>
            );
            default: return <AdminStats />;
        }
    };

    return (
        <div className="admin-container">
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
            <main className="admin-main">
                <header className="admin-header">
                    <h1>
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/([A-Z])/g, ' $1').trim()}
                    </h1>
                    <div className="admin-user-info">
                        <span>{currentUser.email}</span>
                        <div className="admin-avatar">{currentUser.email.charAt(0).toUpperCase()}</div>
                    </div>
                </header>
                <div className="admin-content-area">
                    {renderContent()}
                </div>
            </main>
        </div>
    );
};

const AdminPanel = () => {
    return (
        <AdminProvider>
            <AdminDashboard />
        </AdminProvider>
    );
};

export default AdminPanel;
