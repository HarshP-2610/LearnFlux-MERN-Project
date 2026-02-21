import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import './AdminStats.css';
import { mockAdminData } from '../../mockAdminData';

const AdminStats = () => {
    const { stats, platformGrowth } = mockAdminData;

    return (
        <div className="admin-stats-container">
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Total Active Students</h3>
                    <p>{stats.totalActiveStudents.toLocaleString()}</p>
                </div>
                <div className="stat-card">
                    <h3>Total Instructors</h3>
                    <p>{stats.totalInstructors.toLocaleString()}</p>
                </div>
                <div className="stat-card">
                    <h3>Platform Revenue (Monthly)</h3>
                    <p>${stats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <div className="stat-card">
                    <h3>Pending Course Approvals</h3>
                    <p>{stats.pendingApprovals}</p>
                </div>
            </div>

            <div className="chart-container">
                <h3>Platform Growth (Last 30 Days)</h3>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={platformGrowth}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="signups" stroke="#475569" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminStats;
