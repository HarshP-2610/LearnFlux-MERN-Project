import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGlobalState } from '../../context/GlobalStateContext';
import './AdminSidebar.css';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();
    const { pendingRequestsCount } = useGlobalState();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const navItems = [
        { id: 'overview', label: 'Overview' },
        { id: 'users', label: 'User Management' },
        { id: 'requests', label: 'Course Approval' },
        { id: 'analytics', label: 'Platform Analytics' },
        { id: 'settings', label: 'System Settings' }
    ];

    return (
        <aside className="admin-sidebars">
            <div className="admin-logo"><span>LearnFlux Admin</span></div>
            <nav className="admin-nav">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        className={`nav-btn ${activeTab === item.id ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.id)}
                    >
                        {item.label}
                        {item.id === 'requests' && pendingRequestsCount > 0 && (
                            <span style={{
                                backgroundColor: 'red',
                                color: 'white',
                                borderRadius: '50%',
                                padding: '2px 6px',
                                marginLeft: '8px',
                                fontSize: '12px'
                            }}>{pendingRequestsCount}</span>
                        )}
                    </button>
                ))}
            </nav>
            <button className="admin-logout" onClick={handleLogout}>Logout</button>
        </aside>
    );
};

export default AdminSidebar;
